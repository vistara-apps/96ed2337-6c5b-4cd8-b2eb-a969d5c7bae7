'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/minikit';
import { useAuthenticate } from '@coinbase/onchainkit/minikit';
import { X, Plus, Check } from 'lucide-react';
import { availableSkills } from '../lib/mockData';
import type { User } from '../lib/types';

interface UserOnboardingProps {
  onComplete: (user: User) => void;
  onSkip: () => void;
}

export function UserOnboarding({ onComplete, onSkip }: UserOnboardingProps) {
  const { context } = useMiniKit();
  const { user } = useAuthenticate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    displayName: context?.user?.displayName || user?.displayName || '',
    bio: '',
    skills: [] as string[],
    portfolioUrls: [] as string[],
  });
  const [newPortfolioUrl, setNewPortfolioUrl] = useState('');
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    if (!formData.displayName.trim()) return;

    setIsSubmitting(true);
    try {
      const userData: User = {
        farcasterId: context?.user?.fid?.toString() || 'anonymous',
        displayName: formData.displayName,
        bio: formData.bio,
        profilePicUrl: context?.user?.pfpUrl || user?.pfpUrl || '',
        skills: formData.skills,
        portfolioUrls: formData.portfolioUrls,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Create user via API
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const createdUser = await response.json();
        onComplete(createdUser);
      } else {
        console.error('Failed to create user profile');
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
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
    if (newPortfolioUrl.trim() && !formData.portfolioUrls.includes(newPortfolioUrl.trim())) {
      setFormData(prev => ({
        ...prev,
        portfolioUrls: [...prev.portfolioUrls, newPortfolioUrl.trim()]
      }));
      setNewPortfolioUrl('');
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
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Complete Your Profile</h2>
            <p className="text-sm text-text-secondary">Step {step} of {totalSteps}</p>
          </div>
          <button
            onClick={onSkip}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 py-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">Welcome to CollabForge!</h3>
                <p className="text-sm text-text-secondary mb-4">
                  Let's set up your profile so you can start connecting with creative collaborators.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                  className="input-field"
                  placeholder="Your display name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  className="input-field min-h-[80px] resize-none"
                  placeholder="Tell us about yourself and what you're looking for..."
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">Your Skills</h3>
                <p className="text-sm text-text-secondary mb-4">
                  Select the skills you bring to the table. This helps others find you for collaboration.
                </p>
              </div>

              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
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
                  className="w-full flex items-center justify-center space-x-2 border-2 border-dashed border-gray-300 rounded-md py-3 text-sm text-text-secondary hover:border-primary hover:text-primary transition-colors duration-200"
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
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">Portfolio & Links</h3>
                <p className="text-sm text-text-secondary mb-4">
                  Share your portfolio, GitHub, or other links to showcase your work.
                </p>
              </div>

              {formData.portfolioUrls.length > 0 && (
                <div className="space-y-2 mb-4">
                  {formData.portfolioUrls.map((url) => (
                    <div key={url} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                      <span className="text-sm text-text-primary truncate flex-1 mr-2">{url}</span>
                      <button
                        type="button"
                        onClick={() => removePortfolioUrl(url)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors duration-200"
                      >
                        <X className="w-4 h-4 text-text-secondary" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex space-x-2">
                <input
                  type="url"
                  value={newPortfolioUrl}
                  onChange={(e) => setNewPortfolioUrl(e.target.value)}
                  className="input-field flex-1"
                  placeholder="https://your-portfolio.com"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPortfolioUrl())}
                />
                <button
                  type="button"
                  onClick={addPortfolioUrl}
                  className="btn-primary px-4"
                  disabled={!newPortfolioUrl.trim()}
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <button
            onClick={step === 1 ? onSkip : handlePrev}
            className="btn-secondary"
          >
            {step === 1 ? 'Skip' : 'Back'}
          </button>

          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i + 1 === step ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {step < totalSteps ? (
            <button
              onClick={handleNext}
              className="btn-primary"
              disabled={step === 1 && !formData.displayName.trim()}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="btn-primary flex items-center space-x-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Complete</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

