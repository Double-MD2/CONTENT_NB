import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

/**
 * GET /api/auth/session
 * Retorna a sessão atual do usuário
 */
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Obter sessão do usuário
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error('[API /auth/session] Erro ao buscar sessão:', error);
      return NextResponse.json(
        { error: 'Erro ao buscar sessão', session: null },
        { status: 500 }
      );
    }

    if (!session) {
      return NextResponse.json(
        { session: null, user: null },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        session: {
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          expires_at: session.expires_at,
          expires_in: session.expires_in,
        },
        user: {
          id: session.user.id,
          email: session.user.email,
          user_metadata: session.user.user_metadata,
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API /auth/session] Erro inesperado:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', session: null },
      { status: 500 }
    );
  }
}
