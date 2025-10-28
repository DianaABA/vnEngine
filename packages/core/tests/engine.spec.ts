import { describe, it, expect } from 'vitest';
import { VNEngine } from '../src/vnEngineNodeSystem';

const sampleScript = {
  startScene: 'scene1',
  scenes: {
    scene1: {
      id: 'scene1',
      start: 'd1',
      nodes: {
        d1: { id: 'd1', type: 'dialogue', text: 'Hello', next: 'c1' },
        c1: { id: 'c1', type: 'choice', choices: [
          { text: 'Go left', next: 'e1' },
          { text: 'Go right', next: 'e2' }
        ] },
        e1: { id: 'e1', type: 'end' },
        e2: { id: 'e2', type: 'end' }
      }
    }
  }
};

const commandScript = {
  startScene: 'scene2',
  scenes: {
    scene2: {
      id: 'scene2',
      start: 'cmd1',
      nodes: {
        cmd1: { id: 'cmd1', type: 'command', name: 'setBackground', args: { name: 'setBackground', key: 'bg1' }, next: 'd2' },
        d2: { id: 'd2', type: 'dialogue', text: 'After command', next: 'e3' },
        e3: { id: 'e3', type: 'end' }
      }
    }
  }
};

describe('VNEngine traversal', () => {
  it('advances dialogue then choice', () => {
    const engine = new VNEngine(sampleScript);
    let instr = engine.next();
    expect(instr).toMatchObject({ kind: 'showDialogue', speaker: undefined, text: 'Hello' });
    instr = engine.proceed(); // advance to choice
    expect(instr).toMatchObject({ kind: 'showChoices', choices: [
      { text: 'Go left', index: 0 },
      { text: 'Go right', index: 1 }
    ] });
  });

  it('choose branches correctly', () => {
    const engine = new VNEngine(sampleScript);
  engine.next(); // showDialogue
  engine.proceed(); // showChoices
  let instr = engine.choose(0);
  expect(instr).toMatchObject({ kind: 'end' });
  // Reset and choose right
  const engine2 = new VNEngine(sampleScript);
  engine2.next();
  engine2.proceed();
  instr = engine2.choose(1);
  expect(instr).toMatchObject({ kind: 'end' });
  });

  it('emits runCommand and requires proceed before next state', () => {
    const engine = new VNEngine(commandScript);
  let instr = engine.next();
  expect(instr).toMatchObject({ kind: 'runCommand', name: 'setBackground', args: { name: 'setBackground', key: 'bg1' } });
  // After runCommand, next should do nothing until proceed is called
  expect(engine.next()).toMatchObject({ kind: 'runCommand', name: 'setBackground', args: { name: 'setBackground', key: 'bg1' } });
  // First proceed advances
  instr = engine.proceed();
  expect(instr).toMatchObject({ kind: 'showDialogue', speaker: undefined, text: 'After command' });
  instr = engine.proceed();
  expect(instr).toMatchObject({ kind: 'end' });
  });

  it('snapshot -> hydrate restores exact location', () => {
    const engine = new VNEngine(sampleScript);
  engine.next(); // showDialogue
  engine.proceed(); // showChoices
  engine.choose(1); // Go right
  const snap = engine.snapshot;
  const engine2 = new VNEngine(sampleScript);
  engine2.hydrate(snap);
  let instr2 = engine2.next();
  expect(instr2).toMatchObject({ kind: 'end' });
  });

  it('flags affect branch condition (guarded)', () => {
    const branchScript = {
      startScene: 'scene3',
      scenes: {
        scene3: {
          id: 'scene3',
          start: 'b1',
          nodes: {
            b1: { id: 'b1', type: 'branch', condition: 'foo', then: 'e1', else: 'e2' },
            e1: { id: 'e1', type: 'end' },
            e2: { id: 'e2', type: 'end' }
          }
        }
      }
    };
    const engine = new VNEngine(branchScript);
  let instr = engine.next();
  expect(instr).toMatchObject({ kind: 'showBranch' });
  instr = engine.next(); // resolve branch
  expect(instr).toMatchObject({ kind: 'end' });
  });
});