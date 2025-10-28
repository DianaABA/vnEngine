import React, { useState, useEffect, useCallback } from 'react';
import { RenderInstruction } from '@vn/core';

export interface VNPlayerProps {
  engine: any;
  assets: {
    backgrounds?: Record<string, string>;
    sprites?: Record<string, string>;
    audio?: Record<string, string>;
  };
}
import { Background } from './Background';
import { Sprites } from './Sprites';
import { AudioPlayer } from './AudioPlayer';

export const VNPlayer: React.FC<VNPlayerProps> = ({ engine, assets }) => {
  const [instruction, setInstruction] = useState<RenderInstruction | null>(null);
  // flags removed (unused)
  const [bgKey, setBgKey] = useState<string>('');
  const [sprites, setSprites] = useState<any[]>([]);
  const [audio, setAudio] = useState<string>('');
  const [isCommandRunning, setIsCommandRunning] = useState(false);
  const proceedGuard = React.useRef(false);

  useEffect(() => {
    setInstruction(engine.getCurrentInstruction());
    const sub = engine.onInstruction((instr: RenderInstruction) => setInstruction(instr));
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
    if ('kind' in instruction && instruction.kind === 'runCommand') {
      setIsCommandRunning(true);
      if (!proceedGuard.current) {
        proceedGuard.current = true;
        const { name, args } = instruction;
        switch (name) {
          case 'setBackground':
            setBgKey((args as any).key || '');
            break;
          case 'showSprite':
            setSprites((prev) => [...prev, args]);
            break;
          case 'hideSprite':
            setSprites((prev) => prev.filter(s => s.id !== (args as any).id));
            break;
          case 'playMusic':
            setAudio((args as any).idOrUrl || '');
            break;
          case 'stopMusic':
            setAudio('');
            break;
          case 'setFlag':
            // Flag logic can be handled by engine or omitted here
            break;
          default:
            break;
        }
        setTimeout(() => {
          engine.proceed();
          setIsCommandRunning(false);
          proceedGuard.current = false;
        }, 0);
      }
    } else {
      setIsCommandRunning(false);
      proceedGuard.current = false;
    }
  }, [instruction, engine]);

  // Keyboard UX
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!instruction || isCommandRunning) return;
      if ('kind' in instruction && instruction.kind === 'showDialogue' && (e.key === ' ' || e.key === 'Enter')) {
        handleNext();
      }
      if ('kind' in instruction && instruction.kind === 'showChoices' && /^[1-9]$/.test(e.key)) {
        handleChoice(Number(e.key) - 1);
      }
      if ('kind' in instruction && instruction.kind === 'showChoices' && e.key === 'Escape') {
        handleNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [instruction, handleNext, handleChoice, isCommandRunning]);

  if (!instruction) return <div>Loading...</div>;

  if ('kind' in instruction) {
    switch (instruction.kind) {
    case 'showDialogue': {
      return (
        <div className="flex flex-col items-center justify-end h-full w-full p-4">
          <Background currentKey={bgKey} assets={assets.backgrounds} />
          <Sprites sprites={sprites} assets={assets.sprites} />
          <AudioPlayer trackId={audio} assets={assets.audio} />
          <div className="bg-black bg-opacity-70 text-white rounded p-4 w-full max-w-xl mb-8">
            <div className="font-bold" aria-label="Speaker">{instruction.speaker || 'Narrator'}</div>
            <div className="mt-2" aria-label="Dialogue">{instruction.text}</div>
            <button className="mt-4 px-4 py-2 bg-blue-600 rounded focus:outline-none focus:ring" onClick={handleNext} aria-label="Next">Next</button>
          </div>
        </div>
      );
    }
    case 'showChoices': {
      return (
        <div className="flex flex-col items-center justify-end h-full w-full p-4">
          <Background currentKey={bgKey} assets={assets.backgrounds} />
          <Sprites sprites={sprites} assets={assets.sprites} />
          <AudioPlayer trackId={audio} assets={assets.audio} />
          <div className="bg-black bg-opacity-70 text-white rounded p-4 w-full max-w-xl mb-8">
            <div className="font-bold mb-2">Choose:</div>
            {instruction.choices.map((choice, i) => (
              <button key={i} className="mb-2 px-4 py-2 bg-green-600 rounded focus:outline-none focus:ring" onClick={() => handleChoice(i)} aria-label={`Choice ${i+1}`}>{i+1}. {choice.text}</button>
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
  }
  return null;
};
