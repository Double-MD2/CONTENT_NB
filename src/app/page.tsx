'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Verificar se o onboarding foi completado
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    
    if (onboardingCompleted === 'true') {
      router.push('/home');
    } else {
      router.push('/onboarding');
    }
  }, [router, isMounted]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-gray-800">Notas Bíblicas</h1>
        <p className="text-gray-600 mt-2">Carregando...</p>
      </div>
    </div>
  );
}
