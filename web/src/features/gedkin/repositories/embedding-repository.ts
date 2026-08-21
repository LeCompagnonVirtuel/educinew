import type {
  GedkinEmbedding,
  GedkinSemanticSearch,
} from '@educi/types';
import type {
  GedkinCrudRepository,
  GedkinBaseEntity,
  PaginatedResult,
  PaginationParams,
} from './base-gedkin-repository';

export interface GedkinEmbeddingRepository extends GedkinCrudRepository<GedkinEmbedding & GedkinBaseEntity> {
  findByEntityType(entityType: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinEmbedding & GedkinBaseEntity>>;
  findByModel(model: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinEmbedding & GedkinBaseEntity>>;
}

export interface GedkinSemanticSearchRepository extends GedkinCrudRepository<GedkinSemanticSearch & GedkinBaseEntity> {
  findBySearchType(searchType: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinSemanticSearch & GedkinBaseEntity>>;
}