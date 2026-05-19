import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import { authorize } from '@/lib/auth/helpers'

const TEST_EMAIL = 'signin-test@test.vn'
const TEST_PASSWORD = 'password123'

beforeAll(async () => {
  await dbConnect()
})

afterAll(async () => {
  await mongoose.connection.close()
})

afterEach(async () => {
  await User.deleteOne({ email: TEST_EMAIL })
})

describe('signIn with Credentials provider', () => {
  it('returns session on correct credentials', async () => {
    const hash = await bcrypt.hash(TEST_PASSWORD, 12)
    await User.create({ email: TEST_EMAIL, passwordHash: hash })

    const result = await authorize({ email: TEST_EMAIL, password: TEST_PASSWORD })
    expect(result).not.toBeNull()
    expect(result).toMatchObject({ id: expect.any(String), email: TEST_EMAIL })
  })

  it('returns CredentialsSignin error on wrong password', async () => {
    const hash = await bcrypt.hash(TEST_PASSWORD, 12)
    await User.create({ email: TEST_EMAIL, passwordHash: hash })

    const result = await authorize({ email: TEST_EMAIL, password: 'wrongpassword' })
    expect(result).toBeNull()
  })

  it('returns null for non-existent email', async () => {
    const result = await authorize({ email: 'noone@example.com', password: 'pass1234' })
    expect(result).toBeNull()
  })
})
