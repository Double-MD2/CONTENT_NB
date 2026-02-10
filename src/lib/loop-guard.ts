/**
 * GUARD ANTI-LOOP: Detecta e previne loops infinitos de redirecionamento
 *
 * Problema: Se há um bug na lógica de onboarding, o usuário pode ficar
 * alternando entre /home ↔ /onboarding infinitamente.
 *
 * Solução: Detectar alternâncias rápidas e mostrar UI de fallback.
 */

const LOOP_DETECTION_WINDOW_MS = 10000; // 10 segundos
const MAX_REDIRECTS = 3; // Máximo de redirecionamentos no intervalo

interface RedirectLog {
  from: string;
  to: string;
  timestamp: number;
}

class LoopGuard {
  private redirectHistory: RedirectLog[] = [];

  /**
   * Registra um redirecionamento e verifica se está em loop
   * @param from - Rota de origem
   * @param to - Rota de destino
   * @returns true se detectou loop, false caso contrário
   */
  detectLoop(from: string, to: string): boolean {
    const now = Date.now();

    // Adicionar redirecionamento ao histórico
    this.redirectHistory.push({
      from,
      to,
      timestamp: now,
    });

    // Limpar redirecionamentos antigos (fora da janela de detecção)
    this.redirectHistory = this.redirectHistory.filter(
      (log) => now - log.timestamp < LOOP_DETECTION_WINDOW_MS
    );

    // Contar quantas alternâncias home ↔ onboarding ocorreram
    const onboardingRedirects = this.redirectHistory.filter(
      (log) =>
        (log.from === '/home' && log.to === '/onboarding') ||
        (log.from === '/onboarding' && log.to === '/home')
    );

    if (onboardingRedirects.length >= MAX_REDIRECTS) {
      console.error('[LOOP-GUARD] 🚨 LOOP DETECTADO!', {
        redirects: onboardingRedirects.length,
        history: this.redirectHistory,
      });
      return true;
    }

    return false;
  }

  /**
   * Reseta o histórico de redirecionamentos
   */
  reset() {
    this.redirectHistory = [];
  }

  /**
   * Obtém o histórico de redirecionamentos (para debugging)
   */
  getHistory(): RedirectLog[] {
    return [...this.redirectHistory];
  }
}

// Instância singleton
export const loopGuard = new LoopGuard();

/**
 * Adiciona query param ?from= para rastrear origem do redirecionamento
 * @param targetPath - Caminho de destino
 * @param fromPath - Caminho de origem
 * @returns URL com query param
 */
export function buildRedirectUrl(targetPath: string, fromPath: string): string {
  const url = new URL(targetPath, window.location.origin);
  url.searchParams.set('from', fromPath);
  return url.pathname + url.search;
}

/**
 * Extrai o query param ?from= da URL atual
 * @returns Origem do redirecionamento ou null
 */
export function getRedirectOrigin(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return params.get('from');
}
