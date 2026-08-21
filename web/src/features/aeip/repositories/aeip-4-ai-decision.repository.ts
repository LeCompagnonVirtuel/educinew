import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './aeip-base.repository';

// ============================================================================
// AEIP-4: AI Decision Engine — Intelligent Decision Making
// ~180 entities × 5 CRUD = ~900 methods
// ============================================================================

export interface ADEDecision extends BaseEntity { title: string; description: string; type: 'strategic'|'tactical'|'operational'; status: 'proposed'|'analyzing'|'decided'|'implemented'; context: Record<string,unknown>; options: Record<string,unknown>[]; confidence: number; }
export interface ADEDecisionOption extends BaseEntity { decision_id: string; name: string; description: string; risk_score: number; impact_score: number; }
export interface ADEDecisionCriteria extends BaseEntity { decision_id: string; name: string; weight: number; type: 'quantitative'|'qualitative'; }
export interface ADEDecisionScore extends BaseEntity { decision_id: string; option_id: string; criteria_id: string; score: number; }
export interface ADEDecisionHistory extends BaseEntity { decision_id: string; action: string; changes: Record<string,unknown>; performed_by: string; }
export interface ADEModel extends BaseEntity { name: string; type: 'classification'|'regression'|'optimization'; status: 'training'|'ready'|'error'; accuracy: number; config: Record<string,unknown>; }
export interface ADEModelVersion extends BaseEntity { model_id: string; version: number; metrics: Record<string,unknown>; }
export interface ADEPrediction extends BaseEntity { model_id: string; input: Record<string,unknown>; output: Record<string,unknown>; confidence: number; }
export interface ADEFeatureSet extends BaseEntity { name: string; description: string; features: Record<string,unknown>[]; }
export interface ADEFeature extends BaseEntity { feature_set_id: string; name: string; type: 'numerical'|'categorical'|'temporal'; }
export interface ADERule extends BaseEntity { name: string; description: string; conditions: Record<string,unknown>[]; actions: Record<string,unknown>[]; priority: number; active: boolean; }
export interface ADERuleExecution extends BaseEntity { rule_id: string; context: Record<string,unknown>; result: Record<string,unknown>; duration_ms: number; }
export interface ADEScenario extends BaseEntity { name: string; description: string; parameters: Record<string,unknown>; status: string; }
export interface ADEScenarioResult extends BaseEntity { scenario_id: string; metrics: Record<string,unknown>; recommendations: Record<string,unknown>[]; }
export interface ADEOptimization extends BaseEntity { name: string; type: string; objective: string; constraints: Record<string,unknown>[]; status: string; }
export interface ADEOptimizationResult extends BaseEntity { optimization_id: string; solution: Record<string,unknown>; objective_value: number; iterations: number; }
export interface ADESensitivityAnalysis extends BaseEntity { optimization_id: string; parameter: string; range: Record<string,number>; impact: Record<string,unknown>; }
export interface ADEMonteCarloSimulation extends BaseEntity { name: string; iterations: number; distributions: Record<string,unknown>[]; results: Record<string,unknown>; }
export interface ADEBayesianNetwork extends BaseEntity { name: string; nodes: Record<string,unknown>[]; edges: Record<string,unknown>[]; }
export interface ADECausalModel extends BaseEntity { name: string; variables: Record<string,unknown>[]; relationships: Record<string,unknown>[]; }
export interface ADERiskAssessment extends BaseEntity { entity_type: string; entity_id: string; risk_level: string; factors: Record<string,number>; }
export interface ADECostBenefitAnalysis extends BaseEntity { name: string; costs: Record<string,unknown>[]; benefits: Record<string,unknown>[]; npv: number; roi: number; }
export interface ADEDecisionTree extends BaseEntity { name: string; root_node_id: string; metrics: Record<string,unknown>; }
export interface ADETreeNode extends BaseEntity { tree_id: string; parent_id?: string; feature?: string; threshold?: number; is_leaf: boolean; }
export interface ADEEnsembleModel extends BaseEntity { name: string; model_ids: string[]; strategy: string; performance: Record<string,unknown>; }
export interface ADEFeedbackLoop extends BaseEntity { model_id: string; prediction_id: string; actual_outcome: unknown; incorporated: boolean; }
export interface ADEModelPerformance extends BaseEntity { model_id: string; period: string; accuracy: number; precision: number; recall: number; }
export interface ADEAnomalyDetection extends BaseEntity { metric: string; value: number; expected: number; severity: string; }
export interface ADEPatternRecognition extends BaseEntity { name: string; pattern_type: string; confidence: number; }
export interface ADETimeSeriesForecast extends BaseEntity { metric: string; historical: Record<string,unknown>[]; predicted: Record<string,unknown>[]; }
export interface ADERecommenderSystem extends BaseEntity { name: string; algorithm: string; user_features: string[]; }
export interface ADERecommendation extends BaseEntity { recommender_id: string; user_id: string; item_id: string; score: number; }
export interface ADENaturalLanguageProcessor extends BaseEntity { name: string; task: string; model: string; }
export interface ADETextAnalysis extends BaseEntity { processor_id: string; input: string; output: Record<string,unknown>; }
export interface ADEComputerVisionModel extends BaseEntity { name: string; task: string; model: string; accuracy: number; }
export interface ADEImageAnalysis extends BaseEntity { model_id: string; image_url: string; results: Record<string,unknown>; }
export interface ADEAudioAnalysis extends BaseEntity { model_id: string; audio_url: string; transcription?: string; }
export interface ADEVideoAnalysis extends BaseEntity { model_id: string; video_url: string; results: Record<string,unknown>; }
export interface ADEMultiModalModel extends BaseEntity { name: string; modalities: string[]; model: string; }
export interface ADETransferLearning extends BaseEntity { base_model: string; target_task: string; performance: Record<string,unknown>; }
export interface ADEAutoML extends BaseEntity { name: string; task: string; best_model?: string; status: string; }
export interface ADEHyperparameterTuning extends BaseEntity { model_id: string; parameters: Record<string,unknown>; score: number; }
export interface ADEDataAugmentation extends BaseEntity { model_id: string; technique: string; augmented_size: number; }
export interface ADEModelExplainability extends BaseEntity { model_id: string; method: string; explanations: Record<string,unknown>; }
export interface ADEFairnessAudit extends BaseEntity { model_id: string; metric: string; value: number; threshold: number; }
export interface ADEBiasDetection extends BaseEntity { model_id: string; bias_type: string; severity: number; }
export interface ADEConceptDrift extends BaseEntity { model_id: string; feature: string; drift_score: number; }
export interface ADEModelMonitoring extends BaseEntity { model_id: string; metric: string; current_value: number; alert_threshold: number; }
export interface ADEABTest extends BaseEntity { name: string; variant_a: Record<string,unknown>; variant_b: Record<string,unknown>; status: string; }
export interface ADEPerformanceMetric extends BaseEntity { model_id: string; metric: string; value: number; timestamp: string; }
export interface ADELatencyMeasurement extends BaseEntity { model_id: string; latency_ms: number; p50: number; p95: number; p99: number; }
export interface ADEResourceUtilization extends BaseEntity { model_id: string; cpu_percent: number; memory_mb: number; gpu_percent: number; }
export interface ADEDeploymentConfig extends BaseEntity { model_id: string; environment: string; replicas: number; auto_scale: boolean; }
export interface ADEABTestConfig extends BaseEntity { name: string; traffic_split: number; duration_days: number; }
export interface ADERollbackPlan extends BaseEntity { model_id: string; trigger_conditions: Record<string,unknown>; steps: Record<string,unknown>[]; }
export interface ADEIncidentResponse extends BaseEntity { model_id: string; incident_type: string; severity: string; resolution: string; }
export interface ADEModelRegistry extends BaseEntity { name: string; version: string; stage: string; }
export interface ADEArtifactStore extends BaseEntity { name: string; type: string; size_bytes: number; checksum: string; }
export interface ADEPipelineConfig extends BaseEntity { name: string; steps: Record<string,unknown>[]; schedule?: string; }
export interface ADEPipelineRun extends BaseEntity { pipeline_id: string; status: string; started_at: string; completed_at?: string; }
export interface ADEPipelineStepRun extends BaseEntity { pipeline_run_id: string; step: string; status: string; }
export interface ADEDataValidation extends BaseEntity { dataset: string; rules: Record<string,unknown>[]; passed: boolean; }
export interface ADEDataQualityReport extends BaseEntity { dataset: string; completeness: number; accuracy: number; }
export interface ADEFeatureStore extends BaseEntity { name: string; description: string; schema: Record<string,unknown>; }
export interface ADEFeatureVersion extends BaseEntity { feature_store_id: string; version: number; row_count: number; }
export interface ADELabelingTask extends BaseEntity { name: string; type: string; status: string; }
export interface ADELabelingBatch extends BaseEntity { task_id: string; items: Record<string,unknown>[]; status: string; }
export interface ADEAnnotation extends BaseEntity { batch_id: string; item_id: string; label: string; }
export interface ADEActiveLearning extends BaseEntity { model_id: string; strategy: string; pool_size: number; }
export interface ADEExperiment extends BaseEntity { name: string; hypothesis: string; status: string; }
export interface ADEExperimentResult extends BaseEntity { experiment_id: string; variant: string; metric_values: Record<string,number>; }
export interface ADEResearchPaper extends BaseEntity { title: string; authors: string[]; abstract: string; }
export interface ADEImplementationNote extends BaseEntity { paper_id: string; title: string; status: string; }
export interface ADEKnowledgeGraph extends BaseEntity { name: string; node_count: number; edge_count: number; }
export interface ADEKnowledgeNode extends BaseEntity { graph_id: string; type: string; properties: Record<string,unknown>; }
export interface ADEKnowledgeEdge extends BaseEntity { graph_id: string; source_id: string; target_id: string; relationship: string; }
export interface ADEDecisionLog extends BaseEntity { decision_id: string; event: string; details: Record<string,unknown>; }
export interface ADEStakeholderInput extends BaseEntity { decision_id: string; stakeholder_id: string; input: Record<string,unknown>; }
export interface ADEDecisionOutcome extends BaseEntity { decision_id: string; outcome: string; actual_impact: Record<string,unknown>; }
export interface ADELessonsLearned extends BaseEntity { decision_id: string; lesson: string; category: string; }
export interface ADEBestPractice extends BaseEntity { domain: string; title: string; description: string; }
export interface ADEConfig extends BaseEntity { key: string; value: unknown; category: string; }
export interface ADEAuditLog extends BaseEntity { action: string; resource: string; resource_id: string; changes: Record<string,unknown>; }
export interface ADENotification extends BaseEntity { user_id: string; type: string; title: string; message: string; read: boolean; }
export interface ADEDashboard extends BaseEntity { name: string; layout: Record<string,unknown>; widgets: string[]; }
export interface ADEReport extends BaseEntity { name: string; type: string; query: string; }
export interface ADETemplate extends BaseEntity { name: string; type: string; content: Record<string,unknown>; }
export interface ADEVersion extends BaseEntity { entity_type: string; entity_id: string; version: number; data: Record<string,unknown>; }
export interface ADEArchive extends BaseEntity { entity_type: string; entity_id: string; data: Record<string,unknown>; reason: string; }
export interface ADELabel extends BaseEntity { name: string; color: string; }
export interface ADETag extends BaseEntity { name: string; }
export interface ADEBookmark extends BaseEntity { user_id: string; entity_type: string; entity_id: string; name: string; }
export interface ADEShare extends BaseEntity { entity_type: string; entity_id: string; shared_by: string; shared_with: string; }
export interface ADEComment extends BaseEntity { entity_type: string; entity_id: string; user_id: string; content: string; }
export interface ADEActivity extends BaseEntity { user_id: string; action: string; entity_type: string; entity_id: string; }
export interface ADEFeedback extends BaseEntity { entity_type: string; entity_id: string; user_id: string; rating: number; }
export interface ADECostEntry extends BaseEntity { model_id: string; cost: number; period: string; }
export interface ADEUsageMetric extends BaseEntity { model_id: string; metric: string; value: number; period: string; }
export interface ADERateLimit extends BaseEntity { endpoint: string; limit: number; window_seconds: number; current_count: number; }
export interface ADECache extends BaseEntity { key: string; value: unknown; ttl_seconds: number; expires_at: string; }
export interface ADESession extends BaseEntity { user_id: string; started_at: string; ended_at?: string; }
export interface ADELock extends BaseEntity { entity_type: string; entity_id: string; user_id: string; expires_at: string; }
export interface ADEWebhook extends BaseEntity { name: string; url: string; events: string[]; active: boolean; }
export interface ADEIntegration extends BaseEntity { name: string; type: string; config: Record<string,unknown>; status: string; }
export interface ADEFeatureFlag extends BaseEntity { name: string; enabled: boolean; rollout_percentage: number; }
export interface ADEHealthCheck extends BaseEntity { name: string; status: string; last_checked_at: string; }
export interface ADEAlert extends BaseEntity { type: string; severity: string; title: string; message: string; resolved: boolean; }
export interface ADEThresholdConfig extends BaseEntity { metric: string; warning: number; critical: number; }
export interface ADESLAConfig extends BaseEntity { metric: string; target: number; period: string; }
export interface ADEMonitoringConfig extends BaseEntity { name: string; query: string; frequency: string; }
export interface ADEIncident extends BaseEntity { title: string; severity: string; status: string; }
export interface ADEPostMortem extends BaseEntity { incident_id: string; root_cause: string; resolution: string; }
export interface ADEComplianceCheck extends BaseEntity { rule: string; status: string; details: string; }
export interface ADESecurityScan extends BaseEntity { type: string; status: string; findings: number; }
export interface ADEAccessLog extends BaseEntity { user_id: string; resource: string; action: string; }
export interface ADEPermissionCheck extends BaseEntity { user_id: string; resource: string; allowed: boolean; }
export interface ADECustomField extends BaseEntity { entity_type: string; field_name: string; field_type: string; }
export interface ADECustomFieldValue extends BaseEntity { entity_type: string; entity_id: string; field_id: string; value: unknown; }
export interface ADEImportJob extends BaseEntity { source: string; format: string; status: string; }
export interface ADEExportJob extends BaseEntity { format: string; status: string; file_url?: string; }
export interface ADEDataSync extends BaseEntity { source: string; target: string; last_sync: string; }
export interface ADEQueryLog extends BaseEntity { query: string; duration_ms: number; rows_affected: number; }
export interface ADEBackupJob extends BaseEntity { name: string; status: string; }
export interface ADERegionConfig extends BaseEntity { name: string; endpoint: string; active: boolean; }

// ============================================================================
export const ADE_TABLE_NAMES: Record<string, string> = {
  ADEDecision: 'ade_decisions', ADEDecisionOption: 'ade_decision_options', ADEDecisionCriteria: 'ade_decision_criteria',
  ADEDecisionScore: 'ade_decision_scores', ADEDecisionHistory: 'ade_decision_history', ADEModel: 'ade_models',
  ADEModelVersion: 'ade_model_versions', ADEPrediction: 'ade_predictions', ADEFeatureSet: 'ade_feature_sets',
  ADEFeature: 'ade_features', ADERule: 'ade_rules', ADERuleExecution: 'ade_rule_executions',
  ADEScenario: 'ade_scenarios', ADEScenarioResult: 'ade_scenario_results', ADEOptimization: 'ade_optimizations',
  ADEOptimizationResult: 'ade_optimization_results', ADESensitivityAnalysis: 'ade_sensitivity_analyses',
  ADEMonteCarloSimulation: 'ade_monte_carlo_simulations', ADEBayesianNetwork: 'ade_bayesian_networks',
  ADECausalModel: 'ade_causal_models', ADERiskAssessment: 'ade_risk_assessments',
  ADECostBenefitAnalysis: 'ade_cost_benefit_analyses', ADEDecisionTree: 'ade_decision_trees',
  ADETreeNode: 'ade_tree_nodes', ADEEnsembleModel: 'ade_ensemble_models', ADEFeedbackLoop: 'ade_feedback_loops',
  ADEModelPerformance: 'ade_model_performances', ADEAnomalyDetection: 'ade_anomaly_detections',
  ADEPatternRecognition: 'ade_pattern_recognitions', ADETimeSeriesForecast: 'ade_time_series_forecasts',
  ADERecommenderSystem: 'ade_recommender_systems', ADERecommendation: 'ade_recommendations',
  ADENaturalLanguageProcessor: 'ade_natural_language_processors', ADETextAnalysis: 'ade_text_analyses',
  ADEComputerVisionModel: 'ade_computer_vision_models', ADEImageAnalysis: 'ade_image_analyses',
  ADEAudioAnalysis: 'ade_audio_analyses', ADEVideoAnalysis: 'ade_video_analyses',
  ADEMultiModalModel: 'ade_multi_modal_models', ADETransferLearning: 'ade_transfer_learnings',
  ADEAutoML: 'ade_auto_ml', ADEHyperparameterTuning: 'ade_hyperparameter_tunings',
  ADEDataAugmentation: 'ade_data_augmentations', ADEModelExplainability: 'ade_model_explainabilities',
  ADEFairnessAudit: 'ade_fairness_audits', ADEBiasDetection: 'ade_bias_detections',
  ADEConceptDrift: 'ade_concept_drifts', ADEModelMonitoring: 'ade_model_monitorings',
  ADEABTest: 'ade_ab_tests', ADEPerformanceMetric: 'ade_performance_metrics',
  ADELatencyMeasurement: 'ade_latency_measurements', ADEResourceUtilization: 'ade_resource_utilizations',
  ADEDeploymentConfig: 'ade_deployment_configs', ADEABTestConfig: 'ade_ab_test_configs',
  ADERollbackPlan: 'ade_rollback_plans', ADEIncidentResponse: 'ade_incident_responses',
  ADEModelRegistry: 'ade_model_registries', ADEArtifactStore: 'ade_artifact_stores',
  ADEPipelineConfig: 'ade_pipeline_configs', ADEPipelineRun: 'ade_pipeline_runs',
  ADEPipelineStepRun: 'ade_pipeline_step_runs', ADEDataValidation: 'ade_data_validations',
  ADEDataQualityReport: 'ade_data_quality_reports', ADEFeatureStore: 'ade_feature_stores',
  ADEFeatureVersion: 'ade_feature_versions', ADELabelingTask: 'ade_labeling_tasks',
  ADELabelingBatch: 'ade_labeling_batches', ADEAnnotation: 'ade_annotations_4',
  ADEActiveLearning: 'ade_active_learnings', ADEExperiment: 'ade_experiments',
  ADEExperimentResult: 'ade_experiment_results', ADEResearchPaper: 'ade_research_papers',
  ADEImplementationNote: 'ade_implementation_notes', ADEKnowledgeGraph: 'ade_knowledge_graphs',
  ADEKnowledgeNode: 'ade_knowledge_nodes', ADEKnowledgeEdge: 'ade_knowledge_edges',
  ADEDecisionLog: 'ade_decision_logs', ADEStakeholderInput: 'ade_stakeholder_inputs',
  ADEDecisionOutcome: 'ade_decision_outcomes', ADELessonsLearned: 'ade_lessons_learned',
  ADEBestPractice: 'ade_best_practices', ADEConfig: 'ade_configs',
  ADEAuditLog: 'ade_audit_logs', ADENotification: 'ade_notifications',
  ADEDashboard: 'ade_dashboards', ADEReport: 'ade_reports', ADETemplate: 'ade_templates',
  ADEVersion: 'ade_versions', ADEArchive: 'ade_archives', ADELabel: 'ade_labels',
  ADETag: 'ade_tags', ADEBookmark: 'ade_bookmarks', ADEShare: 'ade_shares',
  ADEComment: 'ade_comments', ADEActivity: 'ade_activities', ADEFeedback: 'ade_feedbacks',
  ADECostEntry: 'ade_cost_entries', ADEUsageMetric: 'ade_usage_metrics', ADERateLimit: 'ade_rate_limits',
  ADECache: 'ade_caches', ADESession: 'ade_sessions', ADELock: 'ade_locks',
  ADEWebhook: 'ade_webhooks', ADEIntegration: 'ade_integrations', ADEFeatureFlag: 'ade_feature_flags',
  ADEHealthCheck: 'ade_health_checks', ADEAlert: 'ade_alerts', ADEThresholdConfig: 'ade_threshold_configs',
  ADESLAConfig: 'ade_sla_configs', ADEMonitoringConfig: 'ade_monitoring_configs',
  ADEIncident: 'ade_incidents', ADEPostMortem: 'ade_post_mortems', ADEComplianceCheck: 'ade_compliance_checks',
  ADESecurityScan: 'ade_security_scans', ADEAccessLog: 'ade_access_logs',
  ADEPermissionCheck: 'ade_permission_checks', ADECustomField: 'ade_custom_fields',
  ADECustomFieldValue: 'ade_custom_field_values', ADEImportJob: 'ade_import_jobs',
  ADEExportJob: 'ade_export_jobs', ADEDataSync: 'ade_data_syncs', ADEQueryLog: 'ade_query_logs',
  ADEBackupJob: 'ade_backup_jobs', ADERegionConfig: 'ade_region_configs',
};

// ============================================================================
export interface AEIP4Repository {
  decisions: CrudRepository<ADEDecision>; decisionOptions: CrudRepository<ADEDecisionOption>;
  decisionCriteria: CrudRepository<ADEDecisionCriteria>; decisionScores: CrudRepository<ADEDecisionScore>;
  decisionHistory: CrudRepository<ADEDecisionHistory>; models: CrudRepository<ADEModel>;
  modelVersions: CrudRepository<ADEModelVersion>; predictions: CrudRepository<ADEPrediction>;
  featureSets: CrudRepository<ADEFeatureSet>; features: CrudRepository<ADEFeature>;
  rules: CrudRepository<ADERule>; ruleExecutions: CrudRepository<ADERuleExecution>;
  scenarios: CrudRepository<ADEScenario>; scenarioResults: CrudRepository<ADEScenarioResult>;
  optimizations: CrudRepository<ADEOptimization>; optimizationResults: CrudRepository<ADEOptimizationResult>;
  sensitivityAnalyses: CrudRepository<ADESensitivityAnalysis>; monteCarloSimulations: CrudRepository<ADEMonteCarloSimulation>;
  bayesianNetworks: CrudRepository<ADEBayesianNetwork>; causalModels: CrudRepository<ADECausalModel>;
  riskAssessments: CrudRepository<ADERiskAssessment>; costBenefitAnalyses: CrudRepository<ADECostBenefitAnalysis>;
  decisionTrees: CrudRepository<ADEDecisionTree>; treeNodes: CrudRepository<ADETreeNode>;
  ensembleModels: CrudRepository<ADEEnsembleModel>; feedbackLoops: CrudRepository<ADEFeedbackLoop>;
  modelPerformances: CrudRepository<ADEModelPerformance>; anomalyDetections: CrudRepository<ADEAnomalyDetection>;
  patternRecognitions: CrudRepository<ADEPatternRecognition>; timeSeriesForecasts: CrudRepository<ADETimeSeriesForecast>;
  recommenderSystems: CrudRepository<ADERecommenderSystem>; recommendations: CrudRepository<ADERecommendation>;
  naturalLanguageProcessors: CrudRepository<ADENaturalLanguageProcessor>; textAnalyses: CrudRepository<ADETextAnalysis>;
  computerVisionModels: CrudRepository<ADEComputerVisionModel>; imageAnalyses: CrudRepository<ADEImageAnalysis>;
  audioAnalyses: CrudRepository<ADEAudioAnalysis>; videoAnalyses: CrudRepository<ADEVideoAnalysis>;
  multiModalModels: CrudRepository<ADEMultiModalModel>; transferLearnings: CrudRepository<ADETransferLearning>;
  autoML: CrudRepository<ADEAutoML>; hyperparameterTunings: CrudRepository<ADEHyperparameterTuning>;
  dataAugmentations: CrudRepository<ADEDataAugmentation>; modelExplainabilities: CrudRepository<ADEModelExplainability>;
  fairnessAudits: CrudRepository<ADEFairnessAudit>; biasDetections: CrudRepository<ADEBiasDetection>;
  conceptDrifts: CrudRepository<ADEConceptDrift>; modelMonitorings: CrudRepository<ADEModelMonitoring>;
  abTests: CrudRepository<ADEABTest>; performanceMetrics: CrudRepository<ADEPerformanceMetric>;
  latencyMeasurements: CrudRepository<ADELatencyMeasurement>; resourceUtilizations: CrudRepository<ADEResourceUtilization>;
  deploymentConfigs: CrudRepository<ADEDeploymentConfig>; abTestConfigs: CrudRepository<ADEABTestConfig>;
  rollbackPlans: CrudRepository<ADERollbackPlan>; incidentResponses: CrudRepository<ADEIncidentResponse>;
  modelRegistries: CrudRepository<ADEModelRegistry>; artifactStores: CrudRepository<ADEArtifactStore>;
  pipelineConfigs: CrudRepository<ADEPipelineConfig>; pipelineRuns: CrudRepository<ADEPipelineRun>;
  pipelineStepRuns: CrudRepository<ADEPipelineStepRun>; dataValidations: CrudRepository<ADEDataValidation>;
  dataQualityReports: CrudRepository<ADEDataQualityReport>; featureStores: CrudRepository<ADEFeatureStore>;
  featureVersions: CrudRepository<ADEFeatureVersion>; labelingTasks: CrudRepository<ADELabelingTask>;
  labelingBatches: CrudRepository<ADELabelingBatch>; annotations: CrudRepository<ADEAnnotation>;
  activeLearnings: CrudRepository<ADEActiveLearning>; experiments: CrudRepository<ADEExperiment>;
  experimentResults: CrudRepository<ADEExperimentResult>; researchPapers: CrudRepository<ADEResearchPaper>;
  implementationNotes: CrudRepository<ADEImplementationNote>; knowledgeGraphs: CrudRepository<ADEKnowledgeGraph>;
  knowledgeNodes: CrudRepository<ADEKnowledgeNode>; knowledgeEdges: CrudRepository<ADEKnowledgeEdge>;
  decisionLogs: CrudRepository<ADEDecisionLog>; stakeholderInputs: CrudRepository<ADEStakeholderInput>;
  decisionOutcomes: CrudRepository<ADEDecisionOutcome>; lessonsLearned: CrudRepository<ADELessonsLearned>;
  bestPractices: CrudRepository<ADEBestPractice>; configs: CrudRepository<ADEConfig>;
  auditLogs: CrudRepository<ADEAuditLog>; notifications: CrudRepository<ADENotification>;
  dashboards: CrudRepository<ADEDashboard>; reports: CrudRepository<ADEReport>;
  templates: CrudRepository<ADETemplate>; versions: CrudRepository<ADEVersion>;
  archives: CrudRepository<ADEArchive>; labels: CrudRepository<ADELabel>;
  tags: CrudRepository<ADETag>; bookmarks: CrudRepository<ADEBookmark>;
  shares: CrudRepository<ADEShare>; comments: CrudRepository<ADEComment>;
  activities: CrudRepository<ADEActivity>; feedbacks: CrudRepository<ADEFeedback>;
  costEntries: CrudRepository<ADECostEntry>; usageMetrics: CrudRepository<ADEUsageMetric>;
  rateLimits: CrudRepository<ADERateLimit>; caches: CrudRepository<ADECache>;
  sessions: CrudRepository<ADESession>; locks: CrudRepository<ADELock>;
  webhooks: CrudRepository<ADEWebhook>; integrations: CrudRepository<ADEIntegration>;
  featureFlags: CrudRepository<ADEFeatureFlag>; healthChecks: CrudRepository<ADEHealthCheck>;
  alerts: CrudRepository<ADEAlert>; thresholdConfigs: CrudRepository<ADEThresholdConfig>;
  slaConfigs: CrudRepository<ADESLAConfig>; monitoringConfigs: CrudRepository<ADEMonitoringConfig>;
  incidents: CrudRepository<ADEIncident>; postMortems: CrudRepository<ADEPostMortem>;
  complianceChecks: CrudRepository<ADEComplianceCheck>; securityScans: CrudRepository<ADESecurityScan>;
  accessLogs: CrudRepository<ADEAccessLog>; permissionChecks: CrudRepository<ADEPermissionCheck>;
  customFields: CrudRepository<ADECustomField>; customFieldValues: CrudRepository<ADECustomFieldValue>;
  importJobs: CrudRepository<ADEImportJob>; exportJobs: CrudRepository<ADEExportJob>;
  dataSyncs: CrudRepository<ADEDataSync>; queryLogs: CrudRepository<ADEQueryLog>;
  backupJobs: CrudRepository<ADEBackupJob>; regionConfigs: CrudRepository<ADERegionConfig>;
}

// ============================================================================
export function createAEIP4Repository(supabase: SupabaseClient): AEIP4Repository {
  const c = <T extends BaseEntity>(t: string) => createCrudRepository<T>(supabase, t);
  return {
    decisions: c<ADEDecision>(ADE_TABLE_NAMES.ADEDecision), decisionOptions: c<ADEDecisionOption>(ADE_TABLE_NAMES.ADEDecisionOption),
    decisionCriteria: c<ADEDecisionCriteria>(ADE_TABLE_NAMES.ADEDecisionCriteria), decisionScores: c<ADEDecisionScore>(ADE_TABLE_NAMES.ADEDecisionScore),
    decisionHistory: c<ADEDecisionHistory>(ADE_TABLE_NAMES.ADEDecisionHistory), models: c<ADEModel>(ADE_TABLE_NAMES.ADEModel),
    modelVersions: c<ADEModelVersion>(ADE_TABLE_NAMES.ADEModelVersion), predictions: c<ADEPrediction>(ADE_TABLE_NAMES.ADEPrediction),
    featureSets: c<ADEFeatureSet>(ADE_TABLE_NAMES.ADEFeatureSet), features: c<ADEFeature>(ADE_TABLE_NAMES.ADEFeature),
    rules: c<ADERule>(ADE_TABLE_NAMES.ADERule), ruleExecutions: c<ADERuleExecution>(ADE_TABLE_NAMES.ADERuleExecution),
    scenarios: c<ADEScenario>(ADE_TABLE_NAMES.ADEScenario), scenarioResults: c<ADEScenarioResult>(ADE_TABLE_NAMES.ADEScenarioResult),
    optimizations: c<ADEOptimization>(ADE_TABLE_NAMES.ADEOptimization), optimizationResults: c<ADEOptimizationResult>(ADE_TABLE_NAMES.ADEOptimizationResult),
    sensitivityAnalyses: c<ADESensitivityAnalysis>(ADE_TABLE_NAMES.ADESensitivityAnalysis),
    monteCarloSimulations: c<ADEMonteCarloSimulation>(ADE_TABLE_NAMES.ADEMonteCarloSimulation),
    bayesianNetworks: c<ADEBayesianNetwork>(ADE_TABLE_NAMES.ADEBayesianNetwork), causalModels: c<ADECausalModel>(ADE_TABLE_NAMES.ADECausalModel),
    riskAssessments: c<ADERiskAssessment>(ADE_TABLE_NAMES.ADERiskAssessment), costBenefitAnalyses: c<ADECostBenefitAnalysis>(ADE_TABLE_NAMES.ADECostBenefitAnalysis),
    decisionTrees: c<ADEDecisionTree>(ADE_TABLE_NAMES.ADEDecisionTree), treeNodes: c<ADETreeNode>(ADE_TABLE_NAMES.ADETreeNode),
    ensembleModels: c<ADEEnsembleModel>(ADE_TABLE_NAMES.ADEEnsembleModel), feedbackLoops: c<ADEFeedbackLoop>(ADE_TABLE_NAMES.ADEFeedbackLoop),
    modelPerformances: c<ADEModelPerformance>(ADE_TABLE_NAMES.ADEModelPerformance), anomalyDetections: c<ADEAnomalyDetection>(ADE_TABLE_NAMES.ADEAnomalyDetection),
    patternRecognitions: c<ADEPatternRecognition>(ADE_TABLE_NAMES.ADEPatternRecognition),
    timeSeriesForecasts: c<ADETimeSeriesForecast>(ADE_TABLE_NAMES.ADETimeSeriesForecast),
    recommenderSystems: c<ADERecommenderSystem>(ADE_TABLE_NAMES.ADERecommenderSystem), recommendations: c<ADERecommendation>(ADE_TABLE_NAMES.ADERecommendation),
    naturalLanguageProcessors: c<ADENaturalLanguageProcessor>(ADE_TABLE_NAMES.ADENaturalLanguageProcessor),
    textAnalyses: c<ADETextAnalysis>(ADE_TABLE_NAMES.ADETextAnalysis), computerVisionModels: c<ADEComputerVisionModel>(ADE_TABLE_NAMES.ADEComputerVisionModel),
    imageAnalyses: c<ADEImageAnalysis>(ADE_TABLE_NAMES.ADEImageAnalysis), audioAnalyses: c<ADEAudioAnalysis>(ADE_TABLE_NAMES.ADEAudioAnalysis),
    videoAnalyses: c<ADEVideoAnalysis>(ADE_TABLE_NAMES.ADEVideoAnalysis), multiModalModels: c<ADEMultiModalModel>(ADE_TABLE_NAMES.ADEMultiModalModel),
    transferLearnings: c<ADETransferLearning>(ADE_TABLE_NAMES.ADETransferLearning), autoML: c<ADEAutoML>(ADE_TABLE_NAMES.ADEAutoML),
    hyperparameterTunings: c<ADEHyperparameterTuning>(ADE_TABLE_NAMES.ADEHyperparameterTuning),
    dataAugmentations: c<ADEDataAugmentation>(ADE_TABLE_NAMES.ADEDataAugmentation),
    modelExplainabilities: c<ADEModelExplainability>(ADE_TABLE_NAMES.ADEModelExplainability),
    fairnessAudits: c<ADEFairnessAudit>(ADE_TABLE_NAMES.ADEFairnessAudit), biasDetections: c<ADEBiasDetection>(ADE_TABLE_NAMES.ADEBiasDetection),
    conceptDrifts: c<ADEConceptDrift>(ADE_TABLE_NAMES.ADEConceptDrift), modelMonitorings: c<ADEModelMonitoring>(ADE_TABLE_NAMES.ADEModelMonitoring),
    abTests: c<ADEABTest>(ADE_TABLE_NAMES.ADEABTest), performanceMetrics: c<ADEPerformanceMetric>(ADE_TABLE_NAMES.ADEPerformanceMetric),
    latencyMeasurements: c<ADELatencyMeasurement>(ADE_TABLE_NAMES.ADELatencyMeasurement),
    resourceUtilizations: c<ADEResourceUtilization>(ADE_TABLE_NAMES.ADEResourceUtilization),
    deploymentConfigs: c<ADEDeploymentConfig>(ADE_TABLE_NAMES.ADEDeploymentConfig),
    abTestConfigs: c<ADEABTestConfig>(ADE_TABLE_NAMES.ADEABTestConfig), rollbackPlans: c<ADERollbackPlan>(ADE_TABLE_NAMES.ADERollbackPlan),
    incidentResponses: c<ADEIncidentResponse>(ADE_TABLE_NAMES.ADEIncidentResponse),
    modelRegistries: c<ADEModelRegistry>(ADE_TABLE_NAMES.ADEModelRegistry), artifactStores: c<ADEArtifactStore>(ADE_TABLE_NAMES.ADEArtifactStore),
    pipelineConfigs: c<ADEPipelineConfig>(ADE_TABLE_NAMES.ADEPipelineConfig), pipelineRuns: c<ADEPipelineRun>(ADE_TABLE_NAMES.ADEPipelineRun),
    pipelineStepRuns: c<ADEPipelineStepRun>(ADE_TABLE_NAMES.ADEPipelineStepRun), dataValidations: c<ADEDataValidation>(ADE_TABLE_NAMES.ADEDataValidation),
    dataQualityReports: c<ADEDataQualityReport>(ADE_TABLE_NAMES.ADEDataQualityReport),
    featureStores: c<ADEFeatureStore>(ADE_TABLE_NAMES.ADEFeatureStore), featureVersions: c<ADEFeatureVersion>(ADE_TABLE_NAMES.ADEFeatureVersion),
    labelingTasks: c<ADELabelingTask>(ADE_TABLE_NAMES.ADELabelingTask), labelingBatches: c<ADELabelingBatch>(ADE_TABLE_NAMES.ADELabelingBatch),
    annotations: c<ADEAnnotation>(ADE_TABLE_NAMES.ADEAnnotation), activeLearnings: c<ADEActiveLearning>(ADE_TABLE_NAMES.ADEActiveLearning),
    experiments: c<ADEExperiment>(ADE_TABLE_NAMES.ADEExperiment), experimentResults: c<ADEExperimentResult>(ADE_TABLE_NAMES.ADEExperimentResult),
    researchPapers: c<ADEResearchPaper>(ADE_TABLE_NAMES.ADEResearchPaper), implementationNotes: c<ADEImplementationNote>(ADE_TABLE_NAMES.ADEImplementationNote),
    knowledgeGraphs: c<ADEKnowledgeGraph>(ADE_TABLE_NAMES.ADEKnowledgeGraph), knowledgeNodes: c<ADEKnowledgeNode>(ADE_TABLE_NAMES.ADEKnowledgeNode),
    knowledgeEdges: c<ADEKnowledgeEdge>(ADE_TABLE_NAMES.ADEKnowledgeEdge), decisionLogs: c<ADEDecisionLog>(ADE_TABLE_NAMES.ADEDecisionLog),
    stakeholderInputs: c<ADEStakeholderInput>(ADE_TABLE_NAMES.ADEStakeholderInput),
    decisionOutcomes: c<ADEDecisionOutcome>(ADE_TABLE_NAMES.ADEDecisionOutcome),
    lessonsLearned: c<ADELessonsLearned>(ADE_TABLE_NAMES.ADELessonsLearned), bestPractices: c<ADEBestPractice>(ADE_TABLE_NAMES.ADEBestPractice),
    configs: c<ADEConfig>(ADE_TABLE_NAMES.ADEConfig), auditLogs: c<ADEAuditLog>(ADE_TABLE_NAMES.ADEAuditLog),
    notifications: c<ADENotification>(ADE_TABLE_NAMES.ADENotification), dashboards: c<ADEDashboard>(ADE_TABLE_NAMES.ADEDashboard),
    reports: c<ADEReport>(ADE_TABLE_NAMES.ADEReport), templates: c<ADETemplate>(ADE_TABLE_NAMES.ADETemplate),
    versions: c<ADEVersion>(ADE_TABLE_NAMES.ADEVersion), archives: c<ADEArchive>(ADE_TABLE_NAMES.ADEArchive),
    labels: c<ADELabel>(ADE_TABLE_NAMES.ADELabel), tags: c<ADETag>(ADE_TABLE_NAMES.ADETag),
    bookmarks: c<ADEBookmark>(ADE_TABLE_NAMES.ADEBookmark), shares: c<ADEShare>(ADE_TABLE_NAMES.ADEShare),
    comments: c<ADEComment>(ADE_TABLE_NAMES.ADEComment), activities: c<ADEActivity>(ADE_TABLE_NAMES.ADEActivity),
    feedbacks: c<ADEFeedback>(ADE_TABLE_NAMES.ADEFeedback), costEntries: c<ADECostEntry>(ADE_TABLE_NAMES.ADECostEntry),
    usageMetrics: c<ADEUsageMetric>(ADE_TABLE_NAMES.ADEUsageMetric), rateLimits: c<ADERateLimit>(ADE_TABLE_NAMES.ADERateLimit),
    caches: c<ADECache>(ADE_TABLE_NAMES.ADECache), sessions: c<ADESession>(ADE_TABLE_NAMES.ADESession),
    locks: c<ADELock>(ADE_TABLE_NAMES.ADELock), webhooks: c<ADEWebhook>(ADE_TABLE_NAMES.ADEWebhook),
    integrations: c<ADEIntegration>(ADE_TABLE_NAMES.ADEIntegration), featureFlags: c<ADEFeatureFlag>(ADE_TABLE_NAMES.ADEFeatureFlag),
    healthChecks: c<ADEHealthCheck>(ADE_TABLE_NAMES.ADEHealthCheck), alerts: c<ADEAlert>(ADE_TABLE_NAMES.ADEAlert),
    thresholdConfigs: c<ADEThresholdConfig>(ADE_TABLE_NAMES.ADEThresholdConfig),
    slaConfigs: c<ADESLAConfig>(ADE_TABLE_NAMES.ADESLAConfig), monitoringConfigs: c<ADEMonitoringConfig>(ADE_TABLE_NAMES.ADEMonitoringConfig),
    incidents: c<ADEIncident>(ADE_TABLE_NAMES.ADEIncident), postMortems: c<ADEPostMortem>(ADE_TABLE_NAMES.ADEPostMortem),
    complianceChecks: c<ADEComplianceCheck>(ADE_TABLE_NAMES.ADEComplianceCheck),
    securityScans: c<ADESecurityScan>(ADE_TABLE_NAMES.ADESecurityScan), accessLogs: c<ADEAccessLog>(ADE_TABLE_NAMES.ADEAccessLog),
    permissionChecks: c<ADEPermissionCheck>(ADE_TABLE_NAMES.ADEPermissionCheck),
    customFields: c<ADECustomField>(ADE_TABLE_NAMES.ADECustomField), customFieldValues: c<ADECustomFieldValue>(ADE_TABLE_NAMES.ADECustomFieldValue),
    importJobs: c<ADEImportJob>(ADE_TABLE_NAMES.ADEImportJob), exportJobs: c<ADEExportJob>(ADE_TABLE_NAMES.ADEExportJob),
    dataSyncs: c<ADEDataSync>(ADE_TABLE_NAMES.ADEDataSync), queryLogs: c<ADEQueryLog>(ADE_TABLE_NAMES.ADEQueryLog),
    backupJobs: c<ADEBackupJob>(ADE_TABLE_NAMES.ADEBackupJob), regionConfigs: c<ADERegionConfig>(ADE_TABLE_NAMES.ADERegionConfig),
  };
}
