'use client';

import { useState } from 'react';
import { ExternalLink, MessageCircle } from 'lucide-react';
import type { User } from '../lib/types';
import { truncateText } from '../lib/utils';

interface ProfileCardProps {
  user: User;
  onCollaborate: () => void;
  variant?: 'default' | 'compact';
}

export function ProfileCard({ user, onCollaborate, variant = 'default' }: ProfileCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-surface rounded-lg p-4 card-shadow border border-gray-100 animate-fade-in">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {!imageError ? (
            <img
              src={user.profilePicUrl}
              alt={user.displayName}
              className="w-12 h-12 rounded-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500 font-medium text-sm">
                {user.displayName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-text-primary truncate">
              {user.displayName}
            </h3>
            <span className="text-xs text-text-secondary bg-gray-100 px-2 py-1 rounded-full">
              {user.skills.length} skills
            </span>
          </div>

          <p className="text-sm text-text-secondary mb-3 leading-5">
            {variant === 'compact' 
              ? truncateText(user.bio, 80)
              : user.bio
            }
          </p>

          <div className="flex flex-wrap gap-1 mb-3">
            {user.skills.slice(0, variant === 'compact' ? 3 : 4).map((skill) => (
              <span key={skill} className="skill-tag">
                {skill}
              </span>
            ))}
            {user.skills.length > (variant === 'compact' ? 3 : 4) && (
              <span className="skill-tag-secondary">
                +{user.skills.length - (variant === 'compact' ? 3 : 4)}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {user.portfolioUrls.slice(0, 2).map((url, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              ))}
            </div>

            <button
              onClick={onCollaborate}
              className="btn-primary text-sm flex items-center space-x-1"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Collaborate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
