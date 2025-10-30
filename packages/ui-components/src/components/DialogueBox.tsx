import React, { useState, useEffect } from 'react'
import { useTheme } from '../themes/ThemeProvider'
import './DialogueBox.css'

export interface DialogueBoxProps {
  speaker?: string
  text: string
  textSize?: 'small' | 'medium' | 'large'
  onAdvance?: () => void
  showAdvanceHint?: boolean
  typewriterEffect?: boolean
  typewriterSpeed?: number
  avatar?: string
  className?: string
}

const DialogueBox: React.FC<DialogueBoxProps> = ({ 
  speaker, 
  text, 
  textSize = 'medium', 
  onAdvance,
  showAdvanceHint = true,
  typewriterEffect = true,
  typewriterSpeed = 50,
  avatar,
  className = ''
}) => {
  const { theme } = useTheme()
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  // Typewriter effect
  useEffect(() => {
    if (!typewriterEffect) {
      setDisplayedText(text)
      setIsComplete(true)
      return
    }

    setDisplayedText('')
    setIsComplete(false)
    let currentIndex = 0
    
    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1))
        currentIndex++
      } else {
        setIsComplete(true)
        clearInterval(timer)
      }
    }, typewriterSpeed)

    return () => clearInterval(timer)
  }, [text, typewriterEffect, typewriterSpeed])

  const handleClick = () => {
    if (typewriterEffect && !isComplete) {
      // Skip typewriter effect
      setDisplayedText(text)
      setIsComplete(true)
    } else if (onAdvance) {
      onAdvance()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') {
      e.preventDefault()
      handleClick()
    }
  }

  const sizeClass = textSize === 'large' ? 'lg' : textSize === 'small' ? 'sm' : 'md'
  
  return (
    <div 
      className={`vn-dialogue ${sizeClass} ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Dialogue: ${text}`}
    >
      <div className="vn-dialogue-container">
        {/* Speaker Section */}
        {(speaker || avatar) && (
          <div className="vn-dialogue-speaker-section">
            {avatar && (
              <div className="vn-dialogue-avatar">
                <img src={avatar} alt={speaker || 'Speaker'} />
              </div>
            )}
            {speaker && (
              <div className="vn-dialogue-nameplate">
                <div className="vn-nameplate-border" />
                <span className="vn-nameplate-text">{speaker}</span>
              </div>
            )}
          </div>
        )}

        {/* Text Content */}
        <div className="vn-dialogue-content">
          <div className="vn-dialogue-text">
            {displayedText}
            {typewriterEffect && !isComplete && (
              <span className="vn-dialogue-cursor">|</span>
            )}
          </div>
          
          {showAdvanceHint && isComplete && (
            <div className="vn-dialogue-advance-hint">
              <span>Press Space/Enter → or Click</span>
            </div>
          )}
        </div>

        {/* Dialogue Box Border */}
        <div className="vn-dialogue-border" />
        <div className="vn-dialogue-bg" />
      </div>
    </div>
  )
}

export default DialogueBox