'use client';

import { useState, useEffect } from 'react';
import { ProfileCard } from '../components/ProfileCard';
import { ProjectCard } from '../components/ProjectCard';
import { CreateProjectModal } from '../components/CreateProjectModal';
import { CollaborationRequestModal } from '../components/CollaborationRequestModal';
import { SkillFilter } from '../components/SkillFilter';
import { Navigation } from '../components/Navigation';
import { AuthModal } from '../components/AuthModal';
import { OnboardingFlow } from '../components/OnboardingFlow';
import { User, Project, CollaborationRequest } from '../lib/types';
import { availableSkills } from '../lib/mockData';
import { Search, Plus, Users, Briefcase, LogIn } from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'discover' | 'projects'>('discover');
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCollabRequest, setShowCollabRequest] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Load data from API
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [usersRes, projectsRes] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/projects'),
      ]);

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData);
        setFilteredUsers(usersData);
      }

      if (projectsRes.ok) {
        const projectsData = await projectsRes.json();
        setProjects(projectsData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter users based on skills and search
  useEffect(() => {
    let filtered = users;

    if (selectedSkills.length > 0) {
      filtered = filtered.filter(user =>
        selectedSkills.some(skill => user.skills.includes(skill))
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredUsers(filtered);
  }, [users, selectedSkills, searchQuery]);

  // Check for existing authentication
  useEffect(() => {
    const token = localStorage.getItem('collabforge_token');
    const userStr = localStorage.getItem('collabforge_user');

    if (token && userStr) {
      setAuthToken(token);
      setCurrentUser(JSON.parse(userStr));
    }
  }, []);

  const handleAuthSuccess = (user: User, token: string) => {
    setCurrentUser(user);
    setAuthToken(token);
    localStorage.setItem('collabforge_token', token);
    localStorage.setItem('collabforge_user', JSON.stringify(user));

    // Check if user needs onboarding
    if (!user.displayName || user.displayName.startsWith('User ')) {
      setShowOnboarding(true);
    }
  };

  const handleOnboardingComplete = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('collabforge_user', JSON.stringify(updatedUser));
    setShowOnboarding(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthToken(null);
    localStorage.removeItem('collabforge_token');
    localStorage.removeItem('collabforge_user');
  };

  const handleCollaborationRequest = (targetUser: User) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    setSelectedUser(targetUser);
    setShowCollabRequest(true);
  };

  const handleCreateProject = async (projectData: Omit<Project, 'projectId' | 'createdAt' | 'updatedAt' | 'ownerFarcasterId'>) => {
    if (!currentUser || !authToken) return;

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          ...projectData,
          ownerFarcasterId: currentUser.farcasterId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      const newProject = await response.json();
      setProjects(prev => [newProject, ...prev]);
      setShowCreateProject(false);
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project. Please try again.');
    }
  };

  const handleSendCollabRequest = async (requestData: Omit<CollaborationRequest, 'requestId' | 'senderFarcasterId' | 'status' | 'createdAt' | 'updatedAt'>) => {
    if (!currentUser || !authToken || !selectedUser) return;

    try {
      const response = await fetch('/api/collaborations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          ...requestData,
          senderFarcasterId: currentUser.farcasterId,
          recipientFarcasterId: selectedUser.farcasterId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send collaboration request');
      }

      alert('Collaboration request sent successfully!');
      setShowCollabRequest(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error sending collaboration request:', error);
      alert('Failed to send collaboration request. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="card">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentUser={currentUser}
        onAuthClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
      />

      <main className="container mx-auto px-4 py-8">

        {activeTab === 'discover' && (
          <>
            {/* Search and Filters */}
            <div className="space-y-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search collaborators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
              
              <SkillFilter
                selectedSkills={selectedSkills}
                onSkillsChange={setSelectedSkills}
              />
            </div>

            {/* User Cards */}
            <div className="space-y-4">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="mx-auto text-gray-400 mb-4" size={48} />
                  <h3 className="text-lg font-medium text-text-primary mb-2">
                    No collaborators found
                  </h3>
                  <p className="text-text-secondary">
                    Try adjusting your search or filters
                  </p>
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <ProfileCard
                    key={user.farcasterId}
                    user={user}
                    onCollaborate={() => handleCollaborationRequest(user)}
                  />
                ))
              )}
            </div>
          </>
        )}

        {activeTab === 'projects' && (
          <>
            {/* Create Project Button */}
            {currentUser ? (
              <div className="mb-6">
                <button
                  onClick={() => setShowCreateProject(true)}
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <Plus size={20} />
                  <span>Create New Project</span>
                </button>
              </div>
            ) : (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
                <LogIn className="mx-auto text-gray-400 mb-2" size={24} />
                <p className="text-text-secondary">
                  Connect with Farcaster to create and manage projects
                </p>
              </div>
            )}

            {/* Project Cards */}
            <div className="space-y-4">
              {projects.length === 0 ? (
                <div className="text-center py-12">
                  <Briefcase className="mx-auto text-gray-400 mb-4" size={48} />
                  <h3 className="text-lg font-medium text-text-primary mb-2">
                    No projects yet
                  </h3>
                  <p className="text-text-secondary">
                    Create your first project to start collaborating
                  </p>
                </div>
              ) : (
                projects.map((project) => (
                  <ProjectCard
                    key={project.projectId}
                    project={project}
                  />
                ))
              )}
            </div>
          </>
        )}
      </main>

      {/* Modals */}
      {showCreateProject && currentUser && (
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
          onSubmit={handleSendCollabRequest}
        />
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {showOnboarding && currentUser && (
        <OnboardingFlow
          farcasterId={currentUser.farcasterId}
          onComplete={handleOnboardingComplete}
          onSkip={() => setShowOnboarding(false)}
        />
      )}
    </div>
  );
}
