import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import Project from '@/models/Project'
import { checkAndIncrementGeneration } from '@/lib/planGate'

export const runtime = 'nodejs'

export async function POST() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const gate = await checkAndIncrementGeneration(session.user.id)
  if (!gate.allowed) {
    return NextResponse.json(
      { error: gate.reason, code: gate.code, upgradeRequired: gate.upgradeRequired },
      { status: 403 },
    )
  }

  await dbConnect()
  const project = await Project.create({
    userId: session.user.id,
    name: 'Dự án mới',
    prompt: 'blank',
    blockData: {},
  })

  return NextResponse.json({ projectId: project._id.toString() }, { status: 201 })
}
