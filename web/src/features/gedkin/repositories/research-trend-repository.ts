import type {
  GedkinResearchTrend,
} from '@educi/types';
import type {
  GedkinCrudRepository,
  GedkinBaseEntity,
  PaginatedResult,
  PaginationParams,
} from './base-gedkin-repository';

export interface GedkinResearchTrendRepository extends GedkinCrudRepository<GedkinResearchTrend & GedkinBaseEntity> {
  findByTopic(topic: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinResearchTrend & GedkinBaseEntity>>;
  findByPeriod(period: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinResearchTrend & GedkinBaseEntity>>;
  findTopTrends(schoolId: string, limit: number, period?: string): Promise<(GedkinResearchTrend & GedkinBaseEntity)[]>;
}