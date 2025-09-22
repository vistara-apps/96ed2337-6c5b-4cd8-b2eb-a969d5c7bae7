// In-memory database implementation
// In production, this would be replaced with a real database like PostgreSQL, MongoDB, etc.

import type { User, Project, CollaborationRequest } from './types';

class Database {
  private users: Map<string, User> = new Map();
  private projects: Map<string, Project> = new Map();
  private collaborations: Map<string, CollaborationRequest> = new Map();

  // Initialize with mock data
  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Mock users
    const mockUsers: User[] = [
      {
        farcasterId: 'user1',
        displayName: 'Alice Chen',
        bio: 'Full-stack developer specializing in DeFi protocols and smart contracts',
        profilePicUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
        skills: ['Solidity', 'React', 'TypeScript', 'DeFi'],
        portfolioUrls: ['https://github.com/alice', 'https://alice.dev'],
      },
      {
        farcasterId: 'user2',
        displayName: 'Bob Martinez',
        bio: 'UI/UX designer with a passion for Web3 user experiences',
        profilePicUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
        skills: ['UI Design', 'Figma', 'User Research', 'Web3'],
        portfolioUrls: ['https://bob.design', 'https://dribbble.com/bob'],
      },
      {
        farcasterId: 'user3',
        displayName: 'Carol Johnson',
        bio: 'Smart contract auditor and security researcher',
        profilePicUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carol',
        skills: ['Solidity', 'Security', 'Auditing', 'Ethereum'],
        portfolioUrls: ['https://carol.security', 'https://github.com/carol'],
      },
      {
        farcasterId: 'user4',
        displayName: 'David Kim',
        bio: 'Creative director and brand strategist for Web3 projects',
        profilePicUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
        skills: ['Branding', 'Strategy', 'Copywriting', 'Marketing'],
        portfolioUrls: ['https://david.creative', 'https://behance.net/david'],
      },
      {
        farcasterId: 'user5',
        displayName: 'Eva Rodriguez',
        bio: 'Community manager and growth hacker for blockchain projects',
        profilePicUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=eva',
        skills: ['Community', 'Growth', 'Discord', 'Twitter'],
        portfolioUrls: ['https://eva.community'],
      },
    ];

    mockUsers.forEach(user => this.users.set(user.farcasterId, user));

    // Mock projects
    const mockProjects: Project[] = [
      {
        projectId: 'proj1',
        projectName: 'DeFi Yield Optimizer',
        description: 'A smart contract system that automatically optimizes yield farming across multiple protocols',
        requiredSkills: ['Solidity', 'DeFi', 'Smart Contracts'],
        status: 'active',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        ownerFarcasterId: 'user1',
        collaborators: ['user3'],
      },
      {
        projectId: 'proj2',
        projectName: 'NFT Marketplace Redesign',
        description: 'Complete UI/UX overhaul of an existing NFT marketplace with improved user experience',
        requiredSkills: ['UI Design', 'React', 'Web3'],
        status: 'active',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        ownerFarcasterId: 'user2',
      },
      {
        projectId: 'proj3',
        projectName: 'DAO Governance Tool',
        description: 'A comprehensive tool for DAO governance with proposal creation, voting, and analytics',
        requiredSkills: ['React', 'TypeScript', 'Web3', 'Solidity'],
        status: 'active',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        ownerFarcasterId: 'user1',
        collaborators: ['user2', 'user4'],
      },
    ];

    mockProjects.forEach(project => this.projects.set(project.projectId, project));
  }

  // User methods
  async getUser(farcasterId: string): Promise<User | null> {
    return this.users.get(farcasterId) || null;
  }

  async createUser(user: User): Promise<User> {
    this.users.set(user.farcasterId, user);
    return user;
  }

  async searchUsers(query: string, skills?: string[]): Promise<User[]> {
    const users = Array.from(this.users.values());

    return users.filter(user => {
      const matchesQuery = !query ||
        user.displayName.toLowerCase().includes(query.toLowerCase()) ||
        user.bio.toLowerCase().includes(query.toLowerCase()) ||
        user.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()));

      const matchesSkills = !skills ||
        skills.every(skill => user.skills.includes(skill));

      return matchesQuery && matchesSkills;
    });
  }

  // Project methods
  async getProject(projectId: string): Promise<Project | null> {
    return this.projects.get(projectId) || null;
  }

  async createProject(project: Project): Promise<Project> {
    this.projects.set(project.projectId, project);
    return project;
  }

  async searchProjects(query: string, skills?: string[]): Promise<Project[]> {
    const projects = Array.from(this.projects.values());

    return projects.filter(project => {
      const matchesQuery = !query ||
        project.projectName.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase());

      const matchesSkills = !skills ||
        skills.every(skill => project.requiredSkills.includes(skill));

      return matchesQuery && matchesSkills && project.status === 'active';
    });
  }

  async getProjectsByOwner(ownerFarcasterId: string): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.ownerFarcasterId === ownerFarcasterId);
  }

  // Collaboration methods
  async createCollaborationRequest(request: CollaborationRequest): Promise<CollaborationRequest> {
    this.collaborations.set(request.requestId, request);
    return request;
  }

  async getCollaborationRequest(requestId: string): Promise<CollaborationRequest | null> {
    return this.collaborations.get(requestId) || null;
  }

  async getCollaborationRequestsBySender(senderFarcasterId: string): Promise<CollaborationRequest[]> {
    return Array.from(this.collaborations.values())
      .filter(request => request.senderFarcasterId === senderFarcasterId);
  }

  async getCollaborationRequestsByRecipient(recipientFarcasterId: string): Promise<CollaborationRequest[]> {
    return Array.from(this.collaborations.values())
      .filter(request => request.recipientFarcasterId === recipientFarcasterId);
  }

  async updateCollaborationRequest(requestId: string, updates: Partial<CollaborationRequest>): Promise<CollaborationRequest | null> {
    const request = this.collaborations.get(requestId);
    if (!request) return null;

    const updatedRequest = { ...request, ...updates };
    this.collaborations.set(requestId, updatedRequest);
    return updatedRequest;
  }
}

// Export singleton instance
export const db = new Database();

