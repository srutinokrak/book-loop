
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
   const session = await auth.api.getSession({
     headers: request.headers,
   })
     if (!session?.user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
      "callbackUrl",
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
    );

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: ['/books/add','/my-books','/books/:path','/my-borrows'],
}