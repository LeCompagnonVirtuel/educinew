import {
  GecirapCostError,
  GecirapCostAnomalyDetectedError,
  GecirapForecastError,
} from '@educi/errors';
import {
  createCloudCostSchema,
  updateCloudCostSchema,
  createCostForecastSchema,
  updateCostForecastSchema,
  createCostAnomalySchema,
  updateCostAnomalySchema,
} from '../validators/finops';
import type {
  GecirapCloudCost,
  GecirapCostForecast,
  GecirapCostAnomaly,
  CloudCostRepository,
  CostForecastRepository,
  CostAnomalyRepository,
} from '../repositories/finops-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// Cloud Cost Service
// ============================================================================

export class CloudCostService extends BaseGecirapService {
  constructor(
    private readonly costRepo: CloudCostRepository,
    private readonly forecastRepo: CostForecastRepository,
    private readonly anomalyRepo: CostAnomalyRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  // ─── Cloud Costs ─────────────────────────────────────────────────────────

  async listCosts(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapCloudCost>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.costRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getCost(schoolId: string, id: string): Promise<GecirapCloudCost> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Coût cloud');
    return this.ensureExists(this.costRepo, id, schoolId, 'Coût cloud');
  }

  async createCost(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCloudCost> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['account_id', 'provider', 'service_name', 'region_code', 'cost_amount', 'currency', 'cost_date'], 'Coût cloud');

    const validated = this.validateSchema(createCloudCostSchema, data, 'Coût cloud');

    return this.costRepo.create(
      {
        account_id: validated.account_id,
        provider: validated.provider,
        service_name: validated.service_name,
        region_code: validated.region_code,
        cost_amount: validated.cost_amount,
        currency: validated.currency,
        cost_date: validated.cost_date,
        usage_hours: validated.usage_hours,
        tags: validated.tags,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateCost(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCloudCost> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Coût cloud');

    const existing = await this.ensureExists(this.costRepo, id, schoolId, 'Coût cloud');
    this.validateOwnership(existing, schoolId, 'Coût cloud');

    const validated = this.validateSchema(updateCloudCostSchema, data, 'Coût cloud');
    return this.costRepo.update(id, schoolId, validated);
  }

  async deleteCost(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Coût cloud');

    const existing = await this.ensureExists(this.costRepo, id, schoolId, 'Coût cloud');
    this.validateOwnership(existing, schoolId, 'Coût cloud');

    await this.costRepo.softDelete(id, schoolId);
  }

  async listByAccount(
    schoolId: string,
    accountId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapCloudCost>> {
    this.validateSchoolId(schoolId);
    this.validateId(accountId, 'Compte cloud');
    return this.costRepo.findByAccountId(accountId, schoolId, this.validatePagination(params));
  }

  async listByProvider(
    schoolId: string,
    provider: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapCloudCost>> {
    this.validateSchoolId(schoolId);
    return this.costRepo.findByProvider(provider, schoolId, this.validatePagination(params));
  }

  async listByDateRange(
    schoolId: string,
    startDate: string,
    endDate: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapCloudCost>> {
    this.validateSchoolId(schoolId);
    if (!startDate || !endDate) {
      throw new GecirapCostError('Les dates de début et fin sont requises');
    }
    return this.costRepo.findByDateRange(startDate, endDate, schoolId, params);
  }

  // ─── Cost Forecasts ──────────────────────────────────────────────────────

  async listForecasts(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapCostForecast>> {
    this.validateSchoolId(schoolId);
    return this.forecastRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getForecast(schoolId: string, id: string): Promise<GecirapCostForecast> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Prévision coût');
    return this.ensureExists(this.forecastRepo, id, schoolId, 'Prévision coût');
  }

  async createForecast(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCostForecast> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['cost_center_id', 'forecast_period_days', 'predicted_amount', 'currency'], 'Prévision coût');

    const validated = this.validateSchema(createCostForecastSchema, data, 'Prévision coût');

    return this.forecastRepo.create(
      {
        cost_center_id: validated.cost_center_id,
        forecast_period_days: validated.forecast_period_days,
        predicted_amount: validated.predicted_amount,
        currency: validated.currency,
        confidence_score: validated.confidence_score,
        forecasted_at: new Date().toISOString(),
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateForecast(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCostForecast> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Prévision coût');

    const existing = await this.ensureExists(this.forecastRepo, id, schoolId, 'Prévision coût');
    this.validateOwnership(existing, schoolId, 'Prévision coût');

    const validated = this.validateSchema(updateCostForecastSchema, data, 'Prévision coût');
    return this.forecastRepo.update(id, schoolId, validated);
  }

  async deleteForecast(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Prévision coût');

    const existing = await this.ensureExists(this.forecastRepo, id, schoolId, 'Prévision coût');
    this.validateOwnership(existing, schoolId, 'Prévision coût');

    await this.forecastRepo.softDelete(id, schoolId);
  }

  async getLatestForecast(
    schoolId: string,
    costCenterId: string,
  ): Promise<GecirapCostForecast | null> {
    this.validateSchoolId(schoolId);
    return this.forecastRepo.findLatest(costCenterId, schoolId);
  }

  // ─── Cost Anomalies ──────────────────────────────────────────────────────

  async listAnomalies(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapCostAnomaly>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.anomalyRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getAnomaly(schoolId: string, id: string): Promise<GecirapCostAnomaly> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Anomalie coût');
    return this.ensureExists(this.anomalyRepo, id, schoolId, 'Anomalie coût');
  }

  async createAnomaly(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCostAnomaly> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['account_id', 'service_name', 'anomaly_type', 'severity', 'expected_amount', 'actual_amount', 'deviation_percent'], 'Anomalie coût');

    const validated = this.validateSchema(createCostAnomalySchema, data, 'Anomalie coût');

    return this.anomalyRepo.create(
      {
        account_id: validated.account_id,
        service_name: validated.service_name,
        anomaly_type: validated.anomaly_type,
        severity: validated.severity,
        expected_amount: validated.expected_amount,
        actual_amount: validated.actual_amount,
        deviation_percent: validated.deviation_percent,
        detected_at: new Date().toISOString(),
        resolved_at: validated.resolved_at,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateAnomaly(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCostAnomaly> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Anomalie coût');

    const existing = await this.ensureExists(this.anomalyRepo, id, schoolId, 'Anomalie coût');
    this.validateOwnership(existing, schoolId, 'Anomalie coût');

    const validated = this.validateSchema(updateCostAnomalySchema, data, 'Anomalie coût');
    return this.anomalyRepo.update(id, schoolId, validated);
  }

  async deleteAnomaly(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Anomalie coût');

    const existing = await this.ensureExists(this.anomalyRepo, id, schoolId, 'Anomalie coût');
    this.validateOwnership(existing, schoolId, 'Anomalie coût');

    await this.anomalyRepo.softDelete(id, schoolId);
  }

  async getUnresolvedAnomalies(schoolId: string): Promise<GecirapCostAnomaly[]> {
    this.validateSchoolId(schoolId);
    return this.anomalyRepo.findUnresolved(schoolId);
  }

  async listBySeverity(
    schoolId: string,
    severity: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapCostAnomaly>> {
    this.validateSchoolId(schoolId);
    return this.anomalyRepo.findBySeverity(severity, schoolId, this.validatePagination(params));
  }

  async resolveAnomaly(schoolId: string, id: string): Promise<GecirapCostAnomaly> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Anomalie coût');

    const existing = await this.ensureExists(this.anomalyRepo, id, schoolId, 'Anomalie coût');
    this.validateOwnership(existing, schoolId, 'Anomalie coût');

    return this.anomalyRepo.update(id, schoolId, {
      resolved_at: new Date().toISOString(),
    });
  }

  async getCloudCostOverview(schoolId: string): Promise<{
    totalCosts: number;
    totalForecasted: number;
    unresolvedAnomalies: number;
    criticalAnomalies: number;
    totalCostAmount: number;
  }> {
    this.validateSchoolId(schoolId);

    const costs = await this.costRepo.findAll(schoolId, { limit: 1 });
    const forecasts = await this.forecastRepo.findAll(schoolId, { limit: 1 });
    const anomalies = await this.anomalyRepo.findUnresolved(schoolId);
    const critical = anomalies.filter((a) => a.severity === 'critical');

    let totalCostAmount = 0;
    for (const cost of costs.data) {
      totalCostAmount += cost.cost_amount;
    }

    return {
      totalCosts: costs.total,
      totalForecasted: forecasts.total,
      unresolvedAnomalies: anomalies.length,
      criticalAnomalies: critical.length,
      totalCostAmount,
    };
  }
}
