import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const createProjectSchema = z.object({
  projectName: z.string().min(1),
  description: z.string().min(1),
  requiredSkills: z.array(z.string()),
  ownerFarcasterId: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createProjectSchema.parse(body)

    const project = await prisma.project.create({
      data: validatedData,
      include: {
        owner: true,
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const ownerFarcasterId = searchParams.get('ownerFarcasterId')
    const status = searchParams.get('status')
    const skills = searchParams.get('skills')?.split(',')
    const search = searchParams.get('search')

    let where: any = {}

    if (ownerFarcasterId) {
      where.ownerFarcasterId = ownerFarcasterId
    }

    if (status) {
      where.status = status
    }

    if (skills && skills.length > 0) {
      where.requiredSkills = {
        hasSome: skills,
      }
    }

    if (search) {
      where.OR = [
        { projectName: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const projects = await prisma.project.findMany({
      where,
      include: {
        owner: true,
        collaborations: {
          include: {
            sender: true,
            recipient: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

