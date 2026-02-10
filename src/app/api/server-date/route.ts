import { NextResponse } from 'next/server';

/**
 * API Route para obter a data "hoje" no fuso America/Sao_Paulo
 * Fonte única de verdade para todo o app
 */
export async function GET() {
  try {
    // Obter data/hora atual no fuso America/Sao_Paulo usando Intl.DateTimeFormat
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    
    const parts = formatter.formatToParts(new Date());
    const year = parts.find(p => p.type === 'year')?.value;
    const month = parts.find(p => p.type === 'month')?.value;
    const day = parts.find(p => p.type === 'day')?.value;
    
    const todayString = `${year}-${month}-${day}`;
    
    return NextResponse.json({
      today: todayString,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[SERVER_DATE] Erro ao obter data do servidor:', error);
    return NextResponse.json(
      { error: 'Erro ao obter data do servidor' },
      { status: 500 }
    );
  }
}
