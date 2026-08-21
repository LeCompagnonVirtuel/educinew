-- =====================================================
-- PAYMENT INFRASTRUCTURE ENTERPRISE
-- Multi-tenant payment system with provider abstraction
-- =====================================================

-- =====================================================
-- 1. ENHANCED payment_gateway_configs
-- =====================================================
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'payment_gateway_configs') THEN
    ALTER TABLE payment_gateway_configs ADD COLUMN IF NOT EXISTS credentials JSONB DEFAULT '{}';
    ALTER TABLE payment_gateway_configs ADD COLUMN IF NOT EXISTS sandbox BOOLEAN DEFAULT false;
    ALTER TABLE payment_gateway_configs ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'XOF';
    ALTER TABLE payment_gateway_configs ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'CI';
    ALTER TABLE payment_gateway_configs ADD COLUMN IF NOT EXISTS last_test_at TIMESTAMPTZ;
    ALTER TABLE payment_gateway_configs ADD COLUMN IF NOT EXISTS last_test_result TEXT;
    ALTER TABLE payment_gateway_configs ADD COLUMN IF NOT EXISTS last_test_error TEXT;
    ALTER TABLE payment_gateway_configs ADD COLUMN IF NOT EXISTS webhook_url TEXT;
    ALTER TABLE payment_gateway_configs ADD COLUMN IF NOT EXISTS return_url TEXT;
    ALTER TABLE payment_gateway_configs ADD COLUMN IF NOT EXISTS cancel_url TEXT;
  ELSE
    CREATE TABLE payment_gateway_configs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
      gateway_name TEXT NOT NULL,
      credentials JSONB DEFAULT '{}',
      sandbox BOOLEAN DEFAULT false,
      currency TEXT DEFAULT 'XOF',
      country TEXT DEFAULT 'CI',
      is_active BOOLEAN DEFAULT true,
      last_test_at TIMESTAMPTZ,
      last_test_result TEXT,
      last_test_error TEXT,
      webhook_url TEXT,
      return_url TEXT,
      cancel_url TEXT,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now(),
      UNIQUE(school_id, gateway_name)
    );
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_payment_gateway_configs_school ON payment_gateway_configs(school_id);
CREATE INDEX IF NOT EXISTS idx_payment_gateway_configs_active ON payment_gateway_configs(school_id, is_active) WHERE is_active = true;

-- =====================================================
-- 2. ENHANCED fee_categories
-- =====================================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'fee_categories') THEN
    CREATE TABLE fee_categories (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'OTHER',
      amount NUMERIC(12,2) NOT NULL DEFAULT 0,
      currency TEXT DEFAULT 'XOF',
      frequency TEXT DEFAULT 'ONCE',
      mandatory BOOLEAN DEFAULT true,
      applicable_cycles JSONB,
      applicable_levels JSONB,
      applicable_classes JSONB,
      description TEXT,
      due_date DATE,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    );
  ELSE
    ALTER TABLE fee_categories ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'OTHER';
    ALTER TABLE fee_categories ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'XOF';
    ALTER TABLE fee_categories ADD COLUMN IF NOT EXISTS frequency TEXT DEFAULT 'ONCE';
    ALTER TABLE fee_categories ADD COLUMN IF NOT EXISTS mandatory BOOLEAN DEFAULT true;
    ALTER TABLE fee_categories ADD COLUMN IF NOT EXISTS applicable_cycles JSONB;
    ALTER TABLE fee_categories ADD COLUMN IF NOT EXISTS applicable_levels JSONB;
    ALTER TABLE fee_categories ADD COLUMN IF NOT EXISTS applicable_classes JSONB;
    ALTER TABLE fee_categories ADD COLUMN IF NOT EXISTS description TEXT;
    ALTER TABLE fee_categories ADD COLUMN IF NOT EXISTS due_date DATE;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_fee_categories_school ON fee_categories(school_id);

-- =====================================================
-- 3. ENHANCED invoices
-- =====================================================
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'invoices') THEN
    ALTER TABLE invoices ADD COLUMN IF NOT EXISTS items JSONB;
    ALTER TABLE invoices ADD COLUMN IF NOT EXISTS description TEXT;
    ALTER TABLE invoices ADD COLUMN IF NOT EXISTS student_id UUID;
    ALTER TABLE invoices ADD COLUMN IF NOT EXISTS paid_amount NUMERIC(12,2) DEFAULT 0;
    ALTER TABLE invoices ADD COLUMN IF NOT EXISTS reference TEXT;
    ALTER TABLE invoices ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'XOF';
    ALTER TABLE invoices ADD COLUMN IF NOT EXISTS due_date DATE;
  ELSE
    CREATE TABLE invoices (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
      student_id UUID,
      reference TEXT NOT NULL UNIQUE,
      amount NUMERIC(12,2) NOT NULL,
      paid_amount NUMERIC(12,2) DEFAULT 0,
      currency TEXT DEFAULT 'XOF',
      status TEXT DEFAULT 'PENDING',
      due_date DATE,
      items JSONB,
      description TEXT,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    );
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_invoices_school ON invoices(school_id);
CREATE INDEX IF NOT EXISTS idx_invoices_student ON invoices(student_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(school_id, status);
CREATE INDEX IF NOT EXISTS idx_invoices_reference ON invoices(reference);

-- =====================================================
-- 4. ENHANCED payment_transactions
-- =====================================================
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'payment_transactions') THEN
    ALTER TABLE payment_transactions ADD COLUMN IF NOT EXISTS student_id UUID;
    ALTER TABLE payment_transactions ADD COLUMN IF NOT EXISTS payment_url TEXT;
    ALTER TABLE payment_transactions ADD COLUMN IF NOT EXISTS provider_reference TEXT;
    ALTER TABLE payment_transactions ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'XOF';
    ALTER TABLE payment_transactions ADD COLUMN IF NOT EXISTS school_id UUID;
    ALTER TABLE payment_transactions ADD COLUMN IF NOT EXISTS reference TEXT;
    ALTER TABLE payment_transactions ADD COLUMN IF NOT EXISTS invoice_id UUID;
    ALTER TABLE payment_transactions ADD COLUMN IF NOT EXISTS gateway_response JSONB;
    ALTER TABLE payment_transactions ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ;
    ALTER TABLE payment_transactions ADD COLUMN IF NOT EXISTS payment_method TEXT;
    ALTER TABLE payment_transactions ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'PENDING';
  ELSE
    CREATE TABLE payment_transactions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
      invoice_id UUID,
      student_id UUID,
      amount NUMERIC(12,2) NOT NULL,
      currency TEXT DEFAULT 'XOF',
      payment_method TEXT NOT NULL,
      status TEXT DEFAULT 'PENDING',
      reference TEXT NOT NULL UNIQUE,
      provider_reference TEXT,
      payment_url TEXT,
      gateway_response JSONB,
      completed_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    );
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_payment_transactions_school ON payment_transactions(school_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_reference ON payment_transactions(reference);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_status ON payment_transactions(school_id, status);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_invoice ON payment_transactions(invoice_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_student ON payment_transactions(student_id);

-- =====================================================
-- 5. transaction_logs (audit trail)
-- =====================================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'transaction_logs') THEN
    CREATE TABLE transaction_logs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
      transaction_id UUID,
      action TEXT NOT NULL,
      status TEXT,
      amount NUMERIC(12,2),
      reference TEXT,
      gateway_response JSONB,
      created_at TIMESTAMPTZ DEFAULT now()
    );
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_transaction_logs_school ON transaction_logs(school_id);
CREATE INDEX IF NOT EXISTS idx_transaction_logs_transaction ON transaction_logs(transaction_id);

-- =====================================================
-- 6. RLS Policies
-- =====================================================
DO $$
BEGIN
  -- payment_gateway_configs
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'payment_gateway_configs') THEN
    ALTER TABLE payment_gateway_configs ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS payment_gateway_configs_select ON payment_gateway_configs;
    DROP POLICY IF EXISTS payment_gateway_configs_insert ON payment_gateway_configs;
    DROP POLICY IF EXISTS payment_gateway_configs_update ON payment_gateway_configs;
    DROP POLICY IF EXISTS payment_gateway_configs_delete ON payment_gateway_configs;

    CREATE POLICY payment_gateway_configs_select ON payment_gateway_configs FOR SELECT USING (school_id = get_user_school_id() OR is_super_admin());
    CREATE POLICY payment_gateway_configs_insert ON payment_gateway_configs FOR INSERT WITH CHECK (school_id = get_user_school_id() AND get_user_role() IN ('ADMIN', 'COMPTABLE'));
    CREATE POLICY payment_gateway_configs_update ON payment_gateway_configs FOR UPDATE USING (school_id = get_user_school_id() AND get_user_role() IN ('ADMIN', 'COMPTABLE'));
    CREATE POLICY payment_gateway_configs_delete ON payment_gateway_configs FOR DELETE USING (school_id = get_user_school_id() AND get_user_role() = 'ADMIN');
  END IF;

  -- fee_categories
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'fee_categories') THEN
    ALTER TABLE fee_categories ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS fee_categories_select ON fee_categories;
    DROP POLICY IF EXISTS fee_categories_insert ON fee_categories;
    DROP POLICY IF EXISTS fee_categories_update ON fee_categories;
    DROP POLICY IF EXISTS fee_categories_delete ON fee_categories;

    CREATE POLICY fee_categories_select ON fee_categories FOR SELECT USING (school_id = get_user_school_id() OR is_super_admin());
    CREATE POLICY fee_categories_insert ON fee_categories FOR INSERT WITH CHECK (school_id = get_user_school_id() AND get_user_role() IN ('ADMIN', 'COMPTABLE'));
    CREATE POLICY fee_categories_update ON fee_categories FOR UPDATE USING (school_id = get_user_school_id() AND get_user_role() IN ('ADMIN', 'COMPTABLE'));
    CREATE POLICY fee_categories_delete ON fee_categories FOR DELETE USING (school_id = get_user_school_id() AND get_user_role() = 'ADMIN');
  END IF;

  -- transaction_logs
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'transaction_logs') THEN
    ALTER TABLE transaction_logs ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS transaction_logs_select ON transaction_logs;
    DROP POLICY IF EXISTS transaction_logs_insert ON transaction_logs;

    CREATE POLICY transaction_logs_select ON transaction_logs FOR SELECT USING (school_id = get_user_school_id() OR is_super_admin());
    CREATE POLICY transaction_logs_insert ON transaction_logs FOR INSERT WITH CHECK (school_id = get_user_school_id() OR auth.role() = 'service_role');
  END IF;
END $$;

-- =====================================================
-- 7. Updated_at trigger for new tables
-- =====================================================
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'payment_gateway_configs') THEN
    DROP TRIGGER IF EXISTS set_updated_at ON payment_gateway_configs;
    CREATE TRIGGER set_updated_at BEFORE UPDATE ON payment_gateway_configs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'fee_categories') THEN
    DROP TRIGGER IF EXISTS set_updated_at ON fee_categories;
    CREATE TRIGGER set_updated_at BEFORE UPDATE ON fee_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;
