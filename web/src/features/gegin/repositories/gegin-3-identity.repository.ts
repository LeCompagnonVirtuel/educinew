import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gegin-base.repository';

// ============================================================================
// GEGIN-3: Identity — Digital Identity & Credentials Framework
// ============================================================================

export interface GEGINPassport extends BaseEntity {
  user_id: string;
  passport_number: string;
  country_code: string;
  issue_date: string;
  expiry_date: string;
  status: 'active' | 'expired' | 'revoked' | 'pending';
  document_url?: string;
  verification_status: 'pending' | 'verified' | 'rejected';
  verified_by?: string;
  verified_at?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINCredential extends BaseEntity {
  user_id: string;
  type: 'diploma' | 'certificate' | 'transcript' | 'license' | 'other';
  title: string;
  issuer: string;
  issue_date: string;
  expiry_date?: string;
  credential_id: string;
  status: 'active' | 'expired' | 'revoked' | 'suspended';
  verification_url?: string;
  blockchain_hash?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINBlockchainRecord extends BaseEntity {
  credential_id: string;
  blockchain_type: 'ethereum' | 'hyperledger' | 'solana' | 'other';
  transaction_hash: string;
  block_number: number;
  chain_id: number;
  status: 'pending' | 'confirmed' | 'failed';
  verified_at?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINAuthMethod extends BaseEntity {
  user_id: string;
  method_type: 'password' | 'otp' | 'biometric' | 'hardware_key' | 'social';
  provider?: string;
  status: 'active' | 'inactive' | 'revoked';
  last_used_at?: string;
  expires_at?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINBiometricData extends BaseEntity {
  user_id: string;
  type: 'fingerprint' | 'facial' | 'iris' | 'voice';
  template_hash: string;
  quality_score: number;
  status: 'active' | 'inactive' | 'revoked';
  enrolled_at: string;
  device_id?: string;
  metadata: Record<string, unknown>;
}

// ============================================================================
// Table Name Map
// ============================================================================
export const GEGIN3_TABLE_NAMES: Record<string, string> = {
  GEGINPassport: 'gegin_passports',
  GEGINCredential: 'gegin_credentials',
  GEGINBlockchainRecord: 'gegin_blockchain_records',
  GEGINAuthMethod: 'gegin_auth_methods',
  GEGINBiometricData: 'gegin_biometric_data',
};

// ============================================================================
// Repository Interface
// ============================================================================
export interface GEGIN3Repository {
  passports: CrudRepository<GEGINPassport>;
  credentials: CrudRepository<GEGINCredential>;
  blockchainRecords: CrudRepository<GEGINBlockchainRecord>;
  authMethods: CrudRepository<GEGINAuthMethod>;
  biometricData: CrudRepository<GEGINBiometricData>;
}

// ============================================================================
// Factory
// ============================================================================
export function createGEGIN3Repository(supabase: SupabaseClient): GEGIN3Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    passports: crud<GEGINPassport>(GEGIN3_TABLE_NAMES.GEGINPassport),
    credentials: crud<GEGINCredential>(GEGIN3_TABLE_NAMES.GEGINCredential),
    blockchainRecords: crud<GEGINBlockchainRecord>(GEGIN3_TABLE_NAMES.GEGINBlockchainRecord),
    authMethods: crud<GEGINAuthMethod>(GEGIN3_TABLE_NAMES.GEGINAuthMethod),
    biometricData: crud<GEGINBiometricData>(GEGIN3_TABLE_NAMES.GEGINBiometricData),
  };
}
