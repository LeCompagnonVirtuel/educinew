import { SupabaseClient } from '@supabase/supabase-js';
import {
  GestcrpDLPPolicyError,
  GestcrpDLPIncidentError,
  GestcrpEncryptionKeyError,
  GestcrpDataRetentionPolicyError,
  GestcrpDataMaskingError,
} from '@educi/errors';
import {
  GestcrpBaseEntity,
  GestcrpCrudRepository,
  PaginatedResult,
  PaginationParams,
  createGestcrpCrudRepository,
} from './base-gestcrp-repository';

// ============================================================================
// Data Security Entity Interfaces
// ============================================================================

export interface GestcrpDLPPolicy extends GestcrpBaseEntity {
  name: string;
  description: string;
  enabled: boolean;
  policy_type: string;
  data_classification: string[];
  patterns: Record<string, unknown>[];
  actions: string[];
  exclusions: string[];
  severity: string;
  notification_channels: string[];
  applies_to: 'UPLOAD' | 'DOWNLOAD' | 'EMAIL' | 'PRINT' | 'COPY' | 'TRANSFER' | 'ALL';
}

export interface GestcrpDLPIncident extends GestcrpBaseEntity {
  policy_id: string;
  user_id: string;
  action: string;
  data_classification: string;
  matched_patterns: Record<string, unknown>[];
  source: string;
  destination: string;
  file_name?: string;
  file_size?: number;
  file_type?: string;
  content_preview: string;
  blocked: boolean;
  encrypted: boolean;
  watermarked: boolean;
  notified: boolean;
  timestamp: string;
  reviewed_by?: string;
  reviewed_at?: string;
  disposition?: 'TRUE_POSITIVE' | 'FALSE_POSITIVE' | 'ACCEPTED_RISK';
}

export interface GestcrpEncryptionKey extends GestcrpBaseEntity {
  name: string;
  algorithm: string;
  size: number;
  purpose: 'ENCRYPTION' | 'SIGNING' | 'HMAC' | 'KEY_EXCHANGE' | 'BACKUP';
  status: 'ACTIVE' | 'ROTATING' | 'DEPRECATED' | 'REVOKED' | 'EXPIRED';
  fingerprint: string;
  public_key?: string;
  encrypted_private_key: string;
  key_version: number;
  expires_at: string;
  rotated_at?: string;
  last_used_at?: string;
}

export interface GestcrpDataRetentionPolicy extends GestcrpBaseEntity {
  name: string;
  description: string;
  enabled: boolean;
  data_classification: string[];
  retention_days: number;
  archive_before_deletion: boolean;
  archive_duration_days?: number;
  deletion_method: 'SECURE_DELETE' | 'CRYPTO_SHREDDING' | 'PHYSICAL_DESTRUCTION';
  exceptions: string[];
  compliance_frameworks: string[];
}

export interface GestcrpDataMaskingRule extends GestcrpBaseEntity {
  name: string;
  description: string;
  enabled: boolean;
  field_patterns: string[];
  masking_type: 'FULL' | 'PARTIAL' | 'TOKEN' | 'HASH' | 'FORMAT_PRESERVING' | 'REDACTION';
  mask_char: string;
  preserve_length: boolean;
  tokenization_key?: string;
  applies_to: string[];
}

// ============================================================================
// Table Names
// ============================================================================

export const DATA_SECURITY_TABLE_NAMES = {
  dlpPolicies: 'gestcrp_dlp_policies',
  dlpIncidents: 'gestcrp_dlp_incidents',
  encryptionKeys: 'gestcrp_encryption_keys',
  retentionPolicies: 'gestcrp_data_retention_policies',
  maskingRules: 'gestcrp_data_masking_rules',
} as const;

// ============================================================================
// Repository Interface
// ============================================================================

export interface DataSecurityRepository {
  dlpPolicies: GestcrpCrudRepository<GestcrpDLPPolicy>;
  dlpIncidents: GestcrpCrudRepository<GestcrpDLPIncident>;
  encryptionKeys: GestcrpCrudRepository<GestcrpEncryptionKey>;
  retentionPolicies: GestcrpCrudRepository<GestcrpDataRetentionPolicy>;
  maskingRules: GestcrpCrudRepository<GestcrpDataMaskingRule>;
  findActiveDLPPolicies(schoolId: string): Promise<PaginatedResult<GestcrpDLPPolicy>>;
  findActiveEncryptionKeys(schoolId: string): Promise<PaginatedResult<GestcrpEncryptionKey>>;
  findUnreviewedIncidents(schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GestcrpDLPIncident>>;
}

// ============================================================================
// Factory
// ============================================================================

export function createDataSecurityRepository(supabase: SupabaseClient): DataSecurityRepository {
  const crud = <T extends GestcrpBaseEntity>(table: string): GestcrpCrudRepository<T> =>
    createGestcrpCrudRepository<T>(supabase, table);

  return {
    dlpPolicies: crud<GestcrpDLPPolicy>(DATA_SECURITY_TABLE_NAMES.dlpPolicies),
    dlpIncidents: crud<GestcrpDLPIncident>(DATA_SECURITY_TABLE_NAMES.dlpIncidents),
    encryptionKeys: crud<GestcrpEncryptionKey>(DATA_SECURITY_TABLE_NAMES.encryptionKeys),
    retentionPolicies: crud<GestcrpDataRetentionPolicy>(DATA_SECURITY_TABLE_NAMES.retentionPolicy),
    maskingRules: crud<GestcrpDataMaskingRule>(DATA_SECURITY_TABLE_NAMES.maskingRules),

    async findActiveDLPPolicies(schoolId: string) {
      const { data, error, count } = await supabase
        .from(DATA_SECURITY_TABLE_NAMES.dlpPolicies)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('enabled', true)
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (error) {
        throw new GestcrpDLPPolicyError(
          `Erreur lors de la récupération des politiques DLP actives: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpDLPPolicy[],
        total: count || 0,
        offset: 0,
        limit: data?.length || 0,
      };
    },

    async findActiveEncryptionKeys(schoolId: string) {
      const { data, error, count } = await supabase
        .from(DATA_SECURITY_TABLE_NAMES.encryptionKeys)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('status', 'ACTIVE')
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (error) {
        throw new GestcrpEncryptionKeyError(
          `Erreur lors de la récupération des clés actives: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpEncryptionKey[],
        total: count || 0,
        offset: 0,
        limit: data?.length || 0,
      };
    },

    async findUnreviewedIncidents(schoolId: string, params: PaginationParams = {}) {
      const { offset = 0, limit = 50 } = params;
      const safeLimit = Math.min(limit, 200);

      const { data, error, count } = await supabase
        .from(DATA_SECURITY_TABLE_NAMES.dlpIncidents)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .is('reviewed_by', null)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .range(offset, offset + safeLimit - 1);

      if (error) {
        throw new GestcrpDLPIncidentError(
          `Erreur lors de la récupération des incidents non revus: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpDLPIncident[],
        total: count || 0,
        offset,
        limit: safeLimit,
      };
    },
  };
}
