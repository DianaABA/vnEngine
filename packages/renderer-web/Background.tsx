import React from 'react';

export const Background: React.FC<{ currentKey: string; assets?: Record<string, string> }> = ({ currentKey, assets }) => {
  const src = assets?.[currentKey] || assets?.['default'] || '';
  return (
    <div className="absolute inset-0 w-full h-full">
      {src ? <img src={src} alt="Background" className="object-cover w-full h-full" /> : <div className="bg-gray-900 w-full h-full" />}
    </div>
  );
};
