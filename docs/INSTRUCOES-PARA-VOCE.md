# 📖 Instruções de Configuração: Card "Para Você"

## 🎯 Visão Geral

O card "Para Você" oferece jornada espiritual personalizada com **persistência via Supabase**, **sequência diária automática** e **regra de troca de tema (1x a cada 7 dias)**.

---

## 🗄️ 1. Estrutura do Banco de Dados (Supabase)

### Tabela: `user_spiritual_journey`

```sql
CREATE TABLE user_spiritual_journey (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_theme TEXT NOT NULL,
  theme_selected_at TIMESTAMP WITH TIME ZONE NOT NULL,
  last_theme_change_at TIMESTAMP WITH TIME ZONE,
  last_content_date DATE,
  daily_content_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Índices para performance
CREATE INDEX idx_user_spiritual_journey_user_id ON user_spiritual_journey(user_id);
CREATE INDEX idx_user_spiritual_journey_current_theme ON user_spiritual_journey(current_theme);
```

### Tabela: `spiritual_contents`

```sql
CREATE TABLE spiritual_contents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  theme TEXT NOT NULL,
  day_index INTEGER NOT NULL,
  bible_text JSONB NOT NULL,
  reflection TEXT NOT NULL,
  prayer TEXT NOT NULL,
  action TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(theme, day_index)
);

-- Índices para performance
CREATE INDEX idx_spiritual_contents_theme ON spiritual_contents(theme);
CREATE INDEX idx_spiritual_contents_theme_day ON spiritual_contents(theme, day_index);
```

### RLS (Row Level Security)

```sql
-- user_spiritual_journey
ALTER TABLE user_spiritual_journey ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver apenas sua própria jornada"
  ON user_spiritual_journey FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar sua própria jornada"
  ON user_spiritual_journey FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar sua própria jornada"
  ON user_spiritual_journey FOR UPDATE
  USING (auth.uid() = user_id);

-- spiritual_contents (leitura pública)
ALTER TABLE spiritual_contents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Conteúdos espirituais são públicos para leitura"
  ON spiritual_contents FOR SELECT
  TO authenticated
  USING (true);
```

---

## 📦 2. Popular Conteúdos Iniciais

Execute o arquivo `docs/supabase-spiritual-contents-seed.sql` no **Supabase SQL Editor** para popular a tabela `spiritual_contents` com conteúdos iniciais.

**Importante:** Você precisará criar conteúdos para todos os 10 temas. O arquivo seed contém exemplos para 2 temas. Adicione os demais seguindo o mesmo padrão.

---

## ⚙️ 3. Regras de Negócio Implementadas

### ✅ Persistência do Tema

- O tema atual é sempre lido de `user_spiritual_journey.current_theme`
- **NUNCA** é redefinido automaticamente quando o dia vira
- Só muda quando o usuário solicita a troca

### ✅ Conteúdo Diário Sequencial

O sistema usa:
- `current_theme`: tema atual do usuário
- `daily_content_index`: índice do conteúdo (0, 1, 2...)
- `last_content_date`: última data em que o conteúdo foi acessado

**Fluxo:**
1. Se `last_content_date` ≠ hoje → incrementar `daily_content_index` e atualizar `last_content_date`
2. Buscar conteúdo onde `theme = current_theme` e `day_index = daily_content_index`
3. Se não encontrar conteúdo (fim do ciclo) → resetar `daily_content_index` para 0

### ✅ Troca de Tema (Regra: 1x a cada 7 dias)

**Primeira tentativa:**
- Se `last_theme_change_at` é `NULL` → permitir troca (é a primeira vez)

**Tentativas subsequentes:**
- Calcular dias desde `last_theme_change_at`
- Se `dias >= 7` → permitir troca
- Se `dias < 7` → **bloquear** e mostrar mensagem com dias restantes

**Ao trocar:**
1. Atualizar `current_theme`
2. Atualizar `last_theme_change_at` para agora
3. Resetar `daily_content_index` para 0
4. Resetar `last_content_date` para `NULL`

---

## 🖥️ 4. Interface Implementada

### Card na Dashboard

**Com tema configurado:**
- Mostra: "Tema atual: [Nome do Tema]"
- Botão "Trocar tema" no canto inferior esquerdo (pequeno e discreto)
- Ao clicar no card → abre `/para-voce` (conteúdo diário)

**Sem tema configurado:**
- Mostra: "Escolha um tema para receber conteúdos feitos para o seu momento"
- Botão "Escolher tema"
- Ao clicar → abre `/para-voce/temas`

### Página de Conteúdo Diário (`/para-voce`)

**Seções do conteúdo:**
1. Texto Bíblico (borda âmbar)
2. Reflexão (borda roxa)
3. Oração (borda azul)
4. Ação Prática (borda verde)

**Navegação:**
- Header com botão "Voltar" → retorna para dashboard
- Botão "Voltar para a home" ao final do conteúdo

**Não aparece:**
- ❌ "Escolher conteúdo"
- ❌ "Ver conteúdo hoje"
- ❌ Botão "Trocar tema" (só aparece na dashboard)

### Página de Seleção de Temas (`/para-voce/temas`)

**10 temas disponíveis:**
1. Luto e Perda 🕊️
2. Ansiedade e Medo 🌊
3. Fortalecimento da Fé ⛰️
4. Gratidão e Alegria ☀️
5. Financeiro e Trabalho 💼
6. Relacionamentos e Família 👨‍👩‍👧‍👦
7. Perdão e Cura Interior 🌱
8. Decisões Difíceis 🧭
9. Propósito e Vocação 🎯
10. Paz Interior e Descanso 🌙

**Comportamento:**
- Detecta se é primeira escolha ou troca de tema
- Valida regra de 7 dias ao trocar
- Redireciona para dashboard após confirmar

---

## 🔧 5. Arquivos Criados/Modificados

### Novos arquivos:
- `src/lib/spiritual-journey.ts` - Service layer para gerenciar jornada
- `docs/supabase-spiritual-contents-seed.sql` - Seed de conteúdos
- `docs/INSTRUCOES-PARA-VOCE.md` - Este arquivo

### Arquivos modificados:
- `src/lib/supabase.ts` - Adicionados tipos TypeScript
- `src/app/para-voce/page.tsx` - Integração com Supabase
- `src/app/para-voce/temas/page.tsx` - Integração com Supabase
- `src/app/dashboard/page.tsx` - Lógica de troca de tema com Supabase

---

## 🚀 6. Próximos Passos

1. **Criar as tabelas no Supabase** (SQL acima)
2. **Configurar RLS** (políticas de segurança)
3. **Popular conteúdos** (executar seed SQL)
4. **Adicionar conteúdos dos 8 temas restantes** (seguir padrão do seed)
5. **Testar fluxo completo:**
   - Escolher tema pela primeira vez
   - Ver conteúdo diário
   - Trocar de tema (verificar regra de 7 dias)
   - Verificar incremento diário automático

---

## 📊 7. Fluxograma de Funcionamento

```
DASHBOARD
    ↓
Tem jornada? → NÃO → Seleção de Temas → Criar jornada → Dashboard
    ↓ SIM
    ↓
Clicar "Para Você" → Página de Conteúdo Diário
    ↓
    • Verificar se last_content_date ≠ hoje
    • Se diferente → incrementar daily_content_index
    • Buscar conteúdo (theme + day_index)
    • Exibir conteúdo
    ↓
Voltar para Dashboard
    ↓
Clicar "Trocar tema" → Verificar regra 7 dias
    ↓ Permitido
Seleção de Temas → Atualizar tema + resetar índice → Dashboard
    ↓ Bloqueado
Modal: "Você poderá trocar em X dias"
```

---

## 🛠️ 8. Troubleshooting

### Problema: Conteúdo não aparece
**Solução:** Verifique se a tabela `spiritual_contents` está populada com conteúdos para o tema atual.

### Problema: Tema não persiste
**Solução:** Verifique se a tabela `user_spiritual_journey` tem registro para o usuário.

### Problema: Incremento diário não funciona
**Solução:** Verifique se `last_content_date` está sendo atualizado corretamente.

### Problema: Regra de 7 dias não funciona
**Solução:** Verifique se `last_theme_change_at` está sendo atualizado ao trocar tema.

---

## ✅ Conclusão

O sistema está **100% integrado ao Supabase** e segue todas as regras especificadas:
- ✅ Persistência via banco de dados
- ✅ Sequência diária automática
- ✅ Regra de troca de tema (1x a cada 7 dias)
- ✅ Interface limpa e intuitiva
- ✅ Navegação clara
