'use client';

import { useState, useEffect } from 'react';
import { Menu, Bell, Share2, CheckCircle2, Clock, ChevronDown, Home, BookOpen, Heart, User, Users, MessageCircle, ShoppingCart, Star } from 'lucide-react';
import { DailyContent } from '@/lib/types';
import Sidebar from '@/components/custom/sidebar';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

const mockContents: DailyContent[] = [
  {
    id: '1',
    type: 'lectionary',
    title: 'Leitura do Dia',
    content: 'Leitura conforme o calendário litúrgico de hoje.',
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
    id: '4',
    type: 'prayer',
    title: 'Oração do Dia',
    content: 'Senhor, guia meus passos hoje. Que eu possa ser luz para aqueles ao meu redor...',
    duration: '2 min',
    image: 'https://images.unsplash.com/photo-1445445290350-18a3b86e0b5a?w=800&h=400&fit=crop&q=80',
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

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export default function HomePage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarInitialTab, setSidebarInitialTab] = useState<'account' | 'contribute' | 'frequency' | 'store'>('account');
  const [contents, setContents] = useState<DailyContent[]>(mockContents);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [consecutiveDays, setConsecutiveDays] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeUser();
  }, []);

  const initializeUser = async () => {
    try {
      // Verificar se usuário está logado
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        console.log('Nenhuma sessão encontrada');
        router.push('/login');
        return;
      }

      const currentUserId = session.user.id;
      setUserId(currentUserId);

      // Buscar dados do usuário do banco de dados (OPCIONAL - não bloqueia se falhar)
      try {
        const response = await fetch(`/api/user?userId=${currentUserId}`);
        if (response.ok) {
          const data = await response.json();

          if (data.userData) {
            setConsecutiveDays(data.userData.consecutive_days || 0);

            // Se tem histórico, calcular dias consecutivos
            if (data.accessHistory && data.accessHistory.length > 0) {
              const consecutive = calculateConsecutiveDaysFromHistory(data.accessHistory);
              setConsecutiveDays(consecutive);
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

  const createInitialUserData = async (currentUserId: string) => {
    try {
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
      const today = new Date();
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        await fetch('/api/access-history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: currentUserId,
            accessDate: date.toISOString().split('T')[0],
            accessed: i === 0 // Apenas hoje está acessado
          })
        });
      }

      setConsecutiveDays(1);
    } catch (error) {
      console.error('Erro ao criar dados iniciais:', error);
    }
  };

  const registerTodayAccess = async (currentUserId: string) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      await fetch('/api/access-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUserId,
          accessDate: today,
          accessed: true
        })
      });

      // Buscar histórico atualizado e recalcular dias consecutivos
      const response = await fetch(`/api/access-history?userId=${currentUserId}`);
      const history = await response.json();
      
      if (history && history.length > 0) {
        const consecutive = calculateConsecutiveDaysFromHistory(history);
        setConsecutiveDays(consecutive);

        // Atualizar dados do usuário
        await fetch('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: currentUserId,
            consecutiveDays: consecutive,
            lastAccessDate: new Date().toISOString(),
            onboardingCompleted: true
          })
        });
      }
    } catch (error) {
      console.error('Erro ao registrar acesso:', error);
    }
  };

  const calculateConsecutiveDaysFromHistory = (history: any[]): number => {
    if (!history || history.length === 0) return 0;

    // Ordenar por data decrescente (mais recente primeiro)
    const sortedHistory = [...history].sort((a, b) => 
      new Date(b.access_date).getTime() - new Date(a.access_date).getTime()
    );

    let consecutive = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedHistory.length; i++) {
      const accessDate = new Date(sortedHistory[i].access_date);
      accessDate.setHours(0, 0, 0, 0);
      
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);
      expectedDate.setHours(0, 0, 0, 0);

      if (accessDate.getTime() === expectedDate.getTime() && sortedHistory[i].accessed) {
        consecutive++;
      } else {
        break;
      }
    }

    return consecutive;
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

  const handleCardClick = (content: DailyContent) => {
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

  const handleBibleClick = () => {
    window.location.href = '/bible';
  };

  const openSidebarWithTab = (tab: 'account' | 'contribute' | 'frequency' | 'store') => {
    setSidebarInitialTab(tab);
    setSidebarOpen(true);
  };

  if (loading) {
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

            {/* Card de Sequência Atual */}
            <button 
              onClick={() => openSidebarWithTab('frequency')}
              className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-3 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 animate-pulse" />
                <p className="text-lg font-bold leading-none">{consecutiveDays}</p>
              </div>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Weekly Calendar */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Sua Semana</h2>
            <span className="text-sm text-gray-500">
              {contents.filter(c => c.completed).length} de 7 completos
            </span>
          </div>
          
          <div className="flex justify-between gap-2">
            {weekDays.map((day, index) => (
              <button
                key={index}
                onClick={() => setSelectedDay(index)}
                className={`flex-1 aspect-square rounded-full flex items-center justify-center font-semibold transition-all ${
                  index === selectedDay
                    ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-lg scale-110'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Access Buttons */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <button 
            onClick={handleBibleClick}
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
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-700 text-center">Contribuir</span>
          </button>

          <button 
            onClick={() => openSidebarWithTab('store')}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-700 text-center">Shop</span>
          </button>

          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-700 text-center">Chat</span>
          </button>
        </div>

        {/* Content Cards */}
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

      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        initialTab={sidebarInitialTab}
      />
    </div>
  );
}
