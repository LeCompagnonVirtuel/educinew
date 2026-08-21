import {
  ValidationError,
  NotFoundError,
} from '@educi/errors';
import {
  createObservatoryIndicatorSchema,
  updateObservatoryIndicatorSchema,
  createObservatoryDashboardSchema,
  updateObservatoryDashboardSchema,
} from '../validators/gedkin';
import type {
  GedkinObservatoryIndicator,
  GedkinObservatoryDashboard,
} from '@educi/types';
import type {
  GedkinObservatoryIndicatorRepository,
  GedkinObservatoryDashboardRepository,
} from '../repositories/observatory-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';
import { BaseGedkinService, type GedkinServiceConfig } from './base-gedkin-service';

// ============================================================================
// Observatory Service
// ============================================================================

export class ObservatoryService extends BaseGedkinService {
  constructor(
    private readonly indicatorRepo: GedkinObservatoryIndicatorRepository,
    private readonly dashboardRepo: GedkinObservatoryDashboardRepository,
    config?: GedkinServiceConfig,
  ) {
    super(config);
  }

  // ─── Indicators ──────────────────────────────────────────────────────────

  async listIndicators(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinObservatoryIndicator>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.indicatorRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getIndicator(schoolId: string, id: string): Promise<GedkinObservatoryIndicator> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Indicateur');
    return this.ensureExists(this.indicatorRepo, id, schoolId, 'Indicateur');
  }

  async createIndicator(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinObservatoryIndicator> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'category', 'value', 'unit', 'frequency', 'country', 'region', 'period', 'source', 'methodology', 'confidence'], 'Indicateur');

    const validated = this.validateSchema(createObservatoryIndicatorSchema, data, 'Indicateur');
    this.validateRange(validated.confidence, 0, 1, 'confidence', 'Indicateur');

    return this.indicatorRepo.create(
      {
        name: validated.name,
        category: validated.category,
        value: validated.value,
        unit: validated.unit,
        frequency: validated.frequency,
        country: validated.country,
        region: validated.region,
        period: validated.period,
        source: validated.source,
        methodology: validated.methodology,
        confidence: validated.confidence,
      },
      schoolId,
    );
  }

  async updateIndicator(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinObservatoryIndicator> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Indicateur');

    const existing = await this.ensureExists(this.indicatorRepo, id, schoolId, 'Indicateur');
    this.validateOwnership(existing, schoolId, 'Indicateur');

    const validated = this.validateSchema(updateObservatoryIndicatorSchema, data, 'Indicateur');
    return this.indicatorRepo.update(id, schoolId, validated);
  }

  async deleteIndicator(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Indicateur');

    const existing = await this.ensureExists(this.indicatorRepo, id, schoolId, 'Indicateur');
    this.validateOwnership(existing, schoolId, 'Indicateur');

    await this.indicatorRepo.softDelete(id, schoolId);
  }

  async listByCategory(
    schoolId: string,
    category: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinObservatoryIndicator>> {
    this.validateSchoolId(schoolId);
    return this.indicatorRepo.findByCategory(category, schoolId, this.validatePagination(params));
  }

  async listByCountry(
    schoolId: string,
    country: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinObservatoryIndicator>> {
    this.validateSchoolId(schoolId);
    return this.indicatorRepo.findByCountry(country, schoolId, this.validatePagination(params));
  }

  async listByPeriod(
    schoolId: string,
    period: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinObservatoryIndicator>> {
    this.validateSchoolId(schoolId);
    return this.indicatorRepo.findByPeriod(period, schoolId, this.validatePagination(params));
  }

  // ─── Dashboards ──────────────────────────────────────────────────────────

  async listDashboards(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinObservatoryDashboard>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.dashboardRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getDashboard(schoolId: string, id: string): Promise<GedkinObservatoryDashboard> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Tableau de bord');
    return this.ensureExists(this.dashboardRepo, id, schoolId, 'Tableau de bord');
  }

  async createDashboard(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinObservatoryDashboard> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'type', 'indicators', 'filters'], 'Tableau de bord');

    const validated = this.validateSchema(createObservatoryDashboardSchema, data, 'Tableau de bord');

    return this.dashboardRepo.create(
      {
        name: validated.name,
        type: validated.type,
        indicators: validated.indicators,
        filters: validated.filters,
      },
      schoolId,
    );
  }

  async updateDashboard(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinObservatoryDashboard> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Tableau de bord');

    const existing = await this.ensureExists(this.dashboardRepo, id, schoolId, 'Tableau de bord');
    this.validateOwnership(existing, schoolId, 'Tableau de bord');

    const validated = this.validateSchema(updateObservatoryDashboardSchema, data, 'Tableau de bord');
    return this.dashboardRepo.update(id, schoolId, validated);
  }

  async deleteDashboard(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Tableau de bord');

    const existing = await this.ensureExists(this.dashboardRepo, id, schoolId, 'Tableau de bord');
    this.validateOwnership(existing, schoolId, 'Tableau de bord');

    await this.dashboardRepo.softDelete(id, schoolId);
  }

  async getObservatoryStats(
    schoolId: string,
  ): Promise<{
    totalIndicators: number;
    totalDashboards: number;
    byCategory: Record<string, number>;
    byCountry: Record<string, number>;
  }> {
    this.validateSchoolId(schoolId);

    const indicators = await this.indicatorRepo.findAll(schoolId, { limit: 1000 });
    const dashboards = await this.dashboardRepo.findAll(schoolId, { limit: 1000 });

    const byCategory: Record<string, number> = {};
    for (const indicator of indicators.data) {
      byCategory[indicator.category] = (byCategory[indicator.category] ?? 0) + 1;
    }

    const byCountry: Record<string, number> = {};
    for (const indicator of indicators.data) {
      byCountry[indicator.country] = (byCountry[indicator.country] ?? 0) + 1;
    }

    return {
      totalIndicators: indicators.total,
      totalDashboards: dashboards.total,
      byCategory,
      byCountry,
    };
  }
}