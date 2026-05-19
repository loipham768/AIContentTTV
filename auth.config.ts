import type { NextAuthConfig } from 'next-auth'

/**
 * Edge-compatible auth config.
 * Does NOT import Mongoose or bcryptjs — safe for middleware (Edge Runtime).
 * The full auth.ts extends this with the Credentials provider.
 */
export const authConfig: NextAuthConfig = {
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isProtected =
        nextUrl.pathname.startsWith('/editor') ||
        nextUrl.pathname.startsWith('/api/')
      if (isProtected && !isLoggedIn) return false
      return true
    },
  },
}
