import type {
  GedkinPolicy,
  GedkinPolicySimulation,
} from '@educi/types';
import type {
  GedkinCrudRepository,
  GedkinBaseEntity,
  PaginatedResult,
  PaginationParams,
} from './base-gedkin-repository';

export interface GedkinPolicyRepository extends GedkinCrudRepository<GedkinPolicy & GedkinBaseEntity> {
  findByStatus(status: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinPolicy & GedkinBaseEntity>>;
  findByCategory(category: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinPolicy & GedkinBaseEntity>>;
}

export interface GedkinPolicySimulationRepository extends GedkinCrudRepository<GedkinPolicySimulation & GedkinBaseEntity> {
  findByPolicyId(policyId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinPolicySimulation & GedkinBaseEntity>>;
}