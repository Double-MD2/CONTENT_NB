'use client';

import { useState, useEffect, useRef } from 'react';
import { X, User, Camera, Heart, DollarSign, Calendar, Edit2, ShoppingCart, LogOut, Award, TrendingUp, Star } from 'lucide-react';
import { UserProfile } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'account' | 'contribute' | 'frequency' | 'store';
}

interface AccessRecord {
  date: string;
  accessed: boolean;
}

export default function Sidebar({ isOpen, onClose, initialTab = 'account' }: SidebarProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'account' | 'contribute' | 'frequency' | 'store'>(initialTab);
  const [profile, setProfile] = useState<Partial<UserProfile>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfile>>({});
  const [consecutiveDays, setConsecutiveDays] = useState(0);
  const [accessHistory, setAccessHistory] = useState<AccessRecord[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    // Registrar acesso do dia atual
    const today = new Date().toDateString();
    const lastAccess = localStorage.getItem('lastAccessDate');
    
    if (lastAccess !== today) {
      localStorage.setItem('lastAccessDate', today);
      
      // Atualizar histórico de acessos
      const history = getAccessHistory();
      const updatedHistory = [...history];
      const todayIndex = updatedHistory.findIndex(
        (record) => new Date(record.date).toDateString() === today
      );
      
      if (todayIndex !== -1) {
        updatedHistory[todayIndex].accessed = true;
        localStorage.setItem('accessHistory', JSON.stringify(updatedHistory));
      }
    }
    
    // Calcular dias consecutivos
    const consecutive = calculateConsecutiveDays();
    setConsecutiveDays(consecutive);
    setAccessHistory(getAccessHistory());
  }, [isOpen]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Verificar se é uma imagem
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem.');
        return;
      }

      // Verificar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 5MB.');
        return;
      }

      // Converter para base64 e salvar
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const updatedProfile = { ...profile, profilePhoto: base64String };
        setProfile(updatedProfile);
        setEditedProfile(updatedProfile);
        localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleSaveProfile = () => {
    localStorage.setItem('userProfile', JSON.stringify(editedProfile));
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleLogout = () => {
    // Limpar todos os dados do usuário
    localStorage.removeItem('userProfile');
    localStorage.removeItem('quizCompleted');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('hasActiveSubscription');
    
    // Recarregar a página para voltar ao estado inicial
    window.location.reload();
  };

  const getAccessHistory = (): AccessRecord[] => {
    const saved = localStorage.getItem('accessHistory');
    if (saved) {
      return JSON.parse(saved);
    }
    
    // Criar histórico inicial dos últimos 30 dias
    const history: AccessRecord[] = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      history.push({
        date: date.toISOString(),
        accessed: i === 0, // Apenas hoje está acessado inicialmente
      });
    }
    
    localStorage.setItem('accessHistory', JSON.stringify(history));
    return history;
  };

  const calculateConsecutiveDays = (): number => {
    const history = getAccessHistory();
    let consecutive = 0;
    
    // Contar de trás para frente (do mais recente para o mais antigo)
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].accessed) {
        consecutive++;
      } else {
        break;
      }
    }
    
    return consecutive;
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
    if (days >= 91) return { name: 'Eterno', daysNeeded: 121 - days };
    if (days >= 51) return { name: 'Intercessor', daysNeeded: 91 - days };
    if (days >= 30) return { name: 'Servo', daysNeeded: 51 - days };
    if (days >= 6) return { name: 'Guardião', daysNeeded: 30 - days };
    return { name: 'Discípulo', daysNeeded: 6 - days };
  };

  const totalAccessedDays = accessHistory.filter(record => record.accessed).length;
  const currentLevel = getLevelInfo(consecutiveDays);
  const nextLevel = getNextLevel(consecutiveDays);

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
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto overflow-hidden">
                    {profile.profilePhoto ? (
                      <img src={profile.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
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
                </div>
              </div>

              {!isEditing ? (
                <>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Nome</label>
                    <p className="mt-1 text-gray-900">{profile.name || 'Não informado'}</p>
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

                  {/* Botão de Sair */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Sair
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
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Sua Jornada Espiritual</h3>
                <p className="text-gray-600 text-sm">
                  Acompanhe sua frequência e conquiste novos níveis
                </p>
              </div>

              {/* Card de Nível Atual com Animação */}
              <div className={`bg-gradient-to-r ${currentLevel.color} rounded-2xl p-6 text-white shadow-lg transform transition-all duration-300 hover:scale-105`}>
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
                      <div className="flex-1 bg-white/30 rounded-full h-2">
                        <div 
                          className="bg-white rounded-full h-2 transition-all duration-500"
                          style={{ width: `${(consecutiveDays - currentLevel.min) / (nextLevel.daysNeeded) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold">{nextLevel.daysNeeded} dias</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card de Sequência Atual - AZUL COM ÍCONE DE ESTRELA */}
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 text-white text-center shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-6 h-6 animate-pulse" />
                  <p className="text-sm font-semibold">Sequência Atual</p>
                </div>
                <p className="text-5xl font-bold mb-1 animate-pulse">{consecutiveDays}</p>
                <p className="text-sm opacity-90">dias consecutivos</p>
              </div>

              {/* Cards de Estatísticas */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-xl p-4 text-center border-2 border-blue-100">
                  <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">{totalAccessedDays}</p>
                  <p className="text-xs text-gray-600">Total de Acessos</p>
                </div>
                
                <div className="bg-purple-50 rounded-xl p-4 text-center border-2 border-purple-100">
                  <Award className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-600">{Math.max(...accessHistory.map((_, i) => {
                    let count = 0;
                    for (let j = i; j < accessHistory.length && accessHistory[j].accessed; j++) {
                      count++;
                    }
                    return count;
                  }))}</p>
                  <p className="text-xs text-gray-600">Maior Sequência</p>
                </div>
              </div>

              {/* Calendário de Frequência */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Últimos 30 dias
                </p>
                <div className="grid grid-cols-7 gap-2">
                  {accessHistory.map((day, index) => {
                    const date = new Date(day.date);
                    const dayOfMonth = date.getDate();
                    const isToday = date.toDateString() === new Date().toDateString();
                    
                    return (
                      <div key={index} className="text-center">
                        <div
                          className={`w-full aspect-square rounded-lg mb-1 transition-all duration-300 flex items-center justify-center text-xs font-semibold ${
                            day.accessed
                              ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-md transform hover:scale-110'
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          } ${isToday ? 'ring-2 ring-amber-600 ring-offset-2' : ''}`}
                        >
                          {dayOfMonth}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gradient-to-br from-amber-400 to-amber-500 rounded" />
                    <span>Acessado</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gray-100 rounded" />
                    <span>Não acessado</span>
                  </div>
                </div>
              </div>

              {/* Badges de Conquistas */}
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

              {/* Mensagem Motivacional */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
                <p className="text-sm text-gray-700 text-center">
                  <span className="font-semibold">💪 Continue assim!</span>
                  <br />
                  {consecutiveDays === 0 && "Comece sua jornada hoje mesmo!"}
                  {consecutiveDays > 0 && consecutiveDays < 6 && "Você está no caminho certo!"}
                  {consecutiveDays >= 6 && consecutiveDays < 30 && "Sua dedicação está crescendo!"}
                  {consecutiveDays >= 30 && consecutiveDays < 51 && "Você é um exemplo de constância!"}
                  {consecutiveDays >= 51 && consecutiveDays < 91 && "Sua fé é inspiradora!"}
                  {consecutiveDays >= 91 && consecutiveDays < 121 && "Você alcançou um nível extraordinário!"}
                  {consecutiveDays >= 121 && "Você é uma lenda viva! 👑"}
                </p>
              </div>
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
