'use client';

import { useState, useEffect } from 'react';
import { Bell, X, Check, X as XIcon } from 'lucide-react';
import type { CollaborationRequest } from '../lib/types';

interface NotificationCenterProps {
  userId: string;
  onNotificationAction?: (requestId: string, action: 'accept' | 'decline') => void;
}

interface Notification {
  id: string;
  type: 'collaboration_request';
  title: string;
  message: string;
  timestamp: string;
  data: CollaborationRequest;
  read: boolean;
}

export function NotificationCenter({ userId, onNotificationAction }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock notifications for development
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: 'notif_1',
        type: 'collaboration_request',
        title: 'New Collaboration Request',
        message: 'Sarah Kim wants to collaborate on your DeFi Dashboard project',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        data: {
          requestId: 'collab_1',
          senderFarcasterId: 'user4',
          recipientFarcasterId: userId,
          message: 'Hi! I\'d love to help with the data visualization aspects of your DeFi Dashboard.',
          status: 'pending',
          createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        },
        read: false,
      },
      {
        id: 'notif_2',
        type: 'collaboration_request',
        title: 'Collaboration Accepted',
        message: 'Marcus Chen accepted your collaboration request for the NFT Marketplace',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        data: {
          requestId: 'collab_2',
          senderFarcasterId: userId,
          recipientFarcasterId: 'user3',
          message: 'I have experience with brand design and would love to help with your NFT marketplace.',
          status: 'accepted',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        },
        read: true,
      },
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, [userId]);

  const handleNotificationAction = (notificationId: string, requestId: string, action: 'accept' | 'decline') => {
    if (onNotificationAction) {
      onNotificationAction(requestId, action);
    }

    // Mark as read
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
      >
        <Bell className="w-5 h-5 text-text-secondary" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-surface border border-gray-200 rounded-lg card-shadow max-h-96 overflow-y-auto z-50">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="font-semibold text-text-primary">Notifications</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              <X className="w-4 h-4 text-text-secondary" />
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-text-secondary">
                No notifications yet
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 ${!notification.read ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-text-primary text-sm">
                        {notification.title}
                      </h4>
                      <p className="text-text-secondary text-sm mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-text-secondary mt-2">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>

                    {!notification.read && notification.type === 'collaboration_request' && (
                      <div className="flex space-x-1 ml-2">
                        <button
                          onClick={() => handleNotificationAction(notification.id, notification.data.requestId, 'accept')}
                          className="p-1 bg-green-100 hover:bg-green-200 text-green-600 rounded-md transition-colors duration-200"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleNotificationAction(notification.id, notification.data.requestId, 'decline')}
                          className="p-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-md transition-colors duration-200"
                        >
                          <XIcon className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-xs text-primary hover:underline mt-2"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

