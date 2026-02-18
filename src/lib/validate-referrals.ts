/**
 * Sistema de Validação de Indicações
 * Valida indicações quando usuários completam 10 dias de assinatura ativa
 */

import { supabase } from './supabase';

/**
 * Valida uma indicação específica após o usuário completar 10 dias de assinatura ativa
 */
export async function validateReferralForUser(userId: string): Promise<boolean> {
  try {
    console.log('[REFERRAL] Validando indicação para usuário:', userId);

    // Verificar se o usuário tem assinatura ativa há pelo menos 10 dias
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .lte('created_at', tenDaysAgo.toISOString())
      .single();

    if (subError || !subscription) {
      console.log('[REFERRAL] Usuário não tem assinatura ativa há 10 dias');
      return false;
    }

    // Buscar indicação pendente
    const { data: referral, error: refError } = await supabase
      .from('referrals')
      .select('*')
      .eq('referred_id', userId)
      .eq('is_valid', false)
      .single();

    if (refError || !referral) {
      console.log('[REFERRAL] Nenhuma indicação pendente encontrada');
      return false;
    }

    // Validar a indicação
    const { error: updateError } = await supabase
      .from('referrals')
      .update({
        is_valid: true,
        validated_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', referral.id);

    if (updateError) {
      console.error('[REFERRAL] Erro ao validar indicação:', updateError);
      return false;
    }

    console.log('[REFERRAL] ✅ Indicação validada com sucesso!');
    return true;
  } catch (error) {
    console.error('[REFERRAL] Exceção ao validar indicação:', error);
    return false;
  }
}

/**
 * Valida todas as indicações pendentes que atingiram o requisito de 10 dias
 * Esta função deve ser chamada por um cron job diário
 */
export async function validateAllPendingReferrals(): Promise<number> {
  try {
    console.log('[REFERRAL] Iniciando validação de indicações pendentes...');

    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

    // Buscar todas as indicações pendentes
    const { data: pendingReferrals, error: refError } = await supabase
      .from('referrals')
      .select('*')
      .eq('is_valid', false);

    if (refError || !pendingReferrals || pendingReferrals.length === 0) {
      console.log('[REFERRAL] Nenhuma indicação pendente encontrada');
      return 0;
    }

    console.log(`[REFERRAL] ${pendingReferrals.length} indicações pendentes encontradas`);

    let validatedCount = 0;

    // Verificar cada indicação
    for (const referral of pendingReferrals) {
      const { data: subscription, error: subError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', referral.referred_id)
        .eq('status', 'active')
        .lte('created_at', tenDaysAgo.toISOString())
        .single();

      if (subscription && !subError) {
        // Validar a indicação
        const { error: updateError } = await supabase
          .from('referrals')
          .update({
            is_valid: true,
            validated_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('id', referral.id);

        if (!updateError) {
          validatedCount++;
          console.log(`[REFERRAL] ✅ Indicação validada: ${referral.id}`);
        }
      }
    }

    console.log(`[REFERRAL] ✅ Validação concluída: ${validatedCount} indicações validadas`);
    return validatedCount;
  } catch (error) {
    console.error('[REFERRAL] Exceção ao validar indicações:', error);
    return 0;
  }
}

/**
 * Sistema antifraude: Detectar padrões suspeitos
 */
export async function detectSuspiciousActivity(userId: string): Promise<string[]> {
  const issues: string[] = [];

  try {
    // 1. Verificar autoindicação
    const { data: selfReferral } = await supabase
      .from('referrals')
      .select('*')
      .eq('referrer_id', userId)
      .eq('referred_id', userId)
      .single();

    if (selfReferral) {
      issues.push('Autoindicação detectada');
    }

    // 2. Verificar múltiplas indicações do mesmo usuário
    const { data: multipleReferrals, count } = await supabase
      .from('referrals')
      .select('*', { count: 'exact' })
      .eq('referred_id', userId);

    if (count && count > 1) {
      issues.push('Usuário indicado múltiplas vezes');
    }

    // 3. Verificar indicações em massa (mais de 10 em 24h)
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const { data: recentReferrals, count: recentCount } = await supabase
      .from('referrals')
      .select('*', { count: 'exact' })
      .eq('referrer_id', userId)
      .gte('created_at', oneDayAgo.toISOString());

    if (recentCount && recentCount > 10) {
      issues.push('Indicações em massa detectadas (>10 em 24h)');
    }

    // 4. Verificar padrões de cancelamento rápido
    const { data: referredUsers } = await supabase
      .from('referrals')
      .select('referred_id')
      .eq('referrer_id', userId);

    if (referredUsers) {
      let quickCancellations = 0;

      for (const ref of referredUsers) {
        const { data: subscription } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', ref.referred_id)
          .eq('status', 'canceled')
          .single();

        if (subscription) {
          const createdAt = new Date(subscription.created_at);
          const canceledAt = subscription.canceled_at ? new Date(subscription.canceled_at) : new Date();
          const daysDiff = (canceledAt.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);

          if (daysDiff < 15) {
            quickCancellations++;
          }
        }
      }

      if (quickCancellations > 3) {
        issues.push(`${quickCancellations} cancelamentos rápidos detectados (<15 dias)`);
      }
    }

    if (issues.length > 0) {
      console.warn(`[REFERRAL] ⚠️ Atividade suspeita detectada para usuário ${userId}:`, issues);
    }

    return issues;
  } catch (error) {
    console.error('[REFERRAL] Erro ao detectar atividade suspeita:', error);
    return issues;
  }
}
