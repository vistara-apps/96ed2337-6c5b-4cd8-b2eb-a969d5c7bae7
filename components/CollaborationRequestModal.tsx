'use client';

import { useState } from 'react';
import { X, Send } from 'lucide-react';
import Image from 'next/image';
import { User, CollaborationRequestData } from '../lib/types';
import { SkillTag } from './SkillTag';
import { mockProjects, availableSkills } from '../lib/mockData';

interface CollaborationRequestModalProps {
  user: User;
  onClose: () => void;
  onSubmit: (data: CollaborationRequestData) => void;
}

export function CollaborationRequestModal({ user, onClose, onSubmit }: CollaborationRequestModalProps) {
  const [formData, setFormData] = useState<CollaborationRequestData>({
    message: '',
    projectId: '',
    requiredSkills: []
  });

  const [showSkillSelector, setShowSkillSelector] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.message.trim()) {
      onSubmit(formData);
    }
  };

  const toggleSkill = (skill: string) => {
    if (formData.requiredSkills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: prev.requiredSkills.filter(s => s !== skill)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, skill]
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg shadow-card w-full max-w-md max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="sticky top-0 bg-surface border-b border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-text-primary">Collaboration Request</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <Image
              src={user.profilePicUrl}
              alt={user.displayName}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium text-text-primary">{user.displayName}</h3>
              <p className="text-sm text-text-secondary">
                {user.skills.slice(0, 2).join(', ')}
                {user.skills.length > 2 && ` +${user.skills.length - 2} more`}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Select Project (Optional)
            </label>
            <select
              value={formData.projectId}
              onChange={(e) => setFormData(prev => ({ ...prev, projectId: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">General collaboration inquiry</option>
              {mockProjects.filter(p => p.status === 'active').map((project) => (
                <option key={project.projectId} value={project.projectId}>
                  {project.projectName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Message *
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder={`Hi ${user.displayName}, I'd love to collaborate with you on...`}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Skills Needed (Optional)
            </label>
            
            {formData.requiredSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.requiredSkills.map((skill) => (
                  <SkillTag
                    key={skill}
                    skill={skill}
                    variant="primary"
                    isSelected={true}
                    onClick={() => toggleSkill(skill)}
                  />
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowSkillSelector(!showSkillSelector)}
              className="text-primary hover:underline text-sm"
            >
              {showSkillSelector ? 'Hide skills' : 'Specify skills needed'}
            </button>

            {showSkillSelector && (
              <div className="mt-3 p-3 border border-gray-200 rounded-lg">
                <div className="flex flex-wrap gap-2">
                  {availableSkills.map((skill) => (
                    <SkillTag
                      key={skill}
                      skill={skill}
                      variant="secondary"
                      isSelected={formData.requiredSkills.includes(skill)}
                      onClick={() => toggleSkill(skill)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              💰 This collaboration request costs $0.05 to send. This helps ensure quality connections and supports the platform.
            </p>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-text-secondary rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.message.trim()}
              className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Request ($0.05)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
