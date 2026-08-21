import type {
  GedkinKnowledgeEntity,
  GedkinKnowledgeRelation,
  GedkinGraphSnapshot,
} from '@educi/types';
import type {
  GedkinCrudRepository,
  GedkinBaseEntity,
  PaginatedResult,
  PaginationParams,
} from './base-gedkin-repository';

export interface GedkinKnowledgeEntityRepository extends GedkinCrudRepository<GedkinKnowledgeEntity & GedkinBaseEntity> {
  findByEntityType(entityType: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinKnowledgeEntity & GedkinBaseEntity>>;
}

export interface GedkinKnowledgeRelationRepository extends GedkinCrudRepository<GedkinKnowledgeRelation & GedkinBaseEntity> {
  findByEntityId(entityId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinKnowledgeRelation & GedkinBaseEntity>>;
}

export interface GedkinGraphSnapshotRepository extends GedkinCrudRepository<GedkinGraphSnapshot & GedkinBaseEntity> {
  // Custom queries can be added here
}