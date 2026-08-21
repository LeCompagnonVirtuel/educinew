import {
  ValidationError,
  NotFoundError,
} from '@educi/errors';
import {
  createAgentTaskSchema,
  updateAgentTaskSchema,
} from '../validators/gedkin';
import type {
  GedkinAgentTask,
} from '@educi/types';
import type {
  GedkinAgentTaskRepository,
} from '../repositories/agent-task-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';
import { BaseGedkinService, type GedkinServiceConfig } from './base-gedkin-service';

// ============================================================================
// Agent Task Service
// ============================================================================

export class AgentTaskService extends BaseGedkinService {
  constructor(
    private readonly taskRepo: GedkinAgentTaskRepository,
    config?: GedkinServiceConfig,
  ) {
    super(config);
  }

  async listTasks(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinAgentTask>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.taskRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getTask(schoolId: string, id: string): Promise<GedkinAgentTask> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Tâche agent');
    return this.ensureExists(this.taskRepo, id, schoolId, 'Tâche agent');
  }

  async createTask(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinAgentTask> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['agentId', 'type', 'input', 'output', 'status', 'priority'], 'Tâche agent');

    const validated = this.validateSchema(createAgentTaskSchema, data, 'Tâche agent');

    return this.taskRepo.create(
      {
        agentId: validated.agentId,
        type: validated.type,
        input: validated.input,
        output: validated.output,
        status: validated.status,
        priority: validated.priority,
        error: validated.error,
        startedAt: new Date().toISOString(),
      },
      schoolId,
    );
  }

  async updateTask(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinAgentTask> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Tâche agent');

    const existing = await this.ensureExists(this.taskRepo, id, schoolId, 'Tâche agent');
    this.validateOwnership(existing, schoolId, 'Tâche agent');

    const validated = this.validateSchema(updateAgentTaskSchema, data, 'Tâche agent');
    return this.taskRepo.update(id, schoolId, validated);
  }

  async deleteTask(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Tâche agent');

    const existing = await this.ensureExists(this.taskRepo, id, schoolId, 'Tâche agent');
    this.validateOwnership(existing, schoolId, 'Tâche agent');

    await this.taskRepo.softDelete(id, schoolId);
  }

  async listByAgent(
    schoolId: string,
    agentId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinAgentTask>> {
    this.validateSchoolId(schoolId);
    return this.taskRepo.findByAgentId(agentId, schoolId, this.validatePagination(params));
  }

  async listByStatus(
    schoolId: string,
    status: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinAgentTask>> {
    this.validateSchoolId(schoolId);
    return this.taskRepo.findByStatus(status, schoolId, this.validatePagination(params));
  }

  async listByPriority(
    schoolId: string,
    priority: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinAgentTask>> {
    this.validateSchoolId(schoolId);
    return this.taskRepo.findByPriority(priority, schoolId, this.validatePagination(params));
  }

  async completeTask(
    schoolId: string,
    id: string,
    output: Record<string, unknown>,
  ): Promise<GedkinAgentTask> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Tâche agent');

    const existing = await this.ensureExists(this.taskRepo, id, schoolId, 'Tâche agent');
    this.validateOwnership(existing, schoolId, 'Tâche agent');

    return this.taskRepo.update(id, schoolId, {
      status: 'COMPLETED',
      output,
      completedAt: new Date().toISOString(),
    });
  }

  async failTask(
    schoolId: string,
    id: string,
    error: string,
  ): Promise<GedkinAgentTask> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Tâche agent');

    const existing = await this.ensureExists(this.taskRepo, id, schoolId, 'Tâche agent');
    this.validateOwnership(existing, schoolId, 'Tâche agent');

    return this.taskRepo.update(id, schoolId, {
      status: 'FAILED',
      error,
      completedAt: new Date().toISOString(),
    });
  }

  async getTaskStats(
    schoolId: string,
  ): Promise<{
    totalTasks: number;
    byStatus: Record<string, number>;
    byPriority: Record<string, number>;
    averageCompletionTime: number;
  }> {
    this.validateSchoolId(schoolId);
    const tasks = await this.taskRepo.findAll(schoolId, { limit: 1000 });

    const byStatus: Record<string, number> = {};
    const byPriority: Record<string, number> = {};
    let totalCompletionTime = 0;
    let completedCount = 0;

    for (const task of tasks.data) {
      byStatus[task.status] = (byStatus[task.status] ?? 0) + 1;
      byPriority[task.priority] = (byPriority[task.priority] ?? 0) + 1;
      if (task.completedAt && task.startedAt) {
        const completionTime = new Date(task.completedAt).getTime() - new Date(task.startedAt).getTime();
        totalCompletionTime += completionTime;
        completedCount++;
      }
    }

    return {
      totalTasks: tasks.total,
      byStatus,
      byPriority,
      averageCompletionTime: completedCount > 0 ? totalCompletionTime / completedCount : 0,
    };
  }
}