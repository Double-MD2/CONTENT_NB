'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useSubscription } from '@/hooks/useSubscription';
import { ArrowLeft, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function PrayerNotePage() {
  const router = useRouter();
  const { isActive: hasAccess, loading: subscriptionLoading } = useSubscription();
  
  const [prayerText, setPrayerText] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('[PRAYER_NOTE] Erro ao verificar sessão:', error);
        router.push('/login');
        return;
      }
      
      if (!session) {
        console.warn('[PRAYER_NOTE] Usuário não autenticado');
        router.push('/login');
        return;
      }
      
      console.log('[PRAYER_NOTE] Usuário autenticado:', session.user.id);
      setUserId(session.user.id);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('[PRAYER_NOTE] Erro ao verificar autenticação:', error);
      router.push('/login');
    }
  };

  // Bloquear acesso se não for premium
  useEffect(() => {
    if (!subscriptionLoading && !hasAccess) {
      router.replace('/plans');
    }
  }, [hasAccess, subscriptionLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prayerText.trim()) {
      toast.error('Por favor, escreva seu pedido de oração.', {
        duration: 3000,
      });
      return;
    }
    
    if (!userId || !isAuthenticated) {
      console.error('[PRAYER_NOTE] Usuário não autenticado no momento do envio');
      toast.error('Você precisa estar autenticado para enviar uma nota de oração.', {
        duration: 4000,
      });
      router.push('/login');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log('[PRAYER_NOTE] Iniciando envio da nota de oração...');
      console.log('[PRAYER_NOTE] User ID:', userId);
      console.log('[PRAYER_NOTE] Prayer text length:', prayerText.trim().length);
      console.log('[PRAYER_NOTE] Instagram handle:', instagramHandle.trim() || 'não fornecido');
      
      // Verificar se o cliente Supabase está inicializado
      if (!supabase) {
        throw new Error('Cliente Supabase não inicializado');
      }
      
      // Preparar dados para inserção
      const dataToInsert = {
        user_id: userId,
        prayer_text: prayerText.trim(),
        instagram_handle: instagramHandle.trim() || null,
        created_at: new Date().toISOString(),
      };
      
      console.log('[PRAYER_NOTE] Dados a serem inseridos:', dataToInsert);
      
      // Salvar nota no Supabase
      const { data, error: insertError } = await supabase
        .from('prayer_notes')
        .insert(dataToInsert)
        .select()
        .single();

      if (insertError) {
        console.error('[PRAYER_NOTE] Erro detalhado ao salvar:', {
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint,
          code: insertError.code,
        });
        
        // Mensagens de erro mais específicas
        let errorMessage = 'Ops! Houve um problema ao enviar sua nota. Por favor, tente novamente.';
        
        if (insertError.code === '42P01') {
          errorMessage = 'A tabela de notas de oração não está configurada. Entre em contato com o suporte.';
          console.error('[PRAYER_NOTE] CRÍTICO: Tabela prayer_notes não existe no banco de dados');
        } else if (insertError.code === '23503') {
          errorMessage = 'Erro de autenticação. Por favor, faça login novamente.';
          console.error('[PRAYER_NOTE] CRÍTICO: Referência de usuário inválida');
        } else if (insertError.code === '42501') {
          errorMessage = 'Você não tem permissão para enviar notas de oração. Entre em contato com o suporte.';
          console.error('[PRAYER_NOTE] CRÍTICO: Política RLS bloqueando inserção');
        }
        
        toast.error(errorMessage, {
          duration: 5000,
        });
        setIsSubmitting(false);
        return;
      }

      console.log('[PRAYER_NOTE] Nota salva com sucesso:', data);

      // Enviar email de notificação APENAS após salvamento bem-sucedido
      try {
        console.log('[PRAYER_NOTE] Enviando notificação por email...');
        const emailResponse = await fetch('/api/send-prayer-notification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prayerNoteId: data.id,
          }),
        });

        // Validar content-type
        const emailContentType = emailResponse.headers.get('content-type');
        console.log('[PRAYER_NOTE] Email API status:', emailResponse.status);
        console.log('[PRAYER_NOTE] Email API Content-Type:', emailContentType);

        if (!emailResponse.ok) {
          console.warn('[PRAYER_NOTE] Resposta de email não OK:', emailResponse.status);

          // Só tentar parsear JSON se for JSON
          if (emailContentType?.includes('application/json')) {
            const errorData = await emailResponse.json();
            console.warn('[PRAYER_NOTE] Detalhes do erro:', errorData);
          } else {
            const bodyText = await emailResponse.text();
            console.warn('[PRAYER_NOTE] Response body:', bodyText.substring(0, 300));
          }
        } else {
          // Só parsear JSON se for JSON
          if (emailContentType?.includes('application/json')) {
            const emailResult = await emailResponse.json();
            console.log('[PRAYER_NOTE] Email enviado com sucesso:', emailResult);
          } else {
            console.warn('[PRAYER_NOTE] Email API retornou não-JSON (mas status OK)');
          }
        }
      } catch (emailError) {
        console.warn('[PRAYER_NOTE] Erro ao enviar email (não crítico):', emailError);
      }

      // Limpar formulário
      setPrayerText('');
      setInstagramHandle('');
      
      console.log('[PRAYER_NOTE] Redirecionando para página de confirmação...');
      
      // Redirecionar para página de confirmação
      router.push('/prayer-note/confirmation');
      
    } catch (error) {
      console.error('[PRAYER_NOTE] Erro inesperado:', error);
      console.error('[PRAYER_NOTE] Stack trace:', error instanceof Error ? error.stack : 'N/A');
      
      toast.error('Ops! Houve um problema ao enviar sua nota. Por favor, tente novamente.', {
        duration: 4000,
      });
      setIsSubmitting(false);
    }
  };

  if (subscriptionLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Sua Nota de Oração</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Mensagem Acolhedora */}
        <div className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl p-6 mb-8 shadow-md">
          <p className="text-gray-700 text-center leading-relaxed">
            Aqui você pode escrever aquilo que pesa no seu coração. 
            <br />
            <span className="font-semibold">Deus escuta, e nós também oramos por você.</span>
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo Principal */}
          <div>
            <label htmlFor="prayer" className="block text-sm font-semibold text-gray-700 mb-2">
              Pelo que podemos orar hoje?
            </label>
            <textarea
              id="prayer"
              value={prayerText}
              onChange={(e) => setPrayerText(e.target.value)}
              placeholder="Compartilhe seu pedido de oração..."
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all resize-none"
              required
            />
          </div>

          {/* Campo Instagram */}
          <div>
            <label htmlFor="instagram" className="block text-sm font-semibold text-gray-700 mb-2">
              Qual seu @ do Instagram? <span className="text-gray-400 font-normal">(opcional)</span>
            </label>
            <input
              id="instagram"
              type="text"
              value={instagramHandle}
              onChange={(e) => setInstagramHandle(e.target.value)}
              placeholder="@seu_instagram"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all"
            />
          </div>

          {/* Aviso de Privacidade */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <p className="text-sm text-gray-600 text-center">
              Alguns pedidos podem ser levados para momentos de oração em nossa comunidade, 
              <span className="font-semibold"> sempre de forma anônima.</span>
            </p>
          </div>

          {/* Botão Enviar */}
          <button
            type="submit"
            disabled={!prayerText.trim() || isSubmitting || !isAuthenticated}
            className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Enviar
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
