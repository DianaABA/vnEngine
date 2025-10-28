// Keyboard UX helper: disables 'next' key while in runCommand state
export function shouldAllowNextKey(instr: any): boolean {
  // Only allow 'next' key if not in runCommand state
  return !(instr && instr.kind === 'runCommand');
}
import type { VNEngine } from '@vn/core/src/vnEngineNodeSystem';
import type { CommandName, CommandArgs } from '@vn/core/src/commands/registry';
import type { AudioPort, BgPort, SpritePort } from '@vn/core/src/ports';

export interface CommandContext {
  engine: VNEngine;
  audio: AudioPort;
  bg: BgPort;
  sprite: SpritePort;
}

export function runAndProceed(
  ctx: CommandContext,
  name: CommandName,
  args: CommandArgs
) {
  runCommand(ctx, name, args);
  ctx.engine.proceed();
}

export function runCommand(
  ctx: CommandContext,
  name: CommandName,
  args: CommandArgs
) {
  switch (name) {
    case 'setBackground':
      ctx.bg.setBackground((args as any).key);
      break;
    case 'showSprite':
      ctx.sprite.show((args as any).id, (args as any).pose, (args as any).at);
      break;
    case 'hideSprite':
      ctx.sprite.hide((args as any).id);
      break;
    case 'playMusic':
      ctx.audio.play((args as any).idOrUrl, (args as any).loop);
      break;
    case 'stopMusic':
      ctx.audio.stop((args as any).id);
      break;
    case 'setFlag':
      ctx.engine.setFlag((args as any).key, (args as any).value);
      break;
    default:
      throw new Error(`Unknown command: ${name}`);
  }
}
