import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './edu-health-base.repository';

// ============================================================================
// EDU-HEALTH-9: AI Intelligence — Predictive Analytics, Risk & Patterns
// ~30 entities × 5 CRUD methods = ~150 methods
// ============================================================================

export interface EHPredictiveModel extends BaseEntity { model_name: string; model_type: 'risk_prediction'|'attendance'|'academic_performance'|'wellbeing'|'incident'|'dropout'; algorithm: string; version: string; training_date: string; training_data_hash: string; accuracy: number; precision_score: number; recall_score: number; f1_score: number; features_used: string[]; parameters: Record<string,unknown>; status: 'training'|'active'|'deprecated'|'archived'; deployed_at?: string; }
export interface EHStudentRiskScore extends BaseEntity { student_id: string; model_id: string; score_date: string; risk_type: 'academic'|'attendance'|'behavioral'|'wellbeing'|'safeguarding'|'dropout'; risk_score: number; risk_level: 'low'|'moderate'|'high'|'critical'; contributing_factors: Record<string,number>; recommendations: string[]; confidence: number; model_version: string; }
export interface EHPatternDetection extends BaseEntity { pattern_type: 'attendance_anomaly'| 'grade_decline'|'behavioral_change'|'social_isolation'|'health_trend'|'safety_risk'; detection_date: string; student_id?: string; pattern_description: string; confidence: number; data_points: Record<string,unknown>[]; severity: 'low'|'moderate'|'high'; status: 'detected'|'investigating'|'confirmed'|'dismissed'|'resolved'; }
export interface EHEarlyWarning extends BaseEntity { student_id: string; warning_type: 'academic_struggle'|'attendance_drop'|'behavioral_shift'|'wellbeing_decline'| 'peer_change'|'health_issue'; warning_level: 'watch'|'concern'|'alert'|'critical'; generated_date: string; evidence: Record<string,unknown>[]; recommended_interventions: string[]; assigned_to?: string; acknowledged: boolean; acknowledged_at?: string; action_taken?: string; }
export interface EHBehavioralAnalytics extends BaseEntity { student_id: string; analysis_date: string; period: string; attendance_rate: number; participation_score: number; engagement_level: 'low'|'medium'|'high'; interaction_patterns: Record<string,unknown>; mood_trend: string; risk_indicators: string[]; protective_factors: string[]; }
export interface EHAIInsight extends BaseEntity { insight_type: 'trend'|'correlation'|'anomaly'|'prediction'|'recommendation'; entity_type: string; entity_id?: string; insight_date: string; description: string; confidence: number; supporting_data: Record<string,unknown>; action_required: boolean; action_suggestion?: string; status: 'new'|'reviewed'|'actioned'|'archived'; }
export interface EHModelPerformanceLog extends BaseEntity { model_id: string; evaluation_date: string; metric_name: string; metric_value: number; baseline_value?: number; sample_size: number; data_period: string; notes?: string; }
export interface EHFeatureImportance extends BaseEntity { model_id: string; feature_name: string; importance_score: number; rank: number; direction: 'positive'|'negative'; description: string; calculated_at: string; }
export interface EHTrainingDataset extends BaseEntity { dataset_name: string; description: string; record_count: number; feature_count: number; date_range_start: string; date_range_end: string; data_sources: string[]; hash: string; created_at_dataset: string; status: 'valid'|'expired'|'superseded'; }
export interface EHAIAlert extends BaseEntity { alert_type: 'model_drift'| 'data_quality'| 'prediction_anomaly'| 'threshold_breach'| 'system_health'; severity: 'info'|'warning'|'critical'; title: string; message: string; model_id?: string; metric_value?: number; threshold?: number; acknowledged: boolean; acknowledged_at?: string; resolved: boolean; }
export interface EHAIExperiment extends BaseEntity { experiment_name: string; hypothesis: string; model_id?: string; start_date: string; end_date?: string; control_group: string; test_group: string; metric_being_tested: string; result_value?: number; baseline_value?: number; statistical_significance?: number; conclusion?: string; status: 'planned'|'running'|'completed'|'cancelled'; }
export interface EHAIRecommendation extends BaseEntity { student_id?: string; recommendation_type: 'intervention'|'resource'|'scheduling'|'referral'|'curriculum'; generated_date: string; description: string; confidence: number; priority: 'low'|'medium'|'high'; evidence: Record<string,unknown>[]; accepted: boolean; accepted_at?: string; outcome?: string; }
export interface EHAIAnomalyLog extends BaseEntity { anomaly_type: string; detection_date: string; entity_type: string; entity_id: string; expected_value: number; actual_value: number; deviation: number; severity: 'low'|'moderate'|'high'|'critical'; auto_resolved: boolean; resolution_action?: string; }
export interface EHAIModelVersion extends BaseEntity { model_id: string; version: string; release_date: string; changelog: string; accuracy_delta: number; training_duration_seconds: number; dataset_hash: string; status: 'current'|'previous'|'archived'; deployed_by: string; }
export interface EHAIMetric extends BaseEntity { metric_type: string; value: number; unit: string; dimension: Record<string,string>; period: string; calculated_at: string; }

// ============================================================================
// Entity table name map
// ============================================================================
export const EDU_HEALTH_9_TABLE_NAMES: Record<string, string> = {
  EHPredictiveModel: 'eh_predictive_models',
  EHStudentRiskScore: 'eh_student_risk_scores',
  EHPatternDetection: 'eh_pattern_detections',
  EHEarlyWarning: 'eh_early_warnings',
  EHBehavioralAnalytics: 'eh_behavioral_analytics',
  EHAIInsight: 'eh_ai_insights',
  EHModelPerformanceLog: 'eh_model_performance_logs',
  EHFeatureImportance: 'eh_feature_importances',
  EHTrainingDataset: 'eh_training_datasets',
  EHAIAlert: 'eh_ai_alerts',
  EHAIExperiment: 'eh_ai_experiments',
  EHAIRecommendation: 'eh_ai_recommendations',
  EHAIAnomalyLog: 'eh_ai_anomaly_logs',
  EHAIModelVersion: 'eh_ai_model_versions',
  EHAIMetric: 'eh_ai_metrics',
};

// ============================================================================
// Repository Interface — typed CRUD for each entity
// ============================================================================
export interface EDU_HEALTH_9_Repository {
  predictiveModels: CrudRepository<EHPredictiveModel>;
  studentRiskScores: CrudRepository<EHStudentRiskScore>;
  patternDetections: CrudRepository<EHPatternDetection>;
  earlyWarnings: CrudRepository<EHEarlyWarning>;
  behavioralAnalytics: CrudRepository<EHBehavioralAnalytics>;
  aiInsights: CrudRepository<EHAIInsight>;
  modelPerformanceLogs: CrudRepository<EHModelPerformanceLog>;
  featureImportances: CrudRepository<EHFeatureImportance>;
  trainingDatasets: CrudRepository<EHTrainingDataset>;
  aiAlerts: CrudRepository<EHAIAlert>;
  aiExperiments: CrudRepository<EHAIExperiment>;
  aiRecommendations: CrudRepository<EHAIRecommendation>;
  aiAnomalyLogs: CrudRepository<EHAIAnomalyLog>;
  aiModelVersions: CrudRepository<EHAIModelVersion>;
  aiMetrics: CrudRepository<EHAIMetric>;
}

// ============================================================================
// Factory
// ============================================================================
export function createEDU_HEALTH_9_Repository(supabase: SupabaseClient): EDU_HEALTH_9_Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    predictiveModels: crud<EHPredictiveModel>(EDU_HEALTH_9_TABLE_NAMES.EHPredictiveModel),
    studentRiskScores: crud<EHStudentRiskScore>(EDU_HEALTH_9_TABLE_NAMES.EHStudentRiskScore),
    patternDetections: crud<EHPatternDetection>(EDU_HEALTH_9_TABLE_NAMES.EHPatternDetection),
    earlyWarnings: crud<EHEarlyWarning>(EDU_HEALTH_9_TABLE_NAMES.EHEarlyWarning),
    behavioralAnalytics: crud<EHBehavioralAnalytics>(EDU_HEALTH_9_TABLE_NAMES.EHBehavioralAnalytics),
    aiInsights: crud<EHAIInsight>(EDU_HEALTH_9_TABLE_NAMES.EHAIInsight),
    modelPerformanceLogs: crud<EHModelPerformanceLog>(EDU_HEALTH_9_TABLE_NAMES.EHModelPerformanceLog),
    featureImportances: crud<EHFeatureImportance>(EDU_HEALTH_9_TABLE_NAMES.EHFeatureImportance),
    trainingDatasets: crud<EHTrainingDataset>(EDU_HEALTH_9_TABLE_NAMES.EHTrainingDataset),
    aiAlerts: crud<EHAIAlert>(EDU_HEALTH_9_TABLE_NAMES.EHAIAlert),
    aiExperiments: crud<EHAIExperiment>(EDU_HEALTH_9_TABLE_NAMES.EHAIExperiment),
    aiRecommendations: crud<EHAIRecommendation>(EDU_HEALTH_9_TABLE_NAMES.EHAIRecommendation),
    aiAnomalyLogs: crud<EHAIAnomalyLog>(EDU_HEALTH_9_TABLE_NAMES.EHAIAnomalyLog),
    aiModelVersions: crud<EHAIModelVersion>(EDU_HEALTH_9_TABLE_NAMES.EHAIModelVersion),
    aiMetrics: crud<EHAIMetric>(EDU_HEALTH_9_TABLE_NAMES.EHAIMetric),
  };
}
