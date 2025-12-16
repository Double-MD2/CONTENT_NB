'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Calendar } from 'lucide-react';
import { useWeekStreak } from '@/hooks/useWeekStreak';

interface ActivityDay {
  activity_date: string;
}

/**
 * Retorna a data atual no fuso America/Sao_Paulo no formato YYYY-MM-DD
 * CRÍTICO: Garante que o "dia atual" seja sempre baseado no horário local do usuário
 */
const getTodayInBrazil = (): string => {
  const nowUTC = new Date();
  
  // Converter para string no fuso America/Sao_Paulo
  const brazilDateString = nowUTC.toLocaleString('en-US', { 
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  
  // Parsear a string no formato MM/DD/YYYY para YYYY-MM-DD
  const [month, day, year] = brazilDateString.split(/[\/,\s]+/);
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

/**
 * Cria um objeto Date representando uma data específica no fuso America/Sao_Paulo
 * @param dateString - Data no formato YYYY-MM-DD
 */
const createBrazilDate = (dateString: string): Date => {
  // Criar data no fuso local do Brasil (sem conversão UTC)
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day, 0, 0, 0, 0);
  return date;
};

export default function WeekActivityStreak() {
  const [activities, setActivities] = useState<ActivityDay[]>([]);
  const { streak } = useWeekStreak(); // Usar hook compartilhado
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();

    // Listener para atualizar quando RPC for chamada
    const channel = supabase
      .channel('week_activity_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_week_activity',
        },
        () => {
          console.log('[WEEK_ACTIVITY] Mudança detectada, recarregando...');
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
        console.log('[WEEK_ACTIVITY] Sem sessão, não carregando atividades');
        setLoading(false);
        return;
      }

      // Buscar apenas atividades da semana corrente (domingo a sábado)
      const { startOfWeek, endOfWeek } = getCurrentWeekRange();
      
      const { data, error } = await supabase
        .from('user_week_activity')
        .select('activity_date')
        .eq('user_id', session.user.id)
        .gte('activity_date', startOfWeek)
        .lte('activity_date', endOfWeek)
        .order('activity_date', { ascending: false });

      if (error) {
        console.error('[WEEK_ACTIVITY] Erro ao carregar atividades:', error);
        setLoading(false);
        return;
      }

      setActivities(data || []);

      console.log('[WEEK_ACTIVITY] ✅ Atividades carregadas:', {
        total: data?.length || 0,
        startOfWeek,
        endOfWeek,
        todayBrazil: getTodayInBrazil(),
      });

      setLoading(false);
    } catch (err) {
      console.error('[WEEK_ACTIVITY] Exceção ao carregar atividades:', err);
      setLoading(false);
    }
  };

  /**
   * Retorna o range da semana corrente no fuso America/Sao_Paulo
   * startOfWeek: domingo 00:00
   * endOfWeek: sábado 23:59
   * 
   * CORREÇÃO: Usa getTodayInBrazil() para garantir que a semana seja calculada
   * baseada no dia atual do usuário no Brasil, não em UTC
   */
  const getCurrentWeekRange = (): { startOfWeek: string; endOfWeek: string } => {
    // Obter "hoje" no fuso America/Sao_Paulo (formato YYYY-MM-DD)
    const todayString = getTodayInBrazil();
    const today = createBrazilDate(todayString);
    
    const currentDayOfWeek = today.getDay(); // 0 = Domingo, 6 = Sábado
    
    // Encontrar o domingo da semana atual (startOfWeek)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDayOfWeek);
    
    // Encontrar o sábado da semana atual (endOfWeek)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    // Formatar datas no formato YYYY-MM-DD
    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    return {
      startOfWeek: formatDate(startOfWeek),
      endOfWeek: formatDate(endOfWeek),
    };
  };

  /**
   * Retorna os 7 dias da semana corrente (domingo a sábado)
   * com informações sobre atividade e estado
   * 
   * CORREÇÃO: Usa getTodayInBrazil() para determinar o dia atual
   */
  const getWeekDays = (): { day: string; date: Date; dateString: string; hasActivity: boolean; isFuture: boolean }[] => {
    const { startOfWeek } = getCurrentWeekRange();
    const startDate = createBrazilDate(startOfWeek);
    
    // Obter "hoje" no fuso America/Sao_Paulo
    const todayString = getTodayInBrazil();

    const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    
    return weekDays.map((day, index) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + index);
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const dayNum = String(date.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${dayNum}`;
      
      const hasActivity = activities.some(
        (activity) => activity.activity_date === dateString
      );

      // Dia é futuro se a data for MAIOR que hoje (comparação de strings YYYY-MM-DD)
      const isFuture = dateString > todayString;

      return { day, date, dateString, hasActivity, isFuture };
    });
  };

  /**
   * Retorna o estilo CSS para cada dia baseado no estado:
   * - Hoje: laranja (destaque)
   * - Dia passado com registro: amarelo (presente)
   * - Dia passado sem registro: cinza escuro (ausente)
   * - Dia futuro: branco/cinza claro (neutro)
   * 
   * CORREÇÃO: Usa getTodayInBrazil() para determinar se é "hoje"
   */
  const getDayStyle = (dayInfo: { day: string; date: Date; dateString: string; hasActivity: boolean; isFuture: boolean }) => {
    // Obter "hoje" no fuso America/Sao_Paulo
    const todayString = getTodayInBrazil();
    
    const isToday = dayInfo.dateString === todayString;
    
    // HOJE: destaque laranja
    if (isToday) {
      return 'bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-lg scale-110';
    }
    
    // DIA FUTURO: neutro (branco/cinza claro)
    if (dayInfo.isFuture) {
      return 'bg-gray-100 text-gray-400 border border-gray-200';
    }
    
    // DIA PASSADO COM REGISTRO: presente (amarelo)
    if (dayInfo.hasActivity) {
      return 'bg-gradient-to-br from-yellow-200 to-yellow-300 text-gray-800';
    }
    
    // DIA PASSADO SEM REGISTRO: ausente (cinza escuro)
    return 'bg-gray-700 text-gray-400';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
        <div className="flex justify-between gap-2">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="flex-1 aspect-square rounded-full bg-gray-200"></div>
          ))}
        </div>
      </div>
    );
  }

  const weekDays = getWeekDays();

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-500" />
          Sua Semana
        </h2>
      </div>
      
      <div className="flex justify-between gap-2">
        {weekDays.map((dayInfo, index) => (
          <div
            key={index}
            className={`flex-1 aspect-square rounded-full flex items-center justify-center font-semibold transition-all ${getDayStyle(dayInfo)}`}
          >
            {dayInfo.day}
          </div>
        ))}
      </div>

      {streak > 0 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            🙏 Você está em uma sequência de <span className="font-bold text-orange-500">{streak} dia{streak !== 1 ? 's' : ''}</span> consecutivo{streak !== 1 ? 's' : ''}!
          </p>
        </div>
      )}
    </div>
  );
}
