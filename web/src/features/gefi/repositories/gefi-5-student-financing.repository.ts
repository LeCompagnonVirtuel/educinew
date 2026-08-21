import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gefi-base.repository';

// ============================================================================
// GEFI-5: Student Financing — Installment Plans, Financial Aid, Tuition
// ============================================================================

export interface GEFITuitionPlan extends BaseEntity { name: string; academic_year_id: string; level_id: string; amount: number; currency_code: string; due_date: string; late_fee_percentage: number; grace_period_days: number; status: 'ACTIVE'|'INACTIVE'|'ARCHIVED'; metadata: Record<string,unknown>; }
export interface GEFITuitionInvoice extends BaseEntity { student_id: string; tuition_plan_id: string; amount: number; discount_amount: number; scholarship_amount: number; net_amount: number; due_date: string; status: 'DRAFT'|'SENT'|'PARTIAL'|'PAID'|'OVERDUE'|'CANCELLED'; academic_year_id: string; metadata: Record<string,unknown>; }
export interface GEFITuitionPayment extends BaseEntity { invoice_id: string; amount: number; method: string; reference: string; status: 'PENDING'|'COMPLETED'|'FAILED'|'REFUNDED'; paid_at?: string; metadata: Record<string,unknown>; }
export interface GEFIInstallmentPlan extends BaseEntity { student_id: string; invoice_id: string; total_amount: number; number_of_installments: number; frequency: 'MONTHLY'|'QUARTERLY'|'CUSTOM'; start_date: string; status: 'ACTIVE'|'COMPLETED'|'DEFAULTED'|'CANCELLED'; metadata: Record<string,unknown>; }
export interface GEFIInstallment extends BaseEntity { plan_id: string; installment_number: number; amount: number; due_date: string; paid_amount: number; paid_date?: string; late_fee: number; status: 'PENDING'|'PAID'|'LATE'|'DEFAULTED'|'WAIVED'; metadata: Record<string,unknown>; }
export interface GEFIInstallmentReminder extends BaseEntity { installment_id: string; reminder_type: 'EMAIL'|'SMS'|'PUSH'; scheduled_date: string; sent_date?: string; status: 'PENDING'|'SENT'|'FAILED'; metadata: Record<string,unknown>; }
export interface GEFIFinancialAid extends BaseEntity { name: string; type: 'GRANT'|'LOAN'|'WORK_STUDY'|'WAIVER'|'DISCOUNT'; provider: string; amount: number; currency_code: string; interest_rate?: number; term_months?: number; status: 'ACTIVE'|'INACTIVE'; metadata: Record<string,unknown>; }
export interface GEFIFinancialAidApplication extends BaseEntity { financial_aid_id: string; student_id: string; academic_year_id: string; amount_requested: number; amount_approved?: number; status: 'DRAFT'|'SUBMITTED'|'UNDER_REVIEW'|'APPROVED'|'REJECTED'|'PARTIAL'; submitted_at?: string; metadata: Record<string,unknown>; }
export interface GEFIFinancialAidAward extends BaseEntity { application_id: string; amount: number; disbursement_method: string; conditions: string[]; status: 'PENDING'|'CONFIRMED'|'DISBURSED'|'CANCELLED'; metadata: Record<string,unknown>; }
export interface GEFIFinancialAidDisbursement extends BaseEntity { award_id: string; installment_number: number; amount: number; due_date: string; paid_date?: string; transaction_id?: string; status: 'PENDING'|'PAID'|'FAILED'|'WAIVED'; metadata: Record<string,unknown>; }
export interface GEFIFinancialAidEligibility extends BaseEntity { student_id: string; academic_year_id: string; family_income: number; family_size: number; gpa: number; is_eligible: boolean; eligibility_score: number; factors: Record<string,unknown>; calculated_at: string; metadata: Record<string,unknown>; }
export interface GEFIBursary extends BaseEntity { name: string; description: string; amount: number; currency_code: string; type: 'PARTIAL'|'FULL'|'HOUSING'|'BOOKS'|'TRANSPORT'; eligibility_criteria: Record<string,unknown>; status: 'ACTIVE'|'INACTIVE'; metadata: Record<string,unknown>; }
export interface GEFIBursaryApplication extends BaseEntity { bursary_id: string; student_id: string; academic_year_id: string; status: 'PENDING'|'APPROVED'|'REJECTED'|'AWARDED'; submitted_at?: string; metadata: Record<string,unknown>; }
export interface GEFIBursaryAward extends BaseEntity { application_id: string; amount: number; disbursement_method: string; status: 'PENDING'|'DISBURSED'|'CANCELLED'; metadata: Record<string,unknown>; }
export interface GEFIPaymentPlanApproval extends BaseEntity { student_id: string; plan_type: string; amount: number; approved_by: string; conditions: string[]; expires_at: string; status: 'ACTIVE'|'EXPIRED'|'CANCELLED'; metadata: Record<string,unknown>; }
export interface GEFIFeeWaiver extends BaseEntity { student_id: string; fee_type: string; amount: number; reason: string; approved_by: string; academic_year_id: string; status: 'PENDING'|'APPROVED'|'REJECTED'|'APPLIED'; metadata: Record<string,unknown>; }
export interface GEFIParentAccount extends BaseEntity { parent_id: string; wallet_id: string; auto_pay_enabled: boolean; monthly_budget: number; current_spend: number; notification_threshold: number; metadata: Record<string,unknown>; }
export interface GEFIParentBudgetAlert extends BaseEntity { parent_account_id: string; alert_type: 'THRESHOLD'|'EXCEEDED'|'LOW_BALANCE'; message: string; amount: number; status: 'PENDING'|'SENT'|'READ'; sent_at: string; metadata: Record<string,unknown>; }
export interface GEFISiblingDiscount extends BaseEntity { family_id: string; student_ids: string[]; discount_percentage: number; total_savings: number; academic_year_id: string; status: 'ACTIVE'|'INACTIVE'; metadata: Record<string,unknown>; }
export interface GEFIPaymentHistory extends BaseEntity { student_id: string; academic_year_id: string; total_billed: number; total_paid: number; total_outstanding: number; last_payment_date?: string; payment_count: number; metadata: Record<string,unknown>; }
export interface GEFIDebtCollection extends BaseEntity { student_id: string; invoice_id: string; amount_due: number; days_overdue: number; collection_status: 'NONE'|'REMINDER'|'WARNING'|'FINAL_NOTICE'|'LEGAL'; last_action_date: string; assigned_to?: string; metadata: Record<string,unknown>; }
export interface GEFIDebtCollectionAction extends BaseEntity { collection_id: string; action_type: 'EMAIL'|'SMS'|'PHONE'|'LETTER'|'LEGAL'; description: string; performed_by: string; result?: string; next_action_date?: string; metadata: Record<string,unknown>; }
export interface GEFIAuditTrail extends BaseEntity { entity_type: string; entity_id: string; action: string; actor_id: string; changes: Record<string,unknown>; ip_address?: string; metadata: Record<string,unknown>; }

export interface GEFI5Repository {
  tuitionPlan: CrudRepository<GEFITuitionPlan>;
  tuitionInvoice: CrudRepository<GEFITuitionInvoice>;
  tuitionPayment: CrudRepository<GEFITuitionPayment>;
  installmentPlan: CrudRepository<GEFIInstallmentPlan>;
  installment: CrudRepository<GEFIInstallment>;
  installmentReminder: CrudRepository<GEFIInstallmentReminder>;
  financialAid: CrudRepository<GEFIFinancialAid>;
  financialAidApplication: CrudRepository<GEFIFinancialAidApplication>;
  financialAidAward: CrudRepository<GEFIFinancialAidAward>;
  financialAidDisbursement: CrudRepository<GEFIFinancialAidDisbursement>;
  financialAidEligibility: CrudRepository<GEFIFinancialAidEligibility>;
  bursary: CrudRepository<GEFIBursary>;
  bursaryApplication: CrudRepository<GEFIBursaryApplication>;
  bursaryAward: CrudRepository<GEFIBursaryAward>;
  paymentPlanApproval: CrudRepository<GEFIPaymentPlanApproval>;
  feeWaiver: CrudRepository<GEFIFeeWaiver>;
  parentAccount: CrudRepository<GEFIParentAccount>;
  parentBudgetAlert: CrudRepository<GEFIParentBudgetAlert>;
  siblingDiscount: CrudRepository<GEFISiblingDiscount>;
  paymentHistory: CrudRepository<GEFIPaymentHistory>;
  debtCollection: CrudRepository<GEFIDebtCollection>;
  debtCollectionAction: CrudRepository<GEFIDebtCollectionAction>;
  auditTrail: CrudRepository<GEFIAuditTrail>;
}

export function createGEFI5Repository(supabase: SupabaseClient): GEFI5Repository {
  return {
    tuitionPlan: createCrudRepository<GEFITuitionPlan>(supabase, 'gefi_tuition_plans'),
    tuitionInvoice: createCrudRepository<GEFITuitionInvoice>(supabase, 'gefi_tuition_invoices'),
    tuitionPayment: createCrudRepository<GEFITuitionPayment>(supabase, 'gefi_tuition_payments'),
    installmentPlan: createCrudRepository<GEFIInstallmentPlan>(supabase, 'gefi_installment_plans'),
    installment: createCrudRepository<GEFIInstallment>(supabase, 'gefi_installments'),
    installmentReminder: createCrudRepository<GEFIInstallmentReminder>(supabase, 'gefi_installment_reminders'),
    financialAid: createCrudRepository<GEFIFinancialAid>(supabase, 'gefi_financial_aids'),
    financialAidApplication: createCrudRepository<GEFIFinancialAidApplication>(supabase, 'gefi_financial_aid_applications'),
    financialAidAward: createCrudRepository<GEFIFinancialAidAward>(supabase, 'gefi_financial_aid_awards'),
    financialAidDisbursement: createCrudRepository<GEFIFinancialAidDisbursement>(supabase, 'gefi_financial_aid_disbursements'),
    financialAidEligibility: createCrudRepository<GEFIFinancialAidEligibility>(supabase, 'gefi_financial_aid_eligibilities'),
    bursary: createCrudRepository<GEFIBursary>(supabase, 'gefi_bursaries'),
    bursaryApplication: createCrudRepository<GEFIBursaryApplication>(supabase, 'gefi_bursary_applications'),
    bursaryAward: createCrudRepository<GEFIBursaryAward>(supabase, 'gefi_bursary_awards'),
    paymentPlanApproval: createCrudRepository<GEFIPaymentPlanApproval>(supabase, 'gefi_payment_plan_approvals'),
    feeWaiver: createCrudRepository<GEFIFeeWaiver>(supabase, 'gefi_fee_waivers'),
    parentAccount: createCrudRepository<GEFIParentAccount>(supabase, 'gefi_parent_accounts'),
    parentBudgetAlert: createCrudRepository<GEFIParentBudgetAlert>(supabase, 'gefi_parent_budget_alerts'),
    siblingDiscount: createCrudRepository<GEFISiblingDiscount>(supabase, 'gefi_sibling_discounts'),
    paymentHistory: createCrudRepository<GEFIPaymentHistory>(supabase, 'gefi_payment_histories'),
    debtCollection: createCrudRepository<GEFIDebtCollection>(supabase, 'gefi_debt_collections'),
    debtCollectionAction: createCrudRepository<GEFIDebtCollectionAction>(supabase, 'gefi_debt_collection_actions'),
    auditTrail: createCrudRepository<GEFIAuditTrail>(supabase, 'gefi_student_financing_audit_trails'),
  };
}
