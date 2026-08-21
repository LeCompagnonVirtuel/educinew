import {
  GecirapRootCauseError,
  GecirapRecommendationError,
} from '@educi/errors';
import {
  createRootCauseAnalysisSchema,
  updateRootCauseAnalysisSchema,
  createRecommendationSchema,
  updateRecommendationSchema,
} from '../validators/aiops';
import type {
  GecirapRootCauseAnalysis,
  GecirapRecommendation,
  RootCauseAnalysisRepository,
  RecommendationRepository,
} from '../repositories/aiops-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// Root Cause Service
// ============================================================================

export class RootCauseService extends BaseGecirapService {
  constructor(
    private readonly rcaRepo: RootCauseAnalysisRepository,
    private readonly recommendationRepo: RecommendationRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  // ─── Root Cause Analyses ─────────────────────────────────────────────────

  async listAnalyses(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapRootCauseAnalysis>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.rcaRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getAnalysis(schoolId: string, id: string): Promise<GecirapRootCauseAnalysis> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Analyse cause racine');
    return this.ensureExists(this.rcaRepo, id, schoolId, 'Analyse cause racine');
  }

  async createAnalysis(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapRootCauseAnalysis> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['correlation_id', 'analysis_type', 'root_cause', 'confidence_score', 'evidence'], 'Analyse cause racine');

    const validated = this.validateSchema(createRootCauseAnalysisSchema, data, 'Analyse cause racine');

    this.validateRange(validated.confidence_score, 0, 1, 'confidence_score', 'Analyse cause racine');

    return this.rcaRepo.create(
      {
        correlation_id: validated.correlation_id,
        analysis_type: validated.analysis_type,
        root_cause: validated.root_cause,
        confidence_score: validated.confidence_score,
        evidence: validated.evidence,
        recommendations: validated.recommendations,
        analyzed_at: new Date().toISOString(),
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateAnalysis(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapRootCauseAnalysis> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Analyse cause racine');

    const existing = await this.ensureExists(this.rcaRepo, id, schoolId, 'Analyse cause racine');
    this.validateOwnership(existing, schoolId, 'Analyse cause racine');

    const validated = this.validateSchema(updateRootCauseAnalysisSchema, data, 'Analyse cause racine');
    return this.rcaRepo.update(id, schoolId, validated);
  }

  async deleteAnalysis(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Analyse cause racine');

    const existing = await this.ensureExists(this.rcaRepo, id, schoolId, 'Analyse cause racine');
    this.validateOwnership(existing, schoolId, 'Analyse cause racine');

    await this.rcaRepo.softDelete(id, schoolId);
  }

  async listByCorrelation(
    schoolId: string,
    correlationId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapRootCauseAnalysis>> {
    this.validateSchoolId(schoolId);
    this.validateId(correlationId, 'Corrélation');
    return this.rcaRepo.findByCorrelationId(correlationId, schoolId, this.validatePagination(params));
  }

  async listByAnalysisType(
    schoolId: string,
    analysisType: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapRootCauseAnalysis>> {
    this.validateSchoolId(schoolId);
    return this.rcaRepo.findByAnalysisType(analysisType, schoolId, this.validatePagination(params));
  }

  async getHighConfidenceAnalyses(
    schoolId: string,
    minScore = 0.8,
  ): Promise<GecirapRootCauseAnalysis[]> {
    this.validateSchoolId(schoolId);
    return this.rcaRepo.findHighConfidence(schoolId, minScore);
  }

  // ─── Recommendations ─────────────────────────────────────────────────────

  async listRecommendations(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapRecommendation>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.recommendationRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getRecommendation(schoolId: string, id: string): Promise<GecirapRecommendation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Recommandation');
    return this.ensureExists(this.recommendationRepo, id, schoolId, 'Recommandation');
  }

  async createRecommendation(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapRecommendation> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['recommendation_type', 'title', 'description', 'priority', 'status'], 'Recommandation');

    const validated = this.validateSchema(createRecommendationSchema, data, 'Recommandation');

    return this.recommendationRepo.create(
      {
        recommendation_type: validated.recommendation_type,
        title: validated.title,
        description: validated.description,
        priority: validated.priority,
        resource_type: validated.resource_type,
        resource_id: validated.resource_id,
        estimated_impact: validated.estimated_impact,
        status: validated.status,
        created_at: new Date().toISOString(),
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateRecommendation(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapRecommendation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Recommandation');

    const existing = await this.ensureExists(this.recommendationRepo, id, schoolId, 'Recommandation');
    this.validateOwnership(existing, schoolId, 'Recommandation');

    const validated = this.validateSchema(updateRecommendationSchema, data, 'Recommandation');
    return this.recommendationRepo.update(id, schoolId, validated);
  }

  async deleteRecommendation(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Recommandation');

    const existing = await this.ensureExists(this.recommendationRepo, id, schoolId, 'Recommandation');
    this.validateOwnership(existing, schoolId, 'Recommandation');

    await this.recommendationRepo.softDelete(id, schoolId);
  }

  async listByType(
    schoolId: string,
    recommendationType: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapRecommendation>> {
    this.validateSchoolId(schoolId);
    return this.recommendationRepo.findByRecommendationType(recommendationType, schoolId, this.validatePagination(params));
  }

  async listByPriority(
    schoolId: string,
    priority: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapRecommendation>> {
    this.validateSchoolId(schoolId);
    return this.recommendationRepo.findByPriority(priority, schoolId, this.validatePagination(params));
  }

  async listByStatus(
    schoolId: string,
    status: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapRecommendation>> {
    this.validateSchoolId(schoolId);
    return this.recommendationRepo.findByStatus(status, schoolId, this.validatePagination(params));
  }

  async getRootCauseOverview(schoolId: string): Promise<{
    totalAnalyses: number;
    highConfidence: number;
    totalRecommendations: number;
    pendingRecommendations: number;
    byAnalysisType: Record<string, number>;
    byPriority: Record<string, number>;
  }> {
    this.validateSchoolId(schoolId);

    const analyses = await this.rcaRepo.findAll(schoolId, { limit: 500 });
    const highConf = await this.rcaRepo.findHighConfidence(schoolId);
    const recommendations = await this.recommendationRepo.findAll(schoolId, { limit: 500 });
    const pending = await this.recommendationRepo.findByStatus('pending', schoolId, { limit: 1 });

    const byAnalysisType: Record<string, number> = {};
    const byPriority: Record<string, number> = {};

    for (const analysis of analyses.data) {
      byAnalysisType[analysis.analysis_type] = (byAnalysisType[analysis.analysis_type] ?? 0) + 1;
    }

    for (const rec of recommendations.data) {
      byPriority[rec.priority] = (byPriority[rec.priority] ?? 0) + 1;
    }

    return {
      totalAnalyses: analyses.total,
      highConfidence: highConf.length,
      totalRecommendations: recommendations.total,
      pendingRecommendations: pending.total,
      byAnalysisType,
      byPriority,
    };
  }
}
