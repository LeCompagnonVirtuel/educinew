import type {
  GedkinDataset_,
} from '@educi/types';
import type {
  GedkinCrudRepository,
  GedkinBaseEntity,
  PaginatedResult,
  PaginationParams,
} from './base-gedkin-repository';

export interface GedkinDatasetRepository extends GedkinCrudRepository<GedkinDataset_ & GedkinBaseEntity> {
  findByType(type: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinDataset_ & GedkinBaseEntity>>;
  findByTags(tags: string[], schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinDataset_ & GedkinBaseEntity>>;
}