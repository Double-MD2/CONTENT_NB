'use client';

import { ShoppingBag, Clock, Sparkles } from 'lucide-react';
import { useAffiliateProducts } from '@/hooks/useAffiliateProducts';

export default function MercadinhoStore() {
  const { products, loading, error, timeRemaining } = useAffiliateProducts();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm">Carregando ofertas especiais...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-red-600 font-semibold mb-2">Ops! Algo deu errado</p>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600 font-semibold mb-2">Nenhum produto disponível</p>
          <p className="text-gray-500 text-sm">Volte mais tarde para ver nossas ofertas</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header com contador */}
      <div className="bg-white rounded-xl p-4 border-2 border-amber-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <p className="text-sm font-semibold text-gray-800">Ofertas Especiais</p>
          </div>
          <div className="flex items-center gap-2 text-amber-600">
            <Clock className="w-4 h-4" />
            <p className="text-xs font-medium">Válido por {timeRemaining}</p>
          </div>
        </div>
      </div>

      {/* Lista de produtos */}
      <div className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <a
            key={product.id}
            href={product.affiliate_link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-amber-400 hover:shadow-lg transition-all duration-300 group"
          >
            {/* Imagem */}
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {product.display_badge && (
                <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  {product.display_badge}
                </div>
              )}
            </div>

            {/* Conteúdo */}
            <div className="p-4">
              <h4 className="font-bold text-gray-800 mb-2 text-base group-hover:text-amber-600 transition-colors">
                {product.name}
              </h4>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-end">
                <button className="bg-amber-400 hover:bg-amber-500 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                  Ver oferta
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200 text-center">
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-green-700">✓</span> Produtos selecionados especialmente para você
        </p>
      </div>
    </div>
  );
}
