import type {
  GedkinForecast,
  GedkinForecastPrediction,
} from '@educi/types';
import type {
  GedkinCrudRepository,
  GedkinBaseEntity,
  PaginatedResult,
  PaginationParams,
} from './base-gedkin-repository';

export interface GedkinForecastRepository extends GedkinCrudRepository<GedkinForecast & GedkinBaseEntity> {
  findByType(type: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinForecast & GedkinBaseEntity>>;
  findByStatus(status: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinForecast & GedkinBaseEntity>>;
}

export interface GedkinForecastPredictionRepository extends GedkinCrudRepository<GedkinForecastPrediction & GedkinBaseEntity> {
  findByForecastId(forecastId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinForecastPrediction & GedkinBaseEntity>>;
}