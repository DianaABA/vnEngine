import React, { useState, useEffect } from 'react';

export interface Assets {
  backgrounds: Record<string, string>;
  sprites: Record<string, Record<string, string>>;
  audio: Record<string, string>;
}

const LOCAL_KEY = 'author:assets';

function loadAssets(): Assets {
  const raw = localStorage.getItem(LOCAL_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {}
  }
  return { backgrounds: {}, sprites: {}, audio: {} };
}

function saveAssets(assets: Assets) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(assets));
}

interface AssetsPanelProps {
  assets: Assets;
  setAssets: (a: Assets) => void;
}

export const AssetsPanel: React.FC<AssetsPanelProps> = ({ assets, setAssets }) => {
  const [localAssets, setLocalAssets] = useState<Assets>(loadAssets());

  useEffect(() => {
    setLocalAssets(assets);
  }, [assets]);

  useEffect(() => {
    saveAssets(localAssets);
    setAssets(localAssets);
  }, [localAssets, setAssets]);

  // Add/remove helpers
  const addRow = (type: keyof Assets) => {
    if (type === 'backgrounds' || type === 'audio') {
      setLocalAssets({
        ...localAssets,
        [type]: { ...localAssets[type], '': '' }
      });
    } else if (type === 'sprites') {
      setLocalAssets({
        ...localAssets,
        sprites: { ...localAssets.sprites, '': { '': '' } }
      });
    }
  };

  const removeRow = (type: keyof Assets, key: string, subkey?: string) => {
    if (type === 'backgrounds' || type === 'audio') {
      const copy = { ...localAssets[type] };
      delete copy[key];
      setLocalAssets({ ...localAssets, [type]: copy });
    } else if (type === 'sprites') {
      const copy = { ...localAssets.sprites };
      if (subkey) {
        const subCopy = { ...copy[key] };
        delete subCopy[subkey];
        copy[key] = subCopy;
      } else {
        delete copy[key];
      }
      setLocalAssets({ ...localAssets, sprites: copy });
    }
  };

  // Validation
  const validateKey = (key: string) => key.trim().length > 0;

  // Render helpers
  const renderRows = (type: keyof Assets) => {
    if (type === 'backgrounds' || type === 'audio') {
      return Object.entries(localAssets[type]).map(([key, url], i) => (
        <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
          <input
            value={key}
            onChange={e => {
              const newKey = e.target.value;
              if (!validateKey(newKey)) return;
              const copy = { ...localAssets[type] };
              copy[newKey] = url;
              if (newKey !== key) delete copy[key];
              setLocalAssets({ ...localAssets, [type]: copy });
            }}
            placeholder="Key"
            style={{ width: 80 }}
          />
          <input
            value={url}
            onChange={e => {
              const copy = { ...localAssets[type] };
              copy[key] = e.target.value;
              setLocalAssets({ ...localAssets, [type]: copy });
            }}
            placeholder="URL"
            style={{ width: 200 }}
          />
          <button onClick={() => removeRow(type, key)}>Remove</button>
          {url && <a href={url} target="_blank" rel="noopener noreferrer">Preview</a>}
        </div>
      ));
    } else if (type === 'sprites') {
      return Object.entries(localAssets.sprites).map(([char, poses], i) => (
        <div key={i} style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              value={char}
              onChange={e => {
                const newChar = e.target.value;
                if (!validateKey(newChar)) return;
                const copy = { ...localAssets.sprites };
                copy[newChar] = poses;
                if (newChar !== char) delete copy[char];
                setLocalAssets({ ...localAssets, sprites: copy });
              }}
              placeholder="Character"
              style={{ width: 80 }}
            />
            <button onClick={() => removeRow('sprites', char)}>Remove Character</button>
          </div>
          {Object.entries(poses).map(([pose, url], j) => (
            <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'center', marginLeft: 16 }}>
              <input
                value={pose}
                onChange={e => {
                  const newPose = e.target.value;
                  if (!validateKey(newPose)) return;
                  const copy = { ...localAssets.sprites };
                  const poseCopy = { ...poses };
                  poseCopy[newPose] = url;
                  if (newPose !== pose) delete poseCopy[pose];
                  copy[char] = poseCopy;
                  setLocalAssets({ ...localAssets, sprites: copy });
                }}
                placeholder="Pose"
                style={{ width: 80 }}
              />
              <input
                value={url}
                onChange={e => {
                  const copy = { ...localAssets.sprites };
                  const poseCopy = { ...poses };
                  poseCopy[pose] = e.target.value;
                  copy[char] = poseCopy;
                  setLocalAssets({ ...localAssets, sprites: copy });
                }}
                placeholder="URL"
                style={{ width: 200 }}
              />
              <button onClick={() => removeRow('sprites', char, pose)}>Remove Pose</button>
              {url && <a href={url} target="_blank" rel="noopener noreferrer">Preview</a>}
            </div>
          ))}
          <button onClick={() => {
            const copy = { ...localAssets.sprites };
            copy[char] = { ...poses, '': '' };
            setLocalAssets({ ...localAssets, sprites: copy });
          }}>Add Pose</button>
        </div>
      ));
    }
    return null;
  };

  return (
    <div style={{ padding: 8 }}>
      <h3>Backgrounds</h3>
      {renderRows('backgrounds')}
      <button onClick={() => addRow('backgrounds')}>Add Background</button>
      <h3>Sprites</h3>
      {renderRows('sprites')}
      <button onClick={() => addRow('sprites')}>Add Character</button>
      <h3>Audio</h3>
      {renderRows('audio')}
      <button onClick={() => addRow('audio')}>Add Audio</button>
    </div>
  );
};
