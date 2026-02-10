import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();
    
    // Trocar o código por uma sessão
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error('Erro ao trocar código por sessão:', error);
      // Redirecionar para login com erro
      return NextResponse.redirect(`${origin}/login?error=auth_failed`);
    }
  }

  // Redirecionar para a página inicial após login bem-sucedido
  return NextResponse.redirect(`${origin}/`);
}
