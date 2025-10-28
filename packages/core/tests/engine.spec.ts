import { describe, it, expect } from 'vitest';
import { VNEngine } from '../src/vnEngineNodeSystem';
import { GameScript, RenderInstruction } from '../src/vnEngineNodeSystem';
import { Snapshot } from '../src/snapshot';

const sampleScript: GameScript = {
  scenes: [
    {
      id: 'scene1',
      nodes: [
        { id: 'd1', type: 'dialogue', text: 'Hello', next: 'c1' },
        { id: 'c1', type: 'choice', options: [
          { id: 'o1', text: 'Go left', next: 'e1' },
          { id: 'o2', text: 'Go right', next: 'e2' }
        ] },
        { id: 'e1', type: 'end' },
        { id: 'e2', type: 'end' }
      ]
    }
  ]
};

const commandScript: GameScript = {
  scenes: [
    {
      id: 'scene2',
      nodes: [
        { id: 'cmd1', type: 'command', command: 'setBackground', args: { key: 'bg1' }, next: 'd2' },
        { id: 'd2', type: 'dialogue', text: 'After command', next: 'e3' },
        { id: 'e3', type: 'end' }
      ]
    }
  ]
};

describe('VNEngine traversal', () => {
  it('advances dialogue then choice', () => {
    const engine = new VNEngine();
    engine.loadScript(sampleScript, 'scene1');
    let instr = engine.advance();
    expect(instr).toEqual({ type: 'showDialogue', node: expect.objectContaining({ text: 'Hello' }) });
    instr = engine.next();
    expect(instr).toEqual({ type: 'showChoices', node: expect.objectContaining({ options: [
      { id: 'o1', text: 'Go left', next: 'e1' },
      { id: 'o2', text: 'Go right', next: 'e2' }
    ] }) });
  });

  it('choose branches correctly', () => {
    const engine = new VNEngine();
    engine.loadScript(sampleScript, 'scene1');
    engine.advance();
    engine.next();
    let instr = engine.choose(0);
    expect(instr).toEqual({ type: 'showEnd' });
    engine.loadScript(sampleScript, 'scene1');
    engine.advance();
    engine.next();
    instr = engine.choose(1);
    expect(instr).toEqual({ type: 'showEnd' });
  });

  it('emits runCommand without mutating core state', () => {
    const engine = new VNEngine();
    engine.loadScript(commandScript, 'scene2');
    let instr = engine.advance();
    expect(instr).toEqual({ type: 'runCommand', command: 'setBackground', args: { key: 'bg1' } });
    // After runCommand, next should move to dialogue
    instr = engine.next();
    expect(instr).toEqual({ type: 'showDialogue', node: expect.objectContaining({ text: 'After command' }) });
  });

  it('snapshot -> hydrate restores exact location', () => {
    const engine = new VNEngine();
    engine.loadScript(sampleScript, 'scene1');
    engine.advance();
    engine.next();
    engine.choose(1); // Go right
    const snap: Snapshot = engine.getSnapshot();
    const engine2 = new VNEngine();
    engine2.loadScript(sampleScript, 'scene1');
    engine2.hydrate(snap);
    expect(engine2.advance()).toEqual({ type: 'showEnd' });
  });

  it('flags affect branch condition', () => {
    const branchScript: GameScript = {
      scenes: [
        {
          id: 'scene3',
          nodes: [
            { id: 'cmd2', type: 'command', command: 'setFlag', args: { flag: 'foo' }, next: 'b1' },
            { id: 'b1', type: 'branch', condition: 'foo', trueNext: 'e4', falseNext: 'e5' },
            { id: 'e4', type: 'end' },
            { id: 'e5', type: 'end' }
          ]
        }
      ]
    };
    const engine = new VNEngine();
    engine.loadScript(branchScript, 'scene3');
    let instr = engine.advance();
    expect(instr).toEqual({ type: 'runCommand', command: 'setFlag', args: { flag: 'foo' } });
    // Simulate command execution
    engine['flags']['foo'] = true;
    instr = engine.next();
    expect(instr).toEqual({ type: 'showBranch', node: expect.objectContaining({ condition: 'foo' }) });
    instr = engine.next();
    expect(instr).toEqual({ type: 'showEnd' });
  });
});
