'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, AlertCircle, RefreshCw } from 'lucide-react';
import { UserProfile } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { checkOnboardingStatus } from '@/lib/onboarding-guard';
import { loopGuard, getRedirectOrigin, buildRedirectUrl } from '@/lib/loop-guard';

const questions = [
  // Etapa 0 - Tela de abertura (será tratada separadamente)
  { id: 'name', label: 'Qual o seu nome?', type: 'text' },
  { id: 'age', label: 'Quantos anos você tem?', type: 'select', options: ['18-24', '25-34', '35-44', '45 ou mais'] },
  { id: 'religion', label: 'Qual é a sua religião?', type: 'select', options: ['Cristianismo', 'Islamismo', 'Judaísmo', 'Outra', 'Nenhuma'] },
  { id: 'connectionWithGod', label: 'Como você costuma se conectar com Deus?', type: 'select', options: ['Orações', 'Meditações', 'Leituras da Bíblia', 'Atividades comunitárias', 'Outra'] },
  { id: 'prayerFrequency', label: 'Com que frequência você ora?', type: 'select', options: ['Diariamente', 'Semanalmente', 'Mensalmente', 'Raramente'] },
  { id: 'worshipMoment', label: 'Qual é o seu momento favorito para adorar a Deus?', type: 'select', options: ['Em casa', 'Na igreja', 'Em grupo', 'Durante o Culto'] },
  { id: 'sacredTextsFrequency', label: 'Com que frequência você lê textos sagrados?', type: 'select', options: ['Diariamente', 'Semanalmente', 'Mensalmente', 'Raramente'] },
  { id: 'religiousCommunity', label: 'Você faz parte de uma comunidade religiosa?', type: 'boolean' },
  { id: 'connectionBarriers', label: 'Quais são os principais desafios que você enfrenta para se conectar com Deus?', type: 'select', options: ['Falta de tempo', 'Dúvidas', 'Sentimentos de distração', 'Outro'] },
  { id: 'spiritualityImportance', label: 'Quão importante é a espiritualidade na sua vida?', type: 'select', options: ['Muito importante', 'Importante', 'Às vezes', 'Não é importante'] },
  { id: 'deepenFaith', label: 'Você gostaria de aprofundar sua fé?', type: 'select', options: ['Sim', 'Não', 'Talvez'] },
  { id: 'spiritualGrowth', label: 'Você busca ativamente o crescimento espiritual?', type: 'boolean' },
  { id: 'divineCuriosity', label: 'Você costuma fazer perguntas sobre a vida e Deus?', type: 'select', options: ['Sim', 'Raramente', 'Não'] },
  { id: 'religiousAppsUsage', label: 'Você já usou aplicativos religiosos antes?', type: 'boolean' },
  { id: 'appUsageReason', label: 'Qual seria seu principal motivo para usar um app religioso?', type: 'select', options: ['Aumentar a fé', 'Aprender mais', 'Conectar-se com outros', 'Outro'] },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(-1); // -1 para tela de abertura
  const [profile, setProfile] = useState<Partial<UserProfile>>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    initializeOnboarding();
    
    // Detectar status offline/online
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
    try {
      // Verificar se usuário está logado
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        console.log('[ONBOARDING] Nenhuma sessão encontrada - redirecionando para login');
        router.replace('/login');
        return;
      }

      const currentUserId = session.user.id;
      setUserId(currentUserId);

      // ✅ FONTE ÚNICA: Verificar se onboarding já foi completo
      console.log('[ONBOARDING] 🔍 Verificando status do onboarding...');
      const onboardingStatus = await checkOnboardingStatus(currentUserId);

      console.log('[ONBOARDING] Status do onboarding:', {
        redirectTo: onboardingStatus.redirectTo,
        reason: onboardingStatus.reason,
        quizCompleted: onboardingStatus.quizCompleted,
        onboardingCompleted: onboardingStatus.onboardingCompleted,
      });

      // Se onboarding completo, redirecionar para /home
      if (onboardingStatus.redirectTo === '/home') {
        console.log('[ONBOARDING] ✅ Onboarding já completo - redirecionando para /home');

        // 🛡️ GUARD ANTI-LOOP: Detectar se está em loop
        const fromOrigin = getRedirectOrigin();
        const isLoop = loopGuard.detectLoop('/onboarding', '/home');

        if (isLoop) {
          console.error('[ONBOARDING] 🚨 LOOP DETECTADO! Redirecionamento bloqueado.');
          alert(
            'Detectamos um problema de redirecionamento. Por favor, entre em contato com o suporte.\n\n' +
            'Você será redirecionado para a página inicial.'
          );
          // Forçar ida para home mesmo com loop (melhor do que ficar preso)
          router.replace('/home');
          return;
        }

        // Redirecionar com query param ?from=onboarding
        const redirectUrl = buildRedirectUrl('/home', '/onboarding');
        router.replace(redirectUrl);
        return;
      }

      // Carregar dados parciais do perfil (se existirem)
      if (onboardingStatus.profileExists) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('name, religion')
          .eq('id', currentUserId)
          .single();

        if (profileData && (profileData.name || profileData.religion)) {
          setProfile({
            name: profileData.name,
            religion: profileData.religion,
          });
        }
      }

      // Carregar perfil salvo do localStorage (fallback)
      const savedProfile = localStorage.getItem(`user_profile_${currentUserId}`);
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setProfile(prev => ({ ...prev, ...parsed }));
      }
    } catch (error) {
      console.error('[ONBOARDING] Erro ao inicializar:', error);
    }
  };

  const progress = currentStep === -1 ? 0 : ((currentStep + 1) / questions.length) * 100;

  const handleNext = async () => {
    if (currentStep === -1) {
      setCurrentStep(0);
      setShowIntro(false);
      
      // Telemetria
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'quiz_step_view', {
          user_id: userId,
          step_number: 1,
        });
      }
    } else if (currentStep < questions.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      
      // Salvar progresso no localStorage
      if (userId) {
        localStorage.setItem(`user_profile_${userId}`, JSON.stringify(profile));
      }
      
      // Telemetria
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'quiz_step_view', {
          user_id: userId,
          step_number: nextStep + 1,
        });
      }
    } else {
      // Quiz completo - ir para tela final
      setCurrentStep(questions.length);
    }
  };

  const handleBack = () => {
    if (currentStep > -1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCompleteQuiz = async () => {
    if (!userId) {
      setSaveError('Erro: usuário não identificado');
      return;
    }

    // Verificar se está offline
    if (isOffline) {
      setSaveError('Você está offline. Conecte-se à internet para concluir o quiz.');
      return;
    }

    // Bloquear botão para evitar duplicação
    if (isSaving) {
      console.log('[ONBOARDING] ⚠️ Salvamento já em andamento - ignorando clique duplicado');
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      console.log('[ONBOARDING] 💾 Salvando perfil usando Supabase client...');
      
      // Verificar sessão
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Sessão expirada. Faça login novamente.');
      }

      // Salvar perfil usando Supabase client (upsert em public.profiles)
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          name: profile.name || null,
          religion: profile.religion || null,
          onboarding_completed: true,
          quiz_completed: true,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'id'
        })
        .select()
        .single();

      if (error) {
        console.error('[ONBOARDING] ❌ Erro ao salvar perfil:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        });

        // Tratamento específico de erros
        if (error.code === '42501') {
          throw new Error('Permissão negada. Verifique as políticas RLS no Supabase.');
        } else if (error.code === 'PGRST301') {
          throw new Error('Tabela profiles não encontrada. Execute o script SQL de correção.');
        } else {
          throw new Error(error.message || 'Erro ao salvar perfil');
        }
      }

      console.log('[ONBOARDING] ✅ Perfil salvo com sucesso!', data);

      // Salvar no localStorage (fallback)
      localStorage.setItem(`user_profile_${userId}`, JSON.stringify(profile));
      localStorage.setItem('onboardingCompleted', 'true');
      
      console.log('[ONBOARDING] ✅ Quiz completo! Redirecionando para /home');
      
      // Telemetria
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'quiz_completed', {
          user_id: userId,
        });
        (window as any).gtag('event', 'home_entered', {
          user_id: userId,
        });
      }
      
      // Redirecionar para home usando router.replace (evita loop no histórico)
      router.replace('/home');
    } catch (error: any) {
      console.error('[ONBOARDING] ❌ Erro ao completar quiz:', {
        message: error.message,
        code: error.code,
        details: error.details,
        stack: error.stack,
      });
      
      // Definir mensagem de erro apropriada
      setSaveError(error.message || 'Erro ao salvar seus dados. Verifique sua conexão e tente novamente.');
      setIsSaving(false);
    }
  };

  const handleInputChange = (value: any) => {
    if (currentStep >= 0 && currentStep < questions.length) {
      const currentQuestion = questions[currentStep];
      setProfile({ ...profile, [currentQuestion.id]: value });
    }
  };

  const isAnswered = () => {
    if (currentStep === -1 || currentStep >= questions.length) return true;
    const currentQuestion = questions[currentStep];
    const value = profile[currentQuestion.id as keyof UserProfile];
    return value !== undefined && value !== '';
  };

  // Tela de abertura (Etapa 0)
  if (currentStep === -1 && showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Descubra o nível da sua conexão com Deus!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Leva menos de 5 minutos…
            </p>
            <button
              onClick={handleNext}
              className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all text-lg"
            >
              Clique para começar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Tela final (Etapa 16)
  if (currentStep === questions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Parabéns, {profile.name || 'amigo'}!
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Seu app está personalizado para você! Agora, mantenha-se assíduo e aprofunde sua conexão com Deus.
            </p>
            <p className="text-lg text-amber-600 font-semibold mb-8">
              Comece sua jornada espiritual agora!
            </p>

            {/* Alerta de offline */}
            {isOffline && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-red-800">Você está offline</p>
                  <p className="text-xs text-red-600 mt-1">
                    Conecte-se à internet para salvar seus dados e continuar.
                  </p>
                </div>
              </div>
            )}

            {/* Erro ao salvar */}
            {saveError && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-left flex-1">
                    <p className="text-sm font-semibold text-red-800">Erro ao salvar</p>
                    <p className="text-xs text-red-600 mt-1">{saveError}</p>
                  </div>
                </div>
                <button
                  onClick={handleCompleteQuiz}
                  disabled={isSaving || isOffline}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw className={`w-4 h-4 ${isSaving ? 'animate-spin' : ''}`} />
                  Tentar Novamente
                </button>
              </div>
            )}

            <button
              onClick={handleCompleteQuiz}
              disabled={isSaving || isOffline}
              className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Salvando...
                </>
              ) : (
                'Continuar para o App'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 pt-12 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Notas Bíblicas</h1>
          <p className="text-gray-600">Vamos conhecer você melhor</p>
          <p className="text-sm text-gray-500 mt-2">
            Pergunta {currentStep + 1} de {questions.length}
          </p>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {currentQuestion.label}
          </h2>

          {/* Text Input */}
          {currentQuestion.type === 'text' && (
            <input
              type="text"
              value={(profile[currentQuestion.id as keyof UserProfile] as string) || ''}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:outline-none transition-colors"
              placeholder="Digite sua resposta..."
            />
          )}

          {/* Select */}
          {currentQuestion.type === 'select' && (
            <div className="space-y-3">
              {currentQuestion.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleInputChange(option)}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all text-left ${
                    profile[currentQuestion.id as keyof UserProfile] === option
                      ? 'border-amber-400 bg-amber-50 text-amber-900'
                      : 'border-gray-200 hover:border-amber-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Boolean */}
          {currentQuestion.type === 'boolean' && (
            <div className="flex gap-4">
              <button
                onClick={() => handleInputChange(true)}
                className={`flex-1 px-6 py-3 rounded-xl border-2 transition-all ${
                  profile[currentQuestion.id as keyof UserProfile] === true
                    ? 'border-amber-400 bg-amber-50 text-amber-900'
                    : 'border-gray-200 hover:border-amber-300'
                }`}
              >
                Sim
              </button>
              <button
                onClick={() => handleInputChange(false)}
                className={`flex-1 px-6 py-3 rounded-xl border-2 transition-all ${
                  profile[currentQuestion.id as keyof UserProfile] === false
                    ? 'border-amber-400 bg-amber-50 text-amber-900'
                    : 'border-gray-200 hover:border-amber-300'
                }`}
              >
                Não
              </button>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Voltar
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!isAnswered()}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              isAnswered()
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-white hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentStep < questions.length - 1 ? 'Próxima' : 'Finalizar'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
