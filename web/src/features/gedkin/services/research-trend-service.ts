import {
  ValidationError,
  NotFoundError,
} from '@educi/errors';
import {
  createResearchTrendSchema,
  updateResearchTrendSchema,
} from '../validators/gedkin';
import type {
  GedkinResearchTrend,
} from '@educi/types';
import type {
  GedkinResearchTrendRepository,
} from '../repositories/research-trend-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';
import { BaseGedkinService, type GedkinServiceConfig } from './base-gedkin-service';

// ============================================================================
// Research Trend Service
// ============================================================================

export class ResearchTrendService extends BaseGedkinService {
  constructor(
    private readonly trendRepo: GedkinResearchTrendRepository,
    config?: GedkinServiceConfig,
  ) {
    super(config);
  }

  async listTrends(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinResearchTrend>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.trendRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getTrend(schoolId: string, id: string): Promise<GedkinResearchTrend> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Tendance de recherche');
    return this.ensureExists(this.trendRepo, id, schoolId, 'Tendance de recherche');
  }

  async createTrend(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinResearchTrend> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['topic', 'trendScore', 'growthRate', 'topInstitutions', 'topCountries', 'period'], 'Tendance de recherche');

    const validated = this.validateSchema(createResearchTrendSchema, data, 'Tendance de recherche');
    this.validateRange(validated.trendScore, 0, 1, 'trendScore', 'Tendance de recherche');

    return this.trendRepo.create(
      {
        topic: validated.topic,
        trendScore: validated.trendScore,
        growthRate: validated.growthRate,
        topInstitutions: validated.topInstitutions,
        topCountries: validated.topCountries,
        period: validated.period,
      },
      schoolId,
    );
  }

  async updateTrend(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinResearchTrend> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Tendance de recherche');

    const existing = await this.ensureExists(this.trendRepo, id, schoolId, 'Tendance de recherche');
    this.validateOwnership(existing, schoolId, 'Tendance de recherche');

    const validated = this.validateSchema(updateResearchTrendSchema, data, 'Tendance de recherche');
    return this.trendRepo.update(id, schoolId, validated);
  }

  async deleteTrend(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Tendance de recherche');

    const existing = await this.ensureExists(this.trendRepo, id, schoolId, 'Tendance de recherche');
    this.validateOwnership(existing, schoolId, 'Tendance de recherche');

    await this.trendRepo.softDelete(id, schoolId);
  }

  async listByTopic(
    schoolId: string,
    topic: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinResearchTrend>> {
    this.validateSchoolId(schoolId);
    return this.trendRepo.findByTopic(topic, schoolId, this.validatePagination(params));
  }

  async listByPeriod(
    schoolId: string,
    period: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinResearchTrend>> {
    this.validateSchoolId(schoolId);
    return this.trendRepo.findByPeriod(period, schoolId, this.validatePagination(params));
  }

  async listTopTrends(
    schoolId: string,
    limit: number = 10,
    period?: string,
  ): Promise<GedkinResearchTrend[]> {
    this.validateSchoolId(schoolId);
    this.validateRange(limit, 1, 100, 'limit', 'Tendance de recherche');
    return this.trendRepo.findTopTrends(schoolId, limit, period);
  }

  async getTrendStats(
    schoolId: string,
  ): Promise<{
    totalTrends: number;
    averageTrendScore: number;
    averageGrowthRate: number;
    topTopics: Array<{ topic: string; trendScore: number }>;
  }> {
    this.validateSchoolId(schoolId);
    const trends = await this.trendRepo.findAll(schoolId, { limit: 1000 });

    const totalTrendScore = trends.data.reduce((sum, trend) => sum + trend.trendScore, 0);
    const totalGrowthRate = trends.data.reduce((sum, trend) => sum + trend.growthRate, 0);

    const topTopics = trends.data
      .sort((a, b) => b.trendScore - a.trendScore)
      .slice(0, 10)
      .map((trend) => ({ topic: trend.topic, trendScore: trend.trendScore }));

    return {
      totalTrends: trends.total,
      averageTrendScore: trends.total > 0 ? totalTrendScore / trends.total : 0,
      averageGrowthRate: trends.total > 0 ? totalGrowthRate / trends.total : 0,
      topTopics,
    };
  }
}