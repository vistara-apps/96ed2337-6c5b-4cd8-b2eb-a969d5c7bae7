import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const createCollaborationSchema = z.object({
  senderFarcasterId: z.string(),
  recipientFarcasterId: z.string(),
  projectId: z.string().optional(),
  message: z.string().min(1),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createCollaborationSchema.parse(body)

    // Check if users exist
    const [sender, recipient] = await Promise.all([
      prisma.user.findUnique({ where: { farcasterId: validatedData.senderFarcasterId } }),
      prisma.user.findUnique({ where: { farcasterId: validatedData.recipientFarcasterId } }),
    ])

    if (!sender || !recipient) {
      return NextResponse.json(
        { error: 'Sender or recipient not found' },
        { status: 404 }
      )
    }

    // Check if project exists (if provided)
    if (validatedData.projectId) {
      const project = await prisma.project.findUnique({
        where: { projectId: validatedData.projectId },
      })
      if (!project) {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        )
      }
    }

    const collaboration = await prisma.collaborationRequest.create({
      data: validatedData,
      include: {
        sender: true,
        recipient: true,
        project: true,
      },
    })

    return NextResponse.json(collaboration, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating collaboration request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const senderFarcasterId = searchParams.get('senderFarcasterId')
    const recipientFarcasterId = searchParams.get('recipientFarcasterId')
    const status = searchParams.get('status')

    let where: any = {}

    if (senderFarcasterId) {
      where.senderFarcasterId = senderFarcasterId
    }

    if (recipientFarcasterId) {
      where.recipientFarcasterId = recipientFarcasterId
    }

    if (status) {
      where.status = status
    }

    const collaborations = await prisma.collaborationRequest.findMany({
      where,
      include: {
        sender: true,
        recipient: true,
        project: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(collaborations)
  } catch (error) {
    console.error('Error fetching collaborations:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

