import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { VNTheme, ThemeName, themes } from './types'

interface ThemeContextValue {
  theme: VNTheme
  themeName: ThemeName
  setTheme: (name: ThemeName) => void
  applyTheme: (theme: VNTheme) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: ThemeName
  storageKey?: string
}

export function ThemeProvider({ 
  children, 
  defaultTheme = 'modern',
  storageKey = 'vn-theme'
}: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<ThemeName>(defaultTheme)
  const [theme, setTheme] = useState<VNTheme>(themes[defaultTheme])

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved && saved in themes) {
        const savedTheme = saved as ThemeName
        setThemeName(savedTheme)
        setTheme(themes[savedTheme])
      }
    } catch (e) {
      console.warn('Failed to load theme from localStorage:', e)
    }
  }, [storageKey])

  // Apply CSS custom properties when theme changes
  useEffect(() => {
    applyThemeToDOM(theme)
  }, [theme])

  const handleSetTheme = (name: ThemeName) => {
    setThemeName(name)
    setTheme(themes[name])
    try {
      localStorage.setItem(storageKey, name)
    } catch (e) {
      console.warn('Failed to save theme to localStorage:', e)
    }
  }

  const handleApplyTheme = (customTheme: VNTheme) => {
    setTheme(customTheme)
    // Don't save custom themes to localStorage
  }

  const value: ThemeContextValue = {
    theme,
    themeName,
    setTheme: handleSetTheme,
    applyTheme: handleApplyTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Apply theme to DOM via CSS custom properties
function applyThemeToDOM(theme: VNTheme) {
  const root = document.documentElement
  
  // Colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--vn-color-${key}`, value)
  })
  
  // Typography
  root.style.setProperty('--vn-font-primary', theme.fonts.primary)
  root.style.setProperty('--vn-font-secondary', theme.fonts.secondary)
  root.style.setProperty('--vn-font-monospace', theme.fonts.monospace)
  
  Object.entries(theme.typography.fontSizes).forEach(([key, value]) => {
    root.style.setProperty(`--vn-text-${key}`, value)
  })
  
  Object.entries(theme.typography.lineHeights).forEach(([key, value]) => {
    root.style.setProperty(`--vn-leading-${key}`, value.toString())
  })
  
  // Spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--vn-space-${key}`, value)
  })
  
  // Border radius
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    root.style.setProperty(`--vn-radius-${key}`, value)
  })
  
  // Shadows
  Object.entries(theme.shadows).forEach(([key, value]) => {
    root.style.setProperty(`--vn-shadow-${key}`, value)
  })
  
  // Animations
  Object.entries(theme.animations).forEach(([key, value]) => {
    root.style.setProperty(`--vn-duration-${key}`, value)
  })
}