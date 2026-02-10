'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Share2, BookOpen, Loader2, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Reading {
  title: string;
  reference: string;
  text: string;
}

interface LiturgyData {
  date: string;
  liturgy: string;
  color?: string;
  firstReading?: Reading;
  psalm?: Reading;
  secondReading?: Reading;
  gospel?: Reading;
  error?: string;
  fallback?: boolean;
}

/**
 * Obtém a data litúrgica atual com validação robusta
 */
function getCurrentLiturgicalDate() {
  try {
    const today = new Date();
    
    // Garante que a data é válida
    if (isNaN(today.getTime())) {
      console.error('❌ Data inválida detectada');
      throw new Error('Data inválida');
    }
    
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    console.log('✅ Data válida:', { day, month, year });
    
    return { day, month, year };
  } catch (error) {
    console.error('❌ Falha ao obter data:', error);
    // Fallback para data fixa (30/11/2025)
    return { day: 30, month: 11, year: 2025 };
  }
}

/**
 * Retorna a cor de fundo baseada na cor litúrgica
 */
function getLiturgicalColorClass(color?: string): string {
  if (!color) return 'from-amber-50 to-white';
  
  const colorMap: Record<string, string> = {
    'Roxo': 'from-purple-50 to-purple-100',
    'Branco': 'from-gray-50 to-white',
    'Verde': 'from-green-50 to-green-100',
    'Vermelho': 'from-red-50 to-red-100',
    'Rosa': 'from-pink-50 to-pink-100',
  };
  
  return colorMap[color] || 'from-amber-50 to-white';
}

/**
 * Retorna o emoji baseado na cor litúrgica
 */
function getLiturgicalColorEmoji(color?: string): string {
  if (!color) return '📖';
  
  const emojiMap: Record<string, string> = {
    'Roxo': '🟣',
    'Branco': '⚪',
    'Verde': '🟢',
    'Vermelho': '🔴',
    'Rosa': '🌸',
  };
  
  return emojiMap[color] || '📖';
}

export default function LeituraDoDiaPage() {
  const router = useRouter();
  const [liturgyData, setLiturgyData] = useState<LiturgyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  useEffect(() => {
    loadLiturgyData();
    
    // Verificar atualização à meia-noite (00:00)
    const checkMidnight = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        console.log('🕛 Meia-noite detectada! Atualizando liturgia...');
        loadLiturgyData();
      }
    }, 60000); // Verificar a cada minuto

    // Verificar nova leitura a cada 1 hora (caso usuário deixe app aberto)
    const hourlyCheck = setInterval(() => {
      console.log('⏰ Verificação horária - atualizando liturgia...');
      loadLiturgyData();
    }, 3600000); // 1 hora

    return () => {
      clearInterval(checkMidnight);
      clearInterval(hourlyCheck);
    };
  }, []);

  const loadLiturgyData = async () => {
    setLoading(true);
    setError(null);
    setIsOfflineMode(false);

    try {
      console.log('🔄 Iniciando carregamento da liturgia...');
      
      // Obter data atual com validação
      const { day, month, year } = getCurrentLiturgicalDate();
      const today = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      console.log('📅 Data gerada:', { day, month, year });
      console.log('📅 Data formatada:', today);
      
      // Tentar carregar do cache primeiro (offline support)
      const cachedData = localStorage.getItem('liturgyCache');
      const cachedDate = localStorage.getItem('liturgyDate');

      console.log('💾 Cache disponível:', !!cachedData, '| Data do cache:', cachedDate);

      // Se tem cache da mesma data, usar enquanto busca atualização
      if (cachedData && cachedDate === today) {
        console.log('✅ Usando dados do cache (mesma data) enquanto atualiza...');
        setLiturgyData(JSON.parse(cachedData));
        setLastUpdate(cachedDate);
      }

      // Configurar timeout de 5 segundos
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        console.warn('⏱️ Timeout: Requisição excedeu 5 segundos');
        controller.abort();
      }, 5000);

      console.log('🌐 Fazendo requisição para /api/liturgy...');
      console.log('📡 API utilizada: https://liturgia.up.railway.app/v2/?dia=' + day + '&mes=' + month);

      // Buscar dados da API com timeout
      const response = await fetch('/api/liturgy', {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
        },
      });

      clearTimeout(timeoutId);

      // Logs detalhados da resposta
      console.log('📡 Response status:', response.status);
      console.log('📡 Response statusText:', response.statusText);

      if (!response.ok) {
        console.error('❌ Erro HTTP:', response.status, response.statusText);
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      // Validar se a resposta é JSON
      const contentType = response.headers.get('content-type');
      console.log('📄 Content-Type:', contentType);

      if (!contentType?.includes('application/json')) {
        console.error('❌ Resposta não é JSON válido. Content-Type:', contentType);

        // Tentar ler o corpo como texto para debug
        const bodyText = await response.text();
        console.error('📄 Response body (primeiros 500 chars):', bodyText.substring(0, 500));

        // Detectar se é HTML
        if (bodyText.trim().startsWith('<!DOCTYPE') || bodyText.trim().startsWith('<html')) {
          console.error('🚨 API retornou HTML em vez de JSON (possível 404/500/redirect)');
          throw new Error('API retornou HTML em vez de JSON (erro no servidor ou rota inválida)');
        }

        throw new Error('Resposta da API não é JSON válido');
      }

      const data = await response.json();
      console.log('✅ Dados recebidos:', data);

      // Validação dos dados recebidos
      if (!data.firstReading && !data.gospel) {
        console.error('❌ Estrutura de dados inválida - faltam leituras essenciais');
        throw new Error('Estrutura de dados inválida');
      }

      // Verificar se é modo fallback
      if (data.fallback) {
        console.log('⚠️ API retornou dados mockados (modo offline)');
        setIsOfflineMode(true);
        setError('Usando leitura de exemplo (API temporariamente indisponível)');
      }

      if (data.error && !data.fallback) {
        console.error('❌ API retornou erro:', data.error);
        throw new Error(data.error);
      }

      // Salvar no cache (mesmo se for fallback)
      console.log('💾 Salvando dados no cache...');
      localStorage.setItem('liturgyCache', JSON.stringify(data));
      localStorage.setItem('liturgyDate', today);
      
      setLiturgyData(data);
      setLastUpdate(today);
      setLoading(false);
      console.log('✅ Liturgia carregada com sucesso!');

    } catch (err) {
      console.error('❌ Falha na requisição:', err);

      // Identificar tipo de erro
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          console.error('⏱️ Erro: Timeout da requisição (5 segundos)');
          setError('A requisição demorou muito. Verifique sua conexão e tente novamente.');
        } else {
          console.error('❌ Erro capturado:', err.message);
        }
      }
      
      // Tentar usar cache antigo se disponível (fallback offline)
      console.log('🔍 Tentando usar cache antigo como fallback...');
      const cachedData = localStorage.getItem('liturgyCache');
      
      if (cachedData) {
        console.log('✅ Cache antigo encontrado, usando como fallback');
        const parsedCache = JSON.parse(cachedData);
        setLiturgyData(parsedCache);
        setIsOfflineMode(true);
        setError('Usando última leitura disponível (sem conexão com a API)');
      } else {
        console.error('❌ Nenhum cache disponível');
        setError('Não foi possível carregar a leitura. Verifique sua conexão ou tente novamente mais tarde.');
      }
      
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!liturgyData) return;

    const shareText = `📖 Leitura do Dia - ${formatDate(liturgyData.date)}\n\n${liturgyData.liturgy}${liturgyData.color ? ` (${liturgyData.color})` : ''}\n\n${
      liturgyData.gospel ? `✝️ Evangelho: ${liturgyData.gospel.reference}\n${liturgyData.gospel.text.substring(0, 200)}...` : ''
    }\n\nCompartilhado via Plano Diário`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Leitura do Dia',
          text: shareText,
        });
      } catch (err) {
        console.log('Compartilhamento cancelado');
      }
    } else {
      // Fallback: copiar para clipboard
      navigator.clipboard.writeText(shareText);
      alert('Texto copiado para a área de transferência!');
    }
  };

  const formatDate = (dateString: string) => {
    try {
      // Tentar diferentes formatos de data
      let date: Date;
      
      // Formato ISO (YYYY-MM-DD)
      if (dateString.includes('-')) {
        date = new Date(dateString + 'T00:00:00');
      } 
      // Formato DD/MM/YYYY
      else if (dateString.includes('/')) {
        const parts = dateString.split('/');
        if (parts.length === 3) {
          date = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
        } else {
          // Formato DD/MM (sem ano)
          const today = new Date();
          date = new Date(today.getFullYear(), parseInt(parts[1]) - 1, parseInt(parts[0]));
        }
      } 
      // Fallback
      else {
        date = new Date();
      }

      // Validar se a data é válida
      if (isNaN(date.getTime())) {
        console.error('❌ Data inválida ao formatar:', dateString);
        return 'Data não disponível';
      }

      return date.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      console.error('❌ Erro ao formatar data:', error);
      return dateString || 'Data não disponível';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-amber-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando leitura do dia...</p>
          <p className="text-sm text-gray-400 mt-2">Conectando à API Litúrgica</p>
        </div>
      </div>
    );
  }

  const bgColorClass = getLiturgicalColorClass(liturgyData?.color);

  return (
    <div className={`min-h-screen bg-gradient-to-b ${bgColorClass}`}>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>

            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-800">Leitura do Dia</h1>
              {isOfflineMode && (
                <WifiOff className="w-5 h-5 text-orange-500" title="Modo Offline" />
              )}
              {!isOfflineMode && liturgyData && !liturgyData.fallback && (
                <Wifi className="w-5 h-5 text-green-500" title="Online - API Litúrgica" />
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={loadLiturgyData}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Atualizar"
              >
                <RefreshCw className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={handleShare}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Share2 className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {error && (
          <div className={`${isOfflineMode ? 'bg-orange-100 border-orange-400 text-orange-800' : 'bg-amber-100 border-amber-400 text-amber-800'} border px-4 py-3 rounded-lg mb-6`}>
            <div className="flex items-center gap-2">
              {isOfflineMode && <WifiOff className="w-5 h-5" />}
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {liturgyData?.fallback && (
          <div className="bg-blue-100 border border-blue-400 text-blue-800 px-4 py-3 rounded-lg mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <p className="text-sm">
                <strong>Modo Offline:</strong> Exibindo leitura de exemplo. A API está temporariamente indisponível.
              </p>
            </div>
          </div>
        )}

        {liturgyData && (
          <div className="space-y-6">
            {/* Data e Liturgia */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-500 mb-2">
                  {formatDate(liturgyData.date)}
                </p>
                <h2 className="text-2xl font-bold text-amber-600 mb-2">
                  {liturgyData.liturgy}
                </h2>
                {liturgyData.color && (
                  <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                    <span className="text-lg">{getLiturgicalColorEmoji(liturgyData.color)}</span>
                    <span className="text-sm font-medium text-gray-700">
                      Cor Litúrgica: {liturgyData.color}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Primeira Leitura */}
            {liturgyData.firstReading && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">
                      📖 {liturgyData.firstReading.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {liturgyData.firstReading.reference}
                    </p>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {liturgyData.firstReading.text}
                  </p>
                </div>
              </div>
            )}

            {/* Segunda Leitura */}
            {liturgyData.secondReading && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">
                      📖 {liturgyData.secondReading.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {liturgyData.secondReading.reference}
                    </p>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {liturgyData.secondReading.text}
                  </p>
                </div>
              </div>
            )}

            {/* Evangelho */}
            {liturgyData.gospel && (
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-md p-6 border-2 border-amber-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">✝️</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">
                      {liturgyData.gospel.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {liturgyData.gospel.reference}
                    </p>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line font-medium">
                    {liturgyData.gospel.text}
                  </p>
                </div>
              </div>
            )}

            {/* Informações adicionais */}
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600">
                📖 Leituras conforme o Calendário Romano Geral
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Fonte: API Litúrgica (liturgia.up.railway.app)
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Atualizado automaticamente à meia-noite e a cada hora
              </p>
              {lastUpdate && (
                <p className="text-xs text-gray-400 mt-1">
                  Última atualização: {formatDate(lastUpdate)}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
