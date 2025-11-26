import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const pathname = request.nextUrl.pathname;

  // Rotas públicas que NUNCA devem ser bloqueadas
  const publicRoutes = ['/login', '/auth', '/api', '/_next', '/favicon.ico'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Se é rota pública, permitir acesso imediato SEM verificar sessão
  if (isPublicRoute) {
    return response;
  }

  // Rotas protegidas que exigem autenticação
  const protectedRoutes = [
    '/home',
    '/gratitude',
    '/bible',
    '/leitura-do-dia',
    '/versiculo-do-dia',
    '/oracao-do-dia',
    '/conexao'
  ];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // Verificar sessão APENAS para rotas protegidas ou raiz
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Se usuário está logado e tenta acessar a raiz, redirecionar para /home
  if (session && pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // Se usuário NÃO está logado e tenta acessar rota protegida, redirecionar para /login
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Public assets (images, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
