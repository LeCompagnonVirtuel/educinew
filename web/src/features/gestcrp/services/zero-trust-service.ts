import { GestcrpZeroTrustPolicyError } from '@educi/errors';
import { createZeroTrustPolicySchema, updateZeroTrustPolicySchema } from '../validators';
import type {
  GestcrpZeroTrustPolicy,
  GestcrpZeroTrustAssessment,
  GestcrpZeroTrustEvaluation,
  GestcrpZeroTrustZone,
  GestcrpZeroTrustContext,
  ZeroTrustRepository,
} from '../repositories/zero-trust-repository';
import type { PaginatedResult, PaginationParams } from '../repositories/base-gestcrp-repository';
import { BaseGestcrpService, type GestcrpServiceConfig } from './base-gestcrp-service';

// ============================================================================
// Zero Trust Service
// ============================================================================

export class ZeroTrustService extends BaseGestcrpService {
  constructor(
    private readonly zeroTrustRepo: ZeroTrustRepository,
    config?: GestcrpServiceConfig,
  ) {
    super(config);
  }

  // ─── Policies ────────────────────────────────────────────────────────────

  async listPolicies(
    schoolId: string,
    params: PaginationParams = {},
    filters: Record<string, unknown> = {},
  ): Promise<PaginatedResult<GestcrpZeroTrustPolicy>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.zeroTrustRepo.policies.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getPolicy(schoolId: string, id: string): Promise<GestcrpZeroTrustPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique Zero Trust');
    return this.ensureExists(this.zeroTrustRepo.policies, id, schoolId, 'Politique Zero Trust');
  }

  async getActivePolicies(schoolId: string): Promise<PaginatedResult<GestcrpZeroTrustPolicy>> {
    this.validateSchoolId(schoolId);
    return this.zeroTrustRepo.findActivePolicies(schoolId);
  }

  async createPolicy(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpZeroTrustPolicy> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'description', 'enforcement_mode'], 'Politique Zero Trust');

    const validated = this.validateSchema(createZeroTrustPolicySchema, data, 'Politique Zero Trust');

    const existing = await this.zeroTrustRepo.policies.findAll(schoolId, {
      name: validated.name,
      limit: 1,
    });
    if (existing.total > 0) {
      throw new GestcrpZeroTrustPolicyError(
        `Une politique Zero Trust "${validated.name}" existe déjà`,
      );
    }

    return this.zeroTrustRepo.policies.create(
      {
        name: validated.name,
        description: validated.description,
        enabled: validated.enabled ?? true,
        priority: validated.priority ?? 0,
        zones: validated.zones ?? [],
        conditions: validated.conditions ?? [],
        actions: validated.actions ?? [],
        enforcement_mode: validated.enforcement_mode,
      },
      schoolId,
    );
  }

  async updatePolicy(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpZeroTrustPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique Zero Trust');

    const existing = await this.ensureExists(
      this.zeroTrustRepo.policies,
      id,
      schoolId,
      'Politique Zero Trust',
    );
    this.validateOwnership(existing, schoolId, 'Politique Zero Trust');

    const validated = this.validateSchema(updateZeroTrustPolicySchema, data, 'Politique Zero Trust');

    return this.zeroTrustRepo.policies.update(id, schoolId, validated);
  }

  async deletePolicy(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique Zero Trust');

    const existing = await this.ensureExists(
      this.zeroTrustRepo.policies,
      id,
      schoolId,
      'Politique Zero Trust',
    );
    this.validateOwnership(existing, schoolId, 'Politique Zero Trust');

    await this.zeroTrustRepo.policies.softDelete(id, schoolId);
  }

  async togglePolicy(schoolId: string, id: string, enabled: boolean): Promise<GestcrpZeroTrustPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique Zero Trust');

    const existing = await this.ensureExists(
      this.zeroTrustRepo.policies,
      id,
      schoolId,
      'Politique Zero Trust',
    );
    this.validateOwnership(existing, schoolId, 'Politique Zero Trust');

    return this.zeroTrustRepo.policies.update(id, schoolId, { enabled });
  }

  // ─── Assessments ─────────────────────────────────────────────────────────

  async listAssessments(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpZeroTrustAssessment>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.zeroTrustRepo.assessments.findAll(schoolId, pagination);
  }

  async getAssessment(schoolId: string, id: string): Promise<GestcrpZeroTrustAssessment> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Évaluation Zero Trust');
    return this.ensureExists(
      this.zeroTrustRepo.assessments,
      id,
      schoolId,
      'Évaluation Zero Trust',
    );
  }

  async getAssessmentsBySubject(
    schoolId: string,
    subjectId: string,
  ): Promise<PaginatedResult<GestcrpZeroTrustAssessment>> {
    this.validateSchoolId(schoolId);
    this.validateId(subjectId, 'Sujet');
    return this.zeroTrustRepo.findBySubjectId(subjectId, schoolId);
  }

  async createAssessment(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpZeroTrustAssessment> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['subject_type', 'subject_id', 'decision', 'confidence', 'risk_score'],
      'Évaluation Zero Trust',
    );

    const VALID_SUBJECT_TYPES = ['USER', 'DEVICE', 'SERVICE', 'DATA'] as const;
    this.validateEnum(
      data.subject_type as string,
      VALID_SUBJECT_TYPES,
      'subject_type',
      'Évaluation Zero Trust',
    );
    this.validateRange(data.confidence as number, 0, 100, 'confidence', 'Évaluation Zero Trust');
    this.validateRange(data.risk_score as number, 0, 100, 'risk_score', 'Évaluation Zero Trust');

    return this.zeroTrustRepo.assessments.create(
      {
        subject_type: data.subject_type as 'USER' | 'DEVICE' | 'SERVICE' | 'DATA',
        subject_id: data.subject_id as string,
        decision: data.decision as string,
        confidence: data.confidence as number,
        risk_score: data.risk_score as number,
        risk_factors: (data.risk_factors as string[]) ?? [],
        policies_evaluated: (data.policies_evaluated as string[]) ?? [],
        enforcement_actions: (data.enforcement_actions as string[]) ?? [],
        expires_at: data.expires_at as string,
      },
      schoolId,
    );
  }

  // ─── Evaluations ─────────────────────────────────────────────────────────

  async listEvaluations(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpZeroTrustEvaluation>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.zeroTrustRepo.evaluations.findAll(schoolId, pagination);
  }

  async getEvaluation(schoolId: string, id: string): Promise<GestcrpZeroTrustEvaluation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Évaluation Zero Trust');
    return this.ensureExists(
      this.zeroTrustRepo.evaluations,
      id,
      schoolId,
      'Évaluation Zero Trust',
    );
  }

  async createEvaluation(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpZeroTrustEvaluation> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['policy_id', 'subject_type', 'subject_id', 'result', 'score'],
      'Évaluation Zero Trust',
    );
    this.validateRange(data.score as number, 0, 100, 'score', 'Évaluation Zero Trust');

    const policyExists = await this.zeroTrustRepo.policies.exists(
      data.policy_id as string,
      schoolId,
    );
    if (!policyExists) {
      throw new GestcrpZeroTrustPolicyError(
        `Politique Zero Trust (${data.policy_id}) introuvable`,
      );
    }

    return this.zeroTrustRepo.evaluations.create(
      {
        policy_id: data.policy_id as string,
        subject_type: data.subject_type as string,
        subject_id: data.subject_id as string,
        result: data.result as string,
        score: data.score as number,
        factors: (data.factors as Record<string, unknown>) ?? {},
        evaluated_at: data.evaluated_at as string ?? new Date().toISOString(),
      },
      schoolId,
    );
  }

  // ─── Zones ───────────────────────────────────────────────────────────────

  async listZones(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpZeroTrustZone>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.zeroTrustRepo.zones.findAll(schoolId, pagination);
  }

  async getZone(schoolId: string, id: string): Promise<GestcrpZeroTrustZone> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Zone Zero Trust');
    return this.ensureExists(this.zeroTrustRepo.zones, id, schoolId, 'Zone Zero Trust');
  }

  async createZone(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpZeroTrustZone> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'description', 'level'], 'Zone Zero Trust');
    this.validateRange(data.level as number, 1, 10, 'level', 'Zone Zero Trust');

    const existing = await this.zeroTrustRepo.zones.findAll(schoolId, {
      name: data.name as string,
      limit: 1,
    });
    if (existing.total > 0) {
      throw new GestcrpZeroTrustPolicyError(
        `Une zone Zero Trust "${data.name}" existe déjà`,
      );
    }

    return this.zeroTrustRepo.zones.create(
      {
        name: data.name as string,
        description: data.description as string,
        level: data.level as number,
        policies: (data.policies as string[]) ?? [],
        enabled: data.enabled ?? true,
      },
      schoolId,
    );
  }

  async deleteZone(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Zone Zero Trust');

    const existing = await this.ensureExists(
      this.zeroTrustRepo.zones,
      id,
      schoolId,
      'Zone Zero Trust',
    );
    this.validateOwnership(existing, schoolId, 'Zone Zero Trust');

    await this.zeroTrustRepo.zones.softDelete(id, schoolId);
  }

  // ─── Contexts ────────────────────────────────────────────────────────────

  async listContexts(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpZeroTrustContext>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.zeroTrustRepo.contexts.findAll(schoolId, pagination);
  }

  async getContext(schoolId: string, id: string): Promise<GestcrpZeroTrustContext> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Contexte Zero Trust');
    return this.ensureExists(
      this.zeroTrustRepo.contexts,
      id,
      schoolId,
      'Contexte Zero Trust',
    );
  }

  async createContext(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpZeroTrustContext> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['user_id', 'device_id', 'session_id', 'ip_address'],
      'Contexte Zero Trust',
    );

    return this.zeroTrustRepo.contexts.create(
      {
        user_id: data.user_id as string,
        device_id: data.device_id as string,
        session_id: data.session_id as string,
        ip_address: data.ip_address as string,
        user_agent: data.user_agent as string ?? '',
        geolocation: (data.geolocation as Record<string, unknown>) ?? {},
        risk_score: data.risk_score as number ?? 0,
        verification_level: data.verification_level as string ?? 'NONE',
        trust_level: data.trust_level as string ?? 'UNKNOWN',
        last_verified_at: data.last_verified_at as string ?? new Date().toISOString(),
      },
      schoolId,
    );
  }

  async updateContextTrust(
    schoolId: string,
    id: string,
    trustLevel: string,
    verificationLevel: string,
  ): Promise<GestcrpZeroTrustContext> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Contexte Zero Trust');

    const existing = await this.ensureExists(
      this.zeroTrustRepo.contexts,
      id,
      schoolId,
      'Contexte Zero Trust',
    );
    this.validateOwnership(existing, schoolId, 'Contexte Zero Trust');

    return this.zeroTrustRepo.contexts.update(id, schoolId, {
      trust_level: trustLevel,
      verification_level: verificationLevel,
      last_verified_at: new Date().toISOString(),
    });
  }

  // ─── Statistics ──────────────────────────────────────────────────────────

  async getPolicyStats(schoolId: string): Promise<{
    total: number;
    active: number;
    inactive: number;
    byEnforcementMode: Record<string, number>;
  }> {
    this.validateSchoolId(schoolId);

    const all = await this.zeroTrustRepo.policies.findAll(schoolId, { limit: 1000 });
    const active = all.data.filter((p) => p.enabled);

    const byEnforcementMode: Record<string, number> = {};
    for (const policy of all.data) {
      byEnforcementMode[policy.enforcement_mode] =
        (byEnforcementMode[policy.enforcement_mode] ?? 0) + 1;
    }

    return {
      total: all.total,
      active: active.length,
      inactive: all.total - active.length,
      byEnforcementMode,
    };
  }

  async getAssessmentStats(schoolId: string): Promise<{
    total: number;
    byDecision: Record<string, number>;
    averageRiskScore: number;
    averageConfidence: number;
  }> {
    this.validateSchoolId(schoolId);

    const all = await this.zeroTrustRepo.assessments.findAll(schoolId, { limit: 1000 });

    const byDecision: Record<string, number> = {};
    let totalRiskScore = 0;
    let totalConfidence = 0;

    for (const assessment of all.data) {
      byDecision[assessment.decision] = (byDecision[assessment.decision] ?? 0) + 1;
      totalRiskScore += assessment.risk_score;
      totalConfidence += assessment.confidence;
    }

    return {
      total: all.total,
      byDecision,
      averageRiskScore: all.total > 0 ? totalRiskScore / all.total : 0,
      averageConfidence: all.total > 0 ? totalConfidence / all.total : 0,
    };
  }
}
