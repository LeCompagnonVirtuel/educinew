import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gei2p-base.repository';

// ============================================================================
// GEI2P-12: AI — AI/ML Model Management & Inference
// ~28 entities × 5 CRUD methods = ~140 methods
// ============================================================================

export interface GEI2PAIModel extends BaseEntity { name: string; description: string; model_type: 'classification'|'regression'|'nlp'|'vision'|'recommendation'|'forecasting'|'generative'|'hybrid'; framework: 'tensorflow'|'pytorch'|'sklearn'|'huggingface'|'custom'; version: string; status: 'draft'|'training'|'trained'|'deployed'|'retired'|'failed'; }
export interface GEI2PAIModelVersion extends BaseEntity { model_id: string; version: string; artifact_url: string; artifact_size_bytes: number; checksum: string; metrics: Record<string,number>; config: Record<string,unknown>; released_at: string; status: 'draft'|'released'|'deprecated'; }
export interface GEI2PAIModelArtifact extends BaseEntity { model_version_id: string; artifact_type: 'weights'|'config'|'tokenizer'|'embeddings'|'preprocessor'|'postprocessor'; file_url: string; file_size: number; checksum: string; format: 'h5'|'pt'|'onnx'|'pb'|'json'|'bin'; }
export interface GEI2PAITrainingJob extends BaseEntity { model_id: string; dataset_id: string; config: Record<string,unknown>; status: 'queued'|'running'|'completed'|'failed'|'cancelled'; started_at: string; completed_at?: string; duration_seconds?: number; error_message?: string; }
export interface GEI2PAITrainingMetric extends BaseEntity { job_id: string; epoch: number; metric_name: string; value: number; phase: 'train'|'validation'|'test'; recorded_at: string; }
export interface GEI2PAIModelEvaluation extends BaseEntity { model_version_id: string; dataset_id: string; eval_type: 'test'|'validation'|'cross_validation'|'holdout'; metrics: Record<string,number>; detailed_metrics: Record<string,unknown>; evaluated_at: string; }
export interface GEI2PAIModelDeployment extends BaseEntity { model_version_id: string; deployment_name: string; environment: 'development'|'staging'|'production'; endpoint_url: string; replicas: number; status: 'deploying'|'running'|'stopped'|'failed'; deployed_at: string; stopped_at?: string; }
export interface GEI2PAIModelMonitor extends BaseEntity { deployment_id: string; monitor_type: 'drift'|'performance'| 'latency'| 'throughput'| 'error_rate'| 'resource_usage'; config: Record<string,unknown>; status: 'healthy'|'degraded'|'alerting'; last_checked_at: string; }
export interface GEI2PAIModelAlert extends BaseEntity { monitor_id: string; alert_type: 'data_drift'|'model_drift'|'performance_degradation'|'latency_spike'|'error_spike'|'resource_exhaustion'; severity: 'low'|'medium'|'high'|'critical'; title: string; message: string; resolved: boolean; resolved_at?: string; }
export interface GEI2PAIDataset extends BaseEntity { name: string; description: string; source: string; format: 'csv'|'json'|'parquet'|'arrow'|'tfrecord'; size_bytes: number; row_count: number; column_count: number; schema: Record<string,unknown>[]; status: 'uploading'|'ready'|'processing'|'error'; }
export interface GEI2PAIDatasetVersion extends BaseEntity { dataset_id: string; version: string; file_url: string; checksum: string; row_count: number; created_at: string; }
export interface GEI2PAIDatasetSplit extends BaseEntity { dataset_id: string; split_name: 'train'|'validation'|'test'|'holdout'; ratio: number; row_count: number; file_url: string; }
export interface GEI2PAIPrediction extends BaseEntity { deployment_id: string; input_data: Record<string,unknown>; output_data: Record<string,unknown>; confidence: number; latency_ms: number; model_version: string; predicted_at: string; }
export interface GEI2PAIFeatureStore extends BaseEntity { name: string; description: string; feature_type: 'numerical'|'categorical'|'text'|'image'|'temporal'; source: string; computation: Record<string,unknown>; status: 'active'|'inactive'|'deprecated'; }
export interface GEI2PAIFeatureVector extends BaseEntity { feature_store_id: string; entity_id: string; entity_type: string; values: Record<string,unknown>; computed_at: string; }
export interface GEI2PAIExperiment extends BaseEntity { name: string; description: string; hypothesis: string; status: 'draft'|'running'|'completed'|'cancelled'; model_ids: string[]; target_metric: string; started_at?: string; ended_at?: string; winner_model_id?: string; }
export interface GEI2PAIExperimentRun extends BaseEntity { experiment_id: string; model_id: string; parameters: Record<string,unknown>; metrics: Record<string,number>; status: 'running'|'completed'|'failed'; started_at: string; completed_at?: string; }
export interface GEI2PAIAuditLog extends BaseEntity { entity_type: string; entity_id: string; action: string; actor_did: string; details: Record<string,unknown>; ip_address: string; timestamp: string; }
export interface GEI2PAINotification extends BaseEntity { recipient_did: string; type: 'model_trained'|'deployment_complete'|'alert'|'experiment_complete'|'evaluation_ready'; title: string; message: string; read: boolean; read_at?: string; sent_at: string; }
export interface GEI2PAIMetric extends BaseEntity { entity_type: string; entity_id: string; metric_name: string; value: number; unit: string; dimension: Record<string,string>; timestamp: string; }
export interface GEI2PAICompliance extends BaseEntity { model_id: string; regulation: string; status: 'compliant'|'non_compliant'|'pending_review'; checked_at: string; details: Record<string,unknown>; }
export interface GEI2PAIBiasReport extends BaseEntity { model_version_id: string; bias_type: 'demographic'|'geographic'|'temporal'|'selection'|'measurement'; affected_groups: Record<string,unknown>[]; bias_score: number; mitigation_strategy?: string; generated_at: string; }
export interface GEI2PAIExplainabilityReport extends BaseEntity { prediction_id: string; method: 'shap'|'lime'|'attention'|'counterfactual'|'feature_importance'; explanations: Record<string,unknown>; generated_at: string; }
export interface GEI2PAIModelCard extends BaseEntity { model_id: string; intended_use: string; limitations: string; training_data_description: string; evaluation_results: Record<string,unknown>; ethical_considerations: string; version: string; last_updated: string; }
export interface GEI2PAIBackup extends BaseEntity { entity_type: string; entity_id: string; backup_type: 'full'|'incremental'; file_url: string; checksum: string; created_at_backup: string; expires_at: string; }
export interface GEI2PAIVersion extends BaseEntity { entity_type: string; entity_id: string; version: number; snapshot: Record<string,unknown>; change_summary: string; changed_by: string; }
export interface GEI2PAILog extends BaseEntity { entity_type: string; entity_id: string; level: 'info'|'warn'|'error'|'debug'; message: string; context: Record<string,unknown>; timestamp: string; }
export interface GEI2PAIModelRegistry extends BaseEntity { name: string; description: string; model_count: number; last_synced_at?: string; status: 'active'|'syncing'|'error'; }
export interface GEI2PAIGovernance extends BaseEntity { model_id: string; governance_type: 'approval'| 'review'| 'audit'| 'risk_assessment'; status: 'pending'|'approved'|'rejected'|'completed'; assigned_to: string; due_date?: string; completed_at?: string; }
export interface GEI2PAIResourceUsage extends BaseEntity { deployment_id: string; gpu_hours: number; cpu_hours: number; memory_gb_hours: number; storage_gb: number; cost_estimate: number; currency: string; period: string; }

// ============================================================================
// Entity table name map
// ============================================================================
export const GEI2P12_TABLE_NAMES: Record<string, string> = {
  GEI2PAIModel: 'gei2p_ai_models',
  GEI2PAIModelVersion: 'gei2p_ai_model_versions',
  GEI2PAIModelArtifact: 'gei2p_ai_model_artifacts',
  GEI2PAITrainingJob: 'gei2p_ai_training_jobs',
  GEI2PAITrainingMetric: 'gei2p_ai_training_metrics',
  GEI2PAIModelEvaluation: 'gei2p_ai_model_evaluations',
  GEI2PAIModelDeployment: 'gei2p_ai_model_deployments',
  GEI2PAIModelMonitor: 'gei2p_ai_model_monitors',
  GEI2PAIModelAlert: 'gei2p_ai_model_alerts',
  GEI2PAIDataset: 'gei2p_ai_datasets',
  GEI2PAIDatasetVersion: 'gei2p_ai_dataset_versions',
  GEI2PAIDatasetSplit: 'gei2p_ai_dataset_splits',
  GEI2PAIPrediction: 'gei2p_ai_predictions',
  GEI2PAIFeatureStore: 'gei2p_ai_feature_stores',
  GEI2PAIFeatureVector: 'gei2p_ai_feature_vectors',
  GEI2PAIExperiment: 'gei2p_ai_experiments',
  GEI2PAIExperimentRun: 'gei2p_ai_experiment_runs',
  GEI2PAIAuditLog: 'gei2p_ai_audit_logs',
  GEI2PAINotification: 'gei2p_ai_notifications',
  GEI2PAIMetric: 'gei2p_ai_metrics',
  GEI2PAICompliance: 'gei2p_ai_compliances',
  GEI2PAIBiasReport: 'gei2p_ai_bias_reports',
  GEI2PAIExplainabilityReport: 'gei2p_ai_explainability_reports',
  GEI2PAIModelCard: 'gei2p_ai_model_cards',
  GEI2PAIBackup: 'gei2p_ai_backups',
  GEI2PAIVersion: 'gei2p_ai_versions',
  GEI2PAILog: 'gei2p_ai_logs',
  GEI2PAIModelRegistry: 'gei2p_ai_model_registries',
  GEI2PAIGovernance: 'gei2p_ai_governances',
  GEI2PAIResourceUsage: 'gei2p_ai_resource_usages',
};

// ============================================================================
// Repository Interface
// ============================================================================
export interface GEI2P12Repository {
  models: CrudRepository<GEI2PAIModel>;
  modelVersions: CrudRepository<GEI2PAIModelVersion>;
  modelArtifacts: CrudRepository<GEI2PAIModelArtifact>;
  trainingJobs: CrudRepository<GEI2PAITrainingJob>;
  trainingMetrics: CrudRepository<GEI2PAITrainingMetric>;
  modelEvaluations: CrudRepository<GEI2PAIModelEvaluation>;
  modelDeployments: CrudRepository<GEI2PAIModelDeployment>;
  modelMonitors: CrudRepository<GEI2PAIModelMonitor>;
  modelAlerts: CrudRepository<GEI2PAIModelAlert>;
  datasets: CrudRepository<GEI2PAIDataset>;
  datasetVersions: CrudRepository<GEI2PAIDatasetVersion>;
  datasetSplits: CrudRepository<GEI2PAIDatasetSplit>;
  predictions: CrudRepository<GEI2PAIPrediction>;
  featureStores: CrudRepository<GEI2PAIFeatureStore>;
  featureVectors: CrudRepository<GEI2PAIFeatureVector>;
  experiments: CrudRepository<GEI2PAIExperiment>;
  experimentRuns: CrudRepository<GEI2PAIExperimentRun>;
  auditLogs: CrudRepository<GEI2PAIAuditLog>;
  notifications: CrudRepository<GEI2PAINotification>;
  metrics: CrudRepository<GEI2PAIMetric>;
  compliances: CrudRepository<GEI2PAICompliance>;
  biasReports: CrudRepository<GEI2PAIBiasReport>;
  explainabilityReports: CrudRepository<GEI2PAIExplainabilityReport>;
  modelCards: CrudRepository<GEI2PAIModelCard>;
  backups: CrudRepository<GEI2PAIBackup>;
  versions: CrudRepository<GEI2PAIVersion>;
  logs: CrudRepository<GEI2PAILog>;
  modelRegistries: CrudRepository<GEI2PAIModelRegistry>;
  governances: CrudRepository<GEI2PAIGovernance>;
  resourceUsages: CrudRepository<GEI2PAIResourceUsage>;
}

// ============================================================================
// Factory
// ============================================================================
export function createGEI2P12Repository(supabase: SupabaseClient): GEI2P12Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    models: crud<GEI2PAIModel>(GEI2P12_TABLE_NAMES.GEI2PAIModel),
    modelVersions: crud<GEI2PAIModelVersion>(GEI2P12_TABLE_NAMES.GEI2PAIModelVersion),
    modelArtifacts: crud<GEI2PAIModelArtifact>(GEI2P12_TABLE_NAMES.GEI2PAIModelArtifact),
    trainingJobs: crud<GEI2PAITrainingJob>(GEI2P12_TABLE_NAMES.GEI2PAITrainingJob),
    trainingMetrics: crud<GEI2PAITrainingMetric>(GEI2P12_TABLE_NAMES.GEI2PAITrainingMetric),
    modelEvaluations: crud<GEI2PAIModelEvaluation>(GEI2P12_TABLE_NAMES.GEI2PAIModelEvaluation),
    modelDeployments: crud<GEI2PAIModelDeployment>(GEI2P12_TABLE_NAMES.GEI2PAIModelDeployment),
    modelMonitors: crud<GEI2PAIModelMonitor>(GEI2P12_TABLE_NAMES.GEI2PAIModelMonitor),
    modelAlerts: crud<GEI2PAIModelAlert>(GEI2P12_TABLE_NAMES.GEI2PAIModelAlert),
    datasets: crud<GEI2PAIDataset>(GEI2P12_TABLE_NAMES.GEI2PAIDataset),
    datasetVersions: crud<GEI2PAIDatasetVersion>(GEI2P12_TABLE_NAMES.GEI2PAIDatasetVersion),
    datasetSplits: crud<GEI2PAIDatasetSplit>(GEI2P12_TABLE_NAMES.GEI2PAIDatasetSplit),
    predictions: crud<GEI2PAIPrediction>(GEI2P12_TABLE_NAMES.GEI2PAIPrediction),
    featureStores: crud<GEI2PAIFeatureStore>(GEI2P12_TABLE_NAMES.GEI2PAIFeatureStore),
    featureVectors: crud<GEI2PAIFeatureVector>(GEI2P12_TABLE_NAMES.GEI2PAIFeatureVector),
    experiments: crud<GEI2PAIExperiment>(GEI2P12_TABLE_NAMES.GEI2PAIExperiment),
    experimentRuns: crud<GEI2PAIExperimentRun>(GEI2P12_TABLE_NAMES.GEI2PAIExperimentRun),
    auditLogs: crud<GEI2PAIAuditLog>(GEI2P12_TABLE_NAMES.GEI2PAIAuditLog),
    notifications: crud<GEI2PAINotification>(GEI2P12_TABLE_NAMES.GEI2PAINotification),
    metrics: crud<GEI2PAIMetric>(GEI2P12_TABLE_NAMES.GEI2PAIMetric),
    compliances: crud<GEI2PAICompliance>(GEI2P12_TABLE_NAMES.GEI2PAICompliance),
    biasReports: crud<GEI2PAIBiasReport>(GEI2P12_TABLE_NAMES.GEI2PAIBiasReport),
    explainabilityReports: crud<GEI2PAIExplainabilityReport>(GEI2P12_TABLE_NAMES.GEI2PAIExplainabilityReport),
    modelCards: crud<GEI2PAIModelCard>(GEI2P12_TABLE_NAMES.GEI2PAIModelCard),
    backups: crud<GEI2PAIBackup>(GEI2P12_TABLE_NAMES.GEI2PAIBackup),
    versions: crud<GEI2PAIVersion>(GEI2P12_TABLE_NAMES.GEI2PAIVersion),
    logs: crud<GEI2PAILog>(GEI2P12_TABLE_NAMES.GEI2PAILog),
    modelRegistries: crud<GEI2PAIModelRegistry>(GEI2P12_TABLE_NAMES.GEI2PAIModelRegistry),
    governances: crud<GEI2PAIGovernance>(GEI2P12_TABLE_NAMES.GEI2PAIGovernance),
    resourceUsages: crud<GEI2PAIResourceUsage>(GEI2P12_TABLE_NAMES.GEI2PAIResourceUsage),
  };
}
