'use client';

import { Home, Layers, BarChart3, Code, Cog, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { NavItem } from './nav-item';

export const Aside = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r h-screen sticky top-0 left-0 border-gray-200 p-6 hidden md:flex flex-col">
      <h1 className="text-2xl font-bold tracking-tight mb-10">TourBridge</h1>

      <nav className="flex-1 space-y-1 text-sm">
        <NavItem
          icon={Home}
          label="Dashboard"
          active={pathname === '/dashboard'}
          page_link="/dashboard"
        />
        <NavItem
          icon={Layers}
          label="Tours"
          active={pathname.startsWith('/dashboard/tours')}
          page_link="/dashboard/tours"
        />
        <NavItem
          icon={Code}
          label="Integrations"
          active={pathname.startsWith('/documentation')}
          page_link="/documentation"
        />
      </nav>

      <div className="pt-6 mt-auto space-y-1 border-t border-gray-200 text-sm">
        <NavItem icon={LogOut} label="Logout" page_link="/logout" />
      </div>
    </aside>
  );
};
