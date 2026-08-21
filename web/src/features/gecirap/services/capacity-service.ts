import {
  GecirapCapacityError,
  GecirapCapacityForecastError,
  GecirapCapacityAlertError,
} from '@educi/errors';
import {
  createCapacityForecastSchema,
  updateCapacityForecastSchema,
  createCapacityPlanSchema,
  updateCapacityPlanSchema,
  createResourceUtilizationSchema,
  updateResourceUtilizationSchema,
  createCapacityAlertSchema,
  updateCapacityAlertSchema,
} from '../validators/autoscaling';
import type {
  GecirapCapacityForecast,
  GecirapCapacityPlan,
  GecirapResourceUtilization,
  GecirapCapacityAlert,
  CapacityForecastRepository,
  CapacityPlanRepository,
  ResourceUtilizationRepository,
  CapacityAlertRepository,
} from '../repositories/autoscaling-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// Capacity Service
// ============================================================================

export class CapacityService extends BaseGecirapService {
  constructor(
    private readonly forecastRepo: CapacityForecastRepository,
    private readonly planRepo: CapacityPlanRepository,
    private readonly utilizationRepo: ResourceUtilizationRepository,
    private readonly alertRepo: CapacityAlertRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  // ─── Forecasts ───────────────────────────────────────────────────────────

  async listForecasts(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapCapacityForecast>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.forecastRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getForecast(schoolId: string, id: string): Promise<GecirapCapacityForecast> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Prévision capacité');
    return this.ensureExists(this.forecastRepo, id, schoolId, 'Prévision capacité');
  }

  async createForecast(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCapacityForecast> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['resource_type', 'resource_id', 'forecast_period_days'], 'Prévision capacité');

    const validated = this.validateSchema(createCapacityForecastSchema, data, 'Prévision capacité');

    return this.forecastRepo.create(
      {
        resource_type: validated.resource_type,
        resource_id: validated.resource_id,
        forecast_period_days: validated.forecast_period_days,
        predicted_usage_percent: validated.predicted_usage_percent,
        recommended_replicas: validated.recommended_replicas,
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
  ): Promise<GecirapCapacityForecast> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Prévision capacité');

    const existing = await this.ensureExists(this.forecastRepo, id, schoolId, 'Prévision capacité');
    this.validateOwnership(existing, schoolId, 'Prévision capacité');

    const validated = this.validateSchema(updateCapacityForecastSchema, data, 'Prévision capacité');
    return this.forecastRepo.update(id, schoolId, validated);
  }

  async deleteForecast(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Prévision capacité');

    const existing = await this.ensureExists(this.forecastRepo, id, schoolId, 'Prévision capacité');
    this.validateOwnership(existing, schoolId, 'Prévision capacité');

    await this.forecastRepo.softDelete(id, schoolId);
  }

  async getLatestForecast(
    schoolId: string,
    resourceType: string,
    resourceId: string,
  ): Promise<GecirapCapacityForecast | null> {
    this.validateSchoolId(schoolId);
    return this.forecastRepo.findLatest(resourceType, resourceId, schoolId);
  }

  // ─── Plans ───────────────────────────────────────────────────────────────

  async listPlans(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapCapacityPlan>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.planRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getPlan(schoolId: string, id: string): Promise<GecirapCapacityPlan> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Plan de capacité');
    return this.ensureExists(this.planRepo, id, schoolId, 'Plan de capacité');
  }

  async createPlan(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCapacityPlan> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'resource_type', 'target_utilization_percent', 'headroom_percent', 'planning_horizon_days'], 'Plan de capacité');

    const validated = this.validateSchema(createCapacityPlanSchema, data, 'Plan de capacité');

    this.validateRange(validated.target_utilization_percent, 1, 100, 'target_utilization_percent', 'Plan de capacité');
    this.validateRange(validated.headroom_percent, 0, 100, 'headroom_percent', 'Plan de capacité');

    return this.planRepo.create(
      {
        name: validated.name,
        description: validated.description,
        resource_type: validated.resource_type,
        target_utilization_percent: validated.target_utilization_percent,
        headroom_percent: validated.headroom_percent,
        planning_horizon_days: validated.planning_horizon_days,
        is_active: validated.is_active ?? true,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updatePlan(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCapacityPlan> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Plan de capacité');

    const existing = await this.ensureExists(this.planRepo, id, schoolId, 'Plan de capacité');
    this.validateOwnership(existing, schoolId, 'Plan de capacité');

    const validated = this.validateSchema(updateCapacityPlanSchema, data, 'Plan de capacité');
    return this.planRepo.update(id, schoolId, validated);
  }

  async deletePlan(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Plan de capacité');

    const existing = await this.ensureExists(this.planRepo, id, schoolId, 'Plan de capacité');
    this.validateOwnership(existing, schoolId, 'Plan de capacité');

    await this.planRepo.softDelete(id, schoolId);
  }

  async listActivePlans(schoolId: string): Promise<GecirapCapacityPlan[]> {
    this.validateSchoolId(schoolId);
    return this.planRepo.findActive(schoolId);
  }

  // ─── Utilization ─────────────────────────────────────────────────────────

  async listUtilizations(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapResourceUtilization>> {
    this.validateSchoolId(schoolId);
    return this.utilizationRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getUtilization(schoolId: string, id: string): Promise<GecirapResourceUtilization> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Utilisation ressource');
    return this.ensureExists(this.utilizationRepo, id, schoolId, 'Utilisation ressource');
  }

  async createUtilization(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapResourceUtilization> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['resource_type', 'resource_id'], 'Utilisation ressource');

    const validated = this.validateSchema(createResourceUtilizationSchema, data, 'Utilisation ressource');

    return this.utilizationRepo.create(
      {
        resource_type: validated.resource_type,
        resource_id: validated.resource_id,
        cpu_percent: validated.cpu_percent,
        memory_percent: validated.memory_percent,
        disk_percent: validated.disk_percent,
        network_in_bytes: validated.network_in_bytes,
        network_out_bytes: validated.network_out_bytes,
        measured_at: new Date().toISOString(),
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateUtilization(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapResourceUtilization> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Utilisation ressource');

    const existing = await this.ensureExists(this.utilizationRepo, id, schoolId, 'Utilisation ressource');
    this.validateOwnership(existing, schoolId, 'Utilisation ressource');

    const validated = this.validateSchema(updateResourceUtilizationSchema, data, 'Utilisation ressource');
    return this.utilizationRepo.update(id, schoolId, validated);
  }

  async getLatestUtilization(
    schoolId: string,
    resourceType: string,
    resourceId: string,
  ): Promise<GecirapResourceUtilization | null> {
    this.validateSchoolId(schoolId);
    return this.utilizationRepo.findLatest(resourceType, resourceId, schoolId);
  }

  // ─── Alerts ──────────────────────────────────────────────────────────────

  async listAlerts(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapCapacityAlert>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.alertRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getAlert(schoolId: string, id: string): Promise<GecirapCapacityAlert> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Alerte capacité');
    return this.ensureExists(this.alertRepo, id, schoolId, 'Alerte capacité');
  }

  async createAlert(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCapacityAlert> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['resource_type', 'resource_id', 'alert_type', 'severity', 'message', 'threshold_percent', 'current_percent'], 'Alerte capacité');

    const validated = this.validateSchema(createCapacityAlertSchema, data, 'Alerte capacité');

    return this.alertRepo.create(
      {
        resource_type: validated.resource_type,
        resource_id: validated.resource_id,
        alert_type: validated.alert_type,
        severity: validated.severity,
        message: validated.message,
        threshold_percent: validated.threshold_percent,
        current_percent: validated.current_percent,
        acknowledged_at: validated.acknowledged_at,
        resolved_at: validated.resolved_at,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateAlert(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCapacityAlert> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Alerte capacité');

    const existing = await this.ensureExists(this.alertRepo, id, schoolId, 'Alerte capacité');
    this.validateOwnership(existing, schoolId, 'Alerte capacité');

    const validated = this.validateSchema(updateCapacityAlertSchema, data, 'Alerte capacité');
    return this.alertRepo.update(id, schoolId, validated);
  }

  async resolveAlert(schoolId: string, id: string): Promise<GecirapCapacityAlert> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Alerte capacité');

    const existing = await this.ensureExists(this.alertRepo, id, schoolId, 'Alerte capacité');
    this.validateOwnership(existing, schoolId, 'Alerte capacité');

    return this.alertRepo.update(id, schoolId, {
      resolved_at: new Date().toISOString(),
    });
  }

  async getUnresolvedAlerts(schoolId: string): Promise<GecirapCapacityAlert[]> {
    this.validateSchoolId(schoolId);
    return this.alertRepo.findUnresolved(schoolId);
  }

  async getCapacityOverview(schoolId: string): Promise<{
    totalForecasts: number;
    totalPlans: number;
    activePlans: number;
    unresolvedAlerts: number;
    avgUtilization: number;
  }> {
    this.validateSchoolId(schoolId);

    const forecasts = await this.forecastRepo.findAll(schoolId, { limit: 1 });
    const plans = await this.planRepo.findAll(schoolId, { limit: 500 });
    const alerts = await this.alertRepo.findUnresolved(schoolId);
    const activePlans = plans.data.filter((p) => p.is_active).length;

    return {
      totalForecasts: forecasts.total,
      totalPlans: plans.total,
      activePlans,
      unresolvedAlerts: alerts.length,
      avgUtilization: 0,
    };
  }
}
