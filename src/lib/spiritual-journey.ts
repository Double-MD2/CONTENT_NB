'use client';

import { supabase, UserSpiritualJourney, SpiritualContent } from './supabase';

/**
 * Service para gerenciar a jornada espiritual do usuário
 * Implementa as regras de persistência, sequência diária e troca de tema
 */

/**
 * Buscar ou criar jornada espiritual do usuário
 */
export async function getUserSpiritualJourney(userId: string): Promise<UserSpiritualJourney | null> {
  try {
    const { data, error } = await supabase
      .from('user_spiritual_journey')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('[SPIRITUAL-JOURNEY] Erro ao buscar jornada:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('[SPIRITUAL-JOURNEY] Erro inesperado:', error);
    return null;
  }
}

/**
 * Criar nova jornada espiritual quando usuário escolhe tema pela primeira vez
 */
export async function createSpiritualJourney(
  userId: string,
  theme: string
): Promise<UserSpiritualJourney | null> {
  try {
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from('user_spiritual_journey')
      .insert({
        user_id: userId,
        current_theme: theme,
        theme_selected_at: now,
        last_theme_change_at: null,
        last_content_date: null,
        daily_content_index: 0,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) {
      console.error('[SPIRITUAL-JOURNEY] Erro ao criar jornada:', error);
      return null;
    }

    console.log('[SPIRITUAL-JOURNEY] ✅ Jornada criada com sucesso:', data);
    return data;
  } catch (error) {
    console.error('[SPIRITUAL-JOURNEY] Erro inesperado ao criar:', error);
    return null;
  }
}

/**
 * Trocar tema - Regra: 1x a cada 7 dias
 * Reseta daily_content_index e last_content_date
 */
export async function changeTheme(
  userId: string,
  newTheme: string
): Promise<{ success: boolean; message: string; daysRemaining?: number }> {
  try {
    // Buscar jornada atual
    const journey = await getUserSpiritualJourney(userId);

    if (!journey) {
      return { success: false, message: 'Jornada não encontrada' };
    }

    // Verificar se pode trocar (regra de 7 dias)
    const canChange = canChangeTheme(journey);

    if (!canChange.allowed) {
      return {
        success: false,
        message: `Você poderá trocar de tema em ${canChange.daysRemaining} ${canChange.daysRemaining === 1 ? 'dia' : 'dias'}`,
        daysRemaining: canChange.daysRemaining,
      };
    }

    // Atualizar tema
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from('user_spiritual_journey')
      .update({
        current_theme: newTheme,
        last_theme_change_at: now,
        daily_content_index: 0,
        last_content_date: null,
        updated_at: now,
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('[SPIRITUAL-JOURNEY] Erro ao trocar tema:', error);
      return { success: false, message: 'Erro ao trocar tema' };
    }

    console.log('[SPIRITUAL-JOURNEY] ✅ Tema trocado com sucesso:', data);
    return { success: true, message: 'Tema trocado com sucesso' };
  } catch (error) {
    console.error('[SPIRITUAL-JOURNEY] Erro inesperado ao trocar tema:', error);
    return { success: false, message: 'Erro inesperado' };
  }
}

/**
 * Verificar se usuário pode trocar de tema
 * Regra: 1x a cada 7 dias
 */
export function canChangeTheme(journey: UserSpiritualJourney): {
  allowed: boolean;
  daysRemaining: number;
} {
  // Se nunca trocou antes, pode trocar
  if (!journey.last_theme_change_at) {
    return { allowed: true, daysRemaining: 0 };
  }

  const lastChange = new Date(journey.last_theme_change_at);
  const now = new Date();
  const daysDiff = Math.floor((now.getTime() - lastChange.getTime()) / (1000 * 60 * 60 * 24));

  if (daysDiff >= 7) {
    return { allowed: true, daysRemaining: 0 };
  }

  return { allowed: false, daysRemaining: 7 - daysDiff };
}

/**
 * Buscar conteúdo diário
 * Incrementa daily_content_index se o dia mudou
 */
export async function getDailyContent(userId: string): Promise<SpiritualContent | null> {
  try {
    // 1. Buscar jornada do usuário
    const journey = await getUserSpiritualJourney(userId);

    if (!journey) {
      console.error('[SPIRITUAL-JOURNEY] Jornada não encontrada');
      return null;
    }

    // 2. Verificar se precisa incrementar o índice diário
    const today = getTodayString();
    let currentIndex = journey.daily_content_index;

    if (journey.last_content_date !== today) {
      // Incrementar índice
      currentIndex = journey.daily_content_index + 1;

      // Atualizar banco
      await supabase
        .from('user_spiritual_journey')
        .update({
          daily_content_index: currentIndex,
          last_content_date: today,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);

      console.log('[SPIRITUAL-JOURNEY] 📅 Novo dia! Índice atualizado para:', currentIndex);
    }

    // 3. Buscar conteúdo do tema atual
    const { data, error } = await supabase
      .from('spiritual_contents')
      .select('*')
      .eq('theme', journey.current_theme)
      .eq('day_index', currentIndex)
      .single();

    if (error) {
      // Se não encontrou conteúdo para este índice, voltar ao início (dia 0)
      if (error.code === 'PGRST116') {
        console.log('[SPIRITUAL-JOURNEY] Fim do ciclo, voltando ao início');

        // Resetar para 0
        await supabase
          .from('user_spiritual_journey')
          .update({
            daily_content_index: 0,
            last_content_date: today,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', userId);

        // Buscar conteúdo do dia 0
        const { data: firstContent, error: firstError } = await supabase
          .from('spiritual_contents')
          .select('*')
          .eq('theme', journey.current_theme)
          .eq('day_index', 0)
          .single();

        if (firstError) {
          console.error('[SPIRITUAL-JOURNEY] Erro ao buscar primeiro conteúdo:', firstError);
          return null;
        }

        return firstContent;
      }

      console.error('[SPIRITUAL-JOURNEY] Erro ao buscar conteúdo:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('[SPIRITUAL-JOURNEY] Erro inesperado ao buscar conteúdo:', error);
    return null;
  }
}

/**
 * Retorna a data atual no formato YYYY-MM-DD
 */
function getTodayString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Buscar informações do tema (nome, emoji, etc.)
 */
export const THEMES = [
  {
    id: 'luto-perda',
    name: 'Luto e Perda',
    description: 'Conforto e esperança em momentos de perda',
    emoji: '🕊️',
  },
  {
    id: 'ansiedade-medo',
    name: 'Ansiedade e Medo',
    description: 'Paz e tranquilidade para o coração inquieto',
    emoji: '🌊',
  },
  {
    id: 'fortalecimento-fe',
    name: 'Fortalecimento da Fé',
    description: 'Crescer e amadurecer na jornada espiritual',
    emoji: '⛰️',
  },
  {
    id: 'gratidao-alegria',
    name: 'Gratidão e Alegria',
    description: 'Celebrar as bênçãos e cultivar a alegria',
    emoji: '☀️',
  },
  {
    id: 'financeiro-trabalho',
    name: 'Financeiro e Trabalho',
    description: 'Sabedoria e provisão nas questões materiais',
    emoji: '💼',
  },
  {
    id: 'relacionamentos-familia',
    name: 'Relacionamentos e Família',
    description: 'Harmonia e amor nos relacionamentos',
    emoji: '👨‍👩‍👧‍👦',
  },
  {
    id: 'perdao-cura',
    name: 'Perdão e Cura Interior',
    description: 'Libertação e restauração do coração',
    emoji: '🌱',
  },
  {
    id: 'decisoes-dificeis',
    name: 'Decisões Difíceis',
    description: 'Discernimento e direção divina',
    emoji: '🧭',
  },
  {
    id: 'proposito-vocacao',
    name: 'Propósito e Vocação',
    description: 'Descobrir e cumprir seu chamado',
    emoji: '🎯',
  },
  {
    id: 'paz-interior',
    name: 'Paz Interior e Descanso',
    description: 'Renovação e descanso para a alma',
    emoji: '🌙',
  },
];

export function getThemeInfo(themeId: string) {
  return THEMES.find((t) => t.id === themeId);
}
