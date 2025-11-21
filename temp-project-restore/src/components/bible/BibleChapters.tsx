'use client';

interface BibleChaptersProps {
  bookName: string;
  onSelectChapter: (chapter: number) => void;
  darkMode: boolean;
}

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

export default function BibleChapters({ bookName, onSelectChapter, darkMode }: BibleChaptersProps) {
  const totalChapters = bookChapters[bookName] || 0;
  const chapters = Array.from({ length: totalChapters }, (_, i) => i + 1);

  return (
    <div>
      <div className={`mb-6 text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <p className="text-sm">Selecione um capítulo para ler</p>
        <p className="text-xs mt-1">{totalChapters} capítulos disponíveis</p>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
        {chapters.map((chapter) => (
          <button
            key={chapter}
            onClick={() => onSelectChapter(chapter)}
            className={`${
              darkMode
                ? 'bg-gray-800 hover:bg-blue-600 border-gray-700 text-white'
                : 'bg-white hover:bg-blue-500 hover:text-white border-gray-200 text-gray-800'
            } aspect-square rounded-xl border-2 font-bold text-lg transition-all hover:shadow-lg hover:scale-110`}
          >
            {chapter}
          </button>
        ))}
      </div>
    </div>
  );
}
