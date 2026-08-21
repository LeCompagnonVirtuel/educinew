import type {
  GedkinExperiment,
} from '@educi/types';
import type {
  GedkinCrudRepository,
  GedkinBaseEntity,
  PaginatedResult,
  PaginationParams,
} from './base-gedkin-repository';

export interface GedkinExperimentRepository extends GedkinCrudRepository<GedkinExperiment & GedkinBaseEntity> {
  findByStatus(status: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinExperiment & GedkinBaseEntity>>;
}