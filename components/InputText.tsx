'use client';

import { InputTextProps } from '../lib/types';

export function InputText({ 
  placeholder, 
  value, 
  onChange, 
  variant = 'default',
  className = ''
}: InputTextProps) {
  const baseClasses = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200";
  
  const variantClasses = {
    default: "border-gray-300 bg-surface text-text-primary placeholder-text-secondary",
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    />
  );
}
