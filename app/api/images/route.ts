import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import UserImage from '@/models/UserImage'

export const runtime = 'nodejs'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await dbConnect()
  const images = await UserImage.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .limit(200)
    .lean()

  return NextResponse.json({ images })
}
