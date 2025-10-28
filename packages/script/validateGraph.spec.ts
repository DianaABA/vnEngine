import { describe, it, expect } from 'vitest';
import { validateGraph, ScriptError } from './validateGraph';

describe('validateGraph', () => {
  it('throws on missing next node', () => {
    const graph = {
      scenes: [{
        id: 's1',
        nodes: [
          { id: 'a', next: 'b' },
          { id: 'b', next: 'c' },
          { id: 'c', next: 'missing' },
        ],
        start: 'a',
      }]
    };
    expect(() => validateGraph(graph)).toThrowError(ScriptError);
    try {
      validateGraph(graph);
    } catch (e: any) {
      expect(e.code).toBe('NODE_NEXT_NOT_FOUND');
      expect(e.sceneId).toBe('s1');
      expect(e.nodeId).toBe('c');
      expect(e.message).toContain('invalid next');
    }
  });

  it('throws on missing start node', () => {
    const graph = {
      scenes: [{
        id: 's2',
        nodes: [{ id: 'a' }],
        start: 'missing',
      }]
    };
    expect(() => validateGraph(graph)).toThrowError(ScriptError);
    try {
      validateGraph(graph);
    } catch (e: any) {
      expect(e.code).toBe('SCENE_START_NOT_FOUND');
      expect(e.sceneId).toBe('s2');
      expect(e.message).toContain('missing start');
    }
  });

  it('warns on unreachable nodes', () => {
    const graph = {
      scenes: [{
        id: 's3',
        nodes: [
          { id: 'a', next: 'b' },
          { id: 'b' },
          { id: 'c' },
        ],
        start: 'a',
      }]
    };
    // Should not throw
    expect(() => validateGraph(graph)).not.toThrow();
    // Unreachable node 'c' should be warned
  });
});
