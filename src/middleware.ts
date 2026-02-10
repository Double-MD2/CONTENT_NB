import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  console.log('[MIDDLEWARE] 🚦', pathname, '| URL:', req.url);

  // Detectar ambiente preview
  const isPreview = req.headers.get('host')?.endsWith('.lasy.app') || false;

  // CORREÇÃO: Criar response com headers do request
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  // DEBUG HEADER: Confirmar que este middleware está ativo
  response.headers.set('x-mw', isPreview ? 'v5-preview-grace' : 'v5-production');

  // Criar cliente Supabase SSR com configurações otimizadas para preview
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // CORREÇÃO: NÃO mutar req.cookies (não persiste)
          // Apenas configurar no response
          cookiesToSet.forEach(({ name, value, options }) => {
            // PREVIEW: Garantir opções corretas para cookies HTTPS
            const cookieOptions = isPreview ? {
              ...options,
              sameSite: 'lax' as const,
              secure: true,
              path: '/',
            } : options;

            response.cookies.set(name, value, cookieOptions);
          });
        },
      },
    }
  );

  // Verificar autenticação no servidor (via cookies)
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  // Rotas públicas (não requerem autenticação)
  const publicRoutes = ['/login', '/signup', '/reset-password'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  console.log('[MIDDLEWARE]', {
    pathname,
    hasUser: !!user,
    userId: user?.id?.slice(0, 8),
    email: user?.email,
    isPublicRoute,
    authError: authError?.message,
    isPreview,
  });

  // CORREÇÃO: Se está na rota raiz (/), deixar o componente client-side decidir
  if (pathname === '/') {
    console.log('[MIDDLEWARE] 🏠 Rota raiz - deixando client-side decidir');
    return response;
  }

  // Se está tentando acessar rota protegida sem autenticação
  if (!user && !isPublicRoute) {
    console.log('[MIDDLEWARE] ❌ Bloqueando acesso (sem auth):', pathname, '-> /login');
    const redirectUrl = new URL('/login', req.url);
    const redirectResponse = NextResponse.redirect(redirectUrl);
    redirectResponse.headers.set('x-mw', 'v4-no-loop');
    return redirectResponse;
  }

  // CORREÇÃO: Se está autenticado e tentando acessar /login, redirecionar para /dashboard
  // MAS não redirecionar se já está em rota autenticada (evita loop)
  if (user && pathname === '/login') {
    console.log('[MIDDLEWARE] ✅ Autenticado em /login -> /dashboard');
    const redirectUrl = new URL('/dashboard', req.url);
    const redirectResponse = NextResponse.redirect(redirectUrl);
    redirectResponse.headers.set('x-mw', 'v4-no-loop');
    return redirectResponse;
  }

  // Retornar response com cookies configurados
  console.log('[MIDDLEWARE] ✅ Permitindo acesso:', pathname);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
