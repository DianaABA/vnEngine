import React, { useEffect, useRef, useState } from 'react';

type BgTransition = { type: 'fade' | 'crossfade' | 'slide'; durationMs: number; direction?: 'left'|'right'|'up'|'down' } | undefined;

export const Background: React.FC<{
  currentKey: string;
  previousKey?: string;
  assets?: Record<string, string>;
  transition?: BgTransition;
}> = ({ currentKey, previousKey, assets, transition }) => {
  const currSrc = assets?.[currentKey] || assets?.['default'] || '';
  const prevSrc = previousKey ? (assets?.[previousKey] || '') : '';
  const [visible, setVisible] = useState({ curr: !!currSrc, prev: !!prevSrc });
  const timeoutRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const [currTransform, setCurrTransform] = useState<string>('translate(0,0)');

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
          style={{ opacity: visible.curr ? 1 : 0, transform: currTransform, transition: `opacity ${duration} linear, transform ${duration} ease` }}
        />
      ) : (
        <div className="bg-gray-900 w-full h-full" />
      )}
    </div>
  );
};
