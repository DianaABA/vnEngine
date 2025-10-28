import React, { useMemo } from 'react';
import { VNEngine } from '@vn/core';
import { VNPlayerLite } from './VNPlayerLite';
import episode from './scripts/episode1.json';
import { loadEngineScript } from './lib/loadEngineScript';

export default function App() {
  // Minimal inline script matching VNEngine constructor shape
  const engine = useMemo(() => new VNEngine(loadEngineScript(episode)), []);

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
