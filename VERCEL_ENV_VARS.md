# 🔐 Variáveis de Ambiente para Vercel

## ⚠️ CRÍTICO - Configure AGORA na Vercel

Acesse: **Vercel Dashboard → Seu Projeto → Settings → Environment Variables**

---

## 1️⃣ **Supabase (OBRIGATÓRIO)** ✅

Essas variáveis são **ESSENCIAIS** para o app funcionar. Sem elas, o login fica travado.

```bash
# URL do projeto Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co

# Chave pública (anon key)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Chave de serviço (service role) - ADMIN ACCESS
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 📍 Onde encontrar essas variáveis:

1. Acesse: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings → API**
4. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **IMPORTANTE**: A `service_role` key é **SECRETA** - nunca exponha no frontend!

---

## 2️⃣ **Anthropic API (para chat)** 💬

Se o app tem funcionalidade de chat/AI:

```bash
ANTHROPIC_API_KEY=sk-ant-api03-XXXXXXXXXXXXXXXXXXXXX
```

### 📍 Onde encontrar:
1. Acesse: [https://console.anthropic.com/](https://console.anthropic.com/)
2. Vá em **API Keys**
3. Copie a chave ou crie uma nova

---

## 3️⃣ **Resend (para emails) - OPCIONAL** 📧

Se o app envia emails (oração, recuperação de senha):

```bash
RESEND_API_KEY=re_XXXXXXXXXXXXXXXXXXXXX
```

### 📍 Onde encontrar:
1. Acesse: [https://resend.com/api-keys](https://resend.com/api-keys)
2. Crie uma nova API key

---

## 4️⃣ **Site URL (para redirects)** 🌐

```bash
NEXT_PUBLIC_SITE_URL=https://seu-app.vercel.app
```

Essa variável é usada para:
- Recuperação de senha (redirect)
- OAuth callbacks (Google, etc)

---

## ✅ Checklist de Configuração

Depois de adicionar as variáveis:

- [ ] Todas as 3 variáveis de Supabase adicionadas
- [ ] `ANTHROPIC_API_KEY` adicionada (se usar chat)
- [ ] `RESEND_API_KEY` adicionada (se usar emails)
- [ ] `NEXT_PUBLIC_SITE_URL` configurada
- [ ] **REDEPLOY** do projeto na Vercel (Build → Redeploy)

---

## 🚨 Troubleshooting

### Problema: "ENTRANDO..." eternamente

**Causa**: Variáveis de ambiente faltando ou incorretas.

**Solução**:
1. Verifique se as 3 variáveis de Supabase estão configuradas
2. Confirme que os valores estão **corretos** (sem espaços extras)
3. Faça um **Redeploy** na Vercel após adicionar as variáveis
4. Limpe o cache do navegador (Ctrl+Shift+R)

### Problema: Erro 500 em `/api/auth/login-callback`

**Causa**: `SUPABASE_SERVICE_ROLE_KEY` faltando ou inválida.

**Solução**:
1. Copie novamente a `service_role` key do Supabase
2. Cole na Vercel exatamente como está (sem quebrar em múltiplas linhas)
3. Redeploy

### Problema: Chat não funciona

**Causa**: `ANTHROPIC_API_KEY` faltando.

**Solução**:
1. Adicione a variável na Vercel
2. Redeploy

---

## 📊 Como Verificar se Funcionou

Após configurar e fazer redeploy:

1. Abra o app publicado
2. Abra **DevTools → Console**
3. Tente fazer login
4. Procure por:
   - ✅ `[LOGIN-CALLBACK] ✅ Usuário autenticado`
   - ✅ Status 200 em `/api/auth/login-callback`
   - ❌ Se aparecer "PGRST301" ou "JWT" → variáveis de Supabase incorretas
   - ❌ Se aparecer erro 500 → `SUPABASE_SERVICE_ROLE_KEY` faltando

---

## 🔗 Links Úteis

- **Supabase Dashboard**: https://supabase.com/dashboard
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Anthropic Console**: https://console.anthropic.com/
- **Resend Dashboard**: https://resend.com/

---

## ⚡ Comandos Rápidos

```bash
# Testar localmente (criar arquivo .env.local)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
ANTHROPIC_API_KEY=...
```

Depois rode:
```bash
npm run dev
```

Se funcionar localmente mas não na Vercel → problema nas variáveis da Vercel.
