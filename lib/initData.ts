import { db } from './database';
import { mockUsers, mockProjects } from './mockData';

// Initialize the database with mock data
export async function initializeDatabase() {
  try {
    // Add users
    for (const user of mockUsers) {
      await db.createUser(user);
    }

    // Add projects
    for (const project of mockProjects) {
      await db.createProject(project);
    }

    console.log('Database initialized with mock data');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

