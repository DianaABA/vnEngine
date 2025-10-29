import React, { useState, useEffect, useCallback, useRef } from 'react';
import { EngineContract, RenderInstruction } from '@vn/core';
import { Background } from './Background';
import { Sprites } from './Sprites';
import { AudioPlayer } from './AudioPlayer';

export interface VNPlayerProps {
  engine: EngineContract;
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
  const [bgTransition, setBgTransition] = useState<{ type: 'fade' | 'crossfade' | 'slide'; durationMs: number; direction?: 'left'|'right'|'up'|'down' } | undefined>(undefined);
  const [bgCamera, setBgCamera] = useState<{ xPct?: number; yPct?: number; scale?: number; durationMs?: number; easing?: string } | undefined>(undefined);
  type Sprite = { id?: string; [k: string]: any };
  const [sprites, setSprites] = useState<Sprite[]>([]);
  const [audioCmd, setAudioCmd] = useState<any | undefined>(undefined);
  const [busy, setBusy] = useState<boolean>(false);
  // Backlog of dialogues
  const [backlog, setBacklog] = useState<Array<{ speaker?: string; text: string }>>([]);
  const [backlogOpen, setBacklogOpen] = useState<boolean>(false);
  const lastBacklogKeyRef = useRef<string>('');
  // Auto/Skip
  const [auto, setAuto] = useState<boolean>(false);
  const [autoSpeed, setAutoSpeed] = useState<number>(1); // 1x..3x
  const autoTimerRef = useRef<number | null>(null);
  const [skip, setSkip] = useState<boolean>(false);
  const skipLoopRef = useRef<boolean>(false);
  // Save thumb cache to avoid async races
  const thumbCanvasRef = useRef<HTMLCanvasElement | null>(null);
  // Choice timer
  const [pendingChoiceTimer, setPendingChoiceTimer] = useState<{ timeoutMs: number; defaultIndex?: number } | null>(null);
  const [choiceDeadline, setChoiceDeadline] = useState<number | null>(null);
  const choiceTimerRef = useRef<number | null>(null);
  // For countdown ring animation
  const [nowTs, setNowTs] = useState<number>(Date.now());
  // Typewriter
  const [typewriter, setTypewriter] = useState<boolean>(true);
  const [textSpeed, setTextSpeed] = useState<number>(1); // 0.5x..3x
  const [visibleText, setVisibleText] = useState<string>('');
  const typeTimerRef = useRef<number | null>(null);

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
    // If typewriter is active and not fully revealed, complete instantly instead of proceed
    if (instruction?.kind === 'showDialogue' && typewriter) {
      const node = instruction as any;
      if (visibleText.length < (node.text?.length ?? 0)) {
        setVisibleText(String(node.text || ''));
        return;
      }
    }
    const instr = engine.proceed();
    setInstruction(instr);
  }, [engine, instruction, typewriter, visibleText, busy]);

  const handleChoice = useCallback((index: number) => {
    if (busy) return;
    const instr = engine.choose(index);
    setInstruction(instr);
  }, [engine]);

  // Track dialogue in backlog when instruction changes
  useEffect(() => {
    if (!instruction) return;
    if (instruction.kind === 'showDialogue') {
      const node = instruction as any;
      const key = `${node.speaker || ''}|${node.text}`;
      if (key !== lastBacklogKeyRef.current) {
        lastBacklogKeyRef.current = key;
        setBacklog((prev) => [...prev, { speaker: node.speaker, text: node.text }]);
      }
    }
  }, [instruction]);

  // Command dispatcher
  useEffect(() => {
    if (!instruction) return;
    if (instruction.kind === 'runCommand') {
      const { name, args } = instruction as any;
      switch (name) {
        case 'setBackground':
          {
            const key = (args as any).key || '';
            const transition = (args as any).transition as { type?: string; durationMs?: number; direction?: 'left'|'right'|'up'|'down' } | undefined;
            setPrevBgKey(bgKey || undefined);
            setBgKey(key);
            if (transition && (transition.type === 'fade' || transition.type === 'crossfade' || transition.type === 'slide') && transition.durationMs) {
              setBgTransition({ type: (transition.type as any) ?? 'crossfade', durationMs: transition.durationMs, direction: transition.direction });
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
        case 'camera': {
          const a = args as any;
          const duration = Math.max(0, Number(a?.durationMs ?? 0));
          const easing = String(a?.easing || 'ease');
          setBgCamera({ xPct: a?.xPct, yPct: a?.yPct, scale: a?.scale, durationMs: duration, easing });
          if (duration > 0) {
            setBusy(true);
            setTimeout(() => {
              setBusy(false);
              const next = engine.proceed();
              setInstruction(next);
            }, duration);
            return;
          }
        }
        break;
        case 'choiceTimer': {
          const a = args as any;
          const t = Math.max(0, Number(a?.timeoutMs ?? a?.ms ?? 0));
          if (t > 0) setPendingChoiceTimer({ timeoutMs: t, defaultIndex: typeof a?.defaultIndex === 'number' ? a.defaultIndex : 0 });
          // No blocking; proceed to allow next node (likely a showChoices) to render
        }
        break;
        case 'wait': {
          const ms = Math.max(0, Number((args as any)?.ms ?? (args as any)?.durationMs ?? 0));
          setBusy(true);
          setTimeout(() => {
            setBusy(false);
            const next = engine.proceed();
            setInstruction(next);
          }, ms);
          return;
        }
        case 'changeScene': {
          const a = args as any;
          if (a?.sceneId) {
            try { (engine as any).changeScene(a.sceneId, a.nodeId); } catch (e) { console.error(e); }
          }
          const next = engine.proceed();
          setInstruction(next);
          return;
        }
        case 'shakeBackground': {
          const a = args as any;
          const duration = Math.max(0, Number(a?.durationMs ?? 300));
          const intensity = Math.max(0, Number(a?.intensity ?? 6));
          setBgTransition((t) => t); // no-op to keep type
          // Use a custom event via window to tell Background to shake (simplify without prop drilling state changes)
          const evt = new CustomEvent('vn_bg_shake', { detail: { durationMs: duration, intensity } });
          window.dispatchEvent(evt);
          setBusy(true);
          setTimeout(() => {
            setBusy(false);
            const next = engine.proceed();
            setInstruction(next);
          }, duration);
          return;
        }
        default:
          break;
      }
      // If we reached here, no delayed transition was used; proceed immediately
      const next = engine.proceed();
      setInstruction(next);
    }
  }, [instruction, engine]);

  // Auto-advance effect
  useEffect(() => {
    if (!autoTimerRef.current) {
      // no-op
    } else {
      window.clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }
    if (!auto || backlogOpen) return;
    if (!instruction || instruction.kind !== 'showDialogue') return;
    if (busy) return;
    const node = instruction as any;
    // If typewriter is enabled, delay scales with remaining characters and respects textSpeed
    const base = 600; // ms min hold
    const perChar = 25; // ms per char
    const remaining = typewriter ? Math.max(0, (node.text?.length ?? 0) - visibleText.length) : (node.text?.length ?? 0);
    const delayRaw = base + perChar * remaining;
    const delay = Math.max(300, delayRaw / Math.max(0.25, Math.min(3, autoSpeed * textSpeed)));
    autoTimerRef.current = window.setTimeout(() => {
      handleNext();
    }, delay);
    return () => {
      if (autoTimerRef.current) window.clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    };
  }, [auto, autoSpeed, instruction, busy, backlogOpen, handleNext, typewriter, visibleText, textSpeed]);

  // Typewriter effect per dialogue
  useEffect(() => {
    // Clear any previous timer
    if (typeTimerRef.current) {
      window.clearInterval(typeTimerRef.current);
      typeTimerRef.current = null;
    }
    if (!instruction || instruction.kind !== 'showDialogue') {
      setVisibleText('');
      return;
    }
    const node = instruction as any;
    const full = String(node.text || '');
    if (!typewriter) {
      setVisibleText(full);
      return;
    }
    setVisibleText('');
    if (skip) {
      setVisibleText(full);
      return;
    }
    const msPerChar = 40 / Math.max(0.25, Math.min(3, textSpeed));
    let i = 0;
    typeTimerRef.current = window.setInterval(() => {
      i += 1;
      setVisibleText(full.slice(0, i));
      if (i >= full.length) {
        if (typeTimerRef.current) window.clearInterval(typeTimerRef.current);
        typeTimerRef.current = null;
      }
    }, msPerChar);
    return () => {
      if (typeTimerRef.current) window.clearInterval(typeTimerRef.current);
      typeTimerRef.current = null;
    };
  }, [instruction, typewriter, textSpeed, skip]);

  // Skip loop: fast-forward to next choice or end
  useEffect(() => {
    if (!skip) return;
    if (backlogOpen) return; // don't skip while viewing backlog
    if (!instruction) return;
    if (instruction.kind === 'showChoices' || instruction.kind === 'end') return; // stop at choice/end
    if (busy) return; // wait until transitions end
    if (skipLoopRef.current) return; // avoid re-entrancy
    skipLoopRef.current = true;
    const tick = () => {
      if (!skip) { skipLoopRef.current = false; return; }
      const curr = instructionRef.current;
      if (!curr) { skipLoopRef.current = false; return; }
      if (curr.kind === 'showChoices' || curr.kind === 'end') { skipLoopRef.current = false; return; }
      if (busyRef.current) { setTimeout(tick, 0); return; }
      // Advance
      const next = engine.proceed();
      setInstruction(next);
      setTimeout(tick, 0);
    };
    // Refs for latest busy/instruction inside loop
    setTimeout(tick, 0);
  }, [skip, instruction, busy, engine]);

  // Choice timer behavior on showChoices
  useEffect(() => {
    if (choiceTimerRef.current) {
      window.clearTimeout(choiceTimerRef.current);
      choiceTimerRef.current = null;
      setChoiceDeadline(null);
    }
    if (!instruction || instruction.kind !== 'showChoices') return;
    if (!pendingChoiceTimer) return;
    const now = Date.now();
    const deadline = now + pendingChoiceTimer.timeoutMs;
    setChoiceDeadline(deadline);
    choiceTimerRef.current = window.setTimeout(() => {
      handleChoice(pendingChoiceTimer.defaultIndex ?? 0);
      setPendingChoiceTimer(null);
      setChoiceDeadline(null);
    }, pendingChoiceTimer.timeoutMs);
    return () => {
      if (choiceTimerRef.current) window.clearTimeout(choiceTimerRef.current);
      choiceTimerRef.current = null;
      setChoiceDeadline(null);
    };
  }, [instruction, pendingChoiceTimer, handleChoice]);

  // Animate countdown ring while a timed choice is active
  useEffect(() => {
    if (!instruction || instruction.kind !== 'showChoices') return;
    if (!pendingChoiceTimer || !choiceDeadline) return;
    let raf: number | null = null;
    let stop = false;
    const tick = () => {
      if (stop) return;
      setNowTs(Date.now());
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      stop = true;
      if (raf) cancelAnimationFrame(raf);
    };
  }, [instruction, pendingChoiceTimer, choiceDeadline]);

  const instructionRef = useRef<RenderInstruction | null>(null);
  const busyRef = useRef<boolean>(false);
  useEffect(() => { instructionRef.current = instruction; }, [instruction]);
  useEffect(() => { busyRef.current = busy; }, [busy]);

  // Save/Load helpers
  const makeThumbnail = useCallback(async (): Promise<string> => {
    try {
      const w = 320, h = 180;
      let canvas = thumbCanvasRef.current;
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        thumbCanvasRef.current = canvas;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) return '';
      // Draw background image if available
      const src = assets.backgrounds?.[bgKey] || '';
      if (src) {
        const img = await new Promise<HTMLImageElement>((res, rej) => {
          const im = new Image();
          im.crossOrigin = 'anonymous';
          im.onload = () => res(im);
          im.onerror = rej;
          im.src = src;
        });
        // cover
        const ratio = Math.max(w / img.width, h / img.height);
        const dw = img.width * ratio;
        const dh = img.height * ratio;
        const dx = (w - dw) / 2;
        const dy = (h - dh) / 2;
        ctx.drawImage(img, dx, dy, dw, dh);
      } else {
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, w, h);
      }
      // Overlay dialogue box
      if (instructionRef.current?.kind === 'showDialogue') {
        const node = instructionRef.current as any;
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(8, h - 70, w - 16, 62);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText(node.speaker || 'Narrator', 16, h - 50);
        ctx.font = '12px sans-serif';
        const text = String(node.text || '').slice(0, 80);
        ctx.fillText(text, 16, h - 30);
      }
      return canvas.toDataURL('image/jpeg', 0.8);
    } catch {
      return '';
    }
  }, [assets.backgrounds, bgKey]);

  const handleSave = useCallback(async () => {
    try {
      const snap = (engine as any).snapshot ?? engine.snapshot; // TS type
      const last = backlog[backlog.length - 1];
      const thumb = await makeThumbnail();
      const payload = {
        snapshot: snap,
        meta: {
          t: Date.now(),
          lastLine: last ? `${last.speaker ? last.speaker + ': ' : ''}${last.text}` : '',
          bgKey,
          thumb,
        },
      };
      localStorage.setItem('vn_quick_slot_1', JSON.stringify(payload));
      // Optional: toast
    } catch (e) {
      console.error('Save failed', e);
    }
  }, [engine, backlog, makeThumbnail, bgKey]);

  const handleLoad = useCallback(() => {
    try {
      const raw = localStorage.getItem('vn_quick_slot_1');
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data?.snapshot) {
        (engine as any).hydrate(data.snapshot);
        // Reset UI bits; keep bg/sprites as-is until script updates them
        const next = engine.next();
        setInstruction(next);
      }
    } catch (e) {
      console.error('Load failed', e);
    }
  }, [engine]);

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
      if (e.key.toLowerCase() === 'b') {
        setBacklogOpen((v) => !v);
      }
      if (e.key.toLowerCase() === 'a') {
        setAuto((v) => !v);
      }
      if (e.key.toLowerCase() === 's') {
        setSkip((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [instruction, handleNext, handleChoice]);

  if (!instruction) return <div>Loading...</div>;

  const ControlsBar = (
    <div className="absolute top-2 right-2 flex gap-2">
      <button className="px-3 py-1 bg-gray-800/70 text-white rounded" onClick={() => setBacklogOpen(true)} aria-label="Backlog">Backlog</button>
      <button className={`px-3 py-1 ${auto ? 'bg-blue-700' : 'bg-gray-800/70'} text-white rounded`} onClick={() => setAuto(a => !a)} aria-label="Auto">Auto</button>
      <label className="px-2 py-1 bg-gray-800/70 text-white rounded flex items-center gap-1" aria-label="Speed">
        <span>Speed</span>
        <input type="range" min={0.5} max={3} step={0.25} value={autoSpeed} onChange={e => setAutoSpeed(parseFloat(e.target.value))} />
      </label>
      <button className={`px-3 py-1 ${typewriter ? 'bg-purple-700' : 'bg-gray-800/70'} text-white rounded`} onClick={() => setTypewriter(t => !t)} aria-label="Typewriter">Type</button>
      <label className="px-2 py-1 bg-gray-800/70 text-white rounded flex items-center gap-1" aria-label="Text Speed">
        <span>Text</span>
        <input type="range" min={0.5} max={3} step={0.25} value={textSpeed} onChange={e => setTextSpeed(parseFloat(e.target.value))} />
      </label>
      <button className={`px-3 py-1 ${skip ? 'bg-green-700' : 'bg-gray-800/70'} text-white rounded`} onClick={() => setSkip(s => !s)} aria-label="Skip">Skip</button>
      <button className="px-3 py-1 bg-gray-800/70 text-white rounded" onClick={handleSave} aria-label="Save">Save</button>
      <button className="px-3 py-1 bg-gray-800/70 text-white rounded" onClick={handleLoad} aria-label="Load">Load</button>
    </div>
  );

  const BacklogPanel = backlogOpen ? (
    <div className="absolute inset-0 bg-black/70 text-white p-4 overflow-y-auto" onClick={() => setBacklogOpen(false)} role="dialog" aria-label="Backlog">
      <div className="max-w-xl mx-auto bg-black/60 p-4 rounded">
        <div className="flex justify-between items-center mb-2">
          <div className="font-bold">Backlog</div>
          <button className="px-2 py-1 bg-gray-700 rounded" onClick={() => setBacklogOpen(false)} aria-label="Close">Close</button>
        </div>
        <div className="space-y-2">
          {backlog.map((l, i) => (
            <div key={i} className="text-sm">
              <span className="font-semibold mr-2">{l.speaker || 'Narrator'}:</span>
              <span>{l.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;

  switch (instruction.kind) {
    case 'showDialogue': {
      const node = instruction as any;
      return (
        <div className="flex flex-col items-center justify-end h-full w-full p-4 relative">
          <Background currentKey={bgKey} previousKey={prevBgKey} assets={assets.backgrounds} transition={bgTransition} camera={bgCamera} />
          <Sprites sprites={sprites as any} assets={assets.sprites} />
          <AudioPlayer command={audioCmd} assets={assets.audio} />
          {ControlsBar}
          {BacklogPanel}
          <div className="bg-black bg-opacity-70 text-white rounded p-4 w-full max-w-xl mb-8">
            <div className="font-bold" aria-label="Speaker">{node.speaker || 'Narrator'}</div>
            <div className="mt-2" aria-label="Dialogue">{typewriter ? visibleText : node.text}</div>
            <button className="mt-4 px-4 py-2 bg-blue-600 rounded focus:outline-none focus:ring" onClick={handleNext} aria-label="Next">Next</button>
          </div>
        </div>
      );
    }
    case 'showChoices': {
      const node = instruction as any;
      const choices = (node.choices as Array<{ text: string; index: number }>) || [];
      // Countdown ring geometry
      const radius = 16;
      const circumference = 2 * Math.PI * radius;
      const totalMs = pendingChoiceTimer?.timeoutMs ?? 0;
      const remainMs = choiceDeadline ? Math.max(0, choiceDeadline - nowTs) : 0;
      const frac = totalMs > 0 ? Math.max(0, Math.min(1, remainMs / totalMs)) : 0;
      const dashOffset = circumference * (1 - frac);
      return (
        <div className="flex flex-col items-center justify-end h-full w-full p-4 relative">
          <Background currentKey={bgKey} previousKey={prevBgKey} assets={assets.backgrounds} transition={bgTransition} camera={bgCamera} />
          <Sprites sprites={sprites as any} assets={assets.sprites} />
          <AudioPlayer command={audioCmd} assets={assets.audio} />
          {ControlsBar}
          {BacklogPanel}
          <div className="bg-black bg-opacity-70 text-white rounded p-4 w-full max-w-xl mb-8">
            <div className="font-bold mb-2">Choose:</div>
              {pendingChoiceTimer && choiceDeadline && (
                <div className="flex items-center gap-2 text-xs opacity-90 mb-2">
                  <svg width="40" height="40" viewBox="0 0 40 40" aria-label="Countdown">
                    <circle cx="20" cy="20" r={radius} stroke="#333" strokeWidth="4" fill="none" />
                    <circle
                      cx="20"
                      cy="20"
                      r={radius}
                      stroke="#10B981"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={dashOffset}
                      strokeLinecap="round"
                      transform="rotate(-90 20 20)"
                    />
                  </svg>
                  <span>Auto-selecting in {Math.max(0, Math.ceil(remainMs/1000))}s</span>
                </div>
              )}
            {choices.map((choice, i) => (
              <button key={`${i}-${choice.text}`} className="mb-2 px-4 py-2 bg-green-600 rounded focus:outline-none focus:ring" onClick={() => handleChoice(choice.index)} aria-label={`Choice ${i+1}`}>{i+1}. {choice.text}</button>
            ))}
          </div>
        </div>
      );
    }
    case 'runCommand':
      return (
        <div className="flex flex-col items-center justify-center h-full w-full p-4 relative">
          <Background currentKey={bgKey} previousKey={prevBgKey} assets={assets.backgrounds} transition={bgTransition} camera={bgCamera} />
          <Sprites sprites={sprites as any} assets={assets.sprites} />
          <AudioPlayer command={audioCmd} assets={assets.audio} />
          {ControlsBar}
          {BacklogPanel}
          <div className="bg-black bg-opacity-80 text-white rounded p-4">Running command...</div>
        </div>
      );
    case 'end':
      return (
        <div className="flex flex-col items-center justify-center h-full w-full p-4 relative">
          <Background currentKey={bgKey} previousKey={prevBgKey} assets={assets.backgrounds} transition={bgTransition} camera={bgCamera} />
          <Sprites sprites={[]} assets={assets.sprites} />
          <AudioPlayer command={{ action: 'stop', fadeOutMs: 300 }} assets={assets.audio} />
          {ControlsBar}
          {BacklogPanel}
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
