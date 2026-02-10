'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
  User, 
  Loader2, 
  ChevronRight, 
  Star, 
  BarChart3, 
  Heart, 
  ShoppingBag, 
  LifeBuoy, 
  LogOut,
  MessageCircle,
  Mail,
  X
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ProfilePage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Estados do perfil
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [religion, setReligion] = useState('');
  
  // Estado do modal de suporte
  const [supportModalOpen, setSupportModalOpen] = useState(false);

  useEffect(() => {
    initializeProfile();
  }, []);

  const initializeProfile = async () => {
    try {
      // Verificar sessão
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
        return;
      }

      const currentUserId = session.user.id;
      setUserId(currentUserId);

      // Buscar dados do perfil
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('avatar_url, name, religion')
        .eq('id', currentUserId)
        .single();

      if (profileError) {
        console.error('[PROFILE] Erro ao buscar perfil:', profileError);
      } else if (profile) {
        setAvatarUrl(profile.avatar_url);
        setName(profile.name || '');
        setReligion(profile.religion || '');
      }
    } catch (err: any) {
      console.error('[PROFILE] Erro na inicialização:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/login');
    } catch (err) {
      console.error('[PROFILE] Erro ao fazer logout:', err);
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('md2.double@gmail.com');
      // Criar toast manualmente
      const toastEl = document.createElement('div');
      toastEl.textContent = 'Copiado';
      toastEl.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#000;color:#fff;padding:12px 24px;border-radius:8px;font-size:14px;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,0.15);';
      document.body.appendChild(toastEl);
      setTimeout(() => toastEl.remove(), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
      // Fallback para navegadores antigos
      const textArea = document.createElement('textarea');
      textArea.value = 'md2.double@gmail.com';
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        const toastEl = document.createElement('div');
        toastEl.textContent = 'Copiado';
        toastEl.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#000;color:#fff;padding:12px 24px;border-radius:8px;font-size:14px;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,0.15);';
        document.body.appendChild(toastEl);
        setTimeout(() => toastEl.remove(), 2000);
      } catch (err2) {
        console.error('Fallback também falhou:', err2);
      }
      document.body.removeChild(textArea);
    }
  };

  const menuItems = [
    {
      icon: Star,
      label: 'Ver Planos Premium',
      onClick: () => router.push('/plans'),
    },
    {
      icon: BarChart3,
      label: 'Frequência',
      onClick: () => {}, // TODO: Implementar navegação
    },
    {
      icon: Heart,
      label: 'Contribuir',
      onClick: () => {}, // TODO: Implementar navegação
    },
    {
      icon: ShoppingBag,
      label: 'Mercadinho',
      onClick: () => {}, // TODO: Implementar navegação
    },
    {
      icon: LifeBuoy,
      label: 'Contatar o Suporte',
      onClick: () => setSupportModalOpen(true),
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header - Avatar, Nome e Religião */}
        <div className="flex flex-col items-center mb-8">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-white shadow-lg overflow-hidden flex items-center justify-center mb-4 ring-4 ring-amber-100">
            {avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-gray-400" />
            )}
          </div>

          {/* Nome */}
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {name || 'Usuário'}
          </h1>

          {/* Religião */}
          {religion && (
            <p className="text-sm text-gray-600">
              {religion}
            </p>
          )}
        </div>

        {/* Botão Primário - Editar Perfil */}
        <button
          onClick={() => router.push('/profile')}
          className="w-full mb-6 px-6 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-2xl font-semibold text-base shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          ✏️ Editar Perfil
        </button>

        {/* Lista de Opções */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 active:bg-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-gray-900 font-medium text-base">
                  {item.label}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>

        {/* Zona de Perigo - Sair */}
        <div className="mt-12">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-5 py-4 bg-white rounded-2xl shadow-sm hover:bg-red-50 transition-colors active:bg-red-100"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-red-600 font-semibold text-base">
                Sair
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-red-400" />
          </button>
        </div>
      </div>

      {/* Modal de Suporte */}
      <Dialog open={supportModalOpen} onOpenChange={setSupportModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Fale com o Suporte
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-3 mt-4">
            <p className="text-sm text-gray-600 mb-6">
              Escolha como deseja entrar em contato conosco:
            </p>

            {/* Opção WhatsApp */}
            <a
              href="http://wa.me/5564992016685"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors border border-green-200 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">Por WhatsApp</p>
                <p className="text-xs text-gray-600">
                  Resposta rápida
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </a>

            {/* Opção E-mail */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors border border-blue-200 w-full cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900">Via E-mail</p>
                <p className="text-sm text-gray-600">md2.double@gmail.com</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
