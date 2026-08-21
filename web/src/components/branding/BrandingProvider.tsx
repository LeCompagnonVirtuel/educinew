'use client';

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import type { SchoolBranding } from '@/types/branding';
import { DEFAULT_BRANDING } from '@/types/branding';
import { sbBranding } from '@/lib/api/domains/branding.service';
import { useAuth } from '@/hooks/useAuth';
import { hexToRgb as hexToRgbTuple } from '@/lib/export-utils';

interface BrandingContextType {
  branding: SchoolBranding | null;
  loading: boolean;
  updateBranding: (data: Partial<SchoolBranding>) => Promise<void>;
  refreshBranding: () => Promise<void>;
}

const BrandingContext = createContext<BrandingContextType>({
  branding: null,
  loading: true,
  updateBranding: async () => {},
  refreshBranding: async () => {},
});

export function useBranding() {
  return useContext(BrandingContext);
}

function hexToRgb(hex: string): string {
  const [r, g, b] = hexToRgbTuple(hex);
  return `${r} ${g} ${b}`;
}

function generateCssVariables(b: SchoolBranding): string {
  const vars: string[] = [];

  // Primary palette
  vars.push(`--color-primary: ${b.color_primary}`);
  vars.push(`--color-secondary: ${b.color_secondary}`);
  vars.push(`--color-accent: ${b.color_accent}`);
  vars.push(`--color-success: ${b.color_success}`);
  vars.push(`--color-error: ${b.color_error}`);
  vars.push(`--color-warning: ${b.color_warning}`);
  vars.push(`--color-info: ${b.color_info}`);

  // RGB versions for opacity
  vars.push(`--color-primary-rgb: ${hexToRgb(b.color_primary)}`);
  vars.push(`--color-secondary-rgb: ${hexToRgb(b.color_secondary)}`);
  vars.push(`--color-accent-rgb: ${hexToRgb(b.color_accent)}`);

  // UI colors
  vars.push(`--color-button: ${b.color_button}`);
  vars.push(`--color-button-text: ${b.color_button_text}`);
  vars.push(`--color-link: ${b.color_link}`);
  vars.push(`--color-card-bg: ${b.color_card_bg}`);
  vars.push(`--color-card-border: ${b.color_card_border}`);
  vars.push(`--color-menu-bg: ${b.color_menu_bg}`);
  vars.push(`--color-menu-text: ${b.color_menu_text}`);
  vars.push(`--color-menu-active: ${b.color_menu_active}`);
  vars.push(`--color-title: ${b.color_title}`);
  vars.push(`--color-text: ${b.color_text}`);
  vars.push(`--color-text-muted: ${b.color_text_muted}`);
  vars.push(`--color-icon: ${b.color_icon}`);

  // Charts
  vars.push(`--color-chart-1: ${b.color_chart_1}`);
  vars.push(`--color-chart-2: ${b.color_chart_2}`);
  vars.push(`--color-chart-3: ${b.color_chart_3}`);
  vars.push(`--color-chart-4: ${b.color_chart_4}`);
  vars.push(`--color-chart-5: ${b.color_chart_5}`);

  // Dashboard
  vars.push(`--color-dashboard-bg: ${b.color_dashboard_bg}`);
  vars.push(`--color-dashboard-card: ${b.color_dashboard_card}`);

  // Table
  vars.push(`--color-table-header: ${b.color_table_header}`);
  vars.push(`--color-table-row-hover: ${b.color_table_row_hover}`);
  vars.push(`--color-table-border: ${b.color_table_border}`);

  // Badges
  vars.push(`--color-badge-success-bg: ${b.color_badge_success_bg}`);
  vars.push(`--color-badge-success-text: ${b.color_badge_success_text}`);
  vars.push(`--color-badge-error-bg: ${b.color_badge_error_bg}`);
  vars.push(`--color-badge-error-text: ${b.color_badge_error_text}`);
  vars.push(`--color-badge-warning-bg: ${b.color_badge_warning_bg}`);
  vars.push(`--color-badge-warning-text: ${b.color_badge_warning_text}`);
  vars.push(`--color-badge-info-bg: ${b.color_badge_info_bg}`);
  vars.push(`--color-badge-info-text: ${b.color_badge_info_text}`);

  // Notifications
  vars.push(`--color-notification-bg: ${b.color_notification_bg}`);
  vars.push(`--color-notification-border: ${b.color_notification_border}`);

  // Typography
  vars.push(`--font-primary: '${b.font_primary}', 'Inter', system-ui, sans-serif`);
  vars.push(`--font-secondary: '${b.font_secondary}', 'Inter', system-ui, sans-serif`);
  vars.push(`--font-weight: ${b.font_weight}`);
  vars.push(`--font-size-base: ${b.font_size_base}`);
  vars.push(`--font-size-small: ${b.font_size_small || '14px'}`);
  vars.push(`--font-size-large: ${b.font_size_large || '18px'}`);
  vars.push(`--font-size-title: ${b.font_size_title || '24px'}`);
  vars.push(`--font-size-heading: ${b.font_size_heading || '20px'}`);
  vars.push(`--font-line-height: ${b.font_line_height}`);
  vars.push(`--font-heading-weight: ${b.font_heading_weight}`);

  return vars.join(';\n  ');
}

function generateDarkModeVariables(b: SchoolBranding): string {
  if (!b.dark_mode_enabled) return '';
  const vars: string[] = [];
  vars.push(`--dark-bg: ${b.dark_bg}`);
  vars.push(`--dark-surface: ${b.dark_surface}`);
  vars.push(`--dark-card: ${b.dark_card}`);
  vars.push(`--dark-text: ${b.dark_text}`);
  vars.push(`--dark-text-muted: ${b.dark_text_muted}`);
  vars.push(`--dark-border: ${b.dark_border}`);
  vars.push(`--dark-menu-bg: ${b.dark_menu_bg}`);
  vars.push(`--dark-menu-text: ${b.dark_menu_text}`);
  return vars.join(';\n  ');
}

export function BrandingProvider({ children }: { children: React.ReactNode }) {
  const authCtx = useAuth();
  const user = authCtx?.user ?? null;
  const [branding, setBranding] = useState<SchoolBranding | null>(null);
  const [loading, setLoading] = useState(true);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  const applyBranding = useCallback((b: SchoolBranding) => {
    try {
      const cssVars = generateCssVariables(b);
      const darkVars = generateDarkModeVariables(b);

      if (typeof document === 'undefined') return;

      if (!styleRef.current) {
        styleRef.current = document.createElement('style');
        styleRef.current.id = 'school-branding';
        document.head.appendChild(styleRef.current);
      }

      styleRef.current.textContent = `
        :root {
          ${cssVars};
        }
        .dark {
          ${darkVars}
        }
        body {
          font-family: var(--font-primary), 'Inter', system-ui, sans-serif;
          font-size: var(--font-size-base);
          font-weight: var(--font-weight);
          line-height: var(--font-line-height);
          color: var(--color-text);
        }
        h1, h2, h3, h4, h5, h6 {
          font-family: var(--font-secondary), 'Inter', system-ui, sans-serif;
          font-weight: var(--font-heading-weight);
          color: var(--color-title);
        }
        h1 { font-size: var(--font-size-title); }
        h2, h3 { font-size: var(--font-size-heading); }
        small, .text-sm { font-size: var(--font-size-small); }
        .text-lg { font-size: var(--font-size-large); }
        a { color: var(--color-link); }
      `;

      // Load primary font
      const existingLink = document.getElementById('edu-font-link');
      if (existingLink) existingLink.remove();
      const fontsToLoad = [b.font_primary, b.font_secondary].filter(f => f && f !== 'Inter');
      if (fontsToLoad.length > 0) {
        const link = document.createElement('link');
        link.id = 'edu-font-link';
        link.rel = 'stylesheet';
        const families = fontsToLoad.map(f => `family=${encodeURIComponent(f!)}:wght@300;400;500;600;700`).join('&');
        link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
        document.head.appendChild(link);
      }
    } catch (err) {
      console.error('[BrandingProvider]', err);
    }
  }, []);

  const loadBranding = useCallback(async () => {
    if (!user?.schoolId) {
      setLoading(false);
      return;
    }
    try {
      const data = await sbBranding.get(user.schoolId);
      setBranding(data);
      if (data) applyBranding(data);
    } catch (err) {
      console.error('[BrandingProvider]', err);
    } finally {
      setLoading(false);
    }
  }, [user?.schoolId, applyBranding]);

  useEffect(() => {
    loadBranding();
  }, [loadBranding]);

  // Subscribe to realtime changes
  useEffect(() => {
    if (!user?.schoolId) return;

    const unsubscribe = sbBranding.subscribe(user.schoolId, (updated) => {
      setBranding(updated);
      applyBranding(updated);
    });

    return unsubscribe;
  }, [user?.schoolId, applyBranding]);

  const updateBranding = async (data: Partial<SchoolBranding>) => {
    if (!user?.schoolId) return;
    const updated = await sbBranding.update(user.schoolId, data);
    if (updated) {
      setBranding(updated);
      applyBranding(updated);
    }
  };

  return (
    <BrandingContext.Provider value={{ branding, loading, updateBranding, refreshBranding: loadBranding }}>
      {children}
    </BrandingContext.Provider>
  );
}
