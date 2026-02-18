// Tipos para o app Notas Bíblicas

export interface UserProfile {
  name: string;
  religion: string;
  faithDuration: string;
  bibleReadingFrequency: string;
  proximityWithGod: string;
  bibleImportance: string;
  religiousActivities: string;
  prayerPractice: string;
  sharingExperience: string;
  meditation: string;
  themesOfInterest: string[];
  openToDevotionals: string;
  ageRange: string;
  wantsNotifications: boolean;
  preferredContentFormat: string;
  expectations: string;
  spiritualDifficulties: string;
  groupStudyExperience: string;
  faithJourneyDescription: string;
  additionalInfo: string;
  profilePhoto?: string;
  favoriteVerse?: string;
  referralCode?: string; // Código de convite usado no cadastro
}

export interface DailyContent {
  id: string;
  type: 'lectionary' | 'verse' | 'devotional' | 'prayer' | 'gratitude' | 'for-you';
  title: string;
  content: string;
  reflection?: string;
  questions?: string[];
  duration: string;
  image: string;
  completed: boolean;
  theme?: string; // Para o card "Para Você"
}

export interface FrequencyData {
  date: string;
  accessed: boolean;
}
