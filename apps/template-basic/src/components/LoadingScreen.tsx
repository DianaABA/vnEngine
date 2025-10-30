import React from 'react'

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-animation">
        <div className="loading-spinner"></div>
        <div className="loading-dots">
          <span>•</span>
          <span>•</span>
          <span>•</span>
        </div>
      </div>
      <h2>Loading Visual Novel</h2>
      <p>Preparing your story...</p>
      <div className="loading-progress">
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
        <small>Loading assets and scripts</small>
      </div>
    </div>
  )
}