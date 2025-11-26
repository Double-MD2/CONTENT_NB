import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          req.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          req.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // Refresh session se existir - isso é crítico para manter a sessão atualizada
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isLoginPage = req.nextUrl.pathname === '/login';
  const isProtectedRoute = 
    req.nextUrl.pathname.startsWith('/home') ||
    req.nextUrl.pathname.startsWith('/gratitude') ||
    req.nextUrl.pathname.startsWith('/bible') ||
    req.nextUrl.pathname.startsWith('/leitura-do-dia') ||
    req.nextUrl.pathname.startsWith('/versiculo-do-dia') ||
    req.nextUrl.pathname.startsWith('/oracao-do-dia') ||
    req.nextUrl.pathname.startsWith('/conexao');

  // Se não está logado e está tentando acessar rota protegida
  if (!session && isProtectedRoute) {
    const redirectUrl = new URL('/login', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Se está logado e está tentando acessar login, redirecionar para home
  if (session && isLoginPage) {
    const redirectUrl = new URL('/home', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Retornar a resposta com os cookies atualizados
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
