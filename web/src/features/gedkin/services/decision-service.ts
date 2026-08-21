import {
  ValidationError,
  NotFoundError,
} from '@educi/errors';
import {
  createDecisionRecommendationSchema,
  updateDecisionRecommendationSchema,
  createImpactAnalysisSchema,
  updateImpactAnalysisSchema,
} from '../validators/gedkin';
import type {
  GedkinDecisionRecommendation,
  GedkinImpactAnalysis,
} from '@educi/types';
import type {
  GedkinDecisionRecommendationRepository,
  GedkinImpactAnalysisRepository,
} from '../repositories/decision-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';
import { BaseGedkinService, type GedkinServiceConfig } from './base-gedkin-service';

// ============================================================================
// Decision Service
// ============================================================================

export class DecisionService extends BaseGedkinService {
  constructor(
    private readonly recommendationRepo: GedkinDecisionRecommendationRepository,
    private readonly impactRepo: GedkinImpactAnalysisRepository,
    config?: GedkinServiceConfig,
  ) {
    super(config);
  }

  // ─── Recommendations ─────────────────────────────────────────────────────

  async listRecommendations(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinDecisionRecommendation>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.recommendationRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getRecommendation(schoolId: string, id: string): Promise<GedkinDecisionRecommendation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Recommandation');
    return this.ensureExists(this.recommendationRepo, id, schoolId, 'Recommandation');
  }

  async createRecommendation(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinDecisionRecommendation> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['title', 'description', 'options', 'analysisType', 'confidence', 'evidence', 'risks', 'benefits'], 'Recommandation');

    const validated = this.validateSchema(createDecisionRecommendationSchema, data, 'Recommandation');
    this.validateRange(validated.confidence, 0, 1, 'confidence', 'Recommandation');

    return this.recommendationRepo.create(
      {
        title: validated.title,
        description: validated.description,
        options: validated.options,
        analysisType: validated.analysisType,
        confidence: validated.confidence,
        evidence: validated.evidence,
        risks: validated.risks,
        benefits: validated.benefits,
      },
      schoolId,
    );
  }

  async updateRecommendation(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinDecisionRecommendation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Recommandation');

    const existing = await this.ensureExists(this.recommendationRepo, id, schoolId, 'Recommandation');
    this.validateOwnership(existing, schoolId, 'Recommandation');

    const validated = this.validateSchema(updateDecisionRecommendationSchema, data, 'Recommandation');
    return this.recommendationRepo.update(id, schoolId, validated);
  }

  async deleteRecommendation(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Recommandation');

    const existing = await this.ensureExists(this.recommendationRepo, id, schoolId, 'Recommandation');
    this.validateOwnership(existing, schoolId, 'Recommandation');

    await this.recommendationRepo.softDelete(id, schoolId);
  }

  async listByAnalysisType(
    schoolId: string,
    analysisType: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinDecisionRecommendation>> {
    this.validateSchoolId(schoolId);
    return this.recommendationRepo.findByAnalysisType(analysisType, schoolId, this.validatePagination(params));
  }

  // ─── Impact Analysis ─────────────────────────────────────────────────────

  async listImpactAnalyses(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinImpactAnalysis>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.impactRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getImpactAnalysis(schoolId: string, id: string): Promise<GedkinImpactAnalysis> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Analyse d\'impact');
    return this.ensureExists(this.impactRepo, id, schoolId, 'Analyse d\'impact');
  }

  async createImpactAnalysis(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinImpactAnalysis> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['policyId', 'dimension', 'baselineValue', 'projectedValue', 'impactScore', 'confidence', 'timeframe'], 'Analyse d\'impact');

    const validated = this.validateSchema(createImpactAnalysisSchema, data, 'Analyse d\'impact');
    this.validateRange(validated.confidence, 0, 1, 'confidence', 'Analyse d\'impact');

    return this.impactRepo.create(
      {
        policyId: validated.policyId,
        dimension: validated.dimension,
        baselineValue: validated.baselineValue,
        projectedValue: validated.projectedValue,
        impactScore: validated.impactScore,
        confidence: validated.confidence,
        timeframe: validated.timeframe,
      },
      schoolId,
    );
  }

  async updateImpactAnalysis(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinImpactAnalysis> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Analyse d\'impact');

    const existing = await this.ensureExists(this.impactRepo, id, schoolId, 'Analyse d\'impact');
    this.validateOwnership(existing, schoolId, 'Analyse d\'impact');

    const validated = this.validateSchema(updateImpactAnalysisSchema, data, 'Analyse d\'impact');
    return this.impactRepo.update(id, schoolId, validated);
  }

  async deleteImpactAnalysis(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Analyse d\'impact');

    const existing = await this.ensureExists(this.impactRepo, id, schoolId, 'Analyse d\'impact');
    this.validateOwnership(existing, schoolId, 'Analyse d\'impact');

    await this.impactRepo.softDelete(id, schoolId);
  }

  async listByPolicy(
    schoolId: string,
    policyId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinImpactAnalysis>> {
    this.validateSchoolId(schoolId);
    return this.impactRepo.findByPolicyId(policyId, schoolId, this.validatePagination(params));
  }

  async getDecisionStats(
    schoolId: string,
  ): Promise<{
    totalRecommendations: number;
    totalImpactAnalyses: number;
    byAnalysisType: Record<string, number>;
    averageConfidence: number;
  }> {
    this.validateSchoolId(schoolId);

    const recommendations = await this.recommendationRepo.findAll(schoolId, { limit: 1000 });
    const impactAnalyses = await this.impactRepo.findAll(schoolId, { limit: 1000 });

    const byAnalysisType: Record<string, number> = {};
    let totalConfidence = 0;
    for (const recommendation of recommendations.data) {
      byAnalysisType[recommendation.analysisType] = (byAnalysisType[recommendation.analysisType] ?? 0) + 1;
      totalConfidence += recommendation.confidence;
    }

    return {
      totalRecommendations: recommendations.total,
      totalImpactAnalyses: impactAnalyses.total,
      byAnalysisType,
      averageConfidence: recommendations.total > 0 ? totalConfidence / recommendations.total : 0,
    };
  }
}