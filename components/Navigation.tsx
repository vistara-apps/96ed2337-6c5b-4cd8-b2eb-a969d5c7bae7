'use client';

import { Users, Briefcase, LogIn, LogOut, User } from 'lucide-react';
import { User as UserType } from '../lib/types';

interface NavigationProps {
  activeTab: 'discover' | 'projects';
  onTabChange: (tab: 'discover' | 'projects') => void;
  currentUser: UserType | null;
  onAuthClick: () => void;
  onLogout: () => void;
}

export function Navigation({ activeTab, onTabChange, currentUser, onAuthClick, onLogout }: NavigationProps) {
  return (
    <div className="bg-surface border-b border-gray-200 px-4 py-4">
      <div className="container">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-text-primary">CollabForge</h1>
            <p className="text-sm text-text-secondary">Find your creative co-pilot</p>
          </div>

          <div className="flex items-center space-x-3">
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <User size={16} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">
                    {currentUser.displayName}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                <LogIn size={16} />
                <span>Connect</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onTabChange('discover')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'discover'
                ? 'bg-surface text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Users size={18} />
            <span>Discover</span>
          </button>
          <button
            onClick={() => onTabChange('projects')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'projects'
                ? 'bg-surface text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Briefcase size={18} />
            <span>Projects</span>
          </button>
        </div>
      </div>
    </div>
  );
}
