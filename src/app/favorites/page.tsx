'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Heart, BookOpen, ArrowLeft, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getFavoriteChapters, getFavoriteVerses, removeFavoriteChapter, removeFavoriteVerse, type FavoriteChapter, type FavoriteVerse } from '@/lib/favorites';

export default function FavoritesPage() {
  const router = useRouter();
  const [showChapters, setShowChapters] = useState(true);
  const [showVerses, setShowVerses] = useState(true);
  const [favoriteChapters, setFavoriteChapters] = useState<FavoriteChapter[]>([]);
  const [favoriteVerses, setFavoriteVerses] = useState<FavoriteVerse[]>([]);

  // Carregar favoritos do localStorage
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    setFavoriteChapters(getFavoriteChapters());
    setFavoriteVerses(getFavoriteVerses());
  };

  const handleRemoveChapter = (book: string, chapter: number, e: React.MouseEvent) => {
    e.stopPropagation();
    removeFavoriteChapter(book, chapter);
    loadFavorites();
  };

  const handleRemoveVerse = (book: string, chapter: number, verse: number, e: React.MouseEvent) => {
    e.stopPropagation();
    removeFavoriteVerse(book, chapter, verse);
    loadFavorites();
  };

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
                  <p className="text-gray-400 text-xs mt-2">
                    Vá até a Bíblia e toque no coração para favoritar capítulos
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {favoriteChapters.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between group"
                      onClick={() => {
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
                      <button
                        onClick={(e) => handleRemoveChapter(item.book, item.chapter, e)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        title="Remover dos favoritos"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
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
                  <p className="text-gray-400 text-xs mt-2">
                    Selecione versículos na Bíblia e toque no coração para favoritar
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {favoriteVerses.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 hover:bg-gray-50 transition-colors cursor-pointer group"
                      onClick={() => {
                        router.push(`/bible?book=${item.book}&chapter=${item.chapter}&verse=${item.verse}`);
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Heart className="w-5 h-5 text-red-600 fill-red-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-gray-800">
                              {item.book} {item.chapter}:{item.verse}
                            </h3>
                            <button
                              onClick={(e) => handleRemoveVerse(item.book, item.chapter, item.verse, e)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                              title="Remover dos favoritos"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
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
        {(favoriteChapters.length === 0 && favoriteVerses.length === 0) && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Como favoritar?</h3>
                <p className="text-sm text-blue-700">
                  Ao ler a Bíblia, toque no coração para favoritar capítulos inteiros ou selecione versículos específicos e use o botão de favoritar. Seus favoritos aparecerão aqui!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
