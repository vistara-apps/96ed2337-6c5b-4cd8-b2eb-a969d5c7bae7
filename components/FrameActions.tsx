'use client';

import { useState } from 'react';
import { Share2, ExternalLink } from 'lucide-react';

interface FrameActionsProps {
  projectId?: string;
  userId?: string;
  onShare?: () => void;
}

export function FrameActions({ projectId, userId, onShare }: FrameActionsProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      if (onShare) {
        onShare();
      } else {
        // Default share behavior
        const url = projectId
          ? `${window.location.origin}/project/${projectId}`
          : userId
          ? `${window.location.origin}/user/${userId}`
          : window.location.origin;

        if (navigator.share) {
          await navigator.share({
            title: 'CollabForge',
            text: 'Check out this amazing project on CollabForge!',
            url,
          });
        } else {
          await navigator.clipboard.writeText(url);
          alert('Link copied to clipboard!');
        }
      }
    } catch (error) {
      console.error('Share error:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleOpenInApp = () => {
    const url = projectId
      ? `/project/${projectId}`
      : userId
      ? `/user/${userId}`
      : '/';

    window.open(url, '_blank');
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleShare}
        disabled={isSharing}
        className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-text-primary text-sm rounded-md transition-colors duration-200"
      >
        <Share2 className="w-4 h-4" />
        <span>{isSharing ? 'Sharing...' : 'Share'}</span>
      </button>

      <button
        onClick={handleOpenInApp}
        className="flex items-center space-x-1 px-3 py-1.5 bg-primary text-white text-sm rounded-md hover:opacity-90 transition-opacity duration-200"
      >
        <ExternalLink className="w-4 h-4" />
        <span>Open in App</span>
      </button>
    </div>
  );
}

