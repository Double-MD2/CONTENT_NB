import { supabase } from './supabase';

/**
 * Verifica se há usuário autenticado antes de fazer queries
 * Retorna null se não houver sessão válida
 */
async function getAuthenticatedUser() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error || !session || !session.user) {
      return null;
    }
    
    return session.user;
  } catch (error) {
    return null;
  }
}

/**
 * Verifica se usuário tem acesso premium
 *
 * LÓGICA EXCLUSIVA BASEADA EM user_subscriptions:
 * - Apenas CONSULTA, nunca cria/atualiza registros
 * - Usuários sem registro válido = SEM ACESSO
 *
 * REGRAS:
 * 1. Se status = 'trialing' E trial_end > data atual -> ACESSO LIBERADO (trial ativo)
 * 2. Se status = 'active' E period_end = NULL -> ACESSO LIBERADO (vitalício)
 * 3. Se status = 'active' E period_end existe -> ACESSO LIBERADO se data atual < period_end
 * 4. Qualquer outro status -> ACESSO BLOQUEADO
 */
export async function hasAccessToPremium(userId: string): Promise<boolean> {
  try {
    // Verificar se há usuário autenticado
    const user = await getAuthenticatedUser();
    if (!user) {
      return false;
    }

    // Consultar tabela user_subscriptions (ÚNICA FONTE DE VERDADE)
    const { data: subscription, error } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !subscription) {
      console.log('[hasAccessToPremium] Sem registro válido - acesso bloqueado');
      return false;
    }

    const now = new Date();

    // REGRA 1: Status = 'trialing' (trial de 3 dias)
    if (subscription.status === 'trialing') {
      if (!subscription.trial_end) {
        console.log('[hasAccessToPremium] Trial sem data de término - bloqueado');
        return false;
      }

      const trialEnd = new Date(subscription.trial_end);
      const hasAccess = now < trialEnd;

      console.log('[hasAccessToPremium] Trial:', {
        hasAccess,
        trialEnd: trialEnd.toISOString(),
        now: now.toISOString(),
      });

      return hasAccess;
    }

    // REGRA 2 e 3: Status = 'active'
    if (subscription.status === 'active') {
      // Caso vitalício (period_end = NULL)
      if (!subscription.period_end) {
        console.log('[hasAccessToPremium] Assinatura vitalícia - acesso liberado');
        return true;
      }

      // Caso com prazo (verificar period_end)
      const periodEnd = new Date(subscription.period_end);
      const hasAccess = now < periodEnd;

      console.log('[hasAccessToPremium] Assinatura com prazo:', {
        hasAccess,
        periodEnd: periodEnd.toISOString(),
        now: now.toISOString(),
      });

      return hasAccess;
    }

    // REGRA 4: Qualquer outro status
    console.log('[hasAccessToPremium] Status não permite acesso:', subscription.status);
    return false;
  } catch (error) {
    console.error('[hasAccessToPremium] Erro:', error);
    return false;
  }
}

/**
 * Verifica se usuário está no período de trial
 *
 * LÓGICA: Apenas consulta user_subscriptions
 * - Se status = 'trialing' E trial_end > agora -> TRUE
 * - Qualquer outro caso -> FALSE
 */
export async function checkIfInTrial(userId: string): Promise<boolean> {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return false;
    }

    const { data: subscription, error } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !subscription || subscription.status !== 'trialing') {
      return false;
    }

    if (!subscription.trial_end) {
      return false;
    }

    const now = new Date();
    const trialEnd = new Date(subscription.trial_end);
    return now < trialEnd;
  } catch (error) {
    console.error('[checkIfInTrial] Erro:', error);
    return false;
  }
}

/**
 * Verifica se usuário tem assinatura ativa (ou trial) no Supabase
 *
 * LÓGICA: Consulta user_subscriptions
 * - Trial ativo (trialing + trial_end > agora) -> TRUE
 * - Assinatura ativa (active + verificar period_end) -> TRUE
 * - Qualquer outro caso -> FALSE
 */
export async function checkActiveSubscription(userId: string): Promise<boolean> {
  try {
    // Verificar se há usuário autenticado
    const user = await getAuthenticatedUser();
    if (!user) {
      return false;
    }

    const { data: subscription, error } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !subscription) {
      return false;
    }

    const now = new Date();

    // CASO 1: Trial ativo
    if (subscription.status === 'trialing' && subscription.trial_end) {
      const trialEnd = new Date(subscription.trial_end);
      const isActive = now < trialEnd;
      console.log('[checkActiveSubscription] Trial:', { isActive });
      return isActive;
    }

    // CASO 2: Assinatura ativa
    if (subscription.status === 'active') {
      // Vitalício (period_end = NULL)
      if (!subscription.period_end) {
        console.log('[checkActiveSubscription] Assinatura vitalícia ativa');
        return true;
      }

      // Com prazo (verificar period_end)
      const periodEnd = new Date(subscription.period_end);
      const isActive = now < periodEnd;

      console.log('[checkActiveSubscription] Assinatura com prazo:', {
        isActive,
        periodEnd: periodEnd.toISOString(),
      });

      return isActive;
    }

    return false;
  } catch (error) {
    console.error('[checkActiveSubscription] Erro:', error);
    return false;
  }
}

/**
 * Retorna informações detalhadas sobre o status de acesso do usuário
 *
 * LÓGICA: Baseado EXCLUSIVAMENTE em user_subscriptions
 * - Trial: status='trialing' + trial_end > agora
 * - Assinatura: status='active' + verificar period_end
 */
export async function getAccessStatus(userId: string): Promise<{
  hasAccess: boolean;
  isInTrial: boolean;
  trialEndsAt: Date | null;
  subscriptionPlan: string | null;
}> {
  try {
    // Verificar se há usuário autenticado
    const user = await getAuthenticatedUser();
    if (!user) {
      return {
        hasAccess: false,
        isInTrial: false,
        trialEndsAt: null,
        subscriptionPlan: null,
      };
    }

    const { data: subscription, error } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !subscription) {
      return {
        hasAccess: false,
        isInTrial: false,
        trialEndsAt: null,
        subscriptionPlan: null,
      };
    }

    const now = new Date();

    // CASO 1: Trial (status = 'trialing')
    if (subscription.status === 'trialing') {
      if (!subscription.trial_end) {
        return {
          hasAccess: false,
          isInTrial: false,
          trialEndsAt: null,
          subscriptionPlan: null,
        };
      }

      const trialEndsAt = new Date(subscription.trial_end);
      const isTrialActive = now < trialEndsAt;

      return {
        hasAccess: isTrialActive,
        isInTrial: isTrialActive,
        trialEndsAt: isTrialActive ? trialEndsAt : null,
        subscriptionPlan: isTrialActive ? 'Trial Gratuito' : null,
      };
    }

    // CASO 2: Assinatura (status = 'active')
    if (subscription.status === 'active') {
      let hasAccess = false;
      let subscriptionPlan: string | null = null;

      // Vitalício (period_end = NULL)
      if (!subscription.period_end) {
        hasAccess = true;
        subscriptionPlan = subscription.plan_name || 'Premium Vitalício';
      } else {
        // Com prazo (verificar period_end)
        const periodEnd = new Date(subscription.period_end);
        hasAccess = now < periodEnd;

        if (hasAccess) {
          subscriptionPlan = subscription.plan_name || 'Premium';
        }
      }

      return {
        hasAccess,
        isInTrial: false,
        trialEndsAt: null,
        subscriptionPlan,
      };
    }

    // CASO 3: Qualquer outro status
    return {
      hasAccess: false,
      isInTrial: false,
      trialEndsAt: null,
      subscriptionPlan: null,
    };
  } catch (error) {
    console.error('[getAccessStatus] Erro:', error);
    return {
      hasAccess: false,
      isInTrial: false,
      trialEndsAt: null,
      subscriptionPlan: null,
    };
  }
}
