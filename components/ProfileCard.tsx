'use client';

import { User } from '../lib/types';
import { ExternalLink, MessageCircle } from 'lucide-react';
import Image from 'next/image';

interface ProfileCardProps {
  user: User;
  variant?: 'default' | 'compact';
  onCollaborate: () => void;
}

export function ProfileCard({ user, variant = 'default', onCollaborate }: ProfileCardProps) {
  if (variant === 'compact') {
    return (
      <div className="card hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={user.profilePicUrl}
              alt={user.displayName}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-text-primary truncate">
              {user.displayName}
            </h3>
            <p className="text-sm text-text-secondary truncate">
              {user.skills.slice(0, 2).join(', ')}
              {user.skills.length > 2 && ` +${user.skills.length - 2}`}
            </p>
          </div>
          <button
            onClick={onCollaborate}
            className="btn-primary text-sm px-3 py-1"
          >
            Connect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200 animate-fade-in">
      <div className="flex items-start space-x-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          <Image
            src={user.profilePicUrl}
            alt={user.displayName}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-text-primary">
                {user.displayName}
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                {user.bio}
              </p>
            </div>
          </div>
          
          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-3">
            {user.skills.slice(0, 4).map((skill) => (
              <span key={skill} className="skill-tag">
                {skill}
              </span>
            ))}
            {user.skills.length > 4 && (
              <span className="skill-tag-secondary">
                +{user.skills.length - 4} more
              </span>
            )}
          </div>
          
          {/* Portfolio Links */}
          {user.portfolioUrls.length > 0 && (
            <div className="flex items-center space-x-4 mb-4">
              {user.portfolioUrls.slice(0, 2).map((url, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-sm text-primary hover:underline"
                >
                  <ExternalLink size={14} />
                  <span>Portfolio {index + 1}</span>
                </a>
              ))}
            </div>
          )}
          
          {/* Action Button */}
          <button
            onClick={onCollaborate}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            <MessageCircle size={16} />
            <span>Request Collaboration</span>
          </button>
        </div>
      </div>
    </div>
  );
}
