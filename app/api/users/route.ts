import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/database';
import type { User } from '../../../lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const skills = searchParams.get('skills')?.split(',') || [];
    const farcasterId = searchParams.get('farcasterId');

    if (farcasterId) {
      const user = await db.getUser(farcasterId);
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      return NextResponse.json(user);
    }

    let users: User[];
    if (skills.length > 0) {
      users = await db.searchUsersBySkills(skills);
    } else {
      users = await db.getAllUsers();
    }

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { farcasterId, displayName, bio, profilePicUrl, skills, portfolioUrls } = body;

    if (!farcasterId || !displayName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await db.getUser(farcasterId);
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const user: User = {
      farcasterId,
      displayName,
      bio: bio || '',
      profilePicUrl: profilePicUrl || '',
      skills: skills || [],
      portfolioUrls: portfolioUrls || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const createdUser = await db.createUser(user);
    return NextResponse.json(createdUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

