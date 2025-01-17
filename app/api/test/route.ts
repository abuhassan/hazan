import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    // Attempt to query the database
    const userCount = await prisma.user.count()
    
    return NextResponse.json({ 
      message: "Database connection successful", 
      userCount 
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json(
      { error: 'Failed to connect to database' },
      { status: 500 }
    )
  }
}