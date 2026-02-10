#!/usr/bin/env node

/**
 * Script de Validação de Setup
 * Verifica se o projeto está configurado corretamente
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validando setup do projeto...\n');

let errors = 0;
let warnings = 0;

// 1. Verificar node_modules
console.log('1️⃣ Verificando node_modules...');
if (fs.existsSync(path.join(__dirname, 'node_modules'))) {
  console.log('   ✅ node_modules existe');
} else {
  console.log('   ❌ node_modules não encontrado. Execute: npm install');
  errors++;
}

// 2. Verificar package.json
console.log('\n2️⃣ Verificando package.json...');
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  
  // Verificar script dev
  if (packageJson.scripts.dev) {
    const devScript = packageJson.scripts.dev;
    if (devScript.includes('-p 3000')) {
      console.log('   ✅ Script dev configurado para porta 3000');
    } else if (devScript.includes('-p 3001')) {
      console.log('   ❌ Script dev ainda está na porta 3001. Deve ser 3000.');
      errors++;
    } else {
      console.log('   ⚠️  Porta não especificada no script dev (usará padrão 3000)');
      warnings++;
    }
    
    // Verificar hostname
    if (devScript.includes('--hostname 0.0.0.0')) {
      console.log('   ✅ Hostname configurado para 0.0.0.0');
    } else {
      console.log('   ⚠️  Hostname não configurado para 0.0.0.0 (pode não funcionar na sandbox)');
      warnings++;
    }
  }
  
  // Verificar script start
  if (packageJson.scripts.start) {
    const startScript = packageJson.scripts.start;
    if (startScript.includes('-p 3000')) {
      console.log('   ✅ Script start configurado para porta 3000');
    } else {
      console.log('   ⚠️  Script start não especifica porta 3000');
      warnings++;
    }
  }
} catch (err) {
  console.log('   ❌ Erro ao ler package.json:', err.message);
  errors++;
}

// 3. Verificar .env.local
console.log('\n3️⃣ Verificando variáveis de ambiente...');
if (fs.existsSync(path.join(__dirname, '.env.local'))) {
  console.log('   ✅ Arquivo .env.local existe');
  
  const envContent = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf8');
  
  if (envContent.includes('NEXT_PUBLIC_SUPABASE_URL')) {
    console.log('   ✅ NEXT_PUBLIC_SUPABASE_URL definido');
  } else {
    console.log('   ⚠️  NEXT_PUBLIC_SUPABASE_URL não encontrado');
    warnings++;
  }
  
  if (envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY')) {
    console.log('   ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY definido');
  } else {
    console.log('   ⚠️  NEXT_PUBLIC_SUPABASE_ANON_KEY não encontrado');
    warnings++;
  }
  
  // Verificar se ainda está com placeholders
  if (envContent.includes('placeholder.supabase.co') || envContent.includes('placeholder-key')) {
    console.log('   ⚠️  Credenciais do Supabase ainda estão com valores placeholder');
    console.log('      O app funcionará mas autenticação não estará disponível');
    warnings++;
  }
} else {
  console.log('   ⚠️  Arquivo .env.local não encontrado');
  console.log('      O app funcionará com valores padrão mas sem autenticação');
  warnings++;
}

// 4. Verificar arquivos essenciais
console.log('\n4️⃣ Verificando arquivos essenciais...');
const essentialFiles = [
  'next.config.ts',
  'tsconfig.json',
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/lib/supabase.ts',
];

essentialFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} não encontrado`);
    errors++;
  }
});

// 5. Verificar versão do Node
console.log('\n5️⃣ Verificando versão do Node...');
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion >= 18) {
  console.log(`   ✅ Node ${nodeVersion} (>= 18 requerido)`);
} else {
  console.log(`   ❌ Node ${nodeVersion} é muito antigo. Node >= 18 requerido.`);
  errors++;
}

// 6. Verificar porta 3000 disponível
console.log('\n6️⃣ Verificando disponibilidade da porta 3000...');
const net = require('net');
const server = net.createServer();

server.once('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log('   ⚠️  Porta 3000 já está em uso');
    console.log('      Execute: lsof -ti:3000 | xargs kill -9 (Linux/Mac)');
    warnings++;
  } else {
    console.log('   ❌ Erro ao verificar porta:', err.message);
    errors++;
  }
});

server.once('listening', () => {
  console.log('   ✅ Porta 3000 está disponível');
  server.close();
});

server.listen(3000);

// Aguardar um momento para testes assíncronos
setTimeout(() => {
  console.log('\n' + '='.repeat(50));
  console.log('📊 RESULTADO DA VALIDAÇÃO');
  console.log('='.repeat(50));
  
  if (errors === 0 && warnings === 0) {
    console.log('✅ Tudo está configurado corretamente!');
    console.log('\n🚀 Execute: npm run dev');
    console.log('🌐 Acesse: http://localhost:3000');
  } else {
    console.log(`❌ Erros: ${errors}`);
    console.log(`⚠️  Avisos: ${warnings}`);
    
    if (errors > 0) {
      console.log('\n❗ Corrija os erros antes de iniciar o servidor.');
    } else {
      console.log('\n⚠️  Avisos não bloqueiam a execução, mas podem causar problemas.');
      console.log('🚀 Você pode tentar executar: npm run dev');
    }
  }
  
  console.log('='.repeat(50) + '\n');
  process.exit(errors > 0 ? 1 : 0);
}, 500);

