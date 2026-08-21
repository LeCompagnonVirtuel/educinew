export enum AIMappingType {
  SCHEMA = "SCHEMA",
  FIELD = "FIELD",
  ENTITY = "ENTITY",
  RELATIONSHIP = "RELATIONSHIP",
  VALUE = "VALUE",
  SEMANTIC = "SEMANTIC",
  STRUCTURAL = "STRUCTURAL",
  CONTEXTUAL = "CONTEXTUAL",
}

export enum AIMatchingMethod {
  EXACT = "EXACT",
  FUZZY = "FUZZY",
  SEMANTIC = "SEMANTIC",
  SYNTACTIC = "SYNTACTIC",
  LEVENSHTEIN = "LEVENSHTEIN",
  JACCARD = "JACCARD",
  COSINE = "COSINE",
  ML_CLASSIFIER = "ML_CLASSIFIER",
  RULE_BASED = "RULE_BASED",
  HYBRID = "HYBRID",
}

export enum NormalizationType {
  TEXT = "TEXT",
  NUMBER = "NUMBER",
  DATE = "DATE",
  ADDRESS = "ADDRESS",
  NAME = "NAME",
  PHONE = "PHONE",
  EMAIL = "EMAIL",
  CURRENCY = "CURRENCY",
  UNIT = "UNIT",
  CODE = "CODE",
}

export enum AnomalyType {
  OUTLIER = "OUTLIER",
  PATTERN_BREAK = "PATTERN_BREAK",
  VOLUME_SPIKE = "VOLUME_SPIKE",
  VOLUME_DROP = "VOLUME_DROP",
  LATENCY = "LATENCY",
  FRESHNESS = "FRESHNESS",
  SCHEMA_CHANGE = "SCHEMA_CHANGE",
  DATA_DRIFT = "DATA_DRIFT",
  DISTRIBUTION = "DISTRIBUTION",
  CORRELATION = "CORRELATION",
}

export enum DuplicateDetectionMethod {
  EXACT_MATCH = "EXACT_MATCH",
  FUZZY_MATCH = "FUZZY_MATCH",
  ML_CLASSIFICATION = "ML_CLASSIFICATION",
  RECORD_LINKAGE = "RECORD_LINKAGE",
  BLOCKING = "BLOCKING",
  DEDUPLICATION = "DEDUPLICATION",
  MERGE_PURGE = "MERGE_PURGE",
 probabilistic = "PROBABILISTIC",
}

export enum PredictionModel {
  LINEAR_REGRESSION = "LINEAR_REGRESSION",
  RANDOM_FOREST = "RANDOM_FOREST",
  GRADIENT_BOOSTING = "GRADIENT_BOOSTING",
  NEURAL_NETWORK = "NEURAL_NETWORK",
  DECISION_TREE = "DECISION_TREE",
  SVM = "SVM",
  NAIVE_BAYES = "NAIVE_BAYES",
  KNN = "KNN",
  ENSEMBLE = "ENSEMBLE",
  TRANSFORMER = "TRANSFORMER",
}

export enum ExplanationType {
  FEATURE_IMPORTANCE = "FEATURE_IMPORTANCE",
  SHAP = "SHAP",
  LIME = "LIME",
  COUNTERFACTUAL = "COUNTERFACTUAL",
  ATTENTION = "ATTENTION",
  RULE = "RULE",
  EXAMPLE = "EXAMPLE",
  NATURAL_LANGUAGE = "NATURAL_LANGUAGE",
}

export enum ConfidenceLevel {
  VERY_LOW = "VERY_LOW",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
}

export enum AIMappingStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REVIEW_REQUIRED = "REVIEW_REQUIRED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum AIRecommendationType {
  SCHEMA_MAPPING = "SCHEMA_MAPPING",
  FIELD_MATCHING = "FIELD_MATCHING",
  DATA_NORMALIZATION = "DATA_NORMALIZATION",
  QUALITY_IMPROVEMENT = "QUALITY_IMPROVEMENT",
  INTEGRATION = "INTEGRATION",
  SYNC_OPTIMIZATION = "SYNC_OPTIMIZATION",
  ANOMALY_RESOLUTION = "ANOMALY_RESOLUTION",
  DUPLICATE_RESOLUTION = "DUPLICATE_RESOLUTION",
}

export enum NormalizationStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  PARTIAL = "PARTIAL",
}

export enum DuplicateStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  RESOLVED = "RESOLVED",
  MERGED = "MERGED",
  DISMISSED = "DISMISSED",
}

export enum IdentityResolutionStatus {
  PENDING = "PENDING",
  MATCHED = "MATCHED",
  UNMATCHED = "UNMATCHED",
  CONFLICT = "CONFLICT",
  RESOLVED = "RESOLVED",
}

export enum TranscriptFormat {
  STANDARD = "STANDARD",
  CUSTOM = "CUSTOM",
  INTERNATIONAL = "INTERNATIONAL",
  HISTORICAL = "HISTORICAL",
}

export enum EquivalenceStatus {
  PENDING = "PENDING",
  EQUIVALENT = "EQUIVALENT",
  PARTIALLY_EQUIVALENT = "PARTIALLY_EQUIVALENT",
  NOT_EQUIVALENT = "NOT_EQUIVALENT",
  UNDER_REVIEW = "UNDER_REVIEW",
}

export enum CompetencyLevel {
  NOVICE = "NOVICE",
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT",
  MASTERY = "MASTERY",
}

export enum SyncAnomalyType {
  DELAY = "DELAY",
  DATA_LOSS = "DATA_LOSS",
  DUPLICATE = "DUPLICATE",
  CONFLICT = "CONFLICT",
  SCHEMA_MISMATCH = "SCHEMA_MISMATCH",
  AUTHENTICATION = "AUTHENTICATION",
  RATE_LIMIT = "RATE_LIMIT",
  PARTIAL_SYNC = "PARTIAL_SYNC",
}

export enum AIModelVersion {
  V1 = "V1",
  V2 = "V2",
  V3 = "V3",
  CUSTOM = "CUSTOM",
}

export enum QualityPredictionType {
  COMPLETENESS = "COMPLETENESS",
  ACCURACY = "ACCURACY",
  CONSISTENCY = "CONSISTENCY",
  VALIDITY = "VALIDITY",
  TIMELINESS = "TIMELINESS",
  OVERALL = "OVERALL",
}

export interface SchemaMapping {
  id: string;
  sourceSchemaId: string;
  targetSchemaId: string;
  type: AIMappingType;
  status: AIMappingStatus;
  mappings: FieldMapping[];
  confidence: number;
  aiModel: AIModelVersion;
  explanation: AIExplanation;
  createdAt: Date;
  updatedAt: Date;
  metadata: Record<string, unknown>;
}

export interface FieldMapping {
  id: string;
  sourceField: string;
  targetField: string;
  method: AIMatchingMethod;
  confidence: number;
  transformation: string | null;
  nullable: boolean;
  defaultValue: unknown | null;
  explanation: AIExplanation;
}

export interface FieldMatching {
  id: string;
  sourceFields: string[];
  targetFields: string[];
  method: AIMatchingMethod;
  scores: MatchScore[];
  bestMatch: string | null;
  confidence: number;
  candidates: MatchCandidate[];
  createdAt: Date;
}

export interface MatchScore {
  sourceField: string;
  targetField: string;
  score: number;
  method: AIMatchingMethod;
}

export interface MatchCandidate {
  field: string;
  score: number;
  reasoning: string;
}

export interface DataNormalization {
  id: string;
  dataType: NormalizationType;
  status: NormalizationStatus;
  sourceFormat: string;
  targetFormat: string;
  rules: NormalizationRule[];
  recordsProcessed: number;
  recordsSucceeded: number;
  recordsFailed: number;
  startedAt: Date;
  completedAt: Date | null;
  metadata: Record<string, unknown>;
}

export interface NormalizationRule {
  id: string;
  name: string;
  pattern: string;
  replacement: string;
  priority: number;
  active: boolean;
}

export interface AnomalyDetection {
  id: string;
  type: AnomalyType;
  severity: string;
  description: string;
  detectedAt: Date;
  dataId: string;
  dataType: string;
  confidence: number;
  metrics: AnomalyMetric[];
  resolved: boolean;
  resolvedAt: Date | null;
  resolution: string | null;
  metadata: Record<string, unknown>;
}

export interface AnomalyMetric {
  name: string;
  expected: number;
  actual: number;
  deviation: number;
  zScore: number;
}

export interface DuplicateDetection {
  id: string;
  method: DuplicateDetectionMethod;
  status: DuplicateStatus;
  sourceRecord: string;
  duplicateRecords: string[];
  similarity: number;
  confidence: number;
  matchedFields: string[];
  detectedAt: Date;
  resolvedAt: Date | null;
  resolution: string | null;
  metadata: Record<string, unknown>;
}

export interface IdentityResolution {
  id: string;
  status: IdentityResolutionStatus;
  sourceId: string;
  targetId: string;
  sourceSystem: string;
  targetSystem: string;
  matchScore: number;
  matchedAttributes: MatchedAttribute[];
  conflictAttributes: string[];
  resolutionMethod: string;
  resolvedAt: Date | null;
  metadata: Record<string, unknown>;
}

export interface MatchedAttribute {
  attribute: string;
  sourceValue: string;
  targetValue: string;
  confidence: number;
  method: AIMatchingMethod;
}

export interface TranscriptNormalization {
  id: string;
  sourceFormat: TranscriptFormat;
  targetFormat: TranscriptFormat;
  status: NormalizationStatus;
  sourceInstitution: string;
  targetInstitution: string;
  records: TranscriptRecord[];
  transformationsApplied: string[];
  confidence: number;
  startedAt: Date;
  completedAt: Date | null;
  metadata: Record<string, unknown>;
}

export interface TranscriptRecord {
  id: string;
  studentId: string;
  courseName: string;
  courseCode: string;
  credits: number;
  grade: string;
  normalizedGrade: string | null;
  gpa: number | null;
  normalizedGpa: number | null;
  confidence: number;
}

export interface QualificationEquivalence {
  id: string;
  sourceQualification: string;
  targetQualification: string;
  sourceCountry: string;
  targetCountry: string;
  status: EquivalenceStatus;
  equivalenceScore: number;
  requirements: EquivalenceRequirement[];
  conditions: string[];
  verifiedBy: string | null;
  verifiedAt: Date | null;
  metadata: Record<string, unknown>;
}

export interface EquivalenceRequirement {
  id: string;
  type: string;
  description: string;
  satisfied: boolean;
  evidence: string | null;
}

export interface CompetencyMapping {
  id: string;
  sourceCompetency: string;
  targetCompetency: string;
  sourceFramework: string;
  targetFramework: string;
  level: CompetencyLevel;
  equivalenceScore: number;
  evidence: string[];
  verifiedBy: string | null;
  verifiedAt: Date | null;
  metadata: Record<string, unknown>;
}

export interface DataQualityPrediction {
  id: string;
  type: QualityPredictionType;
  predictedScore: number;
  confidence: number;
  factors: PredictionFactor[];
  model: PredictionModel;
  modelVersion: string;
  predictedAt: Date;
  validUntil: Date;
  recommendations: string[];
  metadata: Record<string, unknown>;
}

export interface PredictionFactor {
  name: string;
  importance: number;
  value: unknown;
  direction: string;
}

export interface SyncAnomaly {
  id: string;
  type: SyncAnomalyType;
  severity: string;
  description: string;
  sourceSystem: string;
  targetSystem: string;
  detectedAt: Date;
  affectedRecords: number;
  confidence: number;
  resolved: boolean;
  resolvedAt: Date | null;
  resolution: string | null;
  metadata: Record<string, unknown>;
}

export interface IntegrationRecommendation {
  id: string;
  type: AIRecommendationType;
  title: string;
  description: string;
  confidence: number;
  priority: string;
  sourceSystem: string;
  targetSystem: string;
  estimatedImpact: string;
  implementationEffort: string;
  steps: RecommendationStep[];
  createdAt: Date;
  expiresAt: Date;
  metadata: Record<string, unknown>;
}

export interface RecommendationStep {
  order: number;
  description: string;
  estimatedTime: string;
  dependencies: number[];
}

export interface AIExplanation {
  type: ExplanationType;
  confidence: number;
  factors: ExplanationFactor[];
  source: string;
  timestamp: Date;
  modelVersion: string;
  explanation: string;
  alternatives: ExplanationAlternative[];
}

export interface ExplanationFactor {
  name: string;
  importance: number;
  value: unknown;
  contribution: number;
  description: string;
}

export interface ExplanationAlternative {
  value: string;
  confidence: number;
  reasoning: string;
}

export interface AIConfig {
  id: string;
  institutionId: string;
  enabledModels: AIModelVersion[];
  defaultMatchingMethod: AIMatchingMethod;
  confidenceThreshold: number;
  autoApproveThreshold: number;
  anomalyDetectionEnabled: boolean;
  duplicateDetectionEnabled: boolean;
  qualityPredictionEnabled: boolean;
  maxConcurrentJobs: number;
  retryPolicy: RetryPolicy;
  cacheConfig: AICacheConfig;
  metadata: Record<string, unknown>;
}

export interface RetryPolicy {
  maxRetries: number;
  backoffMs: number;
  maxBackoffMs: number;
}

export interface AICacheConfig {
  enabled: boolean;
  ttlMs: number;
  maxSize: number;
}

export interface AIMetrics {
  totalMappings: number;
  successfulMappings: number;
  failedMappings: number;
  averageConfidence: number;
  totalAnomalies: number;
  resolvedAnomalies: number;
  totalDuplicates: number;
  resolvedDuplicates: number;
  totalNormalizations: number;
  successfulNormalizations: number;
  averageProcessingTime: number;
  modelAccuracy: number;
  lastCalculatedAt: Date;
}

export interface AITrainingJob {
  id: string;
  model: PredictionModel;
  status: string;
  trainingDataSize: number;
  accuracy: number | null;
  precision: number | null;
  recall: number | null;
  f1Score: number | null;
  startedAt: Date;
  completedAt: Date | null;
  metadata: Record<string, unknown>;
}

export interface AIModelPerformance {
  model: PredictionModel;
  version: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  lastEvaluated: Date;
  datasetSize: number;
}

export interface FieldSimilarity {
  sourceField: string;
  targetField: string;
  score: number;
  method: AIMatchingMethod;
  semanticSimilarity: number;
  syntacticSimilarity: number;
  statisticalSimilarity: number;
}

export interface SchemaCompatibility {
  sourceSchemaId: string;
  targetSchemaId: string;
  compatible: boolean;
  score: number;
  incompatibleFields: IncompatibleField[];
  warnings: SchemaWarning[];
}

export interface IncompatibleField {
  sourceField: string;
  targetField: string;
  reason: string;
  severity: string;
}

export interface SchemaWarning {
  field: string;
  message: string;
  severity: string;
}

export interface DataProfiling {
  id: string;
  datasetId: string;
  totalRecords: number;
  totalFields: number;
  completeness: number;
  uniqueness: number;
  fieldProfiles: FieldProfile[];
  profiledAt: Date;
}

export interface FieldProfile {
  fieldName: string;
  dataType: string;
  nullCount: number;
  uniqueCount: number;
  minLength: number | null;
  maxLength: number | null;
  minValue: unknown | null;
  maxValue: unknown | null;
  topValues: TopValue[];
  distribution: string | null;
}

export interface TopValue {
  value: unknown;
  count: number;
  percentage: number;
}

export interface AIRecommendationBatch {
  id: string;
  recommendations: IntegrationRecommendation[];
  status: string;
  totalProcessed: number;
  totalApproved: number;
  totalRejected: number;
  createdAt: Date;
  completedAt: Date | null;
}

export interface ModelTrainingData {
  id: string;
  model: PredictionModel;
  features: string[];
  labels: string[];
  size: number;
  splitRatio: TrainingSplit;
  createdAt: Date;
}

export interface TrainingSplit {
  train: number;
  validation: number;
  test: number;
}

export interface AnomalyPattern {
  id: string;
  type: AnomalyType;
  pattern: string;
  frequency: number;
  lastSeen: Date;
  severity: string;
  autoResolve: boolean;
}

export interface DuplicateCluster {
  id: string;
  records: string[];
  canonicalRecord: string | null;
  similarity: number;
  resolved: boolean;
  resolution: string | null;
  detectedAt: Date;
}

export interface QualityInsight {
  id: string;
  type: QualityPredictionType;
  insight: string;
  confidence: number;
  impact: string;
  recommendation: string;
  generatedAt: Date;
}

export interface MappingValidation {
  id: string;
  mappingId: string;
  valid: boolean;
  errors: MappingValidationError[];
  warnings: MappingValidationWarning[];
  validatedAt: Date;
}

export interface MappingValidationError {
  field: string;
  message: string;
  severity: string;
}

export interface MappingValidationWarning {
  field: string;
  message: string;
}

export interface SyncHealthCheck {
  id: string;
  syncId: string;
  status: string;
  latencyMs: number;
  throughput: number;
  errorRate: number;
  lastCheckedAt: Date;
  anomalies: SyncAnomaly[];
}

export interface DataHarmonization {
  id: string;
  sourceDatasets: string[];
  targetDataset: string;
  harmonizationRules: HarmonizationRule[];
  status: string;
  confidence: number;
  recordsProcessed: number;
  startedAt: Date;
  completedAt: Date | null;
}

export interface HarmonizationRule {
  id: string;
  sourceField: string;
  targetField: string;
  transformation: string;
  confidence: number;
}

export interface IdentityCluster {
  id: string;
  records: IdentityRecord[];
  canonicalRecord: string | null;
  confidence: number;
  resolved: boolean;
  detectedAt: Date;
}

export interface IdentityRecord {
  id: string;
  system: string;
  attributes: Record<string, string>;
  confidence: number;
}

export enum AIDataType {
  TEXT = "TEXT",
  NUMERIC = "NUMERIC",
  CATEGORICAL = "CATEGORICAL",
  DATE_TIME = "DATE_TIME",
  GEOGRAPHIC = "GEOGRAPHIC",
  SEMANTIC = "SEMANTIC",
  STRUCTURED = "STRUCTURED",
  UNSTRUCTURED = "UNSTRUCTURED",
}

export enum AIMappingPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum AIValidationStatus {
  PENDING = "PENDING",
  VALID = "VALID",
  INVALID = "INVALID",
  WARNING = "WARNING",
}

export enum AITransformationType {
  FORMAT = "FORMAT",
  UNIT = "UNIT",
  CURRENCY = "CURRENCY",
  ENCODING = "ENCODING",
  STRUCTURE = "STRUCTURE",
  SEMANTIC = "SEMANTIC",
}

export enum AIProcessingStatus {
  IDLE = "IDLE",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  QUEUED = "QUEUED",
}

export enum AIFeatureType {
  NUMERICAL = "NUMERICAL",
  CATEGORICAL = "CATEGORICAL",
  TEXT = "TEXT",
  BOOLEAN = "BOOLEAN",
  TEMPORAL = "TEMPORAL",
  EMBEDDING = "EMBEDDING",
}

export enum AIMetricType {
  ACCURACY = "ACCURACY",
  PRECISION = "PRECISION",
  RECALL = "RECALL",
  F1_SCORE = "F1_SCORE",
  AUC_ROC = "AUC_ROC",
  MSE = "MSE",
  MAE = "MAE",
}

export enum SchemaMappingStrategy {
  AUTOMATIC = "AUTOMATIC",
  SEMI_AUTOMATIC = "SEMI_AUTOMATIC",
  MANUAL = "MANUAL",
  HYBRID = "HYBRID",
}

export enum DuplicateResolutionStrategy {
  KEEP_NEWEST = "KEEP_NEWEST",
  KEEP_OLDEST = "KEEP_OLDEST",
  KEEP_MOST_COMPLETE = "KEEP_MOST_COMPLETE",
  MERGE = "MERGE",
  ASK_USER = "ASK_USER",
}

export enum IdentityMatchStrategy {
  EXACT = "EXACT",
  FUZZY = "FUZZY",
  PROBABILISTIC = "PROBABILISTIC",
  ML_BASED = "ML_BASED",
  ENSEMBLE = "ENSEMBLE",
}

export enum TranscriptMappingStandard {
  ECTS = "ECTS",
  US_CREDITS = "US_CREDITS",
  LOCAL = "LOCAL",
  CUSTOM = "CUSTOM",
}

export enum AnomalySeverity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum AIExplanationFormat {
  TEXT = "TEXT",
  VISUAL = "VISUAL",
  STRUCTURED = "STRUCTURED",
  DETAILED = "DETAILED",
  SUMMARY = "SUMMARY",
}

export enum DataNormalizationStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  PARTIAL = "PARTIAL",
  FAILED = "FAILED",
}

export enum SyncConflictResolution {
  SOURCE_WINS = "SOURCE_WINS",
  TARGET_WINS = "TARGET_WINS",
  MANUAL = "MANUAL",
  LATEST_TIMESTAMP = "LATEST_TIMESTAMP",
  MERGE = "MERGE",
}

export interface SchemaMappingResult {
  id: string;
  mappingId: string;
  sourceFields: string[];
  targetFields: string[];
  confidence: number;
  method: AIMatchingMethod;
  valid: boolean;
  issues: string[];
  createdAt: Date;
}

export interface AIBatchJob {
  id: string;
  type: string;
  status: AIProcessingStatus;
  totalRecords: number;
  processedRecords: number;
  failedRecords: number;
  startedAt: Date;
  completedAt: Date | null;
  results: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

export interface AIMappingSuggestion {
  id: string;
  sourceField: string;
  targetField: string;
  confidence: number;
  reason: string;
  alternatives: AIMappingAlternative[];
  createdAt: Date;
}

export interface AIMappingAlternative {
  field: string;
  score: number;
  reasoning: string;
}

export interface AIFeatureImportance {
  feature: string;
  importance: number;
  direction: string;
  description: string;
}

export interface AIModelEvaluation {
  id: string;
  model: PredictionModel;
  version: string;
  metrics: AIMetricResult[];
  datasetSize: number;
  evaluatedAt: Date;
}

export interface AIMetricResult {
  metric: AIMetricType;
  value: number;
  benchmark: number | null;
}

export interface SchemaMappingValidation {
  id: string;
  mappingId: string;
  status: AIValidationStatus;
  errors: string[];
  warnings: string[];
  validatedAt: Date;
}

export interface DataNormalizationRule {
  id: string;
  name: string;
  sourceFormat: string;
  targetFormat: string;
  transformation: AITransformationType;
  expression: string;
  priority: number;
  active: boolean;
}

export interface AnomalyDetectionResult {
  id: string;
  datasetId: string;
  anomalies: AnomalyDetection[];
  summary: AnomalyDetectionSummary;
  model: PredictionModel;
  confidence: number;
  detectedAt: Date;
}

export interface AnomalyDetectionSummary {
  totalRecords: number;
  anomalousRecords: number;
  anomalyRate: number;
  topAnomalyTypes: AnomalyType[];
}

export interface DuplicateClusterResult {
  id: string;
  clusters: DuplicateCluster[];
  totalDuplicates: number;
  duplicateRate: number;
  method: DuplicateDetectionMethod;
  detectedAt: Date;
}

export interface IdentityResolutionResult {
  id: string;
  matches: IdentityResolution[];
  totalResolved: number;
  resolutionRate: number;
  method: IdentityMatchStrategy;
  confidence: number;
  resolvedAt: Date;
}

export interface TranscriptMappingResult {
  id: string;
  sourceInstitution: string;
  targetInstitution: string;
  standard: TranscriptMappingStandard;
  mappings: TranscriptFieldMapping[];
  confidence: number;
  mappedAt: Date;
}

export interface TranscriptFieldMapping {
  sourceField: string;
  targetField: string;
  transformation: string;
  confidence: number;
}

export interface QualificationMappingResult {
  id: string;
  sourceQualification: string;
  targetQualification: string;
  sourceCountry: string;
  targetCountry: string;
  equivalence: QualificationEquivalence;
  confidence: number;
  mappedAt: Date;
}

export interface AIQualityAssessment {
  id: string;
  datasetId: string;
  overallScore: number;
  dimensionScores: AIQualityDimensionScore[];
  issues: AIQualityIssue[];
  recommendations: string[];
  assessedAt: Date;
}

export interface AIQualityDimensionScore {
  dimension: string;
  score: number;
  issues: number;
}

export interface AIQualityIssue {
  type: string;
  description: string;
  severity: string;
  affectedFields: string[];
  recommendation: string;
}

export interface SyncAnomalyDetectionResult {
  id: string;
  syncId: string;
  anomalies: SyncAnomaly[];
  totalAnomalies: number;
  severity: AnomalySeverity;
  detectedAt: Date;
}

export interface IntegrationRecommendationResult {
  id: string;
  recommendations: IntegrationRecommendation[];
  totalScore: number;
  confidence: number;
  generatedAt: Date;
}

export interface AIExplanationResult {
  id: string;
  type: ExplanationType;
  format: AIExplanationFormat;
  content: string;
  factors: ExplanationFactor[];
  confidence: number;
  generatedAt: Date;
  modelVersion: string;
}

export interface DataProfilingResult {
  id: string;
  datasetId: string;
  profile: DataProfiling;
  anomalies: AnomalyDetection[];
  qualityScore: number;
  profiledAt: Date;
}

export interface SchemaCompatibilityResult {
  id: string;
  compatibility: SchemaCompatibility;
  suggestions: string[];
  validatedAt: Date;
}

export interface FieldMatchingBatch {
  id: string;
  results: FieldMatching[];
  totalMatches: number;
  averageConfidence: number;
  processedAt: Date;
}

export interface AIBatchPrediction {
  id: string;
  model: PredictionModel;
  predictions: AIPrediction[];
  accuracy: number | null;
  processedAt: Date;
}

export interface AIPrediction {
  recordId: string;
  prediction: unknown;
  confidence: number;
  features: Record<string, unknown>;
}

export interface AIMappingAuditEntry {
  id: string;
  mappingId: string;
  action: string;
  performedBy: string;
  performedAt: Date;
  details: Record<string, unknown>;
}

export interface DataHarmonizationResult {
  id: string;
  harmonization: DataHarmonization;
  conflicts: DataHarmonizationConflict[];
  confidence: number;
  completedAt: Date;
}

export interface DataHarmonizationConflict {
  field: string;
  sourceValues: string[];
  resolution: string;
}

export interface AICompetencyAssessment {
  id: string;
  studentId: string;
  competencies: CompetencyAssessmentItem[];
  overallLevel: CompetencyLevel;
  confidence: number;
  assessedAt: Date;
}

export interface CompetencyAssessmentItem {
  competency: string;
  level: CompetencyLevel;
  score: number;
  evidence: string[];
}

export interface AIMatchingBatchResult {
  id: string;
  results: FieldMatching[];
  totalProcessed: number;
  averageConfidence: number;
  highConfidenceMatches: number;
  lowConfidenceMatches: number;
  processedAt: Date;
}

export interface AIIdentityClusterResult {
  id: string;
  clusters: IdentityCluster[];
  totalRecords: number;
  clusteredRecords: number;
  clusterRate: number;
  confidence: number;
  detectedAt: Date;
}

export interface AITransformationRule {
  id: string;
  name: string;
  sourceType: AIDataType;
  targetType: AIDataType;
  transformation: AITransformationType;
  expression: string;
  priority: number;
  active: boolean;
}

export interface AIBatchNormalization {
  id: string;
  datasetId: string;
  rules: DataNormalizationRule[];
  status: DataNormalizationStatus;
  recordsProcessed: number;
  recordsSucceeded: number;
  recordsFailed: number;
  startedAt: Date;
  completedAt: Date | null;
}

export interface AIFieldConfidenceScore {
  sourceField: string;
  targetField: string;
  overallConfidence: number;
  semanticScore: number;
  syntacticScore: number;
  statisticalScore: number;
  contextualScore: number;
}

export interface AISchemaMappingReport {
  id: string;
  sourceSchemaId: string;
  targetSchemaId: string;
  totalFields: number;
  mappedFields: number;
  unmappedFields: string[];
  averageConfidence: number;
  generatedAt: Date;
}

export interface AIAnomalyClassification {
  id: string;
  anomalyId: string;
  classification: AnomalyType;
  confidence: number;
  explanation: string;
  similarAnomalies: string[];
  classifiedAt: Date;
}

export interface AIDuplicateMergeResult {
  id: string;
  clusterId: string;
  canonicalRecordId: string;
  mergedFields: AIMergedField[];
  confidence: number;
  mergedAt: Date;
}

export interface AIMergedField {
  fieldName: string;
  sourceValue: string;
  targetValue: string;
  selectedValue: string;
  strategy: DuplicateResolutionStrategy;
}

export interface AIIdentityMatchResult {
  id: string;
  sourceRecordId: string;
  targetRecordId: string;
  overallScore: number;
  attributeScores: AIAttributeMatchScore[];
  strategy: IdentityMatchStrategy;
  matchedAt: Date;
}

export interface AIAttributeMatchScore {
  attribute: string;
  score: number;
  sourceValue: string;
  targetValue: string;
  method: AIMatchingMethod;
}

export interface AITranscriptMappingReport {
  id: string;
  sourceInstitution: string;
  targetInstitution: string;
  totalCourses: number;
  mappedCourses: number;
  unmappedCourses: string[];
  averageConfidence: number;
  generatedAt: Date;
}

export interface AICompetencyGapAnalysis {
  id: string;
  studentId: string;
  targetCompetencies: string[];
  currentCompetencies: CompetencyAssessmentItem[];
  gaps: AICompetencyGap[];
  overallReadiness: number;
  assessedAt: Date;
}

export interface AICompetencyGap {
  competency: string;
  currentLevel: CompetencyLevel;
  requiredLevel: CompetencyLevel;
  gapSize: number;
  recommendedActions: string[];
}

export interface AIPredictionConfidence {
  prediction: unknown;
  confidence: number;
  lowerBound: number;
  upperBound: number;
  factors: AIPredictionFactor[];
}

export interface AIPredictionFactor {
  feature: string;
  importance: number;
  value: unknown;
  direction: string;
}

export interface AISyncHealthReport {
  id: string;
  syncId: string;
  overallHealth: string;
  metrics: AISyncMetric[];
  anomalies: SyncAnomaly[];
  recommendations: string[];
  generatedAt: Date;
}

export interface AISyncMetric {
  name: string;
  value: number;
  benchmark: number;
  status: string;
}

export interface AIIntegrationComplexity {
  sourceSystem: string;
  targetSystem: string;
  complexityScore: number;
  factors: AIComplexityFactor[];
  estimatedEffort: string;
  recommendation: string;
}

export interface AIComplexityFactor {
  name: string;
  score: number;
  weight: number;
  description: string;
}

export interface AIMappingSuggestionBatch {
  id: string;
  suggestions: AIMappingSuggestion[];
  totalProcessed: number;
  highConfidenceCount: number;
  needsReviewCount: number;
  generatedAt: Date;
}

export interface AIFieldMappingConflict {
  id: string;
  sourceField: string;
  targetFields: string[];
  conflicts: string[];
  resolution: string | null;
  resolvedBy: string | null;
  resolvedAt: Date | null;
}

export interface AIDataQualityAnomaly {
  id: string;
  datasetId: string;
  field: string;
  anomalyType: AnomalyType;
  description: string;
  severity: AnomalySeverity;
  confidence: number;
  detectedAt: Date;
}

export interface AISchemaEvolutionPrediction {
  id: string;
  schemaId: string;
  predictedChange: string;
  probability: number;
  timeframe: string;
  factors: string[];
  predictedAt: Date;
}

export interface AICompetencyRecommendation {
  id: string;
  studentId: string;
  competency: string;
  currentLevel: CompetencyLevel;
  recommendedLevel: CompetencyLevel;
  learningPath: AILearningPathItem[];
  estimatedTime: string;
  confidence: number;
}

export interface AILearningPathItem {
  order: number;
  resource: string;
  type: string;
  estimatedDuration: string;
  prerequisites: string[];
}

export interface AISyncAnomalyTrend {
  id: string;
  syncId: string;
  anomalyType: SyncAnomalyType;
  frequency: number;
  trend: string;
  period: string;
  analyzedAt: Date;
}

export interface AIIdentityResolutionReport {
  id: string;
  totalRecords: number;
  resolvedRecords: number;
  unresolvedRecords: number;
  resolutionRate: number;
  averageConfidence: number;
  strategy: IdentityMatchStrategy;
  generatedAt: Date;
}

export interface AIGradientBoostingFeature {
  feature: string;
  gain: number;
  cover: number;
  frequency: number;
}

export interface AITransformerAttention {
  sourceToken: string;
  targetToken: string;
  weight: number;
  layer: number;
}

export interface AIEnsemblePrediction {
  id: string;
  model: PredictionModel;
  predictions: AIPrediction[];
  ensembleWeight: number;
  accuracy: number | null;
}

export interface AINormalizationMapping {
  id: string;
  sourceValue: string;
  targetValue: string;
  confidence: number;
  method: NormalizationType;
  examples: string[];
}

export interface AIDuplicatePattern {
  id: string;
  pattern: string;
  frequency: number;
  fields: string[];
  similarity: number;
  detectedAt: Date;
}

export interface AISchemaMappingAudit {
  id: string;
  mappingId: string;
  action: string;
  performedBy: string;
  performedAt: Date;
  changes: Record<string, unknown>;
}

export interface AICompetencyFrameworkMapping {
  id: string;
  sourceFramework: string;
  targetFramework: string;
  mappings: CompetencyMapping[];
  coverage: number;
  generatedAt: Date;
}

export interface AITrainingDataset {
  id: string;
  name: string;
  model: PredictionModel;
  size: number;
  features: string[];
  label: string;
  split: TrainingSplit;
  createdAt: Date;
}

export interface AIDriftDetectionResult {
  id: string;
  datasetId: string;
  driftDetected: boolean;
  driftScore: number;
  driftedFeatures: AIDriftedFeature[];
  baselineDate: Date;
  currentDate: Date;
  detectedAt: Date;
}

export interface AIDriftedFeature {
  feature: string;
  driftScore: number;
  distribution: string;
  significance: number;
}

export interface AIQualityPredictionResult {
  id: string;
  datasetId: string;
  predictions: DataQualityPrediction[];
  overallScore: number;
  confidence: number;
  generatedAt: Date;
}

export interface AIMappingConfidenceCalibration {
  id: string;
  mappingId: string;
  originalConfidence: number;
  calibratedConfidence: number;
  calibrationMethod: string;
  calibratedAt: Date;
}

export interface AINormalizationBatchResult {
  id: string;
  batchId: string;
  totalRecords: number;
  normalizedRecords: number;
  failedRecords: number;
  averageConfidence: number;
  completedAt: Date;
}
