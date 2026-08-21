import {
  ValidationError,
  NotFoundError,
} from '@educi/errors';
import {
  createEmbeddingSchema,
  updateEmbeddingSchema,
  createSemanticSearchSchema,
  updateSemanticSearchSchema,
} from '../validators/gedkin';
import type {
  GedkinEmbedding,
  GedkinSemanticSearch,
} from '@educi/types';
import type {
  GedkinEmbeddingRepository,
  GedkinSemanticSearchRepository,
} from '../repositories/embedding-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';
import { BaseGedkinService, type GedkinServiceConfig } from './base-gedkin-service';

// ============================================================================
// Embedding Service
// ============================================================================

export class EmbeddingService extends BaseGedkinService {
  constructor(
    private readonly embeddingRepo: GedkinEmbeddingRepository,
    private readonly searchRepo: GedkinSemanticSearchRepository,
    config?: GedkinServiceConfig,
  ) {
    super(config);
  }

  // ─── Embeddings ──────────────────────────────────────────────────────────

  async listEmbeddings(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinEmbedding>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.embeddingRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getEmbedding(schoolId: string, id: string): Promise<GedkinEmbedding> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Embedding');
    return this.ensureExists(this.embeddingRepo, id, schoolId, 'Embedding');
  }

  async createEmbedding(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinEmbedding> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['entityType', 'entityId', 'model', 'vector', 'dimensions'], 'Embedding');

    const validated = this.validateSchema(createEmbeddingSchema, data, 'Embedding');

    return this.embeddingRepo.create(
      {
        entityType: validated.entityType,
        entityId: validated.entityId,
        model: validated.model,
        vector: validated.vector,
        dimensions: validated.dimensions,
      },
      schoolId,
    );
  }

  async updateEmbedding(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinEmbedding> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Embedding');

    const existing = await this.ensureExists(this.embeddingRepo, id, schoolId, 'Embedding');
    this.validateOwnership(existing, schoolId, 'Embedding');

    const validated = this.validateSchema(updateEmbeddingSchema, data, 'Embedding');
    return this.embeddingRepo.update(id, schoolId, validated);
  }

  async deleteEmbedding(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Embedding');

    const existing = await this.ensureExists(this.embeddingRepo, id, schoolId, 'Embedding');
    this.validateOwnership(existing, schoolId, 'Embedding');

    await this.embeddingRepo.softDelete(id, schoolId);
  }

  async listByEntityType(
    schoolId: string,
    entityType: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinEmbedding>> {
    this.validateSchoolId(schoolId);
    return this.embeddingRepo.findByEntityType(entityType, schoolId, this.validatePagination(params));
  }

  async listByModel(
    schoolId: string,
    model: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinEmbedding>> {
    this.validateSchoolId(schoolId);
    return this.embeddingRepo.findByModel(model, schoolId, this.validatePagination(params));
  }

  // ─── Semantic Search ─────────────────────────────────────────────────────

  async listSearches(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinSemanticSearch>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.searchRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getSearch(schoolId: string, id: string): Promise<GedkinSemanticSearch> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Recherche sémantique');
    return this.ensureExists(this.searchRepo, id, schoolId, 'Recherche sémantique');
  }

  async createSearch(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinSemanticSearch> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['query', 'language', 'results', 'searchType'], 'Recherche sémantique');

    const validated = this.validateSchema(createSemanticSearchSchema, data, 'Recherche sémantique');

    return this.searchRepo.create(
      {
        query: validated.query,
        language: validated.language,
        results: validated.results,
        searchType: validated.searchType,
        timestamp: new Date().toISOString(),
      },
      schoolId,
    );
  }

  async deleteSearch(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Recherche sémantique');

    const existing = await this.ensureExists(this.searchRepo, id, schoolId, 'Recherche sémantique');
    this.validateOwnership(existing, schoolId, 'Recherche sémantique');

    await this.searchRepo.softDelete(id, schoolId);
  }

  async listBySearchType(
    schoolId: string,
    searchType: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinSemanticSearch>> {
    this.validateSchoolId(schoolId);
    return this.searchRepo.findBySearchType(searchType, schoolId, this.validatePagination(params));
  }

  async getEmbeddingStats(
    schoolId: string,
  ): Promise<{
    totalEmbeddings: number;
    totalSearches: number;
    byEntityType: Record<string, number>;
    byModel: Record<string, number>;
  }> {
    this.validateSchoolId(schoolId);

    const embeddings = await this.embeddingRepo.findAll(schoolId, { limit: 1000 });
    const searches = await this.searchRepo.findAll(schoolId, { limit: 1000 });

    const byEntityType: Record<string, number> = {};
    for (const embedding of embeddings.data) {
      byEntityType[embedding.entityType] = (byEntityType[embedding.entityType] ?? 0) + 1;
    }

    const byModel: Record<string, number> = {};
    for (const embedding of embeddings.data) {
      byModel[embedding.model] = (byModel[embedding.model] ?? 0) + 1;
    }

    return {
      totalEmbeddings: embeddings.total,
      totalSearches: searches.total,
      byEntityType,
      byModel,
    };
  }
}