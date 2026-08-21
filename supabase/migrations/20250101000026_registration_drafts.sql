-- Registration drafts table for persisting incomplete registrations
CREATE TABLE IF NOT EXISTS registration_drafts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'abandoned')),
  
  -- Admin info
  admin_name TEXT,
  admin_email TEXT,
  admin_phone TEXT,
  
  -- School info
  school_name TEXT,
  school_type TEXT DEFAULT 'PRIMAIRE_ET_SECONDAIRE',
  school_acronym TEXT,
  country TEXT DEFAULT 'Côte d''Ivoire',
  region TEXT,
  city TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  
  -- Branding
  logo_url TEXT,
  logo_monochrome_url TEXT,
  favicon_url TEXT,
  stamp_url TEXT,
  signature_url TEXT,
  slogan TEXT,
  motto TEXT,
  primary_color TEXT DEFAULT '#4F46E5',
  secondary_color TEXT DEFAULT '#60A5FA',
  
  -- Academic
  academic_year_start INTEGER,
  cycles JSONB DEFAULT '["PRIMAIRE", "SECONDAIRE"]'::jsonb,
  grading_scale INTEGER DEFAULT 20,
  passing_grade NUMERIC DEFAULT 10,
  
  -- Modules
  modules JSONB DEFAULT '["students", "teachers", "grades", "attendance", "payments", "messages", "announcements"]'::jsonb,
  
  -- Payment config
  payment_providers JSONB DEFAULT '{}'::jsonb,
  
  -- Notification config
  notification_channels JSONB DEFAULT '{"email": true, "push": true, "sms": false, "whatsapp": false}'::jsonb,
  
  -- Metadata
  current_step INTEGER DEFAULT 0,
  total_steps INTEGER DEFAULT 8,
  school_id UUID,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS policies
ALTER TABLE registration_drafts ENABLE ROW LEVEL SECURITY;

-- Users can only see their own drafts
CREATE POLICY "Users can view own drafts" ON registration_drafts
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own drafts
CREATE POLICY "Users can insert own drafts" ON registration_drafts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own drafts
CREATE POLICY "Users can update own drafts" ON registration_drafts
  FOR UPDATE USING (auth.uid() = user_id);

-- Service role can do everything
CREATE POLICY "Service role full access" ON registration_drafts
  FOR ALL USING (auth.role() = 'service_role');

-- Index for quick lookups
CREATE INDEX idx_registration_drafts_user_id ON registration_drafts(user_id);
CREATE INDEX idx_registration_drafts_status ON registration_drafts(status);
CREATE INDEX idx_registration_drafts_user_status ON registration_drafts(user_id, status);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_registration_drafts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_registration_drafts
  BEFORE UPDATE ON registration_drafts
  FOR EACH ROW
  EXECUTE FUNCTION update_registration_drafts_updated_at();
