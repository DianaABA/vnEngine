/**
 * React hook for vnEngine VFX management
 * Provides screen shake, overlays, and visual effects for VN scenes
 * Ported from ChakraHearts for all VN projects
 */

import { useEffect, useState, useCallback } from 'react';
import { VFXManager, VFXEffect, VFXState } from '@vn/core';

export interface UseVFXReturn {
  // State
  vfxState: VFXState;
  isActive: boolean;
  
  // Controls
  executeEffect: (effect: VFXEffect) => void;
  clearAllEffects: () => void;
  clearEffectType: (type: VFXEffect['type']) => void;
  
  // Convenience methods for common effects
  screenShake: (intensity: 'subtle' | 'moderate' | 'intense' | 'extreme', duration?: number) => void;
  showOverlay: (overlayClass: string, duration?: number) => void;
  fadeToBlack: (duration?: number) => void;
  fadeIn: (duration?: number) => void;
}

export function useVFX(vfxManager?: VFXManager): UseVFXReturn {
  const manager = vfxManager || new VFXManager();
  const [vfxState, setVFXState] = useState<VFXState>(() => manager.getState());

  // Subscribe to VFX state changes
  useEffect(() => {
    const unsubscribe = manager.subscribe((state) => {
      setVFXState(state);
    });

    return unsubscribe;
  }, [manager]);

  // Execute a VFX effect
  const executeEffect = useCallback((effect: VFXEffect) => {
    manager.executeEffect(effect);
  }, [manager]);

  // Clear all effects
  const clearAllEffects = useCallback(() => {
    manager.clearAllEffects();
  }, [manager]);

  // Clear specific effect type
  const clearEffectType = useCallback((type: VFXEffect['type']) => {
    manager.clearEffectType(type);
  }, [manager]);

  // Convenience method for screen shake
  const screenShake = useCallback((intensity: 'subtle' | 'moderate' | 'intense' | 'extreme', duration: number = 1000) => {
    executeEffect({
      id: `shake_${Date.now()}`,
      type: 'screen_shake',
      intensity,
      duration
    });
  }, [executeEffect]);

  // Convenience method for overlays
  const showOverlay = useCallback((overlayClass: string, duration: number = 3000) => {
    executeEffect({
      id: overlayClass,
      type: 'overlay',
      duration,
      properties: { class: overlayClass }
    });
  }, [executeEffect]);

  // Convenience method for fade to black
  const fadeToBlack = useCallback((duration: number = 1000) => {
    executeEffect({
      id: 'fadeToBlack',
      type: 'transition',
      duration,
      properties: { level: 1.0 }
    });
  }, [executeEffect]);

  // Convenience method for fade in
  const fadeIn = useCallback((duration: number = 1000) => {
    executeEffect({
      id: 'fadeIn',
      type: 'transition',
      duration,
      properties: { level: 0 }
    });
  }, [executeEffect]);

  return {
    vfxState,
    isActive: manager.hasActiveEffects(),
    executeEffect,
    clearAllEffects,
    clearEffectType,
    screenShake,
    showOverlay,
    fadeToBlack,
    fadeIn
  };
}

// Hook for automatic VFX CSS class application
export function useVFXClasses(vfxManager?: VFXManager): {
  screenShakeClass: string;
  backgroundOverlay: string;
  uiOverlay: string;
  particleOverlay: string;
  fadeLevel: number;
  blurLevel: number;
} {
  const { vfxState } = useVFX(vfxManager);

  return {
    screenShakeClass: vfxState.screenShake.intensity,
    backgroundOverlay: vfxState.overlays.background,
    uiOverlay: vfxState.overlays.ui,
    particleOverlay: vfxState.overlays.particle,
    fadeLevel: vfxState.transitions.fadeLevel,
    blurLevel: vfxState.transitions.blurLevel
  };
}