-- =============================================================
-- CRITICAL + HIGH AUDIT FIXES (2026-07-13)
-- =============================================================

-- -------------------------------------------------------------
-- CRITICAL 1: Remove RLS bypass via x-session-token header
-- The anon_select/update_drafts_v2 policies use current_setting('request.headers')
-- which can be spoofed. Remove them.
-- -------------------------------------------------------------
DROP POLICY IF EXISTS "anon_select_drafts_v2" ON public.registration_drafts_v2;
DROP POLICY IF EXISTS "anon_update_drafts_v2" ON public.registration_drafts_v2;
DROP POLICY IF EXISTS "anon_insert_drafts_v2" ON public.registration_drafts_v2;

-- Only service_role should manage drafts (through API routes)
DROP POLICY IF EXISTS "drafts_v2_service_role_all" ON public.registration_drafts_v2;
CREATE POLICY "drafts_v2_service_role_all" ON public.registration_drafts_v2
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- Authenticated users can read their own drafts
DROP POLICY IF EXISTS "drafts_v2_own_select" ON public.registration_drafts_v2;
CREATE POLICY "drafts_v2_own_select" ON public.registration_drafts_v2
  FOR SELECT TO authenticated
  USING (auth_user_id = auth.uid());

-- -------------------------------------------------------------
-- CRITICAL 2: Fix login_history INSERT — service_role only
-- Current policy allows any authenticated user to forge logs
-- -------------------------------------------------------------
DROP POLICY IF EXISTS login_history_insert ON public.login_history;
CREATE POLICY login_history_insert ON public.login_history
  FOR INSERT TO service_role
  WITH CHECK (true);

-- Authenticated users can still read their own history
DROP POLICY IF EXISTS login_history_select ON public.login_history;
CREATE POLICY login_history_select ON public.login_history
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Make login_history immutable (no delete/update by anyone except service_role)
DROP POLICY IF EXISTS login_history_update ON public.login_history;
DROP POLICY IF EXISTS login_history_delete ON public.login_history;
CREATE POLICY login_history_no_update ON public.login_history
  FOR UPDATE USING (false);
CREATE POLICY login_history_no_delete ON public.login_history
  FOR DELETE USING (false);

-- -------------------------------------------------------------
-- HIGH 1: Missing indexes on RLS filter columns
-- These columns are used in RLS policies causing full table scans
-- -------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_qr_codes_school_id ON public.qr_codes(school_id);
CREATE INDEX IF NOT EXISTS idx_permissions_school_id ON public.permissions(school_id);
CREATE INDEX IF NOT EXISTS idx_email_confirmation_tokens_user_id ON public.email_confirmation_tokens(user_id);

-- -------------------------------------------------------------
-- HIGH 2: Fix trigger infinite loop guard
-- update_updated_at_column() needs recursion protection
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' AND NEW IS DISTINCT FROM OLD THEN
    NEW.updated_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- -------------------------------------------------------------
-- HIGH 3: DELETE policies for immutable tables
-- These tables should be append-only
-- -------------------------------------------------------------
-- payment_transactions
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'payment_transactions' AND policyname = 'payment_transactions_no_delete') THEN
    CREATE POLICY payment_transactions_no_delete ON public.payment_transactions FOR DELETE USING (false);
  END IF;
END $$;

-- audit_logs
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'audit_logs' AND policyname = 'audit_logs_no_delete') THEN
    CREATE POLICY audit_logs_no_delete ON public.audit_logs FOR DELETE USING (false);
  END IF;
END $$;

-- webhook_logs
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'webhook_logs' AND policyname = 'webhook_logs_no_delete') THEN
    CREATE POLICY webhook_logs_no_delete ON public.webhook_logs FOR DELETE USING (false);
  END IF;
END $$;

-- transaction_logs
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'transaction_logs' AND policyname = 'transaction_logs_no_delete') THEN
    CREATE POLICY transaction_logs_no_delete ON public.transaction_logs FOR DELETE USING (false);
  END IF;
END $$;

-- -------------------------------------------------------------
-- HIGH 4: Wallet balance CHECK constraint
-- Prevent negative balances
-- -------------------------------------------------------------
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_wallet_balance_non_negative') THEN
    ALTER TABLE wallets ADD CONSTRAINT chk_wallet_balance_non_negative CHECK (balance >= 0);
  END IF;
END $$;

-- -------------------------------------------------------------
-- MEDIUM 1: Missing UNIQUE on users.phone (nullable unique)
-- First deduplicate: keep the most recently updated row for each phone,
-- set older duplicates to NULL so the unique index can be created.
-- -------------------------------------------------------------
WITH duplicates AS (
  SELECT id, phone,
    ROW_NUMBER() OVER (PARTITION BY phone ORDER BY updated_at DESC NULLS LAST, created_at DESC NULLS LAST) AS rn
  FROM public.users
  WHERE phone IS NOT NULL AND phone != ''
)
UPDATE public.users
SET phone = NULL
WHERE id IN (SELECT id FROM duplicates WHERE rn > 1);

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_phone_unique ON public.users(phone) WHERE phone IS NOT NULL AND phone != '';

-- -------------------------------------------------------------
-- MEDIUM 2: Invoices DELETE policy (admin/super_admin only)
-- -------------------------------------------------------------
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'invoices' AND policyname = 'invoices_delete_admin') THEN
    CREATE POLICY invoices_delete_admin ON public.invoices FOR DELETE USING (is_super_admin());
  END IF;
END $$;
