'use client';

import { SkillTagProps } from '../lib/types';
import { getSkillColor } from '../lib/utils';

export function SkillTag({ skill, variant, onClick, isSelected = false }: SkillTagProps) {
  const baseClasses = "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors duration-200 cursor-pointer";
  
  const variantClasses = {
    primary: isSelected
      ? "bg-blue-700 text-white hover:bg-blue-800 ring-2 ring-blue-300"
      : "bg-primary text-white hover:bg-blue-600",
    secondary: isSelected
      ? `${getSkillColor(skill)} ring-2 ring-blue-300`
      : `${getSkillColor(skill)} hover:opacity-80`,
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={handleClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {skill}
    </span>
  );
}
