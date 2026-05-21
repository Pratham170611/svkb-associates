import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      // Return success even if user not found to prevent email enumeration
      return NextResponse.json({ success: true })
    }

    // Generate a secure token
    const token = crypto.randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 3600000) // 1 hour from now

    // Store the token in the database
    await prisma.passwordResetToken.upsert({
      where: {
        email_token: {
          email: email,
          token: token
        }
      },
      update: {},
      create: {
        email,
        token,
        expires,
      }
    }).catch(async () => {
      // If upsert fails, let's delete old ones and create new
      await prisma.passwordResetToken.deleteMany({ where: { email } })
      await prisma.passwordResetToken.create({
        data: {
          email,
          token,
          expires,
        }
      })
    })

    // Create the reset link
    const resetUrl = new URL(`/admin/reset-password?token=${token}`, request.url)

    // In a real application, you would send this URL via an email service
    // For now, we simulate by returning it to the frontend for testing
    console.log(`Admin password reset link for ${email}: ${resetUrl.toString()}`)

    return NextResponse.json({
      success: true,
      resetLink: resetUrl.toString(), // Simulated email
    })
  } catch (error) {
    console.error('Admin forgot password error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
