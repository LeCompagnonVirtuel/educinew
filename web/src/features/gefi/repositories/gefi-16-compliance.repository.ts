import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gefi-base.repository';

// ============================================================================
// GEFI-16: Compliance — Regulatory, Audit, Policy, Certification
// ============================================================================

export interface GEFIComplianceFramework extends BaseEntity { name: string; description: string; type: 'FINANCIAL'|'DATA_PRIVACY'|'ACADEMIC'|'OPERATIONAL'|'SECURITY'|'ENVIRONMENTAL'; jurisdiction: string; version: string; effective_date: string; status: 'ACTIVE'|'SUPERSEDED'|'DRAFT'; metadata: Record<string,unknown>; }
export interface GEFIComplianceRequirement extends BaseEntity { framework_id: string; requirement_code: string; title: string; description: string; category: string; priority: 'HIGH'|'MEDIUM'|'LOW'; implementation_guidance: string; evidence_required: string[]; frequency: string; status: 'COMPLIANT'|'NON_COMPLIANT'|'PARTIAL'|'NOT_ASSESSED'; last_assessed?: string; metadata: Record<string,unknown>; }
export interface GEFIComplianceAssessment extends BaseEntity { requirement_id: string; assessor_id: string; assessment_date: string; status: 'COMPLIANT'|'NON_COMPLIANT'|'PARTIAL'|'NOT_ASSESSED'; findings: string; evidence: Record<string,unknown>[]; score: number; recommendations: string[]; next_assessment_date: string; metadata: Record<string,unknown>; }
export interface GEFIComplianceAudit extends BaseEntity { name: string; type: 'INTERNAL'|'EXTERNAL'|'REGULATORY'|'CERTIFICATION'; framework_id: string; auditor_name: string; auditor_organization: string; scope: string; start_date: string; end_date: string; status: 'PLANNED'|'IN_PROGRESS'|'COMPLETED'|'CANCELLED'; overall_result?: string; findings_count: number; metadata: Record<string,unknown>; }
export interface GEFIComplianceAuditFinding extends BaseEntity { audit_id: string; requirement_id?: string; severity: 'CRITICAL'|'HIGH'|'MEDIUM'|'LOW'|'OBSERVATION'; title: string; description: string; evidence: string; recommendation: string; remediation_plan?: string; due_date?: string; status: 'OPEN'|'IN_PROGRESS'|'RESOLVED'|'ACCEPTED'|'WAIVED'; resolved_at?: string; metadata: Record<string,unknown>; }
export interface GEFICompliancePolicy extends BaseEntity { framework_id: string; title: string; description: string; content: string; version: number; effective_date: string; review_date: string; owner_id: string; status: 'DRAFT'|'APPROVED'|'ACTIVE'|'ARCHIVED'|'SUPERSEDED'; approved_by?: string; approved_at?: string; metadata: Record<string,unknown>; }
export interface GEFICompliancePolicyAcknowledgment extends BaseEntity { policy_id: string; user_id: string; acknowledged_at: string; version: number; metadata: Record<string,unknown>; }
export interface GEFICertification extends BaseEntity { name: string; type: string; issuing_body: string; certificate_number: string; scope: string; issue_date: string; expiry_date: string; renewal_required: boolean; status: 'ACTIVE'|'EXPIRED'|'SUSPENDED'|'REVOKED'; document_url?: string; metadata: Record<string,unknown>; }
export interface GEFICertificationRenewal extends BaseEntity { certification_id: string; renewal_date: string; new_expiry_date: string; cost: number; requirements: string[]; status: 'PENDING'|'SUBMITTED'|'APPROVED'|'REJECTED'; submitted_at?: string; metadata: Record<string,unknown>; }
export interface GEFIDataPrivacyRecord extends BaseEntity; data_type: string; processing_purpose: string; legal_basis: string; data_controller: string; data_processor?: string; retention_period: string; security_measures: string[]; status: 'ACTIVE'|'INACTIVE'|'ARCHIVED'; metadata: Record<string,unknown>; }
export interface GEFIDataBreach extends BaseEntity; detection_date: string; description: string; affected_records: number; data_types: string[]; severity: 'LOW'|'MEDIUM'|'HIGH'|'CRITICAL'; status: 'DETECTED'|'CONTAINED'|'NOTIFIED'|'RESOLVED'; notification_date?: string; reported_to_authority: boolean; remediation: string; metadata: Record<string,unknown>; }
export interface GEFIAuditTrail extends BaseEntity { entity_type: string; entity_id: string; action: string; actor_id: string; changes: Record<string,unknown>; ip_address?: string; metadata: Record<string,unknown>; }

export interface GEFI16Repository {
  complianceFramework: CrudRepository<GEFIComplianceFramework>;
  complianceRequirement: CrudRepository<GEFIComplianceRequirement>;
  complianceAssessment: CrudRepository<GEFIComplianceAssessment>;
  complianceAudit: CrudRepository<GEFIComplianceAudit>;
  complianceAuditFinding: CrudRepository<GEFIComplianceAuditFinding>;
  compliancePolicy: CrudRepository<GEFICompliancePolicy>;
  compliancePolicyAcknowledgment: CrudRepository<GEFICompliancePolicyAcknowledgment>;
  certification: CrudRepository<GEFICertification>;
  certificationRenewal: CrudRepository<GEFICertificationRenewal>;
  dataPrivacyRecord: CrudRepository<GEFIDataPrivacyRecord>;
  dataBreach: CrudRepository<GEFIDataBreach>;
  auditTrail: CrudRepository<GEFIAuditTrail>;
}

export function createGEFI16Repository(supabase: SupabaseClient): GEFI16Repository {
  return {
    complianceFramework: createCrudRepository<GEFIComplianceFramework>(supabase, 'gefi_compliance_frameworks'),
    complianceRequirement: createCrudRepository<GEFIComplianceRequirement>(supabase, 'gefi_compliance_requirements'),
    complianceAssessment: createCrudRepository<GEFIComplianceAssessment>(supabase, 'gefi_compliance_assessments'),
    complianceAudit: createCrudRepository<GEFIComplianceAudit>(supabase, 'gefi_compliance_audits'),
    complianceAuditFinding: createCrudRepository<GEFIComplianceAuditFinding>(supabase, 'gefi_compliance_audit_findings'),
    compliancePolicy: createCrudRepository<GEFICompliancePolicy>(supabase, 'gefi_compliance_policies'),
    compliancePolicyAcknowledgment: createCrudRepository<GEFICompliancePolicyAcknowledgment>(supabase, 'gefi_compliance_policy_acknowledgments'),
    certification: createCrudRepository<GEFICertification>(supabase, 'gefi_certifications'),
    certificationRenewal: createCrudRepository<GEFICertificationRenewal>(supabase, 'gefi_certification_renewals'),
    dataPrivacyRecord: createCrudRepository<GEFIDataPrivacyRecord>(supabase, 'gefi_data_privacy_records'),
    dataBreach: createCrudRepository<GEFIDataBreach>(supabase, 'gefi_data_breaches'),
    auditTrail: createCrudRepository<GEFIAuditTrail>(supabase, 'gefi_compliance_audit_trails'),
  };
}
