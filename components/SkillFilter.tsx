'use client';

import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { availableSkills } from '../lib/mockData';

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

  const clearFilters = () => {
    onSkillsChange([]);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-colors duration-200"
        >
          <span>Filter by Skills</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {selectedSkills.length > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs text-text-secondary hover:text-primary transition-colors duration-200"
          >
            Clear all
          </button>
        )}
      </div>

      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSkills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center space-x-1 bg-primary text-white px-2 py-1 rounded-full text-xs font-medium"
            >
              <span>{skill}</span>
              <button
                onClick={() => toggleSkill(skill)}
                className="hover:bg-white/20 rounded-full p-0.5 transition-colors duration-200"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {isOpen && (
        <div className="bg-surface border border-gray-200 rounded-lg p-3 card-shadow animate-slide-up">
          <div className="grid grid-cols-2 gap-2">
            {availableSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
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
