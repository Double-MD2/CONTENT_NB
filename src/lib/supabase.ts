import { createBrowserClient } from '@supabase/ssr';

// Função helper para criar cliente Supabase no browser
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Função helper para verificar se o Supabase está configurado corretamente
export const isSupabaseConfigured = (): boolean => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  const isConfigured = Boolean(
    supabaseUrl && 
    supabaseAnonKey && 
    supabaseUrl !== '' && 
    supabaseAnonKey !== '' &&
    !supabaseUrl.includes('placeholder') &&
    !supabaseAnonKey.includes('placeholder')
  );
  
  if (!isConfigured) {
    console.warn('⚠️ Supabase não está configurado. Configure as variáveis de ambiente.');
  }
  
  return isConfigured;
};

// Tipos para o banco de dados
export interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
  updated_at: string;
}

export interface UserData {
  id: string;
  user_id: string;
  consecutive_days: number;
  last_access_date: string | null;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface AccessHistory {
  id: string;
  user_id: string;
  access_date: string;
  accessed: boolean;
  created_at: string;
}
