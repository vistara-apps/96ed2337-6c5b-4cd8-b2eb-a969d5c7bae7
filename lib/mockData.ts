import { User, Project } from './types';

export const mockUsers: User[] = [
  {
    farcasterId: 'user1',
    displayName: 'Sarah Chen',
    bio: 'UI/UX Designer passionate about Web3 experiences',
    profilePicUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    skills: ['UI Design', 'UX Research', 'Figma', 'Prototyping'],
    portfolioUrls: ['https://dribbble.com/sarahchen', 'https://behance.net/sarahchen']
  },
  {
    farcasterId: 'user2',
    displayName: 'Marcus Rodriguez',
    bio: 'Full-stack developer building the future of DeFi',
    profilePicUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    skills: ['Smart Contracts', 'React', 'Node.js', 'Solidity'],
    portfolioUrls: ['https://github.com/marcusdev', 'https://marcus.dev']
  },
  {
    farcasterId: 'user3',
    displayName: 'Emma Thompson',
    bio: 'Creative copywriter specializing in crypto & tech',
    profilePicUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    skills: ['Copywriting', 'Content Strategy', 'Brand Voice', 'Technical Writing'],
    portfolioUrls: ['https://emmawrites.com', 'https://medium.com/@emmathompson']
  },
  {
    farcasterId: 'user4',
    displayName: 'Alex Kim',
    bio: 'Motion designer creating engaging Web3 animations',
    profilePicUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    skills: ['Motion Graphics', 'After Effects', '3D Animation', 'Video Editing'],
    portfolioUrls: ['https://vimeo.com/alexkim', 'https://alexmotion.com']
  },
  {
    farcasterId: 'user5',
    displayName: 'Zoe Martinez',
    bio: 'Product manager with 5+ years in crypto startups',
    profilePicUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    skills: ['Product Management', 'User Research', 'Analytics', 'Strategy'],
    portfolioUrls: ['https://linkedin.com/in/zoemartinez']
  }
];

export const mockProjects: Project[] = [
  {
    projectId: 'proj1',
    projectName: 'DeFi Dashboard Redesign',
    description: 'Modernizing the user experience for a popular DeFi protocol dashboard',
    requiredSkills: ['UI Design', 'React', 'Data Visualization'],
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    ownerFarcasterId: 'user1'
  },
  {
    projectId: 'proj2',
    projectName: 'NFT Marketplace Launch',
    description: 'Building a new NFT marketplace focused on digital art and collectibles',
    requiredSkills: ['Smart Contracts', 'Full-stack Development', 'UI Design'],
    status: 'active',
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    ownerFarcasterId: 'user2'
  }
];

export const availableSkills = [
  'UI Design',
  'UX Research',
  'Smart Contracts',
  'React',
  'Node.js',
  'Solidity',
  'Copywriting',
  'Content Strategy',
  'Motion Graphics',
  'Video Editing',
  'Product Management',
  'Data Analysis',
  'Marketing',
  'Community Management',
  'Brand Design',
  'Frontend Development',
  'Backend Development',
  'DevOps',
  'Security Audit',
  'Technical Writing'
];
