'use client';

import { useState } from 'react';
import { User, CollaborationRequest } from '../lib/types';
import { X, Send, DollarSign } from 'lucide-react';
import Image from 'next/image';

interface CollaborationRequestModalProps {
  targetUser: User;
  onClose: () => void;
  onSubmit: (request: Omit<CollaborationRequest, 'requestId'>) => void;
}

export function CollaborationRequestModal({ targetUser, onClose, onSubmit }: CollaborationRequestModalProps) {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    
    // Simulate micro-transaction delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const request: Omit<CollaborationRequest, 'requestId'> = {
      senderFarcasterId: 'current_user', // In real app, get from auth
      recipientFarcasterId: targetUser.farcasterId,
      message: message.trim(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    onSubmit(request);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-text-primary">
            Request Collaboration
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          {/* Target User Info */}
          <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
              <Image
                src={targetUser.profilePicUrl}
                alt={targetUser.displayName}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-text-primary">
                {targetUser.displayName}
              </h3>
              <p className="text-sm text-text-secondary">
                {targetUser.skills.slice(0, 2).join(', ')}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Your Message *
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input-field min-h-[120px] resize-none"
                placeholder="Hi! I'd love to collaborate with you on a project. Here's what I have in mind..."
                required
                disabled={isSubmitting}
              />
              <p className="text-xs text-text-secondary mt-1">
                Be specific about your project and how their skills would help.
              </p>
            </div>

            {/* Cost Notice */}
            <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
              <DollarSign size={16} className="text-blue-600" />
              <div className="text-sm">
                <span className="font-medium text-blue-900">
                  Connection fee: $0.05
                </span>
                <p className="text-blue-700">
                  This helps maintain quality connections and supports the platform.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary flex-1 flex items-center justify-center space-x-2"
                disabled={!message.trim() || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
