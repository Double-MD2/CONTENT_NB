'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Heart, Lightbulb, Check } from 'lucide-react';
import { getForYouDailyContent, type ForYouContent } from '@/lib/for-you-content';

export default function ForYouPage() {
  const router = useRouter();
  const [content, setContent] = useState<ForYouContent | null>(null);
  const [themeName, setThemeName] = useState<string>('');
  const [canChangeTheme, setCanChangeTheme] = useState<boolean>(true);
  const [showChangeWarning, setShowChangeWarning] = useState<boolean>(false);

  useEffect(() => {
    // Verificar se tem tema configurado
    const savedTheme = localStorage.getItem('forYouTheme');
    if (!savedTheme) {
      router.push('/para-voce/temas');
      return;
    }

    const themeData = JSON.parse(savedTheme);
    setThemeName(themeData.name);

    // Buscar conteúdo do dia
    const dailyContent = getForYouDailyContent(themeData.id);
    setContent(dailyContent);

    // Verificar se pode trocar tema (última troca foi há mais de 7 dias)
    const selectedAt = new Date(themeData.selectedAt);
    const now = new Date();
    const daysDiff = Math.floor((now.getTime() - selectedAt.getTime()) / (1000 * 60 * 60 * 24));
    setCanChangeTheme(daysDiff >= 7);
  }, [router]);

  const handleChangeTheme = () => {
    if (!canChangeTheme) {
      setShowChangeWarning(true);
      return;
    }
    router.push('/para-voce/temas');
  };

  const handleConfirmChange = () => {
    router.push('/para-voce/temas');
  };

  if (!content) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
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
          <p className="text-sm font-semibold text-amber-700 mb-2">{content.bibleText.reference}</p>
          <p className="text-gray-700 italic leading-relaxed">{content.bibleText.text}</p>
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

        {/* Botão Trocar Tema */}
        <button
          onClick={handleChangeTheme}
          className="text-sm text-gray-500 hover:text-amber-600 underline mt-4"
        >
          Trocar tema
        </button>
      </div>

      {/* Modal de Aviso de Troca */}
      {showChangeWarning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Tem certeza que quer trocar?
            </h3>
            <p className="text-gray-600 mb-6">
              Você pode trocar de tema apenas uma vez a cada 7 dias. Se trocar agora, não poderá mudar
              novamente pelos próximos 7 dias.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowChangeWarning(false)}
                className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmChange}
                className="flex-1 py-3 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-600"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
