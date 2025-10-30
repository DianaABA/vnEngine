/**
 * React hook for vnEngine audio management
 * Enhanced audio system with crossfading, volume control, and scene detection
 * Ported from ChakraHearts for all VN projects
 */

import { useEffect, useCallback, useState } from 'react';
import { AudioManager, AudioConfig, AudioTrack } from '@vn/audio';

// Volume presets for different contexts
export const VOLUME_PRESETS = {
  MENU: { bgm: 0.6, sfx: 0.8, voice: 0.9, master: 1.0 },
  GAMEPLAY: { bgm: 0.7, sfx: 0.8, voice: 0.9, master: 1.0 },
  MEDITATION: { bgm: 0.4, sfx: 0.6, voice: 0.8, master: 0.8 },
  INTENSE: { bgm: 0.8, sfx: 0.9, voice: 1.0, master: 1.0 }
} as const;

export interface UseAudioReturn {
  // Playback controls
  playBGM: (trackId: string, crossfade?: boolean) => Promise<void>;
  stopBGM: (fadeOut?: boolean) => Promise<void>;
  playSFX: (trackId: string) => Promise<void>;
  
  // Volume controls
  setMasterVolume: (volume: number) => void;
  setBGMVolume: (volume: number) => void;
  setSFXVolume: (volume: number) => void;
  setVoiceVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
  
  // Presets
  applyVolumePreset: (preset: keyof typeof VOLUME_PRESETS) => void;
  
  // State
  config: AudioConfig;
  currentBGM: string | null;
  isLoading: boolean;
  
  // Scene-based helpers (can be customized per project)
  playSceneBGM: (context: { scene?: string; mood?: string; location?: string }) => Promise<void>;
}

export function useAudio(audioManager?: AudioManager): UseAudioReturn {
  const manager = audioManager || new AudioManager();
  const [config, setConfig] = useState<AudioConfig>(() => manager.getConfig());
  const [currentBGM, setCurrentBGM] = useState<string | null>(() => manager.getCurrentBGM());
  const [isLoading, setIsLoading] = useState(true);

  // Initialize audio system
  useEffect(() => {
    let mounted = true;

    const initializeAudio = async () => {
      try {
        // Basic initialization - projects can preload their own tracks
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize audio system:', error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAudio();

    return () => {
      mounted = false;
    };
  }, [manager]);

  // BGM controls
  const playBGM = useCallback(async (trackId: string, crossfade: boolean = true) => {
    try {
      await manager.playBGM(trackId, crossfade);
      const newBGM = manager.getCurrentBGM();
      setCurrentBGM(newBGM);
    } catch (error) {
      console.error(`Failed to play BGM: ${trackId}`, error);
      throw error;
    }
  }, [manager]);

  const stopBGM = useCallback(async (fadeOut: boolean = true) => {
    try {
      await manager.stopBGM(fadeOut);
      setCurrentBGM(null);
    } catch (error) {
      console.error('Failed to stop BGM:', error);
      throw error;
    }
  }, [manager]);

  // SFX controls
  const playSFX = useCallback(async (trackId: string) => {
    try {
      await manager.playSFX(trackId);
    } catch (error) {
      console.error(`Failed to play SFX: ${trackId}`, error);
      throw error;
    }
  }, [manager]);

  // Volume controls
  const setMasterVolume = useCallback((volume: number) => {
    manager.setVolume('masterVolume', volume);
    const newConfig = manager.getConfig();
    setConfig(newConfig);
  }, [manager]);

  const setBGMVolume = useCallback((volume: number) => {
    manager.setVolume('bgmVolume', volume);
    const newConfig = manager.getConfig();
    setConfig(newConfig);
  }, [manager]);

  const setSFXVolume = useCallback((volume: number) => {
    manager.setVolume('sfxVolume', volume);
    const newConfig = manager.getConfig();
    setConfig(newConfig);
  }, [manager]);

  const setVoiceVolume = useCallback((volume: number) => {
    manager.setVolume('voiceVolume', volume);
    const newConfig = manager.getConfig();
    setConfig(newConfig);
  }, [manager]);

  const setMuted = useCallback((muted: boolean) => {
    manager.setMuted(muted);
    const newConfig = manager.getConfig();
    setConfig(newConfig);
  }, [manager]);

  // Apply volume preset
  const applyVolumePreset = useCallback((preset: keyof typeof VOLUME_PRESETS) => {
    const presetConfig = VOLUME_PRESETS[preset];
    manager.setVolume('masterVolume', presetConfig.master);
    manager.setVolume('bgmVolume', presetConfig.bgm);
    manager.setVolume('sfxVolume', presetConfig.sfx);
    manager.setVolume('voiceVolume', presetConfig.voice);
    const newConfig = manager.getConfig();
    setConfig(newConfig);
  }, [manager]);

  // Scene-based BGM helper (projects can override this logic)
  const playSceneBGM = useCallback(async (context: { scene?: string; mood?: string; location?: string }) => {
    // Basic implementation - projects should customize this
    let recommendedTrack: string | null = null;
    
    // Simple mood-based selection
    if (context.mood === 'battle' || context.mood === 'combat') {
      recommendedTrack = 'combat_theme';
    } else if (context.mood === 'tense' || context.mood === 'tension') {
      recommendedTrack = 'tension_theme';
    } else if (context.mood === 'mystical' || context.mood === 'magical') {
      recommendedTrack = 'mystical_theme';
    } else if (context.mood === 'peaceful' || context.mood === 'calm') {
      recommendedTrack = 'ambient_theme';
    }
    
    if (recommendedTrack && recommendedTrack !== currentBGM) {
      try {
        await playBGM(recommendedTrack);
      } catch (error) {
        console.warn(`Recommended track ${recommendedTrack} not available:`, error);
      }
    }
  }, [playBGM, currentBGM]);

  return {
    playBGM,
    stopBGM,
    playSFX,
    setMasterVolume,
    setBGMVolume,
    setSFXVolume,
    setVoiceVolume,
    setMuted,
    applyVolumePreset,
    config,
    currentBGM,
    isLoading,
    playSceneBGM
  };
}

// Convenience hooks for specific audio contexts
export function useMenuAudio(audioManager?: AudioManager) {
  const audio = useAudio(audioManager);

  useEffect(() => {
    let isMounted = true;
    
    const startMenuMusic = async () => {
      if (isMounted && !audio.isLoading) {
        try {
          await audio.playBGM('menu_theme');
        } catch (error) {
          console.warn('Failed to start menu music:', error);
        }
      }
    };

    startMenuMusic();

    return () => {
      isMounted = false;
    };
  }, [audio.isLoading, audio.playBGM]);

  return audio;
}

export function useEpisodeAudio(episodeId: string, audioManager?: AudioManager) {
  const audio = useAudio(audioManager);

  // Auto-play episode-appropriate music when episode changes
  useEffect(() => {
    let isMounted = true;

    const playEpisodeMusic = async () => {
      if (isMounted && !audio.isLoading && episodeId) {
        try {
          const context = { scene: episodeId };
          await audio.playSceneBGM(context);
        } catch (error) {
          console.warn('Failed to play episode music:', error);
        }
      }
    };

    playEpisodeMusic();

    return () => {
      isMounted = false;
    };
  }, [episodeId, audio.isLoading, audio.playSceneBGM]);

  return audio;
}

export function useSceneAudio(sceneContext: { scene?: string; mood?: string; location?: string }, audioManager?: AudioManager) {
  const audio = useAudio(audioManager);

  // Auto-play scene-appropriate music when context changes
  useEffect(() => {
    let isMounted = true;

    const playSceneMusic = async () => {
      if (isMounted && !audio.isLoading) {
        try {
          await audio.playSceneBGM(sceneContext);
        } catch (error) {
          console.warn('Failed to play scene music:', error);
        }
      }
    };

    playSceneMusic();

    return () => {
      isMounted = false;
    };
  }, [audio.isLoading, audio.playSceneBGM, sceneContext]);

  return audio;
}