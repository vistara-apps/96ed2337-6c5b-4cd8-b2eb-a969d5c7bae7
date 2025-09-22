'use client';

import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { ProfileCard } from '../components/ProfileCard';
import { ProjectCard } from '../components/ProjectCard';
import { SkillFilter } from '../components/SkillFilter';
import { CreateProjectModal } from '../components/CreateProjectModal';
import { CollaborationRequestModal } from '../components/CollaborationRequestModal';
import { mockUsers, mockProjects } from '../lib/mockData';
import { User, Project } from '../lib/types';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'discover' | 'projects'>('discover');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCollabRequest, setShowCollabRequest] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);

  useEffect(() => {
    if (selectedSkills.length === 0) {
      setFilteredUsers(mockUsers);
    } else {
      const filtered = mockUsers.filter(user =>
        selectedSkills.some(skill => user.skills.includes(skill))
      );
      setFilteredUsers(filtered);
    }
  }, [selectedSkills]);

  const handleCollaborationRequest = (user: User) => {
    setSelectedUser(user);
    setShowCollabRequest(true);
  };

  const displayName = 'Creative';

  return (
    <div className="min-h-screen bg-background">
      <Header 
        displayName={displayName}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="max-w-xl mx-auto px-4 pb-20">
        {activeTab === 'discover' && (
          <div className="space-y-6">
            <div className="pt-6">
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                Find Your Creative Co-pilot
              </h1>
              <p className="text-text-secondary">
                Connect with talented creators for your next project
              </p>
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
            <div className="pt-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-text-primary mb-2">
                  Your Projects
                </h1>
                <p className="text-text-secondary">
                  Manage and showcase your creative work
                </p>
              </div>
              <button
                onClick={() => setShowCreateProject(true)}
                className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                New Project
              </button>
            </div>

            <div className="space-y-4">
              {mockProjects.map((project) => (
                <ProjectCard
                  key={project.projectId}
                  project={project}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {showCreateProject && (
        <CreateProjectModal
          onClose={() => setShowCreateProject(false)}
          onSubmit={(projectData) => {
            console.log('Creating project:', projectData);
            setShowCreateProject(false);
          }}
        />
      )}

      {showCollabRequest && selectedUser && (
        <CollaborationRequestModal
          user={selectedUser}
          onClose={() => {
            setShowCollabRequest(false);
            setSelectedUser(null);
          }}
          onSubmit={(requestData) => {
            console.log('Sending collaboration request:', requestData);
            setShowCollabRequest(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}
