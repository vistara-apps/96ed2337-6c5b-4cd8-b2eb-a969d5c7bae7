'use client';

import { useState } from 'react';
import { availableSkills } from '../lib/mockData';
import { ChevronDown, X } from 'lucide-react';

interface SkillFilterProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
}

export function SkillFilter({ selectedSkills, onSkillsChange }: SkillFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onSkillsChange(selectedSkills.filter(s => s !== skill));
    } else {
      onSkillsChange([...selectedSkills, skill]);
    }
  };

  const clearAll = () => {
    onSkillsChange([]);
  };

  return (
    <div className="relative">
      {/* Selected Skills */}
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedSkills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center space-x-1 px-3 py-1 bg-primary text-white rounded-full text-sm"
            >
              <span>{skill}</span>
              <button
                onClick={() => toggleSkill(skill)}
                className="hover:bg-white/20 rounded-full p-0.5"
              >
                <X size={12} />
              </button>
            </span>
          ))}
          <button
            onClick={clearAll}
            className="text-sm text-text-secondary hover:text-text-primary underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-surface hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="text-text-secondary">
          {selectedSkills.length === 0 
            ? 'Filter by skills...' 
            : `${selectedSkills.length} skill${selectedSkills.length === 1 ? '' : 's'} selected`
          }
        </span>
        <ChevronDown 
          size={16} 
          className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
          <div className="p-2 space-y-1">
            {availableSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                  selectedSkills.includes(skill)
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100 text-text-primary'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
