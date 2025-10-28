import React, { useMemo } from 'react';
import { VNEngine } from '@vn/core';
import { VNPlayerLite } from './VNPlayerLite';

export default function App() {
  // Minimal inline script matching VNEngine constructor shape
  const engine = useMemo(() => {
    const script = {
      startScene: 'main',
      scenes: {
        main: {
          id: 'main',
          start: 'n1',
          nodes: {
            n1: { type: 'dialogue', id: 'n1', speaker: 'Alice', text: 'Welcome to your VN starter!', next: 'n2' },
            n2: { type: 'choice', id: 'n2', choices: [{ text: 'Continue', next: 'n3' }] },
            n3: { type: 'dialogue', id: 'n3', text: 'Replace this with your own script.', next: 'n4' },
            n4: { type: 'end', id: 'n4' },
          },
        },
      },
    } as const;
    return new VNEngine(script);
  }, []);

  return (
    <div style={{ maxWidth: 720, margin: '2rem auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1>VN Starter</h1>
      <p style={{ color: '#666' }}>
        Edit <code>apps/starter/src/App.tsx</code> to change the inline script or load one from JSON.
      </p>
      <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: 8 }}>
        <VNPlayerLite engine={engine} />
      </div>
    </div>
  );
}
