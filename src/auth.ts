import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUserFromDb } from "@/utils/db"
import { signInSchema } from "@/libs/zod"

type CredentialsType = {
  email: string;
  password: string;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
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
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
    signOut: '/signout',
  },
})
