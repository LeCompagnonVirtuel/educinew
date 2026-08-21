import { SupabaseClient } from '@supabase/supabase-js';
import {
  GestcrpIAMPolicyError,
  GestcrpIAMEventError,
  GestcrpIAMSessionError,
  GestcrpCredentialRotationError,
  GestcrpBiometricError,
} from '@educi/errors';
import {
  GestcrpBaseEntity,
  GestcrpCrudRepository,
  PaginatedResult,
  PaginationParams,
  FilterParams,
  createGestcrpCrudRepository,
} from './base-gestcrp-repository';

// ============================================================================
// IAM Entity Interfaces
// ============================================================================

export interface GestcrpIAMPolicy extends GestcrpBaseEntity {
  name: string;
  description: string;
  enabled: boolean;
  effect: 'ALLOW' | 'DENY';
  subjects: string[];
  resources: string[];
  actions: string[];
  conditions: Record<string, unknown>[];
  priority: number;
}

export interface GestcrpIAMEvent extends GestcrpBaseEntity {
  user_id: string;
  event_type: string;
  auth_method: string;
  identity_provider: string;
  ip_address: string;
  user_agent: string;
  geolocation: Record<string, unknown>;
  success: boolean;
  risk_score: number;
  risk_factors: string[];
  metadata: Record<string, unknown>;
}

export interface GestcrpIAMSession extends GestcrpBaseEntity {
  user_id: string;
  token_hash: string;
  refresh_token_hash: string;
  auth_method: string;
  identity_provider: string;
  device_context: Record<string, unknown>;
  ip_address: string;
  user_agent: string;
  geolocation: Record<string, unknown>;
  risk_score: number;
  active: boolean;
  expires_at: string;
  last_activity_at: string;
}

export interface GestcrpCredentialRotation extends GestcrpBaseEntity {
  credential_type: 'PASSWORD' | 'API_KEY' | 'CERTIFICATE' | 'TOKEN' | 'ENCRYPTION_KEY';
  rotation_interval_days: number;
  max_age: number;
  alert_before_expiration_days: number;
  enforce_rotation: boolean;
  notification_channels: string[];
  enabled: boolean;
  last_rotated_at?: string;
  next_rotation_at?: string;
}

export interface GestcrpBiometricCredential extends GestcrpBaseEntity {
  user_id: string;
  type: 'FINGERPRINT' | 'FACE' | 'IRIS' | 'VOICE' | 'PALM';
  template_hash: string;
  salt: string;
  algorithm: string;
  enrolled_at: string;
  last_used_at?: string;
  enabled: boolean;
}

// ============================================================================
// Table Names
// ============================================================================

export const IAM_TABLE_NAMES = {
  policies: 'gestcrp_iam_policies',
  events: 'gestcrp_iam_events',
  sessions: 'gestcrp_iam_sessions',
  credentialRotations: 'gestcrp_credential_rotations',
  biometricCredentials: 'gestcrp_biometric_credentials',
} as const;

// ============================================================================
// Repository Interface
// ============================================================================

export interface IAMRepository {
  policies: GestcrpCrudRepository<GestcrpIAMPolicy>;
  events: GestcrpCrudRepository<GestcrpIAMEvent>;
  sessions: GestcrpCrudRepository<GestcrpIAMSession>;
  credentialRotations: GestcrpCrudRepository<GestcrpCredentialRotation>;
  biometricCredentials: GestcrpCrudRepository<GestcrpBiometricCredential>;
  findActiveSessions(userId: string, schoolId: string): Promise<PaginatedResult<GestcrpIAMSession>>;
  findByUserId(userId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GestcrpIAMEvent>>;
}

// ============================================================================
// Factory
// ============================================================================

export function createIAMRepository(supabase: SupabaseClient): IAMRepository {
  const crud = <T extends GestcrpBaseEntity>(table: string): GestcrpCrudRepository<T> =>
    createGestcrpCrudRepository<T>(supabase, table);

  return {
    policies: crud<GestcrpIAMPolicy>(IAM_TABLE_NAMES.policies),
    events: crud<GestcrpIAMEvent>(IAM_TABLE_NAMES.events),
    sessions: crud<GestcrpIAMSession>(IAM_TABLE_NAMES.sessions),
    credentialRotations: crud<GestcrpCredentialRotation>(IAM_TABLE_NAMES.credentialRotations),
    biometricCredentials: crud<GestcrpBiometricCredential>(IAM_TABLE_NAMES.biometricCredentials),

    async findActiveSessions(userId: string, schoolId: string) {
      const { data, error, count } = await supabase
        .from(IAM_TABLE_NAMES.sessions)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('user_id', userId)
        .eq('active', true)
        .is('deleted_at', null)
        .order('last_activity_at', { ascending: false });

      if (error) {
        throw new GestcrpIAMSessionError(
          `Erreur lors de la récupération des sessions actives: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpIAMSession[],
        total: count || 0,
        offset: 0,
        limit: data?.length || 0,
      };
    },

    async findByUserId(userId: string, schoolId: string, params: PaginationParams = {}) {
      const { offset = 0, limit = 50 } = params;
      const safeLimit = Math.min(limit, 200);

      const { data, error, count } = await supabase
        .from(IAM_TABLE_NAMES.events)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('user_id', userId)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .range(offset, offset + safeLimit - 1);

      if (error) {
        throw new GestcrpIAMEventError(
          `Erreur lors de la récupération des événements: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpIAMEvent[],
        total: count || 0,
        offset,
        limit: safeLimit,
      };
    },
  };
}
