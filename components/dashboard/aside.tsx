'use client';

import { Home, Layers, Code, LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { NavItem } from './nav-item';
import { useAuth } from '@/hooks';

export const Aside = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { signOut } = useAuth();

  const handleLogOut = () => {
    signOut();
    router.push('/');
  };

  return (
    <aside className="w-64 border-r h-screen sticky top-0 left-0 bg-gray-950/80 border-gray-200 p-6 hidden md:flex flex-col">
      <a href="/" className="flex items-center gap-2 group mb-10">
        <div className="w-6 h-6 rounded bg-linear-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold tracking-tighter shadow-[0_0_15px_rgba(34,211,238,0.5)]">
          T
        </div>
        <span className="text-white font-semibold tracking-tight text-sm group-hover:text-cyan-400 transition-colors">
          TourBridgeJS
        </span>
      </a>

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
          active={pathname.startsWith('/docs')}
          page_link="/docs"
        />
      </nav>

      <div
        className="pt-6 mt-auto space-y-1 border-t border-gray-200 text-sm"
        onClick={() => handleLogOut()}
      >
        <NavItem icon={LogOut} label="Logout" page_link="/logout" />
      </div>
    </aside>
  );
};
