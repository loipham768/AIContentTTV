import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import mongoose from 'mongoose'
import { dbConnect } from '@/lib/mongodb'
import Project from '@/models/Project'
import User from '@/models/User'
import EditorClientWrapper from '@/components/editor/EditorClientWrapper'
import { getUserPlanInfo } from '@/lib/planGate'
import { getTemplateById } from '@/lib/templates-db'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export const runtime = 'nodejs'

export default async function EditorPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string; template?: string }>
}) {
  const session = await auth()
  if (!session) redirect('/login')

  const { project: projectId, template: templateId } = await searchParams

  let initialData: object | null = null
  if (projectId && mongoose.Types.ObjectId.isValid(projectId)) {
    await dbConnect()
    const project = await Project.findOne({
      _id: projectId,
      userId: session.user.id,
    }).lean()
    if (project) initialData = project.blockData as object
  } else if (templateId) {
    const tpl = await getTemplateById(templateId)
    if (tpl) {
      const { preprocessTemplateForEditor } = await import('@/lib/serverCssIsolation')
      const processedHtml = await preprocessTemplateForEditor(tpl.html)
      initialData = { type: 'html', html: processedHtml }
    }
  }

  const planInfo = await getUserPlanInfo(session.user.id)

  const userDoc = await User.findById(session.user.id, { fullName: 1, avatarUrl: 1 }).lean() as any

  return (
    <EditorClientWrapper
      userEmail={session.user.email!}
      fullName={userDoc?.fullName ?? ''}
      avatarUrl={userDoc?.avatarUrl ?? ''}
      initialData={initialData}
      projectId={projectId && mongoose.Types.ObjectId.isValid(projectId) ? projectId : null}
      canExport={planInfo?.canExport ?? false}
      plan={planInfo?.plan ?? 'free'}
    />
  )
}
