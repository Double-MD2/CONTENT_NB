-- ========================================
-- SISTEMA "INDIQUE A PALAVRA"
-- ========================================
-- Estrutura de banco de dados para o sistema de indicação com recompensas
-- Autor: Sistema Notas-Bíblicas
-- Data: 2026-02-18

-- ========================================
-- 1. ADICIONAR CAMPO referral_code NA TABELA profiles
-- ========================================

-- Adicionar coluna referral_code (código único do usuário)
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS referral_code VARCHAR(8) UNIQUE;

-- Criar índice para busca rápida por código
CREATE INDEX IF NOT EXISTS idx_profiles_referral_code
ON profiles(referral_code);

-- ========================================
-- 2. CRIAR TABELA referrals (Indicações)
-- ========================================

CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Quem indicou (dono do código)
  referrer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Quem foi indicado (novo usuário)
  referred_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Código usado na indicação
  referral_code VARCHAR(8) NOT NULL,

  -- Status da indicação
  is_valid BOOLEAN DEFAULT false, -- true quando o indicado assinar e completar 10 dias
  validated_at TIMESTAMPTZ, -- Data de validação

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Regras antifraude
  CONSTRAINT no_self_referral CHECK (referrer_id != referred_id),
  CONSTRAINT unique_referred UNIQUE (referred_id) -- Um usuário só pode ser indicado uma vez
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_referrals_referrer
ON referrals(referrer_id);

CREATE INDEX IF NOT EXISTS idx_referrals_referred
ON referrals(referred_id);

CREATE INDEX IF NOT EXISTS idx_referrals_valid
ON referrals(referrer_id, is_valid);

-- ========================================
-- 3. CRIAR TABELA referral_redemptions (Resgates)
-- ========================================

CREATE TABLE IF NOT EXISTS referral_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Usuário que resgatou
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Código de indicação usado
  referral_code VARCHAR(8) NOT NULL,

  -- Número de conversões no momento do resgate
  conversions_count INTEGER NOT NULL,

  -- Status do resgate
  status VARCHAR(20) DEFAULT 'pending', -- pending, approved, paid

  -- Timestamps
  redeemed_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,

  -- Informações de pagamento
  payment_method VARCHAR(50),
  payment_details TEXT
);

-- Índice para buscar resgates por usuário
CREATE INDEX IF NOT EXISTS idx_redemptions_user
ON referral_redemptions(user_id);

-- ========================================
-- 4. POLÍTICAS RLS (Row Level Security)
-- ========================================

-- Habilitar RLS nas tabelas
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_redemptions ENABLE ROW LEVEL SECURITY;

-- Políticas para referrals
CREATE POLICY "Usuários podem ver suas próprias indicações"
ON referrals FOR SELECT
USING (auth.uid() = referrer_id OR auth.uid() = referred_id);

CREATE POLICY "Sistema pode inserir indicações"
ON referrals FOR INSERT
WITH CHECK (true);

CREATE POLICY "Sistema pode atualizar indicações"
ON referrals FOR UPDATE
USING (true);

-- Políticas para referral_redemptions
CREATE POLICY "Usuários podem ver seus próprios resgates"
ON referral_redemptions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seus próprios resgates"
ON referral_redemptions FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- ========================================
-- 5. FUNÇÃO PARA VALIDAR INDICAÇÕES
-- ========================================

-- Esta função deve ser chamada por um cron job ou webhook
-- quando uma assinatura completar 10 dias ativa

CREATE OR REPLACE FUNCTION validate_referral_after_subscription(
  p_user_id UUID
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Atualizar a indicação para válida se:
  -- 1. O usuário foi indicado (existe em referrals como referred_id)
  -- 2. O usuário tem assinatura ativa há pelo menos 10 dias
  -- 3. A indicação ainda não foi validada

  UPDATE referrals
  SET
    is_valid = true,
    validated_at = NOW(),
    updated_at = NOW()
  WHERE
    referred_id = p_user_id
    AND is_valid = false
    AND EXISTS (
      -- Verificar se tem assinatura ativa há pelo menos 10 dias
      SELECT 1
      FROM subscriptions
      WHERE
        user_id = p_user_id
        AND status = 'active'
        AND created_at <= NOW() - INTERVAL '10 days'
    );

  -- Log da operação
  RAISE NOTICE 'Indicação validada para usuário: %', p_user_id;
END;
$$;

-- ========================================
-- 6. TRIGGER PARA updated_at
-- ========================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_referrals_updated_at
BEFORE UPDATE ON referrals
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- 7. FUNÇÃO AUXILIAR: Contar conversões válidas
-- ========================================

CREATE OR REPLACE FUNCTION get_valid_conversions_count(p_user_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO v_count
  FROM referrals
  WHERE
    referrer_id = p_user_id
    AND is_valid = true;

  RETURN v_count;
END;
$$;

-- ========================================
-- INSTRUÇÕES DE USO
-- ========================================

-- 1. Execute este script no seu banco Supabase (SQL Editor)
-- 2. Configure um cron job ou Edge Function para chamar validate_referral_after_subscription()
--    diariamente para todos os usuários com assinaturas ativas há mais de 10 dias
-- 3. Exemplo de query para validar todas as indicações pendentes:
--
--    SELECT validate_referral_after_subscription(user_id)
--    FROM subscriptions
--    WHERE status = 'active'
--      AND created_at <= NOW() - INTERVAL '10 days';
--
-- 4. Para gerar códigos para usuários existentes (executar uma vez):
--
--    UPDATE profiles
--    SET referral_code = UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6))
--    WHERE referral_code IS NULL;

-- ========================================
-- QUERIES ÚTEIS PARA ADMINISTRAÇÃO
-- ========================================

-- Ver indicações de um usuário
-- SELECT * FROM referrals WHERE referrer_id = 'USER_UUID';

-- Ver indicações válidas prontas para resgate
-- SELECT referrer_id, COUNT(*) as valid_count
-- FROM referrals
-- WHERE is_valid = true
-- GROUP BY referrer_id
-- HAVING COUNT(*) >= 10;

-- Ver resgates pendentes
-- SELECT * FROM referral_redemptions WHERE status = 'pending' ORDER BY redeemed_at DESC;
