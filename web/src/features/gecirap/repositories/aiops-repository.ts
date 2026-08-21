import { SupabaseClient } from '@supabase/supabase-js';
import {
  GecirapAIOpsAgentNotFoundError,
  GecirapIncidentCorrelationError,
  GecirapRootCauseError,
  GecirapRecommendationError,
  GecirapAutoActionError,
  GecirapRemediationError,
} from '@educi/errors';
import {
  GecirapBaseEntity,
  PaginatedResult,
  PaginationParams,
  FilterParams,
  GecirapCrudRepositoryImpl,
} from './base-gecirap-repository';

// ============================================================================
// Entity Interfaces
// ============================================================================

export interface GecirapAIOpsAgent extends GecirapBaseEntity {
  name: string;
  description?: string;
  agent_type: string;
  status: string;
  capabilities: string[];
  configuration?: Record<string, unknown>;
  last_active_at?: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapInfrastructureEvent extends GecirapBaseEntity {
  event_type: string;
  severity: string;
  source: string;
  resource_type?: string;
  resource_id?: string;
  message: string;
  details?: Record<string, unknown>;
  acknowledged_at?: string;
  resolved_at?: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapIncidentCorrelation extends GecirapBaseEntity {
  incident_name: string;
  event_ids: string[];
  correlation_score: number;
  root_cause_suspect?: string;
  status: string;
  detected_at: string;
  resolved_at?: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapRootCauseAnalysis extends GecirapBaseEntity {
  correlation_id: string;
  analysis_type: string;
  root_cause: string;
  confidence_score: number;
  evidence: Record<string, unknown>[];
  recommendations?: string[];
  analyzed_at: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapRecommendation extends GecirapBaseEntity {
  recommendation_type: string;
  title: string;
  description: string;
  priority: string;
  resource_type?: string;
  resource_id?: string;
  estimated_impact?: Record<string, unknown>;
  status: string;
  created_at: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapAutomatedAction extends GecirapBaseEntity {
  action_type: string;
  trigger_event_id?: string;
  trigger_correlation_id?: string;
  target_resource_type: string;
  target_resource_id: string;
  action_payload: Record<string, unknown>;
  status: string;
  executed_at?: string;
  completed_at?: string;
  error_message?: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapRemediationPlan extends GecirapBaseEntity {
  plan_name: string;
  correlation_id: string;
  steps: Record<string, unknown>[];
  status: string;
  auto_execute: boolean;
  approved_by?: string;
  approved_at?: string;
  executed_at?: string;
  completed_at?: string;
  metadata?: Record<string, unknown>;
}

// ============================================================================
// Repository Implementations
// ============================================================================

export class AIOpsAgentRepository extends GecirapCrudRepositoryImpl<GecirapAIOpsAgent> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_aiops_agents', (msg) => {
      throw new GecirapAIOpsAgentNotFoundError(msg);
    });
  }

  async findByAgentType(
    agentType: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapAIOpsAgent>> {
    return this.findAll(schoolId, { ...params, agent_type: agentType });
  }

  async findActive(schoolId: string): Promise<GecirapAIOpsAgent[]> {
    const result = await this.findAll(schoolId, { status: 'active', limit: 200 });
    return result.data;
  }
}

export class InfrastructureEventRepository extends GecirapCrudRepositoryImpl<GecirapInfrastructureEvent> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_infrastructure_events', (msg) => {
      throw new GecirapIncidentCorrelationError(msg);
    });
  }

  async findByEventType(
    eventType: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapInfrastructureEvent>> {
    return this.findAll(schoolId, { ...params, event_type: eventType });
  }

  async findBySeverity(
    severity: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapInfrastructureEvent>> {
    return this.findAll(schoolId, { ...params, severity });
  }

  async findUnresolved(schoolId: string): Promise<GecirapInfrastructureEvent[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .is('resolved_at', null);

    if (error) {
      throw new GecirapIncidentCorrelationError(
        `Erreur lors de la récupération des événements non résolus: ${error.message}`,
      );
    }

    return (data || []) as GecirapInfrastructureEvent[];
  }
}

export class IncidentCorrelationRepository extends GecirapCrudRepositoryImpl<GecirapIncidentCorrelation> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_incident_correlations', (msg) => {
      throw new GecirapIncidentCorrelationError(msg);
    });
  }

  async findByStatus(
    status: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapIncidentCorrelation>> {
    return this.findAll(schoolId, { ...params, status });
  }

  async findUnresolved(schoolId: string): Promise<GecirapIncidentCorrelation[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .is('resolved_at', null);

    if (error) {
      throw new GecirapIncidentCorrelationError(
        `Erreur lors de la récupération des incidents non résolus: ${error.message}`,
      );
    }

    return (data || []) as GecirapIncidentCorrelation[];
  }
}

export class RootCauseAnalysisRepository extends GecirapCrudRepositoryImpl<GecirapRootCauseAnalysis> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_root_cause_analyses', (msg) => {
      throw new GecirapRootCauseError(msg);
    });
  }

  async findByCorrelationId(
    correlationId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapRootCauseAnalysis>> {
    return this.findAll(schoolId, { ...params, correlation_id: correlationId });
  }

  async findByAnalysisType(
    analysisType: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapRootCauseAnalysis>> {
    return this.findAll(schoolId, { ...params, analysis_type: analysisType });
  }

  async findHighConfidence(schoolId: string, minScore = 0.8): Promise<GecirapRootCauseAnalysis[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .gte('confidence_score', minScore);

    if (error) {
      throw new GecirapRootCauseError(
        `Erreur lors de la récupération des analyses haute confiance: ${error.message}`,
      );
    }

    return (data || []) as GecirapRootCauseAnalysis[];
  }
}

export class RecommendationRepository extends GecirapCrudRepositoryImpl<GecirapRecommendation> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_recommendations', (msg) => {
      throw new GecirapRecommendationError(msg);
    });
  }

  async findByRecommendationType(
    recommendationType: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapRecommendation>> {
    return this.findAll(schoolId, { ...params, recommendation_type: recommendationType });
  }

  async findByStatus(
    status: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapRecommendation>> {
    return this.findAll(schoolId, { ...params, status });
  }

  async findByPriority(
    priority: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapRecommendation>> {
    return this.findAll(schoolId, { ...params, priority });
  }
}

export class AutomatedActionRepository extends GecirapCrudRepositoryImpl<GecirapAutomatedAction> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_automated_actions', (msg) => {
      throw new GecirapAutoActionError(msg);
    });
  }

  async findByActionType(
    actionType: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapAutomatedAction>> {
    return this.findAll(schoolId, { ...params, action_type: actionType });
  }

  async findByStatus(
    status: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapAutomatedAction>> {
    return this.findAll(schoolId, { ...params, status });
  }

  async findRunning(schoolId: string): Promise<GecirapAutomatedAction[]> {
    const result = await this.findAll(schoolId, { status: 'running', limit: 200 });
    return result.data;
  }
}

export class RemediationPlanRepository extends GecirapCrudRepositoryImpl<GecirapRemediationPlan> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_remediation_plans', (msg) => {
      throw new GecirapRemediationError(msg);
    });
  }

  async findByCorrelationId(
    correlationId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapRemediationPlan>> {
    return this.findAll(schoolId, { ...params, correlation_id: correlationId });
  }

  async findByStatus(
    status: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapRemediationPlan>> {
    return this.findAll(schoolId, { ...params, status });
  }

  async findPendingApproval(schoolId: string): Promise<GecirapRemediationPlan[]> {
    const result = await this.findAll(schoolId, { status: 'pending_approval', limit: 200 });
    return result.data;
  }
}
