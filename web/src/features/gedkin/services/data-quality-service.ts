import {
  ValidationError,
  NotFoundError,
} from '@educi/errors';
import {
  createDataQualitySchema,
  updateDataQualitySchema,
} from '../validators/gedkin';
import type {
  GedkinDataQuality_,
} from '@educi/types';
import type {
  GedkinDataQualityRepository,
} from '../repositories/data-quality-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';
import { BaseGedkinService, type GedkinServiceConfig } from './base-gedkin-service';

// ============================================================================
// Data Quality Service
// ============================================================================

export class DataQualityService extends BaseGedkinService {
  constructor(
    private readonly qualityRepo: GedkinDataQualityRepository,
    config?: GedkinServiceConfig,
  ) {
    super(config);
  }

  async listQualityChecks(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinDataQuality_>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.qualityRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getQualityCheck(schoolId: string, id: string): Promise<GedkinDataQuality_> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Contrôle qualité');
    return this.ensureExists(this.qualityRepo, id, schoolId, 'Contrôle qualité');
  }

  async createQualityCheck(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinDataQuality_> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['domainId', 'productId', 'completeness', 'consistency', 'freshness', 'accuracy', 'overallScore', 'issues'], 'Contrôle qualité');

    const validated = this.validateSchema(createDataQualitySchema, data, 'Contrôle qualité');

    this.validateRange(validated.completeness, 0, 100, 'completeness', 'Contrôle qualité');
    this.validateRange(validated.consistency, 0, 100, 'consistency', 'Contrôle qualité');
    this.validateRange(validated.freshness, 0, 100, 'freshness', 'Contrôle qualité');
    this.validateRange(validated.accuracy, 0, 100, 'accuracy', 'Contrôle qualité');
    this.validateRange(validated.overallScore, 0, 100, 'overallScore', 'Contrôle qualité');

    return this.qualityRepo.create(
      {
        domainId: validated.domainId,
        productId: validated.productId,
        completeness: validated.completeness,
        consistency: validated.consistency,
        freshness: validated.freshness,
        accuracy: validated.accuracy,
        overallScore: validated.overallScore,
        issues: validated.issues,
        checkedAt: new Date().toISOString(),
      },
      schoolId,
    );
  }

  async updateQualityCheck(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinDataQuality_> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Contrôle qualité');

    const existing = await this.ensureExists(this.qualityRepo, id, schoolId, 'Contrôle qualité');
    this.validateOwnership(existing, schoolId, 'Contrôle qualité');

    const validated = this.validateSchema(updateDataQualitySchema, data, 'Contrôle qualité');
    return this.qualityRepo.update(id, schoolId, validated);
  }

  async deleteQualityCheck(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Contrôle qualité');

    const existing = await this.ensureExists(this.qualityRepo, id, schoolId, 'Contrôle qualité');
    this.validateOwnership(existing, schoolId, 'Contrôle qualité');

    await this.qualityRepo.softDelete(id, schoolId);
  }

  async listByDomain(
    schoolId: string,
    domainId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinDataQuality_>> {
    this.validateSchoolId(schoolId);
    return this.qualityRepo.findByDomainId(domainId, schoolId, this.validatePagination(params));
  }

  async listByProduct(
    schoolId: string,
    productId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinDataQuality_>> {
    this.validateSchoolId(schoolId);
    return this.qualityRepo.findByProductId(productId, schoolId, this.validatePagination(params));
  }

  async getOverallQualityScore(
    schoolId: string,
    domainId: string,
  ): Promise<number> {
    this.validateSchoolId(schoolId);
    const results = await this.qualityRepo.findByDomainId(domainId, schoolId, { limit: 1000 });
    if (results.data.length === 0) return 0;
    const sum = results.data.reduce((acc, item) => acc + item.overallScore, 0);
    return sum / results.data.length;
  }

  async getQualityTrends(
    schoolId: string,
    productId: string,
  ): Promise<Array<{ date: string; score: number }>> {
    this.validateSchoolId(schoolId);
    const results = await this.qualityRepo.findByProductId(productId, schoolId, { limit: 100 });
    return results.data
      .map((item) => ({ date: item.checkedAt, score: item.overallScore }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
}