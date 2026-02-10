'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  minLabel: string;
  maxLabel: string;
  minEmoji: string;
  maxEmoji: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Quão próximo você se sente de Deus?',
    minLabel: 'Muito distante',
    maxLabel: 'Muito próximo',
    minEmoji: '🙏',
    maxEmoji: '✨',
  },
  {
    id: 2,
    question: 'Quão importante é a fé na sua vida?',
    minLabel: 'Nada importante',
    maxLabel: 'Extremamente importante',
    minEmoji: '❌',
    maxEmoji: '❤️',
  },
  {
    id: 3,
    question: 'Com que frequência você ora?',
    minLabel: 'Nunca',
    maxLabel: 'Diariamente',
    minEmoji: '⌛',
    maxEmoji: '🕊️',
  },
  {
    id: 4,
    question: 'Sente que está evoluindo na relação com Deus?',
    minLabel: 'Nenhuma evolução',
    maxLabel: 'Muita evolução',
    minEmoji: '🔽',
    maxEmoji: '🔼',
  },
  {
    id: 5,
    question: 'Quão envolvido você está em atividades da sua comunidade religiosa?',
    minLabel: 'Não estou envolvido',
    maxLabel: 'Muito envolvido',
    minEmoji: '🚪',
    maxEmoji: '🤝',
  },
];

export default function ConexaoPage() {
  const [step, setStep] = useState<'intro' | 'questions' | 'final'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});

  const handleSliderChange = (questionId: number, value: number) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Salvar respostas no localStorage
      localStorage.setItem('conexaoAnswers', JSON.stringify(answers));
      setStep('final');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleStart = () => {
    setStep('questions');
  };

  const handleFinish = () => {
    window.location.href = '/home';
  };

  const currentQuestionData = questions[currentQuestion];
  const currentAnswer = answers[currentQuestionData?.id] ?? 50;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            
            <h1 className="text-xl font-bold text-gray-800">Conexão</h1>
            
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Etapa 1 - Introdução */}
        {step === 'intro' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">✨</span>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Bem-vindo à sua jornada de Conexão!
              </h2>
              
              <p className="text-lg text-gray-600 mb-8">
                Responda estas perguntas para ajudar a personalizar sua experiência no app!
              </p>
              
              <button
                onClick={handleStart}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all hover:scale-105"
              >
                Começar
              </button>
            </div>
          </div>
        )}

        {/* Etapa 2 - Perguntas */}
        {step === 'questions' && (
          <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-600">
                  Pergunta {currentQuestion + 1} de {questions.length}
                </span>
                <span className="text-sm font-semibold text-purple-600">
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                {currentQuestionData.question}
              </h2>

              {/* Slider */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-center">
                    <div className="text-3xl mb-2">{currentQuestionData.minEmoji}</div>
                    <div className="text-sm text-gray-600 font-medium">0</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">{currentQuestionData.maxEmoji}</div>
                    <div className="text-sm text-gray-600 font-medium">100</div>
                  </div>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={currentAnswer}
                  onChange={(e) => handleSliderChange(currentQuestionData.id, parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-purple"
                  style={{
                    background: `linear-gradient(to right, rgb(168, 85, 247) 0%, rgb(168, 85, 247) ${currentAnswer}%, rgb(229, 231, 235) ${currentAnswer}%, rgb(229, 231, 235) 100%)`
                  }}
                />

                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500">{currentQuestionData.minLabel}</span>
                  <span className="text-2xl font-bold text-purple-600">{currentAnswer}</span>
                  <span className="text-sm text-gray-500">{currentQuestionData.maxLabel}</span>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                {currentQuestion > 0 && (
                  <button
                    onClick={handlePrevious}
                    className="flex-1 bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-all flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Anterior
                  </button>
                )}
                
                <button
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  {currentQuestion < questions.length - 1 ? (
                    <>
                      Próxima
                      <ArrowRight className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      Finalizar
                      <Check className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Etapa 3 - Tela Final */}
        {step === 'final' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-12 h-12 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Obrigado por suas respostas!
              </h2>
              
              <p className="text-lg text-gray-600 mb-8">
                Sua experiência agora está personalizada para você. Volte diariamente para interagir mais e fortalecer sua jornada espiritual!
              </p>
              
              <button
                onClick={handleFinish}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all hover:scale-105"
              >
                Voltar para o Início
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .slider-purple::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(to bottom right, rgb(168, 85, 247), rgb(147, 51, 234));
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(168, 85, 247, 0.4);
        }

        .slider-purple::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(to bottom right, rgb(168, 85, 247), rgb(147, 51, 234));
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(168, 85, 247, 0.4);
        }
      `}</style>
    </div>
  );
}
