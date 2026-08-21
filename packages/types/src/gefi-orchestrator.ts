export enum AgentType {
  FINANCIAL_ADVISOR = "FINANCIAL_ADVISOR",
  BUDGET = "BUDGET",
  PAYMENT = "PAYMENT",
  RECONCILIATION = "RECONCILIATION",
  SCHOLARSHIP = "SCHOLARSHIP",
  FUNDING = "FUNDING",
  FRAUD = "FRAUD",
  INVESTMENT = "INVESTMENT",
  CASH_FLOW = "CASH_FLOW",
  TAX = "TAX",
  RISK = "RISK",
  FORECAST = "FORECAST",
  COMPLIANCE = "COMPLIANCE",
  AUDIT = "AUDIT",
}

export enum AgentStatus {
  IDLE = "IDLE",
  PROCESSING = "PROCESSING",
  WAITING = "WAITING",
  ERROR = "ERROR",
  OFFLINE = "OFFLINE",
  MAINTENANCE = "MAINTENANCE",
  LEARNING = "LEARNING",
}

export enum TaskPriority {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  BACKGROUND = "BACKGROUND",
}

export enum TaskStatus {
  QUEUED = "QUEUED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  TIMEOUT = "TIMEOUT",
  RETRY = "RETRY",
}

export enum CollaborationType {
  SEQUENTIAL = "SEQUENTIAL",
  PARALLEL = "PARALLEL",
  CONSENSUS = "CONSENSUS",
  DELEGATION = "DELEGATION",
  AGGREGATION = "AGGREGATION",
}

export enum ModelType {
  RULE_BASED = "RULE_BASED",
  ML_SUPERVISED = "ML_SUPERVISED",
  ML_UNSUPERVISED = "ML_UNSUPERVISED",
  DEEP_LEARNING = "DEEP_LEARNING",
  REINFORCEMENT = "REINFORCEMENT",
  HYBRID = "HYBRID",
}

export enum OrchestrationMode {
  AUTONOMOUS = "AUTONOMOUS",
  SEMI_AUTONOMOUS = "SEMI_AUTONOMOUS",
  MANUAL = "MANUAL",
  SUPERVISED = "SUPERVISED",
}

export enum LearningType {
  SUPERVISED = "SUPERVISED",
  UNSUPERVISED = "UNSUPERVISED",
  REINFORCEMENT = "REINFORCEMENT",
  TRANSFER = "TRANSFER",
  ONLINE = "ONLINE",
}

export enum WorkflowStep {
  INIT = "INIT",
  ANALYZE = "ANALYZE",
  DECIDE = "DECIDE",
  EXECUTE = "EXECUTE",
  VALIDATE = "VALIDATE",
  REPORT = "REPORT",
}

export enum MessageType {
  REQUEST = "REQUEST",
  RESPONSE = "RESPONSE",
  NOTIFICATION = "NOTIFICATION",
  BROADCAST = "BROADCAST",
}

export enum InsightType {
  ANOMALY = "ANOMALY",
  OPTIMIZATION = "OPTIMIZATION",
  TREND = "TREND",
  RISK = "RISK",
  OPPORTUNITY = "OPPORTUNITY",
}

export enum AgentHealthStatus {
  HEALTHY = "HEALTHY",
  DEGRADED = "DEGRADED",
  UNHEALTHY = "UNHEALTHY",
  UNKNOWN = "UNKNOWN",
}

export enum TaskDependencyType {
  BLOCKING = "BLOCKING",
  NON_BLOCKING = "NON_BLOCKING",
  OPTIONAL = "OPTIONAL",
}

export enum OrchestrationPhase {
  PLANNING = "PLANNING",
  EXECUTION = "EXECUTION",
  MONITORING = "MONITORING",
  REPORTING = "REPORTING",
}

export enum AgentCommunicationProtocol {
  SYNC = "SYNC",
  ASYNC = "ASYNC",
  EVENT_DRIVEN = "EVENT_DRIVEN",
}

export interface FinanceAgent {
  id: string;
  schoolId: string;
  agentType: AgentType;
  name: string;
  description: string;
  status: AgentStatus;
  modelType: ModelType;
  capabilities: string[];
  currentTaskId: string | null;
  totalTasksProcessed: number;
  successRate: number;
  averageResponseTime: number;
  lastActiveAt: Date;
  config: AgentConfiguration;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface AgentTask {
  id: string;
  schoolId: string;
  agentId: string;
  taskType: string;
  priority: TaskPriority;
  status: TaskStatus;
  input: Record<string, unknown>;
  output: Record<string, unknown> | null;
  dependencies: string[];
  assignedAt: Date;
  startedAt: Date | null;
  completedAt: Date | null;
  error: string | null;
  retryCount: number;
  maxRetries: number;
  timeout: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface AgentResult {
  id: string;
  schoolId: string;
  taskId: string;
  agentId: string;
  status: TaskStatus;
  result: Record<string, unknown>;
  confidence: number;
  executionTime: number;
  modelVersion: string;
  factors: AgentResultFactor[];
  recommendations: string[];
  generatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface AgentResultFactor {
  factor: string;
  importance: number;
  value: number;
}

export interface AgentCollaboration {
  id: string;
  schoolId: string;
  collaborationType: CollaborationType;
  agentIds: string[];
  coordinatorId: string;
  taskId: string;
  status: string;
  sharedContext: Record<string, unknown>;
  consensusThreshold: number;
  startedAt: Date;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface AgentLearning {
  id: string;
  schoolId: string;
  agentId: string;
  learningType: LearningType;
  datasetSize: number;
  trainingDuration: number;
  accuracyBefore: number;
  accuracyAfter: number;
  improvement: number;
  featuresUsed: string[];
  modelVersion: string;
  trainingDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface AgentPerformance {
  id: string;
  schoolId: string;
  agentId: string;
  period: string;
  tasksCompleted: number;
  tasksFailed: number;
  successRate: number;
  averageResponseTime: number;
  averageConfidence: number;
  totalProcessingTime: number;
  resourceUsage: ResourceUsage;
  uptimePercent: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ResourceUsage {
  cpuPercent: number;
  memoryMb: number;
  storageMb: number;
  apiCallsCount: number;
}

export interface AgentWorkflow {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  steps: WorkflowStepDefinition[];
  triggerCondition: string;
  enabled: boolean;
  lastExecutedAt: Date | null;
  totalExecutions: number;
  successRate: number;
  averageDuration: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface WorkflowStepDefinition {
  step: WorkflowStep;
  agentType: AgentType;
  action: string;
  timeout: number;
  retries: number;
}

export interface OrchestrationPlan {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  mode: OrchestrationMode;
  objective: string;
  steps: OrchestrationPlanStep[];
  estimatedDuration: number;
  requiredAgents: AgentType[];
  constraints: string[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface OrchestrationPlanStep {
  order: number;
  agentType: AgentType;
  action: string;
  input: Record<string, unknown>;
  dependencies: number[];
}

export interface OrchestrationExecution {
  id: string;
  schoolId: string;
  planId: string;
  mode: OrchestrationMode;
  status: TaskStatus;
  currentStep: number;
  totalSteps: number;
  results: AgentResult[];
  startedAt: Date;
  completedAt: Date | null;
  duration: number;
  error: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface OrchestrationInsight {
  id: string;
  schoolId: string;
  executionId: string;
  insightType: InsightType;
  title: string;
  description: string;
  severity: string;
  actionable: boolean;
  recommendedActions: string[];
  relatedAgentIds: string[];
  generatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface AgentConfiguration {
  agentType: AgentType;
  modelType: ModelType;
  parameters: Record<string, number>;
  thresholds: Record<string, number>;
  enabledFeatures: string[];
  maxConcurrentTasks: number;
  timeoutSeconds: number;
  retryPolicy: RetryPolicy;
}

export interface RetryPolicy {
  maxRetries: number;
  backoffMs: number;
  maxBackoffMs: number;
}

export interface AgentAudit {
  id: string;
  schoolId: string;
  agentId: string;
  action: string;
  details: string;
  input: Record<string, unknown>;
  output: Record<string, unknown> | null;
  performedBy: string;
  timestamp: Date;
  ipAddress: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CrossAgentMessage {
  id: string;
  schoolId: string;
  fromAgentId: string;
  toAgentId: string;
  messageType: MessageType;
  payload: Record<string, unknown>;
  priority: TaskPriority;
  status: string;
  sentAt: Date;
  receivedAt: Date | null;
  processedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FinancialAdvisorAgent {
  id: string;
  schoolId: string;
  agentId: string;
  specializations: string[];
  advisoryScope: string[];
  clientSegment: string;
  responseStyle: string;
  consultationCount: number;
  satisfactionScore: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface BudgetAgent {
  id: string;
  schoolId: string;
  agentId: string;
  budgetCycles: string[];
  forecastHorizon: number;
  optimizationGoal: string;
  alertsEnabled: boolean;
  lastBudgetReview: Date;
  accuracyRate: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface PaymentAgent {
  id: string;
  schoolId: string;
  agentId: string;
  supportedMethods: string[];
  processingLimits: Record<string, number>;
  autoReconciliation: boolean;
  fraudDetection: boolean;
  totalProcessed: number;
  successRate: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ReconciliationAgent {
  id: string;
  schoolId: string;
  agentId: string;
  reconciliationTypes: string[];
  autoMatchThreshold: number;
  processingMode: string;
  lastRunDate: Date;
  matchRate: number;
  unmatchedCount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ScholarshipAgent {
  id: string;
  schoolId: string;
  agentId: string;
  scholarshipPrograms: string[];
  eligibilityCriteria: string[];
  disbursementMethod: string;
  totalDisbursed: number;
  recipientCount: number;
  accuracyRate: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FundingAgent {
  id: string;
  schoolId: string;
  agentId: string;
  fundingSources: string[];
  trackingFrequency: string;
  diversificationTarget: number;
  totalFundingManaged: number;
  gapClosureRate: number;
  lastAssessment: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FraudAgent {
  id: string;
  schoolId: string;
  agentId: string;
  detectionRules: string[];
  monitoringScope: string[];
  alertThreshold: number;
  falsePositiveTarget: number;
  totalAlerts: number;
  confirmedFrauds: number;
  amountRecovered: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface InvestmentAgent {
  id: string;
  schoolId: string;
  agentId: string;
  investmentTypes: string[];
  riskTolerance: string;
  rebalanceFrequency: string;
  totalInvested: number;
  currentReturn: number;
  benchmarkComparison: number;
  lastRebalance: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CashFlowAgent {
  id: string;
  schoolId: string;
  agentId: string;
  forecastHorizon: number;
  monitoringFrequency: string;
  alertThresholds: Record<string, number>;
  runwayMonths: number;
  liquidityScore: number;
  lastForecast: Date;
  accuracyRate: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface TaxAgent {
  id: string;
  schoolId: string;
  agentId: string;
  jurisdictions: string[];
  taxTypes: string[];
  filingFrequency: string;
  complianceRate: number;
  totalTaxManaged: number;
  savingsIdentified: number;
  lastFilingDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface RiskAgent {
  id: string;
  schoolId: string;
  agentId: string;
  riskCategories: string[];
  assessmentFrequency: string;
  mitigationStrategies: string[];
  overallRiskScore: number;
  risksMitigated: number;
  lastAssessment: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ForecastAgent {
  id: string;
  schoolId: string;
  agentId: string;
  forecastModels: string[];
  forecastHorizon: number;
  accuracyTarget: number;
  lastModelRetrain: Date;
  currentAccuracy: number;
  totalForecasts: number;
  averageConfidence: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
