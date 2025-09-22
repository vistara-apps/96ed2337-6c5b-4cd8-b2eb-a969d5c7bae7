'use client';

import { useState } from 'react';
import { useMiniKit, useAuthenticate } from '@coinbase/onchainkit/minikit';
import { X, User } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: (user: any) => void;
}

export function AuthModal({ isOpen, onClose, onAuthenticated }: AuthModalProps) {
  const { context } = useMiniKit();
  const { authenticate, isAuthenticating } = useAuthenticate();
  const [error, setError] = useState<string | null>(null);

  const handleAuthenticate = async () => {
    try {
      setError(null);
      const result = await authenticate();
      if (result) {
        onAuthenticated(result);
        onClose();
      }
    } catch (err) {
      setError('Failed to authenticate. Please try again.');
      console.error('Authentication error:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg w-full max-w-md animate-slide-up">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-text-primary">Connect with Farcaster</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-primary" />
          </div>

          <h3 className="text-xl font-semibold text-text-primary mb-2">
            Welcome to CollabForge
          </h3>

          <p className="text-text-secondary mb-6 leading-6">
            Connect your Farcaster account to discover collaborators and start building amazing projects in the Base ecosystem.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handleAuthenticate}
            disabled={isAuthenticating}
            className="w-full btn-primary py-3 text-base font-medium flex items-center justify-center space-x-2"
          >
            {isAuthenticating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <User className="w-5 h-5" />
                <span>Connect Farcaster Account</span>
              </>
            )}
          </button>

          <p className="text-xs text-text-secondary mt-4">
            By connecting, you agree to share your basic profile information to enhance collaboration opportunities.
          </p>
        </div>
      </div>
    </div>
  );
}

