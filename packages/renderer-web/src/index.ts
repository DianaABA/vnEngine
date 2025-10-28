// renderer-web public API
// Export VNPlayer component, port types from core, and command helpers.
export { VNPlayer } from './VNPlayer';
export type { BgPort, SpritePort, AudioPort } from '@vn/core';
export { runCommand, runAndProceed, shouldAllowNextKey } from './commandDispatcher';
