'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut } from 'lucide-react';
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
import EduCILogo from '@/components/brand/EduCILogo';

const roleLabels: Record<string, string> = {
  SUPER_ADMIN: 'Super Administrateur',
  ADMIN: 'Administrateur',
  TEACHER: 'Enseignant',
  PARENT: 'Parent',
  STUDENT: 'Eleve',
  COMPTABLE: 'Comptable',
  SECRETAIRE: 'Secretaire',
  CENSEUR: 'Censeur',
  SURVEILLANT: 'Surveillant',
  CHAUFFEUR: 'Conducteur',
};

interface MobileDrawerProps {
  role: RoleKey;
  open: boolean;
  expandedGroups: Record<string, boolean>;
  onClose: () => void;
  onToggleGroup: (groupId: string) => void;
}

export default function MobileDrawer({
  role,
  open,
  expandedGroups,
  onClose,
  onToggleGroup,
}: MobileDrawerProps) {
  const { user, logout } = useAuth();
  const { school } = useSchool();
  const { branding } = useBranding();
  const config = navigationConfigs[role];

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-foreground/40 dark:bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80 || info.velocity.x < -300) {
                onClose();
              }
            }}
            className="fixed inset-y-0 left-0 z-50 w-[280px] bg-surface-bright dark:bg-[var(--color-surface)] flex flex-col shadow-xl border-r border-border dark:border-[var(--color-border)] lg:hidden"
          >
            <div className="flex items-center justify-between h-14 px-4 border-b border-border/50 dark:border-[var(--color-border)]/50 flex-shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                {branding?.logo_url ? (
                  <Image
                    src={branding.logo_url}
                    alt={school?.name || branding.commercial_name || 'EduCI'}
                    width={32}
                    height={32}
                    unoptimized
                    className="h-8 w-auto object-contain flex-shrink-0"
                  />
                ) : school?.name ? (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{school.name.charAt(0)}</span>
                  </div>
                ) : (
                  <EduCILogo size="sm" />
                )}
                <div className="min-w-0">
                  <p className="text-body-sm font-bold text-foreground dark:text-[var(--color-text-primary)] truncate">{school?.name || 'EduCI'}</p>
                  {school?.slogan && (
                    <p className="text-[10px] text-foreground-muted dark:text-[var(--color-text-muted)] truncate">{school.slogan}</p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-md text-foreground-secondary hover:bg-surface-muted dark:hover:bg-[var(--color-surface-muted)] transition-colors"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-3">
              {config.groups.map(group => (
                <NavGroupComponent
                  key={group.id}
                  group={group}
                  collapsed={false}
                  expanded={expandedGroups[group.id] !== false}
                  onToggle={() => onToggleGroup(group.id)}
                  onItemClick={onClose}
                />
              ))}
            </nav>

            <div className="flex-shrink-0 p-3 border-t border-border/50 dark:border-[var(--color-border)]/50">
              <Link href="/profile" onClick={onClose} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface-muted/60 dark:bg-[var(--color-surface-muted)]/60 hover:bg-surface-muted dark:hover:bg-[var(--color-surface-muted)] transition-colors">
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
                  <p className="text-[11px] text-foreground-secondary dark:text-[var(--color-text-secondary)] truncate">{roleLabels[user?.role || ''] || user?.role}</p>
                </div>
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-2 w-full px-3 py-2.5 mt-1 rounded-md text-foreground-secondary dark:text-[var(--color-text-secondary)] hover:text-danger hover:bg-danger-50 dark:hover:bg-danger-500/10 transition-colors"
                title="Deconnexion"
              >
                <LogOut size={18} />
                <span className="text-xs font-medium">Deconnexion</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
