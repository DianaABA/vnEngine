import React from 'react'

interface Props {
  error: string
  onRetry: () => void
}

export default function ErrorScreen({ error, onRetry }: Props) {
  const troubleshootingTips = [
    'Make sure public/scripts/main.json exists and contains valid JSON',
    'Check that all referenced assets exist in public/assets/',
    'Verify your script follows the correct format (see documentation)',
    'Check the browser console for more detailed error messages'
  ]

  return (
    <div className="error-screen">
      <div className="error-icon">⚠️</div>
      <h2>Unable to Load Visual Novel</h2>
      <div className="error-message">
        {error}
      </div>
      
      <details className="error-details">
        <summary>Troubleshooting Guide</summary>
        <div className="troubleshooting">
          <h4>Common Solutions:</h4>
          <ul>
            {troubleshootingTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
          
          <h4>Need More Help?</h4>
          <p>
            Check out the{' '}
            <a 
              href="https://github.com/DianaABA/vnEngine/blob/master/docs/AUTHORING.md" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Authoring Guide
            </a>{' '}
            or open an issue on{' '}
            <a 
              href="https://github.com/DianaABA/vnEngine/issues" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              GitHub
            </a>.
          </p>
        </div>
      </details>

      <div className="error-actions">
        <button onClick={onRetry} className="retry-button">
          Try Again
        </button>
        <button 
          onClick={() => window.open('/scripts/main.json', '_blank')}
          className="inspect-button"
        >
          View Script File
        </button>
      </div>
    </div>
  )
}