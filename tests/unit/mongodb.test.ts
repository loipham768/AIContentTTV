import { describe, it, expect, afterAll, afterEach } from 'vitest'
import mongoose from 'mongoose'
import { dbConnect } from '@/lib/mongodb'

afterAll(async () => {
  await mongoose.connection.close()
})

afterEach(() => {
  // Reset singleton cache between tests that manipulate env
  ;(global as any).mongoose = { conn: null, promise: null }
})

describe('dbConnect() MongoDB singleton', () => {
  it('dbConnect() returns same connection on repeated calls', async () => {
    const conn1 = await dbConnect()
    const conn2 = await dbConnect()
    expect(conn1).toBe(conn2)
  })

  it('dbConnect() throws if MONGODB_URI is undefined', async () => {
    const original = process.env.MONGODB_URI
    delete process.env.MONGODB_URI
    try {
      await expect(dbConnect()).rejects.toThrow('MONGODB_URI')
    } finally {
      process.env.MONGODB_URI = original
    }
  })
})
