-- =============================================================
-- QR SYSTEM CRITICAL FIXES — Phase 2
-- Date: 2026-07-13
-- Purpose: Fix broken trigger, scan_count, validation gaps
-- =============================================================

-- 1. CRITICAL: Ensure UNIQUE constraint on qr_codes.user_id
-- (already added in 20260713020000, but ensure it exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'qr_codes_user_id_unique'
      AND conrelid = 'qr_codes'::regclass
  ) THEN
    -- Clean up duplicates
    WITH ranked AS (
      SELECT id, user_id, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY generated_at DESC) AS rn
      FROM qr_codes WHERE user_id IS NOT NULL
    )
    DELETE FROM qr_codes WHERE id IN (SELECT id FROM ranked WHERE rn > 1);
    ALTER TABLE qr_codes ADD CONSTRAINT qr_codes_user_id_unique UNIQUE (user_id);
  END IF;
END $$;

-- 2. Fix scan_count: replace broken update with proper increment
-- The Edge Function was setting scan_count = 1 instead of incrementing
-- This is handled in the Edge Function code fix, but we also add a helper:
CREATE OR REPLACE FUNCTION increment_scan_count(p_qr_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE qr_codes
  SET scan_count = scan_count + 1,
      last_scanned_at = now()
  WHERE id = p_qr_id;
END;
$$;

GRANT EXECUTE ON FUNCTION increment_scan_count(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION increment_scan_count(UUID) TO service_role;

-- 3. Add index for faster QR lookups by qr_data (re-create if dropped)
CREATE INDEX IF NOT EXISTS idx_qr_codes_qr_data ON qr_codes(qr_data);
CREATE INDEX IF NOT EXISTS idx_qr_codes_user_active ON qr_codes(user_id, is_active) WHERE is_active = true;

-- 4. Fix the generate_unified_qr trigger to handle the UNIQUE constraint properly
CREATE OR REPLACE FUNCTION generate_unified_qr()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role_prefix TEXT;
  v_identifier TEXT;
  v_qr_data TEXT;
  v_barcode TEXT;
  v_user_id UUID;
  v_user_type TEXT;
  v_school_id UUID;
BEGIN
  -- Determine role prefix and identifier based on trigger source
  IF TG_TABLE_NAME = 'students' THEN
    v_role_prefix := 'S';
    v_identifier := COALESCE(NEW.matricule, NEW.id::text);
    v_user_id := NEW.user_id;
    v_user_type := 'STUDENT';
    v_school_id := NEW.school_id;
  ELSIF TG_TABLE_NAME = 'teachers' THEN
    v_role_prefix := 'T';
    v_identifier := COALESCE(NEW.employee_code, NEW.matricule, NEW.id::text);
    v_user_id := NEW.user_id;
    v_user_type := 'TEACHER';
    v_school_id := NEW.school_id;
  ELSIF TG_TABLE_NAME = 'staff' THEN
    v_role_prefix := 'P';
    v_identifier := COALESCE(NEW.employee_code, NEW.id::text);
    v_user_id := NEW.user_id;
    v_user_type := 'STAFF';
    v_school_id := NEW.school_id;
  ELSIF TG_TABLE_NAME = 'parents' THEN
    v_role_prefix := 'R';
    v_identifier := NEW.user_id::text;
    v_user_id := NEW.user_id;
    v_user_type := 'PARENT';
    v_school_id := NEW.school_id;
  ELSE
    RETURN NEW;
  END IF;

  -- Skip if no user_id
  IF v_user_id IS NULL THEN
    RETURN NEW;
  END IF;

  -- Build unified QR data format
  v_qr_data := 'EDUCI:' || v_role_prefix || ':' || v_identifier || ':' || v_user_id;
  v_barcode := 'EDUCI' || v_role_prefix || REPLACE(LEFT(v_identifier, 12), '-', '');

  -- Insert or update QR code record (UNIQUE constraint on user_id now exists)
  INSERT INTO qr_codes (
    school_id, user_id, user_type, qr_type,
    qr_data, barcode_data, is_active,
    generated_at, metadata
  ) VALUES (
    v_school_id, v_user_id, v_user_type, 'ATTENDANCE',
    v_qr_data, v_barcode, true,
    now(), jsonb_build_object('source', 'auto_trigger', 'table', TG_TABLE_NAME)
  )
  ON CONFLICT (user_id) DO UPDATE SET
    qr_data = EXCLUDED.qr_data,
    barcode_data = EXCLUDED.barcode_data,
    is_active = true,
    school_id = EXCLUDED.school_id,
    user_type = EXCLUDED.user_type,
    generated_at = now(),
    metadata = EXCLUDED.metadata;

  RETURN NEW;
END;
$$;
