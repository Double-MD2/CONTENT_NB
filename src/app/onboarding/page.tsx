'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, AlertCircle, RefreshCw } from 'lucide-react';
import { UserProfile } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { checkOnboardingStatus } from '@/lib/onboarding-guard';
import { loopGuard, buildRedirectUrl } from '@/lib/loop-guard';

const questions = [
  { id: 'name', label: 'Qual é o seu nome?', type: 'text' },

  {
    id: 'currentMoment',
    label: 'O que você está precisando hoje?',
    type: 'select',
    options: [
      'Força para um momento difícil',
      'Mais disciplina espiritual',
      'Me aproximar mais de Deus',
      'Fortalecer minha fé'
    ]
  },

  {
    id: 'dailyCommitment',
    label: 'Você pode dedicar 5 minutos por dia?',
    type: 'select',
    options: [
      'Sim, consigo',
      'Posso tentar',
      'Quero começar devagar'
    ]
  },

  {
    id: 'growthIntent',
    label: 'Você deseja crescer espiritualmente de forma intencional?',
    type: 'boolean'
  },

  {
    id: 'religion',
    label: 'Como você se identifica?',
    type: 'select',
    options: [
      'Católico',
      'Evangélico',
      'Cristão sem denominação',
      'Estou conhecendo o Cristianismo',
      'Outra religião',
      'Não sigo nenhuma religião'
    ]
  },

  {
    id: 'startToday',
    label: 'Você quer começar sua jornada agora?',
    type: 'boolean'
  },

  {
    id: 'referralCode',
    label: 'Tem um código de indicação? (Opcional)',
    type: 'text'
  }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(-1);
  const [profile, setProfile] = useState<Partial<UserProfile>>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    initializeOnboarding();

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOffline(!navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const initializeOnboarding = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.replace('/login');
      return;
    }

    const currentUserId = session.user.id;
    setUserId(currentUserId);

    const onboardingStatus = await checkOnboardingStatus(currentUserId);

    if (onboardingStatus.redirectTo === '/home') {
      const isLoop = loopGuard.detectLoop('/onboarding', '/home');
      if (isLoop) {
        router.replace('/home');
        return;
      }

      const redirectUrl = buildRedirectUrl('/home', '/onboarding');
      router.replace(redirectUrl);
      return;
    }
  };

  const progress =
    currentStep === -1 ? 0 : ((currentStep + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentStep === -1) {
      setCurrentStep(0);
      setShowIntro(false);
    } else if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(questions.length);
    }
  };

  const handleBack = () => {
    if (currentStep > -1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCompleteQuiz = async () => {
    if (!userId || isOffline) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          name: profile.name || null,
          religion: profile.religion || null,
          referral_code: profile.referralCode || null,
          onboarding_completed: true,
          quiz_completed: true,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' });

      if (error) throw error;

      router.replace('/home');
    } catch (error: any) {
      setSaveError(error.message);
      setIsSaving(false);
    }
  };

  const handleInputChange = (value: any) => {
    const currentQuestion = questions[currentStep];
    setProfile({ ...profile, [currentQuestion.id]: value });
  };

  const isAnswered = () => {
    if (currentStep === -1 || currentStep >= questions.length) return true;

    const currentQuestion = questions[currentStep];

    if (currentQuestion.id === 'referralCode') return true;

    const value = profile[currentQuestion.id as keyof UserProfile];
    return value !== undefined && value !== '';
  };

  if (currentStep === -1 && showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Sua jornada começa agora.
          </h1>
          <p className="text-gray-600 mb-8">
            Leva menos de 1 minuto.
          </p>
          <button
            onClick={handleNext}
            className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-xl"
          >
            Começar
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-amber-50 to-white">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-xl w-full">
          <h1 className="text-3xl font-bold mb-4">
            Pronto, {profile.name || 'amigo'}!
          </h1>

          {saveError && (
            <div className="mb-4 text-red-600 text-sm">
              {saveError}
            </div>
          )}

          <button
            onClick={handleCompleteQuiz}
            disabled={isSaving}
            className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-xl"
          >
            {isSaving ? 'Salvando...' : 'Entrar no App'}
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <h2 className="text-xl font-semibold mb-6">
          {currentQuestion.label}
        </h2>

        {currentQuestion.type === 'text' && currentQuestion.id !== 'referralCode' && (
          <input
            type="text"
            value={(profile[currentQuestion.id as keyof UserProfile] as string) || ''}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full px-4 py-3 border-2 rounded-xl"
          />
        )}

        {currentQuestion.id === 'referralCode' && (
          <div className="space-y-4">
            <input
              type="text"
              value={(profile.referralCode as string) || ''}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-xl"
              placeholder="Digite seu código"
            />

            <button
              type="button"
              onClick={() => handleInputChange('')}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition"
            >
              Não possuo código
            </button>
          </div>
        )}

        {currentQuestion.type === 'select' && (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => (
              <button
                key={option}
                onClick={() => handleInputChange(option)}
                className="w-full px-4 py-3 border-2 rounded-xl text-left"
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {currentQuestion.type === 'boolean' && (
          <div className="flex gap-4">
            <button
              onClick={() => handleInputChange(true)}
              className="flex-1 px-6 py-3 border-2 rounded-xl"
            >
              Sim
            </button>
            <button
              onClick={() => handleInputChange(false)}
              className="flex-1 px-6 py-3 border-2 rounded-xl"
            >
              Não
            </button>
          </div>
        )}

        <div className="flex gap-4 mt-8">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="px-6 py-3 border-2 rounded-xl"
            >
              <ChevronLeft className="w-4 h-4 inline" /> Voltar
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={!isAnswered()}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-xl"
          >
            {currentStep < questions.length - 1 ? 'Próxima' : 'Finalizar'}
            <ChevronRight className="w-4 h-4 inline ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
