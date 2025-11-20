'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Heart, BookOpen, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FavoritesPage() {
  const router = useRouter();
  const [showChapters, setShowChapters] = useState(false);
  const [showVerses, setShowVerses] = useState(false);

  // Dados de exemplo - em produção viriam do localStorage ou banco de dados
  const favoriteChapters = [
    { book: 'João', chapter: 3, id: 'João-3' },
    { book: 'Salmos', chapter: 23, id: 'Salmos-23' },
    { book: 'Provérbios', chapter: 3, id: 'Provérbios-3' },
  ];

  const favoriteVerses = [
    { book: 'João', chapter: 3, verse: 16, text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito...', id: 'João-3-16' },
    { book: 'Filipenses', chapter: 4, verse: 13, text: 'Posso todas as coisas naquele que me fortalece.', id: 'Filipenses-4-13' },
    { book: 'Salmos', chapter: 23, verse: 1, text: 'O Senhor é o meu pastor; nada me faltará.', id: 'Salmos-23-1' },
  ];

  return (
    <div className="min-h-screen bg-rose-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500 fill-red-500" />
              <h1 className="text-xl font-bold text-gray-800">Meus Favoritos</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 space-y-4">
        {/* Capítulos Favoritos */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <button
            onClick={() => setShowChapters(!showChapters)}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-blue-500" />
              <div className="text-left">
                <h2 className="text-lg font-bold text-gray-800">Capítulos Favoritos</h2>
                <p className="text-sm text-gray-500">{favoriteChapters.length} capítulo(s)</p>
              </div>
            </div>
            {showChapters ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {/* Lista de Capítulos */}
          {showChapters && (
            <div className="border-t border-gray-200">
              {favoriteChapters.length === 0 ? (
                <div className="p-8 text-center">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Nenhum capítulo favoritado ainda</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {favoriteChapters.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between"
                      onClick={() => {
                        // Navegar para o capítulo
                        router.push(`/bible?book=${item.book}&chapter=${item.chapter}`);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{item.book}</h3>
                          <p className="text-sm text-gray-500">Capítulo {item.chapter}</p>
                        </div>
                      </div>
                      <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Versículos Favoritos */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <button
            onClick={() => setShowVerses(!showVerses)}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-red-500 fill-red-500" />
              <div className="text-left">
                <h2 className="text-lg font-bold text-gray-800">Versículos Favoritos</h2>
                <p className="text-sm text-gray-500">{favoriteVerses.length} versículo(s)</p>
              </div>
            </div>
            {showVerses ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {/* Lista de Versículos */}
          {showVerses && (
            <div className="border-t border-gray-200">
              {favoriteVerses.length === 0 ? (
                <div className="p-8 text-center">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Nenhum versículo favoritado ainda</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {favoriteVerses.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => {
                        // Navegar para o versículo específico
                        router.push(`/bible?book=${item.book}&chapter=${item.chapter}&verse=${item.verse}`);
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Heart className="w-5 h-5 text-red-600 fill-red-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-800">{item.book} {item.chapter}:{item.verse}</h3>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mensagem informativa */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Dica</h3>
              <p className="text-sm text-blue-700">
                Ao ler a Bíblia, toque no coração para favoritar capítulos ou selecione versículos e use o botão de favoritar para salvá-los aqui.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}