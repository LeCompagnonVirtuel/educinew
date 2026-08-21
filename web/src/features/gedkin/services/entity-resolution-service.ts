import {
  ValidationError,
  NotFoundError,
} from '@educi/errors';
import {
  createEntityResolutionSchema,
  updateEntityResolutionSchema,
} from '../validators/gedkin';
import type {
  GedkinEntityResolution,
} from '@educi/types';
import type {
  GedkinEntityResolutionRepository,
} from '../repositories/entity-resolution-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';
import { BaseGedkinService, type GedkinServiceConfig } from './base-gedkin-service';

// ============================================================================
// Entity Resolution Service
// ============================================================================

export class EntityResolutionService extends BaseGedkinService {
  constructor(
    private readonly resolutionRepo: GedkinEntityResolutionRepository,
    config?: GedkinServiceConfig,
  ) {
    super(config);
  }

  async listResolutions(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinEntityResolution>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.resolutionRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getResolution(schoolId: string, id: string): Promise<GedkinEntityResolution> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Résolution d\'entité');
    return this.ensureExists(this.resolutionRepo, id, schoolId, 'Résolution d\'entité');
  }

  async createResolution(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinEntityResolution> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['sourceEntityId', 'targetEntityId', 'confidence', 'method'], 'Résolution d\'entité');

    const validated = this.validateSchema(createEntityResolutionSchema, data, 'Résolution d\'entité');
    this.validateRange(validated.confidence, 0, 1, 'confidence', 'Résolution d\'entité');

    return this.resolutionRepo.create(
      {
        sourceEntityId: validated.sourceEntityId,
        targetEntityId: validated.targetEntityId,
        confidence: validated.confidence,
        method: validated.method,
        resolvedAt: new Date().toISOString(),
      },
      schoolId,
    );
  }

  async updateResolution(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinEntityResolution> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Résolution d\'entité');

    const existing = await this.ensureExists(this.resolutionRepo, id, schoolId, 'Résolution d\'entité');
    this.validateOwnership(existing, schoolId, 'Résolution d\'entité');

    const validated = this.validateSchema(updateEntityResolutionSchema, data, 'Résolution d\'entité');
    return this.resolutionRepo.update(id, schoolId, validated);
  }

  async deleteResolution(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Résolution d\'entité');

    const existing = await this.ensureExists(this.resolutionRepo, id, schoolId, 'Résolution d\'entité');
    this.validateOwnership(existing, schoolId, 'Résolution d\'entité');

    await this.resolutionRepo.softDelete(id, schoolId);
  }

  async listBySourceEntity(
    schoolId: string,
    sourceEntityId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinEntityResolution>> {
    this.validateSchoolId(schoolId);
    return this.resolutionRepo.findBySourceEntityId(sourceEntityId, schoolId, this.validatePagination(params));
  }

  async listByTargetEntity(
    schoolId: string,
    targetEntityId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinEntityResolution>> {
    this.validateSchoolId(schoolId);
    return this.resolutionRepo.findByTargetEntityId(targetEntityId, schoolId, this.validatePagination(params));
  }

  async listHighConfidenceResolutions(
    schoolId: string,
    minConfidence: number = 0.8,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinEntityResolution>> {
    this.validateSchoolId(schoolId);
    this.validateRange(minConfidence, 0, 1, 'minConfidence', 'Résolution d\'entité');
    return this.resolutionRepo.findByMinConfidence(minConfidence, schoolId, this.validatePagination(params));
  }

  async getResolutionStats(
    schoolId: string,
  ): Promise<{
    totalResolutions: number;
    averageConfidence: number;
    byMethod: Record<string, number>;
  }> {
    this.validateSchoolId(schoolId);
    const results = await this.resolutionRepo.findAll(schoolId, { limit: 1000 });
    
    const byMethod: Record<string, number> = {};
    let totalConfidence = 0;
    for (const resolution of results.data) {
      byMethod[resolution.method] = (byMethod[resolution.method] ?? 0) + 1;
      totalConfidence += resolution.confidence;
    }

    return {
      totalResolutions: results.total,
      averageConfidence: results.total > 0 ? totalConfidence / results.total : 0,
      byMethod,
    };
  }
}