import type { User, Project, CollaborationRequest } from './types';

// Simple in-memory database for demo purposes
// In production, this would be replaced with a real database like PostgreSQL, MongoDB, etc.

interface Database {
  users: Map<string, User>;
  projects: Map<string, Project>;
  collaborationRequests: Map<string, CollaborationRequest>;
  featuredProfiles: Map<string, { farcasterId: string; expiresAt: string }>;
}

class DatabaseService {
  private db: Database = {
    users: new Map(),
    projects: new Map(),
    collaborationRequests: new Map(),
    featuredProfiles: new Map(),
  };

  // User operations
  async getUser(farcasterId: string): Promise<User | null> {
    return this.db.users.get(farcasterId) || null;
  }

  async createUser(user: User): Promise<User> {
    this.db.users.set(user.farcasterId, user);
    return user;
  }

  async updateUser(farcasterId: string, updates: Partial<User>): Promise<User | null> {
    const user = this.db.users.get(farcasterId);
    if (!user) return null;

    const updatedUser = { ...user, ...updates };
    this.db.users.set(farcasterId, updatedUser);
    return updatedUser;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.db.users.values());
  }

  async searchUsersBySkills(skills: string[]): Promise<User[]> {
    if (skills.length === 0) return this.getAllUsers();

    return Array.from(this.db.users.values()).filter(user =>
      user.skills.some(skill => skills.includes(skill))
    );
  }

  // Project operations
  async getProject(projectId: string): Promise<Project | null> {
    return this.db.projects.get(projectId) || null;
  }

  async createProject(project: Project): Promise<Project> {
    this.db.projects.set(project.projectId, project);
    return project;
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.db.projects.values());
  }

  async getProjectsByOwner(farcasterId: string): Promise<Project[]> {
    return Array.from(this.db.projects.values()).filter(
      project => project.ownerFarcasterId === farcasterId
    );
  }

  async updateProject(projectId: string, updates: Partial<Project>): Promise<Project | null> {
    const project = this.db.projects.get(projectId);
    if (!project) return null;

    const updatedProject = { ...project, ...updates, updatedAt: new Date().toISOString() };
    this.db.projects.set(projectId, updatedProject);
    return updatedProject;
  }

  // Collaboration request operations
  async createCollaborationRequest(request: CollaborationRequest): Promise<CollaborationRequest> {
    this.db.collaborationRequests.set(request.requestId, request);
    return request;
  }

  async getCollaborationRequestsForUser(farcasterId: string): Promise<CollaborationRequest[]> {
    return Array.from(this.db.collaborationRequests.values()).filter(
      request => request.recipientFarcasterId === farcasterId
    );
  }

  async updateCollaborationRequest(requestId: string, updates: Partial<CollaborationRequest>): Promise<CollaborationRequest | null> {
    const request = this.db.collaborationRequests.get(requestId);
    if (!request) return null;

    const updatedRequest = { ...request, ...updates };
    this.db.collaborationRequests.set(requestId, updatedRequest);
    return updatedRequest;
  }

  // Featured profiles
  async setFeaturedProfile(farcasterId: string, durationHours: number = 24): Promise<void> {
    const expiresAt = new Date(Date.now() + durationHours * 60 * 60 * 1000).toISOString();
    this.db.featuredProfiles.set(farcasterId, { farcasterId, expiresAt });
  }

  async isProfileFeatured(farcasterId: string): Promise<boolean> {
    const featured = this.db.featuredProfiles.get(farcasterId);
    if (!featured) return false;

    return new Date(featured.expiresAt) > new Date();
  }

  async getFeaturedProfiles(): Promise<User[]> {
    const featuredIds = Array.from(this.db.featuredProfiles.values())
      .filter(featured => new Date(featured.expiresAt) > new Date())
      .map(featured => featured.farcasterId);

    return Array.from(this.db.users.values()).filter(user =>
      featuredIds.includes(user.farcasterId)
    );
  }

  // Initialize with mock data
  async initializeWithMockData(): Promise<void> {
    // This will be called to populate the database with initial data
    // In production, this would be handled by database migrations/seeding
  }
}

export const db = new DatabaseService();

