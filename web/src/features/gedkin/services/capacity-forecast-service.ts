import {
  ValidationError,
  NotFoundError,
} from '@educi/errors';
import {
  createCapacityForecastSchema,
  updateCapacityForecastSchema,
  createDriftDetectionSchema,
  updateDriftDetectionSchema,
} from '../validators/gedkin';
import type {
  GedkinCapacityForecast,
  GedkinDriftDetection,
} from '@educi/types';
import type {
  GedkinCapacityForecastRepository,
  GedkinDriftDetectionRepository,
} from '../repositories/capacity-forecast-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';
import { BaseGedkinService, type GedkinServiceConfig } from './base-gedkin-service';

// ============================================================================
// Capacity Forecast Service
// ============================================================================

export class CapacityForecastService extends BaseGedkinService {
  constructor(
    private readonly capacityRepo: GedkinCapacityForecastRepository,
    private readonly driftRepo: GedkinDriftDetectionRepository,
    config?: GedkinServiceConfig,
  ) {
    super(config);
  }

  // ─── Capacity Forecasts ──────────────────────────────────────────────────

  async listCapacityForecasts(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinCapacityForecast>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.capacityRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getCapacityForecast(schoolId: string, id: string): Promise<GedkinCapacityForecast> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Prévision de capacité');
    return this.ensureExists(this.capacityRepo, id, schoolId, 'Prévision de capacité');
  }

  async createCapacityForecast(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinCapacityForecast> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['resourceType', 'currentCapacity', 'predictedDemand', 'gap', 'period'], 'Prévision de capacité');

    const validated = this.validateSchema(createCapacityForecastSchema, data, 'Prévision de capacité');

    return this.capacityRepo.create(
      {
        resourceType: validated.resourceType,
        currentCapacity: validated.currentCapacity,
        predictedDemand: validated.predictedDemand,
        gap: validated.gap,
        period: validated.period,
      },
      schoolId,
    );
  }

  async updateCapacityForecast(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinCapacityForecast> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Prévision de capacité');

    const existing = await this.ensureExists(this.capacityRepo, id, schoolId, 'Prévision de capacité');
    this.validateOwnership(existing, schoolId, 'Prévision de capacité');

    const validated = this.validateSchema(updateCapacityForecastSchema, data, 'Prévision de capacité');
    return this.capacityRepo.update(id, schoolId, validated);
  }

  async deleteCapacityForecast(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Prévision de capacité');

    const existing = await this.ensureExists(this.capacityRepo, id, schoolId, 'Prévision de capacité');
    this.validateOwnership(existing, schoolId, 'Prévision de capacité');

    await this.capacityRepo.softDelete(id, schoolId);
  }

  async listByResourceType(
    schoolId: string,
    resourceType: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinCapacityForecast>> {
    this.validateSchoolId(schoolId);
    return this.capacityRepo.findByResourceType(resourceType, schoolId, this.validatePagination(params));
  }

  // ─── Drift Detection ─────────────────────────────────────────────────────

  async listDriftDetections(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinDriftDetection>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.driftRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getDriftDetection(schoolId: string, id: string): Promise<GedkinDriftDetection> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Détection de dérive');
    return this.ensureExists(this.driftRepo, id, schoolId, 'Détection de dérive');
  }

  async createDriftDetection(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinDriftDetection> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['forecastId', 'metric', 'driftScore', 'severity', 'acknowledged'], 'Détection de dérive');

    const validated = this.validateSchema(createDriftDetectionSchema, data, 'Détection de dérive');
    this.validateRange(validated.driftScore, 0, 1, 'driftScore', 'Détection de dérive');

    return this.driftRepo.create(
      {
        forecastId: validated.forecastId,
        metric: validated.metric,
        driftScore: validated.driftScore,
        severity: validated.severity,
        acknowledged: validated.acknowledged,
        detectedAt: new Date().toISOString(),
      },
      schoolId,
    );
  }

  async updateDriftDetection(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinDriftDetection> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Détection de dérive');

    const existing = await this.ensureExists(this.driftRepo, id, schoolId, 'Détection de dérive');
    this.validateOwnership(existing, schoolId, 'Détection de dérive');

    const validated = this.validateSchema(updateDriftDetectionSchema, data, 'Détection de dérive');
    return this.driftRepo.update(id, schoolId, validated);
  }

  async deleteDriftDetection(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Détection de dérive');

    const existing = await this.ensureExists(this.driftRepo, id, schoolId, 'Détection de dérive');
    this.validateOwnership(existing, schoolId, 'Détection de dérive');

    await this.driftRepo.softDelete(id, schoolId);
  }

  async listByForecast(
    schoolId: string,
    forecastId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinDriftDetection>> {
    this.validateSchoolId(schoolId);
    return this.driftRepo.findByForecastId(forecastId, schoolId, this.validatePagination(params));
  }

  async listUnacknowledgedDrifts(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinDriftDetection>> {
    this.validateSchoolId(schoolId);
    return this.driftRepo.findUnacknowledged(schoolId, this.validatePagination(params));
  }

  async getCapacityStats(
    schoolId: string,
  ): Promise<{
    totalCapacityForecasts: number;
    totalDriftDetections: number;
    byResourceType: Record<string, number>;
    bySeverity: Record<string, number>;
    unacknowledgedDrifts: number;
  }> {
    this.validateSchoolId(schoolId);

    const capacityForecasts = await this.capacityRepo.findAll(schoolId, { limit: 1000 });
    const driftDetections = await this.driftRepo.findAll(schoolId, { limit: 1000 });
    const unacknowledged = await this.driftRepo.findUnacknowledged(schoolId, { limit: 1000 });

    const byResourceType: Record<string, number> = {};
    for (const forecast of capacityForecasts.data) {
      byResourceType[forecast.resourceType] = (byResourceType[forecast.resourceType] ?? 0) + 1;
    }

    const bySeverity: Record<string, number> = {};
    for (const drift of driftDetections.data) {
      bySeverity[drift.severity] = (bySeverity[drift.severity] ?? 0) + 1;
    }

    return {
      totalCapacityForecasts: capacityForecasts.total,
      totalDriftDetections: driftDetections.total,
      byResourceType,
      bySeverity,
      unacknowledgedDrifts: unacknowledged.total,
    };
  }
}