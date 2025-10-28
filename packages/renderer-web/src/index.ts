// Copilot prompt — renderer-web public API
// Export VNPlayer component, Ports types (BgPort, SpritePort, AudioPort), and useCommandDispatcher.
export { VNPlayer } from '../VNPlayer';
export type { BgPort, SpritePort, AudioPort } from '@vn/core';
export { runCommand, runAndProceed, shouldAllowNextKey } from '../commandDispatcher';
