import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/database';
import type { User } from '../../../lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const skills = searchParams.get('skills')?.split(',') || [];

    const users = await db.searchUsers(query, skills.length > 0 ? skills : undefined);

    return NextResponse.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error('Users API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userData: User = await request.json();

    if (!userData.farcasterId || !userData.displayName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const existingUser = await db.getUser(userData.farcasterId);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    const user = await db.createUser(userData);

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Create user API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

