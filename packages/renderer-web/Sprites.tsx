import React from 'react';

type Sprite = {
  id: string;
  pose?: string;
  at?: { x?: number | string; y?: number | string; z?: number; anchor?: 'center' | 'bottom' };
  opacity?: number;
  widthPct?: number; // simple sizing based on pose
};

export const Sprites: React.FC<{ sprites: Sprite[]; assets?: Record<string, string> }> = ({ sprites, assets }) => (
  <div className="absolute inset-0 pointer-events-none">
    {sprites.map(sprite => {
      const src = assets?.[sprite.id] || assets?.['default'] || '';
      const left = typeof sprite.at?.x === 'number' ? `${sprite.at?.x}%` : (sprite.at?.x || '40%');
      const top = typeof sprite.at?.y === 'number' ? `${sprite.at?.y}%` : (sprite.at?.y || '60%');
      const width = sprite.widthPct ? `${sprite.widthPct}%` : sprite.pose === 'large' ? '40%' : '20%';
      const opacity = sprite.opacity ?? 1;
      return (
        <img
          key={sprite.id}
          src={src}
          alt={sprite.id}
          style={{
            position: 'absolute',
            left,
            top,
            zIndex: sprite.at?.z || 1,
            width,
            opacity,
            transition: 'all 0.3s ease',
            transform: 'translate(-50%, -100%)',
          }}
        />
      );
    })}
  </div>
);
