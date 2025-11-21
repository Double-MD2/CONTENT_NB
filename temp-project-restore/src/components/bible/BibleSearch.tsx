'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface BibleSearchProps {
  darkMode: boolean;
}

interface SearchResult {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

const sampleResults: SearchResult[] = [
  {
    book: 'João',
    chapter: 3,
    verse: 16,
    text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.',
  },
  {
    book: '1 João',
    chapter: 4,
    verse: 8,
    text: 'Aquele que não ama não conhece a Deus, porque Deus é amor.',
  },
  {
    book: 'Romanos',
    chapter: 8,
    verse: 28,
    text: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados por seu decreto.',
  },
];

export default function BibleSearch({ darkMode }: BibleSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Simular busca
      setTimeout(() => {
        setResults(sampleResults);
        setIsSearching(false);
      }, 500);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setResults([]);
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-md`}>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Buscar versículos, palavras ou temas..."
            className={`w-full pl-12 pr-12 py-3 ${
              darkMode
                ? 'bg-gray-700 text-white placeholder-gray-400'
                : 'bg-gray-100 text-gray-800 placeholder-gray-500'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          
          {searchQuery && (
            <button
              onClick={clearSearch}
              className={`absolute right-4 top-1/2 -translate-y-1/2 p-1 ${
                darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
              } rounded-full transition-colors`}
            >
              <X className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </button>
          )}
        </div>

        <button
          onClick={handleSearch}
          disabled={!searchQuery.trim() || isSearching}
          className={`w-full mt-3 py-3 ${
            darkMode
              ? 'bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700'
              : 'bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300'
          } text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed`}
        >
          {isSearching ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {/* Quick Searches */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-md`}>
        <h3 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Buscas Populares
        </h3>
        <div className="flex flex-wrap gap-2">
          {['amor', 'fé', 'esperança', 'salvação', 'paz', 'perdão'].map((term) => (
            <button
              key={term}
              onClick={() => {
                setSearchQuery(term);
                handleSearch();
              }}
              className={`px-4 py-2 ${
                darkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              } rounded-full text-sm font-medium transition-colors`}
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results */}
      {results.length > 0 && (
        <div className="space-y-3">
          <div className={`flex items-center justify-between ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            <h3 className="text-lg font-bold">Resultados</h3>
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {results.length} encontrado(s)
            </span>
          </div>

          {results.map((result, index) => (
            <div
              key={index}
              className={`${
                darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
              } rounded-xl p-4 shadow-md cursor-pointer transition-all`}
            >
              <div className={`flex items-center gap-2 mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                <span className="font-bold text-sm">
                  {result.book} {result.chapter}:{result.verse}
                </span>
              </div>
              <p className={`leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                {result.text}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isSearching && results.length === 0 && searchQuery && (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 shadow-md text-center`}>
          <Search className={`w-12 h-12 mx-auto mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Nenhum resultado encontrado para "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
}
