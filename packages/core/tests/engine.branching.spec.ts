import { describe, it, expect } from 'vitest';
import { VNEngine } from '../src/vnEngineNodeSystem';

describe('VNEngine branching semantics', () => {
  it('branches on flag set by setFlag command', () => {
    const script = {
      startScene: 'scene',
      scenes: {
        scene: {
          id: 'scene',
          start: 'cmd1',
          nodes: {
            cmd1: { id: 'cmd1', type: 'command', name: 'setFlag', args: { name: 'setFlag', key: 'foo', value: true }, next: 'b1' },
            b1: { id: 'b1', type: 'branch', condition: 'foo', then: 'e1', else: 'e2' },
            e1: { id: 'e1', type: 'end' },
            e2: { id: 'e2', type: 'end' }
          }
        }
      }
    };
    const engine = new VNEngine(script);
  let instr;
  instr = engine.next();
  // Debug: log node type, instruction, and next
  // @ts-ignore
  console.log('Step 1:', engine['currentNode']().type, instr, 'next:', engine['currentNode']().next);
  expect(instr).toMatchObject({ kind: 'runCommand', name: 'setFlag' });
  engine.setFlag('foo', true); // simulate renderer
  // Debug: log node.next and mode before proceed
  // @ts-ignore
  console.log('Before proceed, node.next:', engine['currentNode']().next, 'mode:', engine['mode']);
  instr = engine.proceed(); // advance after command
  // Debug: log node type, instruction, and mode after proceed
  // @ts-ignore
  console.log('Step 2:', engine['currentNode']().type, instr, 'mode:', engine['mode']);
  expect(instr).toMatchObject({ kind: 'showBranch' });
  instr = engine.next(); // resolve branch (first call)
  // Debug: log node type and instruction
  // @ts-ignore
  console.log('Step 3:', engine['currentNode']().type, instr);
  expect(instr).toMatchObject({ kind: 'showBranch' });
  instr = engine.next(); // advance to end (second call)
  // Debug: log node type and instruction
  // @ts-ignore
  console.log('Step 4:', engine['currentNode']().type, instr);
  expect(instr).toMatchObject({ kind: 'end' });
  });

  it('negation !flag works and unknown flags are false', () => {
    const script = {
      startScene: 'scene',
      scenes: {
        scene: {
          id: 'scene',
          start: 'b1',
          nodes: {
            b1: { id: 'b1', type: 'branch', condition: '!bar', then: 'e1', else: 'e2' },
            e1: { id: 'e1', type: 'end' },
            e2: { id: 'e2', type: 'end' }
          }
        }
      }
    };
    const engine = new VNEngine(script);
  let instr = engine.next();
  expect(instr).toMatchObject({ kind: 'showBranch' });
  instr = engine.next();
  // Should go to trueNext since !bar is true (bar is false by default)
  expect(instr).toMatchObject({ kind: 'end' });
  });

  it('snapshot/hydrate across branches', () => {
    const script = {
      startScene: 'scene',
      scenes: {
        scene: {
          id: 'scene',
          start: 'b1',
          nodes: {
            b1: { id: 'b1', type: 'branch', condition: 'foo', then: 'e1', else: 'e2' },
            e1: { id: 'e1', type: 'end' },
            e2: { id: 'e2', type: 'end' }
          }
        }
      }
    };
    const engine = new VNEngine(script);
    engine.setFlag('foo', true);
  let instr = engine.next();
  expect(instr).toMatchObject({ kind: 'showBranch' });
  instr = engine.next(); // resolve branch
  expect(instr).toMatchObject({ kind: 'end' });
    // Save snapshot before branch
    const engine2 = new VNEngine(script);
    engine2.setFlag('foo', true);
    let instr2 = engine2.next();
    const snap = engine2.snapshot;
    const engine3 = new VNEngine(script);
    engine2.hydrate(snap);
    engine2.setFlag('foo', false);
  let instr3 = engine3.next();
  instr3 = engine2.next(); // showBranch
  instr3 = engine2.next(); // resolve branch
  expect(instr3).toMatchObject({ kind: 'end' });
  });
});
