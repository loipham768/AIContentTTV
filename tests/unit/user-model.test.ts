import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'

const TEST_EMAIL = 'user-model-test@test.vn'

beforeAll(async () => {
  await dbConnect()
})

afterAll(async () => {
  await mongoose.connection.close()
})

afterEach(async () => {
  await User.deleteOne({ email: TEST_EMAIL })
})

describe('Mongoose User model', () => {
  it('passwordHash field starts with $2b$', async () => {
    const hash = await bcrypt.hash('testpassword', 12)
    expect(hash).toMatch(/^\$2b\$12\$/)

    await User.create({ email: TEST_EMAIL, passwordHash: hash })
    const saved = await User.findOne({ email: TEST_EMAIL }).lean() as any
    expect(saved?.passwordHash).toMatch(/^\$2b\$12\$/)
  })

  it('model guard prevents OverwriteModelError', () => {
    // After dbConnect(), mongoose.models.User must be registered
    expect(mongoose.models.User).toBeDefined()
    expect(typeof mongoose.models.User).toBe('function')

    // Calling the guard expression a second time must not throw
    const guard = () => mongoose.models.User || mongoose.model('User', new mongoose.Schema({}))
    expect(guard).not.toThrow()
    expect(guard()).toBe(mongoose.models.User)
  })
})
