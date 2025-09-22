'use client';

import Image from 'next/image';
import { ExternalLink, MessageCircle } from 'lucide-react';
import { User } from '../lib/types';
import { SkillTag } from './SkillTag';
import { truncateText } from '../lib/utils';

interface ProfileCardProps {
  user: User;
  variant?: 'default' | 'compact';
  onCollaborate: () => void;
}

export function ProfileCard({ user, variant = 'default', onCollaborate }: ProfileCardProps) {
  return (
    <div className="bg-surface rounded-lg shadow-card p-6 animate-fade-in">
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <Image
            src={user.profilePicUrl}
            alt={user.displayName}
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-surface"></div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-primary text-lg">{user.displayName}</h3>
          <p className="text-text-secondary text-sm mt-1">
            {variant === 'compact' ? truncateText(user.bio, 60) : user.bio}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {user.skills.slice(0, variant === 'compact' ? 3 : 6).map((skill) => (
            <SkillTag key={skill} skill={skill} variant="secondary" />
          ))}
          {user.skills.length > (variant === 'compact' ? 3 : 6) && (
            <span className="text-xs text-text-secondary">
              +{user.skills.length - (variant === 'compact' ? 3 : 6)} more
            </span>
          )}
        </div>
      </div>

      {user.portfolioUrls.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <ExternalLink className="w-4 h-4" />
            <span>{user.portfolioUrls.length} portfolio link{user.portfolioUrls.length > 1 ? 's' : ''}</span>
          </div>
        </div>
      )}

      <button
        onClick={onCollaborate}
        className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
      >
        <MessageCircle className="w-4 h-4" />
        <span>Request Collaboration</span>
      </button>
    </div>
  );
}
