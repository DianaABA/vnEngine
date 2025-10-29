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
        start: { type: 'command', id: 'start', name: 'setBackground', args: { key: 'bg1', transition: { type: 'crossfade', durationMs: 800 } }, next: 'intro1' },
        intro1: { type: 'dialogue', id: 'intro1', speaker: 'Ava', text: 'Welcome to ChakraHearts Zero! (crossfade bg)', next: 'cam1' },
        cam1: { type: 'command', id: 'cam1', name: 'camera', args: { xPct: 10, yPct: 0, scale: 1.2, durationMs: 1200, easing: 'ease-in-out' }, next: 'intro2' },
  intro2: { type: 'dialogue', id: 'intro2', speaker: 'Kai', text: 'Camera pans and zooms in. A choice will auto-pick after 5s.', next: 'shake1' },
  // Quick shake before the choice
  shake1: { type: 'command', id: 'shake1', name: 'shakeBackground', args: { durationMs: 600, intensity: 8 }, next: 'timer1' },
  timer1: { type: 'command', id: 'timer1', name: 'choiceTimer', args: { timeoutMs: 5000, defaultIndex: 1 }, next: 'choice' },
  choice: { type: 'choice', id: 'choice', choices: [ { text: 'Yes!', next: 'camReset' }, { text: 'Maybe later', next: 'camReset' } ] },
  // Reset camera before ending
  camReset: { type: 'command', id: 'camReset', name: 'camera', args: { xPct: 0, yPct: 0, scale: 1, durationMs: 800, easing: 'ease-out' }, next: 'end' },
  end: { type: 'end', id: 'end' }
      }
    }
  },
  startScene: 'intro'
} as const;

export function App() {
  const engine = useMemo(() => new NodeVNEngine(script as any), []);
  const assets = useMemo(() => ({
    // Use a placeholder background to make camera/transition effects visible
    backgrounds: { bg1: 'https://picsum.photos/1280/720?blur=1' },
    sprites: {},
    audio: {}
  }), []);
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111', color: '#fff' }}>
      <VNPlayer engine={engine} assets={assets} />
    </div>
  );
}
