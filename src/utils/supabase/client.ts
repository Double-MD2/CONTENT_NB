import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Validação crítica: verificar se as variáveis existem
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ ERRO CRÍTICO: Variáveis de ambiente do Supabase não configuradas!');
    console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Configurada' : '❌ Ausente');
    console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Configurada' : '❌ Ausente');
    throw new Error('Supabase não está configurado. Configure as variáveis de ambiente.');
  }

  // Validação da URL: remover barras extras e /rest/v1
  let cleanUrl = supabaseUrl.trim();
  
  // Remover /rest/v1 se existir
  if (cleanUrl.endsWith('/rest/v1')) {
    cleanUrl = cleanUrl.replace('/rest/v1', '');
    console.warn('⚠️ URL do Supabase continha /rest/v1 - removido automaticamente');
  }
  
  // Remover barras finais
  cleanUrl = cleanUrl.replace(/\/+$/, '');

  console.log('🔧 Criando cliente Supabase com:', {
    url: cleanUrl,
    keyLength: supabaseAnonKey.length,
    keyPrefix: supabaseAnonKey.substring(0, 20) + '...'
  });

  return createBrowserClient(cleanUrl, supabaseAnonKey);
}
