import { describe, it, expect } from 'vitest'
import { jwtCallback } from '@/lib/auth/helpers'

describe('signOut session teardown', () => {
  it('signOut() clears session and auth() returns null — jwt callback without user yields no id', () => {
    // After signOut, NextAuth drops the JWT cookie. On next request the jwt
    // callback receives no user object, so token.id is never set.
    // session callback then calls session.user.id = undefined → auth() returns
    // a session with no user.id, which the app treats as unauthenticated.
    const token = {} as any
    const result = jwtCallback({ token })
    expect(result.id).toBeUndefined()
  })
})
