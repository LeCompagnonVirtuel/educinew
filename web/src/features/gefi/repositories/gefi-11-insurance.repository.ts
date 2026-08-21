import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gefi-base.repository';

// ============================================================================
// GEFI-11: Insurance — Policies, Claims, Premiums, Coverage
// ============================================================================

export interface GEFIInsurancePolicy extends BaseEntity { name: string; type: 'HEALTH'|'LIFE'|'PROPERTY'|'LIABILITY'|'DISABILITY'|'ACCIDENT'|'VEHICLE'|'TRAVEL'; provider: string; policy_number: string; holder_id: string; holder_type: 'STUDENT'|'STAFF'|'SCHOOL'|'PARENT'; premium_amount: number; premium_frequency: 'MONTHLY'|'QUARTERLY'|'ANNUAL'; coverage_amount: number; deductible: number; effective_date: string; expiry_date: string; status: 'ACTIVE'|'EXPIRED'|'CANCELLED'|'SUSPENDED'; auto_renew: boolean; metadata: Record<string,unknown>; }
export interface GEFIInsuranceCoverage extends BaseEntity { policy_id: string; name: string; description: string; covered_amount: number; copay_percentage: number; copay_fixed: number; waiting_period_days: number; exclusions: string[]; is_active: boolean; metadata: Record<string,unknown>; }
export interface GEFIInsuranceBeneficiary extends BaseEntity { policy_id: string; name: string; relationship: string; percentage: number; contact_email?: string; contact_phone?: string; address?: Record<string,unknown>; is_primary: boolean; metadata: Record<string,unknown>; }
export interface GEFIInsuranceClaim extends BaseEntity { policy_id: string; claimant_id: string; claim_number: string; type: 'MEDICAL'|'PROPERTY'|'LIABILITY'|'ACCIDENT'|'DISABILITY'|'DEATH'; description: string; incident_date: string; incident_location?: string; claim_amount: number; approved_amount?: number; documents: Record<string,unknown>[]; status: 'SUBMITTED'|'UNDER_REVIEW'|'APPROVED'|'PARTIAL'|'REJECTED'|'PAID'|'CLOSED'; submitted_at: string; reviewed_by?: string; reviewed_at?: string; paid_at?: string; metadata: Record<string,unknown>; }
export interface GEFIInsuranceClaimDocument extends BaseEntity { claim_id: string; document_type: string; file_name: string; file_url: string; file_size: number; uploaded_by: string; uploaded_at: string; verified: boolean; verified_by?: string; metadata: Record<string,unknown>; }
export interface GEFIInsurancePayment extends BaseEntity { policy_id: string; claim_id?: string; amount: number; type: 'PREMIUM'|'DEDUCTIBLE'|'COPAY'|'CLAIM_PAYOUT'|'REFUND'; payment_method: string; reference: string; status: 'PENDING'|'COMPLETED'|'FAILED'; paid_at?: string; metadata: Record<string,unknown>; }
export interface GEFIInsurancePremium extends BaseEntity { policy_id: string; amount: number; due_date: string; paid_date?: string; grace_period_days: number; late_fee: number; status: 'PENDING'|'PAID'|'LATE'|'WAIVED'; metadata: Record<string,unknown>; }
export interface GEFIInsuranceRenewal extends BaseEntity { policy_id: string; renewal_date: string; new_premium: number; new_coverage: number; changes: Record<string,unknown>; status: 'PENDING'|'ACCEPTED'|'DECLINED'|'EXPIRED'; responded_at?: string; metadata: Record<string,unknown>; }
export interface GEFIInsuranceAdjuster extends BaseEntity { name: string; email: string; phone: string; license_number: string; specialization: string[]; assigned_claims: number; status: 'ACTIVE'|'INACTIVE'; metadata: Record<string,unknown>; }
export interface GEFIInsuranceAdjusterAssignment extends BaseEntity { claim_id: string; adjuster_id: string; assigned_at: string; completed_at?: string; status: 'ASSIGNED'|'IN_PROGRESS'|'COMPLETED'; findings?: string; recommendation?: string; metadata: Record<string,unknown>; }
export interface GEFIInsuranceRate extends BaseEntity { provider: string; policy_type: string; coverage_type: string; rate_percentage: number; min_premium: number; max_premium: number; effective_date: string; expiry_date: string; conditions: Record<string,unknown>; metadata: Record<string,unknown>; }
export interface GEFIInsuranceExclusion extends BaseEntity { policy_id: string; exclusion_type: string; description: string; effective_date: string; expiry_date?: string; metadata: Record<string,unknown>; }
export interface GEFIInsuranceEndorsement extends BaseEntity { policy_id: string; endorsement_number: string; description: string; effective_date: string; premium_change: number; coverage_change: number; status: 'PENDING'|'ACTIVE'|'CANCELLED'; metadata: Record<string,unknown>; }
export interface GEFIInsuranceAuditTrail extends BaseEntity { entity_type: string; entity_id: string; action: string; actor_id: string; changes: Record<string,unknown>; ip_address?: string; metadata: Record<string,unknown>; }

export interface GEFI11Repository {
  insurancePolicy: CrudRepository<GEFIInsurancePolicy>;
  insuranceCoverage: CrudRepository<GEFIInsuranceCoverage>;
  insuranceBeneficiary: CrudRepository<GEFIInsuranceBeneficiary>;
  insuranceClaim: CrudRepository<GEFIInsuranceClaim>;
  insuranceClaimDocument: CrudRepository<GEFIInsuranceClaimDocument>;
  insurancePayment: CrudRepository<GEFIInsurancePayment>;
  insurancePremium: CrudRepository<GEFIInsurancePremium>;
  insuranceRenewal: CrudRepository<GEFIInsuranceRenewal>;
  insuranceAdjuster: CrudRepository<GEFIInsuranceAdjuster>;
  insuranceAdjusterAssignment: CrudRepository<GEFIInsuranceAdjusterAssignment>;
  insuranceRate: CrudRepository<GEFIInsuranceRate>;
  insuranceExclusion: CrudRepository<GEFIInsuranceExclusion>;
  insuranceEndorsement: CrudRepository<GEFIInsuranceEndorsement>;
  insuranceAuditTrail: CrudRepository<GEFIInsuranceAuditTrail>;
}

export function createGEFI11Repository(supabase: SupabaseClient): GEFI11Repository {
  return {
    insurancePolicy: createCrudRepository<GEFIInsurancePolicy>(supabase, 'gefi_insurance_policies'),
    insuranceCoverage: createCrudRepository<GEFIInsuranceCoverage>(supabase, 'gefi_insurance_coverages'),
    insuranceBeneficiary: createCrudRepository<GEFIInsuranceBeneficiary>(supabase, 'gefi_insurance_beneficiaries'),
    insuranceClaim: createCrudRepository<GEFIInsuranceClaim>(supabase, 'gefi_insurance_claims'),
    insuranceClaimDocument: createCrudRepository<GEFIInsuranceClaimDocument>(supabase, 'gefi_insurance_claim_documents'),
    insurancePayment: createCrudRepository<GEFIInsurancePayment>(supabase, 'gefi_insurance_payments'),
    insurancePremium: createCrudRepository<GEFIInsurancePremium>(supabase, 'gefi_insurance_premiums'),
    insuranceRenewal: createCrudRepository<GEFIInsuranceRenewal>(supabase, 'gefi_insurance_renewals'),
    insuranceAdjuster: createCrudRepository<GEFIInsuranceAdjuster>(supabase, 'gefi_insurance_adjusters'),
    insuranceAdjusterAssignment: createCrudRepository<GEFIInsuranceAdjusterAssignment>(supabase, 'gefi_insurance_adjuster_assignments'),
    insuranceRate: createCrudRepository<GEFIInsuranceRate>(supabase, 'gefi_insurance_rates'),
    insuranceExclusion: createCrudRepository<GEFIInsuranceExclusion>(supabase, 'gefi_insurance_exclusions'),
    insuranceEndorsement: createCrudRepository<GEFIInsuranceEndorsement>(supabase, 'gefi_insurance_endorsements'),
    insuranceAuditTrail: createCrudRepository<GEFIInsuranceAuditTrail>(supabase, 'gefi_insurance_audit_trails'),
  };
}
