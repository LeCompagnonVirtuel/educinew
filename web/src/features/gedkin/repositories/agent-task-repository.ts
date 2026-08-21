import type {
  GedkinAgentTask,
} from '@educi/types';
import type {
  GedkinCrudRepository,
  GedkinBaseEntity,
  PaginatedResult,
  PaginationParams,
} from './base-gedkin-repository';

export interface GedkinAgentTaskRepository extends GedkinCrudRepository<GedkinAgentTask & GedkinBaseEntity> {
  findByAgentId(agentId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinAgentTask & GedkinBaseEntity>>;
  findByStatus(status: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinAgentTask & GedkinBaseEntity>>;
  findByPriority(priority: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinAgentTask & GedkinBaseEntity>>;
}