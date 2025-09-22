import type { User, Project } from './types';

export const mockUsers: User[] = [
  {
    farcasterId: 'user1',
    displayName: 'Georgina Dwarf',
    bio: 'UI/UX Designer passionate about Web3 experiences',
    profilePicUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    skills: ['UI Design', 'UX Design', 'Figma', 'Prototyping'],
    portfolioUrls: ['https://dribbble.com/georgina', 'https://behance.net/georgina']
  },
  {
    farcasterId: 'user2',
    displayName: 'Lila Jin',
    bio: 'Full-stack developer building the future of DeFi',
    profilePicUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    skills: ['React', 'Solidity', 'TypeScript', 'Smart Contracts'],
    portfolioUrls: ['https://github.com/lilajin', 'https://lilajin.dev']
  },
  {
    farcasterId: 'user3',
    displayName: 'Marcus Chen',
    bio: 'Creative director with 8+ years in brand design',
    profilePicUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    skills: ['Brand Design', 'Art Direction', 'Illustration', 'Motion Graphics'],
    portfolioUrls: ['https://marcuschen.co', 'https://instagram.com/marcusdesigns']
  },
  {
    farcasterId: 'user4',
    displayName: 'Sarah Kim',
    bio: 'Product manager turning ideas into reality',
    profilePicUrl: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
    skills: ['Product Management', 'Strategy', 'User Research', 'Analytics'],
    portfolioUrls: ['https://linkedin.com/in/sarahkim', 'https://medium.com/@sarahkim']
  },
  {
    farcasterId: 'user5',
    displayName: 'Alex Rivera',
    bio: 'Blockchain developer specializing in DeFi protocols',
    profilePicUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    skills: ['Solidity', 'Web3', 'DeFi', 'Smart Contract Auditing'],
    portfolioUrls: ['https://github.com/alexrivera', 'https://alexrivera.eth']
  }
];

export const mockProjects: Project[] = [
  {
    projectId: 'proj1',
    projectName: 'DeFi Dashboard',
    description: 'Building a comprehensive dashboard for DeFi portfolio management with real-time analytics and yield farming optimization.',
    requiredSkills: ['React', 'UI Design', 'Web3', 'Data Visualization'],
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
    ownerFarcasterId: 'user2',
    collaborators: ['user1']
  },
  {
    projectId: 'proj2',
    projectName: 'NFT Marketplace',
    description: 'Creating a next-generation NFT marketplace focused on digital art and collectibles with advanced filtering and social features.',
    requiredSkills: ['Smart Contracts', 'Frontend Development', 'Brand Design'],
    status: 'active',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-18T12:00:00Z',
    ownerFarcasterId: 'user5',
    collaborators: ['user3']
  },
  {
    projectId: 'proj3',
    projectName: 'Social Trading Platform',
    description: 'Developing a social trading platform where users can follow and copy successful traders in the crypto space.',
    requiredSkills: ['Product Management', 'Backend Development', 'UX Design'],
    status: 'active',
    createdAt: '2024-01-12T14:00:00Z',
    updatedAt: '2024-01-19T16:45:00Z',
    ownerFarcasterId: 'user4',
    collaborators: []
  }
];

export const availableSkills = [
  'UI Design', 'UX Design', 'React', 'TypeScript', 'Solidity', 'Smart Contracts',
  'Brand Design', 'Illustration', 'Product Management', 'Web3', 'DeFi',
  'Frontend Development', 'Backend Development', 'Figma', 'Motion Graphics',
  'Data Visualization', 'User Research', 'Strategy', 'Analytics', 'Art Direction'
];
