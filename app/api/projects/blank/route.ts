import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/mongodb'
import Project from '@/models/Project'

export const runtime = 'nodejs'

export async function POST() {
  await dbConnect()
  const project = await Project.create({
    name: 'Dự án mới',
    prompt: 'blank',
    blockData: {},
  })

  return NextResponse.json({ projectId: project._id.toString() }, { status: 201 })
}
