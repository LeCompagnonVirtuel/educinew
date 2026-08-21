import {
  GecirapOptimizationError,
  GecirapCommitmentError,
} from '@educi/errors';
import {
  createOptimizationRecommendationSchema,
  updateOptimizationRecommendationSchema,
  createReservedCapacitySchema,
  updateReservedCapacitySchema,
} from '../validators/finops';
import type {
  GecirapOptimizationRecommendation,
  GecirapReservedCapacity,
  OptimizationRecommendationRepository,
  ReservedCapacityRepository,
} from '../repositories/finops-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// Cost Optimization Service
// ============================================================================

export class CostOptimizationService extends BaseGecirapService {
  constructor(
    private readonly optimizationRepo: OptimizationRecommendationRepository,
    private readonly reservedCapacityRepo: ReservedCapacityRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  // ─── Optimization Recommendations ────────────────────────────────────────

  async listRecommendations(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapOptimizationRecommendation>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.optimizationRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getRecommendation(schoolId: string, id: string): Promise<GecirapOptimizationRecommendation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Recommandation optimisation');
    return this.ensureExists(this.optimizationRepo, id, schoolId, 'Recommandation optimisation');
  }

  async createRecommendation(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapOptimizationRecommendation> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['recommendation_type', 'resource_type', 'resource_id', 'current_monthly_cost', 'recommended_monthly_cost', 'savings_amount', 'savings_percent', 'implementation_effort', 'status'], 'Recommandation optimisation');

    const validated = this.validateSchema(createOptimizationRecommendationSchema, data, 'Recommandation optimisation');

    return this.optimizationRepo.create(
      {
        recommendation_type: validated.recommendation_type,
        resource_type: validated.resource_type,
        resource_id: validated.resource_id,
        current_monthly_cost: validated.current_monthly_cost,
        recommended_monthly_cost: validated.recommended_monthly_cost,
        savings_amount: validated.savings_amount,
        savings_percent: validated.savings_percent,
        implementation_effort: validated.implementation_effort,
        status: validated.status,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateRecommendation(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapOptimizationRecommendation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Recommandation optimisation');

    const existing = await this.ensureExists(this.optimizationRepo, id, schoolId, 'Recommandation optimisation');
    this.validateOwnership(existing, schoolId, 'Recommandation optimisation');

    const validated = this.validateSchema(updateOptimizationRecommendationSchema, data, 'Recommandation optimisation');
    return this.optimizationRepo.update(id, schoolId, validated);
  }

  async deleteRecommendation(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Recommandation optimisation');

    const existing = await this.ensureExists(this.optimizationRepo, id, schoolId, 'Recommandation optimisation');
    this.validateOwnership(existing, schoolId, 'Recommandation optimisation');

    await this.optimizationRepo.softDelete(id, schoolId);
  }

  async listPending(schoolId: string): Promise<GecirapOptimizationRecommendation[]> {
    this.validateSchoolId(schoolId);
    return this.optimizationRepo.findPending(schoolId);
  }

  async listHighSavings(
    schoolId: string,
    minSavingsPercent = 20,
  ): Promise<GecirapOptimizationRecommendation[]> {
    this.validateSchoolId(schoolId);
    return this.optimizationRepo.findHighSavings(schoolId, minSavingsPercent);
  }

  async listByResource(
    schoolId: string,
    resourceType: string,
    resourceId: string,
  ): Promise<GecirapOptimizationRecommendation[]> {
    this.validateSchoolId(schoolId);
    return this.optimizationRepo.findByResource(resourceType, resourceId, schoolId);
  }

  // ─── Reserved Capacity ───────────────────────────────────────────────────

  async listReservedCapacity(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapReservedCapacity>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.reservedCapacityRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getReservedCapacity(schoolId: string, id: string): Promise<GecirapReservedCapacity> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Capacité réservée');
    return this.ensureExists(this.reservedCapacityRepo, id, schoolId, 'Capacité réservée');
  }

  async createReservedCapacity(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapReservedCapacity> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['provider', 'account_id', 'resource_type', 'reserved_count', 'term_months', 'upfront_cost', 'monthly_recurring_cost', 'expiry_date'], 'Capacité réservée');

    const validated = this.validateSchema(createReservedCapacitySchema, data, 'Capacité réservée');

    return this.reservedCapacityRepo.create(
      {
        provider: validated.provider,
        account_id: validated.account_id,
        resource_type: validated.resource_type,
        reserved_count: validated.reserved_count,
        term_months: validated.term_months,
        upfront_cost: validated.upfront_cost,
        monthly_recurring_cost: validated.monthly_recurring_cost,
        utilization_percent: validated.utilization_percent,
        expiry_date: validated.expiry_date,
        status: validated.status ?? 'active',
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateReservedCapacity(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapReservedCapacity> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Capacité réservée');

    const existing = await this.ensureExists(this.reservedCapacityRepo, id, schoolId, 'Capacité réservée');
    this.validateOwnership(existing, schoolId, 'Capacité réservée');

    const validated = this.validateSchema(updateReservedCapacitySchema, data, 'Capacité réservée');
    return this.reservedCapacityRepo.update(id, schoolId, validated);
  }

  async deleteReservedCapacity(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Capacité réservée');

    const existing = await this.ensureExists(this.reservedCapacityRepo, id, schoolId, 'Capacité réservée');
    this.validateOwnership(existing, schoolId, 'Capacité réservée');

    await this.reservedCapacityRepo.softDelete(id, schoolId);
  }

  async listByProvider(
    schoolId: string,
    provider: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapReservedCapacity>> {
    this.validateSchoolId(schoolId);
    return this.reservedCapacityRepo.findByProvider(provider, schoolId, this.validatePagination(params));
  }

  async listByAccount(
    schoolId: string,
    accountId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapReservedCapacity>> {
    this.validateSchoolId(schoolId);
    this.validateId(accountId, 'Compte cloud');
    return this.reservedCapacityRepo.findByAccountId(accountId, schoolId, this.validatePagination(params));
  }

  async getExpiringReservations(
    schoolId: string,
    withinDays = 30,
  ): Promise<GecirapReservedCapacity[]> {
    this.validateSchoolId(schoolId);
    return this.reservedCapacityRepo.findExpiring(schoolId, withinDays);
  }

  async getCostOptimizationOverview(schoolId: string): Promise<{
    totalRecommendations: number;
    pendingRecommendations: number;
    highSavingsRecommendations: number;
    totalReservedCapacity: number;
    expiringReservations: number;
    totalPotentialSavings: number;
  }> {
    this.validateSchoolId(schoolId);

    const recommendations = await this.optimizationRepo.findAll(schoolId, { limit: 500 });
    const pending = await this.optimizationRepo.findPending(schoolId);
    const highSavings = await this.optimizationRepo.findHighSavings(schoolId);
    const reservations = await this.reservedCapacityRepo.findAll(schoolId, { limit: 500 });
    const expiring = await this.reservedCapacityRepo.findExpiring(schoolId);

    let totalPotentialSavings = 0;
    for (const rec of recommendations.data) {
      totalPotentialSavings += rec.savings_amount;
    }

    return {
      totalRecommendations: recommendations.total,
      pendingRecommendations: pending.length,
      highSavingsRecommendations: highSavings.length,
      totalReservedCapacity: reservations.total,
      expiringReservations: expiring.length,
      totalPotentialSavings,
    };
  }
}
