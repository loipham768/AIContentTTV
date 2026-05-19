import { describe, it, expect } from 'vitest'

describe('POST /api/auth/register', () => {
  it.todo('returns 201 for valid email+password')
  it.todo("returns 409 with 'Email này đã được sử dụng' for duplicate email")
  it.todo('returns 400 for invalid email format')
  it.todo('returns 400 for password shorter than 8 characters')
})
