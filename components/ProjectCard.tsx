'use client';

import { Calendar, Users, Tag } from 'lucide-react';
import { Project } from '../lib/types';
import { SkillTag } from './SkillTag';
import { formatDate, getStatusColor } from '../lib/utils';

interface ProjectCardProps {
  project: Project;
  variant?: 'active' | 'completed';
}

export function ProjectCard({ project, variant }: ProjectCardProps) {
  return (
    <div className="bg-surface rounded-lg shadow-card p-6 animate-fade-in">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-text-primary text-lg flex-1">
          {project.projectName}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </div>

      <p className="text-text-secondary text-sm mb-4 leading-relaxed">
        {project.description}
      </p>

      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Tag className="w-4 h-4 text-text-secondary" />
          <span className="text-sm font-medium text-text-secondary">Required Skills</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.requiredSkills.map((skill) => (
            <SkillTag key={skill} skill={skill} variant="primary" />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-text-secondary">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>Created {formatDate(project.createdAt)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4" />
          <span>Looking for collaborators</span>
        </div>
      </div>
    </div>
  );
}
