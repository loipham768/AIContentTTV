import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import mongoose from 'mongoose'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import { POST } from '@/app/api/auth/register/route'

const TEST_EMAIL = 'register-test@test.vn'

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

beforeAll(async () => {
  await dbConnect()
})

afterAll(async () => {
  await mongoose.connection.close()
})

afterEach(async () => {
  await User.deleteOne({ email: TEST_EMAIL })
})

describe('POST /api/auth/register', () => {
  it('returns 201 for valid email+password', async () => {
    const req = makeRequest({ email: TEST_EMAIL, password: 'password123' })
    const res = await POST(req as any)
    expect(res.status).toBe(201)
    const data = await res.json()
    expect(data.ok).toBe(true)
  })

  it("returns 409 with 'Email này đã được sử dụng' for duplicate email", async () => {
    const req1 = makeRequest({ email: TEST_EMAIL, password: 'password123' })
    await POST(req1 as any)

    const req2 = makeRequest({ email: TEST_EMAIL, password: 'password123' })
    const res = await POST(req2 as any)
    expect(res.status).toBe(409)
    const data = await res.json()
    expect(data.error).toBe('Email này đã được sử dụng')
  })

  it('returns 400 for invalid email format', async () => {
    const req = makeRequest({ email: 'notanemail', password: 'password123' })
    const res = await POST(req as any)
    expect(res.status).toBe(400)
  })

  it('returns 400 for password shorter than 8 characters', async () => {
    const req = makeRequest({ email: TEST_EMAIL, password: 'short' })
    const res = await POST(req as any)
    expect(res.status).toBe(400)
  })
})
