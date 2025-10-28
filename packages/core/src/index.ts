// Copilot prompt — core public API
// Export VNEngine, types (VNNode union, Snapshot, RenderInstruction), and minimal helpers.
// DO NOT import DOM. Keep platform-agnostic.
export { VNEngine } from './vnEngineNodeSystem';
export type { VNNode, DialogueNode, ChoiceNode, CommandNode, BranchNode, EndNode } from './vnEngineNodeSystem';
export type { Snapshot } from './snapshot';
export type { RenderInstruction } from './vnEngineNodeSystem';
export type { DialogueLine } from './DialogueManager';
export type { AudioPort, BgPort, SpritePort } from './ports';
export type { CommandName, CommandArgs } from './commands/registry';
// VN JSON types and helpers
export type { VNEpisode, VNScene, VNLine, VNChoice } from './types';
export { parseEpisode, loadEpisodeToSceneManager } from './parser';
export { loadScript } from './scriptLoader';
// Minimal helpers (add as needed)
