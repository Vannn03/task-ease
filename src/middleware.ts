export { auth as middleware } from "@/auth"
import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig)
export default auth(async function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/signin', request.url))
})
 
export const config = {
  matcher: '/users/:path*',
}
