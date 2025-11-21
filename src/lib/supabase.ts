import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para o banco de dados
export interface UserFrequency {
  id: string;
  user_id: string;
  access_date: string;
  created_at: string;
}

export interface UserStats {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  total_access_days: number;
  last_access_date: string;
  updated_at: string;
}
