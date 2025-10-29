import React, { useEffect, useRef, useState } from 'react';

type BgTransition = { type: 'fade' | 'crossfade'; durationMs: number } | undefined;

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

  useEffect(() => {
    if (!transition || transition.type === 'fade' || transition.type === 'crossfade') {
      // Start crossfade: ensure both are visible; fade prev to 0, curr to 1 via CSS
      setVisible({ curr: !!currSrc, prev: !!prevSrc });
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        // After transition, hide prev
        setVisible({ curr: !!currSrc, prev: false });
      }, transition?.durationMs ?? 0);
    }
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
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
          style={{ opacity: visible.curr ? 1 : 0, transition: `opacity ${duration} linear` }}
        />
      ) : (
        <div className="bg-gray-900 w-full h-full" />
      )}
    </div>
  );
};
