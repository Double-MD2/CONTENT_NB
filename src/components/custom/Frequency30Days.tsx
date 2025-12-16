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

  useEffect(() => {
    loadActivities();

    // Listener para atualizar quando RPC for chamada
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
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        console.log('[FREQUENCY_30] Sem sessão, não carregando atividades');
        setLoading(false);
        return;
      }

      // Buscar últimos 30 dias de atividade
      const { startDate, endDate } = getLast30DaysRange();
      
      const { data, error } = await supabase
        .from('user_week_activity')
        .select('activity_date')
        .eq('user_id', session.user.id)
        .gte('activity_date', startDate)
        .lte('activity_date', endDate)
        .order('activity_date', { ascending: false });

      if (error) {
        console.error('[FREQUENCY_30] Erro ao carregar atividades:', error);
        setLoading(false);
        return;
      }

      setActivities(data || []);

      console.log('[FREQUENCY_30] ✅ Atividades carregadas:', {
        total: data?.length || 0,
        startDate,
        endDate,
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
    // Obter "hoje" no fuso America/Sao_Paulo
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
    // Obter "hoje" no fuso America/Sao_Paulo
    const nowSP = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const todayString = nowSP.toISOString().split('T')[0];

    const days: DayInfo[] = [];
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    // Gerar últimos 30 dias (hoje até hoje-29)
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
   * Retorna o estilo CSS para cada dia baseado no estado:
   * - Hoje: laranja (destaque)
   * - Dia passado com registro: amarelo (presente)
   * - Dia passado sem registro: cinza escuro (ausente)
   * - Dia futuro: branco/cinza claro (neutro)
   */
  const getDayStyle = (dayInfo: DayInfo) => {
    // HOJE: destaque laranja
    if (dayInfo.isToday) {
      return 'bg-gradient-to-br from-orange-400 to-orange-500 border-2 border-orange-600 text-white font-bold';
    }
    
    // DIA FUTURO: neutro (branco/cinza claro)
    if (dayInfo.isFuture) {
      return 'bg-gray-100 border border-gray-200 text-gray-400';
    }
    
    // DIA PASSADO COM REGISTRO: presente (amarelo)
    if (dayInfo.hasActivity) {
      return 'bg-gradient-to-br from-yellow-200 to-yellow-300 border border-yellow-400 text-gray-800 font-semibold';
    }
    
    // DIA PASSADO SEM REGISTRO: ausente (cinza escuro)
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
