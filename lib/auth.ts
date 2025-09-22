import jwt from 'jsonwebtoken'
import { prisma } from './db'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export interface JWTPayload {
  farcasterId: string
  iat?: number
  exp?: number
}

export function generateToken(farcasterId: string): string {
  return jwt.sign(
    { farcasterId },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    return null
  }
}

export async function getCurrentUser(token: string) {
  const payload = verifyToken(token)
  if (!payload) return null

  return await prisma.user.findUnique({
    where: { farcasterId: payload.farcasterId },
  })
}

export async function requireAuth(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('No authorization token provided')
  }

  const token = authHeader.substring(7)
  const user = await getCurrentUser(token)

  if (!user) {
    throw new Error('Invalid or expired token')
  }

  return user
}

