import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Se não está logado e está tentando acessar rota protegida
  if (!session && !req.nextUrl.pathname.startsWith('/login') && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Se está logado e está tentando acessar login
  if (session && req.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/home/:path*', '/login', '/gratitude/:path*', '/bible/:path*', '/leitura-do-dia/:path*', '/versiculo-do-dia/:path*', '/oracao-do-dia/:path*', '/conexao/:path*'],
};
