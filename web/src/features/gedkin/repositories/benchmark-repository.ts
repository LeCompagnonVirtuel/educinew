import type {
  GedkinBenchmark,
  GedkinSDGAlignment,
} from '@educi/types';
import type {
  GedkinCrudRepository,
  GedkinBaseEntity,
  PaginatedResult,
  PaginationParams,
} from './base-gedkin-repository';

export interface GedkinBenchmarkRepository extends GedkinCrudRepository<GedkinBenchmark & GedkinBaseEntity> {
  findByPeriod(period: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinBenchmark & GedkinBaseEntity>>;
}

export interface GedkinSDGAlignmentRepository extends GedkinCrudRepository<GedkinSDGAlignment & GedkinBaseEntity> {
  findBySDGNumber(sdgNumber: number, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinSDGAlignment & GedkinBaseEntity>>;
}