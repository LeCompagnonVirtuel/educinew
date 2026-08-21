import {
  ValidationError,
  NotFoundError,
} from '@educi/errors';
import {
  createCitationSchema,
  updateCitationSchema,
} from '../validators/gedkin';
import type {
  GedkinCitation,
} from '@educi/types';
import type {
  GedkinCitationRepository,
} from '../repositories/citation-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';
import { BaseGedkinService, type GedkinServiceConfig } from './base-gedkin-service';

// ============================================================================
// Citation Service
// ============================================================================

export class CitationService extends BaseGedkinService {
  constructor(
    private readonly citationRepo: GedkinCitationRepository,
    config?: GedkinServiceConfig,
  ) {
    super(config);
  }

  async listCitations(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinCitation>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.citationRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getCitation(schoolId: string, id: string): Promise<GedkinCitation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Citation');
    return this.ensureExists(this.citationRepo, id, schoolId, 'Citation');
  }

  async createCitation(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinCitation> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['publicationId', 'citedByPublicationId', 'context'], 'Citation');

    const validated = this.validateSchema(createCitationSchema, data, 'Citation');

    return this.citationRepo.create(
      {
        publicationId: validated.publicationId,
        citedByPublicationId: validated.citedByPublicationId,
        context: validated.context,
        timestamp: new Date().toISOString(),
      },
      schoolId,
    );
  }

  async updateCitation(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinCitation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Citation');

    const existing = await this.ensureExists(this.citationRepo, id, schoolId, 'Citation');
    this.validateOwnership(existing, schoolId, 'Citation');

    const validated = this.validateSchema(updateCitationSchema, data, 'Citation');
    return this.citationRepo.update(id, schoolId, validated);
  }

  async deleteCitation(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Citation');

    const existing = await this.ensureExists(this.citationRepo, id, schoolId, 'Citation');
    this.validateOwnership(existing, schoolId, 'Citation');

    await this.citationRepo.softDelete(id, schoolId);
  }

  async listByPublication(
    schoolId: string,
    publicationId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinCitation>> {
    this.validateSchoolId(schoolId);
    return this.citationRepo.findByPublicationId(publicationId, schoolId, this.validatePagination(params));
  }

  async listByCitedByPublication(
    schoolId: string,
    citedByPublicationId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinCitation>> {
    this.validateSchoolId(schoolId);
    return this.citationRepo.findByCitedByPublicationId(citedByPublicationId, schoolId, this.validatePagination(params));
  }

  async getCitationNetwork(
    schoolId: string,
    publicationId: string,
  ): Promise<{
    incoming: GedkinCitation[];
    outgoing: GedkinCitation[];
    totalIncoming: number;
    totalOutgoing: number;
  }> {
    this.validateSchoolId(schoolId);
    
    const incoming = await this.citationRepo.findByCitedByPublicationId(publicationId, schoolId, { limit: 1000 });
    const outgoing = await this.citationRepo.findByPublicationId(publicationId, schoolId, { limit: 1000 });

    return {
      incoming: incoming.data,
      outgoing: outgoing.data,
      totalIncoming: incoming.total,
      totalOutgoing: outgoing.total,
    };
  }

  async getCitationStats(
    schoolId: string,
  ): Promise<{
    totalCitations: number;
    averageCitationsPerPublication: number;
    mostCitedPublications: Array<{ publicationId: string; citationCount: number }>;
  }> {
    this.validateSchoolId(schoolId);
    const citations = await this.citationRepo.findAll(schoolId, { limit: 1000 });

    const citationCounts = new Map<string, number>();
    for (const citation of citations.data) {
      citationCounts.set(
        citation.publicationId,
        (citationCounts.get(citation.publicationId) ?? 0) + 1,
      );
    }

    const mostCited = Array.from(citationCounts.entries())
      .map(([publicationId, citationCount]) => ({ publicationId, citationCount }))
      .sort((a, b) => b.citationCount - a.citationCount)
      .slice(0, 10);

    return {
      totalCitations: citations.total,
      averageCitationsPerPublication: citationCounts.size > 0 ? citations.total / citationCounts.size : 0,
      mostCitedPublications: mostCited,
    };
  }
}