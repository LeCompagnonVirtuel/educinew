import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gefi-base.repository';

// ============================================================================
// GEFI-8: International Finance — Cross-Border Payments, Currency, Compliance
// ============================================================================

export interface GEFIGlobalPayment extends BaseEntity { from_school_id: string; to_school_id: string; amount: number; from_currency: string; to_currency: string; exchange_rate: number; converted_amount: number; fee_amount: number; net_amount: number; payment_method: string; reference: string; status: 'PENDING'|'PROCESSING'|'COMPLETED'|'FAILED'|'REVERSED'; completed_at?: string; metadata: Record<string,unknown>; }
export interface GEFIGlobalPaymentRoute extends BaseEntity { name: string; from_country: string; to_country: string; from_currency: string; to_currency: string; provider: string; fee_percentage: number; fee_fixed: number; min_amount: number; max_amount: number; avg_processing_hours: number; is_active: boolean; metadata: Record<string,unknown>; }
export interface GEFIGlobalCorrespondent extends BaseEntity { name: string; bank_name: string; swift_code: string; country: string; currency: string; account_number_encrypted: string; status: 'ACTIVE'|'INACTIVE'|'BLOCKED'; metadata: Record<string,unknown>; }
export interface GEFIGlobalPaymentBatch extends BaseEntity; name: string; from_school_id: string; total_amount: number; total_fees: number; total_converted: number; currency_code: string; payment_count: number; status: 'DRAFT'|'SUBMITTED'|'PROCESSING'|'COMPLETED'|'PARTIAL'|'FAILED'; submitted_by: string; submitted_at?: string; metadata: Record<string,unknown>; }
export interface GEFIGlobalPaymentBatchItem extends BaseEntity { batch_id: string; to_school_id: string; amount: number; currency_code: string; reference: string; status: 'PENDING'|'COMPLETED'|'FAILED'; error_message?: string; processed_at?: string; metadata: Record<string,unknown>; }
export interface GEFIGlobalFXQuote extends BaseEntity { from_currency: string; to_currency: string; rate: number; inverse_rate: number; valid_until: string; provider: string; markup: number; mid_market_rate: number; status: 'ACTIVE'|'EXPIRED'; metadata: Record<string,unknown>; }
export interface GEFIGlobalFXTrade extends BaseEntity { quote_id: string; from_amount: number; to_amount: number; from_currency: string; to_currency: string; rate: number; settlement_date: string; status: 'EXECUTED'|'SETTLED'|'CANCELLED'; settled_at?: string; metadata: Record<string,unknown>; }
export interface GEFIGlobalComplianceCheck extends BaseEntity { entity_type: string; entity_id: string; check_type: 'SANCTIONS'|'PEP'|'AML'|'KYC'|'CFT'; provider: string; result: 'CLEAR'|'FLAGGED'|'BLOCKED'; risk_score: number; details: Record<string,unknown>; checked_at: string; metadata: Record<string,unknown>; }
export interface GEFIGlobalSanctionsScreening extends BaseEntity { entity_type: string; entity_id: string; entity_name: string; list_type: string; match_score: number; result: 'NO_MATCH'|'POSSIBLE_MATCH'|'MATCH'; reviewed_by?: string; reviewed_at?: string; status: 'PENDING'|'REVIEWED'|'CLEARED'; metadata: Record<string,unknown>; }
export interface GEFIGlobalCorrespondentAccount extends BaseEntity { correspondent_id: string; account_type: 'NOSTRO'|'VOSTRO'; currency: string; balance: number; available_balance: number; last_reconciled: string; status: 'ACTIVE'|'FROZEN'; metadata: Record<string,unknown>; }
export interface GEFIGlobalSWIFT extends BaseEntity { message_type: string; sender_bic: string; receiver_bic: string; reference: string; transaction_reference: string; amount: number; currency: string; value_date: string; ordering_customer: string; beneficiary_customer: string; status: 'SENT'|'ACKNOWLEDGED'|'REJECTED'|'RETURNED'; metadata: Record<string,unknown>; }
export interface GEFIGlobalTradeFinance extends BaseEntity; buyer_school_id: string; seller_school_id: string; type: 'LETTER_OF_CREDIT'|'BANK_GUARANTEE'|'DOCUMENTARY_COLLECTION'|'OPEN_ACCOUNT'; amount: number; currency_code: string; issue_date: string; expiry_date: string; status: 'PENDING'|'ACTIVE'|'COMPLETED'|'EXPIRED'|'CANCELLED'; metadata: Record<string,unknown>; }
export interface GEFIGlobalTradeDocument extends BaseEntity { trade_id: string; document_type: string; file_name: string; file_url: string; uploaded_by: string; uploaded_at: string; verified: boolean; verified_by?: string; metadata: Record<string,unknown>; }
export interface GEFIGlobalTransferLimit extends BaseEntity { school_id: string; limit_type: 'DAILY'|'WEEKLY'|'MONTHLY'|'SINGLE'; amount: number; currency_code: string; used: number; remaining: number; period_start: string; period_end: string; metadata: Record<string,unknown>; }
export interface GEFIGlobalRegulatoryReport extends BaseEntity { report_type: string; jurisdiction: string; period: string; due_date: string; status: 'DRAFT'|'SUBMITTED'|'ACCEPTED'|'REJECTED'; submitted_date?: string; file_url?: string; metadata: Record<string,unknown>; }
export interface GEFIGlobalMultiCurrencyLedger extends BaseEntity { account_id: string; currency_code: string; balance: number; local_balance: number; exchange_rate: number; last_revalued: string; metadata: Record<string,unknown>; }
export interface GEFIGlobalRevaluation extends BaseEntity { ledger_id: string; period: string; previous_rate: number; current_rate: number; unrealized_gain: number; unrealized_loss: number; revalued_at: string; metadata: Record<string,unknown>; }
export interface GEFIAuditTrail extends BaseEntity { entity_type: string; entity_id: string; action: string; actor_id: string; changes: Record<string,unknown>; ip_address?: string; metadata: Record<string,unknown>; }

export interface GEFI8Repository {
  globalPayment: CrudRepository<GEFIGlobalPayment>;
  globalPaymentRoute: CrudRepository<GEFIGlobalPaymentRoute>;
  globalCorrespondent: CrudRepository<GEFIGlobalCorrespondent>;
  globalPaymentBatch: CrudRepository<GEFIGlobalPaymentBatch>;
  globalPaymentBatchItem: CrudRepository<GEFIGlobalPaymentBatchItem>;
  globalFXQuote: CrudRepository<GEFIGlobalFXQuote>;
  globalFXTrade: CrudRepository<GEFIGlobalFXTrade>;
  globalComplianceCheck: CrudRepository<GEFIGlobalComplianceCheck>;
  globalSanctionsScreening: CrudRepository<GEFIGlobalSanctionsScreening>;
  globalCorrespondentAccount: CrudRepository<GEFIGlobalCorrespondentAccount>;
  globalSWIFT: CrudRepository<GEFIGlobalSWIFT>;
  globalTradeFinance: CrudRepository<GEFIGlobalTradeFinance>;
  globalTradeDocument: CrudRepository<GEFIGlobalTradeDocument>;
  globalTransferLimit: CrudRepository<GEFIGlobalTransferLimit>;
  globalRegulatoryReport: CrudRepository<GEFIGlobalRegulatoryReport>;
  globalMultiCurrencyLedger: CrudRepository<GEFIGlobalMultiCurrencyLedger>;
  globalRevaluation: CrudRepository<GEFIGlobalRevaluation>;
  auditTrail: CrudRepository<GEFIAuditTrail>;
}

export function createGEFI8Repository(supabase: SupabaseClient): GEFI8Repository {
  return {
    globalPayment: createCrudRepository<GEFIGlobalPayment>(supabase, 'gefi_global_payments'),
    globalPaymentRoute: createCrudRepository<GEFIGlobalPaymentRoute>(supabase, 'gefi_global_payment_routes'),
    globalCorrespondent: createCrudRepository<GEFIGlobalCorrespondent>(supabase, 'gefi_global_correspondents'),
    globalPaymentBatch: createCrudRepository<GEFIGlobalPaymentBatch>(supabase, 'gefi_global_payment_batches'),
    globalPaymentBatchItem: createCrudRepository<GEFIGlobalPaymentBatchItem>(supabase, 'gefi_global_payment_batch_items'),
    globalFXQuote: createCrudRepository<GEFIGlobalFXQuote>(supabase, 'gefi_global_fx_quotes'),
    globalFXTrade: createCrudRepository<GEFIGlobalFXTrade>(supabase, 'gefi_global_fx_trades'),
    globalComplianceCheck: createCrudRepository<GEFIGlobalComplianceCheck>(supabase, 'gefi_global_compliance_checks'),
    globalSanctionsScreening: createCrudRepository<GEFIGlobalSanctionsScreening>(supabase, 'gefi_global_sanctions_screenings'),
    globalCorrespondentAccount: createCrudRepository<GEFIGlobalCorrespondentAccount>(supabase, 'gefi_global_correspondent_accounts'),
    globalSWIFT: createCrudRepository<GEFIGlobalSWIFT>(supabase, 'gefi_global_swift_messages'),
    globalTradeFinance: createCrudRepository<GEFIGlobalTradeFinance>(supabase, 'gefi_global_trade_finances'),
    globalTradeDocument: createCrudRepository<GEFIGlobalTradeDocument>(supabase, 'gefi_global_trade_documents'),
    globalTransferLimit: createCrudRepository<GEFIGlobalTransferLimit>(supabase, 'gefi_global_transfer_limits'),
    globalRegulatoryReport: createCrudRepository<GEFIGlobalRegulatoryReport>(supabase, 'gefi_global_regulatory_reports'),
    globalMultiCurrencyLedger: createCrudRepository<GEFIGlobalMultiCurrencyLedger>(supabase, 'gefi_global_multi_currency_ledgers'),
    globalRevaluation: createCrudRepository<GEFIGlobalRevaluation>(supabase, 'gefi_global_revaluations'),
    auditTrail: createCrudRepository<GEFIAuditTrail>(supabase, 'gefi_international_finance_audit_trails'),
  };
}
