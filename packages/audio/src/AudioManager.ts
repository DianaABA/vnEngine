/**
 * vnEngine Advanced Audio Manager
 * Handles background music, sound effects, and audio transitions with crossfading
 * Ported from ChakraHearts with enhancements for all VN projects
 */

export interface AudioTrack {
  id: string;
  name: string;
  path: string;
  loop: boolean;
  volume: number;
  category: 'bgm' | 'sfx' | 'voice' | 'ambient';
}

export interface AudioConfig {
  bgmVolume: number;
  sfxVolume: number;
  voiceVolume: number;
  masterVolume: number;
  muted: boolean;
}

export class AudioManager {
  private tracks: Map<string, HTMLAudioElement> = new Map();
  private currentBGM: string | null = null;
  private config: AudioConfig = {
    bgmVolume: 0.7,
    sfxVolume: 0.8,
    voiceVolume: 0.9,
    masterVolume: 1.0,
    muted: false
  };
  
  private fadeIntervals: Map<string, number> = new Map();
  private audioContext: AudioContext | null = null;

  constructor() {
    // Load saved audio settings
    this.loadSettings();
    
    // Set up audio context for better browser compatibility
    this.initializeAudioContext();
  }

  private initializeAudioContext() {
    // Create audio context for better control
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!this.audioContext) {
        this.audioContext = new AudioContext();
      }
    }
  }

  // Load audio settings from localStorage
  private loadSettings() {
    try {
      const saved = localStorage.getItem('vnengine-audio-settings');
      if (saved) {
        this.config = { ...this.config, ...JSON.parse(saved) };
      }
    } catch (error) {
      console.warn('Failed to load audio settings:', error);
    }
  }

  // Save audio settings to localStorage
  public saveSettings() {
    try {
      localStorage.setItem('vnengine-audio-settings', JSON.stringify(this.config));
    } catch (error) {
      console.warn('Failed to save audio settings:', error);
    }
  }

  // Register an audio track
  public registerTrack(track: AudioTrack): Promise<void> {
    return new Promise((resolve, reject) => {
      const audio = new Audio(track.path);
      audio.loop = track.loop;
      audio.preload = 'auto';
      
      audio.addEventListener('canplaythrough', () => {
        this.tracks.set(track.id, audio);
        this.applyVolumeSettings(audio, track.category);
        resolve();
      });
      
      audio.addEventListener('error', () => {
        console.error(`Failed to load audio track: ${track.id}`);
        reject(new Error(`Failed to load audio track: ${track.id}`));
      });
      
      // Start loading
      audio.load();
    });
  }

  // Apply volume settings based on category
  private applyVolumeSettings(audio: HTMLAudioElement, category: AudioTrack['category']) {
    if (this.config.muted) {
      audio.volume = 0;
      return;
    }

    let categoryVolume: number;
    switch (category) {
      case 'bgm':
        categoryVolume = this.config.bgmVolume;
        break;
      case 'sfx':
        categoryVolume = this.config.sfxVolume;
        break;
      case 'voice':
        categoryVolume = this.config.voiceVolume;
        break;
      case 'ambient':
        categoryVolume = this.config.bgmVolume; // Use BGM volume for ambient
        break;
      default:
        categoryVolume = 1.0;
    }

    audio.volume = categoryVolume * this.config.masterVolume;
  }

  // Play a track
  public async playTrack(trackId: string, fadeIn: boolean = false): Promise<void> {
    const audio = this.tracks.get(trackId);
    if (!audio) {
      throw new Error(`Track not found: ${trackId}`);
    }

    // Resume audio context if suspended (browser policy)
    if (this.audioContext?.state === 'suspended') {
      await this.audioContext.resume();
    }

    if (fadeIn) {
      audio.volume = 0;
      audio.play();
      this.fadeIn(trackId, 1000); // 1 second fade
    } else {
      audio.play();
    }
  }

  // Stop a track
  public stopTrack(trackId: string, fadeOut: boolean = false): Promise<void> {
    return new Promise((resolve) => {
      const audio = this.tracks.get(trackId);
      if (!audio) {
        resolve();
        return;
      }

      if (fadeOut) {
        this.fadeOut(trackId, 1000).then(() => {
          audio.pause();
          audio.currentTime = 0;
          resolve();
        });
      } else {
        audio.pause();
        audio.currentTime = 0;
        resolve();
      }
    });
  }

  // Play background music with crossfading
  public async playBGM(trackId: string, crossfade: boolean = true): Promise<void> {
    if (this.currentBGM === trackId) {
      return; // Already playing this track
    }

    const newTrack = this.tracks.get(trackId);
    if (!newTrack) {
      throw new Error(`BGM track not found: ${trackId}`);
    }

    // Stop current BGM with crossfade
    if (this.currentBGM && crossfade) {
      const fadePromises = [
        this.stopTrack(this.currentBGM, true),
        this.playTrack(trackId, true)
      ];
      await Promise.all(fadePromises);
    } else if (this.currentBGM) {
      await this.stopTrack(this.currentBGM);
      await this.playTrack(trackId);
    } else {
      await this.playTrack(trackId, crossfade);
    }

    this.currentBGM = trackId;
  }

  // Stop current BGM
  public async stopBGM(fadeOut: boolean = true): Promise<void> {
    if (this.currentBGM) {
      await this.stopTrack(this.currentBGM, fadeOut);
      this.currentBGM = null;
    }
  }

  // Play sound effect
  public async playSFX(trackId: string): Promise<void> {
    await this.playTrack(trackId);
  }

  // Fade in a track
  private fadeIn(trackId: string, duration: number): Promise<void> {
    return new Promise((resolve) => {
      const audio = this.tracks.get(trackId);
      if (!audio) {
        resolve();
        return;
      }

      const startVolume = 0;
      const targetVolume = audio.volume;
      const steps = 50;
      const stepTime = duration / steps;
      const volumeStep = (targetVolume - startVolume) / steps;
      
      let currentStep = 0;
      audio.volume = startVolume;

      const interval = setInterval(() => {
        currentStep++;
        audio.volume = Math.min(startVolume + (volumeStep * currentStep), targetVolume);
        
        if (currentStep >= steps) {
          clearInterval(interval);
          this.fadeIntervals.delete(trackId);
          resolve();
        }
      }, stepTime);

      this.fadeIntervals.set(trackId, interval);
    });
  }

  // Fade out a track
  private fadeOut(trackId: string, duration: number): Promise<void> {
    return new Promise((resolve) => {
      const audio = this.tracks.get(trackId);
      if (!audio) {
        resolve();
        return;
      }

      const startVolume = audio.volume;
      const steps = 50;
      const stepTime = duration / steps;
      const volumeStep = startVolume / steps;
      
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        audio.volume = Math.max(startVolume - (volumeStep * currentStep), 0);
        
        if (currentStep >= steps) {
          clearInterval(interval);
          this.fadeIntervals.delete(trackId);
          resolve();
        }
      }, stepTime);

      this.fadeIntervals.set(trackId, interval);
    });
  }

  // Update volume settings
  public setVolume(category: keyof AudioConfig, volume: number) {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    
    if (category === 'bgmVolume') {
      this.config.bgmVolume = clampedVolume;
    } else if (category === 'sfxVolume') {
      this.config.sfxVolume = clampedVolume;
    } else if (category === 'voiceVolume') {
      this.config.voiceVolume = clampedVolume;
    } else if (category === 'masterVolume') {
      this.config.masterVolume = clampedVolume;
    } else if (category === 'muted') {
      this.config.muted = volume > 0.5; // Treat as boolean
    }
    
    // Apply to all tracks of this category
    this.tracks.forEach((audio, trackId) => {
      this.updateTrackVolume(trackId);
    });
    
    this.saveSettings();
  }

  // Update individual track volume
  private updateTrackVolume(trackId: string) {
    const audio = this.tracks.get(trackId);
    if (audio) {
      const category = this.getTrackCategory(trackId);
      this.applyVolumeSettings(audio, category);
    }
  }

  // Get track category (enhanced - could be customized per project)
  private getTrackCategory(trackId: string): AudioTrack['category'] {
    if (trackId.includes('bgm') || trackId.includes('theme') || trackId.includes('ambient')) {
      return 'bgm';
    } else if (trackId.includes('sfx') || trackId.includes('sound')) {
      return 'sfx';
    } else if (trackId.includes('voice')) {
      return 'voice';
    }
    return 'bgm'; // Default
  }

  // Mute/unmute all audio
  public setMuted(muted: boolean) {
    this.config.muted = muted;
    this.tracks.forEach((audio) => {
      if (muted) {
        audio.volume = 0;
      } else {
        const category = this.getTrackCategory(audio.src);
        this.applyVolumeSettings(audio, category);
      }
    });
    this.saveSettings();
  }

  // Get current config
  public getConfig(): AudioConfig {
    return { ...this.config };
  }

  // Get current BGM
  public getCurrentBGM(): string | null {
    return this.currentBGM;
  }

  // Preload multiple tracks
  public async preloadTracks(tracks: AudioTrack[]): Promise<void> {
    const loadPromises = tracks.map(track => this.registerTrack(track));
    await Promise.all(loadPromises);
  }

  // Clean up
  public dispose() {
    // Clear all fade intervals
    this.fadeIntervals.forEach(interval => clearInterval(interval));
    this.fadeIntervals.clear();
    
    // Stop and clean up all tracks
    this.tracks.forEach(audio => {
      audio.pause();
      audio.src = '';
    });
    this.tracks.clear();
    
    // Close audio context
    if (this.audioContext) {
      this.audioContext.close();
    }
  }

  // Legacy compatibility methods (for existing vnEngine projects)
  playSound(src: string) {
    const audio = new Audio(src);
    audio.play();
  }

  playMusic(src: string, loop = true) {
    this.stopMusic();
    const audio = new Audio(src);
    audio.loop = loop;
    audio.play();
  }

  stopMusic() {
    if (this.currentBGM) {
      this.stopBGM(false);
    }
  }
}
