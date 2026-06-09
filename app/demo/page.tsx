import EditorClientWrapper from '@/components/editor/EditorClientWrapper'
import { TEMPLATES } from '@/lib/templates'
import { preprocessTemplateForEditor } from '@/lib/serverCssIsolation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thử editor miễn phí — AITaoPage',
  description: 'Trải nghiệm editor kéo thả AI ngay trong trình duyệt. Không cần đăng ký, không cần thẻ tín dụng.',
  robots: { index: true, follow: true },
}

export const runtime = 'nodejs'

export default async function DemoPage() {
  const tpl = TEMPLATES.find(t => t.category === 'landing') ?? TEMPLATES[0]
  const processedHtml = await preprocessTemplateForEditor(tpl.html)

  return (
    <EditorClientWrapper
      guestMode
      userEmail=""
      initialData={{ type: 'html', html: processedHtml }}
      projectId={null}
      canExport={false}
      plan="free"
    />
  )
}
