'use client';

import { useState, useEffect } from 'react';
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
 * REGRAS DE PRIORIDADE:
 * 1. Verifica se está no trial de 3 dias (prioridade máxima)
 * 2. Se não estiver no trial, verifica assinatura ativa
 * 3. Se nenhuma das duas, bloqueia acesso premium
 * 
 * TRIAL:
 * - Todo usuário novo recebe 3 dias de trial gratuito
 * - Trial inicia automaticamente no primeiro login
 * - Registra trial_started_at no user_metadata do Supabase Auth
 * - Usa created_at da conta como referência para contas antigas
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
      
      // 1. Verificar se usuário está logado
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log('[useSubscription] ❌ Sem sessão - usuário não logado');
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

      const userId = session.user.id;
      console.log('[useSubscription] ✅ Usuário logado:', userId);

      // 2. PRIORIDADE 1: Verificar período de trial (3 dias)
      const trialStatus = await checkTrialStatus(userId);
      console.log('[useSubscription] Trial status:', trialStatus);
      
      if (trialStatus.isInTrial) {
        // Ainda está no trial - libera acesso total
        console.log('[useSubscription] ✅ Usuário no trial - ACESSO LIBERADO', {
          daysRemaining: trialStatus.daysRemaining,
          trialEndsAt: trialStatus.trialEndsAt
        });
        setStatus({
          isActive: true,
          isInTrial: true,
          trialEndsAt: trialStatus.trialEndsAt,
          trialDaysRemaining: trialStatus.daysRemaining,
          planName: 'Trial Gratuito',
          loading: false,
        });
        return;
      }

      console.log('[useSubscription] ⏰ Trial expirado ou não existe - verificando assinatura...');

      // 3. PRIORIDADE 2: Trial acabou - verificar assinatura no Supabase
      const subscriptionActive = await checkActiveSubscription(userId);
      
      if (subscriptionActive) {
        console.log('[useSubscription] ✅ Assinatura ativa - ACESSO LIBERADO');
        setStatus({
          isActive: true,
          isInTrial: false,
          trialEndsAt: trialStatus.trialEndsAt,
          trialDaysRemaining: 0,
          planName: subscriptionActive.planName,
          loading: false,
        });
      } else {
        // Não tem assinatura ativa - bloquear acesso
        console.log('[useSubscription] ❌ Sem trial e sem assinatura - ACESSO BLOQUEADO');
        setStatus({
          isActive: false,
          isInTrial: false,
          trialEndsAt: trialStatus.trialEndsAt,
          trialDaysRemaining: 0,
          planName: null,
          loading: false,
        });
      }
    } catch (error) {
      console.error('[useSubscription] ❌ Erro ao verificar status:', error);
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
   * Verifica se usuário ainda está no período de trial de 3 dias
   * Usa user_metadata do Supabase Auth para armazenar trial_started_at
   * Usa created_at da conta como fallback para contas antigas
   */
  const checkTrialStatus = async (userId: string): Promise<{ 
    isInTrial: boolean; 
    trialEndsAt: Date | null;
    daysRemaining: number;
  }> => {
    try {
      console.log('[checkTrialStatus] 🔍 Verificando trial para usuário:', userId);
      
      // Buscar dados do usuário no Auth (força refresh para pegar dados mais recentes)
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        console.error('[checkTrialStatus] ❌ Erro ao buscar usuário:', error);
        return { isInTrial: false, trialEndsAt: null, daysRemaining: 0 };
      }

      console.log('[checkTrialStatus] 📋 User metadata completo:', JSON.stringify(user.user_metadata, null, 2));
      console.log('[checkTrialStatus] 📅 Conta criada em:', user.created_at);

      const accountCreatedAt = new Date(user.created_at);
      const now = new Date();
      
      // Calcular idade da conta em dias
      const accountAgeDays = Math.floor((now.getTime() - accountCreatedAt.getTime()) / (1000 * 60 * 60 * 24));
      console.log('[checkTrialStatus] 📊 Idade da conta:', accountAgeDays, 'dias');

      // Verificar se trial_started_at existe no user_metadata
      const trialStartedAtStr = user.user_metadata?.trial_started_at;
      console.log('[checkTrialStatus] 📅 trial_started_at encontrado:', trialStartedAtStr);

      // Se não tem trial_started_at, precisamos decidir o que fazer
      if (!trialStartedAtStr) {
        console.log('[checkTrialStatus] ⚠️ Sem trial_started_at registrado');
        
        // CORREÇÃO CRÍTICA: Verificar idade da conta
        if (accountAgeDays > 3) {
          // Conta antiga (mais de 3 dias) - trial já expirou
          console.log('[checkTrialStatus] ❌ Conta antiga (', accountAgeDays, 'dias) - Trial expirado');
          
          // Registrar que o trial expirou (usar created_at como referência)
          const trialEndsAt = new Date(accountCreatedAt);
          trialEndsAt.setDate(trialEndsAt.getDate() + 3);
          
          // Opcionalmente, registrar no metadata para não recalcular sempre
          await supabase.auth.updateUser({
            data: { trial_started_at: accountCreatedAt.toISOString() }
          });
          
          return { 
            isInTrial: false, 
            trialEndsAt,
            daysRemaining: 0
          };
        }
        
        // Conta nova (menos de 3 dias) - iniciar trial
        console.log('[checkTrialStatus] 🎉 Conta nova - Iniciando trial de 3 dias...');
        const trialStartedAt = accountCreatedAt; // Usar data de criação da conta
        const nowISO = trialStartedAt.toISOString();
        
        console.log('[checkTrialStatus] ⏰ Trial iniciado em:', nowISO);
        
        // Registrar início do trial no user_metadata
        const { data: updatedUser, error: updateError } = await supabase.auth.updateUser({
          data: { trial_started_at: nowISO }
        });

        if (updateError) {
          console.error('[checkTrialStatus] ❌ Erro ao registrar trial:', updateError);
        } else {
          console.log('[checkTrialStatus] ✅ Trial registrado com sucesso!');
        }

        // Calcular data de término (3 dias a partir da criação da conta)
        const trialEndsAt = new Date(trialStartedAt);
        trialEndsAt.setDate(trialEndsAt.getDate() + 3);

        // Calcular dias restantes
        const diffTime = trialEndsAt.getTime() - now.getTime();
        const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const isInTrial = daysRemaining > 0;

        console.log('[checkTrialStatus] ✅ Trial status:', {
          startedAt: nowISO,
          endsAt: trialEndsAt.toISOString(),
          daysRemaining: Math.max(0, daysRemaining),
          isInTrial
        });

        return { 
          isInTrial, 
          trialEndsAt,
          daysRemaining: Math.max(0, daysRemaining)
        };
      }

      // Trial já existe - verificar se ainda está ativo
      console.log('[checkTrialStatus] 🔄 Trial já existe - verificando se ainda está ativo...');
      const trialStartedAt = new Date(trialStartedAtStr);
      const trialEndsAt = new Date(trialStartedAt);
      trialEndsAt.setDate(trialEndsAt.getDate() + 3); // 3 dias de trial

      const isInTrial = now < trialEndsAt;

      // Calcular dias restantes
      const diffTime = trialEndsAt.getTime() - now.getTime();
      const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      console.log('[checkTrialStatus] 📊 Status do trial:', {
        trialStartedAt: trialStartedAt.toISOString(),
        trialEndsAt: trialEndsAt.toISOString(),
        now: now.toISOString(),
        isInTrial,
        daysRemaining: Math.max(0, daysRemaining)
      });

      return { 
        isInTrial, 
        trialEndsAt,
        daysRemaining: Math.max(0, daysRemaining)
      };
    } catch (error) {
      console.error('[checkTrialStatus] ❌ Erro inesperado:', error);
      return { isInTrial: false, trialEndsAt: null, daysRemaining: 0 };
    }
  };

  /**
   * Verifica se usuário tem assinatura ativa no Supabase
   * Consulta tabela user_subscriptions atualizada pelo webhook da Kirvano
   */
  const checkActiveSubscription = async (userId: string): Promise<{ planName: string } | null> => {
    try {
      console.log('[checkActiveSubscription] 🔍 Verificando assinatura para:', userId);
      
      const { data: subscription, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single();

      if (error) {
        console.log('[checkActiveSubscription] ⚠️ Erro ao buscar assinatura:', error.message);
        return null;
      }

      if (!subscription) {
        console.log('[checkActiveSubscription] ❌ Nenhuma assinatura ativa encontrada');
        return null;
      }

      console.log('[checkActiveSubscription] 📋 Assinatura encontrada:', subscription);

      // Verificar se a assinatura ainda está válida (data de fim)
      if (subscription.end_date) {
        const endDate = new Date(subscription.end_date);
        const now = new Date();
        
        if (now > endDate) {
          // Assinatura expirada
          console.log('[checkActiveSubscription] ⏰ Assinatura expirada em:', endDate.toISOString());
          return null;
        }
      }

      console.log('[checkActiveSubscription] ✅ Assinatura ativa:', subscription.plan_name);
      return {
        planName: subscription.plan_name || 'Premium',
      };
    } catch (error) {
      console.error('[checkActiveSubscription] ❌ Erro inesperado:', error);
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
