'use client';

import { useState } from 'react';
import { ArrowLeft, Search, BookOpen, Heart, Share2, Bookmark, Settings, Moon, Sun } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BibleBooks from '@/components/bible/BibleBooks';
import BibleChapters from '@/components/bible/BibleChapters';
import BibleReader from '@/components/bible/BibleReader';
import BibleSearch from '@/components/bible/BibleSearch';

type ViewMode = 'books' | 'chapters' | 'reader' | 'search';

const bookChapters: Record<string, number> = {
  'Gênesis': 50, 'Êxodo': 40, 'Levítico': 27, 'Números': 36, 'Deuteronômio': 34,
  'Josué': 24, 'Juízes': 21, 'Rute': 4, '1 Samuel': 31, '2 Samuel': 24,
  '1 Reis': 22, '2 Reis': 25, '1 Crônicas': 29, '2 Crônicas': 36, 'Esdras': 10,
  'Neemias': 13, 'Ester': 10, 'Jó': 42, 'Salmos': 150, 'Provérbios': 31,
  'Eclesiastes': 12, 'Cânticos': 8, 'Isaías': 66, 'Jeremias': 52, 'Lamentações': 5,
  'Ezequiel': 48, 'Daniel': 12, 'Oséias': 14, 'Joel': 3, 'Amós': 9,
  'Obadias': 1, 'Jonas': 4, 'Miquéias': 7, 'Naum': 3, 'Habacuque': 3,
  'Sofonias': 3, 'Ageu': 2, 'Zacarias': 14, 'Malaquias': 4,
  'Mateus': 28, 'Marcos': 16, 'Lucas': 24, 'João': 21, 'Atos': 28,
  'Romanos': 16, '1 Coríntios': 16, '2 Coríntios': 13, 'Gálatas': 6, 'Efésios': 6,
  'Filipenses': 4, 'Colossenses': 4, '1 Tessalonicenses': 5, '2 Tessalonicenses': 3,
  '1 Timóteo': 6, '2 Timóteo': 4, 'Tito': 3, 'Filemom': 1, 'Hebreus': 13,
  'Tiago': 5, '1 Pedro': 5, '2 Pedro': 3, '1 João': 5, '2 João': 1,
  '3 João': 1, 'Judas': 1, 'Apocalipse': 22,
};

export default function BiblePage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>('books');
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleBookSelect = (bookName: string) => {
    setSelectedBook(bookName);
    setViewMode('chapters');
  };

  const handleChapterSelect = (chapterNumber: number) => {
    setSelectedChapter(chapterNumber);
    setViewMode('reader');
  };

  const handleChapterNavigate = (newChapter: number) => {
    setSelectedChapter(newChapter);
  };

  const handleBack = () => {
    if (viewMode === 'reader') {
      setViewMode('chapters');
      setSelectedChapter(null);
    } else if (viewMode === 'chapters') {
      setViewMode('books');
      setSelectedBook(null);
    } else if (viewMode === 'search') {
      setViewMode('books');
    } else {
      router.push('/home');
    }
  };

  const getTitle = () => {
    if (viewMode === 'search') return 'Buscar';
    if (viewMode === 'reader' && selectedBook && selectedChapter) {
      return `${selectedBook} ${selectedChapter}`;
    }
    if (viewMode === 'chapters' && selectedBook) return selectedBook;
    return 'Bíblia Sagrada';
  };

  const getTotalChapters = () => {
    return selectedBook ? bookChapters[selectedBook] || 0 : 0;
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-blue-50 to-white'} pb-20`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm sticky top-0 z-40`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
            >
              <ArrowLeft className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
            </button>
            
            <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {getTitle()}
            </h1>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('search')}
                className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
              >
                <Search className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
              >
                {darkMode ? (
                  <Sun className="w-6 h-6 text-white" />
                ) : (
                  <Moon className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {viewMode === 'books' && (
          <BibleBooks onSelectBook={handleBookSelect} darkMode={darkMode} />
        )}
        
        {viewMode === 'chapters' && selectedBook && (
          <BibleChapters
            bookName={selectedBook}
            onSelectChapter={handleChapterSelect}
            darkMode={darkMode}
          />
        )}
        
        {viewMode === 'reader' && selectedBook && selectedChapter && (
          <BibleReader
            bookName={selectedBook}
            chapter={selectedChapter}
            darkMode={darkMode}
            onNavigate={handleChapterNavigate}
            totalChapters={getTotalChapters()}
          />
        )}
        
        {viewMode === 'search' && (
          <BibleSearch darkMode={darkMode} />
        )}
      </div>


    </div>
  );
}
