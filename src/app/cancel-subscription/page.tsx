'use client';

import { ArrowLeft, ExternalLink, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CancelSubscriptionPage() {
  const router = useRouter();

  const handleGoToKirvano = () => {
    window.open('https://app.kirvano.com/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Botão Voltar */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Voltar</span>
        </button>

        {/* Card Principal */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Ícone e Título */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-amber-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Cancelar assinatura</h1>
            <p className="text-gray-600">
              Gerencie sua assinatura diretamente pela plataforma de pagamento
            </p>
          </div>

          {/* Informação Principal */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
            <p className="text-gray-700 leading-relaxed">
              O cancelamento da assinatura é feito diretamente pela plataforma de pagamento <span className="font-semibold text-blue-600">Kirvano</span>.
            </p>
          </div>

          {/* Passo a Passo */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Como cancelar:</h2>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <p className="text-gray-700 pt-1">Acesse o site da Kirvano</p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <p className="text-gray-700 pt-1">Faça login com o mesmo e-mail usado na compra</p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <p className="text-gray-700 pt-1">Clique em <span className="font-semibold">Compras</span></p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <p className="text-gray-700 pt-1">Selecione sua assinatura</p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  5
                </div>
                <p className="text-gray-700 pt-1">Clique em <span className="font-semibold">Gerenciar assinatura</span></p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  6
                </div>
                <p className="text-gray-700 pt-1">Solicite o cancelamento</p>
              </div>
            </div>
          </div>

          {/* Aviso Importante */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700 text-center">
              <span className="font-semibold text-green-700">✓ Importante:</span> Seu acesso ao app permanecerá ativo até o final do período contratado.
            </p>
          </div>

          {/* Botão de Ação */}
          <button
            onClick={handleGoToKirvano}
            className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            Ir para a Kirvano
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>

        {/* Rodapé Informativo */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Precisa de ajuda? Entre em contato com nosso suporte
          </p>
        </div>
      </div>
    </div>
  );
}
