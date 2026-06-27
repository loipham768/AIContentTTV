import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/mongodb'
import UserImage from '@/models/UserImage'

export const runtime = 'nodejs'

export async function GET() {
  await dbConnect()
  const images = await UserImage.find({})
    .sort({ createdAt: -1 })
    .limit(200)
    .lean()

  return NextResponse.json({ images })
}
