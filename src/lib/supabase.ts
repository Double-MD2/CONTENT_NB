import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
