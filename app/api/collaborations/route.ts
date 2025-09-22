import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/database';
import type { CollaborationRequest } from '../../../lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const senderId = searchParams.get('senderId');
    const recipientId = searchParams.get('recipientId');

    let collaborations: CollaborationRequest[];

    if (senderId) {
      collaborations = await db.getCollaborationRequestsBySender(senderId);
    } else if (recipientId) {
      collaborations = await db.getCollaborationRequestsByRecipient(recipientId);
    } else {
      return NextResponse.json(
        { error: 'Must specify senderId or recipientId' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      collaborations,
    });
  } catch (error) {
    console.error('Collaborations API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestData: Omit<CollaborationRequest, 'requestId' | 'createdAt'> = await request.json();

    if (!requestData.senderFarcasterId || !requestData.recipientFarcasterId || !requestData.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const collaboration: CollaborationRequest = {
      ...requestData,
      requestId: `collab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const createdRequest = await db.createCollaborationRequest(collaboration);

    return NextResponse.json({
      success: true,
      collaboration: createdRequest,
    });
  } catch (error) {
    console.error('Create collaboration API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { requestId, status } = await request.json();

    if (!requestId || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!['accepted', 'declined'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const updatedRequest = await db.updateCollaborationRequest(requestId, { status });

    if (!updatedRequest) {
      return NextResponse.json(
        { error: 'Collaboration request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      collaboration: updatedRequest,
    });
  } catch (error) {
    console.error('Update collaboration API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

