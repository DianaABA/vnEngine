import React, { useState, useEffect, useCallback, useRef } from 'react';
import { EngineContract, RenderInstruction } from '@vn/core';
import { 
  DialogueBox, 
  MainMenu, 
  SettingsMenu, 
  SaveLoadMenu,
  ThemeProvider,
  SettingsData,
  SaveSlot
} from '@vn/ui-components';
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
  // Configuration for the enhanced UI
  config?: {
    title?: string;
    subtitle?: string;
    logo?: string;
    version?: string;
    enableMainMenu?: boolean;
    enableSettings?: boolean;
    enableSaveLoad?: boolean;
    defaultTheme?: string;
    enableGlitchEffect?: boolean;
  };
}

type GameState = 'menu' | 'playing' | 'settings' | 'saveLoad';

const EnhancedVNPlayer: React.FC<VNPlayerProps> = ({ 
  engine, 
  assets, 
  config = {} 
}) => {
  const {
    title = 'Visual Novel',
    subtitle = 'A Story Awaits',
    logo,
    version = 'v1.0.0',
    enableMainMenu = true,
    enableSettings = true,
    enableSaveLoad = true,
    defaultTheme = 'modern',
    enableGlitchEffect = false
  } = config;

  // Game state management
  const [gameState, setGameState] = useState<GameState>(enableMainMenu ? 'menu' : 'playing');
  const [instruction, setInstruction] = useState<RenderInstruction | null>(null);
  const [saveLoadMode, setSaveLoadMode] = useState<'save' | 'load'>('save');

  // Settings management
  const [settings, setSettings] = useState<SettingsData>({
    masterVolume: 80,
    musicVolume: 70,
    sfxVolume: 80,
    textSpeed: 50,
    autoPlayDelay: 3000,
    fullscreen: false,
    textSize: 'medium',
    theme: defaultTheme as any,
    language: 'en'
  });

  // Save slots management
  const [saveSlots, setSaveSlots] = useState<SaveSlot[]>([]);
  const [hasSaveData, setHasSaveData] = useState(false);

  // Game state from original VNPlayer
  const [bgKey, setBgKey] = useState<string>('');
  const [prevBgKey, setPrevBgKey] = useState<string | undefined>(undefined);
  const [bgTransition, setBgTransition] = useState<any>(undefined);
  const [bgCamera, setBgCamera] = useState<any>(undefined);
  const [sprites, setSprites] = useState<any[]>([]);
  const [audioCmd, setAudioCmd] = useState<any | undefined>(undefined);
  const [busy, setBusy] = useState<boolean>(false);
  const [backlog, setBacklog] = useState<Array<{ speaker?: string; text: string }>>([]);
  const [auto, setAuto] = useState<boolean>(false);
  const [typewriter, setTypewriter] = useState<boolean>(true);
  const [visibleText, setVisibleText] = useState<string>('');
  
  const typeTimerRef = useRef<number | null>(null);
  const lastBacklogKeyRef = useRef<string>('');

  // Load saved settings and save slots on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('vn_settings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...settings, ...parsed });
      }

      const savedSlots = localStorage.getItem('vn_save_slots');
      if (savedSlots) {
        const parsed = JSON.parse(savedSlots);
        setSaveSlots(parsed);
        setHasSaveData(parsed.some((slot: SaveSlot) => !slot.isEmpty));
      }
    } catch (e) {
      console.warn('Failed to load saved data:', e);
    }
  }, []);

  // Initialize game when entering playing state
  useEffect(() => {
    if (gameState === 'playing' && !instruction) {
      try {
        const first = engine.next();
        setInstruction(first);
      } catch (e) {
        console.error(e);
        setInstruction({ kind: 'end' } as RenderInstruction);
      }
    }
  }, [gameState, engine, instruction]);

  // Game logic handlers
  const handleNext = useCallback(() => {
    if (busy) return;
    // Handle typewriter completion
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

  // UI event handlers
  const handleNewGame = () => {
    setGameState('playing');
    // Reset engine state if needed
  };

  const handleContinue = () => {
    if (hasSaveData) {
      // Load the most recent save
      const recentSlot = saveSlots
        .filter(slot => !slot.isEmpty)
        .sort((a, b) => b.date.getTime() - a.date.getTime())[0];
      
      if (recentSlot) {
        handleLoadGame(recentSlot.id);
      }
    }
  };

  const handleSettings = () => {
    setGameState('settings');
  };

  const handleCredits = () => {
    // TODO: Implement credits screen
    console.log('Credits not implemented yet');
  };

  const handleQuit = () => {
    if (typeof window !== 'undefined') {
      window.close();
    }
  };

  const handleBackToMenu = () => {
    setGameState('menu');
  };

  const handleSaveSettings = (newSettings: SettingsData) => {
    setSettings(newSettings);
    try {
      localStorage.setItem('vn_settings', JSON.stringify(newSettings));
    } catch (e) {
      console.warn('Failed to save settings:', e);
    }
  };

  const handleSaveGame = (slotId: number) => {
    try {
      const snap = (engine as any).snapshot ?? engine.snapshot;
      const lastDialogue = backlog[backlog.length - 1];
      
      const newSlot: SaveSlot = {
        id: slotId,
        name: `Save ${slotId}`,
        date: new Date(),
        chapter: 'Chapter 1', // TODO: Get from game state
        scene: 'Scene 1', // TODO: Get from game state
        isEmpty: false
      };

      const newSlots = [...saveSlots];
      const existingIndex = newSlots.findIndex(slot => slot.id === slotId);
      
      if (existingIndex >= 0) {
        newSlots[existingIndex] = newSlot;
      } else {
        newSlots.push(newSlot);
      }
      
      setSaveSlots(newSlots);
      setHasSaveData(true);
      
      // Save to localStorage
      localStorage.setItem('vn_save_slots', JSON.stringify(newSlots));
      localStorage.setItem(`vn_save_${slotId}`, JSON.stringify({
        snapshot: snap,
        meta: newSlot
      }));
      
      setGameState('playing');
    } catch (e) {
      console.error('Save failed:', e);
    }
  };

  const handleLoadGame = (slotId: number) => {
    try {
      const saveData = localStorage.getItem(`vn_save_${slotId}`);
      if (saveData) {
        const { snapshot } = JSON.parse(saveData);
        (engine as any).hydrate(snapshot);
        const next = engine.next();
        setInstruction(next);
        setGameState('playing');
      }
    } catch (e) {
      console.error('Load failed:', e);
    }
  };

  const handleDeleteSave = (slotId: number) => {
    try {
      const newSlots = saveSlots.filter(slot => slot.id !== slotId);
      setSaveSlots(newSlots);
      setHasSaveData(newSlots.some(slot => !slot.isEmpty));
      
      localStorage.setItem('vn_save_slots', JSON.stringify(newSlots));
      localStorage.removeItem(`vn_save_${slotId}`);
    } catch (e) {
      console.error('Delete save failed:', e);
    }
  };

  const handleOpenSaveMenu = () => {
    setSaveLoadMode('save');
    setGameState('saveLoad');
  };

  const handleOpenLoadMenu = () => {
    setSaveLoadMode('load');
    setGameState('saveLoad');
  };

  // Typewriter effect
  useEffect(() => {
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
    const msPerChar = Math.max(10, 100 - settings.textSpeed);
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
  }, [instruction, typewriter, settings.textSpeed]);

  // Track dialogue in backlog
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

  // Keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      
      if (instruction?.kind === 'showDialogue' && (e.key === ' ' || e.key === 'Enter')) {
        handleNext();
      }
      if (instruction?.kind === 'showChoices' && /^[1-9]$/.test(e.key)) {
        handleChoice(Number(e.key) - 1);
      }
      // ESC for menu/settings
      if (e.key === 'Escape' && enableMainMenu) {
        setGameState('menu');
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gameState, instruction, handleNext, handleChoice, enableMainMenu]);

  // Render based on game state
  return (
    <ThemeProvider defaultTheme={settings.theme}>
      <div className="vn-ui w-full h-full">
        {gameState === 'menu' && (
          <MainMenu
            title={title}
            subtitle={subtitle}
            logo={logo}
            version={version}
            onNewGame={handleNewGame}
            onContinue={hasSaveData ? handleContinue : undefined}
            onSettings={enableSettings ? handleSettings : () => {}}
            onCredits={handleCredits}
            onQuit={handleQuit}
            hasSaveData={hasSaveData}
            enableGlitchEffect={enableGlitchEffect}
          />
        )}

        {gameState === 'settings' && (
          <SettingsMenu
            isOpen={true}
            onClose={() => setGameState(enableMainMenu ? 'menu' : 'playing')}
            onSave={handleSaveSettings}
            currentSettings={settings}
            enableThemeSelection={true}
            enableFullscreenToggle={true}
          />
        )}

        {gameState === 'saveLoad' && (
          <SaveLoadMenu
            isOpen={true}
            onClose={() => setGameState('playing')}
            onSave={handleSaveGame}
            onLoad={handleLoadGame}
            onDelete={handleDeleteSave}
            saveSlots={saveSlots}
            mode={saveLoadMode}
            enableScreenshots={true}
            enableNaming={true}
          />
        )}

        {gameState === 'playing' && instruction && (
          <div className="relative w-full h-full">
            {/* Background and sprites */}
            <Background 
              currentKey={bgKey} 
              previousKey={prevBgKey} 
              assets={assets.backgrounds} 
              transition={bgTransition} 
              camera={bgCamera} 
            />
            <Sprites sprites={sprites as any} assets={assets.sprites} />
            <AudioPlayer command={audioCmd} assets={assets.audio} />

            {/* Game controls overlay */}
            <div className="absolute top-4 right-4 flex gap-2 z-50">
              {enableMainMenu && (
                <button 
                  className="vn-button"
                  onClick={handleBackToMenu}
                  aria-label="Menu"
                >
                  Menu
                </button>
              )}
              {enableSettings && (
                <button 
                  className="vn-button"
                  onClick={handleSettings}
                  aria-label="Settings"
                >
                  Settings
                </button>
              )}
              {enableSaveLoad && (
                <>
                  <button 
                    className="vn-button"
                    onClick={handleOpenSaveMenu}
                    aria-label="Save"
                  >
                    Save
                  </button>
                  <button 
                    className="vn-button"
                    onClick={handleOpenLoadMenu}
                    aria-label="Load"
                  >
                    Load
                  </button>
                </>
              )}
            </div>

            {/* Dialogue rendering */}
            {instruction.kind === 'showDialogue' && (
              <DialogueBox
                speaker={(instruction as any).speaker}
                text={typewriter ? visibleText : (instruction as any).text}
                textSize={settings.textSize}
                onAdvance={handleNext}
                typewriterEffect={typewriter}
                typewriterSpeed={Math.max(10, 100 - settings.textSpeed)}
              />
            )}

            {/* Choice rendering */}
            {instruction.kind === 'showChoices' && (
              <div className="fixed bottom-0 left-0 right-0 p-4 z-40">
                <div className="bg-black bg-opacity-80 text-white rounded-lg p-6 max-w-2xl mx-auto">
                  <div className="text-lg font-semibold mb-4">Choose your path:</div>
                  <div className="space-y-3">
                    {((instruction as any).choices || []).map((choice: any, i: number) => (
                      <button
                        key={i}
                        className={`w-full text-left p-3 rounded-md transition-colors ${
                          choice.disabled 
                            ? 'bg-gray-700 opacity-50 cursor-not-allowed' 
                            : 'bg-gray-800 hover:bg-gray-700 hover:text-accent'
                        }`}
                        onClick={() => !choice.disabled && handleChoice(choice.index)}
                        disabled={choice.disabled}
                      >
                        <span className="text-accent font-medium">{i + 1}.</span> {choice.text}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* End screen */}
            {instruction.kind === 'end' && (
              <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                <div className="text-center text-white p-8">
                  <h2 className="text-3xl font-bold mb-4">The End</h2>
                  <p className="text-lg mb-6">Thank you for playing!</p>
                  <div className="space-x-4">
                    <button 
                      className="vn-button"
                      onClick={handleNewGame}
                    >
                      Play Again
                    </button>
                    {enableMainMenu && (
                      <button 
                        className="vn-button"
                        onClick={handleBackToMenu}
                      >
                        Main Menu
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

// Export both players for backward compatibility
export { EnhancedVNPlayer as VNPlayer };