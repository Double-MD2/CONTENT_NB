import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Criar client do servidor com service role
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  }
);

/**
 * API para inicializar trial de 3 dias no primeiro login
 *
 * REGRAS:
 * - Só cria trial se NÃO existir registro em user_subscriptions
 * - Trial: status='trialing', trial_end = now + 3 dias
 * - NÃO usa created_at do auth
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: 'userId é obrigatório' }, { status: 400 });
    }

    console.log('[INIT_TRIAL] Verificando trial para usuário:', userId);

    // Verificar se já existe registro
    const { data: existingSubscription, error: checkError } = await supabaseAdmin
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();

    // Se já existe registro, não fazer nada
    if (existingSubscription) {
      console.log('[INIT_TRIAL] Usuário já tem registro:', existingSubscription.status);
      return NextResponse.json({
        success: true,
        message: 'Registro já existe',
        subscription: existingSubscription,
      });
    }

    // Se não existe, criar trial de 3 dias
    const now = new Date();
    const trialEnd = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // +3 dias

    console.log('[INIT_TRIAL] Criando trial:', {
      userId,
      trialEnd: trialEnd.toISOString(),
    });

    const { data: newSubscription, error: insertError } = await supabaseAdmin
      .from('user_subscriptions')
      .insert({
        user_id: userId,
        status: 'trialing',
        trial_end: trialEnd.toISOString(),
        plan_name: 'Trial Gratuito',
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      console.error('[INIT_TRIAL] Erro ao criar trial:', insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    console.log('[INIT_TRIAL] Trial criado com sucesso:', newSubscription);

    return NextResponse.json({
      success: true,
      message: 'Trial criado com sucesso',
      subscription: newSubscription,
    });
  } catch (error: any) {
    console.error('[INIT_TRIAL] Erro inesperado:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
