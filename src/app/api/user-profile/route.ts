import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { createClient } from '@/utils/supabase/server';

// Runtime Node.js (necessário para usar o driver do Supabase)
export const runtime = 'nodejs';

// GET - Buscar perfil do usuário
export async function GET(req: NextRequest) {
  const correlationId = randomUUID();

  try {
    console.log(`[API:GET] [${correlationId}] Iniciando busca de perfil`);

    // 1. Autenticar via cookies SSR
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error(`[API:GET] [${correlationId}] ❌ Não autenticado:`, {
        error: authError?.message,
        code: authError?.code,
      });
      return NextResponse.json(
        {
          error: 'Não autenticado',
          status: 401,
          code: authError?.code || 'UNAUTHORIZED',
          message: authError?.message || 'Sessão inválida ou expirada',
          correlationId
        },
        { status: 401 }
      );
    }

    const userId = user.id;
    console.log(`[API:GET] [${correlationId}] ✅ Usuário autenticado: ${userId}`);

    // 2. Buscar perfil no Supabase (tabela public.profiles)
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Registro não encontrado - retornar perfil vazio
        console.log(`[API:GET] [${correlationId}] ℹ️ Perfil não encontrado - retornando vazio`);
        return NextResponse.json(
          { 
            name: null,
            religion: null,
            photoUrl: null,
            onboardingCompleted: false,
            quizCompleted: false,
            loginCount: 0,
            lastLoginAt: null,
          },
          { status: 200 }
        );
      }
      
      console.error(`[API:GET] [${correlationId}] ❌ Erro DB:`, {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      
      return NextResponse.json(
        { 
          error: 'Erro ao buscar perfil',
          status: 500,
          code: error.code,
          message: error.message,
          details: error.details,
          correlationId 
        },
        { status: 500 }
      );
    }

    console.log(`[API:GET] [${correlationId}] ✅ Perfil encontrado`);
    
    return NextResponse.json({
      name: data.name || null,
      religion: data.religion || null,
      photoUrl: data.photo_url || null,
      onboardingCompleted: data.onboarding_completed || false,
      quizCompleted: data.quiz_completed || false,
      loginCount: data.login_count || 0,
      lastLoginAt: data.last_login_at || null,
    });
  } catch (error: any) {
    console.error(`[API:GET] [${correlationId}] ❌ Erro inesperado:`, {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
      stack: error.stack,
    });
    
    return NextResponse.json(
      { 
        error: 'Erro ao buscar perfil',
        status: 500,
        code: error.code || 'INTERNAL_ERROR',
        message: error.message || 'Erro interno do servidor',
        correlationId 
      },
      { status: 500 }
    );
  }
}

// POST - Criar ou atualizar perfil do usuário
export async function POST(req: NextRequest) {
  const correlationId = randomUUID();

  try {
    console.log(`[API:POST] [${correlationId}] Iniciando salvamento de perfil`);

    // 1. Autenticar via cookies SSR
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error(`[API:POST] [${correlationId}] ❌ Não autenticado:`, {
        error: authError?.message,
        code: authError?.code,
      });
      return NextResponse.json(
        {
          error: 'Não autenticado',
          status: 401,
          code: authError?.code || 'UNAUTHORIZED',
          message: authError?.message || 'Sessão inválida ou expirada',
          correlationId
        },
        { status: 401 }
      );
    }

    const userId = user.id;
    console.log(`[API:POST] [${correlationId}] ✅ Usuário autenticado: ${userId}`);

    // 2. Validar payload
    const body = await req.json();
    const { name, religion, photoUrl, onboardingCompleted, quizCompleted } = body;

    console.log(`[API:POST] [${correlationId}] 📦 Payload recebido:`, {
      name: name || 'null',
      religion: religion || 'null',
      photoUrl: photoUrl ? 'presente' : 'null',
      onboardingCompleted: onboardingCompleted !== undefined ? onboardingCompleted : 'undefined',
      quizCompleted: quizCompleted !== undefined ? quizCompleted : 'undefined',
    });

    // Validação básica
    if (name && typeof name !== 'string') {
      console.error(`[API:POST] [${correlationId}] ❌ Nome inválido`);
      return NextResponse.json(
        { 
          error: 'Nome inválido',
          status: 400,
          code: 'INVALID_NAME',
          message: 'Nome deve ser uma string',
          correlationId 
        },
        { status: 400 }
      );
    }

    if (name && name.length > 100) {
      console.error(`[API:POST] [${correlationId}] ❌ Nome muito longo`);
      return NextResponse.json(
        { 
          error: 'Nome muito longo',
          status: 400,
          code: 'NAME_TOO_LONG',
          message: 'Nome deve ter no máximo 100 caracteres',
          correlationId 
        },
        { status: 400 }
      );
    }

    if (religion && typeof religion !== 'string') {
      console.error(`[API:POST] [${correlationId}] ❌ Religião inválida`);
      return NextResponse.json(
        { 
          error: 'Religião inválida',
          status: 400,
          code: 'INVALID_RELIGION',
          message: 'Religião deve ser uma string',
          correlationId 
        },
        { status: 400 }
      );
    }

    // 3. Upsert transacional no Supabase (tabela public.profiles)
    const upsertData: any = {
      id: userId, // Usar id em vez de user_id (public.profiles usa id como PK)
      updated_at: new Date().toISOString(),
    };

    // Adicionar campos apenas se fornecidos
    if (name !== undefined) upsertData.name = name;
    if (religion !== undefined) upsertData.religion = religion;
    if (photoUrl !== undefined) upsertData.photo_url = photoUrl;
    if (onboardingCompleted !== undefined) upsertData.onboarding_completed = onboardingCompleted;
    if (quizCompleted !== undefined) upsertData.quiz_completed = quizCompleted;

    console.log(`[API:POST] [${correlationId}] 💾 Executando upsert em public.profiles...`);

    const { data, error } = await supabase
      .from('profiles')
      .upsert(upsertData, {
        onConflict: 'id'
      })
      .select()
      .single();

    if (error) {
      console.error(`[API:POST] [${correlationId}] ❌ Erro DB:`, {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      
      // Tratamento específico de erros
      if (error.code === '23505') {
        return NextResponse.json(
          { 
            error: 'Perfil já existe',
            status: 409,
            code: error.code,
            message: error.message,
            correlationId 
          },
          { status: 409 }
        );
      }
      
      if (error.code === '23503') {
        return NextResponse.json(
          { 
            error: 'Usuário não encontrado',
            status: 404,
            code: error.code,
            message: error.message,
            correlationId 
          },
          { status: 404 }
        );
      }
      
      if (error.code === '42501') {
        return NextResponse.json(
          { 
            error: 'Permissão negada',
            status: 403,
            code: error.code,
            message: 'Você não tem permissão para modificar este perfil. Verifique as políticas RLS.',
            details: error.details,
            correlationId 
          },
          { status: 403 }
        );
      }
      
      return NextResponse.json(
        { 
          error: 'Erro ao salvar perfil',
          status: 500,
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
          correlationId 
        },
        { status: 500 }
      );
    }

    console.log(`[API:POST] [${correlationId}] ✅ Perfil salvo com sucesso em public.profiles!`, {
      userId,
      name: data.name,
      religion: data.religion,
      onboardingCompleted: data.onboarding_completed,
      quizCompleted: data.quiz_completed,
    });

    return NextResponse.json({
      success: true,
      data: {
        name: data.name,
        religion: data.religion,
        photoUrl: data.photo_url,
        onboardingCompleted: data.onboarding_completed,
        quizCompleted: data.quiz_completed,
        loginCount: data.login_count,
        lastLoginAt: data.last_login_at,
      },
      correlationId,
    });
  } catch (error: any) {
    console.error(`[API:POST] [${correlationId}] ❌ Erro inesperado:`, {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
      stack: error.stack,
    });
    
    return NextResponse.json(
      { 
        error: 'Erro ao salvar perfil',
        status: 500,
        code: error.code || 'INTERNAL_ERROR',
        message: error.message || 'Erro interno do servidor',
        correlationId 
      },
      { status: 500 }
    );
  }
}
