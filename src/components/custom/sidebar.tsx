'use client';

import { useState, useEffect } from 'react';
import { X, User, Camera, Heart, DollarSign, Calendar, Edit2, ShoppingCart } from 'lucide-react';
import { UserProfile } from '@/lib/types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTabUse: string;
}

export default function Sidebar({ isOpen, onClose, activeTabUse }: SidebarProps) {
  const [activeTab, setActiveTab] = useState(activeTabUse);
  const [profile, setProfile] = useState<Partial<UserProfile>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfile>>({});

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      const parsed = JSON.parse(saved);
      setProfile(parsed);
      setEditedProfile(parsed);
      setActiveTab(activeTabUse);
    }
  }, [isOpen]);

  const handleSaveProfile = () => {
    localStorage.setItem('userProfile', JSON.stringify(editedProfile));
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const getFrequencyData = () => {
    const days = 30;
    const data = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        accessed: Math.random() > 0.3, // Simulação
      });
    }
    return data;
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
                  <button className="absolute bottom-0 right-0 p-2 bg-amber-400 text-white rounded-full hover:bg-amber-500 transition-colors">
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
                      <p className="font-semibold text-gray-800">Doação Única</p>
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
                      <p className="font-semibold text-gray-800">Doação Mensal</p>
                      <p className="text-sm text-gray-600">Apoie mensalmente o projeto</p>
                    </div>
                  </div>
                </button>
              </div>

              <div className="bg-amber-50 rounded-xl p-4 mt-6">
                <p className="text-sm text-gray-700 font-semibold mb-2">Causas Apoiadas:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Distribuição de Bíblias</li>
                  <li>• Apoio a comunidades carentes</li>
                  <li>• Projetos missionários</li>
                  <li>• Educação religiosa</li>
                </ul>
              </div>
            </div>
          )}

          {/* Frequency Tab */}
          {activeTab === 'frequency' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Sua Frequência</h3>
                <p className="text-gray-600 text-sm">
                  Acompanhe sua jornada espiritual diária
                </p>
              </div>

              <div className="bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl p-6 text-white text-center">
                <p className="text-sm opacity-90 mb-1">Sequência Atual</p>
                <p className="text-4xl font-bold mb-1">7</p>
                <p className="text-sm opacity-90">dias consecutivos 🔥</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">Últimos 30 dias</p>
                <div className="grid grid-cols-7 gap-2">
                  {getFrequencyData().map((day, index) => (
                    <div key={index} className="text-center">
                      <div
                        className={`w-full aspect-square rounded-lg mb-1 ${
                          day.accessed
                            ? 'bg-amber-400'
                            : 'bg-gray-200'
                        }`}
                      />
                      <p className="text-xs text-gray-500">{day.date}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-gray-800 mb-2">Estatísticas</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Total de acessos:</span>
                    <span className="font-semibold">23 dias</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maior sequência:</span>
                    <span className="font-semibold">12 dias</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conteúdos completos:</span>
                    <span className="font-semibold">45</span>
                  </div>
                </div>
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
