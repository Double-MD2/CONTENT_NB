'use client';

// LOG IMEDIATO - ANTES DE QUALQUER IMPORT
console.log('🏠 [HOME] Arquivo page.tsx carregado!');

import { useState, useEffect } from 'react';
import { Menu, Bell, Clock, ChevronDown, Home, BookOpen, Heart, User, Users, MessageCircle, ShoppingCart, Star, Sun, Moon, RefreshCw } from 'lucide-react';
import { DailyContent } from '@/lib/types';
import Sidebar from '@/components/custom/sidebar';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useIncrementLoginOnce } from '@/hooks/useIncrementLoginOnce';
import { useLogDailyLogin } from '@/hooks/useLogDailyLogin';
import WeekActivityStreak from '@/components/custom/WeekActivityStreak';
import { useWeekStreak } from '@/hooks/useWeekStreak';
import { useSubscription } from '@/hooks/useSubscription';
import PrayerFloatingButton from '@/components/custom/PrayerFloatingButton';
import { checkOnboardingStatus } from '@/lib/onboarding-guard';
import { loopGuard, getRedirectOrigin, buildRedirectUrl } from '@/lib/loop-guard';
import { useTheme } from 'next-themes';
import { getUserSpiritualJourney, canChangeTheme as checkCanChangeTheme, getThemeInfo } from '@/lib/spiritual-journey';

const mockContents: DailyContent[] = [
  {
    id: '0',
    type: 'for-you',
    title: 'Para Você',
    content: 'Escolha um tema para receber conteúdos feitos para o seu momento.',
    duration: '10 min',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=400&fit=crop',
    completed: false,
  },
  {
    id: '1',
    type: 'lectionary',
    title: 'Leitura do Dia',
    content: 'Leituras diárias conforme o Calendário Romano Geral (API CNBB)',
    duration: '5 min',
    image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop',
    completed: false,
  },
  {
    id: '2',
    type: 'verse',
    title: 'Versículo do Dia',
    content: '',
    reflection: 'Versículos sobre o amor incondicional de Deus e com reflexões para internalizar no coração',
    duration: '3 min',
    image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop',
    completed: false,
  },
  {
    id: '4',
    type: 'prayer',
    title: 'Oração do Dia',
    content: 'Senhor, guia meus passos hoje. Que eu possa ser luz para aqueles ao meu redor...',
    duration: '2 min',
    image: 'https://images.unsplash.com/photo-1445445290350-18a3b86e0b5a?w=800&h=400&fit=crop&q=80',
    completed: false,
  },
  {
    id: '3',
    type: 'devotional',
    title: 'Conexão',
    content: 'Responda perguntas sobre sua jornada espiritual e personalize sua experiência no app.',
    questions: [
      'Quão próximo você se sente de Deus?',
      'Quão importante é a fé na sua vida?',
      'Com que frequência você ora?',
      'Sente que está evoluindo na relação com Deus?',
      'Quão envolvido você está em atividades da sua comunidade religiosa?',
    ],
    duration: '7 min',
    image: 'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop&q=80',
    completed: false,
  },
  {
    id: '5',
    type: 'gratitude',
    title: 'Agradecimento a Deus',
    content: 'Hoje sou grato por...',
    duration: '3 min',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&q=80',
    completed: false,
  },
];

/**
 * Retorna a data atual no fuso America/Sao_Paulo no formato YYYY-MM-DD
 * CRÍTICO: Garante que o "dia atual" seja sempre baseado no horário local do usuário
 */
const getTodayInBrazil = (): string => {
  const nowUTC = new Date();
  
  const brazilDateString = nowUTC.toLocaleString('en-US', { 
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  
  const [month, day, year] = brazilDateString.split(/[\/,\s]+/);
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

const createBrazilDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day, 0, 0, 0, 0);
};

export default function HomePage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useIncrementLoginOnce();
  useLogDailyLogin();
  const { streak } = useWeekStreak();
  const { isActive: hasAccess, isInTrial, loading: subscriptionLoading } = useSubscription();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarInitialTab, setSidebarInitialTab] = useState<'account' | 'contribute' | 'frequency' | 'store'>('account');
  const [contents, setContents] = useState<DailyContent[]>(mockContents);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [weeklyAccess, setWeeklyAccess] = useState<boolean[]>([false, false, false, false, false, false, false]);
  const [canChangeTheme, setCanChangeTheme] = useState<boolean>(true);
  const [daysRemaining, setDaysRemaining] = useState<number>(0);
  const [showBlockedMessage, setShowBlockedMessage] = useState<boolean>(false);
  const [currentThemeName, setCurrentThemeName] = useState<string>('');

  useEffect(() => {
    initializeUser();
  }, []);

  const initializeUser = async () => {
    try {
      console.log('[HOME] 🔍 Iniciando verificação de sessão...');

      const isPreview = typeof window !== 'undefined' && window.location.hostname.endsWith('.lasy.app');

      if (isPreview) {
        const justLoggedIn = sessionStorage.getItem('just-logged-in');
        if (justLoggedIn) {
          const loginTime = parseInt(justLoggedIn, 10);
          const elapsed = Date.now() - loginTime;
          const GRACE_PERIOD_MS = 2000;

          if (elapsed < GRACE_PERIOD_MS) {
            const waitTime = GRACE_PERIOD_MS - elapsed;
            console.log(`[HOME - PREVIEW] ⏳ Grace period ativo. Aguardando ${waitTime}ms...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
          }

          sessionStorage.removeItem('just-logged-in');
        }
      }

      let session = null;
      let retries = 0;
      const maxRetries = 3;

      while (retries < maxRetries) {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        if (currentSession) {
          session = currentSession;
          break;
        }
        retries++;
        if (retries < maxRetries) {
          const waitTime = isPreview ? 500 : 1000;
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }

      if (!session) {
        console.error('[HOME] ❌ Nenhuma sessão encontrada');
        return;
      }

      const currentUserId = session.user.id;
      setUserId(currentUserId);

      const onboardingStatus = await checkOnboardingStatus(currentUserId);

      if (onboardingStatus.shouldRedirect && onboardingStatus.redirectTo === '/onboarding') {
        const fromOrigin = getRedirectOrigin();
        const isLoop = loopGuard.detectLoop('/home', '/onboarding');

        if (isLoop) {
          alert(
            'Detectamos um problema de redirecionamento. Por favor, entre em contato com o suporte.'
          );
          setLoading(false);
          return;
        }

        const redirectUrl = buildRedirectUrl('/onboarding', '/home');
        router.replace(redirectUrl);
        return;
      }

      try {
        const response = await fetch(`/api/user?userId=${currentUserId}`);
        const contentType = response.headers.get('content-type');

        if (response.ok && contentType?.includes('application/json')) {
          const data = await response.json();

          if (data.userData && data.accessHistory?.length > 0) {
            const weekAccess = calculateWeeklyAccess(data.accessHistory);
            setWeeklyAccess(weekAccess);
          } else {
            await createInitialUserData(currentUserId);
          }

          await registerTodayAccess(currentUserId);
        }
      } catch (apiError) {
        console.warn('⚠️ Erro ao buscar dados do usuário:', apiError);
      }

      // Buscar jornada espiritual do Supabase
      const journey = await getUserSpiritualJourney(currentUserId);

      // Verificar se pode trocar de tema
      if (journey) {
        const changeStatus = checkCanChangeTheme(journey);
        setCanChangeTheme(changeStatus.allowed);
        setDaysRemaining(changeStatus.daysRemaining);

        // Buscar informações do tema
        const themeInfo = getThemeInfo(journey.current_theme);
        if (themeInfo) {
          setCurrentThemeName(themeInfo.name);
        }
      }

      // Atualizar card "Para Você" com tema configurado do Supabase
      const updatedMockContents = mockContents.map((content) => {
        if (content.id === '0' && content.type === 'for-you' && journey) {
          const themeInfo = getThemeInfo(journey.current_theme);
          return {
            ...content,
            content: `Conteúdo espiritual personalizado para você`,
            theme: themeInfo?.name || journey.current_theme,
          };
        }
        return content;
      });

      const saved = localStorage.getItem('dailyContents');
      if (saved) {
        const savedContents = JSON.parse(saved);
        const updatedContents = savedContents.map((content: DailyContent) => {
          if (content.id === '0' && content.type === 'for-you' && journey) {
            const themeInfo = getThemeInfo(journey.current_theme);
            return {
              ...content,
              content: `Conteúdo espiritual personalizado para você`,
              theme: themeInfo?.name || journey.current_theme,
            };
          }
          if (content.id === '1' && content.type === 'lectionary') {
            return { ...content, content: 'Leituras diárias conforme o Calendário Romano Geral (API CNBB)' };
          }
          if (content.id === '2' && content.type === 'verse') {
            return { ...content, reflection: 'Versículos sobre o amor incondicional de Deus e com reflexões para internalizar no coração' };
          }
          if (content.id === '4' && content.type === 'prayer') {
            return { ...content, image: 'https://images.unsplash.com/photo-1445445290350-18a3b86e0b5a?w=800&h=400&fit=crop&q=80' };
          }
          return content;
        });
        setContents(updatedContents);
        localStorage.setItem('dailyContents', JSON.stringify(updatedContents));
      } else {
        setContents(updatedMockContents);
      }

      setLoading(false);
    } catch (error) {
      console.error('Erro ao inicializar usuário:', error);
      setLoading(false);
    }
  };

  const calculateWeeklyAccess = (history: any[]): boolean[] => {
    const todayString = getTodayInBrazil();
    const today = createBrazilDate(todayString);
    const currentDayOfWeek = today.getDay();
    
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDayOfWeek);
    startOfWeek.setHours(0, 0, 0, 0);
    
    const weekAccess = [false, false, false, false, false, false, false];
    
    for (let i = 0; i < 7; i++) {
      const checkDate = new Date(startOfWeek);
      checkDate.setDate(startOfWeek.getDate() + i);
      const dateString = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
      
      const accessed = history.some(record => {
        const recordDate = new Date(record.access_date).toISOString().split('T')[0];
        return recordDate === dateString && record.accessed === true;
      });
      
      weekAccess[i] = accessed;
    }
    
    return weekAccess;
  };

  const createInitialUserData = async (currentUserId: string) => {
    try {
      const todayString = getTodayInBrazil();

      await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUserId,
          consecutiveDays: 1,
          lastAccessDate: new Date().toISOString(),
          onboardingCompleted: false
        })
      });

      const weekAccess = [false, false, false, false, false, false, false];
      const todayDate = createBrazilDate(todayString);
      weekAccess[todayDate.getDay()] = true;
      setWeeklyAccess(weekAccess);
    } catch (error) {
      console.error('Erro ao criar dados iniciais:', error);
    }
  };

  const registerTodayAccess = async (currentUserId: string) => {
    try {
      console.log('[HOME] 📝 Registrando acesso de hoje...');

      await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUserId,
          consecutiveDays: streak,
          lastAccessDate: new Date().toISOString(),
          onboardingCompleted: true
        })
      });

      console.log('[HOME] ✅ Dados do usuário atualizados');
    } catch (error) {
      console.error('[HOME] ❌ Erro ao registrar acesso:', error);
    }
  };

  const toggleComplete = (id: string) => {
    const updated = contents.map(content =>
      content.id === id ? { ...content, completed: !content.completed } : content
    );
    setContents(updated);
    localStorage.setItem('dailyContents', JSON.stringify(updated));
  };

  const toggleExpand = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleCardClick = async (content: DailyContent) => {
    if (!hasAccess) {
      router.push('/plans');
      return;
    }

    if (content.type === 'for-you') {
      // Verificar se já tem jornada no Supabase
      if (userId) {
        const journey = await getUserSpiritualJourney(userId);
        if (journey) {
          window.location.href = '/para-voce';
        } else {
          window.location.href = '/para-voce/temas';
        }
      } else {
        window.location.href = '/para-voce/temas';
      }
    } else if (content.type === 'gratitude') {
      window.location.href = '/gratitude';
    } else if (content.type === 'lectionary') {
      window.location.href = '/leitura-do-dia';
    } else if (content.type === 'verse') {
      window.location.href = '/versiculo-do-dia';
    } else if (content.type === 'prayer') {
      window.location.href = '/oracao-do-dia';
    } else if (content.type === 'devotional') {
      window.location.href = '/conexao';
    }
  };

  const handlePremiumClick = (route: string) => {
    if (!hasAccess) {
      router.push('/plans');
    } else {
      router.push(route);
    }
  };

  const openSidebarWithTab = (tab: 'account' | 'contribute' | 'frequency' | 'store') => {
    setSidebarInitialTab(tab);
    setSidebarOpen(true);
  };

  const handleChangeTheme = async () => {
    if (!userId) return;

    // Verificar se tem jornada no Supabase
    const journey = await getUserSpiritualJourney(userId);

    if (!journey) {
      // Se não tem jornada, vai direto para seleção
      router.push('/para-voce/temas');
      return;
    }

    // Se tem jornada, verificar se pode trocar (regra de 7 dias)
    if (!canChangeTheme) {
      setShowBlockedMessage(true);
      return;
    }

    // Se pode trocar, vai para seleção de tema
    router.push('/para-voce/temas');
  };

  if (loading || subscriptionLoading) {
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-40 transition-colors">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => openSidebarWithTab('account')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>

            <div className="flex items-center gap-2">
              <img src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/8f5542a7-c136-497a-822e-8e2a2fb72e5e.png" alt="Plano Diário" className="h-16 w-auto" />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 hover:bg-amber-100 dark:hover:bg-amber-900 rounded-lg transition-all border border-amber-200 dark:border-amber-700"
                title="Trocar tema"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                )}
              </button>

              <button
                onClick={() => openSidebarWithTab('frequency')}
                className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-3 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 animate-pulse" />
                  <p className="text-lg font-bold leading-none lasy-highlight">{streak}</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {isInTrial && (
          <div className="mb-6 bg-gradient-to-r from-amber-400 to-amber-600 rounded-2xl p-4 text-white shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Star className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="font-bold">Período de Teste Ativo</p>
                <p className="text-sm text-white/90">Você tem acesso completo por 3 dias!</p>
              </div>
            </div>
          </div>
        )}

        <WeekActivityStreak />

        <div className="grid grid-cols-4 gap-3 mb-6 mt-8">
          <button 
            onClick={() => handlePremiumClick('/bible')}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-700 text-center">Bíblia</span>
          </button>

          <button 
            onClick={() => openSidebarWithTab('contribute')}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-700 text-center">Contribuir</span>
          </button>

          <button 
            onClick={() => openSidebarWithTab('store')}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-700 text-center">Shop</span>
          </button>

          <button 
            onClick={() => router.push('/chat')}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-700 text-center">Chat</span>
          </button>
        </div>

        {/* Content Cards - Click direto no card */}
        <div className="space-y-4">
          {contents.map((content) => (
            <div
              key={content.id}
              onClick={() => handleCardClick(content)}
              className="bg-white rounded-2xl shadow-md overflow-hidden transition-all hover:shadow-lg cursor-pointer active:scale-98 relative"
            >
              <div
                className="relative h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${content.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white/90 text-sm mb-2">
                    <Clock className="w-4 h-4" />
                    <span>{content.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {content.title === 'Devoção Diária' ? 'Conexão' : content.title}
                  </h3>
                </div>
              </div>

              <div className={`p-4 ${content.type === 'for-you' && content.theme ? 'pb-12' : ''}`}>
                {/* Card "Para Você" - Mostrar tema se configurado */}
                {content.type === 'for-you' && content.theme && (
                  <div className="mb-3">
                    <p className="text-xs text-amber-600 font-semibold">Tema atual: {content.theme}</p>
                  </div>
                )}

                {content.reflection && (
                  <div className="bg-amber-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700 italic">{content.reflection}</p>
                  </div>
                )}

                {content.content && !content.reflection && (
                  <p className="text-sm text-gray-600">{content.content}</p>
                )}

                {/* Botão "Escolher tema" - só quando NÃO tem tema */}
                {content.type === 'for-you' && !content.theme && (
                  <button className="mt-3 w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-lg transition-colors">
                    Escolher tema
                  </button>
                )}
              </div>

              {/* Botão "Trocar tema" - posicionado no canto inferior esquerdo (fora do conteúdo) */}
              {content.type === 'for-you' && content.theme && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChangeTheme();
                  }}
                  className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-sm border border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400 transition-all shadow-sm text-xs font-medium z-10"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Trocar tema</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <PrayerFloatingButton />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        initialTab={sidebarInitialTab}
      />

      {/* Modal de Bloqueio (quando NÃO pode trocar tema) */}
      {showBlockedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <RefreshCw className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Você já trocou de tema recentemente
              </h3>
            </div>
            <p className="text-gray-600 text-center mb-6">
              Você poderá trocar de tema novamente em{' '}
              <span className="font-bold text-amber-600">
                {daysRemaining} {daysRemaining === 1 ? 'dia' : 'dias'}
              </span>
              .
            </p>
            <button
              onClick={() => setShowBlockedMessage(false)}
              className="w-full py-3 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-600"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
