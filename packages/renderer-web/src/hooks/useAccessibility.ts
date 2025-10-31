/**
 * Renderer-web accessibility hook
 * Applies high-contrast and dyslexic-font classes to <html> and a --font-size-scale variable
 * based on settings emitted from engine UI or app state.
 */
import { useEffect } from 'react';

export interface AccessibilitySettings {
  textScale?: number; // 90-130
  highContrast?: boolean;
  dyslexicFont?: boolean;
}

export function useAccessibility(settings: AccessibilitySettings) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    // Class toggles
    if (settings.highContrast) root.classList.add('high-contrast'); else root.classList.remove('high-contrast');
    if (settings.dyslexicFont) root.classList.add('dyslexic-font'); else root.classList.remove('dyslexic-font');
    // Font scaling variable
    const scale = Math.max(90, Math.min(130, settings.textScale ?? 100));
    root.style.setProperty('--font-size-scale', String(scale / 100));
  }, [settings.highContrast, settings.dyslexicFont, settings.textScale]);
}

export default useAccessibility;
