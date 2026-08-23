import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gefi-base.repository';

// ============================================================================
// GEFI-7: Government Finance — Grants, Subsidies, Tax Compliance, Reporting
// ============================================================================

export interface GEFIGovernmentGrant extends BaseEntity { name: string; description: string; agency: string; grant_number: string; total_amount: number; disbursed_amount: number; currency_code: string; purpose: string; start_date: string; end_date: string; status: 'APPLIED'|'APPROVED'|'ACTIVE'|'COMPLETED'|'REJECTED'|'SUSPENDED'; metadata: Record<string,unknown>; }
export interface GEFIGovernmentGrantPhase extends BaseEntity { grant_id: string; name: string; description: string; amount: number; disbursed: number; milestones: Record<string,unknown>[]; start_date: string; end_date: string; status: 'NOT_STARTED'|'IN_PROGRESS'|'COMPLETED'|'OVERDUE'; metadata: Record<string,unknown>; }
export interface GEFIGovernmentGrantReport extends BaseEntity { grant_id: string; phase_id?: string; report_type: 'PROGRESS'|'FINANCIAL'|'FINAL'|'AUDIT'; period_start: string; period_end: string; submitted_date: string; content: Record<string,unknown>; status: 'DRAFT'|'SUBMITTED'|'APPROVED'|'REJECTED'; reviewed_by?: string; reviewed_at?: string; metadata: Record<string,unknown>; }
export interface GEFIGovernmentGrantMilestone extends BaseEntity { phase_id: string; name: string; description: string; due_date: string; completion_date?: string; payment_amount: number; status: 'PENDING'|'COMPLETED'|'OVERDUE'|'WAIVED'; evidence_url?: string; metadata: Record<string,unknown>; }
export interface GEFISubsidyProgram extends BaseEntity { name: string; description: string; type: 'TUITION'|'TRANSPORT'|'MEALS'|'BOOKS'|'UNIFORM'|'TECHNOLOGY'|'CUSTOM'; total_budget: number; allocated: number; disbursed: number; eligible_schools: string[]; eligible_grades: string[]; status: 'ACTIVE'|'INACTIVE'|'CLOSED'; application_start: string; application_end: string; metadata: Record<string,unknown>; }
export interface GEFISubsidyApplication extends BaseEntity { program_id: string; student_id: string; school_id: string; amount_requested: number; amount_approved?: number; status: 'DRAFT'|'SUBMITTED'|'VERIFIED'|'APPROVED'|'REJECTED'|'DISBURSED'; submitted_at?: string; verified_by?: string; metadata: Record<string,unknown>; }
export interface GEFISubsidyDisbursement extends BaseEntity { application_id: string; amount: number; method: string; reference: string; status: 'PENDING'|'COMPLETED'|'FAILED'; disbursed_at?: string; metadata: Record<string,unknown>; }
export interface GEFITaxFiling extends BaseEntity { tax_type: string; filing_period: string; due_date: string; filed_date?: string; total_income: number; total_tax: number; deductions: number; net_tax: number; status: 'DRAFT'|'FILED'|'PAID'|'OVERDUE'|'AMENDED'; payment_ref?: string; metadata: Record<string,unknown>; }
export interface GEFITaxPayment extends BaseEntity { filing_id: string; amount: number; payment_date: string; reference: string; method: string; status: 'PENDING'|'COMPLETED'|'FAILED'; receipt_url?: string; metadata: Record<string,unknown>; }
export interface GEFITaxExemption extends BaseEntity { school_id: string; exemption_type: string; certificate_number: string; valid_from: string; valid_until: string; issuing_authority: string; status: 'ACTIVE'|'EXPIRED'|'REVOKED'; document_url?: string; metadata: Record<string,unknown>; }
export interface GEFITaxWithholding extends BaseEntity { payee_id: string; amount: number; tax_rate: number; tax_amount: number; period: string; status: 'WITHHELD'|'REMITTED'|'DISPUTED'; remitted_at?: string; metadata: Record<string,unknown>; }
export interface GEFIGovernmentCompliance extends BaseEntity { regulation_name: string; description: string; agency: string; requirement: string; deadline: string; evidence_required: string[]; status: 'COMPLIANT'|'NON_COMPLIANT'|'PENDING'|'WAIVED'; last_audit_date?: string; next_audit_date?: string; metadata: Record<string,unknown>; }
export interface GEFIGovernmentComplianceDocument extends BaseEntity { compliance_id: string; document_type: string; file_name: string; file_url: string; uploaded_by: string; uploaded_at: string; expiry_date?: string; status: 'VALID'|'EXPIRED'|'PENDING_REVIEW'; metadata: Record<string,unknown>; }
export interface GEFIGovernmentReportingSchedule extends BaseEntity { report_type: string; agency: string; frequency: string; next_due: string; last_submitted?: string; assigned_to?: string; auto_generate: boolean; template_id?: string; status: 'ACTIVE'|'PAUSED'|'INACTIVE'; metadata: Record<string,unknown>; }
export interface GEFIGovernmentReportSubmission extends BaseEntity { schedule_id: string; report_type: string; period: string; submitted_date: string; submitted_by: string; acknowledgment_ref?: string; status: 'SUBMITTED'|'ACCEPTED'|'REJECTED'|'PENDING'; rejection_reason?: string; metadata: Record<string,unknown>; }
export interface GEFISocialImpactMetric extends BaseEntity { project_name: string; metric_name: string; metric_value: number; target_value: number; unit: string; period: string; data_source: string; verified: boolean; verified_by?: string; metadata: Record<string,unknown>; }
export interface GEFIAuditTrail extends BaseEntity { entity_type: string; entity_id: string; action: string; actor_id: string; changes: Record<string,unknown>; ip_address?: string; metadata: Record<string,unknown>; }

export interface GEFI7Repository {
  governmentGrant: CrudRepository<GEFIGovernmentGrant>;
  governmentGrantPhase: CrudRepository<GEFIGovernmentGrantPhase>;
  governmentGrantReport: CrudRepository<GEFIGovernmentGrantReport>;
  governmentGrantMilestone: CrudRepository<GEFIGovernmentGrantMilestone>;
  subsidyProgram: CrudRepository<GEFISubsidyProgram>;
  subsidyApplication: CrudRepository<GEFISubsidyApplication>;
  subsidyDisbursement: CrudRepository<GEFISubsidyDisbursement>;
  taxFiling: CrudRepository<GEFITaxFiling>;
  taxPayment: CrudRepository<GEFITaxPayment>;
  taxExemption: CrudRepository<GEFITaxExemption>;
  taxWithholding: CrudRepository<GEFITaxWithholding>;
  governmentCompliance: CrudRepository<GEFIGovernmentCompliance>;
  governmentComplianceDocument: CrudRepository<GEFIGovernmentComplianceDocument>;
  governmentReportingSchedule: CrudRepository<GEFIGovernmentReportingSchedule>;
  governmentReportSubmission: CrudRepository<GEFIGovernmentReportSubmission>;
  socialImpactMetric: CrudRepository<GEFISocialImpactMetric>;
  auditTrail: CrudRepository<GEFIAuditTrail>;
}

export function createGEFI7Repository(supabase: SupabaseClient): GEFI7Repository {
  return {
    governmentGrant: createCrudRepository<GEFIGovernmentGrant>(supabase, 'gefi_government_grants'),
    governmentGrantPhase: createCrudRepository<GEFIGovernmentGrantPhase>(supabase, 'gefi_government_grant_phases'),
    governmentGrantReport: createCrudRepository<GEFIGovernmentGrantReport>(supabase, 'gefi_government_grant_reports'),
    governmentGrantMilestone: createCrudRepository<GEFIGovernmentGrantMilestone>(supabase, 'gefi_government_grant_milestones'),
    subsidyProgram: createCrudRepository<GEFISubsidyProgram>(supabase, 'gefi_subsidy_programs'),
    subsidyApplication: createCrudRepository<GEFISubsidyApplication>(supabase, 'gefi_subsidy_applications'),
    subsidyDisbursement: createCrudRepository<GEFISubsidyDisbursement>(supabase, 'gefi_subsidy_disbursements'),
    taxFiling: createCrudRepository<GEFITaxFiling>(supabase, 'gefi_tax_filings'),
    taxPayment: createCrudRepository<GEFITaxPayment>(supabase, 'gefi_tax_payments'),
    taxExemption: createCrudRepository<GEFITaxExemption>(supabase, 'gefi_tax_exemptions'),
    taxWithholding: createCrudRepository<GEFITaxWithholding>(supabase, 'gefi_tax_withholdings'),
    governmentCompliance: createCrudRepository<GEFIGovernmentCompliance>(supabase, 'gefi_government_compliances'),
    governmentComplianceDocument: createCrudRepository<GEFIGovernmentComplianceDocument>(supabase, 'gefi_government_compliance_documents'),
    governmentReportingSchedule: createCrudRepository<GEFIGovernmentReportingSchedule>(supabase, 'gefi_government_reporting_schedules'),
    governmentReportSubmission: createCrudRepository<GEFIGovernmentReportSubmission>(supabase, 'gefi_government_report_submissions'),
    socialImpactMetric: createCrudRepository<GEFISocialImpactMetric>(supabase, 'gefi_social_impact_metrics'),
    auditTrail: createCrudRepository<GEFIAuditTrail>(supabase, 'gefi_government_finance_audit_trails'),
  };
}
