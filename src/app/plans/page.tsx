'use client';

import { useState } from 'react';
import { Check, Sparkles, Crown, Infinity } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Plan {
  id: string;
  name: string;
  originalPrice: number;
  price: number;
  period: string;
  icon: React.ReactNode;
  highlight?: boolean;
  features: string[];
  kirvanoLink: string;
  firstMonthPrice?: number;
}

const plans: Plan[] = [
  {
    id: 'monthly',
    name: 'Plano Mensal',
    originalPrice: 19.99,
    price: 14.99,
    period: 'mês',
    icon: <Sparkles className="w-6 h-6" />,
    firstMonthPrice: 8.99,
    features: [
      'Acesso completo ao app',
      'Conteúdo diário exclusivo',
      'Bíblia completa',
      'Chat com IA',
      'Sem anúncios',
    ],
    kirvanoLink: 'https://pay.kirvano.com/8dbcf4dd-7c2d-48fc-b380-87b5d513e5e8',
  },
  {
    id: 'semester',
    name: 'Plano Semestral',
    originalPrice: 89.99,
    price: 64.99,
    period: '6 meses',
    icon: <Crown className="w-6 h-6" />,
    highlight: true,
    features: [
      'Acesso completo ao app',
      'Conteúdo diário exclusivo',
      'Bíblia completa',
      'Chat com IA',
      'Sem anúncios',
      'Economia de 28%',
    ],
    kirvanoLink: 'https://pay.kirvano.com/b8122513-33d0-4312-b63d-f36c67c9db4f',
  },
  {
    id: 'annual',
    name: 'Plano Anual',
    originalPrice: 139.99,
    price: 99.99,
    period: 'ano',
    icon: <Crown className="w-6 h-6" />,
    features: [
      'Acesso completo ao app',
      'Conteúdo diário exclusivo',
      'Bíblia completa',
      'Chat com IA',
      'Sem anúncios',
      'Economia de 40%',
    ],
    kirvanoLink: 'https://pay.kirvano.com/342ac510-4486-495d-86fe-d61d264d263b',
  },
  {
    id: 'lifetime',
    name: 'Plano Vitalício',
    originalPrice: 329.99,
    price: 249.99,
    period: 'para sempre',
    icon: <Infinity className="w-6 h-6" />,
    features: [
      'Acesso completo ao app',
      'Conteúdo diário exclusivo',
      'Bíblia completa',
      'Chat com IA',
      'Sem anúncios',
      'Pagamento único',
      'Acesso vitalício',
    ],
    kirvanoLink: 'https://pay.kirvano.com/055620aa-9552-4b20-973f-942186415e29',
  },
];

export default function PlansPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan.id);
    
    // Redirecionar para link de pagamento da Kirvano
    // O webhook da Kirvano atualizará automaticamente a tabela user_subscriptions
    window.location.href = plan.kirvanoLink;
  };

  const calculateDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/home')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Voltar
            </button>
            
            <div className="flex items-center gap-2">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/8f5542a7-c136-497a-822e-8e2a2fb72e5e.png" 
                alt="Plano Diário" 
                className="h-12 w-auto" 
              />
            </div>

            <div className="w-16"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Escolha seu plano
          </h1>
          <p className="text-xl md:text-2xl text-amber-600 font-semibold mb-2">
            Se aproxime de Deus por menos de R$0,50 por dia!
          </p>
          <p className="text-gray-600">
            Acesso completo a todos os recursos premium
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-2xl ${
                plan.highlight ? 'ring-4 ring-amber-400' : ''
              }`}
            >
              {/* Highlight Badge */}
              {plan.highlight && (
                <div className="absolute top-4 right-4 bg-amber-400 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Mais Popular
                </div>
              )}

              <div className="p-6">
                {/* Plan Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl ${
                    plan.highlight 
                      ? 'bg-gradient-to-br from-amber-400 to-amber-600' 
                      : 'bg-gradient-to-br from-blue-400 to-blue-600'
                  } text-white`}>
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-sm text-gray-600">{plan.period}</p>
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-gray-400 line-through text-lg">
                      R$ {plan.originalPrice.toFixed(2)}
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                      -{calculateDiscount(plan.originalPrice, plan.price)}%
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">
                      R$ {plan.price.toFixed(2)}
                    </span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  
                  {/* First Month Promotion */}
                  {plan.firstMonthPrice && (
                    <div className="mt-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-800 font-semibold flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Primeiro mês por apenas R$ {plan.firstMonthPrice.toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all hover:scale-105 ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700'
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                  }`}
                >
                  Assinar Agora
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Pagamento seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Cancele quando quiser</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Suporte dedicado</span>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Perguntas Frequentes
          </h2>
          
          <div className="space-y-4">
            <details className="bg-white rounded-xl p-6 shadow-md">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Como funciona o período de teste?
              </summary>
              <p className="mt-3 text-gray-600">
                Você tem 3 dias de acesso gratuito a todos os recursos premium no seu primeiro login.
                Após esse período, é necessário assinar um plano para continuar com acesso completo.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 shadow-md">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Posso cancelar a qualquer momento?
              </summary>
              <p className="mt-3 text-gray-600">
                Sim! Você pode cancelar sua assinatura a qualquer momento sem custos adicionais. 
                Seu acesso continuará até o final do período pago.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 shadow-md">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Qual a diferença entre os planos?
              </summary>
              <p className="mt-3 text-gray-600">
                Todos os planos oferecem acesso completo aos mesmos recursos. A diferença está 
                no período de cobrança e no desconto oferecido. Planos mais longos têm maior economia.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 shadow-md">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                O que acontece após o pagamento?
              </summary>
              <p className="mt-3 text-gray-600">
                Após a confirmação do pagamento, seu acesso premium é ativado automaticamente. 
                Você receberá um email de confirmação e poderá usar todos os recursos imediatamente.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
