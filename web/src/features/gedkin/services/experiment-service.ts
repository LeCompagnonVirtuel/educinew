import {
  ValidationError,
  NotFoundError,
} from '@educi/errors';
import {
  createExperimentSchema,
  updateExperimentSchema,
} from '../validators/gedkin';
import type {
  GedkinExperiment,
} from '@educi/types';
import type {
  GedkinExperimentRepository,
} from '../repositories/experiment-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';
import { BaseGedkinService, type GedkinServiceConfig } from './base-gedkin-service';

// ============================================================================
// Experiment Service
// ============================================================================

export class ExperimentService extends BaseGedkinService {
  constructor(
    private readonly experimentRepo: GedkinExperimentRepository,
    config?: GedkinServiceConfig,
  ) {
    super(config);
  }

  async listExperiments(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinExperiment>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.experimentRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getExperiment(schoolId: string, id: string): Promise<GedkinExperiment> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Expérience');
    return this.ensureExists(this.experimentRepo, id, schoolId, 'Expérience');
  }

  async createExperiment(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinExperiment> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'description', 'status', 'hypothesis', 'methodology', 'datasetIds', 'modelIds', 'results'], 'Expérience');

    const validated = this.validateSchema(createExperimentSchema, data, 'Expérience');

    return this.experimentRepo.create(
      {
        name: validated.name,
        description: validated.description,
        status: validated.status,
        hypothesis: validated.hypothesis,
        methodology: validated.methodology,
        datasetIds: validated.datasetIds,
        modelIds: validated.modelIds,
        results: validated.results,
        startedAt: new Date().toISOString(),
      },
      schoolId,
    );
  }

  async updateExperiment(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinExperiment> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Expérience');

    const existing = await this.ensureExists(this.experimentRepo, id, schoolId, 'Expérience');
    this.validateOwnership(existing, schoolId, 'Expérience');

    const validated = this.validateSchema(updateExperimentSchema, data, 'Expérience');
    return this.experimentRepo.update(id, schoolId, validated);
  }

  async deleteExperiment(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Expérience');

    const existing = await this.ensureExists(this.experimentRepo, id, schoolId, 'Expérience');
    this.validateOwnership(existing, schoolId, 'Expérience');

    await this.experimentRepo.softDelete(id, schoolId);
  }

  async listByStatus(
    schoolId: string,
    status: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinExperiment>> {
    this.validateSchoolId(schoolId);
    return this.experimentRepo.findByStatus(status, schoolId, this.validatePagination(params));
  }

  async startExperiment(
    schoolId: string,
    id: string,
  ): Promise<GedkinExperiment> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Expérience');

    const existing = await this.ensureExists(this.experimentRepo, id, schoolId, 'Expérience');
    this.validateOwnership(existing, schoolId, 'Expérience');

    return this.experimentRepo.update(id, schoolId, {
      status: 'RUNNING',
      startedAt: new Date().toISOString(),
    });
  }

  async completeExperiment(
    schoolId: string,
    id: string,
    results: Record<string, unknown>,
  ): Promise<GedkinExperiment> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Expérience');

    const existing = await this.ensureExists(this.experimentRepo, id, schoolId, 'Expérience');
    this.validateOwnership(existing, schoolId, 'Expérience');

    return this.experimentRepo.update(id, schoolId, {
      status: 'COMPLETED',
      results,
      completedAt: new Date().toISOString(),
    });
  }

  async failExperiment(
    schoolId: string,
    id: string,
  ): Promise<GedkinExperiment> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Expérience');

    const existing = await this.ensureExists(this.experimentRepo, id, schoolId, 'Expérience');
    this.validateOwnership(existing, schoolId, 'Expérience');

    return this.experimentRepo.update(id, schoolId, {
      status: 'FAILED',
      completedAt: new Date().toISOString(),
    });
  }

  async getExperimentStats(
    schoolId: string,
  ): Promise<{
    totalExperiments: number;
    byStatus: Record<string, number>;
    averageDuration: number;
  }> {
    this.validateSchoolId(schoolId);
    const experiments = await this.experimentRepo.findAll(schoolId, { limit: 1000 });

    const byStatus: Record<string, number> = {};
    let totalDuration = 0;
    let completedCount = 0;

    for (const experiment of experiments.data) {
      byStatus[experiment.status] = (byStatus[experiment.status] ?? 0) + 1;
      if (experiment.completedAt && experiment.startedAt) {
        const duration = new Date(experiment.completedAt).getTime() - new Date(experiment.startedAt).getTime();
        totalDuration += duration;
        completedCount++;
      }
    }

    return {
      totalExperiments: experiments.total,
      byStatus,
      averageDuration: completedCount > 0 ? totalDuration / completedCount : 0,
    };
  }
}