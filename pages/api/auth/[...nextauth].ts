import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import prisma from "@/utils/prisma"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn() {
      // { user, account, profile, email, credentials }: any
      return true
    },
    async redirect({ baseUrl }: any) {
      //  url,
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
}
export default NextAuth(authOptions)
