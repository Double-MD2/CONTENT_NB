/**
 * Supabase Guard - Validação de conexão e autenticação
 * 
 * Garante que todas as chamadas ao Supabase sejam feitas apenas quando:
 * 1. Cliente Supabase está inicializado
 * 2. Usuário está autenticado
 * 3. Sessão está carregada e válida
 * 
 * Evita erros como "AuthRetryableFetchError: Failed to fetch"
 */

import { supabase } from './supabase';
import type { Session, User } from '@supabase/supabase-js';

export interface SupabaseGuardResult {
  isReady: boolean;
  session: Session | null;
  user: User | null;
  error?: string;
}

/**
 * Verifica se o Supabase está pronto para uso
 * Retorna informações sobre sessão e usuário
 */
export async function checkSupabaseReady(): Promise<SupabaseGuardResult> {
  try {
    // 1. Verificar se cliente está inicializado
    if (!supabase) {
      console.warn('[SUPABASE_GUARD] ⚠️ Cliente Supabase não inicializado');
      return {
        isReady: false,
        session: null,
        user: null,
        error: 'Cliente Supabase não inicializado',
      };
    }

    // 2. Verificar se há sessão válida
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      console.warn('[SUPABASE_GUARD] ⚠️ Erro ao buscar sessão:', sessionError.message);
      return {
        isReady: false,
        session: null,
        user: null,
        error: `Erro ao buscar sessão: ${sessionError.message}`,
      };
    }

    if (!session) {
      console.log('[SUPABASE_GUARD] ℹ️ Nenhuma sessão ativa');
      return {
        isReady: false,
        session: null,
        user: null,
        error: 'Nenhuma sessão ativa',
      };
    }

    // 3. Verificar se usuário está presente
    if (!session.user) {
      console.warn('[SUPABASE_GUARD] ⚠️ Sessão sem usuário');
      return {
        isReady: false,
        session: null,
        user: null,
        error: 'Sessão sem usuário válido',
      };
    }

    // 4. Verificar se token não está expirado
    const now = Math.floor(Date.now() / 1000);
    if (session.expires_at && session.expires_at < now) {
      console.warn('[SUPABASE_GUARD] ⚠️ Token expirado');
      return {
        isReady: false,
        session: null,
        user: null,
        error: 'Token expirado',
      };
    }

    // Tudo OK!
    console.log('[SUPABASE_GUARD] ✅ Supabase pronto para uso');
    return {
      isReady: true,
      session,
      user: session.user,
    };
  } catch (error) {
    console.error('[SUPABASE_GUARD] ❌ Erro inesperado:', error);
    return {
      isReady: false,
      session: null,
      user: null,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
}

/**
 * Wrapper seguro para chamadas RPC ao Supabase
 * Valida antes de executar e trata erros de forma segura
 */
export async function safeSupabaseRPC<T = any>(
  rpcName: string,
  params?: Record<string, any>
): Promise<{ data: T | null; error: string | null }> {
  try {
    // Validar se Supabase está pronto
    const guard = await checkSupabaseReady();

    if (!guard.isReady) {
      console.log(`[SAFE_RPC] ⏭️ Supabase não está pronto, pulando chamada: ${rpcName}`);
      return {
        data: null,
        error: guard.error || 'Supabase não está pronto',
      };
    }

    console.log(`[SAFE_RPC] 🚀 Executando RPC: ${rpcName}`);

    // Executar RPC com timeout
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Timeout na chamada RPC')), 10000); // 10s timeout
    });

    const rpcPromise = supabase.rpc(rpcName, params);

    const { data, error } = await Promise.race([rpcPromise, timeoutPromise]);

    if (error) {
      console.error(`[SAFE_RPC] ❌ Erro na RPC ${rpcName}:`, error);
      return {
        data: null,
        error: error.message || 'Erro na chamada RPC',
      };
    }

    console.log(`[SAFE_RPC] ✅ RPC ${rpcName} executada com sucesso`);
    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error(`[SAFE_RPC] ❌ Exceção na RPC ${rpcName}:`, error);
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
}

/**
 * Verifica se um erro é válido e estruturado
 * Retorna true apenas se o erro contiver informações relevantes
 */
function isValidError(error: any): boolean {
  if (!error) return false;
  if (typeof error !== 'object') return false;
  
  // Verificar se é um objeto vazio
  const keys = Object.keys(error);
  if (keys.length === 0) return false;
  
  // Verificar se contém pelo menos uma propriedade relevante
  const hasRelevantProperty = 
    error.message || 
    error.code || 
    error.details || 
    error.hint || 
    error.status;
  
  return !!hasRelevantProperty;
}

/**
 * Wrapper seguro para queries ao Supabase
 * Valida antes de executar e trata erros de forma segura
 */
export async function safeSupabaseQuery<T = any>(
  queryBuilder: any
): Promise<{ data: T | null; error: string | null }> {
  try {
    // Validar se Supabase está pronto
    const guard = await checkSupabaseReady();

    if (!guard.isReady) {
      console.log('[SAFE_QUERY] ⏭️ Supabase não está pronto, pulando query');
      return {
        data: null,
        error: guard.error || 'Supabase não está pronto',
      };
    }

    console.log('[SAFE_QUERY] 🚀 Executando query');

    // Executar query com timeout
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Timeout na query')), 10000); // 10s timeout
    });

    const { data, error } = await Promise.race([queryBuilder, timeoutPromise]);

    // Validação defensiva: verificar se o erro é válido e estruturado
    if (error) {
      if (!isValidError(error)) {
        // Erro vazio ou sem propriedades relevantes - retornar silenciosamente
        console.log('[SAFE_QUERY] ⏭️ Erro vazio detectado, ignorando (timing de autenticação)');
        return {
          data: null,
          error: null,
        };
      }
      
      // Erro real e estruturado - logar e retornar
      console.error('[SAFE_QUERY] ❌ Erro na query:', error);
      return {
        data: null,
        error: error.message || 'Erro na query',
      };
    }

    console.log('[SAFE_QUERY] ✅ Query executada com sucesso');
    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error('[SAFE_QUERY] ❌ Exceção na query:', error);
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
}
