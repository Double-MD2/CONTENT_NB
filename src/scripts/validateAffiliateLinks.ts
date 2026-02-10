import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function isLinkActive(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
    });
    return response.ok; // true para status 200–399
  } catch {
    return false;
  }
}

async function validateAffiliateLinks() {
  console.log('🔍 Iniciando validação de TODOS os links afiliados...');

  const { data: products, error } = await supabase
    .from('affiliate_products')
    .select('id, affiliate_link, is_active');

  if (error || !products) {
    console.error('❌ Erro ao buscar produtos:', error);
    return;
  }

  console.log(`📦 ${products.length} produtos encontrados.`);

  for (const product of products) {
    const isActiveNow = await isLinkActive(product.affiliate_link);

    if (product.is_active !== isActiveNow) {
      console.log(
        `${isActiveNow ? '✅ Reativando' : '🚫 Desativando'} produto: ${product.affiliate_link}`
      );

      await supabase
        .from('affiliate_products')
        .update({ is_active: isActiveNow })
        .eq('id', product.id);
    } else {
      console.log(`🔁 Sem mudança: ${product.affiliate_link}`);
    }
  }

  console.log('🎉 Validação concluída.');
}

validateAffiliateLinks();
