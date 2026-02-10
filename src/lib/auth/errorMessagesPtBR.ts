/**
 * Tradutor de mensagens de erro do Supabase Auth para Português (Brasil)
 *
 * Este módulo mapeia erros retornados pelo Supabase para mensagens amigáveis em pt-BR.
 * Cobre validação local, erros de autenticação, rate limit e problemas de rede.
 */

import { AuthError } from '@supabase/supabase-js';

interface ErrorMapping {
  [key: string]: string;
}

/**
 * Mapeamento de códigos de erro conhecidos do Supabase
 */
const ERROR_CODES: ErrorMapping = {
  // Credenciais inválidas
  'invalid_credentials': 'E-mail ou senha inválidos.',
  'invalid_grant': 'E-mail ou senha inválidos.',

  // Email não confirmado
  'email_not_confirmed': 'Confirme seu e-mail antes de entrar.',
  'email_confirmation_required': 'Confirme seu e-mail antes de entrar.',

  // Usuário já registrado
  'user_already_exists': 'Este e-mail já está cadastrado.',
  'email_exists': 'Este e-mail já está cadastrado.',

  // Senha fraca
  'weak_password': 'A senha deve ter no mínimo 8 caracteres e conter letras maiúsculas, minúsculas, números e caracteres especiais.',
  'password_too_short': 'A senha deve ter no mínimo 8 caracteres.',

  // Cadastro desabilitado
  'signup_disabled': 'Criação de conta desativada no momento.',
  'signups_disabled': 'Criação de conta desativada no momento.',

  // Rate limit (muitas tentativas)
  'over_request_rate_limit': 'Muitas tentativas. Aguarde alguns minutos e tente novamente.',
  'rate_limit_exceeded': 'Muitas tentativas. Aguarde alguns minutos e tente novamente.',
  'too_many_requests': 'Muitas tentativas. Aguarde alguns minutos e tente novamente.',

  // Email inválido
  'invalid_email': 'Digite um e-mail válido.',
  'email_address_invalid': 'Digite um e-mail válido.',

  // Usuário não encontrado
  'user_not_found': 'Usuário não encontrado.',

  // Token expirado
  'token_expired': 'Link expirado. Solicite um novo e-mail de recuperação.',
  'refresh_token_expired': 'Sessão expirada. Faça login novamente.',

  // Sessão inválida
  'invalid_session': 'Sessão inválida. Faça login novamente.',
  'session_not_found': 'Sessão expirada. Faça login novamente.',

  // Email provider
  'email_provider_disabled': 'Provedor de e-mail desabilitado. Contate o suporte.',

  // Validation errors
  'validation_failed': 'Dados inválidos. Verifique os campos e tente novamente.',
};

/**
 * Mapeamento de mensagens conhecidas do Supabase (em inglês)
 */
const MESSAGE_PATTERNS: Array<{ pattern: RegExp; translation: string }> = [
  {
    pattern: /invalid login credentials/i,
    translation: 'E-mail ou senha inválidos.'
  },
  {
    pattern: /email not confirmed/i,
    translation: 'Confirme seu e-mail antes de entrar.'
  },
  {
    pattern: /user already registered/i,
    translation: 'Este e-mail já está cadastrado.'
  },
  {
    pattern: /password should be at least (\d+) characters/i,
    translation: 'A senha deve ter no mínimo 8 caracteres e conter letras maiúsculas, minúsculas, números e caracteres especiais.'
  },
  {
    pattern: /password.*too short/i,
    translation: 'A senha deve ter no mínimo 8 caracteres.'
  },
  {
    pattern: /password.*weak/i,
    translation: 'A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais.'
  },
  {
    pattern: /signup.*disabled/i,
    translation: 'Criação de conta desativada no momento.'
  },
  {
    pattern: /too many requests/i,
    translation: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.'
  },
  {
    pattern: /rate limit/i,
    translation: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.'
  },
  {
    pattern: /invalid email/i,
    translation: 'Digite um e-mail válido.'
  },
  {
    pattern: /user not found/i,
    translation: 'Usuário não encontrado.'
  },
  {
    pattern: /failed to fetch/i,
    translation: 'Sem conexão no momento. Verifique sua internet e tente novamente.'
  },
  {
    pattern: /network.*error/i,
    translation: 'Sem conexão no momento. Verifique sua internet e tente novamente.'
  },
  {
    pattern: /unable to validate email address/i,
    translation: 'Digite um e-mail válido.'
  },
  {
    pattern: /email link is invalid or has expired/i,
    translation: 'Link expirado ou inválido. Solicite um novo e-mail.'
  },
  {
    pattern: /token.*expired/i,
    translation: 'Link expirado. Solicite um novo e-mail de recuperação.'
  },
  {
    pattern: /invalid.*token/i,
    translation: 'Link inválido. Solicite um novo e-mail de recuperação.'
  },
  {
    pattern: /session.*expired/i,
    translation: 'Sessão expirada. Faça login novamente.'
  },
  {
    pattern: /otp.*expired/i,
    translation: 'Código expirado. Solicite um novo código.'
  },
  {
    pattern: /otp.*invalid/i,
    translation: 'Código inválido. Verifique e tente novamente.'
  },
];

/**
 * Traduz um erro do Supabase para português (Brasil)
 *
 * @param error - Erro retornado pelo Supabase (AuthError ou Error genérico)
 * @returns Mensagem traduzida e amigável em pt-BR
 *
 * @example
 * ```typescript
 * const { error } = await supabase.auth.signInWithPassword({...});
 * if (error) {
 *   const mensagem = translateAuthError(error);
 *   setError(mensagem); // "E-mail ou senha inválidos."
 * }
 * ```
 */
export function translateAuthError(error: AuthError | Error | unknown): string {
  // Log técnico para debug (somente console)
  console.error('[AUTH ERROR]', error);

  // Se não é um erro, retornar mensagem genérica
  if (!error) {
    return 'Ocorreu um erro inesperado. Tente novamente.';
  }

  // Extrair propriedades do erro
  let message = '';
  let code = '';
  let status = 0;

  if (error instanceof Error) {
    message = error.message || '';

    // AuthError do Supabase tem propriedades adicionais
    if ('status' in error) {
      status = (error as any).status || 0;
    }
    if ('code' in error) {
      code = (error as any).code || '';
    }
  } else if (typeof error === 'object' && error !== null) {
    message = (error as any).message || '';
    code = (error as any).code || '';
    status = (error as any).status || 0;
  }

  // 1. Tentar mapear por código de erro
  if (code && ERROR_CODES[code]) {
    return ERROR_CODES[code];
  }

  // 2. Tentar mapear por status HTTP
  if (status === 400) {
    return 'Dados inválidos. Verifique os campos e tente novamente.';
  }
  if (status === 401) {
    return 'E-mail ou senha inválidos.';
  }
  if (status === 403) {
    return 'Acesso negado. Contate o suporte.';
  }
  if (status === 422) {
    // Validation error - procurar padrão na mensagem
    if (message.toLowerCase().includes('email')) {
      return 'Digite um e-mail válido.';
    }
    if (message.toLowerCase().includes('password')) {
      return 'A senha deve ter no mínimo 8 caracteres e conter letras e números.';
    }
    return 'Dados inválidos. Verifique os campos e tente novamente.';
  }
  if (status === 429) {
    return 'Muitas tentativas. Aguarde alguns minutos e tente novamente.';
  }
  if (status >= 500) {
    return 'Erro no servidor. Tente novamente em alguns instantes.';
  }

  // 3. Tentar mapear por padrões na mensagem
  for (const { pattern, translation } of MESSAGE_PATTERNS) {
    if (pattern.test(message)) {
      return translation;
    }
  }

  // 4. Verificar se é erro de rede
  if (
    message.toLowerCase().includes('network') ||
    message.toLowerCase().includes('fetch') ||
    message.toLowerCase().includes('connection') ||
    message === 'Failed to fetch'
  ) {
    return 'Sem conexão no momento. Verifique sua internet e tente novamente.';
  }

  // 5. Mensagem genérica (nunca mostrar mensagem técnica em inglês ao usuário)
  return 'Ocorreu um erro. Tente novamente em alguns instantes.';
}

/**
 * Valida senha localmente antes de enviar ao Supabase
 * Retorna mensagem em pt-BR se a senha for inválida, ou null se válida
 *
 * @param password - Senha a ser validada
 * @returns Mensagem de erro em pt-BR ou null se válida
 */
export function validatePassword(password: string): string | null {
  if (!password) {
    return 'Digite uma senha.';
  }

  if (password.length < 8) {
    return 'A senha deve ter no mínimo 8 caracteres.';
  }

  // Verificar se contém pelo menos uma letra minúscula
  const hasLowerCase = /[a-z]/.test(password);
  if (!hasLowerCase) {
    return 'A senha deve conter pelo menos uma letra minúscula.';
  }

  // Verificar se contém pelo menos uma letra maiúscula
  const hasUpperCase = /[A-Z]/.test(password);
  if (!hasUpperCase) {
    return 'A senha deve conter pelo menos uma letra maiúscula.';
  }

  // Verificar se contém pelo menos um número
  const hasNumber = /\d/.test(password);
  if (!hasNumber) {
    return 'A senha deve conter pelo menos um número.';
  }

  // Verificar se contém pelo menos um caractere especial
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/'`~;]/.test(password);
  if (!hasSpecialChar) {
    return 'A senha deve conter pelo menos um caractere especial (!@#$%^&*...)';
  }

  return null; // Senha válida
}

/**
 * Valida email localmente antes de enviar ao Supabase
 * Retorna mensagem em pt-BR se o email for inválido, ou null se válido
 *
 * @param email - Email a ser validado
 * @returns Mensagem de erro em pt-BR ou null se válido
 */
export function validateEmail(email: string): string | null {
  if (!email) {
    return 'Digite um e-mail.';
  }

  // Regex básico para validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Digite um e-mail válido.';
  }

  return null; // Email válido
}

/**
 * Mensagens de sucesso traduzidas para pt-BR
 */
export const SUCCESS_MESSAGES = {
  ACCOUNT_CREATED: 'Conta criada com sucesso! Verifique seu e-mail para confirmar.',
  ACCOUNT_CREATED_AUTO_LOGIN: 'Conta criada com sucesso! Redirecionando...',
  PASSWORD_RESET_EMAIL_SENT: 'E-mail de recuperação enviado! Verifique sua caixa de entrada.',
  PASSWORD_UPDATED: 'Senha atualizada com sucesso!',
  LOGIN_SUCCESS: 'Login realizado com sucesso!',
  EMAIL_CONFIRMED: 'E-mail confirmado com sucesso!',
};

/**
 * Dica de senha em pt-BR para placeholders
 */
export const PASSWORD_HINT = 'Mínimo 8 caracteres, letras maiúsculas, minúsculas, números e caracteres especiais (!@#$%...)';
