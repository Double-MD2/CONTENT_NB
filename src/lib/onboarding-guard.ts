/**
 * FONTE ÚNICA DE VERDADE: profiles table
 *
 * Regras de roteamento do onboarding:
 * - Se profiles.quiz_completed OU profiles.onboarding_completed = TRUE → usuário pode acessar /home
 * - Se ambos FALSE ou perfil não existe → redirecionar para /onboarding
 *
 * IMPORTANTE: Esta é a única função que decide o fluxo de onboarding.
 * Não criar lógica duplicada em outros lugares!
 */

import { supabase } from './supabase';

export interface OnboardingStatus {
  shouldRedirect: boolean;
  redirectTo: '/home' | '/onboarding';
  reason: string;
  profileExists: boolean;
  quizCompleted: boolean;
  onboardingCompleted: boolean;
}

/**
 * Verifica o status do onboarding do usuário
 * @param userId - ID do usuário autenticado
 * @returns Status do onboarding e ação necessária
 */
export async function checkOnboardingStatus(userId: string): Promise<OnboardingStatus> {
  const logPrefix = '[ONBOARDING-GUARD]';

  try {
    console.log(`${logPrefix} Verificando status para user: ${userId}`);

    // Buscar perfil do usuário
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('quiz_completed, onboarding_completed')
      .eq('id', userId)
      .single();

    // Caso 1: Perfil não existe (usuário novo)
    if (error && error.code === 'PGRST116') {
      console.log(`${logPrefix} ❌ Perfil não existe - redirecionar para onboarding`);
      return {
        shouldRedirect: true,
        redirectTo: '/onboarding',
        reason: 'profile_not_found',
        profileExists: false,
        quizCompleted: false,
        onboardingCompleted: false,
      };
    }

    // Caso 2: Erro ao buscar perfil
    if (error) {
      console.error(`${logPrefix} ❌ Erro ao buscar perfil:`, error);
      // Em caso de erro, redirecionar para onboarding por segurança
      return {
        shouldRedirect: true,
        redirectTo: '/onboarding',
        reason: 'error_fetching_profile',
        profileExists: false,
        quizCompleted: false,
        onboardingCompleted: false,
      };
    }

    const quizCompleted = profile?.quiz_completed || false;
    const onboardingCompleted = profile?.onboarding_completed || false;

    // Caso 3: Onboarding completo (quiz_completed OU onboarding_completed)
    if (quizCompleted || onboardingCompleted) {
      console.log(`${logPrefix} ✅ Onboarding completo - permitir acesso a /home`, {
        quizCompleted,
        onboardingCompleted,
      });
      return {
        shouldRedirect: false,
        redirectTo: '/home',
        reason: 'onboarding_completed',
        profileExists: true,
        quizCompleted,
        onboardingCompleted,
      };
    }

    // Caso 4: Onboarding incompleto
    console.log(`${logPrefix} ⚠️ Onboarding incompleto - redirecionar para /onboarding`, {
      quizCompleted,
      onboardingCompleted,
    });
    return {
      shouldRedirect: true,
      redirectTo: '/onboarding',
      reason: 'onboarding_incomplete',
      profileExists: true,
      quizCompleted,
      onboardingCompleted,
    };
  } catch (err) {
    console.error(`${logPrefix} ❌ Exceção inesperada:`, err);
    // Em caso de exceção, redirecionar para onboarding por segurança
    return {
      shouldRedirect: true,
      redirectTo: '/onboarding',
      reason: 'exception',
      profileExists: false,
      quizCompleted: false,
      onboardingCompleted: false,
    };
  }
}

/**
 * Verifica se o usuário pode acessar /home (onboarding completo)
 * @param userId - ID do usuário autenticado
 * @returns true se pode acessar /home, false caso contrário
 */
export async function canAccessHome(userId: string): Promise<boolean> {
  const status = await checkOnboardingStatus(userId);
  return status.redirectTo === '/home';
}

/**
 * Verifica se o usuário precisa completar o onboarding
 * @param userId - ID do usuário autenticado
 * @returns true se precisa completar, false caso contrário
 */
export async function needsOnboarding(userId: string): Promise<boolean> {
  const status = await checkOnboardingStatus(userId);
  return status.redirectTo === '/onboarding';
}
