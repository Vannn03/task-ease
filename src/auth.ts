import NextAuth from "next-auth"
import authConfig from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    maxAge: 1 * 24 * 60 * 60,
  },
  ...authConfig,
})
