import { NextRequest, NextResponse } from 'next/server';

interface Reading {
  title: string;
  reference: string;
  text: string;
}

interface LiturgyResponse {
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
      console.error('❌ [API Liturgia] Data inválida detectada');
      throw new Error('Data inválida');
    }
    
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    console.log('✅ [API Liturgia] Data válida:', { day, month, year });
    
    return { day, month, year };
  } catch (error) {
    console.error('❌ [API Liturgia] Falha ao obter data:', error);
    // Fallback para data fixa (30/11/2025)
    return { day: 30, month: 11, year: 2025 };
  }
}

/**
 * Busca a leitura do dia na API litúrgica dinamicamente.
 * URL: https://liturgia.up.railway.app/v2/?dia=DD&mes=MM
 * 
 * Estrutura da API:
 * {
 *   "data": "30/11/2025",
 *   "liturgia": "1º Domingo do Advento",
 *   "cor": "Roxo",
 *   "leituras": {
 *     "primeiraLeitura": [{ "referencia": "Is 2,1-5", "titulo": "...", "texto": "..." }],
 *     "salmo": [{ "referencia": "Sl 121(122)", "refrao": "...", "texto": "..." }],
 *     "segundaLeitura": [{ "referencia": "Rm 13,11-14", "titulo": "...", "texto": "..." }],
 *     "evangelho": [{ "referencia": "Mt 24,37-44", "titulo": "...", "texto": "..." }]
 *   }
 * }
 */
async function loadLiturgyData() {
  const { day, month, year } = getCurrentLiturgicalDate();
  const API_URL = `https://liturgia.up.railway.app/v2/?dia=${day}&mes=${month}`;

  console.log('🔄 [API Liturgia] Iniciando busca da liturgia...');
  console.log('📅 [API Liturgia] Data gerada:', { day, month, year });
  console.log('🌐 [API Liturgia] URL:', API_URL);

  try {
    // Configurar timeout de 8 segundos
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.warn('⏱️ [API Liturgia] Timeout: Requisição excedeu 8 segundos');
      controller.abort();
    }, 8000);

    const response = await fetch(API_URL, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });

    clearTimeout(timeoutId);

    // Logs detalhados da resposta
    console.log('📡 [API Liturgia] Response status:', response.status);
    console.log('📡 [API Liturgia] Response statusText:', response.statusText);

    if (!response.ok) {
      console.error('❌ [API Liturgia] Erro HTTP:', response.status);
      throw new Error(`API retornou status ${response.status}`);
    }

    // Validar se a resposta é JSON
    const contentType = response.headers.get('content-type');
    console.log('📄 [API Liturgia] Content-Type:', contentType);

    if (!contentType?.includes('application/json')) {
      console.error('❌ [API Liturgia] Resposta não é JSON válido. Content-Type:', contentType);
      throw new Error('Formato de resposta inválido');
    }

    const data = await response.json();
    console.log('✅ [API Liturgia] Dados recebidos da API');

    // Validação dos dados recebidos
    if (!data.leituras || (!data.leituras.primeiraLeitura && !data.leituras.evangelho)) {
      console.error('❌ [API Liturgia] Estrutura de dados inválida - faltam leituras essenciais');
      throw new Error('Estrutura de dados inválida');
    }

    return {
      success: true,
      data: data,
    };

  } catch (error) {
    console.error('❌ [API Liturgia] Erro na requisição:', error);
    
    // Identificar tipo de erro
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('⏱️ [API Liturgia] Erro: Timeout da requisição (8 segundos)');
      } else {
        console.error('❌ [API Liturgia] Erro capturado:', error.message);
      }
    }

    return {
      success: false,
      data: null,
    };
  }
}

/**
 * Dados de fallback (offline/erro) com múltiplas datas predefinidas
 */
function getFallbackReadings(day: number, month: number): any {
  console.log('🔄 [API Liturgia] Usando dados mockados (fallback)');
  
  const dateKey = `${day}/${month}`;
  
  // Banco de leituras predefinidas (exemplo: 30/11)
  const predefinedReadings: Record<string, any> = {
    "30/11": {
      data: "30/11/2025",
      liturgia: "1º Domingo do Advento",
      cor: "Roxo",
      leituras: {
        primeiraLeitura: [{
          referencia: "Is 2,1-5",
          titulo: "Leitura do livro do profeta Isaías",
          texto: "Visão de Isaías, filho de Amós, sobre Judá e Jerusalém. Acontecerá, nos últimos tempos, que o monte da casa do Senhor estará firmemente estabelecido no ponto mais alto das montanhas e dominará as colinas. A ele acorrerão todas as nações, para lá irão numerosos povos e dirão: \"Vamos subir ao monte do Senhor, à casa do Deus de Jacó, para que ele nos mostre seus caminhos e nos ensine a cumprir seus preceitos\"; porque de Sião provém a lei e de Jerusalém, a palavra do Senhor."
        }],
        salmo: [{
          referencia: "Sl 121(122)",
          refrao: "Que alegria quando me disseram: \"Vamos à casa do Senhor!\"",
          texto: "– Que alegria quando ouvi que me disseram: \"Vamos à casa do Senhor!\" E agora nossos pés já se detêm, Jerusalém, em tuas portas.\n– Para lá sobem as tribos de Israel, as tribos do Senhor. Para louvar, segundo a lei de Israel, o nome do Senhor. A sede da justiça lá está e o trono de Davi."
        }],
        segundaLeitura: [{
          referencia: "Rm 13,11-14",
          titulo: "Leitura da carta de são Paulo aos Romanos",
          texto: "Irmãos, vós sabeis em que tempo estamos, pois já é hora de despertar. Com efeito, agora a salvação está mais perto de nós do que quando abraçamos a fé. A noite já vai adiantada, o dia vem chegando: despojemo-nos das ações das trevas e vistamos as armas da luz."
        }],
        evangelho: [{
          referencia: "Mt 24,37-44",
          titulo: "Proclamação do evangelho de Jesus Cristo segundo Mateus",
          texto: "Naquele tempo, Jesus disse aos seus discípulos: \"A vinda do Filho do homem será como no tempo de Noé. Pois nos dias antes do dilúvio, todos comiam e bebiam, casavam-se e davam-se em casamento, até o dia em que Noé entrou na arca. E eles nada perceberam até que veio o dilúvio e arrastou a todos. Assim acontecerá também na vinda do Filho do homem.\""
        }]
      }
    }
  };

  // Retorna leitura específica da data ou fallback padrão
  return predefinedReadings[dateKey] || predefinedReadings["30/11"] || {
    data: `${day}/${month}/2025`,
    liturgia: "Liturgia do Dia (Modo Offline)",
    cor: "Verde",
    leituras: {
      primeiraLeitura: [{
        referencia: "Isaías 55,10-11",
        titulo: "Leitura do livro do profeta Isaías",
        texto: "Assim como a chuva e a neve descem do céu e para lá não voltam sem ter regado a terra, sem tê-la fecundado e feito germinar, para dar semente ao semeador e pão ao que come, assim a palavra que sair da minha boca: ela não voltará para mim vazia; antes, realizará tudo que for de minha vontade e produzirá os efeitos que pretendi, ao enviá-la."
      }],
      salmo: [{
        referencia: "Sl 33(34)",
        refrao: "O Senhor é bondoso e compassivo.",
        texto: "Proclamai comigo a grandeza do Senhor,\nexaltemos todos juntos o seu nome!\nProcurei o Senhor, e ele me acolheu,\nlivrando-me de todos os temores."
      }],
      evangelho: [{
        referencia: "Mateus 6,7-15",
        titulo: "Proclamação do evangelho de Jesus Cristo segundo Mateus",
        texto: "Naquele tempo, disse Jesus aos seus discípulos: \"Quando orardes, não useis muitas palavras, como fazem os pagãos. Eles pensam que serão ouvidos por força das muitas palavras. Não sejais como eles, pois vosso Pai sabe do que precisais, antes mesmo que o peçais.\""
      }]
    }
  };
}

export async function GET(request: NextRequest) {
  try {
    console.log('🚀 [API Liturgia] Requisição GET recebida');
    
    const result = await loadLiturgyData();

    if (!result.success || !result.data) {
      console.log('⚠️ [API Liturgia] Retornando fallback devido a erro');
      
      const { day, month } = getCurrentLiturgicalDate();
      const fallbackData = getFallbackReadings(day, month);

      // Formatar dados do fallback para o formato esperado pelo frontend
      const liturgyData: LiturgyResponse = {
        fallback: true,
        date: fallbackData.data,
        liturgy: fallbackData.liturgia,
        color: fallbackData.cor,
        firstReading: fallbackData.leituras.primeiraLeitura?.[0] ? {
          title: fallbackData.leituras.primeiraLeitura[0].titulo || 'Primeira Leitura',
          reference: fallbackData.leituras.primeiraLeitura[0].referencia || '',
          text: fallbackData.leituras.primeiraLeitura[0].texto || ''
        } : undefined,
        psalm: fallbackData.leituras.salmo?.[0] ? {
          title: 'Salmo Responsorial',
          reference: fallbackData.leituras.salmo[0].referencia || '',
          text: fallbackData.leituras.salmo[0].refrao 
            ? `Refrão: ${fallbackData.leituras.salmo[0].refrao}\n\n${fallbackData.leituras.salmo[0].texto || ''}`
            : fallbackData.leituras.salmo[0].texto || ''
        } : undefined,
        secondReading: fallbackData.leituras.segundaLeitura?.[0] ? {
          title: fallbackData.leituras.segundaLeitura[0].titulo || 'Segunda Leitura',
          reference: fallbackData.leituras.segundaLeitura[0].referencia || '',
          text: fallbackData.leituras.segundaLeitura[0].texto || ''
        } : undefined,
        gospel: fallbackData.leituras.evangelho?.[0] ? {
          title: fallbackData.leituras.evangelho[0].titulo || 'Evangelho',
          reference: fallbackData.leituras.evangelho[0].referencia || '',
          text: fallbackData.leituras.evangelho[0].texto || ''
        } : undefined
      };

      console.log('✅ [API Liturgia] Fallback formatado e retornado');
      return NextResponse.json(liturgyData, { status: 200 });
    }

    // Sucesso - formatar dados da API
    const apiData = result.data;

    console.log('✅ [API Liturgia] Formatando dados da API...');

    const liturgyData: LiturgyResponse = {
      date: apiData.data,
      liturgy: apiData.liturgia,
      color: apiData.cor,
      firstReading: apiData.leituras.primeiraLeitura?.[0] ? {
        title: apiData.leituras.primeiraLeitura[0].titulo || 'Primeira Leitura',
        reference: apiData.leituras.primeiraLeitura[0].referencia || '',
        text: apiData.leituras.primeiraLeitura[0].texto || ''
      } : undefined,
      psalm: apiData.leituras.salmo?.[0] ? {
        title: 'Salmo Responsorial',
        reference: apiData.leituras.salmo[0].referencia || '',
        text: apiData.leituras.salmo[0].refrao 
          ? `Refrão: ${apiData.leituras.salmo[0].refrao}\n\n${apiData.leituras.salmo[0].texto || ''}`
          : apiData.leituras.salmo[0].texto || ''
      } : undefined,
      secondReading: apiData.leituras.segundaLeitura?.[0] ? {
        title: apiData.leituras.segundaLeitura[0].titulo || 'Segunda Leitura',
        reference: apiData.leituras.segundaLeitura[0].referencia || '',
        text: apiData.leituras.segundaLeitura[0].texto || ''
      } : undefined,
      gospel: apiData.leituras.evangelho?.[0] ? {
        title: apiData.leituras.evangelho[0].titulo || 'Evangelho',
        reference: apiData.leituras.evangelho[0].referencia || '',
        text: apiData.leituras.evangelho[0].texto || ''
      } : undefined
    };

    console.log('✅ [API Liturgia] Liturgia formatada com sucesso');
    console.log('📊 [API Liturgia] Estrutura retornada:', {
      date: liturgyData.date,
      liturgy: liturgyData.liturgy,
      color: liturgyData.color,
      hasFirstReading: !!liturgyData.firstReading,
      hasPsalm: !!liturgyData.psalm,
      hasSecondReading: !!liturgyData.secondReading,
      hasGospel: !!liturgyData.gospel
    });

    return NextResponse.json(liturgyData);

  } catch (error) {
    console.error('❌ [API Liturgia] Erro crítico na API:', error);

    // Retornar dados mockados como último recurso
    const { day, month } = getCurrentLiturgicalDate();
    const fallbackData = getFallbackReadings(day, month);

    const liturgyData: LiturgyResponse = {
      fallback: true,
      date: fallbackData.data,
      liturgy: fallbackData.liturgia,
      color: fallbackData.cor,
      error: 'Falha ao carregar dados. Usando leitura de exemplo.',
      firstReading: fallbackData.leituras.primeiraLeitura?.[0] ? {
        title: fallbackData.leituras.primeiraLeitura[0].titulo || 'Primeira Leitura',
        reference: fallbackData.leituras.primeiraLeitura[0].referencia || '',
        text: fallbackData.leituras.primeiraLeitura[0].texto || ''
      } : undefined,
      psalm: fallbackData.leituras.salmo?.[0] ? {
        title: 'Salmo Responsorial',
        reference: fallbackData.leituras.salmo[0].referencia || '',
        text: fallbackData.leituras.salmo[0].refrao 
          ? `Refrão: ${fallbackData.leituras.salmo[0].refrao}\n\n${fallbackData.leituras.salmo[0].texto || ''}`
          : fallbackData.leituras.salmo[0].texto || ''
      } : undefined,
      secondReading: fallbackData.leituras.segundaLeitura?.[0] ? {
        title: fallbackData.leituras.segundaLeitura[0].titulo || 'Segunda Leitura',
        reference: fallbackData.leituras.segundaLeitura[0].referencia || '',
        text: fallbackData.leituras.segundaLeitura[0].texto || ''
      } : undefined,
      gospel: fallbackData.leituras.evangelho?.[0] ? {
        title: fallbackData.leituras.evangelho[0].titulo || 'Evangelho',
        reference: fallbackData.leituras.evangelho[0].referencia || '',
        text: fallbackData.leituras.evangelho[0].texto || ''
      } : undefined
    };

    console.log('✅ [API Liturgia] Fallback de emergência retornado');
    return NextResponse.json(liturgyData, { status: 200 });
  }
}
