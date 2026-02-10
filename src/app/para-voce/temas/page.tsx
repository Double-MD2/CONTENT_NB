'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';

const THEMES = [
  {
    id: 'luto-perda',
    name: 'Luto e Perda',
    description: 'Conforto e esperança em momentos de perda',
    emoji: '🕊️',
  },
  {
    id: 'ansiedade-medo',
    name: 'Ansiedade e Medo',
    description: 'Paz e tranquilidade para o coração inquieto',
    emoji: '🌊',
  },
  {
    id: 'fortalecimento-fe',
    name: 'Fortalecimento da Fé',
    description: 'Crescer e amadurecer na jornada espiritual',
    emoji: '⛰️',
  },
  {
    id: 'gratidao-alegria',
    name: 'Gratidão e Alegria',
    description: 'Celebrar as bênçãos e cultivar a alegria',
    emoji: '☀️',
  },
  {
    id: 'financeiro-trabalho',
    name: 'Financeiro e Trabalho',
    description: 'Sabedoria e provisão nas questões materiais',
    emoji: '💼',
  },
  {
    id: 'relacionamentos-familia',
    name: 'Relacionamentos e Família',
    description: 'Harmonia e amor nos relacionamentos',
    emoji: '👨‍👩‍👧‍👦',
  },
  {
    id: 'perdao-cura',
    name: 'Perdão e Cura Interior',
    description: 'Libertação e restauração do coração',
    emoji: '🌱',
  },
  {
    id: 'decisoes-dificeis',
    name: 'Decisões Difíceis',
    description: 'Discernimento e direção divina',
    emoji: '🧭',
  },
  {
    id: 'proposito-vocacao',
    name: 'Propósito e Vocação',
    description: 'Descobrir e cumprir seu chamado',
    emoji: '🎯',
  },
  {
    id: 'paz-interior',
    name: 'Paz Interior e Descanso',
    description: 'Renovação e descanso para a alma',
    emoji: '🌙',
  },
];

export default function ThemeSelectionPage() {
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const handleConfirm = () => {
    if (!selectedTheme) return;

    const theme = THEMES.find((t) => t.id === selectedTheme);
    if (theme) {
      const themeData = {
        id: theme.id,
        name: theme.name,
        selectedAt: new Date().toISOString(),
      };
      localStorage.setItem('forYouTheme', JSON.stringify(themeData));
      router.push('/dashboard');
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
              <p className="text-sm text-gray-500">Escolha um tema</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            O que você está buscando neste momento?
          </h2>
          <p className="text-gray-600">
            Escolha um tema para iniciar sua caminhada. Você poderá trocar depois.
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
            disabled={!selectedTheme}
            className={`w-full py-4 rounded-2xl font-bold text-white transition-all ${
              selectedTheme
                ? 'bg-amber-500 hover:bg-amber-600 shadow-lg'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
