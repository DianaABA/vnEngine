import React from 'react';

interface ToolbarProps {
  scenes: string[];
  languages: string[];
  currentScene: string;
  currentLanguage: string;
  autoAdvance: boolean;
  onPlayPause: (auto: boolean) => void;
  onRestart: () => void;
  onSceneChange: (scene: string) => void;
  onLanguageChange: (lang: string) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  scenes,
  languages,
  currentScene,
  currentLanguage,
  autoAdvance,
  onPlayPause,
  onRestart,
  onSceneChange,
  onLanguageChange,
}) => {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 8, borderBottom: '1px solid #ccc' }}>
      <button onClick={() => onPlayPause(!autoAdvance)}>
        {autoAdvance ? 'Pause' : 'Play'}
      </button>
      <button onClick={onRestart}>Restart</button>
      <label>
        Start Scene:
        <select value={currentScene} onChange={e => onSceneChange(e.target.value)}>
          {scenes.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </label>
      <label>
        Language:
        <select value={currentLanguage} onChange={e => onLanguageChange(e.target.value)}>
          {languages.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </label>
    </div>
  );
};
