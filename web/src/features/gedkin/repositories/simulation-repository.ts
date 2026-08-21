import type {
  GedkinSimulation,
} from '@educi/types';
import type {
  GedkinCrudRepository,
  GedkinBaseEntity,
  PaginatedResult,
  PaginationParams,
} from './base-gedkin-repository';

export interface GedkinSimulationRepository extends GedkinCrudRepository<GedkinSimulation & GedkinBaseEntity> {
  findByType(type: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinSimulation & GedkinBaseEntity>>;
  findByStatus(status: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinSimulation & GedkinBaseEntity>>;
}