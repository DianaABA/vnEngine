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
export type ChoiceNode   = { type: 'choice';   id: NodeID; choices: Array<{ text: string; next: NodeID; condition?: string; visibleIf?: string; enabledIf?: string }> };
export type BranchNode   = { type: 'branch';   id: NodeID; condition: string; then: NodeID; else?: NodeID };
export type CommandNode  = { type: 'command';  id: NodeID; name: 'setBackground'|'showSprite'|'hideSprite'|'playMusic'|'stopMusic'|'setFlag'|'setVar'|'wait'|'changeScene'|'shakeBackground'|'camera'|'choiceTimer'; args?: Record<string, unknown>; next?: NodeID };
export type EndNode      = { type: 'end';      id: NodeID };

export type VNNode = DialogueNode | ChoiceNode | BranchNode | CommandNode | EndNode;

export type RenderInstruction =
  | { kind: 'showDialogue'; speaker?: string; text: string }
  | { kind: 'showChoices'; choices: Array<{ text: string; index: number; disabled?: boolean }> }
  | { kind: 'runCommand'; name: CommandNode['name']; args?: Record<string, unknown> }
  | { kind: 'showBranch' }
  | { kind: 'end' };

export type Snapshot = {
  sceneId: string;
  nodeId: NodeID;
  flags: Record<string, boolean | number | string>;
  vars: Record<string, unknown>;
  history: Array<{ sceneId: string; nodeId: NodeID }>;
};

// Public engine contract consumed by renderers
/* eslint-disable no-unused-vars */
export interface EngineContract {
  readonly snapshot: Snapshot;
  hydrate: (snap: Snapshot) => void;
  next: () => RenderInstruction;
  proceed: () => RenderInstruction;
  choose: (index: number) => RenderInstruction;
  changeScene: (sceneId: string, nodeId?: NodeID) => void;
}
/* eslint-enable no-unused-vars */

/** Internal traversal state flags */
const EngineMode = {
  Idle: 0,
  ShowingBranch: 1,     // we just emitted showBranch, next next() will resolve/evaluate
  AwaitingCommand: 2,   // we emitted runCommand; ignore 'next' until proceed()
} as const;
type EngineMode = typeof EngineMode[keyof typeof EngineMode];

export class VNEngine implements EngineContract {
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

  setVar(key: string, value: unknown) {
    this.state.vars[key] = value as any;
    const node = this.currentNode();
    if (node.type === 'branch') {
      this.mode = EngineMode.Idle;
    }
  }

  changeScene(sceneId: string, nodeId?: NodeID) {
    if (!this.script.scenes[sceneId]) throw new Error(`Unknown scene '${sceneId}'`);
    this.state.sceneId = sceneId;
    this.currentSceneRef = this.script.scenes[sceneId];
  const declaredStart = (this.script.scenes[sceneId] as any).start as NodeID | undefined;
  const startNode = nodeId ?? declaredStart;
    if (!startNode || !this.currentSceneRef.nodes[startNode]) {
      const keys = Object.keys(this.currentSceneRef.nodes);
      if (!keys.length) throw new Error(`Scene '${sceneId}' has no nodes`);
      this.state.nodeId = keys[0];
    } else {
      this.state.nodeId = startNode;
    }
    this.mode = EngineMode.Idle;
  }

  choose(index: number): RenderInstruction {
    const node = this.currentNode();
    if (node.type !== 'choice') throw new Error('Not at a choice');
    const options = node.choices.filter(c => {
      const condOk = !c.condition || this.eval(c.condition);
      const visOk = !c.visibleIf || this.eval(c.visibleIf);
      return condOk && visOk;
    });
    const target = options[index];
    if (!target) throw new Error('Invalid choice');
    if (target.enabledIf !== undefined && !this.eval(target.enabledIf)) {
      throw new Error('Choice disabled');
    }
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
      const visible = node.choices.filter(c => {
        const condOk = !c.condition || this.eval(c.condition);
        const visOk = !c.visibleIf || this.eval(c.visibleIf);
        return condOk && visOk;
      });
      const choices = visible.map((c, i) => ({
        text: c.text,
        index: i,
        disabled: c.enabledIf !== undefined ? !this.eval(c.enabledIf) : false,
      }));
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
    // Supports:
    //  - Truthiness: flag or var name
    //  - Negation: !name
    //  - Comparisons: name == value | != | > | >= | < | <= (numeric compare if both numeric)
    //  - Logical AND/OR: a && b, a || b (no parentheses)
    const t = (expr ?? '').trim();
    if (!t) return false;

    const evalValue = (name: string): unknown => {
      if (name in this.state.flags) return this.state.flags[name];
      if (name in this.state.vars) return (this.state.vars as any)[name];
      return undefined;
    };
    const toNum = (v: unknown): number | null => {
      if (typeof v === 'number') return v;
      if (typeof v === 'string' && /^-?\d+(?:\.\d+)?$/.test(v.trim())) return parseFloat(v);
      return null;
    };
    const parseLiteral = (s: string): unknown => {
      const v = s.trim();
      if (/^".*"$/.test(v) || /^'.*'$/.test(v)) return v.slice(1, -1);
      const n = toNum(v);
      if (n !== null) return n;
      if (v === 'true') return true;
      if (v === 'false') return false;
      // fallback: variable or flag value
      return evalValue(v);
    };

    const evalAtomic = (s: string): boolean => {
      const str = s.trim();
      if (!str) return false;
      // Negation without operator
      if (str.startsWith('!') && !/[=<>]/.test(str)) {
        const name = str.slice(1).trim();
        return !Boolean(evalValue(name));
      }
      // Comparison
      const m = str.match(/^(.*?)\s*(==|!=|>=|<=|>|<)\s*(.*)$/);
      if (m) {
        const lhsName = m[1].trim();
        const op = m[2];
        const rhsRaw = m[3];
        const lhsVal = evalValue(lhsName);
        const rhsVal = parseLiteral(rhsRaw);
        const ln = toNum(lhsVal);
        const rn = toNum(rhsVal as any);
        if (ln !== null && rn !== null) {
          switch (op) {
            case '==': return ln === rn;
            case '!=': return ln !== rn;
            case '>': return ln > rn;
            case '>=': return ln >= rn;
            case '<': return ln < rn;
            case '<=': return ln <= rn;
          }
        } else {
          // String/boolean compare using strict equality for ==/!=; other ops false
          switch (op) {
            case '==': return (lhsVal as any) === (rhsVal as any);
            case '!=': return (lhsVal as any) !== (rhsVal as any);
            default: return false;
          }
        }
      }
      // Bare name truthiness
      return Boolean(evalValue(str));
    };

    const orParts = t.split(/\|\|/);
    for (const part of orParts) {
      const andParts = part.split(/&&/);
      let ok = true;
      for (const a of andParts) {
        if (!evalAtomic(a)) { ok = false; break; }
      }
      if (ok) return true;
    }
    return false;
  }

  /** Return instruction for current node without consuming its 'next' */
  private peek(): RenderInstruction {
    const node = this.currentNode();
    if (node.type === 'dialogue') return { kind: 'showDialogue', speaker: node.speaker, text: node.text };
    if (node.type === 'choice') {
      const visible = node.choices.filter(c => {
        const condOk = !c.condition || this.eval(c.condition);
        const visOk = !c.visibleIf || this.eval(c.visibleIf);
        return condOk && visOk;
      });
      const choices = visible.map((c, i) => ({
        text: c.text,
        index: i,
        disabled: c.enabledIf !== undefined ? !this.eval(c.enabledIf) : false,
      }));
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

