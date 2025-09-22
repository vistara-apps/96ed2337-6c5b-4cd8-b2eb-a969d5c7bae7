'use client';

import { useState } from 'react';
import { User, ExternalLink, MessageCircle, Star } from 'lucide-react';
import { ProfileCardProps } from '../lib/types';
import { SkillTag } from './SkillTag';
import { PrimaryButton } from './PrimaryButton';
import { truncateText } from '../lib/utils';

export function ProfileCard({ user, variant }: ProfileCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  const handleCollaborationRequest = async () => {
    setIsRequesting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRequesting(false);
    // Show success message or modal
  };

  const displayBio = variant === 'compact' 
    ? truncateText(user.bio, 80)
    : isExpanded 
      ? user.bio 
      : truncateText(user.bio, 120);

  return (
    <div className="bg-surface rounded-lg shadow-card p-4 card-hover animate-fade-in">
      {/* Header */}
      <div className="flex items-start space-x-3 mb-3">
        <img
          src={user.profilePicUrl}
          alt={user.displayName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text-primary truncate">
              {user.displayName}
            </h3>
            {variant === 'default' && (
              <button className="text-text-secondary hover:text-yellow-500 transition-colors duration-200">
                <Star size={18} />
              </button>
            )}
          </div>
          <p className="text-sm text-text-secondary">
            {user.skills.length} skills • {user.portfolioUrls.length} portfolio items
          </p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-text-primary mb-3 leading-relaxed">
        {displayBio}
        {user.bio.length > 120 && !isExpanded && variant === 'default' && (
          <button
            onClick={() => setIsExpanded(true)}
            className="text-primary hover:underline ml-1"
          >
            Read more
          </button>
        )}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {user.skills.slice(0, variant === 'compact' ? 3 : 6).map((skill) => (
          <SkillTag key={skill} skill={skill} variant="secondary" />
        ))}
        {user.skills.length > (variant === 'compact' ? 3 : 6) && (
          <span className="text-sm text-text-secondary bg-gray-100 px-2 py-1 rounded-md">
            +{user.skills.length - (variant === 'compact' ? 3 : 6)} more
          </span>
        )}
      </div>

      {/* Portfolio Links */}
      {variant === 'default' && user.portfolioUrls.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-text-primary mb-2">Portfolio</h4>
          <div className="flex flex-wrap gap-2">
            {user.portfolioUrls.slice(0, 2).map((url, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-sm text-primary hover:underline"
              >
                <ExternalLink size={14} />
                <span>Link {index + 1}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-2">
        <PrimaryButton
          variant="default"
          size="sm"
          onClick={handleCollaborationRequest}
          disabled={isRequesting}
          className="flex-1"
        >
          {isRequesting ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <>
              <MessageCircle size={16} />
              Request Collab
            </>
          )}
        </PrimaryButton>
        
        {variant === 'default' && (
          <button className="px-3 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors duration-200">
            <User size={16} className="text-text-secondary" />
          </button>
        )}
      </div>
    </div>
  );
}
