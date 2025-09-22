'use client';

import { useState } from 'react';
import { X, Plus, User } from 'lucide-react';
import { availableSkills } from '../lib/mockData';
import type { User } from '../lib/types';

interface ProfileSetupModalProps {
  farcasterUser: any;
  onClose: () => void;
  onComplete: (userData: Omit<User, 'farcasterId'>) => void;
}

export function ProfileSetupModal({ farcasterUser, onClose, onComplete }: ProfileSetupModalProps) {
  const [formData, setFormData] = useState({
    displayName: farcasterUser?.displayName || '',
    bio: '',
    profilePicUrl: farcasterUser?.pfpUrl || '',
    skills: [] as string[],
    portfolioUrls: [] as string[],
  });
  const [currentPortfolioUrl, setCurrentPortfolioUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Display name is required';
    }

    if (!formData.bio.trim()) {
      newErrors.bio = 'Bio is required';
    }

    if (formData.skills.length === 0) {
      newErrors.skills = 'At least one skill is required';
    }

    if (formData.portfolioUrls.length === 0) {
      newErrors.portfolioUrls = 'At least one portfolio link is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onComplete(formData);
    } catch (error) {
      console.error('Error creating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSkill = (skill: string) => {
    if (formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: prev.skills.filter(s => s !== skill)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const addPortfolioUrl = () => {
    if (currentPortfolioUrl.trim() && !formData.portfolioUrls.includes(currentPortfolioUrl.trim())) {
      setFormData(prev => ({
        ...prev,
        portfolioUrls: [...prev.portfolioUrls, currentPortfolioUrl.trim()]
      }));
      setCurrentPortfolioUrl('');
    }
  };

  const removePortfolioUrl = (url: string) => {
    setFormData(prev => ({
      ...prev,
      portfolioUrls: prev.portfolioUrls.filter(u => u !== url)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-text-primary">Complete Your Profile</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Profile Picture Preview */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              {formData.profilePicUrl ? (
                <img
                  src={formData.profilePicUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-gray-400" />
              )}
            </div>
          </div>

          {/* Display Name */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Display Name *
            </label>
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
              className="input-field"
              placeholder="Your display name"
              required
            />
            {errors.displayName && (
              <p className="text-red-500 text-xs mt-1">{errors.displayName}</p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Bio *
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              className="input-field min-h-[80px] resize-none"
              placeholder="Tell others about yourself and your creative background..."
              required
            />
            {errors.bio && (
              <p className="text-red-500 text-xs mt-1">{errors.bio}</p>
            )}
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Skills *
            </label>
            <div className="space-y-2">
              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {formData.skills.map((skill) => (
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
                        .filter(skill => !formData.skills.includes(skill))
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
            {errors.skills && (
              <p className="text-red-500 text-xs mt-1">{errors.skills}</p>
            )}
          </div>

          {/* Portfolio URLs */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Portfolio Links *
            </label>
            <div className="space-y-2">
              {formData.portfolioUrls.length > 0 && (
                <div className="space-y-1">
                  {formData.portfolioUrls.map((url) => (
                    <div key={url} className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-md">
                      <span className="text-sm text-text-primary flex-1 truncate">{url}</span>
                      <button
                        type="button"
                        onClick={() => removePortfolioUrl(url)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex space-x-2">
                <input
                  type="url"
                  value={currentPortfolioUrl}
                  onChange={(e) => setCurrentPortfolioUrl(e.target.value)}
                  className="input-field flex-1"
                  placeholder="https://your-portfolio.com"
                />
                <button
                  type="button"
                  onClick={addPortfolioUrl}
                  className="btn-primary px-3"
                  disabled={!currentPortfolioUrl.trim()}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            {errors.portfolioUrls && (
              <p className="text-red-500 text-xs mt-1">{errors.portfolioUrls}</p>
            )}
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
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Profile...' : 'Complete Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

