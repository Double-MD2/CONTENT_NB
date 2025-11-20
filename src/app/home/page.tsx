'use client';

import { useState, useEffect } from 'react';
import { Menu, Bell, Share2, CheckCircle2, Clock, ChevronDown, Home, BookOpen, Heart, User, Users, MessageCircle, Circle } from 'lucide-react';
import { DailyContent } from '@/lib/types';
import Sidebar from '@/components/custom/sidebar';
import { useRouter } from 'next/navigation';

const mockContents: DailyContent[] = [
  {
    id: '1',
    type: 'lectionary',
    title: 'Leccionário do Dia',
    content: 'Leitura conforme o calendário litúrgico de hoje.',
    duration: '5 min',
    image: 'https://images.unsplash.com/photo-1639474894531-82a7fe3c5098?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    completed: false,
  },
  {
    id: '2',
    type: 'verse',
    title: 'Versículo do Dia',
    content: '"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito..." - João 3:16',
    reflection: 'Reflexão sobre o amor incondicional de Deus e como isso transforma nossas vidas.',
    duration: '3 min',
    image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop',
    completed: false,
  },
  {
    id: '3',
    type: 'devotional',
    title: 'Devoção Diária',
    content: 'Reflexão profunda sobre fé e esperança.',
    questions: [
      'Como você tem demonstrado fé em sua vida?',
      'Quais áreas precisam de mais confiança em Deus?',
      'O que você pode fazer hoje para fortalecer sua fé?',
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
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&q=80',
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
  const [contents, setContents] = useState<DailyContent[]>(mockContents);
  const [activeItemSideBar, setActiveItemSideBar] = useState<'account' | 'contribute' | 'frequency' | 'store'>('account');
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  useEffect(() => {
    // Carregar dados do localStorage
    const saved = localStorage.getItem('dailyContents');
    if (saved) {
      setContents(JSON.parse(saved));
    }
  }, []);

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
      router.push('/gratitude');
    }
  };

  function setOpenSideMenu() {
    setActiveItemSideBar('contribute')
    setSidebarOpen(true)
   }


  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>

            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-800">Plano Diário</h1>
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell className="w-6 h-6 text-gray-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full"></span>
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
              {contents.filter(c => c.completed).length} de {contents.length} completos
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
        <div className="grid grid-cols-4 gap-3 mb-6 ">
          <button
            onClick={() => router.push('/bible')}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-700 text-center">Bíblia</span>
          </button>

          <button onClick={setOpenSideMenu} className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-700 text-center">Contribuir</span>
          </button>

          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
              <Circle className="w-6 h-6 text-white" />
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
                  <h3 className="text-xl font-bold text-white">{content.title}</h3>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4">
                <p className="text-gray-700 mb-3">{content.content}</p>

                {content.reflection && (
                  <div className="bg-amber-50 rounded-lg p-3 mb-3">
                    <p className="text-sm text-gray-700 italic">{content.reflection}</p>
                  </div>
                )}

                {content.questions && expandedCard === content.id && (
                  <div className="space-y-2 mb-3">
                    <p className="text-sm font-semibold text-gray-800">Perguntas para reflexão:</p>
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

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-3">
            <button className="flex flex-col items-center gap-1 text-amber-500">
              <Home className="w-6 h-6" />
              <span className="text-xs font-medium">Início</span>
            </button>
            <button
              onClick={() => router.push('/bible')}
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <BookOpen className="w-6 h-6" />
              <span className="text-xs font-medium">Bíblia</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors">
              <Heart className="w-6 h-6" />
              <span className="text-xs font-medium">Favoritos</span>
            </button>
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <User className="w-6 h-6" />
              <span className="text-xs font-medium">Perfil</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} activeTabUse={activeItemSideBar} onClose={() => setSidebarOpen(false)} />
    </div>
  );
}
