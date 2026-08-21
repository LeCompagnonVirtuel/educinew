import {
  GestcrpSOARPlaybookError,
  GestcrpSOARExecutionError,
} from '@educi/errors';
import { createSOARPlaybookSchema, updateSOARPlaybookSchema } from '../validators';
import type {
  GestcrpSOARPlaybook,
  GestcrpSOARExecution,
  SOARRepository,
} from '../repositories/soar-repository';
import type { PaginatedResult, PaginationParams } from '../repositories/base-gestcrp-repository';
import { BaseGestcrpService, type GestcrpServiceConfig } from './base-gestcrp-service';

// ============================================================================
// Security Automation (SOAR) Service
// ============================================================================

export class SOARService extends BaseGestcrpService {
  constructor(
    private readonly soarRepo: SOARRepository,
    config?: GestcrpServiceConfig,
  ) {
    super(config);
  }

  // ─── Playbooks ───────────────────────────────────────────────────────────

  async listPlaybooks(
    schoolId: string,
    params: PaginationParams = {},
    filters: Record<string, unknown> = {},
  ): Promise<PaginatedResult<GestcrpSOARPlaybook>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.soarRepo.playbooks.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getPlaybook(schoolId: string, id: string): Promise<GestcrpSOARPlaybook> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Playbook SOAR');
    return this.ensureExists(this.soarRepo.playbooks, id, schoolId, 'Playbook SOAR');
  }

  async getActivePlaybooks(schoolId: string): Promise<PaginatedResult<GestcrpSOARPlaybook>> {
    this.validateSchoolId(schoolId);
    return this.soarRepo.findActivePlaybooks(schoolId);
  }

  async createPlaybook(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpSOARPlaybook> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['name', 'description', 'trigger', 'conditions', 'steps'],
      'Playbook SOAR',
    );

    const validated = this.validateSchema(createSOARPlaybookSchema, data, 'Playbook SOAR');

    const existing = await this.soarRepo.playbooks.findAll(schoolId, {
      name: validated.name,
      limit: 1,
    });
    if (existing.total > 0) {
      throw new GestcrpSOARPlaybookError(
        `Un playbook SOAR "${validated.name}" existe déjà`,
      );
    }

    return this.soarRepo.playbooks.create(
      {
        name: validated.name,
        description: validated.description,
        enabled: validated.enabled ?? true,
        trigger: validated.trigger,
        conditions: validated.conditions,
        steps: validated.steps,
        on_success: validated.on_success ?? [],
        on_failure: validated.on_failure ?? [],
        execution_count: 0,
        average_execution_time: 0,
      },
      schoolId,
    );
  }

  async updatePlaybook(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpSOARPlaybook> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Playbook SOAR');

    const existing = await this.ensureExists(
      this.soarRepo.playbooks,
      id,
      schoolId,
      'Playbook SOAR',
    );
    this.validateOwnership(existing, schoolId, 'Playbook SOAR');

    const validated = this.validateSchema(updateSOARPlaybookSchema, data, 'Playbook SOAR');

    return this.soarRepo.playbooks.update(id, schoolId, validated);
  }

  async deletePlaybook(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Playbook SOAR');

    const existing = await this.ensureExists(
      this.soarRepo.playbooks,
      id,
      schoolId,
      'Playbook SOAR',
    );
    this.validateOwnership(existing, schoolId, 'Playbook SOAR');

    await this.soarRepo.playbooks.softDelete(id, schoolId);
  }

  async togglePlaybook(schoolId: string, id: string, enabled: boolean): Promise<GestcrpSOARPlaybook> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Playbook SOAR');

    const existing = await this.ensureExists(
      this.soarRepo.playbooks,
      id,
      schoolId,
      'Playbook SOAR',
    );
    this.validateOwnership(existing, schoolId, 'Playbook SOAR');

    return this.soarRepo.playbooks.update(id, schoolId, { enabled });
  }

  // ─── Executions ──────────────────────────────────────────────────────────

  async listExecutions(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpSOARExecution>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.soarRepo.executions.findAll(schoolId, pagination);
  }

  async getExecution(schoolId: string, id: string): Promise<GestcrpSOARExecution> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Exécution SOAR');
    return this.ensureExists(this.soarRepo.executions, id, schoolId, 'Exécution SOAR');
  }

  async getRecentExecutions(
    schoolId: string,
    playbookId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpSOARExecution>> {
    this.validateSchoolId(schoolId);
    this.validateId(playbookId, 'Playbook');
    return this.soarRepo.findRecentExecutions(playbookId, schoolId, params);
  }

  async getFailedExecutions(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpSOARExecution>> {
    this.validateSchoolId(schoolId);
    return this.soarRepo.findFailedExecutions(schoolId, params);
  }

  async executePlaybook(
    schoolId: string,
    playbookId: string,
    trigger: string,
    triggeredBy: string,
    initialData: Record<string, unknown> = {},
  ): Promise<GestcrpSOARExecution> {
    this.validateSchoolId(schoolId);
    this.validateId(playbookId, 'Playbook');
    this.validateId(triggeredBy, 'Déclencheur');

    const playbook = await this.ensureExists(
      this.soarRepo.playbooks,
      playbookId,
      schoolId,
      'Playbook SOAR',
    );
    this.validateOwnership(playbook, schoolId, 'Playbook SOAR');

    if (!playbook.enabled) {
      throw new GestcrpSOARPlaybookError(
        `Le playbook "${playbook.name}" est désactivé`,
      );
    }

    const execution = await this.soarRepo.executions.create(
      {
        playbook_id: playbookId,
        trigger,
        triggered_by: triggeredBy,
        status: 'RUNNING',
        steps: playbook.steps.map((step, index) => ({
          ...step,
          index,
          status: 'PENDING',
          started_at: null,
          completed_at: null,
        })),
        started_at: new Date().toISOString(),
        result: initialData,
      },
      schoolId,
    );

    await this.soarRepo.playbooks.update(playbookId, schoolId, {
      execution_count: playbook.execution_count + 1,
      last_executed_at: new Date().toISOString(),
    });

    return execution;
  }

  async completeExecution(
    schoolId: string,
    id: string,
    result: Record<string, unknown>,
  ): Promise<GestcrpSOARExecution> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Exécution SOAR');

    const existing = await this.ensureExists(
      this.soarRepo.executions,
      id,
      schoolId,
      'Exécution SOAR',
    );
    this.validateOwnership(existing, schoolId, 'Exécution SOAR');

    if (existing.status !== 'RUNNING') {
      throw new GestcrpSOARExecutionError(
        `L'exécution ne peut pas être terminée depuis le statut "${existing.status}"`,
      );
    }

    const now = new Date().toISOString();
    const startedAt = new Date(existing.started_at).getTime();
    const duration = Math.round((Date.now() - startedAt) / 1000);

    const execution = await this.soarRepo.executions.update(id, schoolId, {
      status: 'COMPLETED',
      completed_at: now,
      duration,
      result,
    });

    await this.updatePlaybookStats(schoolId, existing.playbook_id, duration);

    return execution;
  }

  async failExecution(
    schoolId: string,
    id: string,
    error: string,
  ): Promise<GestcrpSOARExecution> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Exécution SOAR');

    const existing = await this.ensureExists(
      this.soarRepo.executions,
      id,
      schoolId,
      'Exécution SOAR',
    );
    this.validateOwnership(existing, schoolId, 'Exécution SOAR');

    if (existing.status !== 'RUNNING') {
      throw new GestcrpSOARExecutionError(
        `L'exécution ne peut pas échouer depuis le statut "${existing.status}"`,
      );
    }

    const now = new Date().toISOString();
    const startedAt = new Date(existing.started_at).getTime();
    const duration = Math.round((Date.now() - startedAt) / 1000);

    return this.soarRepo.executions.update(id, schoolId, {
      status: 'FAILED',
      completed_at: now,
      duration,
      error,
    });
  }

  async cancelExecution(schoolId: string, id: string): Promise<GestcrpSOARExecution> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Exécution SOAR');

    const existing = await this.ensureExists(
      this.soarRepo.executions,
      id,
      schoolId,
      'Exécution SOAR',
    );
    this.validateOwnership(existing, schoolId, 'Exécution SOAR');

    if (existing.status !== 'RUNNING') {
      throw new GestcrpSOARExecutionError(
        `L'exécution ne peut pas être annulée depuis le statut "${existing.status}"`,
      );
    }

    const now = new Date().toISOString();
    const startedAt = new Date(existing.started_at).getTime();
    const duration = Math.round((Date.now() - startedAt) / 1000);

    return this.soarRepo.executions.update(id, schoolId, {
      status: 'CANCELLED',
      completed_at: now,
      duration,
    });
  }

  async pauseExecution(schoolId: string, id: string): Promise<GestcrpSOARExecution> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Exécution SOAR');

    const existing = await this.ensureExists(
      this.soarRepo.executions,
      id,
      schoolId,
      'Exécution SOAR',
    );
    this.validateOwnership(existing, schoolId, 'Exécution SOAR');

    if (existing.status !== 'RUNNING') {
      throw new GestcrpSOARExecutionError(
        `L'exécution ne peut pas être mise en pause depuis le statut "${existing.status}"`,
      );
    }

    return this.soarRepo.executions.update(id, schoolId, {
      status: 'PAUSED',
    });
  }

  async resumeExecution(schoolId: string, id: string): Promise<GestcrpSOARExecution> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Exécution SOAR');

    const existing = await this.ensureExists(
      this.soarRepo.executions,
      id,
      schoolId,
      'Exécution SOAR',
    );
    this.validateOwnership(existing, schoolId, 'Exécution SOAR');

    if (existing.status !== 'PAUSED') {
      throw new GestcrpSOARExecutionError(
        `L'exécution ne peut pas être reprise depuis le statut "${existing.status}"`,
      );
    }

    return this.soarRepo.executions.update(id, schoolId, {
      status: 'RUNNING',
    });
  }

  // ─── Statistics ──────────────────────────────────────────────────────────

  async getPlaybookStats(schoolId: string): Promise<{
    total: number;
    active: number;
    totalExecutions: number;
    averageExecutionTime: number;
    topPlaybooks: Array<{ id: string; name: string; executionCount: number }>;
  }> {
    this.validateSchoolId(schoolId);

    const all = await this.soarRepo.playbooks.findAll(schoolId, { limit: 1000 });

    const active = all.data.filter((p) => p.enabled);
    const totalExecutions = all.data.reduce((sum, p) => sum + p.execution_count, 0);
    const averageExecutionTime = all.total > 0
      ? all.data.reduce((sum, p) => sum + p.average_execution_time, 0) / all.total
      : 0;

    const topPlaybooks = all.data
      .sort((a, b) => b.execution_count - a.execution_count)
      .slice(0, 10)
      .map((p) => ({
        id: p.id,
        name: p.name,
        executionCount: p.execution_count,
      }));

    return {
      total: all.total,
      active: active.length,
      totalExecutions,
      averageExecutionTime,
      topPlaybooks,
    };
  }

  async getExecutionStats(schoolId: string): Promise<{
    total: number;
    running: number;
    completed: number;
    failed: number;
    cancelled: number;
    averageDuration: number;
  }> {
    this.validateSchoolId(schoolId);

    const all = await this.soarRepo.executions.findAll(schoolId, { limit: 1000 });

    let totalDuration = 0;
    let durationCount = 0;

    for (const exec of all.data) {
      if (exec.duration) {
        totalDuration += exec.duration;
        durationCount++;
      }
    }

    return {
      total: all.total,
      running: all.data.filter((e) => e.status === 'RUNNING').length,
      completed: all.data.filter((e) => e.status === 'COMPLETED').length,
      failed: all.data.filter((e) => e.status === 'FAILED').length,
      cancelled: all.data.filter((e) => e.status === 'CANCELLED').length,
      averageDuration: durationCount > 0 ? totalDuration / durationCount : 0,
    };
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────

  private async updatePlaybookStats(
    schoolId: string,
    playbookId: string,
    executionDuration: number,
  ): Promise<void> {
    const playbook = await this.soarRepo.playbooks.findById(playbookId, schoolId);
    if (!playbook) return;

    const newCount = playbook.execution_count + 1;
    const newAvg =
      (playbook.average_execution_time * playbook.execution_count + executionDuration) / newCount;

    await this.soarRepo.playbooks.update(playbookId, schoolId, {
      execution_count: newCount,
      average_execution_time: Math.round(newAvg),
    });
  }
}
