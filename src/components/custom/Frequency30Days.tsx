'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Calendar } from 'lucide-react';

interface ActivityDay {
  activity_date: string;
}

interface DayInfo {
  date: Date;
  dateString: string;
  hasActivity: boolean;
  isToday: boolean;
  isFuture: boolean;
  dayOfWeek: string;
}

export default function Frequency30Days() {
  const [activities, setActivities] = useState<ActivityDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalAccesses, setTotalAccesses] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  useEffect(() => {
    loadActivities();

    const channel = supabase
      .channel('frequency_30_days_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_week_activity',
        },
        () => {
          console.log('[FREQUENCY_30] Mudança detectada, recarregando...');
          loadActivities();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadActivities = async () => {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        console.log('[FREQUENCY_30] Sem sessão, não carregando atividades');
        setLoading(false);
        return;
      }

      const userId = session.user.id;

      // 🔹 1. Últimos 30 dias (para o grid)
      const { startDate, endDate } = getLast30DaysRange();

      const { data: last30Data, error: last30Error } = await supabase
        .from('user_week_activity')
        .select('activity_date')
        .eq('user_id', userId)
        .gte('activity_date', startDate)
        .lte('activity_date', endDate)
        .order('activity_date', { ascending: false });

      if (last30Error) {
        console.error('[FREQUENCY_30] Erro ao carregar últimos 30 dias:', last30Error);
      } else {
        setActivities(last30Data || []);
      }

      // 🔹 2. Total de acessos (histórico completo)
      const { count, error: countError } = await supabase
        .from('user_week_activity')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      if (countError) {
        console.error('[FREQUENCY_30] Erro ao contar acessos:', countError);
      } else {
        setTotalAccesses(count || 0);
      }

      // 🔹 3. Maior sequência (histórico completo)
      const { data: allData, error: allError } = await supabase
        .from('user_week_activity')
        .select('activity_date')
        .eq('user_id', userId)
        .order('activity_date', { ascending: true });

      if (allError) {
        console.error('[FREQUENCY_30] Erro ao buscar histórico completo:', allError);
      } else {
        const max = calculateMaxStreak(allData || []);
        setMaxStreak(max);
      }

      console.log('[FREQUENCY_30] ✅ Atividades carregadas:', {
        ultimos30: last30Data?.length || 0,
        totalAccesses: count || 0,
        maxStreak,
      });

      setLoading(false);
    } catch (err) {
      console.error('[FREQUENCY_30] Exceção ao carregar atividades:', err);
      setLoading(false);
    }
  };

  /**
   * Retorna o range dos últimos 30 dias no fuso America/Sao_Paulo
   * startDate: hoje - 29 dias
   * endDate: hoje
   */
  const getLast30DaysRange = (): { startDate: string; endDate: string } => {
    const nowSP = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    
    const endDate = new Date(nowSP);
    endDate.setHours(23, 59, 59, 999);
    
    const startDate = new Date(nowSP);
    startDate.setDate(nowSP.getDate() - 29);
    startDate.setHours(0, 0, 0, 0);

    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    };
  };

  /**
   * Retorna os últimos 30 dias com informações sobre atividade e estado
   * Ordem: hoje até hoje-29 (mais recente primeiro)
   */
  const getLast30Days = (): DayInfo[] => {
    const nowSP = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const todayString = nowSP.toISOString().split('T')[0];

    const days: DayInfo[] = [];
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    for (let i = 0; i < 30; i++) {
      const date = new Date(nowSP);
      date.setDate(nowSP.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      const hasActivity = activities.some(
        (activity) => activity.activity_date === dateString
      );

      const isToday = dateString === todayString;
      const isFuture = dateString > todayString;
      const dayOfWeek = dayNames[date.getDay()];

      days.push({ date, dateString, hasActivity, isToday, isFuture, dayOfWeek });
    }

    return days;
  };

  /**
   * Calcula a maior sequência de dias consecutivos com atividade
   */
  const calculateMaxStreak = (allActivities: ActivityDay[]): number => {
    if (!allActivities.length) return 0;

    const dates = allActivities
      .map(a => a.activity_date)
      .sort();

    let maxStreak = 1;
    let currentStreak = 1;

    for (let i = 1; i < dates.length; i++) {
      const prev = new Date(dates[i - 1]);
      const curr = new Date(dates[i]);
      const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else if (diff > 1) {
        currentStreak = 1;
      }
    }

    return maxStreak;
  };

  /**
   * Retorna o estilo CSS para cada dia baseado no estado:
   * - Hoje: laranja (destaque)
   * - Dia passado com registro: amarelo (presente)
   * - Dia passado sem registro: cinza escuro (ausente)
   * - Dia futuro: branco/cinza claro (neutro)
   */
  const getDayStyle = (dayInfo: DayInfo) => {
    if (dayInfo.isToday) {
      return 'bg-gradient-to-br from-orange-400 to-orange-500 border-2 border-orange-600 text-white font-bold';
    }
    
    if (dayInfo.isFuture) {
      return 'bg-gray-100 border border-gray-200 text-gray-400';
    }
    
    if (dayInfo.hasActivity) {
      return 'bg-gradient-to-br from-yellow-200 to-yellow-300 border border-yellow-400 text-gray-800 font-semibold';
    }
    
    return 'bg-gray-700 border border-gray-600 text-gray-300';
  };

  /**
   * Formata a data para exibição em tooltip
   */
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      timeZone: 'America/Sao_Paulo',
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
        <div className="grid grid-cols-10 gap-2">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="aspect-square rounded bg-gray-200"></div>
          ))}
        </div>
      </div>
    );
  }

  const last30Days = getLast30Days();

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-500" />
          Últimos 30 dias
        </h2>
      </div>
      
      {/* Grade de 30 dias */}
      <div className="grid grid-cols-10 gap-2 mb-4">
        {last30Days.map((dayInfo, index) => (
          <div
            key={index}
            className={`aspect-square rounded transition-all flex items-center justify-center text-xs ${getDayStyle(dayInfo)}`}
            title={`${dayInfo.dayOfWeek}, ${formatDate(dayInfo.date)}${dayInfo.hasActivity ? ' - Presente' : dayInfo.isFuture ? ' - Futuro' : ' - Ausente'}`}
            aria-label={`Presença em ${formatDate(dayInfo.date)}`}
          >
            {dayInfo.date.getDate()}
          </div>
        ))}
      </div>

      {/* Legenda */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-br from-orange-400 to-orange-500 border-2 border-orange-600"></div>
          <span>Hoje</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-br from-yellow-200 to-yellow-300 border border-yellow-400"></div>
          <span>Presente</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-700 border border-gray-600"></div>
          <span>Ausente</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-100 border border-gray-200"></div>
          <span>Futuro</span>
        </div>
      </div>
    </div>
  );
}
