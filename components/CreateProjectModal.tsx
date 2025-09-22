'use client';

import { useState } from 'react';
import { Project } from '../lib/types';
import { availableSkills } from '../lib/mockData';
import { X, Plus } from 'lucide-react';

interface CreateProjectModalProps {
  onClose: () => void;
  onSubmit: (project: Omit<Project, 'projectId' | 'createdAt' | 'updatedAt' | 'ownerFarcasterId'>) => void;
}

export function CreateProjectModal({ onClose, onSubmit }: CreateProjectModalProps) {
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    requiredSkills: [] as string[],
    status: 'active' as const,
  });

  const [skillInput, setSkillInput] = useState('');
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);

  const filteredSkills = availableSkills.filter(skill =>
    skill.toLowerCase().includes(skillInput.toLowerCase()) &&
    !formData.requiredSkills.includes(skill)
  );

  const addSkill = (skill: string) => {
    if (!formData.requiredSkills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, skill]
      }));
    }
    setSkillInput('');
    setShowSkillSuggestions(false);
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.projectName.trim() && formData.description.trim()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-text-primary">
            Create New Project
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Project Name *
            </label>
            <input
              type="text"
              value={formData.projectName}
              onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
              className="input-field"
              placeholder="Enter project name..."
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="input-field min-h-[100px] resize-none"
              placeholder="Describe your project and what you're looking to achieve..."
              required
            />
          </div>

          {/* Required Skills */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Required Skills
            </label>
            
            {/* Selected Skills */}
            {formData.requiredSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center space-x-1 px-2 py-1 bg-primary text-white rounded-full text-sm"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="hover:bg-white/20 rounded-full p-0.5"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Skill Input */}
            <div className="relative">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => {
                  setSkillInput(e.target.value);
                  setShowSkillSuggestions(true);
                }}
                onFocus={() => setShowSkillSuggestions(true)}
                className="input-field"
                placeholder="Type to add skills..."
              />

              {/* Skill Suggestions */}
              {showSkillSuggestions && skillInput && filteredSkills.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-gray-200 rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
                  {filteredSkills.slice(0, 5).map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => addSkill(skill)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1 flex items-center justify-center space-x-2"
              disabled={!formData.projectName.trim() || !formData.description.trim()}
            >
              <Plus size={16} />
              <span>Create Project</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
