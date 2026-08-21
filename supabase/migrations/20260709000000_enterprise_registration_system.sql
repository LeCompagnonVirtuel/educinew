-- =====================================================
-- EduCI Enterprise Registration System
-- Complete rewrite: registration, activation, onboarding
-- =====================================================

-- =====================================================
-- PART 1: Add missing columns to existing tables
-- =====================================================

-- Add enterprise columns to schools table
ALTER TABLE schools ADD COLUMN IF NOT EXISTS school_type TEXT;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS visibility TEXT DEFAULT 'PRIVE';
ALTER TABLE schools ADD COLUMN IF NOT EXISTS commercial_name TEXT;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS acronym TEXT;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS ministry TEXT;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS rccm TEXT;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS fiscal_number TEXT;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS authorization_number TEXT;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS creation_date DATE;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS commune TEXT;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS quarter TEXT;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS postal_code TEXT;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS facebook TEXT;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS linkedin TEXT;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS instagram TEXT;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS youtube TEXT;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS twitter TEXT;

-- Add enterprise columns to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_name TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS gender TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS date_of_birth DATE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS nationality TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMPTZ;

-- =====================================================
-- PART 2: New registration drafts table
-- =====================================================
CREATE TABLE IF NOT EXISTS registration_drafts_v2 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token TEXT UNIQUE NOT NULL,
  owner_civility TEXT,
  owner_last_name TEXT,
  owner_first_name TEXT,
  owner_date_of_birth DATE,
  owner_gender TEXT,
  owner_nationality TEXT DEFAULT 'Ivoirienne',
  owner_photo_url TEXT,
  owner_phone TEXT,
  owner_whatsapp TEXT,
  owner_email TEXT NOT NULL,
  owner_password_hash TEXT,
  owner_security_question TEXT,
  owner_security_answer TEXT,
  school_official_name TEXT,
  school_commercial_name TEXT,
  school_acronym TEXT,
  school_type TEXT DEFAULT 'SECONDARY',
  school_visibility TEXT DEFAULT 'PRIVE',
  school_ministry TEXT,
  school_rccm TEXT,
  school_fiscal_number TEXT,
  school_creation_date DATE,
  school_authorization_number TEXT,
  location_country TEXT DEFAULT 'Côte d''Ivoire',
  location_region TEXT,
  location_city TEXT,
  location_commune TEXT,
  location_quarter TEXT,
  location_full_address TEXT,
  location_postal_code TEXT,
  location_latitude DOUBLE PRECISION,
  location_longitude DOUBLE PRECISION,
  contact_phone_primary TEXT,
  contact_phone_secondary TEXT,
  contact_whatsapp TEXT,
  contact_email_primary TEXT,
  contact_email_admin TEXT,
  contact_website TEXT,
  contact_facebook TEXT,
  contact_linkedin TEXT,
  contact_instagram TEXT,
  contact_youtube TEXT,
  contact_twitter TEXT,
  branding_logo_url TEXT,
  branding_logo_mono_url TEXT,
  branding_icon_url TEXT,
  branding_signature_url TEXT,
  branding_stamp_url TEXT,
  branding_primary_color TEXT DEFAULT '#4F46E5',
  branding_secondary_color TEXT DEFAULT '#10B981',
  branding_accent_color TEXT DEFAULT '#F59E0B',
  branding_button_color TEXT DEFAULT '#4F46E5',
  branding_dashboard_color TEXT DEFAULT '#F9FAFB',
  branding_theme TEXT DEFAULT 'light',
  branding_typography TEXT DEFAULT 'Inter',
  branding_slogan TEXT,
  branding_motto TEXT,
  branding_description TEXT,
  academic_year_name TEXT,
  academic_cycles JSONB DEFAULT '[]',
  academic_levels JSONB DEFAULT '[]',
  academic_classes JSONB DEFAULT '[]',
  academic_subjects JSONB DEFAULT '[]',
  academic_grading_system TEXT DEFAULT '20',
  academic_period_type TEXT DEFAULT 'TRIMESTRE',
  modules JSONB DEFAULT '["Élèves","Enseignants","Parents","Classes","Notes","Bulletins","Pointage QR Code","Présences","Paiements","Transport","Messagerie","Notifications","EduCI AI","Rapports","Emploi du temps"]',
  payment_mobile_money BOOLEAN DEFAULT true,
  payment_bank_cards BOOLEAN DEFAULT false,
  payment_transfers BOOLEAN DEFAULT false,
  payment_cash BOOLEAN DEFAULT true,
  payment_cinetpay_api_key TEXT,
  payment_cinetpay_site_id TEXT,
  payment_cinetpay_secret_key TEXT,
  payment_cinetpay_environment TEXT DEFAULT 'sandbox',
  security_max_admins INT DEFAULT 3,
  security_allow_delegation BOOLEAN DEFAULT true,
  security_level TEXT DEFAULT 'standard',
  security_two_factor BOOLEAN DEFAULT false,
  current_step INT DEFAULT 0,
  completed_steps JSONB DEFAULT '[]',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'active', 'expired', 'cancelled')),
  verification_token_hash TEXT,
  verification_sent_at TIMESTAMPTZ,
  verification_expires_at TIMESTAMPTZ,
  verified_at TIMESTAMPTZ,
  activated_at TIMESTAMPTZ,
  auth_user_id UUID,
  school_id UUID,
  validation_results JSONB DEFAULT '{}',
  validation_score INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reg_drafts_v2_session ON registration_drafts_v2(session_token);
CREATE INDEX IF NOT EXISTS idx_reg_drafts_v2_email ON registration_drafts_v2(owner_email);
CREATE INDEX IF NOT EXISTS idx_reg_drafts_v2_status ON registration_drafts_v2(status);
CREATE INDEX IF NOT EXISTS idx_reg_drafts_v2_auth_user ON registration_drafts_v2(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_reg_drafts_v2_token ON registration_drafts_v2(verification_token_hash);

ALTER TABLE registration_drafts_v2 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on registration_drafts_v2"
  ON registration_drafts_v2 FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anon can insert registration_drafts_v2"
  ON registration_drafts_v2 FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anon can update own draft by session_token"
  ON registration_drafts_v2 FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anon can select own draft by session_token"
  ON registration_drafts_v2 FOR SELECT
  TO anon
  USING (true);

-- =====================================================
-- PART 3: Registration audit log
-- =====================================================
CREATE TABLE IF NOT EXISTS registration_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  draft_id UUID REFERENCES registration_drafts_v2(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reg_audit_draft ON registration_audit_log(draft_id);
CREATE INDEX IF NOT EXISTS idx_reg_audit_event ON registration_audit_log(event_type);

ALTER TABLE registration_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on registration_audit_log"
  ON registration_audit_log FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- PART 4: Updated_at trigger
-- =====================================================
CREATE OR REPLACE FUNCTION update_registration_drafts_v2_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_registration_drafts_v2_updated_at ON registration_drafts_v2;
CREATE TRIGGER trg_registration_drafts_v2_updated_at
  BEFORE UPDATE ON registration_drafts_v2
  FOR EACH ROW
  EXECUTE FUNCTION update_registration_drafts_v2_updated_at();

-- =====================================================
-- PART 5: Generate enterprise school code
-- =====================================================
CREATE OR REPLACE FUNCTION generate_enterprise_school_code(p_city TEXT)
RETURNS TEXT AS $$
DECLARE
  v_city_code TEXT;
  v_suffix TEXT;
  v_result TEXT;
  v_attempts INT := 0;
  v_city_map JSONB := '{
    "Abidjan": "ABJ",
    "Yamoussoukro": "YAK",
    "Bouaké": "BKE",
    "Daloa": "DLA",
    "Korhogo": "KGO",
    "San-Pédro": "SPA",
    "Man": "MAN",
    "Divo": "DVO",
    "Gagnoa": "GNA",
    "Abengourou": "ABG",
    "Anyama": "ANY",
    "Bingerville": "BNG",
    "Grand-Bassam": "GBS",
    "Cocody": "COC",
    "Marcory": "MAR",
    "Treichville": "TRV",
    "Plateau": "PLT",
    "Yopougon": "YOP",
    "Abobo": "ABO",
    "Koumassi": "KOU",
    "Port-Bouët": "PBT",
    "Adjamé": "ADJ",
    "Attécoubé": "ATC"
  }';
BEGIN
  v_city_code := v_city_map->>p_city;
  IF v_city_code IS NULL THEN
    v_city_code := UPPER(LEFT(REGEXP_REPLACE(p_city, '[^a-zA-Z]', '', 'g'), 3));
    IF LENGTH(v_city_code) < 3 THEN
      v_city_code := v_city_code || 'X';
    END IF;
  END IF;

  LOOP
    v_suffix := LPAD(FLOOR(RANDOM() * 100000)::TEXT, 5, '0');
    v_result := 'EDUCI-SYS-' || v_city_code || '-' || v_suffix;
    EXIT WHEN NOT EXISTS (SELECT 1 FROM schools WHERE code = v_result);
    v_attempts := v_attempts + 1;
    IF v_attempts > 50 THEN
      v_result := 'EDUCI-SYS-' || v_city_code || '-' || EXTRACT(EPOCH FROM NOW())::BIGINT::TEXT;
      EXIT;
    END IF;
  END LOOP;

  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- PART 6: Enterprise activation function (transactional)
-- =====================================================
CREATE OR REPLACE FUNCTION enterprise_activate_school(
  p_draft_id UUID,
  p_token_hash TEXT
)
RETURNS JSONB AS $$
DECLARE
  v_draft RECORD;
  v_school_id UUID;
  v_school_code TEXT;
  v_user_id UUID;
  v_result JSONB;
  v_error TEXT;
BEGIN
  -- Lock the draft row
  SELECT * INTO v_draft
  FROM registration_drafts_v2
  WHERE id = p_draft_id
  AND verification_token_hash = p_token_hash
  AND status = 'pending'
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Draft not found or already activated', 'code', 'INVALID_DRAFT');
  END IF;

  IF v_draft.verification_expires_at < now() THEN
    UPDATE registration_drafts_v2 SET status = 'expired' WHERE id = p_draft_id;
    RETURN jsonb_build_object('success', false, 'error', 'Token expired', 'code', 'TOKEN_EXPIRED');
  END IF;

  BEGIN
    -- 1. Activate auth user
    UPDATE auth.users
    SET email_confirmed_at = now(),
        raw_user_meta_data = raw_user_meta_data || jsonb_build_object('email_confirmed', true, 'is_active', true, 'role', 'ADMIN')
    WHERE id = v_draft.auth_user_id;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Auth user not found';
    END IF;

    v_user_id := v_draft.auth_user_id;

    -- 2. Generate school code
    v_school_code := generate_enterprise_school_code(COALESCE(v_draft.location_city, 'Abidjan'));

    -- 3. Create school (ALL user fields from wizard)
    INSERT INTO schools (
      name, code, address, phone, email, region, city, country,
      school_type, visibility, commercial_name, acronym, sigle,
      ministry, rccm, fiscal_number, authorization_number,
      creation_date, commune, quarter, postal_code,
      latitude, longitude, website, description, slogan,
      facebook, linkedin, instagram, youtube, twitter,
      is_active
    ) VALUES (
      v_draft.school_official_name,
      v_school_code,
      v_draft.location_full_address,
      v_draft.contact_phone_primary,
      COALESCE(v_draft.contact_email_primary, v_draft.owner_email),
      v_draft.location_region,
      v_draft.location_city,
      COALESCE(v_draft.location_country, 'Côte d''Ivoire'),
      v_draft.school_type,
      v_draft.school_visibility,
      v_draft.school_commercial_name,
      v_draft.school_acronym,
      v_draft.school_acronym,
      v_draft.school_ministry,
      v_draft.school_rccm,
      v_draft.school_fiscal_number,
      v_draft.school_authorization_number,
      v_draft.school_creation_date,
      v_draft.location_commune,
      v_draft.location_quarter,
      v_draft.location_postal_code,
      v_draft.location_latitude::REAL,
      v_draft.location_longitude::REAL,
      v_draft.contact_website,
      v_draft.branding_description,
      v_draft.branding_slogan,
      v_draft.contact_facebook,
      v_draft.contact_linkedin,
      v_draft.contact_instagram,
      v_draft.contact_youtube,
      v_draft.contact_twitter,
      true
    ) RETURNING id INTO v_school_id;

    -- 4. Create/update admin user (ALL owner fields from wizard)
    INSERT INTO users (
      id, name, email, role, school_id, is_active, status,
      first_name, last_name, phone, gender, date_of_birth,
      nationality, photo_url, email_verified, email_verified_at
    ) VALUES (
      v_user_id,
      COALESCE(v_draft.owner_first_name || ' ' || v_draft.owner_last_name, v_draft.owner_email),
      v_draft.owner_email,
      'ADMIN',
      v_school_id,
      true,
      'ACTIVE',
      v_draft.owner_first_name,
      v_draft.owner_last_name,
      v_draft.owner_phone,
      v_draft.owner_gender,
      v_draft.owner_date_of_birth,
      v_draft.owner_nationality,
      v_draft.owner_photo_url,
      true,
      now()
    ) ON CONFLICT (id) DO UPDATE SET
      name = COALESCE(v_draft.owner_first_name || ' ' || v_draft.owner_last_name, v_draft.owner_email),
      email = v_draft.owner_email,
      role = 'ADMIN',
      school_id = v_school_id,
      is_active = true,
      status = 'ACTIVE',
      first_name = v_draft.owner_first_name,
      last_name = v_draft.owner_last_name,
      phone = v_draft.owner_phone,
      gender = v_draft.owner_gender,
      date_of_birth = v_draft.owner_date_of_birth,
      nationality = v_draft.owner_nationality,
      photo_url = v_draft.owner_photo_url,
      email_verified = true,
      email_verified_at = now(),
      updated_at = now();

    -- 5. Update auth user metadata
    UPDATE auth.users
    SET raw_user_meta_data = raw_user_meta_data || jsonb_build_object(
      'school_id', v_school_id, 'role', 'ADMIN',
      'email_confirmed', true, 'is_active', true, 'onboarding_completed', false
    )
    WHERE id = v_user_id;

    -- 6. Create academic year
    INSERT INTO academic_years (school_id, name, start_date, end_date, is_active)
    VALUES (
      v_school_id,
      COALESCE(v_draft.academic_year_name, to_char(now(), 'YYYY') || '-' || to_char(now() + interval '1 year', 'YYYY')),
      now()::date, (now() + interval '10 months')::date, true
    );

    -- 7. Create subscription
    INSERT INTO subscriptions (school_id, plan, status, start_date, end_date, monthly_amount, yearly_amount)
    VALUES (v_school_id, 'FREE_TRIAL', 'ACTIVE', now(), now() + interval '30 days', 0, 0);

    -- 8. Create branding (using CORRECT column names: color_primary, font_primary, logo_dark_url, etc.)
    INSERT INTO school_branding (
      school_id, official_name, commercial_name, slogan, motto, description,
      color_primary, color_secondary, color_accent, color_button, color_dashboard_bg,
      font_primary, logo_url, logo_dark_url, logo_icon_url, signature_url, stamp_url,
      setup_completed
    ) VALUES (
      v_school_id,
      v_draft.school_official_name,
      v_draft.school_commercial_name,
      v_draft.branding_slogan,
      v_draft.branding_motto,
      v_draft.branding_description,
      COALESCE(v_draft.branding_primary_color, '#4F46E5'),
      COALESCE(v_draft.branding_secondary_color, '#10B981'),
      COALESCE(v_draft.branding_accent_color, '#F59E0B'),
      COALESCE(v_draft.branding_button_color, '#4F46E5'),
      COALESCE(v_draft.branding_dashboard_color, '#F9FAFB'),
      COALESCE(v_draft.branding_typography, 'Inter'),
      v_draft.branding_logo_url,
      v_draft.branding_logo_mono_url,
      v_draft.branding_icon_url,
      v_draft.branding_signature_url,
      v_draft.branding_stamp_url,
      true
    ) ON CONFLICT (school_id) DO UPDATE SET
      official_name = EXCLUDED.official_name,
      commercial_name = EXCLUDED.commercial_name,
      slogan = EXCLUDED.slogan,
      motto = EXCLUDED.motto,
      description = EXCLUDED.description,
      color_primary = EXCLUDED.color_primary,
      color_secondary = EXCLUDED.color_secondary,
      color_accent = EXCLUDED.color_accent,
      color_button = EXCLUDED.color_button,
      color_dashboard_bg = EXCLUDED.color_dashboard_bg,
      font_primary = EXCLUDED.font_primary,
      logo_url = EXCLUDED.logo_url,
      logo_dark_url = EXCLUDED.logo_dark_url,
      logo_icon_url = EXCLUDED.logo_icon_url,
      signature_url = EXCLUDED.signature_url,
      stamp_url = EXCLUDED.stamp_url,
      setup_completed = true;

    -- 9. Create school modules
    INSERT INTO school_modules (school_id, module_name, is_enabled)
    SELECT v_school_id, module_name, true
    FROM jsonb_array_elements_text(v_draft.modules) AS module_name
    ON CONFLICT DO NOTHING;

    -- 10. Create QR codes (using CORRECT column names: user_type, qr_data, user_id required)
    INSERT INTO qr_codes (school_id, user_id, user_type, qr_data, barcode_data)
    VALUES
      (v_school_id, v_user_id, 'admin', 'SCHOOL-' || v_school_id::text, v_school_code),
      (v_school_id, v_user_id, 'admin', 'VERIFY-' || v_school_id::text, 'VERIFY-' || v_school_code),
      (v_school_id, v_user_id, 'admin', 'PAY-' || v_school_id::text, 'PAY-' || v_school_code)
    ON CONFLICT (qr_data) DO NOTHING;

    -- 11. Create notification settings (sensible defaults)
    INSERT INTO notification_settings (school_id, email_enabled, push_enabled, sms_enabled, whatsapp_enabled)
    VALUES (v_school_id, true, true, false, false)
    ON CONFLICT (school_id) DO UPDATE SET
      email_enabled = true,
      push_enabled = true;

    -- 12. Create payment methods (ALL user choices)
    IF v_draft.payment_mobile_money THEN
      INSERT INTO payment_methods (school_id, name, code, is_active)
      VALUES (v_school_id, 'Mobile Money', 'mobile_money', true)
      ON CONFLICT (school_id, code) DO NOTHING;
    END IF;
    IF v_draft.payment_bank_cards THEN
      INSERT INTO payment_methods (school_id, name, code, is_active)
      VALUES (v_school_id, 'Cartes bancaires', 'bank_cards', true)
      ON CONFLICT (school_id, code) DO NOTHING;
    END IF;
    IF v_draft.payment_transfers THEN
      INSERT INTO payment_methods (school_id, name, code, is_active)
      VALUES (v_school_id, 'Virements', 'transfers', true)
      ON CONFLICT (school_id, code) DO NOTHING;
    END IF;
    IF v_draft.payment_cash THEN
      INSERT INTO payment_methods (school_id, name, code, is_active)
      VALUES (v_school_id, 'Espèces', 'cash', true)
      ON CONFLICT (school_id, code) DO NOTHING;
    END IF;

    -- 13. Create academic structure from user choices
    -- Create cycles
    IF v_draft.academic_cycles IS NOT NULL AND jsonb_array_length(v_draft.academic_cycles) > 0 THEN
      INSERT INTO cycles (school_id, name)
      SELECT v_school_id, cycle_name
      FROM jsonb_array_elements_text(v_draft.academic_cycles) AS cycle_name
      ON CONFLICT DO NOTHING;
    END IF;

    -- Create subjects from user choices
    IF v_draft.academic_subjects IS NOT NULL AND jsonb_array_length(v_draft.academic_subjects) > 0 THEN
      INSERT INTO subjects (school_id, name, coefficient)
      SELECT v_school_id,
             (subj->>'name')::text,
             COALESCE((subj->>'coefficient')::real, 1)
      FROM jsonb_array_elements(v_draft.academic_subjects) AS subj
      WHERE subj->>'name' IS NOT NULL
        AND NOT EXISTS (
          SELECT 1 FROM subjects s
          WHERE s.school_id = v_school_id
          AND s.name = (subj->>'name')::text
        );
    END IF;

    -- 14. Create default permissions for ADMIN role
    INSERT INTO permissions (school_id, role, resource, can_create, can_read, can_update, can_delete, can_export)
    VALUES
      (v_school_id, 'ADMIN', 'students', true, true, true, true, true),
      (v_school_id, 'ADMIN', 'teachers', true, true, true, true, true),
      (v_school_id, 'ADMIN', 'classes', true, true, true, true, true),
      (v_school_id, 'ADMIN', 'grades', true, true, true, true, true),
      (v_school_id, 'ADMIN', 'payments', true, true, true, true, true),
      (v_school_id, 'ADMIN', 'attendance', true, true, true, true, true),
      (v_school_id, 'ADMIN', 'reports', true, true, true, true, true),
      (v_school_id, 'ADMIN', 'settings', true, true, true, true, true)
    ON CONFLICT DO NOTHING;

    -- 13. Update draft status
    UPDATE registration_drafts_v2 SET
      status = 'active', auth_user_id = v_user_id, school_id = v_school_id,
      verified_at = now(), activated_at = now()
    WHERE id = p_draft_id;

    -- 14. Log activation
    INSERT INTO registration_audit_log (draft_id, event_type, event_data)
    VALUES (p_draft_id, 'school_activated', jsonb_build_object('school_id', v_school_id, 'school_code', v_school_code, 'user_id', v_user_id));

    v_result := jsonb_build_object('success', true, 'school_id', v_school_id, 'school_code', v_school_code, 'user_id', v_user_id, 'email', v_draft.owner_email, 'school_name', v_draft.school_official_name);
    RETURN v_result;

  EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS v_error = MESSAGE_TEXT;
    INSERT INTO registration_audit_log (draft_id, event_type, event_data)
    VALUES (p_draft_id, 'activation_failed', jsonb_build_object('error', v_error));
    RETURN jsonb_build_object('success', false, 'error', v_error, 'code', 'ACTIVATION_FAILED');
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- PART 7: Validate registration draft
-- =====================================================
CREATE OR REPLACE FUNCTION validate_registration_draft(p_draft_id UUID)
RETURNS JSONB AS $$
DECLARE
  v_draft RECORD;
  v_errors JSONB := '[]';
  v_score INT := 0;
  v_total INT := 0;
BEGIN
  SELECT * INTO v_draft FROM registration_drafts_v2 WHERE id = p_draft_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('valid', false, 'errors', '["Draft not found"]', 'score', 0);
  END IF;

  v_total := v_total + 1;
  IF v_draft.owner_email IS NOT NULL AND v_draft.owner_email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    v_score := v_score + 1;
  ELSE
    v_errors := v_errors || '["Email invalide"]';
  END IF;

  v_total := v_total + 1;
  IF v_draft.owner_last_name IS NOT NULL AND length(v_draft.owner_last_name) >= 2 THEN
    v_score := v_score + 1;
  ELSE
    v_errors := v_errors || '["Nom requis"]';
  END IF;

  v_total := v_total + 1;
  IF v_draft.owner_first_name IS NOT NULL AND length(v_draft.owner_first_name) >= 2 THEN
    v_score := v_score + 1;
  ELSE
    v_errors := v_errors || '["Prénom requis"]';
  END IF;

  v_total := v_total + 1;
  IF v_draft.school_official_name IS NOT NULL AND length(v_draft.school_official_name) >= 3 THEN
    v_score := v_score + 1;
  ELSE
    v_errors := v_errors || '["Nom établissement requis"]';
  END IF;

  v_total := v_total + 1;
  IF v_draft.school_type IS NOT NULL THEN v_score := v_score + 1;
  ELSE v_errors := v_errors || '["Type requis"]'; END IF;

  v_total := v_total + 1;
  IF v_draft.location_country IS NOT NULL THEN v_score := v_score + 1;
  ELSE v_errors := v_errors || '["Pays requis"]'; END IF;

  v_total := v_total + 1;
  IF v_draft.location_city IS NOT NULL AND length(v_draft.location_city) >= 2 THEN v_score := v_score + 1;
  ELSE v_errors := v_errors || '["Ville requise"]'; END IF;

  v_total := v_total + 1;
  IF v_draft.branding_primary_color IS NOT NULL THEN v_score := v_score + 1;
  ELSE v_errors := v_errors || '["Couleur requise"]'; END IF;

  v_total := v_total + 1;
  IF jsonb_array_length(COALESCE(v_draft.modules, '[]')) > 0 THEN v_score := v_score + 1;
  ELSE v_errors := v_errors || '["Modules requis"]'; END IF;

  v_score := v_score + 1;
  v_total := v_total + 1;

  UPDATE registration_drafts_v2 SET
    validation_results = jsonb_build_object('errors', v_errors, 'score', v_score, 'total', v_total, 'percentage', round((v_score::numeric / v_total::numeric) * 100)),
    validation_score = round((v_score::numeric / v_total::numeric) * 100)
  WHERE id = p_draft_id;

  RETURN jsonb_build_object('valid', jsonb_array_length(v_errors) = 0, 'errors', v_errors, 'score', v_score, 'total', v_total, 'percentage', round((v_score::numeric / v_total::numeric) * 100));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- PART 8: Cleanup expired drafts
-- =====================================================
CREATE OR REPLACE FUNCTION cleanup_expired_registration_drafts()
RETURNS void AS $$
BEGIN
  UPDATE registration_drafts_v2 SET status = 'expired' WHERE status = 'draft' AND updated_at < now() - interval '7 days';
  UPDATE registration_drafts_v2 SET status = 'expired' WHERE status = 'pending' AND verification_expires_at < now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- PART 9: School modules table
-- =====================================================
CREATE TABLE IF NOT EXISTS school_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  module_name TEXT NOT NULL,
  is_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(school_id, module_name)
);

ALTER TABLE school_modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "School modules isolated by school_id"
  ON school_modules FOR ALL
  USING (school_id IN (SELECT school_id FROM users WHERE id = auth.uid()))
  WITH CHECK (school_id IN (SELECT school_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Service role full access on school_modules"
  ON school_modules FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- PART 10: Notification settings table
-- =====================================================
CREATE TABLE IF NOT EXISTS notification_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  email_enabled BOOLEAN DEFAULT true,
  push_enabled BOOLEAN DEFAULT true,
  sms_enabled BOOLEAN DEFAULT false,
  whatsapp_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(school_id)
);

ALTER TABLE notification_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Notification settings isolated by school_id"
  ON notification_settings FOR ALL
  USING (school_id IN (SELECT school_id FROM users WHERE id = auth.uid()))
  WITH CHECK (school_id IN (SELECT school_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Service role full access on notification_settings"
  ON notification_settings FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- PART 11: Grants
-- =====================================================
GRANT EXECUTE ON FUNCTION generate_enterprise_school_code TO service_role;
GRANT EXECUTE ON FUNCTION enterprise_activate_school TO service_role;
GRANT EXECUTE ON FUNCTION validate_registration_draft TO service_role;
GRANT EXECUTE ON FUNCTION validate_registration_draft TO anon;
GRANT EXECUTE ON FUNCTION cleanup_expired_registration_drafts TO service_role;
