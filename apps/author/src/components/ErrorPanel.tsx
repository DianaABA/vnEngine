import React from 'react';
import { editor as MonacoEditorType } from 'monaco-editor';

export type DslError = {
  line: number;
  column: number;
  message: string;
  hint?: string;
};
export type JsonError = {
  path: string;
  message: string;
  hint?: string;
};

interface ErrorPanelProps {
  errors: Array<DslError | JsonError>;
  editor?: MonacoEditorType.IStandaloneCodeEditor;
  onGoto?: (pos: { line: number; column?: number }) => void;
}

export const ErrorPanel: React.FC<ErrorPanelProps> = ({ errors, editor, onGoto }) => {
  const handleClick = (err: DslError | JsonError) => {
    if ('line' in err && editor) {
      editor.revealLineInCenter(err.line);
      editor.setPosition({ lineNumber: err.line, column: err.column || 1 });
      editor.focus();
      if (onGoto) onGoto({ line: err.line, column: err.column });
    }
    // For JSON errors, could highlight path if supported
  };

  if (!errors || errors.length === 0) return <div>No errors</div>;

  return (
    <div style={{ color: 'red', padding: 8 }}>
      <ul>
        {errors.map((err, i) => (
          <li key={i} style={{ cursor: 'pointer', marginBottom: 4 }} onClick={() => handleClick(err)}>
            {'line' in err
              ? `Line ${err.line}, Col ${err.column}: ${err.message}${err.hint ? ' (' + err.hint + ')' : ''}`
              : `Path ${err.path}: ${err.message}${err.hint ? ' (' + err.hint + ')' : ''}`}
          </li>
        ))}
      </ul>
    </div>
  );
};
