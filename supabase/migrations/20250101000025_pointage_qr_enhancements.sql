-- Add missing columns to attendance table for QR scanning
ALTER TABLE attendance
  ADD COLUMN IF NOT EXISTS method TEXT DEFAULT 'MANUAL',
  ADD COLUMN IF NOT EXISTS device TEXT,
  ADD COLUMN IF NOT EXISTS operator TEXT,
  ADD COLUMN IF NOT EXISTS latitude REAL,
  ADD COLUMN IF NOT EXISTS longitude REAL;

-- QR codes for classes (daily class attendance QR)
CREATE TABLE IF NOT EXISTS class_qr_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  academic_year_id UUID REFERENCES academic_years(id),
  qr_token TEXT NOT NULL UNIQUE,
  qr_data TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  scan_count INTEGER DEFAULT 0,
  last_scanned_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE class_qr_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "class_qr_codes_school_isolation" ON class_qr_codes
  FOR ALL USING (school_id = (SELECT school_id FROM users WHERE id = auth.uid()));

CREATE INDEX IF NOT EXISTS idx_class_qr_school ON class_qr_codes(school_id);
CREATE INDEX IF NOT EXISTS idx_class_qr_class ON class_qr_codes(class_id);
CREATE INDEX IF NOT EXISTS idx_class_qr_token ON class_qr_codes(qr_token);
CREATE INDEX IF NOT EXISTS idx_class_qr_active ON class_qr_codes(is_active) WHERE is_active = true;
