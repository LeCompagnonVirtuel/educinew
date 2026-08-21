-- Migration: Remove all payment gateways except Money Fusion
-- All schools must use Money Fusion as their sole payment provider

-- Deactivate all non-Money Fusion gateway configs
UPDATE payment_gateway_configs
SET is_active = false
WHERE gateway != 'MONEY_FUSION';

-- Log the migration
INSERT INTO transaction_logs (school_id, action, status, gateway_response)
SELECT DISTINCT school_id, 'MIGRATION', 'SUCCESS',
  '{"message": "Migrated to Money Fusion only - all other gateways deactivated"}'::jsonb
FROM payment_gateway_configs
WHERE gateway != 'MONEY_FUSION' AND is_active = false;

-- Add comment to payment_gateway_configs for clarity
COMMENT ON TABLE payment_gateway_configs IS 'Payment gateway configurations - Money Fusion only since 2026-07-16';

-- Ensure gateway constraint allows MONEY_FUSION
-- (no change needed - the column is TEXT, no CHECK constraint exists)

-- Update any legacy payment_method references in payments table
UPDATE payments SET payment_method = 'MONEY_FUSION'
WHERE payment_method IN ('CINETPAY', 'FLUTTERWAVE', 'STRIPE', 'PAYSTACK', 'PAYDUNYA', 'FEDAPAY', 'ONLINE');
