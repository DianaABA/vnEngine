/**
 * Enhanced Asset Management System for vnEngine
 * Ported from ChakraHearts with improvements
 */

export interface Character {
  id: string;
  name: string;
  role: string;
  shortDescription: string;
  folder?: string;
  placeholder?: string;
}

export interface Avatar {
  id: string;
  name: string;
  element: string;
  essence: string;
  gender: string;
  description: string;
  folder: string;
  placeholder: string;
}

export interface AssetMetadata {
  id: string;
  name: string;
  path: string;
  type: 'character' | 'avatar' | 'background' | 'music' | 'ui';
  loaded?: boolean;
  lastUsed?: Date;
}

export interface BackgroundMapping {
  [backgroundKey: string]: {
    path: string;
    emotion?: string;
    scene?: string;
    loaded?: boolean;
  };
}

export class AssetManager {
  private characters: Map<string, Character> = new Map();
  private avatars: Map<string, Avatar> = new Map();
  private backgrounds: BackgroundMapping = {};
  private loadedAssets: Map<string, HTMLImageElement | HTMLAudioElement> = new Map();
  private assetCache: Map<string, string> = new Map(); // URL cache
  private duplicateMap: Map<string, string> = new Map(); // Prevent duplicate loading
  
  /**
   * Initialize asset manager with metadata
   */
  async initialize(config: {
    charactersPath?: string;
    avatarsPath?: string;
    basePath?: string;
  } = {}) {
    const { 
      charactersPath = '/assets/characters/characters.json',
      avatarsPath = '/assets/avatars/avatars.json',
      basePath = '/assets'
    } = config;

    try {
      // Load character metadata
      if (charactersPath) {
        const charactersData = await this.loadJSON<Character[]>(charactersPath);
        charactersData?.forEach(char => {
          this.characters.set(char.id, char);
        });
      }

      // Load avatar metadata
      if (avatarsPath) {
        const avatarsData = await this.loadJSON<Avatar[]>(avatarsPath);
        avatarsData?.forEach(avatar => {
          this.avatars.set(avatar.id, avatar);
        });
      }

      console.log(`AssetManager initialized with ${this.characters.size} characters and ${this.avatars.size} avatars`);
    } catch (error) {
      console.warn('AssetManager: Failed to load metadata:', error);
    }
  }

  /**
   * Load and cache JSON data
   */
  private async loadJSON<T>(path: string): Promise<T | null> {
    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error(`Failed to load ${path}`);
      return await response.json();
    } catch (error) {
      console.warn(`Failed to load JSON from ${path}:`, error);
      return null;
    }
  }

  /**
   * Get character by ID
   */
  getCharacter(id: string): Character | undefined {
    return this.characters.get(id);
  }

  /**
   * Get all characters
   */
  getCharacters(): Character[] {
    return Array.from(this.characters.values());
  }

  /**
   * Get avatar by ID
   */
  getAvatar(id: string): Avatar | undefined {
    return this.avatars.get(id);
  }

  /**
   * Get all avatars
   */
  getAvatars(): Avatar[] {
    return Array.from(this.avatars.values());
  }

  /**
   * Register background with emotion/scene mapping
   */
  registerBackground(key: string, path: string, metadata?: { emotion?: string; scene?: string }) {
    // Check for duplicates
    const existingPath = this.duplicateMap.get(path);
    if (existingPath && existingPath !== key) {
      console.warn(`AssetManager: Duplicate background path "${path}" for keys "${existingPath}" and "${key}"`);
    }
    
    this.backgrounds[key] = {
      path,
      emotion: metadata?.emotion,
      scene: metadata?.scene,
      loaded: false
    };
    
    this.duplicateMap.set(path, key);
  }

  /**
   * Get background by key with emotion fallback
   */
  getBackground(key: string, emotion?: string): string | undefined {
    // Try exact match first
    let background = this.backgrounds[key];
    
    // If not found and emotion provided, try emotion-based lookup
    if (!background && emotion) {
      const emotionKey = `${key}_${emotion}`;
      background = this.backgrounds[emotionKey];
    }
    
    // Fallback to neutral
    if (!background) {
      const neutralKey = `${key}_neutral`;
      background = this.backgrounds[neutralKey];
    }
    
    return background?.path;
  }

  /**
   * Preload image asset
   */
  async preloadImage(path: string, key?: string): Promise<HTMLImageElement | null> {
    const cacheKey = key || path;
    
    // Check if already loaded
    const cached = this.loadedAssets.get(cacheKey);
    if (cached instanceof HTMLImageElement) {
      return cached;
    }

    // Check URL cache
    let imageUrl = this.assetCache.get(path);
    if (!imageUrl) {
      imageUrl = path;
      this.assetCache.set(path, imageUrl);
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.loadedAssets.set(cacheKey, img);
        if (key && this.backgrounds[key]) {
          this.backgrounds[key].loaded = true;
        }
        resolve(img);
      };
      img.onerror = () => {
        console.warn(`Failed to load image: ${path}`);
        reject(null);
      };
      img.src = imageUrl;
    });
  }

  /**
   * Preload audio asset
   */
  async preloadAudio(path: string, key?: string): Promise<HTMLAudioElement | null> {
    const cacheKey = key || path;
    
    // Check if already loaded
    const cached = this.loadedAssets.get(cacheKey);
    if (cached instanceof HTMLAudioElement) {
      return cached;
    }

    // Check URL cache
    let audioUrl = this.assetCache.get(path);
    if (!audioUrl) {
      audioUrl = path;
      this.assetCache.set(path, audioUrl);
    }

    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.oncanplaythrough = () => {
        this.loadedAssets.set(cacheKey, audio);
        resolve(audio);
      };
      audio.onerror = () => {
        console.warn(`Failed to load audio: ${path}`);
        reject(null);
      };
      audio.src = audioUrl;
    });
  }

  /**
   * Batch preload assets for episode
   */
  async preloadEpisodeAssets(episode: {
    backgrounds?: string[];
    music?: string[];
    characters?: string[];
  }): Promise<void> {
    const promises: Promise<any>[] = [];

    // Preload backgrounds
    if (episode.backgrounds) {
      episode.backgrounds.forEach(bg => {
        const bgPath = this.getBackground(bg);
        if (bgPath) {
          promises.push(this.preloadImage(bgPath, bg));
        }
      });
    }

    // Preload music
    if (episode.music) {
      episode.music.forEach(track => {
        promises.push(this.preloadAudio(track));
      });
    }

    // Preload character images
    if (episode.characters) {
      episode.characters.forEach(charId => {
        const character = this.getCharacter(charId);
        if (character) {
          const charPath = `/assets/characters/${charId}/neutral.png`;
          promises.push(this.preloadImage(charPath, charId));
        }
      });
    }

    try {
      await Promise.all(promises);
      console.log('Episode assets preloaded successfully');
    } catch (error) {
      console.warn('Some episode assets failed to preload:', error);
    }
  }

  /**
   * Get asset loading statistics
   */
  getStats() {
    const totalBackgrounds = Object.keys(this.backgrounds).length;
    const loadedBackgrounds = Object.values(this.backgrounds).filter(bg => bg.loaded).length;
    
    return {
      characters: this.characters.size,
      avatars: this.avatars.size,
      backgrounds: {
        total: totalBackgrounds,
        loaded: loadedBackgrounds,
        pending: totalBackgrounds - loadedBackgrounds
      },
      cachedAssets: this.loadedAssets.size,
      duplicates: this.duplicateMap.size
    };
  }

  /**
   * Clear asset cache (for memory management)
   */
  clearCache(keepRecent = true) {
    if (!keepRecent) {
      this.loadedAssets.clear();
      this.assetCache.clear();
      return;
    }

    // Keep recently used assets (last 5 minutes)
    const cutoff = Date.now() - (5 * 60 * 1000);
    
    for (const [key, background] of Object.entries(this.backgrounds)) {
      if (background.loaded && (!background.scene || Date.now() > cutoff)) {
        this.loadedAssets.delete(key);
        background.loaded = false;
      }
    }
  }

  /**
   * Validate asset integrity
   */
  async validateAssets(): Promise<{
    valid: boolean;
    errors: string[];
    warnings: string[];
  }> {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check character assets
    for (const [id, character] of this.characters) {
      const charPath = `/assets/characters/${id}/neutral.png`;
      try {
        await this.preloadImage(charPath);
      } catch {
        errors.push(`Missing character image: ${charPath}`);
      }
    }

    // Check avatar assets
    for (const [id, avatar] of this.avatars) {
      const avatarPath = `/assets/avatars/${avatar.folder}/${avatar.placeholder}`;
      try {
        await this.preloadImage(avatarPath);
      } catch {
        errors.push(`Missing avatar image: ${avatarPath}`);
      }
    }

    // Check for unused assets
    const usedPaths = new Set([
      ...Array.from(this.characters.keys()).map(id => `/assets/characters/${id}/neutral.png`),
      ...Array.from(this.avatars.values()).map(avatar => `/assets/avatars/${avatar.folder}/${avatar.placeholder}`),
      ...Object.values(this.backgrounds).map(bg => bg.path)
    ]);

    // Note: This would require additional file system scanning to detect truly unused assets
    
    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }
}

// Singleton instance
export const assetManager = new AssetManager();