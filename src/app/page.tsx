'use client';

import { useEffect, useState } from 'react';
import { checkSupabaseReady } from '@/lib/supabase-guard';
import { useRouter } from 'next/navigation';
import { useDailyLogin } from '@/hooks/useDailyLogin';

export default function Home() {
  const router = useRouter();
  const { logDailyLogin } = useDailyLogin();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkUser = async () => {
      try {
        console.log('[HOME] 🔍 Verificando autenticação...');

        // Usar validação segura do Supabase
        const guard = await checkSupabaseReady();

        if (!isMounted) return;

        if (guard.isReady && guard.session) {
          console.log('[HOME] ✅ Usuário autenticado, redirecionando para /home');
          
          // Registrar login diário ao restaurar sessão (não bloqueia o fluxo)
          logDailyLogin().catch(err => {
            console.log('[HOME] ⚠️ Erro ao registrar login (não crítico):', err);
          });
          
          router.replace('/home');
        } else {
          console.log('[HOME] ❌ Usuário não autenticado, redirecionando para /login');
          router.replace('/login');
        }
      } catch (error) {
        console.error('[HOME] ❌ Erro ao verificar sessão:', error);
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
  }, [router, logDailyLogin]);

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
