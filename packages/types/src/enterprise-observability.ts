// ========================================
// MODULE 11: ENTERPRISE OBSERVABILITY
// ========================================

// ----------------------------------------
// ENUMS
// ----------------------------------------

export enum TraceStatus {
  OK = 'OK',
  ERROR = 'ERROR',
  TIMEOUT = 'TIMEOUT',
  CANCELLED = 'CANCELLED',
  UNSET = 'UNSET',
}

export enum SpanKind {
  INTERNAL = 'INTERNAL',
  SERVER = 'SERVER',
  CLIENT = 'CLIENT',
  PRODUCER = 'PRODUCER',
  CONSUMER = 'CONSUMER',
}

export enum MetricType {
  COUNTER = 'COUNTER',
  GAUGE = 'GAUGE',
  HISTOGRAM = 'HISTOGRAM',
  SUMMARY = 'SUMMARY',
  RATE = 'RATE',
  PERCENTILE = 'PERCENTILE',
}

export enum LogLevel {
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
}

export enum AlertSeverity {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL',
}

export enum AlertStatus {
  FIRING = 'FIRING',
  ACKNOWLEDGED = 'ACKNOWLEDGED',
  RESOLVED = 'RESOLVED',
  SILENCED = 'SILENCED',
  EXPIRED = 'EXPIRED',
}

export enum MonitoringTarget {
  SERVICE = 'SERVICE',
  DATABASE = 'DATABASE',
  CACHE = 'CACHE',
  QUEUE = 'QUEUE',
  CDN = 'CDN',
  API = 'API',
  SERVER = 'SERVER',
  CONTAINER = 'CONTAINER',
  CLUSTER = 'CLUSTER',
}

export enum SLACategory {
  AVAILABILITY = 'AVAILABILITY',
  LATENCY = 'LATENCY',
  THROUGHPUT = 'THROUGHPUT',
  ERROR_RATE = 'ERROR_RATE',
  DURABILITY = 'DURABILITY',
}

export enum CostCategory {
  COMPUTE = 'COMPUTE',
  STORAGE = 'STORAGE',
  NETWORK = 'NETWORK',
  DATABASE = 'DATABASE',
  AI_ML = 'AI_ML',
  SUPPORT = 'SUPPORT',
  LICENSE = 'LICENSE',
}

export enum BusinessMetric {
  ACTIVE_USERS = 'ACTIVE_USERS',
  SIGN_UPS = 'SIGN_UPS',
  RETENTION = 'RETENTION',
  CONVERSION = 'CONVERSION',
  REVENUE = 'REVENUE',
  SATISFACTION = 'SATISFACTION',
}

export enum InfrastructureMetric {
  CPU = 'CPU',
  MEMORY = 'MEMORY',
  DISK = 'DISK',
  NETWORK = 'NETWORK',
  PROCESS_COUNT = 'PROCESS_COUNT',
  FILE_DESCRIPTOR = 'FILE_DESCRIPTOR',
}

export enum DigitalTwinMetric {
  SIMULATION = 'SIMULATION',
  PREDICTION = 'PREDICTION',
  OPTIMIZATION = 'OPTIMIZATION',
  WHAT_IF = 'WHAT_IF',
  SCENARIO = 'SCENARIO',
}

export enum PredictionType {
  CAPACITY = 'CAPACITY',
  FAILURE = 'FAILURE',
  COST = 'COST',
  PERFORMANCE = 'PERFORMANCE',
  DEMAND = 'DEMAND',
}

export enum AnomalyType {
  POINT = 'POINT',
  CONTEXTUAL = 'CONTEXTUAL',
  COLLECTIVE = 'COLLECTIVE',
  PATTERN = 'PATTERN',
}

export enum CorrelationType {
  CAUSAL = 'CAUSAL',
  TEMPORAL = 'TEMPORAL',
  SPATIAL = 'SPATIAL',
  STATISTICAL = 'STATISTICAL',
}

export enum DashboardWidget {
  TIME_SERIES = 'TIME_SERIES',
  GAUGE = 'GAUGE',
  TABLE = 'TABLE',
  HEATMAP = 'HEATMAP',
  MAP = 'MAP',
  LOG_VIEWER = 'LOG_VIEWER',
  TOPOLOGY = 'TOPOLOGY',
  ALERT_LIST = 'alert_list',
}

export enum ReportType {
  OPERATIONAL = 'OPERATIONAL',
  EXECUTIVE = 'EXECUTIVE',
  INCIDENT = 'INCIDENT',
  CAPACITY = 'CAPACITY',
  COST = 'COST',
}

export enum NotificationChannel {
  EMAIL = 'EMAIL',
  SLACK = 'SLACK',
  PAGERDUTY = 'PAGERDUTY',
  WEBHOOK = 'WEBHOOK',
  SMS = 'SMS',
  TEAMS = 'TEAMS',
}

export enum EscalationLevel {
  L1 = 'L1',
  L2 = 'L2',
  L3 = 'L3',
  MANAGEMENT = 'MANAGEMENT',
  EXECUTIVE = 'EXECUTIVE',
}

export enum RunbookAction {
  RESTART = 'RESTART',
  SCALE_UP = 'SCALE_UP',
  SCALE_DOWN = 'SCALE_DOWN',
  FAILOVER = 'FAILOVER',
  ROLLBACK = 'ROLLBACK',
  NOTIFY = 'NOTIFY',
  DRAIN = 'DRAIN',
  BLOCK = 'BLOCK',
}

export enum IncidentStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
  POSTMORTEM = 'POSTMORTEM',
}

export enum PostMortemStatus {
  DRAFT = 'DRAFT',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  PUBLISHED = 'PUBLISHED',
}

export enum OnCallRotation {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  TERTIARY = 'TERTIARY',
  FOLLOW_THE_SUN = 'FOLLOW_THE_SUN',
}

export enum PagerStrategy {
  ROUND_ROBIN = 'ROUND_ROBIN',
  ESCALATION = 'ESCALATION',
  LOAD_BALANCE = 'LOAD_BALANCE',
  SKILL_BASED = 'SKILL_BASED',
}

export enum MaintenanceWindow {
  SCHEDULED = 'SCHEDULED',
  EMERGENCY = 'EMERGENCY',
  RECURRING = 'RECURRING',
}

export enum ChangeType {
  MAJOR = 'MAJOR',
  MINOR = 'MINOR',
  STANDARD = 'STANDARD',
  EMERGENCY = 'EMERGENCY',
}

export enum DeploymentStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  ROLLED_BACK = 'ROLLED_BACK',
}

export enum FeatureFlag {
  BOOLEAN = 'BOOLEAN',
  PERCENTAGE = 'PERCENTAGE',
  USER_SEGMENT = 'USER_SEGMENT',
  KILL_SWITCH = 'KILL_SWITCH',
}

export enum LogAggregation {
  NONE = 'NONE',
  SAMPLING = 'SAMPLING',
  BUFFERED = 'BUFFERED',
  STREAMING = 'STREAMING',
}

export enum MetricAggregation {
  SUM = 'SUM',
  AVG = 'AVG',
  MIN = 'MIN',
  MAX = 'MAX',
  COUNT = 'COUNT',
  PERCENTILE = 'PERCENTILE',
}

export enum TraceSampling {
  ALWAYS_ON = 'ALWAYS_ON',
  ALWAYS_OFF = 'ALWAYS_OFF',
  PROBABILISTIC = 'PROBABILISTIC',
  RATE_LIMITED = 'RATE_LIMITED',
  PARENT_BASED = 'PARENT_BASED',
}

export enum AlertGroup {
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  APPLICATION = 'APPLICATION',
  SECURITY = 'SECURITY',
  BUSINESS = 'BUSINESS',
  COMPLIANCE = 'COMPLIANCE',
}

export enum SLOStatus {
  MET = 'MET',
  VIOLATED = 'VIOLATED',
  AT_RISK = 'AT_RISK',
  NOT_APPLICABLE = 'NOT_APPLICABLE',
}

export enum ErrorBudget {
  REMAINING = 'REMAINING',
  CONSUMED = 'CONSUMED',
  EXHAUSTED = 'EXHAUSTED',
}

export enum BurnRate {
  SLOW = 'SLOW',
  NORMAL = 'NORMAL',
  FAST = 'FAST',
  CRITICAL = 'CRITICAL',
}

export enum LatencyPercentile {
  P50 = 'P50',
  P75 = 'P75',
  P90 = 'P90',
  P95 = 'P95',
  P99 = 'P99',
  P999 = 'P999',
}

export enum ThroughputUnit {
  REQUESTS_PER_SEC = 'REQUESTS_PER_SEC',
  REQUESTS_PER_MIN = 'REQUESTS_PER_MIN',
  BYTES_PER_SEC = 'BYTES_PER_SEC',
  MESSAGES_PER_SEC = 'MESSAGES_PER_SEC',
  TRANSACTIONS_PER_SEC = 'TRANSACTIONS_PER_SEC',
}

export enum SaturationLevel {
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

// ----------------------------------------
// INTERFACES
// ----------------------------------------

export interface DistributedTrace {
  id: string;
  name: string;
  status: TraceStatus;
  startTime: string;
  endTime: string;
  duration: number;
  spanCount: number;
  spans: TraceSpan[];
  serviceCount: number;
  tags: Record<string, string>;
}

export interface TraceSpan {
  id: string;
  traceId: string;
  parentSpanId?: string;
  name: string;
  kind: SpanKind;
  status: TraceStatus;
  startTime: string;
  endTime: string;
  duration: number;
  service: string;
  tags: Record<string, string>;
  logs: SpanLog[];
}

export interface SpanLog {
  timestamp: string;
  fields: Record<string, string>;
}

export interface Metric {
  id: string;
  name: string;
  type: MetricType;
  labels: Record<string, string>;
  value: number;
  unit?: string;
  timestamp: string;
}

export interface MetricSeries {
  id: string;
  name: string;
  type: MetricType;
  labels: Record<string, string>;
  dataPoints: MetricDataPoint[];
  aggregatedValue?: number;
  aggregation?: MetricAggregation;
  unit?: string;
}

export interface MetricDataPoint {
  timestamp: string;
  value: number;
}

export interface MetricAlert {
  id: string;
  name: string;
  metric: string;
  condition: string;
  threshold: number;
  severity: AlertSeverity;
  status: AlertStatus;
  currentValue: number;
  triggeredAt?: string;
  resolvedAt?: string;
  labels: Record<string, string>;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  service: string;
  message: string;
  traceId?: string;
  spanId?: string;
  labels: Record<string, string>;
  fields: Record<string, string>;
}

export interface LogAggregationRecord {
  id: string;
  service: string;
  level: LogLevel;
  count: number;
  pattern: string;
  firstSeen: string;
  lastSeen: string;
  sampleLogs: string[];
}

export interface Event {
  id: string;
  type: string;
  source: string;
  timestamp: string;
  severity: AlertSeverity;
  message: string;
  data: Record<string, unknown>;
  correlations: EventCorrelation[];
}

export interface EventCorrelation {
  eventId: string;
  correlatedId: string;
  type: CorrelationType;
  strength: number;
}

export interface AlertRule {
  id: string;
  name: string;
  description: string;
  metric: string;
  condition: string;
  threshold: number;
  severity: AlertSeverity;
  group: AlertGroup;
  notificationChannels: NotificationChannel[];
  escalationPolicy?: string;
  cooldown: number;
  enabled: boolean;
  labels: Record<string, string>;
  annotations: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface AlertIncident {
  id: string;
  ruleId: string;
  ruleName: string;
  severity: AlertSeverity;
  status: AlertStatus;
  message: string;
  service: string;
  labels: Record<string, string>;
  triggeredAt: string;
  acknowledgedAt?: string;
  resolvedAt?: string;
  acknowledgements: AlertAcknowledgement[];
  escalations: AlertEscalationRecord[];
  duration: number;
}

export interface AlertAcknowledgement {
  userId: string;
  timestamp: string;
  message?: string;
}

export interface AlertEscalationRecord {
  level: EscalationLevel;
  target: string;
  timestamp: string;
  channel: NotificationChannel;
}

export interface SLAMonitor {
  id: string;
  name: string;
  category: SLACategory;
  target: number;
  current: number;
  unit: string;
  status: SLOStatus;
  errorBudget: ErrorBudgetRecord;
  burnRate: BurnRate;
  window: string;
  trend: string;
}

export interface SLOTarget {
  id: string;
  name: string;
  description: string;
  category: SLACategory;
  targetValue: number;
  current: number;
  unit: string;
  window: string;
  status: SLOStatus;
  errorBudget: ErrorBudgetRecord;
}

export interface ErrorBudgetRecord {
  total: number;
  consumed: number;
  remaining: number;
  percentage: number;
  status: ErrorBudget;
  projectedExhaustionDate?: string;
  burnRate: BurnRate;
}

export interface CostMonitor {
  id: string;
  name: string;
  provider: string;
  totalCost: number;
  budget: number;
  projectedCost: number;
  breakdown: CostBreakdown[];
  alerts: CostAlert[];
  trend: string;
  period: string;
}

export interface CostBreakdown {
  category: CostCategory;
  amount: number;
  percentage: number;
  trend: string;
}

export interface CostAlert {
  id: string;
  type: string;
  threshold: number;
  current: number;
  severity: AlertSeverity;
  triggeredAt: string;
  message: string;
}

export interface BusinessMonitor {
  id: string;
  name: string;
  metric: BusinessMetric;
  value: number;
  target: number;
  unit: string;
  status: SLOStatus;
  trend: string;
  period: string;
  breakdown: Record<string, number>;
}

export interface InfrastructureMonitor {
  id: string;
  name: string;
  target: MonitoringTarget;
  metrics: InfrastructureMetricRecord[];
  health: string;
  alerts: AlertIncident[];
  capacity: CapacityMetricRecord[];
}

export interface InfrastructureMetricRecord {
  metric: InfrastructureMetric;
  value: number;
  unit: string;
  utilization: number;
  threshold: number;
  status: SaturationLevel;
}

export interface DigitalTwinMonitor {
  id: string;
  name: string;
  type: DigitalTwinMetric;
  modelId: string;
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown>;
  accuracy: number;
  lastSync: string;
  predictions: DigitalTwinPrediction[];
}

export interface DigitalTwinPrediction {
  id: string;
  type: PredictionType;
  predictedValue: number;
  confidence: number;
  timeHorizon: string;
  generatedAt: string;
}

export interface PredictiveAlert {
  id: string;
  name: string;
  type: PredictionType;
  prediction: string;
  confidence: number;
  timeHorizon: string;
  severity: AlertSeverity;
  service: string;
  modelId: string;
  generatedAt: string;
}

export interface AnomalyDetector {
  id: string;
  name: string;
  metric: string;
  type: AnomalyType;
  sensitivity: number;
  baselineWindow: string;
  anomalies: Anomaly[];
}

export interface Anomaly {
  id: string;
  timestamp: string;
  value: number;
  expected: number;
  deviation: number;
  severity: AlertSeverity;
  type: AnomalyType;
  resolved: boolean;
}

export interface CorrelationEngine {
  id: string;
  name: string;
  metrics: string[];
  type: CorrelationType;
  correlations: Correlation[];
}

export interface Correlation {
  metricA: string;
  metricB: string;
  type: CorrelationType;
  coefficient: number;
  significance: number;
  lag: number;
}

export interface ObservabilityDashboard {
  id: string;
  name: string;
  description: string;
  widgets: ObservabilityWidget[];
  refreshInterval: number;
  timeRange: string;
  filters: Record<string, string>;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ObservabilityWidget {
  id: string;
  type: DashboardWidget;
  title: string;
  query: string;
  position: WidgetPosition;
  size: WidgetSize;
  config: Record<string, unknown>;
}

export interface WidgetPosition {
  x: number;
  y: number;
}

export interface WidgetSize {
  width: number;
  height: number;
}

export interface ObservabilityReport {
  id: string;
  name: string;
  type: ReportType;
  period: string;
  generatedAt: string;
  content: string;
  metrics: ReportMetric[];
  status: string;
}

export interface ReportMetric {
  name: string;
  value: number;
  change: number;
  trend: string;
  unit: string;
}

export interface Runbook {
  id: string;
  name: string;
  description: string;
  trigger: string;
  steps: RunbookStep[];
  alertRuleId?: string;
  enabled: boolean;
  lastExecuted?: string;
  executionCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface RunbookStep {
  order: number;
  action: RunbookAction;
  description: string;
  command?: string;
  timeout: number;
  rollbackAction?: RunbookAction;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  status: IncidentStatus;
  service: string;
  assignedTo: string[];
  rootCause?: string;
  impact: string;
  timeline: IncidentTimelineEntry[];
  relatedAlerts: string[];
  startTime: string;
  acknowledgedAt?: string;
  resolvedAt?: string;
  closedAt?: string;
  duration?: number;
  createdAt: string;
  updatedAt: string;
}

export interface IncidentTimelineEntry {
  timestamp: string;
  action: string;
  actor: string;
  message: string;
}

export interface PostMortem {
  id: string;
  incidentId: string;
  title: string;
  status: PostMortemStatus;
  summary: string;
  timeline: PostMortemTimelineEntry[];
  rootCause: string;
  impact: PostMortemImpact;
  actionItems: PostMortemActionItem[];
  lessonsLearned: string[];
  author: string;
  reviewers: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PostMortemTimelineEntry {
  timestamp: string;
  event: string;
  who: string;
}

export interface PostMortemImpact {
  duration: number;
  affectedUsers: number;
  dataLoss: boolean;
  financialImpact: number;
}

export interface PostMortemActionItem {
  id: string;
  description: string;
  assignee: string;
  dueDate: string;
  completed: boolean;
  priority: AlertSeverity;
}

export interface OnCallSchedule {
  id: string;
  name: string;
  strategy: PagerStrategy;
  rotations: OnCallRotationEntry[];
  escalationPolicy: string;
  timeZone: string;
  overrides: OnCallOverride[];
}

export interface OnCallRotationEntry {
  userId: string;
  level: OnCallRotation;
  startDate: string;
  endDate: string;
}

export interface OnCallOverride {
  userId: string;
  startDate: string;
  endDate: string;
  reason: string;
}

export interface MaintenanceWindowRecord {
  id: string;
  name: string;
  type: MaintenanceWindow;
  description: string;
  startTime: string;
  endTime: string;
  affectedServices: string[];
  changeRequest?: string;
  status: string;
  createdBy: string;
  createdAt: string;
}

export interface ChangeRequest {
  id: string;
  title: string;
  description: string;
  type: ChangeType;
  status: DeploymentStatus;
  riskLevel: string;
  changeOwner: string;
  approvers: string[];
  affectedServices: string[];
  rollbackPlan: string;
  scheduledAt?: string;
  executedAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Deployment {
  id: string;
  name: string;
  version: string;
  service: string;
  status: DeploymentStatus;
  environment: string;
  commitHash: string;
  deployedBy: string;
  startedAt: string;
  completedAt?: string;
  duration?: number;
  healthCheck: HealthCheck;
}

export interface FeatureFlagRecord {
  id: string;
  name: string;
  type: FeatureFlag;
  enabled: boolean;
  description: string;
  rules: FeatureFlagRule[];
  killSwitch: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FeatureFlagRule {
  id: string;
  condition: string;
  value: boolean;
  percentage?: number;
  userSegment?: string;
}

export interface HealthCheck {
  id: string;
  service: string;
  status: string;
  checks: HealthCheckResult[];
  lastCheck: string;
  interval: number;
}

export interface HealthCheckResult {
  name: string;
  status: string;
  message?: string;
  duration: number;
}

export interface CapacityMetricRecord {
  id: string;
  resource: string;
  current: number;
  capacity: number;
  unit: string;
  utilization: number;
  threshold: number;
  status: SaturationLevel;
  forecast: CapacityForecast;
}

export interface CapacityForecast {
  model: string;
  predictedCapacity: number;
  daysUntilFull: number;
  confidence: number;
}

export interface PerformanceBaseline {
  id: string;
  name: string;
  service: string;
  metrics: PerformanceBaselineMetric[];
  period: string;
  status: string;
  createdAt: string;
}

export interface PerformanceBaselineMetric {
  name: string;
  p50: number;
  p95: number;
  p99: number;
  unit: string;
}

export interface PerformanceReport {
  id: string;
  name: string;
  period: string;
  summary: string;
  services: PerformanceServiceReport[];
  generatedAt: string;
}

export interface PerformanceServiceReport {
  service: string;
  latency: PerformanceLatency;
  throughput: number;
  errorRate: number;
  availability: number;
}

export interface PerformanceLatency {
  p50: number;
  p75: number;
  p90: number;
  p95: number;
  p99: number;
  unit: string;
}
