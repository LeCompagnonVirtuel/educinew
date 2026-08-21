'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { PanelLeftClose, PanelLeft, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useSchool } from '@/hooks/useSchool';
import { useBranding } from '@/components/branding/BrandingProvider';
import { navigationConfigs } from '@/lib/navigation/config';
import type { RoleKey } from '@/lib/navigation/types';
import { NavGroupComponent } from './NavGroup';
import { NavItemComponent } from './NavItem';
import { getInitials } from '@/lib/utils';
import { ROLE_LABELS } from '@/lib/roles';
import EduCILogo from '@/components/brand/EduCILogo';

interface AppSidebarProps {
  role: RoleKey;
  collapsed: boolean;
  expandedGroups: Record<string, boolean>;
  onToggleCollapsed: () => void;
  onToggleGroup: (groupId: string) => void;
}

export default function AppSidebar({
  role,
  collapsed,
  expandedGroups,
  onToggleCollapsed,
  onToggleGroup,
}: AppSidebarProps) {
  const { user, logout } = useAuth();
  const { school } = useSchool();
  const { branding } = useBranding();

  const config = useMemo(() => navigationConfigs[role], [role]);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 272 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="hidden lg:flex flex-col h-screen sticky top-0 bg-surface-bright dark:bg-[var(--color-surface)] border-r border-border dark:border-[var(--color-border)] z-40 overflow-hidden"
    >
      {/* Logo & School Name */}
      <div className={`flex items-center h-14 border-b border-border/50 dark:border-[var(--color-border)]/50 flex-shrink-0 ${collapsed ? 'justify-center px-2' : 'px-5'}`}>
        {collapsed ? (
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">E</span>
          </div>
        ) : branding?.logo_url ? (
          <div className="flex items-center gap-3 min-w-0">
            <Image
              src={branding.logo_url}
              alt={school?.name || branding.commercial_name || 'EduCI'}
              width={36}
              height={36}
              unoptimized
              className="h-9 w-auto object-contain flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-body-sm font-bold text-foreground dark:text-[var(--color-text-primary)] truncate">{school?.name || branding.commercial_name || 'EduCI'}</p>
              {school?.slogan && (
                <p className="text-[10px] text-foreground-muted dark:text-[var(--color-text-muted)] truncate">{school.slogan}</p>
              )}
            </div>
          </div>
        ) : school?.name ? (
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-white font-bold text-sm">{school.name.charAt(0)}</span>
            </div>
            <div className="min-w-0">
              <p className="text-body-sm font-bold text-foreground dark:text-[var(--color-text-primary)] truncate">{school.name}</p>
              {school.slogan && (
                <p className="text-[10px] text-foreground-muted dark:text-[var(--color-text-muted)] truncate">{school.slogan}</p>
              )}
            </div>
          </div>
        ) : (
          <EduCILogo size="sm" />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin px-3 py-3">
        {collapsed && (
          <div className="space-y-0.5">
            {config.groups.flatMap(g => g.items).map(item => (
              <NavItemComponent key={item.id} href={item.href} label={item.label} icon={item.icon} badge={item.badge} />
            ))}
          </div>
        )}

        {!collapsed && config.groups.map(group => (
          <NavGroupComponent
            key={group.id}
            group={group}
            collapsed={false}
            expanded={expandedGroups[group.id] !== false}
            onToggle={() => onToggleGroup(group.id)}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className={`flex-shrink-0 border-t border-border/50 dark:border-[var(--color-border)]/50 ${collapsed ? 'p-2' : 'p-3'}`}>
        {!collapsed && (
          <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 mb-2 rounded-lg bg-surface-muted/60 dark:bg-[var(--color-surface-muted)]/60 hover:bg-surface-muted dark:hover:bg-[var(--color-surface-muted)] transition-colors cursor-pointer group">
            {user?.photoUrl ? (
              <Image
                src={user.photoUrl}
                alt={user.name || 'User'}
                width={36}
                height={36}
                unoptimized
                className="w-9 h-9 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                {getInitials(user?.name || 'U')}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-body-sm font-medium text-foreground dark:text-[var(--color-text-primary)] truncate">{user?.name || 'Utilisateur'}</p>
              <p className="text-[11px] text-foreground-secondary dark:text-[var(--color-text-secondary)] truncate">{ROLE_LABELS[user?.role || ''] || user?.role}</p>
            </div>
          </Link>
        )}

        <button
          onClick={logout}
          className={`flex items-center gap-2 rounded-lg text-foreground-secondary dark:text-[var(--color-text-secondary)] hover:text-danger hover:bg-danger-50 dark:hover:bg-danger-500/10 transition-colors ${
            collapsed ? 'w-full justify-center p-2.5' : 'w-full px-3 py-2.5'
          }`}
          title="Deconnexion"
        >
          <LogOut size={18} />
          {!collapsed && <span className="text-xs font-medium">Deconnexion</span>}
        </button>

        <button
          onClick={onToggleCollapsed}
          className={`flex items-center gap-2 rounded-lg text-foreground-secondary dark:text-[var(--color-text-secondary)] hover:text-foreground dark:hover:text-[var(--color-text-primary)] hover:bg-surface-muted dark:hover:bg-[var(--color-surface-muted)] transition-colors ${
            collapsed ? 'w-full justify-center p-2.5' : 'w-full px-3 py-2.5'
          }`}
          title={collapsed ? 'Developper' : 'Reduire'}
        >
          {collapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
          {!collapsed && <span className="text-xs font-medium">Reduire</span>}
        </button>
      </div>
    </motion.aside>
  );
}
