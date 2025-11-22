'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Share2, BookOpen, Heart, RefreshCw } from 'lucide-react';
import { versiculosDoDia } from '@/lib/versiculos-data';

export default function VersiculoDoDiaPage() {
  const [versiculoAtual, setVersiculoAtual] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    carregarVersiculoDoDia();
  }, []);

  const carregarVersiculoDoDia = () => {
    setIsLoading(true);
    
    // Obter o dia do ano (1-366)
    const hoje = new Date();
    const inicioDano = new Date(hoje.getFullYear(), 0, 1);
    const diferencaDias = Math.floor((hoje.getTime() - inicioDano.getTime()) / (1000 * 60 * 60 * 24));
    const diaDoAno = diferencaDias + 1;
    
    // Selecionar versículo baseado no dia do ano
    const indice = (diaDoAno - 1) % versiculosDoDia.length;
    const versiculo = versiculosDoDia[indice];
    
    setVersiculoAtual(versiculo);
    setIsLoading(false);
  };

  const gerarVersiculoAleatorio = () => {
    setIsLoading(true);
    setTimeout(() => {
      const indiceAleatorio = Math.floor(Math.random() * versiculosDoDia.length);
      setVersiculoAtual(versiculosDoDia[indiceAleatorio]);
      setIsLoading(false);
    }, 300);
  };

  const compartilhar = () => {
    if (versiculoAtual) {
      const texto = `${versiculoAtual.texto}\n\n${versiculoAtual.referencia}`;
      if (navigator.share) {
        navigator.share({
          title: 'Versículo do Dia',
          text: texto,
        });
      } else {
        navigator.clipboard.writeText(texto);
        alert('Versículo copiado para a área de transferência!');
      }
    }
  };

  if (isLoading || !versiculoAtual) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-amber-500 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Carregando versículo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
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
            
            <h1 className="text-xl font-bold text-gray-800">Versículo do Dia</h1>

            <button
              onClick={compartilhar}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Share2 className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Card do Versículo */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6 relative">
          {/* Efeito de Reflexo */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none z-10 rounded-3xl"></div>
          
          {/* Imagem de Fundo */}
          <div 
            className="relative h-64 bg-cover bg-center"
            style={{ backgroundImage: `url(${versiculoAtual.imagem})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 text-white/90 text-sm mb-2">
                <BookOpen className="w-5 h-5" />
                <span className="font-semibold">{versiculoAtual.referencia}</span>
              </div>
            </div>
          </div>

          {/* Conteúdo do Versículo */}
          <div className="p-8 relative">
            <div className="mb-6">
              <div className="text-6xl text-amber-400 mb-4 font-serif leading-none">"</div>
              <p className="text-2xl text-gray-800 leading-relaxed font-serif italic mb-4">
                {versiculoAtual.texto}
              </p>
              <div className="text-6xl text-amber-400 text-right font-serif leading-none">"</div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <p className="text-lg font-semibold text-amber-600">
                {versiculoAtual.referencia}
              </p>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{versiculoAtual.tema}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reflexão */}
        {versiculoAtual.reflexao && (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 mb-6 shadow-md relative overflow-hidden">
            {/* Efeito de Reflexo na Reflexão */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none rounded-2xl"></div>
            
            <div className="flex items-center gap-2 mb-3 relative z-10">
              <Heart className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-gray-800">Reflexão</h3>
            </div>
            <p className="leading-relaxed relative z-10">
              {versiculoAtual.reflexao}
            </p>
          </div>
        )}

        {/* Botão para Novo Versículo */}
        <button
          onClick={gerarVersiculoAleatorio}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 relative overflow-hidden"
        >
          {/* Efeito de Reflexo no Botão */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"></div>
          
          <RefreshCw className="w-5 h-5 relative z-10" />
          <span className="relative z-10">Gerar Novo Versículo</span>
        </button>

        {/* Informação */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Cada dia, um novo versículo para inspirar sua jornada de fé.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Base de dados com 366 versículos selecionados
          </p>
        </div>
      </div>
    </div>
  );
}
