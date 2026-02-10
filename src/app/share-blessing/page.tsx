'use client';

import { useState } from 'react';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Biblioteca de 10 imagens no estilo de paisagens inspiradoras
const blessingImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    alt: 'Montanhas ao amanhecer',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&h=600&fit=crop',
    alt: 'Pôr do sol dourado',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
    alt: 'Natureza serena',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop',
    alt: 'Horizonte tranquilo',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop',
    alt: 'Céu iluminado',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
    alt: 'Paisagem inspiradora',
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
    alt: 'Floresta ao entardecer',
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=600&fit=crop',
    alt: 'Montanhas majestosas',
  },
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&h=600&fit=crop',
    alt: 'Céu colorido',
  },
  {
    id: 10,
    url: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=800&h=600&fit=crop',
    alt: 'Paisagem celestial',
  },
];

export default function ShareBlessingPage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(blessingImages[0]);
  const [blessingText, setBlessingText] = useState('');

  const handleShare = () => {
    // Lógica de compartilhamento
    if (navigator.share) {
      navigator.share({
        title: 'Bênção do Dia',
        text: blessingText,
      }).catch(() => {});
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Compartilhar Bênção</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Preview da Imagem Selecionada */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="relative">
            <img
              src={selectedImage.url}
              alt={selectedImage.alt}
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            
            {/* Texto da Bênção Sobreposto */}
            {blessingText && (
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg font-serif">
                    Bênção do Dia
                  </h2>
                  <p className="text-lg md:text-xl text-white drop-shadow-lg leading-relaxed max-w-2xl">
                    {blessingText}
                  </p>
                  <div className="mt-6 text-white/90 text-sm drop-shadow-lg">
                    ✨ Compartilhe essa bênção ✨
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Biblioteca de Imagens */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Escolha uma imagem de fundo
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {blessingImages.map((image) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className={`relative aspect-square rounded-lg overflow-hidden transition-all hover:scale-105 ${
                  selectedImage.id === image.id
                    ? 'ring-4 ring-amber-400 shadow-lg'
                    : 'ring-2 ring-gray-200'
                }`}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                {selectedImage.id === image.id && (
                  <div className="absolute inset-0 bg-amber-400/20 flex items-center justify-center">
                    <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Caixa de Texto para Bênção */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <label className="block text-lg font-semibold text-gray-800 mb-3">
            Digite sua bênção
          </label>
          <textarea
            value={blessingText}
            onChange={(e) => setBlessingText(e.target.value)}
            placeholder="Escreva aqui a bênção que deseja compartilhar com alguém especial..."
            className="w-full h-40 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all resize-none text-gray-700 placeholder:text-gray-400"
            maxLength={300}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              {blessingText.length}/300 caracteres
            </span>
            {blessingText.length > 0 && (
              <span className="text-sm text-green-600 font-medium">
                ✓ Pronto para compartilhar
              </span>
            )}
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-3">
          <button
            onClick={handleShare}
            disabled={!blessingText}
            className="flex-1 bg-gradient-to-r from-amber-400 to-amber-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-amber-500 hover:to-amber-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Share2 className="w-5 h-5" />
            Compartilhar Bênção
          </button>
          <button
            disabled={!blessingText}
            className="px-6 py-4 bg-green-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>

        {/* Dica */}
        <div className="mt-6 bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="text-sm text-gray-700 text-center">
            💡 <span className="font-semibold">Dica:</span> Escolha uma imagem que transmita paz e esperança, 
            e escreva uma mensagem que toque o coração de quem receber.
          </p>
        </div>
      </div>
    </div>
  );
}
