-- ============================================================================
-- EduCI — Enterprise Account Creation System
-- Auto-generates: identifiers, invitation codes, school codes, QR codes
-- ============================================================================

-- ============================================================================
-- 1. CITY ABBREVIATIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS city_abbreviations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_name TEXT NOT NULL UNIQUE,
  abbreviation TEXT NOT NULL UNIQUE,
  country TEXT DEFAULT 'CI',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed major cities
INSERT INTO city_abbreviations (city_name, abbreviation, country) VALUES
  ('Abidjan', 'ABJ', 'CI'),
  ('Yamoussoukro', 'YAM', 'CI'),
  ('Bouaké', 'BKE', 'CI'),
  ('Korhogo', 'KOR', 'CI'),
  ('Daloa', 'DAL', 'CI'),
  ('San Pedro', 'SPD', 'CI'),
  ('Man', 'MAN', 'CI'),
  ('Odienné', 'ODI', 'CI'),
  ('Gagnoa', 'GAG', 'CI'),
  ('Abengourou', 'ABG', 'CI'),
  ('Anyama', 'ANY', 'CI'),
  ('Bingerville', 'BIN', 'CI'),
  ('Grand-Bassam', 'GBA', 'CI'),
  ('Cocody', 'COC', 'CI'),
  ('Marcory', 'MAR', 'CI'),
  ('Treichville', 'TRV', 'CI'),
  ('Plateau', 'PLT', 'CI'),
  ('Adjamé', 'ADJ', 'CI'),
  ('Yopougon', 'YOP', 'CI'),
  ('Koumassi', 'KOU', 'CI'),
  ('Port-Bouët', 'PBT', 'CI'),
  ('Dakar', 'DKR', 'SN'),
  ('Lomé', 'LON', 'TG'),
  ('Cotonou', 'COO', 'BJ'),
  ('Douala', 'DLA', 'CM'),
  ('Yaoundé', 'YDE', 'CM'),
  ('Lagos', 'LOS', 'NG'),
  ('Accra', 'ACC', 'GH'),
  ('Bamako', 'BAM', 'ML'),
  ('Ouagadougou', 'OUA', 'BF'),
  ('Niamey', 'NIM', 'NE'),
  ('Kinshasa', 'KIN', 'CD'),
  ('Libreville', 'LBV', 'GA'),
  ('Brazzaville', 'BZV', 'CG'),
  ('N''Djamena', 'NDJ', 'TD'),
  ('Malabo', 'SSG', 'GQ'),
  ('Bangui', 'BGF', 'CF'),
  ('Conakry', 'CKY', 'GN'),
  ('Freetown', 'FNA', 'SL'),
  ('Monrovia', 'ROB', 'LR'),
  ('Nouakchott', 'NKC', 'MR')
ON CONFLICT (city_name) DO NOTHING;

-- ============================================================================
-- 2. ADD COLUMNS TO SCHOOLS TABLE
-- ============================================================================
DO $$ BEGIN ALTER TABLE schools ADD COLUMN IF NOT EXISTS school_code TEXT UNIQUE; EXCEPTION WHEN duplicate_column THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE schools ADD COLUMN IF NOT EXISTS city_abbreviation TEXT; EXCEPTION WHEN duplicate_column THEN NULL; END $$;

-- ============================================================================
-- 3. ADD COLUMNS TO USERS TABLE
-- ============================================================================
DO $$ BEGIN ALTER TABLE users ADD COLUMN IF NOT EXISTS identifier TEXT UNIQUE; EXCEPTION WHEN duplicate_column THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE users ADD COLUMN IF NOT EXISTS invitation_code TEXT UNIQUE; EXCEPTION WHEN duplicate_column THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE users ADD COLUMN IF NOT EXISTS temp_password TEXT; EXCEPTION WHEN duplicate_column THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE users ADD COLUMN IF NOT EXISTS activation_token TEXT UNIQUE; EXCEPTION WHEN duplicate_column THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE users ADD COLUMN IF NOT EXISTS activation_expires_at TIMESTAMPTZ; EXCEPTION WHEN duplicate_column THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE users ADD COLUMN IF NOT EXISTS is_activated BOOLEAN DEFAULT true; EXCEPTION WHEN duplicate_column THEN NULL; END $$;

-- ============================================================================
-- 4. INDEXES
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_users_identifier ON users(identifier);
CREATE INDEX IF NOT EXISTS idx_users_invitation_code ON users(invitation_code);
CREATE INDEX IF NOT EXISTS idx_schools_school_code ON schools(school_code);
CREATE INDEX IF NOT EXISTS idx_city_abbreviations_city ON city_abbreviations(city_name);

-- ============================================================================
-- 5. FUNCTION: Get city abbreviation
-- ============================================================================
CREATE OR REPLACE FUNCTION get_city_abbreviation(p_city TEXT)
RETURNS TEXT AS $$
DECLARE
  v_abbr TEXT;
BEGIN
  SELECT abbreviation INTO v_abbr FROM city_abbreviations WHERE LOWER(city_name) = LOWER(p_city);
  IF v_abbr IS NOT NULL THEN RETURN v_abbr; END IF;
  -- Auto-generate from city name
  v_abbr := UPPER(LEFT(REGEXP_REPLACE(p_city, '[^a-zA-Z]', '', 'g'), 3));
  IF LENGTH(v_abbr) < 3 THEN v_abbr := RPAD(v_abbr, 3, 'X'); END IF;
  RETURN v_abbr;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 6. FUNCTION: Generate school code (EDUCI-SYS-XXX-XXXXX)
-- ============================================================================
CREATE OR REPLACE FUNCTION generate_school_code_v2(p_city TEXT, p_school_id UUID)
RETURNS TEXT AS $$
DECLARE
  v_abbr TEXT;
  v_seq INT;
  v_code TEXT;
BEGIN
  v_abbr := get_city_abbreviation(p_city);
  -- Get next sequence number for this city
  SELECT COALESCE(MAX(CAST(RIGHT(school_code, 5) AS INT)), 0) + 1
  INTO v_seq
  FROM schools
  WHERE school_code LIKE 'EDUCI-SYS-' || v_abbr || '-%';
  v_code := 'EDUCI-SYS-' || v_abbr || '-' || LPAD(v_seq::TEXT, 5, '0');
  RETURN v_code;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 7. FUNCTION: Generate user identifier (ELV-2026-000245)
-- ============================================================================
CREATE OR REPLACE FUNCTION generate_user_identifier(p_role TEXT, p_school_id UUID)
RETURNS TEXT AS $$
DECLARE
  v_prefix TEXT;
  v_year TEXT;
  v_seq INT;
  v_id TEXT;
BEGIN
  v_year := EXTRACT(YEAR FROM now())::TEXT;
  CASE p_role
    WHEN 'STUDENT' THEN v_prefix := 'ELV';
    WHEN 'TEACHER' THEN v_prefix := 'ENS';
    WHEN 'PARENT' THEN v_prefix := 'PRT';
    WHEN 'ADMIN' THEN v_prefix := 'ADM';
    WHEN 'COMPTABLE' THEN v_prefix := 'CPT';
    WHEN 'SECRETAIRE' THEN v_prefix := 'SEC';
    WHEN 'CENSEUR' THEN v_prefix := 'CNS';
    WHEN 'SURVEILLANT' THEN v_prefix := 'SRV';
    WHEN 'DIRECTEUR' THEN v_prefix := 'DIR';
    WHEN 'CHAUFFEUR' THEN v_prefix := 'CHF';
    ELSE v_prefix := 'USR';
  END CASE;

  SELECT COALESCE(MAX(CAST(SPLIT_PART(identifier, '-', 3) AS INT)), 0) + 1
  INTO v_seq
  FROM users
  WHERE school_id = p_school_id
    AND identifier LIKE v_prefix || '-' || v_year || '-%';

  v_id := v_prefix || '-' || v_year || '-' || LPAD(v_seq::TEXT, 6, '0');
  RETURN v_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 8. FUNCTION: Generate invitation code (INV-H4K9-MQ8L-72PX)
-- ============================================================================
CREATE OR REPLACE FUNCTION generate_invitation_code()
RETURNS TEXT AS $$
DECLARE
  v_chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  v_code TEXT := 'INV-';
  i INT;
BEGIN
  FOR i IN 1..4 LOOP
    v_code := v_code || substr(v_chars, floor(random() * length(v_chars) + 1)::int, 1);
  END LOOP;
  v_code := v_code || '-';
  FOR i IN 1..4 LOOP
    v_code := v_code || substr(v_chars, floor(random() * length(v_chars) + 1)::int, 1);
  END LOOP;
  v_code := v_code || '-';
  FOR i IN 1..4 LOOP
    v_code := v_code || substr(v_chars, floor(random() * length(v_chars) + 1)::int, 1);
  END LOOP;
  RETURN v_code;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 9. FUNCTION: Generate secure temp password
-- ============================================================================
CREATE OR REPLACE FUNCTION generate_temp_password()
RETURNS TEXT AS $$
DECLARE
  v_upper TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  v_lower TEXT := 'abcdefghjkmnpqrstuvwxyz';
  v_digits TEXT := '23456789';
  v_special TEXT := '@#$%&*!';
  v_pass TEXT := '';
  i INT;
BEGIN
  -- Ensure at least one of each type
  v_pass := v_pass || substr(v_upper, floor(random() * length(v_upper) + 1)::int, 1);
  v_pass := v_pass || substr(v_lower, floor(random() * length(v_lower) + 1)::int, 1);
  v_pass := v_pass || substr(v_digits, floor(random() * length(v_digits) + 1)::int, 1);
  v_pass := v_pass || substr(v_special, floor(random() * length(v_special) + 1)::int, 1);
  -- Fill remaining 4 chars
  FOR i IN 1..4 LOOP
    v_pass := v_pass || substr(v_upper || v_lower || v_digits, floor(random() * (length(v_upper) + length(v_lower) + length(v_digits)) + 1)::int, 1);
  END LOOP;
  RETURN v_pass;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 10. FUNCTION: resolve_login_identifier (enhanced to support identifiers)
-- ============================================================================
CREATE OR REPLACE FUNCTION resolve_login_identifier(p_identifier TEXT)
RETURNS TEXT AS $$
DECLARE
  v_email TEXT;
BEGIN
  -- Already an email
  IF p_identifier LIKE '%@%' THEN RETURN p_identifier; END IF;
  -- Try identifier (ELV-2026-000245)
  SELECT email INTO v_email FROM users WHERE identifier = UPPER(p_identifier) AND is_active = true;
  IF v_email IS NOT NULL THEN RETURN v_email; END IF;
  -- Try matricule (students)
  SELECT u.email INTO v_email FROM students s JOIN users u ON s.user_id = u.id WHERE s.matricule = UPPER(p_identifier) AND u.is_active = true;
  IF v_email IS NOT NULL THEN RETURN v_email; END IF;
  -- Try phone
  SELECT email INTO v_email FROM users WHERE phone = p_identifier AND is_active = true;
  IF v_email IS NOT NULL THEN RETURN v_email; END IF;
  -- Try invitation code
  SELECT email INTO v_email FROM users WHERE invitation_code = UPPER(p_identifier) AND is_active = true;
  RETURN v_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 11. FUNCTION: Create user with full enterprise features
-- ============================================================================
CREATE OR REPLACE FUNCTION create_enterprise_user(
  p_school_id UUID,
  p_name TEXT,
  p_email TEXT,
  p_role TEXT,
  p_phone TEXT DEFAULT NULL,
  p_class_id UUID DEFAULT NULL,
  p_subject_id UUID DEFAULT NULL,
  p_position TEXT DEFAULT NULL,
  p_department TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  v_identifier TEXT;
  v_invitation_code TEXT;
  v_temp_password TEXT;
  v_activation_token TEXT;
  v_school_code TEXT;
  v_user_id UUID;
  v_result JSONB;
BEGIN
  -- Generate all auto-fields
  v_identifier := generate_user_identifier(p_role, p_school_id);
  v_invitation_code := generate_invitation_code();
  v_temp_password := generate_temp_password();
  v_activation_token := encode(gen_random_bytes(16), 'hex');

  -- Get school code
  SELECT school_code INTO v_school_code FROM schools WHERE id = p_school_id;

  -- Create auth user via admin API (done in application code)
  -- This function returns the generated data for the application to use

  v_result := jsonb_build_object(
    'identifier', v_identifier,
    'invitation_code', v_invitation_code,
    'temp_password', v_temp_password,
    'activation_token', v_activation_token,
    'school_code', v_school_code,
    'expires_at', (now() + interval '7 days')::text
  );

  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 12. TRIGGER: Auto-generate school code on school creation
-- ============================================================================
CREATE OR REPLACE FUNCTION auto_generate_school_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.school_code IS NULL THEN
    NEW.school_code := generate_school_code_v2(NEW.city, NEW.id);
  END IF;
  IF NEW.city_abbreviation IS NULL THEN
    NEW.city_abbreviation := get_city_abbreviation(NEW.city);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_school_created_code ON schools;
CREATE TRIGGER on_school_created_code
  BEFORE INSERT ON schools
  FOR EACH ROW EXECUTE FUNCTION auto_generate_school_code();

-- ============================================================================
-- 13. TRIGGER: Auto-generate identifier on user creation
-- ============================================================================
CREATE OR REPLACE FUNCTION auto_generate_user_identifier()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.identifier IS NULL THEN
    NEW.identifier := generate_user_identifier(NEW.role, NEW.school_id);
  END IF;
  IF NEW.invitation_code IS NULL THEN
    NEW.invitation_code := generate_invitation_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_user_created_identifier ON users;
CREATE TRIGGER on_user_created_identifier
  BEFORE INSERT ON users
  FOR EACH ROW EXECUTE FUNCTION auto_generate_user_identifier();

-- ============================================================================
-- 14. RLS for city_abbreviations
-- ============================================================================
ALTER TABLE city_abbreviations ENABLE ROW LEVEL SECURITY;

CREATE POLICY city_abbreviations_select ON city_abbreviations
  FOR SELECT USING (true);

-- ============================================================================
-- 15. GRANTS
-- ============================================================================
GRANT EXECUTE ON FUNCTION get_city_abbreviation TO authenticated;
GRANT EXECUTE ON FUNCTION generate_school_code_v2 TO service_role;
GRANT EXECUTE ON FUNCTION generate_user_identifier TO service_role;
GRANT EXECUTE ON FUNCTION generate_invitation_code TO service_role;
GRANT EXECUTE ON FUNCTION generate_temp_password TO service_role;
GRANT EXECUTE ON FUNCTION create_enterprise_user TO service_role;
GRANT EXECUTE ON FUNCTION resolve_login_identifier TO authenticated;
