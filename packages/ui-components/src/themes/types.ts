// Theme configuration types
export interface VNTheme {
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    backgroundSecondary: string
    text: string
    textSecondary: string
    textMuted: string
    border: string
    shadow: string
    success: string
    warning: string
    error: string
    overlay: string
  }
  fonts: {
    primary: string
    secondary: string
    monospace: string
  }
  typography: {
    fontSizes: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      xxl: string
    }
    lineHeights: {
      tight: number
      normal: number
      relaxed: number
    }
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    xxl: string
  }
  borderRadius: {
    none: string
    sm: string
    md: string
    lg: string
    full: string
  }
  shadows: {
    sm: string
    md: string
    lg: string
    glow: string
  }
  animations: {
    fast: string
    normal: string
    slow: string
  }
}

// Default modern theme
export const modernTheme: VNTheme = {
  name: 'modern',
  colors: {
    primary: '#667eea',
    secondary: '#764ba2', 
    accent: '#f093fb',
    background: '#0f0f23',
    backgroundSecondary: '#1a1a2e',
    text: '#ffffff',
    textSecondary: '#e2e8f0',
    textMuted: '#94a3b8',
    border: '#334155',
    shadow: 'rgba(0, 0, 0, 0.5)',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    overlay: 'rgba(0, 0, 0, 0.8)'
  },
  fonts: {
    primary: 'system-ui, -apple-system, sans-serif',
    secondary: 'Georgia, serif',
    monospace: 'Fira Code, monospace'
  },
  typography: {
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem', 
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.5rem'
    },
    lineHeights: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    glow: '0 0 20px rgba(102, 126, 234, 0.4)'
  },
  animations: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms'
  }
}

// Fantasy theme
export const fantasyTheme: VNTheme = {
  ...modernTheme,
  name: 'fantasy',
  colors: {
    primary: '#d4af37',
    secondary: '#8b4513',
    accent: '#ff6b6b',
    background: '#1a0f0a',
    backgroundSecondary: '#2d1810',
    text: '#f4e4c1',
    textSecondary: '#e6d3a7',
    textMuted: '#c9a876',
    border: '#5d4e37',
    shadow: 'rgba(139, 69, 19, 0.5)',
    success: '#228b22',
    warning: '#ff8c00',
    error: '#dc143c',
    overlay: 'rgba(26, 15, 10, 0.9)'
  },
  fonts: {
    primary: 'Cinzel, serif',
    secondary: 'Libre Baskerville, serif',
    monospace: 'Courier New, monospace'
  }
}

// Sci-fi theme 
export const sciFiTheme: VNTheme = {
  ...modernTheme,
  name: 'sci-fi',
  colors: {
    primary: '#00ffff',
    secondary: '#ff00ff',
    accent: '#00ff00',
    background: '#000814',
    backgroundSecondary: '#001d3d',
    text: '#e0e0e0',
    textSecondary: '#b3b3b3',
    textMuted: '#808080',
    border: '#003566',
    shadow: 'rgba(0, 255, 255, 0.3)',
    success: '#00ff88',
    warning: '#ffaa00',
    error: '#ff0040',
    overlay: 'rgba(0, 8, 20, 0.95)'
  },
  fonts: {
    primary: 'Orbitron, monospace',
    secondary: 'Exo 2, sans-serif',
    monospace: 'Share Tech Mono, monospace'
  }
}

// Retro theme
export const retroTheme: VNTheme = {
  ...modernTheme,
  name: 'retro',
  colors: {
    primary: '#ff6b9d',
    secondary: '#4ecdc4',
    accent: '#ffe66d',
    background: '#2d1b69',
    backgroundSecondary: '#11071f',
    text: '#ffffff',
    textSecondary: '#f0f0f0',
    textMuted: '#cccccc',
    border: '#7209b7',
    shadow: 'rgba(255, 107, 157, 0.4)',
    success: '#4ecdc4',
    warning: '#ffe66d',
    error: '#ff006e',
    overlay: 'rgba(45, 27, 105, 0.9)'
  },
  fonts: {
    primary: 'Press Start 2P, monospace',
    secondary: 'Righteous, cursive',
    monospace: 'VT323, monospace'
  }
}

export const themes = {
  modern: modernTheme,
  fantasy: fantasyTheme,
  'sci-fi': sciFiTheme,
  retro: retroTheme
}

export type ThemeName = keyof typeof themes