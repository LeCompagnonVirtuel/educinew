import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gefi-base.repository';

// ============================================================================
// GEFI-1: Financial Core — Double-Entry Bookkeeping, Ledgers, Journals, Fiscal Years
// ============================================================================

export interface GEFIGlAccount extends BaseEntity { code: string; name: string; type: 'ASSET'|'LIABILITY'|'EQUITY'|'REVENUE'|'EXPENSE'|'CONTRA_ASSET'|'CONTRA_LIABILITY'|'CONTRA_REVENUE'|'CONTRA_EXPENSE'; parent_id?: string; currency_code: string; is_active: boolean; description?: string; level: number; is_postable: boolean; opening_balance: number; current_balance: number; metadata: Record<string,unknown>; }
export interface GEFIGlLedger extends BaseEntity { name: string; type: 'GENERAL'|'SUBSIDIARY'|'COST_CENTER'|'PROFIT_CENTER'|'PROJECT'|'DEPARTMENT'; currency_code: string; fiscal_year_id: string; is_open: boolean; description?: string; metadata: Record<string,unknown>; }
export interface GEFIGlJournal extends BaseEntity { name: string; type: 'GENERAL'|'SALES'|'PURCHASE'|'CASH'|'BANK'|'PAYROLL'|'ADJUSTING'|'CLOSING'|'REVERSING'; ledger_id: string; is_open: boolean; description?: string; metadata: Record<string,unknown>; }
export interface GEFIGlJournalEntry extends BaseEntity { journal_id: string; date: string; reference: string; description: string; total_debit: number; total_credit: number; status: 'PENDING'|'POSTED'|'APPROVED'|'REJECTED'|'REVERSED'|'CANCELLED'|'ON_HOLD'; posted_at?: string; approved_by?: string; source_type?: string; source_id?: string; metadata: Record<string,unknown>; }
export interface GEFIGlJournalEntryLine extends BaseEntity { journal_entry_id: string; account_id: string; debit: number; credit: number; description?: string; cost_center_id?: string; project_id?: string; metadata: Record<string,unknown>; }
export interface GEFIGlFiscalYear extends BaseEntity { name: string; start_date: string; end_date: string; status: 'DRAFT'|'ACTIVE'|'CLOSED'|'AUDITED'|'ARCHIVED'; closed_by?: string; closed_at?: string; metadata: Record<string,unknown>; }
export interface GEFIGlFiscalPeriod extends BaseEntity { fiscal_year_id: string; name: string; start_date: string; end_date: string; status: 'OPEN'|'CLOSED'|'LOCKED'; closed_by?: string; closed_at?: string; metadata: Record<string,unknown>; }
export interface GEFIGlCostCenter extends BaseEntity { code: string; name: string; type: 'DEPARTMENT'|'PROJECT'|'PROGRAM'|'SERVICE'|'LOCATION'|'ACTIVITY'; parent_id?: string; manager_id?: string; is_active: boolean; budget_amount: number; spent_amount: number; metadata: Record<string,unknown>; }
export interface GEFIGlBudget extends BaseEntity { name: string; fiscal_year_id: string; cost_center_id?: string; account_id: string; amount: number; spent: number; variance: number; period_type: 'MONTHLY'|'QUARTERLY'|'ANNUAL'; status: 'DRAFT'|'ACTIVE'|'FROZEN'|'CLOSED'; metadata: Record<string,unknown>; }
export interface GEFIGlFinancialStatement extends BaseEntity { name: string; type: 'BALANCE_SHEET'|'INCOME_STATEMENT'|'CASH_FLOW'|'TRIAL_BALANCE'|'EQUITY_STATEMENT'; fiscal_year_id: string; as_of_date: string; data: Record<string,unknown>; generated_by: string; status: 'DRAFT'|'FINAL'|'AUDITED'; metadata: Record<string,unknown>; }
export interface GEFIGlCurrency extends BaseEntity { code: string; name: string; symbol: string; decimal_places: number; is_active: boolean; is_base_currency: boolean; metadata: Record<string,unknown>; }
export interface GEFIGlExchangeRate extends BaseEntity { from_currency: string; to_currency: string; rate: number; type: 'SPOT'|'FORWARD'|'FIXED'|'MOBILE'|'PARALLEL'; effective_date: string; source: string; metadata: Record<string,unknown>; }
export interface GEFIGlTaxRate extends BaseEntity { name: string; code: string; rate: number; type: 'VAT'|'SALES_TAX'|'WITHHOLDING'|'EXCISE'|'IMPORT_DUTY'|'EDUCATION_TAX'|'EXEMPT'; is_active: boolean; applies_to: string[]; metadata: Record<string,unknown>; }
export interface GEFIGlRecurringEntry extends BaseEntity { name: string; template_entry_id: string; frequency: 'DAILY'|'WEEKLY'|'BIWEEKLY'|'MONTHLY'|'QUARTERLY'|'ANNUAL'; start_date: string; end_date?: string; next_run_date: string; is_active: boolean; total_runs: number; max_runs?: number; metadata: Record<string,unknown>; }
export interface GEFIGlConsolidationRule extends BaseEntity { name: string; source_account_id: string; target_account_id: string; elimination_type: 'INTERCOMPANY'|'INTRA_GROUP'|'ADJUSTMENT'; percentage: number; is_active: boolean; metadata: Record<string,unknown>; }
export interface GEFIGlAuditTrail extends BaseEntity { entity_type: string; entity_id: string; action: 'CREATE'|'UPDATE'|'DELETE'|'POST'|'APPROVE'|'REJECT'|'REVERSE'; changes: Record<string,unknown>; performed_by: string; ip_address?: string; user_agent?: string; metadata: Record<string,unknown>; }
export interface GEFIGlAttachment extends BaseEntity { entity_type: string; entity_id: string; file_name: string; file_url: string; file_size: number; mime_type: string; uploaded_by: string; metadata: Record<string,unknown>; }
export interface GEFIGlApprovalWorkflow extends BaseEntity { name: string; entity_type: string; min_amount: number; max_amount?: number; approvers: string[]; status: 'ACTIVE'|'INACTIVE'; metadata: Record<string,unknown>; }
export interface GEFIGlApprovalRecord extends BaseEntity { workflow_id: string; entity_type: string; entity_id: string; amount: number; requested_by: string; approved_by?: string; status: 'PENDING'|'APPROVED'|'REJECTED'|'CANCELLED'; comments?: string; approved_at?: string; metadata: Record<string,unknown>; }
export interface GEFIGlReportTemplate extends BaseEntity { name: string; type: 'BALANCE_SHEET'|'INCOME_STATEMENT'|'CASH_FLOW'|'TRIAL_BALANCE'|'CUSTOM'; definition: Record<string,unknown>; is_default: boolean; metadata: Record<string,unknown>; }
export interface GEFIGlPeriodClose extends BaseEntity { fiscal_period_id: string; closed_by: string; closed_at: string; entries_posted: number; entries_reversed: number; adjustments_made: number; status: 'COMPLETED'|'FAILED'; metadata: Record<string,unknown>; }
export interface GEFIGlYearClose extends BaseEntity { fiscal_year_id: string; closed_by: string; closed_at: string; net_income: number; dividends?: number; retained_earnings: number; status: 'COMPLETED'|'FAILED'; metadata: Record<string,unknown>; }
export interface GEFIGlIntercompany extends BaseEntity { from_school_id: string; to_school_id: string; entry_id: string; amount: number; currency_code: string; status: 'PENDING'|'SETTLED'|'DISPUTED'; settled_at?: string; metadata: Record<string,unknown>; }
export interface GEFIGlMapping extends BaseEntity { source_account_id: string; target_account_id: string; type: 'ONE_TO_ONE'|'MANY_TO_ONE'|'ONE_TO_MANY'|'MANY_TO_MANY'; percentage?: number; is_active: boolean; metadata: Record<string,unknown>; }
export interface GEFIGlValidationRule extends BaseEntity { name: string; rule_type: 'DEBIT_CREDIT_EQUAL'|'ACCOUNT_TYPE'|'AMOUNT_LIMIT'|'PERIOD_OPEN'|'CUSTOM'; definition: Record<string,unknown>; severity: 'ERROR'|'WARNING'; is_active: boolean; metadata: Record<string,unknown>; }
export interface GEFIGlDashboardMetric extends BaseEntity { metric_name: string; metric_value: number; metric_type: 'CURRENCY'|'PERCENTAGE'|'COUNT'|'RATIO'; period: string; category: string; trend?: 'UP'|'DOWN'|'STABLE'; metadata: Record<string,unknown>; }
export interface GEFIGlAlert extends BaseEntity { rule_name: string; alert_type: 'BALANCE_THRESHOLD'|'BUDGET_VARIANCE'|'UNPOSTED_ENTRIES'|'APPROVAL_PENDING'|'CUSTOM'; severity: 'LOW'|'MEDIUM'|'HIGH'|'CRITICAL'; message: string; entity_type?: string; entity_id?: string; is_read: boolean; resolved: boolean; resolved_at?: string; metadata: Record<string,unknown>; }
export interface GEFIGlIntegration extends BaseEntity { name: string; type: 'ACCOUNTING_SOFTWARE'|'BANK'|'PAYMENT_GATEWAY'|'ERP'|'TAX_AUTHORITY'; provider: string; config: Record<string,unknown>; status: 'ACTIVE'|'INACTIVE'|'ERROR'; last_sync_at?: string; metadata: Record<string,unknown>; }
export interface GEFIGlSyncLog extends BaseEntity { integration_id: string; direction: 'INBOUND'|'OUTBOUND'; entity_type: string; entity_id: string; status: 'SUCCESS'|'FAILED'|'PENDING'; error_message?: string; payload: Record<string,unknown>; metadata: Record<string,unknown>; }
export interface GEFIGlReconciliation extends BaseEntity { account_id: string; statement_date: string; statement_balance: number; book_balance: number; difference: number; status: 'UNMATCHED'|'MATCHED'|'DISPUTED'|'RESOLVED'; reconciled_by?: string; reconciled_at?: string; metadata: Record<string,unknown>; }
export interface GEFIGlReconciliationItem extends BaseEntity { reconciliation_id: string; journal_entry_id: string; amount: number; description: string; is_matched: boolean; matched_at?: string; metadata: Record<string,unknown>; }
export interface GEFIGlChartOfAccounts extends BaseEntity { name: string; type: 'STANDARD'|'MULTI_LEVEL'|'CONSOLIDATED'|'INTERSCHOOL'; version: number; is_active: boolean; account_count: number; metadata: Record<string,unknown>; }
export interface GEFIGlChartOfAccountsMapping extends BaseEntity { chart_id: string; account_id: string; display_order: number; is_visible: boolean; metadata: Record<string,unknown>; }
export interface GEFIGlTemplate extends BaseEntity { name: string; description: string; type: 'JOURNAL_ENTRY'|'RECURRING_ENTRY'|'ADJUSTMENT'|'CLOSING'; entries: Record<string,unknown>[]; is_active: boolean; use_count: number; metadata: Record<string,unknown>; }

// ============================================================================
// Repository Interface
// ============================================================================

export interface GEFI1Repository {
  glAccount: CrudRepository<GEFIGlAccount>;
  glLedger: CrudRepository<GEFIGlLedger>;
  glJournal: CrudRepository<GEFIGlJournal>;
  glJournalEntry: CrudRepository<GEFIGlJournalEntry>;
  glJournalEntryLine: CrudRepository<GEFIGlJournalEntryLine>;
  glFiscalYear: CrudRepository<GEFIGlFiscalYear>;
  glFiscalPeriod: CrudRepository<GEFIGlFiscalPeriod>;
  glCostCenter: CrudRepository<GEFIGlCostCenter>;
  glBudget: CrudRepository<GEFIGlBudget>;
  glFinancialStatement: CrudRepository<GEFIGlFinancialStatement>;
  glCurrency: CrudRepository<GEFIGlCurrency>;
  glExchangeRate: CrudRepository<GEFIGlExchangeRate>;
  glTaxRate: CrudRepository<GEFIGlTaxRate>;
  glRecurringEntry: CrudRepository<GEFIGlRecurringEntry>;
  glConsolidationRule: CrudRepository<GEFIGlConsolidationRule>;
  glAuditTrail: CrudRepository<GEFIGlAuditTrail>;
  glAttachment: CrudRepository<GEFIGlAttachment>;
  glApprovalWorkflow: CrudRepository<GEFIGlApprovalWorkflow>;
  glApprovalRecord: CrudRepository<GEFIGlApprovalRecord>;
  glReportTemplate: CrudRepository<GEFIGlReportTemplate>;
  glPeriodClose: CrudRepository<GEFIGlPeriodClose>;
  glYearClose: CrudRepository<GEFIGlYearClose>;
  glIntercompany: CrudRepository<GEFIGlIntercompany>;
  glMapping: CrudRepository<GEFIGlMapping>;
  glValidationRule: CrudRepository<GEFIGlValidationRule>;
  glDashboardMetric: CrudRepository<GEFIGlDashboardMetric>;
  glAlert: CrudRepository<GEFIGlAlert>;
  glIntegration: CrudRepository<GEFIGlIntegration>;
  glSyncLog: CrudRepository<GEFIGlSyncLog>;
  glReconciliation: CrudRepository<GEFIGlReconciliation>;
  glReconciliationItem: CrudRepository<GEFIGlReconciliationItem>;
  glChartOfAccounts: CrudRepository<GEFIGlChartOfAccounts>;
  glChartOfAccountsMapping: CrudRepository<GEFIGlChartOfAccountsMapping>;
  glTemplate: CrudRepository<GEFIGlTemplate>;
}

// ============================================================================
// Factory
// ============================================================================

export function createGEFI1Repository(supabase: SupabaseClient): GEFI1Repository {
  return {
    glAccount: createCrudRepository<GEFIGlAccount>(supabase, 'gefi_gl_accounts'),
    glLedger: createCrudRepository<GEFIGlLedger>(supabase, 'gefi_gl_ledgers'),
    glJournal: createCrudRepository<GEFIGlJournal>(supabase, 'gefi_gl_journals'),
    glJournalEntry: createCrudRepository<GEFIGlJournalEntry>(supabase, 'gefi_gl_journal_entries'),
    glJournalEntryLine: createCrudRepository<GEFIGlJournalEntryLine>(supabase, 'gefi_gl_journal_entry_lines'),
    glFiscalYear: createCrudRepository<GEFIGlFiscalYear>(supabase, 'gefi_gl_fiscal_years'),
    glFiscalPeriod: createCrudRepository<GEFIGlFiscalPeriod>(supabase, 'gefi_gl_fiscal_periods'),
    glCostCenter: createCrudRepository<GEFIGlCostCenter>(supabase, 'gefi_gl_cost_centers'),
    glBudget: createCrudRepository<GEFIGlBudget>(supabase, 'gefi_gl_budgets'),
    glFinancialStatement: createCrudRepository<GEFIGlFinancialStatement>(supabase, 'gefi_gl_financial_statements'),
    glCurrency: createCrudRepository<GEFIGlCurrency>(supabase, 'gefi_gl_currencies'),
    glExchangeRate: createCrudRepository<GEFIGlExchangeRate>(supabase, 'gefi_gl_exchange_rates'),
    glTaxRate: createCrudRepository<GEFIGlTaxRate>(supabase, 'gefi_gl_tax_rates'),
    glRecurringEntry: createCrudRepository<GEFIGlRecurringEntry>(supabase, 'gefi_gl_recurring_entries'),
    glConsolidationRule: createCrudRepository<GEFIGlConsolidationRule>(supabase, 'gefi_gl_consolidation_rules'),
    glAuditTrail: createCrudRepository<GEFIGlAuditTrail>(supabase, 'gefi_gl_audit_trails'),
    glAttachment: createCrudRepository<GEFIGlAttachment>(supabase, 'gefi_gl_attachments'),
    glApprovalWorkflow: createCrudRepository<GEFIGlApprovalWorkflow>(supabase, 'gefi_gl_approval_workflows'),
    glApprovalRecord: createCrudRepository<GEFIGlApprovalRecord>(supabase, 'gefi_gl_approval_records'),
    glReportTemplate: createCrudRepository<GEFIGlReportTemplate>(supabase, 'gefi_gl_report_templates'),
    glPeriodClose: createCrudRepository<GEFIGlPeriodClose>(supabase, 'gefi_gl_period_closes'),
    glYearClose: createCrudRepository<GEFIGlYearClose>(supabase, 'gefi_gl_year_closes'),
    glIntercompany: createCrudRepository<GEFIGlIntercompany>(supabase, 'gefi_gl_intercompany'),
    glMapping: createCrudRepository<GEFIGlMapping>(supabase, 'gefi_gl_mappings'),
    glValidationRule: createCrudRepository<GEFIGlValidationRule>(supabase, 'gefi_gl_validation_rules'),
    glDashboardMetric: createCrudRepository<GEFIGlDashboardMetric>(supabase, 'gefi_gl_dashboard_metrics'),
    glAlert: createCrudRepository<GEFIGlAlert>(supabase, 'gefi_gl_alerts'),
    glIntegration: createCrudRepository<GEFIGlIntegration>(supabase, 'gefi_gl_integrations'),
    glSyncLog: createCrudRepository<GEFIGlSyncLog>(supabase, 'gefi_gl_sync_logs'),
    glReconciliation: createCrudRepository<GEFIGlReconciliation>(supabase, 'gefi_gl_reconciliations'),
    glReconciliationItem: createCrudRepository<GEFIGlReconciliationItem>(supabase, 'gefi_gl_reconciliation_items'),
    glChartOfAccounts: createCrudRepository<GEFIGlChartOfAccounts>(supabase, 'gefi_gl_chart_of_accounts'),
    glChartOfAccountsMapping: createCrudRepository<GEFIGlChartOfAccountsMapping>(supabase, 'gefi_gl_coa_mappings'),
    glTemplate: createCrudRepository<GEFIGlTemplate>(supabase, 'gefi_gl_templates'),
  };
}
