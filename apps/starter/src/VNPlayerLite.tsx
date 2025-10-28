import React, { useState } from 'react';
import type { RenderInstruction } from '@vn/core';
import type { VNEngine } from '@vn/core';

type Props = { engine: VNEngine };

export function VNPlayerLite({ engine }: Props) {
  const [instruction, setInstruction] = useState<RenderInstruction | null>(engine.next());

  const handleNext = () => setInstruction(engine.next());
  const handleChoose = (i: number) => setInstruction(engine.choose(i));

  if (!instruction) return <div>Game Over</div>;

  switch (instruction.kind) {
    case 'showDialogue':
      return (
        <div>
          <div><strong>{instruction.speaker ?? 'Narrator'}</strong></div>
          <div style={{ marginTop: 8 }}>{instruction.text}</div>
          <button style={{ marginTop: 12 }} onClick={handleNext}>Next</button>
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
        </div>
      );
    case 'end':
      return <div>The End</div>;
    default:
      return <div>Unknown instruction</div>;
  }
}
