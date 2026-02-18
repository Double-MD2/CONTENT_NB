'use client';

import { useState, useEffect, useRef } from 'react';
import {
  X,
  User,
  Camera,
  Heart,
  DollarSign,
  Calendar,
  Edit2,
  ShoppingCart,
  LogOut,
  Award,
  TrendingUp,
  Star,
  Clock,
  ChevronRight,
  LifeBuoy,
  MessageCircle,
  Mail,
  XCircle,
  Share2,
  Copy,
  Check,
  Gift,
  Users,
  Target,
  Sparkles,
} from 'lucide-react';
import { UserProfile } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useSidebar } from '@/contexts/SidebarContext';
import { useSubscription } from '@/hooks/useSubscription';
import Frequency30Days from './Frequency30Days';
import MercadinhoStore from './MercadinhoStore';
import { generateReferralCode, normalizeReferralCode } from '@/lib/referral-codes';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'account' | 'frequency' | 'store' | 'referral';
}

interface ActivityDay {
  activity_date: string;
}

export default function Sidebar({ isOpen, onClose, initialTab = 'account' }: SidebarProps) {
  const router = useRouter();
  const { setIsSidebarOpen } = useSidebar();
  const { isInTrial, trialDaysRemaining, isActive: hasActiveSubscription } = useSubscription();
  const [activeTab, setActiveTab] = useState<'account' | 'frequency' | 'store' | 'referral'>(initialTab);
  const [profile, setProfile] = useState<Partial<UserProfile>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfile>>({});
  const [consecutiveDays, setConsecutiveDays] = useState(0);
  const [activities, setActivities] = useState<ActivityDay[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loginCount, setLoginCount] = useState(0);
  const [lastLoginAt, setLastLoginAt] = useState<string | null>(null);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [totalAccessedDays, setTotalAccessedDays] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estados do sistema de indicação
  const [referralCode, setReferralCode] = useState<string>('');
  const [validConversions, setValidConversions] = useState(0);
  const [canRedeem, setCanRedeem] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadUserProfile();
      loadActivities();
      loadReferralData();
    }
    setIsSidebarOpen(isOpen);
  }, [isOpen, setIsSidebarOpen]);

  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  const loadActivities = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        console.log('[SIDEBAR] Não autenticado, não carregando atividades');
        return;
      }

      // 🔹 Últimos 30 dias (para visualização)
      const { data, error } = await supabase
        .from('user_week_activity')
        .select('activity_date')
        .eq('user_id', user.id)
        .order('activity_date', { ascending: false })
        .limit(30);

      if (error) {
        console.error('[SIDEBAR] Erro ao carregar atividades:', error);
        return;
      }

      setActivities(data || []);

      const streak = calculateStreak(data || []);
      setConsecutiveDays(streak);

      // 🔹 Contagem total de acessos (sem limite)
      const { count } = await supabase
        .from('user_week_activity')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      setTotalAccessedDays(count || 0);

      // 🔹 Buscar histórico completo para calcular maior sequência
      const { data: allActivities } = await supabase
        .from('user_week_activity')
        .select('activity_date')
        .eq('user_id', user.id)
        .order('activity_date', { ascending: true });

      const max = calculateMaxStreak(allActivities || []);
      setMaxStreak(max);

      console.log('[SIDEBAR] ✅ Atividades carregadas:', {
        totalUltimos30: data?.length || 0,
        totalGeral: count,
        streakAtual: streak,
        maiorSequencia: max,
      });
    } catch (err) {
      console.error('[SIDEBAR] Exceção ao carregar atividades:', err);
    }
  };

  const calculateStreak = (activities: ActivityDay[]): number => {
    if (activities.length === 0) return 0;

    const sortedActivities = [...activities].sort(
      (a, b) => new Date(b.activity_date).getTime() - new Date(a.activity_date).getTime()
    );

    const mostRecentActivity = new Date(sortedActivities[0].activity_date);
    mostRecentActivity.setHours(0, 0, 0, 0);

    let streak = 0;
    let currentDate = new Date(mostRecentActivity);

    for (const activity of sortedActivities) {
      const activityDate = new Date(activity.activity_date);
      activityDate.setHours(0, 0, 0, 0);

      if (activityDate.getTime() === currentDate.getTime()) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (activityDate.getTime() < currentDate.getTime()) {
        break;
      }
    }

    return streak;
  };

  const calculateMaxStreak = (activities: ActivityDay[]): number => {
    if (activities.length === 0) return 0;

    const sortedActivities = [...activities].sort(
      (a, b) => new Date(a.activity_date).getTime() - new Date(b.activity_date).getTime()
    );

    let maxStreak = 1;
    let currentStreak = 1;

    for (let i = 1; i < sortedActivities.length; i++) {
      const prevDate = new Date(sortedActivities[i - 1].activity_date);
      const currDate = new Date(sortedActivities[i].activity_date);

      const diffTime = currDate.getTime() - prevDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (diffDays === 1) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
    }

    return maxStreak;
  };

  const loadUserProfile = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        console.log('[SIDEBAR] Não autenticado');
        return;
      }

      const currentUserId = user.id;
      setUserId(currentUserId);

      const response = await fetch(`/api/user-profile`);

      console.log('[SIDEBAR] Response status:', response.status);

      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
          console.error('[SIDEBAR] ❌ Resposta não é JSON! Content-Type:', contentType);
          const bodyText = await response.text();
          console.error('[SIDEBAR] Response body:', bodyText.substring(0, 500));
          throw new Error('API retornou resposta não-JSON');
        }

        const data = await response.json();

        const backendProfile = {
          name: data.name || null,
          religion: data.religion || null,
          profilePhoto: data.photoUrl || null,
          favoriteVerse: undefined,
        };

        setProfile(backendProfile);
        setEditedProfile(backendProfile);
        setLoginCount(data.loginCount || 0);
        setLastLoginAt(data.lastLoginAt || null);

        console.log('[SIDEBAR] ✅ Perfil carregado do Supabase:', {
          name: backendProfile.name,
          religion: backendProfile.religion,
          hasPhoto: !!backendProfile.profilePhoto,
          loginCount: data.loginCount,
          lastLoginAt: data.lastLoginAt,
        });
      } else {
        const bodyText = await response.text();
        console.error('[SIDEBAR] ❌ Erro ao buscar perfil do Supabase:', {
          status: response.status,
          body: bodyText.substring(0, 500),
        });

        setProfile({});
        setEditedProfile({});
      }
    } catch (error) {
      console.error('[SIDEBAR] ❌ Exceção ao carregar perfil:', error);
      setProfile({});
      setEditedProfile({});
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    console.log('[SIDEBAR] handlePhotoUpload disparado', { hasFile: !!file });

    if (file) {
      console.log('[SIDEBAR] Arquivo selecionado:', {
        name: file.name,
        type: file.type,
        size: file.size,
      });

      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem.');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        console.log('[SIDEBAR] ✅ Foto convertida para base64, tamanho:', base64String.length);

        const updatedProfile = { ...editedProfile, profilePhoto: base64String };

        setEditedProfile(updatedProfile);
        setProfile(updatedProfile);

        console.log('[SIDEBAR] ✅ Estados atualizados - foto deve aparecer agora!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    console.log('[SIDEBAR] Botão da câmera clicado');
    fileInputRef.current?.click();
  };

  const handleSaveProfile = async () => {
    try {
      if (userId) {
        const response = await fetch('/api/user-profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: editedProfile.name || null,
            religion: editedProfile.religion || null,
            photoUrl: editedProfile.profilePhoto || null,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('[SIDEBAR] ✅ Perfil salvo no Supabase com sucesso!');

          const savedProfile = {
            name: data.data?.name || null,
            religion: data.data?.religion || null,
            profilePhoto: data.data?.photoUrl || null,
          };

          setProfile(savedProfile);
          setEditedProfile(savedProfile);
          setIsEditing(false);

          const toastEl = document.createElement('div');
          toastEl.textContent = '✅ Perfil salvo com sucesso!';
          toastEl.style.cssText =
            'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#10b981;color:#fff;padding:12px 24px;border-radius:8px;font-size:14px;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,0.15);font-weight:600;';
          document.body.appendChild(toastEl);
          setTimeout(() => toastEl.remove(), 3000);
        } else {
          const bodyText = await response.text();
          console.error('[SIDEBAR] ❌ Erro ao salvar no Supabase:', {
            status: response.status,
            body: bodyText.substring(0, 500),
          });

          alert('Erro ao salvar perfil. Verifique sua conexão e tente novamente.');
        }
      }
    } catch (error) {
      console.error('[SIDEBAR] ❌ Exceção ao salvar perfil:', error);
      alert('Erro ao salvar perfil. Verifique sua conexão e tente novamente.');
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.clear();
      router.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      localStorage.clear();
      router.push('/login');
    }
  };

  const handleCopyLink = () => {
    if (!userId) return;

    const link = `https://minhabiblia.com.br/register?ref=${userId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadReferralData = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        console.log('[SIDEBAR] Não autenticado, não carregando dados de indicação');
        return;
      }

      // Buscar ou criar código de indicação
      let { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('referral_code')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('[SIDEBAR] Erro ao buscar código de indicação:', profileError);
        return;
      }

      let code = profileData?.referral_code;

      // Se não existe código, gerar um novo
      if (!code) {
        code = generateReferralCode(user.id);

        const { error: updateError } = await supabase
          .from('profiles')
          .update({ referral_code: code })
          .eq('id', user.id);

        if (updateError) {
          console.error('[SIDEBAR] Erro ao salvar código de indicação:', updateError);
        }
      }

      setReferralCode(code);

      // Buscar indicações válidas (assinantes ativos por mais de 10 dias)
      const { data: referrals, error: referralsError } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', user.id)
        .eq('is_valid', true);

      if (referralsError) {
        console.error('[SIDEBAR] Erro ao buscar indicações:', referralsError);
        return;
      }

      const validCount = referrals?.length || 0;
      setValidConversions(validCount);
      setCanRedeem(validCount >= 10);

      console.log('[SIDEBAR] ✅ Dados de indicação carregados:', {
        code,
        validConversions: validCount,
        canRedeem: validCount >= 10,
      });
    } catch (err) {
      console.error('[SIDEBAR] Exceção ao carregar dados de indicação:', err);
    }
  };

  const handleRedeemReward = async () => {
    if (!canRedeem) return;

    const message = encodeURIComponent(
      `Olá! Atingi 10 conversões válidas no sistema "Indique a Palavra" do app Notas-Bíblicas e gostaria de resgatar minha recompensa de R$20.\n\nMeu código de indicação: ${referralCode}`
    );

    const whatsappUrl = `https://wa.me/5564992016685?text=${message}`;
    window.open(whatsappUrl, '_blank');

    // Registrar resgate no banco
    if (userId) {
      try {
        await supabase.from('referral_redemptions').insert({
          user_id: userId,
          referral_code: referralCode,
          conversions_count: validConversions,
          redeemed_at: new Date().toISOString(),
        });
        console.log('[SIDEBAR] Resgate registrado');
      } catch (err) {
        console.error('[SIDEBAR] Erro ao registrar resgate:', err);
      }
    }
  };

  const handleCopyReferralCode = () => {
    if (!referralCode) return;

    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLast30Days = (): { date: Date; hasActivity: boolean }[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days: { date: Date; hasActivity: boolean }[] = [];

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];

      const hasActivity = activities.some((activity) => activity.activity_date === dateString);

      days.push({ date, hasActivity });
    }

    return days;
  };

  const getLevelInfo = (days: number) => {
    if (days >= 121) return { name: 'Eterno', color: 'from-purple-500 to-pink-500', icon: '👑', min: 121 };
    if (days >= 91) return { name: 'Intercessor', color: 'from-blue-500 to-purple-500', icon: '🙏', min: 91 };
    if (days >= 51) return { name: 'Servo', color: 'from-green-500 to-blue-500', icon: '⚔️', min: 51 };
    if (days >= 30) return { name: 'Guardião', color: 'from-yellow-500 to-green-500', icon: '🛡️', min: 30 };
    if (days >= 6) return { name: 'Discípulo', color: 'from-orange-500 to-yellow-500', icon: '📖', min: 6 };
    return { name: 'Peregrino', color: 'from-gray-400 to-gray-500', icon: '🚶', min: 0 };
  };

  const getNextLevel = (days: number) => {
    if (days >= 121) return null;
    if (days >= 91) return { name: 'Eterno', min: 121 };
    if (days >= 51) return { name: 'Intercessor', min: 91 };
    if (days >= 30) return { name: 'Servo', min: 51 };
    if (days >= 6) return { name: 'Guardião', min: 30 };
    return { name: 'Discípulo', min: 6 };
  };

  const currentLevel = getLevelInfo(consecutiveDays);
  const nextLevel = getNextLevel(consecutiveDays);
  const last30Days = getLast30Days();

  // 🔧 PROGRESSO CORRIGIDO
  const progress = nextLevel
    ? ((consecutiveDays - currentLevel.min) /
        (nextLevel.min - currentLevel.min)) *
      100
    : 100;

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50 transition-opacity" onClick={onClose} />

      {/* Sidebar */}
      <div className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 to-amber-500 p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">Menu</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Profile Preview */}
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              {profile.profilePhoto ? (
                <img src={profile.profilePhoto} alt="Profile" className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-8 h-8" />
              )}
            </div>
            <div>
              <p className="font-semibold text-lg">{profile.name || 'Usuário'}</p>
              <p className="text-sm text-white/80">{profile.religion || 'Religião'}</p>
              {loginCount > 0 && (
                <p className="text-xs text-white/70 mt-1">
                  {loginCount} {loginCount === 1 ? 'acesso' : 'acessos'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('account')}
            className={`flex-1 py-3 text-xs font-semibold transition-colors ${
              activeTab === 'account'
                ? 'text-amber-600 border-b-2 border-amber-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Conta
          </button>
          <button
            onClick={() => setActiveTab('referral')}
            className={`flex-1 py-3 text-xs font-semibold transition-colors ${
              activeTab === 'referral'
                ? 'text-amber-600 border-b-2 border-amber-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Indique
          </button>
          <button
            onClick={() => setActiveTab('frequency')}
            className={`flex-1 py-3 text-xs font-semibold transition-colors ${
              activeTab === 'frequency'
                ? 'text-amber-600 border-b-2 border-amber-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Frequência
          </button>
          <button
            onClick={() => setActiveTab('store')}
            className={`flex-1 py-3 text-xs font-semibold transition-colors ${
              activeTab === 'store'
                ? 'text-amber-600 border-b-2 border-amber-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Mercadinho
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Account Tab */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              {/* Banner de Trial */}
              {isInTrial && !hasActiveSubscription && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-400 p-2 rounded-full">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">Teste Gratuito</p>
                      <p className="text-xs text-gray-600">
                        {trialDaysRemaining === 1 ? '1 dia restante' : `${trialDaysRemaining} dias restantes`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto overflow-hidden">
                    {profile.profilePhoto ? (
                      <img src={profile.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  {isEditing && (
                    <>
                      <button
                        onClick={handleCameraClick}
                        className="absolute bottom-0 right-0 p-2 bg-amber-400 text-white rounded-full hover:bg-amber-500 transition-colors shadow-lg"
                      >
                        <Camera className="w-4 h-4" />
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </>
                  )}
                </div>
              </div>

              {!isEditing ? (
                <>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Nome</label>
                    <p className="mt-1 text-gray-900">{profile.name || 'Não informado'}</p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">Religião</label>
                    <p className="mt-1 text-gray-900">{profile.religion || 'Não informada'}</p>
                  </div>

                  <div className="space-y-2 mt-6">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <Edit2 className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-800">Editar Perfil</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>

                    <button
                      onClick={() => {
                        router.push('/plans');
                        onClose();
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-amber-500" />
                        <span className="text-sm font-medium text-gray-800">Ver Planos Premium</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>

                    <button
                      onClick={() => setShowSupportModal(true)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <LifeBuoy className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-800">Suporte</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200 space-y-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-red-50 rounded-lg transition-colors border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <LogOut className="w-5 h-5 text-red-500" />
                        <span className="text-sm font-medium text-red-500">Sair</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-red-400" />
                    </button>

                    <button
                      onClick={() => {
                        router.push('/cancel-subscription');
                        onClose();
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-orange-50 rounded-lg transition-colors border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <XCircle className="w-5 h-5 text-orange-500" />
                        <span className="text-sm font-medium text-orange-500">Cancelar assinatura</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-orange-400" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Nome</label>
                    <input
                      type="text"
                      value={editedProfile.name || ''}
                      onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                      className="mt-1 w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">Religião</label>
                    <input
                      type="text"
                      value={editedProfile.religion || ''}
                      onChange={(e) => setEditedProfile({ ...editedProfile, religion: e.target.value })}
                      className="mt-1 w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="flex-1 px-4 py-3 bg-amber-400 text-white rounded-xl font-semibold hover:bg-amber-500 transition-colors"
                    >
                      Salvar
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Indique a Palavra Tab - Sistema de Recompensas */}
          {activeTab === 'referral' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Gift className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Indique a Palavra</h3>
                <p className="text-gray-600 text-sm px-4">
                  Convide amigos para o Notas-Bíblicas e ganhe uma recompensa quando eles se tornarem assinantes.
                </p>
              </div>

              {/* Código de Convite */}
              <div className="bg-amber-50 p-5 rounded-xl border-2 border-amber-200">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-amber-600" />
                  <p className="text-xs font-bold text-amber-800 uppercase tracking-widest">
                    Seu Código de Convite
                  </p>
                </div>

                <div className="bg-white border-2 border-amber-300 rounded-lg shadow-sm overflow-hidden">
                  <div className="flex items-stretch">
                    <div className="flex-1 flex items-center justify-center py-3 px-4">
                      <input
                        readOnly
                        value={referralCode || 'Carregando...'}
                        className="w-full text-2xl font-bold text-amber-900 text-center outline-none bg-transparent tracking-wide"
                      />
                    </div>
                    <button
                      onClick={handleCopyReferralCode}
                      disabled={!referralCode}
                      className="flex items-center justify-center px-3 bg-amber-100 hover:bg-amber-200 text-amber-700 transition-all active:scale-95 disabled:opacity-50 border-l-2 border-amber-300"
                      title="Copiar Código"
                    >
                      {copied ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {copied && (
                  <p className="text-xs text-green-600 mt-2 font-bold flex items-center justify-center gap-1">
                    <Check className="w-3 h-3" /> Código copiado!
                  </p>
                )}
              </div>

              {/* Barra de Progresso */}
              <div className="bg-white p-5 rounded-xl border-2 border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <p className="text-sm font-bold text-gray-800">Conversões Válidas</p>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{validConversions}/10</p>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-2">
                  <div
                    className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((validConversions / 10) * 100, 100)}%` }}
                  />
                </div>

                <p className="text-xs text-gray-600 text-center">
                  Faltam {Math.max(10 - validConversions, 0)} conversões para resgatar sua recompensa
                </p>
              </div>

              {/* Regra */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-blue-900 mb-1">Regra de Validação</p>
                    <p className="text-xs text-blue-800 leading-relaxed">
                      Somente assinantes ativos por pelo menos 10 dias contam para o progresso. Isso garante um sistema justo e sustentável.
                    </p>
                  </div>
                </div>
              </div>

              {/* Recompensa */}
              <div className="bg-green-50 rounded-xl p-5 border-2 border-green-200 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-7 h-7 text-green-700" />
                </div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Recompensa</p>
                <p className="text-3xl font-bold text-green-700 mb-2">R$ 20,00</p>
                <p className="text-xs text-gray-600">Pago via Pix ao atingir 10 conversões válidas</p>
              </div>

              {/* Botão de Resgate */}
              {canRedeem ? (
                <button
                  onClick={handleRedeemReward}
                  className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Gift className="w-5 h-5" />
                  Resgatar Recompensa via WhatsApp
                </button>
              ) : (
                <div className="bg-gray-100 rounded-xl p-4 text-center border-2 border-dashed border-gray-300">
                  <p className="text-sm text-gray-600">
                    Continue compartilhando seu código para desbloquear o resgate!
                  </p>
                </div>
              )}

              {/* Informação Adicional */}
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                <p className="text-xs text-purple-900 leading-relaxed">
                  <strong>Como funciona:</strong> Compartilhe seu código com amigos. Quando eles se cadastrarem usando seu código e se tornarem assinantes ativos por 10 dias, você avança na barra de progresso. Ao completar 10 conversões, você pode resgatar R$ 20 via Pix!
                </p>
              </div>
            </div>
          )}

          {/* Frequency Tab */}
          {activeTab === 'frequency' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Sua Jornada Espiritual</h3>
                <p className="text-gray-600 text-sm">Acompanhe sua frequência e conquiste novos níveis</p>
              </div>

              <div
                className={`bg-gradient-to-r ${currentLevel.color} rounded-2xl p-6 text-white shadow-lg transform transition-all duration-300 hover:scale-105`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{currentLevel.icon}</span>
                    <div>
                      <p className="text-sm opacity-90">Nível Atual</p>
                      <p className="text-2xl font-bold">{currentLevel.name}</p>
                    </div>
                  </div>
                  <Award className="w-8 h-8 opacity-80" />
                </div>

                {nextLevel && (
                  <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                    <p className="text-xs opacity-90 mb-1">Próximo nível: {nextLevel.name}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-white/30 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-white rounded-full h-2 transition-all duration-500"
                          style={{
                            width: `${Math.min(progress, 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs font-semibold">
                        {Math.max(nextLevel.min - consecutiveDays, 0)} dias
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 text-white text-center shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-6 h-6 animate-pulse" />
                  <p className="text-sm font-semibold">Sequência Atual</p>
                </div>
                <p className="text-5xl font-bold mb-1 animate-pulse">{consecutiveDays}</p>
                <p className="text-sm opacity-90">dias consecutivos</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-xl p-4 text-center border-2 border-blue-100">
                  <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">{totalAccessedDays}</p>
                  <p className="text-xs text-gray-600">Total de Acessos</p>
                </div>

                <div className="bg-purple-50 rounded-xl p-4 text-center border-2 border-purple-100">
                  <Award className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-600">{maxStreak}</p>
                  <p className="text-xs text-gray-600">Maior Sequência</p>
                </div>
              </div>

              <Frequency30Days />

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-100">
                <p className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-600" />
                  Conquistas Desbloqueadas
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {consecutiveDays >= 0 && (
                    <div className="bg-white rounded-lg p-2 text-center shadow-sm">
                      <span className="text-2xl">🚶</span>
                      <p className="text-xs font-semibold text-gray-700 mt-1">Peregrino</p>
                    </div>
                  )}
                  {consecutiveDays >= 6 && (
                    <div className="bg-white rounded-lg p-2 text-center shadow-sm">
                      <span className="text-2xl">📖</span>
                      <p className="text-xs font-semibold text-gray-700 mt-1">Discípulo</p>
                    </div>
                  )}
                  {consecutiveDays >= 30 && (
                    <div className="bg-white rounded-lg p-2 text-center shadow-sm">
                      <span className="text-2xl">🛡️</span>
                      <p className="text-xs font-semibold text-gray-700 mt-1">Guardião</p>
                    </div>
                  )}
                  {consecutiveDays >= 51 && (
                    <div className="bg-white rounded-lg p-2 text-center shadow-sm">
                      <span className="text-2xl">⚔️</span>
                      <p className="text-xs font-semibold text-gray-700 mt-1">Servo</p>
                    </div>
                  )}
                  {consecutiveDays >= 91 && (
                    <div className="bg-white rounded-lg p-2 text-center shadow-sm">
                      <span className="text-2xl">🙏</span>
                      <p className="text-xs font-semibold text-gray-700 mt-1">Intercessor</p>
                    </div>
                  )}
                  {consecutiveDays >= 121 && (
                    <div className="bg-white rounded-lg p-2 text-center shadow-sm">
                      <span className="text-2xl">👑</span>
                      <p className="text-xs font-semibold text-gray-700 mt-1">Eterno</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
                <p className="text-sm text-gray-700 text-center">
                  <span className="font-semibold">💪 Continue assim!</span>
                  <br />
                  {consecutiveDays === 0 && 'Comece sua jornada hoje mesmo!'}
                  {consecutiveDays > 0 && consecutiveDays < 6 && 'Você está no caminho certo!'}
                  {consecutiveDays >= 6 && consecutiveDays < 30 && 'Sua dedicação está crescendo!'}
                  {consecutiveDays >= 30 && consecutiveDays < 51 && 'Você é um exemplo de constância!'}
                  {consecutiveDays >= 51 && consecutiveDays < 91 && 'Sua fé é inspiradora!'}
                  {consecutiveDays >= 91 && consecutiveDays < 121 && 'Você alcançou um nível extraordinário!'}
                  {consecutiveDays >= 121 && 'Você é uma lenda viva! 👑'}
                </p>
              </div>
            </div>
          )}

          {/* Store Tab */}
          {activeTab === 'store' && <MercadinhoStore />}
        </div>
      </div>

      {/* Modal de Suporte */}
      {showSupportModal && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-[60] transition-opacity"
            onClick={() => setShowSupportModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-white rounded-2xl shadow-2xl z-[70] p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <LifeBuoy className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fale com o Suporte</h3>
              <p className="text-sm text-gray-600">Escolha como prefere entrar em contato</p>
            </div>

            <div className="space-y-3">
              <a
                href="http://wa.me/5564992016685"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors border-2 border-green-200"
              >
                <MessageCircle className="w-6 h-6 text-green-600" />
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-gray-800">Por WhatsApp</p>
                  <p className="text-xs text-gray-600">Resposta rápida</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </a>

              <a
                href="mailto:md2.double@gmail.com"
                className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border-2 border-blue-200"
              >
                <Mail className="w-6 h-6 text-blue-600" />
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-gray-800">Via E-mail</p>
                  <p className="text-xs text-gray-600">md2.double@gmail.com</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </a>
            </div>

            <button
              onClick={() => setShowSupportModal(false)}
              className="w-full mt-4 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold text-gray-700 transition-colors"
            >
              Fechar
            </button>
          </div>
        </>
      )}
    </>
  );
}
