import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gei2p-base.repository';

// ============================================================================
// GEI2P-9: Governance — Data Governance & Policy Management
// ~28 entities × 5 CRUD methods = ~140 methods
// ============================================================================

export interface GEI2PGovernancePolicy extends BaseEntity { name: string; description: string; policy_type: 'data_quality'|'security'| 'privacy'|'compliance'|'access'| 'retention'|'lifecycle'; scope: string; rules: Record<string,unknown>[]; enforcement: 'strict'|'advisory'|'monitoring'; status: 'draft'|'active'|'deprecated'; }
export interface GEI2PGovernancePolicyVersion extends BaseEntity { policy_id: string; version: number; snapshot: Record<string,unknown>; change_summary: string; approved_by?: string; approved_at?: string; created_by: string; }
export interface GEI2PGovernanceRole extends BaseEntity { name: string; description: string; permissions: string[]; responsibilities: string[]; is_system: boolean; status: 'active'|'inactive'; }
export interface GEI2PGovernanceRoleAssignment extends BaseEntity { role_id: string; user_did: string; scope: string; assigned_at: string; assigned_by: string; expires_at?: string; status: 'active'|'revoked'|'expired'; }
export interface GEI2PGovernanceSteward extends BaseEntity { user_did: string; domain: string; entity_types: string[]; responsibilities: Record<string,unknown>; appointed_at: string; status: 'active'|'inactive'; }
export interface GEI2PGovernanceDataCatalog extends BaseEntity { name: string; description: string; entity_count: number; last_synced_at?: string; status: 'active'|'syncing'|'error'; }
export interface GEI2PGovernanceCatalogEntry extends BaseEntity { catalog_id: string; entity_type: string; entity_name: string; description: string; owner_did: string; steward_did?: string; classification: 'public'|'internal'|'confidential'|'restricted'; tags: string[]; schema: Record<string,unknown>; last_modified_at: string; }
export interface GEI2PGovernanceDataLineage extends BaseEntity { source_entity_type: string; source_entity_id: string; target_entity_type: string; target_entity_id: string; transformation: string; pipeline_id?: string; created_at: string; }
export interface GEI2PGovernanceQualityRule extends BaseEntity { name: string; description: string; entity_type: string; rule_type: 'completeness'|'accuracy'|'consistency'|'timeliness'|'validity'|'uniqueness'; rule_config: Record<string,unknown>; severity: 'low'|'medium'|'high'|'critical'; active: boolean; }
export interface GEI2PGovernanceQualityResult extends BaseEntity { rule_id: string; entity_type: string; entity_id: string; passed: boolean; score: number; details: Record<string,unknown>; checked_at: string; }
export interface GEI2PGovernanceAccessRequest extends BaseEntity { user_did: string; resource_type: string; resource_id: string; permission: string; justification: string; status: 'pending'|'approved'|'denied'|'expired'; reviewed_by?: string; reviewed_at?: string; expires_at?: string; }
export interface GEI2PGovernanceAccessPolicy extends BaseEntity { resource_type: string; resource_id?: string; role_id?: string; permissions: string[]; conditions: Record<string,unknown>; enabled: boolean; }
export interface GEI2PGovernanceRetentionPolicy extends BaseEntity { entity_type: string; retention_days: number; archive_before_delete: boolean; archive_storage?: string; legal_basis?: string; enabled: boolean; }
export interface GEI2PGovernanceRetentionExecution extends BaseEntity { policy_id: string; entity_type: string; records_archived: number; records_deleted: number; errors: number; executed_at: string; status: 'completed'|'partial'|'failed'; }
export interface GEI2PGovernanceConsent extends BaseEntity { user_did: string; purpose: string; entity_type: string; entity_id?: string; granted: boolean; granted_at: string; expires_at?: string; revoked_at?: string; consent_version: string; }
export interface GEI2PGovernanceAuditLog extends BaseEntity { entity_type: string; entity_id: string; action: string; actor_did: string; details: Record<string,unknown>; ip_address: string; timestamp: string; }
export interface GEI2PGovernanceIncident extends BaseEntity { title: string; description: string; incident_type: 'data_breach'|'policy_violation'|'quality_failure'|'access_violation'|'system_error'; severity: 'low'|'medium'|'high'|'critical'; status: 'open'|'investigating'|'resolved'|'closed'; assigned_to?: string; reported_by: string; reported_at: string; resolved_at?: string; }
export interface GEI2PGovernanceIncidentUpdate extends BaseEntity { incident_id: string; author_did: string; content: string; status_change?: string; created_at: string; }
export interface GEI2PGovernanceMetric extends BaseEntity { metric_name: string; value: number; unit: string; dimension: Record<string,string>; period: string; calculated_at: string; }
export interface GEI2PGovernanceDashboard extends BaseEntity { name: string; description: string; widgets: Record<string,unknown>[]; layout: Record<string,unknown>; owner_did: string; is_default: boolean; }
export interface GEI2PGovernanceReport extends BaseEntity { name: string; description: string; report_type: 'quality'|'compliance'| 'access'| 'lineage'| 'custom'; config: Record<string,unknown>; schedule?: string; last_generated_at?: string; status: 'draft'|'active'|'deprecated'; }
export interface GEI2PGovernanceReportExecution extends BaseEntity { report_id: string; status: 'pending'|'running'|'completed'|'failed'; parameters: Record<string,unknown>; result_url?: string; started_at: string; completed_at?: string; }
export interface GEI2PGovernanceComplianceCheck extends BaseEntity { policy_id: string; entity_type: string; entity_id: string; compliant: boolean; violations: Record<string,unknown>[]; checked_at: string; }
export interface GEI2PGovernanceComplianceReport extends BaseEntity { period: string; total_checks: number; compliant: number; non_compliant: number; compliance_rate: number; violations_by_type: Record<string,number>; generated_at: string; }
export interface GEI2PGovernanceNotification extends BaseEntity { recipient_did: string; type: 'policy_update'|'quality_alert'| 'incident'| 'compliance'| 'access_request'; title: string; message: string; read: boolean; read_at?: string; sent_at: string; }
export interface GEI2PGovernanceBackup extends BaseEntity { entity_type: string; backup_type: 'full'|'incremental'; file_url: string; checksum: string; record_count: number; created_at_backup: string; expires_at: string; }
export interface GEI2PGovernanceWorkflow extends BaseEntity { name: string; description: string; trigger_type: string; steps: Record<string,unknown>[]; status: 'active'|'inactive'; }
export interface GEI2PGovernanceWorkflowRun extends BaseEntity { workflow_id: string; trigger_event: Record<string,unknown>; status: 'pending'|'running'|'completed'|'failed'; started_at: string; completed_at?: string; steps_completed: number; }
export interface GEI2PGovernanceDataClassification extends BaseEntity { entity_type: string; entity_id: string; classification: 'public'|'internal'|'confidential'|'restricted'; classified_by: string; classified_at: string; reason: string; }
export interface GEI2PGovernanceRiskAssessment extends BaseEntity { title: string; description: string; risk_type: string; probability: number; impact: number; risk_score: number; mitigation_plan: string; owner_did: string; status: 'identified'|'assessing'|'mitigating'|'closed'; identified_at: string; }

// ============================================================================
// Entity table name map
// ============================================================================
export const GEI2P9_TABLE_NAMES: Record<string, string> = {
  GEI2PGovernancePolicy: 'gei2p_governance_policies',
  GEI2PGovernancePolicyVersion: 'gei2p_governance_policy_versions',
  GEI2PGovernanceRole: 'gei2p_governance_roles',
  GEI2PGovernanceRoleAssignment: 'gei2p_governance_role_assignments',
  GEI2PGovernanceSteward: 'gei2p_governance_stewards',
  GEI2PGovernanceDataCatalog: 'gei2p_governance_data_catalogs',
  GEI2PGovernanceCatalogEntry: 'gei2p_governance_catalog_entries',
  GEI2PGovernanceDataLineage: 'gei2p_governance_data_lineages',
  GEI2PGovernanceQualityRule: 'gei2p_governance_quality_rules',
  GEI2PGovernanceQualityResult: 'gei2p_governance_quality_results',
  GEI2PGovernanceAccessRequest: 'gei2p_governance_access_requests',
  GEI2PGovernanceAccessPolicy: 'gei2p_governance_access_policies',
  GEI2PGovernanceRetentionPolicy: 'gei2p_governance_retention_policies',
  GEI2PGovernanceRetentionExecution: 'gei2p_governance_retention_executions',
  GEI2PGovernanceConsent: 'gei2p_governance_consents',
  GEI2PGovernanceAuditLog: 'gei2p_governance_audit_logs',
  GEI2PGovernanceIncident: 'gei2p_governance_incidents',
  GEI2PGovernanceIncidentUpdate: 'gei2p_governance_incident_updates',
  GEI2PGovernanceMetric: 'gei2p_governance_metrics',
  GEI2PGovernanceDashboard: 'gei2p_governance_dashboards',
  GEI2PGovernanceReport: 'gei2p_governance_reports',
  GEI2PGovernanceReportExecution: 'gei2p_governance_report_executions',
  GEI2PGovernanceComplianceCheck: 'gei2p_governance_compliance_checks',
  GEI2PGovernanceComplianceReport: 'gei2p_governance_compliance_reports',
  GEI2PGovernanceNotification: 'gei2p_governance_notifications',
  GEI2PGovernanceBackup: 'gei2p_governance_backups',
  GEI2PGovernanceWorkflow: 'gei2p_governance_workflows',
  GEI2PGovernanceWorkflowRun: 'gei2p_governance_workflow_runs',
  GEI2PGovernanceDataClassification: 'gei2p_governance_data_classifications',
  GEI2PGovernanceRiskAssessment: 'gei2p_governance_risk_assessments',
};

// ============================================================================
// Repository Interface
// ============================================================================
export interface GEI2P9Repository {
  policies: CrudRepository<GEI2PGovernancePolicy>;
  policyVersions: CrudRepository<GEI2PGovernancePolicyVersion>;
  roles: CrudRepository<GEI2PGovernanceRole>;
  roleAssignments: CrudRepository<GEI2PGovernanceRoleAssignment>;
  stewards: CrudRepository<GEI2PGovernanceSteward>;
  dataCatalogs: CrudRepository<GEI2PGovernanceDataCatalog>;
  catalogEntries: CrudRepository<GEI2PGovernanceCatalogEntry>;
  dataLineages: CrudRepository<GEI2PGovernanceDataLineage>;
  qualityRules: CrudRepository<GEI2PGovernanceQualityRule>;
  qualityResults: CrudRepository<GEI2PGovernanceQualityResult>;
  accessRequests: CrudRepository<GEI2PGovernanceAccessRequest>;
  accessPolicies: CrudRepository<GEI2PGovernanceAccessPolicy>;
  retentionPolicies: CrudRepository<GEI2PGovernanceRetentionPolicy>;
  retentionExecutions: CrudRepository<GEI2PGovernanceRetentionExecution>;
  consents: CrudRepository<GEI2PGovernanceConsent>;
  auditLogs: CrudRepository<GEI2PGovernanceAuditLog>;
  incidents: CrudRepository<GEI2PGovernanceIncident>;
  incidentUpdates: CrudRepository<GEI2PGovernanceIncidentUpdate>;
  metrics: CrudRepository<GEI2PGovernanceMetric>;
  dashboards: CrudRepository<GEI2PGovernanceDashboard>;
  reports: CrudRepository<GEI2PGovernanceReport>;
  reportExecutions: CrudRepository<GEI2PGovernanceReportExecution>;
  complianceChecks: CrudRepository<GEI2PGovernanceComplianceCheck>;
  complianceReports: CrudRepository<GEI2PGovernanceComplianceReport>;
  notifications: CrudRepository<GEI2PGovernanceNotification>;
  backups: CrudRepository<GEI2PGovernanceBackup>;
  workflows: CrudRepository<GEI2PGovernanceWorkflow>;
  workflowRuns: CrudRepository<GEI2PGovernanceWorkflowRun>;
  dataClassifications: CrudRepository<GEI2PGovernanceDataClassification>;
  riskAssessments: CrudRepository<GEI2PGovernanceRiskAssessment>;
}

// ============================================================================
// Factory
// ============================================================================
export function createGEI2P9Repository(supabase: SupabaseClient): GEI2P9Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    policies: crud<GEI2PGovernancePolicy>(GEI2P9_TABLE_NAMES.GEI2PGovernancePolicy),
    policyVersions: crud<GEI2PGovernancePolicyVersion>(GEI2P9_TABLE_NAMES.GEI2PGovernancePolicyVersion),
    roles: crud<GEI2PGovernanceRole>(GEI2P9_TABLE_NAMES.GEI2PGovernanceRole),
    roleAssignments: crud<GEI2PGovernanceRoleAssignment>(GEI2P9_TABLE_NAMES.GEI2PGovernanceRoleAssignment),
    stewards: crud<GEI2PGovernanceSteward>(GEI2P9_TABLE_NAMES.GEI2PGovernanceSteward),
    dataCatalogs: crud<GEI2PGovernanceDataCatalog>(GEI2P9_TABLE_NAMES.GEI2PGovernanceDataCatalog),
    catalogEntries: crud<GEI2PGovernanceCatalogEntry>(GEI2P9_TABLE_NAMES.GEI2PGovernanceCatalogEntry),
    dataLineages: crud<GEI2PGovernanceDataLineage>(GEI2P9_TABLE_NAMES.GEI2PGovernanceDataLineage),
    qualityRules: crud<GEI2PGovernanceQualityRule>(GEI2P9_TABLE_NAMES.GEI2PGovernanceQualityRule),
    qualityResults: crud<GEI2PGovernanceQualityResult>(GEI2P9_TABLE_NAMES.GEI2PGovernanceQualityResult),
    accessRequests: crud<GEI2PGovernanceAccessRequest>(GEI2P9_TABLE_NAMES.GEI2PGovernanceAccessRequest),
    accessPolicies: crud<GEI2PGovernanceAccessPolicy>(GEI2P9_TABLE_NAMES.GEI2PGovernanceAccessPolicy),
    retentionPolicies: crud<GEI2PGovernanceRetentionPolicy>(GEI2P9_TABLE_NAMES.GEI2PGovernanceRetentionPolicy),
    retentionExecutions: crud<GEI2PGovernanceRetentionExecution>(GEI2P9_TABLE_NAMES.GEI2PGovernanceRetentionExecution),
    consents: crud<GEI2PGovernanceConsent>(GEI2P9_TABLE_NAMES.GEI2PGovernanceConsent),
    auditLogs: crud<GEI2PGovernanceAuditLog>(GEI2P9_TABLE_NAMES.GEI2PGovernanceAuditLog),
    incidents: crud<GEI2PGovernanceIncident>(GEI2P9_TABLE_NAMES.GEI2PGovernanceIncident),
    incidentUpdates: crud<GEI2PGovernanceIncidentUpdate>(GEI2P9_TABLE_NAMES.GEI2PGovernanceIncidentUpdate),
    metrics: crud<GEI2PGovernanceMetric>(GEI2P9_TABLE_NAMES.GEI2PGovernanceMetric),
    dashboards: crud<GEI2PGovernanceDashboard>(GEI2P9_TABLE_NAMES.GEI2PGovernanceDashboard),
    reports: crud<GEI2PGovernanceReport>(GEI2P9_TABLE_NAMES.GEI2PGovernanceReport),
    reportExecutions: crud<GEI2PGovernanceReportExecution>(GEI2P9_TABLE_NAMES.GEI2PGovernanceReportExecution),
    complianceChecks: crud<GEI2PGovernanceComplianceCheck>(GEI2P9_TABLE_NAMES.GEI2PGovernanceComplianceCheck),
    complianceReports: crud<GEI2PGovernanceComplianceReport>(GEI2P9_TABLE_NAMES.GEI2PGovernanceComplianceReport),
    notifications: crud<GEI2PGovernanceNotification>(GEI2P9_TABLE_NAMES.GEI2PGovernanceNotification),
    backups: crud<GEI2PGovernanceBackup>(GEI2P9_TABLE_NAMES.GEI2PGovernanceBackup),
    workflows: crud<GEI2PGovernanceWorkflow>(GEI2P9_TABLE_NAMES.GEI2PGovernanceWorkflow),
    workflowRuns: crud<GEI2PGovernanceWorkflowRun>(GEI2P9_TABLE_NAMES.GEI2PGovernanceWorkflowRun),
    dataClassifications: crud<GEI2PGovernanceDataClassification>(GEI2P9_TABLE_NAMES.GEI2PGovernanceDataClassification),
    riskAssessments: crud<GEI2PGovernanceRiskAssessment>(GEI2P9_TABLE_NAMES.GEI2PGovernanceRiskAssessment),
  };
}
