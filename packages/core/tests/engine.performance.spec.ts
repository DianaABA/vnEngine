import { describe, it, expect } from 'vitest';
import { VNEngine } from '../src/vnEngineNodeSystem';

describe('VNEngine performance', () => {
  it('traverses 10k dialogue nodes under 50ms', () => {
    const nodes: Record<string, any> = {};
    for (let i = 0; i < 10000; i++) {
      nodes[`d${i}`] = { id: `d${i}`, type: 'dialogue', text: `Hello ${i}`, next: i < 9999 ? `d${i+1}` : undefined };
    }
    nodes['d9999'].next = 'end';
    nodes['end'] = { id: 'end', type: 'end' };
    const script = {
      startScene: 'scene',
      scenes: {
        scene: {
          id: 'scene',
          start: 'd0',
          nodes
        }
      }
    };
    const engine = new VNEngine(script);
    let instr = engine.next();
    const t0 = performance.now();
    for (let i = 0; i < 10000; i++) {
      instr = engine.next();
      instr = engine.proceed();
    }
    const t1 = performance.now();
    expect(t1 - t0).toBeLessThan(50);
    expect(instr).toMatchObject({ kind: 'end' });
  });
});
