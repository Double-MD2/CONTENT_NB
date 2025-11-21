import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    // Construir o contexto da conversa
    const messages = [
      {
        role: 'system',
        content: `Você é um assistente espiritual cristão especializado em Bíblia, teologia e espiritualidade. 
        Seu objetivo é ajudar as pessoas a compreenderem melhor a Palavra de Deus, responder perguntas sobre Cristo, 
        fé, doutrina cristã e oferecer orientação espiritual baseada nos ensinamentos bíblicos.
        
        Seja sempre respeitoso, acolhedor e compassivo. Use linguagem clara e acessível.
        Quando citar versículos bíblicos, sempre mencione o livro, capítulo e versículo.
        Se não souber algo, seja honesto e sugira que a pessoa busque orientação com um líder espiritual.`,
      },
      ...history.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: 'user',
        content: message,
      },
    ];

    // Chamar a API da OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao chamar API da OpenAI');
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error('Erro na API de chat:', error);
    return NextResponse.json(
      { error: 'Erro ao processar mensagem' },
      { status: 500 }
    );
  }
}
