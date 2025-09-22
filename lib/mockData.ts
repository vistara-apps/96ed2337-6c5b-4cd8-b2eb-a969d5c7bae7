import { User, Project } from './types';

export const mockUsers: User[] = [
  {
    farcasterId: '1',
    displayName: 'Sarah Chen',
    bio: 'UI/UX Designer passionate about Web3 experiences',
    profilePicUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    skills: ['UI Design', 'UX Research', 'Figma', 'Prototyping'],
    portfolioUrls: ['https://dribbble.com/sarahchen', 'https://behance.net/sarahchen']
  },
  {
    farcasterId: '2',
    displayName: 'Marcus Rodriguez',
    bio: 'Full-stack developer building the future of DeFi',
    profilePicUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    skills: ['Smart Contracts', 'React', 'Node.js', 'Solidity'],
    portfolioUrls: ['https://github.com/marcusdev', 'https://marcus.dev']
  },
  {
    farcasterId: '3',
    displayName: 'Emma Thompson',
    bio: 'Creative copywriter specializing in crypto & tech',
    profilePicUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    skills: ['Copywriting', 'Content Strategy', 'Brand Voice', 'Technical Writing'],
    portfolioUrls: ['https://emmawrites.com', 'https://medium.com/@emmathompson']
  },
  {
    farcasterId: '4',
    displayName: 'Alex Kim',
    bio: 'Motion designer creating engaging Web3 animations',
    profilePicUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    skills: ['Motion Graphics', 'After Effects', '3D Animation', 'Video Editing'],
    portfolioUrls: ['https://vimeo.com/alexkim', 'https://alexmotion.com']
  },
  {
    farcasterId: '5',
    displayName: 'Zoe Martinez',
    bio: 'Product manager with a passion for user-centric design',
    profilePicUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    skills: ['Product Management', 'User Research', 'Analytics', 'Strategy'],
    portfolioUrls: ['https://linkedin.com/in/zoemartinez', 'https://zoepm.com']
  }
];

export const mockProjects: Project[] = [
  {
    projectId: '1',
    projectName: 'DeFi Dashboard Redesign',
    description: 'Modernizing the user experience for a popular DeFi protocol dashboard',
    requiredSkills: ['UI Design', 'React', 'Data Visualization'],
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    ownerFarcasterId: 'current-user'
  },
  {
    projectId: '2',
    projectName: 'NFT Marketplace Launch',
    description: 'Building a new NFT marketplace focused on digital art and collectibles',
    requiredSkills: ['Smart Contracts', 'Frontend Development', 'Brand Design'],
    status: 'active',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
    ownerFarcasterId: 'current-user'
  },
  {
    projectId: '3',
    projectName: 'Crypto Education Platform',
    description: 'Creating educational content and interactive tutorials for crypto beginners',
    requiredSkills: ['Content Writing', 'Video Production', 'UX Design'],
    status: 'completed',
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2024-01-05'),
    ownerFarcasterId: 'current-user'
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
  'Analytics',
  'Brand Design',
  'Frontend Development',
  'Backend Development',
  'Data Visualization',
  'Technical Writing',
  '3D Animation',
  'Photography',
  'Illustration'
];
