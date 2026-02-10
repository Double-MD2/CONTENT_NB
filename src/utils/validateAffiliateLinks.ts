import { supabase } from '@/lib/supabase';

export async function validateAffiliateLinks() {
  try {
    const { data: products, error } = await supabase
      .from('affiliate_products')
      .select('id, affiliate_link, is_active');

    if (error || !products) {
      console.error('[LinkValidator] Erro ao buscar produtos:', error);
      return;
    }

    for (const product of products) {
      try {
        const response = await fetch(product.affiliate_link, {
          method: 'HEAD',
          redirect: 'follow',
        });

        const isValid = response.status === 200;

        if (product.is_active && !isValid) {
          // Produto ativo → desativar
          await supabase
            .from('affiliate_products')
            .update({ is_active: false })
            .eq('id', product.id);

          console.log(`[LinkValidator] ❌ Desativado: ${product.affiliate_link}`);
        }

        if (!product.is_active && isValid) {
          // Produto inativo → reativar
          await supabase
            .from('affiliate_products')
            .update({ is_active: true })
            .eq('id', product.id);

          console.log(`[LinkValidator] ✅ Reativado: ${product.affiliate_link}`);
        }
      } catch (err) {
        console.warn(`[LinkValidator] Erro ao validar link: ${product.affiliate_link}`, err);
      }
    }
  } catch (err) {
    console.error('[LinkValidator] Erro geral:', err);
  }
}
