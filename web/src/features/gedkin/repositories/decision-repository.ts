import type {
  GedkinDecisionRecommendation,
  GedkinImpactAnalysis,
} from '@educi/types';
import type {
  GedkinCrudRepository,
  GedkinBaseEntity,
  PaginatedResult,
  PaginationParams,
} from './base-gedkin-repository';

export interface GedkinDecisionRecommendationRepository extends GedkinCrudRepository<GedkinDecisionRecommendation & GedkinBaseEntity> {
  findByAnalysisType(analysisType: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinDecisionRecommendation & GedkinBaseEntity>>;
}

export interface GedkinImpactAnalysisRepository extends GedkinCrudRepository<GedkinImpactAnalysis & GedkinBaseEntity> {
  findByPolicyId(policyId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinImpactAnalysis & GedkinBaseEntity>>;
}