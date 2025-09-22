'use client';

import { Project } from '../lib/types';
import { Calendar, Clock, Users } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  variant?: 'active' | 'completed';
}

export function ProjectCard({ project, variant = 'active' }: ProjectCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    paused: 'bg-yellow-100 text-yellow-800'
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200 animate-fade-in">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-text-primary text-lg">
          {project.projectName}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
          {project.status}
        </span>
      </div>
      
      <p className="text-text-secondary mb-4 leading-relaxed">
        {project.description}
      </p>
      
      {/* Required Skills */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-text-primary mb-2">
          Required Skills:
        </h4>
        <div className="flex flex-wrap gap-2">
          {project.requiredSkills.map((skill) => (
            <span key={skill} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      {/* Project Meta */}
      <div className="flex items-center justify-between text-sm text-text-secondary pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-1">
          <Calendar size={14} />
          <span>Created {formatDate(project.createdAt)}</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>Updated {formatDate(project.updatedAt)}</span>
          </div>
          
          <button className="flex items-center space-x-1 text-primary hover:underline">
            <Users size={14} />
            <span>View Team</span>
          </button>
        </div>
      </div>
    </div>
  );
}
