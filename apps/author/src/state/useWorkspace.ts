import { useReducer, useEffect } from 'react';
import { Assets } from '../components/AssetsPanel';

export type WorkspaceState = {
  activeTab: 'json' | 'dsl';
  jsonText: string;
  dslText: string;
  assets: Assets;
  startScene: string;
  language: string;
};

const LOCAL_KEY = 'author:workspace';

function loadFromLocalStorage(): WorkspaceState {
  const raw = localStorage.getItem(LOCAL_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {}
  }
  return {
    activeTab: 'dsl',
    jsonText: '',
    dslText: '',
    assets: { backgrounds: {}, sprites: {}, audio: {} },
    startScene: '',
    language: 'en',
  };
}

function saveToLocalStorage(state: WorkspaceState) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
}

export type WorkspaceAction =
  | { type: 'setTab'; tab: 'json' | 'dsl' }
  | { type: 'setJsonText'; text: string }
  | { type: 'setDslText'; text: string }
  | { type: 'setAssets'; assets: Assets }
  | { type: 'setStartScene'; scene: string }
  | { type: 'setLanguage'; language: string }
  | { type: 'reset' }
  | { type: 'import'; state: WorkspaceState };

function reducer(state: WorkspaceState, action: WorkspaceAction): WorkspaceState {
  switch (action.type) {
    case 'setTab': return { ...state, activeTab: action.tab };
    case 'setJsonText': return { ...state, jsonText: action.text };
    case 'setDslText': return { ...state, dslText: action.text };
    case 'setAssets': return { ...state, assets: action.assets };
    case 'setStartScene': return { ...state, startScene: action.scene };
    case 'setLanguage': return { ...state, language: action.language };
    case 'reset': return loadFromLocalStorage();
    case 'import': return action.state;
    default: return state;
  }
}

export function useWorkspace() {
  const [state, dispatch] = useReducer(reducer, undefined, loadFromLocalStorage);

  // Autosave every 1s
  useEffect(() => {
    const interval = setInterval(() => {
      saveToLocalStorage(state);
    }, 1000);
    return () => clearInterval(interval);
  }, [state]);

  // Helpers
  const reset = () => dispatch({ type: 'reset' });
  const importWorkspace = (ws: WorkspaceState) => dispatch({ type: 'import', state: ws });
  const exportWorkspace = () => JSON.stringify(state);

  return { state, dispatch, reset, importWorkspace, exportWorkspace };
}
