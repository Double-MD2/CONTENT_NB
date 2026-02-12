# 🔧 Troubleshooting: Card "Para Você"

## 🚨 Problema: Erro ao Criar Jornada Espiritual

### Sintomas
- Ao selecionar tema pela primeira vez, o insert falha
- Erro vazio ou genérico retornado

---

## ✅ Correções Implementadas

### 1. Validação de Autenticação
Antes de criar a jornada, o sistema agora:
- ✅ Valida autenticação com `supabase.auth.getUser()`
- ✅ Verifica se `user` não é `null`
- ✅ Confirma que `user.id` corresponde ao `userId` recebido
- ✅ Usa `user.id` diretamente no insert (garantido pela autenticação)

### 2. Logs Detalhados
Foram adicionados logs em cada etapa:
```
[SPIRITUAL-JOURNEY] 🔍 Iniciando criação de jornada...
[SPIRITUAL-JOURNEY] userId recebido: [uuid]
[SPIRITUAL-JOURNEY] theme recebido: [tema]
[SPIRITUAL-JOURNEY] ✅ Usuário autenticado: [uuid]
[SPIRITUAL-JOURNEY] 📤 Dados a serem inseridos: {...}
[SPIRITUAL-JOURNEY] ✅ Jornada criada com sucesso
```

Se houver erro:
```
[SPIRITUAL-JOURNEY] ❌ Erro ao criar jornada: [erro]
[SPIRITUAL-JOURNEY] ❌ Código do erro: [código]
[SPIRITUAL-JOURNEY] ❌ Detalhes: [detalhes]
[SPIRITUAL-JOURNEY] ❌ Mensagem: [mensagem]
```

---

## 🔍 Como Diagnosticar

### Passo 1: Abrir Console do Navegador (F12)
Acessar a aba **Console** para ver os logs.

### Passo 2: Tentar Selecionar Tema
Escolher um tema e clicar em "Confirmar".

### Passo 3: Verificar Logs
Procurar por logs começando com `[SPIRITUAL-JOURNEY]` ou `[THEME-SELECTION]`.

---

## 🛠️ Possíveis Causas e Soluções

### ❌ Causa 1: Tabela não existe
**Sintoma:** Erro "relation 'user_spiritual_journey' does not exist"

**Solução:**
1. Acessar Supabase Dashboard
2. Ir em "SQL Editor"
3. Executar o SQL de criação da tabela (fornecido em `docs/INSTRUCOES-PARA-VOCE.md`)

---

### ❌ Causa 2: RLS bloqueando insert
**Sintoma:** Erro vazio ou "new row violates row-level security policy"

**Solução:**
Verificar se a política RLS está configurada corretamente:

```sql
-- Verificar políticas existentes
SELECT * FROM pg_policies
WHERE tablename = 'user_spiritual_journey';

-- Se necessário, recriar política de INSERT
DROP POLICY IF EXISTS "Usuários podem criar sua própria jornada"
ON user_spiritual_journey;

CREATE POLICY "Usuários podem criar sua própria jornada"
  ON user_spiritual_journey FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

---

### ❌ Causa 3: Usuário não autenticado
**Sintoma:** Log mostra "❌ Usuário não autenticado"

**Solução:**
1. Fazer logout
2. Fazer login novamente
3. Tentar selecionar tema

---

### ❌ Causa 4: Coluna UUID incompatível
**Sintoma:** Erro relacionado a tipo de dado

**Solução:**
Verificar se o tipo da coluna `user_id` está correto:

```sql
-- Verificar tipo da coluna
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'user_spiritual_journey'
AND column_name = 'user_id';

-- Deve retornar: user_id | uuid
```

---

### ❌ Causa 5: Constraint violada
**Sintoma:** Erro "duplicate key value violates unique constraint"

**Solução:**
O usuário já tem uma jornada criada. Verificar:

```sql
-- Verificar se já existe jornada para o usuário
SELECT * FROM user_spiritual_journey
WHERE user_id = 'SEU_USER_ID_AQUI';

-- Se existir, deletar para testar novamente
DELETE FROM user_spiritual_journey
WHERE user_id = 'SEU_USER_ID_AQUI';
```

---

## 📊 Verificar Estado Atual

### Consulta SQL útil
Execute no Supabase SQL Editor:

```sql
-- Ver todas as jornadas criadas
SELECT
  id,
  user_id,
  current_theme,
  theme_selected_at,
  last_theme_change_at,
  daily_content_index,
  last_content_date
FROM user_spiritual_journey
ORDER BY created_at DESC;
```

---

## 🧪 Teste Manual

### 1. Verificar autenticação no console:
```javascript
const { data: { user } } = await supabase.auth.getUser();
console.log('User:', user);
```

### 2. Testar insert manual:
```javascript
const { data, error } = await supabase
  .from('user_spiritual_journey')
  .insert({
    user_id: user.id,
    current_theme: 'ansiedade-medo',
    theme_selected_at: new Date().toISOString(),
    last_theme_change_at: null,
    last_content_date: null,
    daily_content_index: 0,
  })
  .select()
  .single();

console.log('Data:', data);
console.log('Error:', error);
```

---

## 📞 Checklist Final

Antes de reportar o problema, verificar:

- [ ] Tabela `user_spiritual_journey` existe no Supabase?
- [ ] RLS está habilitado?
- [ ] Política de INSERT existe e está correta?
- [ ] Usuário está autenticado? (verificar no console)
- [ ] `user.id` é um UUID válido?
- [ ] Logs no console mostram algum erro específico?
- [ ] Tentou fazer logout/login novamente?

---

## 🎯 Informações para Debug

Se o erro persistir, copiar e enviar:

1. **Logs do console** (todos os logs com `[SPIRITUAL-JOURNEY]`)
2. **Resultado da query SQL:**
   ```sql
   SELECT * FROM pg_policies
   WHERE tablename = 'user_spiritual_journey';
   ```
3. **Estrutura da tabela:**
   ```sql
   \d user_spiritual_journey
   ```

---

## ✅ Correção Aplicada

Com as alterações feitas, o sistema agora:
- ✅ Valida autenticação **antes** de tentar insert
- ✅ Usa `user.id` diretamente (garantido pela autenticação)
- ✅ Loga todos os passos para facilitar debug
- ✅ Mostra mensagens de erro detalhadas
- ✅ Bloqueia ação se usuário não estiver autenticado

Se o erro ainda ocorrer, os logs no console vão mostrar **exatamente** onde está o problema! 🔍
