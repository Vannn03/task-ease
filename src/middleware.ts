import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { NextApiRequest, NextApiResponse } from 'next';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth(req, res)

  // If no token is found, redirect to /signin
  if (!session) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  // Allow the request to proceed if a token exists
  return NextResponse.next();
}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/users/:path*',
}
