import type {
  GedkinCapacityForecast,
  GedkinDriftDetection,
} from '@educi/types';
import type {
  GedkinCrudRepository,
  GedkinBaseEntity,
  PaginatedResult,
  PaginationParams,
} from './base-gedkin-repository';

export interface GedkinCapacityForecastRepository extends GedkinCrudRepository<GedkinCapacityForecast & GedkinBaseEntity> {
  findByResourceType(resourceType: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinCapacityForecast & GedkinBaseEntity>>;
}

export interface GedkinDriftDetectionRepository extends GedkinCrudRepository<GedkinDriftDetection & GedkinBaseEntity> {
  findByForecastId(forecastId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinDriftDetection & GedkinBaseEntity>>;
  findUnacknowledged(schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinDriftDetection & GedkinBaseEntity>>;
}