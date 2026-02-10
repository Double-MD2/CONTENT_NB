'use client';

import { useEffect, useState } from 'react';
import { checkSupabaseReady, safeSupabaseQuery } from '@/lib/supabase-guard';
import { supabase } from '@/lib/supabase';

interface ActivityDay {
  activity_date: string;
}

/**
 * Retorna a data atual no fuso America/Sao_Paulo no formato YYYY-MM-DD
 */
const getTodayInBrazil = (): string => {
  const now = new Date();
  const brazilDateString = now.toLocaleDateString('en-CA', {
    timeZone: 'America/Sao_Paulo',
  });
  return brazilDateString; // já vem no formato YYYY-MM-DD
};

/**
 * Cria um objeto Date representando uma data específica no fuso America/Sao_Paulo
 */
const createBrazilDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day, 0, 0, 0, 0);
};

export function useWeekStreak() {
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStreak();

    const channel = supabase
      .channel('week_activity_streak_sync')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_week_activity',
        },
        () => {
          console.log('[useWeekStreak] Mudança detectada, recarregando streak...');
          loadStreak();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadStreak = async () => {
    try {
      const guard = await checkSupabaseReady();

      if (!guard.isReady) {
        console.log('[useWeekStreak] Supabase não está pronto ainda.');
        setStreak(0);
        setLoading(false);
        return;
      }

      const userId = guard.user!.id;

      const { data, error } = await safeSupabaseQuery(
        supabase
          .from('user_week_activity')
          .select('activity_date')
          .eq('user_id', userId)
          .order('activity_date', { ascending: false })
          .limit(365)
      );

      if (error) {
        console.log('[useWeekStreak] Erro ao carregar atividades:', error);
        setStreak(0);
        setLoading(false);
        return;
      }

      const calculatedStreak = calculateStreak(data || []);
      setStreak(calculatedStreak);
      setLoading(false);
    } catch (err) {
      console.log('[useWeekStreak] Exceção ao carregar streak');
      setStreak(0);
      setLoading(false);
    }
  };

  /**
   * Calcula streak de dias consecutivos até HOJE (considerando fuso do Brasil)
   */
  const calculateStreak = (activities: ActivityDay[]): number => {
    if (!activities || activities.length === 0) return 0;

    const todayString = getTodayInBrazil();

    const pastActivities = activities.filter(
      (activity) => activity.activity_date <= todayString
    );

    if (pastActivities.length === 0) return 0;

    const sorted = [...pastActivities].sort(
      (a, b) => b.activity_date.localeCompare(a.activity_date)
    );

    const mostRecent = sorted[0].activity_date;

    const todayDate = createBrazilDate(todayString);
    const yesterdayDate = new Date(todayDate);
    yesterdayDate.setDate(todayDate.getDate() - 1);
    const yesterdayString = yesterdayDate.toISOString().slice(0, 10);

    if (mostRecent !== todayString && mostRecent !== yesterdayString) {
      return 0;
    }

    let streak = 1;
    let currentDate = createBrazilDate(mostRecent);

    for (let i = 1; i < sorted.length; i++) {
      currentDate.setDate(currentDate.getDate() - 1);
      const expected = currentDate.toISOString().slice(0, 10);

      if (sorted[i].activity_date === expected) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  return { streak, loading };
}
