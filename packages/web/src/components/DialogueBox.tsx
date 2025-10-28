import React from 'react';
import type { DialogueLine } from '@vn/core';

interface Props {
  line: DialogueLine;
  onChoice?: (index: number) => void;
}

export const DialogueBox: React.FC<Props> = ({ line, onChoice }: Props) => (
  <div>
    <strong>{line.character}</strong>
    <p>{line.text}</p>
    {line.choices && line.choices.map((choice: { text: string; next: number }, i: number) => (
      <button key={i} onClick={() => onChoice?.(i)}>{choice.text}</button>
    ))}
  </div>
);
