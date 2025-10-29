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
  type Sprite = { id?: string; [k: string]: any };
  const [sprites, setSprites] = useState<Sprite[]>([]);
  const [audio, setAudio] = useState<string>('');

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
    const instr = engine.proceed();
    setInstruction(instr);
  }, [engine]);

  const handleChoice = useCallback((index: number) => {
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
          setBgKey((args as any).key || '');
          break;
        case 'showSprite':
          setSprites((prev: Sprite[]) => [...prev, args as Sprite]);
          break;
        case 'hideSprite':
          setSprites((prev: Sprite[]) => prev.filter((s: Sprite) => s.id !== (args as any).id));
          break;
        case 'playMusic':
          setAudio((args as any).idOrUrl || '');
          break;
        case 'stopMusic':
          setAudio('');
          break;
        case 'setFlag':
          setFlags((prev) => ({ ...prev, [(args as any).key]: (args as any).value }));
          break;
        default:
          break;
      }
      const next = engine.proceed();
      setInstruction(next);
    }
  }, [instruction, engine]);

  // Keyboard UX
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!instruction) return;
      if ('type' in instruction && instruction.type === 'showDialogue' && (e.key === ' ' || e.key === 'Enter')) {
        handleNext();
      }
      if ('type' in instruction && instruction.type === 'showChoices' && /^[1-9]$/.test(e.key)) {
        handleChoice(Number(e.key) - 1);
      }
      if ('type' in instruction && instruction.type === 'showChoices' && e.key === 'Escape') {
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
          <Background currentKey={bgKey} assets={assets.backgrounds} />
          <Sprites sprites={sprites} assets={assets.sprites} />
          <AudioPlayer trackId={audio} assets={assets.audio} />
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
          <Background currentKey={bgKey} assets={assets.backgrounds} />
          <Sprites sprites={sprites} assets={assets.sprites} />
          <AudioPlayer trackId={audio} assets={assets.audio} />
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
          <Background currentKey={bgKey} assets={assets.backgrounds} />
          <Sprites sprites={[]} assets={assets.sprites} />
          <AudioPlayer trackId={''} assets={assets.audio} />
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
