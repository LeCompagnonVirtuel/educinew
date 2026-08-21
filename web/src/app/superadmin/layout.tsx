'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import {
  LayoutDashboard, Building2, CreditCard, Server, ScrollText,
  Puzzle, Shield, Settings, Bell, LogOut, Zap, Gauge,
} from 'lucide-react';
import { useEffect } from 'react';

const NAV_ITEMS = [
  { href: '/superadmin', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/superadmin/schools', label: 'Établissements', icon: Building2 },
  { href: '/superadmin/subscriptions', label: 'Abonnements', icon: CreditCard },
  { href: '/superadmin/monitoring', label: 'Monitoring', icon: Gauge },
  { href: '/superadmin/logs', label: 'Journal technique', icon: ScrollText },
  { href: '/superadmin/modules', label: 'Modules', icon: Puzzle },
  { href: '/superadmin/security', label: 'Sécurité', icon: Shield },
  { href: '/superadmin/config', label: 'Configuration', icon: Settings },
];

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user && user.role !== 'SUPER_ADMIN') {
      router.replace('/login');
    }
  }, [user, router]);

  if (!user || user.role !== 'SUPER_ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin w-8 h-8 border-2 border-[#4F46E5] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f0d2e] text-white flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#4F46E5] flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold">EduCI Platform</h1>
              <p className="text-[10px] text-white/50">Super Administration</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/superadmin' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-[#4F46E5] text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#4F46E5] flex items-center justify-center text-xs font-bold">
              {user.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2) || 'SA'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{user.name || 'Super Admin'}</p>
              <p className="text-[10px] text-white/40 truncate">{user.email}</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-2 w-full px-3 py-2 text-xs text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <LogOut size={14} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64 p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
