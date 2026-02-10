'use client';

import { Home, BookOpen, Heart } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useSidebar } from '@/contexts/SidebarContext';
import { useSubscription } from '@/hooks/useSubscription';

// Constantes de threshold para ajuste fino
const BOTTOM_HIDE_THRESHOLD = 180; // px - esconde quando está nessa distância do fim
const BOTTOM_SHOW_THRESHOLD = 260; // px - só mostra novamente quando estiver mais longe
const LOCK_DURATION_MS = 250; // ms - trava ao entrar na zona de fim para evitar flicker

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { isSidebarOpen } = useSidebar();
  const { isActive: hasAccess } = useSubscription();

  // Refs para controle de scroll sem causar rerenders
  const lastScrollYRef = useRef(0);
  const isNearBottomRef = useRef(false);
  const lockUntilRef = useRef(0);
  const tickingRef = useRef(false);
  const prevVisibleRef = useRef(true);

  // Safe pathname: só usar após mount para evitar hydration mismatch
  const safePathname = mounted ? pathname : '';

  const isActive = (path: string) => {
    if (path === '/home') {
      return safePathname === '/home';
    }
    return safePathname.startsWith(path);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

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
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const viewport = window.innerHeight;
          const docHeight = document.documentElement.scrollHeight;
          const distanceToBottom = docHeight - (currentScrollY + viewport);
          const now = Date.now();

          // 1) HYSTERESIS para nearBottom (usa refs, não state)
          const wasNearBottom = isNearBottomRef.current;
          if (!isNearBottomRef.current && distanceToBottom <= BOTTOM_HIDE_THRESHOLD) {
            isNearBottomRef.current = true;
            // Ativou nearBottom: criar lock temporal para evitar flicker no bounce
            lockUntilRef.current = now + LOCK_DURATION_MS;
          } else if (isNearBottomRef.current && distanceToBottom >= BOTTOM_SHOW_THRESHOLD) {
            isNearBottomRef.current = false;
            lockUntilRef.current = 0; // Limpa lock ao sair da zona
          }

          // 2) Durante o LOCK: forçar oculto e ignorar o resto
          if (now < lockUntilRef.current) {
            if (prevVisibleRef.current !== false) {
              setIsVisible(false);
              prevVisibleRef.current = false;
            }
            lastScrollYRef.current = currentScrollY;
            tickingRef.current = false;
            return;
          }

          // 3) PRIORIDADE 1: Se está perto do fim, SEMPRE esconder
          if (isNearBottomRef.current) {
            if (prevVisibleRef.current !== false) {
              setIsVisible(false);
              prevVisibleRef.current = false;
            }
            lastScrollYRef.current = currentScrollY;
            tickingRef.current = false;
            return;
          }

          // 4) Verificar se página tem pouco conteúdo (não rola ou rola pouco)
          const isShortPage = docHeight <= viewport + 100;
          if (isShortPage) {
            if (prevVisibleRef.current !== false) {
              setIsVisible(false);
              prevVisibleRef.current = false;
            }
            lastScrollYRef.current = currentScrollY;
            tickingRef.current = false;
            return;
          }

          // 5) PRIORIDADE 2: Lógica normal de direção do scroll
          let shouldBeVisible = prevVisibleRef.current;

          // Se rolou para baixo e passou de 50px, esconde o footer
          if (currentScrollY > lastScrollYRef.current && currentScrollY > 50) {
            shouldBeVisible = false;
          }
          // Se rolou para cima, mostra o footer
          else if (currentScrollY < lastScrollYRef.current) {
            shouldBeVisible = true;
          }

          // Só atualiza state se o valor realmente mudou (evita rerenders)
          if (prevVisibleRef.current !== shouldBeVisible) {
            setIsVisible(shouldBeVisible);
            prevVisibleRef.current = shouldBeVisible;
          }

          lastScrollYRef.current = currentScrollY;
          tickingRef.current = false;
        });

        tickingRef.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateBodyPadding);
      document.body.style.paddingBottom = '0';
    };
  }, []); // Sem dependências - tudo via refs agora

  // Ocultar o rodapé quando a sidebar estiver aberta
  if (isSidebarOpen) {
    return null;
  }

  /**
   * Verifica acesso premium antes de navegar
   * Bíblia e Favoritos são PREMIUM - requerem assinatura ativa
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
