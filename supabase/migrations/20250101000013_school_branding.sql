-- Migration: Complete school branding system for multi-tenant white-label
-- Adds school_branding table with all visual identity fields

CREATE TABLE IF NOT EXISTS school_branding (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE UNIQUE,

  -- Step 1: Identity
  official_name TEXT,
  commercial_name TEXT,
  slogan TEXT,
  motto TEXT,
  description TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  social_media JSONB DEFAULT '{}',

  -- Step 2: Logo
  logo_url TEXT,
  logo_icon_url TEXT,
  logo_favicon_url TEXT,
  logo_dark_url TEXT,
  logo_width INTEGER,
  logo_height INTEGER,

  -- Step 3: Colors (primary palette)
  color_primary TEXT DEFAULT '#4F46E5',
  color_secondary TEXT DEFAULT '#10B981',
  color_accent TEXT DEFAULT '#F59E0B',
  color_success TEXT DEFAULT '#10B981',
  color_error TEXT DEFAULT '#EF4444',
  color_warning TEXT DEFAULT '#F59E0B',
  color_info TEXT DEFAULT '#3B82F6',

  -- Step 3: Colors (UI palette)
  color_button TEXT DEFAULT '#4F46E5',
  color_button_text TEXT DEFAULT '#FFFFFF',
  color_link TEXT DEFAULT '#4F46E5',
  color_card_bg TEXT DEFAULT '#FFFFFF',
  color_card_border TEXT DEFAULT '#E5E7EB',
  color_menu_bg TEXT DEFAULT '#FFFFFF',
  color_menu_text TEXT DEFAULT '#1F2937',
  color_menu_active TEXT DEFAULT '#4F46E5',
  color_title TEXT DEFAULT '#111827',
  color_text TEXT DEFAULT '#374151',
  color_text_muted TEXT DEFAULT '#6B7280',
  color_icon TEXT DEFAULT '#6B7280',
  color_chart_1 TEXT DEFAULT '#4F46E5',
  color_chart_2 TEXT DEFAULT '#10B981',
  color_chart_3 TEXT DEFAULT '#F59E0B',
  color_chart_4 TEXT DEFAULT '#EF4444',
  color_chart_5 TEXT DEFAULT '#8B5CF6',
  color_dashboard_bg TEXT DEFAULT '#F9FAFB',
  color_dashboard_card TEXT DEFAULT '#FFFFFF',
  color_table_header TEXT DEFAULT '#F9FAFB',
  color_table_row_hover TEXT DEFAULT '#F3F4F6',
  color_table_border TEXT DEFAULT '#E5E7EB',
  color_badge_success_bg TEXT DEFAULT '#D1FAE5',
  color_badge_success_text TEXT DEFAULT '#065F46',
  color_badge_error_bg TEXT DEFAULT '#FEE2E2',
  color_badge_error_text TEXT DEFAULT '#991B1B',
  color_badge_warning_bg TEXT DEFAULT '#FEF3C7',
  color_badge_warning_text TEXT DEFAULT '#92400E',
  color_badge_info_bg TEXT DEFAULT '#DBEAFE',
  color_badge_info_text TEXT DEFAULT '#1E40AF',
  color_notification_bg TEXT DEFAULT '#FFFFFF',
  color_notification_border TEXT DEFAULT '#E5E7EB',

  -- Step 4: Dark mode colors
  dark_mode_enabled BOOLEAN DEFAULT true,
  dark_bg TEXT DEFAULT '#0F172A',
  dark_surface TEXT DEFAULT '#1E293B',
  dark_card TEXT DEFAULT '#1E293B',
  dark_text TEXT DEFAULT '#F1F5F9',
  dark_text_muted TEXT DEFAULT '#94A3B8',
  dark_border TEXT DEFAULT '#334155',
  dark_menu_bg TEXT DEFAULT '#1E293B',
  dark_menu_text TEXT DEFAULT '#E2E8F0',

  -- Step 5: Typography
  font_primary TEXT DEFAULT 'Inter',
  font_secondary TEXT DEFAULT 'Inter',
  font_weight TEXT DEFAULT '400',
  font_style TEXT DEFAULT 'normal',
  font_size_base TEXT DEFAULT '16px',
  font_size_small TEXT DEFAULT '14px',
  font_size_large TEXT DEFAULT '18px',
  font_size_title TEXT DEFAULT '24px',
  font_size_heading TEXT DEFAULT '20px',
  font_line_height TEXT DEFAULT '1.5',
  font_heading_weight TEXT DEFAULT '700',

  -- Step 6: Document signature
  director_name TEXT,
  director_title TEXT DEFAULT 'Directeur/Directrice',
  signature_url TEXT,
  stamp_url TEXT,
  document_footer TEXT,

  -- Step 10: Auto-use defaults
  school_address TEXT,
  school_city TEXT,
  school_country TEXT DEFAULT 'Cote d''Ivoire',
  school_phone TEXT,
  school_email TEXT,
  school_website TEXT,
  school_social_media JSONB DEFAULT '{}',

  -- Meta
  is_published BOOLEAN DEFAULT false,
  setup_completed BOOLEAN DEFAULT false,
  setup_step INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS policies (idempotent)
ALTER TABLE school_branding ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "school_branding_select" ON school_branding;
CREATE POLICY "school_branding_select" ON school_branding
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "school_branding_insert" ON school_branding;
CREATE POLICY "school_branding_insert" ON school_branding
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.school_id = school_branding.school_id
      AND users.role IN ('SUPER_ADMIN', 'ADMIN')
    )
  );

DROP POLICY IF EXISTS "school_branding_update" ON school_branding;
CREATE POLICY "school_branding_update" ON school_branding
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.school_id = school_branding.school_id
      AND users.role IN ('SUPER_ADMIN', 'ADMIN')
    )
  );

DROP POLICY IF EXISTS "school_branding_delete" ON school_branding;
CREATE POLICY "school_branding_delete" ON school_branding
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.school_id = school_branding.school_id
      AND users.role = 'SUPER_ADMIN'
    )
  );

-- Index
CREATE INDEX IF NOT EXISTS idx_school_branding_school ON school_branding(school_id);

-- Auto-create branding row when school is created
CREATE OR REPLACE FUNCTION create_school_branding()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO school_branding (school_id, official_name, phone, email, website, school_address, school_city, school_country, school_phone, school_email, school_website)
  VALUES (NEW.id, NEW.name, NEW.phone, NEW.email, NEW.website, NEW.address, NEW.city, NEW.country, NEW.phone, NEW.email, NEW.website)
  ON CONFLICT (school_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_school_created_branding ON schools;
CREATE TRIGGER on_school_created_branding
  AFTER INSERT ON schools
  FOR EACH ROW
  EXECUTE FUNCTION create_school_branding();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_school_branding_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_school_branding_ts ON school_branding;
CREATE TRIGGER update_school_branding_ts
  BEFORE UPDATE ON school_branding
  FOR EACH ROW
  EXECUTE FUNCTION update_school_branding_timestamp();

-- Insert branding for existing demo school
INSERT INTO school_branding (school_id, official_name, setup_completed)
SELECT id, name, true
FROM schools
WHERE code = 'LMA-2025'
ON CONFLICT (school_id) DO NOTHING;

-- Storage bucket for school logos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('school-logos', 'school-logos', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies for school-logos (idempotent)
DROP POLICY IF EXISTS "school_logos_public_read" ON storage.objects;
CREATE POLICY "school_logos_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'school-logos');

DROP POLICY IF EXISTS "school_logos_insert_auth" ON storage.objects;
CREATE POLICY "school_logos_insert_auth" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'school-logos' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "school_logos_update_auth" ON storage.objects;
CREATE POLICY "school_logos_update_auth" ON storage.objects
  FOR UPDATE USING (bucket_id = 'school-logos' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "school_logos_delete_auth" ON storage.objects;
CREATE POLICY "school_logos_delete_auth" ON storage.objects
  FOR DELETE USING (bucket_id = 'school-logos' AND auth.role() = 'authenticated');
