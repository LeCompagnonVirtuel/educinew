-- =====================================================
-- Audit Fixes: Add missing database indexes
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_tuition_plans_school_id ON tuition_plans(school_id);
CREATE INDEX IF NOT EXISTS idx_invoices_tuition_plan_id ON invoices(tuition_plan_id);
CREATE INDEX IF NOT EXISTS idx_invoices_fee_category_id ON invoices(fee_category_id);
