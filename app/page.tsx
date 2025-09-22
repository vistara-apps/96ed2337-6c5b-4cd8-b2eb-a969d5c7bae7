'use client';

import { useState, useEffect } from 'react';
// import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { ProfileCard } from '../components/ProfileCard';
import { ProjectCard } from '../components/ProjectCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { SkillTag } from '../components/SkillTag';
import { Search, Plus, Filter, Users, Briefcase } from 'lucide-react';
import { User, Project } from '../lib/types';

export default function HomePage() {
  // const { context } = useMiniKit();
  const [activeTab, setActiveTab] = useState<'discover' | 'projects'>('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockUsers: User[] = [
      {
        farcasterId: '1',
        displayName: 'Georgina Dwarf',
        bio: 'UX/UI Designer passionate about Web3 experiences',
        profilePicUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        skills: ['UI Design', 'UX Research', 'Figma', 'Prototyping'],
        portfolioUrls: ['https://dribbble.com/georgina', 'https://behance.net/georgina']
      },
      {
        farcasterId: '2',
        displayName: 'John Doyle',
        bio: 'Frontend developer & blockchain enthusiast',
        profilePicUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        skills: ['React', 'TypeScript', 'Smart Contracts', 'Web3'],
        portfolioUrls: ['https://github.com/johndoyle', 'https://johndoyle.dev']
      },
      {
        farcasterId: '3',
        displayName: 'Lila Jin',
        bio: 'Product designer with 5+ years in fintech',
        profilePicUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        skills: ['Product Design', 'User Research', 'Design Systems', 'Fintech'],
        portfolioUrls: ['https://lilajin.com', 'https://medium.com/@lilajin']
      }
    ];

    const mockProjects: Project[] = [
      {
        projectId: '1',
        projectName: 'DeFi Dashboard',
        description: 'Building a comprehensive DeFi portfolio tracker with real-time analytics',
        requiredSkills: ['React', 'Web3', 'UI Design'],
        status: 'active',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-20'),
        ownerFarcasterId: '1'
      },
      {
        projectId: '2',
        projectName: 'NFT Marketplace',
        description: 'Creating a user-friendly NFT marketplace for digital artists',
        requiredSkills: ['Smart Contracts', 'Frontend', 'Design'],
        status: 'active',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-18'),
        ownerFarcasterId: '2'
      }
    ];

    setTimeout(() => {
      setUsers(mockUsers);
      setProjects(mockProjects);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkills = selectedSkills.length === 0 || 
                         selectedSkills.some(skill => user.skills.includes(skill));
    return matchesSearch && matchesSkills;
  });

  const allSkills = Array.from(new Set(users.flatMap(user => user.skills)));

  const toggleSkillFilter = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface shadow-card sticky top-0 z-50">
        <div className="max-w-xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">CollabForge</h1>
              <p className="text-sm text-text-secondary">Find your creative co-pilot</p>
            </div>
            {/* Profile picture will be shown here when MiniKit is available */}
            {/* {context?.user?.pfpUrl && (
              <img
                src={context.user.pfpUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            )} */}
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-background rounded-lg p-1">
            <button
              onClick={() => setActiveTab('discover')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeTab === 'discover'
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Users size={16} />
              <span>Discover</span>
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeTab === 'projects'
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Briefcase size={16} />
              <span>Projects</span>
            </button>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="max-w-xl mx-auto px-4 py-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
          <input
            type="text"
            placeholder={activeTab === 'discover' ? 'Search collaborators...' : 'Search projects...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-surface border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Skill Filters */}
        {activeTab === 'discover' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-primary">Filter by skills</span>
              <Filter size={16} className="text-text-secondary" />
            </div>
            <div className="flex flex-wrap gap-2">
              {allSkills.slice(0, 8).map((skill) => (
                <SkillTag
                  key={skill}
                  skill={skill}
                  variant={selectedSkills.includes(skill) ? 'primary' : 'secondary'}
                  onClick={() => toggleSkillFilter(skill)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <main className="max-w-xl mx-auto px-4 pb-20">
        {activeTab === 'discover' ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-text-primary">
                {filteredUsers.length} Collaborators
              </h2>
              <PrimaryButton variant="default" size="sm">
                <Plus size={16} />
                Create Profile
              </PrimaryButton>
            </div>
            
            {filteredUsers.map((user) => (
              <ProfileCard key={user.farcasterId} user={user} variant="default" />
            ))}
            
            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Users size={48} className="mx-auto text-text-secondary mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">No collaborators found</h3>
                <p className="text-text-secondary">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-text-primary">
                Active Projects
              </h2>
              <PrimaryButton variant="default" size="sm">
                <Plus size={16} />
                New Project
              </PrimaryButton>
            </div>
            
            {projects.map((project) => (
              <ProjectCard key={project.projectId} project={project} variant="active" />
            ))}
            
            {projects.length === 0 && (
              <div className="text-center py-12">
                <Briefcase size={48} className="mx-auto text-text-secondary mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">No projects yet</h3>
                <p className="text-text-secondary">Create your first project to get started</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-200">
        <div className="max-w-xl mx-auto px-4 py-2">
          <div className="flex justify-around">
            <button className="flex flex-col items-center py-2 px-3 text-primary">
              <Users size={20} />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button className="flex flex-col items-center py-2 px-3 text-text-secondary">
              <Search size={20} />
              <span className="text-xs mt-1">Search</span>
            </button>
            <button className="flex flex-col items-center py-2 px-3 text-text-secondary">
              <Briefcase size={20} />
              <span className="text-xs mt-1">Projects</span>
            </button>
            <button className="flex flex-col items-center py-2 px-3 text-text-secondary relative">
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white">2</span>
              </div>
              <Users size={20} />
              <span className="text-xs mt-1">Requests</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
