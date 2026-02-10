'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSubscription } from '@/hooks/useSubscription';

interface SubscriptionGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * Componente de proteção para conteúdo PREMIUM
 *
 * REGRAS DE ACESSO:
 * 1. Home e Sidebar são SEMPRE acessíveis (não use SubscriptionGuard nelas)
 * 2. Conteúdo premium (Bíblia, Leitura do Dia, Favoritos, etc.) usa este guard
 * 3. Se tem assinatura ativa (status='active') -> libera acesso
 * 4. Se NÃO tem assinatura ativa -> redireciona para /plans
 *
 * USO:
 * <SubscriptionGuard>
 *   <ConteudoPremium />
 * </SubscriptionGuard>
 */
export function SubscriptionGuard({ children, redirectTo = '/plans' }: SubscriptionGuardProps) {
  const router = useRouter();
  const { isActive, loading } = useSubscription();

  useEffect(() => {
    if (!loading && !isActive) {
      // Usuário não tem acesso premium - redirecionar para planos
      console.log('[SubscriptionGuard] Acesso premium negado - redirecionando para planos');
      router.push(redirectTo);
    }
  }, [isActive, loading, router, redirectTo]);

  // Mostrar loading enquanto verifica
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  // Se não tem acesso, não renderiza nada (vai redirecionar)
  if (!isActive) {
    return null;
  }

  // Tem acesso - renderiza conteúdo
  return <>{children}</>;
}
