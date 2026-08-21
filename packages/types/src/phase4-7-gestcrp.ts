import { z } from 'zod';

// ─── Zero Trust Architecture ────────────────────────────────────────────────
export enum ZeroTrustZone {
  IDENTIFY = 'IDENTIFY',
  VERIFY = 'VERIFY',
  ENFORCE = 'ENFORCE',
  ADAPT = 'ADAPT',
  SUSTAIN = 'SUSTAIN',
  RECOVER = 'RECOVER',
}

export enum ZeroTrustDecision {
  ALLOW = 'ALLOW',
  DENY = 'DENY',
  CHALLENGE = 'CHALLENGE',
  RESTRICT = 'RESTRICT',
  QUARANTINE = 'QUARANTINE',
  AUDIT = 'AUDIT',
}

export enum IdentityVerificationLevel {
  NONE = 'NONE',
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  ELEVATED = 'ELEVATED',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum DeviceTrustLevel {
  UNTRUSTED = 'UNTRUSTED',
  REGISTERED = 'REGISTERED',
  MANAGED = 'MANAGED',
  COMPLIANT = 'COMPLIANT',
  TRUSTED = 'TRUSTED',
}

export enum NetworkSegment {
  PUBLIC = 'PUBLIC',
  PARTIAL = 'PARTIAL',
  INTERNAL = 'INTERNAL',
  RESTRICTED = 'RESTRICTED',
  ISOLATED = 'ISOLATED',
}

export interface ZeroTrustPolicy {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  enabled: boolean;
  priority: number;
  zones: ZeroTrustZone[];
  conditions: ZeroTrustCondition[];
  actions: ZeroTrustAction[];
  enforcementMode: 'STRICT' | 'MODERATE' | 'ADVISORY';
  createdAt: Date;
  updatedAt: Date;
}

export interface ZeroTrustCondition {
  field: string;
  operator: 'EQUALS' | 'NOT_EQUALS' | 'CONTAINS' | 'STARTS_WITH' | 'IN_RANGE' | 'GREATER_THAN' | 'LESS_THAN';
  value: string | number | string[];
  negate: boolean;
}

export interface ZeroTrustAction {
  type: ZeroTrustDecision;
  parameters: Record<string, unknown>;
  timeout: number;
  fallback: ZeroTrustDecision;
}

export interface IdentityContext {
  userId: string;
  schoolId: string;
  email: string;
  roles: string[];
  permissions: string[];
  verificationLevel: IdentityVerificationLevel;
  deviceTrust: DeviceTrustLevel;
  networkSegment: NetworkSegment;
  lastVerifiedAt: Date;
  mfaEnabled: boolean;
  riskScore: number;
  riskFactors: string[];
  sessionId: string;
  ip: string;
  userAgent: string;
  geolocation: Geolocation;
}

export interface Geolocation {
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  accuracy: number;
}

export interface DeviceContext {
  deviceId: string;
  schoolId: string;
  userId: string;
  type: 'MOBILE' | 'TABLET' | 'LAPTOP' | 'DESKTOP' | 'SERVER' | 'IOT';
  os: string;
  osVersion: string;
  browser?: string;
  browserVersion?: string;
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  trustLevel: DeviceTrustLevel;
  managed: boolean;
  compliant: boolean;
  lastSeenAt: Date;
  registeredAt: Date;
  riskScore: number;
  riskFactors: string[];
}

export interface ZeroTrustAssessment {
  id: string;
  schoolId: string;
  subjectType: 'USER' | 'DEVICE' | 'SERVICE' | 'DATA';
  subjectId: string;
  decision: ZeroTrustDecision;
  confidence: number;
  riskScore: number;
  riskFactors: string[];
  policiesEvaluated: string[];
  enforcementActions: string[];
  timestamp: Date;
  expiresAt: Date;
}

export const zeroTrustPolicySchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  enabled: z.boolean().default(true),
  priority: z.number().int().min(0).max(1000).default(500),
  zones: z.array(z.nativeEnum(ZeroTrustZone)).min(1),
  conditions: z.array(z.object({
    field: z.string(),
    operator: z.enum(['EQUALS', 'NOT_EQUALS', 'CONTAINS', 'STARTS_WITH', 'IN_RANGE', 'GREATER_THAN', 'LESS_THAN']),
    value: z.union([z.string(), z.number(), z.array(z.string())]),
    negate: z.boolean().default(false),
  })).min(1),
  actions: z.array(z.object({
    type: z.nativeEnum(ZeroTrustDecision),
    parameters: z.record(z.unknown()).default({}),
    timeout: z.number().int().min(0).default(300),
    fallback: z.nativeEnum(ZeroTrustDecision).default(ZeroTrustDecision.DENY),
  })).min(1),
  enforcementMode: z.enum(['STRICT', 'MODERATE', 'ADVISORY']).default('STRICT'),
});

// ─── Identity & Access Management (IAM) ────────────────────────────────────
export enum IAMEventType {
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  LOGOUT = 'LOGOUT',
  PASSWORD_CHANGE = 'PASSWORD_CHANGE',
  PASSWORD_RESET = 'PASSWORD_RESET',
  MFA_ENABLE = 'MFA_ENABLE',
  MFA_DISABLE = 'MFA_DISABLE',
  MFA_VERIFY = 'MFA_VERIFY',
  TOKEN_REFRESH = 'TOKEN_REFRESH',
  SESSION_CREATE = 'SESSION_CREATE',
  SESSION_REVOKE = 'SESSION_REVOKE',
  ROLE_ASSIGN = 'ROLE_ASSIGN',
  ROLE_REVOKE = 'ROLE_REVOKE',
  PERMISSION_GRANT = 'PERMISSION_GRANT',
  PERMISSION_REVOKE = 'PERMISSION_REVOKE',
  ACCOUNT_LOCK = 'ACCOUNT_LOCK',
  ACCOUNT_UNLOCK = 'ACCOUNT_UNLOCK',
  CREDENTIAL_ROTATE = 'CREDENTIAL_ROTATE',
  BIOMETRIC_REGISTER = 'BIOMETRIC_REGISTER',
  BIOMETRIC_VERIFY = 'BIOMETRIC_VERIFY',
}

export enum AuthMethod {
  PASSWORD = 'PASSWORD',
  SSO = 'SSO',
  OAUTH = 'OAUTH',
  OIDC = 'OIDC',
  SAML = 'SAML',
  LDAP = 'LDAP',
  CERTIFICATE = 'CERTIFICATE',
  BIOMETRIC = 'BIOMETRIC',
  MAGIC_LINK = 'MAGIC_LINK',
  API_KEY = 'API_KEY',
}

export enum IdentityProvider {
  INTERNAL = 'INTERNAL',
  GOOGLE = 'GOOGLE',
  MICROSOFT = 'MICROSOFT',
  OKTA = 'OKTA',
  AZURE_AD = 'AZURE_AD',
  CUSTOM_SAML = 'CUSTOM_SAML',
}

export interface IAMPolicy {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  enabled: boolean;
  effect: 'ALLOW' | 'DENY';
  subjects: string[];
  resources: string[];
  actions: string[];
  conditions: IAMCondition[];
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAMCondition {
  type: 'DATE_TIME' | 'IP_RANGE' | 'DEVICE' | 'LOCATION' | 'RISK_SCORE' | 'ROLE' | 'ATTRIBUTE';
  operator: 'EQUALS' | 'NOT_EQUALS' | 'IN' | 'NOT_IN' | 'GREATER_THAN' | 'LESS_THAN' | 'BETWEEN';
  values: string[];
}

export interface IAMEvent {
  id: string;
  schoolId: string;
  userId: string;
  eventType: IAMEventType;
  authMethod: AuthMethod;
  identityProvider: IdentityProvider;
  ip: string;
  userAgent: string;
  geolocation?: Geolocation;
  success: boolean;
  riskScore: number;
  riskFactors: string[];
  metadata: Record<string, unknown>;
  timestamp: Date;
}

export interface IAMSession {
  id: string;
  schoolId: string;
  userId: string;
  token: string;
  refreshToken: string;
  authMethod: AuthMethod;
  identityProvider: IdentityProvider;
  deviceContext: DeviceContext;
  ip: string;
  userAgent: string;
  geolocation?: Geolocation;
  riskScore: number;
  active: boolean;
  createdAt: Date;
  expiresAt: Date;
  lastActivityAt: Date;
}

export interface CredentialRotationPolicy {
  id: string;
  schoolId: string;
  credentialType: 'PASSWORD' | 'API_KEY' | 'CERTIFICATE' | 'TOKEN' | 'ENCRYPTION_KEY';
  rotationIntervalDays: number;
  maxAge: number;
  alertBeforeExpirationDays: number;
  enforceRotation: boolean;
  notificationChannels: string[];
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BiometricCredential {
  id: string;
  schoolId: string;
  userId: string;
  type: 'FINGERPRINT' | 'FACE' | 'IRIS' | 'VOICE' | 'PALM';
  templateHash: string;
  salt: string;
  algorithm: string;
  enrolledAt: Date;
  lastUsedAt?: Date;
  enabled: boolean;
}

export const iamPolicySchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  enabled: z.boolean().default(true),
  effect: z.enum(['ALLOW', 'DENY']),
  subjects: z.array(z.string()).min(1),
  resources: z.array(z.string()).min(1),
  actions: z.array(z.string()).min(1),
  conditions: z.array(z.object({
    type: z.enum(['DATE_TIME', 'IP_RANGE', 'DEVICE', 'LOCATION', 'RISK_SCORE', 'ROLE', 'ATTRIBUTE']),
    operator: z.enum(['EQUALS', 'NOT_EQUALS', 'IN', 'NOT_IN', 'GREATER_THAN', 'LESS_THAN', 'BETWEEN']),
    values: z.array(z.string()),
  })).default([]),
  priority: z.number().int().min(0).max(1000).default(500),
});

// ─── Security Operations Center (SOC) ──────────────────────────────────────
export enum SOCIncidentSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
  EMERGENCY = 'EMERGENCY',
}

export enum SOCIncidentStatus {
  NEW = 'NEW',
  TRIAGED = 'TRIAGED',
  INVESTIGATING = 'INVESTIGATING',
  CONTAINED = 'CONTAINED',
  ERADICATED = 'ERADICATED',
  RECOVERED = 'RECOVERED',
  CLOSED = 'CLOSED',
  FALSE_POSITIVE = 'FALSE_POSITIVE',
}

export enum SOCIncidentCategory {
  MALWARE = 'MALWARE',
  PHISHING = 'PHISHING',
  DATA_BREACH = 'DATA_BREACH',
  UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS',
  DDoS = 'DDoS',
  INSIDER_THREAT = 'INSIDER_THREAT',
  RANSOMWARE = 'RANSOMWARE',
  ACCOUNT_COMPROMISE = 'ACCOUNT_COMPROMISE',
  DATA_EXFILTRATION = 'DATA_EXFILTRATION',
  PRIVILEGE_ESCALATION = 'PRIVILEGE_ESCALATION',
  SOCIAL_ENGINEERING = 'SOCIAL_ENGINEERING',
  PHYSICAL_SECURITY = 'PHYSICAL_SECURITY',
  COMPLIANCE_VIOLATION = 'COMPLIANCE_VIOLATION',
  SERVICE_DISRUPTION = 'SERVICE_DISRUPTION',
}

export enum SOCAPTAction {
  BLOCK_IP = 'BLOCK_IP',
  QUARANTINE_DEVICE = 'QUARANTINE_DEVICE',
  DISABLE_ACCOUNT = 'DISABLE_ACCOUNT',
  REVOKE_SESSION = 'REVOKE_SESSION',
  UPDATE_FIREWALL = 'UPDATE_FIREWALL',
  ISOLATE_NETWORK = 'ISOLATE_NETWORK',
  FORCE_PASSWORD_RESET = 'FORCE_PASSWORD_RESET',
  ENABLE_MFA = 'ENABLE_MFA',
  COLLECT_EVIDENCE = 'COLLECT_EVIDENCE',
  NOTIFY_ADMIN = 'NOTIFY_ADMIN',
  ESCALATE = 'ESCALATE',
  CREATE_TICKET = 'CREATE_TICKET',
}

export interface SOCIncident {
  id: string;
  schoolId: string;
  title: string;
  description: string;
  severity: SOCIncidentSeverity;
  status: SOCIncidentStatus;
  category: SOCIncidentCategory;
  source: string;
  affectedSystems: string[];
  affectedUsers: string[];
  indicators: SOCIndicator[];
  timeline: SOCEvent[];
  aptActions: APTAction[];
  assignedTo?: string;
  resolvedAt?: Date;
  rootCause?: string;
  remediation?: string;
  lessonsLearned?: string;
  riskScore: number;
  estimatedImpact: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SOCIndicator {
  id: string;
  type: 'IP' | 'DOMAIN' | 'HASH' | 'URL' | 'EMAIL' | 'FILE' | 'BEHAVIOR';
  value: string;
  confidence: number;
  severity: SOCIncidentSeverity;
  source: string;
  tags: string[];
  firstSeen: Date;
  lastSeen: Date;
  expiry?: Date;
}

export interface SOCEvent {
  id: string;
  incidentId: string;
  type: string;
  description: string;
  actor?: string;
  target?: string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}

export interface APTAction {
  id: string;
  incidentId: string;
  action: SOCAPTAction;
  parameters: Record<string, unknown>;
  executedBy: string;
  executedAt: Date;
  result: 'SUCCESS' | 'FAILURE' | 'PARTIAL' | 'PENDING';
  rollbackAvailable: boolean;
  rollbackAt?: Date;
}

export interface SOCDashboard {
  schoolId: string;
  totalIncidents: number;
  openIncidents: number;
  criticalIncidents: number;
  meanTimeToDetect: number;
  meanTimeToRespond: number;
  meanTimeToResolve: number;
  incidentsBySeverity: Record<SOCIncidentSeverity, number>;
  incidentsByCategory: Record<SOCIncidentCategory, number>;
  incidentsByStatus: Record<SOCIncidentStatus, number>;
  topThreats: Array<{ category: SOCIncidentCategory; count: number; trend: number }>;
  recentIncidents: SOCIncident[];
  lastUpdated: Date;
}

export const socIncidentSchema = z.object({
  title: z.string().min(1).max(500),
  description: z.string().min(1).max(5000),
  severity: z.nativeEnum(SOCIncidentSeverity),
  category: z.nativeEnum(SOCIncidentCategory),
  source: z.string().min(1).max(200),
  affectedSystems: z.array(z.string()).default([]),
  affectedUsers: z.array(z.string()).default([]),
  indicators: z.array(z.object({
    type: z.enum(['IP', 'DOMAIN', 'HASH', 'URL', 'EMAIL', 'FILE', 'BEHAVIOR']),
    value: z.string(),
    confidence: z.number().min(0).max(100).default(50),
    severity: z.nativeEnum(SOCIncidentSeverity),
    source: z.string(),
    tags: z.array(z.string()).default([]),
  })).default([]),
  assignedTo: z.string().uuid().optional(),
});

// ─── SIEM (Security Information & Event Management) ────────────────────────
export enum SIEMSeverity {
  INFO = 'INFO',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum SIEMEventType {
  AUTH = 'AUTH',
  NETWORK = 'NETWORK',
  APPLICATION = 'APPLICATION',
  SYSTEM = 'SYSTEM',
  DATA = 'DATA',
  COMPLIANCE = 'COMPLIANCE',
  THREAT = 'THREAT',
  VULNERABILITY = 'VULNERABILITY',
  IDENTITY = 'IDENTITY',
  ENDPOINT = 'ENDPOINT',
}

export interface SIEMEvent {
  id: string;
  schoolId: string;
  source: string;
  eventType: SIEMEventType;
  severity: SIEMSeverity;
  message: string;
  rawLog: string;
  parsedFields: Record<string, unknown>;
  user?: string;
  ip?: string;
  device?: string;
  application?: string;
  tags: string[];
  iocMatches: string[];
  correlatedEvents: string[];
  normalized: boolean;
  timestamp: Date;
  ingestedAt: Date;
}

export interface SIEMRule {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  enabled: boolean;
  severity: SIEMSeverity;
  eventType: SIEMEventType;
  conditions: SIEMRuleCondition[];
  actions: SIEMRuleAction[];
  suppressionWindow: number;
  matchCount: number;
  lastMatchedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SIEMRuleCondition {
  field: string;
  operator: 'EQUALS' | 'NOT_EQUALS' | 'CONTAINS' | 'REGEX' | 'GREATER_THAN' | 'LESS_THAN' | 'IN' | 'NOT_IN' | 'EXISTS' | 'NOT_EXISTS';
  value: string | number | string[];
  timeframe: number;
  count?: number;
}

export interface SIEMRuleAction {
  type: 'ALERT' | 'TICKET' | 'BLOCK' | 'QUARANTINE' | 'NOTIFY' | 'ESCALATE' | 'LOG' | 'ENRICH';
  parameters: Record<string, unknown>;
  channels?: string[];
}

export interface SIEMCorrelationRule {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  enabled: boolean;
  events: Array<{ eventType: SIEMEventType; conditions: SIEMRuleCondition[] }>;
  timeWindow: number;
  threshold: number;
  severity: SIEMSeverity;
  actions: SIEMRuleAction[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SIEMDashboard {
  schoolId: string;
  totalEvents: number;
  eventsLast24h: number;
  alertsActive: number;
  rulesTriggered: number;
  topEventTypes: Array<{ type: SIEMEventType; count: number }>;
  topSources: Array<{ source: string; count: number }>;
  severityDistribution: Record<SIEMSeverity, number>;
  recentAlerts: SIEMEvent[];
  lastUpdated: Date;
}

export const siemRuleSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  enabled: z.boolean().default(true),
  severity: z.nativeEnum(SIEMSeverity),
  eventType: z.nativeEnum(SIEMEventType),
  conditions: z.array(z.object({
    field: z.string(),
    operator: z.enum(['EQUALS', 'NOT_EQUALS', 'CONTAINS', 'REGEX', 'GREATER_THAN', 'LESS_THAN', 'IN', 'NOT_IN', 'EXISTS', 'NOT_EXISTS']),
    value: z.union([z.string(), z.number(), z.array(z.string())]),
    timeframe: z.number().int().min(0).default(0),
    count: z.number().int().min(1).optional(),
  })).min(1),
  actions: z.array(z.object({
    type: z.enum(['ALERT', 'TICKET', 'BLOCK', 'QUARANTINE', 'NOTIFY', 'ESCALATE', 'LOG', 'ENRICH']),
    parameters: z.record(z.unknown()).default({}),
    channels: z.array(z.string()).optional(),
  })).default([]),
  suppressionWindow: z.number().int().min(0).default(300),
});

// ─── Threat Detection & Intelligence ───────────────────────────────────────
export enum ThreatCategory {
  MALWARE = 'MALWARE',
  RANSOMWARE = 'RANSOMWARE',
  PHISHING = 'PHISHING',
  DDOS = 'DDOS',
  SQL_INJECTION = 'SQL_INJECTION',
  XSS = 'XSS',
  CSRF = 'CSRF',
  INSIDER_THREAT = 'INSIDER_THREAT',
  PRIVILEGE_ESCALATION = 'PRIVILEGE_ESCALATION',
  DATA_EXFILTRATION = 'DATA_EXFILTRATION',
 供应链攻击 = 'SUPPLY_CHAIN',
  ZERO_DAY = 'ZERO_DAY',
  CRYPTOJACKING = 'CRYPTOJACKING',
  APT = 'APT',
}

export enum ThreatSeverity {
  INFO = 'INFO',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum ThreatStatus {
  NEW = 'NEW',
  CONFIRMED = 'CONFIRMED',
  INVESTIGATING = 'INVESTIGATING',
  MITIGATED = 'MITIGATED',
  RESOLVED = 'RESOLVED',
  FALSE_POSITIVE = 'FALSE_POSITIVE',
}

export enum IndicatorType {
  IP = 'IP',
  DOMAIN = 'DOMAIN',
  URL = 'URL',
  FILE_HASH = 'FILE_HASH',
  EMAIL = 'EMAIL',
  CVE = 'CVE',
  YARA = 'YARA',
  Sigma = 'Sigma',
  BEHAVIOR = 'BEHAVIOR',
  TTP = 'TTP',
}

export interface ThreatIndicator {
  id: string;
  schoolId: string;
  type: IndicatorType;
  value: string;
  confidence: number;
  severity: ThreatSeverity;
  category: ThreatCategory;
  source: string;
  tags: string[];
  description: string;
  firstSeen: Date;
  lastSeen: Date;
  expiry?: Date;
  mitreAttackIds: string[];
  associatedThreats: string[];
}

export interface ThreatFeed {
  id: string;
  schoolId: string;
  name: string;
  url: string;
  type: 'STIX' | 'TAXII' | 'CSV' | 'JSON' | 'MISP' | 'CUSTOM';
  format: string;
  refreshIntervalMinutes: number;
  enabled: boolean;
  lastSyncedAt?: Date;
  indicatorsCount: number;
  reliability: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ThreatAnalysis {
  id: string;
  schoolId: string;
  threatId: string;
  analyst: string;
  methodology: string;
  findings: ThreatFinding[];
  riskAssessment: ThreatRiskAssessment;
  recommendations: string[];
  evidence: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ThreatFinding {
  id: string;
  type: string;
  description: string;
  severity: ThreatSeverity;
  indicators: string[];
  mitreAttackIds: string[];
  recommendations: string[];
}

export interface ThreatRiskAssessment {
  likelihood: number;
  impact: number;
  overallRisk: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  factors: string[];
}

export interface ThreatFeedMatch {
  id: string;
  schoolId: string;
  feedId: string;
  indicator: ThreatIndicator;
  matchedEvent: string;
  confidence: number;
  timestamp: Date;
  acknowledged: boolean;
  acknowledgedBy?: string;
}

export const threatIndicatorSchema = z.object({
  type: z.nativeEnum(IndicatorType),
  value: z.string().min(1),
  confidence: z.number().min(0).max(100).default(50),
  severity: z.nativeEnum(ThreatSeverity),
  category: z.nativeEnum(ThreatCategory),
  source: z.string().min(1).max(200),
  tags: z.array(z.string()).default([]),
  description: z.string().max(2000).optional(),
  expiry: z.string().datetime().optional(),
  mitreAttackIds: z.array(z.string()).default([]),
});

// ─── Application Security ─────────────────────────────────────────────────
export enum AppScanType {
  SAST = 'SAST',
  DAST = 'DAST',
  SCA = 'SCA',
  IAST = 'IAST',
  RASP = 'RASP',
  CONTAINER = 'CONTAINER',
  IAC = 'IAC',
  API = 'API',
  MOBILE = 'MOBILE',
  SECRETS = 'SECRETS',
}

export enum AppScanStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export enum VulnerabilitySeverity {
  INFO = 'INFO',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum VulnerabilityStatus {
  NEW = 'NEW',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  MITIGATED = 'MITIGATED',
  RESOLVED = 'RESOLVED',
  ACCEPTED = 'ACCEPTED',
  FALSE_POSITIVE = 'FALSE_POSITIVE',
}

export interface AppScan {
  id: string;
  schoolId: string;
  scanType: AppScanType;
  target: string;
  status: AppScanStatus;
  findings: AppVulnerability[];
  startedAt?: Date;
  completedAt?: Date;
  duration?: number;
  scanner: string;
  version: string;
  triggeredBy: string;
  createdAt: Date;
}

export interface AppVulnerability {
  id: string;
  schoolId: string;
  scanId: string;
  title: string;
  description: string;
  severity: VulnerabilitySeverity;
  status: VulnerabilityStatus;
  category: string;
  cweId?: string;
  cveId?: string;
  cvssScore?: number;
  affectedComponent: string;
  affectedFile?: string;
  affectedLine?: number;
  evidence: string;
  recommendation: string;
  references: string[];
  exploitAvailable: boolean;
  patchAvailable: boolean;
  riskScore: number;
  discoveredAt: Date;
  resolvedAt?: Date;
}

export interface APISecurityPolicy {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  enabled: boolean;
  apiPath: string;
  methods: string[];
  rateLimit: number;
  rateLimitWindow: number;
  authentication: 'NONE' | 'API_KEY' | 'BEARER' | 'BASIC' | 'MUTUAL_TLS';
  authorization: string[];
  inputValidation: InputValidationRule[];
  outputEncoding: 'HTML' | 'JSON' | 'XML' | 'PLAIN';
  corsPolicy?: CORSPolicy;
  wafRules: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface InputValidationRule {
  field: string;
  type: 'STRING' | 'NUMBER' | 'EMAIL' | 'URL' | 'UUID' | 'DATE' | 'REGEX' | 'JSON';
  required: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  customValidator?: string;
}

export interface CORSPolicy {
  allowedOrigins: string[];
  allowedMethods: string[];
  allowedHeaders: string[];
  exposedHeaders: string[];
  allowCredentials: boolean;
  maxAge: number;
}

export interface DependencyScan {
  id: string;
  schoolId: string;
  target: string;
  dependencies: Dependency[];
  vulnerabilities: AppVulnerability[];
  completedAt: Date;
}

export interface Dependency {
  name: string;
  version: string;
  latestVersion: string;
  license: string;
  vulnerabilities: number;
  outdated: boolean;
  direct: boolean;
}

export const appScanSchema = z.object({
  scanType: z.nativeEnum(AppScanType),
  target: z.string().min(1),
  triggeredBy: z.string().uuid(),
});

export const apiSecurityPolicySchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  enabled: z.boolean().default(true),
  apiPath: z.string().startsWith('/'),
  methods: z.array(z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])).min(1),
  rateLimit: z.number().int().min(1).default(100),
  rateLimitWindow: z.number().int().min(1).default(60),
  authentication: z.enum(['NONE', 'API_KEY', 'BEARER', 'BASIC', 'MUTUAL_TLS']).default('BEARER'),
  authorization: z.array(z.string()).default([]),
  inputValidation: z.array(z.object({
    field: z.string(),
    type: z.enum(['STRING', 'NUMBER', 'EMAIL', 'URL', 'UUID', 'DATE', 'REGEX', 'JSON']),
    required: z.boolean().default(true),
    minLength: z.number().int().min(0).optional(),
    maxLength: z.number().int().min(0).optional(),
    min: z.number().optional(),
    max: z.number().optional(),
    pattern: z.string().optional(),
    customValidator: z.string().optional(),
  })).default([]),
  outputEncoding: z.enum(['HTML', 'JSON', 'XML', 'PLAIN']).default('JSON'),
  corsPolicy: z.object({
    allowedOrigins: z.array(z.string().url()),
    allowedMethods: z.array(z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])),
    allowedHeaders: z.array(z.string()),
    exposedHeaders: z.array(z.string()),
    allowCredentials: z.boolean(),
    maxAge: z.number().int().min(0),
  }).optional(),
  wafRules: z.array(z.string()).default([]),
});

// ─── Data Security & DLP ──────────────────────────────────────────────────
export enum DLPPolicyType {
  CONTENT_INSPECTION = 'CONTENT_INSPECTION',
  CONTEXTUAL = 'CONTEXTUAL',
  PATTERN_MATCHING = 'PATTERN_MATCHING',
  ANOMALY_DETECTION = 'ANOMALY_DETECTION',
  USER_ACTIVITY = 'USER_ACTIVITY',
  FILE_FINGERPRINTING = 'FILE_FINGERPRINTING',
}

export enum DLPAction {
  BLOCK = 'BLOCK',
  ENCRYPT = 'ENCRYPT',
  REDACT = 'REDACT',
  QUARANTINE = 'QUARANTINE',
  NOTIFY = 'NOTIFY',
  LOG = 'LOG',
  WATERMARK = 'WATERMARK',
  RESTRICT = 'RESTRICT',
  THROTTLE = 'THROTTLE',
}

export enum DataClassification {
  PUBLIC = 'PUBLIC',
  INTERNAL = 'INTERNAL',
  CONFIDENTIAL = 'CONFIDENTIAL',
  RESTRICTED = 'RESTRICTED',
  TOP_SECRET = 'TOP_SECRET',
}

export interface DLPPolicy {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  enabled: boolean;
  policyType: DLPPolicyType;
  dataClassification: DataClassification[];
  patterns: DLPPattern[];
  actions: DLPAction[];
  exclusions: string[];
  severity: ThreatSeverity;
  notificationChannels: string[];
  appliesTo: 'UPLOAD' | 'DOWNLOAD' | 'EMAIL' | 'PRINT' | 'COPY' | 'TRANSFER' | 'ALL';
  createdAt: Date;
  updatedAt: Date;
}

export interface DLPPattern {
  id: string;
  name: string;
  type: 'REGEX' | 'KEYWORD' | 'CREDIT_CARD' | 'SSN' | 'PHONE' | 'EMAIL' | 'CUSTOM';
  pattern: string;
  confidence: number;
  description: string;
}

export interface DLPIncident {
  id: string;
  schoolId: string;
  policyId: string;
  userId: string;
  action: DLPAction;
  dataClassification: DataClassification;
  matchedPatterns: DLPPattern[];
  source: string;
  destination: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  contentPreview: string;
  blocked: boolean;
  encrypted: boolean;
  watermarked: boolean;
  notified: boolean;
  timestamp: Date;
  reviewedBy?: string;
  reviewedAt?: Date;
  disposition?: 'TRUE_POSITIVE' | 'FALSE_POSITIVE' | 'ACCEPTED_RISK';
}

export interface EncryptionKey {
  id: string;
  schoolId: string;
  name: string;
  algorithm: string;
  size: number;
  purpose: 'ENCRYPTION' | 'SIGNING' | 'HMAC' | 'KEY_EXCHANGE' | 'BACKUP';
  status: 'ACTIVE' | 'ROTATING' | 'DEPRECATED' | 'REVOKED' | 'EXPIRED';
  fingerprint: string;
  publicKey?: string;
  encryptedPrivateKey: string;
  keyVersion: number;
  createdAt: Date;
  expiresAt: Date;
  rotatedAt?: Date;
  lastUsedAt?: Date;
}

export interface DataRetentionPolicy {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  enabled: boolean;
  dataClassification: DataClassification[];
  retentionDays: number;
  archiveBeforeDeletion: boolean;
  archiveDurationDays?: number;
  deletionMethod: 'SECURE_DELETE' | 'CRYPTO_SHREDDING' | 'PHYSICAL_DESTRUCTION';
  exceptions: string[];
  complianceFrameworks: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DataMaskingRule {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  enabled: boolean;
  fieldPatterns: string[];
  maskingType: 'FULL' | 'PARTIAL' | 'TOKEN' | 'HASH' | 'FORMAT_PRESERVING' | 'REDACTION';
  maskChar: string;
  preserveLength: boolean;
  tokenizationKey?: string;
  appliesTo: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const dlpPolicySchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  enabled: z.boolean().default(true),
  policyType: z.nativeEnum(DLPPolicyType),
  dataClassification: z.array(z.nativeEnum(DataClassification)).min(1),
  patterns: z.array(z.object({
    name: z.string().min(1),
    type: z.enum(['REGEX', 'KEYWORD', 'CREDIT_CARD', 'SSN', 'PHONE', 'EMAIL', 'CUSTOM']),
    pattern: z.string(),
    confidence: z.number().min(0).max(100).default(50),
    description: z.string().default(''),
  })).min(1),
  actions: z.array(z.nativeEnum(DLPAction)).min(1),
  exclusions: z.array(z.string()).default([]),
  severity: z.nativeEnum(ThreatSeverity),
  notificationChannels: z.array(z.string()).default([]),
  appliesTo: z.enum(['UPLOAD', 'DOWNLOAD', 'EMAIL', 'PRINT', 'COPY', 'TRANSFER', 'ALL']).default('ALL'),
});

export const encryptionKeySchema = z.object({
  name: z.string().min(1).max(200),
  algorithm: z.string().min(1),
  size: z.number().int().min(256).max(4096),
  purpose: z.enum(['ENCRYPTION', 'SIGNING', 'HMAC', 'KEY_EXCHANGE', 'BACKUP']),
});

// ─── Device & Endpoint Security ───────────────────────────────────────────
export enum DevicePlatform {
  WINDOWS = 'WINDOWS',
  MACOS = 'MACOS',
  LINUX = 'LINUX',
  IOS = 'IOS',
  ANDROID = 'ANDROID',
  CHROME_OS = 'CHROME_OS',
  IOT = 'IOT',
}

export enum DeviceStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  SUSPENDED = 'SUSPENDED',
  COMPROMISED = 'COMPROMISED',
  QUARANTINED = 'QUARANTINED',
  RETIRED = 'RETIRED',
}

export enum EndpointProtection {
  ANTIVIRUS = 'ANTIVIRUS',
  EDR = 'EDR',
  XDR = 'XDR',
  FIREWALL = 'FIREWALL',
  DLP = 'DLP',
  APP_CONTROL = 'APP_CONTROL',
  ENCRYPTION = 'ENCRYPTION',
  PATCH_MANAGEMENT = 'PATCH_MANAGEMENT',
  DEVICE_CONTROL = 'DEVICE_CONTROL',
  WEB_FILTERING = 'WEB_FILTERING',
}

export interface DeviceInventory {
  id: string;
  schoolId: string;
  name: string;
  hostname: string;
  platform: DevicePlatform;
  osVersion: string;
  architecture: string;
  serialNumber: string;
  macAddress: string;
  ipAddress: string;
  lastSeenAt: Date;
  status: DeviceStatus;
  owner: string;
  department: string;
  location: string;
  tags: string[];
  managedBy: 'MDM' | 'MANUAL' | 'AUTO_DISCOVER';
  protectionStatus: DeviceProtectionStatus;
  complianceStatus: DeviceComplianceStatus;
  installedSoftware: InstalledSoftware[];
  openPorts: number[];
  networkInterfaces: NetworkInterface[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DeviceProtectionStatus {
  antivirusEnabled: boolean;
  antivirusVersion: string;
  lastScanAt?: Date;
  firewallEnabled: boolean;
  encryptionEnabled: boolean;
  edrEnabled: boolean;
  dlpEnabled: boolean;
  lastDefinitionUpdate?: Date;
  threatDetections: number;
}

export interface DeviceComplianceStatus {
  compliant: boolean;
  lastCheckedAt: Date;
  issues: DeviceComplianceIssue[];
  patchLevel: string;
  osUpToDate: boolean;
  encryptionCompliant: boolean;
  passwordCompliant: boolean;
}

export interface DeviceComplianceIssue {
  id: string;
  severity: ThreatSeverity;
  category: string;
  description: string;
  remediation: string;
  detectedAt: Date;
}

export interface InstalledSoftware {
  name: string;
  version: string;
  vendor: string;
  installDate: Date;
  size: number;
  trusted: boolean;
}

export interface NetworkInterface {
  name: string;
  macAddress: string;
  ipv4Address?: string;
  ipv6Address?: string;
  gateway?: string;
  dns: string[];
  dhcpEnabled: boolean;
  connected: boolean;
}

export interface MDMCommand {
  id: string;
  schoolId: string;
  deviceId: string;
  command: 'LOCK' | 'WIPE' | 'REBOOT' | 'INSTALL_APP' | 'REMOVE_APP' | 'UPDATE_POLICY' | 'ENCRYPT' | 'DECRYPT' | 'SCAN' | 'ENROLL' | 'LOCATION' | 'SCREENSHOT';
  parameters: Record<string, unknown>;
  status: 'PENDING' | 'SENT' | 'ACKNOWLEDGED' | 'COMPLETED' | 'FAILED' | 'TIMEOUT';
  sentAt?: Date;
  completedAt?: Date;
  result?: Record<string, unknown>;
  errorMessage?: string;
  createdAt: Date;
}

export const deviceInventorySchema = z.object({
  name: z.string().min(1).max(200),
  hostname: z.string().min(1).max(200),
  platform: z.nativeEnum(DevicePlatform),
  osVersion: z.string().min(1),
  serialNumber: z.string().min(1),
  macAddress: z.string().regex(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/),
  owner: z.string().uuid(),
  department: z.string().max(200).optional(),
  location: z.string().max(200).optional(),
  tags: z.array(z.string()).default([]),
});

export const mdmCommandSchema = z.object({
  deviceId: z.string().uuid(),
  command: z.enum(['LOCK', 'WIPE', 'REBOOT', 'INSTALL_APP', 'REMOVE_APP', 'UPDATE_POLICY', 'ENCRYPT', 'DECRYPT', 'SCAN', 'ENROLL', 'LOCATION', 'SCREENSHOT']),
  parameters: z.record(z.unknown()).default({}),
});

// ─── Security Automation & SOAR ───────────────────────────────────────────
export enum SOARActionType {
  BLOCK_IP = 'BLOCK_IP',
  QUARANTINE_DEVICE = 'QUARANTINE_DEVICE',
  DISABLE_ACCOUNT = 'DISABLE_ACCOUNT',
  REVOKE_SESSION = 'REVOKE_SESSION',
  UPDATE_FIREWALL = 'UPDATE_FIREWALL',
  ISOLATE_NETWORK = 'ISOLATE_NETWORK',
  FORCE_PASSWORD_RESET = 'FORCE_PASSWORD_RESET',
  ENABLE_MFA = 'ENABLE_MFA',
  COLLECT_EVIDENCE = 'COLLECT_EVIDENCE',
  NOTIFY_ADMIN = 'NOTIFY_ADMIN',
  ESCALATE = 'ESCALATE',
  CREATE_TICKET = 'CREATE_TICKET',
  ENRICH_DATA = 'ENRICH_DATA',
  CORRELATE = 'CORRELATE',
  AUTO_REMEDIATE = 'AUTO_REMEDIATE',
}

export enum SOARTrigger {
  INCIDENT_CREATED = 'INCIDENT_CREATED',
  INCIDENT_SEVERITY_CHANGE = 'INCIDENT_SEVERITY_CHANGE',
  THREAT_DETECTED = 'THREAT_DETECTED',
  VULNERABILITY_FOUND = 'VULNERABILITY_FOUND',
  COMPLIANCE_VIOLATION = 'COMPLIANCE_VIOLATION',
  DATA_BREACH = 'DATA_BREACH',
  INSIDER_THREAT = 'INSIDER_THREAT',
  ACCOUNT_COMPROMISE = 'ACCOUNT_COMPROMISE',
  MALWARE_DETECTED = 'MALWARE_DETECTED',
  UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS',
  SCHEDULE = 'SCHEDULE',
  MANUAL = 'MANUAL',
}

export interface SOARPlaybook {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  enabled: boolean;
  trigger: SOARTrigger;
  conditions: SOARCondition[];
  steps: SOARStep[];
  onsuccess: SOARStep[];
  onFailure: SOARStep[];
  executionCount: number;
  lastExecutedAt?: Date;
 平均ExecutionTime: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SOARCondition {
  field: string;
  operator: 'EQUALS' | 'NOT_EQUALS' | 'CONTAINS' | 'IN' | 'NOT_IN' | 'GREATER_THAN' | 'LESS_THAN';
  value: string | number | string[];
}

export interface SOARStep {
  id: string;
  name: string;
  type: 'ACTION' | 'DECISION' | 'DELAY' | 'LOOP' | 'PARALLEL' | 'CONDITIONAL' | 'TRANSFORM';
  action?: SOARActionType;
  parameters: Record<string, unknown>;
  timeout: number;
  retryCount: number;
  conditions?: SOARCondition[];
  nextStepId?: string;
  onTrue?: string;
  onFalse?: string;
  loopVariable?: string;
  loopBody?: SOARStep[];
}

export interface SOARExecution {
  id: string;
  schoolId: string;
  playbookId: string;
  trigger: SOARTrigger;
  triggeredBy: string;
  status: 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'PAUSED';
  steps: SOARExecutionStep[];
  startedAt: Date;
  completedAt?: Date;
  duration?: number;
  error?: string;
  result: Record<string, unknown>;
}

export interface SOARExecutionStep {
  stepId: string;
  name: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'SKIPPED' | 'TIMEOUT';
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  startedAt?: Date;
  completedAt?: Date;
  duration?: number;
  error?: string;
  retryCount: number;
}

export interface SecurityMetrics {
  schoolId: string;
  period: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY';
  startDate: Date;
  endDate: Date;
  meanTimeToDetect: number;
  meanTimeToRespond: number;
  meanTimeToResolve: number;
  incidentsTotal: number;
  incidentsBySeverity: Record<SOCIncidentSeverity, number>;
  incidentsByCategory: Record<SOCIncidentCategory, number>;
  meanTimeBetweenIncidents: number;
  scanFindingsTotal: number;
  scanFindingsBySeverity: Record<VulnerabilitySeverity, number>;
  scanFindingsResolved: number;
  meanTimeToRemediate: number;
  complianceScore: number;
  riskScore: number;
  threatIntelligenceScore: number;
  securityPostureScore: number;
  lastCalculatedAt: Date;
}

export const soarPlaybookSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  enabled: z.boolean().default(true),
  trigger: z.nativeEnum(SOARTrigger),
  conditions: z.array(z.object({
    field: z.string(),
    operator: z.enum(['EQUALS', 'NOT_EQUALS', 'CONTAINS', 'IN', 'NOT_IN', 'GREATER_THAN', 'LESS_THAN']),
    value: z.union([z.string(), z.number(), z.array(z.string())]),
  })).default([]),
  steps: z.array(z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(['ACTION', 'DECISION', 'DELAY', 'LOOP', 'PARALLEL', 'CONDITIONAL', 'TRANSFORM']),
    action: z.nativeEnum(SOARActionType).optional(),
    parameters: z.record(z.unknown()).default({}),
    timeout: z.number().int().min(0).default(300),
    retryCount: z.number().int().min(0).default(0),
    conditions: z.array(z.object({
      field: z.string(),
      operator: z.enum(['EQUALS', 'NOT_EQUALS', 'CONTAINS', 'IN', 'NOT_IN', 'GREATER_THAN', 'LESS_THAN']),
      value: z.union([z.string(), z.number(), z.array(z.string())]),
    })).default([]),
  })).min(1),
});

// ─── Business Continuity & Disaster Recovery ──────────────────────────────
export enum BCPStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  TESTING = 'TESTING',
  FAILED = 'FAILED',
  ARCHIVED = 'ARCHIVED',
}

export enum RecoveryType {
  FULL = 'FULL',
  PARTIAL = 'PARTIAL',
  SELECTIVE = 'SELECTIVE',
}

export enum DRSite {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  CLOUD = 'CLOUD',
  OFFSITE = 'OFFSITE',
}

export interface BCPPlan {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  status: BCPStatus;
  scope: string;
  objectives: string[];
  criticalFunctions: CriticalFunction[];
  recoveryProcedures: RecoveryProcedure[];
  roles: BCPRole[];
  communicationPlan: CommunicationPlan;
  testingSchedule: TestingSchedule;
  lastTestedAt?: Date;
  nextTestAt?: Date;
  lastReviewAt?: Date;
  nextReviewAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CriticalFunction {
  id: string;
  name: string;
  description: string;
  importance: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  maxTolerableDowntime: number;
  recoveryTimeObjective: number;
  recoveryPointObjective: number;
  dependencies: string[];
  resources: string[];
  owner: string;
}

export interface RecoveryProcedure {
  id: string;
  name: string;
  description: string;
  type: RecoveryType;
  site: DRSite;
  steps: RecoveryStep[];
  prerequisites: string[];
  estimatedDuration: number;
  lastTestedAt?: Date;
  lastExecutedAt?: Date;
}

export interface RecoveryStep {
  id: string;
  order: number;
  description: string;
  action: string;
  parameters: Record<string, unknown>;
  estimatedDuration: number;
  responsible: string;
  verification: string;
  rollback?: string;
}

export interface BCPRole {
  id: string;
  name: string;
  description: string;
  responsibilities: string[];
  backupPerson?: string;
  contactInfo: string;
}

export interface CommunicationPlan {
  internalStakeholders: CommunicationContact[];
  externalStakeholders: CommunicationContact[];
  escalationMatrix: EscalationLevel[];
  notificationChannels: string[];
}

export interface CommunicationContact {
  role: string;
  name: string;
  email: string;
  phone: string;
  alternatePhone?: string;
}

export interface EscalationLevel {
  level: number;
  name: string;
  contacts: CommunicationContact[];
  timeWindow: number;
}

export interface TestingSchedule {
  type: 'TABLETOP' | 'SIMULATION' | 'FULL_EXERCISE' | 'PARTIAL_EXERCISE';
  frequency: 'MONTHLY' | 'QUARTERLY' | 'SEMI_ANNUAL' | 'ANNUAL';
  nextTestDate: Date;
  participants: string[];
}

export interface BackupPolicy {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  enabled: boolean;
  backupType: 'FULL' | 'INCREMENTAL' | 'DIFFERENTIAL';
  schedule: string;
  retentionDays: number;
  encryptionEnabled: boolean;
  compressionEnabled: boolean;
  targetLocation: DRSite;
  sources: string[];
  verifyAfterBackup: boolean;
  lastBackupAt?: Date;
  lastBackupStatus: 'SUCCESS' | 'FAILED' | 'PARTIAL';
  nextBackupAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface BackupJob {
  id: string;
  schoolId: string;
  policyId: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  startedAt: Date;
  completedAt?: Date;
  duration?: number;
  totalSize: number;
  compressedSize: number;
  filesCount: number;
  encrypted: boolean;
  verified: boolean;
  error?: string;
}

export interface DRTestResult {
  id: string;
  schoolId: string;
  planId: string;
  procedureId: string;
  testDate: Date;
  duration: number;
  success: boolean;
  issues: string[];
  improvements: string[];
  participantFeedback: string[];
  nextSteps: string[];
  createdAt: Date;
}

export const bcpPlanSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  scope: z.string().min(1).max(1000),
  objectives: z.array(z.string()).min(1),
  criticalFunctions: z.array(z.object({
    name: z.string().min(1),
    description: z.string(),
    importance: z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']),
    maxTolerableDowntime: z.number().int().min(0),
    recoveryTimeObjective: z.number().int().min(0),
    recoveryPointObjective: z.number().int().min(0),
    dependencies: z.array(z.string()).default([]),
    resources: z.array(z.string()).default([]),
    owner: z.string().uuid(),
  })).min(1),
});

// ─── Compliance & Governance ──────────────────────────────────────────────
export enum ComplianceStandard {
  ISO_27001 = 'ISO_27001',
  SOC2_TYPE1 = 'SOC2_TYPE1',
  SOC2_TYPE2 = 'SOC2_TYPE2',
  GDPR = 'GDPR',
  PCI_DSS = 'PCI_DSS',
  HIPAA = 'HIPAA',
  NIST_CSF = 'NIST_CSF',
  CIS_BENCHMARKS = 'CIS_BENCHMARKS',
  FERPA = 'FERPA',
  CHILD_PROTECTION = 'CHILD_PROTECTION',
  CLOUD_SECURITY = 'CLOUD_SECURITY',
  LOCAL_REGULATION = 'LOCAL_REGULATION',
}

export enum ComplianceStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLIANT = 'COMPLIANT',
  PARTIALLY_COMPLIANT = 'PARTIALLY_COMPLIANT',
  NON_COMPLIANT = 'NON_COMPLIANT',
  WAIVED = 'WAIVED',
}

export interface ComplianceAssessment {
  id: string;
  schoolId: string;
  standard: ComplianceStandard;
  name: string;
  description: string;
  status: ComplianceStatus;
  scope: string;
  requirements: ComplianceRequirement[];
  assessmentDate: Date;
  assessor: string;
  validUntil: Date;
  score: number;
  maxScore: number;
  findings: ComplianceFinding[];
  recommendations: string[];
  documents: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ComplianceRequirement {
  id: string;
  section: string;
  description: string;
  status: ComplianceStatus;
  evidence: string[];
  controls: ComplianceControl[];
  riskLevel: ThreatSeverity;
  remediation?: string;
  dueDate?: Date;
  assignedTo?: string;
}

export interface ComplianceControl {
  id: string;
  name: string;
  description: string;
  type: 'PREVENTIVE' | 'DETECTIVE' | 'CORRECTIVE' | 'COMPENSATING';
  implementation: 'AUTOMATED' | 'MANUAL' | 'SEMI_AUTOMATED';
  status: 'OPERATIONAL' | 'PARTIAL' | 'NOT_IMPLEMENTED' | 'PLANNED';
  frequency: string;
  responsible: string;
  evidence: string[];
  lastTestedAt?: Date;
  lastTestResult?: 'PASS' | 'FAIL' | 'PARTIAL';
}

export interface ComplianceFinding {
  id: string;
  severity: ThreatSeverity;
  requirementId: string;
  description: string;
  impact: string;
  remediation: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'ACCEPTED_RISK';
  dueDate: Date;
  assignedTo?: string;
  evidence?: string[];
}

export interface GovernancePolicy {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  category: string;
  version: string;
  status: 'DRAFT' | 'REVIEW' | 'APPROVED' | 'ACTIVE' | 'ARCHIVED' | 'DEPRECATED';
  owner: string;
  approver: string;
  effectiveDate: Date;
  reviewDate: Date;
  expiryDate?: Date;
  applicableRoles: string[];
  applicableData: DataClassification[];
  tags: string[];
  documentUrl?: string;
  lastReviewAt?: Date;
  nextReviewAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RiskRegister {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  category: string;
  likelihood: number;
  impact: number;
  riskScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'IDENTIFIED' | 'ANALYZED' | 'TREATED' | 'MONITORED' | 'CLOSED';
  owner: string;
  controls: string[];
  treatmentPlan: string;
  residualRisk?: number;
  lastAssessedAt: Date;
  nextAssessmentDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditLog {
  id: string;
  schoolId: string;
  action: string;
  actor: string;
  actorType: 'USER' | 'SYSTEM' | 'API' | 'SERVICE';
  resource: string;
  resourceId: string;
  details: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  result: 'SUCCESS' | 'FAILURE';
  timestamp: Date;
}

export const complianceAssessmentSchema = z.object({
  standard: z.nativeEnum(ComplianceStandard),
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  scope: z.string().min(1).max(1000),
  assessor: z.string().uuid(),
  requirements: z.array(z.object({
    section: z.string(),
    description: z.string(),
    riskLevel: z.nativeEnum(ThreatSeverity),
    dueDate: z.string().datetime().optional(),
    assignedTo: z.string().uuid().optional(),
  })).min(1),
});

export const governancePolicySchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  category: z.string().min(1),
  version: z.string().min(1),
  owner: z.string().uuid(),
  approver: z.string().uuid(),
  effectiveDate: z.string().datetime(),
  reviewDate: z.string().datetime(),
  expiryDate: z.string().datetime().optional(),
  applicableRoles: z.array(z.string()).default([]),
  applicableData: z.array(z.nativeEnum(DataClassification)).default([]),
  tags: z.array(z.string()).default([]),
  documentUrl: z.string().url().optional(),
});

// ─── Cyber Digital Twin ───────────────────────────────────────────────────
export enum TwinSimulationType {
  ATTACK_SIMULATION = 'ATTACK_SIMULATION',
  PENETRATION_TEST = 'PENETRATION_TEST',
  RED_TEAM = 'RED_TEAM',
  BLUE_TEAM = 'BLUE_TEAM',
  PURPLE_TEAM = 'PURPLE_TEAM',
  CHAOS_ENGINEERING = 'CHAOS_ENGINEERING',
  DISASTER_RECOVERY = 'DISASTER_RECOVERY',
  INCIDENT_RESPONSE = 'INCIDENT_RESPONSE',
}

export enum TwinStatus {
  DRAFT = 'DRAFT',
  READY = 'READY',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  PAUSED = 'PAUSED',
}

export interface CyberDigitalTwin {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  status: TwinStatus;
  simulationType: TwinSimulationType;
  scope: string;
  environment: TwinEnvironment;
  attackScenarios: AttackScenario[];
  defenses: TwinDefense[];
  results?: TwinResult[];
  createdBy: string;
  startedAt?: Date;
  completedAt?: Date;
  duration?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TwinEnvironment {
  network: TwinNetworkConfig;
  systems: TwinSystemConfig[];
  users: TwinUserConfig[];
  data: TwinDataConfig[];
}

export interface TwinNetworkConfig {
  segments: NetworkSegment[];
  firewallRules: string[];
  openPorts: number[];
  dnsConfig: Record<string, unknown>;
}

export interface TwinSystemConfig {
  type: string;
  version: string;
  configuration: Record<string, unknown>;
  vulnerabilities: string[];
}

export interface TwinUserConfig {
  roles: string[];
  count: number;
  behaviorProfile: string;
  accessLevel: string;
}

export interface TwinDataConfig {
  classification: DataClassification[];
  volume: number;
  sensitivity: string;
}

export interface AttackScenario {
  id: string;
  name: string;
  description: string;
  technique: string;
  mitreAttackId?: string;
  severity: ThreatSeverity;
  target: string;
  expectedDuration: number;
  steps: AttackStep[];
  successCriteria: string[];
  rollbackPlan: string;
}

export interface AttackStep {
  order: number;
  action: string;
  parameters: Record<string, unknown>;
  expectedOutcome: string;
  timeout: number;
}

export interface TwinDefense {
  id: string;
  name: string;
  type: string;
  effectiveness: number;
  configuration: Record<string, unknown>;
}

export interface TwinResult {
  id: string;
  scenarioId: string;
  success: boolean;
  detectionTime: number;
  responseTime: number;
  mitigationTime: number;
  findings: TwinFinding[];
  recommendations: string[];
  score: number;
}

export interface TwinFinding {
  id: string;
  type: 'VULNERABILITY' | 'DETECTION_GAP' | 'RESPONSE_DELAY' | 'CONFIGURATION_ISSUE' | 'BEST_PRACTICE';
  severity: ThreatSeverity;
  description: string;
  impact: string;
  remediation: string;
  references: string[];
}

export const cyberDigitalTwinSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  simulationType: z.nativeEnum(TwinSimulationType),
  scope: z.string().min(1).max(1000),
  environment: z.object({
    network: z.object({
      segments: z.array(z.nativeEnum(NetworkSegment)),
      firewallRules: z.array(z.string()).default([]),
      openPorts: z.array(z.number().int().min(0).max(65535)).default([]),
      dnsConfig: z.record(z.unknown()).default({}),
    }),
    systems: z.array(z.object({
      type: z.string(),
      version: z.string(),
      configuration: z.record(z.unknown()).default({}),
      vulnerabilities: z.array(z.string()).default([]),
    })).default([]),
    users: z.array(z.object({
      roles: z.array(z.string()),
      count: z.number().int().min(0),
      behaviorProfile: z.string(),
      accessLevel: z.string(),
    })).default([]),
    data: z.array(z.object({
      classification: z.array(z.nativeEnum(DataClassification)),
      volume: z.number().int().min(0),
      sensitivity: z.string(),
    })).default([]),
  }),
  attackScenarios: z.array(z.object({
    name: z.string().min(1),
    description: z.string(),
    technique: z.string(),
    mitreAttackId: z.string().optional(),
    severity: z.nativeEnum(ThreatSeverity),
    target: z.string(),
    expectedDuration: z.number().int().min(0),
    steps: z.array(z.object({
      order: z.number().int(),
      action: z.string(),
      parameters: z.record(z.unknown()).default({}),
      expectedOutcome: z.string(),
      timeout: z.number().int().min(0).default(300),
    })).min(1),
    successCriteria: z.array(z.string()),
    rollbackPlan: z.string(),
  })).min(1),
  defenses: z.array(z.object({
    name: z.string(),
    type: z.string(),
    effectiveness: z.number().min(0).max(100),
    configuration: z.record(z.unknown()).default({}),
  })).default([]),
});
