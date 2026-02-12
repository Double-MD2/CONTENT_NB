'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Heart, Lightbulb, Check, Home } from 'lucide-react';
import { supabase, SpiritualContent } from '@/lib/supabase';
import {
  getUserSpiritualJourney,
  getDailyContent,
  getThemeInfo,
} from '@/lib/spiritual-journey';

export default function ForYouPage() {
  const router = useRouter();
  const [content, setContent] = useState<SpiritualContent | null>(null);
  const [themeName, setThemeName] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDailyContent();
  }, []);

  const loadDailyContent = async () => {
    try {
      // Verificar autenticação
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      // Verificar se tem jornada configurada
      const journey = await getUserSpiritualJourney(user.id);

      if (!journey) {
        // Se não tem jornada, redirecionar para seleção de tema
        router.push('/para-voce/temas');
        return;
      }

      // Buscar informações do tema
      const themeInfo = getThemeInfo(journey.current_theme);
      if (themeInfo) {
        setThemeName(themeInfo.name);
      }

      // Buscar conteúdo diário
      const dailyContent = await getDailyContent(user.id);

      if (!dailyContent) {
        alert('Erro ao carregar conteúdo diário. Tente novamente.');
        setLoading(false);
        return;
      }

      setContent(dailyContent);
      setLoading(false);
    } catch (error) {
      console.error('[FOR-YOU] Erro ao carregar conteúdo:', error);
      alert('Erro ao carregar conteúdo. Tente novamente.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Conteúdo não encontrado</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600"
          >
            Voltar para a home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">Para Você</h1>
              <p className="text-sm text-amber-600">Tema: {themeName}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Texto Bíblico */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-4 border-l-4 border-amber-500">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-bold text-gray-900">Texto Bíblico</h2>
          </div>
          <p className="text-sm font-semibold text-amber-700 mb-2">
            {content.bible_text.reference}
          </p>
          <p className="text-gray-700 italic leading-relaxed">{content.bible_text.text}</p>
        </div>

        {/* Reflexão */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-4 border-l-4 border-purple-500">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-bold text-gray-900">Reflexão</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">{content.reflection}</p>
        </div>

        {/* Oração */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-4 border-l-4 border-blue-500">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900">Oração</h2>
          </div>
          <p className="text-gray-700 leading-relaxed italic">{content.prayer}</p>
        </div>

        {/* Ação Prática */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-4 border-l-4 border-green-500">
          <div className="flex items-center gap-2 mb-3">
            <Check className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-bold text-gray-900">Ação Prática</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">{content.action}</p>
        </div>

        {/* Botão Voltar para Home */}
        <div className="mt-6">
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            <span>Voltar para a home</span>
          </button>
        </div>
      </div>
    </div>
  );
}
