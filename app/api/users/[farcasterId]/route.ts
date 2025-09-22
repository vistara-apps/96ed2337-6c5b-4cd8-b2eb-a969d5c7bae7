import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const updateUserSchema = z.object({
  displayName: z.string().min(1).optional(),
  bio: z.string().optional(),
  profilePicUrl: z.string().url().optional(),
  skills: z.array(z.string()).optional(),
  portfolioUrls: z.array(z.string().url()).optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ farcasterId: string }> }
) {
  try {
    const { farcasterId } = await params;
    const user = await prisma.user.findUnique({
      where: { farcasterId },
      include: {
        ownedProjects: true,
        sentCollaborations: {
          include: {
            recipient: true,
            project: true,
          },
        },
        receivedCollaborations: {
          include: {
            sender: true,
            project: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ farcasterId: string }> }
) {
  try {
    const { farcasterId } = await params;
    const body = await request.json()
    const validatedData = updateUserSchema.parse(body)

    const user = await prisma.user.update({
      where: { farcasterId },
      data: validatedData,
    })

    return NextResponse.json(user)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ farcasterId: string }> }
) {
  try {
    const { farcasterId } = await params;
    await prisma.user.delete({
      where: { farcasterId },
    })

    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
