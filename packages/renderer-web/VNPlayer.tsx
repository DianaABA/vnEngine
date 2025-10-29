import React, { useState, useEffect, useCallback } from 'react';
import { NodeVNEngine as VNEngine, RenderInstruction } from '@vn/core';
import { Background } from './Background';
import { Sprites } from './Sprites';
import { AudioPlayer } from './AudioPlayer';

export interface VNPlayerProps {
  engine: VNEngine;
  assets: {
    backgrounds?: Record<string, string>;
    sprites?: Record<string, string>;
    audio?: Record<string, string>;
  };
}

export const VNPlayer: React.FC<VNPlayerProps> = ({ engine, assets }) => {
  const [instruction, setInstruction] = useState<RenderInstruction | null>(null);
  const [, setFlags] = useState<Record<string, boolean>>({});
  const [bgKey, setBgKey] = useState<string>('');
  const [prevBgKey, setPrevBgKey] = useState<string | undefined>(undefined);
  const [bgTransition, setBgTransition] = useState<{ type: 'fade' | 'crossfade'; durationMs: number } | undefined>(undefined);
  type Sprite = { id?: string; [k: string]: any };
  const [sprites, setSprites] = useState<Sprite[]>([]);
  const [audioCmd, setAudioCmd] = useState<any | undefined>(undefined);
  const [busy, setBusy] = useState<boolean>(false);

  // Initialize first instruction
  useEffect(() => {
    try {
      const first = engine.next();
      setInstruction(first);
    } catch (e) {
      console.error(e);
      setInstruction({ kind: 'end' } as RenderInstruction);
    }
  }, [engine]);

  const handleNext = useCallback(() => {
    if (busy) return;
    const instr = engine.proceed();
    setInstruction(instr);
  }, [engine]);

  const handleChoice = useCallback((index: number) => {
    if (busy) return;
    const instr = engine.choose(index);
    setInstruction(instr);
  }, [engine]);

  // Command dispatcher
  useEffect(() => {
    if (!instruction) return;
    if (instruction.kind === 'runCommand') {
      const { name, args } = instruction as any;
      switch (name) {
        case 'setBackground':
          {
            const key = (args as any).key || '';
            const transition = (args as any).transition as { type?: string; durationMs?: number } | undefined;
            setPrevBgKey(bgKey || undefined);
            setBgKey(key);
            if (transition && (transition.type === 'fade' || transition.type === 'crossfade') && transition.durationMs) {
              setBgTransition({ type: (transition.type as any) ?? 'crossfade', durationMs: transition.durationMs });
              setBusy(true);
              setTimeout(() => {
                setBgTransition(undefined);
                setBusy(false);
                const next = engine.proceed();
                setInstruction(next);
              }, transition.durationMs);
              return; // delay proceed until after transition
            }
          }
          break;
        case 'showSprite':
          {
            const t = (args as any).transition as { type?: string; durationMs?: number } | undefined;
            const incoming = { ...(args as any) } as Sprite;
            const exists = (s: Sprite) => s.id === (incoming as any).id;

            if (t && t.type === 'fade' && t.durationMs && !sprites.some(exists)) {
              // Fade-in for new sprite
              const sprite = { ...incoming, opacity: 0, transitionMs: t.durationMs } as Sprite;
              setSprites((prev: Sprite[]) => [...prev, sprite]);
              requestAnimationFrame(() => {
                setSprites((prev: Sprite[]) => prev.map(s => (exists(s) ? { ...s, opacity: 1 } : s)));
              });
              setBusy(true);
              setTimeout(() => {
                setBusy(false);
                const next = engine.proceed();
                setInstruction(next);
              }, t.durationMs);
              return;
            }

            if (t && t.type === 'move' && t.durationMs && sprites.some(exists)) {
              // Movement update for existing sprite
              const duration = t.durationMs;
              setSprites((prev: Sprite[]) => prev.map(s => (exists(s) ? { ...s, ...incoming, transitionMs: duration } : s)));
              setBusy(true);
              setTimeout(() => {
                setBusy(false);
                const next = engine.proceed();
                setInstruction(next);
              }, duration);
              return;
            }

            // Default: add or replace sprite without blocking
            setSprites((prev: Sprite[]) => {
              const idx = prev.findIndex(exists);
              if (idx >= 0) {
                const copy = prev.slice();
                copy[idx] = { ...copy[idx], ...incoming };
                return copy;
              }
              return [...prev, incoming];
            });
          }
          break;
        case 'hideSprite':
          {
            const t = (args as any).transition as { type?: string; durationMs?: number } | undefined;
            const id = (args as any).id as string;
            if (t && t.type === 'fade' && t.durationMs) {
              setSprites((prev: Sprite[]) => prev.map(s => (s.id === id ? { ...s, opacity: 0 } : s)));
              setBusy(true);
              setTimeout(() => {
                setSprites((prev: Sprite[]) => prev.filter(s => s.id !== id));
                setBusy(false);
                const next = engine.proceed();
                setInstruction(next);
              }, t.durationMs);
              return;
            } else {
              setSprites((prev: Sprite[]) => prev.filter((s: Sprite) => s.id !== id));
            }
          }
          break;
        case 'playMusic':
          {
            const a = args as any;
            setAudioCmd({ action: 'play', idOrUrl: a.idOrUrl, loop: a.loop, volume: a.volume, fadeInMs: a.fadeInMs });
          }
          break;
        case 'stopMusic':
          {
            const a = args as any;
            setAudioCmd({ action: 'stop', fadeOutMs: a?.fadeOutMs });
          }
          break;
        case 'setFlag':
          setFlags((prev) => ({ ...prev, [(args as any).key]: (args as any).value }));
          break;
        default:
          break;
      }
      // If we reached here, no delayed transition was used; proceed immediately
      const next = engine.proceed();
      setInstruction(next);
    }
  }, [instruction, engine]);

  // Keyboard UX
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!instruction) return;
      if (instruction.kind === 'showDialogue' && (e.key === ' ' || e.key === 'Enter')) {
        handleNext();
      }
      if (instruction.kind === 'showChoices' && /^[1-9]$/.test(e.key)) {
        handleChoice(Number(e.key) - 1);
      }
      if (instruction.kind === 'showChoices' && e.key === 'Escape') {
        handleNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [instruction, handleNext, handleChoice]);

  if (!instruction) return <div>Loading...</div>;

  switch (instruction.kind) {
    case 'showDialogue': {
      const node = instruction as any;
      return (
        <div className="flex flex-col items-center justify-end h-full w-full p-4">
          <Background currentKey={bgKey} previousKey={prevBgKey} assets={assets.backgrounds} transition={bgTransition} />
          <Sprites sprites={sprites as any} assets={assets.sprites} />
          <AudioPlayer command={audioCmd} assets={assets.audio} />
          <div className="bg-black bg-opacity-70 text-white rounded p-4 w-full max-w-xl mb-8">
            <div className="font-bold" aria-label="Speaker">{node.speaker || 'Narrator'}</div>
            <div className="mt-2" aria-label="Dialogue">{node.text}</div>
            <button className="mt-4 px-4 py-2 bg-blue-600 rounded focus:outline-none focus:ring" onClick={handleNext} aria-label="Next">Next</button>
          </div>
        </div>
      );
    }
    case 'showChoices': {
      const node = instruction as any;
      const choices = (node.choices as Array<{ text: string; index: number }>) || [];
      return (
        <div className="flex flex-col items-center justify-end h-full w-full p-4">
          <Background currentKey={bgKey} previousKey={prevBgKey} assets={assets.backgrounds} transition={bgTransition} />
          <Sprites sprites={sprites as any} assets={assets.sprites} />
          <AudioPlayer command={audioCmd} assets={assets.audio} />
          <div className="bg-black bg-opacity-70 text-white rounded p-4 w-full max-w-xl mb-8">
            <div className="font-bold mb-2">Choose:</div>
            {choices.map((choice, i) => (
              <button key={`${i}-${choice.text}`} className="mb-2 px-4 py-2 bg-green-600 rounded focus:outline-none focus:ring" onClick={() => handleChoice(choice.index)} aria-label={`Choice ${i+1}`}>{i+1}. {choice.text}</button>
            ))}
          </div>
        </div>
      );
    }
    case 'runCommand':
      return <div>Running command...</div>;
    case 'end':
      return (
        <div className="flex flex-col items-center justify-center h-full w-full p-4">
          <Background currentKey={bgKey} previousKey={prevBgKey} assets={assets.backgrounds} transition={bgTransition} />
          <Sprites sprites={[]} assets={assets.sprites} />
          <AudioPlayer command={{ action: 'stop', fadeOutMs: 300 }} assets={assets.audio} />
          <div className="bg-black bg-opacity-80 text-white rounded p-8 w-full max-w-xl">
            <div className="text-2xl font-bold mb-4">The End</div>
            <button className="px-4 py-2 bg-blue-600 rounded focus:outline-none focus:ring" onClick={() => window.location.reload()} aria-label="Restart">Restart</button>
          </div>
        </div>
      );
    default:
      return <div>Unknown instruction</div>;
  }
};
