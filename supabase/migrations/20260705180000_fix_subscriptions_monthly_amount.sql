-- =====================================================
-- Fix: subscriptions columns NOT NULL without DEFAULT
-- monthly_amount, yearly_amount, start_date, end_date
-- caused INSERT failures when omitted (e.g. free trial).
-- =====================================================

-- monthly_amount: default to 0 (free trial)
ALTER TABLE subscriptions ALTER COLUMN monthly_amount SET DEFAULT 0;

-- yearly_amount: default to 0
ALTER TABLE subscriptions ALTER COLUMN yearly_amount SET DEFAULT 0;

-- start_date: default to now()
ALTER TABLE subscriptions ALTER COLUMN start_date SET DEFAULT now();

-- end_date: default to 30 days from now (trial period)
ALTER TABLE subscriptions ALTER COLUMN end_date SET DEFAULT (now() + interval '30 days');

-- Backfill any existing NULL values
UPDATE subscriptions SET monthly_amount = 0 WHERE monthly_amount IS NULL;
UPDATE subscriptions SET yearly_amount = 0 WHERE yearly_amount IS NULL;
UPDATE subscriptions SET start_date = created_at WHERE start_date IS NULL;
UPDATE subscriptions SET end_date = created_at + interval '30 days' WHERE end_date IS NULL;
