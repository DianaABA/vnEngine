import { loadScriptFromJSON } from './json';
import { loadScriptFromDSL } from './dsl';

export function loadScript(input: string | object, kind?: 'json' | 'dsl') {
  if (!kind) {
    if (typeof input === 'string') {
      try {
        const parsed = JSON.parse(input);
        return loadScriptFromJSON(parsed);
      } catch {
        return loadScriptFromDSL(input);
      }
    }
    return loadScriptFromJSON(input);
  }
  if (kind === 'json') {
    return loadScriptFromJSON(typeof input === 'string' ? JSON.parse(input) : input);
  }
  return loadScriptFromDSL(typeof input === 'string' ? input : JSON.stringify(input));
}
