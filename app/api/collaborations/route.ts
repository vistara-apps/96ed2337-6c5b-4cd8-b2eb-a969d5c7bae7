import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/database';
import type { CollaborationRequest } from '../../../lib/types';
import { generateId } from '../../../lib/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const recipientId = searchParams.get('recipientId');
    const senderId = searchParams.get('senderId');

    if (!recipientId && !senderId) {
      return NextResponse.json({ error: 'recipientId or senderId required' }, { status: 400 });
    }

    let requests: CollaborationRequest[] = [];

    if (recipientId) {
      requests = await db.getCollaborationRequestsForUser(recipientId);
    }

    // TODO: Add method to get sent requests if needed

    return NextResponse.json(requests);
  } catch (error) {
    console.error('Error fetching collaboration requests:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { senderFarcasterId, recipientFarcasterId, projectId, message } = body;

    if (!senderFarcasterId || !recipientFarcasterId || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if sender and recipient exist
    const sender = await db.getUser(senderFarcasterId);
    const recipient = await db.getUser(recipientFarcasterId);

    if (!sender || !recipient) {
      return NextResponse.json({ error: 'Sender or recipient not found' }, { status: 404 });
    }

    const collaborationRequest: CollaborationRequest = {
      requestId: `req_${generateId()}`,
      senderFarcasterId,
      recipientFarcasterId,
      projectId,
      message,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const createdRequest = await db.createCollaborationRequest(collaborationRequest);
    return NextResponse.json(createdRequest, { status: 201 });
  } catch (error) {
    console.error('Error creating collaboration request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

