import { DialogueNode, ChoiceNode, CommandNode, BranchNode, EndNode, VNNode, VNScene, GameScript } from '../src/vnEngineNodeSystem';

export function makeDialogue(id: string, text: string, next?: string): DialogueNode {
  return { id, type: 'dialogue', text, next };
}

export function makeChoice(id: string, options: { id: string; text: string; next: string }[]): ChoiceNode {
  return { id, type: 'choice', options };
}

export function makeCommand(id: string, name: CommandNode['name'], args?: CommandNode['args'], next?: string): CommandNode {
  return { id, type: 'command', name, args, next };
}

export function makeBranch(id: string, condition: string, trueNext: string, falseNext: string): BranchNode {
  return { id, type: 'branch', condition, trueNext, falseNext };
}

export function makeEnd(id: string): EndNode {
  return { id, type: 'end' };
}

export function makeScript({ scenes }: { scenes: VNScene[] }): GameScript {
  return { scenes };
}
