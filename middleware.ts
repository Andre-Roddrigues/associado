import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isValidSession } from './services/auth-services';

export async function middleware(req: NextRequest) {
  const session = await isValidSession();
  const { pathname } = req.nextUrl;

  // Se o usuário não estiver autenticado e tentar acessar rotas protegidas
  if ((pathname.startsWith('/formador')) && !session) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirect', pathname + req.nextUrl.search); // Salva a URL atual para redirecionamento
    console.log('Definindo redirect:', loginUrl.toString());
    return NextResponse.redirect(loginUrl);
  }

 // Se o usuário já estiver logado e tentar acessar a página de login 
  if (pathname === '/login' && session) {
    const redirectUrl = req.nextUrl.searchParams.get('redirect') || '/formador/painel'; // Pega a URL de redirecionamento, se existir
    console.log('Redirecionando para:', redirectUrl.toString());
    return NextResponse.redirect(new URL(redirectUrl, req.url)); // Redireciona para a URL anterior
  }
  
  
  // Continua normalmente
  return NextResponse.next();
}

// Configuração do middleware
export const config = {
  matcher: [ '/formador/:path*', '/login'],
};
