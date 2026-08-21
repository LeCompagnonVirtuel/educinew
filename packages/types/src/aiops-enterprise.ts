// ========================================
// MODULE 12: AIOPS ENTERPRISE
// ========================================

// ----------------------------------------
// ENUMS
// ----------------------------------------

export enum AutoScalingTrigger {
  CPU = 'CPU',
  MEMORY = 'MEMORY',
  REQUEST_COUNT = 'REQUEST_COUNT',
  QUEUE_DEPTH = 'QUEUE_DEPTH',
  LATENCY = 'LATENCY',
  CUSTOM_METRIC = 'CUSTOM_METRIC',
  SCHEDULE = 'SCHEDULE',
  PREDICTIVE = 'PREDICTIVE',
}

export enum AutoScalingPolicy {
  TARGET_TRACKING = 'TARGET_TRACKING',
  STEP_SCALING = 'STEP_SCALING',
  SIMPLE_SCALING = 'SIMPLE_SCALING',
  PREDICTIVE = 'PREDICTIVE',
  SCHEDULED = 'SCHEDULED',
}

export enum HealingAction {
  RESTART = 'RESTART',
  REPLACE = 'REPLACE',
  SCALE = 'SCALE',
  FAILOVER = 'FAILOVER',
  ROLLBACK = 'ROLLBACK',
  DRAIN = 'DRAIN',
  ISOLATE = 'ISOLATE',
}

export enum RecoveryStrategy {
  AUTOMATIC = 'AUTOMATIC',
  SEMI_AUTOMATIC = 'SEMI_AUTOMATIC',
  MANUAL = 'MANUAL',
  CHAOS_ENGINEERING = 'CHAOS_ENGINEERING',
}

export enum DiagnosticType {
  LOG_ANALYSIS = 'LOG_ANALYSIS',
  METRIC_CORRELATION = 'METRIC_CORRELATION',
  TRACE_ANALYSIS = 'TRACE_ANALYSIS',
  ROOT_CAUSE = 'ROOT_CAUSE',
  IMPACT_ANALYSIS = 'IMPACT_ANALYSIS',
}

export enum OptimizationGoal {
  COST = 'COST',
  PERFORMANCE = 'PERFORMANCE',
  RELIABILITY = 'RELIABILITY',
  EFFICIENCY = 'EFFICIENCY',
  BALANCED = 'BALANCED',
}

export enum SchedulingStrategy {
  ROUND_ROBIN = 'ROUND_ROBIN',
  LEAST_LOADED = 'LEAST_LOADED',
  AFFINITY = 'AFFINITY',
  PRIORITY = 'PRIORITY',
  FAIR_SHARE = 'FAIR_SHARE',
  PREDICTIVE = 'PREDICTIVE',
}

export enum IncidentSeverity {
  P1 = 'P1',
  P2 = 'P2',
  P3 = 'P3',
  P4 = 'P4',
  P5 = 'P5',
}

export enum IncidentType {
  AVAILABILITY = 'AVAILABILITY',
  PERFORMANCE = 'PERFORMANCE',
  SECURITY = 'SECURITY',
  DATA = 'DATA',
  CONFIGURATION = 'CONFIGURATION',
  DEPENDENCY = 'DEPENDENCY',
}

export enum ResponseAction {
  ESCALATE = 'ESCALATE',
  REMEDIATE = 'REMEDIATE',
  NOTIFY = 'NOTIFY',
  ISOLATE = 'ISOLATE',
  THROTTLE = 'THROTTLE',
  REDIRECT = 'REDIRECT',
}

export enum ResourceAllocation {
  CPU = 'CPU',
  MEMORY = 'MEMORY',
  DISK = 'DISK',
  NETWORK = 'NETWORK',
  GPU = 'GPU',
  CUSTOM = 'CUSTOM',
}

export enum PredictionModel {
  LINEAR_REGRESSION = 'LINEAR_REGRESSION',
  ARIMA = 'ARIMA',
  PROPHET = 'PROPHET',
  LSTM = 'LSTM',
  ENSEMBLE = 'ENSEMBLE',
  TRANSFORMER = 'TRANSFORMER',
}

export enum MaintenanceType {
  PREVENTIVE = 'PREVENTIVE',
  CORRECTIVE = 'CORRECTIVE',
  PREDICTIVE = 'PREDICTIVE',
  ADAPTIVE = 'ADAPTIVE',
}

export enum CapacityOptimization {
  RIGHT_SIZING = 'RIGHT_SIZING',
  COMPACTION = 'COMPACTION',
  CONSOLIDATION = 'CONSOLIDATION',
  ELASTICITY = 'ELASTICITY',
  OVERPROVISIONING = 'OVERPROVISIONING',
}

export enum PerformanceOptimization {
  CACHING = 'CACHING',
  CONNECTION_POOLING = 'CONNECTION_POOLING',
  QUERY_OPTIMIZATION = 'QUERY_OPTIMIZATION',
  LOAD_BALANCING = 'LOAD_BALANCING',
  CDN = 'CDN',
}

export enum CostOptimization {
  RESERVED_INSTANCES = 'RESERVED_INSTANCES',
  SPOT_INSTANCES = 'SPOT_INSTANCES',
  RIGHTSIZING = 'RIGHTSIZING',
  SCHEDULED_SCALING = 'SCHEDULED_SCALING',
  RESOURCE_POOLING = 'RESOURCE_POOLING',
}

export enum SecurityOptimization {
  VULNERABILITY_PATCHING = 'VULNERABILITY_PATCHING',
  ACCESS_CONTROL = 'ACCESS_CONTROL',
  ENCRYPTION = 'ENCRYPTION',
  NETWORK_SEGREGATION = 'NETWORK_SEGREGATION',
  THREAT_DETECTION = 'THREAT_DETECTION',
}

export enum ComplianceOptimization {
  POLICY_ENFORCEMENT = 'POLICY_ENFORCEMENT',
  AUDIT_AUTOMATION = 'AUDIT_AUTOMATION',
  CERTIFICATION = 'CERTIFICATION',
  REPORTING = 'REPORTING',
  REMEDIATION = 'REMEDIATION',
}

export enum AIModelType {
  CLASSIFICATION = 'CLASSIFICATION',
  REGRESSION = 'REGRESSION',
  CLUSTERING = 'CLUSTERING',
  ANOMALY_DETECTION = 'ANOMALY_DETECTION',
  NLP = 'NLP',
  REINFORCEMENT = 'REINFORCEMENT',
}

export enum TrainingData {
  HISTORICAL = 'HISTORICAL',
  SYNTHETIC = 'SYNTHETIC',
  TRANSFER = 'TRANSFER',
  FEDERATED = 'FEDERATED',
  STREAMING = 'STREAMING',
}

export enum InferenceMode {
  BATCH = 'BATCH',
  REAL_TIME = 'REAL_TIME',
  EDGE = 'EDGE',
  STREAMING = 'STREAMING',
  ASYNCHRONOUS = 'ASYNCHRONOUS',
}

export enum DeploymentMode {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  SHADOW = 'SHADOW',
  CANARY = 'CANARY',
  A_B = 'A_B',
}

export enum ABTestStatus {
  DRAFT = 'DRAFT',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum CanaryStrategy {
  WEIGHTED = 'WEIGHTED',
  HEADER_BASED = 'HEADER_BASED',
  USER_SEGMENT = 'USER_SEGMENT',
  GEOGRAPHIC = 'GEOGRAPHIC',
}

export enum RollbackReason {
  ERROR_RATE = 'ERROR_RATE',
  LATENCY = 'LATENCY',
  BUSINESS_IMPACT = 'BUSINESS_IMPACT',
  MANUAL = 'MANUAL',
  DEPENDENCY = 'DEPENDENCY',
}

export enum ChangeImpact {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum RiskLevel {
  MINIMAL = 'MINIMAL',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export enum WorkflowStep {
  VALIDATE = 'VALIDATE',
  APPROVE = 'APPROVE',
  EXECUTE = 'EXECUTE',
  VERIFY = 'VERIFY',
  ROLLBACK = 'ROLLBACK',
  NOTIFY = 'NOTIFY',
}

export enum OrchestrationMode {
  SEQUENTIAL = 'SEQUENTIAL',
  PARALLEL = 'PARALLEL',
  CONDITIONAL = 'CONDITIONAL',
  LOOP = 'LOOP',
}

export enum PipelineStage {
  BUILD = 'BUILD',
  TEST = 'TEST',
  SECURITY = 'SECURITY',
  STAGING = 'STAGING',
  DEPLOY = 'DEPLOY',
  VERIFY = 'VERIFY',
}

export enum ExecutionStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  TIMEOUT = 'TIMEOUT',
}

export enum RetryPolicy {
  NONE = 'NONE',
  FIXED = 'FIXED',
  EXPONENTIAL = 'EXPONENTIAL',
  LINEAR = 'LINEAR',
}

export enum CircuitBreakerState {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  HALF_OPEN = 'HALF_OPEN',
}

export enum BulkheadIsolation {
  THREAD_POOL = 'THREAD_POOL',
  SEMAPHORE = 'SEMAPHORE',
  CONNECTION_POOL = 'CONNECTION_POOL',
}

export enum RateLimitStrategy {
  FIXED_WINDOW = 'FIXED_WINDOW',
  SLIDING_WINDOW = 'SLIDING_WINDOW',
  TOKEN_BUCKET = 'TOKEN_BUCKET',
  LEAKY_BUCKET = 'LEAKY_BUCKET',
}

export enum CacheStrategy {
  WRITE_THROUGH = 'WRITE_THROUGH',
  WRITE_BACK = 'WRITE_BACK',
  WRITE_AROUND = 'WRITE_AROUND',
  READ_THROUGH = 'READ_THROUGH',
  CACHE_ASIDE = 'CACHE_ASIDE',
}

export enum QueueStrategy {
  FIFO = 'FIFO',
  LIFO = 'LIFO',
  PRIORITY = 'PRIORITY',
  ROUND_ROBIN = 'ROUND_ROBIN',
}

export enum LoadBalancingStrategy {
  ROUND_ROBIN = 'ROUND_ROBIN',
  LEAST_CONNECTIONS = 'LEAST_CONNECTIONS',
  IP_HASH = 'IP_HASH',
  LEAST_RESPONSE_TIME = 'LEAST_RESPONSE_TIME',
  WEIGHTED = 'WEIGHTED',
}

export enum FailoverMode {
  AUTOMATIC = 'AUTOMATIC',
  MANUAL = 'MANUAL',
  PROBES = 'PROBES',
}

// ----------------------------------------
// INTERFACES
// ----------------------------------------

export interface AutoScalingConfig {
  id: string;
  name: string;
  service: string;
  minInstances: number;
  maxInstances: number;
  desiredInstances: number;
  trigger: AutoScalingTrigger;
  policy: AutoScalingPolicy;
  targetValue: number;
  scaleUpCooldown: number;
  scaleDownCooldown: number;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AutoScalingEvent {
  id: string;
  configId: string;
  trigger: AutoScalingTrigger;
  previousInstances: number;
  newInstances: number;
  reason: string;
  timestamp: string;
  duration: number;
}

export interface AutoScalingMetric {
  id: string;
  configId: string;
  trigger: AutoScalingTrigger;
  value: number;
  targetValue: number;
  utilization: number;
  timestamp: string;
}

export interface AutoHealingRule {
  id: string;
  name: string;
  service: string;
  condition: string;
  action: HealingAction;
  cooldown: number;
  maxRetries: number;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AutoHealingEvent {
  id: string;
  ruleId: string;
  action: HealingAction;
  instance: string;
  reason: string;
  success: boolean;
  timestamp: string;
  duration: number;
  retries: number;
}

export interface AutoRecoveryPlan {
  id: string;
  name: string;
  description: string;
  service: string;
  strategy: RecoveryStrategy;
  steps: RecoveryStep[];
  estimatedRecoveryTime: number;
  lastTested: string;
  enabled: boolean;
}

export interface RecoveryStep {
  order: number;
  action: HealingAction;
  description: string;
  timeout: number;
  rollbackOnFailure: boolean;
}

export interface SelfDiagnostic {
  id: string;
  name: string;
  service: string;
  type: DiagnosticType;
  schedule: string;
  lastRun: string;
  nextRun: string;
  enabled: boolean;
}

export interface DiagnosticReport {
  id: string;
  diagnosticId: string;
  service: string;
  status: string;
  findings: DiagnosticFinding[];
  score: number;
  recommendations: string[];
  generatedAt: string;
}

export interface DiagnosticFinding {
  area: string;
  severity: string;
  description: string;
  recommendation: string;
  impact: string;
}

export interface CapacityOptimizer {
  id: string;
  name: string;
  service: string;
  goal: OptimizationGoal;
  currentCapacity: CapacityState;
  recommendations: CapacityRecommendation[];
  lastAnalysis: string;
  nextAnalysis: string;
}

export interface CapacityState {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  instances: number;
}

export interface CapacityRecommendation {
  id: string;
  type: CapacityOptimization;
  resource: ResourceAllocation;
  currentValue: number;
  recommendedValue: number;
  unit: string;
  estimatedSaving: number;
  confidence: number;
  reason: string;
  priority: RiskLevel;
}

export interface PredictiveMaintenance {
  id: string;
  name: string;
  service: string;
  type: MaintenanceType;
  schedule: string;
  predictions: MaintenancePrediction[];
  enabled: boolean;
}

export interface MaintenanceSchedule {
  id: string;
  name: string;
  type: MaintenanceType;
  service: string;
  frequency: string;
  nextExecution: string;
  lastExecution: string;
  estimatedDuration: number;
  enabled: boolean;
}

export interface MaintenancePrediction {
  id: string;
  component: string;
  predictedFailure: string;
  confidence: number;
  timeHorizon: string;
  recommendedAction: string;
  priority: RiskLevel;
}

export interface IntelligentScheduler {
  id: string;
  name: string;
  strategy: SchedulingStrategy;
  optimizationGoal: OptimizationGoal;
  rules: SchedulingRule[];
  metrics: ScheduleMetrics;
  enabled: boolean;
}

export interface ScheduleOptimization {
  id: string;
  schedulerId: string;
  currentEfficiency: number;
  optimizedEfficiency: number;
  improvement: number;
  changes: SchedulingChange[];
  generatedAt: string;
}

export interface SchedulingChange {
  task: string;
  currentTime: string;
  optimizedTime: string;
  reason: string;
  estimatedImprovement: number;
}

export interface AIIncidentResponse {
  id: string;
  name: string;
  service: string;
  type: IncidentType;
  severity: IncidentSeverity;
  actions: ResponseActionRecord[];
  autoRemediation: boolean;
  enabled: boolean;
}

export interface IncidentAnalysis {
  id: string;
  incidentId: string;
  rootCause: string;
  contributingFactors: string[];
  impact: IncidentImpact;
  recommendations: string[];
  confidence: number;
  generatedAt: string;
}

export interface IncidentImpact {
  duration: number;
  affectedUsers: number;
  affectedServices: string[];
  financialImpact: number;
  reputationImpact: string;
}

export interface AIResourceAllocation {
  id: string;
  name: string;
  service: string;
  currentAllocation: ResourceState;
  recommendations: ResourceRecommendation[];
  lastOptimized: string;
}

export interface ResourceRecommendation {
  id: string;
  resource: ResourceAllocation;
  currentValue: number;
  recommendedValue: number;
  unit: string;
  costSaving: number;
  performanceImpact: string;
  confidence: number;
  reason: string;
}

export interface ResourceState {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

export interface AIOptimization {
  id: string;
  name: string;
  service: string;
  type: PerformanceOptimization;
  status: string;
  improvement: number;
  before: OptimizationMetric[];
  after: OptimizationMetric[];
  implementedAt: string;
}

export interface OptimizationReport {
  id: string;
  name: string;
  period: string;
  totalOptimizations: number;
  costSaving: number;
  performanceImprovement: number;
  reliabilityImprovement: number;
  optimizations: AIOptimization[];
  generatedAt: string;
}

export interface OptimizationMetric {
  name: string;
  value: number;
  unit: string;
}

export interface AIModel {
  id: string;
  name: string;
  type: AIModelType;
  version: string;
  status: string;
  trainingData: TrainingData;
  accuracy: number;
  lastTrained: string;
  nextRetraining: string;
  config: Record<string, unknown>;
}

export interface ModelTraining {
  id: string;
  modelId: string;
  dataset: string;
  epochs: number;
  loss: number;
  accuracy: number;
  startedAt: string;
  completedAt: string;
  duration: number;
}

export interface ModelInference {
  id: string;
  modelId: string;
  mode: InferenceMode;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  confidence: number;
  latency: number;
  timestamp: string;
}

export interface ABTest {
  id: string;
  name: string;
  description: string;
  status: ABTestStatus;
  variants: ABTestVariant[];
  metric: string;
  targetImprovement: number;
  currentImprovement: number;
  statisticalSignificance: number;
  startDate: string;
  endDate?: string;
  minSampleSize: number;
  currentSampleSize: number;
}

export interface ABTestVariant {
  id: string;
  name: string;
  percentage: number;
  isControl: boolean;
  metrics: ABTestMetric[];
}

export interface ABTestMetric {
  name: string;
  value: number;
  change: number;
  pValue: number;
}

export interface CanaryDeployment {
  id: string;
  name: string;
  service: string;
  strategy: CanaryStrategy;
  currentStep: number;
  totalSteps: number;
  trafficPercentage: number;
  status: DeploymentStatus;
  healthCheck: HealthCheck;
  metrics: CanaryMetric[];
  startedAt: string;
  completedAt?: string;
}

export interface CanaryMetric {
  name: string;
  baseline: number;
  canary: number;
  difference: number;
  isHealthy: boolean;
}

export interface RollbackPlan {
  id: string;
  name: string;
  service: string;
  version: string;
  reason: RollbackReason[];
  steps: RollbackStep[];
  estimatedTime: number;
  lastTested: string;
}

export interface RollbackStep {
  order: number;
  action: string;
  description: string;
  timeout: number;
  verificationCommand?: string;
}

export interface ChangeRequestAI {
  id: string;
  title: string;
  description: string;
  type: string;
  riskLevel: RiskLevel;
  impact: ChangeImpact;
  approvals: ChangeApproval[];
  autoGenerated: boolean;
  aiConfidence: number;
  createdAt: string;
}

export interface ChangeApproval {
  id: string;
  approver: string;
  status: ApprovalStatus;
  comments?: string;
  timestamp: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStepConfig[];
  orchestration: OrchestrationMode;
  triggers: WorkflowTrigger[];
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowStepConfig {
  order: number;
  name: string;
  type: WorkflowStep;
  action: string;
  parameters: Record<string, unknown>;
  timeout: number;
  retryPolicy: RetryPolicy;
  onError: string;
}

export interface WorkflowTrigger {
  type: string;
  config: Record<string, unknown>;
}

export interface WorkflowRun {
  id: string;
  workflowId: string;
  status: ExecutionStatus;
  startedAt: string;
  completedAt?: string;
  duration?: number;
  steps: WorkflowStepRun[];
  trigger: string;
  parameters: Record<string, unknown>;
}

export interface WorkflowStepRun {
  stepName: string;
  status: ExecutionStatus;
  startedAt: string;
  completedAt?: string;
  duration?: number;
  output?: Record<string, unknown>;
  error?: string;
}

export interface Pipeline {
  id: string;
  name: string;
  service: string;
  stages: PipelineStageConfig[];
  triggers: PipelineTrigger[];
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PipelineStageConfig {
  stage: PipelineStage;
  name: string;
  steps: PipelineStep[];
  approvalRequired: boolean;
  approvers?: string[];
}

export interface PipelineStep {
  name: string;
  command: string;
  timeout: number;
  environment?: Record<string, string>;
}

export interface PipelineTrigger {
  type: string;
  branch?: string;
  event?: string;
}

export interface PipelineRun {
  id: string;
  pipelineId: string;
  status: ExecutionStatus;
  commit: string;
  branch: string;
  startedAt: string;
  completedAt?: string;
  duration?: number;
  stages: PipelineStageRun[];
  triggeredBy: string;
}

export interface PipelineStageRun {
  stage: PipelineStage;
  status: ExecutionStatus;
  startedAt: string;
  completedAt?: string;
  duration?: number;
  steps: PipelineStepRun[];
}

export interface HealthCheckAI {
  id: string;
  name: string;
  service: string;
  interval: number;
  timeout: number;
  checks: HealthCheckConfig[];
  alertOnFailure: boolean;
  enabled: boolean;
}

export interface HealthCheckConfig {
  name: string;
  type: string;
  endpoint?: string;
  command?: string;
  expectedStatus?: number;
  expectedContent?: string;
}

export interface HealthStatus {
  id: string;
  service: string;
  overall: string;
  checks: HealthCheckDetail[];
  lastCheck: string;
  uptime: number;
}

export interface HealthCheckDetail {
  name: string;
  status: string;
  message?: string;
  duration: number;
  lastCheck: string;
}

export interface CircuitBreaker {
  id: string;
  name: string;
  service: string;
  state: CircuitBreakerState;
  failureThreshold: number;
  successThreshold: number;
  timeout: number;
  failureCount: number;
  successCount: number;
  lastStateChange: string;
  enabled: boolean;
}

export interface Bulkhead {
  id: string;
  name: string;
  service: string;
  type: BulkheadIsolation;
  maxConcurrency: number;
  currentConcurrency: number;
  waitingCount: number;
  timeout: number;
  enabled: boolean;
}

export interface RateLimiter {
  id: string;
  name: string;
  service: string;
  strategy: RateLimitStrategy;
  limit: number;
  window: number;
  currentUsage: number;
  throttleCount: number;
  enabled: boolean;
}

export interface CacheEntry {
  id: string;
  key: string;
  value: string;
  strategy: CacheStrategy;
  ttl: number;
  hitCount: number;
  missCount: number;
  hitRate: number;
  size: number;
  createdAt: string;
  expiresAt: string;
}

export interface QueueConfig {
  id: string;
  name: string;
  strategy: QueueStrategy;
  maxSize: number;
  currentSize: number;
  consumers: number;
  producers: number;
  throughput: number;
  avgProcessingTime: number;
  deadLetterQueue: boolean;
}

export interface LoadBalancerConfig {
  id: string;
  name: string;
  strategy: LoadBalancingStrategy;
  targets: LoadBalancerTarget[];
  healthCheck: HealthCheck;
  stickySession: boolean;
  enabled: boolean;
}

export interface LoadBalancerTarget {
  id: string;
  address: string;
  port: number;
  weight: number;
  healthy: boolean;
  activeConnections: number;
}

export interface FailoverConfig {
  id: string;
  name: string;
  service: string;
  mode: FailoverMode;
  primaryTarget: string;
  secondaryTarget: string;
  healthCheckInterval: number;
  failoverThreshold: number;
  autoFailback: boolean;
  lastFailover?: string;
  enabled: boolean;
}

export interface SelfHealingConfig {
  id: string;
  name: string;
  service: string;
  rules: SelfHealingRule[];
  enabled: boolean;
}

export interface SelfHealingRule {
  condition: string;
  action: HealingAction;
  cooldown: number;
  maxRetries: number;
}

export interface DiagnosticConfig {
  id: string;
  name: string;
  service: string;
  types: DiagnosticType[];
  schedule: string;
  autoRemediate: boolean;
  enabled: boolean;
}

export interface OptimizationConfig {
  id: string;
  name: string;
  service: string;
  goals: OptimizationGoal[];
  schedule: string;
  autoImplement: boolean;
  enabled: boolean;
}

export interface PredictionConfig {
  id: string;
  name: string;
  service: string;
  model: PredictionModel;
  metrics: string[];
  forecastHorizon: string;
  confidenceThreshold: number;
  enabled: boolean;
}

export interface AIConfig {
  id: string;
  name: string;
  service: string;
  models: string[];
  inferenceMode: InferenceMode;
  deploymentMode: DeploymentMode;
  autoScaling: AutoScalingConfig;
  autoHealing: AutoHealingRule[];
  diagnostics: DiagnosticConfig[];
  optimizations: OptimizationConfig[];
  predictions: PredictionConfig[];
  enabled: boolean;
}
