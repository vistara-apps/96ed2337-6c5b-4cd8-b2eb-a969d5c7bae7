import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const updateCollaborationSchema = z.object({
  status: z.enum(['pending', 'accepted', 'declined']),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ requestId: string }> }
) {
  try {
    const { requestId } = await params;
    const collaboration = await prisma.collaborationRequest.findUnique({
      where: { requestId },
      include: {
        sender: true,
        recipient: true,
        project: true,
      },
    })

    if (!collaboration) {
      return NextResponse.json(
        { error: 'Collaboration request not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(collaboration)
  } catch (error) {
    console.error('Error fetching collaboration:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ requestId: string }> }
) {
  try {
    const { requestId } = await params;
    const body = await request.json()
    const validatedData = updateCollaborationSchema.parse(body)

    const collaboration = await prisma.collaborationRequest.update({
      where: { requestId },
      data: validatedData,
      include: {
        sender: true,
        recipient: true,
        project: true,
      },
    })

    return NextResponse.json(collaboration)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating collaboration:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ requestId: string }> }
) {
  try {
    const { requestId } = await params;
    await prisma.collaborationRequest.delete({
      where: { requestId },
    })

    return NextResponse.json({ message: 'Collaboration request deleted successfully' })
  } catch (error) {
    console.error('Error deleting collaboration:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
