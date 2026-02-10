'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PrayerNoteConfirmationPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar automaticamente após 4 segundos
    const timer = setTimeout(() => {
      router.push('/home');
    }, 4000);

    // Limpar timer se o componente for desmontado
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Card de Confirmação */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center space-y-6">
          {/* Ícone de Confirmação */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Mensagem Principal */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              🙏 Sua nota foi enviada com carinho
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Recebemos seu pedido de oração e estaremos intercedendo por você.
            </p>

            <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-6 mt-6">
              <p className="text-gray-700 leading-relaxed">
                Alguns pedidos podem ser levados para momentos de oração em nossa comunidade no Instagram, 
                <span className="font-semibold"> sempre de forma anônima</span>. 
                <br />
                <br />
                Acompanhe por lá e sinta-se parte dessa corrente de fé! ✨
              </p>
            </div>
          </div>

          {/* Indicador de Redirecionamento */}
          <div className="pt-6">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <span>Retornando ao menu em instantes...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
