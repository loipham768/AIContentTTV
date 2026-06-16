import { dbConnect } from '@/lib/mongodb'
import PublishedPage from '@/models/PublishedPage'

export const runtime = 'nodejs'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  await dbConnect()

  const page = await PublishedPage.findOne(
    { slug, isActive: true },
    { htmlSnapshot: 1 }
  ).lean()

  if (!page) {
    return new Response(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Không tìm thấy</title></head><body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#f8fafc"><div style="text-align:center"><h1 style="color:#1e293b;font-size:2rem;margin-bottom:.5rem">404</h1><p style="color:#64748b">Trang này không tồn tại hoặc đã bị gỡ xuất bản.</p></div></body></html>`,
      { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    )
  }

  return new Response((page as any).htmlSnapshot, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
      'X-Frame-Options': 'SAMEORIGIN',
    },
  })
}
