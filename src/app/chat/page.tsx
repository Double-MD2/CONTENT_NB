'use client';

import { BookOpen, Sparkles, Calendar, MessageCircle, Heart } from 'lucide-react';

export default function ChatComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-pink-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Chat Espiritual</h1>
              <p className="text-xs text-gray-500">Em desenvolvimento</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mb-6 shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Em Breve
          </h2>
          
          <p className="text-lg text-gray-600 mb-8">
            Estamos preparando algo especial para você!
          </p>
        </div>

        {/* Feature Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-pink-100 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-pink-500" />
            O que será o Chat Espiritual?
          </h3>
          
          <p className="text-gray-600 leading-relaxed mb-6">
            Uma experiência única de conversa guiada pela sabedoria bíblica, onde você poderá:
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 text-pink-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Estudar a Bíblia</h4>
                <p className="text-sm text-gray-600">Tire dúvidas sobre passagens, contextos históricos e ensinamentos bíblicos</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Fortalecer sua Fé</h4>
                <p className="text-sm text-gray-600">Receba orientações espirituais baseadas nos princípios cristãos</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Reflexões Personalizadas</h4>
                <p className="text-sm text-gray-600">Converse sobre sua jornada espiritual e receba insights relevantes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Badge */}
        <div className="bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl p-6 text-center text-white shadow-lg">
          <Calendar className="w-8 h-8 mx-auto mb-3" />
          <p className="font-semibold text-lg mb-2">Lançamento em breve</p>
          <p className="text-sm text-pink-100">
            Estamos trabalhando para trazer a melhor experiência de chat espiritual para você
          </p>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Continue explorando as outras funcionalidades do app enquanto preparamos esta novidade! 🙏
        </p>
      </div>
    </div>
  );
}
