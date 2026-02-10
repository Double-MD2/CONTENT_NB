import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Configurações para máxima compatibilidade
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // 1. Validação da chave de API
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Chave da API não configurada. Configure GEMINI_API_KEY nas variáveis de ambiente.' },
        { status: 401 }
      );
    }

    // 2. Inicialização do modelo Gemini
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // 3. Processamento da mensagem
    const { messages } = await req.json();
    
    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'Nenhuma mensagem fornecida' },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1].content;

    // 4. Geração de conteúdo com o Gemini
    const result = await model.generateContent(lastMessage);
    const response = await result.response;
    const text = response.text();
    
    return NextResponse.json({ text });

  } catch (error: any) {
    console.error('Erro no Gemini:', error);
    
    // Tratamento de erros específicos
    if (error?.message?.includes('API key')) {
      return NextResponse.json(
        { error: 'Chave da API inválida ou expirada' },
        { status: 401 }
      );
    }
    
    if (error?.message?.includes('quota')) {
      return NextResponse.json(
        { error: 'Limite de requisições excedido' },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      { error: 'Erro ao processar mensagem. Tente novamente.' },
      { status: 500 }
    );
  }
}
