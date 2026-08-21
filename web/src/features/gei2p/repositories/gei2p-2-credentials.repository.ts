import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gei2p-base.repository';

// ============================================================================
// GEI2P-2: Credentials — Academic & Professional Credential Management
// ~30 entities × 5 CRUD methods = ~150 methods
// ============================================================================

export interface GEI2PCredentialTemplate extends BaseEntity { name: string; type: 'diploma'|'certificate'|'transcript'|'badge'|'micro_credential'|'professional'; issuer_type: 'school'|'university'|'government'|'organization'; schema: Record<string,unknown>; validity_period_days?: number; required_fields: string[]; optional_fields: string[]; status: 'draft'|'active'|'deprecated'; }
export interface GEI2PCredentialDefinition extends BaseEntity { template_id: string; name: string; version: string; description: string; criteria: Record<string,unknown>; evidence_requirements: Record<string,unknown>[]; status: 'draft'|'active'|'revoked'; }
export interface GEI2PCredentialIssuance extends BaseEntity { definition_id: string; recipient_did: string; recipient_name: string; issued_by: string; issued_at: string; expiration_date?: string; credential_data: Record<string,unknown>; proof: Record<string,unknown>; status: 'issued'|'revoked'|'expired'|'suspended'; revocation_reason?: string; revoked_at?: string; }
export interface GEI2PCredentialRevocation extends BaseEntity { issuance_id: string; reason: string; revoked_by: string; revoked_at: string; revocation_list_index?: number; status: 'revoked'|'unrevoked'; }
export interface GEI2PCredentialVerification extends BaseEntity { issuance_id: string; verifier_did: string; verification_method: string; verified: boolean; verification_date: string; checks: Record<string,unknown>[]; result: Record<string,unknown>; }
export interface GEI2PCredentialRequest extends BaseEntity { template_id: string; requester_did: string; purpose: string; supporting_documents: Record<string,unknown>[]; status: 'pending'|'approved'|'denied'|'expired'; reviewed_by?: string; reviewed_at?: string; }
export interface GEI2PCredentialWallet extends BaseEntity { identity_id: string; name: string; credential_count: number; last_synced_at?: string; encryption_key_ref: string; backup_enabled: boolean; }
export interface GEI2PCredentialWalletItem extends BaseEntity { wallet_id: string; issuance_id: string; display_name: string; category: string; tags: string[]; favorite: boolean; added_at: string; }
export interface GEI2PCredentialSchema extends BaseEntity { name: string; version: string; description: string; fields: Record<string,unknown>[]; required_fields: string[]; issuer_requirements: Record<string,unknown>; status: 'draft'|'active'|'deprecated'; }
export interface GEI2PCredentialRevocationList extends BaseEntity { issuer_did: string; list_index: number; issuance_id: string; revoked_at: string; reason: string; }
export interface GEI2PCredentialBatchIssuance extends BaseEntity { template_id: string; issuer_did: string; batch_name: string; total_count: number; issued_count: number; failed_count: number; status: 'pending'|'processing'|'completed'|'partial'|'failed'; started_at: string; completed_at?: string; error_log?: string; }
export interface GEI2PCredentialBatchItem extends BaseEntity { batch_id: string; recipient_did: string; recipient_name: string; credential_data: Record<string,unknown>; status: 'pending'|'issued'|'failed'; issuance_id?: string; error?: string; }
export interface GEI2PCredentialSharing extends BaseEntity { issuance_id: string; shared_by: string; shared_with_did: string; purpose: string; permissions: 'view'|'verify'|'export'; expires_at?: string; shared_at: string; accessed_at?: string; }
export interface GEI2PCredentialPresentation extends BaseEntity { holder_did: string; verifier_did: string; credentials: Record<string,unknown>[]; purpose: string; created_at: string; expires_at?: string; proof: Record<string,unknown>; verified: boolean; }
export interface GEI2PCredentialExpiryReminder extends BaseEntity { issuance_id: string; reminder_type: '30_days'|'7_days'|'1_day'|'custom'; scheduled_at: string; sent_at?: string; status: 'pending'|'sent'|'failed'; }
export interface GEI2PCredentialAuditLog extends BaseEntity { issuance_id: string; action: string; actor_did: string; details: Record<string,unknown>; ip_address: string; timestamp: string; }
export interface GEI2PCredentialTemplateVersion extends BaseEntity { template_id: string; version: number; snapshot: Record<string,unknown>; change_summary: string; created_by: string; }
export interface GEI2PCredentialEvidence extends BaseEntity { issuance_id: string; evidence_type: 'document'|'url'|'hash'|'statement'; data: Record<string,unknown>; submitted_at: string; verified: boolean; verified_at?: string; }
export interface GEI2PCredentialCriteriaMatch extends BaseEntity { issuance_id: string; criteria_id: string; met: boolean; evidence: Record<string,unknown>; evaluated_at: string; }
export interface GEI2PCredentialStatusCheck extends BaseEntity { issuance_id: string; checked_at: string; status: 'valid'|'revoked'|'expired'|'suspended'; response_time_ms: number; }
export interface GEI2PCredentialMetadata extends BaseEntity { issuance_id: string; key: string; value: unknown; source: string; added_at: string; }
export interface GEI2PCredentialShareLink extends BaseEntity { issuance_id: string; token_hash: string; created_by: string; expires_at: string; access_count: number; max_accesses?: number; active: boolean; }
export interface GEI2PCredentialNotification extends BaseEntity { issuance_id: string; recipient_did: string; type: 'issued'|'expiring'|'expired'|'revoked'|'shared'; title: string; message: string; read: boolean; read_at?: string; sent_at: string; }
export interface GEI2PCredentialAnalytics extends BaseEntity { template_id: string; metric: string; value: number; dimension: Record<string,string>; period: string; calculated_at: string; }
export interface GEI2PCredentialCompliance extends BaseEntity { issuance_id: string; regulation: string; status: 'compliant'|'non_compliant'|'pending'; checked_at: string; details: Record<string,unknown>; }
export interface GEI2PCredentialBackup extends BaseEntity { issuance_id: string; backup_type: 'full'|'encrypted'; file_url: string; checksum: string; created_at_backup: string; expires_at: string; }
export interface GEI2PCredentialTemplateField extends BaseEntity { template_id: string; field_name: string; field_type: 'string'|'number'|'boolean'|'date'|'json'|'array'; required: boolean; default_value?: unknown; validation_rules: Record<string,unknown>; display_order: number; }
export interface GEI2PCredentialIssuerProfile extends BaseEntity { issuer_did: string; name: string; type: 'school'|'university'|'government'|'organization'; logo_url?: string; website?: string; accreditation: Record<string,unknown>; trust_level: number; active: boolean; }
export interface GEI2PCredentialDependency extends BaseEntity { issuance_id: string; dependency_type: 'prerequisite'|'co_requisite'|'recommended'; required_issuance_id: string; status: 'met'|'unmet'|'waived'; }
export interface GEI2PCredentialRevocationListEntry extends BaseEntity { list_id: string; index: number; issuance_id: string; revoked_at: string; reason: string; }

// ============================================================================
// Entity table name map
// ============================================================================
export const GEI2P2_TABLE_NAMES: Record<string, string> = {
  GEI2PCredentialTemplate: 'gei2p_credential_templates',
  GEI2PCredentialDefinition: 'gei2p_credential_definitions',
  GEI2PCredentialIssuance: 'gei2p_credential_issuances',
  GEI2PCredentialRevocation: 'gei2p_credential_revocations',
  GEI2PCredentialVerification: 'gei2p_credential_verifications',
  GEI2PCredentialRequest: 'gei2p_credential_requests',
  GEI2PCredentialWallet: 'gei2p_credential_wallets',
  GEI2PCredentialWalletItem: 'gei2p_credential_wallet_items',
  GEI2PCredentialSchema: 'gei2p_credential_schemas',
  GEI2PCredentialRevocationList: 'gei2p_credential_revocation_lists',
  GEI2PCredentialBatchIssuance: 'gei2p_credential_batch_issuances',
  GEI2PCredentialBatchItem: 'gei2p_credential_batch_items',
  GEI2PCredentialSharing: 'gei2p_credential_sharings',
  GEI2PCredentialPresentation: 'gei2p_credential_presentations',
  GEI2PCredentialExpiryReminder: 'gei2p_credential_expiry_reminders',
  GEI2PCredentialAuditLog: 'gei2p_credential_audit_logs',
  GEI2PCredentialTemplateVersion: 'gei2p_credential_template_versions',
  GEI2PCredentialEvidence: 'gei2p_credential_evidences',
  GEI2PCredentialCriteriaMatch: 'gei2p_credential_criteria_matches',
  GEI2PCredentialStatusCheck: 'gei2p_credential_status_checks',
  GEI2PCredentialMetadata: 'gei2p_credential_metadata',
  GEI2PCredentialShareLink: 'gei2p_credential_share_links',
  GEI2PCredentialNotification: 'gei2p_credential_notifications',
  GEI2PCredentialAnalytics: 'gei2p_credential_analytics',
  GEI2PCredentialCompliance: 'gei2p_credential_compliances',
  GEI2PCredentialBackup: 'gei2p_credential_backups',
  GEI2PCredentialTemplateField: 'gei2p_credential_template_fields',
  GEI2PCredentialIssuerProfile: 'gei2p_credential_issuer_profiles',
  GEI2PCredentialDependency: 'gei2p_credential_dependencies',
  GEI2PCredentialRevocationListEntry: 'gei2p_credential_revocation_list_entries',
};

// ============================================================================
// Repository Interface
// ============================================================================
export interface GEI2P2Repository {
  templates: CrudRepository<GEI2PCredentialTemplate>;
  definitions: CrudRepository<GEI2PCredentialDefinition>;
  issuances: CrudRepository<GEI2PCredentialIssuance>;
  revocations: CrudRepository<GEI2PCredentialRevocation>;
  verifications: CrudRepository<GEI2PCredentialVerification>;
  requests: CrudRepository<GEI2PCredentialRequest>;
  wallets: CrudRepository<GEI2PCredentialWallet>;
  walletItems: CrudRepository<GEI2PCredentialWalletItem>;
  schemas: CrudRepository<GEI2PCredentialSchema>;
  revocationLists: CrudRepository<GEI2PCredentialRevocationList>;
  batchIssuances: CrudRepository<GEI2PCredentialBatchIssuance>;
  batchItems: CrudRepository<GEI2PCredentialBatchItem>;
  sharings: CrudRepository<GEI2PCredentialSharing>;
  presentations: CrudRepository<GEI2PCredentialPresentation>;
  expiryReminders: CrudRepository<GEI2PCredentialExpiryReminder>;
  auditLogs: CrudRepository<GEI2PCredentialAuditLog>;
  templateVersions: CrudRepository<GEI2PCredentialTemplateVersion>;
  evidences: CrudRepository<GEI2PCredentialEvidence>;
  criteriaMatches: CrudRepository<GEI2PCredentialCriteriaMatch>;
  statusChecks: CrudRepository<GEI2PCredentialStatusCheck>;
  metadataEntries: CrudRepository<GEI2PCredentialMetadata>;
  shareLinks: CrudRepository<GEI2PCredentialShareLink>;
  notifications: CrudRepository<GEI2PCredentialNotification>;
  analytics: CrudRepository<GEI2PCredentialAnalytics>;
  compliances: CrudRepository<GEI2PCredentialCompliance>;
  backups: CrudRepository<GEI2PCredentialBackup>;
  templateFields: CrudRepository<GEI2PCredentialTemplateField>;
  issuerProfiles: CrudRepository<GEI2PCredentialIssuerProfile>;
  dependencies: CrudRepository<GEI2PCredentialDependency>;
  revocationListEntries: CrudRepository<GEI2PCredentialRevocationListEntry>;
}

// ============================================================================
// Factory
// ============================================================================
export function createGEI2P2Repository(supabase: SupabaseClient): GEI2P2Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    templates: crud<GEI2PCredentialTemplate>(GEI2P2_TABLE_NAMES.GEI2PCredentialTemplate),
    definitions: crud<GEI2PCredentialDefinition>(GEI2P2_TABLE_NAMES.GEI2PCredentialDefinition),
    issuances: crud<GEI2PCredentialIssuance>(GEI2P2_TABLE_NAMES.GEI2PCredentialIssuance),
    revocations: crud<GEI2PCredentialRevocation>(GEI2P2_TABLE_NAMES.GEI2PCredentialRevocation),
    verifications: crud<GEI2PCredentialVerification>(GEI2P2_TABLE_NAMES.GEI2PCredentialVerification),
    requests: crud<GEI2PCredentialRequest>(GEI2P2_TABLE_NAMES.GEI2PCredentialRequest),
    wallets: crud<GEI2PCredentialWallet>(GEI2P2_TABLE_NAMES.GEI2PCredentialWallet),
    walletItems: crud<GEI2PCredentialWalletItem>(GEI2P2_TABLE_NAMES.GEI2PCredentialWalletItem),
    schemas: crud<GEI2PCredentialSchema>(GEI2P2_TABLE_NAMES.GEI2PCredentialSchema),
    revocationLists: crud<GEI2PCredentialRevocationList>(GEI2P2_TABLE_NAMES.GEI2PCredentialRevocationList),
    batchIssuances: crud<GEI2PCredentialBatchIssuance>(GEI2P2_TABLE_NAMES.GEI2PCredentialBatchIssuance),
    batchItems: crud<GEI2PCredentialBatchItem>(GEI2P2_TABLE_NAMES.GEI2PCredentialBatchItem),
    sharings: crud<GEI2PCredentialSharing>(GEI2P2_TABLE_NAMES.GEI2PCredentialSharing),
    presentations: crud<GEI2PCredentialPresentation>(GEI2P2_TABLE_NAMES.GEI2PCredentialPresentation),
    expiryReminders: crud<GEI2PCredentialExpiryReminder>(GEI2P2_TABLE_NAMES.GEI2PCredentialExpiryReminder),
    auditLogs: crud<GEI2PCredentialAuditLog>(GEI2P2_TABLE_NAMES.GEI2PCredentialAuditLog),
    templateVersions: crud<GEI2PCredentialTemplateVersion>(GEI2P2_TABLE_NAMES.GEI2PCredentialTemplateVersion),
    evidences: crud<GEI2PCredentialEvidence>(GEI2P2_TABLE_NAMES.GEI2PCredentialEvidence),
    criteriaMatches: crud<GEI2PCredentialCriteriaMatch>(GEI2P2_TABLE_NAMES.GEI2PCredentialCriteriaMatch),
    statusChecks: crud<GEI2PCredentialStatusCheck>(GEI2P2_TABLE_NAMES.GEI2PCredentialStatusCheck),
    metadataEntries: crud<GEI2PCredentialMetadata>(GEI2P2_TABLE_NAMES.GEI2PCredentialMetadata),
    shareLinks: crud<GEI2PCredentialShareLink>(GEI2P2_TABLE_NAMES.GEI2PCredentialShareLink),
    notifications: crud<GEI2PCredentialNotification>(GEI2P2_TABLE_NAMES.GEI2PCredentialNotification),
    analytics: crud<GEI2PCredentialAnalytics>(GEI2P2_TABLE_NAMES.GEI2PCredentialAnalytics),
    compliances: crud<GEI2PCredentialCompliance>(GEI2P2_TABLE_NAMES.GEI2PCredentialCompliance),
    backups: crud<GEI2PCredentialBackup>(GEI2P2_TABLE_NAMES.GEI2PCredentialBackup),
    templateFields: crud<GEI2PCredentialTemplateField>(GEI2P2_TABLE_NAMES.GEI2PCredentialTemplateField),
    issuerProfiles: crud<GEI2PCredentialIssuerProfile>(GEI2P2_TABLE_NAMES.GEI2PCredentialIssuerProfile),
    dependencies: crud<GEI2PCredentialDependency>(GEI2P2_TABLE_NAMES.GEI2PCredentialDependency),
    revocationListEntries: crud<GEI2PCredentialRevocationListEntry>(GEI2P2_TABLE_NAMES.GEI2PCredentialRevocationListEntry),
  };
}
