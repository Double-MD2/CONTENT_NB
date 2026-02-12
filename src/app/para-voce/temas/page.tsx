'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import {
  createSpiritualJourney,
  changeTheme,
  getUserSpiritualJourney,
  THEMES,
} from '@/lib/spiritual-journey';

export default function ThemeSelectionPage() {
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isChangingTheme, setIsChangingTheme] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      console.log('[THEME-SELECTION] 🔍 Verificando autenticação...');

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error('[THEME-SELECTION] ❌ Erro de autenticação:', authError);
        alert('Erro ao verificar autenticação. Faça login novamente.');
        router.push('/login');
        return;
      }

      if (!user) {
        console.error('[THEME-SELECTION] ❌ Usuário não autenticado');
        alert('Você precisa estar logado para acessar esta página.');
        router.push('/login');
        return;
      }

      console.log('[THEME-SELECTION] ✅ Usuário autenticado:', user.id);
      console.log('[THEME-SELECTION] Email:', user.email);
      setUserId(user.id);

      // Verificar se já tem jornada (está trocando tema)
      const journey = await getUserSpiritualJourney(user.id);
      if (journey) {
        console.log('[THEME-SELECTION] ✅ Jornada existente encontrada');
        setIsChangingTheme(true);
      } else {
        console.log('[THEME-SELECTION] ℹ️ Primeira seleção de tema');
      }
    } catch (error) {
      console.error('[THEME-SELECTION] ❌ Erro inesperado ao verificar usuário:', error);
      alert('Erro inesperado. Tente novamente.');
    }
  };

  const handleConfirm = async () => {
    if (!selectedTheme) {
      alert('Por favor, selecione um tema.');
      return;
    }

    if (!userId) {
      alert('Erro: usuário não identificado. Faça login novamente.');
      router.push('/login');
      return;
    }

    setLoading(true);

    try {
      console.log('[THEME-SELECTION] 📤 Confirmando seleção de tema...');
      console.log('[THEME-SELECTION] Tema selecionado:', selectedTheme);
      console.log('[THEME-SELECTION] userId:', userId);
      console.log('[THEME-SELECTION] isChangingTheme:', isChangingTheme);

      if (isChangingTheme) {
        // Trocar tema existente
        console.log('[THEME-SELECTION] 🔄 Trocando tema existente...');
        const result = await changeTheme(userId, selectedTheme);

        if (!result.success) {
          console.error('[THEME-SELECTION] ❌ Falha ao trocar tema:', result.message);
          alert(result.message);
          setLoading(false);
          return;
        }

        console.log('[THEME-SELECTION] ✅ Tema trocado com sucesso');
      } else {
        // Criar nova jornada
        console.log('[THEME-SELECTION] 🆕 Criando nova jornada...');
        const journey = await createSpiritualJourney(userId, selectedTheme);

        if (!journey) {
          console.error('[THEME-SELECTION] ❌ Falha ao criar jornada');
          alert('Erro ao criar jornada espiritual. Verifique o console para mais detalhes e tente novamente.');
          setLoading(false);
          return;
        }

        console.log('[THEME-SELECTION] ✅ Nova jornada criada com sucesso');
      }

      // Redirecionar para dashboard
      console.log('[THEME-SELECTION] ➡️ Redirecionando para dashboard...');
      router.push('/dashboard');
    } catch (error) {
      console.error('[THEME-SELECTION] ❌ Erro inesperado ao confirmar tema:', error);
      alert('Erro inesperado ao processar sua escolha. Verifique o console e tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Para Você</h1>
              <p className="text-sm text-gray-500">
                {isChangingTheme ? 'Trocar tema' : 'Escolha um tema'}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isChangingTheme
              ? 'Escolha um novo tema para sua jornada'
              : 'O que você está buscando neste momento?'}
          </h2>
          <p className="text-gray-600">
            {isChangingTheme
              ? 'Você pode trocar de tema uma vez a cada 7 dias.'
              : 'Escolha um tema para iniciar sua caminhada. Você poderá trocar depois.'}
          </p>
        </div>

        {/* Theme Cards */}
        <div className="space-y-3">
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`w-full rounded-2xl transition-all bg-white ${
                selectedTheme === theme.id
                  ? 'ring-4 ring-amber-400 shadow-lg'
                  : 'shadow-md hover:shadow-lg'
              }`}
            >
              <div className="p-4 relative flex items-center gap-4">
                {selectedTheme === theme.id && (
                  <div className="absolute top-3 right-3 bg-amber-500 rounded-full p-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="text-4xl">{theme.emoji}</div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{theme.name}</h3>
                  <p className="text-sm text-gray-600">{theme.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Confirm Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <button
            onClick={handleConfirm}
            disabled={!selectedTheme || loading}
            className={`w-full py-4 rounded-2xl font-bold text-white transition-all ${
              selectedTheme && !loading
                ? 'bg-amber-500 hover:bg-amber-600 shadow-lg'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processando...</span>
              </div>
            ) : (
              'Confirmar'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
