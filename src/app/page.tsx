'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { isValidSession } from '@/lib/auth-helpers';

export default function Home() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkUser = async () => {
      try {
        console.log('[ROOT] 🔍 Verificando autenticação...');
        console.log('[ROOT] 🌍 URL:', window.location.href);

        // CORREÇÃO: Aguardar apenas 1 tentativa (middleware já protege as rotas)
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        console.log('[ROOT] Resultado:', {
          hasSession: !!session,
          hasUser: !!session?.user,
          userId: session?.user?.id,
          email: session?.user?.email,
          isValid: isValidSession(session),
          error: sessionError?.message,
        });

        if (!isMounted) return;

        // CRÍTICO: Usar validação robusta da sessão
        if (isValidSession(session)) {
          console.log('[ROOT] ✅ Usuário autenticado - redirecionando para /dashboard');
          router.replace('/dashboard');
        } else {
          console.log('[ROOT] ❌ Nenhuma sessão válida - redirecionando para /login');
          router.replace('/login');
        }
      } catch (error) {
        console.error('[ROOT] ❌ Erro ao verificar sessão:', error);
        if (isMounted) {
          router.replace('/login');
        }
      } finally {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    };

    checkUser();

    return () => {
      isMounted = false;
    };
  }, [router]);

  // Mostrar spinner ENQUANTO está checando
  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return null;
}
