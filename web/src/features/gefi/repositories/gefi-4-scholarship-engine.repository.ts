import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gefi-base.repository';

// ============================================================================
// GEFI-4: Scholarship Engine — Scholarships, Applications, Disbursements
// ============================================================================

export interface GEFIScholarship extends BaseEntity { name: string; description: string; type: 'MERIT'|'NEED'|'SPORTS'|'ARTS'|'DIVERSITY'|'RESEARCH'|'COMMUNITY'|'CUSTOM'; funding_source: string; total_budget: number; awarded_amount: number; max_recipients: number; current_recipients: number; min_gpa?: number; max_family_income?: number; eligible_levels: string[]; eligible_countries: string[]; application_start: string; application_end: string; award_date: string; status: 'DRAFT'|'OPEN'|'CLOSED'|'AWARDED'|'COMPLETED'|'CANCELLED'; metadata: Record<string,unknown>; }
export interface GEFIScholarshipCriteria extends BaseEntity { scholarship_id: string; criterion_type: 'GPA'|'INCOME'|'ENROLLMENT'|'RESIDENCY'|'CUSTOM'; operator: 'GT'|'GTE'|'LT'|'LTE'|'EQ'|'IN'|'BETWEEN'; value: unknown; weight: number; is_mandatory: boolean; description: string; metadata: Record<string,unknown>; }
export interface GEFIScholarshipApplication extends BaseEntity { scholarship_id: string; student_id: string; academic_year_id: string; status: 'DRAFT'|'SUBMITTED'|'UNDER_REVIEW'|'APPROVED'|'REJECTED'|'WAITLISTED'|'WITHDRAWN'; submitted_at?: string; reviewed_by?: string; reviewed_at?: string; score?: number; decision_notes?: string; metadata: Record<string,unknown>; }
export interface GEFIScholarshipApplicationDocument extends BaseEntity { application_id: string; document_type: string; file_name: string; file_url: string; file_size: number; mime_type: string; uploaded_at: string; metadata: Record<string,unknown>; }
export interface GEFIScholarshipAward extends BaseEntity { scholarship_id: string; application_id: string; student_id: string; amount: number; currency_code: string; disbursement_method: 'TUITION_CREDIT'|'CASH'|'BANK_TRANSFER'|'WALLET'; status: 'PENDING'|'CONFIRMED'|'DISBURSED'|'CANCELLED'|'SUSPENDED'; award_letter_url?: string; conditions: string[]; metadata: Record<string,unknown>; }
export interface GEFIScholarshipDisbursement extends BaseEntity { award_id: string; installment_number: number; amount: number; due_date: string; paid_date?: string; transaction_id?: string; status: 'PENDING'|'PAID'|'LATE'|'FAILED'|'WAIVED'; notes?: string; metadata: Record<string,unknown>; }
export interface GEFIScholarshipRenewal extends BaseEntity { award_id: string; academic_year_id: string; min_gpa: number; min_credits: number; status: 'PENDING'|'AUTO_RENEWED'|'MANUAL_REVIEW'|'EXPIRED'|'CANCELLED'; reviewed_by?: string; reviewed_at?: string; metadata: Record<string,unknown>; }
export interface GEFIScholarshipReport extends BaseEntity { scholarship_id: string; report_type: 'USAGE'|'DEMOGRAPHICS'|'PERFORMANCE'|'FINANCIAL'; period_start: string; period_end: string; data: Record<string,unknown>; generated_by: string; generated_at: string; metadata: Record<string,unknown>; }
export interface GEFIScholarshipDonor extends BaseEntity { name: string; type: 'INDIVIDUAL'|'CORPORATE'|'NGO'|'GOVERNMENT'|'FOUNDATION'; contact_email: string; contact_phone?: string; total_donated: number; active_scholarships: number; metadata: Record<string,unknown>; }
export interface GEFIScholarshipDonation extends BaseEntity { donor_id: string; scholarship_id?: string; amount: number; currency_code: string; frequency: 'ONE_TIME'|'MONTHLY'|'QUARTERLY'|'ANNUAL'; status: 'PENDING'|'CONFIRMED'|'COMPLETED'|'CANCELLED'; receipt_url?: string; metadata: Record<string,unknown>; }
export interface GEFIScholarshipCommittee extends BaseEntity { scholarship_id: string; name: string; chair_id: string; status: 'ACTIVE'|'DISSOLVED'; metadata: Record<string,unknown>; }
export interface GEFIScholarshipCommitteeMember extends BaseEntity { committee_id: string; user_id: string; role: 'CHAIR'|'MEMBER'|'ADVISOR'; status: 'ACTIVE'|'INACTIVE'; joined_at: string; metadata: Record<string,unknown>; }
export interface GEFIScholarshipReview extends BaseEntity { application_id: string; reviewer_id: string; score: number; strengths: string; weaknesses: string; recommendation: 'APPROVE'|'REJECT'|'WAITLIST'|'DEFER'; status: 'PENDING'|'COMPLETED'; completed_at?: string; metadata: Record<string,unknown>; }
export interface GEFIScholarshipInterview extends BaseEntity { application_id: string; interviewer_id: string; scheduled_at: string; duration_minutes: number; location?: string; virtual_link?: string; status: 'SCHEDULED'|'COMPLETED'|'CANCELLED'|'NO_SHOW'; notes?: string; rating?: number; metadata: Record<string,unknown>; }
export interface GEFIScholarshipNotification extends BaseEntity { scholarship_id: string; recipient_id: string; type: string; title: string; message: string; status: 'PENDING'|'SENT'|'DELIVERED'|'FAILED'; sent_at?: string; metadata: Record<string,unknown>; }
export interface GEFIScholarshipTemplate extends BaseEntity { name: string; description: string; type: string; fields: Record<string,unknown>[]; is_active: boolean; metadata: Record<string,unknown>; }
export interface GEFIScholarshipAuditLog extends BaseEntity { entity_type: string; entity_id: string; action: string; actor_id: string; changes: Record<string,unknown>; ip_address?: string; metadata: Record<string,unknown>; }

export interface GEFI4Repository {
  scholarship: CrudRepository<GEFIScholarship>;
  scholarshipCriteria: CrudRepository<GEFIScholarshipCriteria>;
  scholarshipApplication: CrudRepository<GEFIScholarshipApplication>;
  scholarshipApplicationDocument: CrudRepository<GEFIScholarshipApplicationDocument>;
  scholarshipAward: CrudRepository<GEFIScholarshipAward>;
  scholarshipDisbursement: CrudRepository<GEFIScholarshipDisbursement>;
  scholarshipRenewal: CrudRepository<GEFIScholarshipRenewal>;
  scholarshipReport: CrudRepository<GEFIScholarshipReport>;
  scholarshipDonor: CrudRepository<GEFIScholarshipDonor>;
  scholarshipDonation: CrudRepository<GEFIScholarshipDonation>;
  scholarshipCommittee: CrudRepository<GEFIScholarshipCommittee>;
  scholarshipCommitteeMember: CrudRepository<GEFIScholarshipCommitteeMember>;
  scholarshipReview: CrudRepository<GEFIScholarshipReview>;
  scholarshipInterview: CrudRepository<GEFIScholarshipInterview>;
  scholarshipNotification: CrudRepository<GEFIScholarshipNotification>;
  scholarshipTemplate: CrudRepository<GEFIScholarshipTemplate>;
  scholarshipAuditLog: CrudRepository<GEFIScholarshipAuditLog>;
}

export function createGEFI4Repository(supabase: SupabaseClient): GEFI4Repository {
  return {
    scholarship: createCrudRepository<GEFIScholarship>(supabase, 'gefi_scholarships'),
    scholarshipCriteria: createCrudRepository<GEFIScholarshipCriteria>(supabase, 'gefi_scholarship_criteria'),
    scholarshipApplication: createCrudRepository<GEFIScholarshipApplication>(supabase, 'gefi_scholarship_applications'),
    scholarshipApplicationDocument: createCrudRepository<GEFIScholarshipApplicationDocument>(supabase, 'gefi_scholarship_application_documents'),
    scholarshipAward: createCrudRepository<GEFIScholarshipAward>(supabase, 'gefi_scholarship_awards'),
    scholarshipDisbursement: createCrudRepository<GEFIScholarshipDisbursement>(supabase, 'gefi_scholarship_disbursements'),
    scholarshipRenewal: createCrudRepository<GEFIScholarshipRenewal>(supabase, 'gefi_scholarship_renewals'),
    scholarshipReport: createCrudRepository<GEFIScholarshipReport>(supabase, 'gefi_scholarship_reports'),
    scholarshipDonor: createCrudRepository<GEFIScholarshipDonor>(supabase, 'gefi_scholarship_donors'),
    scholarshipDonation: createCrudRepository<GEFIScholarshipDonation>(supabase, 'gefi_scholarship_donations'),
    scholarshipCommittee: createCrudRepository<GEFIScholarshipCommittee>(supabase, 'gefi_scholarship_committees'),
    scholarshipCommitteeMember: createCrudRepository<GEFIScholarshipCommitteeMember>(supabase, 'gefi_scholarship_committee_members'),
    scholarshipReview: createCrudRepository<GEFIScholarshipReview>(supabase, 'gefi_scholarship_reviews'),
    scholarshipInterview: createCrudRepository<GEFIScholarshipInterview>(supabase, 'gefi_scholarship_interviews'),
    scholarshipNotification: createCrudRepository<GEFIScholarshipNotification>(supabase, 'gefi_scholarship_notifications'),
    scholarshipTemplate: createCrudRepository<GEFIScholarshipTemplate>(supabase, 'gefi_scholarship_templates'),
    scholarshipAuditLog: createCrudRepository<GEFIScholarshipAuditLog>(supabase, 'gefi_scholarship_audit_logs'),
  };
}
