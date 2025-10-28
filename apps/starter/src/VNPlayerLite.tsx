import React, { useState } from 'react';
import type { RenderInstruction } from '@vn/core';
import type { VNEngine } from '@vn/core';
import { LocalStorageAdapter } from '@vn/storage';

type Props = { engine: VNEngine };

const save = new LocalStorageAdapter();

export function VNPlayerLite({ engine }: Props) {
  const [instruction, setInstruction] = useState<RenderInstruction | null>(engine.next());
  const [slot] = useState('slot1');

  const handleNext = () => setInstruction(engine.next());
  const handleChoose = (i: number) => setInstruction(engine.choose(i));
  const handleSave = () => {
    save.save(slot, engine.snapshot);
    alert('Saved!');
  };
  const handleLoad = () => {
    const snap = save.load(slot);
    if (snap) {
      engine.hydrate(snap as any);
      setInstruction(engine.next());
      alert('Loaded!');
    } else {
      alert('No save found');
    }
  };

  if (!instruction) return <div>Game Over</div>;

  switch (instruction.kind) {
    case 'showDialogue':
      return (
        <div>
          <div><strong>{instruction.speaker ?? 'Narrator'}</strong></div>
          <div style={{ marginTop: 8 }}>{instruction.text}</div>
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <button onClick={handleNext}>Next</button>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleLoad}>Load</button>
          </div>
        </div>
      );
    case 'showChoices':
      return (
        <div>
          <div>Choose:</div>
          {instruction.choices.map((c, idx) => (
            <button key={idx} style={{ display: 'block', marginTop: 8 }} onClick={() => handleChoose(idx)}>
              {idx + 1}. {c.text}
            </button>
          ))}
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleLoad}>Load</button>
          </div>
        </div>
      );
    case 'runCommand':
      // For the starter, immediately proceed to next
      return (
        <div>
          Running command: <code>{instruction.name}</code>
          <div>
            <button style={{ marginTop: 12 }} onClick={handleNext}>Continue</button>
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleLoad}>Load</button>
          </div>
        </div>
      );
    case 'end':
      return <div>The End</div>;
    default:
      return <div>Unknown instruction</div>;
  }
}
