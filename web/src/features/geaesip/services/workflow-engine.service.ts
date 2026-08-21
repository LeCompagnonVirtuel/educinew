import { ValidationError, NotFoundError } from '@educi/errors';
import type {
  GeaesipWorkflow,
  GeaesipWorkflowTask,
  GeaesipActionPlan,
  GeaesipExecutionLog,
} from '@educi/types';
import {
  GeaesipWorkflowRepository,
  GeaesipWorkflowTaskRepository,
  GeaesipActionPlanRepository,
  GeaesipExecutionLogRepository,
} from '../repositories/workflow-engine.repository';

// ============================================================================
// Workflow Engine Service
// ============================================================================

export class GeaesipWorkflowEngineService {
  constructor(
    private readonly workflowRepo = new GeaesipWorkflowRepository(),
    private readonly taskRepo = new GeaesipWorkflowTaskRepository(),
    private readonly planRepo = new GeaesipActionPlanRepository(),
    private readonly logRepo = new GeaesipExecutionLogRepository(),
  ) {}

  private validateSchoolId(schoolId: string): void {
    if (!schoolId || typeof schoolId !== 'string' || schoolId.trim().length === 0) {
      throw new ValidationError('school_id est requis');
    }
  }

  private validateId(id: string, entityName: string): void {
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      throw new ValidationError(`${entityName} id est requis`);
    }
  }

  // ─── Workflows ────────────────────────────────────────────────────────────

  async listWorkflows(schoolId: string): Promise<GeaesipWorkflow[]> {
    this.validateSchoolId(schoolId);
    return this.workflowRepo.findAllBySchool(schoolId);
  }

  async getWorkflow(schoolId: string, id: string): Promise<GeaesipWorkflow> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Workflow');
    const entity = await this.workflowRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Workflow', id);
    }
    return entity;
  }

  async createWorkflow(
    schoolId: string,
    data: Omit<GeaesipWorkflow, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<GeaesipWorkflow> {
    this.validateSchoolId(schoolId);
    return this.workflowRepo.create({ ...data, school_id: schoolId });
  }

  async updateWorkflow(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipWorkflow, 'id' | 'createdAt'>>,
  ): Promise<GeaesipWorkflow> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Workflow');
    await this.getWorkflow(schoolId, id);
    return this.workflowRepo.update(id, data);
  }

  async deleteWorkflow(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Workflow');
    await this.getWorkflow(schoolId, id);
    await this.workflowRepo.delete(id);
  }

  // ─── Workflow Tasks ───────────────────────────────────────────────────────

  async listTasks(schoolId: string): Promise<GeaesipWorkflowTask[]> {
    this.validateSchoolId(schoolId);
    return this.taskRepo.findAllBySchool(schoolId);
  }

  async getTask(schoolId: string, id: string): Promise<GeaesipWorkflowTask> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Tâche');
    const entity = await this.taskRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Tâche', id);
    }
    return entity;
  }

  async createTask(
    schoolId: string,
    data: Omit<GeaesipWorkflowTask, 'id' | 'createdAt' | 'completedAt' | 'result' | 'retries'>,
  ): Promise<GeaesipWorkflowTask> {
    this.validateSchoolId(schoolId);
    return this.taskRepo.create({ ...data, school_id: schoolId });
  }

  async completeTask(
    schoolId: string,
    id: string,
    result: Record<string, unknown>,
  ): Promise<GeaesipWorkflowTask> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Tâche');
    await this.getTask(schoolId, id);
    return this.taskRepo.update(id, {
      completedAt: new Date().toISOString(),
      result,
    });
  }

  async retryTask(schoolId: string, id: string): Promise<GeaesipWorkflowTask> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Tâche');
    const task = await this.getTask(schoolId, id);
    return this.taskRepo.update(id, { retries: (task.retries ?? 0) + 1, status: 'pending' });
  }

  async deleteTask(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Tâche');
    await this.getTask(schoolId, id);
    await this.taskRepo.delete(id);
  }

  // ─── Action Plans ─────────────────────────────────────────────────────────

  async listActionPlans(schoolId: string): Promise<GeaesipActionPlan[]> {
    this.validateSchoolId(schoolId);
    return this.planRepo.findAllBySchool(schoolId);
  }

  async getActionPlan(schoolId: string, id: string): Promise<GeaesipActionPlan> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Plan d\'action');
    const entity = await this.planRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Plan d\'action', id);
    }
    return entity;
  }

  async createActionPlan(
    schoolId: string,
    data: Omit<GeaesipActionPlan, 'id' | 'createdAt'>,
  ): Promise<GeaesipActionPlan> {
    this.validateSchoolId(schoolId);
    return this.planRepo.create({ ...data, school_id: schoolId });
  }

  async updateActionPlan(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipActionPlan, 'id' | 'createdAt'>>,
  ): Promise<GeaesipActionPlan> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Plan d\'action');
    await this.getActionPlan(schoolId, id);
    return this.planRepo.update(id, data);
  }

  async deleteActionPlan(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Plan d\'action');
    await this.getActionPlan(schoolId, id);
    await this.planRepo.delete(id);
  }

  // ─── Execution Logs ───────────────────────────────────────────────────────

  async listExecutionLogs(schoolId: string): Promise<GeaesipExecutionLog[]> {
    this.validateSchoolId(schoolId);
    return this.logRepo.findAllBySchool(schoolId);
  }

  async getExecutionLog(schoolId: string, id: string): Promise<GeaesipExecutionLog> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Log d\'exécution');
    const entity = await this.logRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Log d\'exécution', id);
    }
    return entity;
  }

  async createExecutionLog(
    schoolId: string,
    data: Omit<GeaesipExecutionLog, 'id' | 'timestamp'>,
  ): Promise<GeaesipExecutionLog> {
    this.validateSchoolId(schoolId);
    return this.logRepo.create({ ...data, school_id: schoolId });
  }

  async deleteExecutionLog(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Log d\'exécution');
    await this.getExecutionLog(schoolId, id);
    await this.logRepo.delete(id);
  }

  // ─── Stats ────────────────────────────────────────────────────────────────

  async getWorkflowEngineStats(schoolId: string) {
    this.validateSchoolId(schoolId);

    const workflows = await this.workflowRepo.findAllBySchool(schoolId);
    const tasks = await this.taskRepo.findAllBySchool(schoolId);
    const plans = await this.planRepo.findAllBySchool(schoolId);
    const logs = await this.logRepo.findAllBySchool(schoolId);
    const completedTasks = tasks.filter((t) => t.completedAt !== null);

    return {
      totalWorkflows: workflows.length,
      totalTasks: tasks.length,
      completedTasks: completedTasks.length,
      totalActionPlans: plans.length,
      totalExecutionLogs: logs.length,
    };
  }
}
