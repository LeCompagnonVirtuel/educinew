import { ValidationError, NotFoundError } from '@educi/errors';
import type {
  GeaesipEducationRuntime,
  GeaesipRuntimeExecution,
  GeaesipRuntimeMetric,
} from '@educi/types';
import {
  GeaesipEducationRuntimeRepository,
  GeaesipRuntimeExecutionRepository,
  GeaesipRuntimeMetricRepository,
} from '../repositories/runtime.repository';

export class GeaesipRuntimeService {
  constructor(
    private readonly runtimeRepo = new GeaesipEducationRuntimeRepository(),
    private readonly executionRepo = new GeaesipRuntimeExecutionRepository(),
    private readonly metricRepo = new GeaesipRuntimeMetricRepository(),
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

  async listRuntimes(schoolId: string): Promise<GeaesipEducationRuntime[]> {
    this.validateSchoolId(schoolId);
    return this.runtimeRepo.findAllBySchool(schoolId);
  }

  async getRuntime(schoolId: string, id: string): Promise<GeaesipEducationRuntime> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Runtime');
    const entity = await this.runtimeRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Runtime', id);
    return entity;
  }

  async createRuntime(schoolId: string, data: Omit<GeaesipEducationRuntime, 'id' | 'createdAt' | 'updatedAt' | 'lastRunAt'>): Promise<GeaesipEducationRuntime> {
    this.validateSchoolId(schoolId);
    return this.runtimeRepo.create({ ...data, school_id: schoolId });
  }

  async updateRuntime(schoolId: string, id: string, data: Partial<Omit<GeaesipEducationRuntime, 'id' | 'createdAt'>>): Promise<GeaesipEducationRuntime> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Runtime');
    await this.getRuntime(schoolId, id);
    return this.runtimeRepo.update(id, data);
  }

  async startRuntime(schoolId: string, id: string): Promise<GeaesipEducationRuntime> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Runtime');
    await this.getRuntime(schoolId, id);
    return this.runtimeRepo.update(id, { status: 'running', lastRunAt: new Date().toISOString() });
  }

  async stopRuntime(schoolId: string, id: string): Promise<GeaesipEducationRuntime> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Runtime');
    await this.getRuntime(schoolId, id);
    return this.runtimeRepo.update(id, { status: 'stopped' });
  }

  async deleteRuntime(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Runtime');
    await this.getRuntime(schoolId, id);
    await this.runtimeRepo.delete(id);
  }

  async listExecutions(schoolId: string): Promise<GeaesipRuntimeExecution[]> {
    this.validateSchoolId(schoolId);
    return this.executionRepo.findAllBySchool(schoolId);
  }

  async getExecution(schoolId: string, id: string): Promise<GeaesipRuntimeExecution> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Execution runtime');
    const entity = await this.executionRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Execution runtime', id);
    return entity;
  }

  async createExecution(schoolId: string, data: Omit<GeaesipRuntimeExecution, 'id' | 'timestamp'>): Promise<GeaesipRuntimeExecution> {
    this.validateSchoolId(schoolId);
    return this.executionRepo.create({ ...data, school_id: schoolId });
  }

  async deleteExecution(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Execution runtime');
    await this.getExecution(schoolId, id);
    await this.executionRepo.delete(id);
  }

  async listMetrics(schoolId: string): Promise<GeaesipRuntimeMetric[]> {
    this.validateSchoolId(schoolId);
    return this.metricRepo.findAllBySchool(schoolId);
  }

  async getMetric(schoolId: string, id: string): Promise<GeaesipRuntimeMetric> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Metrique runtime');
    const entity = await this.metricRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Metrique runtime', id);
    return entity;
  }

  async createMetric(schoolId: string, data: Omit<GeaesipRuntimeMetric, 'id' | 'timestamp'>): Promise<GeaesipRuntimeMetric> {
    this.validateSchoolId(schoolId);
    return this.metricRepo.create({ ...data, school_id: schoolId });
  }

  async deleteMetric(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Metrique runtime');
    await this.getMetric(schoolId, id);
    await this.metricRepo.delete(id);
  }

  async getRuntimeStats(schoolId: string) {
    this.validateSchoolId(schoolId);
    const runtimes = await this.runtimeRepo.findAllBySchool(schoolId);
    const executions = await this.executionRepo.findAllBySchool(schoolId);
    const metrics = await this.metricRepo.findAllBySchool(schoolId);
    const running = runtimes.filter((r) => r.status === 'running');
    return {
      totalRuntimes: runtimes.length,
      runningRuntimes: running.length,
      totalExecutions: executions.length,
      totalMetrics: metrics.length,
    };
  }
}
