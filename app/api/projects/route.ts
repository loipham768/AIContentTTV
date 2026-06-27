import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { dbConnect } from '@/lib/mongodb'
import Project from '@/models/Project'

export const runtime = 'nodejs'

export async function GET() {
  await dbConnect()
  const projects = await Project.find({})
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

  const raw = JSON.stringify(parsed.data.blockData)
  if (raw.length > 500_000) {
    return NextResponse.json({ error: 'blockData exceeds size limit' }, { status: 413 })
  }

  await dbConnect()
  const project = await Project.create({
    name: parsed.data.name,
    prompt: parsed.data.prompt,
    blockData: parsed.data.blockData,
  })

  return NextResponse.json({ project }, { status: 201 })
}
