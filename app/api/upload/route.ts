import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { auth } from '@/auth'

export const runtime = 'nodejs'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
const MAX_SIZE = 5 * 1024 * 1024 // 5 MB

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const file = formData.get('files') as File | null
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'Không có file nào được tải lên.' }, { status: 400 })
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: 'Chỉ hỗ trợ ảnh JPG, PNG, GIF, WebP, SVG.' },
      { status: 400 }
    )
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: 'Kích thước file tối đa là 5 MB.' },
      { status: 400 }
    )
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const safeName = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  try {
    const blob = await put(safeName, file, { access: 'public' })
    return NextResponse.json({
      data: [{ src: blob.url, name: file.name, type: 'image' }],
    })
  } catch (err) {
    console.error('[/api/upload] blob error:', err)
    return NextResponse.json({ error: 'Lỗi lưu file. Vui lòng thử lại.' }, { status: 500 })
  }
}
