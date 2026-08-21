import type {
  GedkinEntityResolution,
} from '@educi/types';
import type {
  GedkinCrudRepository,
  GedkinBaseEntity,
  PaginatedResult,
  PaginationParams,
} from './base-gedkin-repository';

export interface GedkinEntityResolutionRepository extends GedkinCrudRepository<GedkinEntityResolution & GedkinBaseEntity> {
  findBySourceEntityId(sourceEntityId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinEntityResolution & GedkinBaseEntity>>;
  findByTargetEntityId(targetEntityId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinEntityResolution & GedkinBaseEntity>>;
  findByMinConfidence(minConfidence: number, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinEntityResolution & GedkinBaseEntity>>;
}