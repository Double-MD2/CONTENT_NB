'use client';

import { useState } from 'react';
import { ChevronLeft, Search, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Estrutura da Bíblia com divisões lógicas
const bibleBooks = [
  {
    testament: 'Antigo Testamento',
    sections: [
      {
        name: 'Pentateuco',
        books: [
          { name: 'Gênesis', chapters: 50 },
          { name: 'Êxodo', chapters: 40 },
          { name: 'Levítico', chapters: 27 },
          { name: 'Números', chapters: 36 },
          { name: 'Deuteronômio', chapters: 34 },
        ],
      },
      {
        name: 'Livros Históricos',
        books: [
          { name: 'Josué', chapters: 24 },
          { name: 'Juízes', chapters: 21 },
          { name: 'Rute', chapters: 4 },
          { name: '1 Samuel', chapters: 31 },
          { name: '2 Samuel', chapters: 24 },
          { name: '1 Reis', chapters: 22 },
          { name: '2 Reis', chapters: 25 },
          { name: '1 Crônicas', chapters: 29 },
          { name: '2 Crônicas', chapters: 36 },
          { name: 'Esdras', chapters: 10 },
          { name: 'Neemias', chapters: 13 },
          { name: 'Ester', chapters: 10 },
        ],
      },
      {
        name: 'Livros Poéticos',
        books: [
          { name: 'Jó', chapters: 42 },
          { name: 'Salmos', chapters: 150 },
          { name: 'Provérbios', chapters: 31 },
          { name: 'Eclesiastes', chapters: 12 },
          { name: 'Cânticos', chapters: 8 },
        ],
      },
      {
        name: 'Profetas Maiores',
        books: [
          { name: 'Isaías', chapters: 66 },
          { name: 'Jeremias', chapters: 52 },
          { name: 'Lamentações', chapters: 5 },
          { name: 'Ezequiel', chapters: 48 },
          { name: 'Daniel', chapters: 12 },
        ],
      },
      {
        name: 'Profetas Menores',
        books: [
          { name: 'Oséias', chapters: 14 },
          { name: 'Joel', chapters: 3 },
          { name: 'Amós', chapters: 9 },
          { name: 'Obadias', chapters: 1 },
          { name: 'Jonas', chapters: 4 },
          { name: 'Miquéias', chapters: 7 },
          { name: 'Naum', chapters: 3 },
          { name: 'Habacuque', chapters: 3 },
          { name: 'Sofonias', chapters: 3 },
          { name: 'Ageu', chapters: 2 },
          { name: 'Zacarias', chapters: 14 },
          { name: 'Malaquias', chapters: 4 },
        ],
      },
    ],
  },
  {
    testament: 'Novo Testamento',
    sections: [
      {
        name: 'Evangelhos',
        books: [
          { name: 'Mateus', chapters: 28 },
          { name: 'Marcos', chapters: 16 },
          { name: 'Lucas', chapters: 24 },
          { name: 'João', chapters: 21 },
        ],
      },
      {
        name: 'História',
        books: [
          { name: 'Atos', chapters: 28 },
        ],
      },
      {
        name: 'Cartas de Paulo',
        books: [
          { name: 'Romanos', chapters: 16 },
          { name: '1 Coríntios', chapters: 16 },
          { name: '2 Coríntios', chapters: 13 },
          { name: 'Gálatas', chapters: 6 },
          { name: 'Efésios', chapters: 6 },
          { name: 'Filipenses', chapters: 4 },
          { name: 'Colossenses', chapters: 4 },
          { name: '1 Tessalonicenses', chapters: 5 },
          { name: '2 Tessalonicenses', chapters: 3 },
          { name: '1 Timóteo', chapters: 6 },
          { name: '2 Timóteo', chapters: 4 },
          { name: 'Tito', chapters: 3 },
          { name: 'Filemom', chapters: 1 },
        ],
      },
      {
        name: 'Cartas Gerais',
        books: [
          { name: 'Hebreus', chapters: 13 },
          { name: 'Tiago', chapters: 5 },
          { name: '1 Pedro', chapters: 5 },
          { name: '2 Pedro', chapters: 3 },
          { name: '1 João', chapters: 5 },
          { name: '2 João', chapters: 1 },
          { name: '3 João', chapters: 1 },
          { name: 'Judas', chapters: 1 },
        ],
      },
      {
        name: 'Profecia',
        books: [
          { name: 'Apocalipse', chapters: 22 },
        ],
      },
    ],
  },
];

export default function BiblePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState<{ name: string; chapters: number } | null>(null);

  const filteredBible = bibleBooks.map(testament => ({
    ...testament,
    sections: testament.sections.map(section => ({
      ...section,
      books: section.books.filter(book =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    })).filter(section => section.books.length > 0),
  })).filter(testament => testament.sections.length > 0);

  if (selectedBook) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedBook(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{selectedBook.name}</h1>
                <p className="text-sm text-gray-500">{selectedBook.chapters} capítulos</p>
              </div>
            </div>
          </div>
        </header>

        {/* Chapters Grid */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
            {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map((chapter) => (
              <button
                key={chapter}
                className="aspect-square bg-white rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center text-lg font-semibold text-gray-700 hover:bg-gradient-to-br hover:from-amber-400 hover:to-amber-500 hover:text-white"
              >
                {chapter}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-500" />
              <h1 className="text-xl font-bold text-gray-800">Bíblia Sagrada</h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar livro..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
            />
          </div>
        </div>
      </header>

      {/* Bible Content */}
      <div className="container mx-auto px-4 py-6 space-y-8">
        {filteredBible.map((testament, testamentIdx) => (
          <div key={testamentIdx}>
            {/* Testament Title */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{testament.testament}</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
            </div>

            {/* Sections */}
            <div className="space-y-6">
              {testament.sections.map((section, sectionIdx) => (
                <div key={sectionIdx} className="bg-white rounded-2xl shadow-md p-6">
                  {/* Section Title */}
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    {section.name}
                  </h3>

                  {/* Books Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {section.books.map((book, bookIdx) => (
                      <button
                        key={bookIdx}
                        onClick={() => setSelectedBook(book)}
                        className="bg-gradient-to-br from-amber-50 to-white hover:from-amber-100 hover:to-amber-50 border border-amber-200 rounded-xl p-4 text-left transition-all hover:shadow-md hover:scale-105 group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-800 group-hover:text-amber-600 transition-colors">
                              {book.name}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                              {book.chapters} {book.chapters === 1 ? 'capítulo' : 'capítulos'}
                            </p>
                          </div>
                          <BookOpen className="w-5 h-5 text-amber-400 group-hover:text-amber-500 transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredBible.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum livro encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}
