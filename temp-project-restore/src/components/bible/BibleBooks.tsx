'use client';

import { Book } from 'lucide-react';

interface BibleBooksProps {
  onSelectBook: (bookName: string) => void;
  darkMode: boolean;
}

const oldTestament = [
  { name: 'Gênesis', abbr: 'Gn', chapters: 50 },
  { name: 'Êxodo', abbr: 'Ex', chapters: 40 },
  { name: 'Levítico', abbr: 'Lv', chapters: 27 },
  { name: 'Números', abbr: 'Nm', chapters: 36 },
  { name: 'Deuteronômio', abbr: 'Dt', chapters: 34 },
  { name: 'Josué', abbr: 'Js', chapters: 24 },
  { name: 'Juízes', abbr: 'Jz', chapters: 21 },
  { name: 'Rute', abbr: 'Rt', chapters: 4 },
  { name: '1 Samuel', abbr: '1Sm', chapters: 31 },
  { name: '2 Samuel', abbr: '2Sm', chapters: 24 },
  { name: '1 Reis', abbr: '1Rs', chapters: 22 },
  { name: '2 Reis', abbr: '2Rs', chapters: 25 },
  { name: '1 Crônicas', abbr: '1Cr', chapters: 29 },
  { name: '2 Crônicas', abbr: '2Cr', chapters: 36 },
  { name: 'Esdras', abbr: 'Ed', chapters: 10 },
  { name: 'Neemias', abbr: 'Ne', chapters: 13 },
  { name: 'Ester', abbr: 'Et', chapters: 10 },
  { name: 'Jó', abbr: 'Jó', chapters: 42 },
  { name: 'Salmos', abbr: 'Sl', chapters: 150 },
  { name: 'Provérbios', abbr: 'Pv', chapters: 31 },
  { name: 'Eclesiastes', abbr: 'Ec', chapters: 12 },
  { name: 'Cânticos', abbr: 'Ct', chapters: 8 },
  { name: 'Isaías', abbr: 'Is', chapters: 66 },
  { name: 'Jeremias', abbr: 'Jr', chapters: 52 },
  { name: 'Lamentações', abbr: 'Lm', chapters: 5 },
  { name: 'Ezequiel', abbr: 'Ez', chapters: 48 },
  { name: 'Daniel', abbr: 'Dn', chapters: 12 },
  { name: 'Oséias', abbr: 'Os', chapters: 14 },
  { name: 'Joel', abbr: 'Jl', chapters: 3 },
  { name: 'Amós', abbr: 'Am', chapters: 9 },
  { name: 'Obadias', abbr: 'Ob', chapters: 1 },
  { name: 'Jonas', abbr: 'Jn', chapters: 4 },
  { name: 'Miquéias', abbr: 'Mq', chapters: 7 },
  { name: 'Naum', abbr: 'Na', chapters: 3 },
  { name: 'Habacuque', abbr: 'Hc', chapters: 3 },
  { name: 'Sofonias', abbr: 'Sf', chapters: 3 },
  { name: 'Ageu', abbr: 'Ag', chapters: 2 },
  { name: 'Zacarias', abbr: 'Zc', chapters: 14 },
  { name: 'Malaquias', abbr: 'Ml', chapters: 4 },
];

const newTestament = [
  { name: 'Mateus', abbr: 'Mt', chapters: 28 },
  { name: 'Marcos', abbr: 'Mc', chapters: 16 },
  { name: 'Lucas', abbr: 'Lc', chapters: 24 },
  { name: 'João', abbr: 'Jo', chapters: 21 },
  { name: 'Atos', abbr: 'At', chapters: 28 },
  { name: 'Romanos', abbr: 'Rm', chapters: 16 },
  { name: '1 Coríntios', abbr: '1Co', chapters: 16 },
  { name: '2 Coríntios', abbr: '2Co', chapters: 13 },
  { name: 'Gálatas', abbr: 'Gl', chapters: 6 },
  { name: 'Efésios', abbr: 'Ef', chapters: 6 },
  { name: 'Filipenses', abbr: 'Fp', chapters: 4 },
  { name: 'Colossenses', abbr: 'Cl', chapters: 4 },
  { name: '1 Tessalonicenses', abbr: '1Ts', chapters: 5 },
  { name: '2 Tessalonicenses', abbr: '2Ts', chapters: 3 },
  { name: '1 Timóteo', abbr: '1Tm', chapters: 6 },
  { name: '2 Timóteo', abbr: '2Tm', chapters: 4 },
  { name: 'Tito', abbr: 'Tt', chapters: 3 },
  { name: 'Filemom', abbr: 'Fm', chapters: 1 },
  { name: 'Hebreus', abbr: 'Hb', chapters: 13 },
  { name: 'Tiago', abbr: 'Tg', chapters: 5 },
  { name: '1 Pedro', abbr: '1Pe', chapters: 5 },
  { name: '2 Pedro', abbr: '2Pe', chapters: 3 },
  { name: '1 João', abbr: '1Jo', chapters: 5 },
  { name: '2 João', abbr: '2Jo', chapters: 1 },
  { name: '3 João', abbr: '3Jo', chapters: 1 },
  { name: 'Judas', abbr: 'Jd', chapters: 1 },
  { name: 'Apocalipse', abbr: 'Ap', chapters: 22 },
];

export default function BibleBooks({ onSelectBook, darkMode }: BibleBooksProps) {
  return (
    <div className="space-y-6">
      {/* Old Testament */}
      <div>
        <div className={`flex items-center gap-2 mb-4 pb-2 border-b-2 ${darkMode ? 'border-blue-500' : 'border-blue-400'}`}>
          <Book className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Antigo Testamento
          </h2>
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            ({oldTestament.length} livros)
          </span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {oldTestament.map((book) => (
            <button
              key={book.name}
              onClick={() => onSelectBook(book.name)}
              className={`${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' 
                  : 'bg-white hover:bg-blue-50 border-gray-200'
              } border rounded-xl p-4 text-left transition-all hover:shadow-lg hover:scale-105`}
            >
              <div className={`text-sm font-semibold mb-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {book.abbr}
              </div>
              <div className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {book.name}
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {book.chapters} capítulos
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* New Testament */}
      <div>
        <div className={`flex items-center gap-2 mb-4 pb-2 border-b-2 ${darkMode ? 'border-green-500' : 'border-green-400'}`}>
          <Book className={`w-5 h-5 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Novo Testamento
          </h2>
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            ({newTestament.length} livros)
          </span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {newTestament.map((book) => (
            <button
              key={book.name}
              onClick={() => onSelectBook(book.name)}
              className={`${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' 
                  : 'bg-white hover:bg-green-50 border-gray-200'
              } border rounded-xl p-4 text-left transition-all hover:shadow-lg hover:scale-105`}
            >
              <div className={`text-sm font-semibold mb-1 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                {book.abbr}
              </div>
              <div className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {book.name}
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {book.chapters} capítulos
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
