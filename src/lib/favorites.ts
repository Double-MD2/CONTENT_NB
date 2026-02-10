// Sistema de gerenciamento de favoritos (localStorage)

export interface FavoriteChapter {
  id: string;
  book: string;
  chapter: number;
  timestamp: number;
}

export interface FavoriteVerse {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  timestamp: number;
}

// Chaves do localStorage
const CHAPTERS_KEY = 'bible_favorite_chapters';
const VERSES_KEY = 'bible_favorite_verses';

// ============= CAPÍTULOS FAVORITOS =============

export function getFavoriteChapters(): FavoriteChapter[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(CHAPTERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao carregar capítulos favoritos:', error);
    return [];
  }
}

export function addFavoriteChapter(book: string, chapter: number): void {
  const id = `${book}-${chapter}`;
  const favorites = getFavoriteChapters();
  
  // Verificar se já existe
  if (favorites.some(f => f.id === id)) {
    return;
  }
  
  const newFavorite: FavoriteChapter = {
    id,
    book,
    chapter,
    timestamp: Date.now()
  };
  
  favorites.push(newFavorite);
  localStorage.setItem(CHAPTERS_KEY, JSON.stringify(favorites));
}

export function removeFavoriteChapter(book: string, chapter: number): void {
  const id = `${book}-${chapter}`;
  const favorites = getFavoriteChapters();
  const filtered = favorites.filter(f => f.id !== id);
  localStorage.setItem(CHAPTERS_KEY, JSON.stringify(filtered));
}

export function isChapterFavorite(book: string, chapter: number): boolean {
  const id = `${book}-${chapter}`;
  const favorites = getFavoriteChapters();
  return favorites.some(f => f.id === id);
}

export function toggleFavoriteChapter(book: string, chapter: number): boolean {
  if (isChapterFavorite(book, chapter)) {
    removeFavoriteChapter(book, chapter);
    return false;
  } else {
    addFavoriteChapter(book, chapter);
    return true;
  }
}

// ============= VERSÍCULOS FAVORITOS =============

export function getFavoriteVerses(): FavoriteVerse[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(VERSES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao carregar versículos favoritos:', error);
    return [];
  }
}

export function addFavoriteVerse(book: string, chapter: number, verse: number, text: string): void {
  const id = `${book}-${chapter}-${verse}`;
  const favorites = getFavoriteVerses();
  
  // Verificar se já existe
  if (favorites.some(f => f.id === id)) {
    return;
  }
  
  const newFavorite: FavoriteVerse = {
    id,
    book,
    chapter,
    verse,
    text,
    timestamp: Date.now()
  };
  
  favorites.push(newFavorite);
  localStorage.setItem(VERSES_KEY, JSON.stringify(favorites));
}

export function removeFavoriteVerse(book: string, chapter: number, verse: number): void {
  const id = `${book}-${chapter}-${verse}`;
  const favorites = getFavoriteVerses();
  const filtered = favorites.filter(f => f.id !== id);
  localStorage.setItem(VERSES_KEY, JSON.stringify(filtered));
}

export function isVerseFavorite(book: string, chapter: number, verse: number): boolean {
  const id = `${book}-${chapter}-${verse}`;
  const favorites = getFavoriteVerses();
  return favorites.some(f => f.id === id);
}

export function toggleFavoriteVerse(book: string, chapter: number, verse: number, text: string): boolean {
  if (isVerseFavorite(book, chapter, verse)) {
    removeFavoriteVerse(book, chapter, verse);
    return false;
  } else {
    addFavoriteVerse(book, chapter, verse, text);
    return true;
  }
}

// ============= UTILITÁRIOS =============

export function clearAllFavorites(): void {
  localStorage.removeItem(CHAPTERS_KEY);
  localStorage.removeItem(VERSES_KEY);
}

export function exportFavorites(): string {
  const chapters = getFavoriteChapters();
  const verses = getFavoriteVerses();
  
  return JSON.stringify({
    chapters,
    verses,
    exportDate: new Date().toISOString()
  }, null, 2);
}

export function importFavorites(jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.chapters) {
      localStorage.setItem(CHAPTERS_KEY, JSON.stringify(data.chapters));
    }
    
    if (data.verses) {
      localStorage.setItem(VERSES_KEY, JSON.stringify(data.verses));
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao importar favoritos:', error);
    return false;
  }
}
