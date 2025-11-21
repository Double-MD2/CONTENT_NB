'use client';

import { Home, BookOpen, Heart } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/home') {
      return pathname === '/home';
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-around py-3">
          <button
            onClick={() => router.push('/home')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive('/home')
                ? 'text-amber-500'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Início</span>
          </button>
          
          <button
            onClick={() => router.push('/bible')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive('/bible')
                ? 'text-blue-500'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <BookOpen className="w-6 h-6" />
            <span className="text-xs font-medium">Bíblia</span>
          </button>
          
          <button
            onClick={() => router.push('/favorites')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive('/favorites')
                ? 'text-amber-500'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Heart className="w-6 h-6" />
            <span className="text-xs font-medium">Favoritos</span>
          </button>
        </div>
      </div>
    </nav>
  );
}