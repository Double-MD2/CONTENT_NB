import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

// Runtime Node.js (necessário para usar o driver do Supabase)
export const runtime = 'nodejs';

// Validar variáveis de ambiente na inicialização
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL não configurada');
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY não configurada');
}

// Cliente Supabase com service role (para operações admin)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// POST - Incrementar loginCount e atualizar lastLoginAt
export async function POST(req: NextRequest) {
  const correlationId = randomUUID();
  
  try {
    console.log(`[LOGIN-CALLBACK] [${correlationId}] Iniciando callback de login`);
    
    // 1. Verificar autenticação
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      console.error(`[LOGIN-CALLBACK] [${correlationId}] ❌ Sem header Authorization`);
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

    if (authError || !user) {
      console.error(`[LOGIN-CALLBACK] [${correlationId}] ❌ Token inválido:`, authError);
      return NextResponse.json(
        { error: 'Sessão inválida ou expirada' },
        { status: 401 }
      );
    }

    const userId = user.id;
    console.log(`[LOGIN-CALLBACK] [${correlationId}] ✅ Usuário autenticado: ${userId}`);

    // 2. Buscar perfil atual (incluir quiz_completed E onboarding_completed)
    const { data: currentProfile, error: fetchError } = await supabaseAdmin
      .from('profiles')
      .select('login_count, quiz_completed, onboarding_completed')
      .eq('id', userId)
      .single();

    let currentLoginCount = 0;
    let quizCompleted = false;
    let onboardingCompleted = false;

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        // Perfil não existe - será criado com loginCount = 1 e quiz_completed = false
        console.log(`[LOGIN-CALLBACK] [${correlationId}] ℹ️ Perfil não encontrado - criando novo`);
      } else {
        console.error(`[LOGIN-CALLBACK] [${correlationId}] ❌ Erro ao buscar perfil:`, fetchError);
        throw fetchError;
      }
    } else {
      currentLoginCount = currentProfile.login_count || 0;
      quizCompleted = currentProfile.quiz_completed || false;
      onboardingCompleted = currentProfile.onboarding_completed || false;

      // CORREÇÃO: Se quiz_completed = TRUE mas onboarding_completed = FALSE
      // significa que é um usuário antigo - sincronizar os campos
      if (quizCompleted && !onboardingCompleted) {
        console.log(`[LOGIN-CALLBACK] [${correlationId}] 🔄 Sincronizando onboarding_completed (usuário antigo)`);
        onboardingCompleted = true;
      }
    }

    // 3. Incrementar loginCount atomicamente e atualizar lastLoginAt
    const newLoginCount = currentLoginCount + 1;
    const now = new Date().toISOString();

    console.log(`[LOGIN-CALLBACK] [${correlationId}] 💾 Incrementando loginCount: ${currentLoginCount} → ${newLoginCount}`);

    // IMPORTANTE: Incluir TODOS os campos obrigatórios no upsert para evitar erro RLS
    // Quando o perfil não existe, o INSERT precisa de todos os campos NOT NULL
    console.log(`[LOGIN-CALLBACK] [${correlationId}] 📤 Fazendo upsert na tabela profiles...`);

    const upsertPromise = supabaseAdmin
      .from('profiles')
      .upsert({
        id: userId,
        login_count: newLoginCount,
        quiz_completed: quizCompleted, // Preservar valor existente ou usar false (perfil novo)
        onboarding_completed: onboardingCompleted, // Sincronizar com quiz_completed
        last_login_at: now,
        updated_at: now,
      }, {
        onConflict: 'id'
      })
      .select()
      .single();

    // Adicionar timeout de 5 segundos
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout ao atualizar perfil (5s)')), 5000)
    );

    const { data, error } = await Promise.race([upsertPromise, timeoutPromise]) as any;

    console.log(`[LOGIN-CALLBACK] [${correlationId}] 📥 Upsert completado`);

    if (error) {
      console.error(`[LOGIN-CALLBACK] [${correlationId}] ❌ Erro ao fazer upsert:`, {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });

      // Fallback: tentar apenas UPDATE (para perfis existentes)
      console.log(`[LOGIN-CALLBACK] [${correlationId}] 🔄 Tentando UPDATE simples...`);

      const { data: updateData, error: updateError } = await supabaseAdmin
        .from('profiles')
        .update({
          login_count: newLoginCount,
          last_login_at: now,
          updated_at: now,
        })
        .eq('id', userId)
        .select()
        .single();

      if (updateError) {
        console.error(`[LOGIN-CALLBACK] [${correlationId}] ❌ UPDATE também falhou:`, updateError);
        throw updateError;
      }

      console.log(`[LOGIN-CALLBACK] [${correlationId}] ✅ UPDATE bem-sucedido (fallback)`);

      // Usar dados do UPDATE
      return NextResponse.json({
        success: true,
        loginCount: updateData.login_count,
        lastLoginAt: updateData.last_login_at,
        quizCompleted: updateData.quiz_completed,
        onboardingCompleted: updateData.onboarding_completed || false,
        redirectTo: updateData.onboarding_completed ? '/home' : '/onboarding',
        correlationId,
      });
    }

    console.log(`[LOGIN-CALLBACK] [${correlationId}] ✅ Login registrado com sucesso!`, {
      userId,
      loginCount: data.login_count,
      lastLoginAt: data.last_login_at,
      quizCompleted: data.quiz_completed,
      onboardingCompleted: data.onboarding_completed,
    });

    // 3.1. Inicializar trial se for primeiro login (chamada direta ao Supabase)
    // Só cria trial se não existir registro em user_subscriptions
    try {
      console.log(`[LOGIN-CALLBACK] [${correlationId}] 🎁 Verificando/criando trial...`);

      // Verificar se já existe registro
      const { data: existingSubscription } = await supabaseAdmin
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (existingSubscription) {
        console.log(`[LOGIN-CALLBACK] [${correlationId}] ℹ️ Usuário já tem registro de assinatura - trial não criado`);
      } else {
        // Criar trial de 3 dias
        const now = new Date();
        const trialEnd = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // +3 dias

        const { error: insertError } = await supabaseAdmin
          .from('user_subscriptions')
          .insert({
            user_id: userId,
            status: 'trialing',
            trial_end: trialEnd.toISOString(),
            plan_name: 'Trial Gratuito',
            created_at: now.toISOString(),
            updated_at: now.toISOString(),
          });

        if (insertError) {
          console.warn(`[LOGIN-CALLBACK] [${correlationId}] ⚠️ Erro ao criar trial (não crítico):`, insertError.message);
        } else {
          console.log(`[LOGIN-CALLBACK] [${correlationId}] ✅ Trial de 3 dias criado com sucesso!`, {
            trialEnd: trialEnd.toISOString(),
          });
        }
      }
    } catch (trialError) {
      console.warn(`[LOGIN-CALLBACK] [${correlationId}] ⚠️ Exceção ao inicializar trial (não crítico):`, trialError);
    }

    // 4. Verificar se onboarding foi completo para decidir redirecionamento
    // CORREÇÃO: Usar onboarding_completed ao invés de quiz_completed
    const finalOnboardingCompleted = data.onboarding_completed || false;
    const redirectTo = finalOnboardingCompleted ? '/home' : '/onboarding';

    console.log(`[LOGIN-CALLBACK] [${correlationId}] 🔀 Redirecionamento: ${redirectTo} (onboardingCompleted: ${finalOnboardingCompleted})`);

    return NextResponse.json({
      success: true,
      loginCount: data.login_count,
      lastLoginAt: data.last_login_at,
      quizCompleted: data.quiz_completed,
      onboardingCompleted: finalOnboardingCompleted,
      redirectTo,
      correlationId,
    });
  } catch (error: any) {
    console.error(`[LOGIN-CALLBACK] [${correlationId}] ❌ Erro inesperado:`, {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
      stack: error.stack,
    });

    // Se for erro de variável de ambiente, retornar 503
    if (error.message?.includes('não configurada')) {
      return NextResponse.json(
        {
          error: 'Configuração do servidor incompleta',
          details: error.message,
          correlationId
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        error: 'Erro ao registrar login',
        details: error.message,
        correlationId
      },
      { status: 500 }
    );
  }
}
