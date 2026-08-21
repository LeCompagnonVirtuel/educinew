'use client';

import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  children?: (activeTab: string) => React.ReactNode;
  className?: string;
}

export default function Tabs({ tabs, defaultTab, onChange, children, className = '' }: TabsProps) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id);

  const handleChange = (tabId: string) => {
    setActive(tabId);
    onChange?.(tabId);
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-1 border-b border-border dark:border-[var(--color-border)] overflow-x-auto scrollbar-none" role="tablist">
        {tabs.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => handleChange(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-2.5 text-body-sm font-medium whitespace-nowrap transition-colors rounded-t-md ${
              active === tab.id
                ? 'text-primary'
                : 'text-foreground-secondary hover:text-foreground dark:text-[var(--color-text-secondary)] dark:hover:text-[var(--color-text-primary)]'
            }`}
          >
            {tab.icon}
            {tab.label}
            {tab.badge !== undefined && (
              <span className={`px-1.5 py-0.5 text-[10px] font-semibold rounded-md ${
                active === tab.id
                  ? 'bg-primary-50 text-primary dark:bg-primary-500/10'
                  : 'bg-surface-muted text-foreground-muted dark:bg-[var(--color-surface-muted)]'
              }`}>
                {tab.badge}
              </span>
            )}
            {active === tab.id && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>
      {children && (
        <div className="pt-4" role="tabpanel">
          {children(active)}
        </div>
      )}
    </div>
  );
}
