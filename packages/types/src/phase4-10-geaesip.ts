import { z } from 'zod';

// =============================================================================
// MODULE 1 — Super Intelligence Core
// =============================================================================

export enum GeaesipIntelligenceLevel {
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  ADVANCED = 'ADVANCED',
  SUPER = 'SUPER',
  OMNISCIENT = 'OMNISCIENT',
}

export enum GeaesipReasoningType {
  DEDUCTIVE = 'DEDUCTIVE',
  INDUCTIVE = 'INDUCTIVE',
  ABDUCTIVE = 'ABDUCTIVE',
  ANALOGICAL = 'ANALOGICAL',
  CAUSAL = 'CAUSAL',
}

export enum GeaesipConfidenceLevel {
  VERY_LOW = 'VERY_LOW',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
}

export interface GeaesipIntelligenceCore {
  id: string;
  schoolId: string;
  name: string;
  level: GeaesipIntelligenceLevel;
  score: number;
  components: Record<string, number>;
  lastComputedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface GeaesipKnowledgeFusion {
  id: string;
  schoolId: string;
  sources: string[];
  fusedResult: Record<string, unknown>;
  confidence: number;
  timestamp: string;
}

export interface GeaesipCrossDomainSignal {
  id: string;
  schoolId: string;
  domain: string;
  signalType: string;
  value: number;
  severity: GeaesipConfidenceLevel;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface GeaesipCausalRelationship {
  id: string;
  schoolId: string;
  cause: string;
  effect: string;
  strength: number;
  confidence: number;
  evidence: string[];
  discoveredAt: string;
}

export interface GeaesipSystemHealthScore {
  id: string;
  schoolId: string;
  dimension: string;
  score: number;
  trend: 'IMPROVING' | 'STABLE' | 'DECLINING';
  factors: Record<string, number>;
  computedAt: string;
}

// =============================================================================
// MODULE 2 — Autonomous Control Center
// =============================================================================

export enum GeaesipCockpitType {
  EXECUTIVE = 'EXECUTIVE',
  NATIONAL = 'NATIONAL',
  REGIONAL = 'REGIONAL',
  SCHOOL = 'SCHOOL',
  CRISIS = 'CRISIS',
  FINANCIAL = 'FINANCIAL',
  ACADEMIC = 'ACADEMIC',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  SECURITY = 'SECURITY',
  AI = 'AI',
}

export enum GeaesipAlertSeverity {
  INFO = 'INFO',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum GeaesipDecisionStatus {
  PENDING = 'PENDING',
  QUEUED = 'QUEUED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  EXECUTING = 'EXECUTING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  ROLLED_BACK = 'ROLLED_BACK',
}

export interface GeaesipControlCenter {
  id: string;
  schoolId: string;
  type: GeaesipCockpitType;
  name: string;
  kpis: Record<string, number>;
  alerts: GeaesipAlert[];
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  config: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface GeaesipExecutiveCockpit {
  id: string;
  schoolId: string;
  metrics: Record<string, number>;
  trends: Record<string, 'UP' | 'DOWN' | 'STABLE'>;
  risks: string[];
  opportunities: string[];
  period: string;
  computedAt: string;
}

export interface GeaesipAlert {
  id: string;
  schoolId: string;
  severity: GeaesipAlertSeverity;
  title: string;
  message: string;
  source: string;
  acknowledged: boolean;
  acknowledgedBy: string | null;
  createdAt: string;
}

export interface GeaesipDecisionQueue {
  id: string;
  schoolId: string;
  decisions: string[];
  priority: number;
  status: GeaesipDecisionStatus;
  createdAt: string;
}

// =============================================================================
// MODULE 3 — Cross-Domain Intelligence
// =============================================================================

export enum GeaesipDomain {
  ACADEMIC = 'ACADEMIC',
  FINANCIAL = 'FINANCIAL',
  OPERATIONAL = 'OPERATIONAL',
  SECURITY = 'SECURITY',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  HEALTH = 'HEALTH',
  SOCIAL = 'SOCIAL',
  GOVERNMENT = 'GOVERNMENT',
  RESEARCH = 'RESEARCH',
  CLOUD = 'CLOUD',
  DATA = 'DATA',
}

export enum GeaesipCorrelationStrength {
  WEAK = 'WEAK',
  MODERATE = 'MODERATE',
  STRONG = 'STRONG',
  VERY_STRONG = 'VERY_STRONG',
}

export enum GeaesipRiskLevel {
  MINIMAL = 'MINIMAL',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface GeaesipCrossDomainEvent {
  id: string;
  schoolId: string;
  domain: GeaesipDomain;
  eventType: string;
  severity: GeaesipRiskLevel;
  metadata: Record<string, unknown>;
  timestamp: string;
}

export interface GeaesipCorrelation {
  id: string;
  schoolId: string;
  domainA: GeaesipDomain;
  domainB: GeaesipDomain;
  strength: GeaesipCorrelationStrength;
  confidence: number;
  evidence: string[];
  discoveredAt: string;
}

export interface GeaesipImpactChain {
  id: string;
  schoolId: string;
  events: string[];
  totalImpact: number;
  propagationPath: string[];
  detectedAt: string;
}

export interface GeaesipSystemicRisk {
  id: string;
  schoolId: string;
  name: string;
  domains: GeaesipDomain[];
  probability: number;
  impact: number;
  score: number;
  mitigations: string[];
  lastAssessedAt: string;
}

export interface GeaesipDependencyGraph {
  id: string;
  schoolId: string;
  nodes: Array<{ id: string; type: string; label: string }>;
  edges: Array<{ from: string; to: string; weight: number; type: string }>;
  lastComputedAt: string;
}

// =============================================================================
// MODULE 4 — Education Digital Twin 2.0
// =============================================================================

export enum GeaesipTwinEntityType {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  CLASS = 'CLASS',
  SCHOOL = 'SCHOOL',
  CAMPUS = 'CAMPUS',
  REGION = 'REGION',
  COUNTRY = 'COUNTRY',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  FINANCE = 'FINANCE',
  NETWORK = 'NETWORK',
  CLOUD = 'CLOUD',
  DATA = 'DATA',
  SECURITY = 'SECURITY',
  RESEARCH = 'RESEARCH',
}

export enum GeaesipTwinSyncStatus {
  SYNCED = 'SYNCED',
  SYNCING = 'SYNCING',
  STALE = 'STALE',
  ERROR = 'ERROR',
}

export enum GeaesipSimulationMode {
  REAL_TIME = 'REAL_TIME',
  HISTORICAL = 'HISTORICAL',
  PREDICTIVE = 'PREDICTIVE',
  WHAT_IF = 'WHAT_IF',
  INTERVENTION = 'INTERVENTION',
}

export interface GeaesipSystemTwin {
  id: string;
  schoolId: string;
  name: string;
  entityTypes: GeaesipTwinEntityType[];
  syncStatus: GeaesipTwinSyncStatus;
  lastSyncedAt: string;
  state: Record<string, unknown>;
  config: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface GeaesipTwinState {
  id: string;
  twinId: string;
  entityType: GeaesipTwinEntityType;
  entityId: string;
  state: Record<string, unknown>;
  metrics: Record<string, number>;
  relationships: Array<{ targetId: string; type: string; weight: number }>;
  lastUpdated: string;
}

export interface GeaesipTwinSimulation {
  id: string;
  twinId: string;
  mode: GeaesipSimulationMode;
  parameters: Record<string, unknown>;
  results: Record<string, unknown>;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  startedAt: string;
  completedAt: string | null;
  createdAt: string;
}

// =============================================================================
// MODULE 5 — Global Scenario & Policy Simulator
// =============================================================================

export enum GeaesipScenarioType {
  REFORM = 'REFORM',
  PROGRAM_CHANGE = 'PROGRAM_CHANGE',
  FEE_CHANGE = 'FEE_CHANGE',
  BUDGET_INCREASE = 'BUDGET_INCREASE',
  BUDGET_DECREASE = 'BUDGET_DECREASE',
  SCHOOL_CREATION = 'SCHOOL_CREATION',
  SCHOOL_CLOSURE = 'SCHOOL_CLOSURE',
  MASS_RECRUITMENT = 'MASS_RECRUITMENT',
  TEACHER_MIGRATION = 'TEACHER_MIGRATION',
  DEMOGRAPHIC_GROWTH = 'DEMOGRAPHIC_GROWTH',
  ECONOMIC_CRISIS = 'ECONOMIC_CRISIS',
  HEALTH_CRISIS = 'HEALTH_CRISIS',
  NATURAL_DISASTER = 'NATURAL_DISASTER',
  CYBER_ATTACK = 'CYBER_ATTACK',
  CLOUD_OUTAGE = 'CLOUD_OUTAGE',
  NETWORK_OUTAGE = 'NETWORK_OUTAGE',
}

export enum GeaesipScenarioStatus {
  DRAFT = 'DRAFT',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export interface GeaesipScenario {
  id: string;
  schoolId: string;
  name: string;
  type: GeaesipScenarioType;
  description: string;
  status: GeaesipScenarioStatus;
  assumptions: Record<string, unknown>;
  variables: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface GeaesipScenarioRun {
  id: string;
  schoolId: string;
  scenarioId: string;
  parameters: Record<string, unknown>;
  results: Record<string, unknown>;
  impacts: Record<string, number>;
  risks: string[];
  costs: Record<string, number>;
  benefits: Record<string, number>;
  probabilities: Record<string, number>;
  timeline: Array<{ date: string; event: string; impact: number }>;
  recommendations: string[];
  status: GeaesipScenarioStatus;
  startedAt: string;
  completedAt: string | null;
  createdAt: string;
}

export interface GeaesipScenarioComparison {
  id: string;
  schoolId: string;
  scenarioIds: string[];
  comparison: Record<string, unknown>;
  bestOption: string;
  confidence: number;
  createdAt: string;
}

// =============================================================================
// MODULE 6 — Autonomous Decision Intelligence
// =============================================================================

export enum GeaesipDecisionType {
  ACADEMIC = 'ACADEMIC',
  FINANCIAL = 'FINANCIAL',
  OPERATIONAL = 'OPERATIONAL',
  STRATEGIC = 'STRATEGIC',
  CRISIS = 'CRISIS',
  POLICY = 'POLICY',
}

export enum GeaesipDecisionRisk {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum GeaesipApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ESCALATED = 'ESCALATED',
}

export interface GeaesipDecision {
  id: string;
  schoolId: string;
  type: GeaesipDecisionType;
  title: string;
  description: string;
  options: GeaesipDecisionOption[];
  selectedOption: string | null;
  risk: GeaesipDecisionRisk;
  confidence: number;
  evidence: string[];
  status: GeaesipDecisionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface GeaesipDecisionOption {
  id: string;
  title: string;
  description: string;
  pros: string[];
  cons: string[];
  cost: number;
  impact: number;
  probability: number;
  score: number;
}

export interface GeaesipDecisionApproval {
  id: string;
  schoolId: string;
  decisionId: string;
  approverId: string;
  status: GeaesipApprovalStatus;
  reason: string | null;
  timestamp: string;
}

export interface GeaesipDecisionAudit {
  id: string;
  schoolId: string;
  decisionId: string;
  action: string;
  actor: string;
  details: Record<string, unknown>;
  timestamp: string;
}

// =============================================================================
// MODULE 7 — Autonomous Agent Orchestration 2.0
// =============================================================================

export enum GeaesipAgentCategory {
  ACADEMIC = 'ACADEMIC',
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  FINANCE = 'FINANCE',
  HR = 'HR',
  HEALTH = 'HEALTH',
  SECURITY = 'SECURITY',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  GOVERNMENT = 'GOVERNMENT',
  RESEARCH = 'RESEARCH',
  CLOUD = 'CLOUD',
  DATA = 'DATA',
  COMPLIANCE = 'COMPLIANCE',
  CRISIS = 'CRISIS',
  EXECUTIVE = 'EXECUTIVE',
}

export enum GeaesipAgentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ERROR = 'ERROR',
  MAINTENANCE = 'MAINTENANCE',
  DELEGATING = 'DELEGATING',
}

export enum GeaesipMissionStatus {
  PLANNING = 'PLANNING',
  EXECUTING = 'EXECUTING',
  MONITORING = 'MONITORING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export enum GeaesipConsensusMethod {
  MAJORITY = 'MAJORITY',
  UNANIMOUS = 'UNANIMOUS',
  WEIGHTED = 'WEIGHTED',
  RANKED = 'RANKED',
}

export interface GeaesipAgentRegistry {
  id: string;
  schoolId: string;
  category: GeaesipAgentCategory;
  name: string;
  description: string;
  status: GeaesipAgentStatus;
  capabilities: string[];
  tools: string[];
  config: Record<string, unknown>;
  lastActiveAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GeaesipAgentMission {
  id: string;
  schoolId: string;
  objective: string;
  context: Record<string, unknown>;
  constraints: string[];
  agents: string[];
  tools: string[];
  budget: number;
  deadline: string;
  riskLevel: GeaesipRiskLevel;
  approvalRequired: boolean;
  status: GeaesipMissionStatus;
  result: Record<string, unknown> | null;
  score: number | null;
  createdAt: string;
  completedAt: string | null;
}

export interface GeaesipAgentVote {
  id: string;
  schoolId: string;
  missionId: string;
  agentId: string;
  proposal: string;
  vote: 'APPROVE' | 'REJECT' | 'ABSTAIN';
  confidence: number;
  reasoning: string;
  timestamp: string;
}

export interface GeaesipAgentNegotiation {
  id: string;
  schoolId: string;
  missionId: string;
  proposals: Array<{ agentId: string; proposal: string; score: number }>;
  round: number;
  outcome: Record<string, unknown>;
  timestamp: string;
}

// =============================================================================
// MODULE 8 — Autonomous Workflow & Action Engine
// =============================================================================

export enum GeaesipWorkflowStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export enum GeaesipTaskStatus {
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  BLOCKED = 'BLOCKED',
  ROLLED_BACK = 'ROLLED_BACK',
}

export enum GeaesipActionType {
  API = 'API',
  WEBHOOK = 'WEBHOOK',
  EVENT_BUS = 'EVENT_BUS',
  WORKFLOW = 'WORKFLOW',
  AGENT = 'AGENT',
  HUMAN_TASK = 'HUMAN_TASK',
  SCHEDULED_JOB = 'SCHEDULED_JOB',
}

export interface GeaesipWorkflow {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  tasks: GeaesipWorkflowTask[];
  dependencies: Array<{ from: string; to: string }>;
  status: GeaesipWorkflowStatus;
  trigger: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface GeaesipWorkflowTask {
  id: string;
  workflowId: string;
  name: string;
  type: GeaesipActionType;
  assignee: string | null;
  parameters: Record<string, unknown>;
  status: GeaesipTaskStatus;
  result: Record<string, unknown> | null;
  retries: number;
  maxRetries: number;
  createdAt: string;
  completedAt: string | null;
}

export interface GeaesipActionPlan {
  id: string;
  schoolId: string;
  title: string;
  workflows: string[];
  priority: number;
  deadline: string;
  approvalRequired: boolean;
  status: GeaesipWorkflowStatus;
  createdAt: string;
}

export interface GeaesipExecutionLog {
  id: string;
  schoolId: string;
  taskId: string;
  action: string;
  status: GeaesipTaskStatus;
  input: Record<string, unknown>;
  output: Record<string, unknown> | null;
  error: string | null;
  duration: number;
  timestamp: string;
}

// =============================================================================
// MODULE 9 — Global Risk & Resilience Intelligence
// =============================================================================

export enum GeaesipRiskCategory {
  ACADEMIC = 'ACADEMIC',
  FINANCIAL = 'FINANCIAL',
  OPERATIONAL = 'OPERATIONAL',
  CYBER = 'CYBER',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  HEALTH = 'HEALTH',
  SOCIAL = 'SOCIAL',
  COMPLIANCE = 'COMPLIANCE',
  GEOPOLITICAL = 'GEOPOLITICAL',
  CLIMATE = 'CLIMATE',
  AI = 'AI',
  DATA = 'DATA',
  CLOUD = 'CLOUD',
}

export enum GeaesipRiskStatus {
  IDENTIFIED = 'IDENTIFIED',
  ASSESSED = 'ASSESSED',
  MITIGATING = 'MITIGATING',
  MONITORING = 'MONITORING',
  ACCEPTED = 'ACCEPTED',
  CLOSED = 'CLOSED',
}

export interface GeaesipRiskRegistry {
  id: string;
  schoolId: string;
  name: string;
  category: GeaesipRiskCategory;
  description: string;
  probability: number;
  impact: number;
  score: number;
  status: GeaesipRiskStatus;
  owner: string;
  mitigations: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GeaesipRiskMatrix {
  id: string;
  schoolId: string;
  risks: Array<{ riskId: string; probability: number; impact: number; score: number; category: GeaesipRiskCategory }>;
  computedAt: string;
}

export interface GeaesipEarlyWarning {
  id: string;
  schoolId: string;
  riskId: string;
  signal: string;
  severity: GeaesipAlertSeverity;
  confidence: number;
  timestamp: string;
}

export interface GeaesipMitigationPlan {
  id: string;
  schoolId: string;
  riskId: string;
  actions: Array<{ name: string; assignee: string; deadline: string; status: string }>;
  owner: string;
  deadline: string;
  status: 'PLANNING' | 'EXECUTING' | 'COMPLETED' | 'ON_HOLD';
  progress: number;
  createdAt: string;
}

// =============================================================================
// MODULE 10 — Global Crisis & Resilience Command
// =============================================================================

export enum GeaesipCrisisType {
  PANDEMIC = 'PANDEMIC',
  NATURAL_DISASTER = 'NATURAL_DISASTER',
  FIRE = 'FIRE',
  CYBER_ATTACK = 'CYBER_ATTACK',
  POWER_OUTAGE = 'POWER_OUTAGE',
  NETWORK_OUTAGE = 'NETWORK_OUTAGE',
  CLOUD_OUTAGE = 'CLOUD_OUTAGE',
  FINANCIAL_CRISIS = 'FINANCIAL_CRISIS',
  SOCIAL_CRISIS = 'SOCIAL_CRISIS',
  SCHOOL_INCIDENT = 'SCHOOL_INCIDENT',
}

export enum GeaesipCrisisLevel {
  LEVEL_1 = 'LEVEL_1',
  LEVEL_2 = 'LEVEL_2',
  LEVEL_3 = 'LEVEL_3',
  LEVEL_4 = 'LEVEL_4',
  LEVEL_5 = 'LEVEL_5',
}

export enum GeaesipCrisisPhase {
  DETECTION = 'DETECTION',
  CLASSIFICATION = 'CLASSIFICATION',
  ESCALATION = 'ESCALATION',
  RESPONSE = 'RESPONSE',
  RECOVERY = 'RECOVERY',
  POSTMORTEM = 'POSTMORTEM',
}

export interface GeaesipCrisis {
  id: string;
  schoolId: string;
  type: GeaesipCrisisType;
  level: GeaesipCrisisLevel;
  title: string;
  description: string;
  phase: GeaesipCrisisPhase;
  status: 'OPEN' | 'MANAGED' | 'RESOLVED' | 'CLOSED';
  commander: string;
  timeline: GeaesipCrisisTimeline[];
  createdAt: string;
  updatedAt: string;
}

export interface GeaesipCrisisTeam {
  id: string;
  schoolId: string;
  crisisId: string;
  roles: Array<{ role: string; assignee: string }>;
  members: string[];
  status: 'FORMED' | 'ACTIVE' | 'STANDBY' | 'DISBANDED';
  createdAt: string;
}

export interface GeaesipCrisisPlaybook {
  id: string;
  schoolId: string;
  crisisType: GeaesipCrisisType;
  steps: Array<{ order: number; name: string; description: string; owner: string; sla: number }>;
  triggers: string[];
  resources: Array<{ name: string; type: string; quantity: number }>;
  status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
}

export interface GeaesipCrisisTimeline {
  id: string;
  schoolId: string;
  crisisId: string;
  events: Array<{ timestamp: string; event: string; actor: string; details: Record<string, unknown> }>;
  timestamp: string;
}

export interface GeaesipEmergencyCommunication {
  id: string;
  schoolId: string;
  crisisId: string;
  recipients: string[];
  message: string;
  channel: 'SMS' | 'EMAIL' | 'PUSH' | 'PHONE' | 'ALL';
  sentAt: string;
  status: 'PENDING' | 'SENT' | 'DELIVERED' | 'FAILED';
}

// =============================================================================
// MODULE 11 — Global Education Resource Optimization
// =============================================================================

export enum GeaesipResourceType {
  TEACHER = 'TEACHER',
  CLASSROOM = 'CLASSROOM',
  BUDGET = 'BUDGET',
  EQUIPMENT = 'EQUIPMENT',
  VEHICLE = 'VEHICLE',
  ENERGY = 'ENERGY',
  SERVER = 'SERVER',
  CLOUD = 'CLOUD',
  TRAINING = 'TRAINING',
  SCHOLARSHIP = 'SCHOLARSHIP',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
}

export enum GeaesipOptimizationGoal {
  COST = 'COST',
  EFFICIENCY = 'EFFICIENCY',
  EQUITY = 'EQUITY',
  QUALITY = 'QUALITY',
  RESILIENCE = 'RESILIENCE',
}

export interface GeaesipResourceForecast {
  id: string;
  schoolId: string;
  resourceType: GeaesipResourceType;
  current: number;
  predicted: number;
  gap: number;
  period: string;
  model: string;
  createdAt: string;
}

export interface GeaesipAllocationPlan {
  id: string;
  schoolId: string;
  resourceType: GeaesipResourceType;
  allocations: Array<{ entity: string; amount: number; reason: string }>;
  constraints: Record<string, unknown>;
  objective: GeaesipOptimizationGoal;
  score: number;
  status: 'DRAFT' | 'APPROVED' | 'EXECUTING' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
}

export interface GeaesipOptimizationResult {
  id: string;
  schoolId: string;
  resourceType: GeaesipResourceType;
  baseline: Record<string, number>;
  optimized: Record<string, number>;
  savings: number;
  impact: Record<string, number>;
  confidence: number;
  recommendations: string[];
  createdAt: string;
}

// =============================================================================
// MODULE 12 — Intelligence Copilot 2.0
// =============================================================================

export enum GeaesipCopilotMode {
  TEXT = 'TEXT',
  VOICE = 'VOICE',
  MULTIMODAL = 'MULTIMODAL',
}

export enum GeaesipCopilotCapability {
  QUERY = 'QUERY',
  ANALYSIS = 'ANALYSIS',
  REPORT = 'REPORT',
  RECOMMENDATION = 'RECOMMENDATION',
  DECISION = 'DECISION',
  SIMULATION = 'SIMULATION',
  FORECAST = 'FORECAST',
}

export enum GeaesipCitationType {
  DATA = 'DATA',
  MODEL = 'MODEL',
  AGENT = 'AGENT',
  SCENARIO = 'SCENARIO',
  POLICY = 'POLICY',
  EXTERNAL = 'EXTERNAL',
}

export interface GeaesipCopilotSession {
  id: string;
  schoolId: string;
  userId: string;
  mode: GeaesipCopilotMode;
  queries: Array<{ question: string; answer: string; timestamp: string }>;
  context: Record<string, unknown>;
  status: 'ACTIVE' | 'CLOSED' | 'ERROR';
  createdAt: string;
  updatedAt: string;
}

export interface GeaesipCopilotAnswer {
  id: string;
  sessionId: string;
  question: string;
  answer: string;
  capabilities: GeaesipCopilotCapability[];
  sources: string[];
  citations: Array<{ type: GeaesipCitationType; ref: string; text: string }>;
  confidence: number;
  reasoning: string;
  limitations: string[];
  hypotheses: string[];
  recommendations: string[];
  processingTime: number;
  createdAt: string;
}

export interface GeaesipCopilotExplanation {
  id: string;
  sessionId: string;
  answerId: string;
  dataUsed: string[];
  reasoningSteps: string[];
  assumptions: string[];
  limitations: string[];
  alternatives: string[];
  createdAt: string;
}

// =============================================================================
// MODULE 13 — Global Education Knowledge & Memory Fabric
// =============================================================================

export enum GeaesipMemoryType {
  USER = 'USER',
  INSTITUTION = 'INSTITUTION',
  AGENT = 'AGENT',
  DECISION = 'DECISION',
  EVENT = 'EVENT',
  POLICY = 'POLICY',
  RESEARCH = 'RESEARCH',
  SCENARIO = 'SCENARIO',
  CRISIS = 'CRISIS',
}

export enum GeaesipMemoryCategory {
  SEMANTIC = 'SEMANTIC',
  EPISODIC = 'EPISODIC',
  PROCEDURAL = 'PROCEDURAL',
  ORGANIZATIONAL = 'ORGANIZATIONAL',
}

export interface GeaesipMemory {
  id: string;
  schoolId: string;
  type: GeaesipMemoryType;
  category: GeaesipMemoryCategory;
  key: string;
  value: Record<string, unknown>;
  source: string;
  confidence: number;
  ttl: number;
  expiresAt: string | null;
  provenance: Array<{ source: string; timestamp: string; reliability: number }>;
  createdAt: string;
  updatedAt: string;
}

export interface GeaesipMemoryRetrieval {
  id: string;
  schoolId: string;
  query: string;
  results: Array<{ memoryId: string; score: number; snippet: string }>;
  ranking: string[];
  timestamp: string;
}

export interface GeaesipMemoryPolicy {
  id: string;
  schoolId: string;
  type: GeaesipMemoryType;
  retentionDays: number;
  encryptionRequired: boolean;
  accessControl: Array<{ role: string; permission: 'READ' | 'WRITE' | 'DELETE' | 'ADMIN' }>;
  createdAt: string;
}

// =============================================================================
// MODULE 14 — Intelligence Quality & AI Evaluation
// =============================================================================

export enum GeaesipEvaluationType {
  MODEL = 'MODEL',
  AGENT = 'AGENT',
  PROMPT = 'PROMPT',
  DATASET = 'DATASET',
  SCENARIO = 'SCENARIO',
  RED_TEAM = 'RED_TEAM',
  SAFETY = 'SAFETY',
  REGRESSION = 'REGRESSION',
}

export enum GeaesipEvaluationStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export interface GeaesipAIEvaluation {
  id: string;
  schoolId: string;
  type: GeaesipEvaluationType;
  targetId: string;
  metrics: Record<string, number>;
  score: number;
  status: GeaesipEvaluationStatus;
  findings: string[];
  recommendations: string[];
  createdAt: string;
}

export interface GeaesipModelEvaluation {
  id: string;
  schoolId: string;
  modelId: string;
  accuracy: number;
  relevance: number;
  hallucinationRate: number;
  latency: number;
  cost: number;
  bias: number;
  safety: number;
  explainability: number;
  robustness: number;
  drift: number;
  evaluatedAt: string;
}

export interface GeaesipAgentEvaluation {
  id: string;
  schoolId: string;
  agentId: string;
  taskCompletion: number;
  accuracy: number;
  efficiency: number;
  safety: number;
  cooperation: number;
  score: number;
  evaluatedAt: string;
}

// =============================================================================
// MODULE 15 — Global Education Economic & Impact Intelligence
// =============================================================================

export enum GeaesipImpactType {
  EDUCATION_ROI = 'EDUCATION_ROI',
  SOCIAL_ROI = 'SOCIAL_ROI',
  EMPLOYMENT = 'EMPLOYMENT',
  GRADUATION = 'GRADUATION',
  DROPOUT_COST = 'DROPOUT_COST',
  INFRASTRUCTURE_ROI = 'INFRASTRUCTURE_ROI',
  TEACHER_ROI = 'TEACHER_ROI',
  SCHOLARSHIP = 'SCHOLARSHIP',
  RESEARCH = 'RESEARCH',
  POLICY = 'POLICY',
}

export enum GeaesipImpactPeriod {
  SHORT_TERM = 'SHORT_TERM',
  MEDIUM_TERM = 'MEDIUM_TERM',
  LONG_TERM = 'LONG_TERM',
}

export interface GeaesipImpactModel {
  id: string;
  schoolId: string;
  type: GeaesipImpactType;
  name: string;
  formula: string;
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown>;
  validated: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GeaesipImpactResult {
  id: string;
  schoolId: string;
  modelId: string;
  inputs: Record<string, unknown>;
  outputs: Record<string, number>;
  confidence: number;
  period: GeaesipImpactPeriod;
  calculatedAt: string;
}

export interface GeaesipEconomicForecast {
  id: string;
  schoolId: string;
  indicator: string;
  forecast: Array<{ date: string; value: number }>;
  confidence: number;
  period: GeaesipImpactPeriod;
  model: string;
  createdAt: string;
}

export interface GeaesipHumanCapitalIndex {
  id: string;
  schoolId: string;
  dimension: string;
  score: number;
  trend: 'IMPROVING' | 'STABLE' | 'DECLINING';
  factors: Record<string, number>;
  computedAt: string;
}

// =============================================================================
// MODULE 16 — Global Education Forecasting 2.0
// =============================================================================

export enum GeaesipForecastDomain {
  ENROLLMENT = 'ENROLLMENT',
  POPULATION = 'POPULATION',
  TEACHERS = 'TEACHERS',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  BUDGET = 'BUDGET',
  EMPLOYMENT = 'EMPLOYMENT',
  GRADUATION = 'GRADUATION',
  DROPOUT = 'DROPOUT',
  MOBILITY = 'MOBILITY',
  RESEARCH = 'RESEARCH',
  TECHNOLOGY = 'TECHNOLOGY',
  ENERGY = 'ENERGY',
  CLOUD_CAPACITY = 'CLOUD_CAPACITY',
}

export enum GeaesipForecastHorizon {
  SHORT_TERM = 'SHORT_TERM',
  MEDIUM_TERM = 'MEDIUM_TERM',
  LONG_TERM = 'LONG_TERM',
}

export enum GeaesipForecastMethod {
  LINEAR = 'LINEAR',
  ARIMA = 'ARIMA',
  PROPHET = 'PROPHET',
  LSTM = 'LSTM',
  ENSEMBLE = 'ENSEMBLE',
  TRANSFORMER = 'TRANSFORMER',
}

export interface GeaesipExtendedForecast {
  id: string;
  schoolId: string;
  domain: GeaesipForecastDomain;
  method: GeaesipForecastMethod;
  horizon: GeaesipForecastHorizon;
  predictions: Array<{ date: string; value: number; lower: number; upper: number }>;
  confidence: number;
  backtesting: GeaesipForecastBacktest | null;
  drift: GeaesipModelDrift | null;
  version: number;
  createdAt: string;
  completedAt: string;
}

export interface GeaesipForecastBacktest {
  id: string;
  schoolId: string;
  forecastId: string;
  actual: Array<{ date: string; value: number }>;
  predicted: Array<{ date: string; value: number }>;
  mape: number;
  rmse: number;
  r2: number;
  evaluatedAt: string;
}

export interface GeaesipModelDrift {
  id: string;
  schoolId: string;
  forecastId: string;
  metric: string;
  driftScore: number;
  severity: GeaesipAlertSeverity;
  detectedAt: string;
}

// =============================================================================
// MODULE 17 — Global Education Observatory 2.0
// =============================================================================

export enum GeaesipIndexType {
  GLOBAL_EDUCATION = 'GLOBAL_EDUCATION',
  RESILIENCE = 'RESILIENCE',
  INTELLIGENCE = 'INTELLIGENCE',
  DIGITAL = 'DIGITAL',
  EQUITY = 'EQUITY',
  INNOVATION = 'INNOVATION',
  SAFETY = 'SAFETY',
  SUSTAINABILITY = 'SUSTAINABILITY',
}

export enum GeaesipIndicatorScope {
  NATIONAL = 'NATIONAL',
  REGIONAL = 'REGIONAL',
  INSTITUTIONAL = 'INSTITUTIONAL',
  ACADEMIC = 'ACADEMIC',
  ECONOMIC = 'ECONOMIC',
  SOCIAL = 'SOCIAL',
  HEALTH = 'HEALTH',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  TECHNOLOGY = 'TECHNOLOGY',
  SECURITY = 'SECURITY',
  AI = 'AI',
}

export interface GeaesipCompositeIndex {
  id: string;
  schoolId: string;
  type: GeaesipIndexType;
  name: string;
  score: number;
  components: Array<{ name: string; weight: number; value: number }>;
  weights: Record<string, number>;
  period: string;
  version: number;
  computedAt: string;
}

export interface GeaesipObservatoryIndicator2 {
  id: string;
  schoolId: string;
  scope: GeaesipIndicatorScope;
  name: string;
  value: number;
  unit: string;
  source: string;
  methodology: string;
  version: number;
  period: string;
  computedAt: string;
}

export interface GeaesipObservatoryTrend {
  id: string;
  schoolId: string;
  indexType: GeaesipIndexType;
  periods: Array<{ period: string; value: number }>;
  direction: 'IMPROVING' | 'STABLE' | 'DECLINING';
  rate: number;
  inflectionPoints: Array<{ period: string; event: string }>;
  computedAt: string;
}

// =============================================================================
// MODULE 18 — Global Education Governance & Ethics
// =============================================================================

export enum GeaesipGovernanceDomain {
  AI = 'AI',
  DECISION = 'DECISION',
  DATA = 'DATA',
  MODEL = 'MODEL',
  AGENT = 'AGENT',
  POLICY = 'POLICY',
}

export enum GeaesipGovernanceAction {
  REVIEW = 'REVIEW',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  FLAG = 'FLAG',
  ESCALATE = 'ESCALATE',
  AUDIT = 'AUDIT',
}

export enum GeaesipEthicsReviewStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CONDITIONAL = 'CONDITIONAL',
}

export interface GeaesipGovernancePolicy {
  id: string;
  schoolId: string;
  domain: GeaesipGovernanceDomain;
  name: string;
  rules: Array<{ rule: string; description: string; severity: GeaesipAlertSeverity }>;
  enforcementLevel: 'MANDATORY' | 'RECOMMENDED' | 'OPTIONAL';
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GeaesipGovernanceAudit {
  id: string;
  schoolId: string;
  domain: GeaesipGovernanceDomain;
  action: GeaesipGovernanceAction;
  actor: string;
  target: string;
  details: Record<string, unknown>;
  timestamp: string;
}

export interface GeaesipEthicsReview {
  id: string;
  schoolId: string;
  type: GeaesipEvaluationType;
  targetId: string;
  findings: Array<{ category: string; description: string; severity: GeaesipAlertSeverity }>;
  status: GeaesipEthicsReviewStatus;
  reviewer: string;
  recommendation: string;
  timestamp: string;
}

export interface GeaesipBiasReview {
  id: string;
  schoolId: string;
  type: GeaesipEvaluationType;
  targetId: string;
  biasType: string;
  severity: GeaesipAlertSeverity;
  evidence: string[];
  mitigation: string;
  status: GeaesipEthicsReviewStatus;
  timestamp: string;
}

// =============================================================================
// MODULE 19 — Global Intelligence API & Event Fabric
// =============================================================================

export enum GeaesipAPIType {
  REST = 'REST',
  WEBHOOK = 'WEBHOOK',
  EVENT_BUS = 'EVENT_BUS',
  STREAMING = 'STREAMING',
  SUBSCRIPTION = 'SUBSCRIPTION',
}

export enum GeaesipEventType {
  INTELLIGENCE = 'INTELLIGENCE',
  DECISION = 'DECISION',
  FORECAST = 'FORECAST',
  SIMULATION = 'SIMULATION',
  AGENT = 'AGENT',
  CRISIS = 'CRISIS',
  RISK = 'RISK',
  GOVERNANCE = 'GOVERNANCE',
}

export interface GeaesipIntelligenceAPI {
  id: string;
  schoolId: string;
  name: string;
  version: string;
  endpoints: Array<{ path: string; method: string; description: string }>;
  auth: { type: 'API_KEY' | 'JWT' | 'OAUTH2'; config: Record<string, unknown> };
  rateLimit: { requests: number; window: number };
  quota: { daily: number; monthly: number };
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GeaesipEventBus {
  id: string;
  schoolId: string;
  name: string;
  type: GeaesipAPIType;
  schema: Record<string, unknown>;
  subscribers: string[];
  status: 'ACTIVE' | 'INACTIVE' | 'ERROR';
  createdAt: string;
}

export interface GeaesipEventSubscription {
  id: string;
  schoolId: string;
  eventType: GeaesipEventType;
  webhookUrl: string;
  filters: Record<string, unknown>;
  active: boolean;
  createdAt: string;
}

export interface GeaesipAPIUsage {
  id: string;
  schoolId: string;
  apiId: string;
  endpoint: string;
  method: string;
  count: number;
  latency: number;
  errors: number;
  timestamp: string;
}

// =============================================================================
// MODULE 20 — Global Autonomous Education Operating System
// =============================================================================

export enum GeaesipRuntimePhase {
  DATA = 'DATA',
  KNOWLEDGE = 'KNOWLEDGE',
  INTELLIGENCE = 'INTELLIGENCE',
  PREDICTION = 'PREDICTION',
  SIMULATION = 'SIMULATION',
  DECISION = 'DECISION',
  GOVERNANCE = 'GOVERNANCE',
  APPROVAL = 'APPROVAL',
  ACTION = 'ACTION',
  OBSERVATION = 'OBSERVATION',
  LEARNING = 'LEARNING',
}

export enum GeaesipRuntimeStatus {
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  ERROR = 'ERROR',
  COMPLETED = 'COMPLETED',
}

export interface GeaesipEducationRuntime {
  id: string;
  schoolId: string;
  name: string;
  phase: GeaesipRuntimePhase;
  status: GeaesipRuntimeStatus;
  config: Record<string, unknown>;
  metrics: Record<string, number>;
  lastRunAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GeaesipRuntimeExecution {
  id: string;
  schoolId: string;
  runtimeId: string;
  phase: GeaesipRuntimePhase;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  duration: number;
  status: GeaesipRuntimeStatus;
  error: string | null;
  timestamp: string;
}

export interface GeaesipRuntimeMetric {
  id: string;
  schoolId: string;
  runtimeId: string;
  name: string;
  value: number;
  unit: string;
  timestamp: string;
}

// =============================================================================
// ZOD SCHEMAS — MODULE 1
// =============================================================================

export const createGeaesipIntelligenceCoreSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(255),
  level: z.nativeEnum(GeaesipIntelligenceLevel),
  score: z.number().min(0).max(100),
  components: z.record(z.string(), z.number().min(0)),
});

export const updateGeaesipIntelligenceCoreSchema = createGeaesipIntelligenceCoreSchema.partial();

export const createGeaesipKnowledgeFusionSchema = z.object({
  schoolId: z.string().uuid(),
  sources: z.array(z.string()).min(1),
  fusedResult: z.record(z.string(), z.unknown()),
  confidence: z.number().min(0).max(1),
});

export const updateGeaesipKnowledgeFusionSchema = createGeaesipKnowledgeFusionSchema.partial();

export const createGeaesipCrossDomainSignalSchema = z.object({
  schoolId: z.string().uuid(),
  domain: z.string().min(1),
  signalType: z.string().min(1),
  value: z.number(),
  severity: z.nativeEnum(GeaesipConfidenceLevel),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const updateGeaesipCrossDomainSignalSchema = createGeaesipCrossDomainSignalSchema.partial();

export const createGeaesipCausalRelationshipSchema = z.object({
  schoolId: z.string().uuid(),
  cause: z.string().min(1),
  effect: z.string().min(1),
  strength: z.number().min(0).max(1),
  confidence: z.number().min(0).max(1),
  evidence: z.array(z.string()).min(1),
});

export const updateGeaesipCausalRelationshipSchema = createGeaesipCausalRelationshipSchema.partial();

export const createGeaesipSystemHealthScoreSchema = z.object({
  schoolId: z.string().uuid(),
  dimension: z.string().min(1),
  score: z.number().min(0).max(100),
  trend: z.enum(['IMPROVING', 'STABLE', 'DECLINING']),
  factors: z.record(z.string(), z.number()),
});

export const updateGeaesipSystemHealthScoreSchema = createGeaesipSystemHealthScoreSchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 2
// =============================================================================

export const createGeaesipControlCenterSchema = z.object({
  schoolId: z.string().uuid(),
  type: z.nativeEnum(GeaesipCockpitType),
  name: z.string().min(1).max(255),
  kpis: z.record(z.string(), z.number()),
  alerts: z.array(z.any()).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'MAINTENANCE']),
  config: z.record(z.string(), z.unknown()).optional(),
});

export const updateGeaesipControlCenterSchema = createGeaesipControlCenterSchema.partial();

export const createGeaesipExecutiveCockpitSchema = z.object({
  schoolId: z.string().uuid(),
  metrics: z.record(z.string(), z.number()),
  trends: z.record(z.string(), z.enum(['UP', 'DOWN', 'STABLE'])),
  risks: z.array(z.string()),
  opportunities: z.array(z.string()),
  period: z.string().min(1),
});

export const updateGeaesipExecutiveCockpitSchema = createGeaesipExecutiveCockpitSchema.partial();

export const createGeaesipAlertSchema = z.object({
  schoolId: z.string().uuid(),
  severity: z.nativeEnum(GeaesipAlertSeverity),
  title: z.string().min(1).max(255),
  message: z.string().min(1),
  source: z.string().min(1),
});

export const updateGeaesipAlertSchema = createGeaesipAlertSchema.partial();

export const createGeaesipDecisionQueueSchema = z.object({
  schoolId: z.string().uuid(),
  decisions: z.array(z.string()).min(1),
  priority: z.number().int().min(0).max(10),
  status: z.nativeEnum(GeaesipDecisionStatus),
});

export const updateGeaesipDecisionQueueSchema = createGeaesipDecisionQueueSchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 3
// =============================================================================

export const createGeaesipCrossDomainEventSchema = z.object({
  schoolId: z.string().uuid(),
  domain: z.nativeEnum(GeaesipDomain),
  eventType: z.string().min(1),
  severity: z.nativeEnum(GeaesipRiskLevel),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const updateGeaesipCrossDomainEventSchema = createGeaesipCrossDomainEventSchema.partial();

export const createGeaesipCorrelationSchema = z.object({
  schoolId: z.string().uuid(),
  domainA: z.nativeEnum(GeaesipDomain),
  domainB: z.nativeEnum(GeaesipDomain),
  strength: z.nativeEnum(GeaesipCorrelationStrength),
  confidence: z.number().min(0).max(1),
  evidence: z.array(z.string()).min(1),
});

export const updateGeaesipCorrelationSchema = createGeaesipCorrelationSchema.partial();

export const createGeaesipImpactChainSchema = z.object({
  schoolId: z.string().uuid(),
  events: z.array(z.string()).min(1),
  totalImpact: z.number(),
  propagationPath: z.array(z.string()).min(1),
});

export const updateGeaesipImpactChainSchema = createGeaesipImpactChainSchema.partial();

export const createGeaesipSystemicRiskSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(255),
  domains: z.array(z.nativeEnum(GeaesipDomain)).min(1),
  probability: z.number().min(0).max(1),
  impact: z.number().min(0).max(10),
  score: z.number().min(0).max(10),
  mitigations: z.array(z.string()),
});

export const updateGeaesipSystemicRiskSchema = createGeaesipSystemicRiskSchema.partial();

export const createGeaesipDependencyGraphSchema = z.object({
  schoolId: z.string().uuid(),
  nodes: z.array(z.object({ id: z.string(), type: z.string(), label: z.string() })).min(1),
  edges: z.array(z.object({ from: z.string(), to: z.string(), weight: z.number().min(0), type: z.string() })),
});

export const updateGeaesipDependencyGraphSchema = createGeaesipDependencyGraphSchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 4
// =============================================================================

export const createGeaesipSystemTwinSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(255),
  entityTypes: z.array(z.nativeEnum(GeaesipTwinEntityType)).min(1),
  syncStatus: z.nativeEnum(GeaesipTwinSyncStatus),
  state: z.record(z.string(), z.unknown()).optional(),
  config: z.record(z.string(), z.unknown()).optional(),
});

export const updateGeaesipSystemTwinSchema = createGeaesipSystemTwinSchema.partial();

export const createGeaesipTwinStateSchema = z.object({
  twinId: z.string().uuid(),
  entityType: z.nativeEnum(GeaesipTwinEntityType),
  entityId: z.string().uuid(),
  state: z.record(z.string(), z.unknown()),
  metrics: z.record(z.string(), z.number()),
  relationships: z.array(z.object({ targetId: z.string().uuid(), type: z.string(), weight: z.number() })),
});

export const updateGeaesipTwinStateSchema = createGeaesipTwinStateSchema.partial();

export const createGeaesipTwinSimulationSchema = z.object({
  twinId: z.string().uuid(),
  mode: z.nativeEnum(GeaesipSimulationMode),
  parameters: z.record(z.string(), z.unknown()),
});

export const updateGeaesipTwinSimulationSchema = createGeaesipTwinSimulationSchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 5
// =============================================================================

export const createGeaesipScenarioSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(255),
  type: z.nativeEnum(GeaesipScenarioType),
  description: z.string().min(1),
  status: z.nativeEnum(GeaesipScenarioStatus),
  assumptions: z.record(z.string(), z.unknown()),
  variables: z.record(z.string(), z.unknown()),
});

export const updateGeaesipScenarioSchema = createGeaesipScenarioSchema.partial();

export const createGeaesipScenarioRunSchema = z.object({
  schoolId: z.string().uuid(),
  scenarioId: z.string().uuid(),
  parameters: z.record(z.string(), z.unknown()),
});

export const updateGeaesipScenarioRunSchema = createGeaesipScenarioRunSchema.partial();

export const createGeaesipScenarioComparisonSchema = z.object({
  schoolId: z.string().uuid(),
  scenarioIds: z.array(z.string().uuid()).min(2),
  comparison: z.record(z.string(), z.unknown()),
  bestOption: z.string().uuid(),
  confidence: z.number().min(0).max(1),
});

export const updateGeaesipScenarioComparisonSchema = createGeaesipScenarioComparisonSchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 6
// =============================================================================

export const createGeaesipDecisionSchema = z.object({
  schoolId: z.string().uuid(),
  type: z.nativeEnum(GeaesipDecisionType),
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  options: z.array(z.object({
    id: z.string().uuid(),
    title: z.string().min(1),
    description: z.string().min(1),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    cost: z.number().min(0),
    impact: z.number().min(0).max(10),
    probability: z.number().min(0).max(1),
    score: z.number().min(0).max(10),
  })).min(1),
  risk: z.nativeEnum(GeaesipDecisionRisk),
  confidence: z.number().min(0).max(1),
  evidence: z.array(z.string()),
});

export const updateGeaesipDecisionSchema = createGeaesipDecisionSchema.partial();

export const createGeaesipDecisionOptionSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  cost: z.number().min(0),
  impact: z.number().min(0).max(10),
  probability: z.number().min(0).max(1),
  score: z.number().min(0).max(10),
});

export const updateGeaesipDecisionOptionSchema = createGeaesipDecisionOptionSchema.partial();

export const createGeaesipDecisionApprovalSchema = z.object({
  schoolId: z.string().uuid(),
  decisionId: z.string().uuid(),
  approverId: z.string().uuid(),
  status: z.nativeEnum(GeaesipApprovalStatus),
  reason: z.string().nullable().optional(),
});

export const updateGeaesipDecisionApprovalSchema = createGeaesipDecisionApprovalSchema.partial();

export const createGeaesipDecisionAuditSchema = z.object({
  schoolId: z.string().uuid(),
  decisionId: z.string().uuid(),
  action: z.string().min(1),
  actor: z.string().uuid(),
  details: z.record(z.string(), z.unknown()),
});

export const updateGeaesipDecisionAuditSchema = createGeaesipDecisionAuditSchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 7
// =============================================================================

export const createGeaesipAgentRegistrySchema = z.object({
  schoolId: z.string().uuid(),
  category: z.nativeEnum(GeaesipAgentCategory),
  name: z.string().min(1).max(255),
  description: z.string().min(1),
  status: z.nativeEnum(GeaesipAgentStatus),
  capabilities: z.array(z.string()).min(1),
  tools: z.array(z.string()),
  config: z.record(z.string(), z.unknown()).optional(),
});

export const updateGeaesipAgentRegistrySchema = createGeaesipAgentRegistrySchema.partial();

export const createGeaesipAgentMissionSchema = z.object({
  schoolId: z.string().uuid(),
  objective: z.string().min(1),
  context: z.record(z.string(), z.unknown()),
  constraints: z.array(z.string()),
  agents: z.array(z.string().uuid()).min(1),
  tools: z.array(z.string()),
  budget: z.number().min(0),
  deadline: z.string().datetime(),
  riskLevel: z.nativeEnum(GeaesipRiskLevel),
  approvalRequired: z.boolean(),
});

export const updateGeaesipAgentMissionSchema = createGeaesipAgentMissionSchema.partial();

export const createGeaesipAgentVoteSchema = z.object({
  schoolId: z.string().uuid(),
  missionId: z.string().uuid(),
  agentId: z.string().uuid(),
  proposal: z.string().min(1),
  vote: z.enum(['APPROVE', 'REJECT', 'ABSTAIN']),
  confidence: z.number().min(0).max(1),
  reasoning: z.string().min(1),
});

export const updateGeaesipAgentVoteSchema = createGeaesipAgentVoteSchema.partial();

export const createGeaesipAgentNegotiationSchema = z.object({
  schoolId: z.string().uuid(),
  missionId: z.string().uuid(),
  proposals: z.array(z.object({ agentId: z.string().uuid(), proposal: z.string(), score: z.number() })).min(1),
  round: z.number().int().min(1),
  outcome: z.record(z.string(), z.unknown()),
});

export const updateGeaesipAgentNegotiationSchema = createGeaesipAgentNegotiationSchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 8
// =============================================================================

export const createGeaesipWorkflowSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(255),
  description: z.string().min(1),
  tasks: z.array(z.any()).min(1),
  dependencies: z.array(z.object({ from: z.string(), to: z.string() })),
  status: z.nativeEnum(GeaesipWorkflowStatus),
  trigger: z.record(z.string(), z.unknown()),
});

export const updateGeaesipWorkflowSchema = createGeaesipWorkflowSchema.partial();

export const createGeaesipWorkflowTaskSchema = z.object({
  workflowId: z.string().uuid(),
  name: z.string().min(1).max(255),
  type: z.nativeEnum(GeaesipActionType),
  assignee: z.string().uuid().nullable().optional(),
  parameters: z.record(z.string(), z.unknown()),
  maxRetries: z.number().int().min(0).max(10),
});

export const updateGeaesipWorkflowTaskSchema = createGeaesipWorkflowTaskSchema.partial();

export const createGeaesipActionPlanSchema = z.object({
  schoolId: z.string().uuid(),
  title: z.string().min(1).max(255),
  workflows: z.array(z.string().uuid()).min(1),
  priority: z.number().int().min(0).max(10),
  deadline: z.string().datetime(),
  approvalRequired: z.boolean(),
  status: z.nativeEnum(GeaesipWorkflowStatus),
});

export const updateGeaesipActionPlanSchema = createGeaesipActionPlanSchema.partial();

export const createGeaesipExecutionLogSchema = z.object({
  schoolId: z.string().uuid(),
  taskId: z.string().uuid(),
  action: z.string().min(1),
  status: z.nativeEnum(GeaesipTaskStatus),
  input: z.record(z.string(), z.unknown()),
  output: z.record(z.string(), z.unknown()).nullable().optional(),
  error: z.string().nullable().optional(),
  duration: z.number().min(0),
});

export const updateGeaesipExecutionLogSchema = createGeaesipExecutionLogSchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 9
// =============================================================================

export const createGeaesipRiskRegistrySchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(255),
  category: z.nativeEnum(GeaesipRiskCategory),
  description: z.string().min(1),
  probability: z.number().min(0).max(1),
  impact: z.number().min(0).max(10),
  score: z.number().min(0).max(10),
  status: z.nativeEnum(GeaesipRiskStatus),
  owner: z.string().uuid(),
  mitigations: z.array(z.string()),
});

export const updateGeaesipRiskRegistrySchema = createGeaesipRiskRegistrySchema.partial();

export const createGeaesipRiskMatrixSchema = z.object({
  schoolId: z.string().uuid(),
  risks: z.array(z.object({
    riskId: z.string().uuid(),
    probability: z.number().min(0).max(1),
    impact: z.number().min(0).max(10),
    score: z.number().min(0).max(10),
    category: z.nativeEnum(GeaesipRiskCategory),
  })).min(1),
});

export const updateGeaesipRiskMatrixSchema = createGeaesipRiskMatrixSchema.partial();

export const createGeaesipEarlyWarningSchema = z.object({
  schoolId: z.string().uuid(),
  riskId: z.string().uuid(),
  signal: z.string().min(1),
  severity: z.nativeEnum(GeaesipAlertSeverity),
  confidence: z.number().min(0).max(1),
});

export const updateGeaesipEarlyWarningSchema = createGeaesipEarlyWarningSchema.partial();

export const createGeaesipMitigationPlanSchema = z.object({
  schoolId: z.string().uuid(),
  riskId: z.string().uuid(),
  actions: z.array(z.object({
    name: z.string().min(1),
    assignee: z.string().uuid(),
    deadline: z.string().datetime(),
    status: z.string(),
  })).min(1),
  owner: z.string().uuid(),
  deadline: z.string().datetime(),
  status: z.enum(['PLANNING', 'EXECUTING', 'COMPLETED', 'ON_HOLD']),
  progress: z.number().min(0).max(100),
});

export const updateGeaesipMitigationPlanSchema = createGeaesipMitigationPlanSchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 10
// =============================================================================

export const createGeaesipCrisisSchema = z.object({
  schoolId: z.string().uuid(),
  type: z.nativeEnum(GeaesipCrisisType),
  level: z.nativeEnum(GeaesipCrisisLevel),
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  phase: z.nativeEnum(GeaesipCrisisPhase),
  status: z.enum(['OPEN', 'MANAGED', 'RESOLVED', 'CLOSED']),
  commander: z.string().uuid(),
});

export const updateGeaesipCrisisSchema = createGeaesipCrisisSchema.partial();

export const createGeaesipCrisisTeamSchema = z.object({
  schoolId: z.string().uuid(),
  crisisId: z.string().uuid(),
  roles: z.array(z.object({ role: z.string(), assignee: z.string().uuid() })).min(1),
  members: z.array(z.string().uuid()).min(1),
  status: z.enum(['FORMED', 'ACTIVE', 'STANDBY', 'DISBANDED']),
});

export const updateGeaesipCrisisTeamSchema = createGeaesipCrisisTeamSchema.partial();

export const createGeaesipCrisisPlaybookSchema = z.object({
  schoolId: z.string().uuid(),
  crisisType: z.nativeEnum(GeaesipCrisisType),
  steps: z.array(z.object({
    order: z.number().int().min(1),
    name: z.string().min(1),
    description: z.string().min(1),
    owner: z.string().uuid(),
    sla: z.number().int().min(0),
  })).min(1),
  triggers: z.array(z.string()),
  resources: z.array(z.object({ name: z.string(), type: z.string(), quantity: z.number().min(0) })),
  status: z.enum(['DRAFT', 'ACTIVE', 'ARCHIVED']),
});

export const updateGeaesipCrisisPlaybookSchema = createGeaesipCrisisPlaybookSchema.partial();

export const createGeaesipCrisisTimelineSchema = z.object({
  schoolId: z.string().uuid(),
  crisisId: z.string().uuid(),
  events: z.array(z.object({
    timestamp: z.string().datetime(),
    event: z.string().min(1),
    actor: z.string().uuid(),
    details: z.record(z.string(), z.unknown()),
  })).min(1),
});

export const updateGeaesipCrisisTimelineSchema = createGeaesipCrisisTimelineSchema.partial();

export const createGeaesipEmergencyCommunicationSchema = z.object({
  schoolId: z.string().uuid(),
  crisisId: z.string().uuid(),
  recipients: z.array(z.string().uuid()).min(1),
  message: z.string().min(1),
  channel: z.enum(['SMS', 'EMAIL', 'PUSH', 'PHONE', 'ALL']),
});

export const updateGeaesipEmergencyCommunicationSchema = createGeaesipEmergencyCommunicationSchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 11
// =============================================================================

export const createGeaesipResourceForecastSchema = z.object({
  schoolId: z.string().uuid(),
  resourceType: z.nativeEnum(GeaesipResourceType),
  current: z.number().min(0),
  predicted: z.number().min(0),
  gap: z.number(),
  period: z.string().min(1),
  model: z.string().min(1),
});

export const updateGeaesipResourceForecastSchema = createGeaesipResourceForecastSchema.partial();

export const createGeaesipAllocationPlanSchema = z.object({
  schoolId: z.string().uuid(),
  resourceType: z.nativeEnum(GeaesipResourceType),
  allocations: z.array(z.object({
    entity: z.string().min(1),
    amount: z.number().min(0),
    reason: z.string().min(1),
  })).min(1),
  constraints: z.record(z.string(), z.unknown()),
  objective: z.nativeEnum(GeaesipOptimizationGoal),
  score: z.number().min(0).max(100),
  status: z.enum(['DRAFT', 'APPROVED', 'EXECUTING', 'COMPLETED']),
});

export const updateGeaesipAllocationPlanSchema = createGeaesipAllocationPlanSchema.partial();

export const createGeaesipOptimizationResultSchema = z.object({
  schoolId: z.string().uuid(),
  resourceType: z.nativeEnum(GeaesipResourceType),
  baseline: z.record(z.string(), z.number()),
  optimized: z.record(z.string(), z.number()),
  savings: z.number().min(0),
  impact: z.record(z.string(), z.number()),
  confidence: z.number().min(0).max(1),
  recommendations: z.array(z.string()),
});

export const updateGeaesipOptimizationResultSchema = createGeaesipOptimizationResultSchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 12
// =============================================================================

export const createGeaesipCopilotSessionSchema = z.object({
  schoolId: z.string().uuid(),
  userId: z.string().uuid(),
  mode: z.nativeEnum(GeaesipCopilotMode),
  queries: z.array(z.object({
    question: z.string().min(1),
    answer: z.string().min(1),
    timestamp: z.string().datetime(),
  })),
  context: z.record(z.string(), z.unknown()),
  status: z.enum(['ACTIVE', 'CLOSED', 'ERROR']),
});

export const updateGeaesipCopilotSessionSchema = createGeaesipCopilotSessionSchema.partial();

export const createGeaesipCopilotAnswerSchema = z.object({
  sessionId: z.string().uuid(),
  question: z.string().min(1),
  answer: z.string().min(1),
  capabilities: z.array(z.nativeEnum(GeaesipCopilotCapability)).min(1),
  sources: z.array(z.string()),
  citations: z.array(z.object({
    type: z.nativeEnum(GeaesipCitationType),
    ref: z.string().min(1),
    text: z.string().min(1),
  })),
  confidence: z.number().min(0).max(1),
  reasoning: z.string().min(1),
  limitations: z.array(z.string()),
  hypotheses: z.array(z.string()),
  recommendations: z.array(z.string()),
  processingTime: z.number().min(0),
});

export const updateGeaesipCopilotAnswerSchema = createGeaesipCopilotAnswerSchema.partial();

export const createGeaesipCopilotExplanationSchema = z.object({
  sessionId: z.string().uuid(),
  answerId: z.string().uuid(),
  dataUsed: z.array(z.string()).min(1),
  reasoningSteps: z.array(z.string()).min(1),
  assumptions: z.array(z.string()),
  limitations: z.array(z.string()),
  alternatives: z.array(z.string()),
});

export const updateGeaesipCopilotExplanationSchema = createGeaesipCopilotExplanationSchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 13
// =============================================================================

export const createGeaesipMemorySchema = z.object({
  schoolId: z.string().uuid(),
  type: z.nativeEnum(GeaesipMemoryType),
  category: z.nativeEnum(GeaesipMemoryCategory),
  key: z.string().min(1).max(255),
  value: z.record(z.string(), z.unknown()),
  source: z.string().min(1),
  confidence: z.number().min(0).max(1),
  ttl: z.number().int().min(0),
  expiresAt: z.string().datetime().nullable().optional(),
  provenance: z.array(z.object({
    source: z.string().min(1),
    timestamp: z.string().datetime(),
    reliability: z.number().min(0).max(1),
  })),
});

export const updateGeaesipMemorySchema = createGeaesipMemorySchema.partial();

export const createGeaesipMemoryRetrievalSchema = z.object({
  schoolId: z.string().uuid(),
  query: z.string().min(1),
  results: z.array(z.object({
    memoryId: z.string().uuid(),
    score: z.number().min(0).max(1),
    snippet: z.string(),
  })),
  ranking: z.array(z.string().uuid()),
});

export const updateGeaesipMemoryRetrievalSchema = createGeaesipMemoryRetrievalSchema.partial();

export const createGeaesipMemoryPolicySchema = z.object({
  schoolId: z.string().uuid(),
  type: z.nativeEnum(GeaesipMemoryType),
  retentionDays: z.number().int().min(0),
  encryptionRequired: z.boolean(),
  accessControl: z.array(z.object({
    role: z.string().min(1),
    permission: z.enum(['READ', 'WRITE', 'DELETE', 'ADMIN']),
  })).min(1),
});

export const updateGeaesipMemoryPolicySchema = createGeaesipMemoryPolicySchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 14
// =============================================================================

export const createGeaesipAIEvaluationSchema = z.object({
  schoolId: z.string().uuid(),
  type: z.nativeEnum(GeaesipEvaluationType),
  targetId: z.string().uuid(),
  metrics: z.record(z.string(), z.number()),
  score: z.number().min(0).max(100),
  status: z.nativeEnum(GeaesipEvaluationStatus),
  findings: z.array(z.string()),
  recommendations: z.array(z.string()),
});

export const updateGeaesipAIEvaluationSchema = createGeaesipAIEvaluationSchema.partial();

export const createGeaesipModelEvaluationSchema = z.object({
  schoolId: z.string().uuid(),
  modelId: z.string().uuid(),
  accuracy: z.number().min(0).max(1),
  relevance: z.number().min(0).max(1),
  hallucinationRate: z.number().min(0).max(1),
  latency: z.number().min(0),
  cost: z.number().min(0),
  bias: z.number().min(0).max(1),
  safety: z.number().min(0).max(1),
  explainability: z.number().min(0).max(1),
  robustness: z.number().min(0).max(1),
  drift: z.number().min(0).max(1),
});

export const updateGeaesipModelEvaluationSchema = createGeaesipModelEvaluationSchema.partial();

export const createGeaesipAgentEvaluationSchema = z.object({
  schoolId: z.string().uuid(),
  agentId: z.string().uuid(),
  taskCompletion: z.number().min(0).max(1),
  accuracy: z.number().min(0).max(1),
  efficiency: z.number().min(0).max(1),
  safety: z.number().min(0).max(1),
  cooperation: z.number().min(0).max(1),
  score: z.number().min(0).max(100),
});

export const updateGeaesipAgentEvaluationSchema = createGeaesipAgentEvaluationSchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 15
// =============================================================================

export const createGeaesipImpactModelSchema = z.object({
  schoolId: z.string().uuid(),
  type: z.nativeEnum(GeaesipImpactType),
  name: z.string().min(1).max(255),
  formula: z.string().min(1),
  inputs: z.record(z.string(), z.unknown()),
  outputs: z.record(z.string(), z.unknown()),
  validated: z.boolean(),
});

export const updateGeaesipImpactModelSchema = createGeaesipImpactModelSchema.partial();

export const createGeaesipImpactResultSchema = z.object({
  schoolId: z.string().uuid(),
  modelId: z.string().uuid(),
  inputs: z.record(z.string(), z.unknown()),
  outputs: z.record(z.string(), z.number()),
  confidence: z.number().min(0).max(1),
  period: z.nativeEnum(GeaesipImpactPeriod),
});

export const updateGeaesipImpactResultSchema = createGeaesipImpactResultSchema.partial();

export const createGeaesipEconomicForecastSchema = z.object({
  schoolId: z.string().uuid(),
  indicator: z.string().min(1),
  forecast: z.array(z.object({ date: z.string(), value: z.number() })).min(1),
  confidence: z.number().min(0).max(1),
  period: z.nativeEnum(GeaesipImpactPeriod),
  model: z.string().min(1),
});

export const updateGeaesipEconomicForecastSchema = createGeaesipEconomicForecastSchema.partial();

export const createGeaesipHumanCapitalIndexSchema = z.object({
  schoolId: z.string().uuid(),
  dimension: z.string().min(1),
  score: z.number().min(0).max(100),
  trend: z.enum(['IMPROVING', 'STABLE', 'DECLINING']),
  factors: z.record(z.string(), z.number()),
});

export const updateGeaesipHumanCapitalIndexSchema = createGeaesipHumanCapitalIndexSchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 16
// =============================================================================

export const createGeaesipExtendedForecastSchema = z.object({
  schoolId: z.string().uuid(),
  domain: z.nativeEnum(GeaesipForecastDomain),
  method: z.nativeEnum(GeaesipForecastMethod),
  horizon: z.nativeEnum(GeaesipForecastHorizon),
  predictions: z.array(z.object({
    date: z.string(),
    value: z.number(),
    lower: z.number(),
    upper: z.number(),
  })).min(1),
  confidence: z.number().min(0).max(1),
  version: z.number().int().min(1),
});

export const updateGeaesipExtendedForecastSchema = createGeaesipExtendedForecastSchema.partial();

export const createGeaesipForecastBacktestSchema = z.object({
  schoolId: z.string().uuid(),
  forecastId: z.string().uuid(),
  actual: z.array(z.object({ date: z.string(), value: z.number() })).min(1),
  predicted: z.array(z.object({ date: z.string(), value: z.number() })).min(1),
  mape: z.number().min(0),
  rmse: z.number().min(0),
  r2: z.number().min(-1).max(1),
});

export const updateGeaesipForecastBacktestSchema = createGeaesipForecastBacktestSchema.partial();

export const createGeaesipModelDriftSchema = z.object({
  schoolId: z.string().uuid(),
  forecastId: z.string().uuid(),
  metric: z.string().min(1),
  driftScore: z.number().min(0).max(1),
  severity: z.nativeEnum(GeaesipAlertSeverity),
});

export const updateGeaesipModelDriftSchema = createGeaesipModelDriftSchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 17
// =============================================================================

export const createGeaesipCompositeIndexSchema = z.object({
  schoolId: z.string().uuid(),
  type: z.nativeEnum(GeaesipIndexType),
  name: z.string().min(1).max(255),
  score: z.number().min(0).max(100),
  components: z.array(z.object({
    name: z.string().min(1),
    weight: z.number().min(0).max(1),
    value: z.number(),
  })).min(1),
  weights: z.record(z.string(), z.number().min(0).max(1)),
  period: z.string().min(1),
  version: z.number().int().min(1),
});

export const updateGeaesipCompositeIndexSchema = createGeaesipCompositeIndexSchema.partial();

export const createGeaesipObservatoryIndicator2Schema = z.object({
  schoolId: z.string().uuid(),
  scope: z.nativeEnum(GeaesipIndicatorScope),
  name: z.string().min(1).max(255),
  value: z.number(),
  unit: z.string().min(1),
  source: z.string().min(1),
  methodology: z.string().min(1),
  version: z.number().int().min(1),
  period: z.string().min(1),
});

export const updateGeaesipObservatoryIndicator2Schema = createGeaesipObservatoryIndicator2Schema.partial();

export const createGeaesipObservatoryTrendSchema = z.object({
  schoolId: z.string().uuid(),
  indexType: z.nativeEnum(GeaesipIndexType),
  periods: z.array(z.object({ period: z.string(), value: z.number() })).min(2),
  direction: z.enum(['IMPROVING', 'STABLE', 'DECLINING']),
  rate: z.number(),
  inflectionPoints: z.array(z.object({ period: z.string(), event: z.string() })),
});

export const updateGeaesipObservatoryTrendSchema = createGeaesipObservatoryTrendSchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 18
// =============================================================================

export const createGeaesipGovernancePolicySchema = z.object({
  schoolId: z.string().uuid(),
  domain: z.nativeEnum(GeaesipGovernanceDomain),
  name: z.string().min(1).max(255),
  rules: z.array(z.object({
    rule: z.string().min(1),
    description: z.string().min(1),
    severity: z.nativeEnum(GeaesipAlertSeverity),
  })).min(1),
  enforcementLevel: z.enum(['MANDATORY', 'RECOMMENDED', 'OPTIONAL']),
  enabled: z.boolean(),
});

export const updateGeaesipGovernancePolicySchema = createGeaesipGovernancePolicySchema.partial();

export const createGeaesipGovernanceAuditSchema = z.object({
  schoolId: z.string().uuid(),
  domain: z.nativeEnum(GeaesipGovernanceDomain),
  action: z.nativeEnum(GeaesipGovernanceAction),
  actor: z.string().uuid(),
  target: z.string().min(1),
  details: z.record(z.string(), z.unknown()),
});

export const updateGeaesipGovernanceAuditSchema = createGeaesipGovernanceAuditSchema.partial();

export const createGeaesipEthicsReviewSchema = z.object({
  schoolId: z.string().uuid(),
  type: z.nativeEnum(GeaesipEvaluationType),
  targetId: z.string().uuid(),
  findings: z.array(z.object({
    category: z.string().min(1),
    description: z.string().min(1),
    severity: z.nativeEnum(GeaesipAlertSeverity),
  })).min(1),
  status: z.nativeEnum(GeaesipEthicsReviewStatus),
  reviewer: z.string().uuid(),
  recommendation: z.string().min(1),
});

export const updateGeaesipEthicsReviewSchema = createGeaesipEthicsReviewSchema.partial();

export const createGeaesipBiasReviewSchema = z.object({
  schoolId: z.string().uuid(),
  type: z.nativeEnum(GeaesipEvaluationType),
  targetId: z.string().uuid(),
  biasType: z.string().min(1),
  severity: z.nativeEnum(GeaesipAlertSeverity),
  evidence: z.array(z.string()).min(1),
  mitigation: z.string().min(1),
  status: z.nativeEnum(GeaesipEthicsReviewStatus),
});

export const updateGeaesipBiasReviewSchema = createGeaesipBiasReviewSchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 19
// =============================================================================

export const createGeaesipIntelligenceAPISchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(255),
  version: z.string().min(1),
  endpoints: z.array(z.object({
    path: z.string().min(1),
    method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
    description: z.string().min(1),
  })).min(1),
  auth: z.object({
    type: z.enum(['API_KEY', 'JWT', 'OAUTH2']),
    config: z.record(z.string(), z.unknown()),
  }),
  rateLimit: z.object({ requests: z.number().int().min(1), window: z.number().int().min(1) }),
  quota: z.object({ daily: z.number().int().min(1), monthly: z.number().int().min(1) }),
  enabled: z.boolean(),
});

export const updateGeaesipIntelligenceAPISchema = createGeaesipIntelligenceAPISchema.partial();

export const createGeaesipEventBusSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(255),
  type: z.nativeEnum(GeaesipAPIType),
  schema: z.record(z.string(), z.unknown()),
  subscribers: z.array(z.string().uuid()),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ERROR']),
});

export const updateGeaesipEventBusSchema = createGeaesipEventBusSchema.partial();

export const createGeaesipEventSubscriptionSchema = z.object({
  schoolId: z.string().uuid(),
  eventType: z.nativeEnum(GeaesipEventType),
  webhookUrl: z.string().url(),
  filters: z.record(z.string(), z.unknown()),
  active: z.boolean(),
});

export const updateGeaesipEventSubscriptionSchema = createGeaesipEventSubscriptionSchema.partial();

export const createGeaesipAPIUsageSchema = z.object({
  schoolId: z.string().uuid(),
  apiId: z.string().uuid(),
  endpoint: z.string().min(1),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
  count: z.number().int().min(0),
  latency: z.number().min(0),
  errors: z.number().int().min(0),
});

export const updateGeaesipAPIUsageSchema = createGeaesipAPIUsageSchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 20
// =============================================================================

export const createGeaesipEducationRuntimeSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(255),
  phase: z.nativeEnum(GeaesipRuntimePhase),
  status: z.nativeEnum(GeaesipRuntimeStatus),
  config: z.record(z.string(), z.unknown()),
  metrics: z.record(z.string(), z.number()),
});

export const updateGeaesipEducationRuntimeSchema = createGeaesipEducationRuntimeSchema.partial();

export const createGeaesipRuntimeExecutionSchema = z.object({
  schoolId: z.string().uuid(),
  runtimeId: z.string().uuid(),
  phase: z.nativeEnum(GeaesipRuntimePhase),
  input: z.record(z.string(), z.unknown()),
  output: z.record(z.string(), z.unknown()),
  duration: z.number().min(0),
  status: z.nativeEnum(GeaesipRuntimeStatus),
  error: z.string().nullable().optional(),
});

export const updateGeaesipRuntimeExecutionSchema = createGeaesipRuntimeExecutionSchema.partial();

export const createGeaesipRuntimeMetricSchema = z.object({
  schoolId: z.string().uuid(),
  runtimeId: z.string().uuid(),
  name: z.string().min(1).max(255),
  value: z.number(),
  unit: z.string().min(1),
});

export const updateGeaesipRuntimeMetricSchema = createGeaesipRuntimeMetricSchema.partial();
