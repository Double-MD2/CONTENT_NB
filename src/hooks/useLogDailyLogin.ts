'use client';

import { useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';

/**
 * Hook que chama log_daily_login APENAS 1 vez por sessão
 * Registra o acesso do dia no fuso America/Sao_Paulo
 * Idempotente: não duplica registros no mesmo dia
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

        // Verificar se há usuário autenticado
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          console.log('[useLogDailyLogin] ⏭️  Nenhuma sessão encontrada - não registrando');
          isCallingRef.current = false;
          return;
        }

        console.log('[useLogDailyLogin] 🚀 Chamando log_daily_login...');

        // Chamar a RPC log_daily_login (idempotente)
        const { data, error } = await supabase.rpc('log_daily_login');

        if (error) {
          console.error('[useLogDailyLogin] ❌ Erro ao chamar log_daily_login:', error);
          
          // Se erro 401/403, redirecionar para login
          if (error.code === 'PGRST301' || error.message?.includes('JWT')) {
            console.log('[useLogDailyLogin] 🔒 Sessão expirada - redirecionando para login');
            window.location.href = '/login';
            return;
          }
        } else {
          console.log('[useLogDailyLogin] ✅ Login registrado com sucesso:', data);
          hasCalledRef.current = true; // Marcar como executado
        }
      } catch (error) {
        console.error('[useLogDailyLogin] ❌ Erro inesperado:', error);
      } finally {
        isCallingRef.current = false;
      }
    };

    logDailyLogin();
  }, []); // Array vazio = executa apenas 1 vez no mount

  return null;
}
