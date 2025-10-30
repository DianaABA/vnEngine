import React, { useEffect, useMemo, useState } from 'react'
import { VNPlayer } from '@vn/renderer-web'
import { NodeVNEngine, loadScript } from '@vn/core'

// Simplified template-basic app - this is a monorepo demo
// For standalone projects, use: node packages/cli/bin/vn.js create my-project

export default function App() {
  const [engine, setEngine] = useState<any>(null)
  const assets = useMemo(() => ({
    backgrounds: {
      // Add your own files under public/assets/backgrounds and map keys to paths
      room: '/assets/backgrounds/room.jpg',
      street: '/assets/backgrounds/street.jpg'
    },
    sprites: {},
    audio: {}
  }), [])

  useEffect(() => {
    let stop = false
    async function boot() {
      try {
        const resp = await fetch('/scripts/main.json')
        const json = await resp.json()
        const script = loadScript(json)
        const eng = new NodeVNEngine(script)
        if (!stop) setEngine(eng)
      } catch (e) {
        console.error('Failed to load script', e)
      }
    }
    boot()
    return () => { stop = true }
  }, [])

  if (!engine) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '1rem', fontSize: '2rem' }}>🎮</div>
          <div>Loading Visual Novel...</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: '100%' }}>
      <VNPlayer engine={engine} assets={assets} />
    </div>
  )
}
