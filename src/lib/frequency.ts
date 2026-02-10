import { supabase } from './supabase';

export interface FrequencyStats {
  currentStreak: number;
  longestStreak: number;
  totalAccessDays: number;
  lastAccessDate: string;
}

/**
 * Registra o acesso do usuário no dia atual
 */
export async function registerDailyAccess(userId: string): Promise<void> {
  const today = new Date().toISOString().split('T')[0];

  // Verifica se já registrou hoje
  const { data: existingAccess } = await supabase
    .from('user_frequency')
    .select('*')
    .eq('user_id', userId)
    .eq('access_date', today)
    .single();

  if (existingAccess) {
    return; // Já registrou hoje
  }

  // Registra o acesso de hoje
  await supabase.from('user_frequency').insert({
    user_id: userId,
    access_date: today,
  });

  // Atualiza as estatísticas
  await updateUserStats(userId);
}

/**
 * Calcula e atualiza as estatísticas do usuário
 */
async function updateUserStats(userId: string): Promise<void> {
  // Busca todos os acessos do usuário ordenados por data
  const { data: accesses } = await supabase
    .from('user_frequency')
    .select('access_date')
    .eq('user_id', userId)
    .order('access_date', { ascending: false });

  if (!accesses || accesses.length === 0) return;

  const today = new Date().toISOString().split('T')[0];
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  // Calcula a sequência atual
  const sortedDates = accesses.map((a) => a.access_date).sort().reverse();
  
  for (let i = 0; i < sortedDates.length; i++) {
    const currentDate = new Date(sortedDates[i]);
    const expectedDate = new Date(today);
    expectedDate.setDate(expectedDate.getDate() - i);
    const expectedDateStr = expectedDate.toISOString().split('T')[0];

    if (sortedDates[i] === expectedDateStr) {
      currentStreak++;
      tempStreak++;
    } else {
      break;
    }
  }

  // Calcula a maior sequência de todos os tempos
  tempStreak = 1;
  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(sortedDates[i - 1]);
    const currDate = new Date(sortedDates[i]);
    const diffDays = Math.floor((prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 1;
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak, currentStreak);

  // Atualiza ou insere as estatísticas
  const { data: existingStats } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .single();

  const statsData = {
    user_id: userId,
    current_streak: currentStreak,
    longest_streak: longestStreak,
    total_access_days: accesses.length,
    last_access_date: today,
    updated_at: new Date().toISOString(),
  };

  if (existingStats) {
    await supabase
      .from('user_stats')
      .update(statsData)
      .eq('user_id', userId);
  } else {
    await supabase.from('user_stats').insert(statsData);
  }
}

/**
 * Busca as estatísticas do usuário
 */
export async function getUserStats(userId: string): Promise<FrequencyStats> {
  const { data: stats } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (!stats) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalAccessDays: 0,
      lastAccessDate: '',
    };
  }

  return {
    currentStreak: stats.current_streak,
    longestStreak: stats.longest_streak,
    totalAccessDays: stats.total_access_days,
    lastAccessDate: stats.last_access_date,
  };
}

/**
 * Busca os acessos dos últimos 30 dias
 */
export async function getLast30DaysAccess(userId: string): Promise<string[]> {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const startDate = thirtyDaysAgo.toISOString().split('T')[0];

  const { data: accesses } = await supabase
    .from('user_frequency')
    .select('access_date')
    .eq('user_id', userId)
    .gte('access_date', startDate)
    .order('access_date', { ascending: true });

  return accesses ? accesses.map((a) => a.access_date) : [];
}
