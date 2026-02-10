import { validateAffiliateLinks } from '@/utils/validateAffiliateLinks';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface AffiliateProduct {
  id: string;
  name: string;
  description: string;
  image_url: string;
  tier: 1 | 2 | 3;
  affiliate_link: string;
  is_active: boolean;
  display_badge?: string;
  last_shown_at?: string;
  times_shown?: number;
  created_at: string;
  updated_at: string;
}

interface UseAffiliateProductsResult {
  products: AffiliateProduct[];
  loading: boolean;
  error: string | null;
  timeRemaining: string;
  refetch: () => Promise<void>;
}

export function useAffiliateProducts(): UseAffiliateProductsResult {
  const [products, setProducts] = useState<AffiliateProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: allProducts, error: fetchError } = await supabase
        .from('affiliate_products')
        .select('*')
        .eq('is_active', true)
        .order('last_shown_at', { ascending: true, nullsFirst: true });

      if (fetchError) {
        console.error('[useAffiliateProducts] Erro ao buscar produtos:', fetchError);
        setError('Não foi possível carregar os produtos');
        setProducts([]);
        return;
      }

      if (!allProducts || allProducts.length === 0) {
        console.log('[useAffiliateProducts] Nenhum produto disponível');
        setProducts([]);
        return;
      }

      const tier1Products = allProducts.filter(p => p.tier === 1);
      const tier2Products = allProducts.filter(p => p.tier === 2);
      const tier3Products = allProducts.filter(p => p.tier === 3);

      const selectProducts = (list: AffiliateProduct[], count: number) => {
        if (list.length === 0) return [];
        const sorted = [...list].sort((a, b) => {
          if (!a.last_shown_at && !b.last_shown_at) return Math.random() - 0.5;
          if (!a.last_shown_at) return -1;
          if (!b.last_shown_at) return 1;
          return new Date(a.last_shown_at).getTime() - new Date(b.last_shown_at).getTime();
        });
        return sorted.slice(0, Math.min(count, sorted.length));
      };

      const selected: AffiliateProduct[] = [];
      selected.push(...selectProducts(tier1Products, 1));
      selected.push(...selectProducts(tier2Products, 2));
      selected.push(...selectProducts(tier3Products, 2));

      const needed = 5 - selected.length;
      if (needed > 0) {
        const remaining = allProducts.filter(p => !selected.some(s => s.id === p.id));
        selected.push(...selectProducts(remaining, needed));
      }

      const finalProducts = selected.slice(0, 5);

      for (const product of finalProducts) {
        await supabase
          .from('affiliate_products')
          .update({
            last_shown_at: new Date().toISOString(),
            times_shown: (product.times_shown || 0) + 1,
          })
          .eq('id', product.id);
      }

      setProducts(finalProducts);
    } catch (err) {
      console.error('[useAffiliateProducts] Exceção ao buscar produtos:', err);
      setError('Erro ao carregar produtos');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateTimeRemaining = () => {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const diff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}min`;
  };

  useEffect(() => {
    // 🔁 Valida todos os links (ativos e inativos) sempre que o app é acessado
    validateAffiliateLinks();

    fetchProducts();
    setTimeRemaining(calculateTimeRemaining());

    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return {
    products,
    loading,
    error,
    timeRemaining,
    refetch: fetchProducts,
  };
}
