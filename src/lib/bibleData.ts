/**
 * Utilitário para carregar dados da Bíblia do arquivo AS21.json local
 * Estrutura esperada:
 * [
 *   {
 *     "abbrev": "Gn",
 *     "name": "Gênesis",
 *     "chapters": [
 *       ["versículo 1", "versículo 2", ...],  // capítulo 1
 *       ["versículo 1", "versículo 2", ...],  // capítulo 2
 *       ...
 *     ]
 *   },
 *   ...
 * ]
 */

interface BibleBook {
  abbrev: string;
  name: string;
  chapters: string[][];
}

interface BibleVerse {
  number: number;
  text: string;
}

let bibleDataCache: BibleBook[] | null = null;

/**
 * Carrega o arquivo AS21.json completo (executado uma vez e cacheado)
 */
export async function loadBibleData(): Promise<BibleBook[]> {
  if (bibleDataCache) {
    return bibleDataCache;
  }

  try {
    const response = await fetch('/AS21.json');
    if (!response.ok) {
      throw new Error(`Erro ao carregar AS21.json: ${response.status}`);
    }

    const data = await response.json();
    bibleDataCache = data;
    return data;
  } catch (error) {
    console.error('Erro ao carregar dados bíblicos:', error);
    throw new Error('Não foi possível carregar a Bíblia. Verifique sua conexão.');
  }
}

/**
 * Busca um livro pelo nome
 */
export function findBookByName(books: BibleBook[], bookName: string): BibleBook | null {
  // Normalizar o nome para comparação (remover acentos e case-insensitive)
  const normalize = (str: string) =>
    str.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const normalizedSearch = normalize(bookName);

  return books.find(book => {
    const normalizedBookName = normalize(book.name);
    const normalizedAbbrev = normalize(book.abbrev);

    return (
      normalizedBookName === normalizedSearch ||
      normalizedAbbrev === normalizedSearch ||
      normalizedBookName.includes(normalizedSearch) ||
      normalizedSearch.includes(normalizedBookName)
    );
  }) || null;
}

/**
 * Busca os versículos de um capítulo específico
 */
export async function getChapterVerses(
  bookName: string,
  chapterNumber: number
): Promise<BibleVerse[]> {
  const books = await loadBibleData();
  const book = findBookByName(books, bookName);

  if (!book) {
    throw new Error(`Livro "${bookName}" não encontrado`);
  }

  // Capítulos são 0-indexed no array, mas 1-indexed para o usuário
  const chapterIndex = chapterNumber - 1;

  if (chapterIndex < 0 || chapterIndex >= book.chapters.length) {
    throw new Error(`Capítulo ${chapterNumber} não existe em ${book.name}`);
  }

  const verses = book.chapters[chapterIndex];

  // Converter array de strings para formato estruturado
  return verses.map((text, index) => ({
    number: index + 1,
    text: text.trim()
  }));
}

/**
 * Obtém o número total de capítulos de um livro
 */
export async function getTotalChapters(bookName: string): Promise<number> {
  const books = await loadBibleData();
  const book = findBookByName(books, bookName);

  if (!book) {
    throw new Error(`Livro "${bookName}" não encontrado`);
  }

  return book.chapters.length;
}

/**
 * Lista todos os livros disponíveis
 */
export async function getAllBooks(): Promise<Array<{ name: string; abbrev: string; chapters: number }>> {
  const books = await loadBibleData();

  return books.map(book => ({
    name: book.name,
    abbrev: book.abbrev,
    chapters: book.chapters.length
  }));
}
