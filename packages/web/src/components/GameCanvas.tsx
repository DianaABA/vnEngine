import React, { useEffect, useState, useCallback } from 'react';
import episode1 from '@assets/scripts/episode1.json';
import { VNEngine, type VNEpisode, type VNScene, type VNLine, type VNChoice, parseEpisode, loadEpisodeToSceneManager } from '@vn/core';
import { motion, AnimatePresence } from 'framer-motion';
const MotionImg = motion.img as React.FC<React.ImgHTMLAttributes<HTMLImageElement> & { animate?: any; initial?: any; exit?: any; transition?: any; }>;
const MotionDiv = motion.div as React.FC<React.HTMLAttributes<HTMLDivElement> & { animate?: any; initial?: any; exit?: any; transition?: any; }>;

const engine = new VNEngine();
const episode: VNEpisode = parseEpisode(JSON.stringify(episode1));
loadEpisodeToSceneManager(episode, engine.sceneManager);

export const GameCanvas: React.FC = () => {
  const [scene, setScene] = useState<VNScene | null>(engine.sceneManager.getCurrentScene()?.data || null);
  const [lineIndex, setLineIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  const currentLine: VNLine | null = scene ? scene.lines[lineIndex] : null;
  const background = currentLine?.background || scene?.background || '';

  // Handle scene changes (branching)
  const goToScene = useCallback((sceneId: string) => {
    engine.sceneManager.goToScene(sceneId);
    const newScene = engine.sceneManager.getCurrentScene()?.data as VNScene;
    setScene(newScene);
    setLineIndex(0);
    setFadeKey(fadeKey + 1);
  }, [fadeKey]);

  // Advance line or handle choice
  const advance = useCallback((choiceId?: string) => {
    if (!scene || !currentLine) return;
    if (currentLine.choices && choiceId) {
  const choice = currentLine.choices.find((c: VNChoice) => c.id === choiceId);
      if (choice && choice.nextSceneId) {
        goToScene(choice.nextSceneId);
        return;
      }
    }
    if (lineIndex < scene.lines.length - 1) {
      setLineIndex(lineIndex + 1);
      setFadeKey(fadeKey + 1);
    } else {
      // End of scene (could show next scene or end screen)
    }
  }, [scene, currentLine, lineIndex, goToScene, fadeKey]);

  // Keyboard: space to advance
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !currentLine?.choices) advance();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [advance, currentLine]);

  if (!scene || !currentLine) return <div className="flex items-center justify-center h-full">Loading...</div>;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-end bg-black">
      <AnimatePresence mode="wait">
        <MotionImg
          key={`${String(background)}_${String(fadeKey)}`}
          src={background}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      <div className="relative z-10 w-full max-w-xl mb-12">
        <MotionDiv
          key={`${String(currentLine.id)}_${String(fadeKey)}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white/80 rounded-lg shadow-lg p-6 text-gray-900"
        >
          {currentLine.speaker && (
            <div className="font-bold text-lg mb-2">{currentLine.speaker}</div>
          )}
          <div className="text-base mb-4">{currentLine.text}</div>
          {currentLine.choices && (
            <div className="flex flex-col gap-2">
              {currentLine.choices.map((choice: VNChoice) => (
                <button
                  key={choice.id}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  onClick={() => advance(choice.id)}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          )}
          {!currentLine.choices && (
            <button
              className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
              onClick={() => advance()}
            >
              Next
            </button>
          )}
  </MotionDiv>
      </div>
    </div>
  );
};
