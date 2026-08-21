import type {
  GedkinAIAgent,
} from '@educi/types';
import type {
  GedkinCrudRepository,
  GedkinBaseEntity,
  PaginatedResult,
  PaginationParams,
} from './base-gedkin-repository';

export interface GedkinAIAgentRepository extends GedkinCrudRepository<GedkinAIAgent & GedkinBaseEntity> {
  findByType(type: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinAIAgent & GedkinBaseEntity>>;
  findByStatus(status: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinAIAgent & GedkinBaseEntity>>;
  findActive(schoolId: string): Promise<(GedkinAIAgent & GedkinBaseEntity)[]>;
  updateLastActive(id: string, schoolId: string): Promise<GedkinAIAgent & GedkinBaseEntity>;
}