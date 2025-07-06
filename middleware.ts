import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  const { pathname, search } = req.nextUrl;

  const isPublicRoute = pathname === '/login' || pathname === '/registro';

  if (!token && !isPublicRoute) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirect', pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  if (token && isPublicRoute) {
    const redirectUrl = req.nextUrl.searchParams.get('redirect') || '/formador/painel';
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|images|api).*)'],
};
