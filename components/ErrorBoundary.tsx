'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      return <DefaultErrorFallback error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, resetError }: { error?: Error; resetError: () => void }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg p-6 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>

        <h2 className="text-xl font-semibold text-text-primary mb-2">
          Something went wrong
        </h2>

        <p className="text-text-secondary text-sm mb-6 leading-6">
          We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
        </p>

        {process.env.NODE_ENV === 'development' && error && (
          <details className="mb-4 text-left">
            <summary className="text-sm text-text-secondary cursor-pointer hover:text-text-primary">
              Error details (development)
            </summary>
            <pre className="text-xs text-red-600 bg-red-50 p-2 rounded mt-2 overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}

        <button
          onClick={resetError}
          className="btn-primary flex items-center justify-center space-x-2 mx-auto"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
}

