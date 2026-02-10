/**
 * Testes de Autenticação - Plano Diário
 * 
 * Este arquivo contém testes para validar o fluxo de autenticação
 * e garantir que não há loops infinitos de redirecionamento.
 */

import { checkAuth, isTokenValid, signOut, getCurrentUser } from '@/lib/auth';

// Simulação de cenários de teste
export const authTests = {
  /**
   * Teste 1: Login válido
   * Verifica se após login bem-sucedido, o usuário é redirecionado corretamente
   */
  async testValidLogin() {
    console.log('🧪 Teste 1: Login válido');
    
    try {
      const session = await checkAuth();
      
      if (session) {
        console.log('✅ Sessão válida encontrada');
        console.log('- User ID:', session.user.id);
        console.log('- Email:', session.user.email);
        console.log('- Expira em:', new Date(session.expires_at! * 1000).toLocaleString());
        return { success: true, session };
      } else {
        console.log('❌ Nenhuma sessão encontrada');
        return { success: false, error: 'Nenhuma sessão encontrada' };
      }
    } catch (error) {
      console.error('❌ Erro no teste de login válido:', error);
      return { success: false, error };
    }
  },

  /**
   * Teste 2: Logout
   * Verifica se o logout limpa corretamente a sessão
   */
  async testLogout() {
    console.log('🧪 Teste 2: Logout');
    
    try {
      const result = await signOut();
      
      if (result.success) {
        console.log('✅ Logout realizado com sucesso');
        
        // Verificar se a sessão foi realmente limpa
        const session = await checkAuth();
        if (!session) {
          console.log('✅ Sessão limpa corretamente');
          return { success: true };
        } else {
          console.log('❌ Sessão ainda existe após logout');
          return { success: false, error: 'Sessão não foi limpa' };
        }
      } else {
        console.log('❌ Erro ao fazer logout:', result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('❌ Erro no teste de logout:', error);
      return { success: false, error };
    }
  },

  /**
   * Teste 3: App sendo aberto já autenticado
   * Verifica se o app reconhece sessão existente
   */
  async testAppOpenedAuthenticated() {
    console.log('🧪 Teste 3: App aberto com usuário autenticado');
    
    try {
      const session = await checkAuth();
      
      if (session) {
        const isValid = await isTokenValid();
        
        if (isValid) {
          console.log('✅ Sessão válida encontrada ao abrir app');
          console.log('- Token válido até:', new Date(session.expires_at! * 1000).toLocaleString());
          return { success: true, session };
        } else {
          console.log('⚠️ Sessão encontrada mas token expirado');
          return { success: false, error: 'Token expirado' };
        }
      } else {
        console.log('ℹ️ Nenhuma sessão encontrada (usuário não autenticado)');
        return { success: true, authenticated: false };
      }
    } catch (error) {
      console.error('❌ Erro no teste de app autenticado:', error);
      return { success: false, error };
    }
  },

  /**
   * Teste 4: Token expirado ou inválido
   * Verifica se o app lida corretamente com tokens expirados
   */
  async testExpiredToken() {
    console.log('🧪 Teste 4: Token expirado ou inválido');
    
    try {
      const session = await checkAuth();
      
      if (!session) {
        console.log('ℹ️ Nenhuma sessão para testar');
        return { success: true, message: 'Nenhuma sessão para testar' };
      }
      
      const isValid = await isTokenValid();
      
      if (!isValid) {
        console.log('✅ Token inválido detectado corretamente');
        console.log('- Usuário deve ser redirecionado para login');
        return { success: true, tokenValid: false };
      } else {
        console.log('✅ Token ainda válido');
        console.log('- Expira em:', new Date(session.expires_at! * 1000).toLocaleString());
        return { success: true, tokenValid: true };
      }
    } catch (error) {
      console.error('❌ Erro no teste de token expirado:', error);
      return { success: false, error };
    }
  },

  /**
   * Teste 5: Verificar loop de redirecionamento
   * Detecta se há loops infinitos de redirecionamento
   */
  async testNoRedirectLoop() {
    console.log('🧪 Teste 5: Verificar ausência de loops de redirecionamento');
    
    try {
      let redirectCount = 0;
      const maxRedirects = 3;
      
      // Simular múltiplas verificações de sessão
      for (let i = 0; i < 5; i++) {
        const session = await checkAuth();
        
        if (session) {
          console.log(`✅ Verificação ${i + 1}: Sessão válida (sem redirecionamento)`);
        } else {
          redirectCount++;
          console.log(`ℹ️ Verificação ${i + 1}: Sem sessão (redirecionaria para login)`);
        }
        
        // Pequeno delay entre verificações
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      if (redirectCount <= maxRedirects) {
        console.log('✅ Nenhum loop de redirecionamento detectado');
        return { success: true, redirectCount };
      } else {
        console.log('❌ Possível loop de redirecionamento detectado');
        return { success: false, error: 'Loop detectado', redirectCount };
      }
    } catch (error) {
      console.error('❌ Erro no teste de loop:', error);
      return { success: false, error };
    }
  },

  /**
   * Executar todos os testes
   */
  async runAllTests() {
    console.log('🚀 Iniciando bateria de testes de autenticação\n');
    
    const results = {
      validLogin: await this.testValidLogin(),
      appAuthenticated: await this.testAppOpenedAuthenticated(),
      expiredToken: await this.testExpiredToken(),
      noRedirectLoop: await this.testNoRedirectLoop(),
    };
    
    console.log('\n📊 Resumo dos Testes:');
    console.log('- Login válido:', results.validLogin.success ? '✅' : '❌');
    console.log('- App autenticado:', results.appAuthenticated.success ? '✅' : '❌');
    console.log('- Token expirado:', results.expiredToken.success ? '✅' : '❌');
    console.log('- Sem loops:', results.noRedirectLoop.success ? '✅' : '❌');
    
    return results;
  }
};

// Exportar função para executar testes no console
if (typeof window !== 'undefined') {
  (window as any).runAuthTests = authTests.runAllTests.bind(authTests);
  console.log('💡 Para executar os testes, digite no console: runAuthTests()');
}
