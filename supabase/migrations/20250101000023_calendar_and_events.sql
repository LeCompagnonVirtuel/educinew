-- School events, holidays, and exam periods for CalendarSettings

-- Holidays (public and school-specific)
CREATE TABLE IF NOT EXISTS school_holidays (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  holiday_type TEXT NOT NULL DEFAULT 'PUBLIC' CHECK (holiday_type IN ('PUBLIC', 'SCHOOL', 'REGIONAL')),
  is_recurring BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(school_id, name, start_date)
);

-- School events (exams, ceremonies, parent meetings, etc.)
CREATE TABLE IF NOT EXISTS school_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL DEFAULT 'OTHER' CHECK (event_type IN ('EXAM', 'CEREMONY', 'PARENT_MEETING', 'HOLIDAY', 'TRAINING', 'OTHER')),
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  all_day BOOLEAN DEFAULT false,
  location TEXT,
  color TEXT DEFAULT '#4F46E5',
  recurrence TEXT CHECK (recurrence IN ('NONE', 'WEEKLY', 'MONTHLY', 'YEARLY')),
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS policies
ALTER TABLE school_holidays ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "school_holidays_school_isolation" ON school_holidays
  FOR ALL USING (school_id = (SELECT school_id FROM users WHERE id = auth.uid()));

CREATE POLICY "school_events_school_isolation" ON school_events
  FOR ALL USING (school_id = (SELECT school_id FROM users WHERE id = auth.uid()));

-- Indexes
CREATE INDEX IF NOT EXISTS idx_school_holidays_school_id ON school_holidays(school_id);
CREATE INDEX IF NOT EXISTS idx_school_holidays_dates ON school_holidays(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_school_events_school_id ON school_events(school_id);
CREATE INDEX IF NOT EXISTS idx_school_events_dates ON school_events(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_school_events_type ON school_events(event_type);
