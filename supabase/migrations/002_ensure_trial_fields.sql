-- Garantir que a tabela user_subscriptions tem os campos necessários para trial

-- Verificar e adicionar campos se não existirem
DO $$
BEGIN
    -- Adicionar trial_end se não existir
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'user_subscriptions'
        AND column_name = 'trial_end'
    ) THEN
        ALTER TABLE user_subscriptions
        ADD COLUMN trial_end TIMESTAMPTZ;

        COMMENT ON COLUMN user_subscriptions.trial_end IS 'Data de término do trial (NULL se não for trial)';
    END IF;

    -- Garantir que status existe e aceita 'trialing'
    -- (Presumindo que já existe, apenas documentando os valores válidos)
    COMMENT ON COLUMN user_subscriptions.status IS 'Status: trialing (trial ativo), active (assinatura paga), canceled, expired';

END $$;

-- Criar índice para queries de trial
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_trial
ON user_subscriptions(user_id, status, trial_end)
WHERE status = 'trialing';

-- Comentários de documentação
COMMENT ON TABLE user_subscriptions IS 'Gerenciamento de assinaturas e trials dos usuários';
