'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { checkSupabaseReady } from '@/lib/supabase-guard';
import { useRouter } from 'next/navigation';
import { useDailyLogin } from '@/hooks/useDailyLogin';

export default function LoginPage() {
  const router = useRouter();
  const { logDailyLogin } = useDailyLogin();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'sign_in' | 'sign_up' | 'forgot_password'>('sign_in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLoginCallback = async (userId: string, token: string) => {
    try {
      console.log('[LOGIN] 📞 Chamando login-callback...');
      
      // Chamar endpoint de login-callback para incrementar loginCount
      const response = await fetch('/api/auth/login-callback', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('[LOGIN] ✅ Login-callback bem-sucedido:', {
          loginCount: data.loginCount,
          quizCompleted: data.quizCompleted,
          redirectTo: data.redirectTo,
        });

        // Telemetria
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'login_success', {
            user_id: userId,
            login_count: data.loginCount,
            redirect_to: data.redirectTo,
          });
          
          if (data.redirectTo === '/home') {
            (window as any).gtag('event', 'home_entered', {
              user_id: userId,
            });
          } else {
            (window as any).gtag('event', 'onboarding_redirect', {
              user_id: userId,
            });
          }
        }

        // CORREÇÃO: Usar router.push() ao invés de window.location.href
        console.log('[LOGIN] 🔀 Redirecionando via router.push para:', data.redirectTo);
        await new Promise(resolve => setTimeout(resolve, 300));
        router.push(data.redirectTo);
        router.refresh();
      } else {
        console.warn('[LOGIN] ⚠️ Erro no login-callback, usando fallback');
        
        // Fallback: buscar perfil diretamente
        const profileResponse = await fetch('/api/user-profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          const redirectTo = profileData.quizCompleted ? '/home' : '/onboarding';
          
          console.log('[LOGIN] 🔀 Redirecionando para:', redirectTo);
          await new Promise(resolve => setTimeout(resolve, 300));
          router.push(redirectTo);
          router.refresh();
        } else {
          // Se tudo falhar, ir para onboarding
          console.log('[LOGIN] ⚠️ Erro ao buscar perfil, indo para onboarding');
          await new Promise(resolve => setTimeout(resolve, 300));
          router.push('/onboarding');
          router.refresh();
        }
      }
    } catch (error) {
      console.error('[LOGIN] ❌ Erro no login-callback:', error);
      // Em caso de erro, redirecionar para onboarding por segurança
      await new Promise(resolve => setTimeout(resolve, 300));
      router.push('/onboarding');
      router.refresh();
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    console.log('=== [LOGIN] INICIANDO PROCESSO DE LOGIN ===');
    console.log('[LOGIN] Email:', email);

    try {
      console.log('[LOGIN] Chamando signInWithPassword...');
      const startTime = Date.now();

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      const endTime = Date.now();
      console.log(`[LOGIN] Resposta recebida em ${endTime - startTime}ms`);

      if (signInError) {
        console.error('[LOGIN] ❌ Erro de autenticação:', signInError);
        setError(signInError.message);
        setSubmitting(false);
        return;
      }

      if (data.session) {
        console.log('[LOGIN] ✅ Sessão criada com sucesso!');
        console.log('[LOGIN] User ID:', data.session.user.id);

        // Aguardar para garantir que cookies e localStorage estejam sincronizados
        console.log('[LOGIN] Aguardando sincronização de sessão...');
        await new Promise(resolve => setTimeout(resolve, 800));

        // Verificar se a sessão foi salva usando validação segura
        const guard = await checkSupabaseReady();

        if (guard.isReady && guard.session) {
          console.log('[LOGIN] ✅ Sessão confirmada!');
          
          // Registrar login diário no Supabase (não bloqueia o fluxo)
          logDailyLogin().catch(err => {
            console.log('[LOGIN] ⚠️ Erro ao registrar login (não crítico):', err);
          });
          
          // Chamar login-callback para incrementar loginCount e obter redirecionamento
          await handleLoginCallback(guard.session.user.id, guard.session.access_token);
        } else {
          console.error('[LOGIN] ❌ Sessão NÃO foi persistida!');
          setError('Erro ao salvar sessão. Tente novamente.');
          setSubmitting(false);
        }
      } else {
        console.warn('[LOGIN] ⚠️ Login sem sessão');
        setError('Erro: Sessão não foi criada');
        setSubmitting(false);
      }
    } catch (err) {
      console.error('[LOGIN] ❌ Exceção durante login:', err);
      setError('Erro ao fazer login. Tente novamente.');
      setSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        setSubmitting(false);
        return;
      }

      if (data.session) {
        // Cadastro e login automático
        console.log('[SIGNUP] ✅ Cadastro bem-sucedido!');
        console.log('[SIGNUP] User ID:', data.session.user.id);
        
        // Registrar login diário no Supabase (não bloqueia o fluxo)
        logDailyLogin().catch(err => {
          console.log('[SIGNUP] ⚠️ Erro ao registrar login (não crítico):', err);
        });
        
        // Telemetria
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'sign_up', {
            user_id: data.session.user.id,
          });
        }
        
        // Chamar login-callback (novo usuário sempre vai para onboarding)
        await handleLoginCallback(data.session.user.id, data.session.access_token);
      } else {
        // Email de confirmação enviado
        setError('Verifique seu email para confirmar o cadastro.');
        setSubmitting(false);
      }
    } catch (err) {
      console.error('Erro no cadastro:', err);
      setError('Erro ao criar conta. Tente novamente.');
      setSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/`,
      });

      if (resetError) {
        setError(resetError.message);
        setSubmitting(false);
        return;
      }

      setError('Email de recuperação enviado! Verifique sua caixa de entrada.');
      setSubmitting(false);
    } catch (err) {
      console.error('Erro ao recuperar senha:', err);
      setError('Erro ao enviar email. Tente novamente.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/8f5542a7-c136-497a-822e-8e2a2fb72e5e.png"
            alt="Plano Diário"
            className="h-24 w-auto mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo!</h1>
          <p className="text-gray-600">Entre para continuar sua jornada espiritual</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {error && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${
              error.includes('enviado') || error.includes('Verifique')
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {error}
            </div>
          )}

          {view === 'sign_in' && (
            <form onSubmit={handleSignIn}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Entrando...' : 'Entrar'}
              </button>

              <div className="mt-4 text-center space-y-2">
                <button
                  type="button"
                  onClick={() => setView('forgot_password')}
                  className="text-sm text-amber-600 hover:text-amber-700"
                >
                  Esqueceu sua senha?
                </button>
                <div>
                  <button
                    type="button"
                    onClick={() => setView('sign_up')}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Não tem uma conta? <span className="text-amber-600 font-medium">Cadastre-se</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {view === 'sign_up' && (
            <form onSubmit={handleSignUp}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Criando conta...' : 'Criar conta'}
              </button>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setView('sign_in')}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Já tem uma conta? <span className="text-amber-600 font-medium">Entre</span>
                </button>
              </div>
            </form>
          )}

          {view === 'forgot_password' && (
            <form onSubmit={handleForgotPassword}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Enviando...' : 'Enviar instruções'}
              </button>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setView('sign_in')}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Voltar para login
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade
        </p>
      </div>
    </div>
  );
}
