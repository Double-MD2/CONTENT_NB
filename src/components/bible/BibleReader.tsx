'use client';

import { useState, useEffect } from 'react';
import { Heart, Share2, ChevronLeft, ChevronRight, Type, Highlighter, Loader2, Link as LinkIcon, Mail, MessageCircle, Facebook, Twitter, Copy } from 'lucide-react';
import {
  toggleFavoriteChapter,
  isChapterFavorite,
  toggleFavoriteVerse,
  isVerseFavorite
} from '@/lib/favorites';
import { getChapterVerses } from '@/lib/bibleData';

interface BibleReaderProps {
  bookName: string;
  chapter: number;
  darkMode: boolean;
  onNavigate: (chapter: number) => void;
  totalChapters: number;
  highlightVerse?: number | null; // Versículo para destacar (quando vem de favoritos)
}

interface Verse {
  number: number;
  text: string;
}

export default function BibleReader({ bookName, chapter, darkMode, onNavigate, totalChapters, highlightVerse }: BibleReaderProps) {
  const [fontSize, setFontSize] = useState(16);
  const [selectedVerses, setSelectedVerses] = useState<number[]>([]);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteVerses, setFavoriteVerses] = useState<Set<number>>(new Set());
  const [highlights, setHighlights] = useState<Set<string>>(new Set());
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showChapterShareMenu, setShowChapterShareMenu] = useState(false);

  // Carregar estado de favoritos ao montar/mudar capítulo
  useEffect(() => {
    setIsFavorite(isChapterFavorite(bookName, chapter));
    
    // Carregar versículos favoritos deste capítulo
    const favVerses = new Set<number>();
    verses.forEach(v => {
      if (isVerseFavorite(bookName, chapter, v.number)) {
        favVerses.add(v.number);
      }
    });
    setFavoriteVerses(favVerses);
  }, [bookName, chapter, verses]);

  useEffect(() => {
    const fetchVerses = async () => {
      setLoading(true);
      setError(null);

      try {
        // Carregar versículos do arquivo local AS21.json
        const versesArray = await getChapterVerses(bookName, chapter);
        setVerses(versesArray);
      } catch (err) {
        console.error('Erro ao carregar versículos:', err);
        setError(err instanceof Error ? err.message : 'Não foi possível carregar os versículos. Tente novamente.');

        // Fallback com dados de exemplo
        setVerses([
          { number: 1, text: 'Conteúdo temporariamente indisponível.' },
          { number: 2, text: 'Por favor, verifique sua conexão e tente novamente.' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchVerses();
  }, [bookName, chapter]);

  const toggleVerseSelection = (verseNumber: number) => {
    setSelectedVerses(prev =>
      prev.includes(verseNumber)
        ? prev.filter(v => v !== verseNumber)
        : [...prev, verseNumber]
    );
  };

  const copySelectedVerses = () => {
    if (selectedVerses.length === 0) {
      alert('Selecione versículos para copiar!');
      return;
    }

    const text = selectedVerses
      .sort((a, b) => a - b)
      .map(v => {
        const verse = verses.find(verse => verse.number === v);
        return verse ? `${bookName} ${chapter}:${v} - ${verse.text}` : '';
      })
      .filter(Boolean)
      .join('\n');
    
    navigator.clipboard.writeText(text);
    alert('Versículos copiados para a área de transferência!');
  };

  const handleFavoriteChapter = () => {
    const newState = toggleFavoriteChapter(bookName, chapter);
    setIsFavorite(newState);
    
    if (newState) {
      alert('✅ Capítulo adicionado aos favoritos!');
    } else {
      alert('❌ Capítulo removido dos favoritos!');
    }
  };

  const handleFavoriteVerses = () => {
    if (selectedVerses.length === 0) {
      alert('Selecione versículos para favoritar!');
      return;
    }

    let addedCount = 0;
    let removedCount = 0;

    selectedVerses.forEach(verseNum => {
      const verse = verses.find(v => v.number === verseNum);
      if (verse) {
        const wasAdded = toggleFavoriteVerse(bookName, chapter, verseNum, verse.text);
        if (wasAdded) {
          addedCount++;
          setFavoriteVerses(prev => new Set([...prev, verseNum]));
        } else {
          removedCount++;
          setFavoriteVerses(prev => {
            const newSet = new Set(prev);
            newSet.delete(verseNum);
            return newSet;
          });
        }
      }
    });

    if (addedCount > 0) {
      alert(`✅ ${addedCount} versículo(s) adicionado(s) aos favoritos!`);
    }
    if (removedCount > 0) {
      alert(`❌ ${removedCount} versículo(s) removido(s) dos favoritos!`);
    }

    setSelectedVerses([]);
  };

  const handleHighlight = () => {
    if (selectedVerses.length === 0) {
      alert('Selecione versículos para destacar!');
      return;
    }
    
    selectedVerses.forEach(verseNum => {
      const key = `${bookName}-${chapter}-${verseNum}`;
      setHighlights(prev => {
        const newHighlights = new Set(prev);
        if (newHighlights.has(key)) {
          newHighlights.delete(key);
        } else {
          newHighlights.add(key);
        }
        return newHighlights;
      });
    });
    
    alert(`${selectedVerses.length} versículo(s) destacado(s)!`);
  };

  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
  };

  const handleChapterShare = () => {
    setShowChapterShareMenu(!showChapterShareMenu);
  };

  const shareChapterVia = (platform: string) => {
    // Montar o texto completo do capítulo
    const chapterText = verses
      .map(v => `${v.number}. ${v.text}`)
      .join('\n\n');
    
    const fullText = `${bookName} - Capítulo ${chapter}\n\n${chapterText}\n\nLeia a Bíblia completa no app!`;
    const url = window.location.href;
    
    switch(platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(fullText)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(fullText)}`, '_blank');
        break;
      case 'twitter':
        const shortText = `${bookName} - Capítulo ${chapter}\n\nLeia a Bíblia completa no app!`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shortText)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(bookName + ' - Capítulo ' + chapter)}&body=${encodeURIComponent(fullText + '\n\n' + url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(fullText);
        alert('Capítulo copiado para área de transferência!');
        break;
      case 'native':
        if (navigator.share) {
          navigator.share({
            title: `${bookName} - Capítulo ${chapter}`,
            text: fullText,
            url: url
          }).catch(() => {
            navigator.clipboard.writeText(fullText);
            alert('Capítulo copiado para área de transferência!');
          });
        }
        break;
    }
    
    setShowChapterShareMenu(false);
  };

  const shareVia = (platform: string) => {
    const text = `${bookName} ${chapter}\n\nLeia a Bíblia completa no app!`;
    const url = window.location.href;
    
    switch(platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(bookName + ' ' + chapter)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copiado para área de transferência!');
        break;
      case 'native':
        if (navigator.share) {
          navigator.share({
            title: `${bookName} ${chapter}`,
            text: text,
            url: url
          }).catch(() => {
            navigator.clipboard.writeText(url);
            alert('Link copiado para área de transferência!');
          });
        }
        break;
    }
    
    setShowShareMenu(false);
  };

  const isHighlighted = (verseNumber: number) => {
    return highlights.has(`${bookName}-${chapter}-${verseNumber}`);
  };

  const isVerseFav = (verseNumber: number) => {
    return favoriteVerses.has(verseNumber);
  };

  return (
    <div className="space-y-4">
      {/* Reading Controls */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-md`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFontSize(Math.max(12, fontSize - 2))}
              className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
            >
              <Type className={`w-4 h-4 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
            </button>
            <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-700'}`}>
              {fontSize}px
            </span>
            <button
              onClick={() => setFontSize(Math.min(24, fontSize + 2))}
              className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
            >
              <Type className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
            </button>

            {/* Botão de Favoritar Capítulo */}
            <div className={`w-px h-6 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'} mx-2`}></div>
            <button
              onClick={handleFavoriteChapter}
              className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
              title={isFavorite ? 'Remover capítulo dos favoritos' : 'Adicionar capítulo aos favoritos'}
            >
              <Heart 
                className={`w-5 h-5 transition-all ${
                  isFavorite
                    ? 'fill-red-500 text-red-500'
                    : darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'
                }`}
              />
            </button>

            {/* Botão de Compartilhar Capítulo */}
            <div className="relative">
              <button
                onClick={handleChapterShare}
                className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
                title="Compartilhar capítulo completo"
              >
                <Share2 
                  className={`w-5 h-5 ${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-500 hover:text-purple-500'}`}
                />
              </button>

              {/* Menu de Compartilhar Capítulo */}
              {showChapterShareMenu && (
                <div className={`absolute top-full left-0 mt-2 ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl shadow-2xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-3 w-64 z-50`}>
                  <div className="space-y-1">
                    <button
                      onClick={() => shareChapterVia('whatsapp')}
                      className={`w-full flex items-center gap-3 p-3 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} rounded-lg transition-colors`}
                    >
                      <MessageCircle className="w-5 h-5 text-green-500" />
                      <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        WhatsApp
                      </span>
                    </button>

                    <button
                      onClick={() => shareChapterVia('facebook')}
                      className={`w-full flex items-center gap-3 p-3 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} rounded-lg transition-colors`}
                    >
                      <Facebook className="w-5 h-5 text-blue-600" />
                      <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        Facebook
                      </span>
                    </button>

                    <button
                      onClick={() => shareChapterVia('twitter')}
                      className={`w-full flex items-center gap-3 p-3 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} rounded-lg transition-colors`}
                    >
                      <Twitter className="w-5 h-5 text-sky-500" />
                      <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        Twitter
                      </span>
                    </button>

                    <button
                      onClick={() => shareChapterVia('email')}
                      className={`w-full flex items-center gap-3 p-3 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} rounded-lg transition-colors`}
                    >
                      <Mail className="w-5 h-5 text-red-500" />
                      <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        Email
                      </span>
                    </button>

                    <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} my-2`}></div>

                    <button
                      onClick={() => shareChapterVia('copy')}
                      className={`w-full flex items-center gap-3 p-3 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} rounded-lg transition-colors`}
                    >
                      <Copy className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                      <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        Copiar capítulo
                      </span>
                    </button>

                    {navigator.share && (
                      <button
                        onClick={() => shareChapterVia('native')}
                        className={`w-full flex items-center gap-3 p-3 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} rounded-lg transition-colors`}
                      >
                        <Share2 className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                        <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                          Mais opções...
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {selectedVerses.length > 0 && (
            <div className="flex items-center gap-3">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {selectedVerses.length} selecionado(s)
              </span>
              <button
                onClick={copySelectedVerses}
                className={`flex items-center gap-2 px-3 py-2 ${
                  darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                } text-white rounded-lg transition-colors`}
              >
                <Copy className="w-4 h-4" />
                <span className="text-sm font-semibold">Copiar</span>
              </button>
            </div>
          )}
        </div>

        {/* Chapter Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => chapter > 1 && onNavigate(chapter - 1)}
            disabled={chapter <= 1}
            className={`flex items-center gap-2 px-4 py-2 ${
              chapter <= 1
                ? darkMode ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            } rounded-lg transition-colors`}
          >
            <ChevronLeft className={`w-4 h-4 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
            <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-700'}`}>
              Anterior
            </span>
          </button>

          <div className={`text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            <div className="text-sm font-semibold">{bookName}</div>
            <div className="text-xs text-gray-500">Capítulo {chapter}</div>
          </div>

          <button
            onClick={() => chapter < totalChapters && onNavigate(chapter + 1)}
            disabled={chapter >= totalChapters}
            className={`flex items-center gap-2 px-4 py-2 ${
              chapter >= totalChapters
                ? darkMode ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            } rounded-lg transition-colors`}
          >
            <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-700'}`}>
              Próximo
            </span>
            <ChevronRight className={`w-4 h-4 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
          </button>
        </div>
      </div>

      {/* Verses */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-md`}>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Loader2 className={`w-8 h-8 animate-spin ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Carregando versículos...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className={`text-sm ${darkMode ? 'text-red-400' : 'text-red-600'} mb-2`}>
              {error}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {verses.map((verse) => {
              const isFromFavorite = highlightVerse === verse.number;
              return (
              <div
                key={verse.number}
                id={`verse-${verse.number}`}
                onClick={() => toggleVerseSelection(verse.number)}
                className={`flex gap-3 p-3 rounded-lg cursor-pointer transition-all relative ${
                  isFromFavorite
                    ? darkMode
                      ? 'bg-amber-900/50 border-2 border-amber-500 shadow-lg ring-2 ring-amber-500/50'
                      : 'bg-amber-50 border-2 border-amber-400 shadow-lg ring-2 ring-amber-400/50'
                    : selectedVerses.includes(verse.number)
                    ? darkMode
                      ? 'bg-blue-900/50 border-2 border-blue-500'
                      : 'bg-blue-50 border-2 border-blue-400'
                    : isHighlighted(verse.number)
                    ? darkMode
                      ? 'bg-yellow-900/30 hover:bg-yellow-900/40'
                      : 'bg-yellow-50 hover:bg-yellow-100'
                    : darkMode
                    ? 'hover:bg-gray-700'
                    : 'hover:bg-gray-50'
                }`}
              >
                <span
                  className={`font-bold text-sm flex-shrink-0 ${
                    selectedVerses.includes(verse.number)
                      ? darkMode
                        ? 'text-blue-400'
                        : 'text-blue-600'
                      : darkMode
                      ? 'text-gray-500'
                      : 'text-gray-400'
                  }`}
                >
                  {verse.number}
                </span>
                <p
                  className={`leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {verse.text}
                </p>
                {isVerseFav(verse.number) && (
                  <Heart className="w-4 h-4 text-red-500 fill-red-500 absolute top-2 right-2" />
                )}
              </div>
            )}
            )}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-md relative`}>
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={handleFavoriteVerses}
            className={`flex flex-col items-center gap-2 p-3 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} rounded-lg transition-colors`}
          >
            <Heart 
              className={`w-6 h-6 ${darkMode ? 'text-red-400' : 'text-red-500'}`}
            />
            <span className={`text-xs font-semibold ${darkMode ? 'text-white' : 'text-gray-700'}`}>
              Favoritar
            </span>
          </button>
          
          <button 
            onClick={handleHighlight}
            className={`flex flex-col items-center gap-2 p-3 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} rounded-lg transition-colors`}
          >
            <Highlighter className={`w-6 h-6 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
            <span className={`text-xs font-semibold ${darkMode ? 'text-white' : 'text-gray-700'}`}>
              Destacar
            </span>
          </button>
          
          <button 
            onClick={handleShare}
            className={`flex flex-col items-center gap-2 p-3 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} rounded-lg transition-colors`}
          >
            <Share2 className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`} />
            <span className={`text-xs font-semibold ${darkMode ? 'text-white' : 'text-gray-700'}`}>
              Compartilhar
            </span>
          </button>
        </div>

        {/* Share Menu (estilo YouTube) */}
        {showShareMenu && (
          <div className={`absolute bottom-full right-0 mb-2 ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl shadow-2xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-3 w-64 z-50`}>
            <div className="space-y-1">
              <button
                onClick={() => shareVia('whatsapp')}
                className={`w-full flex items-center gap-3 p-3 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} rounded-lg transition-colors`}
              >
                <MessageCircle className="w-5 h-5 text-green-500" />
                <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                  WhatsApp
                </span>
              </button>

              <button
                onClick={() => shareVia('facebook')}
                className={`w-full flex items-center gap-3 p-3 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} rounded-lg transition-colors`}
              >
                <Facebook className="w-5 h-5 text-blue-600" />
                <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                  Facebook
                </span>
              </button>

              <button
                onClick={() => shareVia('twitter')}
                className={`w-full flex items-center gap-3 p-3 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} rounded-lg transition-colors`}
              >
                <Twitter className="w-5 h-5 text-sky-500" />
                <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                  Twitter
                </span>
              </button>

              <button
                onClick={() => shareVia('email')}
                className={`w-full flex items-center gap-3 p-3 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} rounded-lg transition-colors`}
              >
                <Mail className="w-5 h-5 text-red-500" />
                <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                  Email
                </span>
              </button>

              <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} my-2`}></div>

              <button
                onClick={() => shareVia('copy')}
                className={`w-full flex items-center gap-3 p-3 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} rounded-lg transition-colors`}
              >
                <LinkIcon className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                  Copiar link
                </span>
              </button>

              {navigator.share && (
                <button
                  onClick={() => shareVia('native')}
                  className={`w-full flex items-center gap-3 p-3 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} rounded-lg transition-colors`}
                >
                  <Share2 className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                    Mais opções...
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
