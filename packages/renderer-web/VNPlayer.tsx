import React, { useState, useEffect, useCallback } from 'react';
import { VNEngine, RenderInstruction } from '@vn/core/src/vnEngineNodeSystem';
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
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [bgKey, setBgKey] = useState<string>('');
  const [sprites, setSprites] = useState<any[]>([]);
  const [audio, setAudio] = useState<string>('');

  useEffect(() => {
    setInstruction(engine.getCurrentInstruction());
    const sub = engine.onInstruction((instr) => setInstruction(instr));
    return () => sub.unsubscribe();
  }, [engine]);

  const handleNext = useCallback(() => {
    engine.proceed();
  }, [engine]);

  const handleChoice = useCallback((index: number) => {
    engine.choose(index);
  }, [engine]);

  // Command dispatcher
  useEffect(() => {
    if (!instruction) return;
    if (instruction.type === 'runCommand' || (instruction as any).kind === 'runCommand') {
      const cmd = (instruction as any);
      const { command, args } = cmd;
      switch (command) {
        case 'setBackground':
          setBgKey(args?.key || '');
          break;
        case 'showSprite':
          setSprites((prev) => [...prev, args]);
          break;
        case 'hideSprite':
          setSprites((prev) => prev.filter(s => s.id !== args?.id));
          break;
        case 'playMusic':
          setAudio(args?.id || '');
          break;
        case 'stopMusic':
          setAudio('');
          break;
        case 'setFlag':
          setFlags((prev) => ({ ...prev, [args?.flag]: true }));
          break;
        default:
          break;
      }
      setTimeout(() => engine.proceed(), 0);
    }
  }, [instruction, engine]);

  // Keyboard UX
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!instruction) return;
      if (instruction.type === 'showDialogue' && (e.key === ' ' || e.key === 'Enter')) {
        handleNext();
      }
      if (instruction.type === 'showChoices' && /^[1-9]$/.test(e.key)) {
        handleChoice(Number(e.key) - 1);
      }
      if (instruction.type === 'showChoices' && e.key === 'Escape') {
        handleNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [instruction, handleNext, handleChoice]);

  if (!instruction) return <div>Loading...</div>;

  switch (instruction.type) {
    case 'showDialogue': {
      const node = (instruction as any).node;
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
      const node = (instruction as any).node;
      const choices = node.choices as {id: string; text: string}[];
      return (
        <div className="flex flex-col items-center justify-end h-full w-full p-4">
          <Background currentKey={bgKey} assets={assets.backgrounds} />
          <Sprites sprites={sprites} assets={assets.sprites} />
          <AudioPlayer trackId={audio} assets={assets.audio} />
          <div className="bg-black bg-opacity-70 text-white rounded p-4 w-full max-w-xl mb-8">
            <div className="font-bold mb-2">Choose:</div>
            {choices.map((choice: {id: string; text: string}, i: number) => (
              <button key={choice.id} className="mb-2 px-4 py-2 bg-green-600 rounded focus:outline-none focus:ring" onClick={() => handleChoice(i)} aria-label={`Choice ${i+1}`}>{i+1}. {choice.text}</button>
            ))}
          </div>
        </div>
      );
    }
    case 'showCommand':
      return <div>Running command...</div>;
    case 'showEnd':
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
