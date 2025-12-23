'use client';

import { useState, useEffect } from 'react';
import { checkSupabaseReady, safeSupabaseQuery } from '@/lib/supabase-guard';
import { supabase } from '@/lib/supabase';

export interface SubscriptionStatus {
  isActive: boolean;
  isInTrial: boolean;
  trialEndsAt: Date | null;
  trialDaysRemaining: number;
  planName: string | null;
  loading: boolean;
}

/**
 * Hook para gerenciar status de assinatura e período de teste
 * 
 * NOVA LÓGICA PROFISSIONAL:
 * - NÃO calcula trial usando created_at do auth
 * - Depende EXCLUSIVAMENTE da tabela user_subscriptions
 * - Apenas CONSULTA o Supabase, nunca cria/atualiza registros
 * - Usuários sem registro válido = SEM ACESSO
 * 
 * REGRAS:
 * 1. Se status = 'trialing' E trial_end > hoje -> ACESSO LIBERADO (trial ativo)
 * 2. Se status = 'active' -> ACESSO LIBERADO (assinatura ativa)
 * 3. Qualquer outro caso -> ACESSO BLOQUEADO
 * 
 * SEGURANÇA:
 * - Em caso de erro, assume estado seguro (SEM acesso)
 * - Não libera acesso indevido em caso de falha
 * - Usuários antigos sem registro = SEM ACESSO (evita brechas)
 */
export function useSubscription() {
  const [status, setStatus] = useState<SubscriptionStatus>({
    isActive: false,
    isInTrial: false,
    trialEndsAt: null,
    trialDaysRemaining: 0,
    planName: null,
    loading: true,
  });

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      console.log('[useSubscription] 🔍 Iniciando verificação de status...');
      
      // VALIDAÇÃO CRÍTICA: Verificar se Supabase está pronto
      const guard = await checkSupabaseReady();
      
      if (!guard.isReady) {
        console.log('[useSubscription] ⚠️ Supabase não está pronto:', guard.error);
        console.log('[useSubscription] ❌ ESTADO SEGURO: Bloqueando acesso premium');
        setStatus({
          isActive: false,
          isInTrial: false,
          trialEndsAt: null,
          trialDaysRemaining: 0,
          planName: null,
          loading: false,
        });
        return;
      }

      const userId = guard.user!.id;
      console.log('[useSubscription] ✅ Usuário autenticado:', userId);

      // CONSULTAR TABELA user_subscriptions (ÚNICA FONTE DE VERDADE)
      const subscriptionStatus = await checkUserSubscription(userId);
      
      if (!subscriptionStatus) {
        // Sem registro válido = SEM ACESSO
        console.log('[useSubscription] ❌ Sem registro válido em user_subscriptions - ACESSO BLOQUEADO');
        setStatus({
          isActive: false,
          isInTrial: false,
          trialEndsAt: null,
          trialDaysRemaining: 0,
          planName: null,
          loading: false,
        });
        return;
      }

      // Tem registro válido - aplicar status
      console.log('[useSubscription] ✅ Status válido encontrado:', subscriptionStatus);
      setStatus({
        ...subscriptionStatus,
        loading: false,
      });
    } catch (error) {
      console.error('[useSubscription] ❌ Erro ao verificar status:', error);
      console.log('[useSubscription] ❌ ESTADO SEGURO: Bloqueando acesso premium');
      // ESTADO SEGURO: Em caso de erro, bloquear acesso
      setStatus({
        isActive: false,
        isInTrial: false,
        trialEndsAt: null,
        trialDaysRemaining: 0,
        planName: null,
        loading: false,
      });
    }
  };

  /**
   * Verifica status do usuário na tabela user_subscriptions
   * 
   * LÓGICA:
   * 1. Busca registro do usuário na tabela
   * 2. Se status = 'trialing' E trial_end > hoje -> trial ativo
   * 3. Se status = 'active' -> assinatura ativa
   * 4. Qualquer outro caso -> sem acesso
   * 
   * IMPORTANTE: Apenas CONSULTA, nunca cria/atualiza
   */
  const checkUserSubscription = async (userId: string): Promise<{
    isActive: boolean;
    isInTrial: boolean;
    trialEndsAt: Date | null;
    trialDaysRemaining: number;
    planName: string | null;
  } | null> => {
    try {
      console.log('[checkUserSubscription] 🔍 Consultando user_subscriptions para:', userId);
      
      // VALIDAÇÃO: Verificar se Supabase está pronto
      const guard = await checkSupabaseReady();

      if (!guard.isReady) {
        console.log('[checkUserSubscription] ⚠️ Supabase não está pronto');
        console.log('[checkUserSubscription] ❌ ESTADO SEGURO: Sem acesso');
        return null;
      }

      // Buscar registro do usuário (qualquer status)
      const { data: subscription, error } = await safeSupabaseQuery(
        supabase
          .from('user_subscriptions')
          .select('*')
          .eq('user_id', userId)
          .single()
      );

      if (error) {
        console.log('[checkUserSubscription] ⚠️ Erro ao buscar registro:', error);
        console.log('[checkUserSubscription] ❌ ESTADO SEGURO: Sem acesso');
        return null;
      }

      if (!subscription) {
        console.log('[checkUserSubscription] ❌ Nenhum registro encontrado - usuário sem acesso');
        return null;
      }

      console.log('[checkUserSubscription] 📋 Registro encontrado:', {
        status: subscription.status,
        trial_end: subscription.trial_end,
        plan_name: subscription.plan_name,
      });

      const now = new Date();

      // CASO 1: Status = 'trialing' (período de teste)
      if (subscription.status === 'trialing') {
        if (!subscription.trial_end) {
          console.log('[checkUserSubscription] ⚠️ Trial sem data de término - bloqueando');
          return null;
        }

        const trialEndsAt = new Date(subscription.trial_end);
        const isTrialActive = now < trialEndsAt;

        if (!isTrialActive) {
          console.log('[checkUserSubscription] ⏰ Trial expirado em:', trialEndsAt.toISOString());
          return {
            isActive: false,
            isInTrial: false,
            trialEndsAt,
            trialDaysRemaining: 0,
            planName: null,
          };
        }

        // Trial ativo - calcular dias restantes
        const diffTime = trialEndsAt.getTime() - now.getTime();
        const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        console.log('[checkUserSubscription] ✅ Trial ativo - ACESSO LIBERADO', {
          trialEndsAt: trialEndsAt.toISOString(),
          daysRemaining,
        });

        return {
          isActive: true,
          isInTrial: true,
          trialEndsAt,
          trialDaysRemaining: Math.max(0, daysRemaining),
          planName: 'Trial Gratuito',
        };
      }

      // CASO 2: Status = 'active' (assinatura ativa)
      if (subscription.status === 'active') {
        console.log('[checkUserSubscription] ✅ Assinatura ativa - ACESSO LIBERADO');
        return {
          isActive: true,
          isInTrial: false,
          trialEndsAt: null,
          trialDaysRemaining: 0,
          planName: subscription.plan_name || 'Premium',
        };
      }

      // CASO 3: Qualquer outro status (canceled, expired, etc.)
      console.log('[checkUserSubscription] ❌ Status não permite acesso:', subscription.status);
      return {
        isActive: false,
        isInTrial: false,
        trialEndsAt: subscription.trial_end ? new Date(subscription.trial_end) : null,
        trialDaysRemaining: 0,
        planName: null,
      };
    } catch (error) {
      console.error('[checkUserSubscription] ❌ Erro inesperado:', error);
      console.log('[checkUserSubscription] ❌ ESTADO SEGURO: Sem acesso');
      return null;
    }
  };

  /**
   * Força revalidação do status (útil após pagamento ou login)
   */
  const revalidate = () => {
    console.log('[useSubscription] 🔄 Revalidando status...');
    checkSubscriptionStatus();
  };

  return {
    ...status,
    revalidate,
  };
}
