'use client';

import { useState, useEffect } from 'react';
import { useMiniKit, useAuthenticate } from '@coinbase/onchainkit/minikit';
import { Bell, Search, User } from 'lucide-react';

export function Header() {
  const { context } = useMiniKit();
  const { signIn } = useAuthenticate();
  const [authenticatedUser, setAuthenticatedUser] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const displayName = context?.user?.displayName || authenticatedUser?.displayName || 'Friend';
  const profilePic = context?.user?.pfpUrl;

  return (
    <header className="bg-surface border-b border-gray-200 px-4 py-3">
      <div className="max-w-xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CF</span>
          </div>
          <div>
            <h1 className="font-bold text-text-primary">CollabForge</h1>
            <p className="text-xs text-text-secondary">Find your co-pilot</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200">
            <Search className="w-5 h-5 text-text-secondary" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200 relative">
            <Bell className="w-5 h-5 text-text-secondary" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
          </button>
          <div className="flex items-center space-x-2">
            {profilePic ? (
              <img
                src={profilePic}
                alt={displayName}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-text-secondary" />
              </div>
            )}
            <span className="text-sm font-medium text-text-primary hidden sm:block">
              {displayName}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
