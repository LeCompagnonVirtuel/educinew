import {
  ValidationError,
  NotFoundError,
} from '@educi/errors';
import {
  createCopilotQuerySchema,
  updateCopilotQuerySchema,
  createCopilotResponseSchema,
  updateCopilotResponseSchema,
  createCopilotConversationSchema,
  updateCopilotConversationSchema,
  createCopilotSourceSchema,
  updateCopilotSourceSchema,
  createCopilotApprovalSchema,
  updateCopilotApprovalSchema,
} from '../validators/gedkin';
import type {
  GedkinCopilotQuery,
  GedkinCopilotResponse,
  GedkinCopilotConversation,
  GedkinCopilotSource,
  GedkinCopilotApproval,
} from '@educi/types';
import type {
  GedkinCopilotQueryRepository,
  GedkinCopilotResponseRepository,
  GedkinCopilotConversationRepository,
  GedkinCopilotSourceRepository,
  GedkinCopilotApprovalRepository,
} from '../repositories/copilot-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';
import { BaseGedkinService, type GedkinServiceConfig } from './base-gedkin-service';

// ============================================================================
// Copilot Service
// ============================================================================

export class CopilotService extends BaseGedkinService {
  constructor(
    private readonly queryRepo: GedkinCopilotQueryRepository,
    private readonly responseRepo: GedkinCopilotResponseRepository,
    private readonly conversationRepo: GedkinCopilotConversationRepository,
    private readonly sourceRepo: GedkinCopilotSourceRepository,
    private readonly approvalRepo: GedkinCopilotApprovalRepository,
    config?: GedkinServiceConfig,
  ) {
    super(config);
  }

  // ─── Queries ─────────────────────────────────────────────────────────────

  async listQueries(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinCopilotQuery>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.queryRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getQuery(schoolId: string, id: string): Promise<GedkinCopilotQuery> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Requête copilote');
    return this.ensureExists(this.queryRepo, id, schoolId, 'Requête copilote');
  }

  async createQuery(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinCopilotQuery> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['userId', 'query', 'queryType', 'language', 'status'], 'Requête copilote');

    const validated = this.validateSchema(createCopilotQuerySchema, data, 'Requête copilote');

    return this.queryRepo.create(
      {
        userId: validated.userId,
        query: validated.query,
        queryType: validated.queryType,
        language: validated.language,
        status: validated.status,
      },
      schoolId,
    );
  }

  async updateQuery(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinCopilotQuery> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Requête copilote');

    const existing = await this.ensureExists(this.queryRepo, id, schoolId, 'Requête copilote');
    this.validateOwnership(existing, schoolId, 'Requête copilote');

    const validated = this.validateSchema(updateCopilotQuerySchema, data, 'Requête copilote');
    return this.queryRepo.update(id, schoolId, validated);
  }

  async deleteQuery(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Requête copilote');

    const existing = await this.ensureExists(this.queryRepo, id, schoolId, 'Requête copilote');
    this.validateOwnership(existing, schoolId, 'Requête copilote');

    await this.queryRepo.softDelete(id, schoolId);
  }

  async listByUser(
    schoolId: string,
    userId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinCopilotQuery>> {
    this.validateSchoolId(schoolId);
    return this.queryRepo.findByUserId(userId, schoolId, this.validatePagination(params));
  }

  async listByQueryType(
    schoolId: string,
    queryType: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinCopilotQuery>> {
    this.validateSchoolId(schoolId);
    return this.queryRepo.findByQueryType(queryType, schoolId, this.validatePagination(params));
  }

  // ─── Responses ───────────────────────────────────────────────────────────

  async listResponses(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinCopilotResponse>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.responseRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getResponse(schoolId: string, id: string): Promise<GedkinCopilotResponse> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Réponse copilote');
    return this.ensureExists(this.responseRepo, id, schoolId, 'Réponse copilote');
  }

  async createResponse(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinCopilotResponse> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['queryId', 'answer', 'responseTypes', 'sources', 'citations', 'confidence', 'provenance', 'processingTime'], 'Réponse copilote');

    const validated = this.validateSchema(createCopilotResponseSchema, data, 'Réponse copilote');
    this.validateRange(validated.confidence, 0, 1, 'confidence', 'Réponse copilote');

    return this.responseRepo.create(
      {
        queryId: validated.queryId,
        answer: validated.answer,
        responseTypes: validated.responseTypes,
        sources: validated.sources,
        citations: validated.citations,
        confidence: validated.confidence,
        provenance: validated.provenance,
        processingTime: validated.processingTime,
      },
      schoolId,
    );
  }

  async updateResponse(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinCopilotResponse> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Réponse copilote');

    const existing = await this.ensureExists(this.responseRepo, id, schoolId, 'Réponse copilote');
    this.validateOwnership(existing, schoolId, 'Réponse copilote');

    const validated = this.validateSchema(updateCopilotResponseSchema, data, 'Réponse copilote');
    return this.responseRepo.update(id, schoolId, validated);
  }

  async deleteResponse(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Réponse copilote');

    const existing = await this.ensureExists(this.responseRepo, id, schoolId, 'Réponse copilote');
    this.validateOwnership(existing, schoolId, 'Réponse copilote');

    await this.responseRepo.softDelete(id, schoolId);
  }

  async listByQuery(
    schoolId: string,
    queryId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinCopilotResponse>> {
    this.validateSchoolId(schoolId);
    return this.responseRepo.findByQueryId(queryId, schoolId, this.validatePagination(params));
  }

  // ─── Conversations ───────────────────────────────────────────────────────

  async listConversations(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinCopilotConversation>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.conversationRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getConversation(schoolId: string, id: string): Promise<GedkinCopilotConversation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Conversation copilote');
    return this.ensureExists(this.conversationRepo, id, schoolId, 'Conversation copilote');
  }

  async createConversation(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinCopilotConversation> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['userId', 'queries', 'title'], 'Conversation copilote');

    const validated = this.validateSchema(createCopilotConversationSchema, data, 'Conversation copilote');

    return this.conversationRepo.create(
      {
        userId: validated.userId,
        queries: validated.queries,
        title: validated.title,
      },
      schoolId,
    );
  }

  async updateConversation(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinCopilotConversation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Conversation copilote');

    const existing = await this.ensureExists(this.conversationRepo, id, schoolId, 'Conversation copilote');
    this.validateOwnership(existing, schoolId, 'Conversation copilote');

    const validated = this.validateSchema(updateCopilotConversationSchema, data, 'Conversation copilote');
    return this.conversationRepo.update(id, schoolId, validated);
  }

  async deleteConversation(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Conversation copilote');

    const existing = await this.ensureExists(this.conversationRepo, id, schoolId, 'Conversation copilote');
    this.validateOwnership(existing, schoolId, 'Conversation copilote');

    await this.conversationRepo.softDelete(id, schoolId);
  }

  async listByUserForConversations(
    schoolId: string,
    userId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinCopilotConversation>> {
    this.validateSchoolId(schoolId);
    return this.conversationRepo.findByUserId(userId, schoolId, this.validatePagination(params));
  }

  // ─── Sources ─────────────────────────────────────────────────────────────

  async listSources(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinCopilotSource>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.sourceRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getSource(schoolId: string, id: string): Promise<GedkinCopilotSource> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Source copilote');
    return this.ensureExists(this.sourceRepo, id, schoolId, 'Source copilote');
  }

  async createSource(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinCopilotSource> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['type', 'entityId', 'entityName', 'relevance', 'excerpt', 'url'], 'Source copilote');

    const validated = this.validateSchema(createCopilotSourceSchema, data, 'Source copilote');
    this.validateRange(validated.relevance, 0, 1, 'relevance', 'Source copilote');

    return this.sourceRepo.create(
      {
        type: validated.type,
        entityId: validated.entityId,
        entityName: validated.entityName,
        relevance: validated.relevance,
        excerpt: validated.excerpt,
        url: validated.url,
      },
      schoolId,
    );
  }

  async updateSource(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinCopilotSource> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Source copilote');

    const existing = await this.ensureExists(this.sourceRepo, id, schoolId, 'Source copilote');
    this.validateOwnership(existing, schoolId, 'Source copilote');

    const validated = this.validateSchema(updateCopilotSourceSchema, data, 'Source copilote');
    return this.sourceRepo.update(id, schoolId, validated);
  }

  async deleteSource(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Source copilote');

    const existing = await this.ensureExists(this.sourceRepo, id, schoolId, 'Source copilote');
    this.validateOwnership(existing, schoolId, 'Source copilote');

    await this.sourceRepo.softDelete(id, schoolId);
  }

  async listByType(
    schoolId: string,
    type: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinCopilotSource>> {
    this.validateSchoolId(schoolId);
    return this.sourceRepo.findByType(type, schoolId, this.validatePagination(params));
  }

  // ─── Approvals ───────────────────────────────────────────────────────────

  async listApprovals(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinCopilotApproval>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.approvalRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getApproval(schoolId: string, id: string): Promise<GedkinCopilotApproval> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Approbation copilote');
    return this.ensureExists(this.approvalRepo, id, schoolId, 'Approbation copilote');
  }

  async createApproval(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinCopilotApproval> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['queryId', 'responseId', 'approvedBy', 'status', 'reason'], 'Approbation copilote');

    const validated = this.validateSchema(createCopilotApprovalSchema, data, 'Approbation copilote');

    return this.approvalRepo.create(
      {
        queryId: validated.queryId,
        responseId: validated.responseId,
        approvedBy: validated.approvedBy,
        status: validated.status,
        reason: validated.reason,
        timestamp: new Date().toISOString(),
      },
      schoolId,
    );
  }

  async updateApproval(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinCopilotApproval> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Approbation copilote');

    const existing = await this.ensureExists(this.approvalRepo, id, schoolId, 'Approbation copilote');
    this.validateOwnership(existing, schoolId, 'Approbation copilote');

    const validated = this.validateSchema(updateCopilotApprovalSchema, data, 'Approbation copilote');
    return this.approvalRepo.update(id, schoolId, validated);
  }

  async deleteApproval(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Approbation copilote');

    const existing = await this.ensureExists(this.approvalRepo, id, schoolId, 'Approbation copilote');
    this.validateOwnership(existing, schoolId, 'Approbation copilote');

    await this.approvalRepo.softDelete(id, schoolId);
  }

  async listByQueryForApprovals(
    schoolId: string,
    queryId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinCopilotApproval>> {
    this.validateSchoolId(schoolId);
    return this.approvalRepo.findByQueryId(queryId, schoolId, this.validatePagination(params));
  }

  async getCopilotStats(
    schoolId: string,
  ): Promise<{
    totalQueries: number;
    totalResponses: number;
    totalConversations: number;
    totalApprovals: number;
    byQueryType: Record<string, number>;
    averageConfidence: number;
  }> {
    this.validateSchoolId(schoolId);

    const queries = await this.queryRepo.findAll(schoolId, { limit: 1000 });
    const responses = await this.responseRepo.findAll(schoolId, { limit: 1000 });
    const conversations = await this.conversationRepo.findAll(schoolId, { limit: 1000 });
    const approvals = await this.approvalRepo.findAll(schoolId, { limit: 1000 });

    const byQueryType: Record<string, number> = {};
    for (const query of queries.data) {
      byQueryType[query.queryType] = (byQueryType[query.queryType] ?? 0) + 1;
    }

    const totalConfidence = responses.data.reduce((sum, response) => sum + response.confidence, 0);

    return {
      totalQueries: queries.total,
      totalResponses: responses.total,
      totalConversations: conversations.total,
      totalApprovals: approvals.total,
      byQueryType,
      averageConfidence: responses.total > 0 ? totalConfidence / responses.total : 0,
    };
  }
}