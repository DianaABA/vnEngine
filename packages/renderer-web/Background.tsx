import React, { useEffect, useRef, useState } from 'react';

type BgTransition = { type: 'fade' | 'crossfade' | 'slide'; durationMs: number; direction?: 'left'|'right'|'up'|'down' } | undefined;
type Camera = { xPct?: number; yPct?: number; scale?: number; durationMs?: number; easing?: string } | undefined;

export const Background: React.FC<{
  currentKey: string;
  previousKey?: string;
  assets?: Record<string, string>;
  transition?: BgTransition;
  camera?: Camera;
}> = ({ currentKey, previousKey, assets, transition, camera }) => {
  const currSrc = assets?.[currentKey] || assets?.['default'] || '';
  const prevSrc = previousKey ? (assets?.[previousKey] || '') : '';
  const [visible, setVisible] = useState({ curr: !!currSrc, prev: !!prevSrc });
  const timeoutRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const [currTransform, setCurrTransform] = useState<string>('translate(0,0)');
  const [shakeOffset, setShakeOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [cam, setCam] = useState<{ xPct: number; yPct: number; scale: number; durationMs: number; easing: string }>({ xPct: 0, yPct: 0, scale: 1, durationMs: 0, easing: 'ease' });

  // Apply camera changes
  useEffect(() => {
    if (!camera) return;
    setCam(prev => ({
      xPct: camera.xPct ?? prev.xPct,
      yPct: camera.yPct ?? prev.yPct,
      scale: camera.scale ?? prev.scale,
      durationMs: camera.durationMs ?? 0,
      easing: camera.easing ?? 'ease'
    }));
  }, [camera?.xPct, camera?.yPct, camera?.scale, camera?.durationMs, camera?.easing]);

  // Listen for shake requests
  useEffect(() => {
    let stop = false;
    let raf: number | null = null;
    const onShake = (e: Event) => {
      const detail = (e as CustomEvent).detail as { durationMs: number; intensity: number };
      const start = performance.now();
      const loop = () => {
        if (stop) return;
        const now = performance.now();
        const t = now - start;
        if (t >= detail.durationMs) {
          setShakeOffset({ x: 0, y: 0 });
          return;
        }
        const ix = (Math.random() * 2 - 1) * detail.intensity;
        const iy = (Math.random() * 2 - 1) * detail.intensity;
        setShakeOffset({ x: ix, y: iy });
        raf = requestAnimationFrame(loop);
      };
      if (raf) cancelAnimationFrame(raf);
      loop();
    };
    window.addEventListener('vn_bg_shake', onShake as any);
    return () => {
      stop = true;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('vn_bg_shake', onShake as any);
    };
  }, []);

  useEffect(() => {
    const clearTimers = () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      timeoutRef.current = null;
      rafRef.current = null;
    };

    if (!transition || transition.type === 'fade' || transition.type === 'crossfade') {
      // Crossfade: ensure both are visible; fade prev to 0, curr to 1 via CSS
      setCurrTransform('translate(0,0)');
      setVisible({ curr: !!currSrc, prev: !!prevSrc });
      clearTimers();
      timeoutRef.current = window.setTimeout(() => {
        // After transition, hide prev
        setVisible({ curr: !!currSrc, prev: false });
      }, transition?.durationMs ?? 0);
    } else if (transition.type === 'slide') {
      // Slide: start current off-screen based on direction, then animate to 0; also crossfade previous out
      const dir = transition.direction || 'left';
      const start = dir === 'left' ? 'translateX(-100%)' : dir === 'right' ? 'translateX(100%)' : dir === 'up' ? 'translateY(-100%)' : 'translateY(100%)';
      setCurrTransform(start);
      setVisible({ curr: !!currSrc, prev: !!prevSrc });
      clearTimers();
      rafRef.current = requestAnimationFrame(() => {
        setCurrTransform('translate(0,0)');
      });
      timeoutRef.current = window.setTimeout(() => {
        setVisible({ curr: !!currSrc, prev: false });
      }, transition.durationMs);
    }
    return () => clearTimers();
  }, [currentKey, previousKey, currSrc, prevSrc, transition]);

  const duration = (transition?.durationMs ?? 0) + 'ms';
  const camDuration = (cam.durationMs ?? 0) + 'ms';
  const camTranslate = `translate(${cam.xPct}%, ${cam.yPct}%) scale(${cam.scale})`;

  return (
    <div className="absolute inset-0 w-full h-full">
      {prevSrc && (
        <img
          src={prevSrc}
          alt="Background previous"
          className="object-cover w-full h-full absolute inset-0"
          style={{ opacity: visible.prev ? 1 : 0, transition: `opacity ${duration} linear` }}
        />
      )}
      {currSrc ? (
        <img
          src={currSrc}
          alt="Background"
          className="object-cover w-full h-full absolute inset-0"
          style={{ opacity: visible.curr ? 1 : 0, transform: `${camTranslate} ${currTransform} translate(${shakeOffset.x}px, ${shakeOffset.y}px)`, transition: `opacity ${duration} linear, transform ${camDuration} ${cam.easing}` }}
        />
      ) : (
        <div className="bg-gray-900 w-full h-full" />
      )}
    </div>
  );
};
