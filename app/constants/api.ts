/* eslint-disable @typescript-eslint/no-explicit-any */
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
// import FacebookProvider from 'next-auth/providers/facebook'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/app/utils/prisma'
import { AuthOptions } from 'next-auth'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID || '',
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    // }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn() {
      // { user, account, profile, email, credentials }: any
      return true
    },
    async redirect({ url, baseUrl }: any) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async session({ session, user }: any) {
      // , token
      const newSession = {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      }
      return newSession
    },
    async jwt({ token }: any) {
      // , user, account, profile, isNewUser
      return token
    },
  },
} as AuthOptions
