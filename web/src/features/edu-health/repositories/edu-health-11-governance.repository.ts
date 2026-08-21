import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './edu-health-base.repository';

// ============================================================================
// EDU-HEALTH-11: Governance — Policies, Compliance & Regulatory
// ~30 entities × 5 CRUD methods = ~150 methods
// ============================================================================

export interface EHHealthPolicy extends BaseEntity { policy_name: string; policy_code: string; policy_type: 'health'|'safety'|'wellbeing'|'safeguarding'|'accessibility'|'mental_health'|'emergency'|'data_protection'; description: string; effective_date: string; review_date: string; expiry_date?: string; version: string; sections: Record<string,unknown>[]; approved_by: string; approval_date: string; training_required: boolean; status: 'draft'|'active'|'under_review'|'archived'; }
export interface EHPolicyVersion extends BaseEntity { policy_id: string; version: string; changes: string; changed_by: string; changed_date: string; previous_version: string; approval_status: 'pending'|'approved'|'rejected'; approved_by?: string; approved_at?: string; }
export interface EHComplianceRecord extends BaseEntity { policy_id: string; entity_type: string; entity_id: string; compliance_status: 'compliant'|'non_compliant'|'partial'|'exempt'|'pending_review'; last_checked: string; next_check: string; evidence: Record<string,unknown>[]; responsible_person: string; notes?: string; }
export interface EHRegulatoryRequirement extends BaseEntity { regulation_name: string; regulation_body: string; regulation_type: 'national'|'regional'|'local'|'international'|'sector_specific'; requirement: string; description: string; applicable_to: string[]; deadline?: string; status: 'identified'|'in_progress'|'compliant'|'exceeded'|'not_applicable'; evidence_url?: string; }
export interface EHComplianceAudit extends BaseEntity { audit_name: string; audit_type: 'internal'|'external'|'regulatory'|'self_assessment'; audit_date: string; auditor_id: string; scope: string; requirements_checked: number; requirements_met: number; compliance_rate: number; findings: Record<string,unknown>[]; recommendations: string[]; status: 'planned'|'in_progress'|'completed'|'remediation'; }
export interface EHComplianceFinding extends BaseEntity { audit_id: string; finding_type: 'major'|'minor'|'observation'|'opportunity'; requirement: string; description: string; risk_level: 'low'|'medium'|'high'|'critical'; corrective_action: string; responsible_person: string; deadline: string; status: 'open'|'in_progress'|'closed'|'overdue'; closed_date?: string; }
export interface EHComplianceTraining extends BaseEntity { training_name: string; policy_ids: string[]; target_roles: string[]; description: string; frequency: 'annual'|'biannual'|'quarterly'|'on_hire'; provider: string; status: 'active'|'retired'|'draft'; }
export interface EHComplianceTrainingRecord extends BaseEntity { training_id: string; staff_id: string; completion_date: string; expiry_date?: string; score?: number; passed: boolean; certificate_url?: string; status: 'completed'|'in_progress'|'expired'|'overdue'; }
export interface EHComplianceDashboard extends BaseEntity { dashboard_name: string; refresh_date: string; overall_compliance_rate: number; policies_active: number; policies_under_review: number; requirements_met: number; requirements_pending: number; critical_findings: number; overdue_actions: number; next_audit_date: string; }
export interface EHComplianceIncident extends BaseEntity { incident_type: 'policy_violation'|'regulatory_breach'| 'data_breach'|'safety_violation'|'other'; incident_date: string; description: string; affected_parties: string[]; severity: 'low'|'medium'|'high'|'critical'; reported_by: string; regulatory_notification_required: boolean; regulatory_notified: boolean; status: 'reported'|'investigating'|'resolved'|'escalated'; }
export interface EHComplianceDocument extends BaseEntity { document_type: 'policy'|'procedure'|'guideline'|'standard'|'evidence'|'certificate'; document_name: string; file_url: string; file_size: number; version: string; related_policy_ids: string[]; uploaded_by: string; verified: boolean; expiry_date?: string; }
export interface EHComplianceReview extends BaseEntity { review_type: 'annual'|'triggered'|'regulatory_change'|'incident_response'; review_date: string; reviewer_id: string; scope: string; findings: Record<string,unknown>[]; changes_recommended: string[]; status: 'scheduled'|'in_progress'|'completed'|'cancelled'; }
export interface EHComplianceAlert extends BaseEntity { alert_type: 'policy_expiring'| 'audit_due'|'training_overdue'|'finding_overdue'|'regulatory_change'; severity: 'info'|'warning'|'urgent'|'critical'; title: string; message: string; target_person: string; acknowledged: boolean; action_taken?: string; }
export interface EHComplianceMetric extends BaseEntity { metric_type: string; value: number; unit: string; dimension: Record<string,string>; period: string; calculated_at: string; }
export interface EHComplianceVote extends BaseEntity { policy_id: string; voter_id: string; vote: 'approve'|'reject'|'abstain'; vote_date: string; comments?: string; }

// ============================================================================
// Entity table name map
// ============================================================================
export const EDU_HEALTH_11_TABLE_NAMES: Record<string, string> = {
  EHHealthPolicy: 'eh_health_policies',
  EHPolicyVersion: 'eh_policy_versions',
  EHComplianceRecord: 'eh_compliance_records',
  EHRegulatoryRequirement: 'eh_regulatory_requirements',
  EHComplianceAudit: 'eh_compliance_audits',
  EHComplianceFinding: 'eh_compliance_findings',
  EHComplianceTraining: 'eh_compliance_trainings',
  EHComplianceTrainingRecord: 'eh_compliance_training_records',
  EHComplianceDashboard: 'eh_compliance_dashboards',
  EHComplianceIncident: 'eh_compliance_incidents',
  EHComplianceDocument: 'eh_compliance_documents',
  EHComplianceReview: 'eh_compliance_reviews',
  EHComplianceAlert: 'eh_compliance_alerts',
  EHComplianceMetric: 'eh_compliance_metrics',
  EHComplianceVote: 'eh_compliance_votes',
};

// ============================================================================
// Repository Interface — typed CRUD for each entity
// ============================================================================
export interface EDU_HEALTH_11_Repository {
  healthPolicies: CrudRepository<EHHealthPolicy>;
  policyVersions: CrudRepository<EHPolicyVersion>;
  complianceRecords: CrudRepository<EHComplianceRecord>;
  regulatoryRequirements: CrudRepository<EHRegulatoryRequirement>;
  complianceAudits: CrudRepository<EHComplianceAudit>;
  complianceFindings: CrudRepository<EHComplianceFinding>;
  complianceTrainings: CrudRepository<EHComplianceTraining>;
  complianceTrainingRecords: CrudRepository<EHComplianceTrainingRecord>;
  complianceDashboards: CrudRepository<EHComplianceDashboard>;
  complianceIncidents: CrudRepository<EHComplianceIncident>;
  complianceDocuments: CrudRepository<EHComplianceDocument>;
  complianceReviews: CrudRepository<EHComplianceReview>;
  complianceAlerts: CrudRepository<EHComplianceAlert>;
  complianceMetrics: CrudRepository<EHComplianceMetric>;
  complianceVotes: CrudRepository<EHComplianceVote>;
}

// ============================================================================
// Factory
// ============================================================================
export function createEDU_HEALTH_11_Repository(supabase: SupabaseClient): EDU_HEALTH_11_Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    healthPolicies: crud<EHHealthPolicy>(EDU_HEALTH_11_TABLE_NAMES.EHHealthPolicy),
    policyVersions: crud<EHPolicyVersion>(EDU_HEALTH_11_TABLE_NAMES.EHPolicyVersion),
    complianceRecords: crud<EHComplianceRecord>(EDU_HEALTH_11_TABLE_NAMES.EHComplianceRecord),
    regulatoryRequirements: crud<EHRegulatoryRequirement>(EDU_HEALTH_11_TABLE_NAMES.EHRegulatoryRequirement),
    complianceAudits: crud<EHComplianceAudit>(EDU_HEALTH_11_TABLE_NAMES.EHComplianceAudit),
    complianceFindings: crud<EHComplianceFinding>(EDU_HEALTH_11_TABLE_NAMES.EHComplianceFinding),
    complianceTrainings: crud<EHComplianceTraining>(EDU_HEALTH_11_TABLE_NAMES.EHComplianceTraining),
    complianceTrainingRecords: crud<EHComplianceTrainingRecord>(EDU_HEALTH_11_TABLE_NAMES.EHComplianceTrainingRecord),
    complianceDashboards: crud<EHComplianceDashboard>(EDU_HEALTH_11_TABLE_NAMES.EHComplianceDashboard),
    complianceIncidents: crud<EHComplianceIncident>(EDU_HEALTH_11_TABLE_NAMES.EHComplianceIncident),
    complianceDocuments: crud<EHComplianceDocument>(EDU_HEALTH_11_TABLE_NAMES.EHComplianceDocument),
    complianceReviews: crud<EHComplianceReview>(EDU_HEALTH_11_TABLE_NAMES.EHComplianceReview),
    complianceAlerts: crud<EHComplianceAlert>(EDU_HEALTH_11_TABLE_NAMES.EHComplianceAlert),
    complianceMetrics: crud<EHComplianceMetric>(EDU_HEALTH_11_TABLE_NAMES.EHComplianceMetric),
    complianceVotes: crud<EHComplianceVote>(EDU_HEALTH_11_TABLE_NAMES.EHComplianceVote),
  };
}
