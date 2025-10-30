import React, { useState, useEffect } from 'react'
import { useTheme } from '../themes/ThemeProvider'
import './MainMenu.css'

export interface MainMenuProps {
  title?: string
  subtitle?: string
  onNewGame: () => void
  onContinue?: () => void
  onSettings: () => void
  onCredits?: () => void
  onQuit?: () => void
  hasSaveData?: boolean
  enableGlitchEffect?: boolean
  backgroundImage?: string
  logo?: string
  version?: string
  menuItems?: Array<{
    label: string
    action: () => void
    disabled?: boolean
    key: string
  }>
}

const MainMenu: React.FC<MainMenuProps> = ({
  title = 'Visual Novel',
  subtitle = 'A Story Awaits',
  onNewGame,
  onContinue,
  onSettings,
  onCredits,
  onQuit,
  hasSaveData = false,
  enableGlitchEffect = false,
  backgroundImage,
  logo,
  version = 'v1.0.0',
  menuItems
}) => {
  const { theme } = useTheme()
  const [isGlitched, setIsGlitched] = useState(false)
  const [glitchTimer, setGlitchTimer] = useState<number | null>(null)

  // Random glitch effect (only if enabled)
  useEffect(() => {
    if (!enableGlitchEffect) return

    const triggerRandomGlitch = () => {
      const randomTime = Math.random() * 25000 + 15000 // 15-40 seconds
      const timer = setTimeout(() => {
        setIsGlitched(true)
        setTimeout(() => setIsGlitched(false), 600 + Math.random() * 800) // 0.6-1.4s glitch
        triggerRandomGlitch()
      }, randomTime)
      setGlitchTimer(timer)
    }

    triggerRandomGlitch()
    return () => {
      if (glitchTimer) clearTimeout(glitchTimer)
    }
  }, [enableGlitchEffect])

  const defaultMenuItems = [
    { label: 'New Game', action: onNewGame, key: 'new' },
    { label: 'Continue', action: onContinue, key: 'continue', disabled: !hasSaveData },
    { label: 'Settings', action: onSettings, key: 'settings' },
    ...(onCredits ? [{ label: 'Credits', action: onCredits, key: 'credits' }] : []),
    ...(onQuit ? [{ label: 'Quit', action: onQuit, key: 'quit' }] : [])
  ]

  const items = menuItems || defaultMenuItems

  const glitchText = (text: string) => {
    if (!isGlitched || !enableGlitchEffect) return text
    const glitchChars = ['█', '▓', '▒', '░', '◆', '◇', '○', '●', '♦', '♢']
    return text.split('').map((char) => 
      Math.random() > 0.7 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
    ).join('')
  }

  return (
    <div 
      className={`vn-main-menu ${isGlitched ? 'glitched' : ''}`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined
      }}
    >
      {/* Background Layers */}
      <div className="vn-menu-bg-layers">
        <div className="vn-menu-overlay" />
        <div className="vn-menu-particles" />
        {isGlitched && enableGlitchEffect && <div className="vn-menu-glitch-overlay" />}
      </div>

      {/* Main Content */}
      <div className="vn-menu-content">
        {/* Logo */}
        {logo && (
          <div className="vn-menu-logo">
            <img src={logo} alt="Logo" />
          </div>
        )}

        {/* Title Section */}
        <div className="vn-menu-title-section">
          <h1 className="vn-menu-title">
            {isGlitched && enableGlitchEffect ? glitchText(title) : title}
          </h1>
          <div className="vn-menu-subtitle">
            {isGlitched && enableGlitchEffect ? glitchText(subtitle) : subtitle}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="vn-menu-nav">
          {items.map((item, index) => (
            <button
              key={item.key}
              className={`vn-menu-button ${item.disabled ? 'disabled' : ''} ${isGlitched && enableGlitchEffect ? 'glitch-button' : ''}`}
              onClick={item.action}
              disabled={item.disabled}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="vn-button-bg" />
              <div className="vn-button-border" />
              <span className="vn-button-text">
                {isGlitched && enableGlitchEffect ? glitchText(item.label) : item.label}
              </span>
              <div className="vn-button-glow" />
            </button>
          ))}
        </nav>

        {/* Status Bar */}
        <div className="vn-menu-status">
          <div className="vn-menu-version">
            <span className={isGlitched && enableGlitchEffect ? 'glitch-text' : ''}>
              {isGlitched && enableGlitchEffect ? 'v█.█.█' : version}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainMenu