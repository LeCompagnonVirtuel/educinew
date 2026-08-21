export interface SchoolBranding {
  id: string;
  school_id: string;

  // Identity
  official_name: string | null;
  commercial_name: string | null;
  slogan: string | null;
  motto: string | null;
  description: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  social_media: Record<string, string>;

  // Logo
  logo_url: string | null;
  logo_icon_url: string | null;
  logo_favicon_url: string | null;
  logo_dark_url: string | null;
  logo_width: number | null;
  logo_height: number | null;

  // Colors
  color_primary: string;
  color_secondary: string;
  color_accent: string;
  color_success: string;
  color_error: string;
  color_warning: string;
  color_info: string;

  // UI Colors
  color_button: string;
  color_button_text: string;
  color_link: string;
  color_card_bg: string;
  color_card_border: string;
  color_menu_bg: string;
  color_menu_text: string;
  color_menu_active: string;
  color_title: string;
  color_text: string;
  color_text_muted: string;
  color_icon: string;
  color_chart_1: string;
  color_chart_2: string;
  color_chart_3: string;
  color_chart_4: string;
  color_chart_5: string;
  color_dashboard_bg: string;
  color_dashboard_card: string;
  color_table_header: string;
  color_table_row_hover: string;
  color_table_border: string;
  color_badge_success_bg: string;
  color_badge_success_text: string;
  color_badge_error_bg: string;
  color_badge_error_text: string;
  color_badge_warning_bg: string;
  color_badge_warning_text: string;
  color_badge_info_bg: string;
  color_badge_info_text: string;
  color_notification_bg: string;
  color_notification_border: string;

  // Dark mode
  dark_mode_enabled: boolean;
  dark_bg: string;
  dark_surface: string;
  dark_card: string;
  dark_text: string;
  dark_text_muted: string;
  dark_border: string;
  dark_menu_bg: string;
  dark_menu_text: string;

  // Typography
  font_primary: string;
  font_secondary: string;
  font_weight: string;
  font_style: string;
  font_size_base: string;
  font_size_small: string;
  font_size_large: string;
  font_size_title: string;
  font_size_heading: string;
  font_line_height: string;
  font_heading_weight: string;

  // Signature
  director_name: string | null;
  director_title: string | null;
  signature_url: string | null;
  stamp_url: string | null;
  document_footer: string | null;

  // Auto-use
  school_address: string | null;
  school_city: string | null;
  school_country: string | null;
  school_phone: string | null;
  school_email: string | null;
  school_website: string | null;
  school_social_media: Record<string, string>;

  // Meta
  is_published: boolean;
  setup_completed: boolean;
  setup_step: number;
  created_at: string;
  updated_at: string;
}

export type BrandingStep = 'identity' | 'logo' | 'colors' | 'theme' | 'typography' | 'signature' | 'preview';

export interface BrandingColorPalette {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    error: string;
    warning: string;
    info: string;
  };
}

export const BRANDING_COLOR_PRESETS: BrandingColorPalette[] = [
  {
    name: 'Indigo Classique',
    colors: { primary: '#4F46E5', secondary: '#10B981', accent: '#F59E0B', success: '#10B981', error: '#EF4444', warning: '#F59E0B', info: '#3B82F6' },
  },
  {
    name: 'Bleu Scolaire',
    colors: { primary: '#1B4D8E', secondary: '#4CAF50', accent: '#FF9800', success: '#4CAF50', error: '#F44336', warning: '#FF9800', info: '#2196F3' },
  },
  {
    name: 'Vert Nature',
    colors: { primary: '#059669', secondary: '#6366F1', accent: '#EC4899', success: '#059669', error: '#DC2626', warning: '#D97706', info: '#0891B2' },
  },
  {
    name: 'Royer Violet',
    colors: { primary: '#7C3AED', secondary: '#F59E0B', accent: '#EF4444', success: '#10B981', error: '#EF4444', warning: '#F59E0B', info: '#8B5CF6' },
  },
  {
    name: 'Rouge Passion',
    colors: { primary: '#DC2626', secondary: '#1E40AF', accent: '#F59E0B', success: '#16A34A', error: '#DC2626', warning: '#EA580C', info: '#2563EB' },
  },
  {
    name: 'Ocean Bleu',
    colors: { primary: '#0284C7', secondary: '#059669', accent: '#D97706', success: '#059669', error: '#E11D48', warning: '#D97706', info: '#0EA5E9' },
  },
];

export const DEFAULT_BRANDING: Partial<SchoolBranding> = {
  color_primary: '#4F46E5',
  color_secondary: '#10B981',
  color_accent: '#F59E0B',
  color_success: '#10B981',
  color_error: '#EF4444',
  color_warning: '#F59E0B',
  color_info: '#3B82F6',
  color_button: '#4F46E5',
  color_button_text: '#FFFFFF',
  color_link: '#4F46E5',
  color_card_bg: '#FFFFFF',
  color_card_border: '#E5E7EB',
  color_menu_bg: '#FFFFFF',
  color_menu_text: '#1F2937',
  color_menu_active: '#4F46E5',
  color_title: '#111827',
  color_text: '#374151',
  color_text_muted: '#6B7280',
  color_icon: '#6B7280',
  color_chart_1: '#4F46E5',
  color_chart_2: '#10B981',
  color_chart_3: '#F59E0B',
  color_chart_4: '#EF4444',
  color_chart_5: '#8B5CF6',
  color_dashboard_bg: '#F9FAFB',
  color_dashboard_card: '#FFFFFF',
  color_table_header: '#F9FAFB',
  color_table_row_hover: '#F3F4F6',
  color_table_border: '#E5E7EB',
  dark_mode_enabled: true,
  dark_bg: '#0F172A',
  dark_surface: '#1E293B',
  dark_card: '#1E293B',
  dark_text: '#F1F5F9',
  dark_text_muted: '#94A3B8',
  dark_border: '#334155',
  dark_menu_bg: '#1E293B',
  dark_menu_text: '#E2E8F0',
  font_primary: 'Inter',
  font_secondary: 'Inter',
  font_weight: '400',
  font_size_base: '16px',
  font_line_height: '1.5',
  font_heading_weight: '700',
  school_country: "Cote d Ivoire",
};
