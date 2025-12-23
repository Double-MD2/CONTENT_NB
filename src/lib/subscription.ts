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
 * NOVA LÓGICA PROFISSIONAL:
 * - NÃO calcula trial usando created_at do auth
 * - Depende EXCLUSIVAMENTE da tabela user_subscriptions
 * - Apenas CONSULTA o Supabase, nunca cria/atualiza registros
 * - Usuários sem registro válido = SEM ACESSO
 * 
 * REGRAS:
 * 1. Se status = 'trialing' E trial_end > hoje -> true
 * 2. Se status = 'active' -> true
 * 3. Qualquer outro caso -> false
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

    // CASO 1: Status = 'trialing' (período de teste)
    if (subscription.status === 'trialing') {
      if (!subscription.trial_end) {
        return false;
      }

      const trialEndsAt = new Date(subscription.trial_end);
      const isTrialActive = now < trialEndsAt;

      console.log('[hasAccessToPremium] Trial status:', {
        isActive: isTrialActive,
        endsAt: trialEndsAt.toISOString(),
      });

      return isTrialActive;
    }

    // CASO 2: Status = 'active' (assinatura ativa)
    if (subscription.status === 'active') {
      console.log('[hasAccessToPremium] Assinatura ativa - acesso liberado');
      return true;
    }

    // CASO 3: Qualquer outro status
    console.log('[hasAccessToPremium] Status não permite acesso:', subscription.status);
    return false;
  } catch (error) {
    console.error('[hasAccessToPremium] Erro:', error);
    return false;
  }
}

/**
 * Verifica se usuário ainda está no período de trial
 * 
 * NOVA LÓGICA: Consulta APENAS user_subscriptions
 */
export async function checkIfInTrial(userId: string): Promise<boolean> {
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
      .eq('status', 'trialing')
      .single();

    if (error || !subscription || !subscription.trial_end) {
      return false;
    }

    const now = new Date();
    const trialEndsAt = new Date(subscription.trial_end);

    return now < trialEndsAt;
  } catch (error) {
    console.error('[checkIfInTrial] Erro:', error);
    return false;
  }
}

/**
 * Verifica se usuário tem assinatura ativa no Supabase
 * 
 * NOVA LÓGICA: Consulta APENAS user_subscriptions com status = 'active'
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
      .eq('status', 'active')
      .single();

    if (error || !subscription) {
      return false;
    }

    console.log('[checkActiveSubscription] Assinatura ativa encontrada');
    return true;
  } catch (error) {
    console.error('[checkActiveSubscription] Erro:', error);
    return false;
  }
}

/**
 * Retorna informações detalhadas sobre o status de acesso do usuário
 * 
 * NOVA LÓGICA: Baseado EXCLUSIVAMENTE em user_subscriptions
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
    let hasAccess = false;
    let isInTrial = false;
    let trialEndsAt: Date | null = null;
    let subscriptionPlan: string | null = null;

    // Verificar trial
    if (subscription.status === 'trialing' && subscription.trial_end) {
      trialEndsAt = new Date(subscription.trial_end);
      isInTrial = now < trialEndsAt;
      hasAccess = isInTrial;
    }

    // Verificar assinatura ativa
    if (subscription.status === 'active') {
      hasAccess = true;
      subscriptionPlan = subscription.plan_name || 'Premium';
    }

    return {
      hasAccess,
      isInTrial,
      trialEndsAt,
      subscriptionPlan,
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
