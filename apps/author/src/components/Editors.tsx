import React, { useState, useRef, useEffect } from 'react';
import MonacoEditor, { Monaco } from '@monaco-editor/react';
import { useMonacoDsl } from '../monacoDsl';
// @ts-ignore: Use built output for runtime and types
import { loadScript } from '../../../packages/script/dist/index';

interface EditorsProps {
  tab: 'json' | 'dsl';
  value: string;
  setValue: (v: string) => void;
  setGraph: (g: any) => void;
  setError: (e: any) => void;
}

export const Editors: React.FC<EditorsProps> = ({ tab, value, setValue, setGraph, setError }) => {
  const monacoRef = useRef<typeof import('monaco-editor') | null>(null);

  // Debounce compile/validate
  useEffect(() => {
    const handler = setTimeout(() => {
      try {
        if (tab === 'json') {
          const graph = loadScript(value, 'json');
          setGraph(graph);
          setError(null);
        } else {
          const graph = loadScript(value, 'dsl');
          setGraph(graph);
          setError(null);
        }
      } catch (e: any) {
        setError(e);
      }
    }, 250);
    return () => clearTimeout(handler);
  }, [value, tab, setGraph, setError]);

  return (
    <div style={{ height: '100%' }}>
      <MonacoEditor
        height="100%"
        defaultLanguage={tab === 'json' ? 'json' : 'vn-dsl'}
        value={value}
  onChange={(v: string | undefined) => setValue(v || '')}
            onMount={(_editor: any, monaco: typeof import('monaco-editor')) => {
              monacoRef.current = monaco;
              useMonacoDsl(monaco);
            }}
        options={{ fontSize: 16, minimap: { enabled: false } }}
      />
    </div>
  );
};
