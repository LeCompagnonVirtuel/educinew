'use client';

import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'educi_sidebar_collapsed';
const GROUPS_KEY = 'educi_sidebar_groups';

export function useSidebarStore() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'true') setCollapsed(true);

    const savedGroups = localStorage.getItem(GROUPS_KEY);
    if (savedGroups) {
      try {
        setExpandedGroups(JSON.parse(savedGroups));
      } catch {}
    }
  }, []);

  const toggleCollapsed = useCallback(() => {
    setCollapsed(prev => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  const toggleGroup = useCallback((groupId: string) => {
    setExpandedGroups(prev => {
      const next = { ...prev, [groupId]: !prev[groupId] };
      localStorage.setItem(GROUPS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const openMobile = useCallback(() => setMobileOpen(true), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return {
    collapsed,
    mobileOpen,
    expandedGroups,
    toggleCollapsed,
    toggleGroup,
    openMobile,
    closeMobile,
  };
}
