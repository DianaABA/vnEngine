import { useState, useEffect, useCallback } from 'react';
import { assetManager, type Character, type Avatar } from '@vnengine/assets';

export interface UseAssetsConfig {
  charactersPath?: string;
  avatarsPath?: string;
  basePath?: string;
  autoInit?: boolean;
}

export function useAssets(config: UseAssetsConfig = {}) {
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { autoInit = true } = config;

  // Initialize asset manager
  const initialize = useCallback(async () => {
    if (loading || initialized) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await assetManager.initialize(config);
      setInitialized(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize assets');
    } finally {
      setLoading(false);
    }
  }, [config, loading, initialized]);

  // Auto-initialize on mount
  useEffect(() => {
    if (autoInit && !initialized && !loading) {
      initialize();
    }
  }, [autoInit, initialized, loading, initialize]);

  // Character management
  const getCharacter = useCallback((id: string): Character | undefined => {
    return assetManager.getCharacter(id);
  }, []);

  const getCharacters = useCallback((): Character[] => {
    return assetManager.getCharacters();
  }, []);

  // Avatar management
  const getAvatar = useCallback((id: string): Avatar | undefined => {
    return assetManager.getAvatar(id);
  }, []);

  const getAvatars = useCallback((): Avatar[] => {
    return assetManager.getAvatars();
  }, []);

  // Background management
  const getBackground = useCallback((key: string, emotion?: string): string | undefined => {
    return assetManager.getBackground(key, emotion);
  }, []);

  const registerBackground = useCallback((key: string, path: string, metadata?: { emotion?: string; scene?: string }) => {
    assetManager.registerBackground(key, path, metadata);
  }, []);

  // Asset preloading
  const preloadImage = useCallback(async (path: string, key?: string) => {
    return await assetManager.preloadImage(path, key);
  }, []);

  const preloadAudio = useCallback(async (path: string, key?: string) => {
    return await assetManager.preloadAudio(path, key);
  }, []);

  const preloadEpisodeAssets = useCallback(async (episode: {
    backgrounds?: string[];
    music?: string[];
    characters?: string[];
  }) => {
    return await assetManager.preloadEpisodeAssets(episode);
  }, []);

  // Validation and stats
  const validateAssets = useCallback(async () => {
    return await assetManager.validateAssets();
  }, []);

  const getStats = useCallback(() => {
    return assetManager.getStats();
  }, []);

  const clearCache = useCallback((keepRecent = true) => {
    assetManager.clearCache(keepRecent);
  }, []);

  return {
    // State
    initialized,
    loading,
    error,
    
    // Methods
    initialize,
    getCharacter,
    getCharacters,
    getAvatar,
    getAvatars,
    getBackground,
    registerBackground,
    preloadImage,
    preloadAudio,
    preloadEpisodeAssets,
    validateAssets,
    getStats,
    clearCache
  };
}

export function useCharacter(id: string) {
  const { getCharacter, initialized } = useAssets();
  const [character, setCharacter] = useState<Character | undefined>();

  useEffect(() => {
    if (initialized) {
      setCharacter(getCharacter(id));
    }
  }, [id, getCharacter, initialized]);

  return character;
}

export function useAvatar(id: string) {
  const { getAvatar, initialized } = useAssets();
  const [avatar, setAvatar] = useState<Avatar | undefined>();

  useEffect(() => {
    if (initialized) {
      setAvatar(getAvatar(id));
    }
  }, [id, getAvatar, initialized]);

  return avatar;
}

export function useBackground(key: string, emotion?: string) {
  const { getBackground, initialized } = useAssets();
  const [backgroundUrl, setBackgroundUrl] = useState<string | undefined>();

  useEffect(() => {
    if (initialized) {
      setBackgroundUrl(getBackground(key, emotion));
    }
  }, [key, emotion, getBackground, initialized]);

  return backgroundUrl;
}

export function usePreloadedAssets() {
  const { getStats } = useAssets();
  const [stats, setStats] = useState(getStats());

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(getStats());
    }, 1000);

    return () => clearInterval(interval);
  }, [getStats]);

  return stats;
}