'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { UserProfile } from '@/lib/types';

const questions = [
  { id: 'name', label: 'Qual é o seu nome?', type: 'text' },
  { id: 'religion', label: 'Qual a sua religião?', type: 'select', options: ['Católica', 'Evangélica', 'Protestante', 'Outra'] },
  { id: 'faithDuration', label: 'Desde quando você é fiel à sua religião?', type: 'text' },
  { id: 'bibleReadingFrequency', label: 'Com que frequência você lê a Bíblia?', type: 'select', options: ['Diariamente', 'Semanalmente', 'Mensalmente', 'Raramente'] },
  { id: 'proximityWithGod', label: 'Como você avaliaria sua proximidade com Deus?', type: 'select', options: ['Muito próximo', 'Próximo', 'Neutro', 'Distante'] },
  { id: 'bibleImportance', label: 'Qual é a importância da palavra da Bíblia em sua vida?', type: 'select', options: ['Extremamente importante', 'Muito importante', 'Importante', 'Pouco importante'] },
  { id: 'religiousActivities', label: 'Você participa de atividades ou grupos religiosos?', type: 'select', options: ['Sim, regularmente', 'Sim, ocasionalmente', 'Não'] },
  { id: 'prayerPractice', label: 'Qual é a sua prática de oração?', type: 'select', options: ['Diária', 'Semanal', 'Ocasional', 'Raramente'] },
  { id: 'sharingExperience', label: 'Você já compartilhou passagens da Bíblia com outras pessoas?', type: 'select', options: ['Sim, frequentemente', 'Sim, às vezes', 'Não'] },
  { id: 'meditation', label: 'Você costuma meditar ou refletir sobre os ensinamentos bíblicos?', type: 'select', options: ['Sim, diariamente', 'Sim, semanalmente', 'Ocasionalmente', 'Não'] },
  { id: 'themesOfInterest', label: 'Quais temas você gostaria de explorar mais?', type: 'multiselect', options: ['Fé', 'Esperança', 'Amor', 'Perdão', 'Gratidão', 'Sabedoria', 'Família', 'Propósito'] },
  { id: 'openToDevotionals', label: 'Você está aberto a ler devocionais ou reflexões diárias?', type: 'select', options: ['Sim', 'Talvez', 'Não'] },
  { id: 'ageRange', label: 'Qual a sua faixa etária?', type: 'select', options: ['18-25', '26-35', '36-45', '46-60', '60+'] },
  { id: 'wantsNotifications', label: 'Você gostaria de receber notificações diárias com versículos?', type: 'boolean' },
  { id: 'preferredContentFormat', label: 'Qual é seu formato de conteúdo preferido?', type: 'select', options: ['Texto', 'Áudio', 'Vídeo', 'Todos'] },
  { id: 'expectations', label: 'Qual é a sua expectativa em relação a este app?', type: 'textarea' },
  { id: 'spiritualDifficulties', label: 'Qual é a maior dificuldade que você enfrenta na sua jornada espiritual?', type: 'textarea' },
  { id: 'groupStudyExperience', label: 'Você já participou de estudos bíblicos em grupo?', type: 'select', options: ['Sim, regularmente', 'Sim, ocasionalmente', 'Não'] },
  { id: 'faithJourneyDescription', label: 'Como você descreve sua jornada de fé até agora?', type: 'textarea' },
  { id: 'additionalInfo', label: 'Alguma outra informação que você gostaria de compartilhar?', type: 'textarea' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    themesOfInterest: [],
    wantsNotifications: false,
  });

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Salvar perfil no localStorage
      localStorage.setItem('userProfile', JSON.stringify(profile));
      localStorage.setItem('onboardingCompleted', 'true');
      router.push('/home');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (value: any) => {
    setProfile({ ...profile, [currentQuestion.id]: value });
  };

  const handleMultiSelectChange = (option: string) => {
    const current = profile.themesOfInterest || [];
    const updated = current.includes(option)
      ? current.filter(item => item !== option)
      : [...current, option];
    setProfile({ ...profile, themesOfInterest: updated });
  };

  const isAnswered = () => {
    const value = profile[currentQuestion.id as keyof UserProfile];
    if (currentQuestion.type === 'multiselect') {
      return (profile.themesOfInterest || []).length > 0;
    }
    return value !== undefined && value !== '';
  };

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

          {/* Textarea */}
          {currentQuestion.type === 'textarea' && (
            <textarea
              value={(profile[currentQuestion.id as keyof UserProfile] as string) || ''}
              onChange={(e) => handleInputChange(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:outline-none transition-colors resize-none"
              placeholder="Compartilhe seus pensamentos..."
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

          {/* Multi Select */}
          {currentQuestion.type === 'multiselect' && (
            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleMultiSelectChange(option)}
                  className={`px-4 py-3 rounded-xl border-2 transition-all ${
                    (profile.themesOfInterest || []).includes(option)
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
