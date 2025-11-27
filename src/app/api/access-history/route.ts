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

// POST - Registrar acesso do dia
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, accessDate, accessed } = body;

    if (!userId || !accessDate) {
      return NextResponse.json({ error: 'userId e accessDate são obrigatórios' }, { status: 400 });
    }

    // Verificar se já existe registro para esta data
    const { data: existingRecord } = await supabaseAdmin
      .from('access_history')
      .select('*')
      .eq('user_id', userId)
      .eq('access_date', accessDate)
      .single();

    let result;
    if (existingRecord) {
      // Atualizar registro existente
      const { data, error } = await supabaseAdmin
        .from('access_history')
        .update({ accessed: accessed !== undefined ? accessed : true })
        .eq('user_id', userId)
        .eq('access_date', accessDate)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // Criar novo registro
      const { data, error } = await supabaseAdmin
        .from('access_history')
        .insert({
          user_id: userId,
          access_date: accessDate,
          accessed: accessed !== undefined ? accessed : true
        })
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Erro ao registrar acesso:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET - Buscar histórico de acesso
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId é obrigatório' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('access_history')
      .select('*')
      .eq('user_id', userId)
      .order('access_date', { ascending: true });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error('Erro ao buscar histórico:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
