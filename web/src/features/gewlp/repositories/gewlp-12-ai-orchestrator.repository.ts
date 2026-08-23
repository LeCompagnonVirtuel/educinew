import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gewlp-base.repository';

// ============================================================================
// GEWLP-12: AI Orchestrator — AI-Powered Workforce Intelligence
// ============================================================================

export interface GewlpAiModel extends BaseEntity { name: string; description: string; model_type: 'nlp'|'recommendation'|'prediction'|'classification'|'anomaly_detection'|'generative'; provider: 'deepseek'|'gemini'|'custom'; endpoint_url?: string; config: Record<string,unknown>; version: string; status: 'active'|'inactive'|'deprecated'; }
export interface GewlpAiTrainingJob extends BaseEntity { model_id: string; dataset_id?: string; hyperparameters: Record<string,unknown>; started_at: string; completed_at?: string; duration_seconds?: number; metrics: Record<string,unknown>; status: 'queued'|'running'|'completed'|'failed'; logs_url?: string; }
export interface GewlpAiDataset extends BaseEntity { name: string; description: string; source: string; record_count: number; schema: Record<string,unknown>[]; size_bytes: number; status: 'ready'|'processing'|'error'; last_updated_at: string; }
export interface GewlpAiPrediction extends BaseEntity { model_id: string; input_data: Record<string,unknown>; output_data: Record<string,unknown>; confidence: number; latency_ms: number; predicted_at: string; }
export interface GewlpAiRecommendation extends BaseEntity { user_id: string; model_id: string; recommendation_type: 'skill'|'career'| 'course'|'job'|'mentor'|'project'; title: string; description: string; confidence: number; reasoning: string; context: Record<string,unknown>; status: 'new'|'viewed'|'accepted'|'dismissed'|'expired'; }
export interface GewlpAiAnomaly extends BaseEntity { model_id: string; entity_type: string; entity_id: string; anomaly_type: string; severity: 'low'|'medium'|'high'|'critical'; score: number; details: Record<string,unknown>; detected_at: string; status: 'new'|'investigating'|'resolved'|'false_positive'; }
export interface GewlpAiConversation extends BaseEntity { user_id: string; session_id: string; model_id: string; messages: Record<string,unknown>[]; context: Record<string,unknown>; started_at: string; ended_at?: string; feedback_rating?: number; }
export interface GewlpAiAgent extends BaseEntity { name: string; description: string; agent_type: 'chatbot'|'advisor'|'analyst'|'recruiter'|'coach'; model_ids: string[]; tools: string[]; system_prompt: string; config: Record<string,unknown>; status: 'active'|'inactive'|'testing'; }
export interface GewlpAiAgentExecution extends BaseEntity { agent_id: string; user_id: string; input: Record<string,unknown>; output: Record<string,unknown>; tools_used: string[]; duration_ms: number; tokens_used: number; cost: number; status: 'success'|'failure'|'timeout'; executed_at: string; }
export interface GewlpAiPipeline extends BaseEntity { name: string; description: string; steps: Record<string,unknown>[]; trigger: 'manual'|'schedule'|'event'; schedule_cron?: string; status: 'active'|'paused'|'draft'; last_run_at?: string; }
export interface GewlpAiPipelineRun extends BaseEntity { pipeline_id: string; triggered_by: string; started_at: string; completed_at?: string; steps_status: Record<string,unknown>; output: Record<string,unknown>; status: 'running'|'completed'|'failed'|'cancelled'; error?: string; }
export interface GewlpAiAuditLog extends BaseEntity { model_id?: string; agent_id?: string; pipeline_id?: string; action: string; actor_id: string; details: Record<string,unknown>; ip_address: string; timestamp: string; }

export const Gewlp12TableNames: Record<string, string> = {
  GewlpAiModel: 'gewlp_ai_models',
  GewlpAiTrainingJob: 'gewlp_ai_training_jobs',
  GewlpAiDataset: 'gewlp_ai_datasets',
  GewlpAiPrediction: 'gewlp_ai_predictions',
  GewlpAiRecommendation: 'gewlp_ai_recommendations',
  GewlpAiAnomaly: 'gewlp_ai_anomalies',
  GewlpAiConversation: 'gewlp_ai_conversations',
  GewlpAiAgent: 'gewlp_ai_agents',
  GewlpAiAgentExecution: 'gewlp_ai_agent_executions',
  GewlpAiPipeline: 'gewlp_ai_pipelines',
  GewlpAiPipelineRun: 'gewlp_ai_pipeline_runs',
  GewlpAiAuditLog: 'gewlp_ai_audit_logs',
};

export interface Gewlp12Repository {
  aiModels: CrudRepository<GewlpAiModel>;
  aiTrainingJobs: CrudRepository<GewlpAiTrainingJob>;
  aiDatasets: CrudRepository<GewlpAiDataset>;
  aiPredictions: CrudRepository<GewlpAiPrediction>;
  aiRecommendations: CrudRepository<GewlpAiRecommendation>;
  aiAnomalies: CrudRepository<GewlpAiAnomaly>;
  aiConversations: CrudRepository<GewlpAiConversation>;
  aiAgents: CrudRepository<GewlpAiAgent>;
  aiAgentExecutions: CrudRepository<GewlpAiAgentExecution>;
  aiPipelines: CrudRepository<GewlpAiPipeline>;
  aiPipelineRuns: CrudRepository<GewlpAiPipelineRun>;
  aiAuditLogs: CrudRepository<GewlpAiAuditLog>;
}

export function createGewlp12Repository(supabase: SupabaseClient): Gewlp12Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    aiModels: crud<GewlpAiModel>(Gewlp12TableNames.GewlpAiModel),
    aiTrainingJobs: crud<GewlpAiTrainingJob>(Gewlp12TableNames.GewlpAiTrainingJob),
    aiDatasets: crud<GewlpAiDataset>(Gewlp12TableNames.GewlpAiDataset),
    aiPredictions: crud<GewlpAiPrediction>(Gewlp12TableNames.GewlpAiPrediction),
    aiRecommendations: crud<GewlpAiRecommendation>(Gewlp12TableNames.GewlpAiRecommendation),
    aiAnomalies: crud<GewlpAiAnomaly>(Gewlp12TableNames.GewlpAiAnomaly),
    aiConversations: crud<GewlpAiConversation>(Gewlp12TableNames.GewlpAiConversation),
    aiAgents: crud<GewlpAiAgent>(Gewlp12TableNames.GewlpAiAgent),
    aiAgentExecutions: crud<GewlpAiAgentExecution>(Gewlp12TableNames.GewlpAiAgentExecution),
    aiPipelines: crud<GewlpAiPipeline>(Gewlp12TableNames.GewlpAiPipeline),
    aiPipelineRuns: crud<GewlpAiPipelineRun>(Gewlp12TableNames.GewlpAiPipelineRun),
    aiAuditLogs: crud<GewlpAiAuditLog>(Gewlp12TableNames.GewlpAiAuditLog),
  };
}
