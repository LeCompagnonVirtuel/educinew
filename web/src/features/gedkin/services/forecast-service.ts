import {
  ValidationError,
  NotFoundError,
} from '@educi/errors';
import {
  createForecastSchema,
  updateForecastSchema,
  createForecastPredictionSchema,
  updateForecastPredictionSchema,
} from '../validators/gedkin';
import type {
  GedkinForecast,
  GedkinForecastPrediction,
} from '@educi/types';
import type {
  GedkinForecastRepository,
  GedkinForecastPredictionRepository,
} from '../repositories/forecast-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';
import { BaseGedkinService, type GedkinServiceConfig } from './base-gedkin-service';

// ============================================================================
// Forecast Service
// ============================================================================

export class ForecastService extends BaseGedkinService {
  constructor(
    private readonly forecastRepo: GedkinForecastRepository,
    private readonly predictionRepo: GedkinForecastPredictionRepository,
    config?: GedkinServiceConfig,
  ) {
    super(config);
  }

  // ─── Forecasts ───────────────────────────────────────────────────────────

  async listForecasts(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinForecast>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.forecastRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getForecast(schoolId: string, id: string): Promise<GedkinForecast> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Prévision');
    return this.ensureExists(this.forecastRepo, id, schoolId, 'Prévision');
  }

  async createForecast(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinForecast> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'type', 'model', 'status', 'parameters', 'predictions', 'confidence', 'period'], 'Prévision');

    const validated = this.validateSchema(createForecastSchema, data, 'Prévision');
    this.validateRange(validated.confidence, 0, 1, 'confidence', 'Prévision');

    return this.forecastRepo.create(
      {
        name: validated.name,
        type: validated.type,
        model: validated.model,
        status: validated.status,
        parameters: validated.parameters,
        predictions: validated.predictions,
        confidence: validated.confidence,
        period: validated.period,
      },
      schoolId,
    );
  }

  async updateForecast(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinForecast> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Prévision');

    const existing = await this.ensureExists(this.forecastRepo, id, schoolId, 'Prévision');
    this.validateOwnership(existing, schoolId, 'Prévision');

    const validated = this.validateSchema(updateForecastSchema, data, 'Prévision');
    return this.forecastRepo.update(id, schoolId, validated);
  }

  async deleteForecast(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Prévision');

    const existing = await this.ensureExists(this.forecastRepo, id, schoolId, 'Prévision');
    this.validateOwnership(existing, schoolId, 'Prévision');

    await this.forecastRepo.softDelete(id, schoolId);
  }

  async listByType(
    schoolId: string,
    type: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinForecast>> {
    this.validateSchoolId(schoolId);
    return this.forecastRepo.findByType(type, schoolId, this.validatePagination(params));
  }

  async listByStatus(
    schoolId: string,
    status: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinForecast>> {
    this.validateSchoolId(schoolId);
    return this.forecastRepo.findByStatus(status, schoolId, this.validatePagination(params));
  }

  // ─── Predictions ─────────────────────────────────────────────────────────

  async listPredictions(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinForecastPrediction>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.predictionRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getPrediction(schoolId: string, id: string): Promise<GedkinForecastPrediction> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Prédiction');
    return this.ensureExists(this.predictionRepo, id, schoolId, 'Prédiction');
  }

  async createPrediction(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinForecastPrediction> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['forecastId', 'date', 'value', 'lowerBound', 'upperBound', 'confidence'], 'Prédiction');

    const validated = this.validateSchema(createForecastPredictionSchema, data, 'Prédiction');
    this.validateRange(validated.confidence, 0, 1, 'confidence', 'Prédiction');

    return this.predictionRepo.create(
      {
        forecastId: validated.forecastId,
        date: validated.date,
        value: validated.value,
        lowerBound: validated.lowerBound,
        upperBound: validated.upperBound,
        confidence: validated.confidence,
      },
      schoolId,
    );
  }

  async updatePrediction(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinForecastPrediction> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Prédiction');

    const existing = await this.ensureExists(this.predictionRepo, id, schoolId, 'Prédiction');
    this.validateOwnership(existing, schoolId, 'Prédiction');

    const validated = this.validateSchema(updateForecastPredictionSchema, data, 'Prédiction');
    return this.predictionRepo.update(id, schoolId, validated);
  }

  async deletePrediction(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Prédiction');

    const existing = await this.ensureExists(this.predictionRepo, id, schoolId, 'Prédiction');
    this.validateOwnership(existing, schoolId, 'Prédiction');

    await this.predictionRepo.softDelete(id, schoolId);
  }

  async listByForecast(
    schoolId: string,
    forecastId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinForecastPrediction>> {
    this.validateSchoolId(schoolId);
    return this.predictionRepo.findByForecastId(forecastId, schoolId, this.validatePagination(params));
  }

  async getForecastStats(
    schoolId: string,
  ): Promise<{
    totalForecasts: number;
    totalPredictions: number;
    byType: Record<string, number>;
    byStatus: Record<string, number>;
    averageConfidence: number;
  }> {
    this.validateSchoolId(schoolId);

    const forecasts = await this.forecastRepo.findAll(schoolId, { limit: 1000 });
    const predictions = await this.predictionRepo.findAll(schoolId, { limit: 1000 });

    const byType: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    let totalConfidence = 0;
    for (const forecast of forecasts.data) {
      byType[forecast.type] = (byType[forecast.type] ?? 0) + 1;
      byStatus[forecast.status] = (byStatus[forecast.status] ?? 0) + 1;
      totalConfidence += forecast.confidence;
    }

    return {
      totalForecasts: forecasts.total,
      totalPredictions: predictions.total,
      byType,
      byStatus,
      averageConfidence: forecasts.total > 0 ? totalConfidence / forecasts.total : 0,
    };
  }
}