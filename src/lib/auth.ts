import { supabase } from './supabase';

/**
 * Verifica se o usuário está autenticado
 * @returns Promise com a sessão do usuário ou null
 */
export async function checkAuth() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Erro ao verificar autenticação:', error);
      return null;
    }
    
    return session;
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    return null;
  }
}

/**
 * Faz logout do usuário
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Erro ao fazer logout:', error);
      return { success: false, error };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    return { success: false, error };
  }
}

/**
 * Obtém o usuário atual
 */
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Erro ao obter usuário:', error);
      return null;
    }
    
    return user;
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    return null;
  }
}

/**
 * Verifica se o token está válido
 */
export async function isTokenValid() {
  try {
    const session = await checkAuth();
    
    if (!session) {
      return false;
    }
    
    // Verificar se o token não está expirado
    const expiresAt = session.expires_at;
    if (!expiresAt) {
      return false;
    }
    
    const now = Math.floor(Date.now() / 1000);
    return expiresAt > now;
  } catch (error) {
    console.error('Erro ao verificar validade do token:', error);
    return false;
  }
}

/**
 * Atualiza o token se necessário
 */
export async function refreshTokenIfNeeded() {
  try {
    const { data: { session }, error } = await supabase.auth.refreshSession();
    
    if (error) {
      console.error('Erro ao atualizar token:', error);
      return null;
    }
    
    return session;
  } catch (error) {
    console.error('Erro ao atualizar token:', error);
    return null;
  }
}
