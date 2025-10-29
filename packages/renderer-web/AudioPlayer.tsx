import React, { useEffect, useRef } from 'react';

type AudioCommand =
  | { action: 'play'; idOrUrl: string; loop?: boolean; volume?: number; fadeInMs?: number }
  | { action: 'stop'; fadeOutMs?: number };

export const AudioPlayer: React.FC<{ command?: AudioCommand; assets?: Record<string, string> }> = ({ command, assets }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !command) return;

    const cancelRaf = () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); rafRef.current = null; };

    if (command.action === 'play') {
      const url = assets?.[command.idOrUrl] || command.idOrUrl;
      audio.loop = Boolean(command.loop);
      audio.src = url || '';
      const targetVol = command.volume ?? 1;
      const fadeMs = command.fadeInMs ?? 0;
      if (fadeMs > 0) {
        audio.volume = 0;
        void audio.play();
        const start = performance.now();
        const step = (t: number) => {
          const dt = Math.min(1, (t - start) / fadeMs);
          audio.volume = targetVol * dt;
          if (dt < 1) rafRef.current = requestAnimationFrame(step);
        };
        rafRef.current = requestAnimationFrame(step);
      } else {
        audio.volume = targetVol;
        void audio.play();
      }
    } else if (command.action === 'stop') {
      const fadeMs = command.fadeOutMs ?? 0;
      if (fadeMs > 0) {
        const startVol = audio.volume;
        const start = performance.now();
        const step = (t: number) => {
          const dt = Math.min(1, (t - start) / fadeMs);
          const v = startVol * (1 - dt);
          audio.volume = Math.max(0, v);
          if (dt < 1) {
            rafRef.current = requestAnimationFrame(step);
          } else {
            audio.pause();
            audio.src = '';
          }
        };
        rafRef.current = requestAnimationFrame(step);
      } else {
        audio.pause();
        audio.src = '';
      }
    }
    return () => cancelRaf();
  }, [command, assets]);

  return <audio ref={audioRef} style={{ display: 'none' }} />;
};
