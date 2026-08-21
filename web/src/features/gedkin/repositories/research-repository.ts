import type {
  GedkinResearchProject,
  GedkinPublication,
  GedkinResearcherProfile,
} from '@educi/types';
import type {
  GedkinCrudRepository,
  GedkinBaseEntity,
  PaginatedResult,
  PaginationParams,
} from './base-gedkin-repository';

export interface GedkinResearchProjectRepository extends GedkinCrudRepository<GedkinResearchProject & GedkinBaseEntity> {
  findByStatus(status: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinResearchProject & GedkinBaseEntity>>;
}

export interface GedkinPublicationRepository extends GedkinCrudRepository<GedkinPublication & GedkinBaseEntity> {
  findByProjectId(projectId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinPublication & GedkinBaseEntity>>;
}

export interface GedkinResearcherProfileRepository extends GedkinCrudRepository<GedkinResearcherProfile & GedkinBaseEntity> {
  findByUserId(userId: string, schoolId: string): Promise<(GedkinResearcherProfile & GedkinBaseEntity) | null>;
}