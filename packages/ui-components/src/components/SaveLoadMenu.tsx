import React, { useState } from 'react'
import { useTheme } from '../themes/ThemeProvider'
import './SaveLoadMenu.css'

export interface SaveSlot {
  id: number
  name: string
  date: Date
  screenshot?: string
  chapter?: string
  scene?: string
  isQuickSave?: boolean
  isEmpty?: boolean
}

export interface SaveLoadMenuProps {
  isOpen: boolean
  onClose: () => void
  onSave: (slotId: number) => void
  onLoad: (slotId: number) => void
  onDelete: (slotId: number) => void
  saveSlots: SaveSlot[]
  maxSlots?: number
  mode: 'save' | 'load'
  enableScreenshots?: boolean
  enableNaming?: boolean
}

const SaveLoadMenu: React.FC<SaveLoadMenuProps> = ({
  isOpen,
  onClose,
  onSave,
  onLoad,
  onDelete,
  saveSlots,
  maxSlots = 9,
  mode,
  enableScreenshots = true,
  enableNaming = true
}) => {
  const { theme } = useTheme()
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const [isNaming, setIsNaming] = useState(false)
  const [newSaveName, setNewSaveName] = useState('')

  const handleSlotClick = (slotId: number) => {
    const slot = saveSlots.find(s => s.id === slotId)
    
    if (mode === 'save') {
      if (enableNaming && !slot?.isEmpty) {
        setSelectedSlot(slotId)
        setNewSaveName(slot?.name || `Save ${slotId}`)
        setIsNaming(true)
      } else {
        onSave(slotId)
      }
    } else {
      if (!slot?.isEmpty) {
        onLoad(slotId)
      }
    }
  }

  const handleConfirmSave = () => {
    if (selectedSlot !== null) {
      onSave(selectedSlot)
      setIsNaming(false)
      setSelectedSlot(null)
      setNewSaveName('')
    }
  }

  const handleCancelNaming = () => {
    setIsNaming(false)
    setSelectedSlot(null)
    setNewSaveName('')
  }

  const handleDeleteSlot = (slotId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(slotId)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  // Generate all slots (filled + empty)
  const allSlots: SaveSlot[] = []
  for (let i = 1; i <= maxSlots; i++) {
    const existingSlot = saveSlots.find(slot => slot.id === i)
    allSlots.push(existingSlot || {
      id: i,
      name: `Save ${i}`,
      date: new Date(),
      isEmpty: true
    })
  }

  if (!isOpen) return null

  return (
    <div className="vn-save-load-overlay" onClick={onClose}>
      <div className="vn-save-load-menu" onClick={(e) => e.stopPropagation()}>
        <div className="vn-save-load-header">
          <h2>
            {mode === 'save' ? '💾 Save Game' : '📁 Load Game'}
          </h2>
          <button 
            className="vn-save-load-close-btn" 
            onClick={onClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className="vn-save-load-content">
          <div className="vn-save-slots-grid">
            {allSlots.map((slot) => (
              <div
                key={slot.id}
                className={`vn-save-slot ${slot.isEmpty ? 'empty' : 'filled'} ${mode === 'load' && slot.isEmpty ? 'disabled' : ''}`}
                onClick={() => handleSlotClick(slot.id)}
              >
                {/* Screenshot/Thumbnail */}
                <div className="vn-slot-thumbnail">
                  {enableScreenshots && slot.screenshot && !slot.isEmpty ? (
                    <img src={slot.screenshot} alt={`Save ${slot.id} screenshot`} />
                  ) : (
                    <div className="vn-slot-placeholder">
                      {slot.isEmpty ? '➕' : '💾'}
                    </div>
                  )}
                </div>

                {/* Slot Info */}
                <div className="vn-slot-info">
                  <div className="vn-slot-name">
                    {slot.isEmpty ? (
                      <span className="vn-slot-empty">Empty Slot</span>
                    ) : (
                      slot.name
                    )}
                  </div>
                  
                  {!slot.isEmpty && (
                    <>
                      <div className="vn-slot-details">
                        {slot.chapter && (
                          <div className="vn-slot-chapter">{slot.chapter}</div>
                        )}
                        {slot.scene && (
                          <div className="vn-slot-scene">{slot.scene}</div>
                        )}
                      </div>
                      
                      <div className="vn-slot-date">
                        {formatDate(slot.date)}
                      </div>
                    </>
                  )}
                </div>

                {/* Slot Actions */}
                {!slot.isEmpty && (
                  <div className="vn-slot-actions">
                    <button
                      className="vn-slot-delete-btn"
                      onClick={(e) => handleDeleteSlot(slot.id, e)}
                      aria-label={`Delete save ${slot.id}`}
                    >
                      🗑️
                    </button>
                  </div>
                )}

                {/* Slot Number */}
                <div className="vn-slot-number">
                  {slot.id}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Naming Modal */}
        {isNaming && (
          <div className="vn-naming-overlay">
            <div className="vn-naming-modal">
              <h3>Name Your Save</h3>
              <input
                type="text"
                value={newSaveName}
                onChange={(e) => setNewSaveName(e.target.value)}
                placeholder={`Save ${selectedSlot}`}
                autoFocus
                maxLength={50}
              />
              <div className="vn-naming-actions">
                <button onClick={handleCancelNaming}>Cancel</button>
                <button 
                  onClick={handleConfirmSave}
                  disabled={!newSaveName.trim()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SaveLoadMenu