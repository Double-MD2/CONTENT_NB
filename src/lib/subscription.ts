import { supabase } from './supabase';

/**
 * Verifica se usuário tem acesso premium (trial OU assinatura ativa)
 * 
 * REGRAS:
 * 1. Usuário novo (≤ 3 dias) -> true (trial)
 * 2. Trial acabou + assinatura ativa -> true
 * 3. Trial acabou + sem assinatura -> false
 */
export async function hasAccessToPremium(userId: string): Promise<boolean> {
  try {
    // 1. Verificar trial
    const isInTrial = await checkIfInTrial(userId);
    if (isInTrial) {
      return true;
    }

    // 2. Verificar assinatura ativa
    const hasActiveSubscription = await checkActiveSubscription(userId);
    return hasActiveSubscription;
  } catch (error) {
    console.error('[hasAccessToPremium] Erro:', error);
    return false;
  }
}

/**
 * Verifica se usuário ainda está no período de trial de 3 dias
 */
export async function checkIfInTrial(userId: string): Promise<boolean> {
  try {
    const { data: userData, error } = await supabase
      .from('user_data')
      .select('created_at')
      .eq('user_id', userId)
      .single();

    if (error || !userData) {
      return false;
    }

    const firstAccessDate = new Date(userData.created_at);
    const now = new Date();
    const trialEndsAt = new Date(firstAccessDate);
    trialEndsAt.setDate(trialEndsAt.getDate() + 3);

    return now < trialEndsAt;
  } catch (error) {
    console.error('[checkIfInTrial] Erro:', error);
    return false;
  }
}

/**
 * Verifica se usuário tem assinatura ativa no Supabase
 */
export async function checkActiveSubscription(userId: string): Promise<boolean> {
  try {
    const { data: subscription, error } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (error || !subscription) {
      return false;
    }

    // Verificar se a assinatura ainda está válida (data de fim)
    if (subscription.end_date) {
      const endDate = new Date(subscription.end_date);
      const now = new Date();
      
      if (now > endDate) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('[checkActiveSubscription] Erro:', error);
    return false;
  }
}

/**
 * Retorna informações detalhadas sobre o status de acesso do usuário
 */
export async function getAccessStatus(userId: string): Promise<{
  hasAccess: boolean;
  isInTrial: boolean;
  trialEndsAt: Date | null;
  subscriptionPlan: string | null;
}> {
  try {
    const isInTrial = await checkIfInTrial(userId);
    
    let trialEndsAt: Date | null = null;
    if (isInTrial) {
      const { data: userData } = await supabase
        .from('user_data')
        .select('created_at')
        .eq('user_id', userId)
        .single();
      
      if (userData) {
        const firstAccessDate = new Date(userData.created_at);
        trialEndsAt = new Date(firstAccessDate);
        trialEndsAt.setDate(trialEndsAt.getDate() + 3);
      }
    }

    const hasActiveSubscription = await checkActiveSubscription(userId);
    
    let subscriptionPlan: string | null = null;
    if (hasActiveSubscription) {
      const { data: subscription } = await supabase
        .from('user_subscriptions')
        .select('plan_name')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single();
      
      subscriptionPlan = subscription?.plan_name || 'Premium';
    }

    return {
      hasAccess: isInTrial || hasActiveSubscription,
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
