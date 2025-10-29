import React from 'react';
import { VNPlayer } from '@vn/renderer-web';
import type { GameScript } from '@vn/core';

// Minimal script: two lines, a choice, then end.
const script: GameScript = {
  scenes: [
    {
      id: 'intro',
      nodes: {
        start: { id: 'start', kind: 'dialogue', speaker: 'Ava', text: 'Welcome to ChakraHearts Zero!' , next: 'line2' },
        line2: { id: 'line2', kind: 'dialogue', speaker: 'Kai', text: 'Shall we begin?', next: 'c1' },
        c1: {
          id: 'c1',
          kind: 'choice',
          choices: [
            { id: 'yes', text: 'Yes!', next: 'end' },
            { id: 'no', text: 'Maybe later', next: 'end' }
          ]
        },
        end: { id: 'end', kind: 'end' }
      },
      start: 'start'
    }
  ],
  startScene: 'intro'
};

export function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111', color: '#fff' }}>
      <VNPlayer script={script} />
    </div>
  );
}
