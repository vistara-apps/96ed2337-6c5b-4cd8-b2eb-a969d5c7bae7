'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/minikit';
import { useAuthenticate } from '@coinbase/onchainkit/minikit';
import { ProfileCard } from '../components/ProfileCard';
import { ProjectCard } from '../components/ProjectCard';
import { CreateProjectModal } from '../components/CreateProjectModal';
import { CollaborationRequestModal } from '../components/CollaborationRequestModal';
import { SkillFilter } from '../components/SkillFilter';
import { Navigation } from '../components/Navigation';
import { User, Project, CollaborationRequest } from '../lib/types';
import { mockUsers, mockProjects } from '../lib/mockData';
import { Search, Plus, Users, Briefcase } from 'lucide-react';

export default function HomePage() {
  const { context } = useMiniKit();
  const { user } = useAuthenticate();
  
  const [activeTab, setActiveTab] = useState<'discover' | 'projects'>('discover');
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCollabRequest, setShowCollabRequest] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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

  const handleCollaborationRequest = (targetUser: User) => {
    setSelectedUser(targetUser);
    setShowCollabRequest(true);
  };

  const handleCreateProject = (projectData: Omit<Project, 'projectId' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...projectData,
      projectId: `proj_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProjects(prev => [newProject, ...prev]);
    setShowCreateProject(false);
  };

  const handleSendCollabRequest = (requestData: Omit<CollaborationRequest, 'requestId'>) => {
    // In a real app, this would make an API call
    console.log('Sending collaboration request:', requestData);
    setShowCollabRequest(false);
    setSelectedUser(null);
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
    <div className="min-h-screen bg-background">
      <div className="container py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            CollabForge
          </h1>
          <p className="text-text-secondary">
            Find your creative co-pilot for epic projects
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'discover'
                ? 'bg-surface text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Users size={18} />
            <span>Discover</span>
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'projects'
                ? 'bg-surface text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Briefcase size={18} />
            <span>Projects</span>
          </button>
        </div>

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
            <div className="mb-6">
              <button
                onClick={() => setShowCreateProject(true)}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                <Plus size={20} />
                <span>Create New Project</span>
              </button>
            </div>

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
      </div>

      {/* Navigation */}
      <Navigation />

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
          onSubmit={handleSendCollabRequest}
        />
      )}
    </div>
  );
}
