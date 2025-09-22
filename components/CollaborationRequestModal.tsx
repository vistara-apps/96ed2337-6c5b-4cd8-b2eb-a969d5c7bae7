'use client';

import { useState, useEffect } from 'react';
import { X, Send, ChevronDown } from 'lucide-react';
import type { User, Project } from '../lib/types';

interface CollaborationRequestModalProps {
  targetUser: User;
  onClose: () => void;
  onSubmit: (message: string, projectId?: string) => void;
}

export function CollaborationRequestModal({ targetUser, onClose, onSubmit }: CollaborationRequestModalProps) {
  const [message, setMessage] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        // In a real app, we'd get the current user's ID from context
        // For now, we'll fetch all projects and filter client-side
        const response = await fetch('/api/projects');
        const projects = await response.json();
        setUserProjects(projects);
      } catch (error) {
        console.error('Error fetching user projects:', error);
      }
    };

    fetchUserProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSubmit(message, selectedProjectId || undefined);
    } catch (error) {
      console.error('Error sending collaboration request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg w-full max-w-md animate-slide-up">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-text-primary">Request Collaboration</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
            <img
              src={targetUser.profilePicUrl}
              alt={targetUser.displayName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium text-text-primary">{targetUser.displayName}</h3>
              <p className="text-sm text-text-secondary">
                {targetUser.skills.slice(0, 2).join(', ')}
                {targetUser.skills.length > 2 && ` +${targetUser.skills.length - 2} more`}
              </p>
            </div>
          </div>

          {/* Project Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-primary mb-1">
              Link to Project (Optional)
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowProjectDropdown(!showProjectDropdown)}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-md text-left hover:border-primary transition-colors duration-200"
              >
                <span className={selectedProjectId ? 'text-text-primary' : 'text-text-secondary'}>
                  {selectedProjectId
                    ? userProjects.find(p => p.projectId === selectedProjectId)?.projectName
                    : 'Select a project to link this request to...'
                  }
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showProjectDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showProjectDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-gray-200 rounded-lg card-shadow max-h-48 overflow-y-auto z-10">
                  <div className="p-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProjectId('');
                        setShowProjectDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 text-text-primary transition-colors duration-200"
                    >
                      No project (General inquiry)
                    </button>
                    {userProjects.map((project) => (
                      <button
                        key={project.projectId}
                        type="button"
                        onClick={() => {
                          setSelectedProjectId(project.projectId);
                          setShowProjectDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 text-text-primary transition-colors duration-200"
                      >
                        <div className="font-medium">{project.projectName}</div>
                        <div className="text-xs text-text-secondary truncate">
                          {project.requiredSkills.slice(0, 3).join(', ')}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Collaboration Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input-field min-h-[120px] resize-none"
                placeholder="Hi! I'd love to collaborate with you on a project. Here's what I have in mind..."
                required
              />
              <p className="text-xs text-text-secondary mt-1">
                This will cost $0.05 to send as a collaboration request.
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 btn-secondary"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 btn-primary flex items-center justify-center space-x-2"
                disabled={isSubmitting || !message.trim()}
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Sending...' : 'Send Request'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
