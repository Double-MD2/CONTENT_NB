'use client';

import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Variáveis de ambiente do Supabase não configuradas.");
}

// Validar formato da URL
if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('.supabase.co')) {
  throw new Error(`URL do Supabase inválida: ${supabaseUrl}. Deve começar com https:// e terminar com .supabase.co`);
}

// Validar formato da chave (JWT básico)
if (!supabaseAnonKey.startsWith('eyJ')) {
  throw new Error('ANON_KEY do Supabase inválida. Deve ser uma JWT válida começando com "eyJ"');
}

// Detectar ambiente preview
const isPreview = typeof window !== 'undefined' && window.location.hostname.endsWith('.lasy.app');

// Log de diagnóstico APENAS no preview (não em produção)
if (isPreview && typeof window !== 'undefined') {
  console.log('[SUPABASE CLIENT - PREVIEW] 🔍 Diagnóstico:');
  console.log('[SUPABASE CLIENT - PREVIEW] Hostname:', window.location.hostname);
  console.log('[SUPABASE CLIENT - PREVIEW] URL (6 primeiros):', supabaseUrl.substring(0, 30) + '...');
  console.log('[SUPABASE CLIENT - PREVIEW] Key (6 primeiros):', supabaseAnonKey.substring(0, 6) + '...');
}

// CRÍTICO: Configurar cookies compatíveis com preview (HTTPS + subdomínio)
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Garantir que a sessão seja persistida em cookies
    persistSession: true,
    // Auto-refresh do token
    autoRefreshToken: true,
    // Detectar sessão na URL (ex.: magic links)
    detectSessionInUrl: true,
    // PKCE flow para maior segurança
    flowType: 'pkce',
  },
  cookieOptions: {
    // Opções de cookies otimizadas para HTTPS (preview e produção)
    // SameSite 'lax' permite cookies em navegação
    sameSite: 'lax',
    // Secure=true (ambos preview e produção são HTTPS)
    secure: true,
    // Path padrão
    path: '/',
    // NÃO setar domain manualmente - deixar default do navegador
  },
});

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
