import React, { useEffect, useState } from 'react'
import { VNPlayer } from './components/VNPlayer'
import { AutoAssetLoader } from './utils/AssetLoader'
import { NodeVNEngine, loadScript, type EngineContract } from '@vn/core'
import './App.css'

export default function App() {
  const [engine, setEngine] = useState<EngineContract | null>(null)
  const [assets, setAssets] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function initialize() {
      try {
        // Load assets automatically
        const loader = new AutoAssetLoader()
        const loadedAssets = await loader.loadAll()
        setAssets(loadedAssets)

        // Load main script
        const response = await fetch('/scripts/main.json')
        if (!response.ok) {
          throw new Error('Failed to load main script')
        }
        
        const scriptData = await response.json()
        const script = loadScript(scriptData)
        const vnEngine = new NodeVNEngine(script)
        
        setEngine(vnEngine)
        setLoading(false)
      } catch (err) {
        console.error('Initialization error:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setLoading(false)
      }
    }

    initialize()
  }, [])

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading your visual novel...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-screen">
        <h2>⚠️ Loading Error</h2>
        <p>{error}</p>
        <details>
          <summary>Troubleshooting</summary>
          <ul>
            <li>Make sure public/scripts/main.json exists</li>
            <li>Check that your script has valid JSON syntax</li>
            <li>Verify all referenced assets exist in public/assets/</li>
          </ul>
        </details>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    )
  }

  if (!engine) {
    return <div className="error-screen">Engine failed to initialize</div>
  }

  return (
    <div className="app">
      <VNPlayer engine={engine} assets={assets} />
    </div>
  )
}
