// Authentication utilities for Farcaster integration

import type { User } from './types';

const CURRENT_USER_KEY = 'collabforge_current_user';

// Mock Farcaster authentication for development
export const mockAuthenticate = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    fid: 12345,
    username: 'testuser',
    displayName: 'Test User',
    pfpUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=testuser',
  };
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem(CURRENT_USER_KEY);
};

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;

  try {
    const userData = localStorage.getItem(CURRENT_USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

export const setCurrentUser = (user: User): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error storing user data:', error);
  }
};

export const clearCurrentUser = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Session validation
export const validateSession = async (): Promise<boolean> => {
  const user = getCurrentUser();
  if (!user) return false;

  // In production, validate with Farcaster Hub
  // For now, just check if user exists in localStorage
  return true;
};

// Logout
export const logout = (): void => {
  clearCurrentUser();
  // In production, clear any server-side sessions
};

