import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Criar client do servidor com service role para API routes
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

// GET - Buscar dados do usuário
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId é obrigatório' }, { status: 400 });
    }

    // Buscar dados do usuário
    const { data: userData, error: userDataError } = await supabaseAdmin
      .from('user_data')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (userDataError && userDataError.code !== 'PGRST116') {
      throw userDataError;
    }

    return NextResponse.json({
      userData: userData || null,
    });
  } catch (error: any) {
    console.error('Erro ao buscar dados do usuário:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Criar ou atualizar dados do usuário
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, consecutiveDays, lastAccessDate, onboardingCompleted, trialStartedAt } = body;

    if (!userId) {
      return NextResponse.json({ error: 'userId é obrigatório' }, { status: 400 });
    }

    // Verificar se já existe dados do usuário
    const { data: existingData } = await supabaseAdmin
      .from('user_data')
      .select('*')
      .eq('user_id', userId)
      .single();

    let result;
    if (existingData) {
      // Atualizar dados existentes
      const updateData: any = {
        consecutive_days: consecutiveDays,
        last_access_date: lastAccessDate,
        onboarding_completed: onboardingCompleted,
        updated_at: new Date().toISOString()
      };

      // Adicionar trial_started_at apenas se fornecido
      if (trialStartedAt !== undefined) {
        updateData.trial_started_at = trialStartedAt;
      }

      const { data, error } = await supabaseAdmin
        .from('user_data')
        .update(updateData)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // Criar novos dados
      const insertData: any = {
        user_id: userId,
        consecutive_days: consecutiveDays || 0,
        last_access_date: lastAccessDate,
        onboarding_completed: onboardingCompleted || false
      };

      // Adicionar trial_started_at apenas se fornecido
      if (trialStartedAt !== undefined) {
        insertData.trial_started_at = trialStartedAt;
      }

      const { data, error } = await supabaseAdmin
        .from('user_data')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Erro ao salvar dados do usuário:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
