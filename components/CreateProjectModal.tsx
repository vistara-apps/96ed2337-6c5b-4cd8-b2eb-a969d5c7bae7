'use client';

import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { CreateProjectData } from '../lib/types';
import { SkillTag } from './SkillTag';
import { availableSkills } from '../lib/mockData';

interface CreateProjectModalProps {
  onClose: () => void;
  onSubmit: (data: CreateProjectData) => void;
}

export function CreateProjectModal({ onClose, onSubmit }: CreateProjectModalProps) {
  const [formData, setFormData] = useState<CreateProjectData>({
    projectName: '',
    description: '',
    requiredSkills: []
  });

  const [showSkillSelector, setShowSkillSelector] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.projectName.trim() && formData.description.trim() && formData.requiredSkills.length > 0) {
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
        <div className="sticky top-0 bg-surface border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-text-primary">Create New Project</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Project Name *
            </label>
            <input
              type="text"
              value={formData.projectName}
              onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter project name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="Describe your project and what you're looking to achieve"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Required Skills *
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
              className="flex items-center space-x-2 text-primary hover:underline"
            >
              <Plus className="w-4 h-4" />
              <span>Add Skills</span>
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
              disabled={!formData.projectName.trim() || !formData.description.trim() || formData.requiredSkills.length === 0}
              className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
