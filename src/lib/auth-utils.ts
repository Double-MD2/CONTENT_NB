import { supabase } from './supabase';

/**
 * Chama a RPC increment_login_stats do Supabase
 * Registra 1 login para o usuário autenticado
 */
export async function callIncrementLoginStats(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    // Verificar se há usuário autenticado
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error('[callIncrementLoginStats] ❌ Nenhum usuário autenticado:', authError?.message);
      return {
        success: false,
        error: authError?.message || 'Usuário não autenticado',
      };
    }

    console.log('[callIncrementLoginStats] ✅ Usuário autenticado:', user.id);

    // Chamar a RPC increment_login_stats
    const { data, error: rpcError } = await supabase.rpc('increment_login_stats');

    if (rpcError) {
      console.error('[callIncrementLoginStats] ❌ Erro ao chamar RPC:', rpcError);
      return {
        success: false,
        error: rpcError.message,
      };
    }

    console.log('[callIncrementLoginStats] ✅ RPC executada com sucesso:', data);

    return {
      success: true,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('[callIncrementLoginStats] ❌ Erro inesperado:', errorMessage);
    return {
      success: false,
      error: errorMessage,
    };
  }
}
