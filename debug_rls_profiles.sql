-- Debug: Verificar políticas RLS da tabela profiles
-- Executar no SQL Editor do Supabase

-- 1. Ver estrutura da tabela
SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'profiles'
ORDER BY ordinal_position;

-- 2. Verificar se RLS está habilitado
SELECT
    tablename,
    rowsecurity
FROM pg_tables
WHERE tablename = 'profiles';

-- 3. Listar todas as políticas RLS
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'profiles';

-- 4. Verificar índices
SELECT
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename = 'profiles';
