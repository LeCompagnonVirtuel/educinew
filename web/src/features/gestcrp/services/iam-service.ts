import {
  GestcrpIAMPolicyError,
  GestcrpIAMEventError,
  GestcrpIAMSessionError,
  GestcrpCredentialRotationError,
  GestcrpBiometricError,
} from '@educi/errors';
import { createIAMPolicySchema, updateIAMPolicySchema } from '../validators';
import type {
  GestcrpIAMPolicy,
  GestcrpIAMEvent,
  GestcrpIAMSession,
  GestcrpCredentialRotation,
  GestcrpBiometricCredential,
  IAMRepository,
} from '../repositories/iam-repository';
import type { PaginatedResult, PaginationParams } from '../repositories/base-gestcrp-repository';
import { BaseGestcrpService, type GestcrpServiceConfig } from './base-gestcrp-service';

// ============================================================================
// IAM Service
// ============================================================================

export class IAMService extends BaseGestcrpService {
  constructor(
    private readonly iamRepo: IAMRepository,
    config?: GestcrpServiceConfig,
  ) {
    super(config);
  }

  // ─── Policies ────────────────────────────────────────────────────────────

  async listPolicies(
    schoolId: string,
    params: PaginationParams = {},
    filters: Record<string, unknown> = {},
  ): Promise<PaginatedResult<GestcrpIAMPolicy>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.iamRepo.policies.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getPolicy(schoolId: string, id: string): Promise<GestcrpIAMPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique IAM');
    return this.ensureExists(this.iamRepo.policies, id, schoolId, 'Politique IAM');
  }

  async createPolicy(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpIAMPolicy> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'description', 'effect', 'subjects', 'resources', 'actions'], 'Politique IAM');

    const VALID_EFFECTS = ['ALLOW', 'DENY'] as const;
    this.validateEnum(data.effect as string, VALID_EFFECTS, 'effect', 'Politique IAM');

    const validated = this.validateSchema(createIAMPolicySchema, data, 'Politique IAM');

    const existing = await this.iamRepo.policies.findAll(schoolId, {
      name: validated.name,
      limit: 1,
    });
    if (existing.total > 0) {
      throw new GestcrpIAMPolicyError(
        `Une politique IAM "${validated.name}" existe déjà`,
      );
    }

    return this.iamRepo.policies.create(
      {
        name: validated.name,
        description: validated.description,
        enabled: validated.enabled ?? true,
        effect: validated.effect,
        subjects: validated.subjects,
        resources: validated.resources,
        actions: validated.actions,
        conditions: validated.conditions ?? [],
        priority: validated.priority ?? 0,
      },
      schoolId,
    );
  }

  async updatePolicy(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpIAMPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique IAM');

    const existing = await this.ensureExists(
      this.iamRepo.policies,
      id,
      schoolId,
      'Politique IAM',
    );
    this.validateOwnership(existing, schoolId, 'Politique IAM');

    const validated = this.validateSchema(updateIAMPolicySchema, data, 'Politique IAM');

    return this.iamRepo.policies.update(id, schoolId, validated);
  }

  async deletePolicy(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique IAM');

    const existing = await this.ensureExists(
      this.iamRepo.policies,
      id,
      schoolId,
      'Politique IAM',
    );
    this.validateOwnership(existing, schoolId, 'Politique IAM');

    await this.iamRepo.policies.softDelete(id, schoolId);
  }

  async togglePolicy(schoolId: string, id: string, enabled: boolean): Promise<GestcrpIAMPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique IAM');

    const existing = await this.ensureExists(
      this.iamRepo.policies,
      id,
      schoolId,
      'Politique IAM',
    );
    this.validateOwnership(existing, schoolId, 'Politique IAM');

    return this.iamRepo.policies.update(id, schoolId, { enabled });
  }

  // ─── Events ──────────────────────────────────────────────────────────────

  async listEvents(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpIAMEvent>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.iamRepo.events.findAll(schoolId, pagination);
  }

  async getEvent(schoolId: string, id: string): Promise<GestcrpIAMEvent> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Événement IAM');
    return this.ensureExists(this.iamRepo.events, id, schoolId, 'Événement IAM');
  }

  async getEventsByUserId(
    schoolId: string,
    userId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpIAMEvent>> {
    this.validateSchoolId(schoolId);
    this.validateId(userId, 'Utilisateur');
    return this.iamRepo.findByUserId(userId, schoolId, params);
  }

  async createEvent(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpIAMEvent> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['user_id', 'event_type', 'auth_method', 'ip_address', 'success'],
      'Événement IAM',
    );

    return this.iamRepo.events.create(
      {
        user_id: data.user_id as string,
        event_type: data.event_type as string,
        auth_method: data.auth_method as string,
        identity_provider: data.identity_provider as string ?? '',
        ip_address: data.ip_address as string,
        user_agent: data.user_agent as string ?? '',
        geolocation: (data.geolocation as Record<string, unknown>) ?? {},
        success: data.success as boolean,
        risk_score: data.risk_score as number ?? 0,
        risk_factors: (data.risk_factors as string[]) ?? [],
        metadata: (data.metadata as Record<string, unknown>) ?? {},
      },
      schoolId,
    );
  }

  // ─── Sessions ────────────────────────────────────────────────────────────

  async listSessions(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpIAMSession>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.iamRepo.sessions.findAll(schoolId, pagination);
  }

  async getSession(schoolId: string, id: string): Promise<GestcrpIAMSession> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Session IAM');
    return this.ensureExists(this.iamRepo.sessions, id, schoolId, 'Session IAM');
  }

  async getActiveSessions(
    schoolId: string,
    userId: string,
  ): Promise<PaginatedResult<GestcrpIAMSession>> {
    this.validateSchoolId(schoolId);
    this.validateId(userId, 'Utilisateur');
    return this.iamRepo.findActiveSessions(userId, schoolId);
  }

  async createSession(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpIAMSession> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['user_id', 'token_hash', 'auth_method', 'ip_address'],
      'Session IAM',
    );

    return this.iamRepo.sessions.create(
      {
        user_id: data.user_id as string,
        token_hash: data.token_hash as string,
        refresh_token_hash: data.refresh_token_hash as string ?? '',
        auth_method: data.auth_method as string,
        identity_provider: data.identity_provider as string ?? '',
        device_context: (data.device_context as Record<string, unknown>) ?? {},
        ip_address: data.ip_address as string,
        user_agent: data.user_agent as string ?? '',
        geolocation: (data.geolocation as Record<string, unknown>) ?? {},
        risk_score: data.risk_score as number ?? 0,
        active: true,
        expires_at: data.expires_at as string,
        last_activity_at: new Date().toISOString(),
      },
      schoolId,
    );
  }

  async invalidateSession(schoolId: string, id: string): Promise<GestcrpIAMSession> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Session IAM');

    const existing = await this.ensureExists(
      this.iamRepo.sessions,
      id,
      schoolId,
      'Session IAM',
    );
    this.validateOwnership(existing, schoolId, 'Session IAM');

    return this.iamRepo.sessions.update(id, schoolId, {
      active: false,
    });
  }

  async invalidateAllUserSessions(schoolId: string, userId: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(userId, 'Utilisateur');

    const sessions = await this.iamRepo.findActiveSessions(userId, schoolId);
    for (const session of sessions.data) {
      await this.iamRepo.sessions.update(session.id, schoolId, { active: false });
    }
  }

  // ─── Credential Rotation ─────────────────────────────────────────────────

  async listCredentialRotations(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpCredentialRotation>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.iamRepo.credentialRotations.findAll(schoolId, pagination);
  }

  async getCredentialRotation(schoolId: string, id: string): Promise<GestcrpCredentialRotation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Rotation de credential');
    return this.ensureExists(
      this.iamRepo.credentialRotations,
      id,
      schoolId,
      'Rotation de credential',
    );
  }

  async createCredentialRotation(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpCredentialRotation> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['credential_type', 'rotation_interval_days', 'max_age'],
      'Rotation de credential',
    );

    const VALID_CREDENTIAL_TYPES = ['PASSWORD', 'API_KEY', 'CERTIFICATE', 'TOKEN', 'ENCRYPTION_KEY'] as const;
    this.validateEnum(
      data.credential_type as string,
      VALID_CREDENTIAL_TYPES,
      'credential_type',
      'Rotation de credential',
    );
    this.validateRange(data.rotation_interval_days as number, 1, 365, 'rotation_interval_days', 'Rotation de credential');

    const now = new Date();
    const nextRotation = new Date(now);
    nextRotation.setDate(nextRotation.getDate() + (data.rotation_interval_days as number));

    return this.iamRepo.credentialRotations.create(
      {
        credential_type: data.credential_type as GestcrpCredentialRotation['credential_type'],
        rotation_interval_days: data.rotation_interval_days as number,
        max_age: data.max_age as number,
        alert_before_expiration_days: data.alert_before_expiration_days as number ?? 30,
        enforce_rotation: data.enforce_rotation as boolean ?? true,
        notification_channels: (data.notification_channels as string[]) ?? [],
        enabled: data.enabled ?? true,
        next_rotation_at: nextRotation.toISOString(),
      },
      schoolId,
    );
  }

  async markCredentialRotated(schoolId: string, id: string): Promise<GestcrpCredentialRotation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Rotation de credential');

    const existing = await this.ensureExists(
      this.iamRepo.credentialRotations,
      id,
      schoolId,
      'Rotation de credential',
    );
    this.validateOwnership(existing, schoolId, 'Rotation de credential');

    const now = new Date();
    const nextRotation = new Date(now);
    nextRotation.setDate(nextRotation.getDate() + existing.rotation_interval_days);

    return this.iamRepo.credentialRotations.update(id, schoolId, {
      last_rotated_at: now.toISOString(),
      next_rotation_at: nextRotation.toISOString(),
    });
  }

  // ─── Biometric Credentials ──────────────────────────────────────────────

  async listBiometricCredentials(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpBiometricCredential>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.iamRepo.biometricCredentials.findAll(schoolId, pagination);
  }

  async getBiometricCredential(schoolId: string, id: string): Promise<GestcrpBiometricCredential> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Credential biométrique');
    return this.ensureExists(
      this.iamRepo.biometricCredentials,
      id,
      schoolId,
      'Credential biométrique',
    );
  }

  async enrollBiometric(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpBiometricCredential> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['user_id', 'type', 'template_hash', 'salt', 'algorithm'],
      'Credential biométrique',
    );

    const VALID_BIOMETRIC_TYPES = ['FINGERPRINT', 'FACE', 'IRIS', 'VOICE', 'PALM'] as const;
    this.validateEnum(
      data.type as string,
      VALID_BIOMETRIC_TYPES,
      'type',
      'Credential biométrique',
    );

    const existingUserCredentials = await this.iamRepo.biometricCredentials.findAll(schoolId, {
      user_id: data.user_id as string,
      limit: 100,
    });
    const sameTypeExists = existingUserCredentials.data.some(
      (c) => c.type === data.type && c.enabled,
    );
    if (sameTypeExists) {
      throw new GestcrpBiometricError(
        `Un credential biométrique de type "${data.type}" existe déjà pour cet utilisateur`,
      );
    }

    return this.iamRepo.biometricCredentials.create(
      {
        user_id: data.user_id as string,
        type: data.type as GestcrpBiometricCredential['type'],
        template_hash: data.template_hash as string,
        salt: data.salt as string,
        algorithm: data.algorithm as string,
        enrolled_at: new Date().toISOString(),
        enabled: true,
      },
      schoolId,
    );
  }

  async revokeBiometric(schoolId: string, id: string): Promise<GestcrpBiometricCredential> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Credential biométrique');

    const existing = await this.ensureExists(
      this.iamRepo.biometricCredentials,
      id,
      schoolId,
      'Credential biométrique',
    );
    this.validateOwnership(existing, schoolId, 'Credential biométrique');

    return this.iamRepo.biometricCredentials.update(id, schoolId, {
      enabled: false,
    });
  }

  // ─── Statistics ──────────────────────────────────────────────────────────

  async getSessionStats(schoolId: string): Promise<{
    totalActive: number;
    totalExpired: number;
    byAuthMethod: Record<string, number>;
    averageRiskScore: number;
  }> {
    this.validateSchoolId(schoolId);

    const all = await this.iamRepo.sessions.findAll(schoolId, { limit: 1000 });
    const now = new Date();

    const active = all.data.filter((s) => s.active && new Date(s.expires_at) > now);
    const expired = all.data.filter((s) => !s.active || new Date(s.expires_at) <= now);

    const byAuthMethod: Record<string, number> = {};
    let totalRiskScore = 0;

    for (const session of all.data) {
      byAuthMethod[session.auth_method] = (byAuthMethod[session.auth_method] ?? 0) + 1;
      totalRiskScore += session.risk_score;
    }

    return {
      totalActive: active.length,
      totalExpired: expired.length,
      byAuthMethod,
      averageRiskScore: all.total > 0 ? totalRiskScore / all.total : 0,
    };
  }

  async getEventStats(schoolId: string): Promise<{
    total: number;
    successCount: number;
    failureCount: number;
    successRate: number;
    byEventType: Record<string, number>;
  }> {
    this.validateSchoolId(schoolId);

    const all = await this.iamRepo.events.findAll(schoolId, { limit: 1000 });

    const successCount = all.data.filter((e) => e.success).length;
    const failureCount = all.total - successCount;

    const byEventType: Record<string, number> = {};
    for (const event of all.data) {
      byEventType[event.event_type] = (byEventType[event.event_type] ?? 0) + 1;
    }

    return {
      total: all.total,
      successCount,
      failureCount,
      successRate: all.total > 0 ? (successCount / all.total) * 100 : 0,
      byEventType,
    };
  }
}
