import { describe, it, expect } from 'vitest'
import { jwtCallback, sessionCallback } from '@/lib/auth/helpers'

describe('auth() session management', () => {
  it('jwt callback adds token.id when user is present', () => {
    const token = {} as any
    const result = jwtCallback({ token, user: { id: 'abc123' } })
    expect(result.id).toBe('abc123')
  })

  it('jwt callback leaves token unchanged when no user', () => {
    const token = { sub: 'existing' } as any
    const result = jwtCallback({ token })
    expect(result.sub).toBe('existing')
    expect(result.id).toBeUndefined()
  })

  it('auth() returns session after login — session callback wires user.id from token', () => {
    const session = { user: { name: null, email: null, image: null }, expires: '' } as any
    const token = { id: 'user-id-123' } as any
    const result = sessionCallback({ session, token })
    // This is what auth() delivers to Server Components after login
    expect(result.user.id).toBe('user-id-123')
  })
})
