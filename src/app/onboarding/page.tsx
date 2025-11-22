'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, Mail, Apple } from 'lucide-react';
import { UserProfile } from '@/lib/types';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);

  const progress = currentStep === -1 ? 0 : ((currentStep + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentStep === -1) {
      setCurrentStep(0);
    } else if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Tela final
      setCurrentStep(questions.length);
    }
  };

  const handleBack = () => {
    if (currentStep > -1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContinueFromFinal = () => {
    // Ir para tela de autenticação
    setCurrentStep(questions.length + 1);
  };

  const handleSocialLogin = async (provider: 'google' | 'microsoft' | 'apple') => {
    // Simulação de autenticação (em produção, integrar com OAuth real)
    console.log(`Autenticando com ${provider}...`);
    
    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular autenticação bem-sucedida
    setIsAuthenticated(true);
    
    // Simular verificação de assinatura (50% chance de ter assinatura ativa para demo)
    const hasSubscription = Math.random() > 0.5;
    setHasActiveSubscription(hasSubscription);
    
    if (hasSubscription) {
      // Usuário tem assinatura ativa - acesso total
      localStorage.setItem('userProfile', JSON.stringify(profile));
      localStorage.setItem('onboardingCompleted', 'true');
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('hasActiveSubscription', 'true');
      router.push('/home');
    } else {
      // Usuário não tem assinatura - mostrar planos
      setCurrentStep(questions.length + 2);
    }
  };

  const handleSubscribe = (plan: 'monthly' | 'semester' | 'annual') => {
    // Simular processo de assinatura
    console.log(`Assinando plano: ${plan}`);
    
    // Em produção, integrar com gateway de pagamento
    // Por enquanto, apenas redirecionar para home
    localStorage.setItem('userProfile', JSON.stringify(profile));
    localStorage.setItem('onboardingCompleted', 'true');
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('hasActiveSubscription', 'true');
    router.push('/home');
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
  if (currentStep === -1) {
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
              Comece agora por menos de 1 real por dia!
            </p>
            <button
              onClick={handleContinueFromFinal}
              className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all text-lg"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Tela de autenticação (Etapa 17)
  if (currentStep === questions.length + 1) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
              Bem-vindo de volta!
            </h1>
            <p className="text-gray-600 mb-8 text-center">
              Faça login para continuar sua jornada espiritual
            </p>

            <div className="space-y-4">
              {/* Google Login */}
              <button
                onClick={() => handleSocialLogin('google')}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-amber-300 hover:shadow-md transition-all group"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="font-semibold text-gray-700 group-hover:text-gray-900">
                  Continuar com Google
                </span>
              </button>

              {/* Microsoft Login */}
              <button
                onClick={() => handleSocialLogin('microsoft')}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-amber-300 hover:shadow-md transition-all group"
              >
                <svg className="w-6 h-6" viewBox="0 0 23 23">
                  <path fill="#f3f3f3" d="M0 0h23v23H0z"/>
                  <path fill="#f35325" d="M1 1h10v10H1z"/>
                  <path fill="#81bc06" d="M12 1h10v10H12z"/>
                  <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                  <path fill="#ffba08" d="M12 12h10v10H12z"/>
                </svg>
                <span className="font-semibold text-gray-700 group-hover:text-gray-900">
                  Continuar com Microsoft
                </span>
              </button>

              {/* Apple Login */}
              <button
                onClick={() => handleSocialLogin('apple')}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-black text-white rounded-xl hover:bg-gray-800 transition-all"
              >
                <Apple className="w-6 h-6" />
                <span className="font-semibold">
                  Continuar com Apple
                </span>
              </button>
            </div>

            <p className="text-sm text-gray-500 text-center mt-6">
              Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Tela de planos de assinatura (Etapa 18)
  if (currentStep === questions.length + 2) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Escolha seu plano
            </h1>
            <p className="text-xl text-gray-600">
              Invista na sua jornada espiritual
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Plano Mensal */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 hover:border-amber-300 transition-all">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Mensal</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-amber-600">R$ 29</span>
                  <span className="text-gray-600">,99/mês</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Menos de R$ 1 por dia</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Acesso completo ao app</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Leituras diárias personalizadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Meditações guiadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Comunidade exclusiva</span>
                </li>
              </ul>

              <button
                onClick={() => handleSubscribe('monthly')}
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Assinar agora
              </button>
            </div>

            {/* Plano Semestral */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-amber-400 relative transform md:scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Mais Popular
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Semestral</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-amber-600">R$ 164</span>
                  <span className="text-gray-600">,99</span>
                </div>
                <p className="text-sm text-amber-600 font-semibold mt-2">Economize 8%</p>
                <p className="text-xs text-gray-500">R$ 27,50/mês</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Tudo do plano mensal</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Conteúdo exclusivo premium</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Suporte prioritário</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Eventos ao vivo mensais</span>
                </li>
              </ul>

              <button
                onClick={() => handleSubscribe('semester')}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Assinar agora
              </button>
            </div>

            {/* Plano Anual */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 hover:border-amber-300 transition-all">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Anual</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-amber-600">R$ 299</span>
                  <span className="text-gray-600">,99</span>
                </div>
                <p className="text-sm text-amber-600 font-semibold mt-2">Economize 17%</p>
                <p className="text-xs text-gray-500">R$ 25,00/mês</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Tudo dos planos anteriores</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Acesso vitalício a novos recursos</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Mentoria espiritual 1:1</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Certificado de conclusão</span>
                </li>
              </ul>

              <button
                onClick={() => handleSubscribe('annual')}
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Assinar agora
              </button>
            </div>
          </div>

          <p className="text-center text-gray-500 mt-8">
            Todos os planos incluem 7 dias de garantia. Cancele quando quiser.
          </p>
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
