// Node system interfaces
export interface VNNodeBase {
  id: string;
  next?: string; // id of next node
}

export interface DialogueNode extends VNNodeBase {
  type: 'dialogue';
  speaker?: string;
  text: string;
}

export interface ChoiceOption {
  id: string;
  text: string;
  next: string; // id of next node
}

export interface ChoiceNode extends VNNodeBase {
  type: 'choice';
  options: ChoiceOption[];
}

export interface CommandNode extends VNNodeBase {
  type: 'command';
  command: "setBackground" | "playMusic" | "stopMusic" | "setFlag" | "showSprite" | "hideSprite";
  args?: Record<string, unknown>;
  next?: string;
}

export interface BranchNode extends VNNodeBase {
  type: 'branch';
  condition: string; // e.g. flag or expression
  trueNext: string;
  falseNext: string;
}

export interface EndNode extends VNNodeBase {
  type: 'end';
}

export type VNNode = DialogueNode | ChoiceNode | CommandNode | BranchNode | EndNode;

export interface VNScene {
  id: string;
  nodes: VNNode[];
}

export interface GameScript {
  scenes: VNScene[];
}

// Render instructions
export type RenderInstruction =
  | { type: "showDialogue"; node: DialogueNode }
  | { type: "showChoices"; node: ChoiceNode }
  | { type: "showEnd" }
  | { type: "showCommand"; node: CommandNode }
  | { type: "showBranch"; node: BranchNode }
  | { type: "runCommand", command: "setBackground" | "playMusic" | "stopMusic" | "setFlag" | "showSprite" | "hideSprite", args?: Record<string, unknown> };

// VNEngine class
export class VNEngine {
  getSnapshot(): import('./snapshot').Snapshot {
    return {
      sceneId: this.currentScene?.id || '',
      nodeId: this.currentNode?.id || '',
      flags: { ...this.flags },
      vars: {},
      history: [],
    };
  }

  hydrate(snapshot: import('./snapshot').Snapshot): void {
    if (!this.script) return;
    this.currentScene = this.script.scenes.find(s => s.id === snapshot.sceneId) || null;
    this.currentNode = this.currentScene?.nodes.find(n => n.id === snapshot.nodeId) || null;
    this.flags = { ...snapshot.flags };
    // vars/history can be restored as needed
    this.notifyInstruction();
  }
  // Returns the current render instruction
  getCurrentInstruction(): RenderInstruction | null {
    return this.advance();
  }

  // Simple event system for instruction changes
  private instructionListeners: Array<(instr: RenderInstruction | null) => void> = [];
  onInstruction(listener: (instr: RenderInstruction | null) => void) {
    this.instructionListeners.push(listener);
    return {
      unsubscribe: () => {
        this.instructionListeners = this.instructionListeners.filter(l => l !== listener);
      }
    };
  }

  // Call this after any state change to notify listeners
  private notifyInstruction() {
    const instr = this.getCurrentInstruction();
    this.instructionListeners.forEach(l => l(instr));
  }
  private script: GameScript | null = null;
  private currentScene: VNScene | null = null;
  private currentNode: VNNode | null = null;
  private flags: Record<string, boolean> = {};

  // Simple boolean expression evaluator for branch conditions
  private evalCondition(expr: string): boolean {
    expr = expr.trim();
    if (expr.startsWith('!')) {
      const flag = expr.slice(1);
      return !this.flags[flag];
    }
    return !!this.flags[expr];
  }

  loadScript(script: GameScript, sceneId: string) {
  this.script = script;
  this.currentScene = script.scenes.find(s => s.id === sceneId) || null;
  this.currentNode = this.currentScene?.nodes[0] || null;
  this.notifyInstruction();
  }

  advance(): RenderInstruction | null {
    if (!this.currentNode) return null;
    switch (this.currentNode.type) {
      case 'dialogue':
        return { type: 'showDialogue', node: this.currentNode };
      case 'choice':
        return { type: 'showChoices', node: this.currentNode };
      case 'command': {
        const cmdNode = this.currentNode as CommandNode;
        return { type: 'runCommand', command: cmdNode.command, args: cmdNode.args };
      }
      case 'branch':
        return { type: 'showBranch', node: this.currentNode };
      case 'end':
        return { type: 'showEnd' };
      default:
        return null;
    }
  }

  choose(index: number): RenderInstruction | null {
    if (this.currentNode?.type !== 'choice') return null;
    const option = this.currentNode.options[index];
    if (!option) return null;
    this.currentNode = this.findNodeById(option.next);
    this.notifyInstruction();
    return this.advance();
  }

  next(): RenderInstruction | null {
    if (!this.currentNode) return null;
    if (this.currentNode.type === 'branch') {
      const branch = this.currentNode as BranchNode;
      const result = this.evalCondition(branch.condition);
      this.currentNode = this.findNodeById(result ? branch.trueNext : branch.falseNext);
      this.notifyInstruction();
      return this.advance();
    }
    if (this.currentNode.type === 'command') {
      const cmdNode = this.currentNode as CommandNode;
      // After emitting runCommand, advance to next if exists
      if (cmdNode.next) {
        this.currentNode = this.findNodeById(cmdNode.next);
        this.notifyInstruction();
        return this.advance();
      }
      return null;
    }
    if (!this.currentNode.next) return null;
    this.currentNode = this.findNodeById(this.currentNode.next);
    this.notifyInstruction();
    return this.advance();

  }

  // Alias for next()
  proceed(): RenderInstruction | null {
    return this.next();
  }

  private findNodeById(id: string): VNNode | null {
    if (!this.currentScene) return null;
    return this.currentScene.nodes.find(n => n.id === id) || null;
  }
}
