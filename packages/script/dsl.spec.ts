import { describe, it, expect } from 'vitest';
import { parseDSL } from './dsl';
import { ScriptError } from './validateGraph';

describe('DSL parser diagnostics', () => {
  it('throws error with line/col, token, and hint for malformed line', () => {
    const badDSL = `dialogue: Hello\n  ->`;
    try {
      parseDSL(badDSL);
    } catch (e: any) {
      expect(e).toBeInstanceOf(ScriptError);
      expect(e.message).toMatch(/line/i);
      expect(e.message).toMatch(/token/i);
      expect(e.message).toMatch(/hint/i);
    }
  });

  it('throws error for duplicate node IDs', () => {
    const dupDSL = `id: a\ndialogue: Hello\nid: a\ndialogue: World`;
    try {
      parseDSL(dupDSL);
    } catch (e: any) {
      expect(e).toBeInstanceOf(ScriptError);
      expect(e.message).toMatch(/duplicate/i);
      expect(e.code).toBe('DUPLICATE_NODE_ID');
    }
  });
});
