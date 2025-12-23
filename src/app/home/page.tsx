'use client';

import { useState, useEffect } from 'react';
import { Menu, Bell, Share2, CheckCircle2, Clock, ChevronDown, Home, BookOpen, Heart, User, Users, MessageCircle, ShoppingCart, Star } from 'lucide-react';
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

const mockContents: DailyContent[] = [
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
  
  // Converter para string no fuso America/Sao_Paulo
  const brazilDateString = nowUTC.toLocaleString('en-US', { 
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  
  // Parsear a string no formato MM/DD/YYYY para YYYY-MM-DD
  const [month, day, year] = brazilDateString.split(/[\\/,\\s]+/);
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

/**
 * Cria um objeto Date representando uma data específica no fuso America/Sao_Paulo
 * @param dateString - Data no formato YYYY-MM-DD
 */
const createBrazilDate = (dateString: string): Date => {
  // Criar data no fuso local do Brasil (sem conversão UTC)
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day, 0, 0, 0, 0);
  return date;
};

export default function HomePage() {
  const router = useRouter();
  
  // Hook para incrementar login stats 1x por sessão
  useIncrementLoginOnce();
  
  // Hook para registrar acesso diário no Supabase (log_daily_login RPC)
  useLogDailyLogin();
  
  // Hook compartilhado para streak - SINCRONIZADO com WeekActivityStreak
  const { streak } = useWeekStreak();
  
  // Hook de verificação de assinatura
  const { isActive: hasAccess, isInTrial, loading: subscriptionLoading } = useSubscription();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarInitialTab, setSidebarInitialTab] = useState<'account' | 'contribute' | 'frequency' | 'store'>('account');
  const [contents, setContents] = useState<DailyContent[]>(mockContents);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [weeklyAccess, setWeeklyAccess] = useState<boolean[]>([false, false, false, false, false, false, false]);

  useEffect(() => {
    initializeUser();
  }, []);

  const initializeUser = async () => {
    try {
      // Verificar se usuário está logado
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        console.log('[HOME] Nenhuma sessão encontrada - redirecionando para login');
        router.push('/login');
        return;
      }

      const currentUserId = session.user.id;
      setUserId(currentUserId);

      // Verificar se quiz foi completo
      try {
        const quizResponse = await fetch(`/api/quiz-status?userId=${currentUserId}`);
        
        if (quizResponse.ok) {
          const quizStatus = await quizResponse.json();
          
          if (!quizStatus.completed) {
            // Quiz não completo - bloquear acesso e redirecionar
            console.log('[HOME] ❌ Quiz não completo - bloqueando acesso');
            
            // Telemetria
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'blocked_home_due_to_incomplete_quiz', {
                user_id: currentUserId,
                current_step: quizStatus.currentStep || 0,
              });
            }
            
            router.push('/onboarding');
            return;
          }
          
          console.log('[HOME] ✅ Quiz completo - acesso permitido');
          
          // Telemetria
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'home_entered', {
              user_id: currentUserId,
            });
          }
        }
      } catch (quizError) {
        console.warn('[HOME] ⚠️ Erro ao verificar quiz (permitindo acesso):', quizError);
      }

      // Buscar dados do usuário do banco de dados (OPCIONAL - não bloqueia se falhar)
      try {
        const response = await fetch(`/api/user?userId=${currentUserId}`);
        if (response.ok) {
          const data = await response.json();

          if (data.userData) {
            // Se tem histórico, calcular acessos da semana atual
            if (data.accessHistory && data.accessHistory.length > 0) {
              // Calcular acessos da semana atual
              const weekAccess = calculateWeeklyAccess(data.accessHistory);
              setWeeklyAccess(weekAccess);
            }
          } else {
            // Primeiro acesso - criar dados iniciais
            await createInitialUserData(currentUserId);
          }

          // Registrar acesso de hoje
          await registerTodayAccess(currentUserId);
        } else {
          console.warn('⚠️  API de usuário não disponível (tabelas podem não existir ainda)');
        }
      } catch (apiError) {
        console.warn('⚠️  Erro ao buscar dados do usuário (continuando sem dados):', apiError);
      }

      // Carregar conteúdos do localStorage (temporário até migrar para DB)
      const saved = localStorage.getItem('dailyContents');
      if (saved) {
        const savedContents = JSON.parse(saved);
        const updatedContents = savedContents.map((content: DailyContent) => {
          if (content.id === '1' && content.type === 'lectionary') {
            return {
              ...content,
              content: 'Leituras diárias conforme o Calendário Romano Geral (API CNBB)'
            };
          }
          if (content.id === '2' && content.type === 'verse') {
            return {
              ...content,
              reflection: 'Versículos sobre o amor incondicional de Deus e com reflexões para internalizar no coração'
            };
          }
          if (content.id === '4' && content.type === 'prayer') {
            return {
              ...content,
              image: 'https://images.unsplash.com/photo-1445445290350-18a3b86e0b5a?w=800&h=400&fit=crop&q=80'
            };
          }
          return content;
        });
        setContents(updatedContents);
        localStorage.setItem('dailyContents', JSON.stringify(updatedContents));
      }

      setLoading(false);
    } catch (error) {
      console.error('Erro ao inicializar usuário:', error);
      setLoading(false);
    }
  };

  /**
   * Calcula quais dias da semana atual foram acessados
   * CORREÇÃO: Usa getTodayInBrazil() para determinar a semana atual no fuso local
   */
  const calculateWeeklyAccess = (history: any[]): boolean[] => {
    // Obter "hoje" no fuso America/Sao_Paulo
    const todayString = getTodayInBrazil();
    const today = createBrazilDate(todayString);
    const currentDayOfWeek = today.getDay(); // 0 = Domingo, 6 = Sábado
    
    // Encontrar o domingo da semana atual
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDayOfWeek);
    startOfWeek.setHours(0, 0, 0, 0);
    
    // Array para armazenar se cada dia da semana foi acessado
    const weekAccess = [false, false, false, false, false, false, false];
    
    // Verificar cada dia da semana
    for (let i = 0; i < 7; i++) {
      const checkDate = new Date(startOfWeek);
      checkDate.setDate(startOfWeek.getDate() + i);
      const dateString = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
      
      // Verificar se existe registro de acesso para este dia
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
      // Obter "hoje" no fuso America/Sao_Paulo
      const todayString = getTodayInBrazil();
      
      // Criar dados iniciais do usuário
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

      // Criar histórico inicial dos últimos 30 dias
      const today = createBrazilDate(todayString);
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        
        await fetch('/api/access-history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: currentUserId,
            accessDate: dateString,
            accessed: i === 0 // Apenas hoje está acessado
          })
        });
      }
      
      // Atualizar acesso semanal
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
      // Obter "hoje" no fuso America/Sao_Paulo
      const todayString = getTodayInBrazil();
      
      await fetch('/api/access-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUserId,
          accessDate: todayString,
          accessed: true
        })
      });

      // Buscar histórico atualizado e recalcular acessos semanais
      const response = await fetch(`/api/access-history?userId=${currentUserId}`);
      const history = await response.json();
      
      if (history && history.length > 0) {
        // Atualizar acesso semanal
        const weekAccess = calculateWeeklyAccess(history);
        setWeeklyAccess(weekAccess);

        // Atualizar dados do usuário
        await fetch('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: currentUserId,
            consecutiveDays: streak, // Usar streak do hook compartilhado
            lastAccessDate: new Date().toISOString(),
            onboardingCompleted: true
          })
        });
      }
    } catch (error) {
      console.error('Erro ao registrar acesso:', error);
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

  /**
   * CORRIGIDO: Verifica acesso premium antes de navegar para CARDS
   * Cards são conteúdo PREMIUM - requerem assinatura ou trial
   */
  const handleCardClick = (content: DailyContent) => {
    // Verificar se tem acesso premium
    if (!hasAccess) {
      console.log('[HOME] Acesso premium negado (card) - redirecionando para planos');
      router.push('/plans');
      return;
    }

    // Tem acesso - navegar normalmente
    if (content.type === 'gratitude') {
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

  /**
   * Verifica acesso premium antes de navegar para botões de acesso rápido
   * Se não tem acesso, redireciona para /plans
   */
  const handlePremiumClick = (route: string) => {
    if (!hasAccess) {
      console.log('[HOME] Acesso premium negado - redirecionando para planos');
      router.push('/plans');
    } else {
      router.push(route);
    }
  };

  const openSidebarWithTab = (tab: 'account' | 'contribute' | 'frequency' | 'store') => {
    setSidebarInitialTab(tab);
    setSidebarOpen(true);
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
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => openSidebarWithTab('account')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            
            <div className="flex items-center gap-2">
              <img src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/8f5542a7-c136-497a-822e-8e2a2fb72e5e.png" alt="Plano Diário" className="h-16 w-auto" />
            </div>

            {/* Card de Sequência Atual - Sincronizado com WeekActivityStreak via hook compartilhado */}
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
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Trial Banner - Mostrar apenas se estiver no trial */}
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

        {/* Weekly Calendar - Componente com dados do Supabase */}
        <WeekActivityStreak />

        {/* Quick Access Buttons - TODOS OS BOTÕES SÃO PREMIUM EXCETO SIDEBAR */}
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

        {/* Content Cards - TODOS OS CARDS SÃO PREMIUM */}
        <div className="space-y-4">
          {contents.map((content) => (
            <div
              key={content.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden transition-all hover:shadow-lg"
            >
              {/* Card Header with Image */}
              <div
                onClick={() => handleCardClick(content)}
                className="relative h-40 bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: `url(${content.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleComplete(content.id);
                    }}
                    className={`p-2 rounded-full transition-all ${
                      content.completed
                        ? 'bg-amber-400 text-white'
                        : 'bg-white/90 text-gray-700 hover:bg-white'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
                  >
                    <Share2 className="w-5 h-5 text-gray-700" />
                  </button>
                </div>

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

              {/* Card Content */}
              <div className="p-4">
                {content.reflection && (
                  <div className="bg-amber-50 rounded-lg p-3 mb-3">
                    <p className="text-sm text-gray-700 italic">{content.reflection}</p>
                  </div>
                )}

                {content.questions && expandedCard === content.id && (
                  <div className="space-y-2 mb-3">
                    <p className="text-sm font-semibold text-gray-800">Perguntas para conectar-se</p>
                    {content.questions.map((question, idx) => (
                      <div key={idx} className="flex gap-2">
                        <span className="text-amber-500 font-semibold">{idx + 1}.</span>
                        <p className="text-sm text-gray-700">{question}</p>
                      </div>
                    ))}
                  </div>
                )}

                {content.questions && (
                  <button
                    onClick={() => toggleExpand(content.id)}
                    className="flex items-center gap-2 text-amber-600 hover:text-amber-700 text-sm font-semibold transition-colors"
                  >
                    {expandedCard === content.id ? 'Ver menos' : 'Ver perguntas de reflexão'}
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedCard === content.id ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botão Flutuante de Oração */}
      <PrayerFloatingButton />

      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        initialTab={sidebarInitialTab}
      />
    </div>
  );
}
