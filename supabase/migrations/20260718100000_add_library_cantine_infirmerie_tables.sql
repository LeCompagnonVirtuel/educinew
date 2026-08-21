-- Migration: Add Library, Cantine, and Infirmerie modules tables
-- Date: 2026-07-18

-- ═══════════════════════════════════════════════════════════════
-- LIBRARY MODULE
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS library_books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  isbn TEXT,
  category TEXT NOT NULL DEFAULT 'Autre',
  total_copies INTEGER NOT NULL DEFAULT 1,
  available_copies INTEGER NOT NULL DEFAULT 1,
  publisher TEXT,
  publication_year INTEGER,
  description TEXT,
  cover_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS library_loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  book_id UUID NOT NULL REFERENCES library_books(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  borrowed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  due_date DATE NOT NULL,
  returned_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'BORROWED',
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_library_books_school ON library_books(school_id);
CREATE INDEX IF NOT EXISTS idx_library_loans_school ON library_loans(school_id);
CREATE INDEX IF NOT EXISTS idx_library_loans_student ON library_loans(student_id);
CREATE INDEX IF NOT EXISTS idx_library_loans_book ON library_loans(book_id);
CREATE INDEX IF NOT EXISTS idx_library_loans_status ON library_loans(school_id, status);

-- RLS
ALTER TABLE library_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_loans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "library_books_school_isolation" ON library_books
  FOR ALL USING (school_id = (current_setting('app.current_school_id', true))::uuid);

CREATE POLICY "library_loans_school_isolation" ON library_loans
  FOR ALL USING (school_id = (current_setting('app.current_school_id', true))::uuid);

-- ═══════════════════════════════════════════════════════════════
-- CANTINE MODULE
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS cantine_menus (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  meal_type TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL DEFAULT 0,
  allergens TEXT,
  is_vegetarian BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  week_start DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cantine_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL DEFAULT 'Mensuel',
  start_date DATE NOT NULL,
  end_date DATE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cantine_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  menu_id UUID REFERENCES cantine_menus(id) ON DELETE SET NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'PENDING',
  served_at TIMESTAMPTZ,
  served_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cantine_menus_school ON cantine_menus(school_id);
CREATE INDEX IF NOT EXISTS idx_cantine_subscriptions_school ON cantine_subscriptions(school_id);
CREATE INDEX IF NOT EXISTS idx_cantine_orders_school_date ON cantine_orders(school_id, date);
CREATE INDEX IF NOT EXISTS idx_cantine_orders_student ON cantine_orders(student_id);

-- RLS
ALTER TABLE cantine_menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE cantine_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cantine_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cantine_menus_school_isolation" ON cantine_menus
  FOR ALL USING (school_id = (current_setting('app.current_school_id', true))::uuid);

CREATE POLICY "cantine_subscriptions_school_isolation" ON cantine_subscriptions
  FOR ALL USING (school_id = (current_setting('app.current_school_id', true))::uuid);

CREATE POLICY "cantine_orders_school_isolation" ON cantine_orders
  FOR ALL USING (school_id = (current_setting('app.current_school_id', true))::uuid);

-- ═══════════════════════════════════════════════════════════════
-- INFIRMERIE MODULE
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS infirmerie_consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  date TIMESTAMPTZ NOT NULL DEFAULT now(),
  symptoms TEXT,
  diagnosis TEXT,
  treatment TEXT,
  medication TEXT,
  severity TEXT NOT NULL DEFAULT 'faible' CHECK (severity IN ('faible', 'moyen', 'urgent', 'critique')),
  notes TEXT,
  notify_parent BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'en_cours' CHECK (status IN ('en_cours', 'termine', 'en_attente')),
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS infirmerie_dossiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id UUID NOT NULL UNIQUE REFERENCES students(id) ON DELETE CASCADE,
  blood_type TEXT,
  allergies TEXT,
  chronic_conditions TEXT,
  vaccinations JSONB DEFAULT '[]'::jsonb,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  notes TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS infirmerie_medications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  unit TEXT NOT NULL DEFAULT 'comprimé',
  expiry_date DATE,
  min_stock_alert INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_infirmerie_consultations_school ON infirmerie_consultations(school_id);
CREATE INDEX IF NOT EXISTS idx_infirmerie_consultations_student ON infirmerie_consultations(student_id);
CREATE INDEX IF NOT EXISTS idx_infirmerie_dossiers_school ON infirmerie_dossiers(school_id);
CREATE INDEX IF NOT EXISTS idx_infirmerie_medications_school ON infirmerie_medications(school_id);

-- RLS
ALTER TABLE infirmerie_consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE infirmerie_dossiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE infirmerie_medications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "infirmerie_consultations_school_isolation" ON infirmerie_consultations
  FOR ALL USING (school_id = (current_setting('app.current_school_id', true))::uuid);

CREATE POLICY "infirmerie_dossiers_school_isolation" ON infirmerie_dossiers
  FOR ALL USING (school_id = (current_setting('app.current_school_id', true))::uuid);

CREATE POLICY "infirmerie_medications_school_isolation" ON infirmerie_medications
  FOR ALL USING (school_id = (current_setting('app.current_school_id', true))::uuid);

-- ═══════════════════════════════════════════════════════════════
-- SCHOOL YEARS TABLE (ensure it exists for nouvelle-annee)
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS school_years (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT false,
  is_archived BOOLEAN NOT NULL DEFAULT false,
  config JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_school_years_school ON school_years(school_id);
CREATE INDEX IF NOT EXISTS idx_school_years_active ON school_years(school_id, is_active);

ALTER TABLE school_years ENABLE ROW LEVEL SECURITY;

CREATE POLICY "school_years_school_isolation" ON school_years
  FOR ALL USING (school_id = (current_setting('app.current_school_id', true))::uuid);

-- Add DIRECTEUR to users role check if applicable
COMMENT ON TABLE library_books IS 'Library book catalog - isolated by school_id';
COMMENT ON TABLE library_loans IS 'Library loan tracking - isolated by school_id';
COMMENT ON TABLE cantine_menus IS 'Cafeteria weekly menus - isolated by school_id';
COMMENT ON TABLE cantine_subscriptions IS 'Student cafeteria subscriptions - isolated by school_id';
COMMENT ON TABLE cantine_orders IS 'Daily cafeteria orders and service - isolated by school_id';
COMMENT ON TABLE infirmerie_consultations IS 'Infirmary visit records - isolated by school_id';
COMMENT ON TABLE infirmerie_dossiers IS 'Student medical records - isolated by school_id';
COMMENT ON TABLE infirmerie_medications IS 'Infirmary medication inventory - isolated by school_id';
COMMENT ON TABLE school_years IS 'Academic year management - isolated by school_id';
