import {
  ValidationError,
  NotFoundError,
} from '@educi/errors';
import {
  createSemanticConceptSchema,
  updateSemanticConceptSchema,
  createOntologySchema,
  updateOntologySchema,
  createTaxonomySchema,
  updateTaxonomySchema,
} from '../validators/gedkin';
import type {
  GedkinSemanticConcept,
  GedkinOntology,
  GedkinTaxonomy,
} from '@educi/types';
import type {
  GedkinSemanticConceptRepository,
  GedkinOntologyRepository,
  GedkinTaxonomyRepository,
} from '../repositories/semantic-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';
import { BaseGedkinService, type GedkinServiceConfig } from './base-gedkin-service';

// ============================================================================
// Semantic Service
// ============================================================================

export class SemanticService extends BaseGedkinService {
  constructor(
    private readonly conceptRepo: GedkinSemanticConceptRepository,
    private readonly ontologyRepo: GedkinOntologyRepository,
    private readonly taxonomyRepo: GedkinTaxonomyRepository,
    config?: GedkinServiceConfig,
  ) {
    super(config);
  }

  // ─── Concepts ────────────────────────────────────────────────────────────

  async listConcepts(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinSemanticConcept>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.conceptRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getConcept(schoolId: string, id: string): Promise<GedkinSemanticConcept> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Concept sémantique');
    return this.ensureExists(this.conceptRepo, id, schoolId, 'Concept sémantique');
  }

  async createConcept(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinSemanticConcept> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'description', 'language', 'synonyms', 'relatedConcepts', 'ontologyId'], 'Concept sémantique');

    const validated = this.validateSchema(createSemanticConceptSchema, data, 'Concept sémantique');

    return this.conceptRepo.create(
      {
        name: validated.name,
        description: validated.description,
        language: validated.language,
        synonyms: validated.synonyms,
        relatedConcepts: validated.relatedConcepts,
        ontologyId: validated.ontologyId,
      },
      schoolId,
    );
  }

  async updateConcept(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinSemanticConcept> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Concept sémantique');

    const existing = await this.ensureExists(this.conceptRepo, id, schoolId, 'Concept sémantique');
    this.validateOwnership(existing, schoolId, 'Concept sémantique');

    const validated = this.validateSchema(updateSemanticConceptSchema, data, 'Concept sémantique');
    return this.conceptRepo.update(id, schoolId, validated);
  }

  async deleteConcept(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Concept sémantique');

    const existing = await this.ensureExists(this.conceptRepo, id, schoolId, 'Concept sémantique');
    this.validateOwnership(existing, schoolId, 'Concept sémantique');

    await this.conceptRepo.softDelete(id, schoolId);
  }

  async listByOntology(
    schoolId: string,
    ontologyId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinSemanticConcept>> {
    this.validateSchoolId(schoolId);
    return this.conceptRepo.findByOntologyId(ontologyId, schoolId, this.validatePagination(params));
  }

  // ─── Ontologies ──────────────────────────────────────────────────────────

  async listOntologies(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinOntology>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.ontologyRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getOntology(schoolId: string, id: string): Promise<GedkinOntology> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Ontologie');
    return this.ensureExists(this.ontologyRepo, id, schoolId, 'Ontologie');
  }

  async createOntology(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinOntology> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'description', 'version', 'concepts', 'relations', 'language'], 'Ontologie');

    const validated = this.validateSchema(createOntologySchema, data, 'Ontologie');

    return this.ontologyRepo.create(
      {
        name: validated.name,
        description: validated.description,
        version: validated.version,
        concepts: validated.concepts,
        relations: validated.relations,
        language: validated.language,
      },
      schoolId,
    );
  }

  async updateOntology(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinOntology> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Ontologie');

    const existing = await this.ensureExists(this.ontologyRepo, id, schoolId, 'Ontologie');
    this.validateOwnership(existing, schoolId, 'Ontologie');

    const validated = this.validateSchema(updateOntologySchema, data, 'Ontologie');
    return this.ontologyRepo.update(id, schoolId, validated);
  }

  async deleteOntology(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Ontologie');

    const existing = await this.ensureExists(this.ontologyRepo, id, schoolId, 'Ontologie');
    this.validateOwnership(existing, schoolId, 'Ontologie');

    await this.ontologyRepo.softDelete(id, schoolId);
  }

  // ─── Taxonomies ──────────────────────────────────────────────────────────

  async listTaxonomies(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinTaxonomy>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.taxonomyRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getTaxonomy(schoolId: string, id: string): Promise<GedkinTaxonomy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Taxonomie');
    return this.ensureExists(this.taxonomyRepo, id, schoolId, 'Taxonomie');
  }

  async createTaxonomy(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinTaxonomy> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'description', 'rootConcepts', 'depth', 'language'], 'Taxonomie');

    const validated = this.validateSchema(createTaxonomySchema, data, 'Taxonomie');

    return this.taxonomyRepo.create(
      {
        name: validated.name,
        description: validated.description,
        rootConcepts: validated.rootConcepts,
        depth: validated.depth,
        language: validated.language,
      },
      schoolId,
    );
  }

  async updateTaxonomy(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinTaxonomy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Taxonomie');

    const existing = await this.ensureExists(this.taxonomyRepo, id, schoolId, 'Taxonomie');
    this.validateOwnership(existing, schoolId, 'Taxonomie');

    const validated = this.validateSchema(updateTaxonomySchema, data, 'Taxonomie');
    return this.taxonomyRepo.update(id, schoolId, validated);
  }

  async deleteTaxonomy(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Taxonomie');

    const existing = await this.ensureExists(this.taxonomyRepo, id, schoolId, 'Taxonomie');
    this.validateOwnership(existing, schoolId, 'Taxonomie');

    await this.taxonomyRepo.softDelete(id, schoolId);
  }

  async getSemanticStats(
    schoolId: string,
  ): Promise<{
    totalConcepts: number;
    totalOntologies: number;
    totalTaxonomies: number;
    byLanguage: Record<string, number>;
  }> {
    this.validateSchoolId(schoolId);

    const concepts = await this.conceptRepo.findAll(schoolId, { limit: 1000 });
    const ontologies = await this.ontologyRepo.findAll(schoolId, { limit: 1000 });
    const taxonomies = await this.taxonomyRepo.findAll(schoolId, { limit: 1000 });

    const byLanguage: Record<string, number> = {};
    for (const concept of concepts.data) {
      byLanguage[concept.language] = (byLanguage[concept.language] ?? 0) + 1;
    }

    return {
      totalConcepts: concepts.total,
      totalOntologies: ontologies.total,
      totalTaxonomies: taxonomies.total,
      byLanguage,
    };
  }
}