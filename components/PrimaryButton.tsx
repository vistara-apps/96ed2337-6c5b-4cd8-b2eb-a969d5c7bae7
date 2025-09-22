'use client';

import { PrimaryButtonProps } from '../lib/types';

export function PrimaryButton({ 
  variant, 
  size = 'md', 
  children, 
  onClick, 
  disabled = false,
  className = ''
}: PrimaryButtonProps) {
  const baseClasses = "inline-flex items-center justify-center space-x-2 font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    default: "bg-primary text-white hover:bg-blue-600 focus:ring-primary",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };
  
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
