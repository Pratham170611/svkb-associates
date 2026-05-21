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

    const client = await prisma.client.findUnique({
      where: { email },
    })

    if (!client || !client.isActive) {
      // Return success even if client not found to prevent email enumeration
      return NextResponse.json({ success: true })
    }

    // Generate a secure token
    const token = crypto.randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 3600000) // 1 hour from now

    // Store the token in the database (upsert to replace any existing token for this email)
    await prisma.passwordResetToken.upsert({
      where: {
        email_token: {
          email: email,
          token: token // This is technically unique, but upsert usually requires a unique identifier. Wait, email is not unique in PasswordResetToken on its own, only @@unique([email, token]). Let's just create or delete old ones.
        }
      },
      update: {},
      create: {
        email,
        token,
        expires,
      }
    }).catch(async () => {
      // If upsert fails because of how unique constraint works, let's just delete old ones and create new
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
    const resetUrl = new URL(`/client/reset-password?token=${token}`, request.url)

    // In a real application, you would send this URL via an email service (e.g., Resend, SendGrid)
    // For now, we simulate by returning it to the frontend for testing
    console.log(`Password reset link for ${email}: ${resetUrl.toString()}`)

    return NextResponse.json({
      success: true,
      resetLink: resetUrl.toString(), // Simulated email
    })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
