'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se usuário já está logado
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/home');
      } else {
        setLoading(false);
      }
    });

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push('/home');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

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
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#f59e0b',
                    brandAccent: '#d97706',
                  },
                },
              },
              className: {
                container: 'auth-container',
                button: 'auth-button',
                input: 'auth-input',
              },
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Email',
                  password_label: 'Senha',
                  button_label: 'Entrar',
                  loading_button_label: 'Entrando...',
                  social_provider_text: 'Entrar com {{provider}}',
                  link_text: 'Já tem uma conta? Entre',
                },
                sign_up: {
                  email_label: 'Email',
                  password_label: 'Senha',
                  button_label: 'Criar conta',
                  loading_button_label: 'Criando conta...',
                  social_provider_text: 'Cadastrar com {{provider}}',
                  link_text: 'Não tem uma conta? Cadastre-se',
                },
                forgotten_password: {
                  email_label: 'Email',
                  button_label: 'Enviar instruções',
                  loading_button_label: 'Enviando...',
                  link_text: 'Esqueceu sua senha?',
                },
              },
            }}
            providers={[]}
          />
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade
        </p>
      </div>
    </div>
  );
}
