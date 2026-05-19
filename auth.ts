import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from '@/auth.config'
import { authorize, jwtCallback, sessionCallback } from '@/lib/auth/helpers'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({ authorize }),
  ],
  callbacks: {
    async jwt(params) {
      return jwtCallback(params as any)
    },
    async session(params) {
      return sessionCallback(params as any)
    },
  },
})
