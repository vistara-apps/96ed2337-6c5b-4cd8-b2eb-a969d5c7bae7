'use client';

import { useState, useEffect } from 'react';
import { Bell, X, MessageCircle, Check, X as XIcon } from 'lucide-react';
import type { CollaborationRequest } from '../lib/types';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  const [notifications, setNotifications] = useState<CollaborationRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      // In a real app, we'd get the current user's ID from context
      // For now, we'll fetch requests for a mock user
      const response = await fetch('/api/collaborations?recipientId=user1');
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRespondToRequest = async (requestId: string, status: 'accepted' | 'declined') => {
    try {
      const response = await fetch(`/api/collaborations/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        // Update local state
        setNotifications(prev =>
          prev.map(notification =>
            notification.requestId === requestId
              ? { ...notification, status }
              : notification
          )
        );
      }
    } catch (error) {
      console.error('Error responding to collaboration request:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-end p-4 z-50">
      <div className="bg-surface rounded-lg w-full max-w-md max-h-[80vh] overflow-hidden animate-slide-up shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-text-primary" />
            <h2 className="text-lg font-semibold text-text-primary">Notifications</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <Bell className="w-12 h-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">No notifications</h3>
              <p className="text-sm text-text-secondary">
                You're all caught up! New collaboration requests will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <div key={notification.requestId} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-primary" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium text-text-primary">
                          Collaboration Request
                        </h4>
                        <span className="text-xs text-text-secondary">
                          {new Date(notification.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <p className="text-sm text-text-secondary mb-2 leading-5">
                        {notification.message}
                      </p>

                      {notification.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleRespondToRequest(notification.requestId, 'accepted')}
                            className="flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-green-200 transition-colors duration-200"
                          >
                            <Check className="w-3 h-3" />
                            <span>Accept</span>
                          </button>
                          <button
                            onClick={() => handleRespondToRequest(notification.requestId, 'declined')}
                            className="flex items-center space-x-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors duration-200"
                          >
                            <XIcon className="w-3 h-3" />
                            <span>Decline</span>
                          </button>
                        </div>
                      )}

                      {notification.status !== 'pending' && (
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          notification.status === 'accepted'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {notification.status === 'accepted' ? 'Accepted' : 'Declined'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

