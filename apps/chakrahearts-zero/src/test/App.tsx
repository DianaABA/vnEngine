import React, { useMemo } from 'react';
import { VNPlayer } from '@vn/renderer-web';
import { NodeVNEngine } from '@vn/core';

// Minimal script for NodeVNEngine: record of scenes and nodes with 'type' fields
const script = {
  scenes: {
    intro: {
      id: 'intro',
      start: 'start',
      nodes: {
        start: { type: 'dialogue', id: 'start', speaker: 'Ava', text: 'Welcome to ChakraHearts Zero!', next: 'line2' },
        line2: { type: 'dialogue', id: 'line2', speaker: 'Kai', text: 'Shall we begin?', next: 'c1' },
        c1: {
          type: 'choice',
          id: 'c1',
          choices: [
            { text: 'Yes!', next: 'end' },
            { text: 'Maybe later', next: 'end' }
          ]
        },
        end: { type: 'end', id: 'end' }
      }
    }
  },
  startScene: 'intro'
} as const;

export function App() {
  const engine = useMemo(() => new NodeVNEngine(script as any), []);
  const assets = useMemo(() => ({ backgrounds: {}, sprites: {}, audio: {} }), []);
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111', color: '#fff' }}>
      {/* Cast to satisfy renderer-web's nominal class type in d.ts */}
      <VNPlayer engine={engine as any} assets={assets} />
    </div>
  );
}
