import type {
  GedkinSemanticConcept,
  GedkinOntology,
  GedkinTaxonomy,
} from '@educi/types';
import type {
  GedkinCrudRepository,
  GedkinBaseEntity,
  PaginatedResult,
  PaginationParams,
} from './base-gedkin-repository';

export interface GedkinSemanticConceptRepository extends GedkinCrudRepository<GedkinSemanticConcept & GedkinBaseEntity> {
  findByOntologyId(ontologyId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinSemanticConcept & GedkinBaseEntity>>;
}

export interface GedkinOntologyRepository extends GedkinCrudRepository<GedkinOntology & GedkinBaseEntity> {
  // Custom queries can be added here
}

export interface GedkinTaxonomyRepository extends GedkinCrudRepository<GedkinTaxonomy & GedkinBaseEntity> {
  // Custom queries can be added here
}