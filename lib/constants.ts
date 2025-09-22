export const APP_CONFIG = {
  name: 'CollabForge',
  tagline: 'Find your creative co-pilot for epic projects',
  description: 'A social platform for discovering and connecting with creative collaborators based on skills and project needs within the Base ecosystem.',
  version: '1.0.0',
};

export const SKILL_CATEGORIES = {
  DESIGN: ['UI Design', 'UX Research', 'Graphic Design', 'Product Design', 'Figma', 'Sketch', 'Adobe Creative Suite'],
  DEVELOPMENT: ['React', 'TypeScript', 'JavaScript', 'Python', 'Solidity', 'Smart Contracts', 'Web3', 'Frontend', 'Backend'],
  MARKETING: ['Content Marketing', 'Social Media', 'SEO', 'Copywriting', 'Brand Strategy', 'Growth Hacking'],
  BUSINESS: ['Product Management', 'Business Development', 'Strategy', 'Analytics', 'Project Management'],
  CREATIVE: ['Video Editing', 'Animation', 'Photography', 'Illustration', 'Music Production', 'Writing'],
};

export const PROJECT_STATUSES = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  PAUSED: 'paused',
} as const;

export const COLLABORATION_REQUEST_STATUSES = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  DECLINED: 'declined',
} as const;

export const PRICING = {
  CONNECTION_REQUEST: 0.05, // $0.05 per request
  FEATURED_PROFILE: 1.00, // $1 for 24hr featured placement
};

export const MAX_SKILLS_PER_USER = 10;
export const MAX_PORTFOLIO_LINKS = 5;
export const MAX_BIO_LENGTH = 200;
export const MAX_PROJECT_DESCRIPTION_LENGTH = 500;

export const SOCIAL_LINKS = {
  TWITTER: 'https://twitter.com/collabforge',
  DISCORD: 'https://discord.gg/collabforge',
  GITHUB: 'https://github.com/collabforge',
};
