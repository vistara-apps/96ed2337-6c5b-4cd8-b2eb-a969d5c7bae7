export interface User {
  farcasterId: string;
  displayName: string;
  bio: string;
  profilePicUrl: string;
  skills: string[];
  portfolioUrls: string[];
  createdAt: string;
  updatedAt: string;
  isVerified?: boolean;
  featuredUntil?: string;
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
  collaborators: string[];
  budget?: string;
  deadline?: string;
}

export interface CollaborationRequest {
  requestId: string;
  senderFarcasterId: string;
  recipientFarcasterId: string;
  projectId?: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
  respondedAt?: string;
  paymentTxHash?: string;
}

export interface CreateProjectData {
  projectName: string;
  description: string;
  requiredSkills: string[];
  status: 'active';
  ownerFarcasterId: string;
  budget?: string;
  deadline?: string;
}

export interface PaymentTransaction {
  txHash: string;
  from: string;
  to: string;
  amount: string;
  type: 'collaboration_request' | 'featured_profile';
  referenceId: string; // collaboration request ID or user ID
  status: 'pending' | 'confirmed' | 'failed';
  createdAt: string;
}

export interface FarcasterFrameAction {
  fid: number;
  buttonIndex: number;
  castId: {
    fid: number;
    hash: string;
  };
  inputText?: string;
  state?: string;
}
