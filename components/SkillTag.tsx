'use client';

interface SkillTagProps {
  skill: string;
  variant?: 'primary' | 'secondary';
  isSelected?: boolean;
  onClick?: () => void;
}

export function SkillTag({ skill, variant = 'primary', isSelected = false, onClick }: SkillTagProps) {
  const baseClasses = 'px-3 py-1 rounded-full text-xs font-medium transition-colors';
  
  const variantClasses = {
    primary: isSelected 
      ? 'bg-primary text-white' 
      : 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    secondary: isSelected 
      ? 'bg-accent text-white' 
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${onClick ? 'cursor-pointer' : ''}`;

  if (onClick) {
    return (
      <button onClick={onClick} className={classes}>
        {skill}
      </button>
    );
  }

  return (
    <span className={classes}>
      {skill}
    </span>
  );
}
