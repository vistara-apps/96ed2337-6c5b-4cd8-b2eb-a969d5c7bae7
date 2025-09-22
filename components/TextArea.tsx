'use client';

import { TextAreaProps } from '../lib/types';

export function TextArea({ 
  placeholder, 
  value, 
  onChange, 
  variant = 'default',
  rows = 4,
  className = ''
}: TextAreaProps) {
  const baseClasses = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 resize-vertical";
  
  const variantClasses = {
    default: "border-gray-300 bg-surface text-text-primary placeholder-text-secondary",
  };

  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    />
  );
}
