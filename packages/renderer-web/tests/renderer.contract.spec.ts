
import { describe, it, expect, vi } from 'vitest';
import { VNEngine } from '../../core/src/vnEngineNodeSystem';

describe('Renderer contract', () => {
  it('calls engine.proceed() exactly once per command', () => {
    // Minimal VNEngine script with a command node
    const script = {
      startScene: 'scene1',
      scenes: {
        scene1: {
          id: 'scene1',
          start: 'cmd1',
          nodes: {
            cmd1: { id: 'cmd1', type: 'command', name: 'setBackground', args: { name: 'setBackground', key: 'bg1' }, next: 'd1' },
            d1: { id: 'd1', type: 'dialogue', text: 'After command', next: 'e1' },
            e1: { id: 'e1', type: 'end' }
          }
        }
      }
    };
    const engine = new VNEngine(script);
    let instr = engine.next();
    expect(instr).toMatchObject({ kind: 'runCommand', name: 'setBackground', args: { name: 'setBackground', key: 'bg1' } });

    // Simulate renderer handling the command and calling proceed exactly once
    instr = engine.proceed();
    expect(instr).toMatchObject({ kind: 'showDialogue', text: 'After command' });
    instr = engine.proceed();
    expect(instr).toMatchObject({ kind: 'end' });
  });

  it('ignores Space/Enter during runCommand (no skip)', () => {
    const script = {
      startScene: 'scene1',
      scenes: {
        scene1: {
          id: 'scene1',
          start: 'cmd1',
          nodes: {
            cmd1: { id: 'cmd1', type: 'command', name: 'setBackground', args: { name: 'setBackground', key: 'bg1' }, next: 'd1' },
            d1: { id: 'd1', type: 'dialogue', text: 'After command', next: 'e1' },
            e1: { id: 'e1', type: 'end' }
          }
        }
      }
    };
    const engine = new VNEngine(script);
    let instr = engine.next();
    expect(instr).toMatchObject({ kind: 'runCommand', name: 'setBackground', args: { name: 'setBackground', key: 'bg1' } });

    // Simulate user pressing Space/Enter (should not advance)
    expect(engine.next()).toMatchObject({ kind: 'runCommand', name: 'setBackground', args: { name: 'setBackground', key: 'bg1' } });
    // Only proceed() advances
    instr = engine.proceed();
    expect(instr).toMatchObject({ kind: 'showDialogue', text: 'After command' });
  });
});

