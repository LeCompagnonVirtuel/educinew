import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gei2p-base.repository';

// ============================================================================
// GEI2P-1: Identity — Digital Identity & Credential Lifecycle
// ~35 entities × 5 CRUD methods = ~175 methods
// ============================================================================

export interface GEI2PIdentityProfile extends BaseEntity { user_id: string; did: string; name: string; email: string; phone?: string; avatar_url?: string; date_of_birth?: string; gender?: string; nationality?: string; national_id?: string; biometric_hash?: string; status: 'active'|'suspended'|'revoked'|'pending'; verification_level: 'none'|'basic'|'verified'|'premium'; metadata: Record<string,unknown>; }
export interface GEI2PDIDDocument extends BaseEntity { identity_id: string; did: string; method: 'ion'|'key'|'web'|'peer'|'custom'; public_key: string; private_key_ref?: string; document: Record<string,unknown>; created_at_doc: string; expires_at?: string; status: 'active'|'deactivated'|'revoked'; }
export interface GEI2PVerifiableCredential extends BaseEntity { issuer_did: string; subject_did: string; type: string[]; credential_name: string; credential_data: Record<string,unknown>; issuance_date: string; expiration_date?: string; revocation_id?: string; status: 'active'|'expired'|'revoked'|'suspended'; proof: Record<string,unknown>; schema_url?: string; }
export interface GEI2PVCBundle extends BaseEntity { identity_id: string; name: string; credential_ids: string[]; format: 'jwt'|'json_ld'|'mso_mdoc'; exported_at?: string; password_hash?: string; }
export interface GEI2PConsentRecord extends BaseEntity { identity_id: string; purpose: string; scope: string[]; granted: boolean; granted_at?: string; expires_at?: string; revoked_at?: string; consent_version: string; ip_address?: string; }
export interface GEI2PPrivacySetting extends BaseEntity { identity_id: string; setting_key: string; value: unknown; category: 'profile'|'academic'|'financial'|'health'|'communication'; last_changed_at: string; }
export interface GEI2PIdentityRecovery extends BaseEntity { identity_id: string; method: 'email'|'phone'|'security_question'|'backup_did'|'guardian'; challenge_hash: string; attempts: number; max_attempts: number; status: 'pending'|'verified'|'expired'|'locked'; expires_at: string; recovered_at?: string; }
export interface GEI2PAuthenticationLog extends BaseEntity { identity_id: string; method: 'password'|'biometric'|'otp'|'did_challenge'|'webauthn'; status: 'success'|'failed'|'blocked'; ip_address: string; user_agent: string; risk_score: number; }
export interface GEI2PSessionToken extends BaseEntity { identity_id: string; token_hash: string; device_id: string; ip_address: string; user_agent: string; issued_at: string; expires_at: string; revoked_at?: string; }
export interface GEI2PDeviceFingerprint extends BaseEntity { identity_id: string; device_id: string; fingerprint_hash: string; platform: string; browser?: string; screen_resolution?: string; timezone?: string; first_seen_at: string; last_seen_at: string; trusted: boolean; }
export interface GEI2PAccessPolicy extends BaseEntity { name: string; description: string; rules: Record<string,unknown>[]; effect: 'allow'|'deny'; priority: number; enabled: boolean; }
export interface GEI2PAccessGrant extends BaseEntity { identity_id: string; policy_id: string; resource: string; action: string; granted_at: string; expires_at?: string; conditions: Record<string,unknown>; }
export interface GEI2PRoleAssignment extends BaseEntity { identity_id: string; role: string; scope: string; assigned_at: string; assigned_by: string; expires_at?: string; }
export interface GEI2PIdentityAttribute extends BaseEntity { identity_id: string; key: string; value: unknown; type: 'string'|'number'|'boolean'|'date'|'json'|'array'; verified: boolean; verified_at?: string; source: string; }
export interface GEI2PIdentitySchema extends BaseEntity { name: string; version: string; description: string; properties: Record<string,unknown>[]; required_fields: string[]; extends_schema?: string; status: 'draft'|'active'|'deprecated'; }
export interface GEI2PIdentityClaim extends BaseEntity { identity_id: string; claim_type: string; claim_value: Record<string,unknown>; issuer_did: string; evidence: Record<string,unknown>[]; verification_status: 'pending'|'verified'|'rejected'; verified_at?: string; }
export interface GEI2PVerificationRequest extends BaseEntity { identity_id: string; verifier_did: string; requested_claims: string[]; purpose: string; status: 'pending'|'approved'|'denied'|'expired'; response_data?: Record<string,unknown>; expires_at: string; }
export interface GEI2PTrustRegistry extends BaseEntity { entity_did: string; entity_name: string; entity_type: 'institution'|'government'| 'employer'|'verifier'|'issuer'; trust_level: number; accredited: boolean; accreditation_body?: string; valid_until?: string; }
export interface GEI2PIdentityMigration extends BaseEntity { source_system: string; target_did: string; migration_type: 'bulk'|'individual'|'batch'; records_migrated: number; status: 'pending'|'in_progress'|'completed'|'failed'; started_at: string; completed_at?: string; error_log?: string; }
export interface GEI2PIdentityAudit extends BaseEntity { identity_id: string; action: string; actor_did: string; details: Record<string,unknown>; ip_address: string; timestamp: string; }
export interface GEI2PBulkIdentityImport extends BaseEntity { file_name: string; file_url: string; record_count: number; imported: number; failed: number; status: 'pending'|'processing'|'completed'|'failed'; started_at: string; completed_at?: string; error_log?: string; }
export interface GEI2PIdentityExport extends BaseEntity { identity_id: string; format: 'json'|'csv'|'pdf'|'xml'; file_url?: string; status: 'pending'|'processing'|'completed'|'failed'; requested_at: string; completed_at?: string; }
export interface GEI2PDelegationRecord extends BaseEntity { delegator_did: string; delegate_did: string; scope: string[]; purpose: string; granted_at: string; expires_at?: string; revoked_at?: string; }
export interface GEI2PIdentityReputation extends BaseEntity { identity_id: string; score: number; factors: Record<string,number>; last_calculated_at: string; trend: 'improving'|'stable'|'declining'; }
export interface GEI2PIdentityRecoveryPlan extends BaseEntity { identity_id: string; steps: Record<string,unknown>[]; status: 'active'|'completed'|'expired'; created_at_plan: string; completed_at?: string; }
export interface GEI2PIdentityMerge extends BaseEntity { primary_identity_id: string; secondary_identity_id: string; merged_by: string; merge_reason: string; status: 'pending'|'completed'|'failed'; merged_at?: string; }
export interface GEI2PIdentitySplit extends BaseEntity { original_identity_id: string; new_identity_ids: string[]; split_reason: string; split_by: string; status: 'pending'|'completed'|'failed'; split_at?: string; }
export interface GEI2PIdentityVersion extends BaseEntity { identity_id: string; version: number; snapshot: Record<string,unknown>; change_type: 'create'|'update'|'merge'|'split'; changed_by: string; }
export interface GEI2PIdentityNotification extends BaseEntity { identity_id: string; type: 'verification'|'expiry'|'recovery'|'security'|'update'; title: string; message: string; read: boolean; read_at?: string; action_url?: string; }
export interface GEI2PIdentityMetric extends BaseEntity { metric_name: string; value: number; unit: string; dimension: Record<string,string>; timestamp: string; }
export interface GEI2PIdentityCompliance extends BaseEntity { identity_id: string; regulation: string; status: 'compliant'|'non_compliant'|'pending_review'; last_checked_at: string; next_check_at?: string; details: Record<string,unknown>; }
export interface GEI2PIdentityBackup extends BaseEntity { identity_id: string; backup_type: 'full'|'incremental'|'differential'; file_url: string; file_size: number; checksum: string; created_at_backup: string; expires_at: string; }

// ============================================================================
// Entity table name map
// ============================================================================
export const GEI2P1_TABLE_NAMES: Record<string, string> = {
  GEI2PIdentityProfile: 'gei2p_identity_profiles',
  GEI2PDIDDocument: 'gei2p_did_documents',
  GEI2PVerifiableCredential: 'gei2p_verifiable_credentials',
  GEI2PVCBundle: 'gei2p_vc_bundles',
  GEI2PConsentRecord: 'gei2p_consent_records',
  GEI2PPrivacySetting: 'gei2p_privacy_settings',
  GEI2PIdentityRecovery: 'gei2p_identity_recoveries',
  GEI2PAuthenticationLog: 'gei2p_authentication_logs',
  GEI2PSessionToken: 'gei2p_session_tokens',
  GEI2PDeviceFingerprint: 'gei2p_device_fingerprints',
  GEI2PAccessPolicy: 'gei2p_access_policies',
  GEI2PAccessGrant: 'gei2p_access_grants',
  GEI2PRoleAssignment: 'gei2p_role_assignments',
  GEI2PIdentityAttribute: 'gei2p_identity_attributes',
  GEI2PIdentitySchema: 'gei2p_identity_schemas',
  GEI2PIdentityClaim: 'gei2p_identity_claims',
  GEI2PVerificationRequest: 'gei2p_verification_requests',
  GEI2PTrustRegistry: 'gei2p_trust_registries',
  GEI2PIdentityMigration: 'gei2p_identity_migrations',
  GEI2PIdentityAudit: 'gei2p_identity_audits',
  GEI2PBulkIdentityImport: 'gei2p_bulk_identity_imports',
  GEI2PIdentityExport: 'gei2p_identity_exports',
  GEI2PDelegationRecord: 'gei2p_delegation_records',
  GEI2PIdentityReputation: 'gei2p_identity_reputations',
  GEI2PIdentityRecoveryPlan: 'gei2p_identity_recovery_plans',
  GEI2PIdentityMerge: 'gei2p_identity_merges',
  GEI2PIdentitySplit: 'gei2p_identity_splits',
  GEI2PIdentityVersion: 'gei2p_identity_versions',
  GEI2PIdentityNotification: 'gei2p_identity_notifications',
  GEI2PIdentityMetric: 'gei2p_identity_metrics',
  GEI2PIdentityCompliance: 'gei2p_identity_compliances',
  GEI2PIdentityBackup: 'gei2p_identity_backups',
};

// ============================================================================
// Repository Interface — typed CRUD for each entity
// ============================================================================
export interface GEI2P1Repository {
  profiles: CrudRepository<GEI2PIdentityProfile>;
  didDocuments: CrudRepository<GEI2PDIDDocument>;
  verifiableCredentials: CrudRepository<GEI2PVerifiableCredential>;
  vcBundles: CrudRepository<GEI2PVCBundle>;
  consentRecords: CrudRepository<GEI2PConsentRecord>;
  privacySettings: CrudRepository<GEI2PPrivacySetting>;
  identityRecoveries: CrudRepository<GEI2PIdentityRecovery>;
  authenticationLogs: CrudRepository<GEI2PAuthenticationLog>;
  sessionTokens: CrudRepository<GEI2PSessionToken>;
  deviceFingerprints: CrudRepository<GEI2PDeviceFingerprint>;
  accessPolicies: CrudRepository<GEI2PAccessPolicy>;
  accessGrants: CrudRepository<GEI2PAccessGrant>;
  roleAssignments: CrudRepository<GEI2PRoleAssignment>;
  identityAttributes: CrudRepository<GEI2PIdentityAttribute>;
  identitySchemas: CrudRepository<GEI2PIdentitySchema>;
  identityClaims: CrudRepository<GEI2PIdentityClaim>;
  verificationRequests: CrudRepository<GEI2PVerificationRequest>;
  trustRegistries: CrudRepository<GEI2PTrustRegistry>;
  identityMigrations: CrudRepository<GEI2PIdentityMigration>;
  identityAudits: CrudRepository<GEI2PIdentityAudit>;
  bulkImports: CrudRepository<GEI2PBulkIdentityImport>;
  identityExports: CrudRepository<GEI2PIdentityExport>;
  delegationRecords: CrudRepository<GEI2PDelegationRecord>;
  identityReputations: CrudRepository<GEI2PIdentityReputation>;
  identityRecoveryPlans: CrudRepository<GEI2PIdentityRecoveryPlan>;
  identityMerges: CrudRepository<GEI2PIdentityMerge>;
  identitySplits: CrudRepository<GEI2PIdentitySplit>;
  identityVersions: CrudRepository<GEI2PIdentityVersion>;
  identityNotifications: CrudRepository<GEI2PIdentityNotification>;
  identityMetrics: CrudRepository<GEI2PIdentityMetric>;
  identityCompliances: CrudRepository<GEI2PIdentityCompliance>;
  identityBackups: CrudRepository<GEI2PIdentityBackup>;
}

// ============================================================================
// Factory
// ============================================================================
export function createGEI2P1Repository(supabase: SupabaseClient): GEI2P1Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    profiles: crud<GEI2PIdentityProfile>(GEI2P1_TABLE_NAMES.GEI2PIdentityProfile),
    didDocuments: crud<GEI2PDIDDocument>(GEI2P1_TABLE_NAMES.GEI2PDIDDocument),
    verifiableCredentials: crud<GEI2PVerifiableCredential>(GEI2P1_TABLE_NAMES.GEI2PVerifiableCredential),
    vcBundles: crud<GEI2PVCBundle>(GEI2P1_TABLE_NAMES.GEI2PVCBundle),
    consentRecords: crud<GEI2PConsentRecord>(GEI2P1_TABLE_NAMES.GEI2PConsentRecord),
    privacySettings: crud<GEI2PPrivacySetting>(GEI2P1_TABLE_NAMES.GEI2PPrivacySetting),
    identityRecoveries: crud<GEI2PIdentityRecovery>(GEI2P1_TABLE_NAMES.GEI2PIdentityRecovery),
    authenticationLogs: crud<GEI2PAuthenticationLog>(GEI2P1_TABLE_NAMES.GEI2PAuthenticationLog),
    sessionTokens: crud<GEI2PSessionToken>(GEI2P1_TABLE_NAMES.GEI2PSessionToken),
    deviceFingerprints: crud<GEI2PDeviceFingerprint>(GEI2P1_TABLE_NAMES.GEI2PDeviceFingerprint),
    accessPolicies: crud<GEI2PAccessPolicy>(GEI2P1_TABLE_NAMES.GEI2PAccessPolicy),
    accessGrants: crud<GEI2PAccessGrant>(GEI2P1_TABLE_NAMES.GEI2PAccessGrant),
    roleAssignments: crud<GEI2PRoleAssignment>(GEI2P1_TABLE_NAMES.GEI2PRoleAssignment),
    identityAttributes: crud<GEI2PIdentityAttribute>(GEI2P1_TABLE_NAMES.GEI2PIdentityAttribute),
    identitySchemas: crud<GEI2PIdentitySchema>(GEI2P1_TABLE_NAMES.GEI2PIdentitySchema),
    identityClaims: crud<GEI2PIdentityClaim>(GEI2P1_TABLE_NAMES.GEI2PIdentityClaim),
    verificationRequests: crud<GEI2PVerificationRequest>(GEI2P1_TABLE_NAMES.GEI2PVerificationRequest),
    trustRegistries: crud<GEI2PTrustRegistry>(GEI2P1_TABLE_NAMES.GEI2PTrustRegistry),
    identityMigrations: crud<GEI2PIdentityMigration>(GEI2P1_TABLE_NAMES.GEI2PIdentityMigration),
    identityAudits: crud<GEI2PIdentityAudit>(GEI2P1_TABLE_NAMES.GEI2PIdentityAudit),
    bulkImports: crud<GEI2PBulkIdentityImport>(GEI2P1_TABLE_NAMES.GEI2PBulkIdentityImport),
    identityExports: crud<GEI2PIdentityExport>(GEI2P1_TABLE_NAMES.GEI2PIdentityExport),
    delegationRecords: crud<GEI2PDelegationRecord>(GEI2P1_TABLE_NAMES.GEI2PDelegationRecord),
    identityReputations: crud<GEI2PIdentityReputation>(GEI2P1_TABLE_NAMES.GEI2PIdentityReputation),
    identityRecoveryPlans: crud<GEI2PIdentityRecoveryPlan>(GEI2P1_TABLE_NAMES.GEI2PIdentityRecoveryPlan),
    identityMerges: crud<GEI2PIdentityMerge>(GEI2P1_TABLE_NAMES.GEI2PIdentityMerge),
    identitySplits: crud<GEI2PIdentitySplit>(GEI2P1_TABLE_NAMES.GEI2PIdentitySplit),
    identityVersions: crud<GEI2PIdentityVersion>(GEI2P1_TABLE_NAMES.GEI2PIdentityVersion),
    identityNotifications: crud<GEI2PIdentityNotification>(GEI2P1_TABLE_NAMES.GEI2PIdentityNotification),
    identityMetrics: crud<GEI2PIdentityMetric>(GEI2P1_TABLE_NAMES.GEI2PIdentityMetric),
    identityCompliances: crud<GEI2PIdentityCompliance>(GEI2P1_TABLE_NAMES.GEI2PIdentityCompliance),
    identityBackups: crud<GEI2PIdentityBackup>(GEI2P1_TABLE_NAMES.GEI2PIdentityBackup),
  };
}
