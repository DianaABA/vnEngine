import React, { useEffect, useRef } from 'react';

export const AudioPlayer: React.FC<{ trackId: string; assets?: Record<string, string> }> = ({ trackId, assets }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (audioRef.current) {
      if (trackId && assets?.[trackId]) {
        audioRef.current.src = assets[trackId];
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    }
  }, [trackId, assets]);
  return <audio ref={audioRef} style={{ display: 'none' }} />;
};
