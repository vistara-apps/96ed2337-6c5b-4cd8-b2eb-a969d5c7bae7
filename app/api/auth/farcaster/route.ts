import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { generateToken } from '@/lib/auth'
import { z } from 'zod'

const farcasterAuthSchema = z.object({
  farcasterId: z.string(),
  signature: z.string(),
  message: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { farcasterId, signature, message } = farcasterAuthSchema.parse(body)

    // TODO: Implement proper Farcaster signature verification
    // For now, we'll accept any signature as valid for development
    // In production, you should verify the signature against Farcaster's API

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { farcasterId },
    })

    // If user doesn't exist, create a basic profile
    if (!user) {
      user = await prisma.user.create({
        data: {
          farcasterId,
          displayName: `User ${farcasterId}`,
          bio: '',
          skills: [],
          portfolioUrls: [],
        },
      })
    }

    // Generate JWT token
    const token = generateToken(farcasterId)

    return NextResponse.json({
      user,
      token,
      message: 'Authentication successful',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error during Farcaster authentication:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const farcasterId = searchParams.get('farcasterId')

    if (!farcasterId) {
      return NextResponse.json(
        { error: 'Farcaster ID required' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { farcasterId },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

