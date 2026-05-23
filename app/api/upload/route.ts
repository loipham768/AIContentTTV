import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
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
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')

  try {
    await mkdir(uploadsDir, { recursive: true })
    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(path.join(uploadsDir, safeName), buffer)
  } catch (err) {
    console.error('[/api/upload] write error:', err)
    return NextResponse.json({ error: 'Lỗi lưu file. Vui lòng thử lại.' }, { status: 500 })
  }

  // GrapesJS Asset Manager expects { data: [{ src, name, type }] }
  return NextResponse.json({
    data: [{ src: `/uploads/${safeName}`, name: file.name, type: 'image' }],
  })
}
