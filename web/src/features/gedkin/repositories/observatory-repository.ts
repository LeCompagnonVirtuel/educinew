import type {
  GedkinObservatoryIndicator,
  GedkinObservatoryDashboard,
} from '@educi/types';
import type {
  GedkinCrudRepository,
  GedkinBaseEntity,
  PaginatedResult,
  PaginationParams,
} from './base-gedkin-repository';

export interface GedkinObservatoryIndicatorRepository extends GedkinCrudRepository<GedkinObservatoryIndicator & GedkinBaseEntity> {
  findByCategory(category: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinObservatoryIndicator & GedkinBaseEntity>>;
  findByCountry(country: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinObservatoryIndicator & GedkinBaseEntity>>;
  findByPeriod(period: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinObservatoryIndicator & GedkinBaseEntity>>;
}

export interface GedkinObservatoryDashboardRepository extends GedkinCrudRepository<GedkinObservatoryDashboard & GedkinBaseEntity> {
  // Custom queries can be added here
}