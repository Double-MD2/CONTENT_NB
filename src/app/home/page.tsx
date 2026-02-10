'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function HomeRedirect() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkUserAndRedirect = async () => {
      try {
        console.log('[HOME-REDIRECT] 🔍 Verificando autenticação via cookies...');

        // Detectar se está no preview
        const isPreview = typeof window !== 'undefined' && window.location.hostname.endsWith('.lasy.app');

        // CORREÇÃO PREVIEW: Implementar grace period
        if (isPreview) {
          const justLoggedIn = sessionStorage.getItem('just-logged-in');
          if (justLoggedIn) {
            const loginTime = parseInt(justLoggedIn, 10);
            const elapsed = Date.now() - loginTime;
            const GRACE_PERIOD_MS = 2000; // 2 segundos

            if (elapsed < GRACE_PERIOD_MS) {
              const waitTime = GRACE_PERIOD_MS - elapsed;
              console.log(`[HOME-REDIRECT - PREVIEW] ⏳ Grace period ativo. Aguardando ${waitTime}ms...`);
              await new Promise(resolve => setTimeout(resolve, waitTime));
            }

            // Limpar flag após grace period
            sessionStorage.removeItem('just-logged-in');
          }
        }

        // Usar getUser() em vez de getSession() - lê cookies SSR
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        console.log('[HOME-REDIRECT]', {
          hasUser: !!user,
          userId: user?.id,
          email: user?.email,
          error: authError?.message,
          isPreview,
        });

        if (!isMounted) return;

        // Se tiver usuário autenticado, redirecionar para dashboard
        if (user) {
          console.log('[HOME-REDIRECT] ✅ Usuário autenticado:', user.id);
          router.replace('/dashboard');
        } else {
          // Se não tiver usuário, o middleware vai cuidar do redirect para /login
          // Não fazer redirect aqui para evitar loop
          console.log('[HOME-REDIRECT] ⚠️ Sem usuário - deixando middleware redirecionar');
        }
      } catch (error) {
        console.error('[HOME-REDIRECT] ❌ Erro ao verificar usuário:', error);
      } finally {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    };

    checkUserAndRedirect();

    return () => {
      isMounted = false;
    };
  }, [router]);

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
