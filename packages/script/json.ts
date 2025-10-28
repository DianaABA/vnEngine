import { GameScriptSchema } from './schema';
import { ZodError } from 'zod';

export function loadScriptFromJSON(raw: unknown) {
  const result = GameScriptSchema.safeParse(raw);
  if (result.success) {
    return result.data;
  }
  const errors = result.error.issues.map((e: any) => `${e.path.join('.')}: ${e.message}`);
  throw new Error(`Script validation failed:\n${errors.join('\n')}`);
}
