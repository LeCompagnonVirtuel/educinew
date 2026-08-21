// ========================================
// MODULE 13: COMPLIANCE & SOVEREIGNTY
// ========================================

// ----------------------------------------
// ENUMS
// ----------------------------------------

export enum ComplianceFramework {
  GDPR = 'GDPR',
  ISO_27001 = 'ISO_27001',
  SOC2 = 'SOC2',
  FERPA = 'FERPA',
  COPPA = 'COPPA',
  LGPD = 'LGPD',
  CCPA = 'CCPA',
  HIPAA = 'HIPAA',
  PCI_DSS = 'PCI_DSS',
  NIST = 'NIST',
}

export enum DataResidency {
  LOCAL = 'LOCAL',
  REGIONAL = 'REGIONAL',
  GLOBAL = 'GLOBAL',
  SOVEREIGN = 'SOVEREIGN',
}

export enum SovereigntyLevel {
  FULL = 'FULL',
  PARTIAL = 'PARTIAL',
  NONE = 'NONE',
  HYBRID = 'HYBRID',
}

export enum AuditType {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
  REGULATORY = 'REGULATORY',
  CERTIFICATION = 'CERTIFICATION',
  SURPRISE = 'SURPRISE',
}

export enum AuditStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FINDINGS = 'FINDINGS',
  REMEDIATION = 'REMEDIATION',
}

export enum ComplianceStatus {
  COMPLIANT = 'COMPLIANT',
  NON_COMPLIANT = 'NON_COMPLIANT',
  PARTIAL = 'PARTIAL',
  NOT_ASSESSED = 'NOT_ASSESSED',
  IN_PROGRESS = 'IN_PROGRESS',
}

export enum DataClassification {
  PUBLIC = 'PUBLIC',
  INTERNAL = 'INTERNAL',
  CONFIDENTIAL = 'CONFIDENTIAL',
  RESTRICTED = 'RESTRICTED',
  TOP_SECRET = 'TOP_SECRET',
}

export enum DataSubject {
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
  TEACHER = 'TEACHER',
  STAFF = 'STAFF',
  ALUMNI = 'ALUMNI',
  PROSPECTIVE = 'PROSPECTIVE',
}

export enum ConsentType {
  EXPLICIT = 'EXPLICIT',
  IMPLICIT = 'IMPLICIT',
  OPT_IN = 'OPT_IN',
  OPT_OUT = 'OPT_OUT',
  LEGITIMATE_INTEREST = 'LEGITIMATE_INTEREST',
}

export enum ProcessingPurpose {
  EDUCATION = 'EDUCATION',
  ADMINISTRATION = 'ADMINISTRATION',
  COMMUNICATION = 'COMMUNICATION',
  ANALYTICS = 'ANALYTICS',
  MARKETING = 'MARKETING',
  LEGAL = 'LEGAL',
}

export enum TransferMechanism {
  STANDARD_CONTRACTUAL = 'STANDARD_CONTRACTUAL',
  BINDING_CORPORATE = 'BINDING_CORPORATE',
  ADEQUACY = 'ADEQUACY',
  CONSENT = 'CONSENT',
  CERTIFICATION = 'CERTIFICATION',
}

export enum EncryptionStandard {
  AES_256 = 'AES_256',
  AES_128 = 'AES_128',
  RSA_2048 = 'RSA_2048',
  RSA_4096 = 'RSA_4096',
  ECC = 'ECC',
  CHACHA20 = 'CHACHA20',
}

export enum AccessControl {
  RBAC = 'RBAC',
  ABAC = 'ABAC',
  MAC = 'MAC',
  DAC = 'DAC',
  ZERO_TRUST = 'ZERO_TRUST',
}

export enum RetentionPolicy {
  MINIMUM = 'MINIMUM',
  STANDARD = 'STANDARD',
  EXTENDED = 'EXTENDED',
  PERMANENT = 'PERMANENT',
  LEGAL_HOLD = 'LEGAL_HOLD',
}

export enum RightType {
  ACCESS = 'ACCESS',
  RECTIFICATION = 'RECTIFICATION',
  ERASURE = 'ERASURE',
  RESTRICTION = 'RESTRICTION',
  PORTABILITY = 'PORTABILITY',
  OBJECTION = 'OBJECTION',
}

export enum BreachSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum BreachStatus {
  DETECTED = 'DETECTED',
  CONTAINED = 'CONTAINED',
  INVESTIGATING = 'INVESTIGATING',
  NOTIFIED = 'NOTIFIED',
  RESOLVED = 'RESOLVED',
}

export enum AssessmentType {
  RISK = 'RISK',
  VULNERABILITY = 'VULNERABILITY',
  PENETRATION = 'PENETRATION',
  COMPLIANCE = 'COMPLIANCE',
  IMPACT = 'IMPACT',
}

export enum AssessmentStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum CertificationType {
  ISO_27001 = 'ISO_27001',
  SOC2_TYPE1 = 'SOC2_TYPE1',
  SOC2_TYPE2 = 'SOC2_TYPE2',
  PCI_DSS = 'PCI_DSS',
  CSA_STAR = 'CSA_STAR',
}

export enum CertificationStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  SUSPENDED = 'SUSPENDED',
  REVOKED = 'REVOKED',
  PENDING = 'PENDING',
}

export enum PolicyType {
  INFORMATION_SECURITY = 'INFORMATION_SECURITY',
  DATA_PRIVACY = 'DATA_PRIVACY',
  ACCEPTABLE_USE = 'ACCEPTABLE_USE',
  ACCESS_CONTROL = 'ACCESS_CONTROL',
  INCIDENT_RESPONSE = 'INCIDENT_RESPONSE',
  BUSINESS_CONTINUITY = 'BUSINESS_CONTINUITY',
}

export enum PolicyStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  RETIRED = 'RETIRED',
  UNDER_REVIEW = 'UNDER_REVIEW',
}

export enum RiskLevel {
  MINIMAL = 'MINIMAL',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum ControlType {
  PREVENTIVE = 'PREVENTIVE',
  DETECTIVE = 'DETECTIVE',
  CORRECTIVE = 'CORRECTIVE',
  COMPENSATING = 'COMPENSATING',
  DETERRENT = 'DETERRENT',
}

export enum ControlStatus {
  IMPLEMENTED = 'IMPLEMENTED',
  PARTIALLY_IMPLEMENTED = 'PARTIALLY_IMPLEMENTED',
  NOT_IMPLEMENTED = 'NOT_IMPLEMENTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
}

export enum EvidenceType {
  SCREENSHOT = 'SCREENSHOT',
  DOCUMENT = 'DOCUMENT',
  LOG = 'LOG',
  CONFIGURATION = 'CONFIGURATION',
  TEST_RESULT = 'TEST_RESULT',
  CERTIFICATE = 'CERTIFICATE',
}

export enum EvidenceStatus {
  COLLECTED = 'COLLECTED',
  VERIFIED = 'VERIFIED',
  EXPIRED = 'EXPIRED',
  OUTDATED = 'OUTDATED',
}

export enum RemediationStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  REMEDIATED = 'REMEDIATED',
  ACCEPTED = 'ACCEPTED',
  CLOSED = 'CLOSED',
}

export enum ReportingFrequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  ANNUAL = 'ANNUAL',
}

export enum ReportType {
  COMPLIANCE = 'COMPLIANCE',
  AUDIT = 'AUDIT',
  RISK = 'RISK',
  INCIDENT = 'INCIDENT',
  BREACH = 'BREACH',
}

export enum Jurisdiction {
  EU = 'EU',
  US = 'US',
  UK = 'UK',
  AFRICA = 'AFRICA',
  ASIA_PACIFIC = 'ASIA_PACIFIC',
  GLOBAL = 'GLOBAL',
}

export enum RegulatoryBody {
  CNIL = 'CNIL',
  ICO = 'ICO',
  FTC = 'FTC',
  EDPS = 'EDPS',
  LOCAL_AUTHORITY = 'LOCAL_AUTHORITY',
}

export enum LawType {
  DATA_PROTECTION = 'DATA_PROTECTION',
  PRIVACY = 'PRIVACY',
  EDUCATION = 'EDUCATION',
  CHILDREN = 'CHILDREN',
  TELECOMMUNICATIONS = 'TELECOMMUNICATIONS',
}

export enum CrossBorderTransfer {
  ADEQUATE = 'ADEQUATE',
  SCC = 'SCC',
  BCR = 'BCR',
  CONSENT = 'CONSENT',
  DEROGATION = 'DEROGATION',
}

export enum DataMinimization {
  FULL = 'FULL',
  PARTIAL = 'PARTIAL',
  NONE = 'NONE',
}

export enum Pseudonymization {
  FULL = 'FULL',
  PARTIAL = 'PARTIAL',
  TOKENIZATION = 'TOKENIZATION',
  NONE = 'NONE',
}

export enum Anonymization {
  FULL = 'FULL',
  K_ANONYMITY = 'K_ANONYMITY',
  L_DIVERSITY = 'L_DIVERSITY',
  NONE = 'NONE',
}

export enum ConsentManagement {
  CENTRALIZED = 'CENTRALIZED',
  DECENTRALIZED = 'DECENTRALIZED',
  HYBRID = 'HYBRID',
}

export enum DPIAStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
}

// ----------------------------------------
// INTERFACES
// ----------------------------------------

export interface CountryDataResidency {
  id: string;
  country: string;
  code: string;
  jurisdiction: Jurisdiction;
  regulatoryBody: RegulatoryBody;
  laws: CountryLaw[];
  dataResidency: DataResidency;
  sovereigntyLevel: SovereigntyLevel;
  crossBorderRules: CrossBorderRule[];
}

export interface CountryLaw {
  name: string;
  type: LawType;
  effectiveDate: string;
  requirements: string[];
  penalties: string;
}

export interface CrossBorderRule {
  destination: string;
  mechanism: CrossBorderTransfer;
  allowed: boolean;
  conditions: string[];
}

export interface RegionalStoragePolicy {
  id: string;
  region: string;
  dataTypes: string[];
  residency: DataResidency;
  encryption: EncryptionStandard;
  accessControl: AccessControl;
  retention: RetentionPolicy;
  backupRegion?: string;
  enabled: boolean;
}

export interface SovereignCloudConfig {
  id: string;
  country: string;
  provider: string;
  region: string;
  sovereigntyLevel: SovereigntyLevel;
  encryption: EncryptionStandard;
  keyManagement: string;
  accessControl: AccessControl;
  auditLogging: boolean;
  dataResidency: DataResidency;
  complianceFrameworks: ComplianceFramework[];
  enabled: boolean;
}

export interface GDPRCompliance {
  id: string;
  schoolId: string;
  status: ComplianceStatus;
  articles: GDPRArticle[];
  dataProcessing: GDPRDataProcessing[];
  consentManagement: ConsentManagement;
  lastAssessment: string;
  nextAssessment: string;
  dpoContact: string;
}

export interface GDPRArticle {
  article: string;
  title: string;
  description: string;
  status: ComplianceStatus;
  evidence: string[];
  gaps: string[];
}

export interface GDPRDataProcessing {
  id: string;
  purpose: ProcessingPurpose;
  legalBasis: string;
  dataCategories: string[];
  dataSubjects: DataSubject[];
  retention: RetentionPolicy;
  processors: string[];
  crossBorder: boolean;
  dpiaRequired: boolean;
}

export interface ISO27001Compliance {
  id: string;
  schoolId: string;
  status: ComplianceStatus;
  clauses: ISO27001Clause[];
  annexControls: ISO27001Control[];
  certificationDate?: string;
  expiryDate?: string;
  scope: string;
}

export interface ISO27001Clause {
  clause: string;
  title: string;
  status: ComplianceStatus;
  requirements: string[];
  evidence: string[];
}

export interface ISO27001Control {
  control: string;
  title: string;
  implementation: ControlStatus;
  effectiveness: string;
  evidence: string[];
}

export interface SOC2Compliance {
  id: string;
  schoolId: string;
  status: ComplianceStatus;
  trustPrinciples: SOC2TrustPrinciple[];
  type1Complete: boolean;
  type2Complete: boolean;
  examinationDate?: string;
  reportUrl?: string;
}

export interface SOC2TrustPrinciple {
  principle: string;
  description: string;
  status: ComplianceStatus;
  controls: SOC2Control[];
}

export interface SOC2Control {
  control: string;
  description: string;
  implemented: boolean;
  tested: boolean;
  evidence: string[];
}

export interface FERPACompliance {
  id: string;
  schoolId: string;
  status: ComplianceStatus;
  directoryInfo: string[];
  consentRequirements: string[];
  accessRights: string[];
  disclosureRules: string[];
  lastReview: string;
}

export interface COPPACompliance {
  id: string;
  schoolId: string;
  status: ComplianceStatus;
  ageThreshold: number;
  parentalConsent: ConsentType;
  dataMinimization: DataMinimization;
  retentionDays: number;
  thirdPartySharing: boolean;
  parentalAccess: boolean;
  lastReview: string;
}

export interface LGPDCompliance {
  id: string;
  schoolId: string;
  status: ComplianceStatus;
  legalBases: string[];
  dataProcessing: LGPDDataProcessing[];
  dpoContact: string;
  lastAssessment: string;
}

export interface LGPDDataProcessing {
  id: string;
  purpose: ProcessingPurpose;
  legalBasis: string;
  dataCategories: string[];
  retention: RetentionPolicy;
  processors: string[];
}

export interface ComplianceScan {
  id: string;
  framework: ComplianceFramework;
  schoolId: string;
  status: AssessmentStatus;
  findings: ComplianceScanFinding[];
  score: number;
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  startedAt: string;
  completedAt?: string;
}

export interface ComplianceScanFinding {
  id: string;
  control: string;
  title: string;
  description: string;
  severity: RiskLevel;
  status: RemediationStatus;
  evidence: string[];
  remediation: string;
}

export interface ComplianceReportRecord {
  id: string;
  schoolId: string;
  type: ReportType;
  framework: ComplianceFramework;
  period: ReportingFrequency;
  status: AuditStatus;
  summary: string;
  findings: ComplianceReportFinding[];
  recommendations: string[];
  generatedAt: string;
}

export interface ComplianceReportFinding {
  id: string;
  category: string;
  finding: string;
  severity: RiskLevel;
  impact: string;
  recommendation: string;
  status: RemediationStatus;
}

export interface ComplianceAuditRecord {
  id: string;
  schoolId: string;
  type: AuditType;
  framework: ComplianceFramework;
  auditor: string;
  scope: string;
  status: AuditStatus;
  findings: AuditFindingRecord[];
  overallRating: string;
  startDate: string;
  endDate: string;
  reportUrl?: string;
}

export interface AuditFindingRecord {
  id: string;
  category: string;
  finding: string;
  severity: RiskLevel;
  evidence: string[];
  recommendation: string;
  remediation: string;
  status: RemediationStatus;
  dueDate: string;
}

export interface DataSovereignty {
  id: string;
  schoolId: string;
  country: string;
  dataTypes: string[];
  residency: DataResidency;
  sovereigntyLevel: SovereigntyLevel;
  cloudProvider: string;
  region: string;
  encryption: EncryptionStandard;
  keyManagement: string;
  accessLog: boolean;
  lastAudit: string;
}

export interface DataClassificationRecord {
  id: string;
  schoolId: string;
  dataType: string;
  classification: DataClassification;
  description: string;
  owner: string;
  retention: RetentionPolicy;
  encryption: EncryptionStandard;
  accessControl: AccessControl;
  lastReview: string;
}

export interface DataSubjectRequest {
  id: string;
  schoolId: string;
  type: RightType;
  subjectId: string;
  subjectType: DataSubject;
  status: string;
  description: string;
  response?: string;
  deadline: string;
  fulfilledAt?: string;
  verifiedBy?: string;
  createdAt: string;
}

export interface ConsentRecord {
  id: string;
  schoolId: string;
  subjectId: string;
  subjectType: DataSubject;
  purpose: ProcessingPurpose;
  type: ConsentType;
  granted: boolean;
  grantedAt?: string;
  revokedAt?: string;
  expiry?: string;
  evidence: string;
  version: string;
}

export interface ProcessingRecord {
  id: string;
  schoolId: string;
  purpose: ProcessingPurpose;
  legalBasis: string;
  dataCategories: string[];
  dataSubjects: DataSubject[];
  recipients: string[];
  retention: RetentionPolicy;
  crossBorder: boolean;
  safeguards: string[];
  dpiaRequired: boolean;
  createdAt: string;
}

export interface TransferRecord {
  id: string;
  schoolId: string;
  destination: string;
  jurisdiction: Jurisdiction;
  mechanism: TransferMechanism;
  dataCategories: string[];
  safeguards: string[];
  approved: boolean;
  approvedBy?: string;
  approvedAt?: string;
  lastReview: string;
}

export interface EncryptionConfig {
  id: string;
  schoolId: string;
  standard: EncryptionStandard;
  keySize: number;
  keyRotation: number;
  keyManagement: string;
  atRest: boolean;
  inTransit: boolean;
  enabled: boolean;
}

export interface AccessControlConfig {
  id: string;
  schoolId: string;
  model: AccessControl;
  policies: AccessPolicy[];
  mfaRequired: boolean;
  sessionTimeout: number;
  ipWhitelist: string[];
  enabled: boolean;
}

export interface AccessPolicy {
  id: string;
  name: string;
  resource: string;
  actions: string[];
  conditions: Record<string, string>;
  effect: 'ALLOW' | 'DENY';
}

export interface RetentionConfig {
  id: string;
  schoolId: string;
  dataType: string;
  policy: RetentionPolicy;
  retentionDays: number;
  archiveAfter?: number;
  deleteAfter?: number;
  legalBasis: string;
  enabled: boolean;
}

export interface AuditTrail {
  id: string;
  schoolId: string;
  resource: string;
  resourceId: string;
  action: string;
  actor: string;
  actorType: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  changes: AuditTrailChange[];
}

export interface AuditTrailChange {
  field: string;
  oldValue: string;
  newValue: string;
}

export interface AuditLog {
  id: string;
  schoolId: string;
  level: string;
  category: string;
  message: string;
  actor: string;
  resource: string;
  resourceId: string;
  timestamp: string;
  metadata: Record<string, string>;
}

export interface AuditReportRecord {
  id: string;
  schoolId: string;
  type: AuditType;
  period: ReportingFrequency;
  startDate: string;
  endDate: string;
  totalEvents: number;
  categories: AuditCategorySummary[];
  anomalies: AuditAnomaly[];
  generatedAt: string;
}

export interface AuditCategorySummary {
  category: string;
  count: number;
  percentage: number;
  trend: string;
}

export interface AuditAnomaly {
  id: string;
  description: string;
  severity: RiskLevel;
  timestamp: string;
  resource: string;
  actor: string;
  investigated: boolean;
}

export interface RiskAssessment {
  id: string;
  schoolId: string;
  framework: ComplianceFramework;
  overallRisk: RiskLevel;
  risks: RiskItem[];
  assessmentDate: string;
  assessor: string;
  nextAssessment: string;
}

export interface RiskItem {
  id: string;
  category: string;
  description: string;
  likelihood: number;
  impact: number;
  riskScore: number;
  level: RiskLevel;
  mitigation: RiskMitigation;
  owner: string;
  status: string;
}

export interface RiskMitigation {
  id: string;
  strategy: string;
  description: string;
  controls: string[];
  residualRisk: RiskLevel;
  cost: number;
  effectiveDate: string;
  status: RemediationStatus;
}

export interface ControlFramework {
  id: string;
  name: string;
  framework: ComplianceFramework;
  controls: ControlItem[];
  lastAssessment: string;
  overallStatus: ComplianceStatus;
}

export interface ControlItem {
  id: string;
  control: string;
  title: string;
  description: string;
  type: ControlType;
  status: ControlStatus;
  effectiveness: string;
  owner: string;
  lastTested: string;
}

export interface ControlAssessment {
  id: string;
  controlId: string;
  framework: ComplianceFramework;
  status: ControlStatus;
  effectiveness: string;
  findings: string[];
  evidence: Evidence[];
  assessedBy: string;
  assessedAt: string;
}

export interface Evidence {
  id: string;
  controlId: string;
  type: EvidenceType;
  title: string;
  description: string;
  fileUrl?: string;
  status: EvidenceStatus;
  collectedAt: string;
  expiresAt?: string;
}

export interface Remediation {
  id: string;
  schoolId: string;
  findingId: string;
  description: string;
  priority: RiskLevel;
  assignee: string;
  dueDate: string;
  status: RemediationStatus;
  actions: RemediationAction[];
  evidence?: string;
  completedAt?: string;
}

export interface RemediationAction {
  id: string;
  description: string;
  completedBy?: string;
  completedAt?: string;
  evidence?: string;
}

export interface ComplianceDashboard {
  id: string;
  schoolId: string;
  overallScore: number;
  frameworkScores: ComplianceFrameworkScore[];
  activeAudits: number;
  openFindings: number;
  pendingRequests: number;
  alerts: ComplianceAlert[];
  trends: ComplianceTrend[];
  lastScan: string;
  generatedAt: string;
}

export interface ComplianceFrameworkScore {
  framework: ComplianceFramework;
  score: number;
  status: ComplianceStatus;
  lastAssessment: string;
  nextAssessment: string;
}

export interface ComplianceAlert {
  id: string;
  type: string;
  title: string;
  description: string;
  severity: RiskLevel;
  framework: ComplianceFramework;
  deadline?: string;
  acknowledged: boolean;
  createdAt: string;
}

export interface ComplianceTrend {
  framework: ComplianceFramework;
  metric: string;
  currentValue: number;
  previousValue: number;
  change: number;
  direction: string;
  period: string;
}

export interface PolicyDocument {
  id: string;
  schoolId: string;
  type: PolicyType;
  title: string;
  description: string;
  content: string;
  version: string;
  status: PolicyStatus;
  owner: string;
  approver: string;
  effectiveDate: string;
  reviewDate: string;
  lastReview: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PolicyVersion {
  id: string;
  policyId: string;
  version: string;
  content: string;
  changes: string;
  publishedBy: string;
  publishedAt: string;
}

export interface PolicyCompliance {
  id: string;
  policyId: string;
  complianceRate: number;
  totalControls: number;
  implementedControls: number;
  gaps: string[];
  lastAssessment: string;
}

export interface Certification {
  id: string;
  schoolId: string;
  type: CertificationType;
  status: CertificationStatus;
  certifyingBody: string;
  scope: string;
  issuedDate: string;
  expiryDate: string;
  certificationNumber: string;
  conditions: string[];
  auditHistory: CertificationAudit[];
}

export interface CertificationAudit {
  id: string;
  certificationId: string;
  type: AuditType;
  date: string;
  result: string;
  findings: string[];
  auditor: string;
}

export interface Assessment {
  id: string;
  schoolId: string;
  type: AssessmentType;
  framework: ComplianceFramework;
  scope: string;
  status: AssessmentStatus;
  assessor: string;
  startDate: string;
  endDate?: string;
  results: AssessmentResult[];
  overallScore: number;
}

export interface AssessmentResult {
  area: string;
  score: number;
  status: ComplianceStatus;
  findings: string[];
  recommendations: string[];
}

export interface BreachNotification {
  id: string;
  schoolId: string;
  breachId: string;
  recipient: string;
  recipientType: string;
  channel: string;
  sentAt: string;
  acknowledged: boolean;
  acknowledgedAt?: string;
}

export interface BreachReport {
  id: string;
  schoolId: string;
  severity: BreachSeverity;
  status: BreachStatus;
  description: string;
  affectedDataSubjects: number;
  dataCategories: string[];
  cause: string;
  containmentActions: string[];
  notifications: BreachNotification[];
  regulatoryNotification: boolean;
  deadline: string;
  detectedAt: string;
  containedAt?: string;
  resolvedAt?: string;
}

export interface DPIA {
  id: string;
  schoolId: string;
  title: string;
  description: string;
  status: DPIAStatus;
  processingActivity: string;
  necessity: string;
  proportionality: string;
  risks: DPIARisk[];
  measures: DPIAMeasure[];
  consultationRequired: boolean;
  dpoReview: boolean;
  approvalDate?: string;
  reviewDate: string;
  createdAt: string;
}

export interface DPIARisk {
  id: string;
  description: string;
  likelihood: number;
  severity: number;
  riskScore: number;
  measure?: string;
}

export interface DPIAMeasure {
  id: string;
  description: string;
  type: string;
  implemented: boolean;
  effectiveness: string;
}

export interface TIA {
  id: string;
  schoolId: string;
  destination: string;
  jurisdiction: Jurisdiction;
  mechanism: TransferMechanism;
  dataCategories: string[];
  assessmentDate: string;
  risks: TIARisk[];
  safeguards: string[];
  approval: string;
  nextReview: string;
}

export interface TIARisk {
  id: string;
  description: string;
  level: RiskLevel;
  mitigation: string;
  residualRisk: RiskLevel;
}

export interface TransferImpactAssessment {
  id: string;
  transferId: string;
  destination: string;
  legalFramework: string;
  governmentAccess: RiskLevel;
  dataProtection: RiskLevel;
  overallRisk: RiskLevel;
  safeguards: string[];
  recommendations: string[];
  approved: boolean;
  approvedBy?: string;
  assessedAt: string;
}
