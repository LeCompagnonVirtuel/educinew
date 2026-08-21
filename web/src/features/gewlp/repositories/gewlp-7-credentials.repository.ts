import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gewlp-base.repository';

// ============================================================================
// GEWLP-7: Credentials — Digital Credentials & Verification
// ============================================================================

export interface GewlpCredential extends BaseEntity { user_id: string; credential_type: 'certificate'|'badge'|'diploma'|'license'|'award'|'portfolio_item'|'micro_credential'; title: string; description: string; issuer: string; issuer_did?: string; issued_date: string; expiry_date?: string; credential_data: Record<string,unknown>; evidence_urls: string[]; verification_code: string; status: 'active'|'expired'|'revoked'|'suspended'; }
export interface GewlpCredentialTemplate extends BaseEntity { name: string; description: string; credential_type: string; issuer_id: string; design: Record<string,unknown>; fields: Record<string,unknown>[]; valid_days?: number; status: 'active'|'draft'|'archived'; }
export interface GewlpCredentialIssuance extends BaseEntity { template_id: string; issuer_id: string; recipient_id: string; issued_at: string; credential_id?: string; batch_id?: string; metadata: Record<string,unknown>; status: 'pending'|'issued'|'failed'; }
export interface GewlpVerificationRequest extends BaseEntity { credential_id: string; verifier_id: string; verifier_did?: string; purpose: string; requested_fields: string[]; status: 'pending'|'verified'|'rejected'|'expired'; verified_at?: string; verification_result: Record<string,unknown>; }
export interface GewlpVerificationLog extends BaseEntity { credential_id: string; verifier_id: string; action: 'verify'|'revoke'|'suspend'|'reactivate'; result: 'success'|'failure'; details: Record<string,unknown>; timestamp: string; ip_address: string; }
export interface GewlpRevocationRegistry extends BaseEntity { credential_id: string; revocation_id: string; reason: string; revoked_by: string; revoked_at: string; status: 'revoked'|'reinstated'; }
export interface GewlpCredentialWallet extends BaseEntity { user_id: string; name: string; credential_ids: string[]; shared_with: Record<string,unknown>[]; backup_enabled: boolean; last_synced_at: string; }
export interface GewlpCredentialShare extends BaseEntity { credential_id: string; wallet_id: string; shared_with_id: string; shared_with_type: 'institution'|'employer'|'verifier'|'individual'; permissions: ('view'|'verify'|'export')[]; expires_at?: string; status: 'active'|'revoked'|'expired'; }
export interface GewlpCredentialBadge extends BaseEntity { user_id: string; badge_type: string; title: string; description: string; icon_url: string; criteria: Record<string,unknown>; awarded_at: string; awarded_by: string; skill_ids: string[]; level: number; }
export interface GewlpCredentialSchema extends BaseEntity { name: string; version: string; description: string; schema_type: 'json_ld'|'jwt'|'xml'|'custom'; fields: Record<string,unknown>[]; required_fields: string[]; status: 'active'|'deprecated'; }
export interface GewlpCredentialBlockchain extends BaseEntity { credential_id: string; chain: string; transaction_hash: string; block_number: number; timestamp: string; network: 'mainnet'|'testnet'|'local'; status: 'pending'|'confirmed'|'failed'; }
export interface GewlpCredentialAnalytics extends BaseEntity { issuer_id: string; period: string; total_issued: number; total_verified: number; total_revoked: number; verification_rate: number; avg_verification_time_ms: number; top_skills: string[]; }

export const Gewlp7TableNames: Record<string, string> = {
  GewlpCredential: 'gewlp_credentials',
  GewlpCredentialTemplate: 'gewlp_credential_templates',
  GewlpCredentialIssuance: 'gewlp_credential_issuances',
  GewlpVerificationRequest: 'gewlp_verification_requests',
  GewlpVerificationLog: 'gewlp_verification_logs',
  GewlpRevocationRegistry: 'gewlp_revocation_registries',
  GewlpCredentialWallet: 'gewlp_credential_wallets',
  GewlpCredentialShare: 'gewlp_credential_shares',
  GewlpCredentialBadge: 'gewlp_credential_badges',
  GewlpCredentialSchema: 'gewlp_credential_schemas',
  GewlpCredentialBlockchain: 'gewlp_credential_blockchains',
  GewlpCredentialAnalytics: 'gewlp_credential_analytics',
};

export interface Gewlp7Repository {
  credentials: CrudRepository<GewlpCredential>;
  credentialTemplates: CrudRepository<GewlpCredentialTemplate>;
  credentialIssuances: CrudRepository<GewlpCredentialIssuance>;
  verificationRequests: CrudRepository<GewlpVerificationRequest>;
  verificationLogs: CrudRepository<GewlpVerificationLog>;
  revocationRegistries: CrudRepository<GewlpRevocationRegistry>;
  credentialWallets: CrudRepository<GewlpCredentialWallet>;
  credentialShares: CrudRepository<GewlpCredentialShare>;
  credentialBadges: CrudRepository<GewlpCredentialBadge>;
  credentialSchemas: CrudRepository<GewlpCredentialSchema>;
  credentialBlockchains: CrudRepository<GewlpCredentialBlockchain>;
  credentialAnalytics: CrudRepository<GewlpCredentialAnalytics>;
}

export function createGewlp7Repository(supabase: SupabaseClient): Gewlp7Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    credentials: crud<GewlpCredential>(Gewlp7TableNames.GewlpCredential),
    credentialTemplates: crud<GewlpCredentialTemplate>(Gewlp7TableNames.GewlpCredentialTemplate),
    credentialIssuances: crud<GewlpCredentialIssuance>(Gewlp7TableNames.GewlpCredentialIssuance),
    verificationRequests: crud<GewlpVerificationRequest>(Gewlp7TableNames.GewlpVerificationRequest),
    verificationLogs: crud<GewlpVerificationLog>(Gewlp7TableNames.GewlpVerificationLog),
    revocationRegistries: crud<GewlpRevocationRegistry>(Gewlp7TableNames.GewlpRevocationRegistry),
    credentialWallets: crud<GewlpCredentialWallet>(Gewlp7TableNames.GewlpCredentialWallet),
    credentialShares: crud<GewlpCredentialShare>(Gewlp7TableNames.GewlpCredentialShare),
    credentialBadges: crud<GewlpCredentialBadge>(Gewlp7TableNames.GewlpCredentialBadge),
    credentialSchemas: crud<GewlpCredentialSchema>(Gewlp7TableNames.GewlpCredentialSchema),
    credentialBlockchains: crud<GewlpCredentialBlockchain>(Gewlp7TableNames.GewlpCredentialBlockchain),
    credentialAnalytics: crud<GewlpCredentialAnalytics>(Gewlp7TableNames.GewlpCredentialAnalytics),
  };
}
