import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import Project from '@/models/Project'

export const runtime = 'nodejs'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await dbConnect()
  const projects = await Project.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .select('_id name prompt blockData createdAt')
    .lean()

  return NextResponse.json({ projects })
}

const createSchema = z.object({
  name: z.string().min(1).max(50),
  prompt: z.string().min(1).max(500),
  blockData: z.record(z.string(), z.unknown()),
})

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = createSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid request' },
      { status: 400 }
    )
  }

  await dbConnect()
  const project = await Project.create({
    userId: session.user.id,
    name: parsed.data.name,
    prompt: parsed.data.prompt,
    blockData: parsed.data.blockData,
  })

  return NextResponse.json({ project }, { status: 201 })
}
