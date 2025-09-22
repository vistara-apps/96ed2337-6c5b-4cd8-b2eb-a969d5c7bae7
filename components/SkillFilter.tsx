'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { SkillTag } from './SkillTag';
import { availableSkills } from '../lib/mockData';

interface SkillFilterProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
}

export function SkillFilter({ selectedSkills, onSkillsChange }: SkillFilterProps) {
  const [showAllSkills, setShowAllSkills] = useState(false);

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

  const displayedSkills = showAllSkills ? availableSkills : availableSkills.slice(0, 8);

  return (
    <div className="bg-surface rounded-lg shadow-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-text-secondary" />
          <span className="font-medium text-text-primary">Filter by Skills</span>
        </div>
        {selectedSkills.length > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-1 text-sm text-text-secondary hover:text-text-primary"
          >
            <X className="w-3 h-3" />
            <span>Clear</span>
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {displayedSkills.map((skill) => (
          <SkillTag
            key={skill}
            skill={skill}
            variant="primary"
            isSelected={selectedSkills.includes(skill)}
            onClick={() => toggleSkill(skill)}
          />
        ))}
      </div>

      {availableSkills.length > 8 && (
        <button
          onClick={() => setShowAllSkills(!showAllSkills)}
          className="text-sm text-primary hover:underline"
        >
          {showAllSkills ? 'Show Less' : `Show All ${availableSkills.length} Skills`}
        </button>
      )}

      {selectedSkills.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-sm text-text-secondary">
            Showing creators with: {selectedSkills.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}
