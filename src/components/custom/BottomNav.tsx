'use client';

import { Home, BookOpen, Heart } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useSidebar } from '@/contexts/SidebarContext';
import { useSubscription } from '@/hooks/useSubscription';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const { isSidebarOpen } = useSidebar();
  const { isActive: hasAccess } = useSubscription();

  const isActive = (path: string) => {
    if (path === '/home') {
      return pathname === '/home';
    }
    return pathname.startsWith(path);
  };

  useEffect(() => {
    // Adiciona padding-bottom ao body baseado na altura do footer
    const updateBodyPadding = () => {
      if (navRef.current) {
        const navHeight = navRef.current.offsetHeight;
        document.body.style.paddingBottom = `${navHeight}px`;
      }
    };

    updateBodyPadding();
    window.addEventListener('resize', updateBodyPadding);

    // Controla a visibilidade do footer baseado no scroll
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Se rolou para baixo e passou de 50px, esconde o footer
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } 
      // Se rolou para cima, mostra o footer
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateBodyPadding);
      document.body.style.paddingBottom = '0';
    };
  }, [lastScrollY]);

  // Ocultar o rodapé quando a sidebar estiver aberta
  if (isSidebarOpen) {
    return null;
  }

  /**
   * Verifica acesso premium antes de navegar
   * Bíblia e Favoritos são PREMIUM - requerem assinatura ou trial
   */
  const handleNavigation = (path: string) => {
    // Início é sempre liberado
    if (path === '/home') {
      router.push(path);
      return;
    }

    // Bíblia e Favoritos requerem acesso premium
    if (!hasAccess) {
      console.log('[BOTTOM_NAV] Acesso premium negado - redirecionando para planos');
      router.push('/plans');
      return;
    }

    // Tem acesso - navegar normalmente
    router.push(path);
  };

  return (
    <nav 
      ref={navRef}
      className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-around py-3">
          <button
            onClick={() => handleNavigation('/home')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive('/home')
                ? 'text-amber-500'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Início</span>
          </button>
          
          <button
            onClick={() => handleNavigation('/bible')}
            className={`flex flex-col items-center gap-1 transition-colors relative ${
              isActive('/bible')
                ? 'text-blue-500'
                : 'text-gray-400 hover:text-gray-600'
            } ${!hasAccess ? 'opacity-60' : ''}`}
          >
            <BookOpen className="w-6 h-6" />
            <span className="text-xs font-medium">Bíblia</span>
            {!hasAccess && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full border-2 border-white"></div>
            )}
          </button>
          
          <button
            onClick={() => handleNavigation('/favorites')}
            className={`flex flex-col items-center gap-1 transition-colors relative ${
              isActive('/favorites')
                ? 'text-amber-500'
                : 'text-gray-400 hover:text-gray-600'
            } ${!hasAccess ? 'opacity-60' : ''}`}
          >
            <Heart className="w-6 h-6" />
            <span className="text-xs font-medium">Favoritos</span>
            {!hasAccess && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full border-2 border-white"></div>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
