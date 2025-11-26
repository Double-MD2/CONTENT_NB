'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth } from '@/lib/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function AuthGuard({ children, redirectTo = '/login' }: AuthGuardProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      const session = await checkAuth();
      
      if (!isMounted) return;

      if (session) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.replace(redirectTo);
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, [router, redirectTo]);

  // Mostrar loading enquanto verifica
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Não renderizar nada se não estiver autenticado (já está redirecionando)
  if (!isAuthenticated) {
    return null;
  }

  // Renderizar conteúdo protegido
  return <>{children}</>;
}
