'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Usuário está logado, redirecionar para home
          router.replace('/home');
        } else {
          // Usuário não está logado, redirecionar para login
          router.replace('/login');
        }
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
        router.replace('/login');
      } finally {
        setIsChecking(false);
      }
    };

    checkUser();
  }, []);

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
