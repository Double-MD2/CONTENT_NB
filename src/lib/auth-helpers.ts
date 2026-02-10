/**
 * Auth Helpers - Funções auxiliares para autenticação
 *
 * Garante que apenas sessões VÁLIDAS sejam consideradas autenticadas
 */

import { Session } from '@supabase/supabase-js';

/**
 * Valida se uma sessão do Supabase é realmente válida e contém dados de usuário
 *
 * CRÍTICO: Uma sessão é considerada válida APENAS se:
 * 1. Existe (não é null/undefined)
 * 2. Tem um objeto user
 * 3. O user tem um ID válido
 * 4. O user tem um email válido
 * 5. O access_token existe
 *
 * @param session - Sessão do Supabase
 * @returns true se a sessão é válida, false caso contrário
 */
export function isValidSession(session: Session | null): boolean {
  if (!session) {
    console.log('[AUTH-HELPER] ❌ Sessão é null/undefined');
    return false;
  }

  if (!session.user) {
    console.log('[AUTH-HELPER] ❌ Sessão sem objeto user');
    return false;
  }

  if (!session.user.id) {
    console.log('[AUTH-HELPER] ❌ User sem ID');
    return false;
  }

  if (!session.user.email) {
    console.log('[AUTH-HELPER] ❌ User sem email');
    return false;
  }

  if (!session.access_token) {
    console.log('[AUTH-HELPER] ❌ Sessão sem access_token');
    return false;
  }

  // Verificar se o token não está expirado
  const now = Math.floor(Date.now() / 1000);
  if (session.expires_at && session.expires_at < now) {
    console.log('[AUTH-HELPER] ❌ Token expirado');
    return false;
  }

  console.log('[AUTH-HELPER] ✅ Sessão válida:', {
    userId: session.user.id,
    email: session.user.email,
    expiresAt: session.expires_at ? new Date(session.expires_at * 1000).toISOString() : 'N/A',
  });

  return true;
}

/**
 * Valida se um usuário está autenticado verificando a sessão do Supabase
 * Retorna true apenas se a sessão for válida
 */
export function isAuthenticated(session: Session | null): boolean {
  return isValidSession(session);
}
