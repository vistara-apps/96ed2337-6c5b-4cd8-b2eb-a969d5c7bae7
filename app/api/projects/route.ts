import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/database';
import type { Project, CreateProjectData } from '../../../lib/types';
import { generateId } from '../../../lib/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ownerId = searchParams.get('ownerId');
    const status = searchParams.get('status');

    let projects: Project[];

    if (ownerId) {
      projects = await db.getProjectsByOwner(ownerId);
    } else {
      projects = await db.getAllProjects();
    }

    // Filter by status if provided
    if (status) {
      projects = projects.filter(project => project.status === status);
    }

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateProjectData = await request.json();
    const { projectName, description, requiredSkills, status, ownerFarcasterId, budget, deadline } = body;

    if (!projectName || !description || !requiredSkills || !ownerFarcasterId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const project: Project = {
      projectId: `proj_${generateId()}`,
      projectName,
      description,
      requiredSkills,
      status: status || 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ownerFarcasterId,
      collaborators: [],
      budget,
      deadline,
    };

    const createdProject = await db.createProject(project);
    return NextResponse.json(createdProject, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

