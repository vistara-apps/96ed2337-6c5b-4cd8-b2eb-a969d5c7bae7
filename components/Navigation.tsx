'use client';

import { Home, Search, Bell, User } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-200 px-4 py-2">
      <div className="container">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center space-y-1 p-2 text-primary">
            <Home size={20} />
            <span className="text-xs">Home</span>
          </button>
          
          <button className="flex flex-col items-center space-y-1 p-2 text-text-secondary hover:text-text-primary transition-colors duration-200">
            <Search size={20} />
            <span className="text-xs">Search</span>
          </button>
          
          <button className="flex flex-col items-center space-y-1 p-2 text-text-secondary hover:text-text-primary transition-colors duration-200 relative">
            <Bell size={20} />
            <span className="text-xs">Notifications</span>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
          </button>
          
          <button className="flex flex-col items-center space-y-1 p-2 text-text-secondary hover:text-text-primary transition-colors duration-200">
            <User size={20} />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
