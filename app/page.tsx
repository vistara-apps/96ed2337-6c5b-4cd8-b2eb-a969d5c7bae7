'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/minikit';
import { useAuthenticate } from '@coinbase/onchainkit/minikit';
import { Header } from '../components/Header';
import { ProfileCard } from '../components/ProfileCard';
import { ProjectCard } from '../components/ProjectCard';
import { CreateProjectModal } from '../components/CreateProjectModal';
import { CollaborationRequestModal } from '../components/CollaborationRequestModal';
import { SkillFilter } from '../components/SkillFilter';
import { LoadingSpinner } from '../components/LoadingSpinner';
import type { User, Project, CreateProjectData } from '../lib/types';

export default function HomePage() {
  const { context } = useMiniKit();
  const { user } = useAuthenticate();
  const [activeTab, setActiveTab] = useState<'discover' | 'projects'>('discover');
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCollabRequest, setShowCollabRequest] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const usersResponse = await fetch('/api/users');
        const users = await usersResponse.json();
        setAllUsers(users);
        setFilteredUsers(users);

        // Fetch projects
        const projectsResponse = await fetch('/api/projects');
        const projects = await projectsResponse.json();
        setUserProjects(projects);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedSkills.length === 0) {
      setFilteredUsers(allUsers);
    } else {
      const filtered = allUsers.filter(user =>
        user.skills.some(skill => selectedSkills.includes(skill))
      );
      setFilteredUsers(filtered);
    }
  }, [selectedSkills, allUsers]);

  const handleCollaborationRequest = (targetUser: User) => {
    setSelectedUser(targetUser);
    setShowCollabRequest(true);
  };

  const handleCreateProject = async (projectData: CreateProjectData) => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        const newProject = await response.json();
        setUserProjects(prev => [newProject, ...prev]);
        setShowCreateProject(false);
      } else {
        console.error('Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  if (isLoading) {
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
          onSubmit={async (message, projectId) => {
            try {
              // Create collaboration request
              const collabResponse = await fetch('/api/collaborations', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  senderFarcasterId: context?.user?.fid?.toString() || 'anonymous',
                  recipientFarcasterId: selectedUser.farcasterId,
                  message,
                  projectId,
                }),
              });

              if (collabResponse.ok) {
                const collabRequest = await collabResponse.json();

                // Process payment for collaboration request
                const paymentResponse = await fetch('/api/payments', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    type: 'collaboration_request',
                    referenceId: collabRequest.requestId,
                    fromAddress: '0x' + Math.random().toString(16).substr(2, 40), // Mock address
                  }),
                });

                if (paymentResponse.ok) {
                  console.log('Collaboration request sent successfully with payment');
                }
              }

              setShowCollabRequest(false);
              setSelectedUser(null);
            } catch (error) {
              console.error('Error sending collaboration request:', error);
            }
          }}
        />
      )}
    </div>
  );
}
