-- ============================================================
-- PHASE 1: Payment Gateway Enterprise Module
-- Enhances existing payment tables + adds new ones
-- ============================================================

-- 1. Enhance payment_gateway_configs with encryption and metadata
ALTER TABLE payment_gateway_configs
  ADD COLUMN IF NOT EXISTS display_name TEXT,
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS supported_methods TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS supported_currencies TEXT[] DEFAULT '{"XOF"}',
  ADD COLUMN IF NOT EXISTS supported_countries TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS config_encrypted JSONB,
  ADD COLUMN IF NOT EXISTS webhook_url TEXT,
  ADD COLUMN IF NOT EXISTS return_url TEXT,
  ADD COLUMN IF NOT EXISTS cancel_url TEXT,
  ADD COLUMN IF NOT EXISTS default_currency TEXT DEFAULT 'XOF',
  ADD COLUMN IF NOT EXISTS test_mode BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS priority INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS logo_url TEXT,
  ADD COLUMN IF NOT EXISTS docs_url TEXT,
  ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';

-- 2. Transaction logs — complete audit trail
CREATE TABLE IF NOT EXISTS transaction_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  transaction_id UUID REFERENCES payment_transactions(id) ON DELETE SET NULL,
  gateway_id UUID REFERENCES payment_gateway_configs(id) ON DELETE SET NULL,
  action TEXT NOT NULL, -- CREATED, INITIATED, PROCESSING, COMPLETED, FAILED, REFUNDED, CANCELLED, WEBHOOK_RECEIVED, WEBHOOK_PROCESSED
  status TEXT NOT NULL DEFAULT 'PENDING',
  amount REAL,
  currency TEXT DEFAULT 'XOF',
  reference TEXT,
  provider_reference TEXT,
  gateway_response JSONB,
  ip_address TEXT,
  user_agent TEXT,
  user_id UUID,
  error_message TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_transaction_logs_school ON transaction_logs(school_id);
CREATE INDEX IF NOT EXISTS idx_transaction_logs_transaction ON transaction_logs(transaction_id);
CREATE INDEX IF NOT EXISTS idx_transaction_logs_created ON transaction_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transaction_logs_action ON transaction_logs(action);

-- 3. Webhook logs — track all incoming webhooks
CREATE TABLE IF NOT EXISTS webhook_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  gateway TEXT NOT NULL,
  payload JSONB NOT NULL,
  headers JSONB,
  status TEXT NOT NULL DEFAULT 'RECEIVED', -- RECEIVED, PROCESSED, FAILED, DUPLICATE
  transaction_id UUID,
  error_message TEXT,
  processing_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_webhook_logs_school ON webhook_logs(school_id);
CREATE INDEX IF NOT EXISTS idx_webhook_logs_gateway ON webhook_logs(gateway);
CREATE INDEX IF NOT EXISTS idx_webhook_logs_created ON webhook_logs(created_at DESC);

-- 4. School currency settings
ALTER TABLE schools
  ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'XOF',
  ADD COLUMN IF NOT EXISTS currency_symbol TEXT DEFAULT 'FCFA',
  ADD COLUMN IF NOT EXISTS payment_settings JSONB DEFAULT '{}';

-- 5. Gateway test results
CREATE TABLE IF NOT EXISTS gateway_test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  gateway_id UUID NOT NULL REFERENCES payment_gateway_configs(id) ON DELETE CASCADE,
  test_type TEXT NOT NULL, -- CONNECTION, SANDBOX_PAYMENT, WEBHOOK, API_KEY
  status TEXT NOT NULL, -- SUCCESS, FAILED, TIMEOUT
  request_payload JSONB,
  response_payload JSONB,
  error_message TEXT,
  duration_ms INTEGER,
  tested_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gateway_test_school ON gateway_test_results(school_id);

-- 6. RLS policies for new tables
ALTER TABLE transaction_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE gateway_test_results ENABLE ROW LEVEL SECURITY;

-- transaction_logs: school members can read, service role writes
DO $$ BEGIN
  DROP POLICY IF EXISTS "transaction_logs_school_read" ON transaction_logs;
  CREATE POLICY "transaction_logs_school_read" ON transaction_logs
    FOR SELECT USING (school_id = (auth.jwt() ->> 'school_id')::uuid);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "transaction_logs_service_insert" ON transaction_logs;
  CREATE POLICY "transaction_logs_service_insert" ON transaction_logs
    FOR INSERT WITH CHECK (true); -- service role only
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- webhook_logs: school members can read, service role writes
DO $$ BEGIN
  DROP POLICY IF EXISTS "webhook_logs_school_read" ON webhook_logs;
  CREATE POLICY "webhook_logs_school_read" ON webhook_logs
    FOR SELECT USING (school_id = (auth.jwt() ->> 'school_id')::uuid);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "webhook_logs_service_insert" ON webhook_logs;
  CREATE POLICY "webhook_logs_service_insert" ON webhook_logs
    FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- gateway_test_results: school admins can read, service role writes
DO $$ BEGIN
  DROP POLICY IF EXISTS "gateway_test_school_read" ON gateway_test_results;
  CREATE POLICY "gateway_test_school_read" ON gateway_test_results
    FOR SELECT USING (school_id = (auth.jwt() ->> 'school_id')::uuid);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "gateway_test_service_insert" ON gateway_test_results;
  CREATE POLICY "gateway_test_service_insert" ON gateway_test_results
    FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 7. RPC: Get financial dashboard stats
CREATE OR REPLACE FUNCTION get_financial_dashboard(p_school_id UUID)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
  today_revenue REAL;
  month_revenue REAL;
  total_transactions BIGINT;
  successful_transactions BIGINT;
  failed_transactions BIGINT;
  avg_amount REAL;
BEGIN
  -- Today's revenue
  SELECT COALESCE(SUM(amount), 0) INTO today_revenue
  FROM payment_transactions pt
  JOIN invoices i ON pt.invoice_id = i.id
  WHERE i.school_id = p_school_id
    AND pt.status = 'COMPLETED'
    AND pt.completed_at >= CURRENT_DATE;

  -- Month's revenue
  SELECT COALESCE(SUM(amount), 0) INTO month_revenue
  FROM payment_transactions pt
  JOIN invoices i ON pt.invoice_id = i.id
  WHERE i.school_id = p_school_id
    AND pt.status = 'COMPLETED'
    AND pt.completed_at >= DATE_TRUNC('month', NOW());

  -- Total transactions (last 30 days)
  SELECT COUNT(*), 
         COUNT(*) FILTER (WHERE pt.status = 'COMPLETED'),
         COUNT(*) FILTER (WHERE pt.status = 'FAILED')
  INTO total_transactions, successful_transactions, failed_transactions
  FROM payment_transactions pt
  JOIN invoices i ON pt.invoice_id = i.id
  WHERE i.school_id = p_school_id
    AND pt.created_at >= NOW() - INTERVAL '30 days';

  -- Average amount
  SELECT COALESCE(AVG(amount), 0) INTO avg_amount
  FROM payment_transactions pt
  JOIN invoices i ON pt.invoice_id = i.id
  WHERE i.school_id = p_school_id
    AND pt.status = 'COMPLETED'
    AND pt.completed_at >= NOW() - INTERVAL '30 days';

  result := jsonb_build_object(
    'today_revenue', today_revenue,
    'month_revenue', month_revenue,
    'total_transactions', total_transactions,
    'successful_transactions', successful_transactions,
    'failed_transactions', failed_transactions,
    'success_rate', CASE WHEN total_transactions > 0 THEN ROUND((successful_transactions::numeric / total_transactions) * 100, 1) ELSE 0 END,
    'avg_amount', avg_amount
  );

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. RPC: Get payment method breakdown
CREATE OR REPLACE FUNCTION get_payment_method_breakdown(p_school_id UUID)
RETURNS JSONB AS $$
BEGIN
  RETURN (
    SELECT COALESCE(
      jsonb_agg(jsonb_build_object(
        'method', payment_method,
        'count', cnt,
        'total', total_amount
      )),
      '[]'::jsonb
    )
    FROM (
      SELECT 
        pt.payment_method,
        COUNT(*) as cnt,
        SUM(pt.amount) as total_amount
      FROM payment_transactions pt
      JOIN invoices i ON pt.invoice_id = i.id
      WHERE i.school_id = p_school_id
        AND pt.status = 'COMPLETED'
        AND pt.completed_at >= NOW() - INTERVAL '30 days'
      GROUP BY pt.payment_method
      ORDER BY total_amount DESC
    ) sub
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. RPC: Get monthly revenue trend
CREATE OR REPLACE FUNCTION get_monthly_revenue_trend(p_school_id UUID, p_months INTEGER DEFAULT 12)
RETURNS JSONB AS $$
BEGIN
  RETURN (
    SELECT COALESCE(
      jsonb_agg(jsonb_build_object(
        'month', to_char(month_date, 'YYYY-MM'),
        'label', to_char(month_date, 'Mon YYYY'),
        'revenue', COALESCE(rev, 0),
        'transactions', COALESCE(tx_count, 0)
      ) ORDER BY month_date),
      '[]'::jsonb
    )
    FROM (
      SELECT generate_series(
        DATE_TRUNC('month', NOW() - (p_months || ' months')::INTERVAL),
        DATE_TRUNC('month', NOW()),
        '1 month'::INTERVAL
      ) AS month_date
    ) months
    LEFT JOIN (
      SELECT 
        DATE_TRUNC('month', pt.completed_at) AS month_date,
        SUM(pt.amount) AS rev,
        COUNT(*) AS tx_count
      FROM payment_transactions pt
      JOIN invoices i ON pt.invoice_id = i.id
      WHERE i.school_id = p_school_id
        AND pt.status = 'COMPLETED'
      GROUP BY DATE_TRUNC('month', pt.completed_at)
    ) data USING (month_date)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
