'use client';

import { Home, Search, Briefcase, Bell, User } from 'lucide-react';

interface HeaderProps {
  displayName: string;
  activeTab: 'discover' | 'projects';
  onTabChange: (tab: 'discover' | 'projects') => void;
}

export function Header({ displayName, activeTab, onTabChange }: HeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-surface border-b border-gray-200">
      <div className="max-w-xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CF</span>
            </div>
            <div>
              <h1 className="font-bold text-text-primary">CollabForge</h1>
              <p className="text-xs text-text-secondary">Welcome, {displayName}</p>
            </div>
          </div>
          <Bell className="w-6 h-6 text-text-secondary" />
        </div>
        
        <div className="flex space-x-1 pb-2">
          <button
            onClick={() => onTabChange('discover')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'discover'
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:bg-gray-100'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Discover</span>
          </button>
          <button
            onClick={() => onTabChange('projects')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'projects'
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:bg-gray-100'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Projects</span>
          </button>
        </div>
      </div>
    </div>
  );
}
