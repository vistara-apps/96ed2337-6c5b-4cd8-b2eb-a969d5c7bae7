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
  createdAt: Date;
  updatedAt: Date;
  ownerFarcasterId: string;
}

export interface CollaborationRequest {
  requestId: string;
  senderFarcasterId: string;
  recipientFarcasterId: string;
  projectId?: string;
  status: 'pending' | 'accepted' | 'declined';
  message?: string;
  createdAt: Date;
}

export interface ProfileCardProps {
  user: User;
  variant: 'default' | 'compact';
}

export interface ProjectCardProps {
  project: Project;
  variant: 'active' | 'completed';
}

export interface SkillTagProps {
  skill: string;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
}

export interface PrimaryButtonProps {
  variant: 'default' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export interface InputTextProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  variant?: 'default';
  className?: string;
}

export interface TextAreaProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  variant?: 'default';
  rows?: number;
  className?: string;
}
