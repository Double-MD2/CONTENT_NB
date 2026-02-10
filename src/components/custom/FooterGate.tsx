'use client';

import { useSidebar } from '@/contexts/SidebarContext';
import BottomNav from './BottomNav';

export default function FooterGate() {
  const { isSidebarOpen } = useSidebar();

  // Se a sidebar estiver aberta, não renderiza o Footer
  if (isSidebarOpen) {
    return null;
  }

  // Caso contrário, renderiza o Footer normalmente
  return <BottomNav />;
}
