import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/database';
import type { Project } from '../../../lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const skills = searchParams.get('skills')?.split(',') || [];
    const ownerId = searchParams.get('ownerId');

    let projects: Project[];

    if (ownerId) {
      projects = await db.getProjectsByOwner(ownerId);
    } else {
      projects = await db.searchProjects(query, skills.length > 0 ? skills : undefined);
    }

    return NextResponse.json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error('Projects API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const projectData: Omit<Project, 'projectId' | 'createdAt' | 'updatedAt'> = await request.json();

    if (!projectData.projectName || !projectData.ownerFarcasterId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const project: Project = {
      ...projectData,
      projectId: `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const createdProject = await db.createProject(project);

    return NextResponse.json({
      success: true,
      project: createdProject,
    });
  } catch (error) {
    console.error('Create project API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

