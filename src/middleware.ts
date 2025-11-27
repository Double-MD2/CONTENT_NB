// MIDDLEWARE DESABILITADO
// O Supabase Auth client-side não seta cookies que o servidor consegue ler
// Proteção de rotas é feita client-side em cada página

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Apenas log para debug, sem bloquear nada
  console.log('[MIDDLEWARE] Passando:', req.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
