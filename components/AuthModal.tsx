'use client';

import { useState } from 'react';
import { X, User } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: any, token: string) => void;
}

export function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [farcasterId, setFarcasterId] = useState('');

  const handleFarcasterAuth = async () => {
    if (!farcasterId.trim()) return;

    setIsLoading(true);
    try {
      // For development, we'll simulate Farcaster authentication
      // In production, this would integrate with Farcaster's authentication flow
      const response = await fetch('/api/auth/farcaster', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          farcasterId: farcasterId.trim(),
          signature: 'dev-signature', // Mock signature for development
          message: 'dev-message', // Mock message for development
        }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      onAuthSuccess(data.user, data.token);
      onClose();
    } catch (error) {
      console.error('Authentication error:', error);
      alert('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-text-primary">
            Connect with Farcaster
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="text-primary" size={32} />
            </div>
            <p className="text-text-secondary">
              Enter your Farcaster ID to connect and start collaborating
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="farcasterId" className="block text-sm font-medium text-text-primary mb-2">
                Farcaster ID
              </label>
              <input
                id="farcasterId"
                type="text"
                value={farcasterId}
                onChange={(e) => setFarcasterId(e.target.value)}
                placeholder="e.g., vitalik"
                className="input-field"
                disabled={isLoading}
              />
            </div>

            <button
              onClick={handleFarcasterAuth}
              disabled={!farcasterId.trim() || isLoading}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <User size={16} />
                  <span>Connect with Farcaster</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary">
              By connecting, you agree to our terms of service and privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

