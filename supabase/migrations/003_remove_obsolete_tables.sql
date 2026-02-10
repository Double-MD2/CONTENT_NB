-- Migration: Remove tabelas obsoletas (quiz_status e access_history)
-- Created: 2026-01-18
-- Reason: Essas tabelas causavam conflito de "fonte de verdade" com profiles
--
-- FONTE ÚNICA DE VERDADE: profiles.quiz_completed e profiles.onboarding_completed
--
-- Histórico do problema:
-- - Antes: quiz_status.completed ≠ profiles.quiz_completed → loop infinito /home ↔ /onboarding
-- - Agora: APENAS profiles é consultado para decidir fluxo de onboarding
--
-- Impacto:
-- - /api/quiz-status → REMOVIDA
-- - /api/access-history → REMOVIDA
-- - useQuizStatus hook → REMOVIDO
-- - Toda lógica agora usa checkOnboardingStatus() que lê APENAS profiles

-- Drop tabelas obsoletas (se ainda existirem)
DROP TABLE IF EXISTS public.quiz_status CASCADE;
DROP TABLE IF EXISTS public.access_history CASCADE;

-- NOTA: A tabela user_data ainda existe e pode ser útil para outras features
-- (consecutive_days, last_access_date, etc.). Mantemos ela por enquanto.
