import { describe, it, expect } from 'vitest';
import { VNEngine } from '../src/vnEngineNodeSystem';
import { validateCommand } from '../src/commands/registry';

const script = {
  startScene: 'test',
  scenes: {
    test: {
      id: 'test',
      start: 'c1',
      nodes: {
        c1: { id: 'c1', type: 'command', name: 'setBackground', args: { name: 'setBackground', key: 'bg1' }, next: 'c2' },
        c2: { id: 'c2', type: 'command', name: 'setFlag', args: { name: 'setFlag', key: 'flag1', value: true }, next: 'b1' },
        b1: { id: 'b1', type: 'branch', condition: 'flag1', then: 'd1', else: 'd2' },
        d1: { id: 'd1', type: 'dialogue', speaker: '', text: 'Flag set!', next: 'end' },
        d2: { id: 'd2', type: 'dialogue', speaker: '', text: 'Flag not set.', next: 'end' },
        end: { id: 'end', type: 'end' }
      }
    }
  }
};

describe('VNEngine command pipeline', () => {
  it('emits runCommand for setBackground', () => {
    const engine = new VNEngine(script);
    let instr = engine.next();
    expect(instr).toMatchObject({ kind: 'runCommand', name: 'setBackground', args: { name: 'setBackground', key: 'bg1' } });
  });

  it('invalid args throw', () => {
    expect(() => validateCommand('setBackground', {})).toThrow();
    expect(() => validateCommand('setFlag', { name: 'setFlag', key: 'flag1', value: 'notBool' })).toThrow();
  });

  it('setFlag does not auto-mutate engine unless renderer calls setFlag', () => {
    const engine = new VNEngine(script);
    // getFlag is not implemented, so check flags directly
    expect(engine['state'].flags['flag1']).toBeUndefined();
    // Simulate renderer calling setFlag
    engine.setFlag('flag1', true);
    expect(engine['state'].flags['flag1']).toBe(true);
  });
});
