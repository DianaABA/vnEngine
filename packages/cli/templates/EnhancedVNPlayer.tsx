import React, { useState, useEffect, useCallback } from 'react'

// Built-in Theme System
const themes = {
  modern: {
    '--primary-color': '#007bff',
    '--secondary-color': '#6c757d',
    '--accent-color': '#28a745',
    '--background-color': '#ffffff',
    '--surface-color': '#f8f9fa',
    '--text-primary': '#212529',
    '--text-secondary': '#6c757d',
    '--text-accent': '#007bff',
    '--border-color': '#dee2e6',
    '--shadow': '0 2px 4px rgba(0,0,0,0.1)',
    '--shadow-lg': '0 8px 16px rgba(0,0,0,0.15)',
    '--border-radius': '8px',
    '--font-family': "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    '--transition': 'all 0.2s ease'
  },
  fantasy: {
    '--primary-color': '#8b4513',
    '--secondary-color': '#daa520',
    '--accent-color': '#32cd32',
    '--background-color': '#f5f5dc',
    '--surface-color': '#faebd7',
    '--text-primary': '#2f4f4f',
    '--text-secondary': '#696969',
    '--text-accent': '#8b4513',
    '--border-color': '#daa520',
    '--shadow': '0 3px 6px rgba(139,69,19,0.2)',
    '--shadow-lg': '0 8px 20px rgba(139,69,19,0.3)',
    '--border-radius': '12px',
    '--font-family': "'Cinzel', 'Times New Roman', serif",
    '--transition': 'all 0.3s ease'
  },
  scifi: {
    '--primary-color': '#00ffff',
    '--secondary-color': '#ff00ff',
    '--accent-color': '#00ff00',
    '--background-color': '#0a0a0a',
    '--surface-color': '#1a1a1a',
    '--text-primary': '#ffffff',
    '--text-secondary': '#cccccc',
    '--text-accent': '#00ffff',
    '--border-color': '#333333',
    '--shadow': '0 0 10px rgba(0,255,255,0.3)',
    '--shadow-lg': '0 0 20px rgba(0,255,255,0.5)',
    '--border-radius': '4px',
    '--font-family': "'Orbitron', 'Courier New', monospace",
    '--transition': 'all 0.2s ease'
  },
  retro: {
    '--primary-color': '#ff6b35',
    '--secondary-color': '#f7931e',
    '--accent-color': '#ffcc02',
    '--background-color': '#2d1b69',
    '--surface-color': '#3d2b79',
    '--text-primary': '#ffffff',
    '--text-secondary': '#e0e0e0',
    '--text-accent': '#ffcc02',
    '--border-color': '#ff6b35',
    '--shadow': '4px 4px 0px rgba(255,107,53,0.5)',
    '--shadow-lg': '8px 8px 0px rgba(255,107,53,0.7)',
    '--border-radius': '0px',
    '--font-family': "'Press Start 2P', 'Courier New', monospace",
    '--transition': 'none'
  }
}

// Game State Management
interface GameState {
  currentTheme: keyof typeof themes
  textSpeed: number
  autoPlay: boolean
  volume: number
  musicVolume: number
  sfxVolume: number
  fullscreen: boolean
  textSize: number
}

const defaultGameState: GameState = {
  currentTheme: 'modern',
  textSpeed: 50,
  autoPlay: false,
  volume: 80,
  musicVolume: 70,
  sfxVolume: 80,
  fullscreen: false,
  textSize: 16
}

// UI Components
const ThemeProvider: React.FC<{ theme: keyof typeof themes; children: React.ReactNode }> = ({ theme, children }) => {
  useEffect(() => {
    const root = document.documentElement
    const themeVars = themes[theme]
    Object.entries(themeVars).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
  }, [theme])

  return <div className="theme-provider">{children}</div>
}

const MainMenu: React.FC<{
  onNewGame: () => void
  onContinue: () => void
  onLoadGame: () => void
  onSettings: () => void
  onGallery: () => void
  onExit: () => void
  title: string
  subtitle?: string
  canContinue: boolean
}> = ({ onNewGame, onContinue, onLoadGame, onSettings, onGallery, onExit, title, subtitle, canContinue }) => {
  return (
    <div className="main-menu">
      <div className="main-menu-content">
        <div className="main-menu-header">
          <h1 className="main-menu-title">{title}</h1>
          {subtitle && <p className="main-menu-subtitle">{subtitle}</p>}
        </div>
        
        <nav className="main-menu-nav">
          <button className="menu-button primary" onClick={onNewGame}>
            New Game
          </button>
          
          {canContinue && (
            <button className="menu-button" onClick={onContinue}>
              Continue
            </button>
          )}
          
          <button className="menu-button" onClick={onLoadGame}>
            Load Game
          </button>
          
          <button className="menu-button" onClick={onSettings}>
            Settings
          </button>
          
          <button className="menu-button" onClick={onGallery}>
            Gallery
          </button>
          
          <button className="menu-button content-warning-button" onClick={() => alert('⚠️ CONTENT WARNING\n\nThis story contains themes of death, grief, trauma, and intense emotional healing. Eastern spiritual practices are used with deep respect for their sacred origins.\n\nThis is not medical advice. Please prioritize your mental health and take breaks as needed.\n\nPress OK to continue.')}>
            ⚠️ Content Warning
          </button>
          
          <button className="menu-button" onClick={onExit}>
            Exit
          </button>
        </nav>
      </div>
    </div>
  )
}

const DialogueBox: React.FC<{
  character?: string
  text: string
  avatar?: string
  onNext: () => void
  onSkip?: () => void
  isTyping: boolean
  choices?: Array<{ text: string; action: () => void }>
}> = ({ character, text, avatar, onNext, onSkip, isTyping, choices }) => {
  return (
    <div className="dialogue-box">
      <div className="dialogue-content">
        {character && (
          <div className="dialogue-header">
            {avatar && <img src={avatar} alt={character} className="character-avatar" />}
            <span className="character-name">{character}</span>
          </div>
        )}
        
        <div className="dialogue-text">
          <p>{text}</p>
        </div>
        
        {choices ? (
          <div className="dialogue-choices">
            {choices.map((choice, index) => (
              <button
                key={index}
                className="choice-button"
                onClick={choice.action}
              >
                {choice.text}
              </button>
            ))}
          </div>
        ) : (
          <div className="dialogue-controls">
            <button 
              className="dialogue-next" 
              onClick={onNext}
              disabled={isTyping}
            >
              {isTyping ? '...' : 'Next'}
            </button>
            {onSkip && (
              <button className="dialogue-skip" onClick={onSkip}>
                Skip
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const SettingsMenu: React.FC<{
  gameState: GameState
  onUpdateSettings: (updates: Partial<GameState>) => void
  onClose: () => void
}> = ({ gameState, onUpdateSettings, onClose }) => {
  return (
    <div className="settings-menu">
      <div className="settings-content">
        <div className="settings-header">
          <h2>Settings</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="settings-sections">
          <section className="settings-section">
            <h3>Display</h3>
            <div className="setting-group">
              <label>Theme</label>
              <select 
                value={gameState.currentTheme}
                onChange={(e) => onUpdateSettings({ currentTheme: e.target.value as keyof typeof themes })}
              >
                <option value="modern">Modern</option>
                <option value="fantasy">Fantasy</option>
                <option value="scifi">Sci-Fi</option>
                <option value="retro">Retro</option>
              </select>
            </div>
            <div className="setting-group">
              <label>Text Size</label>
              <input 
                type="range" 
                min="12" 
                max="24" 
                value={gameState.textSize}
                onChange={(e) => onUpdateSettings({ textSize: parseInt(e.target.value) })}
              />
              <span>{gameState.textSize}px</span>
            </div>
          </section>
          
          <section className="settings-section">
            <h3>Audio</h3>
            <div className="setting-group">
              <label>Master Volume</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={gameState.volume}
                onChange={(e) => onUpdateSettings({ volume: parseInt(e.target.value) })}
              />
              <span>{gameState.volume}%</span>
            </div>
            <div className="setting-group">
              <label>Music Volume</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={gameState.musicVolume}
                onChange={(e) => onUpdateSettings({ musicVolume: parseInt(e.target.value) })}
              />
              <span>{gameState.musicVolume}%</span>
            </div>
            <div className="setting-group">
              <label>Sound Effects</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={gameState.sfxVolume}
                onChange={(e) => onUpdateSettings({ sfxVolume: parseInt(e.target.value) })}
              />
              <span>{gameState.sfxVolume}%</span>
            </div>
          </section>
          
          <section className="settings-section">
            <h3>Gameplay</h3>
            <div className="setting-group">
              <label>Text Speed</label>
              <input 
                type="range" 
                min="1" 
                max="100" 
                value={gameState.textSpeed}
                onChange={(e) => onUpdateSettings({ textSpeed: parseInt(e.target.value) })}
              />
              <span>{gameState.textSpeed}%</span>
            </div>
            <div className="setting-group">
              <label>
                <input 
                  type="checkbox" 
                  checked={gameState.autoPlay}
                  onChange={(e) => onUpdateSettings({ autoPlay: e.target.checked })}
                />
                Auto-play
              </label>
            </div>
          </section>
        </div>
        
        <div className="settings-footer">
          <button className="button primary" onClick={onClose}>
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  )
}

const SaveLoadMenu: React.FC<{
  mode: 'save' | 'load'
  saves: Array<{ id: string; name: string; timestamp: Date; thumbnail?: string }>
  onSave?: (slot: string, name: string) => void
  onLoad?: (slot: string) => void
  onDelete?: (slot: string) => void
  onClose: () => void
}> = ({ mode, saves, onSave, onLoad, onDelete, onClose }) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [saveName, setSaveName] = useState('')

  return (
    <div className="save-load-menu">
      <div className="save-load-content">
        <div className="save-load-header">
          <h2>{mode === 'save' ? 'Save Game' : 'Load Game'}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="save-slots">
          {Array.from({ length: 10 }, (_, i) => {
            const slot = `slot${i + 1}`
            const save = saves.find(s => s.id === slot)
            
            return (
              <div 
                key={slot}
                className={`save-slot ${selectedSlot === slot ? 'selected' : ''} ${!save ? 'empty' : ''}`}
                onClick={() => setSelectedSlot(slot)}
              >
                <div className="slot-preview">
                  {save?.thumbnail ? (
                    <img src={save.thumbnail} alt="Save preview" />
                  ) : (
                    <div className="empty-slot">Empty Slot</div>
                  )}
                </div>
                
                <div className="slot-info">
                  <div className="slot-name">
                    {save ? save.name : `Slot ${i + 1}`}
                  </div>
                  {save && (
                    <div className="slot-timestamp">
                      {save.timestamp.toLocaleString()}
                    </div>
                  )}
                </div>
                
                {save && onDelete && (
                  <button 
                    className="delete-button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(slot)
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            )
          })}
        </div>
        
        <div className="save-load-footer">
          {mode === 'save' && (
            <div className="save-name-input">
              <label>Save Name:</label>
              <input 
                type="text" 
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                placeholder="Enter save name..."
              />
            </div>
          )}
          
          <div className="save-load-actions">
            <button 
              className="button primary"
              disabled={!selectedSlot || (mode === 'save' && !saveName)}
              onClick={() => {
                if (selectedSlot) {
                  if (mode === 'save' && onSave) {
                    onSave(selectedSlot, saveName)
                  } else if (mode === 'load' && onLoad) {
                    onLoad(selectedSlot)
                  }
                  onClose()
                }
              }}
            >
              {mode === 'save' ? 'Save' : 'Load'}
            </button>
            <button className="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Enhanced VN Player Component
export const EnhancedVNPlayer: React.FC<{
  engine: any
  assets: any
  config: {
    title: string
    subtitle?: string
    enableMainMenu: boolean
    enableSettings: boolean
    enableSaveLoad: boolean
    defaultTheme: keyof typeof themes
    enableGlitchEffect: boolean
  }
}> = ({ engine, assets, config }) => {
  const [gameState, setGameState] = useState<GameState>({
    ...defaultGameState,
    currentTheme: config.defaultTheme
  })
  const [currentScene, setCurrentScene] = useState<'menu' | 'game' | 'settings' | 'save' | 'load' | 'education'>('menu')
  const [gameStarted, setGameStarted] = useState(false)
  const [saves, setSaves] = useState<Array<{ id: string; name: string; timestamp: Date; thumbnail?: string }>>([])
  const [showEducation, setShowEducation] = useState(false)
  // Load saved settings and game state
  useEffect(() => {
    const savedSettings = localStorage.getItem('vn-settings')
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setGameState(prev => ({ ...prev, ...parsed }))
      } catch (e) {
        console.warn('Failed to load settings:', e)
      }
    }
    
    const savedGames = localStorage.getItem('vn-saves')
    if (savedGames) {
      try {
        const parsed = JSON.parse(savedGames)
        setSaves(parsed.map((save: any) => ({
          ...save,
          timestamp: new Date(save.timestamp)
        })))
      } catch (e) {
        console.warn('Failed to load saves:', e)
      }
    }
  }, [])

  // Save settings when they change
  useEffect(() => {
    localStorage.setItem('vn-settings', JSON.stringify(gameState))
  }, [gameState])

  const updateSettings = useCallback((updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }))
  }, [])

  const handleNewGame = () => {
    setGameStarted(true)
    setCurrentScene('game')
    engine.start()
  }

  const handleContinue = () => {
    setCurrentScene('game')
  }

  const handleSave = (slot: string, name: string) => {
    const saveData = {
      id: slot,
      name,
      timestamp: new Date(),
      gameState: engine.getState(),
      // Add thumbnail generation logic here
    }
    
    const newSaves = saves.filter(s => s.id !== slot)
    newSaves.push(saveData)
    setSaves(newSaves)
    localStorage.setItem('vn-saves', JSON.stringify(newSaves))
  }

  const handleLoad = (slot: string) => {
    const save = saves.find(s => s.id === slot)
    if (save && (save as any).gameState) {
      engine.loadState((save as any).gameState)
      setGameStarted(true)
      setCurrentScene('game')
    }
  }

  const handleDeleteSave = (slot: string) => {
    const newSaves = saves.filter(s => s.id !== slot)
    setSaves(newSaves)
    localStorage.setItem('vn-saves', JSON.stringify(newSaves))
  }

  const canContinue = gameStarted || saves.length > 0

  return (
    <ThemeProvider theme={gameState.currentTheme}>
      <div className="enhanced-vn-player" style={{ fontSize: `${gameState.textSize}px` }}>
        {currentScene === 'menu' && config.enableMainMenu && (
          <MainMenu
            title={config.title}
            subtitle={config.subtitle}
            canContinue={canContinue}
            onNewGame={handleNewGame}
            onContinue={handleContinue}
            onLoadGame={() => setCurrentScene('load')}
            onSettings={() => setCurrentScene('settings')}
            onGallery={() => {/* TODO: Implement gallery */}}
            onExit={() => window.close()}
          />
        )}

        {currentScene === 'game' && (
          <div className="game-view">
            {/* Original VNPlayer would go here, enhanced with dialogue box */}
            <div className="game-content">
              {/* Background, characters, etc. */}
              <DialogueBox
                character="Sample Character"
                text="This is the enhanced VN player with professional UI components!"
                onNext={() => {/* Handle next */}}
                isTyping={false}
              />
            </div>
            
            {/* Game UI overlay */}
            <div className="game-ui">
              <button onClick={() => setCurrentScene('menu')}>Menu</button>
              {config.enableSettings && (
                <button onClick={() => setCurrentScene('settings')}>Settings</button>
              )}
              {config.enableSaveLoad && (
                <>
                  <button onClick={() => setCurrentScene('save')}>Save</button>
                  <button onClick={() => setCurrentScene('load')}>Load</button>
                </>
              )}
              <button onClick={() => setShowEducation(true)} className="education-button">
                🧘 Learn
              </button>
            </div>
          </div>
        )}

        {currentScene === 'settings' && config.enableSettings && (
          <SettingsMenu
            gameState={gameState}
            onUpdateSettings={updateSettings}
            onClose={() => setCurrentScene(gameStarted ? 'game' : 'menu')}
          />
        )}

        {currentScene === 'save' && config.enableSaveLoad && (
          <SaveLoadMenu
            mode="save"
            saves={saves}
            onSave={handleSave}
            onDelete={handleDeleteSave}
            onClose={() => setCurrentScene('game')}
          />
        )}

        {currentScene === 'load' && config.enableSaveLoad && (
          <SaveLoadMenu
            mode="load"
            saves={saves}
            onLoad={handleLoad}
            onDelete={handleDeleteSave}
            onClose={() => setCurrentScene(gameStarted ? 'game' : 'menu')}
          />
        )}

        {/* Education Panel */}
        {showEducation && (
          <div className="education-panel-overlay">
            <div className="education-panel">
              <div className="education-header">
                <h2>🧘 Eastern Philosophy & Healing Guide</h2>
                <button className="close-button" onClick={() => setShowEducation(false)}>×</button>
              </div>
              <div className="education-content">
                {/* Content Warning */}
                <div className="content-warning">
                  <h3>⚠️ Content & Cultural Respect Notice</h3>
                  <div className="warning-content">
                    <p><strong>This content contains themes of:</strong> Death, grief, trauma, emotional healing, spiritual practices, and intense psychological content.</p>
                    
                    <p><strong>Cultural Respect:</strong> The Eastern philosophies, chakra system, and healing practices presented here are used with deep love and respect for their sacred origins. These ancient teachings from Hindu, Buddhist, and yogic traditions are shared to promote healing and understanding.</p>
                    
                    <p><strong>Not Medical Advice:</strong> This content is for educational and entertainment purposes only. It is not a substitute for professional medical, psychological, or spiritual counseling.</p>
                    
                    <p><strong>Self-Care Reminder:</strong> Please take breaks if content feels overwhelming. Your mental health and well-being come first.</p>
                  </div>
                </div>

                <div className="education-intro">
                  <h3>Welcome to the ChakraHearts Learning Center</h3>
                  <p>Discover the ancient wisdom of chakras, healing stages, and Eastern philosophy that forms the foundation of your journey.</p>
                  
                  <div className="quick-guides">
                    <div className="guide-card">
                      <h4>🌈 The Seven Chakras</h4>
                      <p>Energy centers in your body that correspond to different aspects of well-being. Each episode focuses on balancing a specific chakra.</p>
                    </div>
                    
                    <div className="guide-card">
                      <h4>💔 Stages of Healing</h4>
                      <p>Based on the Kübler-Ross model, understanding the emotional journey through loss and transformation.</p>
                    </div>
                    
                    <div className="guide-card">
                      <h4>🌸 Eastern Wisdom</h4>
                      <p>Ancient teachings on compassion, consciousness, and the interconnectedness of all beings.</p>
                    </div>
                  </div>
                  
                  <div className="practice-reminder">
                    <h4>💡 As You Play</h4>
                    <p>Pay attention to the chakra and healing stage for each episode. Consider how the themes relate to your own life and healing journey.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  )
}