'use client';

import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { availableSkills } from '../lib/mockData';
import type { CreateProjectData } from '../lib/types';

interface CreateProjectModalProps {
  onClose: () => void;
  onSubmit: (projectData: Omit<CreateProjectData, 'ownerFarcasterId'>) => void;
}

export function CreateProjectModal({ onClose, onSubmit }: CreateProjectModalProps) {
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    requiredSkills: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.projectName.trim() || !formData.description.trim() || formData.requiredSkills.length === 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSubmit({
        ...formData,
        status: 'active' as const,
      });
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setIsSubmitting(false);
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-text-primary">Create New Project</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Project Name
            </label>
            <input
              type="text"
              value={formData.projectName}
              onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
              className="input-field"
              placeholder="Enter project name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="input-field min-h-[100px] resize-none"
              placeholder="Describe your project and what you're looking to build"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Required Skills
            </label>
            <div className="space-y-2">
              {formData.requiredSkills.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {formData.requiredSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center space-x-1 bg-primary text-white px-2 py-1 rounded-full text-xs font-medium"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className="hover:bg-white/20 rounded-full p-0.5 transition-colors duration-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowSkillDropdown(!showSkillDropdown)}
                  className="w-full flex items-center justify-center space-x-2 border-2 border-dashed border-gray-300 rounded-md py-2 text-sm text-text-secondary hover:border-primary hover:text-primary transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Skills</span>
                </button>

                {showSkillDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-gray-200 rounded-lg card-shadow max-h-48 overflow-y-auto z-10">
                    <div className="p-2 space-y-1">
                      {availableSkills
                        .filter(skill => !formData.requiredSkills.includes(skill))
                        .map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => {
                              toggleSkill(skill);
                              setShowSkillDropdown(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 text-text-primary transition-colors duration-200"
                          >
                            {skill}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
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
              className="flex-1 btn-primary"
              disabled={isSubmitting || !formData.projectName.trim() || !formData.description.trim() || formData.requiredSkills.length === 0}
            >
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
