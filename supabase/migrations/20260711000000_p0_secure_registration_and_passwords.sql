-- P0-1: Secure registration_drafts_v2 RLS policies (remove anon access)
-- P0-2: Fix temporary passwords in enterprise_activate_school

-- =====================================================
-- P0-1: Remove overly permissive anon policies on registration_drafts_v2
-- Only apply if table exists
-- =====================================================

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'registration_drafts_v2') THEN
    EXECUTE 'DROP POLICY IF EXISTS "Allow anon select registration_drafts_v2" ON registration_drafts_v2';
    EXECUTE 'DROP POLICY IF EXISTS "Allow anon update registration_drafts_v2" ON registration_drafts_v2';
    EXECUTE 'DROP POLICY IF EXISTS "Allow anon insert registration_drafts_v2" ON registration_drafts_v2';
    EXECUTE 'DROP POLICY IF EXISTS "registration_drafts_v2_anon_select" ON registration_drafts_v2';
    EXECUTE 'DROP POLICY IF EXISTS "registration_drafts_v2_anon_insert" ON registration_drafts_v2';
    EXECUTE 'DROP POLICY IF EXISTS "registration_drafts_v2_anon_update" ON registration_drafts_v2';
    EXECUTE 'DROP POLICY IF EXISTS "registration_drafts_v2_service_role_only" ON registration_drafts_v2';

    EXECUTE 'CREATE POLICY "registration_drafts_v2_service_role_only" ON registration_drafts_v2
      FOR ALL USING (auth.role() = ''service_role'')
      WITH CHECK (auth.role() = ''service_role'')';
  END IF;
END $$;

-- =====================================================
-- P0-2: Fix enterprise_activate_school - unique random passwords
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
  v_auth_exists BOOLEAN;
  v_existing_school_id UUID;
  v_modules JSONB;
  v_cycles JSONB;
  v_subjects JSONB;
  v_random_password TEXT;
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

  -- Generate unique random password for this user
  v_random_password := encode(gen_random_bytes(32), 'hex') || 'Aa1!';

  BEGIN
    -- Safely parse JSON arrays
    BEGIN
      IF v_draft.modules IS NULL THEN v_modules := '[]'::jsonb;
      ELSIF jsonb_typeof(v_draft.modules) = 'array' THEN v_modules := v_draft.modules;
      ELSE
        BEGIN
          v_modules := v_draft.modules::text::jsonb;
          IF jsonb_typeof(v_modules) != 'array' THEN v_modules := '[]'::jsonb; END IF;
        EXCEPTION WHEN OTHERS THEN v_modules := '[]'::jsonb; END;
      END IF;
    EXCEPTION WHEN OTHERS THEN v_modules := '[]'::jsonb; END;

    BEGIN
      IF v_draft.academic_cycles IS NULL THEN v_cycles := '[]'::jsonb;
      ELSIF jsonb_typeof(v_draft.academic_cycles) = 'array' THEN v_cycles := v_draft.academic_cycles;
      ELSE
        BEGIN
          v_cycles := v_draft.academic_cycles::text::jsonb;
          IF jsonb_typeof(v_cycles) != 'array' THEN v_cycles := '[]'::jsonb; END IF;
        EXCEPTION WHEN OTHERS THEN v_cycles := '[]'::jsonb; END;
      END IF;
    EXCEPTION WHEN OTHERS THEN v_cycles := '[]'::jsonb; END;

    BEGIN
      IF v_draft.academic_subjects IS NULL THEN v_subjects := '[]'::jsonb;
      ELSIF jsonb_typeof(v_draft.academic_subjects) = 'array' THEN v_subjects := v_draft.academic_subjects;
      ELSE
        BEGIN
          v_subjects := v_draft.academic_subjects::text::jsonb;
          IF jsonb_typeof(v_subjects) != 'array' THEN v_subjects := '[]'::jsonb; END IF;
        EXCEPTION WHEN OTHERS THEN v_subjects := '[]'::jsonb; END;
      END IF;
    EXCEPTION WHEN OTHERS THEN v_subjects := '[]'::jsonb; END;

    -- 1. Check if auth user exists
    SELECT EXISTS(SELECT 1 FROM auth.users WHERE id = v_draft.auth_user_id) INTO v_auth_exists;

    IF v_auth_exists THEN
      UPDATE auth.users
      SET email_confirmed_at = now(),
          raw_user_meta_data = raw_user_meta_data || jsonb_build_object('email_confirmed', true, 'is_active', true, 'role', 'ADMIN')
      WHERE id = v_draft.auth_user_id;
      v_user_id := v_draft.auth_user_id;
    ELSE
      SELECT id INTO v_user_id FROM auth.users WHERE email = v_draft.owner_email LIMIT 1;

      IF v_user_id IS NOT NULL THEN
        UPDATE auth.users
        SET email_confirmed_at = now(),
            raw_user_meta_data = raw_user_meta_data || jsonb_build_object('email_confirmed', true, 'is_active', true, 'role', 'ADMIN')
        WHERE id = v_user_id;
      ELSE
        INSERT INTO auth.users (
          instance_id, id, aud, role, email, encrypted_password,
          email_confirmed_at, raw_user_meta_data, created_at, updated_at
        ) VALUES (
          '00000000-0000-0000-0000-000000000000',
          COALESCE(v_draft.auth_user_id, gen_random_uuid()),
          'authenticated', 'authenticated',
          v_draft.owner_email,
          crypt(v_random_password, gen_salt('bf')),
          now(),
          jsonb_build_object(
            'name', v_draft.owner_first_name || ' ' || v_draft.owner_last_name,
            'role', 'ADMIN', 'email_confirmed', true, 'is_active', true,
            'registration_source', 'enterprise_wizard',
            'must_change_password', true
          ),
          now(), now()
        ) RETURNING id INTO v_user_id;

        UPDATE registration_drafts_v2 SET auth_user_id = v_user_id WHERE id = p_draft_id;
      END IF;
    END IF;

    -- 2. Generate school code
    v_school_code := generate_enterprise_school_code(COALESCE(v_draft.location_city, 'Abidjan'));

    -- 3. Check if school already exists
    SELECT id INTO v_existing_school_id FROM schools
    WHERE email = COALESCE(v_draft.contact_email_primary, v_draft.owner_email) LIMIT 1;

    IF v_existing_school_id IS NOT NULL THEN
      v_school_id := v_existing_school_id;
      UPDATE schools SET
        name = v_draft.school_official_name, address = v_draft.location_full_address,
        phone = v_draft.contact_phone_primary, region = v_draft.location_region,
        city = v_draft.location_city, country = COALESCE(v_draft.location_country, 'Côte d''Ivoire'),
        school_type = v_draft.school_type, visibility = v_draft.school_visibility,
        commercial_name = v_draft.school_commercial_name, acronym = v_draft.school_acronym,
        sigle = v_draft.school_acronym, ministry = v_draft.school_ministry,
        rccm = v_draft.school_rccm, fiscal_number = v_draft.school_fiscal_number,
        authorization_number = v_draft.school_authorization_number,
        creation_date = v_draft.school_creation_date, commune = v_draft.location_commune,
        quarter = v_draft.location_quarter, postal_code = v_draft.location_postal_code,
        latitude = v_draft.location_latitude::REAL, longitude = v_draft.location_longitude::REAL,
        website = v_draft.contact_website, description = v_draft.branding_description,
        slogan = v_draft.branding_slogan, logo_url = v_draft.branding_logo_url,
        primary_color = COALESCE(v_draft.branding_primary_color, '#4F46E5'),
        secondary_color = COALESCE(v_draft.branding_secondary_color, '#10B981'),
        accent_color = COALESCE(v_draft.branding_accent_color, '#F59E0B'),
        facebook = v_draft.contact_facebook, linkedin = v_draft.contact_linkedin,
        instagram = v_draft.contact_instagram, youtube = v_draft.contact_youtube,
        twitter = v_draft.contact_twitter, is_active = true, updated_at = now()
      WHERE id = v_school_id;
    ELSE
      INSERT INTO schools (
        name, code, address, phone, email, region, city, country,
        school_type, visibility, commercial_name, acronym, sigle,
        ministry, rccm, fiscal_number, authorization_number,
        creation_date, commune, quarter, postal_code,
        latitude, longitude, website, description, slogan,
        logo_url, primary_color, secondary_color, accent_color,
        facebook, linkedin, instagram, youtube, twitter, is_active
      ) VALUES (
        v_draft.school_official_name, v_school_code,
        v_draft.location_full_address, v_draft.contact_phone_primary,
        COALESCE(v_draft.contact_email_primary, v_draft.owner_email),
        v_draft.location_region, v_draft.location_city,
        COALESCE(v_draft.location_country, 'Côte d''Ivoire'),
        v_draft.school_type, v_draft.school_visibility,
        v_draft.school_commercial_name, v_draft.school_acronym, v_draft.school_acronym,
        v_draft.school_ministry, v_draft.school_rccm, v_draft.school_fiscal_number,
        v_draft.school_authorization_number, v_draft.school_creation_date,
        v_draft.location_commune, v_draft.location_quarter, v_draft.location_postal_code,
        v_draft.location_latitude::REAL, v_draft.location_longitude::REAL,
        v_draft.contact_website, v_draft.branding_description, v_draft.branding_slogan,
        v_draft.branding_logo_url,
        COALESCE(v_draft.branding_primary_color, '#4F46E5'),
        COALESCE(v_draft.branding_secondary_color, '#10B981'),
        COALESCE(v_draft.branding_accent_color, '#F59E0B'),
        v_draft.contact_facebook, v_draft.contact_linkedin,
        v_draft.contact_instagram, v_draft.contact_youtube, v_draft.contact_twitter, true
      ) RETURNING id INTO v_school_id;
    END IF;

    -- 4. Create/update admin user
    INSERT INTO users (
      id, name, email, role, school_id, is_active, status,
      first_name, last_name, phone, gender, date_of_birth,
      nationality, photo_url, email_verified, email_verified_at
    ) VALUES (
      v_user_id,
      COALESCE(v_draft.owner_first_name || ' ' || v_draft.owner_last_name, v_draft.owner_email),
      v_draft.owner_email, 'ADMIN', v_school_id, true, 'ACTIVE',
      v_draft.owner_first_name, v_draft.owner_last_name, v_draft.owner_phone,
      v_draft.owner_gender, v_draft.owner_date_of_birth, v_draft.owner_nationality,
      v_draft.owner_photo_url, true, now()
    ) ON CONFLICT (id) DO UPDATE SET
      name = COALESCE(v_draft.owner_first_name || ' ' || v_draft.owner_last_name, v_draft.owner_email),
      email = v_draft.owner_email, role = 'ADMIN', school_id = v_school_id,
      is_active = true, status = 'ACTIVE',
      first_name = v_draft.owner_first_name, last_name = v_draft.owner_last_name,
      phone = v_draft.owner_phone, gender = v_draft.owner_gender,
      date_of_birth = v_draft.owner_date_of_birth, nationality = v_draft.owner_nationality,
      photo_url = v_draft.owner_photo_url, email_verified = true,
      email_verified_at = now(), updated_at = now();

    -- 5. Update auth user metadata
    UPDATE auth.users SET raw_user_meta_data = raw_user_meta_data || jsonb_build_object(
      'school_id', v_school_id, 'role', 'ADMIN',
      'email_confirmed', true, 'is_active', true, 'onboarding_completed', false
    ) WHERE id = v_user_id;

    -- 6. Create academic year
    INSERT INTO academic_years (school_id, name, start_date, end_date, is_active)
    VALUES (v_school_id, COALESCE(v_draft.academic_year_name, to_char(now(), 'YYYY') || '-' || to_char(now() + interval '1 year', 'YYYY')),
      now()::date, (now() + interval '10 months')::date, true)
    ON CONFLICT (school_id, name) DO NOTHING;

    -- 7. Create subscription
    INSERT INTO subscriptions (school_id, plan, status, start_date, end_date, monthly_amount, yearly_amount)
    VALUES (v_school_id, 'FREE_TRIAL', 'ACTIVE', now(), now() + interval '30 days', 0, 0)
    ON CONFLICT (school_id) DO NOTHING;

    -- 8. Create branding
    INSERT INTO school_branding (
      school_id, official_name, commercial_name, slogan, motto, description,
      color_primary, color_secondary, color_accent, color_button, color_dashboard_bg,
      font_primary, logo_url, logo_dark_url, logo_icon_url, signature_url, stamp_url, setup_completed
    ) VALUES (
      v_school_id, v_draft.school_official_name, v_draft.school_commercial_name,
      v_draft.branding_slogan, v_draft.branding_motto, v_draft.branding_description,
      COALESCE(v_draft.branding_primary_color, '#4F46E5'), COALESCE(v_draft.branding_secondary_color, '#10B981'),
      COALESCE(v_draft.branding_accent_color, '#F59E0B'), COALESCE(v_draft.branding_button_color, '#4F46E5'),
      COALESCE(v_draft.branding_dashboard_color, '#F9FAFB'), COALESCE(v_draft.branding_typography, 'Inter'),
      v_draft.branding_logo_url, v_draft.branding_logo_mono_url, v_draft.branding_icon_url,
      v_draft.branding_signature_url, v_draft.branding_stamp_url, true
    ) ON CONFLICT (school_id) DO UPDATE SET
      official_name = EXCLUDED.official_name, commercial_name = EXCLUDED.commercial_name,
      slogan = EXCLUDED.slogan, motto = EXCLUDED.motto, description = EXCLUDED.description,
      color_primary = EXCLUDED.color_primary, color_secondary = EXCLUDED.color_secondary,
      color_accent = EXCLUDED.color_accent, color_button = EXCLUDED.color_button,
      color_dashboard_bg = EXCLUDED.color_dashboard_bg, font_primary = EXCLUDED.font_primary,
      logo_url = EXCLUDED.logo_url, logo_dark_url = EXCLUDED.logo_dark_url,
      logo_icon_url = EXCLUDED.logo_icon_url, signature_url = EXCLUDED.signature_url,
      stamp_url = EXCLUDED.stamp_url, setup_completed = true;

    -- 9. Create school modules
    IF jsonb_array_length(v_modules) > 0 THEN
      INSERT INTO school_modules (school_id, module_name, is_enabled)
      SELECT v_school_id, module_name, true FROM jsonb_array_elements_text(v_modules) AS module_name
      ON CONFLICT DO NOTHING;
    END IF;

    -- 10. Create QR codes
    INSERT INTO qr_codes (school_id, user_id, user_type, qr_data, barcode_data) VALUES
      (v_school_id, v_user_id, 'admin', 'SCHOOL-' || v_school_id::text, v_school_code),
      (v_school_id, v_user_id, 'admin', 'VERIFY-' || v_school_id::text, 'VERIFY-' || v_school_code),
      (v_school_id, v_user_id, 'admin', 'PAY-' || v_school_id::text, 'PAY-' || v_school_code)
    ON CONFLICT (qr_data) DO NOTHING;

    -- 11. Notification settings
    INSERT INTO notification_settings (school_id, email_enabled, push_enabled, sms_enabled, whatsapp_enabled)
    VALUES (v_school_id, true, true, false, false)
    ON CONFLICT (school_id) DO UPDATE SET email_enabled = true, push_enabled = true;

    -- 12. Payment methods
    IF v_draft.payment_mobile_money THEN
      INSERT INTO payment_methods (school_id, name, code, is_active) VALUES (v_school_id, 'Mobile Money', 'mobile_money', true) ON CONFLICT (school_id, code) DO NOTHING;
    END IF;
    IF v_draft.payment_bank_cards THEN
      INSERT INTO payment_methods (school_id, name, code, is_active) VALUES (v_school_id, 'Cartes bancaires', 'bank_cards', true) ON CONFLICT (school_id, code) DO NOTHING;
    END IF;
    IF v_draft.payment_transfers THEN
      INSERT INTO payment_methods (school_id, name, code, is_active) VALUES (v_school_id, 'Virements', 'transfers', true) ON CONFLICT (school_id, code) DO NOTHING;
    END IF;
    IF v_draft.payment_cash THEN
      INSERT INTO payment_methods (school_id, name, code, is_active) VALUES (v_school_id, 'Espèces', 'cash', true) ON CONFLICT (school_id, code) DO NOTHING;
    END IF;

    -- 13. Academic structure
    IF jsonb_array_length(v_cycles) > 0 THEN
      INSERT INTO cycles (school_id, name)
      SELECT v_school_id, cycle_name FROM jsonb_array_elements_text(v_cycles) AS cycle_name
      ON CONFLICT DO NOTHING;
    END IF;

    IF jsonb_array_length(v_subjects) > 0 THEN
      INSERT INTO subjects (school_id, name, coefficient)
      SELECT v_school_id, (subj->>'name')::text, COALESCE((subj->>'coefficient')::real, 1)
      FROM jsonb_array_elements(v_subjects) AS subj
      WHERE subj->>'name' IS NOT NULL
        AND NOT EXISTS (SELECT 1 FROM subjects s WHERE s.school_id = v_school_id AND s.name = (subj->>'name')::text);
    END IF;

    -- 14. Default permissions
    INSERT INTO permissions (school_id, role, resource, can_create, can_read, can_update, can_delete, can_export) VALUES
      (v_school_id, 'ADMIN', 'students', true, true, true, true, true),
      (v_school_id, 'ADMIN', 'teachers', true, true, true, true, true),
      (v_school_id, 'ADMIN', 'classes', true, true, true, true, true),
      (v_school_id, 'ADMIN', 'grades', true, true, true, true, true),
      (v_school_id, 'ADMIN', 'payments', true, true, true, true, true),
      (v_school_id, 'ADMIN', 'attendance', true, true, true, true, true),
      (v_school_id, 'ADMIN', 'reports', true, true, true, true, true),
      (v_school_id, 'ADMIN', 'settings', true, true, true, true, true)
    ON CONFLICT DO NOTHING;

    -- 15. Update draft status
    UPDATE registration_drafts_v2 SET
      status = 'active', auth_user_id = v_user_id, school_id = v_school_id,
      verified_at = now(), activated_at = now()
    WHERE id = p_draft_id;

    -- 16. Log activation
    INSERT INTO registration_audit_log (draft_id, event_type, event_data)
    VALUES (p_draft_id, 'school_activated', jsonb_build_object('school_id', v_school_id, 'school_code', v_school_code, 'user_id', v_user_id));

    RETURN jsonb_build_object('success', true, 'school_id', v_school_id, 'school_code', v_school_code, 'user_id', v_user_id, 'email', v_draft.owner_email, 'school_name', v_draft.school_official_name);

  EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS v_error = MESSAGE_TEXT;
    INSERT INTO registration_audit_log (draft_id, event_type, event_data)
    VALUES (p_draft_id, 'activation_failed', jsonb_build_object('error', v_error));
    RETURN jsonb_build_object('success', false, 'error', v_error, 'code', 'ACTIVATION_FAILED');
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION enterprise_activate_school TO service_role;
