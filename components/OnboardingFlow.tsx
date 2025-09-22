'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, User, Briefcase, ExternalLink } from 'lucide-react';
import { availableSkills } from '../lib/mockData';

interface OnboardingFlowProps {
  farcasterId: string;
  onComplete: (profileData: any) => void;
  onSkip: () => void;
}

export function OnboardingFlow({ farcasterId, onComplete, onSkip }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({
    displayName: '',
    bio: '',
    skills: [] as string[],
    portfolioUrls: [] as string[],
  });

  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          farcasterId,
          ...profileData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create profile');
      }

      const user = await response.json();
      onComplete(user);
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Failed to create profile. Please try again.');
    }
  };

  const toggleSkill = (skill: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const addPortfolioUrl = () => {
    setProfileData(prev => ({
      ...prev,
      portfolioUrls: [...prev.portfolioUrls, ''],
    }));
  };

  const updatePortfolioUrl = (index: number, url: string) => {
    setProfileData(prev => ({
      ...prev,
      portfolioUrls: prev.portfolioUrls.map((u, i) => i === index ? url : u),
    }));
  };

  const removePortfolioUrl = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      portfolioUrls: prev.portfolioUrls.filter((_, i) => i !== index),
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="text-primary" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Welcome to CollabForge!
              </h2>
              <p className="text-text-secondary">
                Let's set up your profile to help you find the perfect collaborators.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-text-primary mb-2">
                  Display Name *
                </label>
                <input
                  id="displayName"
                  type="text"
                  value={profileData.displayName}
                  onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
                  placeholder="Your display name"
                  className="input-field"
                />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-text-primary mb-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell others about yourself and your creative interests..."
                  rows={3}
                  className="input-field"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="text-accent" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Your Skills
              </h2>
              <p className="text-text-secondary">
                Select the skills you bring to collaborative projects.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
              {availableSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                    profileData.skills.includes(skill)
                      ? 'bg-primary text-white border-primary'
                      : 'bg-gray-50 text-text-secondary border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>

            {profileData.skills.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-text-secondary mb-2">
                  Selected skills ({profileData.skills.length}):
                </p>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                      <button
                        onClick={() => toggleSkill(skill)}
                        className="ml-1 text-primary hover:text-primary/80"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="text-accent" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Portfolio & Links
              </h2>
              <p className="text-text-secondary">
                Share your work to showcase your capabilities to potential collaborators.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-text-primary">
                  Portfolio Links
                </label>
                <button
                  onClick={addPortfolioUrl}
                  className="text-primary hover:text-primary/80 text-sm font-medium"
                >
                  + Add Link
                </button>
              </div>

              {profileData.portfolioUrls.map((url, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => updatePortfolioUrl(index, e.target.value)}
                    placeholder="https://your-portfolio.com"
                    className="input-field flex-1"
                  />
                  <button
                    onClick={() => removePortfolioUrl(index)}
                    className="px-3 py-2 text-red-500 hover:text-red-700 border border-red-200 rounded-md hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              ))}

              {profileData.portfolioUrls.length === 0 && (
                <p className="text-sm text-text-secondary text-center py-8">
                  No portfolio links added yet. Add some links to showcase your work!
                </p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-secondary">
                Step {step} of {totalSteps}
              </span>
              <button
                onClick={onSkip}
                className="text-sm text-text-secondary hover:text-text-primary"
              >
                Skip for now
              </button>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          {renderStep()}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              disabled={step === 1 && !profileData.displayName.trim()}
              className="btn-primary flex items-center space-x-2"
            >
              <span>{step === totalSteps ? 'Complete Setup' : 'Next'}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

