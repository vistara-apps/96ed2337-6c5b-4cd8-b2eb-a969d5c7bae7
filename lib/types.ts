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
  ownerFarcasterId: string;
}

export interface CollaborationRequest {
  requestId: string;
  senderFarcasterId: string;
  recipientFarcasterId: string;
  projectId?: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface ProjectBrief {
  projectName: string;
  description: string;
  requiredSkills: string[];
  deliverables: string[];
  timeline: string;
}
