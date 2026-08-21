import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gefi-base.repository';

// ============================================================================
// GEFI-14: Reconciliation — Bank, Intercompany, Ledger Reconciliation
// ============================================================================

export interface GEFIReconciliationJob extends BaseEntity { name: string; type: 'BANK'|'INTERCOMPANY'|'LEDGER'|'SUBSIDIARY'|'PAYMENT'|'CUSTOM'; account_id?: string; period_start: string; period_end: string; status: 'PENDING'|'RUNNING'|'COMPLETED'|'FAILED'|'CANCELLED'; started_at?: string; completed_at?: string; total_items: number; matched_items: number; unmatched_items: number; discrepancy_amount: number; initiated_by: string; metadata: Record<string,unknown>; }
export interface GEFIReconciliationStatement extends BaseEntity { job_id: string; account_id: string; statement_date: string; opening_balance: number; closing_balance: number; total_credits: number; total_debits: number; statement_source: string; file_url?: string; status: 'UPLOADED'|'PARSED'|'MATCHED'|'REVIEWED'|'APPROVED'; metadata: Record<string,unknown>; }
export interface GEFIReconciliationItem extends BaseEntity { job_id: string; statement_id: string; ledger_entry_id?: string; amount: number; description: string; reference: string; transaction_date: string; type: 'CREDIT'|'DEBIT'; status: 'UNMATCHED'|'AUTO_MATCHED'|'MANUALLY_MATCHED'|'DISPUTED'|'EXCLUDED'; match_confidence?: number; matched_by?: string; matched_at?: string; metadata: Record<string,unknown>; }
export interface GEFIReconciliationMatch extends BaseEntity { job_id: string; statement_item_id: string; ledger_entry_id: string; match_type: 'EXACT'|'PARTIAL'|'FUZZY'|'MANUAL'; confidence_score: number; amount_difference: number; date_difference_days: number; matched_by: string; matched_at: string; status: 'PENDING'|'CONFIRMED'|'REJECTED'; metadata: Record<string,unknown>; }
export interface GEFIReconciliationDiscrepancy extends BaseEntity { job_id: string; type: 'AMOUNT'|'DATE'|'MISSING_STATEMENT'|'MISSING_LEDGER'|'DUPLICATE'|'UNAUTHORIZED'; severity: 'LOW'|'MEDIUM'|'HIGH'|'CRITICAL'; amount: number; description: string; statement_item_id?: string; ledger_entry_id?: string; status: 'OPEN'|'INVESTIGATING'|'RESOLVED'|'WAIVED'; assigned_to?: string; resolution?: string; resolved_at?: string; metadata: Record<string,unknown>; }
export interface GEFIReconciliationAdjustment extends BaseEntity { job_id: string; account_id: string; type: 'CREDIT'|'DEBIT'; amount: number; description: string; reference: string; approved_by: string; approved_at: string; journal_entry_id?: string; status: 'PENDING'|'APPROVED'|'POSTED'|'REJECTED'; metadata: Record<string,unknown>; }
export interface GEFIReconciliationApproval extends BaseEntity { job_id: string; approver_id: string; action: 'APPROVE'|'REJECT'|'REQUEST_CHANGES'; comments?: string; status: 'PENDING'|'COMPLETED'; completed_at?: string; metadata: Record<string,unknown>; }
export interface GEFIIntercompanyReconciliation extends BaseEntity { from_school_id: string; to_school_id: string; period: string; from_balance: number; to_balance: number; difference: number; status: 'UNMATCHED'|'MATCHED'|'DISPUTED'|'SETTLED'; matched_at?: string; metadata: Record<string,unknown>; }
export interface GEFIIntercompanyReconciliationItem extends BaseEntity { reconciliation_id: string; from_entry_id: string; to_entry_id: string; amount: number; description: string; match_type: string; status: 'PENDING'|'CONFIRMED'|'REJECTED'; metadata: Record<string,unknown>; }
export interface GEFIIntercompanySettlement extends BaseEntity { reconciliation_id: string; from_school_id: string; to_school_id: string; amount: number; currency_code: string; payment_method: string; reference: string; status: 'PENDING'|'COMPLETED'|'FAILED'; settled_at?: string; metadata: Record<string,unknown>; }
export interface GEFICashReconciliation extends BaseEntity { school_id: string; cash_register_id: string; reconciliation_date: string; expected_amount: number; counted_amount: number; difference: number; counted_by: string; verified_by?: string; status: 'IN_PROGRESS'|'COMPLETED'|'DISCREPANCY'; metadata: Record<string,unknown>; }
export interface GEFICashReconciliationDenomination extends BaseEntity { reconciliation_id: string; denomination_type: string; count: number; amount: number; metadata: Record<string,unknown>; }
export interface GEFIPettyCashReconciliation extends BaseEntity { fund_id: string; reconciliation_date: string; opening_balance: number; receipts_total: number; expected_balance: number; actual_balance: number; difference: number; reconciled_by: string; status: 'COMPLETED'|'DISCREPANCY'; metadata: Record<string,unknown>; }
export interface GEFIPettyCashVoucher extends BaseEntity { fund_id: string; voucher_number: string; amount: number; description: string; category: string; receipt_url?: string; authorized_by: string; status: 'PENDING'|'APPROVED'|'REJECTED'; created_at: string; metadata: Record<string,unknown>; }
export interface GEFIAutomatedMatchRule extends BaseEntity { name: string; type: string; field_matching: Record<string,unknown>; tolerance_amount: number; tolerance_days: number; priority: number; is_active: boolean; match_count: number; accuracy_rate: number; metadata: Record<string,unknown>; }
export interface GEFIClosingBalanceCarryForward extends BaseEntity { account_id: string; period: string; opening_balance: number; closing_balance: number; carry_forward_date: string; status: 'PENDING'|'COMPLETED'|'FAILED'; metadata: Record<string,unknown>; }
export interface GEFIReconciliationReport extends BaseEntity { job_id: string; report_type: string; summary: Record<string,unknown>; details: Record<string,unknown>[]; generated_at: string; file_url?: string; status: 'GENERATED'|'REVIEWED'|'ARCHIVED'; metadata: Record<string,unknown>; }
export interface GEFIAuditTrail extends BaseEntity { entity_type: string; entity_id: string; action: string; actor_id: string; changes: Record<string,unknown>; ip_address?: string; metadata: Record<string,unknown>; }

export interface GEFI14Repository {
  reconciliationJob: CrudRepository<GEFIReconciliationJob>;
  reconciliationStatement: CrudRepository<GEFIReconciliationStatement>;
  reconciliationItem: CrudRepository<GEFIReconciliationItem>;
  reconciliationMatch: CrudRepository<GEFIReconciliationMatch>;
  reconciliationDiscrepancy: CrudRepository<GEFIReconciliationDiscrepancy>;
  reconciliationAdjustment: CrudRepository<GEFIReconciliationAdjustment>;
  reconciliationApproval: CrudRepository<GEFIReconciliationApproval>;
  intercompanyReconciliation: CrudRepository<GEFIIntercompanyReconciliation>;
  intercompanyReconciliationItem: CrudRepository<GEFIIntercompanyReconciliationItem>;
  intercompanySettlement: CrudRepository<GEFIIntercompanySettlement>;
  cashReconciliation: CrudRepository<GEFICashReconciliation>;
  cashReconciliationDenomination: CrudRepository<GEFICashReconciliationDenomination>;
  pettyCashReconciliation: CrudRepository<GEFIPettyCashReconciliation>;
  pettyCashVoucher: CrudRepository<GEFIPettyCashVoucher>;
  automatedMatchRule: CrudRepository<GEFIAutomatedMatchRule>;
  closingBalanceCarryForward: CrudRepository<GEFIClosingBalanceCarryForward>;
  reconciliationReport: CrudRepository<GEFIReconciliationReport>;
  auditTrail: CrudRepository<GEFIAuditTrail>;
}

export function createGEFI14Repository(supabase: SupabaseClient): GEFI14Repository {
  return {
    reconciliationJob: createCrudRepository<GEFIReconciliationJob>(supabase, 'gefi_reconciliation_jobs'),
    reconciliationStatement: createCrudRepository<GEFIReconciliationStatement>(supabase, 'gefi_reconciliation_statements'),
    reconciliationItem: createCrudRepository<GEFIReconciliationItem>(supabase, 'gefi_reconciliation_items'),
    reconciliationMatch: createCrudRepository<GEFIReconciliationMatch>(supabase, 'gefi_reconciliation_matches'),
    reconciliationDiscrepancy: createCrudRepository<GEFIReconciliationDiscrepancy>(supabase, 'gefi_reconciliation_discrepancies'),
    reconciliationAdjustment: createCrudRepository<GEFIReconciliationAdjustment>(supabase, 'gefi_reconciliation_adjustments'),
    reconciliationApproval: createCrudRepository<GEFIReconciliationApproval>(supabase, 'gefi_reconciliation_approvals'),
    intercompanyReconciliation: createCrudRepository<GEFIIntercompanyReconciliation>(supabase, 'gefi_intercompany_reconciliations'),
    intercompanyReconciliationItem: createCrudRepository<GEFIIntercompanyReconciliationItem>(supabase, 'gefi_intercompany_reconciliation_items'),
    intercompanySettlement: createCrudRepository<GEFIIntercompanySettlement>(supabase, 'gefi_intercompany_settlements'),
    cashReconciliation: createCrudRepository<GEFICashReconciliation>(supabase, 'gefi_cash_reconciliations'),
    cashReconciliationDenomination: createCrudRepository<GEFICashReconciliationDenomination>(supabase, 'gefi_cash_reconciliation_denominations'),
    pettyCashReconciliation: createCrudRepository<GEFIPettyCashReconciliation>(supabase, 'gefi_petty_cash_reconciliations'),
    pettyCashVoucher: createCrudRepository<GEFIPettyCashVoucher>(supabase, 'gefi_petty_cash_vouchers'),
    automatedMatchRule: createCrudRepository<GEFIAutomatedMatchRule>(supabase, 'gefi_automated_match_rules'),
    closingBalanceCarryForward: createCrudRepository<GEFIClosingBalanceCarryForward>(supabase, 'gefi_closing_balance_carry_forwards'),
    reconciliationReport: createCrudRepository<GEFIReconciliationReport>(supabase, 'gefi_reconciliation_reports'),
    auditTrail: createCrudRepository<GEFIAuditTrail>(supabase, 'gefi_reconciliation_audit_trails'),
  };
}
