import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gefi-base.repository';

// ============================================================================
// GEFI-2: Payment Infrastructure — Money Fusion, Payment Methods, Transactions
// ============================================================================

export interface GEFIPaymentMethod extends BaseEntity { name: string; type: 'MOBILE_MONEY'|'BANK_TRANSFER'|'CARD'|'CASH'|'CHECK'|'CRYPTO'|'VOUCHER'; provider: string; config: Record<string,unknown>; is_active: boolean; fees_percentage: number; fees_fixed: number; min_amount: number; max_amount: number; metadata: Record<string,unknown>; }
export interface GEFIPaymentGateway extends BaseEntity { name: string; provider: string; type: 'MONEY_FUSION'|'STRIPE'|'PAYPAL'; api_key_encrypted: string; webhook_secret: string; config: Record<string,unknown>; status: 'ACTIVE'|'INACTIVE'|'ERROR'; last_health_check: string; metadata: Record<string,unknown>; }
export interface GEFIPaymentTransaction extends BaseEntity { reference: string; amount: number; currency_code: string; fee_amount: number; net_amount: number; method_id: string; gateway_id?: string; payer_id: string; payee_id?: string; status: 'PENDING'|'PROCESSING'|'COMPLETED'|'FAILED'|'REFUNDED'|'DISPUTED'; failure_reason?: string; completed_at?: string; metadata: Record<string,unknown>; }
export interface GEFIPaymentRefund extends BaseEntity { transaction_id: string; amount: number; reason: string; status: 'PENDING'|'APPROVED'|'COMPLETED'|'REJECTED'; approved_by?: string; completed_at?: string; metadata: Record<string,unknown>; }
export interface GEFIPaymentWebhook extends BaseEntity; gateway_id: string; event_type: string; payload: Record<string,unknown>; status: 'RECEIVED'|'PROCESSED'|'FAILED'|'IGNORED'; processing_error?: string; processed_at?: string; metadata: Record<string,unknown>; }
export interface GEFIPaymentRecurring extends BaseEntity { name: string; payer_id: string; method_id: string; amount: number; currency_code: string; frequency: 'DAILY'|'WEEKLY'|'BIWEEKLY'|'MONTHLY'|'QUARTERLY'|'ANNUAL'; start_date: string; end_date?: string; next_charge_date: string; total_charged: number; status: 'ACTIVE'|'PAUSED'|'CANCELLED'|'COMPLETED'; metadata: Record<string,unknown>; }
export interface GEFIPaymentSubscription extends BaseEntity { name: string; plan_name: string; amount: number; currency_code: string; billing_cycle: 'MONTHLY'|'QUARTERLY'|'ANNUAL'; features: Record<string,unknown>; is_active: boolean; metadata: Record<string,unknown>; }
export interface GEFIPaymentSubscriptionMember extends BaseEntity { subscription_id: string; user_id: string; status: 'ACTIVE'|'CANCELLED'|'PAST_DUE'|'TRIALING'; current_period_start: string; current_period_end: string; cancel_at?: string; metadata: Record<string,unknown>; }
export interface GEFIPaymentInvoice extends BaseEntity { invoice_number: string; payer_id: string; amount: number; tax_amount: number; total_amount: number; currency_code: string; status: 'DRAFT'|'SENT'|'PAID'|'OVERDUE'|'CANCELLED'; due_date: string; paid_date?: string; line_items: Record<string,unknown>[]; metadata: Record<string,unknown>; }
export interface GEFIPaymentReceipt extends BaseEntity { transaction_id: string; invoice_id?: string; receipt_number: string; amount: number; currency_code: string; issued_date: string; issued_to: string; pdf_url?: string; metadata: Record<string,unknown>; }
export interface GEFIPaymentEscrow extends BaseEntity { name: string; buyer_id: string; seller_id: string; amount: number; currency_code: string; status: 'HELD'|'RELEASED'|'REFUNDED'|'DISPUTED'; release_date?: string; released_at?: string; metadata: Record<string,unknown>; }
export interface GEFIPaymentSplit extends BaseEntity { transaction_id: string; payee_id: string; amount: number; percentage: number; fee_share: number; net_amount: number; status: 'PENDING'|'COMPLETED'|'FAILED'; metadata: Record<string,unknown>; }
export interface GEFIPaymentHold extends BaseEntity { transaction_id: string; reason: string; amount: number; status: 'ACTIVE'|'RELEASED'|'EXPIRED'; expires_at: string; released_at?: string; metadata: Record<string,unknown>; }
export interface GEFIPaymentDispute extends BaseEntity { transaction_id: string; payer_id: string; reason: string; evidence: Record<string,unknown>[]; status: 'OPEN'|'UNDER_REVIEW'|'RESOLVED'|'CLOSED'; resolution?: string; resolved_by?: string; resolved_at?: string; metadata: Record<string,unknown>; }
export interface GEFIPaymentFeeConfig extends BaseEntity { provider: string; method_type: string; percentage: number; fixed_amount: number; min_amount: number; max_amount: number; applies_to: string[]; is_active: boolean; metadata: Record<string,unknown>; }
export interface GEFIPaymentSettlement extends BaseEntity { gateway_id: string; period_start: string; period_end: string; total_transactions: number; total_amount: number; total_fees: number; net_amount: number; status: 'PENDING'|'SETTLED'|'FAILED'; settled_at?: string; metadata: Record<string,unknown>; }
export interface GEFIPaymentSettlementItem extends BaseEntity { settlement_id: string; transaction_id: string; amount: number; fee: number; net_amount: number; metadata: Record<string,unknown>; }
export interface GEFIPaymentNotification extends BaseEntity { transaction_id: string; channel: 'EMAIL'|'SMS'|'PUSH'|'IN_APP'; recipient: string; template: string; data: Record<string,unknown>; status: 'QUEUED'|'SENT'|'DELIVERED'|'FAILED'; sent_at?: string; metadata: Record<string,unknown>; }
export interface GEFIPaymentRetry extends BaseEntity { transaction_id: string; attempt_number: number; status: 'PENDING'|'SUCCESS'|'FAILED'; error_message?: string; next_retry_at?: string; max_retries: number; metadata: Record<string,unknown>; }
export interface GEFIPaymentIdempotencyKey extends BaseEntity { key: string; transaction_id: string; request_hash: string; response?: Record<string,unknown>; expires_at: string; metadata: Record<string,unknown>; }
export interface GEFIPaymentAuditLog extends BaseEntity { transaction_id: string; action: string; actor_id: string; changes: Record<string,unknown>; ip_address?: string; user_agent?: string; metadata: Record<string,unknown>; }
export interface GEFIPaymentConfig extends BaseEntity { key: string; value: unknown; category: string; description?: string; is_secret: boolean; metadata: Record<string,unknown>; }
export interface GEFIPaymentHealthCheck extends BaseEntity { gateway_id: string; status: 'HEALTHY'|'DEGRADED'|'DOWN'; latency_ms: number; error_rate: number; checked_at: string; metadata: Record<string,unknown>; }
export interface GEFIPaymentRateLimit extends BaseEntity { gateway_id: string; endpoint: string; limit: number; window_seconds: number; current_count: number; window_start: string; metadata: Record<string,unknown>; }
export interface GEFIPaymentReport extends BaseEntity { name: string; type: 'TRANSACTION'|'SETTLEMENT'|'REFUND'|'DISPUTE'|'REVENUE'; period_start: string; period_end: string; data: Record<string,unknown>; generated_by: string; status: 'PENDING'|'COMPLETED'|'FAILED'; metadata: Record<string,unknown>; }
export interface GEFIPaymentReportExecution extends BaseEntity { report_id: string; parameters: Record<string,unknown>; status: 'PENDING'|'RUNNING'|'COMPLETED'|'FAILED'; result_url?: string; error?: string; started_at: string; completed_at?: string; duration_ms?: number; metadata: Record<string,unknown>; }
export interface GEFIPaymentBatch extends BaseEntity { name: string; type: 'PAYOUT'|'COLLECTION'|'REFUND'; total_count: number; total_amount: number; currency_code: string; status: 'DRAFT'|'SUBMITTED'|'PROCESSING'|'COMPLETED'|'FAILED'; submitted_by: string; submitted_at?: string; metadata: Record<string,unknown>; }
export interface GEFIPaymentBatchItem extends BaseEntity { batch_id: string; transaction_id?: string; amount: number; recipient_id: string; status: 'PENDING'|'COMPLETED'|'FAILED'; error_message?: string; processed_at?: string; metadata: Record<string,unknown>; }
export interface GEFIPaymentToken extends BaseEntity { token_hash: string; user_id: string; type: 'CARD'|'BANK_ACCOUNT'|'MOBILE_WALLET'; last_four: string; brand?: string; expiry_month?: number; expiry_year?: number; is_default: boolean; metadata: Record<string,unknown>; }
export interface GEFIPaymentAuthorization extends BaseEntity { transaction_id: string; token_id: string; amount: number; status: 'PENDING'|'APPROVED'|'DECLINED'|'EXPIRED'; auth_code?: string; expires_at: string; metadata: Record<string,unknown>; }
export interface GEFIPaymentCapture extends BaseEntity { authorization_id: string; amount: number; status: 'PENDING'|'COMPLETED'|'FAILED'; captured_at?: string; metadata: Record<string,unknown>; }
export interface GEFIPaymentVoid extends BaseEntity { transaction_id: string; reason: string; status: 'PENDING'|'COMPLETED'|'FAILED'; voided_at?: string; metadata: Record<string,unknown>; }
export interface GEFIPaymentCurrencyConfig extends BaseEntity { code: string; name: string; symbol: string; decimal_places: number; is_active: boolean; min_transaction: number; max_transaction: number; metadata: Record<string,unknown>; }

export interface GEFI2Repository {
  paymentMethod: CrudRepository<GEFIPaymentMethod>;
  paymentGateway: CrudRepository<GEFIPaymentGateway>;
  paymentTransaction: CrudRepository<GEFIPaymentTransaction>;
  paymentRefund: CrudRepository<GEFIPaymentRefund>;
  paymentWebhook: CrudRepository<GEFIPaymentWebhook>;
  paymentRecurring: CrudRepository<GEFIPaymentRecurring>;
  paymentSubscription: CrudRepository<GEFIPaymentSubscription>;
  paymentSubscriptionMember: CrudRepository<GEFIPaymentSubscriptionMember>;
  paymentInvoice: CrudRepository<GEFIPaymentInvoice>;
  paymentReceipt: CrudRepository<GEFIPaymentReceipt>;
  paymentEscrow: CrudRepository<GEFIPaymentEscrow>;
  paymentSplit: CrudRepository<GEFIPaymentSplit>;
  paymentHold: CrudRepository<GEFIPaymentHold>;
  paymentDispute: CrudRepository<GEFIPaymentDispute>;
  paymentFeeConfig: CrudRepository<GEFIPaymentFeeConfig>;
  paymentSettlement: CrudRepository<GEFIPaymentSettlement>;
  paymentSettlementItem: CrudRepository<GEFIPaymentSettlementItem>;
  paymentNotification: CrudRepository<GEFIPaymentNotification>;
  paymentRetry: CrudRepository<GEFIPaymentRetry>;
  paymentIdempotencyKey: CrudRepository<GEFIPaymentIdempotencyKey>;
  paymentAuditLog: CrudRepository<GEFIPaymentAuditLog>;
  paymentConfig: CrudRepository<GEFIPaymentConfig>;
  paymentHealthCheck: CrudRepository<GEFIPaymentHealthCheck>;
  paymentRateLimit: CrudRepository<GEFIPaymentRateLimit>;
  paymentReport: CrudRepository<GEFIPaymentReport>;
  paymentReportExecution: CrudRepository<GEFIPaymentReportExecution>;
  paymentBatch: CrudRepository<GEFIPaymentBatch>;
  paymentBatchItem: CrudRepository<GEFIPaymentBatchItem>;
  paymentToken: CrudRepository<GEFIPaymentToken>;
  paymentAuthorization: CrudRepository<GEFIPaymentAuthorization>;
  paymentCapture: CrudRepository<GEFIPaymentCapture>;
  paymentVoid: CrudRepository<GEFIPaymentVoid>;
  paymentCurrencyConfig: CrudRepository<GEFIPaymentCurrencyConfig>;
}

export function createGEFI2Repository(supabase: SupabaseClient): GEFI2Repository {
  return {
    paymentMethod: createCrudRepository<GEFIPaymentMethod>(supabase, 'gefi_payment_methods'),
    paymentGateway: createCrudRepository<GEFIPaymentGateway>(supabase, 'gefi_payment_gateways'),
    paymentTransaction: createCrudRepository<GEFIPaymentTransaction>(supabase, 'gefi_payment_transactions'),
    paymentRefund: createCrudRepository<GEFIPaymentRefund>(supabase, 'gefi_payment_refunds'),
    paymentWebhook: createCrudRepository<GEFIPaymentWebhook>(supabase, 'gefi_payment_webhooks'),
    paymentRecurring: createCrudRepository<GEFIPaymentRecurring>(supabase, 'gefi_payment_recurring'),
    paymentSubscription: createCrudRepository<GEFIPaymentSubscription>(supabase, 'gefi_payment_subscriptions'),
    paymentSubscriptionMember: createCrudRepository<GEFIPaymentSubscriptionMember>(supabase, 'gefi_payment_subscription_members'),
    paymentInvoice: createCrudRepository<GEFIPaymentInvoice>(supabase, 'gefi_payment_invoices'),
    paymentReceipt: createCrudRepository<GEFIPaymentReceipt>(supabase, 'gefi_payment_receipts'),
    paymentEscrow: createCrudRepository<GEFIPaymentEscrow>(supabase, 'gefi_payment_escrows'),
    paymentSplit: createCrudRepository<GEFIPaymentSplit>(supabase, 'gefi_payment_splits'),
    paymentHold: createCrudRepository<GEFIPaymentHold>(supabase, 'gefi_payment_holds'),
    paymentDispute: createCrudRepository<GEFIPaymentDispute>(supabase, 'gefi_payment_disputes'),
    paymentFeeConfig: createCrudRepository<GEFIPaymentFeeConfig>(supabase, 'gefi_payment_fee_configs'),
    paymentSettlement: createCrudRepository<GEFIPaymentSettlement>(supabase, 'gefi_payment_settlements'),
    paymentSettlementItem: createCrudRepository<GEFIPaymentSettlementItem>(supabase, 'gefi_payment_settlement_items'),
    paymentNotification: createCrudRepository<GEFIPaymentNotification>(supabase, 'gefi_payment_notifications'),
    paymentRetry: createCrudRepository<GEFIPaymentRetry>(supabase, 'gefi_payment_retries'),
    paymentIdempotencyKey: createCrudRepository<GEFIPaymentIdempotencyKey>(supabase, 'gefi_payment_idempotency_keys'),
    paymentAuditLog: createCrudRepository<GEFIPaymentAuditLog>(supabase, 'gefi_payment_audit_logs'),
    paymentConfig: createCrudRepository<GEFIPaymentConfig>(supabase, 'gefi_payment_configs'),
    paymentHealthCheck: createCrudRepository<GEFIPaymentHealthCheck>(supabase, 'gefi_payment_health_checks'),
    paymentRateLimit: createCrudRepository<GEFIPaymentRateLimit>(supabase, 'gefi_payment_rate_limits'),
    paymentReport: createCrudRepository<GEFIPaymentReport>(supabase, 'gefi_payment_reports'),
    paymentReportExecution: createCrudRepository<GEFIPaymentReportExecution>(supabase, 'gefi_payment_report_executions'),
    paymentBatch: createCrudRepository<GEFIPaymentBatch>(supabase, 'gefi_payment_batches'),
    paymentBatchItem: createCrudRepository<GEFIPaymentBatchItem>(supabase, 'gefi_payment_batch_items'),
    paymentToken: createCrudRepository<GEFIPaymentToken>(supabase, 'gefi_payment_tokens'),
    paymentAuthorization: createCrudRepository<GEFIPaymentAuthorization>(supabase, 'gefi_payment_authorizations'),
    paymentCapture: createCrudRepository<GEFIPaymentCapture>(supabase, 'gefi_payment_captures'),
    paymentVoid: createCrudRepository<GEFIPaymentVoid>(supabase, 'gefi_payment_voids'),
    paymentCurrencyConfig: createCrudRepository<GEFIPaymentCurrencyConfig>(supabase, 'gefi_payment_currency_configs'),
  };
}
