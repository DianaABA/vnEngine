import React, { useState, useEffect } from 'react'
import { useTheme } from '../themes/ThemeProvider'
import { ThemeName, themes } from '../themes/types'
import './SettingsMenu.css'

export interface SettingsData {
  masterVolume: number
  musicVolume: number
  sfxVolume: number
  textSpeed: number
  autoPlayDelay: number
  fullscreen: boolean
  textSize: 'small' | 'medium' | 'large'
  theme: ThemeName
  language?: string
  // Accessibility & presentation
  textScale?: number
  highContrast?: boolean
  dyslexicFont?: boolean
  speakerFocus?: boolean
}

export interface SettingsMenuProps {
  isOpen: boolean
  onClose: () => void
  onSave: (value: SettingsData) => void
  currentSettings: SettingsData
  availableLanguages?: Array<{ code: string; name: string }>
  enableThemeSelection?: boolean
  enableFullscreenToggle?: boolean
}

const defaultSettings: SettingsData = {
  masterVolume: 80,
  musicVolume: 70,
  sfxVolume: 80,
  textSpeed: 50,
  autoPlayDelay: 3000,
  fullscreen: false,
  textSize: 'medium',
  theme: 'modern',
  language: 'en',
  textScale: 100,
  highContrast: false,
  dyslexicFont: false,
  speakerFocus: true
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  currentSettings,
  availableLanguages = [{ code: 'en', name: 'English' }],
  enableThemeSelection = true,
  enableFullscreenToggle = true
}) => {
  const { setTheme } = useTheme()
  const [prefs, setPrefs] = useState<SettingsData>(currentSettings || defaultSettings)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    setPrefs(currentSettings || defaultSettings)
    setHasChanges(false)
  }, [currentSettings])

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCancel()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  const handleSettingChange = (key: keyof SettingsData, value: any) => {
    setPrefs(prev => ({
      ...prev,
      [key]: value
    }))
    setHasChanges(true)

    // Apply theme immediately for preview
    if (key === 'theme') {
      setTheme(value)
    }
  }

  const handleSave = () => {
    onSave(prefs)
    setHasChanges(false)
    onClose()
  }

  const handleReset = () => {
    setPrefs(defaultSettings)
    setTheme(defaultSettings.theme)
    setHasChanges(true)
  }

  const handleCancel = () => {
    if (hasChanges) {
      // Revert theme if it was changed
      if (prefs.theme !== currentSettings?.theme) {
        setTheme(currentSettings?.theme || 'modern')
      }
    }
    setPrefs(currentSettings || defaultSettings)
    setHasChanges(false)
    onClose()
  }

  const getSpeedLabel = (speed: number) => {
    if (speed < 30) return 'Slow'
    if (speed < 70) return 'Medium'
    return 'Fast'
  }

  if (!isOpen) return null

  return (
    <div className="vn-settings-overlay" onClick={handleCancel}>
      <div className="vn-settings-menu" onClick={(e) => e.stopPropagation()}>
        <div className="vn-settings-header">
          <h2>⚙️ Settings</h2>
          <button 
            className="vn-settings-close-btn" 
            onClick={handleCancel}
            aria-label="Close settings"
          >
            ✕
          </button>
        </div>

        <div className="vn-settings-content">
          {/* Audio Settings */}
          <div className="vn-settings-section">
            <h3>🔊 Audio</h3>
            
            <div className="vn-setting-item">
              <label htmlFor="master-volume">Master Volume</label>
              <div className="vn-slider-container">
                <input
                  id="master-volume"
                  type="range"
                  min="0"
                  max="100"
                  value={prefs.masterVolume}
                  onChange={(e) => handleSettingChange('masterVolume', parseInt(e.target.value))}
                />
                <span>{prefs.masterVolume}%</span>
              </div>
            </div>

            <div className="vn-setting-item">
              <label htmlFor="music-volume">Music Volume</label>
              <div className="vn-slider-container">
                <input
                  id="music-volume"
                  type="range"
                  min="0"
                  max="100"
                  value={prefs.musicVolume}
                  onChange={(e) => handleSettingChange('musicVolume', parseInt(e.target.value))}
                />
                <span>{prefs.musicVolume}%</span>
              </div>
            </div>

            <div className="vn-setting-item">
              <label htmlFor="sfx-volume">SFX Volume</label>
              <div className="vn-slider-container">
                <input
                  id="sfx-volume"
                  type="range"
                  min="0"
                  max="100"
                  value={prefs.sfxVolume}
                  onChange={(e) => handleSettingChange('sfxVolume', parseInt(e.target.value))}
                />
                <span>{prefs.sfxVolume}%</span>
              </div>
            </div>
          </div>

          {/* Text Settings */}
          <div className="vn-settings-section">
            <h3>📖 Text & Reading</h3>
            
            <div className="vn-setting-item">
              <label htmlFor="text-speed">Text Speed</label>
              <div className="vn-slider-container">
                <input
                  id="text-speed"
                  type="range"
                  min="10"
                  max="100"
                  value={prefs.textSpeed}
                  onChange={(e) => handleSettingChange('textSpeed', parseInt(e.target.value))}
                />
                <span className="vn-speed-label">
                  {getSpeedLabel(prefs.textSpeed)}
                </span>
              </div>
            </div>

            <div className="vn-setting-item">
              <label htmlFor="auto-play-delay">Auto-Play Delay</label>
              <div className="vn-slider-container">
                <input
                  id="auto-play-delay"
                  type="range"
                  min="1000"
                  max="8000"
                  step="500"
                  value={prefs.autoPlayDelay}
                  onChange={(e) => handleSettingChange('autoPlayDelay', parseInt(e.target.value))}
                />
                <span>{prefs.autoPlayDelay / 1000}s</span>
              </div>
            </div>

            <div className="vn-setting-item">
              <label htmlFor="text-size">Text Size</label>
              <select 
                id="text-size"
                value={prefs.textSize}
                onChange={(e) => handleSettingChange('textSize', e.target.value)}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div className="vn-setting-item">
              <label htmlFor="text-scale">Text Scale</label>
              <div className="vn-slider-container">
                <input
                  id="text-scale"
                  type="range"
                  min="90"
                  max="130"
                  step="1"
                  value={prefs.textScale ?? 100}
                  onChange={(e) => handleSettingChange('textScale', parseInt(e.target.value))}
                />
                <span>{prefs.textScale ?? 100}%</span>
              </div>
            </div>
          </div>

          {/* Display Settings */}
          <div className="vn-settings-section">
            <h3>🖥️ Display</h3>
            
            {enableFullscreenToggle && (
              <div className="vn-setting-item">
                <label htmlFor="fullscreen">Fullscreen</label>
                <input
                  id="fullscreen"
                  type="checkbox"
                  checked={prefs.fullscreen}
                  onChange={(e) => handleSettingChange('fullscreen', e.target.checked)}
                />
              </div>
            )}

            {enableThemeSelection && (
              <div className="vn-setting-item">
                <label htmlFor="theme">Theme</label>
                <select 
                  id="theme"
                  value={prefs.theme}
                  onChange={(e) => handleSettingChange('theme', e.target.value as ThemeName)}
                >
                  {Object.keys(themes).map((themeName) => (
                    <option key={themeName} value={themeName}>
                      {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {availableLanguages.length > 1 && (
              <div className="vn-setting-item">
                <label htmlFor="language">Language</label>
                <select 
                  id="language"
                  value={prefs.language}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                >
                  {availableLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="vn-setting-item">
              <label htmlFor="high-contrast">High Contrast</label>
              <input
                id="high-contrast"
                type="checkbox"
                checked={!!prefs.highContrast}
                onChange={(e) => handleSettingChange('highContrast', e.target.checked)}
              />
            </div>

            <div className="vn-setting-item">
              <label htmlFor="dyslexic-font">Dyslexic-friendly Font</label>
              <input
                id="dyslexic-font"
                type="checkbox"
                checked={!!prefs.dyslexicFont}
                onChange={(e) => handleSettingChange('dyslexicFont', e.target.checked)}
              />
            </div>

            <div className="vn-setting-item">
              <label htmlFor="speaker-focus">Speaker Focus (dim others)</label>
              <input
                id="speaker-focus"
                type="checkbox"
                checked={prefs.speakerFocus !== false}
                onChange={(e) => handleSettingChange('speakerFocus', e.target.checked)}
              />
            </div>
          </div>
        </div>

        <div className="vn-settings-footer">
          <button className="vn-reset-btn" onClick={handleReset}>
            Reset to Default
          </button>
          <div className="vn-action-buttons">
            <button className="vn-cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button 
              className={`vn-save-btn ${hasChanges ? 'has-changes' : ''}`}
              onClick={handleSave}
              disabled={!hasChanges}
            >
              {hasChanges ? 'Save Changes' : 'Saved'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsMenu