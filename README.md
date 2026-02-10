This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. Configurar variáveis de ambiente

Copie o arquivo `.env.local.example` para `.env.local` e configure suas credenciais do Supabase:

```bash
cp .env.local.example .env.local
```

Edite `.env.local` com suas credenciais reais do Supabase (encontre em https://app.supabase.com/project/_/settings/api).

**Variáveis obrigatórias:**
```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
NEXT_PUBLIC_SITE_URL=https://notas-biblicas.vercel.app
```

> **Importante para produção (Vercel):** Configure `NEXT_PUBLIC_SITE_URL` com a URL do seu site em produção para garantir que os links de recuperação de senha funcionem corretamente.

### 2. Instalar dependências

```bash
npm install
```

### 3. Rodar o servidor de desenvolvimento

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Configuração do Supabase

### Redirect URLs (Authentication)

No painel do Supabase (Authentication > URL Configuration), adicione as seguintes URLs:

**Site URL:**
```
https://notas-biblicas.vercel.app
```

**Redirect URLs:**
```
https://notas-biblicas.vercel.app/reset-password
https://notas-biblicas.vercel.app/login
https://notas-biblicas.vercel.app/**
```

Isso garante que os links de recuperação de senha e confirmação de email funcionem corretamente.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

**Importante:** Ao fazer deploy na Vercel, configure a variável de ambiente:
```
NEXT_PUBLIC_SITE_URL=https://notas-biblicas.vercel.app
```

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
