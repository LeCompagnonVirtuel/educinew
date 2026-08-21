'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavItemComponent } from './NavItem';

interface NavGroupProps {
  group: {
    id: string;
    label: string;
    items: Array<{
      id: string;
      href: string;
      label: string;
      icon: React.ReactNode | import('lucide-react').LucideIcon;
      badge?: string | number;
      onClick?: () => void;
    }>;
  };
  collapsed: boolean;
  expanded: boolean;
  onToggle: () => void;
  onItemClick?: () => void;
}

export const NavGroupComponent = ({ group, collapsed, expanded, onToggle }: NavGroupProps) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  if (collapsed) return null;

  return (
    <div className="space-y-0.5 mb-2">
      <button
        onClick={onToggle}
        className={cn(
          'w-full flex items-center gap-2 px-3 py-2 rounded-md text-caption font-semibold uppercase tracking-wider transition-colors',
          'text-foreground-muted dark:text-[var(--color-text-muted)] hover:text-foreground-secondary dark:hover:text-[var(--color-text-secondary)]'
        )}
        aria-expanded={isExpanded}
      >
        <span className="flex-1 truncate text-left">{group.label}</span>
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.15 }}
          className="flex-shrink-0"
        >
          <ChevronRight size={14} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden space-y-0.5"
          >
            {group.items.map(item => (
              <NavItemComponent
                key={item.id}
                href={item.href}
                label={item.label}
                icon={item.icon}
                badge={item.badge}
                onClick={item.onClick}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
