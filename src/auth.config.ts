import Credentials from "next-auth/providers/credentials"
import { getUserFromDb } from "@/utils/db"
import { signInSchema } from "@/libs/zod"
import type { NextAuthConfig } from "next-auth"
 
type CredentialsType = {
    email: string;
    password: string;
  };

export default { providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          throw new Error("No credentials provided.");
        }

        const { email, password } = credentials as CredentialsType;

        credentials = await signInSchema.parseAsync(credentials)

        const user = await getUserFromDb(email, password);
 
        if (!user) {
          throw new Error("User not found.");
        }
        return user;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
  }, } satisfies NextAuthConfig