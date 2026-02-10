'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import {
  translateAuthError,
  validateEmail,
  validatePassword,
  SUCCESS_MESSAGES,
  PASSWORD_HINT,
} from '@/lib/auth/errorMessagesPtBR';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [view, setView] = useState<'sign_in' | 'sign_up' | 'forgot_password'>('sign_in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginCallback = async (session: any) => {
    try {
      console.log('[LOGIN] 📞 Chamando login-callback...');

      // Chamar endpoint de login-callback para incrementar loginCount
      const response = await fetch('/api/auth/login-callback', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        console.error('[LOGIN] ❌ Erro no login-callback (status:', response.status, ')');
        // Fallback: redirecionar para /dashboard
        console.log('[LOGIN] 🔀 Usando fallback - redirecionando para /dashboard');
        setSubmitting(false); // CRÍTICO: Liberar botão
        router.replace('/dashboard');
        return;
      }

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        console.error('[LOGIN] ❌ login-callback retornou não-JSON');
        setSubmitting(false); // CRÍTICO: Liberar botão
        router.replace('/dashboard');
        return;
      }

      const data = await response.json();
      console.log('[LOGIN] ✅ Login-callback bem-sucedido:', {
        loginCount: data.loginCount,
        onboardingCompleted: data.onboardingCompleted,
        redirectTo: data.redirectTo,
      });

      // CORREÇÃO: Usar router.replace ao invés de window.location.href
      console.log('[LOGIN] 🔀 Redirecionando para:', data.redirectTo);
      setSubmitting(false); // CRÍTICO: Liberar botão antes do redirect
      router.replace(data.redirectTo);
    } catch (error) {
      console.error('[LOGIN] ❌ Erro no login-callback:', error);
      // Em caso de erro, redirecionar para dashboard por segurança
      setSubmitting(false); // CRÍTICO: Liberar botão
      router.replace('/dashboard');
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    console.log('=== [LOGIN] INICIANDO PROCESSO DE LOGIN ===');
    console.log('[LOGIN] Email:', email);

    // Validação local antes de enviar ao Supabase
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      setSubmitting(false);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      setSubmitting(false);
      return;
    }

    // Detectar se está no preview
    const isPreview = window.location.hostname.endsWith('.lasy.app');

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
        // Traduzir erro para pt-BR
        setError(translateAuthError(signInError));
        setSubmitting(false);
        return;
      }

      if (!data.session) {
        console.warn('[LOGIN] ⚠️ Login sem sessão');
        setError('Erro ao criar sessão. Tente novamente.');
        setSubmitting(false);
        return;
      }

      console.log('[LOGIN] ✅ Sessão criada com sucesso!');
      console.log('[LOGIN] User ID:', data.session.user.id);

      // CRÍTICO: "Aquecer" auth chamando getSession
      console.log('[LOGIN] 🔥 Aquecendo auth...');
      await supabase.auth.getSession();

      // DEBUG: Verificar cookies
      console.log('[LOGIN] 🍪 Cookies:', document.cookie);
      console.log('[LOGIN] 🍪 Verificar no DevTools > Application > Cookies se existe sb-...');

      // CORREÇÃO PREVIEW: Aguardar persistência dos cookies antes do redirect
      if (isPreview) {
        console.log('[LOGIN - PREVIEW] ⏳ Aguardando persistência dos cookies (100ms)...');
        await new Promise(resolve => setTimeout(resolve, 100));

        // Verificar se getUser() retorna o usuário autenticado
        console.log('[LOGIN - PREVIEW] 🔍 Validando persistência...');
        const { data: { user: validatedUser }, error: validationError } = await supabase.auth.getUser();

        if (validatedUser) {
          console.log('[LOGIN - PREVIEW] ✅ Usuário validado:', validatedUser.id);
        } else {
          console.warn('[LOGIN - PREVIEW] ⚠️ Validação falhou:', validationError?.message);
          // Aguardar mais um pouco
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        // Marcar no sessionStorage que acabou de fazer login (para grace period)
        sessionStorage.setItem('just-logged-in', Date.now().toString());
      }

      // CORREÇÃO: Chamar handleLoginCallback diretamente com a sessão
      // Não precisa de setTimeout ou checkSupabaseReady
      await handleLoginCallback(data.session);
    } catch (err) {
      console.error('[LOGIN] ❌ Exceção durante login:', err);
      // Traduzir exceção para pt-BR
      setError(translateAuthError(err));
      setSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    // Validação local antes de enviar ao Supabase
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      setSubmitting(false);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      setSubmitting(false);
      return;
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        // Traduzir erro para pt-BR
        setError(translateAuthError(signUpError));
        setSubmitting(false);
        return;
      }

      if (data.session) {
        // Conta criada e logado automaticamente
        console.log('[SIGNUP] ✅ Conta criada com sucesso!');
        await handleLoginCallback(data.session);
      } else {
        // Email de confirmação enviado - usar mensagem de sucesso em pt-BR
        setSuccessMessage(SUCCESS_MESSAGES.ACCOUNT_CREATED);
        setSubmitting(false);
      }
    } catch (err) {
      console.error('[SIGNUP] ❌ Erro ao criar conta:', err);
      // Traduzir exceção para pt-BR
      setError(translateAuthError(err));
      setSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    // Validação local do email antes de enviar ao Supabase
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      setSubmitting(false);
      return;
    }

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) {
        // Traduzir erro para pt-BR
        setError(translateAuthError(resetError));
        setSubmitting(false);
        return;
      }

      // Usar mensagem de sucesso em pt-BR
      setSuccessMessage(SUCCESS_MESSAGES.PASSWORD_RESET_EMAIL_SENT);
      setSubmitting(false);
    } catch (err) {
      console.error('[RESET] ❌ Erro ao enviar email:', err);
      // Traduzir exceção para pt-BR
      setError(translateAuthError(err));
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/8f5542a7-c136-497a-822e-8e2a2fb72e5e.png"
              alt="Plano Diário"
              className="h-20 w-auto"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setView('sign_in')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                view === 'sign_in'
                  ? 'bg-amber-400 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setView('sign_up')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                view === 'sign_up'
                  ? 'bg-amber-400 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Criar Conta
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">{successMessage}</p>
            </div>
          )}

          {/* Sign In Form */}
          {view === 'sign_in' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="seu@email.com"
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="••••••••"
                    required
                    disabled={submitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setView('forgot_password')}
                className="text-sm text-amber-600 hover:text-amber-700 font-medium"
              >
                Esqueceu sua senha?
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-white py-3 rounded-lg font-semibold hover:from-amber-500 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
          )}

          {/* Sign Up Form */}
          {view === 'sign_up' && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label htmlFor="email-signup" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email-signup"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="seu@email.com"
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <label htmlFor="password-signup" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder={PASSWORD_HINT}
                    required
                    minLength={8}
                    disabled={submitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-white py-3 rounded-lg font-semibold hover:from-amber-500 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Criando conta...' : 'Criar Conta'}
              </button>
            </form>
          )}

          {/* Forgot Password Form */}
          {view === 'forgot_password' && (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label htmlFor="email-reset" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email-reset"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="seu@email.com"
                  required
                  disabled={submitting}
                />
              </div>

              <button
                type="button"
                onClick={() => setView('sign_in')}
                className="text-sm text-amber-600 hover:text-amber-700 font-medium"
              >
                ← Voltar para login
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-white py-3 rounded-lg font-semibold hover:from-amber-500 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Enviando...' : 'Enviar Email de Recuperação'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
