import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const createUserSchema = z.object({
  farcasterId: z.string(),
  displayName: z.string().min(1),
  bio: z.string().optional(),
  profilePicUrl: z.string().url().optional(),
  skills: z.array(z.string()),
  portfolioUrls: z.array(z.string().url()),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createUserSchema.parse(body)

    const user = await prisma.user.create({
      data: validatedData,
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const farcasterId = searchParams.get('farcasterId')
    const skills = searchParams.get('skills')?.split(',')

    let where: any = {}

    if (farcasterId) {
      where.farcasterId = farcasterId
    }

    if (skills && skills.length > 0) {
      where.skills = {
        hasSome: skills,
      }
    }

    const users = await prisma.user.findMany({
      where,
      include: {
        ownedProjects: true,
        sentCollaborations: true,
        receivedCollaborations: true,
      },
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

