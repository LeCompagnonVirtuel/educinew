// MetricType
export const MetricType = {
  Counter: 'counter',
  Gauge: 'gauge',
  Histogram: 'histogram',
  Summary: 'summary',
  Rate: 'rate',
} as const;
export type MetricType = (typeof MetricType)[keyof typeof MetricType];

// TraceStatus
export const TraceStatus = {
  Ok: 'ok',
  Error: 'error',
  Timeout: 'timeout',
  Cancelled: 'cancelled',
} as const;
export type TraceStatus = (typeof TraceStatus)[keyof typeof TraceStatus];

// SpanKind
export const SpanKind = {
  Internal: 'internal',
  Server: 'server',
  Client: 'client',
  Producer: 'producer',
  Consumer: 'consumer',
} as const;
export type SpanKind = (typeof SpanKind)[keyof typeof SpanKind];

// LogSeverity
export const LogSeverity = {
  Emergency: 'emergency',
  Alert: 'alert',
  Critical: 'critical',
  Error: 'error',
  Warning: 'warning',
  Notice: 'notice',
  Info: 'info',
  Debug: 'debug',
} as const;
export type LogSeverity = (typeof LogSeverity)[keyof typeof LogSeverity];

// AlertStatus
export const AlertStatus = {
  Firing: 'firing',
  Resolved: 'resolved',
  Silenced: 'silenced',
  Acknowledged: 'acknowledged',
} as const;
export type AlertStatus = (typeof AlertStatus)[keyof typeof AlertStatus];

// AlertCondition
export const AlertCondition = {
  GreaterThan: 'greater_than',
  LessThan: 'less_than',
  Equals: 'equals',
  NotEquals: 'not_equals',
  Between: 'between',
  Contains: 'contains',
} as const;
export type AlertCondition = (typeof AlertCondition)[keyof typeof AlertCondition];

// AlertSeverity
export const AlertSeverity = {
  Info: 'info',
  Warning: 'warning',
  Error: 'error',
  Critical: 'critical',
} as const;
export type AlertSeverity = (typeof AlertSeverity)[keyof typeof AlertSeverity];

// HealthCheckType
export const HealthCheckType = {
  Http: 'http',
  Tcp: 'tcp',
  Ping: 'ping',
  Script: 'script',
  Database: 'database',
  Cache: 'cache',
  Queue: 'queue',
} as const;
export type HealthCheckType = (typeof HealthCheckType)[keyof typeof HealthCheckType];

// HealthStatus
export const HealthStatus = {
  Healthy: 'healthy',
  Degraded: 'degraded',
  Unhealthy: 'unhealthy',
} as const;
export type HealthStatus = (typeof HealthStatus)[keyof typeof HealthStatus];

// MonitoringPeriod
export const MonitoringPeriod = {
  Minute: 'minute',
  Hour: 'hour',
  Day: 'day',
  Week: 'week',
  Month: 'month',
  Quarter: 'quarter',
  Year: 'year',
} as const;
export type MonitoringPeriod = (typeof MonitoringPeriod)[keyof typeof MonitoringPeriod];

// EncryptionAlgorithm
export const EncryptionAlgorithm = {
  Aes256Gcm: 'aes_256_gcm',
  Aes128Gcm: 'aes_128_gcm',
  Rsa2048: 'rsa_2048',
  Rsa4096: 'rsa_4096',
  Ed25519: 'ed25519',
  ChaCha20: 'chacha20',
} as const;
export type EncryptionAlgorithm = (typeof EncryptionAlgorithm)[keyof typeof EncryptionAlgorithm];

// KeyStatus
export const KeyStatus = {
  Active: 'active',
  Rotated: 'rotated',
  Revoked: 'revoked',
  Expired: 'expired',
  Pending: 'pending',
} as const;
export type KeyStatus = (typeof KeyStatus)[keyof typeof KeyStatus];

// AuditAction
export const AuditAction = {
  Create: 'create',
  Read: 'read',
  Update: 'update',
  Delete: 'delete',
  Login: 'login',
  Logout: 'logout',
  Export: 'export',
  Import: 'import',
  Share: 'share',
  Approve: 'approve',
  Reject: 'reject',
} as const;
export type AuditAction = (typeof AuditAction)[keyof typeof AuditAction];

// ThreatLevel
export const ThreatLevel = {
  None: 'none',
  Low: 'low',
  Medium: 'medium',
  High: 'high',
  Critical: 'critical',
} as const;
export type ThreatLevel = (typeof ThreatLevel)[keyof typeof ThreatLevel];

// ComplianceFramework
export const ComplianceFramework = {
  Ferpa: 'ferpa',
  Coppa: 'coppa',
  Gdpr: 'gdpr',
  Hipaa: 'hipaa',
  Iso27001: 'iso27001',
  Soc2: 'soc2',
  Custom: 'custom',
} as const;
export type ComplianceFramework = (typeof ComplianceFramework)[keyof typeof ComplianceFramework];

// SecretType
export const SecretType = {
  ApiKey: 'api_key',
  Password: 'password',
  Token: 'token',
  Certificate: 'certificate',
  PrivateKey: 'private_key',
  ConnectionString: 'connection_string',
  EncryptionKey: 'encryption_key',
} as const;
export type SecretType = (typeof SecretType)[keyof typeof SecretType];

// FirewallRuleAction
export const FirewallRuleAction = {
  Allow: 'allow',
  Deny: 'deny',
  Log: 'log',
  Redirect: 'redirect',
} as const;
export type FirewallRuleAction = (typeof FirewallRuleAction)[keyof typeof FirewallRuleAction];

// SecurityPolicyType
export const SecurityPolicyType = {
  AccessControl: 'access_control',
  DataProtection: 'data_protection',
  NetworkSecurity: 'network_security',
  IncidentResponse: 'incident_response',
  AcceptableUse: 'acceptable_use',
} as const;
export type SecurityPolicyType = (typeof SecurityPolicyType)[keyof typeof SecurityPolicyType];

// Interfaces

export interface Metric {
  id: string;
  schoolId: string;
  name: string;
  type: MetricType;
  value: number;
  labels: Record<string, string>;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface MetricSeries {
  id: string;
  schoolId: string;
  name: string;
  dataPoints: MetricDataPoint[];
  labels: Record<string, string>;
  metadata: Record<string, unknown>;
  period: MonitoringPeriod;
}

export interface MetricDataPoint {
  timestamp: string;
  value: number;
}

export interface Trace {
  id: string;
  schoolId: string;
  traceId: string;
  name: string;
  status: TraceStatus;
  duration: number;
  spans: Span[];
  startTime: string;
  endTime: string;
  metadata: Record<string, unknown>;
}

export interface Span {
  id: string;
  traceId: string;
  parentId: string;
  name: string;
  kind: SpanKind;
  status: TraceStatus;
  startTime: string;
  endTime: string;
  duration: number;
  attributes: Record<string, unknown>;
  events: SpanEvent[];
}

export interface SpanEvent {
  name: string;
  timestamp: string;
  attributes: Record<string, unknown>;
}

export interface DistributedLog {
  id: string;
  schoolId: string;
  severity: LogSeverity;
  message: string;
  source: string;
  traceId: string;
  spanId: string;
  attributes: Record<string, unknown>;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface PerformanceMetric {
  id: string;
  schoolId: string;
  endpoint: string;
  method: string;
  responseTime: number;
  p50: number;
  p95: number;
  p99: number;
  throughput: number;
  errorRate: number;
  status: string;
  period: MonitoringPeriod;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface Alert {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  severity: AlertSeverity;
  status: AlertStatus;
  condition: AlertCondition;
  threshold: number;
  currentValue: number;
  metric: string;
  labels: Record<string, string>;
  channels: AlertChannel[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  firedAt: string;
  resolvedAt: string;
}

export interface AlertChannel {
  type: string;
  target: string;
  enabled: boolean;
}

export interface SentryIntegration {
  id: string;
  schoolId: string;
  dsn: string;
  environment: string;
  release: string;
  sampleRate: number;
  tracesSampleRate: number;
  beforeSend: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface HealthCheck {
  id: string;
  schoolId: string;
  name: string;
  type: HealthCheckType;
  target: string;
  interval: number;
  timeout: number;
  status: HealthStatus;
  lastCheck: string;
  lastResponse: string;
  consecutiveFailures: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface HealthCheckResult {
  healthCheckId: string;
  status: HealthStatus;
  responseTime: number;
  message: string;
  metadata: Record<string, unknown>;
  checkedAt: string;
}

export interface MonitoringDashboard {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  widgets: DashboardWidget[];
  layout: Record<string, unknown>;
  refreshInterval: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface DashboardWidget {
  id: string;
  type: string;
  title: string;
  query: string;
  config: Record<string, unknown>;
  position: Record<string, unknown>;
  size: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

export interface CronMonitor {
  id: string;
  schoolId: string;
  name: string;
  schedule: string;
  expectedDuration: number;
  timeout: number;
  status: HealthStatus;
  lastRunAt: string;
  lastDuration: number;
  consecutiveFailures: number;
  alertChannels: AlertChannel[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface QueueMonitor {
  id: string;
  schoolId: string;
  queueName: string;
  depth: number;
  processingRate: number;
  consumerCount: number;
  status: string;
  oldestMessageAt: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface APIMonitor {
  id: string;
  schoolId: string;
  integrationId: string;
  endpoint: string;
  method: string;
  status: string;
  responseTime: number;
  uptime: number;
  errorRate: number;
  lastCheckAt: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DatabaseMonitor {
  id: string;
  schoolId: string;
  name: string;
  connectionCount: number;
  queryTime: number;
  slowQueries: number;
  status: string;
  lastCheckAt: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface PerformanceSnapshot {
  id: string;
  schoolId: string;
  metric: string;
  value: number;
  previousValue: number;
  changePercent: number;
  period: MonitoringPeriod;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface SecretVault {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  type: SecretType;
  encryptedValue: string;
  keyId: string;
  algorithm: EncryptionAlgorithm;
  version: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  expiresAt: string;
}

export interface EncryptionKey {
  id: string;
  schoolId: string;
  name: string;
  algorithm: EncryptionAlgorithm;
  status: KeyStatus;
  publicKey: string;
  keySize: number;
  rotationInterval: number;
  lastRotatedAt: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface KeyRotation {
  id: string;
  schoolId: string;
  keyId: string;
  oldKeyId: string;
  newKeyId: string;
  status: string;
  rotatedAt: string;
  metadata: Record<string, unknown>;
}

export interface AuditTrail {
  id: string;
  schoolId: string;
  userId: string;
  action: AuditAction;
  entityType: string;
  entityId: string;
  oldValues: Record<string, unknown>;
  newValues: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface APIFirewall {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  status: string;
  rules: FirewallRule[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface FirewallRule {
  id: string;
  firewallId: string;
  name: string;
  action: FirewallRuleAction;
  conditions: FirewallCondition[];
  priority: number;
  enabled: boolean;
  metadata: Record<string, unknown>;
}

export interface FirewallCondition {
  field: string;
  operator: string;
  value: string;
}

export interface IPAllowlist {
  id: string;
  schoolId: string;
  ip: string;
  description: string;
  enabled: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface IPBlocklist {
  id: string;
  schoolId: string;
  ip: string;
  reason: string;
  enabled: boolean;
  expiresAt: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface BotProtection {
  id: string;
  schoolId: string;
  name: string;
  type: string;
  config: Record<string, unknown>;
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface ThreatDetection {
  id: string;
  schoolId: string;
  type: string;
  severity: ThreatLevel;
  source: string;
  details: Record<string, unknown>;
  status: string;
  blockedAt: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface SecurityPolicy {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  type: SecurityPolicyType;
  rules: Record<string, unknown>;
  enabled: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ComplianceReport {
  id: string;
  schoolId: string;
  framework: ComplianceFramework;
  status: string;
  score: number;
  findings: ComplianceFinding[];
  generatedAt: string;
  expiresAt: string;
  metadata: Record<string, unknown>;
}

export interface ComplianceFinding {
  category: string;
  severity: string;
  description: string;
  remediation: string;
  status: string;
  metadata: Record<string, unknown>;
}

export interface SecurityEvent {
  id: string;
  schoolId: string;
  type: string;
  severity: ThreatLevel;
  source: string;
  description: string;
  affectedResources: string[];
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DataClassification {
  id: string;
  schoolId: string;
  entityType: string;
  entityId: string;
  classification: string;
  confidence: number;
  labels: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AccessControl {
  id: string;
  schoolId: string;
  userId: string;
  resource: string;
  action: string;
  conditions: Record<string, unknown>;
  effect: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface SessionLog {
  id: string;
  schoolId: string;
  userId: string;
  sessionId: string;
  action: string;
  ipAddress: string;
  userAgent: string;
  location: string;
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface ThreatIntelligence {
  id: string;
  schoolId: string;
  type: string;
  indicators: string[];
  confidence: number;
  source: string;
  expiresAt: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface IncidentResponse {
  id: string;
  schoolId: string;
  title: string;
  description: string;
  severity: ThreatLevel;
  status: string;
  assigneeId: string;
  timeline: IncidentEvent[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string;
}

export interface IncidentEvent {
  id: string;
  incidentId: string;
  type: string;
  description: string;
  userId: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface SecurityScan {
  id: string;
  schoolId: string;
  type: string;
  status: string;
  findings: SecurityFinding[];
  startedAt: string;
  completedAt: string;
  metadata: Record<string, unknown>;
}

export interface SecurityFinding {
  id: string;
  scanId: string;
  severity: ThreatLevel;
  title: string;
  description: string;
  resource: string;
  remediation: string;
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface VulnerabilityReport {
  id: string;
  schoolId: string;
  total: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  info: number;
  scannedAt: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface ComplianceCheck {
  id: string;
  schoolId: string;
  framework: ComplianceFramework;
  control: string;
  status: string;
  lastCheckedAt: string;
  evidence: string;
  metadata: Record<string, unknown>;
}

export interface AuditExport {
  id: string;
  schoolId: string;
  format: string;
  dateFrom: string;
  dateTo: string;
  recordCount: number;
  downloadUrl: string;
  expiresAt: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface SecurityDashboard {
  id: string;
  schoolId: string;
  threats: ThreatDetection[];
  recentEvents: SecurityEvent[];
  policyViolations: number;
  complianceScore: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DataEncryption {
  id: string;
  schoolId: string;
  entityType: string;
  entityId: string;
  field: string;
  algorithm: EncryptionAlgorithm;
  keyId: string;
  encryptedAt: string;
  metadata: Record<string, unknown>;
}

export interface BackupStatus {
  id: string;
  schoolId: string;
  type: string;
  status: string;
  size: number;
  lastBackupAt: string;
  nextBackupAt: string;
  retention: number;
  metadata: Record<string, unknown>;
}

export interface DisasterRecoveryPlan {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  rto: number;
  rpo: number;
  steps: RecoveryStep[];
  lastTestedAt: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface RecoveryStep {
  order: number;
  name: string;
  description: string;
  responsible: string;
  estimatedDuration: number;
  dependencies: string[];
  metadata: Record<string, unknown>;
}

export interface SecurityAudit {
  id: string;
  schoolId: string;
  type: string;
  scope: string;
  status: string;
  findings: ComplianceFinding[];
  auditor: string;
  scheduledAt: string;
  completedAt: string;
  metadata: Record<string, unknown>;
}

export interface ComplianceCertification {
  id: string;
  schoolId: string;
  framework: ComplianceFramework;
  certifier: string;
  validFrom: string;
  validUntil: string;
  documentUrl: string;
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AccessReview {
  id: string;
  schoolId: string;
  resource: string;
  userId: string;
  currentAccess: string;
  recommendedAccess: string;
  reviewedBy: string;
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface PenetrationTest {
  id: string;
  schoolId: string;
  scope: string;
  status: string;
  findings: SecurityFinding[];
  startedAt: string;
  completedAt: string;
  metadata: Record<string, unknown>;
  reportUrl: string;
}
