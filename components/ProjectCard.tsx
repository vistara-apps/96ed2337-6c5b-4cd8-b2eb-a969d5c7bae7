'use client';

import { Calendar, Users } from 'lucide-react';
import type { Project } from '../lib/types';
import { formatDate } from '../lib/utils';

interface ProjectCardProps {
  project: Project;
  onJoinProject: () => void;
  variant?: 'active' | 'completed';
}

export function ProjectCard({ project, onJoinProject, variant = 'active' }: ProjectCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    paused: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="bg-surface rounded-lg p-4 card-shadow border border-gray-100 animate-fade-in">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-text-primary">
              {project.projectName}
            </h3>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[project.status]}`}>
              {project.status}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-xs text-text-secondary mb-2">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(project.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>{project.collaborators?.length || 0} collaborators</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-text-secondary mb-4 leading-5">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1 mb-4">
        {project.requiredSkills.map((skill) => (
          <span key={skill} className="skill-tag-secondary">
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-text-secondary">
          Looking for: {project.requiredSkills.slice(0, 2).join(', ')}
          {project.requiredSkills.length > 2 && ` +${project.requiredSkills.length - 2} more`}
        </div>
        
        <button
          onClick={onJoinProject}
          className="btn-primary text-sm"
          disabled={project.status !== 'active'}
        >
          Join Project
        </button>
      </div>
    </div>
  );
}
