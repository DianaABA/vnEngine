import React, { useState, useRef, useEffect } from 'react';
import { Editors } from './components/Editors';
import { Toolbar } from './components/Toolbar';
import { AssetsPanel } from './components/AssetsPanel';
import { ErrorPanel } from './components/ErrorPanel';
import { useWorkspace } from './state/useWorkspace';
// import VNPlayer from './components/VNPlayer'; // TODO: implement VNPlayer
import { VNEngine } from '../../../packages/core/src/vnEngineNodeSystem';

const App: React.FC = () => {
  const { state, dispatch, reset, importWorkspace, exportWorkspace } = useWorkspace();
  const [graph, setGraph] = useState<any | null>(null);
  const [error, setError] = useState<any | null>(null);
  const [engine, setEngine] = useState<any | null>(null);
  const [assets, setAssets] = useState(state.assets);
  const [autoAdvance, setAutoAdvance] = useState(false);

  // Live preview glue: create engine on valid graph
  useEffect(() => {
    if (graph && !error) {
      const engineInstance = new VNEngine(graph, { sceneId: state.startScene });
      setEngine(engineInstance);
    }
  }, [graph, error, state.startScene]);

  // Keep last-good engine if error
  useEffect(() => {
    if (error) {
      // Do not update engine
    }
  }, [error]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        // Export compiled JSON
        const data = exportWorkspace();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'compiled.json';
        a.click();
        URL.revokeObjectURL(url);
      }
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        // Restart engine
        if (graph) {
          const engineInstance = new VNEngine(graph, { sceneId: state.startScene });
          setEngine(engineInstance);
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [graph, state.startScene, exportWorkspace]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left: Editor Tabs */}
      <div style={{ flex: 1, borderRight: '1px solid #ccc', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
          <button onClick={() => dispatch({ type: 'setTab', tab: 'dsl' })}>DSL</button>
          <button onClick={() => dispatch({ type: 'setTab', tab: 'json' })}>JSON</button>
        </div>
        <div style={{ flex: 1 }}>
          <Editors
            tab={state.activeTab}
            value={state.activeTab === 'json' ? state.jsonText : state.dslText}
            setValue={v => dispatch({ type: state.activeTab === 'json' ? 'setJsonText' : 'setDslText', text: v })}
            setGraph={setGraph}
            setError={setError}
          />
        </div>
        <AssetsPanel assets={assets} setAssets={setAssets} />
      </div>
      {/* Right: Preview */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Toolbar
          scenes={graph?.scenes?.map((s: any) => s.id) || []}
          languages={["en", "nl"]}
          currentScene={state.startScene}
          currentLanguage={state.language}
          autoAdvance={autoAdvance}
          onPlayPause={setAutoAdvance}
          onRestart={() => {
            if (graph) {
              const engineInstance = new VNEngine(graph, { sceneId: state.startScene });
              setEngine(engineInstance);
            }
          }}
          onSceneChange={scene => dispatch({ type: 'setStartScene', scene })}
          onLanguageChange={lang => dispatch({ type: 'setLanguage', language: lang })}
        />
        <div style={{ flex: 1, padding: 16 }}>
          {/* TODO: VNPlayer Preview */}
          {/* <VNPlayer engine={engine} assets={assets} language={state.language} autoAdvance={autoAdvance} /> */}
          VNPlayer Preview
        </div>
        <div style={{ borderTop: '1px solid #ccc', padding: 8 }}>
          <ErrorPanel errors={error ? [error] : []} />
        </div>
      </div>
    </div>
  );
};

export default App;
