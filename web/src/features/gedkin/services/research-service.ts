import {
  ValidationError,
  NotFoundError,
} from '@educi/errors';
import {
  createResearchProjectSchema,
  updateResearchProjectSchema,
  createPublicationSchema,
  updatePublicationSchema,
  createResearcherProfileSchema,
  updateResearcherProfileSchema,
} from '../validators/gedkin';
import type {
  GedkinResearchProject,
  GedkinPublication,
  GedkinResearcherProfile,
} from '@educi/types';
import type {
  GedkinResearchProjectRepository,
  GedkinPublicationRepository,
  GedkinResearcherProfileRepository,
} from '../repositories/research-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';
import { BaseGedkinService, type GedkinServiceConfig } from './base-gedkin-service';

// ============================================================================
// Research Service
// ============================================================================

export class ResearchService extends BaseGedkinService {
  constructor(
    private readonly projectRepo: GedkinResearchProjectRepository,
    private readonly publicationRepo: GedkinPublicationRepository,
    private readonly profileRepo: GedkinResearcherProfileRepository,
    config?: GedkinServiceConfig,
  ) {
    super(config);
  }

  // ─── Projects ────────────────────────────────────────────────────────────

  async listProjects(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinResearchProject>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.projectRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getProject(schoolId: string, id: string): Promise<GedkinResearchProject> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Projet de recherche');
    return this.ensureExists(this.projectRepo, id, schoolId, 'Projet de recherche');
  }

  async createProject(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinResearchProject> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['title', 'description', 'status', 'principalInvestigator', 'coInvestigators', 'startDate', 'endDate', 'funding', 'keywords'], 'Projet de recherche');

    const validated = this.validateSchema(createResearchProjectSchema, data, 'Projet de recherche');

    return this.projectRepo.create(
      {
        title: validated.title,
        description: validated.description,
        status: validated.status,
        principalInvestigator: validated.principalInvestigator,
        coInvestigators: validated.coInvestigators,
        startDate: validated.startDate,
        endDate: validated.endDate,
        funding: validated.funding,
        keywords: validated.keywords,
      },
      schoolId,
    );
  }

  async updateProject(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinResearchProject> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Projet de recherche');

    const existing = await this.ensureExists(this.projectRepo, id, schoolId, 'Projet de recherche');
    this.validateOwnership(existing, schoolId, 'Projet de recherche');

    const validated = this.validateSchema(updateResearchProjectSchema, data, 'Projet de recherche');
    return this.projectRepo.update(id, schoolId, validated);
  }

  async deleteProject(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Projet de recherche');

    const existing = await this.ensureExists(this.projectRepo, id, schoolId, 'Projet de recherche');
    this.validateOwnership(existing, schoolId, 'Projet de recherche');

    await this.projectRepo.softDelete(id, schoolId);
  }

  async listByStatus(
    schoolId: string,
    status: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinResearchProject>> {
    this.validateSchoolId(schoolId);
    return this.projectRepo.findByStatus(status, schoolId, this.validatePagination(params));
  }

  // ─── Publications ────────────────────────────────────────────────────────

  async listPublications(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinPublication>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.publicationRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getPublication(schoolId: string, id: string): Promise<GedkinPublication> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Publication');
    return this.ensureExists(this.publicationRepo, id, schoolId, 'Publication');
  }

  async createPublication(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinPublication> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['projectId', 'title', 'authors', 'journal', 'year', 'doi', 'citations', 'status', 'abstract', 'keywords'], 'Publication');

    const validated = this.validateSchema(createPublicationSchema, data, 'Publication');

    return this.publicationRepo.create(
      {
        projectId: validated.projectId,
        title: validated.title,
        authors: validated.authors,
        journal: validated.journal,
        year: validated.year,
        doi: validated.doi,
        citations: validated.citations,
        status: validated.status,
        abstract: validated.abstract,
        keywords: validated.keywords,
      },
      schoolId,
    );
  }

  async updatePublication(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinPublication> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Publication');

    const existing = await this.ensureExists(this.publicationRepo, id, schoolId, 'Publication');
    this.validateOwnership(existing, schoolId, 'Publication');

    const validated = this.validateSchema(updatePublicationSchema, data, 'Publication');
    return this.publicationRepo.update(id, schoolId, validated);
  }

  async deletePublication(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Publication');

    const existing = await this.ensureExists(this.publicationRepo, id, schoolId, 'Publication');
    this.validateOwnership(existing, schoolId, 'Publication');

    await this.publicationRepo.softDelete(id, schoolId);
  }

  async listByProject(
    schoolId: string,
    projectId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinPublication>> {
    this.validateSchoolId(schoolId);
    return this.publicationRepo.findByProjectId(projectId, schoolId, this.validatePagination(params));
  }

  // ─── Researcher Profiles ─────────────────────────────────────────────────

  async listProfiles(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinResearcherProfile>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.profileRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getProfile(schoolId: string, id: string): Promise<GedkinResearcherProfile> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Profil chercheur');
    return this.ensureExists(this.profileRepo, id, schoolId, 'Profil chercheur');
  }

  async createProfile(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinResearcherProfile> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['userId', 'name', 'institution', 'researchAreas', 'publications', 'hIndex', 'citations', 'orcidId'], 'Profil chercheur');

    const validated = this.validateSchema(createResearcherProfileSchema, data, 'Profil chercheur');

    return this.profileRepo.create(
      {
        userId: validated.userId,
        name: validated.name,
        institution: validated.institution,
        researchAreas: validated.researchAreas,
        publications: validated.publications,
        hIndex: validated.hIndex,
        citations: validated.citations,
        orcidId: validated.orcidId,
      },
      schoolId,
    );
  }

  async updateProfile(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinResearcherProfile> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Profil chercheur');

    const existing = await this.ensureExists(this.profileRepo, id, schoolId, 'Profil chercheur');
    this.validateOwnership(existing, schoolId, 'Profil chercheur');

    const validated = this.validateSchema(updateResearcherProfileSchema, data, 'Profil chercheur');
    return this.profileRepo.update(id, schoolId, validated);
  }

  async deleteProfile(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Profil chercheur');

    const existing = await this.ensureExists(this.profileRepo, id, schoolId, 'Profil chercheur');
    this.validateOwnership(existing, schoolId, 'Profil chercheur');

    await this.profileRepo.softDelete(id, schoolId);
  }

  async listByUser(
    schoolId: string,
    userId: string,
  ): Promise<GedkinResearcherProfile | null> {
    this.validateSchoolId(schoolId);
    return this.profileRepo.findByUserId(userId, schoolId);
  }

  async getResearchStats(
    schoolId: string,
  ): Promise<{
    totalProjects: number;
    totalPublications: number;
    totalProfiles: number;
    byStatus: Record<string, number>;
    totalCitations: number;
  }> {
    this.validateSchoolId(schoolId);

    const projects = await this.projectRepo.findAll(schoolId, { limit: 1000 });
    const publications = await this.publicationRepo.findAll(schoolId, { limit: 1000 });
    const profiles = await this.profileRepo.findAll(schoolId, { limit: 1000 });

    const byStatus: Record<string, number> = {};
    for (const project of projects.data) {
      byStatus[project.status] = (byStatus[project.status] ?? 0) + 1;
    }

    const totalCitations = publications.data.reduce((sum, pub) => sum + pub.citations, 0);

    return {
      totalProjects: projects.total,
      totalPublications: publications.total,
      totalProfiles: profiles.total,
      byStatus,
      totalCitations,
    };
  }
}