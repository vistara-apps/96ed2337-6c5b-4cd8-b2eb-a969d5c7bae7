'use client';

import { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { availableSkills } from '../lib/mockData';

interface AdvancedFiltersProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
  sortBy: 'recent' | 'popular' | 'relevance';
  onSortChange: (sort: 'recent' | 'popular' | 'relevance') => void;
}

export function AdvancedFilters({
  selectedSkills,
  onSkillsChange,
  sortBy,
  onSortChange
}: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onSkillsChange(selectedSkills.filter(s => s !== skill));
    } else {
      onSkillsChange([...selectedSkills, skill]);
    }
  };

  const clearAllFilters = () => {
    onSkillsChange([]);
    onSortChange('recent');
  };

  const hasActiveFilters = selectedSkills.length > 0 || sortBy !== 'recent';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 border rounded-lg transition-colors duration-200 ${
          hasActiveFilters
            ? 'border-primary bg-primary/5 text-primary'
            : 'border-gray-200 bg-surface text-text-secondary hover:border-gray-300'
        }`}
      >
        <Filter className="w-4 h-4" />
        <span className="text-sm">Filters</span>
        {hasActiveFilters && (
          <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {selectedSkills.length + (sortBy !== 'recent' ? 1 : 0)}
          </span>
        )}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-surface border border-gray-200 rounded-lg card-shadow z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-text-primary">Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-primary hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Sort By */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Sort by
              </label>
              <div className="space-y-1">
                {[
                  { value: 'recent', label: 'Most Recent' },
                  { value: 'popular', label: 'Most Popular' },
                  { value: 'relevance', label: 'Most Relevant' },
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      value={option.value}
                      checked={sortBy === option.value}
                      onChange={(e) => onSortChange(e.target.value as any)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-text-primary">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Skills Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Skills
              </label>

              {/* Selected Skills */}
              {selectedSkills.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
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

              {/* Skill Selection */}
              <div className="relative">
                <button
                  onClick={() => setShowSkillDropdown(!showSkillDropdown)}
                  className="w-full flex items-center justify-center space-x-2 border-2 border-dashed border-gray-300 rounded-md py-2 text-sm text-text-secondary hover:border-primary hover:text-primary transition-colors duration-200"
                >
                  <span>Add Skills</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showSkillDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showSkillDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-gray-200 rounded-lg card-shadow max-h-48 overflow-y-auto z-10">
                    <div className="p-2 space-y-1">
                      {availableSkills
                        .filter(skill => !selectedSkills.includes(skill))
                        .map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSkill(skill)}
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

            <div className="flex justify-end mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => setIsOpen(false)}
                className="btn-primary"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

