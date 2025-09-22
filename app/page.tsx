'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/minikit';
import { useAuthenticate } from '@coinbase/onchainkit/minikit';
import { Header } from '../components/Header';
import { ProfileCard } from '../components/ProfileCard';
import { ProjectCard } from '../components/ProjectCard';
import { CreateProjectModal } from '../components/CreateProjectModal';
import { CollaborationRequestModal } from '../components/CollaborationRequestModal';
import { PaymentModal } from '../components/PaymentModal';
import { AuthModal } from '../components/AuthModal';
import { ProfileSetupModal } from '../components/ProfileSetupModal';
import { SearchBar } from '../components/SearchBar';
import { NotificationCenter } from '../components/NotificationCenter';
import { AdvancedFilters } from '../components/AdvancedFilters';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useUsers } from '../hooks/useUsers';
import { useProjects } from '../hooks/useProjects';
import { getCurrentUser, setCurrentUser, isAuthenticated } from '../lib/auth';
import { COLLABORATION_REQUEST_FEE } from '../lib/payments';
import { analytics } from '../lib/analytics';
import type { User, Project } from '../lib/types';

export default function HomePage() {
  const { context } = useMiniKit();
  const { user: farcasterUser } = useAuthenticate();

  // State
  const [currentUser, setCurrentUserState] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'discover' | 'projects'>('discover');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'relevance'>('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCollabRequest, setShowCollabRequest] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [pendingCollaboration, setPendingCollaboration] = useState<{ user: User; message: string } | null>(null);

  // Hooks
  const { users, loading: usersLoading, fetchUsers } = useUsers();
  const { projects, loading: projectsLoading, createProject } = useProjects();

  // Initialize user authentication
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUserState(user);
      analytics.setUserId(user.farcasterId);
    } else if (!isAuthenticated()) {
      setShowAuth(true);
    }
  }, []);

  // Track page view
  useEffect(() => {
    analytics.trackPageView('home');
  }, []);

  // Filter and search users
  const filteredUsers = users.filter(user => {
    if (!searchQuery && selectedSkills.length === 0) return true;

    const matchesQuery = !searchQuery ||
      user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSkills = selectedSkills.length === 0 ||
      user.skills.some(skill => selectedSkills.includes(skill));

    return matchesQuery && matchesSkills;
  });

  // Filter and search projects
  const filteredProjects = projects.filter(project => {
    if (!searchQuery && selectedSkills.length === 0) return true;

    const matchesQuery = !searchQuery ||
      project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSkills = selectedSkills.length === 0 ||
      project.requiredSkills.some(skill => selectedSkills.includes(skill));

    return matchesQuery && matchesSkills && project.status === 'active';
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    analytics.trackSearch(query, { skills: selectedSkills, tab: activeTab });
  };

  const handleCollaborationRequest = (targetUser: User) => {
    if (!currentUser) {
      setShowAuth(true);
      return;
    }

    setSelectedUser(targetUser);
    setShowCollabRequest(true);
  };

  const handleSendCollaborationRequest = async (message: string) => {
    if (!selectedUser || !currentUser) return;

    setPendingCollaboration({ user: selectedUser, message });
    setShowCollabRequest(false);
    setShowPayment(true);
  };

  const handlePaymentComplete = async (txHash: string) => {
    if (!pendingCollaboration || !currentUser) return;

    try {
      // Create collaboration request
      const response = await fetch('/api/collaborations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderFarcasterId: currentUser.farcasterId,
          recipientFarcasterId: pendingCollaboration.user.farcasterId,
          message: pendingCollaboration.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send collaboration request');
      }

      analytics.trackCollaborationRequest(true, pendingCollaboration.user.farcasterId);
      setPendingCollaboration(null);
      setShowPayment(false);
    } catch (error) {
      console.error('Error sending collaboration request:', error);
      // Handle error (could show error message)
    }
  };

  const handleCreateProject = async (projectData: Omit<Project, 'projectId' | 'createdAt' | 'updatedAt'>) => {
    if (!currentUser) return;

    try {
      await createProject({
        ...projectData,
        ownerFarcasterId: currentUser.farcasterId,
      });

      analytics.trackProjectCreated('new', projectData.requiredSkills);
      setShowCreateProject(false);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleAuthenticated = (farcasterUserData: any) => {
    // Check if user profile exists
    const existingUser = users.find(u => u.farcasterId === farcasterUserData.fid.toString());
    if (existingUser) {
      setCurrentUserState(existingUser);
      setCurrentUser(existingUser);
      analytics.setUserId(existingUser.farcasterId);
    } else {
      // Show profile setup
      setShowProfileSetup(true);
    }
  };

  const handleProfileComplete = async (profileData: Omit<User, 'farcasterId'>) => {
    if (!farcasterUser) return;

    try {
      const userData = {
        farcasterId: farcasterUser.fid.toString(),
        ...profileData,
      };

      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create-profile',
          farcasterId: farcasterUser.fid.toString(),
          profileData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create profile');
      }

      setCurrentUserState(data.user);
      setCurrentUser(data.user);
      analytics.setUserId(data.user.farcasterId);
      setShowProfileSetup(false);
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  const handleNotificationAction = async (requestId: string, action: 'accept' | 'decline') => {
    try {
      const response = await fetch('/api/collaborations', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId,
          status: action === 'accept' ? 'accepted' : 'declined',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update collaboration request');
      }

      // Refresh data
      fetchUsers();
    } catch (error) {
      console.error('Error updating collaboration request:', error);
    }
  };

  if (usersLoading || projectsLoading) {
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
        {/* Search and Filters */}
        <div className="space-y-4 mb-6">
          <SearchBar onSearch={handleSearch} />

          <div className="flex items-center justify-between">
            <AdvancedFilters
              selectedSkills={selectedSkills}
              onSkillsChange={setSelectedSkills}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            {currentUser && (
              <NotificationCenter
                userId={currentUser.farcasterId}
                onNotificationAction={handleNotificationAction}
              />
            )}
          </div>
        </div>

        {activeTab === 'discover' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-text-primary">
                Discover Creators ({filteredUsers.length})
              </h2>
              <button
                onClick={() => currentUser ? setShowCreateProject(true) : setShowAuth(true)}
                className="btn-primary text-sm"
              >
                Post Project
              </button>
            </div>

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
                Active Projects ({filteredProjects.length})
              </h2>
              <button
                onClick={() => currentUser ? setShowCreateProject(true) : setShowAuth(true)}
                className="btn-primary text-sm"
              >
                Create Project
              </button>
            </div>

            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.projectId}
                  project={project}
                  onJoinProject={() => {
                    analytics.trackUserAction('join_project_attempt', { projectId: project.projectId });
                    console.log('Join project:', project.projectId);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showAuth && (
        <AuthModal
          isOpen={showAuth}
          onClose={() => setShowAuth(false)}
          onAuthenticated={handleAuthenticated}
        />
      )}

      {showProfileSetup && farcasterUser && (
        <ProfileSetupModal
          farcasterUser={farcasterUser}
          onClose={() => setShowProfileSetup(false)}
          onComplete={handleProfileComplete}
        />
      )}

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
          onSubmit={handleSendCollaborationRequest}
        />
      )}

      {showPayment && pendingCollaboration && (
        <PaymentModal
          isOpen={showPayment}
          onClose={() => {
            setShowPayment(false);
            setPendingCollaboration(null);
          }}
          amount={COLLABORATION_REQUEST_FEE}
          description={`Collaboration request to ${pendingCollaboration.user.displayName}`}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
}
