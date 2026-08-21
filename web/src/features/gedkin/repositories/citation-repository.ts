import type {
  GedkinCitation,
} from '@educi/types';
import type {
  GedkinCrudRepository,
  GedkinBaseEntity,
  PaginatedResult,
  PaginationParams,
} from './base-gedkin-repository';

export interface GedkinCitationRepository extends GedkinCrudRepository<GedkinCitation & GedkinBaseEntity> {
  findByPublicationId(publicationId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinCitation & GedkinBaseEntity>>;
  findByCitedByPublicationId(citedByPublicationId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinCitation & GedkinBaseEntity>>;
}