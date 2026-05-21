import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import * as bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const client = await prisma.client.findUnique({
      where: { email },
      include: {
        services: {
          include: {
            service: true
          }
        }
      }
    })

    if (!client || !client.isActive) {
      return NextResponse.json(
        { error: 'Invalid credentials or account inactive' },
        { status: 401 }
      )
    }

    const isValid = await bcrypt.compare(password, client.password)

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const { password: _, ...clientWithoutPassword } = client

    return NextResponse.json({
      success: true,
      client: clientWithoutPassword,
    })
  } catch (error) {
    console.error('Client login error:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}
