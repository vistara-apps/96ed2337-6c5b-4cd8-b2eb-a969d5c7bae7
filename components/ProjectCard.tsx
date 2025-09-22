'use client';

import { useState } from 'react';
import { Calendar, Users, ExternalLink, MoreHorizontal } from 'lucide-react';
import { ProjectCardProps } from '../lib/types';
import { SkillTag } from './SkillTag';
import { PrimaryButton } from './PrimaryButton';
import { formatRelativeTime, truncateText } from '../lib/utils';

export function ProjectCard({ project, variant }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const displayDescription = isExpanded 
    ? project.description 
    : truncateText(project.description, 120);

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    paused: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="bg-surface rounded-lg shadow-card p-4 card-hover animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-lg font-semibold text-text-primary truncate">
              {project.projectName}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
              {project.status}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{formatRelativeTime(project.updatedAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users size={14} />
              <span>{project.requiredSkills.length} skills needed</span>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            <MoreHorizontal size={16} className="text-text-secondary" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-8 bg-surface border border-gray-200 rounded-md shadow-lg py-1 z-10 min-w-32">
              <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-200">
                Edit Project
              </button>
              <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-200">
                Share
              </button>
              <button className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-50 transition-colors duration-200">
                Archive
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-text-primary mb-3 leading-relaxed">
        {displayDescription}
        {project.description.length > 120 && !isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="text-primary hover:underline ml-1"
          >
            Read more
          </button>
        )}
      </p>

      {/* Required Skills */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-text-primary mb-2">Looking for</h4>
        <div className="flex flex-wrap gap-2">
          {project.requiredSkills.map((skill) => (
            <SkillTag key={skill} skill={skill} variant="primary" />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <PrimaryButton variant="default" size="sm" className="flex-1">
          <Users size={16} />
          Find Collaborators
        </PrimaryButton>
        
        <button className="px-3 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors duration-200">
          <ExternalLink size={16} className="text-text-secondary" />
        </button>
      </div>

      {/* Click outside to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
}
