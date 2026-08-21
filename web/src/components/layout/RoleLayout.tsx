'use client';

import type { RoleKey } from '@/lib/navigation/types';
import { useState } from 'react';
import AppSidebar from './AppSidebar';
import AppTopBar from './AppTopBar';
import MobileDrawer from './MobileDrawer';
import BottomNav from './BottomNav';

export type RoleType = RoleKey;

interface RoleLayoutProps {
  children: React.ReactNode;
  role: RoleType;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function RoleLayout({ children, role, breadcrumbs }: RoleLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  return (
    <div className="min-h-screen bg-background dark:bg-[var(--color-background)]">
      <div className="flex">
        <AppSidebar
          role={role}
          collapsed={collapsed}
          expandedGroups={expandedGroups}
          onToggleCollapsed={() => setCollapsed(!collapsed)}
          onToggleGroup={(groupId) => setExpandedGroups(prev => ({ ...prev, [groupId]: prev[groupId] === false ? true : !prev[groupId] }))}
        />
        <div className="flex-1 flex flex-col min-h-screen min-w-0">
          <AppTopBar breadcrumbs={breadcrumbs} onMenuClick={() => setMobileOpen(true)} />
          <main className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6">
            {children}
          </main>
        </div>
      </div>
      <BottomNav homeHref={`/${role.toLowerCase().replace('_', '-')}`} onMoreClick={() => setMobileOpen(true)} />
      <MobileDrawer
        role={role}
        open={mobileOpen}
        expandedGroups={expandedGroups}
        onClose={() => setMobileOpen(false)}
        onToggleGroup={(groupId) => setExpandedGroups(prev => ({ ...prev, [groupId]: prev[groupId] === false ? true : !prev[groupId] }))}
      />
    </div>
  );
}
