import React, { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('VN Engine Error:', error)
    console.error('Error Info:', errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>🚨 Something went wrong</h2>
          <p>The visual novel encountered an unexpected error.</p>
          {this.state.error && (
            <details>
              <summary>Error Details</summary>
              <pre>{this.state.error.message}</pre>
              {this.state.error.stack && (
                <pre>{this.state.error.stack}</pre>
              )}
            </details>
          )}
          <button 
            onClick={() => {
              this.setState({ hasError: false, error: undefined })
              window.location.reload()
            }}
          >
            Reload Application
          </button>
        </div>
      )
    }

    return this.props.children
  }
}