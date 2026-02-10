import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Configurações
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Rate limiting simples (em produção, use Redis ou similar)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 60; // 60 requisições
const RATE_WINDOW = 60 * 1000; // 1 minuto

// Mensagens padrão
const OUT_OF_SCOPE_MESSAGE = 'Posso ajudar apenas com conteúdos bíblicos e religiosos. Quer reformular sua pergunta?';
const INAPPROPRIATE_CONTENT_MESSAGE = 'Desculpe, não posso responder a esse tipo de conteúdo. Vamos manter nossa conversa respeitosa e focada em temas bíblicos e religiosos.';

// Livros da Bíblia em português
const BIBLICAL_BOOKS = [
  // Antigo Testamento
  'gênesis', 'genesis', 'êxodo', 'exodo', 'levítico', 'levitico', 'números', 'numeros',
  'deuteronômio', 'deuteronomio', 'josué', 'josue', 'juízes', 'juizes', 'rute',
  'samuel', 'reis', 'crônicas', 'cronicas', 'esdras', 'neemias', 'ester',
  'jó', 'jo', 'salmos', 'salmo', 'provérbios', 'proverbios', 'eclesiastes',
  'cânticos', 'canticos', 'cantares', 'isaías', 'isaias', 'jeremias', 'lamentações', 'lamentacoes',
  'ezequiel', 'daniel', 'oséias', 'oseias', 'joel', 'amós', 'amos',
  'obadias', 'jonas', 'miquéias', 'miqueias', 'naum', 'habacuque', 'sofonias',
  'ageu', 'zacarias', 'malaquias',
  // Novo Testamento
  'mateus', 'marcos', 'lucas', 'joão', 'joao', 'atos',
  'romanos', 'coríntios', 'corintios', 'gálatas', 'galatas', 'efésios', 'efesios',
  'filipenses', 'colossenses', 'tessalonicenses', 'timóteo', 'timoteo',
  'tito', 'filemom', 'hebreus', 'tiago', 'pedro', 'judas', 'apocalipse'
];

// Termos religiosos comuns
const RELIGIOUS_TERMS = [
  'deus', 'jesus', 'cristo', 'espírito santo', 'espirito santo', 'bíblia', 'biblia',
  'oração', 'oracao', 'fé', 'fe', 'pecado', 'graça', 'graca', 'salvação', 'salvacao',
  'perdão', 'perdao', 'evangelho', 'igreja', 'batismo', 'ceia', 'sacramento',
  'profeta', 'apóstolo', 'apostolo', 'discípulo', 'discipulo', 'ressurreição', 'ressurreicao',
  'cruz', 'céu', 'ceu', 'inferno', 'anjo', 'demônio', 'demonio', 'satanás', 'satanas',
  'adoração', 'adoracao', 'louvor', 'culto', 'ministério', 'ministerio', 'pastor',
  'padre', 'bispo', 'diácono', 'diacono', 'missa', 'sermão', 'sermao'
];

// Palavras inapropriadas (lista básica)
const INAPPROPRIATE_WORDS = [
  'ódio', 'odio', 'matar', 'violência', 'violencia', 'sexual', 'sexo',
  'pornografia', 'drogas', 'suicídio', 'suicidio'
];

// Prompt do sistema para o assistente cristão
const SYSTEM_PROMPT = `Você é um assistente cristão especializado em conteúdo bíblico e religioso.

DIRETRIZES IMPORTANTES:
- Baseie suas respostas na Bíblia e em fontes cristãs tradicionais
- Seja respeitoso com diferentes tradições cristãs (católica, protestante, ortodoxa)
- Quando houver divergências teológicas, apresente-as de forma equilibrada
- Sempre que possível, cite referências bíblicas no formato "Livro Capítulo:Versículo" (ex: João 3:16)
- Ao final da resposta, inclua uma seção "Referências:" listando os versículos citados
- Mantenha um tom pastoral, acolhedor e respeitoso
- Responda SEMPRE em português do Brasil (PT-BR)
- Seja conciso mas completo

TEMAS PERMITIDOS:
- Interpretação bíblica e teologia
- Oração e vida espiritual
- Doutrina cristã e sacramentos
- História da igreja e tradições
- Ética cristã e moral
- Questões de fé e dúvidas espirituais

Se a pergunta não estiver claramente relacionada a temas bíblicos/religiosos, recuse educadamente.`;

/**
 * Rate limiting check
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = requestCounts.get(ip);
  
  if (!userLimit || now > userLimit.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }
  
  if (userLimit.count >= RATE_LIMIT) {
    return false;
  }
  
  userLimit.count++;
  return true;
}

/**
 * Verifica se o conteúdo é bíblico/religioso
 */
function isBiblicalContent(text: string): boolean {
  const lowerText = text.toLowerCase();
  
  // Verifica padrão de referência bíblica (ex: João 3:16, Salmo 23)
  const biblicalReferencePattern = /\b([a-záàâãéêíóôõúç]+\s+\d+:\d+|\bsalmo\s+\d+)\b/i;
  if (biblicalReferencePattern.test(lowerText)) {
    return true;
  }
  
  // Verifica se contém nomes de livros da Bíblia
  for (const book of BIBLICAL_BOOKS) {
    if (lowerText.includes(book)) {
      return true;
    }
  }
  
  // Verifica se contém termos religiosos
  for (const term of RELIGIOUS_TERMS) {
    if (lowerText.includes(term)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Verifica se o conteúdo é inapropriado
 */
function hasInappropriateContent(text: string): boolean {
  const lowerText = text.toLowerCase();
  
  for (const word of INAPPROPRIATE_WORDS) {
    if (lowerText.includes(word)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Endpoint POST /api/chat-free
 * Chat gratuito exclusivo para conteúdo bíblico/religioso usando Gemini AI
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Verificar tamanho do payload (máx 1 MB)
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 1024 * 1024) {
      return NextResponse.json(
        { error: 'Payload muito grande. Máximo: 1 MB' },
        { 
          status: 413,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // 2. Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Limite de requisições excedido. Tente novamente em 1 minuto.' },
        { 
          status: 429,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // 3. Validar entrada
    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Mensagem inválida' },
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // 4. Verificar conteúdo inapropriado
    if (hasInappropriateContent(message)) {
      return NextResponse.json(
        { answer: INAPPROPRIATE_CONTENT_MESSAGE },
        { 
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    // 5. Verificar se está no escopo bíblico/religioso
    if (!isBiblicalContent(message)) {
      return NextResponse.json(
        { answer: OUT_OF_SCOPE_MESSAGE },
        { 
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    // 6. Validar chave da API Gemini
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY não configurada');
      return NextResponse.json(
        { error: 'Erro no servidor. Tente novamente mais tarde.' },
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // 7. Inicializar Gemini AI
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 400,
      }
    });

    // 8. Preparar histórico (últimas 6 mensagens)
    const conversationHistory = history && Array.isArray(history) 
      ? history.slice(-6) 
      : [];

    // 9. Construir contexto da conversa
    let conversationContext = SYSTEM_PROMPT + '\n\n';
    
    if (conversationHistory.length > 0) {
      conversationContext += 'HISTÓRICO DA CONVERSA:\n';
      conversationHistory.forEach((msg: any) => {
        const role = msg.role === 'user' ? 'Usuário' : 'Assistente';
        conversationContext += `${role}: ${msg.content}\n`;
      });
      conversationContext += '\n';
    }
    
    conversationContext += `Usuário: ${message}\n\nAssistente:`;

    // 10. Chamar Gemini API
    const result = await model.generateContent(conversationContext);
    const response = await result.response;
    const answer = response.text() || 'Desculpe, não consegui gerar uma resposta.';

    // 11. Retornar resposta (sempre 200 com answer e Content-Type: application/json)
    return NextResponse.json(
      { answer },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    );

  } catch (error: any) {
    console.error('Erro no chat-free:', error);
    
    // SEMPRE retornar JSON com Content-Type correto, NUNCA corpo vazio
    return NextResponse.json(
      { error: 'Erro no servidor. Tente novamente mais tarde.' },
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

/**
 * OPTIONS para CORS
 */
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    }
  );
}
