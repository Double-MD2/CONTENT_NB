'use client';

import { useEffect, useRef } from 'react';
import { safeSupabaseRPC, checkSupabaseReady } from '@/lib/supabase-guard';

/**
 * Hook que chama log_daily_login APENAS 1 vez por sessão
 * Registra o acesso do dia no fuso America/Sao_Paulo
 * Idempotente: não duplica registros no mesmo dia
 * 
 * SEGURANÇA:
 * - Valida conexão e autenticação antes de executar
 * - Não executa se Supabase estiver indisponível
 * - Não gera erros no console em caso de falha
 */
export function useLogDailyLogin() {
  const hasCalledRef = useRef(false);
  const isCallingRef = useRef(false);

  useEffect(() => {
    // Executar apenas no cliente
    if (typeof window === 'undefined') return;

    // Se já chamou ou está chamando, não fazer nada
    if (hasCalledRef.current || isCallingRef.current) {
      console.log('[useLogDailyLogin] ⏭️  Já executado ou em execução - pulando');
      return;
    }

    const logDailyLogin = async () => {
      try {
        // Marcar como "chamando" para evitar race conditions
        isCallingRef.current = true;

        // VALIDAÇÃO CRÍTICA: Verificar se Supabase está pronto
        const guard = await checkSupabaseReady();

        if (!guard.isReady) {
          console.log('[useLogDailyLogin] ⏭️ Supabase não está pronto:', guard.error);
          console.log('[useLogDailyLogin] Aguardando autenticação antes de registrar');
          isCallingRef.current = false;
          return;
        }

        console.log('[useLogDailyLogin] 🚀 Chamando log_daily_login...');

        // Chamar a RPC log_daily_login de forma segura
        const { data, error } = await safeSupabaseRPC('log_daily_login');

        if (error) {
          console.log('[useLogDailyLogin] ⚠️ Não foi possível registrar login:', error);
          
          // Se erro de autenticação, redirecionar para login
          if (error.includes('401') || error.includes('403') || error.includes('JWT')) {
            console.log('[useLogDailyLogin] 🔒 Sessão expirada - redirecionando para login');
            window.location.href = '/login';
            return;
          }
        } else {
          console.log('[useLogDailyLogin] ✅ Login registrado com sucesso:', data);
          hasCalledRef.current = true; // Marcar como executado
        }
      } catch (error) {
        console.log('[useLogDailyLogin] ⚠️ Erro ao registrar login (não crítico)');
      } finally {
        isCallingRef.current = false;
      }
    };

    logDailyLogin();
  }, []); // Array vazio = executa apenas 1 vez no mount

  return null;
}
