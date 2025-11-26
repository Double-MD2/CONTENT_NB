'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase';

export default function LoginPage() {
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  
  // ✅ useRef para garantir que o listener seja registrado apenas uma vez
  const listenerRegistered = useRef(false);

  useEffect(() => {
    // ✅ CORREÇÃO 1: Array vazio [] - useEffect roda APENAS UMA VEZ no mount
    // Não recebe objetos, arrays ou funções nas dependências
    
    // Verificar se Supabase está configurado
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      setError('Supabase não está configurado. Configure as variáveis de ambiente.');
      setLoading(false);
      return;
    }

    const supabase = createClient();

    // ✅ CORREÇÃO 2: Verificar sessão atual apenas uma vez
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Usuário já está logado, redirecionar
          window.location.href = '/home';
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error('Erro ao verificar sessão:', err);
        setLoading(false);
      }
    };

    checkSession();

    // ✅ CORREÇÃO 3: Listener registrado apenas uma vez usando useRef
    if (!listenerRegistered.current) {
      listenerRegistered.current = true;
      
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log('🔐 Auth state changed:', event, session?.user?.email);

          if (event === 'SIGNED_IN' && session) {
            console.log('✅ Usuário logado com sucesso, redirecionando...');
            // ✅ CORREÇÃO 4: window.location.href força refresh completo
            // Garante que middleware reconheça a sessão
            window.location.href = '/home';
          } else if (event === 'SIGNED_OUT') {
            console.log('👋 Usuário deslogado');
            setLoading(false);
          }
        }
      );

      // ✅ CORREÇÃO 5: Cleanup sempre retorna unsubscribe
      return () => {
        subscription.unsubscribe();
        listenerRegistered.current = false;
      };
    }
  }, []); // ✅ Array vazio - NUNCA muda de tamanho, NUNCA recebe objetos/arrays

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação antes de enviar
    if (!email || !email.trim()) {
      setError('Por favor, preencha o email.');
      return;
    }
    
    if (!password || !password.trim()) {
      setError('Por favor, preencha a senha.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      console.log('🔐 Iniciando login...');
      
      const supabase = createClient();
      
      // ✅ CORREÇÃO 6: signInWithPassword salva sessão automaticamente
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (signInError) {
        console.error('❌ Erro ao fazer login:', signInError.message);
        setError(signInError.message || 'Credenciais inválidas. Verifique email e senha.');
        setIsSubmitting(false);
        return;
      }

      if (data.session) {
        console.log('✅ Login bem-sucedido! Sessão criada.');
        // ✅ O listener onAuthStateChange detecta SIGNED_IN e redireciona
        // Não fazemos nada aqui para evitar redirecionamento duplo
      }
      
    } catch (err: any) {
      console.error('❌ Erro inesperado:', err);
      setError(`Erro inesperado: ${err?.message || 'Tente novamente.'}`);
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação antes de enviar
    if (!email || !email.trim()) {
      setError('Por favor, preencha o email.');
      return;
    }
    
    if (!password || !password.trim()) {
      setError('Por favor, preencha a senha.');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();
      
      console.log('📝 Tentando cadastro...');
      
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) {
        console.error('❌ Erro ao criar conta:', signUpError.message);
        setError(signUpError.message || 'Erro ao criar conta. Tente novamente.');
        setIsSubmitting(false);
        return;
      }

      console.log('✅ Cadastro bem-sucedido!');

      if (data.session) {
        // Cadastro com sessão imediata (confirmação de email desabilitada)
        // O listener onAuthStateChange vai lidar com o redirecionamento
      } else {
        // Cadastro requer confirmação de email
        setError('Cadastro realizado! Verifique seu email para confirmar.');
        setIsSubmitting(false);
      }
    } catch (err: any) {
      console.error('❌ Erro inesperado ao criar conta:', err);
      setError(`Erro inesperado: ${err?.message || 'Tente novamente.'}`);
      setIsSubmitting(false);
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

  if (error && error.includes('não está configurado')) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Erro de Configuração</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-sm text-gray-500">
              Clique no banner laranja acima para configurar suas variáveis de ambiente do Supabase.
            </p>
          </div>
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
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => {
                setMode('signin');
                setError(null);
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                mode === 'signin'
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => {
                setMode('signup');
                setError(null);
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                mode === 'signup'
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Cadastrar
            </button>
          </div>

          <form onSubmit={mode === 'signin' ? handleSignIn : handleSignUp}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="••••••••"
                />
              </div>

              {error && !error.includes('não está configurado') && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? 'Processando...'
                  : mode === 'signin'
                  ? 'Entrar'
                  : 'Criar conta'}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade
        </p>
      </div>
    </div>
  );
}
