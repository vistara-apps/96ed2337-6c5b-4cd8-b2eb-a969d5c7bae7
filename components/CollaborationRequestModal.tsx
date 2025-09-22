'use client';

import { useState } from 'react';
import { X, Send } from 'lucide-react';
import type { User } from '../lib/types';

interface CollaborationRequestModalProps {
  targetUser: User;
  onClose: () => void;
  onSubmit: (message: string) => void;
}

export function CollaborationRequestModal({ targetUser, onClose, onSubmit }: CollaborationRequestModalProps) {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSubmit(message);
    } catch (error) {
      console.error('Error sending collaboration request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg w-full max-w-md animate-slide-up">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-text-primary">Request Collaboration</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
            <img
              src={targetUser.profilePicUrl}
              alt={targetUser.displayName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium text-text-primary">{targetUser.displayName}</h3>
              <p className="text-sm text-text-secondary">
                {targetUser.skills.slice(0, 2).join(', ')}
                {targetUser.skills.length > 2 && ` +${targetUser.skills.length - 2} more`}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Collaboration Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input-field min-h-[120px] resize-none"
                placeholder="Hi! I'd love to collaborate with you on a project. Here's what I have in mind..."
                required
              />
              <p className="text-xs text-text-secondary mt-1">
                This will cost $0.05 to send as a collaboration request.
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 btn-secondary"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 btn-primary flex items-center justify-center space-x-2"
                disabled={isSubmitting || !message.trim()}
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Sending...' : 'Send Request'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
