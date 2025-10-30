import React, { useState, useEffect, useCallback } from 'react'

interface VNPlayerProps {
  engine: any // Using any for template compatibility
  assets: {
    backgrounds: Record<string, string>
    sprites: Record<string, string>
    audio: Record<string, string>
  }
}

export function VNPlayer({ engine, assets }: VNPlayerProps) {
  const [currentInstruction, setCurrentInstruction] = useState(engine.next())
  const [background, setBackground] = useState<string>('')
  const [sprites, setSprites] = useState<Record<string, { url: string, visible: boolean }>>({})
  const [dialogueText, setDialogueText] = useState<string>('')
  const [speaker, setSpeaker] = useState<string>('')
  const [choices, setChoices] = useState<Array<{ text: string, id: string, disabled?: boolean }>>([])
  const [showUI, setShowUI] = useState(false)

  // Handle engine instructions
  useEffect(() => {
    const instruction = currentInstruction
    if (!instruction) return

    switch (instruction.name) {
      case 'showDialogue':
        setDialogueText(instruction.text || '')
        setSpeaker(instruction.speaker || '')
        setChoices([])
        setShowUI(true)
        break

      case 'showChoices':
        setChoices(instruction.choices || [])
        setShowUI(true)
        break

      case 'runCommand':
        handleCommand(instruction.command)
        break

      case 'end':
        setDialogueText('The End')
        setSpeaker('')
        setChoices([])
        setShowUI(true)
        break

      default:
        console.log('Unknown instruction:', instruction)
    }
  }, [currentInstruction])

  const handleCommand = useCallback((command: any) => {
    switch (command.name) {
      case 'setBackground':
        const bgKey = command.args?.key || command.key
        const bgUrl = assets.backgrounds[bgKey]
        if (bgUrl) {
          setBackground(bgUrl)
        } else {
          console.warn(`Background not found: ${bgKey}`)
        }
        break

      case 'showSprite':
        const spriteKey = command.args?.id || command.id
        const spriteUrl = assets.sprites[spriteKey]
        if (spriteUrl) {
          setSprites(prev => ({
            ...prev,
            [spriteKey]: { url: spriteUrl, visible: true }
          }))
        }
        break

      case 'hideSprite':
        const hideSpriteKey = command.args?.id || command.id
        setSprites(prev => ({
          ...prev,
          [hideSpriteKey]: { ...prev[hideSpriteKey], visible: false }
        }))
        break

      default:
        console.log('Unknown command:', command)
    }

    // Continue to next instruction
    setTimeout(() => {
      setCurrentInstruction(engine.proceed())
    }, 100)
  }, [engine, assets])

  const handleProceed = useCallback(() => {
    if (currentInstruction?.name === 'end') {
      return // Don't proceed past the end
    }
    setCurrentInstruction(engine.proceed())
  }, [engine, currentInstruction])

  const handleChoice = useCallback((choiceId: string) => {
    setCurrentInstruction(engine.choose(choiceId))
  }, [engine])

  const handleClick = useCallback(() => {
    if (choices.length === 0) {
      handleProceed()
    }
  }, [choices, handleProceed])

  return (
    <div 
      className="vn-player" 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100vh', 
        overflow: 'hidden',
        cursor: choices.length === 0 ? 'pointer' : 'default'
      }}
      onClick={handleClick}
    >
      {/* Background */}
      {background && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1
          }}
        />
      )}

      {/* Sprites */}
      {Object.entries(sprites).map(([id, sprite]) => 
        sprite.visible && (
          <img
            key={id}
            src={sprite.url}
            alt={id}
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              maxHeight: '80%',
              zIndex: 2
            }}
          />
        )
      )}

      {/* UI Layer */}
      {showUI && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '2rem',
            zIndex: 10
          }}
        >
          {/* Speaker Name */}
          {speaker && (
            <div 
              style={{ 
                fontWeight: 'bold', 
                marginBottom: '0.5rem',
                color: '#fff',
                fontSize: '1.2rem'
              }}
            >
              {speaker}
            </div>
          )}

          {/* Dialogue Text */}
          {dialogueText && (
            <div style={{ 
              fontSize: '1.1rem', 
              lineHeight: '1.6',
              marginBottom: choices.length > 0 ? '1rem' : '0'
            }}>
              {dialogueText}
            </div>
          )}

          {/* Choices */}
          {choices.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {choices.map((choice, index) => (
                <button
                  key={choice.id || index}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (!choice.disabled) {
                      handleChoice(choice.id || index.toString())
                    }
                  }}
                  disabled={choice.disabled}
                  style={{
                    padding: '0.75rem 1rem',
                    background: choice.disabled ? '#666' : '#444',
                    border: '2px solid #666',
                    color: choice.disabled ? '#999' : 'white',
                    borderRadius: '4px',
                    cursor: choice.disabled ? 'not-allowed' : 'pointer',
                    fontSize: '1rem',
                    textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    if (!choice.disabled) {
                      e.currentTarget.style.background = '#555'
                      e.currentTarget.style.borderColor = '#888'
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!choice.disabled) {
                      e.currentTarget.style.background = '#444'
                      e.currentTarget.style.borderColor = '#666'
                    }
                  }}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          )}

          {/* Continue indicator */}
          {dialogueText && choices.length === 0 && currentInstruction?.name !== 'end' && (
            <div style={{ 
              textAlign: 'right', 
              marginTop: '0.5rem',
              opacity: 0.7,
              fontSize: '0.9rem'
            }}>
              Click to continue...
            </div>
          )}
        </div>
      )}
    </div>
  )
}