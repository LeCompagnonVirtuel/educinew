import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gewlp-base.repository';

// ============================================================================
// GEWLP-11: Finance — Workforce Finance & Payroll
// ============================================================================

export interface GewlpPayroll extends BaseEntity { company_id: string; employee_id: string; pay_period_start: string; pay_period_end: string; base_salary: number; overtime_hours: number; overtime_rate: number; bonus: number; deductions: number; tax: number; net_pay: number; currency: string; payment_date: string; status: 'draft'|'approved'|'paid'|'cancelled'; }
export interface GewlpPayrollItem extends BaseEntity { payroll_id: string; item_type: 'earning'|'deduction'|'benefit'|'tax'; name: string; amount: number; quantity: number; rate: number; currency: string; description?: string; }
export interface GewlpExpense extends BaseEntity { employee_id: string; company_id: string; category: 'travel'|'meals'|'supplies'|'software'|'training'|'equipment'|'other'; description: string; amount: number; currency: string; receipt_url?: string; expense_date: string; submitted_at: string; status: 'submitted'|'approved'|'rejected'|'reimbursed'; approved_by?: string; approved_at?: string; }
export interface GewlpBudget extends BaseEntity { company_id: string; department: string; fiscal_year: number; quarter?: number; allocated: number; spent: number; committed: number; available: number; currency: string; category: string; }
export interface GewlpInvoice extends BaseEntity { company_id: string; vendor_id?: string; client_id?: string; invoice_number: string; invoice_date: string; due_date: string; subtotal: number; tax: number; total: number; currency: string; status: 'draft'|'sent'|'paid'|'overdue'|'cancelled'; paid_at?: string; }
export interface GewlpInvoiceLineItem extends BaseEntity { invoice_id: string; description: string; quantity: number; unit_price: number; total: number; tax_rate?: number; }
export interface GewlpBenefit extends BaseEntity { company_id: string; name: string; description: string; benefit_type: 'health'|'retirement'|'insurance'|'wellness'|'education'|'transport'|'other'; cost_per_employee: number; currency: string; frequency: 'monthly'|'quarterly'|'yearly'; status: 'active'|'inactive'; }
export interface GewlpBenefitEnrollment extends BaseEntity { benefit_id: string; employee_id: string; enrolled_at: string; coverage_start: string; coverage_end?: string; dependents: number; employee_cost: number; employer_cost: number; status: 'active'|'terminated'|'suspended'; }
export interface GewlpTaxRecord extends BaseEntity { employee_id: string; company_id: string; tax_year: number; tax_type: 'income'|'social_security'|'health_insurance'|'other'; gross_income: number; taxable_income: number; tax_amount: number; currency: string; filing_status: string; }
export interface GewlpFinancialReport extends BaseEntity { company_id: string; report_type: 'payroll_summary'|'expense_summary'|'budget_variance'|'tax_summary'|'benefit_cost'; period: string; data: Record<string,unknown>; generated_at: string; generated_by: string; status: 'draft'|'final'; }
export interface GewlpCostCenter extends BaseEntity { company_id: string; code: string; name: string; description: string; parent_id?: string; manager_id?: string; budget_allocated: number; budget_spent: number; currency: string; status: 'active'|'inactive'; }
export interface GewlpReimbursement extends BaseEntity { employee_id: string; expense_id: string; amount: number; currency: string; method: 'bank_transfer'|'cash'|'check'|'digital_wallet'; status: 'pending'|'processing'|'completed'|'failed'; processed_at?: string; transaction_ref?: string; }

export const Gewlp11TableNames: Record<string, string> = {
  GewlpPayroll: 'gewlp_payrolls',
  GewlpPayrollItem: 'gewlp_payroll_items',
  GewlpExpense: 'gewlp_expenses',
  GewlpBudget: 'gewlp_budgets',
  GewlpInvoice: 'gewlp_invoices',
  GewlpInvoiceLineItem: 'gewlp_invoice_line_items',
  GewlpBenefit: 'gewlp_benefits',
  GewlpBenefitEnrollment: 'gewlp_benefit_enrollments',
  GewlpTaxRecord: 'gewlp_tax_records',
  GewlpFinancialReport: 'gewlp_financial_reports',
  GewlpCostCenter: 'gewlp_cost_centers',
  GewlpReimbursement: 'gewlp_reimbursements',
};

export interface Gewlp11Repository {
  payrolls: CrudRepository<GewlpPayroll>;
  payrollItems: CrudRepository<GewlpPayrollItem>;
  expenses: CrudRepository<GewlpExpense>;
  budgets: CrudRepository<GewlpBudget>;
  invoices: CrudRepository<GewlpInvoice>;
  invoiceLineItems: CrudRepository<GewlpInvoiceLineItem>;
  benefits: CrudRepository<GewlpBenefit>;
  benefitEnrollments: CrudRepository<GewlpBenefitEnrollment>;
  taxRecords: CrudRepository<GewlpTaxRecord>;
  financialReports: CrudRepository<GewlpFinancialReport>;
  costCenters: CrudRepository<GewlpCostCenter>;
  reimbursements: CrudRepository<GewlpReimbursement>;
}

export function createGewlp11Repository(supabase: SupabaseClient): Gewlp11Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    payrolls: crud<GewlpPayroll>(Gewlp11TableNames.GewlpPayroll),
    payrollItems: crud<GewlpPayrollItem>(Gewlp11TableNames.GewlpPayrollItem),
    expenses: crud<GewlpExpense>(Gewlp11TableNames.GewlpExpense),
    budgets: crud<GewlpBudget>(Gewlp11TableNames.GewlpBudget),
    invoices: crud<GewlpInvoice>(Gewlp11TableNames.GewlpInvoice),
    invoiceLineItems: crud<GewlpInvoiceLineItem>(Gewlp11TableNames.GewlpInvoiceLineItem),
    benefits: crud<GewlpBenefit>(Gewlp11TableNames.GewlpBenefit),
    benefitEnrollments: crud<GewlpBenefitEnrollment>(Gewlp11TableNames.GewlpBenefitEnrollment),
    taxRecords: crud<GewlpTaxRecord>(Gewlp11TableNames.GewlpTaxRecord),
    financialReports: crud<GewlpFinancialReport>(Gewlp11TableNames.GewlpFinancialReport),
    costCenters: crud<GewlpCostCenter>(Gewlp11TableNames.GewlpCostCenter),
    reimbursements: crud<GewlpReimbursement>(Gewlp11TableNames.GewlpReimbursement),
  };
}
