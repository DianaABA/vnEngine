/**
 * vnEngine VFX Manager
 * Handles visual effects, screen shake, overlays, and cinematic effects
 * Ported from ChakraHearts for all VN projects
 */

export interface VFXEffect {
  id: string;
  type: 'screen_shake' | 'overlay' | 'particle' | 'transition' | 'ui_effect';
  duration?: number;
  intensity?: 'subtle' | 'moderate' | 'intense' | 'extreme';
  properties?: Record<string, any>;
}

export interface VFXState {
  activeEffects: Set<string>;
  screenShake: {
    active: boolean;
    intensity: string;
    duration: number;
  };
  overlays: {
    background: string;
    ui: string;
    particle: string;
  };
  transitions: {
    fadeLevel: number;
    blurLevel: number;
    colorFilter: string;
  };
}

export type VFXCallback = (state: VFXState) => void;

export class VFXManager {
  private state: VFXState = {
    activeEffects: new Set(),
    screenShake: {
      active: false,
      intensity: '',
      duration: 0
    },
    overlays: {
      background: '',
      ui: '',
      particle: ''
    },
    transitions: {
      fadeLevel: 0,
      blurLevel: 0,
      colorFilter: ''
    }
  };

  private callbacks: Set<VFXCallback> = new Set();
  private timeouts: Map<string, number> = new Map();

  constructor() {
    // Initialize VFX system
  }

  // Subscribe to VFX state changes
  public subscribe(callback: VFXCallback): () => void {
    this.callbacks.add(callback);
    return () => this.callbacks.delete(callback);
  }

  // Notify all subscribers of state changes
  private notify() {
    this.callbacks.forEach(callback => callback(this.state));
  }

  // Execute a VFX effect
  public executeEffect(effect: VFXEffect): void {
    const effectId = `${effect.type}_${effect.id}_${Date.now()}`;
    this.state.activeEffects.add(effectId);

    switch (effect.type) {
      case 'screen_shake':
        this.handleScreenShake(effect, effectId);
        break;
      case 'overlay':
        this.handleOverlay(effect, effectId);
        break;
      case 'particle':
        this.handleParticle(effect, effectId);
        break;
      case 'transition':
        this.handleTransition(effect, effectId);
        break;
      case 'ui_effect':
        this.handleUIEffect(effect, effectId);
        break;
    }

    this.notify();
  }

  // Handle screen shake effects
  private handleScreenShake(effect: VFXEffect, effectId: string): void {
    const { id, intensity = 'moderate', duration = 1000 } = effect;
    
    // Map shake intensities to CSS classes
    let shakeClass = '';
    let effectDuration = duration;

    switch (id) {
      case 'screen_shake_short':
      case 'screen_shake_subtle':
        shakeClass = 'screen-shake-subtle';
        effectDuration = 600;
        break;
      case 'screen_shake_long':
      case 'screen_shake_intense':
        shakeClass = 'screen-shake-intense';
        effectDuration = 1200;
        break;
      case 'screen_shake_violent':
      case 'screen_shake_earthquake':
        shakeClass = 'screen-shake-earthquake';
        effectDuration = 2000;
        break;
      default:
        // Custom intensity mapping
        if (intensity === 'subtle') shakeClass = 'screen-shake-subtle';
        else if (intensity === 'moderate') shakeClass = 'screen-shake-moderate';
        else if (intensity === 'intense') shakeClass = 'screen-shake-intense';
        else if (intensity === 'extreme') shakeClass = 'screen-shake-earthquake';
    }

    // Update state
    this.state.screenShake = {
      active: true,
      intensity: shakeClass,
      duration: effectDuration
    };

    // Clear existing timeout
    const existingTimeout = this.timeouts.get('screen_shake');
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    // Set timeout to end effect
    const timeout = setTimeout(() => {
      this.state.screenShake.active = false;
      this.state.screenShake.intensity = '';
      this.state.activeEffects.delete(effectId);
      this.timeouts.delete('screen_shake');
      this.notify();
    }, effectDuration);

    this.timeouts.set('screen_shake', timeout);
  }

  // Handle overlay effects
  private handleOverlay(effect: VFXEffect, effectId: string): void {
    const { id, duration = 3000 } = effect;
    
    let overlayClass = '';
    let overlayType: 'background' | 'ui' | 'particle' = 'background';

    switch (id) {
      case 'red_glow_flood':
      case 'red_glow_veins_spreading':
        overlayClass = 'ember-glow';
        overlayType = 'background';
        break;
      case 'blue_shimmer':
      case 'air_shimmer':
        overlayClass = 'mystical-shimmer';
        overlayType = 'background';
        break;
      case 'dust_cascade_massive':
        overlayClass = 'dust-particles';
        overlayType = 'particle';
        break;
      case 'hud_flicker_soft':
      case 'hud_flicker_harsh':
        overlayClass = 'ui-flicker';
        overlayType = 'ui';
        break;
      case 'hud_glitch_red':
        overlayClass = 'ui-glitch-red';
        overlayType = 'ui';
        break;
    }

    // Update state
    this.state.overlays[overlayType] = overlayClass;

    // Set timeout to end effect if duration is specified
    if (duration > 0) {
      const timeout = setTimeout(() => {
        this.state.overlays[overlayType] = '';
        this.state.activeEffects.delete(effectId);
        this.timeouts.delete(effectId);
        this.notify();
      }, duration);

      this.timeouts.set(effectId, timeout);
    }
  }

  // Handle particle effects
  private handleParticle(effect: VFXEffect, effectId: string): void {
    const { id, duration = 2000 } = effect;
    
    // Particle effects can be handled by CSS animations or canvas
    this.state.overlays.particle = `particles-${id}`;

    if (duration > 0) {
      const timeout = setTimeout(() => {
        this.state.overlays.particle = '';
        this.state.activeEffects.delete(effectId);
        this.timeouts.delete(effectId);
        this.notify();
      }, duration);

      this.timeouts.set(effectId, timeout);
    }
  }

  // Handle transition effects
  private handleTransition(effect: VFXEffect, effectId: string): void {
    const { id, duration = 1000, properties = {} } = effect;

    switch (id) {
      case 'fadeToBlack':
        this.state.transitions.fadeLevel = properties.level || 1.0;
        break;
      case 'fadeIn':
        this.state.transitions.fadeLevel = 0;
        break;
      case 'motion_blur_slash':
      case 'motion_blur_dodge':
      case 'motion_blur_tackle':
        this.state.transitions.blurLevel = properties.blur || 5;
        // Also trigger subtle screen shake for motion effects
        this.executeEffect({
          id: 'motion_shake',
          type: 'screen_shake',
          intensity: 'subtle',
          duration: 400
        });
        break;
    }

    // Auto-clear transition after duration
    if (duration > 0) {
      const timeout = setTimeout(() => {
        this.state.transitions.fadeLevel = 0;
        this.state.transitions.blurLevel = 0;
        this.state.transitions.colorFilter = '';
        this.state.activeEffects.delete(effectId);
        this.timeouts.delete(effectId);
        this.notify();
      }, duration);

      this.timeouts.set(effectId, timeout);
    }
  }

  // Handle UI effects
  private handleUIEffect(effect: VFXEffect, effectId: string): void {
    const { id, duration = 500 } = effect;
    
    // UI effects like button highlights, menu transitions, etc.
    this.state.overlays.ui = `ui-effect-${id}`;

    if (duration > 0) {
      const timeout = setTimeout(() => {
        this.state.overlays.ui = '';
        this.state.activeEffects.delete(effectId);
        this.timeouts.delete(effectId);
        this.notify();
      }, duration);

      this.timeouts.set(effectId, timeout);
    }
  }

  // Clear all effects
  public clearAllEffects(): void {
    // Clear all timeouts
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts.clear();

    // Reset state
    this.state = {
      activeEffects: new Set(),
      screenShake: {
        active: false,
        intensity: '',
        duration: 0
      },
      overlays: {
        background: '',
        ui: '',
        particle: ''
      },
      transitions: {
        fadeLevel: 0,
        blurLevel: 0,
        colorFilter: ''
      }
    };

    this.notify();
  }

  // Clear specific effect type
  public clearEffectType(type: VFXEffect['type']): void {
    switch (type) {
      case 'screen_shake':
        const shakeTimeout = this.timeouts.get('screen_shake');
        if (shakeTimeout) {
          clearTimeout(shakeTimeout);
          this.timeouts.delete('screen_shake');
        }
        this.state.screenShake.active = false;
        this.state.screenShake.intensity = '';
        break;
      case 'overlay':
        this.state.overlays.background = '';
        this.state.overlays.particle = '';
        break;
      case 'ui_effect':
        this.state.overlays.ui = '';
        break;
      case 'transition':
        this.state.transitions.fadeLevel = 0;
        this.state.transitions.blurLevel = 0;
        this.state.transitions.colorFilter = '';
        break;
    }

    this.notify();
  }

  // Get current state
  public getState(): VFXState {
    return { ...this.state };
  }

  // Check if any effects are active
  public hasActiveEffects(): boolean {
    return this.state.activeEffects.size > 0;
  }

  // Clean up
  public dispose(): void {
    this.clearAllEffects();
    this.callbacks.clear();
  }
}