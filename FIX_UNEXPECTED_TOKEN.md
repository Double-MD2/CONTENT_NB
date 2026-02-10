# 🔧 Correção: Unexpected token '<' (JSON Parse Error)

## 📋 Problema Identificado

O erro `SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON` ocorria porque:

1. **Rota deletada**: `/api/access-history` não existe mais no projeto, mas o código ainda tentava chamar essa rota
2. **Resposta HTML**: Quando uma rota não existe, Next.js retorna uma página 404 em HTML
3. **Parse JSON**: O código tentava fazer `.json()` em uma resposta HTML, causando o erro

## ✅ Correções Aplicadas

### 1. **Hardening de Fetch (Validação de Content-Type)**

Adicionados checks de `content-type` ANTES de chamar `.json()` em todos os locais:

#### Arquivos corrigidos:
- ✅ `src/components/custom/sidebar.tsx`
  - Validação em `loadUserProfile()` antes de parsear `/api/user-profile`

- ✅ `src/app/home/page.tsx`
  - Validação em `initializeUser()` antes de parsear `/api/user`
  - **REMOVIDAS** chamadas para `/api/access-history` (rota não existe)

- ✅ `src/app/login/page.tsx`
  - Validação em `handleLoginCallback()` antes de parsear `/api/auth/login-callback`
  - Validação em fallback de `/api/user-profile`

- ✅ `src/app/leitura-do-dia/page.tsx`
  - Validação aprimorada em `loadLiturgyData()` com detecção de HTML

- ✅ `src/app/prayer-note/page.tsx`
  - Validação em `handleSubmit()` antes de parsear `/api/send-prayer-notification`

### 2. **Remoção de Código Morto**

Removidas todas as chamadas para rotas inexistentes:

```typescript
// ❌ ANTES (causava 404 → HTML → erro de parse)
await fetch('/api/access-history', { ... });
const history = await response.json(); // 💥 ERRO

// ✅ DEPOIS (removido completamente)
// O sistema agora usa:
// - log_daily_login RPC (hook useLogDailyLogin)
// - user_week_activity (gerenciado no backend)
```

### 3. **Padrão de Validação Implementado**

Todos os `fetch().json()` agora seguem este padrão:

```typescript
const response = await fetch('/api/endpoint');

// 1️⃣ Verificar status
const contentType = response.headers.get('content-type');
console.log('Status:', response.status);
console.log('Content-Type:', contentType);

// 2️⃣ Validar se é JSON ANTES de parsear
if (!contentType?.includes('application/json')) {
  console.error('❌ Resposta não é JSON! Content-Type:', contentType);
  const bodyText = await response.text();
  console.error('Response body:', bodyText.substring(0, 500));
  throw new Error('API retornou resposta não-JSON');
}

// 3️⃣ Só então fazer parse
const data = await response.json(); // ✅ Seguro
```

## 📦 Utilitário Criado (Opcional)

Criado `src/lib/safe-fetch.ts` para uso futuro:

```typescript
import { safeFetchJson } from '@/lib/safe-fetch';

// Uso simplificado com validação automática
const data = await safeFetchJson('/api/user-profile');
```

## 🔍 Como Detectar Este Problema no DevTools

1. Abrir **Network** no DevTools
2. Procurar por requests com:
   - ❌ Status: 404, 500, 307 (redirect)
   - ❌ Content-Type: `text/html` (deveria ser `application/json`)
   - ❌ Response body começando com `<!DOCTYPE` ou `<html>`

## 📊 Resultado Esperado

### Antes:
```
🚨 SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

### Depois:
```
✅ [SIDEBAR] Response status: 200
✅ [SIDEBAR] Content-Type: application/json
✅ JSON parseado com sucesso
```

Ou, se houver erro:
```
❌ [HOME] /api/access-history retornou não-JSON! Content-Type: text/html
📄 Response body (primeiros 500 chars): <!DOCTYPE html>...
```

## 🎯 Próximos Passos

Se o erro persistir, verificar:

1. **Network tab** - Qual URL está retornando HTML?
2. **Logs do console** - Buscar por `Content-Type: text/html`
3. **Status code** - 404 indica rota inexistente
4. **Response body** - Se começa com `<!DOCTYPE`, é página HTML

## 🔗 Rotas Confirmadas como Existentes

✅ `/api/user` - Gerenciamento de user_data
✅ `/api/user-profile` - Perfil do usuário (profiles table)
✅ `/api/auth/login-callback` - Callback de login
✅ `/api/send-prayer-notification` - Envio de email de oração
✅ `/api/liturgy` - Leitura litúrgica do dia

❌ `/api/access-history` - **REMOVIDA** (não existe mais)
