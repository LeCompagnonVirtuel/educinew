import {
  ValidationError,
  NotFoundError,
} from '@educi/errors';
import {
  createForecastModelSchema,
  updateForecastModelSchema,
} from '../validators/gedkin';
import type {
  GedkinForecastModel_,
} from '@educi/types';
import type {
  GedkinForecastModelRepository,
} from '../repositories/forecast-model-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';
import { BaseGedkinService, type GedkinServiceConfig } from './base-gedkin-service';

// ============================================================================
// Forecast Model Service
// ============================================================================

export class ForecastModelService extends BaseGedkinService {
  constructor(
    private readonly modelRepo: GedkinForecastModelRepository,
    config?: GedkinServiceConfig,
  ) {
    super(config);
  }

  async listModels(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinForecastModel_>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.modelRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getModel(schoolId: string, id: string): Promise<GedkinForecastModel_> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Modèle de prévision');
    return this.ensureExists(this.modelRepo, id, schoolId, 'Modèle de prévision');
  }

  async createModel(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinForecastModel_> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'type', 'version', 'accuracy', 'trainingData', 'hyperparameters'], 'Modèle de prévision');

    const validated = this.validateSchema(createForecastModelSchema, data, 'Modèle de prévision');
    this.validateRange(validated.accuracy, 0, 1, 'accuracy', 'Modèle de prévision');

    return this.modelRepo.create(
      {
        name: validated.name,
        type: validated.type,
        version: validated.version,
        accuracy: validated.accuracy,
        trainingData: validated.trainingData,
        hyperparameters: validated.hyperparameters,
      },
      schoolId,
    );
  }

  async updateModel(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinForecastModel_> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Modèle de prévision');

    const existing = await this.ensureExists(this.modelRepo, id, schoolId, 'Modèle de prévision');
    this.validateOwnership(existing, schoolId, 'Modèle de prévision');

    const validated = this.validateSchema(updateForecastModelSchema, data, 'Modèle de prévision');
    return this.modelRepo.update(id, schoolId, validated);
  }

  async deleteModel(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Modèle de prévision');

    const existing = await this.ensureExists(this.modelRepo, id, schoolId, 'Modèle de prévision');
    this.validateOwnership(existing, schoolId, 'Modèle de prévision');

    await this.modelRepo.softDelete(id, schoolId);
  }

  async listByType(
    schoolId: string,
    type: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinForecastModel_>> {
    this.validateSchoolId(schoolId);
    return this.modelRepo.findByType(type, schoolId, this.validatePagination(params));
  }

  async getModelStats(
    schoolId: string,
  ): Promise<{
    totalModels: number;
    byType: Record<string, number>;
    averageAccuracy: number;
  }> {
    this.validateSchoolId(schoolId);
    const models = await this.modelRepo.findAll(schoolId, { limit: 1000 });

    const byType: Record<string, number> = {};
    let totalAccuracy = 0;
    for (const model of models.data) {
      byType[model.type] = (byType[model.type] ?? 0) + 1;
      totalAccuracy += model.accuracy;
    }

    return {
      totalModels: models.total,
      byType,
      averageAccuracy: models.total > 0 ? totalAccuracy / models.total : 0,
    };
  }
}