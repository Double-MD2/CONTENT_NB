'use client';

import { ArrowLeft, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ComingSoonPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Chat</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <MessageCircle className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">EM BREVE</h2>
          
          <p className="text-gray-600 text-lg mb-6">
            Estamos trabalhando para trazer essa funcionalidade para você em breve!
          </p>

          <div className="bg-amber-50 rounded-2xl p-6 border-2 border-amber-200">
            <p className="text-amber-800 font-semibold">
              Fique atento às próximas atualizações! 🙏
            </p>
          </div>

          <button
            onClick={() => router.back()}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-semibold rounded-full hover:shadow-lg transition-all"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
