import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  const { pathname, search } = req.nextUrl;

  // Rotas que podem ser acessadas sem autenticação
  const isPublicRoute =
    pathname === '/' || pathname === '/login' || pathname === '/registro';

  // Se não tiver token e tentar acessar rota privada, redireciona para login
  if (!token && !isPublicRoute) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirect', pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  // Se já estiver autenticado e tentar acessar login ou registro, redireciona para painel
  if (token && isPublicRoute && pathname !== '/') {
    const redirectUrl =
      req.nextUrl.searchParams.get('redirect') || '/formador/painel';
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Inclui todas as rotas, exceto as pastas especiais
    '/((?!_next|favicon.ico|images|api).*)',
  ],
};
