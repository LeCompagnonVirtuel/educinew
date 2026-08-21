import { SupabaseClient } from '@supabase/supabase-js';
import { AppError, NotFoundError, ValidationError } from '@educi/errors';
import { CrudRepository, CrudRepositoryImpl, createCrudRepository } from './aeip-base.repository';

// ═══════════════════════════════════════════════════════════════════════
// AEIP-8 AUTONOMOUS FINANCE — Repository
// Comptabilité, budget, trésorerie, prévisionnel, reporting, fiscalité
// Table prefix: afn
// ═══════════════════════════════════════════════════════════════════════

// ── Finance Configuration ──
export interface AfnFinanceConfig {
  id: string;
  school_id: string;
  config_name: string;
  fiscal_year_start: string;
  fiscal_year_end: string;
  currency: string;
  currency_symbol: string;
  tax_enabled: boolean;
  tax_rate_default: number;
  chart_of_accounts_standard: 'plan_comptable_ohada' | 'ifrs' | 'gaap' | 'custom';
  auto_reconciliation: boolean;
  ai_forecasting_enabled: boolean;
  ai_budget_optimization: boolean;
  multi_currency_enabled: boolean;
  bank_feeds_enabled: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AfnFiscalYear {
  id: string;
  school_id: string;
  year_label: string;
  start_date: string;
  end_date: string;
  status: 'active' | 'closed' | 'locked';
  closed_by: string | null;
  closed_at: string | null;
  closing_entries_count: number;
  profit_loss: number;
  balance_sheet_verified: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AfnFiscalPeriod {
  id: string;
  school_id: string;
  fiscal_year_id: string;
  period_name: string;
  period_number: number;
  start_date: string;
  end_date: string;
  status: 'active' | 'closed' | 'locked';
  journal_entries_count: number;
  total_debits: number;
  total_credits: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Chart of Accounts ──
export interface AfnAccount {
  id: string;
  school_id: string;
  account_code: string;
  account_name: string;
  account_name_en: string | null;
  account_type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  account_sub_type: 'current_asset' | 'fixed_asset' | 'current_liability' | 'long_term_liability' | 'retained_earnings' | 'operating_revenue' | 'non_operating_revenue' | 'operating_expense' | 'non_operating_expense';
  parent_id: string | null;
  level: number;
  is_leaf: boolean;
  is_active: boolean;
  is_system: boolean;
  normal_balance: 'debit' | 'credit';
  description: string;
  tax_account: boolean;
  bank_account: boolean;
  cash_account: boolean;
  currency: string;
  opening_balance: number;
  current_balance: number;
  debit_total: number;
  credit_total: number;
  budget_allocation_id: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AfnAccountGroup {
  id: string;
  school_id: string;
  group_code: string;
  group_name: string;
  account_type: string;
  parent_id: string | null;
  level: number;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Journal Entries ──
export interface AfnJournal {
  id: string;
  school_id: string;
  journal_code: string;
  journal_name: string;
  journal_type: 'general' | 'sales' | 'purchases' | 'cash' | 'bank' | 'petty_cash' | 'payroll' | 'opening' | 'closing' | 'adjusting' | 'reversing';
  description: string;
  is_active: boolean;
  auto_numbering: boolean;
  next_number: number;
  prefix_format: string;
  entries_count: number;
  fiscal_year_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AfnJournalEntry {
  id: string;
  school_id: string;
  journal_id: string;
  entry_number: string;
  entry_date: string;
  description: string;
  reference: string | null;
  source_type: 'manual' | 'invoice' | 'payment' | 'bank_feed' | 'payroll' | 'depreciation' | 'adjustment' | 'auto_recurring';
  source_id: string | null;
  status: 'draft' | 'posted' | 'voided' | 'reversed';
  fiscal_year_id: string;
  fiscal_period_id: string;
  total_debit: number;
  total_credit: number;
  currency: string;
  exchange_rate: number;
  reconciled: boolean;
  reconciled_at: string | null;
  reconciled_by: string | null;
  voided_reason: string | null;
  voided_at: string | null;
  ai_generated: boolean;
  ai_confidence: number;
  approved_by: string | null;
  approved_at: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AfnJournalEntryLine {
  id: string;
  school_id: string;
  journal_entry_id: string;
  line_number: number;
  account_id: string;
  description: string | null;
  debit: number;
  credit: number;
  currency: string;
  exchange_rate: number;
  amount_local: number;
  tax_id: string | null;
  tax_amount: number;
  reconcile: boolean;
  reconcile_group: string | null;
  partner_id: string | null;
  project_id: string | null;
  cost_center_id: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AfnJournalEntryAttachment {
  id: string;
  school_id: string;
  journal_entry_id: string;
  file_name: string;
  file_url: string;
  file_size_bytes: number;
  mime_type: string;
  description: string;
  uploaded_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Invoicing ──
export interface AfnInvoice {
  id: string;
  school_id: string;
  invoice_number: string;
  invoice_type: 'sale' | 'purchase' | 'credit_note' | 'debit_note' | 'proforma' | 'down_payment';
  status: 'draft' | 'sent' | 'viewed' | 'partial' | 'paid' | 'overdue' | 'cancelled' | 'voided';
  partner_id: string;
  partner_type: 'student' | 'parent' | 'supplier' | 'other';
  partner_name: string;
  partner_email: string;
  partner_address: string;
  invoice_date: string;
  due_date: string;
  payment_terms: string;
  currency: string;
  subtotal: number;
  discount_percent: number;
  discount_amount: number;
  tax_amount: number;
  total_amount: number;
  amount_paid: number;
  amount_remaining: number;
  lines: AfnInvoiceLine[];
  notes: string;
  terms_conditions: string;
  po_number: string | null;
  reference: string | null;
  recurring_id: string | null;
  ai_extracted: boolean;
  ai_confidence: number;
  sent_at: string | null;
  viewed_at: string | null;
  paid_at: string | null;
  cancelled_at: string | null;
  cancelled_reason: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AfnInvoiceLine {
  id: string;
  school_id: string;
  invoice_id: string;
  line_number: number;
  description: string;
  account_id: string;
  quantity: number;
  unit_price: number;
  discount_percent: number;
  tax_id: string | null;
  tax_amount: number;
  subtotal: number;
  total: number;
  product_id: string | null;
  unit_of_measure: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AfnInvoiceTemplate {
  id: string;
  school_id: string;
  template_name: string;
  template_type: 'sale' | 'purchase' | 'credit_note' | 'proforma';
  is_default: boolean;
  layout: 'standard' | 'modern' | 'minimal' | 'classic';
  primary_color: string;
  logo_url: string | null;
  header_html: string;
  footer_html: string;
  terms_conditions: string;
  notes_default: string;
  numbering_format: string;
  numbering_next: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Payments ──
export interface AfnPayment {
  id: string;
  school_id: string;
  payment_number: string;
  payment_type: 'incoming' | 'outgoing' | 'transfer' | 'refund' | 'advance';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'reconciled';
  payment_method: 'cash' | 'bank_transfer' | 'mobile_money' | 'check' | 'card' | 'money_fusion' | 'other';
  partner_id: string;
  partner_type: string;
  partner_name: string;
  amount: number;
  currency: string;
  exchange_rate: number;
  amount_local: number;
  fee_amount: number;
  net_amount: number;
  bank_account_id: string | null;
  check_number: string | null;
  transaction_reference: string | null;
  payment_date: string;
  value_date: string;
  reconciled: boolean;
  reconciled_at: string | null;
  reconciled_by: string | null;
  invoice_id: string | null;
  invoice_ids: string[];
  journal_entry_id: string | null;
  notes: string;
  attachments: string[];
  gateway_response: Record<string, unknown>;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AfnPaymentAllocation {
  id: string;
  school_id: string;
  payment_id: string;
  invoice_id: string;
  amount_allocated: number;
  currency: string;
  exchange_rate: number;
  discount_taken: number;
  write_off_amount: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AfnBankAccount {
  id: string;
  school_id: string;
  bank_name: string;
  bank_code: string;
  account_name: string;
  account_number: string;
  account_iban: string | null;
  account_swift: string | null;
  account_type: 'checking' | 'savings' | 'petty_cash' | 'investment' | 'loan';
  currency: string;
  opening_balance: number;
  current_balance: number;
  reconciled_balance: number;
  ledger_account_id: string;
  is_active: boolean;
  is_default: boolean;
  feed_enabled: boolean;
  feed_provider: string | null;
  feed_credentials: Record<string, unknown>;
  last_sync_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AfnBankTransaction {
  id: string;
  school_id: string;
  bank_account_id: string;
  transaction_date: string;
  value_date: string;
  description: string;
  reference: string;
  debit: number;
  credit: number;
  balance_after: number;
  currency: string;
  exchange_rate: number;
  reconciled: boolean;
  reconciled_date: string | null;
  reconciled_by: string | null;
  journal_entry_id: string | null;
  payment_id: string | null;
  feed_id: string | null;
  ai_categorized: boolean;
  ai_suggested_account_id: string | null;
  ai_confidence: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AfnBankReconciliation {
  id: string;
  school_id: string;
  bank_account_id: string;
  reconciliation_date: string;
  statement_date: string;
  statement_balance: number;
  book_balance: number;
  difference: number;
  status: 'in_progress' | 'completed' | 'discrepancy';
  transactions_matched: number;
  transactions_unmatched: number;
  completed_by: string | null;
  completed_at: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Budget ──
export interface AfnBudget {
  id: string;
  school_id: string;
  budget_name: string;
  budget_type: 'annual' | 'quarterly' | 'monthly' | 'project' | 'department' | 'program';
  fiscal_year_id: string;
  status: 'draft' | 'proposed' | 'approved' | 'active' | 'closed' | 'overridden';
  total_income: number;
  total_expenses: number;
  surplus_deficit: number;
  approved_by: string | null;
  approved_at: string | null;
  ai_optimized: boolean;
  ai_suggestions: Record<string, unknown>;
  version: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AfnBudgetLine {
  id: string;
  school_id: string;
  budget_id: string;
  account_id: string;
  line_type: 'income' | 'expense';
  description: string;
  amount_q1: number;
  amount_q2: number;
  amount_q3: number;
  amount_q4: number;
  total_amount: number;
  actual_amount: number;
  variance_amount: number;
  variance_percent: number;
  forecast_amount: number;
  committed_amount: number;
  available_amount: number;
  department_id: string | null;
  project_id: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AfnBudgetVersion {
  id: string;
  school_id: string;
  budget_id: string;
  version_number: number;
  snapshot_url: string;
  total_income: number;
  total_expenses: number;
  notes: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AfnBudgetAlert {
  id: string;
  school_id: string;
  budget_id: string;
  alert_type: 'threshold_exceeded' | 'variance_significant' | 'forecast_overrun' | 'spending_accelerated' | 'unusual_transaction';
  severity: 'info' | 'warning' | 'critical';
  account_id: string | null;
  message: string;
  details: Record<string, unknown>;
  acknowledged: boolean;
  acknowledged_by: string | null;
  acknowledged_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Treasury ──
export interface AfnCashFlowForecast {
  id: string;
  school_id: string;
  forecast_name: string;
  forecast_date: string;
  horizon_days: number;
  status: 'active' | 'superseded' | 'archived';
  opening_balance: number;
  closing_balance: number;
  total_inflows: number;
  total_outflows: number;
  net_cash_flow: number;
  ai_predicted: boolean;
  confidence_score: number;
  daily_projections: Record<string, unknown>[];
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AfnCashFlowLine {
  id: string;
  school_id: string;
  forecast_id: string;
  line_date: string;
  category: 'inflow' | 'outflow';
  subcategory: string;
  description: string;
  amount: number;
  probability: number;
  source_type: 'recurring' | 'invoice' | 'forecast' | 'manual' | 'ai_predicted';
  source_id: string | null;
  account_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AfnTreasuryPosition {
  id: string;
  school_id: string;
  position_date: string;
  bank_accounts: Record<string, unknown>[];
  total_bank_balance: number;
  petty_cash_balance: number;
  investments_balance: number;
  receivables_amount: number;
  payables_amount: number;
  net_position: number;
  days_of_runway: number;
  liquidity_score: number;
  alerts: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AfnInvestment {
  id: string;
  school_id: string;
  investment_name: string;
  investment_type: 'deposit' | 'bond' | 'treasury_bill' | 'money_market' | 'fixed_deposit' | 'other';
  institution: string;
  principal_amount: number;
  interest_rate: number;
  start_date: string;
  maturity_date: string;
  status: 'active' | 'matured' | 'withdrawn' | 'renewed';
  account_id: string;
  current_value: number;
  accrued_interest: number;
  total_earnings: number;
  auto_renew: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Taxes ──
export interface AfnTax {
  id: string;
  school_id: string;
  tax_code: string;
  tax_name: string;
  tax_type: 'vat' | 'sales_tax' | 'withholding' | 'income_tax' | 'property_tax' | 'excise' | 'exempt';
  rate: number;
  rate_type: 'percentage' | 'fixed';
  is_compound: boolean;
  parent_tax_id: string | null;
  account_id: string;
  is_active: boolean;
  applies_to: string[];
  min_amount: number | null;
  max_amount: number | null;
  description: string;
  effective_from: string;
  effective_to: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AfnTaxDeclaration {
  id: string;
  school_id: string;
  declaration_type: string;
  fiscal_period_id: string;
  period_start: string;
  period_end: string;
  status: 'draft' | 'ready' | 'submitted' | 'accepted' | 'rejected' | 'amended';
  taxable_amount: number;
  tax_amount: number;
  adjustments: number;
  final_amount: number;
  filing_date: string;
  due_date: string;
  submitted_date: string | null;
  payment_date: string | null;
  reference_number: string | null;
  declaration_data: Record<string, unknown>;
  attachments: string[];
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Depreciation ──
export interface AfnAssetRegister {
  id: string;
  school_id: string;
  asset_name: string;
  asset_code: string;
  asset_category: string;
  description: string;
  acquisition_date: string;
  acquisition_cost: number;
  salvage_value: number;
  useful_life_months: number;
  depreciation_method: 'straight_line' | 'declining_balance' | 'units_of_production' | 'sum_of_years';
  ledger_account_id: string;
  depreciation_account_id: string;
  accumulated_depreciation: number;
  net_book_value: number;
  location: string;
  status: 'active' | 'fully_depreciated' | 'disposed' | 'impairment';
  disposed_date: string | null;
  disposed_amount: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AfnDepreciationRun {
  id: string;
  school_id: string;
  run_date: string;
  fiscal_period_id: string;
  status: 'completed' | 'posted' | 'reversed';
  assets_processed: number;
  total_depreciation: number;
  journal_entry_id: string | null;
  details: Record<string, unknown>[];
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AfnDepreciationEntry {
  id: string;
  school_id: string;
  run_id: string;
  asset_id: string;
  period_number: number;
  depreciation_amount: number;
  accumulated_total: number;
  net_book_value: number;
  journal_entry_id: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Reporting ──
export interface AfnFinancialReport {
  id: string;
  school_id: string;
  report_name: string;
  report_type: 'income_statement' | 'balance_sheet' | 'cash_flow' | 'trial_balance' | 'general_ledger' | 'aged_receivables' | 'aged_payables' | 'budget_variance' | 'tax_report' | 'custom';
  status: 'draft' | 'generated' | 'reviewed' | 'published';
  period_type: 'monthly' | 'quarterly' | 'annual' | 'custom';
  period_start: string;
  period_end: string;
  generated_at: string;
  generated_by: string;
  data: Record<string, unknown>;
  format: 'pdf' | 'excel' | 'html' | 'json';
  file_url: string | null;
  is_ai_analyzed: boolean;
  ai_insights: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AfnReportSchedule {
  id: string;
  school_id: string;
  report_type: string;
  schedule_name: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  day_of_week: number | null;
  day_of_month: number | null;
  recipients: string[];
  format: 'pdf' | 'excel' | 'email';
  is_active: boolean;
  last_run_at: string | null;
  next_run_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AfnKPI {
  id: string;
  school_id: string;
  kpi_name: string;
  kpi_code: string;
  category: 'liquidity' | 'profitability' | 'efficiency' | 'solvency' | 'growth' | 'custom';
  formula: string;
  target_value: number;
  current_value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'on_track' | 'warning' | 'critical';
  period: string;
  history: Record<string, unknown>[];
  ai_forecast: Record<string, unknown>;
  alert_threshold: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Reconciliation ──
export interface AfnReconciliationRule {
  id: string;
  school_id: string;
  rule_name: string;
  rule_type: 'auto_match' | 'pattern_match' | 'amount_match' | 'reference_match';
  source_account_id: string;
  target_account_id: string | null;
  match_criteria: Record<string, unknown>;
  tolerance_percent: number;
  tolerance_amount: number;
  auto_post: boolean;
  is_active: boolean;
  match_count: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AfnReconciliationSession {
  id: string;
  school_id: string;
  bank_account_id: string;
  session_date: string;
  statement_date: string;
  status: 'in_progress' | 'completed' | 'discrepancy';
  statement_balance: number;
  book_balance: number;
  difference: number;
  transactions_matched: number;
  transactions_auto_matched: number;
  transactions_manually_matched: number;
  transactions_unmatched: number;
  completed_by: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Audit Trail ──
export interface AfnAuditLog {
  id: string;
  school_id: string;
  entity_type: string;
  entity_id: string;
  action: 'create' | 'update' | 'delete' | 'post' | 'void' | 'reverse' | 'approve' | 'export';
  user_id: string;
  user_name: string;
  changes: Record<string, unknown>;
  old_values: Record<string, unknown>;
  new_values: Record<string, unknown>;
  ip_address: string;
  user_agent: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AfnClosingChecklist {
  id: string;
  school_id: string;
  fiscal_period_id: string;
  checklist_name: string;
  status: 'in_progress' | 'completed' | 'overdue';
  items: AfnClosingChecklistItem[];
  completed_count: number;
  total_count: number;
  deadline: string;
  completed_at: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AfnClosingChecklistItem {
  id: string;
  school_id: string;
  checklist_id: string;
  item_name: string;
  description: string;
  account_id: string | null;
  status: 'pending' | 'completed' | 'not_applicable';
  completed_by: string | null;
  completed_at: string | null;
  notes: string;
  order_index: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Table Name Map ──
export const AFN_TABLE_NAMES = {
  FINANCE_CONFIG: 'afn_finance_configs',
  FISCAL_YEAR: 'afn_fiscal_years',
  FISCAL_PERIOD: 'afn_fiscal_periods',
  ACCOUNT: 'afn_accounts',
  ACCOUNT_GROUP: 'afn_account_groups',
  JOURNAL: 'afn_journals',
  JOURNAL_ENTRY: 'afn_journal_entries',
  JOURNAL_ENTRY_LINE: 'afn_journal_entry_lines',
  JOURNAL_ENTRY_ATTACHMENT: 'afn_journal_entry_attachments',
  INVOICE: 'afn_invoices',
  INVOICE_LINE: 'afn_invoice_lines',
  INVOICE_TEMPLATE: 'afn_invoice_templates',
  PAYMENT: 'afn_payments',
  PAYMENT_ALLOCATION: 'afn_payment_allocations',
  BANK_ACCOUNT: 'afn_bank_accounts',
  BANK_TRANSACTION: 'afn_bank_transactions',
  BANK_RECONCILIATION: 'afn_bank_reconciliations',
  BUDGET: 'afn_budgets',
  BUDGET_LINE: 'afn_budget_lines',
  BUDGET_VERSION: 'afn_budget_versions',
  BUDGET_ALERT: 'afn_budget_alerts',
  CASH_FLOW_FORECAST: 'afn_cash_flow_forecasts',
  CASH_FLOW_LINE: 'afn_cash_flow_lines',
  TREASURY_POSITION: 'afn_treasury_positions',
  INVESTMENT: 'afn_investments',
  TAX: 'afn_taxes',
  TAX_DECLARATION: 'afn_tax_declarations',
  ASSET_REGISTER: 'afn_asset_registers',
  DEPRECIATION_RUN: 'afn_depreciation_runs',
  DEPRECIATION_ENTRY: 'afn_depreciation_entries',
  FINANCIAL_REPORT: 'afn_financial_reports',
  REPORT_SCHEDULE: 'afn_report_schedules',
  KPI: 'afn_kpis',
  RECONCILIATION_RULE: 'afn_reconciliation_rules',
  RECONCILIATION_SESSION: 'afn_reconciliation_sessions',
  AUDIT_LOG: 'afn_audit_logs',
  CLOSING_CHECKLIST: 'afn_closing_checklists',
  CLOSING_CHECKLIST_ITEM: 'afn_closing_checklist_items',
} as const;

// ── Repository Interface ──
export interface AEIP8Repository {
  financeConfigs: CrudRepository<AfnFinanceConfig>;
  fiscalYears: CrudRepository<AfnFiscalYear>;
  fiscalPeriods: CrudRepository<AfnFiscalPeriod>;
  accounts: CrudRepository<AfnAccount>;
  accountGroups: CrudRepository<AfnAccountGroup>;
  journals: CrudRepository<AfnJournal>;
  journalEntries: CrudRepository<AfnJournalEntry>;
  journalEntryLines: CrudRepository<AfnJournalEntryLine>;
  journalEntryAttachments: CrudRepository<AfnJournalEntryAttachment>;
  invoices: CrudRepository<AfnInvoice>;
  invoiceLines: CrudRepository<AfnInvoiceLine>;
  invoiceTemplates: CrudRepository<AfnInvoiceTemplate>;
  payments: CrudRepository<AfnPayment>;
  paymentAllocations: CrudRepository<AfnPaymentAllocation>;
  bankAccounts: CrudRepository<AfnBankAccount>;
  bankTransactions: CrudRepository<AfnBankTransaction>;
  bankReconciliations: CrudRepository<AfnBankReconciliation>;
  budgets: CrudRepository<AfnBudget>;
  budgetLines: CrudRepository<AfnBudgetLine>;
  budgetVersions: CrudRepository<AfnBudgetVersion>;
  budgetAlerts: CrudRepository<AfnBudgetAlert>;
  cashFlowForecasts: CrudRepository<AfnCashFlowForecast>;
  cashFlowLines: CrudRepository<AfnCashFlowLine>;
  treasuryPositions: CrudRepository<AfnTreasuryPosition>;
  investments: CrudRepository<AfnInvestment>;
  taxes: CrudRepository<AfnTax>;
  taxDeclarations: CrudRepository<AfnTaxDeclaration>;
  assetRegisters: CrudRepository<AfnAssetRegister>;
  depreciationRuns: CrudRepository<AfnDepreciationRun>;
  depreciationEntries: CrudRepository<AfnDepreciationEntry>;
  financialReports: CrudRepository<AfnFinancialReport>;
  reportSchedules: CrudRepository<AfnReportSchedule>;
  kpis: CrudRepository<AfnKPI>;
  reconciliationRules: CrudRepository<AfnReconciliationRule>;
  reconciliationSessions: CrudRepository<AfnReconciliationSession>;
  auditLogs: CrudRepository<AfnAuditLog>;
  closingChecklists: CrudRepository<AfnClosingChecklist>;
  closingChecklistItems: CrudRepository<AfnClosingChecklistItem>;
}

// ── Factory Function ──
export function createAEIP8Repository(supabase: SupabaseClient): AEIP8Repository {
  return {
    financeConfigs: createCrudRepository<AfnFinanceConfig>(supabase, AFN_TABLE_NAMES.FINANCE_CONFIG),
    fiscalYears: createCrudRepository<AfnFiscalYear>(supabase, AFN_TABLE_NAMES.FISCAL_YEAR),
    fiscalPeriods: createCrudRepository<AfnFiscalPeriod>(supabase, AFN_TABLE_NAMES.FISCAL_PERIOD),
    accounts: createCrudRepository<AfnAccount>(supabase, AFN_TABLE_NAMES.ACCOUNT),
    accountGroups: createCrudRepository<AfnAccountGroup>(supabase, AFN_TABLE_NAMES.ACCOUNT_GROUP),
    journals: createCrudRepository<AfnJournal>(supabase, AFN_TABLE_NAMES.JOURNAL),
    journalEntries: createCrudRepository<AfnJournalEntry>(supabase, AFN_TABLE_NAMES.JOURNAL_ENTRY),
    journalEntryLines: createCrudRepository<AfnJournalEntryLine>(supabase, AFN_TABLE_NAMES.JOURNAL_ENTRY_LINE),
    journalEntryAttachments: createCrudRepository<AfnJournalEntryAttachment>(supabase, AFN_TABLE_NAMES.JOURNAL_ENTRY_ATTACHMENT),
    invoices: createCrudRepository<AfnInvoice>(supabase, AFN_TABLE_NAMES.INVOICE),
    invoiceLines: createCrudRepository<AfnInvoiceLine>(supabase, AFN_TABLE_NAMES.INVOICE_LINE),
    invoiceTemplates: createCrudRepository<AfnInvoiceTemplate>(supabase, AFN_TABLE_NAMES.INVOICE_TEMPLATE),
    payments: createCrudRepository<AfnPayment>(supabase, AFN_TABLE_NAMES.PAYMENT),
    paymentAllocations: createCrudRepository<AfnPaymentAllocation>(supabase, AFN_TABLE_NAMES.PAYMENT_ALLOCATION),
    bankAccounts: createCrudRepository<AfnBankAccount>(supabase, AFN_TABLE_NAMES.BANK_ACCOUNT),
    bankTransactions: createCrudRepository<AfnBankTransaction>(supabase, AFN_TABLE_NAMES.BANK_TRANSACTION),
    bankReconciliations: createCrudRepository<AfnBankReconciliation>(supabase, AFN_TABLE_NAMES.BANK_RECONCILIATION),
    budgets: createCrudRepository<AfnBudget>(supabase, AFN_TABLE_NAMES.BUDGET),
    budgetLines: createCrudRepository<AfnBudgetLine>(supabase, AFN_TABLE_NAMES.BUDGET_LINE),
    budgetVersions: createCrudRepository<AfnBudgetVersion>(supabase, AFN_TABLE_NAMES.BUDGET_VERSION),
    budgetAlerts: createCrudRepository<AfnBudgetAlert>(supabase, AFN_TABLE_NAMES.BUDGET_ALERT),
    cashFlowForecasts: createCrudRepository<AfnCashFlowForecast>(supabase, AFN_TABLE_NAMES.CASH_FLOW_FORECAST),
    cashFlowLines: createCrudRepository<AfnCashFlowLine>(supabase, AFN_TABLE_NAMES.CASH_FLOW_LINE),
    treasuryPositions: createCrudRepository<AfnTreasuryPosition>(supabase, AFN_TABLE_NAMES.TREASURY_POSITION),
    investments: createCrudRepository<AfnInvestment>(supabase, AFN_TABLE_NAMES.INVESTMENT),
    taxes: createCrudRepository<AfnTax>(supabase, AFN_TABLE_NAMES.TAX),
    taxDeclarations: createCrudRepository<AfnTaxDeclaration>(supabase, AFN_TABLE_NAMES.TAX_DECLARATION),
    assetRegisters: createCrudRepository<AfnAssetRegister>(supabase, AFN_TABLE_NAMES.ASSET_REGISTER),
    depreciationRuns: createCrudRepository<AfnDepreciationRun>(supabase, AFN_TABLE_NAMES.DEPRECIATION_RUN),
    depreciationEntries: createCrudRepository<AfnDepreciationEntry>(supabase, AFN_TABLE_NAMES.DEPRECIATION_ENTRY),
    financialReports: createCrudRepository<AfnFinancialReport>(supabase, AFN_TABLE_NAMES.FINANCIAL_REPORT),
    reportSchedules: createCrudRepository<AfnReportSchedule>(supabase, AFN_TABLE_NAMES.REPORT_SCHEDULE),
    kpis: createCrudRepository<AfnKPI>(supabase, AFN_TABLE_NAMES.KPI),
    reconciliationRules: createCrudRepository<AfnReconciliationRule>(supabase, AFN_TABLE_NAMES.RECONCILIATION_RULE),
    reconciliationSessions: createCrudRepository<AfnReconciliationSession>(supabase, AFN_TABLE_NAMES.RECONCILIATION_SESSION),
    auditLogs: createCrudRepository<AfnAuditLog>(supabase, AFN_TABLE_NAMES.AUDIT_LOG),
    closingChecklists: createCrudRepository<AfnClosingChecklist>(supabase, AFN_TABLE_NAMES.CLOSING_CHECKLIST),
    closingChecklistItems: createCrudRepository<AfnClosingChecklistItem>(supabase, AFN_TABLE_NAMES.CLOSING_CHECKLIST_ITEM),
  };
}
