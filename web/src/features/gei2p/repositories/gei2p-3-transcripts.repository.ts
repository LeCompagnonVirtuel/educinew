import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gei2p-base.repository';

// ============================================================================
// GEI2P-3: Transcripts — Academic Transcript Exchange & Standardization
// ~28 entities × 5 CRUD methods = ~140 methods
// ============================================================================

export interface GEI2PTranscriptRequest extends BaseEntity { student_did: string; requester_did: string; institution_id: string; purpose: 'admission'|'employment'| 'transfer'|'personal'|'verification'; status: 'pending'|'processing'|'completed'|'denied'|'expired'; requested_at: string; completed_at?: string; }
export interface GEI2PTranscriptRecord extends BaseEntity { student_did: string; institution_id: string; academic_period: string; program: string; degree_type: string; enrollment_date: string; graduation_date?: string; total_credits: number; gpa: number; gpa_scale: number; class_rank?: string; honors?: string; status: 'enrolled'|'graduated'|'withdrawn'|'expelled'|'transferred'; }
export interface GEI2PTranscriptCourse extends BaseEntity { transcript_id: string; course_code: string; course_name: string; credits: number; grade: string; grade_points: number; term: string; year: number; section?: string; instructor?: string; status: 'completed'|'in_progress'|'dropped'|'withdrawn'|'incomplete'; }
export interface GEI2PTranscriptStandard extends BaseEntity { name: string; version: string; description: string; fields: Record<string,unknown>[]; format: 'xml'|'json'|'pdf'|'html'; status: 'draft'|'active'|'deprecated'; }
export interface GEI2PTranscriptFormat extends BaseEntity { standard_id: string; name: string; description: string; template: Record<string,unknown>; status: 'draft'|'active'|'deprecated'; }
export interface GEI2PTranscriptExport extends BaseEntity { transcript_id: string; format: 'pdf'|'xml'|'json'|'csv'|'html'; file_url?: string; file_size?: number; status: 'pending'|'processing'|'completed'|'failed'; requested_at: string; completed_at?: string; }
export interface GEI2PTranscriptTransfer extends BaseEntity { source_transcript_id: string; destination_institution_id: string; transfer_type: 'full'|'partial'; credits_transferred: number; courses_mapped: Record<string,unknown>[]; status: 'pending'|'approved'|'denied'|'completed'; initiated_at: string; completed_at?: string; }
export interface GEI2PTranscriptMapping extends BaseEntity { source_course_code: string; source_course_name: string; destination_course_code?: string; destination_course_name?: string; source_credits: number; destination_credits?: number; grade_mapping: Record<string,unknown>; equivalence_score: number; status: 'pending'|'approved'|'denied'; }
export interface GEI2PTranscriptVerification extends BaseEntity { transcript_id: string; verifier_did: string; verification_method: 'api'|'qr_code'|'manual'|'blockchain'; verified: boolean; verification_date: string; verification_data: Record<string,unknown>; }
export interface GEI2PTranscriptApproval extends BaseEntity { transcript_id: string; approver_id: string; approver_role: string; status: 'pending'|'approved'|'denied'|'revoked'; comments?: string; approved_at?: string; }
export interface GEI2PTranscriptAuditLog extends BaseEntity { transcript_id: string; action: string; actor_did: string; details: Record<string,unknown>; ip_address: string; timestamp: string; }
export interface GEI2PTranscriptAccessLog extends BaseEntity { transcript_id: string; accessor_did: string; access_type: 'view'|'download'|'share'|'verify'; granted_at: string; expires_at?: string; ip_address: string; }
export interface GEI2PTranscriptShare extends BaseEntity { transcript_id: string; shared_by: string; shared_with_did: string; permissions: 'view'|'download'|'re_share'; expires_at?: string; shared_at: string; accessed_at?: string; }
export interface GEI2PTranscriptNotification extends BaseEntity { transcript_id: string; recipient_did: string; type: 'request'|'ready'|'approved'|'denied'|'shared'|'expiring'; title: string; message: string; read: boolean; read_at?: string; sent_at: string; }
export interface GEI2PTranscriptTemplate extends BaseEntity { name: string; institution_type: string; degree_types: string[]; layout: Record<string,unknown>; branding: Record<string,unknown>; status: 'draft'|'active'|'deprecated'; }
export interface GEI2PTranscriptBatchRequest extends BaseEntity { requester_did: string; institution_id: string; student_dids: string[]; purpose: string; total_count: number; processed_count: number; status: 'pending'|'processing'|'completed'|'partial'|'failed'; started_at: string; completed_at?: string; }
export interface GEI2PTranscriptBatchItem extends BaseEntity { batch_id: string; student_did: string; transcript_id?: string; status: 'pending'|'completed'|'failed'; error?: string; }
export interface GEI2PTranscriptGradeScale extends BaseEntity { institution_id: string; name: string; scale_type: 'letter'|'gpa'|'percentage'|'custom'; min_value: number; max_value: number; passing_value: number; grade_mappings: Record<string,unknown>[]; status: 'active'|'deprecated'; }
export interface GEI2PTranscriptCreditDefinition extends BaseEntity { institution_id: string; credit_type: 'semester'|'quarter'|'trimester'|'custom'; conversion_factor: number; max_credits_per_term: number; min_credits_full_time: number; }
export interface GEI2PTranscriptAccreditation extends BaseEntity { institution_id: string; accrediting_body: string; accreditation_type: string; accreditation_level: string; valid_from: string; valid_until: string; status: 'active'|'expired'|'suspended'|'revoked'; }
export interface GEI2PTranscriptCompliance extends BaseEntity { transcript_id: string; regulation: string; standard: string; status: 'compliant'|'non_compliant'|'pending_review'; checked_at: string; details: Record<string,unknown>; }
export interface GEI2PTranscriptAnalytics extends BaseEntity { institution_id: string; metric: string; value: number; dimension: Record<string,string>; period: string; calculated_at: string; }
export interface GEI2PTranscriptBackup extends BaseEntity { transcript_id: string; backup_type: 'full'|'incremental'; file_url: string; checksum: string; created_at_backup: string; expires_at: string; }
export interface GEI2PTranscriptVersion extends BaseEntity { transcript_id: string; version: number; snapshot: Record<string,unknown>; change_summary: string; changed_by: string; }
export interface GEI2PTranscriptMetadata extends BaseEntity { transcript_id: string; key: string; value: unknown; source: string; added_at: string; }
export interface GEI2PTranscriptCourseEquivalence extends BaseEntity { source_institution_id: string; source_course_code: string; destination_institution_id: string; destination_course_code: string; equivalence_type: 'exact'|'approximate'|'partial'; credits_equivalent: number; reviewed_by?: string; reviewed_at?: string; status: 'pending'|'approved'|'denied'; }
export interface GEI2PTranscriptExchangeAgreement extends BaseEntity { institution_a_id: string; institution_b_id: string; agreement_type: 'bilateral'|'multilateral'|'consortium'; terms: Record<string,unknown>; valid_from: string; valid_until: string; status: 'active'|'expired'|'suspended'; }
export interface GEI2PTranscriptRequestTemplate extends BaseEntity { name: string; purpose: string; required_fields: string[]; optional_fields: string[]; status: 'draft'|'active'|'deprecated'; }
export interface GEI2PTranscriptDeliveryLog extends BaseEntity { transcript_id: string; delivery_method: 'email'|'api'|'portal'|'mail'; recipient: string; status: 'sent'|'delivered'|'failed'|'bounced'; sent_at: string; delivered_at?: string; error?: string; }

// ============================================================================
// Entity table name map
// ============================================================================
export const GEI2P3_TABLE_NAMES: Record<string, string> = {
  GEI2PTranscriptRequest: 'gei2p_transcript_requests',
  GEI2PTranscriptRecord: 'gei2p_transcript_records',
  GEI2PTranscriptCourse: 'gei2p_transcript_courses',
  GEI2PTranscriptStandard: 'gei2p_transcript_standards',
  GEI2PTranscriptFormat: 'gei2p_transcript_formats',
  GEI2PTranscriptExport: 'gei2p_transcript_exports',
  GEI2PTranscriptTransfer: 'gei2p_transcript_transfers',
  GEI2PTranscriptMapping: 'gei2p_transcript_mappings',
  GEI2PTranscriptVerification: 'gei2p_transcript_verifications',
  GEI2PTranscriptApproval: 'gei2p_transcript_approvals',
  GEI2PTranscriptAuditLog: 'gei2p_transcript_audit_logs',
  GEI2PTranscriptAccessLog: 'gei2p_transcript_access_logs',
  GEI2PTranscriptShare: 'gei2p_transcript_shares',
  GEI2PTranscriptNotification: 'gei2p_transcript_notifications',
  GEI2PTranscriptTemplate: 'gei2p_transcript_templates',
  GEI2PTranscriptBatchRequest: 'gei2p_transcript_batch_requests',
  GEI2PTranscriptBatchItem: 'gei2p_transcript_batch_items',
  GEI2PTranscriptGradeScale: 'gei2p_transcript_grade_scales',
  GEI2PTranscriptCreditDefinition: 'gei2p_transcript_credit_definitions',
  GEI2PTranscriptAccreditation: 'gei2p_transcript_accreditations',
  GEI2PTranscriptCompliance: 'gei2p_transcript_compliances',
  GEI2PTranscriptAnalytics: 'gei2p_transcript_analytics',
  GEI2PTranscriptBackup: 'gei2p_transcript_backups',
  GEI2PTranscriptVersion: 'gei2p_transcript_versions',
  GEI2PTranscriptMetadata: 'gei2p_transcript_metadata',
  GEI2PTranscriptCourseEquivalence: 'gei2p_transcript_course_equivalences',
  GEI2PTranscriptExchangeAgreement: 'gei2p_transcript_exchange_agreements',
  GEI2PTranscriptRequestTemplate: 'gei2p_transcript_request_templates',
  GEI2PTranscriptDeliveryLog: 'gei2p_transcript_delivery_logs',
};

// ============================================================================
// Repository Interface
// ============================================================================
export interface GEI2P3Repository {
  requests: CrudRepository<GEI2PTranscriptRequest>;
  records: CrudRepository<GEI2PTranscriptRecord>;
  courses: CrudRepository<GEI2PTranscriptCourse>;
  standards: CrudRepository<GEI2PTranscriptStandard>;
  formats: CrudRepository<GEI2PTranscriptFormat>;
  exports: CrudRepository<GEI2PTranscriptExport>;
  transfers: CrudRepository<GEI2PTranscriptTransfer>;
  mappings: CrudRepository<GEI2PTranscriptMapping>;
  verifications: CrudRepository<GEI2PTranscriptVerification>;
  approvals: CrudRepository<GEI2PTranscriptApproval>;
  auditLogs: CrudRepository<GEI2PTranscriptAuditLog>;
  accessLogs: CrudRepository<GEI2PTranscriptAccessLog>;
  shares: CrudRepository<GEI2PTranscriptShare>;
  notifications: CrudRepository<GEI2PTranscriptNotification>;
  templates: CrudRepository<GEI2PTranscriptTemplate>;
  batchRequests: CrudRepository<GEI2PTranscriptBatchRequest>;
  batchItems: CrudRepository<GEI2PTranscriptBatchItem>;
  gradeScales: CrudRepository<GEI2PTranscriptGradeScale>;
  creditDefinitions: CrudRepository<GEI2PTranscriptCreditDefinition>;
  accreditations: CrudRepository<GEI2PTranscriptAccreditation>;
  compliances: CrudRepository<GEI2PTranscriptCompliance>;
  analytics: CrudRepository<GEI2PTranscriptAnalytics>;
  backups: CrudRepository<GEI2PTranscriptBackup>;
  versions: CrudRepository<GEI2PTranscriptVersion>;
  metadataEntries: CrudRepository<GEI2PTranscriptMetadata>;
  courseEquivalences: CrudRepository<GEI2PTranscriptCourseEquivalence>;
  exchangeAgreements: CrudRepository<GEI2PTranscriptExchangeAgreement>;
  requestTemplates: CrudRepository<GEI2PTranscriptRequestTemplate>;
  deliveryLogs: CrudRepository<GEI2PTranscriptDeliveryLog>;
}

// ============================================================================
// Factory
// ============================================================================
export function createGEI2P3Repository(supabase: SupabaseClient): GEI2P3Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    requests: crud<GEI2PTranscriptRequest>(GEI2P3_TABLE_NAMES.GEI2PTranscriptRequest),
    records: crud<GEI2PTranscriptRecord>(GEI2P3_TABLE_NAMES.GEI2PTranscriptRecord),
    courses: crud<GEI2PTranscriptCourse>(GEI2P3_TABLE_NAMES.GEI2PTranscriptCourse),
    standards: crud<GEI2PTranscriptStandard>(GEI2P3_TABLE_NAMES.GEI2PTranscriptStandard),
    formats: crud<GEI2PTranscriptFormat>(GEI2P3_TABLE_NAMES.GEI2PTranscriptFormat),
    exports: crud<GEI2PTranscriptExport>(GEI2P3_TABLE_NAMES.GEI2PTranscriptExport),
    transfers: crud<GEI2PTranscriptTransfer>(GEI2P3_TABLE_NAMES.GEI2PTranscriptTransfer),
    mappings: crud<GEI2PTranscriptMapping>(GEI2P3_TABLE_NAMES.GEI2PTranscriptMapping),
    verifications: crud<GEI2PTranscriptVerification>(GEI2P3_TABLE_NAMES.GEI2PTranscriptVerification),
    approvals: crud<GEI2PTranscriptApproval>(GEI2P3_TABLE_NAMES.GEI2PTranscriptApproval),
    auditLogs: crud<GEI2PTranscriptAuditLog>(GEI2P3_TABLE_NAMES.GEI2PTranscriptAuditLog),
    accessLogs: crud<GEI2PTranscriptAccessLog>(GEI2P3_TABLE_NAMES.GEI2PTranscriptAccessLog),
    shares: crud<GEI2PTranscriptShare>(GEI2P3_TABLE_NAMES.GEI2PTranscriptShare),
    notifications: crud<GEI2PTranscriptNotification>(GEI2P3_TABLE_NAMES.GEI2PTranscriptNotification),
    templates: crud<GEI2PTranscriptTemplate>(GEI2P3_TABLE_NAMES.GEI2PTranscriptTemplate),
    batchRequests: crud<GEI2PTranscriptBatchRequest>(GEI2P3_TABLE_NAMES.GEI2PTranscriptBatchRequest),
    batchItems: crud<GEI2PTranscriptBatchItem>(GEI2P3_TABLE_NAMES.GEI2PTranscriptBatchItem),
    gradeScales: crud<GEI2PTranscriptGradeScale>(GEI2P3_TABLE_NAMES.GEI2PTranscriptGradeScale),
    creditDefinitions: crud<GEI2PTranscriptCreditDefinition>(GEI2P3_TABLE_NAMES.GEI2PTranscriptCreditDefinition),
    accreditations: crud<GEI2PTranscriptAccreditation>(GEI2P3_TABLE_NAMES.GEI2PTranscriptAccreditation),
    compliances: crud<GEI2PTranscriptCompliance>(GEI2P3_TABLE_NAMES.GEI2PTranscriptCompliance),
    analytics: crud<GEI2PTranscriptAnalytics>(GEI2P3_TABLE_NAMES.GEI2PTranscriptAnalytics),
    backups: crud<GEI2PTranscriptBackup>(GEI2P3_TABLE_NAMES.GEI2PTranscriptBackup),
    versions: crud<GEI2PTranscriptVersion>(GEI2P3_TABLE_NAMES.GEI2PTranscriptVersion),
    metadataEntries: crud<GEI2PTranscriptMetadata>(GEI2P3_TABLE_NAMES.GEI2PTranscriptMetadata),
    courseEquivalences: crud<GEI2PTranscriptCourseEquivalence>(GEI2P3_TABLE_NAMES.GEI2PTranscriptCourseEquivalence),
    exchangeAgreements: crud<GEI2PTranscriptExchangeAgreement>(GEI2P3_TABLE_NAMES.GEI2PTranscriptExchangeAgreement),
    requestTemplates: crud<GEI2PTranscriptRequestTemplate>(GEI2P3_TABLE_NAMES.GEI2PTranscriptRequestTemplate),
    deliveryLogs: crud<GEI2PTranscriptDeliveryLog>(GEI2P3_TABLE_NAMES.GEI2PTranscriptDeliveryLog),
  };
}
