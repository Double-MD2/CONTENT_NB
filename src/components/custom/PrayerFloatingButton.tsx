'use client';

import { useRouter } from 'next/navigation';
import { PenLine } from 'lucide-react';

export default function PrayerFloatingButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/prayer-note')}
      className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110 flex items-center justify-center group"
      aria-label="Abrir nota de oração"
    >
      <PenLine className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Nota de Oração
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
      </div>
    </button>
  );
}
