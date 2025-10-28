import React from 'react';
import { VNEngine } from '@vn/core';
import { VNPlayer } from '@vn/renderer-web';
// Create a simple demo script
const demoScript = {
    startScene: 'main',
    scenes: {
        main: {
            id: 'main',
            start: 'n1',
            nodes: {
                n1: { type: 'dialogue', id: 'n1', speaker: 'System', text: 'Welcome to the VN Engine demo!', next: 'n2' },
                n2: { type: 'end', id: 'n2' }
            }
        }
    }
};
// Create engine instance with demo script
const engine = new VNEngine(demoScript);
export default function App() {
    return (React.createElement("div", { style: { width: '100vw', height: '100vh', background: '#222' } },
        React.createElement(VNPlayer, { engine: engine, assets: {} })));
}
