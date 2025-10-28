// packages/core/src/engine.ts (or vnEngineNodeSystem.ts)

export type VNScene = {
  id: string;
  start: NodeID;
  nodes: Record<NodeID, VNNode>;
};

export type GameScript = {
  scenes: Record<string, VNScene>;
  startScene: string;
};
export type NodeID = string;

export type DialogueNode = { type: 'dialogue'; id: NodeID; speaker?: string; text: string; next?: NodeID };
export type ChoiceNode   = { type: 'choice';   id: NodeID; choices: Array<{ text: string; next: NodeID; condition?: string }> };
export type BranchNode   = { type: 'branch';   id: NodeID; condition: string; then: NodeID; else?: NodeID };
export type CommandNode  = { type: 'command';  id: NodeID; name: 'setBackground'|'showSprite'|'hideSprite'|'playMusic'|'stopMusic'|'setFlag'; args?: Record<string, unknown>; next?: NodeID };
export type EndNode      = { type: 'end';      id: NodeID };

export type VNNode = DialogueNode | ChoiceNode | BranchNode | CommandNode | EndNode;

export type RenderInstruction =
  | { kind: 'showDialogue'; speaker?: string; text: string }
  | { kind: 'showChoices'; choices: Array<{ text: string; index: number }> }
  | { kind: 'runCommand'; name: CommandNode['name']; args?: Record<string, unknown> }
  | { kind: 'showBranch' }
  | { kind: 'end' };

type Snapshot = {
  sceneId: string;
  nodeId: NodeID;
  flags: Record<string, boolean | number | string>;
  vars: Record<string, unknown>;
  history: Array<{ sceneId: string; nodeId: NodeID }>;
};

/** Internal traversal state flags */
enum EngineMode {
  Idle = 0,
  ShowingBranch = 1,     // we just emitted showBranch, next next() will resolve/evaluate
  AwaitingCommand = 2,   // we emitted runCommand; ignore 'next' until proceed()
}

export class VNEngine {
  private script: { scenes: Record<string, { id: string; start: NodeID; nodes: Record<NodeID, VNNode> }>; startScene: string };
  private state: Snapshot;
  private mode: EngineMode = EngineMode.Idle;

  // perf: preindex current scene pointer
  private currentSceneRef: { id: string; nodes: Record<NodeID, VNNode> };

  constructor(script: any, initial?: Partial<Snapshot>) {
    this.script = script;
    const sceneId = initial?.sceneId ?? script.startScene;
    this.currentSceneRef = script.scenes[sceneId];
    // Defensive: handle missing 'start' property
    let nodeId: NodeID | undefined = initial?.nodeId;
    if (!nodeId) {
      if ('start' in this.currentSceneRef && typeof this.currentSceneRef.start === 'string' && this.currentSceneRef.start) {
        nodeId = this.currentSceneRef.start;
      } else {
        // Fallback: use first node key if available
        const nodeKeys = Object.keys(this.currentSceneRef.nodes);
        if (nodeKeys.length > 0) {
          nodeId = nodeKeys[0];
        } else {
          throw new Error(`Scene '${sceneId}' is missing a 'start' property and has no nodes.`);
        }
      }
    }
    if (typeof nodeId !== 'string' || !nodeId) {
      throw new Error(`Could not determine starting node for scene '${sceneId}'.`);
    }
    this.state = {
      sceneId,
      nodeId,
      flags: initial?.flags ?? Object.create(null),
      vars: initial?.vars ?? Object.create(null),
      history: initial?.history ?? [],
    };
    this.mode = EngineMode.Idle;
  }

  // ===== Public API =====

  get snapshot(): Snapshot {
    // perf: avoid deep structuredClone; this is small
    return {
      sceneId: this.state.sceneId,
      nodeId: this.state.nodeId,
      flags: { ...this.state.flags },
      vars: { ...this.state.vars },
      history: [...this.state.history],
    };
  }

  hydrate(snap: Snapshot) {
    this.state = {
      sceneId: snap.sceneId,
      nodeId: snap.nodeId,
      flags: { ...snap.flags },
      vars: { ...snap.vars },
      history: [...snap.history],
    };
    this.currentSceneRef = this.script.scenes[this.state.sceneId];
    this.mode = EngineMode.Idle; // important for tests
  }

  setFlag(key: string, value: boolean | number | string) {
    this.state.flags[key] = value;
    // If we are on a branch and previously resolved it, allow showing it again
    const node = this.currentNode();
    if (node.type === 'branch') {
      this.mode = EngineMode.Idle; // so next next() emits showBranch
    }
  }

  choose(index: number): RenderInstruction {
    const node = this.currentNode();
    if (node.type !== 'choice') throw new Error('Not at a choice');
    const options = node.choices.filter(c => !c.condition || this.eval(c.condition));
    const target = options[index];
    if (!target) throw new Error('Invalid choice');
    this.jump(target.next);
    return this.peek();
  }

  /** Produce the instruction for the *current* node without implicit advancing */
  next(): RenderInstruction {
    const node = this.currentNode();

    // Contract: while AwaitingCommand, do NOT re-emit or advance; renderer must call proceed()
    if (this.mode === EngineMode.AwaitingCommand) {
      // idempotent: re-show same command if someone calls next() again
      // but tests typically expect no double proceed count; safest is to re-emit same instruction
      const cmd = node as CommandNode;
      return { kind: 'runCommand', name: cmd.name, args: cmd.args };
    }

    if (node.type === 'branch') {
      if (this.mode !== EngineMode.ShowingBranch) {
        // 1st call: show the branch prompt
        this.mode = EngineMode.ShowingBranch;
        return { kind: 'showBranch' };
      } else {
        // 2nd call: resolve/evaluate and jump; then return the *target* node’s instruction
        const target = this.eval(node.condition) ? node.then : (node.else ?? node.id);
        this.jump(target);
        this.mode = EngineMode.Idle;
        return this.peek();
      }
    }

    if (node.type === 'dialogue') {
      return { kind: 'showDialogue', speaker: node.speaker, text: node.text };
    }

    if (node.type === 'choice') {
      const choices = node.choices
        .filter(c => !c.condition || this.eval(c.condition))
        .map((c, i) => ({ text: c.text, index: i }));
      return { kind: 'showChoices', choices };
    }

    if (node.type === 'command') {
      this.mode = EngineMode.AwaitingCommand;
      return { kind: 'runCommand', name: node.name, args: node.args };
    }

    return { kind: 'end' };
  }

  /** Advance from nodes that have a 'next' pointer or to continue after runCommand */
  proceed(): RenderInstruction {
    const node = this.currentNode();

    // After a command, a single proceed() moves to next, clears the guard, and returns peek() there.
    if (this.mode === EngineMode.AwaitingCommand) {
      this.mode = EngineMode.Idle;
      if (node.type === 'command' && node.next) {
        // Debug: log next node id
        // @ts-ignore
        console.log('proceed() jump to:', node.next);
        this.jump(node.next);
      }
      return this.peek();
    }

    if (node.type === 'dialogue' && node.next) {
      this.jump(node.next);
      return this.peek();
    }

    // For branch: proceed() is not part of the contract (branch is handled by next()->showBranch then next()->resolve)
    // For choice: use choose(index)
    // For end: remain at end
    return this.peek();
  }

  // ===== Internals =====

  private currentNode(): VNNode {
    return this.currentSceneRef.nodes[this.state.nodeId];
  }

  private jump(next: NodeID) {
    this.state.history.push({ sceneId: this.state.sceneId, nodeId: this.state.nodeId });
    this.state.nodeId = next;
    // same scene; if you support cross-scene, update currentSceneRef here
  }

  private eval(expr: string): boolean {
    // simple flags truthiness with !negation
    const t = expr.trim();
    if (!t) return false;
    if (t.startsWith('!')) return !Boolean(this.state.flags[t.slice(1)]);
    return Boolean(this.state.flags[t]);
  }

  /** Return instruction for current node without consuming its 'next' */
  private peek(): RenderInstruction {
    const node = this.currentNode();
    if (node.type === 'dialogue') return { kind: 'showDialogue', speaker: node.speaker, text: node.text };
    if (node.type === 'choice') {
      const choices = node.choices
        .filter(c => !c.condition || this.eval(c.condition))
        .map((c, i) => ({ text: c.text, index: i }));
      return { kind: 'showChoices', choices };
    }
    if (node.type === 'command') return { kind: 'runCommand', name: node.name, args: node.args };
    if (node.type === 'branch') {
      // If we landed on a branch via jump(), restart the branch cycle: next() should showBranch
      this.mode = EngineMode.Idle;
      return { kind: 'showBranch' };
    }
    return { kind: 'end' };
  }
}

