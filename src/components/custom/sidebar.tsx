'use client';

import { useState, useEffect, useRef } from 'react';
import { X, User, Camera, Heart, DollarSign, Calendar, Edit2, ShoppingCart, Flame, Trophy, Award, Star, Zap, Target, HelpCircle } from 'lucide-react';
import { UserProfile } from '@/lib/types';
import { getUserStats, getLast30DaysAccess, registerDailyAccess } from '@/lib/frequency';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'account' | 'contribute' | 'frequency' | 'store';
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  requirement: number;
}

export default function Sidebar({ isOpen, onClose, initialTab = 'account' }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'account' | 'contribute' | 'frequency' | 'store'>(initialTab);
  const [profile, setProfile] = useState<Partial<UserProfile>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfile>>({});
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [totalAccess, setTotalAccess] = useState(0);
  const [accessDates, setAccessDates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ID do usuário (em produção, viria da autenticação)
  const userId = 'demo-user-id';

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      const parsed = JSON.parse(saved);
      setProfile(parsed);
      setEditedProfile(parsed);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Carrega dados de frequência do Supabase
  useEffect(() => {
    if (isOpen && activeTab === 'frequency') {
      loadFrequencyData();
    }
  }, [isOpen, activeTab]);

  const loadFrequencyData = async () => {
    setIsLoading(true);
    try {
      // Registra o acesso de hoje
      await registerDailyAccess(userId);

      // Busca as estatísticas
      const stats = await getUserStats(userId);
      setCurrentStreak(stats.currentStreak);
      setLongestStreak(stats.longestStreak);
      setTotalAccess(stats.totalAccessDays);

      // Busca os acessos dos últimos 30 dias
      const last30Days = await getLast30DaysAccess(userId);
      setAccessDates(last30Days);
    } catch (error) {
      console.error('Erro ao carregar dados de frequência:', error);
      // Fallback para dados locais se houver erro
      const frequencyData = localStorage.getItem('frequencyData');
      if (frequencyData) {
        const data = JSON.parse(frequencyData);
        setCurrentStreak(data.currentStreak || 0);
        setLongestStreak(data.longestStreak || 0);
        setTotalAccess(data.totalAccess || 0);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoUrl = reader.result as string;
        const updatedProfile = { ...profile, profilePhoto: photoUrl };
        setProfile(updatedProfile);
        setEditedProfile(updatedProfile);
        localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSaveProfile = () => {
    localStorage.setItem('userProfile', JSON.stringify(editedProfile));
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleHelpClick = () => {
    window.location.href = 'mailto:md2.double@gmail.com?subject=Ajuda - App de Orações';
  };

  const getFrequencyData = () => {
    const days = 30;
    const data = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      data.push({
        date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        fullDate: date,
        accessed: accessDates.includes(dateStr),
      });
    }
    return data;
  };

  const badges: Badge[] = [
    {
      id: '1',
      name: 'Peregrino',
      description: '3 dias consecutivos',
      icon: '🌱',
      unlocked: currentStreak >= 3,
      requirement: 3,
    },
    {
      id: '2',
      name: 'Discípulo',
      description: '7 dias consecutivos',
      icon: '⭐',
      unlocked: currentStreak >= 7,
      requirement: 7,
    },
    {
      id: '3',
      name: 'Guardião',
      description: '15 dias consecutivos',
      icon: '🔥',
      unlocked: currentStreak >= 15,
      requirement: 15,
    },
    {
      id: '4',
      name: 'Servo',
      description: '30 dias consecutivos',
      icon: '⚔️',
      unlocked: currentStreak >= 30,
      requirement: 30,
    },
    {
      id: '5',
      name: 'Intercessor',
      description: '60 dias consecutivos',
      icon: '👑',
      unlocked: currentStreak >= 60,
      requirement: 60,
    },
    {
      id: '6',
      name: 'Eterno',
      description: '100 dias consecutivos',
      icon: '💎',
      unlocked: currentStreak >= 100,
      requirement: 100,
    },
  ];

  const getNextBadge = () => {
    const nextBadge = badges.find(b => !b.unlocked);
    return nextBadge ? nextBadge.requirement : 100;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 to-amber-500 p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
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
            onClick={() => setActiveTab('contribute')}
            className={`flex-1 py-3 text-xs font-semibold transition-colors ${
              activeTab === 'contribute'
                ? 'text-amber-600 border-b-2 border-amber-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Contribuir
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
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                    {profile.profilePhoto ? (
                      <img src={profile.profilePhoto} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <button 
                    onClick={handlePhotoButtonClick}
                    className="absolute bottom-0 right-0 p-2 bg-amber-400 text-white rounded-full hover:bg-amber-500 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
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

                  <div>
                    <label className="text-sm font-semibold text-gray-700">Versículo Favorito</label>
                    <p className="mt-1 text-gray-900 italic">
                      {profile.favoriteVerse || 'Nenhum versículo favorito ainda'}
                    </p>
                  </div>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-400 text-white rounded-xl font-semibold hover:bg-amber-500 transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                    Editar Perfil
                  </button>

                  <button
                    onClick={handleHelpClick}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                  >
                    <HelpCircle className="w-5 h-5" />
                    Ajuda
                  </button>
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
                    <select
                      value={editedProfile.religion || ''}
                      onChange={(e) => setEditedProfile({ ...editedProfile, religion: e.target.value })}
                      className="mt-1 w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-400 focus:outline-none"
                    >
                      <option value="">Selecione sua religião</option>
                      <option value="Cristianismo">Cristianismo</option>
                      <option value="Catolicismo">Catolicismo</option>
                      <option value="Protestantismo">Protestantismo</option>
                      <option value="Espiritismo">Espiritismo</option>
                      <option value="Umbanda">Umbanda</option>
                      <option value="Candomblé">Candomblé</option>
                      <option value="Judaísmo">Judaísmo</option>
                      <option value="Islamismo">Islamismo</option>
                      <option value="Budismo">Budismo</option>
                      <option value="Hinduísmo">Hinduísmo</option>
                      <option value="Outra">Outra</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">Versículo Favorito</label>
                    <textarea
                      value={editedProfile.favoriteVerse || ''}
                      onChange={(e) => setEditedProfile({ ...editedProfile, favoriteVerse: e.target.value })}
                      rows={3}
                      className="mt-1 w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-400 focus:outline-none resize-none"
                      placeholder="Ex: João 3:16"
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

          {/* Contribute Tab */}
          {activeTab === 'contribute' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Contribua Conosco</h3>
                <p className="text-gray-600 text-sm">
                  Sua contribuição ajuda a manter este projeto e apoiar causas importantes
                </p>
              </div>

              <div className="space-y-3">
                <button className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-amber-400 transition-colors text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Contribuição Única</p>
                      <p className="text-sm text-gray-600">Faça uma contribuição pontual</p>
                    </div>
                  </div>
                </button>

                <button className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-amber-400 transition-colors text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Contribuição Mensal</p>
                      <p className="text-sm text-gray-600">Apoie mensalmente o projeto</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Frequency Tab */}
          {activeTab === 'frequency' && (
            <div className="space-y-6">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
                  <p className="text-gray-600 mt-4">Carregando dados...</p>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">Sua Jornada</h3>
                    <p className="text-gray-600 text-sm">
                      Continue firme na sua caminhada espiritual
                    </p>
                  </div>

                  {/* Cards de Estatísticas */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Card Sequência Atual */}
                    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-4 text-white shadow-lg transform hover:scale-105 transition-transform">
                      <div className="flex items-center justify-between mb-2">
                        <Heart className="w-6 h-6" />
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">🙏</span>
                        </div>
                      </div>
                      <p className="text-sm opacity-90 mb-1">Sequência Atual</p>
                      <p className="text-3xl font-bold animate-pulse">{currentStreak}</p>
                      <p className="text-xs opacity-80">dias consecutivos</p>
                    </div>

                    {/* Card Maior Sequência */}
                    <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-4 text-white shadow-lg transform hover:scale-105 transition-transform">
                      <div className="flex items-center justify-between mb-2">
                        <Trophy className="w-6 h-6" />
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">🏆</span>
                        </div>
                      </div>
                      <p className="text-sm opacity-90 mb-1">Recorde</p>
                      <p className="text-3xl font-bold">{longestStreak}</p>
                      <p className="text-xs opacity-80">dias seguidos</p>
                    </div>

                    {/* Card Total de Acessos */}
                    <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-4 text-white shadow-lg transform hover:scale-105 transition-transform">
                      <div className="flex items-center justify-between mb-2">
                        <Target className="w-6 h-6" />
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">📊</span>
                        </div>
                      </div>
                      <p className="text-sm opacity-90 mb-1">Total de Dias</p>
                      <p className="text-3xl font-bold">{totalAccess}</p>
                      <p className="text-xs opacity-80">nos últimos 30 dias</p>
                    </div>

                    {/* Card Próxima Meta */}
                    <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-4 text-white shadow-lg transform hover:scale-105 transition-transform">
                      <div className="flex items-center justify-between mb-2">
                        <Zap className="w-6 h-6" />
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">⚡</span>
                        </div>
                      </div>
                      <p className="text-sm opacity-90 mb-1">Próxima Meta</p>
                      <p className="text-3xl font-bold">{getNextBadge()}</p>
                      <p className="text-xs opacity-80">faltam {getNextBadge() - currentStreak} dias</p>
                    </div>
                  </div>

                  {/* Calendário de 30 dias */}
                  <div className="bg-white rounded-2xl border-2 border-gray-100 p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-bold text-gray-800">Últimos 30 Dias</p>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-amber-400 rounded"></div>
                          <span>Acessado</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-gray-200 rounded"></div>
                          <span>Perdido</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {getFrequencyData().map((day, index) => (
                        <div key={index} className="text-center">
                          <div
                            className={`w-full aspect-square rounded-lg mb-1 transition-all transform hover:scale-110 ${
                              day.accessed
                                ? 'bg-gradient-to-br from-amber-400 to-amber-500 shadow-md'
                                : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                            title={day.fullDate.toLocaleDateString('pt-BR', { 
                              day: '2-digit', 
                              month: 'long',
                              year: 'numeric'
                            })}
                          />
                          <p className="text-xs text-gray-500">{day.date.split('/')[0]}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Badges de Gamificação */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border-2 border-amber-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-5 h-5 text-amber-600" />
                      <p className="text-sm font-bold text-gray-800">Conquistas</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {badges.map((badge) => (
                        <div
                          key={badge.id}
                          className={`text-center p-3 rounded-xl transition-all transform hover:scale-105 ${
                            badge.unlocked
                              ? 'bg-white shadow-md border-2 border-amber-300'
                              : 'bg-gray-100 opacity-50'
                          }`}
                        >
                          <div className={`text-3xl mb-1 ${badge.unlocked ? 'animate-bounce' : 'grayscale'}`}>
                            {badge.icon}
                          </div>
                          <p className={`text-xs font-semibold mb-1 text-center ${
                            badge.unlocked ? 'text-gray-800' : 'text-gray-500'
                          }`}>
                            {badge.name}
                          </p>
                          <p className="text-xs text-gray-600">{badge.requirement} dias</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mensagem Motivacional */}
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-4 text-white text-center shadow-lg">
                    <Star className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                    <p className="font-bold mb-1">Continue assim! 🎉</p>
                    <p className="text-sm opacity-90">
                      {currentStreak >= 7 
                        ? 'Você está em uma sequência incrível!' 
                        : 'Mais alguns dias para desbloquear a próxima conquista!'}
                    </p>
                  </div>

                  {/* Estatísticas Detalhadas */}
                  <div className="bg-white rounded-2xl border-2 border-gray-100 p-4 shadow-sm">
                    <p className="text-sm font-bold text-gray-800 mb-3">Estatísticas Detalhadas</p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Taxa de frequência:</span>
                        <span className="text-sm font-bold text-amber-600">
                          {Math.round((totalAccess / 30) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(totalAccess / 30) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-sm text-gray-600">Dias com acesso:</span>
                        <span className="text-sm font-bold text-green-600">{totalAccess} de 30</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Store Tab (Mercadinho) */}
          {activeTab === 'store' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ShoppingCart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Mercadinho</h3>
                <p className="text-gray-600 text-sm">
                  Produtos e recursos espirituais para sua jornada
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-amber-400 transition-colors">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📖</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">Bíblia Sagrada</h4>
                      <p className="text-sm text-gray-600 mb-2">Edição de estudo completa</p>
                      <p className="text-lg font-bold text-amber-600">R$ 89,90</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-amber-400 transition-colors">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📿</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">Terço Artesanal</h4>
                      <p className="text-sm text-gray-600 mb-2">Feito à mão com pedras naturais</p>
                      <p className="text-lg font-bold text-amber-600">R$ 45,00</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-amber-400 transition-colors">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🕯️</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">Kit de Velas</h4>
                      <p className="text-sm text-gray-600 mb-2">6 velas aromáticas para oração</p>
                      <p className="text-lg font-bold text-amber-600">R$ 29,90</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-amber-400 transition-colors">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">✝️</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">Crucifixo de Parede</h4>
                      <p className="text-sm text-gray-600 mb-2">Madeira nobre 30cm</p>
                      <p className="text-lg font-bold text-amber-600">R$ 65,00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-4 mt-6">
                <p className="text-sm text-gray-700 text-center">
                  <span className="font-semibold">🎁 Frete grátis</span> para compras acima de R$ 100
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
