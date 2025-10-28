import React from 'react';

export const Sprites: React.FC<{ sprites: any[]; assets?: Record<string, string> }> = ({ sprites, assets }) => (
  <div className="absolute inset-0 pointer-events-none">
    {sprites.map(sprite => {
      const src = assets?.[sprite.id] || assets?.['default'] || '';
      return (
        <img
          key={sprite.id}
          src={src}
          alt={sprite.id}
          style={{
            position: 'absolute',
            left: sprite.x || '40%',
            top: sprite.y || '60%',
            zIndex: sprite.z || 1,
            width: sprite.pose === 'large' ? '40%' : '20%',
            transition: 'all 0.3s',
          }}
        />
      );
    })}
  </div>
);
