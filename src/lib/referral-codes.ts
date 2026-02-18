/**
 * Sistema de Geração e Validação de Códigos de Indicação
 * Gera códigos únicos de 6 caracteres (letras maiúsculas + números)
 */

const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removidos caracteres confusos (I, O, 0, 1)

/**
 * Gera um código de convite único
 */
export function generateReferralCode(userId: string): string {
  // Usar parte do userId + timestamp + aleatoriedade
  const timestamp = Date.now().toString(36).toUpperCase().slice(-3);
  const userPart = userId.slice(0, 3).toUpperCase().replace(/[^A-Z0-9]/g, '');
  const randomPart = Array.from({ length: 3 }, () =>
    CHARSET[Math.floor(Math.random() * CHARSET.length)]
  ).join('');

  const code = `${userPart}${timestamp}${randomPart}`.slice(0, 6);

  // Garantir 6 caracteres
  return code.padEnd(6, CHARSET[0]);
}

/**
 * Valida se um código tem o formato correto
 */
export function isValidReferralCodeFormat(code: string): boolean {
  if (!code || typeof code !== 'string') return false;

  // 5 a 8 caracteres, apenas letras maiúsculas e números
  const codePattern = /^[A-Z0-9]{5,8}$/;
  return codePattern.test(code.toUpperCase());
}

/**
 * Normaliza o código (maiúsculas, sem espaços)
 */
export function normalizeReferralCode(code: string): string {
  return code.trim().toUpperCase();
}
