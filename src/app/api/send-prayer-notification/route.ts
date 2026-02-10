import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Importação condicional do Resend para evitar erros de build
let Resend: any = null;
try {
  const resendModule = require('resend');
  Resend = resendModule.Resend;
} catch (error) {
  console.warn('[PRAYER_NOTIFICATION] Resend não disponível, emails não serão enviados');
}

export async function POST(request: NextRequest) {
  try {
    const { prayerNoteId } = await request.json();

    if (!prayerNoteId) {
      console.error('[PRAYER_NOTIFICATION] ID da nota de oração não fornecido');
      return NextResponse.json(
        { error: 'ID da nota de oração é obrigatório' },
        { status: 400 }
      );
    }

    // Buscar dados completos da nota de oração no Supabase
    const { data: prayerNote, error: fetchError } = await supabase
      .from('prayer_notes')
      .select('*')
      .eq('id', prayerNoteId)
      .single();

    if (fetchError || !prayerNote) {
      console.error('[PRAYER_NOTIFICATION] Erro ao buscar nota de oração:', fetchError);
      return NextResponse.json(
        { error: 'Nota de oração não encontrada' },
        { status: 404 }
      );
    }

    // Verificar se Resend está disponível e se a API key está configurada
    if (!Resend || !process.env.RESEND_API_KEY) {
      console.warn('[PRAYER_NOTIFICATION] Resend não configurado, pulando envio de email');
      return NextResponse.json({ 
        success: true,
        emailSent: false,
        message: 'Nota de oração registrada (email não enviado)'
      });
    }

    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      console.log('[PRAYER_NOTIFICATION] Enviando email para administradores...');

      // Enviar email via Resend
      const emailData = await resend.emails.send({
        from: 'Plano Diário <notificacoes@planodiario.com>',
        to: 'md2.double@gmail.com',
        subject: '🙏 Nova Nota de Oração Recebida',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                }
                .header {
                  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
                  color: white;
                  padding: 30px;
                  border-radius: 10px 10px 0 0;
                  text-align: center;
                }
                .header h1 {
                  margin: 0;
                  font-size: 24px;
                }
                .content {
                  background: #f9fafb;
                  padding: 30px;
                  border-radius: 0 0 10px 10px;
                }
                .prayer-box {
                  background: white;
                  padding: 20px;
                  border-radius: 8px;
                  border-left: 4px solid #f59e0b;
                  margin: 20px 0;
                }
                .prayer-text {
                  font-size: 16px;
                  line-height: 1.8;
                  color: #1f2937;
                  font-style: italic;
                }
                .info-row {
                  display: flex;
                  justify-content: space-between;
                  padding: 10px 0;
                  border-bottom: 1px solid #e5e7eb;
                }
                .info-label {
                  font-weight: 600;
                  color: #6b7280;
                }
                .info-value {
                  color: #1f2937;
                }
                .footer {
                  text-align: center;
                  margin-top: 30px;
                  padding-top: 20px;
                  border-top: 1px solid #e5e7eb;
                  color: #6b7280;
                  font-size: 14px;
                }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>🙏 Nova Nota de Oração</h1>
              </div>
              <div class="content">
                <p>Um usuário enviou um novo pedido de oração através do aplicativo Plano Diário.</p>
                
                <div class="prayer-box">
                  <p class="prayer-text">"${prayerNote.prayer_text}"</p>
                </div>

                <div style="margin-top: 20px;">
                  <div class="info-row">
                    <span class="info-label">Instagram:</span>
                    <span class="info-value">${prayerNote.instagram_handle || 'Não informado'}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Data de Envio:</span>
                    <span class="info-value">${new Date(prayerNote.created_at).toLocaleString('pt-BR', {
                      dateStyle: 'long',
                      timeStyle: 'short'
                    })}</span>
                  </div>
                  <div class="info-row" style="border-bottom: none;">
                    <span class="info-label">ID do Usuário:</span>
                    <span class="info-value">${prayerNote.user_id}</span>
                  </div>
                </div>

                <div style="margin-top: 30px; padding: 15px; background: #fef3c7; border-radius: 8px; text-align: center;">
                  <p style="margin: 0; color: #92400e; font-size: 14px;">
                    💡 <strong>Lembre-se:</strong> Alguns pedidos podem ser compartilhados de forma anônima em nossos momentos de oração no Instagram.
                  </p>
                </div>
              </div>
              <div class="footer">
                <p>Este é um email automático do sistema Plano Diário.</p>
                <p>Para visualizar todas as notas de oração, acesse o painel administrativo.</p>
              </div>
            </body>
          </html>
        `,
      });

      console.log('[PRAYER_NOTIFICATION] Email enviado com sucesso:', emailData);

      return NextResponse.json({ 
        success: true,
        emailSent: true,
        emailId: emailData.data?.id 
      });
    } catch (emailError) {
      // Fallback silencioso: se o email falhar, não quebra o app
      console.error('[PRAYER_NOTIFICATION] Erro ao enviar email (continuando normalmente):', emailError);
      return NextResponse.json({ 
        success: true,
        emailSent: false,
        message: 'Nota de oração registrada (erro ao enviar email)'
      });
    }
  } catch (error) {
    console.error('[PRAYER_NOTIFICATION] Erro geral:', error);
    // Retorna sucesso mesmo com erro para não impactar o usuário
    return NextResponse.json({ 
      success: true,
      emailSent: false,
      message: 'Nota de oração registrada'
    });
  }
}
