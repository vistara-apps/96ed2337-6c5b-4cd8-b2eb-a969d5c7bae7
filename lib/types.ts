export interface User {
  farcasterId: string;
  displayName: string;
  bio: string;
  profilePicUrl: string;
  skills: string[];
  portfolioUrls: string[];
}

export interface Project {
  projectId: string;
  projectName: string;
  description: string;
  requiredSkills: string[];
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CollaborationRequest {
  requestId: string;
  senderFarcasterId: string;
  recipientFarcasterId: string;
  projectId?: string;
  status: 'pending' | 'accepted' | 'declined';
  message: string;
  createdAt: string;
}

export interface CreateProjectData {
  projectName: string;
  description: string;
  requiredSkills: string[];
}

export interface CollaborationRequestData {
  message: string;
  projectId?: string;
  requiredSkills: string[];
}
