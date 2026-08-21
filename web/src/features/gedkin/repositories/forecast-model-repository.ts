import type {
  GedkinForecastModel_,
} from '@educi/types';
import type {
  GedkinCrudRepository,
  GedkinBaseEntity,
  PaginatedResult,
  PaginationParams,
} from './base-gedkin-repository';

export interface GedkinForecastModelRepository extends GedkinCrudRepository<GedkinForecastModel_ & GedkinBaseEntity> {
  findByType(type: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinForecastModel_ & GedkinBaseEntity>>;
}