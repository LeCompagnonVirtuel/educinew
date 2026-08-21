-- Add missing columns to schools table
ALTER TABLE schools ADD COLUMN IF NOT EXISTS type TEXT;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';
ALTER TABLE schools ADD COLUMN IF NOT EXISTS subscription_plan TEXT;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS subscription_end TIMESTAMPTZ;
