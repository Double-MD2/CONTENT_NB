'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { oracoesData } from '@/lib/oracoes-data';

export default function OracaoDodia() {
  const router = useRouter();
  const [oracaoAtual, setOracaoAtual] = useState(oracoesData[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Obter oração do dia baseada na data
    const hoje = new Date();
    const iniciodoAno = new Date(hoje.getFullYear(), 0, 0);
    const diff = hoje.getTime() - iniciodoAno.getTime();
    const umDia = 1000 * 60 * 60 * 24;
    const diaDoAno = Math.floor(diff / umDia);
    
    // Usar módulo para garantir que funcione em anos bissextos
    const indice = diaDoAno % 366;
    setOracaoAtual(oracoesData[indice]);
  }, []);

  const gerarNovaOracao = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const indiceAleatorio = Math.floor(Math.random() * oracoesData.length);
      setOracaoAtual(oracoesData[indiceAleatorio]);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              Oração do Dia
            </h1>

            <button
              onClick={gerarNovaOracao}
              className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-6 h-6 text-purple-600 ${isAnimating ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-8">
        {/* Card da Oração */}
        <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden mb-6 transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {/* Imagem */}
          <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: `url(${oracaoAtual.image})` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-block bg-purple-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-3">
                {oracaoAtual.tipo}
              </div>
              <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                {oracaoAtual.titulo}
              </h2>
            </div>
          </div>

          {/* Conteúdo da Oração */}
          <div className="p-8 relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="mb-6">
                <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line italic">
                  "{oracaoAtual.oracao}"
                </p>
              </div>

              {/* Tema */}
              <div className="flex items-center gap-2 text-purple-600 font-semibold mb-4">
                <Sparkles className="w-5 h-5" />
                <span>Tema: {oracaoAtual.tema}</span>
              </div>

              {/* Reflexão */}
              {oracaoAtual.reflexao && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none"></div>
                  <h3 className="text-lg font-bold text-purple-800 mb-3 relative z-10">💭 Reflexão</h3>
                  <p className="leading-relaxed relative z-10 text-gray-700">
                    {oracaoAtual.reflexao}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Botão para Gerar Nova Oração */}
        <button
          onClick={gerarNovaOracao}
          className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-3 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          <RefreshCw className="w-6 h-6" />
          <span className="relative z-10">Gerar Nova Oração</span>
        </button>

        {/* Informação */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Uma nova oração é apresentada a cada dia. Clique no botão acima para explorar outras orações.
          </p>
        </div>
      </div>
    </div>
  );
}
