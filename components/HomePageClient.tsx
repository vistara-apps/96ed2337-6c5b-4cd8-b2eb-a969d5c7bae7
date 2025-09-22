'use client';

import { useState, useEffect } from 'react';
import { useMiniKit, useAuthenticate } from '@coinbase/onchainkit/minikit';
import { Header } from './Header';
import { ProfileCard } from './ProfileCard';
import { ProjectCard } from './ProjectCard';
import { CreateProjectModal } from './CreateProjectModal';
import { CollaborationRequestModal } from './CollaborationRequestModal';
import { SkillFilter } from './SkillFilter';
import { LoadingSpinner } from './LoadingSpinner';
import { mockUsers, mockProjects } from '../lib/mockData';
import type { User, Project, CreateProjectData } from '../lib/types';

export default function HomePageClient() {
  const { context } = useMiniKit();
  const { signIn } = useAuthenticate();
  const [authenticatedUser, setAuthenticatedUser] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [activeTab, setActiveTab] = useState<'discover' | 'projects'>('discover');
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);
  const [userProjects, setUserProjects] = useState<Project[]>(mockProjects);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCollabRequest, setShowCollabRequest] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedSkills.length === 0) {
      setFilteredUsers(mockUsers);
    } else {
      const filtered = mockUsers.filter(user =>
        user.skills.some(skill => selectedSkills.includes(skill))
      );
      setFilteredUsers(filtered);
    }
  }, [selectedSkills]);

  const handleCollaborationRequest = (targetUser: User) => {
    setSelectedUser(targetUser);
    setShowCollabRequest(true);
  };

  const handleCreateProject = (projectData: Omit<CreateProjectData, 'ownerFarcasterId'>) => {
    const newProject: Project = {
      ...projectData,
      projectId: `proj_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ownerFarcasterId: context?.user?.fid?.toString() || 'anonymous',
      status: 'active',
    };
    setUserProjects(prev => [newProject, ...prev]);
    setShowCreateProject(false);
  };

  if (!isClient || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <div className="gradient-bg text-white px-4 py-8">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-2xl font-bold leading-tight mb-2">
            Find your creative co-pilot for epic projects
          </h1>
          <p className="text-white/90 text-sm leading-6 mb-6">
            Connect with talented creators and collaborate on amazing projects within the Base ecosystem.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setActiveTab('discover')}
              className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                activeTab === 'discover'
                  ? 'bg-white text-purple-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Browse Makers
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                activeTab === 'projects'
                  ? 'bg-white text-purple-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Browse Projects
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-xl mx-auto px-4 py-6">
        {activeTab === 'discover' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-text-primary">
                Discover Creators
              </h2>
              <button
                onClick={() => setShowCreateProject(true)}
                className="btn-primary text-sm"
              >
                Post Project
              </button>
            </div>

            <SkillFilter
              selectedSkills={selectedSkills}
              onSkillsChange={setSelectedSkills}
            />

            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <ProfileCard
                  key={user.farcasterId}
                  user={user}
                  onCollaborate={() => handleCollaborationRequest(user)}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-text-primary">
                Active Projects
              </h2>
              <button
                onClick={() => setShowCreateProject(true)}
                className="btn-primary text-sm"
              >
                Create Project
              </button>
            </div>

            <div className="space-y-4">
              {userProjects.map((project) => (
                <ProjectCard
                  key={project.projectId}
                  project={project}
                  onJoinProject={() => {
                    // Handle join project logic
                    console.log('Join project:', project.projectId);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showCreateProject && (
        <CreateProjectModal
          onClose={() => setShowCreateProject(false)}
          onSubmit={handleCreateProject}
        />
      )}

      {showCollabRequest && selectedUser && (
        <CollaborationRequestModal
          targetUser={selectedUser}
          onClose={() => {
            setShowCollabRequest(false);
            setSelectedUser(null);
          }}
          onSubmit={(message) => {
            console.log('Collaboration request sent:', message);
            setShowCollabRequest(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}

