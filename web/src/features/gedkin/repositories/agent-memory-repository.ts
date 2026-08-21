import type {
  GedkinAgentMemory,
} from '@educi/types';
import type {
  GedkinCrudRepository,
  GedkinBaseEntity,
  PaginatedResult,
  PaginationParams,
} from './base-gedkin-repository';

export interface GedkinAgentMemoryRepository extends GedkinCrudRepository<GedkinAgentMemory & GedkinBaseEntity> {
  findByAgentId(agentId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinAgentMemory & GedkinBaseEntity>>;
  findByAgentIdAndKey(agentId: string, key: string, schoolId: string): Promise<(GedkinAgentMemory & GedkinBaseEntity) | null>;
  findExpired(schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinAgentMemory & GedkinBaseEntity>>;
}