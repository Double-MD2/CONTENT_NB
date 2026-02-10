'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Heart, Lightbulb, Check, RefreshCw } from 'lucide-react';
import { getForYouDailyContent, type ForYouContent } from '@/lib/for-you-content';

export default function ForYouPage() {
  const router = useRouter();
  const [content, setContent] = useState<ForYouContent | null>(null);
  const [themeName, setThemeName] = useState<string>('');
  const [canChangeTheme, setCanChangeTheme] = useState<boolean>(true);
  const [daysRemaining, setDaysRemaining] = useState<number>(0);
  const [showChangeWarning, setShowChangeWarning] = useState<boolean>(false);
  const [showBlockedMessage, setShowBlockedMessage] = useState<boolean>(false);

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
    const canChange = daysDiff >= 7;
    setCanChangeTheme(canChange);

    // Calcular quantos dias faltam para poder trocar
    if (!canChange) {
      const remaining = 7 - daysDiff;
      setDaysRemaining(remaining);
    }
  }, [router]);

  const handleChangeTheme = () => {
    // BLOQUEIO REAL: Impedir troca se ainda não passaram 7 dias
    if (!canChangeTheme) {
      setShowBlockedMessage(true);
      return;
    }

    // Se pode trocar, mostrar aviso de confirmação
    setShowChangeWarning(true);
  };

  const handleConfirmChange = () => {
    // Permitir troca apenas se realmente puder
    if (canChangeTheme) {
      router.push('/para-voce/temas');
    }
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
        {/* Card principal com conteúdo */}
        <div className="bg-white rounded-2xl shadow-lg p-6 pb-16 mb-4 relative">
          {/* Texto Bíblico */}
          <div className="mb-6 border-l-4 border-amber-500 pl-4">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-bold text-gray-900">Texto Bíblico</h2>
            </div>
            <p className="text-sm font-semibold text-amber-700 mb-2">{content.bibleText.reference}</p>
            <p className="text-gray-700 italic leading-relaxed">{content.bibleText.text}</p>
          </div>

          {/* Reflexão */}
          <div className="mb-6 border-l-4 border-purple-500 pl-4">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-bold text-gray-900">Reflexão</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">{content.reflection}</p>
          </div>

          {/* Oração */}
          <div className="mb-6 border-l-4 border-blue-500 pl-4">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">Oração</h2>
            </div>
            <p className="text-gray-700 leading-relaxed italic">{content.prayer}</p>
          </div>

          {/* Ação Prática */}
          <div className="mb-6 border-l-4 border-green-500 pl-4">
            <div className="flex items-center gap-2 mb-3">
              <Check className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-bold text-gray-900">Ação Prática</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">{content.action}</p>
          </div>

          {/* Botão Trocar Tema - Posicionado no canto inferior esquerdo */}
          <div className="absolute bottom-4 left-4 z-10">
            <button
              onClick={handleChangeTheme}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-amber-400 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:border-amber-500 transition-all shadow-md text-sm font-semibold"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Trocar tema</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Aviso de Troca (quando pode trocar) */}
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

      {/* Modal de Bloqueio (quando NÃO pode trocar) */}
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
