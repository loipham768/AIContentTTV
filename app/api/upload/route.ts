import { NextRequest, NextResponse } from 'next/server'
import { dbConnect } from '@/lib/mongodb'
import UserImage from '@/models/UserImage'
import path from 'path'
import fs from 'fs/promises'

export const runtime = 'nodejs'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
const MAX_SIZE = 5 * 1024 * 1024 // 5 MB

export async function POST(req: NextRequest) {
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

  let url: string

  console.log('[/api/upload] BLOB_READ_WRITE_TOKEN present:', !!process.env.BLOB_READ_WRITE_TOKEN)

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import('@vercel/blob')
    try {
      const blob = await put(`uploads/${safeName}`, file, { access: 'public' })
      url = blob.url
    } catch (err) {
      console.error('[/api/upload] blob error:', err)
      return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 })
    }
  } else {
    // Vercel: filesystem is read-only — BLOB_READ_WRITE_TOKEN must be set
    if (process.env.VERCEL) {
      console.error('[/api/upload] Running on Vercel but BLOB_READ_WRITE_TOKEN is not set')
      return NextResponse.json({ error: 'Storage not configured. Please contact support.' }, { status: 500 })
    }
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads')
      await fs.mkdir(uploadDir, { recursive: true })
      const buffer = Buffer.from(await file.arrayBuffer())
      await fs.writeFile(path.join(uploadDir, safeName), buffer)
      url = `/uploads/${safeName}`
    } catch (err) {
      console.error('[/api/upload] local error:', err)
      return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 })
    }
  }

  try {
    await dbConnect()
    await UserImage.create({ url, name: file.name, size: file.size })
  } catch (err) {
    console.error('[/api/upload] db save error:', err)
  }

  return NextResponse.json({
    data: [{ src: url, name: file.name, type: 'image' }],
  })
}
