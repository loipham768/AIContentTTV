import mongoose from 'mongoose'
import { dbConnect } from '@/lib/mongodb'
import Project from '@/models/Project'
import EditorClientWrapper from '@/components/editor/EditorClientWrapper'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export const runtime = 'nodejs'

export default async function EditorPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string }>
}) {
  const { project: projectId } = await searchParams

  let initialData: object | null = null
  if (projectId && mongoose.Types.ObjectId.isValid(projectId)) {
    await dbConnect()
    const project = await Project.findById(projectId).lean()
    if (project) initialData = project.blockData as object
  }

  return (
    <EditorClientWrapper
      userEmail=""
      fullName=""
      avatarUrl=""
      initialData={initialData}
      projectId={projectId && mongoose.Types.ObjectId.isValid(projectId) ? projectId : null}
      canExport={true}
      canPublish={true}
      plan="pro"
    />
  )
}
