import {
  GestcrpBCPPlanError,
  GestcrpBackupPolicyError,
  GestcrpBackupJobError,
  GestcrpDRTestError,
} from '@educi/errors';
import { createBCPPlanSchema, updateBCPPlanSchema } from '../validators';
import type {
  GestcrpBCPPlan,
  GestcrpBackupPolicy,
  GestcrpBackupJob,
  GestcrpDRTestResult,
  BCPRepository,
} from '../repositories/bcp-repository';
import type { PaginatedResult, PaginationParams } from '../repositories/base-gestcrp-repository';
import { BaseGestcrpService, type GestcrpServiceConfig } from './base-gestcrp-service';

// ============================================================================
// Business Continuity & Disaster Recovery Service
// ============================================================================

export class BCPService extends BaseGestcrpService {
  constructor(
    private readonly bcpRepo: BCPRepository,
    config?: GestcrpServiceConfig,
  ) {
    super(config);
  }

  // ─── BCP Plans ───────────────────────────────────────────────────────────

  async listPlans(
    schoolId: string,
    params: PaginationParams = {},
    filters: Record<string, unknown> = {},
  ): Promise<PaginatedResult<GestcrpBCPPlan>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.bcpRepo.plans.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getPlan(schoolId: string, id: string): Promise<GestcrpBCPPlan> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Plan BCP');
    return this.ensureExists(this.bcpRepo.plans, id, schoolId, 'Plan BCP');
  }

  async getActivePlans(schoolId: string): Promise<PaginatedResult<GestcrpBCPPlan>> {
    this.validateSchoolId(schoolId);
    return this.bcpRepo.findActivePlans(schoolId);
  }

  async createPlan(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpBCPPlan> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['name', 'description', 'scope', 'objectives', 'critical_functions'],
      'Plan BCP',
    );

    const validated = this.validateSchema(createBCPPlanSchema, data, 'Plan BCP');

    const existing = await this.bcpRepo.plans.findAll(schoolId, {
      name: validated.name,
      limit: 1,
    });
    if (existing.total > 0) {
      throw new GestcrpBCPPlanError(
        `Un plan BCP "${validated.name}" existe déjà`,
      );
    }

    return this.bcpRepo.plans.create(
      {
        name: validated.name,
        description: validated.description,
        status: 'DRAFT',
        scope: validated.scope,
        objectives: validated.objectives,
        critical_functions: validated.critical_functions,
        recovery_procedures: validated.recovery_procedures ?? [],
        roles: validated.roles ?? [],
        communication_plan: validated.communication_plan ?? {},
        testing_schedule: validated.testing_schedule ?? {},
      },
      schoolId,
    );
  }

  async updatePlan(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpBCPPlan> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Plan BCP');

    const existing = await this.ensureExists(
      this.bcpRepo.plans,
      id,
      schoolId,
      'Plan BCP',
    );
    this.validateOwnership(existing, schoolId, 'Plan BCP');

    const validated = this.validateSchema(updateBCPPlanSchema, data, 'Plan BCP');

    return this.bcpRepo.plans.update(id, schoolId, validated);
  }

  async activatePlan(schoolId: string, id: string): Promise<GestcrpBCPPlan> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Plan BCP');

    const existing = await this.ensureExists(
      this.bcpRepo.plans,
      id,
      schoolId,
      'Plan BCP',
    );
    this.validateOwnership(existing, schoolId, 'Plan BCP');

    if (!['DRAFT', 'TESTING'].includes(existing.status)) {
      throw new GestcrpBCPPlanError(
        `Le plan ne peut pas être activé depuis le statut "${existing.status}"`,
      );
    }

    return this.bcpRepo.plans.update(id, schoolId, {
      status: 'ACTIVE',
      last_review_at: new Date().toISOString(),
    });
  }

  async archivePlan(schoolId: string, id: string): Promise<GestcrpBCPPlan> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Plan BCP');

    const existing = await this.ensureExists(
      this.bcpRepo.plans,
      id,
      schoolId,
      'Plan BCP',
    );
    this.validateOwnership(existing, schoolId, 'Plan BCP');

    return this.bcpRepo.plans.update(id, schoolId, {
      status: 'ARCHIVED',
    });
  }

  async deletePlan(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Plan BCP');

    const existing = await this.ensureExists(
      this.bcpRepo.plans,
      id,
      schoolId,
      'Plan BCP',
    );
    this.validateOwnership(existing, schoolId, 'Plan BCP');

    await this.bcpRepo.plans.softDelete(id, schoolId);
  }

  // ─── Backup Policies ────────────────────────────────────────────────────

  async listBackupPolicies(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpBackupPolicy>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.bcpRepo.backupPolicies.findAll(schoolId, pagination);
  }

  async getBackupPolicy(schoolId: string, id: string): Promise<GestcrpBackupPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique de backup');
    return this.ensureExists(
      this.bcpRepo.backupPolicies,
      id,
      schoolId,
      'Politique de backup',
    );
  }

  async createBackupPolicy(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpBackupPolicy> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['name', 'description', 'backup_type', 'schedule', 'retention_days', 'target_location', 'sources'],
      'Politique de backup',
    );

    const VALID_BACKUP_TYPES = ['FULL', 'INCREMENTAL', 'DIFFERENTIAL'] as const;
    this.validateEnum(data.backup_type as string, VALID_BACKUP_TYPES, 'backup_type', 'Politique de backup');

    const VALID_TARGETS = ['PRIMARY', 'SECONDARY', 'CLOUD', 'OFFSITE'] as const;
    this.validateEnum(data.target_location as string, VALID_TARGETS, 'target_location', 'Politique de backup');
    this.validateRange(data.retention_days as number, 1, 3650, 'retention_days', 'Politique de backup');

    const existing = await this.bcpRepo.backupPolicies.findAll(schoolId, {
      name: data.name as string,
      limit: 1,
    });
    if (existing.total > 0) {
      throw new GestcrpBackupPolicyError(
        `Une politique de backup "${data.name}" existe déjà`,
      );
    }

    return this.bcpRepo.backupPolicies.create(
      {
        name: data.name as string,
        description: data.description as string,
        enabled: data.enabled ?? true,
        backup_type: data.backup_type as GestcrpBackupPolicy['backup_type'],
        schedule: data.schedule as string,
        retention_days: data.retention_days as number,
        encryption_enabled: data.encryption_enabled as boolean ?? true,
        compression_enabled: data.compression_enabled as boolean ?? true,
        target_location: data.target_location as GestcrpBackupPolicy['target_location'],
        sources: data.sources as string[],
        verify_after_backup: data.verify_after_backup as boolean ?? true,
        last_backup_status: 'SUCCESS',
      },
      schoolId,
    );
  }

  async updateBackupPolicy(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpBackupPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique de backup');

    const existing = await this.ensureExists(
      this.bcpRepo.backupPolicies,
      id,
      schoolId,
      'Politique de backup',
    );
    this.validateOwnership(existing, schoolId, 'Politique de backup');

    return this.bcpRepo.backupPolicies.update(id, schoolId, data);
  }

  async toggleBackupPolicy(schoolId: string, id: string, enabled: boolean): Promise<GestcrpBackupPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique de backup');

    const existing = await this.ensureExists(
      this.bcpRepo.backupPolicies,
      id,
      schoolId,
      'Politique de backup',
    );
    this.validateOwnership(existing, schoolId, 'Politique de backup');

    return this.bcpRepo.backupPolicies.update(id, schoolId, { enabled });
  }

  async deleteBackupPolicy(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique de backup');

    const existing = await this.ensureExists(
      this.bcpRepo.backupPolicies,
      id,
      schoolId,
      'Politique de backup',
    );
    this.validateOwnership(existing, schoolId, 'Politique de backup');

    await this.bcpRepo.backupPolicies.softDelete(id, schoolId);
  }

  // ─── Backup Jobs ─────────────────────────────────────────────────────────

  async listBackupJobs(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpBackupJob>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.bcpRepo.backupJobs.findAll(schoolId, pagination);
  }

  async getBackupJob(schoolId: string, id: string): Promise<GestcrpBackupJob> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Job de backup');
    return this.ensureExists(this.bcpRepo.backupJobs, id, schoolId, 'Job de backup');
  }

  async getRecentBackupJobs(
    schoolId: string,
    policyId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpBackupJob>> {
    this.validateSchoolId(schoolId);
    this.validateId(policyId, 'Politique');

    const policyExists = await this.bcpRepo.backupPolicies.exists(policyId, schoolId);
    if (!policyExists) {
      throw new GestcrpBackupPolicyError(
        `Politique de backup (${policyId}) introuvable`,
      );
    }

    return this.bcpRepo.findRecentBackupJobs(policyId, schoolId, params);
  }

  async getFailedBackupJobs(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpBackupJob>> {
    this.validateSchoolId(schoolId);
    return this.bcpRepo.findFailedBackupJobs(schoolId, params);
  }

  async startBackupJob(
    schoolId: string,
    policyId: string,
  ): Promise<GestcrpBackupJob> {
    this.validateSchoolId(schoolId);
    this.validateId(policyId, 'Politique');

    const policyExists = await this.bcpRepo.backupPolicies.exists(policyId, schoolId);
    if (!policyExists) {
      throw new GestcrpBackupPolicyError(
        `Politique de backup (${policyId}) introuvable`,
      );
    }

    return this.bcpRepo.backupJobs.create(
      {
        policy_id: policyId,
        status: 'RUNNING',
        started_at: new Date().toISOString(),
        total_size: 0,
        compressed_size: 0,
        files_count: 0,
        encrypted: true,
        verified: false,
      },
      schoolId,
    );
  }

  async completeBackupJob(
    schoolId: string,
    id: string,
    data: {
      total_size: number;
      compressed_size: number;
      files_count: number;
      verified: boolean;
    },
  ): Promise<GestcrpBackupJob> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Job de backup');

    const existing = await this.ensureExists(
      this.bcpRepo.backupJobs,
      id,
      schoolId,
      'Job de backup',
    );
    this.validateOwnership(existing, schoolId, 'Job de backup');

    const now = new Date().toISOString();
    const startedAt = new Date(existing.started_at).getTime();
    const duration = Math.round((Date.now() - startedAt) / 1000);

    return this.bcpRepo.backupJobs.update(id, schoolId, {
      status: 'COMPLETED',
      completed_at: now,
      duration,
      total_size: data.total_size,
      compressed_size: data.compressed_size,
      files_count: data.files_count,
      verified: data.verified,
    });
  }

  async failBackupJob(
    schoolId: string,
    id: string,
    error: string,
  ): Promise<GestcrpBackupJob> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Job de backup');

    const existing = await this.ensureExists(
      this.bcpRepo.backupJobs,
      id,
      schoolId,
      'Job de backup',
    );
    this.validateOwnership(existing, schoolId, 'Job de backup');

    const now = new Date().toISOString();
    const startedAt = new Date(existing.started_at).getTime();
    const duration = Math.round((Date.now() - startedAt) / 1000);

    return this.bcpRepo.backupJobs.update(id, schoolId, {
      status: 'FAILED',
      completed_at: now,
      duration,
      error,
    });
  }

  // ─── DR Test Results ─────────────────────────────────────────────────────

  async listDRTestResults(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpDRTestResult>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.bcpRepo.drTestResults.findAll(schoolId, pagination);
  }

  async getDRTestResult(schoolId: string, id: string): Promise<GestcrpDRTestResult> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Résultat test DR');
    return this.ensureExists(this.bcpRepo.drTestResults, id, schoolId, 'Résultat test DR');
  }

  async createDRTestResult(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpDRTestResult> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['plan_id', 'procedure_id', 'duration', 'success'],
      'Résultat test DR',
    );

    const planExists = await this.bcpRepo.plans.exists(
      data.plan_id as string,
      schoolId,
    );
    if (!planExists) {
      throw new GestcrpBCPPlanError(
        `Plan BCP (${data.plan_id}) introuvable`,
      );
    }

    const result = await this.bcpRepo.drTestResults.create(
      {
        plan_id: data.plan_id as string,
        procedure_id: data.procedure_id as string,
        test_date: data.test_date as string ?? new Date().toISOString(),
        duration: data.duration as number,
        success: data.success as boolean,
        issues: (data.issues as string[]) ?? [],
        improvements: (data.improvements as string[]) ?? [],
        participant_feedback: (data.participant_feedback as string[]) ?? [],
        next_steps: (data.next_steps as string[]) ?? [],
      },
      schoolId,
    );

    await this.bcpRepo.plans.update(data.plan_id as string, schoolId, {
      last_tested_at: new Date().toISOString(),
    });

    return result;
  }

  // ─── Statistics ──────────────────────────────────────────────────────────

  async getBCPStats(schoolId: string): Promise<{
    totalPlans: number;
    activePlans: number;
    totalBackupPolicies: number;
    activeBackupPolicies: number;
    totalBackupJobs: number;
    failedBackupJobs: number;
    lastDRTestSuccess: boolean | null;
  }> {
    this.validateSchoolId(schoolId);

    const plans = await this.bcpRepo.plans.findAll(schoolId, { limit: 1000 });
    const policies = await this.bcpRepo.backupPolicies.findAll(schoolId, { limit: 1000 });
    const jobs = await this.bcpRepo.backupJobs.findAll(schoolId, { limit: 1000 });
    const drTests = await this.bcpRepo.drTestResults.findAll(schoolId, {
      limit: 1,
      offset: 0,
    });

    return {
      totalPlans: plans.total,
      activePlans: plans.data.filter((p) => p.status === 'ACTIVE').length,
      totalBackupPolicies: policies.total,
      activeBackupPolicies: policies.data.filter((p) => p.enabled).length,
      totalBackupJobs: jobs.total,
      failedBackupJobs: jobs.data.filter((j) => j.status === 'FAILED').length,
      lastDRTestSuccess: drTests.data.length > 0 ? drTests.data[0].success : null,
    };
  }
}
