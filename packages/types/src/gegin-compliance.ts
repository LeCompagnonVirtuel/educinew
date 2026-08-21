export enum ComplianceStandard {
  GDPR = "GDPR",
  ISO_27001 = "ISO_27001",
  ISO_9001 = "ISO_9001",
  SOC2_TYPE1 = "SOC2_TYPE1",
  SOC2_TYPE2 = "SOC2_TYPE2",
  FERPA = "FERPA",
  COPPA = "COPPA",
  HIPAA = "HIPAA",
  PCI_DSS = "PCI_DSS",
  CCPA = "CCPA",
  LGPD = "LGPD",
  POPIA = "POPIA",
  PDPA = "PDPA",
  DATA_PROTECTION_ACT = "DATA_PROTECTION_ACT",
  ePRIVACY = "ePRIVACY",
}

export enum ComplianceStatus {
  COMPLIANT = "COMPLIANT",
  NON_COMPLIANT = "NON_COMPLIANT",
  PARTIALLY_COMPLIANT = "PARTIALLY_COMPLIANT",
  IN_PROGRESS = "IN_PROGRESS",
  NOT_ASSESSED = "NOT_ASSESSED",
  EXEMPT = "EXEMPT",
  WAIVED = "WAIVED",
}

export enum DataResidencyType {
  SAME_COUNTRY = "SAME_COUNTRY",
  SAME_REGION = "SAME_REGION",
  CROSS_BORDER = "CROSS_BORDER",
  OFFSHORE = "OFFSHORE",
  CLOUD_PREFERRED = "CLOUD_PREFERRED",
  ON_PREMISE = "ON_PREMISE",
  HYBRID = "HYBRID",
}

export enum ConsentType {
  DATA_PROCESSING = "DATA_PROCESSING",
  MARKETING = "MARKETING",
  COOKIES = "COOKIES",
  ANALYTICS = "ANALYTICS",
  THIRD_PARTY = "THIRD_PARTY",
  CROSS_BORDER = "CROSS_BORDER",
  PROFILING = "PROFILING",
  AUTOMATED_DECISION = "AUTOMATED_DECISION",
  DATA_SHARING = "DATA_SHARING",
  RESEARCH = "RESEARCH",
}

export enum ConsentStatus {
  GRANTED = "GRANTED",
  DENIED = "DENIED",
  WITHDRAWN = "WITHDRAWN",
  PENDING = "PENDING",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
}

export enum SovereigntyLevel {
  NATIONAL = "NATIONAL",
  REGIONAL = "REGIONAL",
  LOCAL = "LOCAL",
  SECTORAL = "SECTORAL",
  INTERNATIONAL = "INTERNATIONAL",
}

export enum LegalHoldStatus {
  ACTIVE = "ACTIVE",
  RELEASED = "RELEASED",
  PENDING = "PENDING",
  DISPUTED = "DISPUTED",
}

export enum DashboardWidget {
  COMPLIANCE_SCORE = "COMPLIANCE_SCORE",
  RISK_MATRIX = "RISK_MATRIX",
  CONSENT_OVERVIEW = "CONSENT_OVERVIEW",
  DATA_MAP = "DATA_MAP",
  AUDIT_TIMELINE = "AUDIT_TIMELINE",
  INCIDENT_FEED = "INCIDENT_FEED",
  POLICY_STATUS = "POLICY_STATUS",
  TRAINING_STATUS = "TRAINING_STATUS",
  VENDOR_RISK = "VENDOR_RISK",
  BREACH_ALERT = "BREACH_ALERT",
}

export enum RiskLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
  INFORMATIONAL = "INFORMATIONAL",
}

export enum AuditAction {
  CREATE = "CREATE",
  READ = "READ",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  EXPORT = "EXPORT",
  IMPORT = "IMPORT",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  PERMISSION_CHANGE = "PERMISSION_CHANGE",
  DATA_ACCESS = "DATA_ACCESS",
  CONSENT_CHANGE = "CONSENT_CHANGE",
  POLICY_CHANGE = "POLICY_CHANGE",
}

export enum DataClassification {
  PUBLIC = "PUBLIC",
  INTERNAL = "INTERNAL",
  CONFIDENTIAL = "CONFIDENTIAL",
  RESTRICTED = "RESTRICTED",
  TOP_SECRET = "TOP_SECRET",
}

export enum RetentionAction {
  ARCHIVE = "ARCHIVE",
  ANONYMIZE = "ANONYMIZE",
  DELETE = "DELETE",
  REVIEW = "REVIEW",
  EXTEND = "EXTEND",
}

export enum BreachSeverity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum BreachStatus {
  DETECTED = "DETECTED",
  CONTAINED = "CONTAINED",
  INVESTIGATING = "INVESTIGATING",
  NOTIFIED = "NOTIFIED",
  RESOLVED = "RESOLVED",
  CLOSED = "CLOSED",
}

export enum NotificationType {
  EMAIL = "EMAIL",
  SMS = "SMS",
  IN_APP = "IN_APP",
  PUSH = "PUSH",
  WEBHOOK = "WEBHOOK",
}

export enum PolicyType {
  PRIVACY = "PRIVACY",
  SECURITY = "SECURITY",
  DATA_RETENTION = "DATA_RETENTION",
  ACCEPTABLE_USE = "ACCEPTABLE_USE",
  INCIDENT_RESPONSE = "INCIDENT_RESPONSE",
  BUSINESS_CONTINUITY = "BUSINESS_CONTINUITY",
  ACCESS_CONTROL = "ACCESS_CONTROL",
  ENCRYPTION = "ENCRYPTION",
}

export enum PolicyStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
  UNDER_REVIEW = "UNDER_REVIEW",
  EXPIRED = "EXPIRED",
}

export enum TrainingStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  OVERDUE = "OVERDUE",
  EXEMPT = "EXEMPT",
}

export enum VendorRiskLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum VendorStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  TERMINATED = "TERMINATED",
}

export enum DataSubjectRequestType {
  ACCESS = "ACCESS",
  RECTIFICATION = "RECTIFICATION",
  ERASURE = "ERASURE",
  RESTRICTION = "RESTRICTION",
  PORTABILITY = "PORTABILITY",
  OBJECTION = "OBJECTION",
  AUTOMATED_DECISION = "AUTOMATED_DECISION",
}

export enum DataSubjectRequestStatus {
  RECEIVED = "RECEIVED",
  IDENTITY_VERIFIED = "IDENTITY_VERIFIED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  REJECTED = "REJECTED",
  EXTENDED = "EXTENDED",
}

export enum EncryptionType {
  AES_256 = "AES_256",
  AES_128 = "AES_128",
  RSA_2048 = "RSA_2048",
  RSA_4096 = "RSA_4096",
  ECDSA = "ECDSA",
  BLOWFISH = "BLOWFISH",
  TRIPLE_DES = "TRIPLE_DES",
}

export enum AccessControlModel {
  RBAC = "RBAC",
  ABAC = "ABAC",
  MAC = "MAC",
  DAC = "DAC",
}

export enum AnonymizationMethod {
  MASKING = "MASKING",
  HASHING = "HASHING",
  PSEUDONYMIZATION = "PSEUDONYMIZATION",
  GENERALIZATION = "GENERALIZATION",
  SUPPRESSION = "SUPPRESSION",
  NOISE_ADDITION = "NOISE_ADDITION",
}

export enum ComplianceReportType {
  OVERVIEW = "OVERVIEW",
  DETAILED = "DETAILED",
  AUDIT = "AUDIT",
  RISK = "RISK",
  INCIDENT = "INCIDENT",
  TRAINING = "TRAINING",
  VENDOR = "VENDOR",
}

export enum ComplianceReportFormat {
  PDF = "PDF",
  EXCEL = "EXCEL",
  CSV = "CSV",
  JSON = "JSON",
  HTML = "HTML",
}

export enum AssessmentType {
  SELF = "SELF",
  INTERNAL = "INTERNAL",
  EXTERNAL = "EXTERNAL",
  PENETRATION = "PENETRATION",
  VULNERABILITY = "VULNERABILITY",
}

export enum ComplianceFrequency {
  REAL_TIME = "REAL_TIME",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  ANNUALLY = "ANNUALLY",
}

export enum DataProcessingPurpose {
  EDUCATION = "EDUCATION",
  ADMINISTRATION = "ADMINISTRATION",
  COMMUNICATION = "COMMUNICATION",
  ANALYTICS = "ANALYTICS",
  MARKETING = "MARKETING",
  RESEARCH = "RESEARCH",
  LEGAL = "LEGAL",
  SECURITY = "SECURITY",
}

export enum LegalBasisForProcessing {
  CONSENT = "CONSENT",
  CONTRACT = "CONTRACT",
  LEGAL_OBLIGATION = "LEGAL_OBLIGATION",
  VITAL_INTERESTS = "VITAL_INTERESTS",
  PUBLIC_TASK = "PUBLIC_TASK",
  LEGITIMATE_INTERESTS = "LEGITIMATE_INTERESTS",
}

export enum TransferMechanism {
  SCC = "SCC",
  BCR = "BCR",
  ADEQUACY = "ADEQUACY",
  DPF = "DPF",
  CERTIFICATION = "CERTIFICATION",
  CONTRACT = "CONTRACT",
}

export enum IncidentType {
  DATA_BREACH = "DATA_BREACH",
  UNAUTHORIZED_ACCESS = "UNAUTHORIZED_ACCESS",
  SYSTEM_FAILURE = "SYSTEM_FAILURE",
  POLICY_VIOLATION = "POLICY_VIOLATION",
  FRAUD = "FRAUD",
  MALWARE = "MALWARE",
  PHISHING = "PHISHING",
  INSIDER_THREAT = "INSIDER_THREAT",
}

export enum ComplianceFramework {
  NIST = "NIST",
  ISO_27001 = "ISO_27001",
  SOC2 = "SOC2",
  CIS = "CIS",
  COBIT = "COBIT",
  MITRE_ATTACK = "MITRE_ATTACK",
}

export enum EvidenceType {
  SCREENSHOT = "SCREENSHOT",
  DOCUMENT = "DOCUMENT",
  LOG = "LOG",
  CONFIGURATION = "CONFIGURATION",
  POLICY = "POLICY",
  CERTIFICATE = "CERTIFICATE",
}

export enum ComplianceTaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  BLOCKED = "BLOCKED",
  DEFERRED = "DEFERRED",
}

export enum DataRetentionPeriod {
  ONE_YEAR = "ONE_YEAR",
  THREE_YEARS = "THREE_YEARS",
  FIVE_YEARS = "FIVE_YEARS",
  SEVEN_YEARS = "SEVEN_YEARS",
  TEN_YEARS = "TEN_YEARS",
  INDEFINITE = "INDEFINITE",
}

export enum RightType {
  ACCESS = "ACCESS",
  RECTIFICATION = "RECTIFICATION",
  ERASURE = "ERASURE",
  PORTABILITY = "PORTABILITY",
  OBJECTION = "OBJECTION",
  RESTRICTION = "RESTRICTION",
  NOTIFICATION = "NOTIFICATION",
}

export enum ConsentCollectionMethod {
  WEB_FORM = "WEB_FORM",
  MOBILE_APP = "MOBILE_APP",
  EMAIL = "EMAIL",
  PAPER = "PAPER",
  VERBAL = "VERBAL",
  API = "API",
}

export enum ComplianceWorkflowType {
  DSR = "DSR",
  BREACH = "BREACH",
  VENDOR_ASSESSMENT = "VENDOR_ASSESSMENT",
  POLICY_REVIEW = "POLICY_REVIEW",
  AUDIT = "AUDIT",
  TRAINING = "TRAINING",
  INCIDENT = "INCIDENT",
}

export enum ComplianceWorkflowStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  COMPLETED = "COMPLETED",
}

export enum CrossBorderTransferStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
}

export enum RegulatoryBody {
  CNIL = "CNIL",
  ICO = "ICO",
  FTC = "FTC",
  EDPS = "EDPS",
  AEPD = "AEPD",
  GARANTE = "GARANTE",
  NAICM = "NAICM",
}

export enum ComplianceMaturityLevel {
  INITIAL = "INITIAL",
  MANAGED = "MANAGED",
  DEFINED = "DEFINED",
  QUANTITATIVELY_MANAGED = "QUANTITATIVELY_MANAGED",
  OPTIMIZING = "OPTIMIZING",
}

export enum PolicyTemplateType {
  GDPR = "GDPR",
  FERPA = "FERPA",
  COPPA = "COPPA",
  SOC2 = "SOC2",
  ISO_27001 = "ISO_27001",
  CUSTOM = "CUSTOM",
}

export enum DataMappingStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETE = "COMPLETE",
  OUTDATED = "OUTDATED",
}

export enum ConsentWithdrawalMethod {
  WEB_FORM = "WEB_FORM",
  EMAIL = "EMAIL",
  IN_APP = "IN_APP",
  SUPPORT_TICKET = "SUPPORT_TICKET",
  PHONE = "PHONE",
}

export enum ComplianceCheckType {
  AUTOMATED = "AUTOMATED",
  MANUAL = "MANUAL",
  HYBRID = "HYBRID",
}

export enum BreachNotificationChannel {
  REGULATORY = "REGULATORY",
  AFFECTED_INDIVIDUALS = "AFFECTED_INDIVIDUALS",
  PUBLIC = "PUBLIC",
  INTERNAL = "INTERNAL",
}

export interface GDPRCompliance {
  id: string;
  schoolId: string;
  lawfulBasis: LegalBasisForProcessing;
  dataProtectionOfficer?: string;
  dpoContact?: string;
  privacyImpactAssessment: PrivacyImpactAssessment;
  dataSubjectRights: RightType[];
  consentRecords: ConsentRecord[];
  dataProcessingActivities: DataProcessingActivity[];
  crossBorderTransfers: CrossBorderTransfer[];
  dataRetentionPolicies: DataRetentionPolicy[];
  breachNotificationProcedures: BreachNotificationProcedure[];
  status: ComplianceStatus;
  lastAssessment: string;
  nextAssessment: string;
  createdAt: string;
  updatedAt: string;
}

export interface PrivacyImpactAssessment {
  id: string;
  gdprComplianceId: string;
  projectName: string;
  description: string;
  necessity: string;
  proportionality: string;
  risks: PIARisk[];
  mitigationMeasures: string[];
  dpoConsulted: boolean;
  authorityConsulted: boolean;
  status: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PIARisk {
  id: string;
  description: string;
  likelihood: RiskLevel;
  impact: RiskLevel;
  overallRisk: RiskLevel;
  mitigation: string;
  residualRisk: RiskLevel;
}

export interface DataProcessingActivity {
  id: string;
  gdprComplianceId: string;
  name: string;
  description: string;
  purpose: DataProcessingPurpose;
  lawfulBasis: LegalBasisForProcessing;
  categoriesOfDataSubjects: string[];
  categoriesOfPersonalData: string[];
  recipients: string[];
  crossBorderTransfer: boolean;
  retentionPeriod: DataRetentionPeriod;
  technicalMeasures: string[];
  organizationalMeasures: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CrossBorderTransfer {
  id: string;
  schoolId: string;
  sourceCountry: string;
  destinationCountry: string;
  mechanism: TransferMechanism;
  status: CrossBorderTransferStatus;
  dataCategories: string[];
  safeguards: string[];
  approvedAt?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISOCompliance {
  id: string;
  schoolId: string;
  standard: ComplianceStandard;
  version: string;
  certificationBody?: string;
  certificateNumber?: string;
  scope: string;
  controls: ISOControl[];
  lastAudit: string;
  nextAudit: string;
  certificationDate?: string;
  expiryDate?: string;
  status: ComplianceStatus;
  maturityLevel: ComplianceMaturityLevel;
  createdAt: string;
  updatedAt: string;
}

export interface ISOControl {
  id: string;
  isoComplianceId: string;
  controlNumber: string;
  controlName: string;
  description: string;
  category: string;
  implementationStatus: ComplianceStatus;
  evidence: ComplianceEvidence[];
  lastReviewedAt?: string;
  nextReviewAt?: string;
  assignedTo?: string;
  notes: string;
}

export interface SOC2Compliance {
  id: string;
  schoolId: string;
  type: string;
  trustServiceCriteria: SOC2TrustCriteria[];
  auditFirm?: string;
  auditPeriod: string;
  reportDate?: string;
  exceptions: SOC2Exception[];
  status: ComplianceStatus;
  nextAudit: string;
  createdAt: string;
  updatedAt: string;
}

export interface SOC2TrustCriteria {
  id: string;
  soc2ComplianceId: string;
  criteria: string;
  description: string;
  status: ComplianceStatus;
  controls: SOC2Control[];
}

export interface SOC2Control {
  id: string;
  criteriaId: string;
  controlId: string;
  name: string;
  description: string;
  implementationDetails: string;
  evidence: ComplianceEvidence[];
  testingResults: string;
  exceptions: string[];
}

export interface SOC2Exception {
  id: string;
  description: string;
  severity: RiskLevel;
  remediationPlan: string;
  targetDate: string;
  status: string;
}

export interface FERPACompliance {
  id: string;
  schoolId: string;
  directoryInformationPolicy: DirectoryInformationPolicy;
  parentalConsent: ParentalConsentRecord[];
  educationRecords: EducationRecord[];
  legitimateEducationalInterest: string[];
  annualNotification: boolean;
  lastNotificationDate?: string;
  status: ComplianceStatus;
  createdAt: string;
  updatedAt: string;
}

export interface DirectoryInformationPolicy {
  elements: string[];
  optOutProvision: boolean;
  optOutDeadline?: string;
  notificationSent: boolean;
}

export interface ParentalConsentRecord {
  id: string;
  studentId: string;
  parentId: string;
  consentType: ConsentType;
  status: ConsentStatus;
  grantedAt?: string;
  withdrawnAt?: string;
  expiryDate?: string;
}

export interface EducationRecord {
  id: string;
  studentId: string;
  recordType: string;
  classification: DataClassification;
  accessLog: EducationRecordAccess[];
  retentionPeriod: DataRetentionPeriod;
  createdAt: string;
  updatedAt: string;
}

export interface EducationRecordAccess {
  userId: string;
  accessType: string;
  purpose: string;
  accessedAt: string;
  ipAddress: string;
}

export interface COPPACompliance {
  id: string;
  schoolId: string;
  ageThreshold: number;
  parentalConsent: COPPAParentalConsent[];
  childDataCollected: ChildDataCategory[];
  verifiableParentalConsent: boolean;
  parentalRights: string[];
  dataMinimization: boolean;
  deletionProcedures: string;
  thirdPartyRestrictions: boolean;
  status: ComplianceStatus;
  createdAt: string;
  updatedAt: string;
}

export interface COPPAParentalConsent {
  id: string;
  childId: string;
  parentId: string;
  consentType: ConsentType;
  method: ConsentCollectionMethod;
  status: ConsentStatus;
  verifiedAt?: string;
  grantedAt?: string;
  withdrawnAt?: string;
}

export interface ChildDataCategory {
  category: string;
  purpose: string;
  necessary: boolean;
  thirdPartyShared: boolean;
  retentionPeriod: DataRetentionPeriod;
}

export interface DataResidency {
  id: string;
  schoolId: string;
  country: string;
  region: string;
  dataTypes: string[];
  residencyType: DataResidencyType;
  storageLocation: string;
  encryptionAtRest: EncryptionType;
  encryptionInTransit: EncryptionType;
  accessControls: AccessControlModel;
  localLaws: string[];
  restrictions: string[];
  status: ComplianceStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ConsentRecord {
  id: string;
  schoolId: string;
  userId: string;
  consentType: ConsentType;
  status: ConsentStatus;
  purpose: string;
  legalBasis: LegalBasisForProcessing;
  collectedAt: string;
  grantedAt?: string;
  withdrawnAt?: string;
  expiresAt?: string;
  method: ConsentCollectionMethod;
  version: string;
  ipAddress: string;
  userAgent: string;
  changes: ConsentChange[];
  metadata: Record<string, unknown>;
}

export interface ConsentChange {
  previousStatus: ConsentStatus;
  newStatus: ConsentStatus;
  changedAt: string;
  reason?: string;
}

export interface ConsentManagement {
  id: string;
  schoolId: string;
  policies: ConsentPolicy[];
  records: ConsentRecord[];
  withdrawalMethods: ConsentWithdrawalMethod[];
  renewalReminders: boolean;
  renewalPeriodDays: number;
  requireExplicitConsent: boolean;
  allowGranularConsent: boolean;
  status: ComplianceStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ConsentPolicy {
  id: string;
  consentType: ConsentType;
  description: string;
  version: string;
  isActive: boolean;
  requiredForService: boolean;
  allowsThirdParty: boolean;
  retentionPeriodDays: number;
  renewalRequired: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DataSovereignty {
  id: string;
  schoolId: string;
  level: SovereigntyLevel;
  country: string;
  jurisdiction: string;
  applicableLaws: string[];
  dataLocationRequirements: string[];
  crossBorderRestrictions: string[];
  governmentAccessRules: string[];
  lawfulInterception: boolean;
  encryptionRequirements: EncryptionType[];
  auditRequirements: string[];
  status: ComplianceStatus;
  lastReview: string;
  nextReview: string;
  createdAt: string;
  updatedAt: string;
}

export interface LegalHold {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  status: LegalHoldStatus;
  reason: string;
  initiatedBy: string;
  initiatedAt: string;
  releasedAt?: string;
  releaseReason?: string;
  affectedDataTypes: string[];
  affectedUsers: string[];
  custodians: LegalHoldCustodian[];
  preservationScope: string;
  instructions: string;
  createdAt: string;
  updatedAt: string;
}

export interface LegalHoldCustodian {
  userId: string;
  role: string;
  notifiedAt: string;
  acknowledgedAt?: string;
}

export interface ComplianceDashboard {
  id: string;
  schoolId: string;
  widgets: DashboardWidgetConfig[];
  overallScore: number;
  riskScore: number;
  activeIncidents: number;
  pendingActions: number;
  upcomingDeadlines: ComplianceDeadline[];
  recentActivity: ComplianceActivity[];
  frameworkStatus: FrameworkStatusSummary[];
  createdAt: string;
  updatedAt: string;
}

export interface DashboardWidgetConfig {
  widget: DashboardWidget;
  isVisible: boolean;
  position: number;
  config: Record<string, unknown>;
}

export interface ComplianceDeadline {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  type: string;
  priority: RiskLevel;
  assignedTo?: string;
}

export interface ComplianceActivity {
  id: string;
  type: string;
  description: string;
  performedBy: string;
  timestamp: string;
  details: Record<string, unknown>;
}

export interface FrameworkStatusSummary {
  framework: ComplianceFramework;
  overallStatus: ComplianceStatus;
  controlsTotal: number;
  controlsPassed: number;
  controlsFailed: number;
  controlsNotAssessed: number;
}

export interface ComplianceCheck {
  id: string;
  schoolId: string;
  standard: ComplianceStandard;
  checkType: ComplianceCheckType;
  name: string;
  description: string;
  status: ComplianceStatus;
  result?: string;
  evidence: ComplianceEvidence[];
  findings: ComplianceFinding[];
  performedAt: string;
  performedBy: string;
  nextCheckAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ComplianceEvidence {
  id: string;
  checkId: string;
  type: EvidenceType;
  title: string;
  description: string;
  fileUrl?: string;
  content?: string;
  collectedAt: string;
  collectedBy: string;
  expiryDate?: string;
}

export interface ComplianceFinding {
  id: string;
  checkId: string;
  severity: RiskLevel;
  title: string;
  description: string;
  recommendation: string;
  remediationPlan: string;
  targetDate: string;
  status: ComplianceTaskStatus;
  assignedTo?: string;
  resolvedAt?: string;
  resolvedBy?: string;
}

export interface ComplianceReport {
  id: string;
  schoolId: string;
  reportType: ComplianceReportType;
  format: ComplianceReportFormat;
  title: string;
  period: string;
  generatedAt: string;
  generatedBy: string;
  fileUrl: string;
  fileSize: number;
  summary: string;
  keyFindings: ComplianceFinding[];
  recommendations: string[];
  score: number;
  status: string;
}

export interface ComplianceConfig {
  id: string;
  schoolId: string;
  enabledStandards: ComplianceStandard[];
  assessmentFrequency: ComplianceFrequency;
  retentionPeriod: DataRetentionPeriod;
  notificationChannels: NotificationType[];
  autoRemediation: boolean;
  requireEvidence: boolean;
  riskThreshold: RiskLevel;
  frameworkMapping: ComplianceFramework[];
  customControls: CustomComplianceControl[];
  integrations: ComplianceIntegration[];
  createdAt: string;
  updatedAt: string;
}

export interface CustomComplianceControl {
  id: string;
  name: string;
  description: string;
  category: string;
  standard: ComplianceStandard;
  implementationGuide: string;
  testProcedure: string;
  frequency: ComplianceFrequency;
}

export interface ComplianceIntegration {
  id: string;
  name: string;
  type: string;
  endpoint: string;
  apiKey?: string;
  isActive: boolean;
  syncFrequency: string;
  lastSyncAt?: string;
}

export interface ComplianceMetrics {
  id: string;
  schoolId: string;
  period: string;
  overallComplianceScore: number;
  standardScores: StandardScore[];
  riskAssessment: RiskAssessmentMetrics;
  incidentMetrics: IncidentMetrics;
  trainingMetrics: TrainingMetrics;
  auditMetrics: AuditMetrics;
  dsrMetrics: DSRMetrics;
  consentMetrics: ConsentMetrics;
  vendorMetrics: VendorMetrics;
  computedAt: string;
}

export interface StandardScore {
  standard: ComplianceStandard;
  score: number;
  status: ComplianceStatus;
  controlsPassed: number;
  controlsTotal: number;
}

export interface RiskAssessmentMetrics {
  totalRisks: number;
  risksByLevel: Record<RiskLevel, number>;
  mitigatedRisks: number;
  pendingRisks: number;
  newRisksThisPeriod: number;
}

export interface IncidentMetrics {
  totalIncidents: number;
  resolvedIncidents: number;
  openIncidents: number;
  averageResolutionTime: number;
  breachesNotified: number;
}

export interface TrainingMetrics {
  totalEmployees: number;
  trainedEmployees: number;
  complianceRate: number;
  overdueCount: number;
  upcomingDeadlines: number;
}

export interface AuditMetrics {
  totalAudits: number;
  passedAudits: number;
  failedAudits: number;
  pendingAudits: number;
  nextScheduledAudit: string;
}

export interface DSRMetrics {
  totalRequests: number;
  pendingRequests: number;
  completedRequests: number;
  averageResponseTime: number;
  overdueRequests: number;
}

export interface ConsentMetrics {
  totalRecords: number;
  activeConsents: number;
  withdrawnConsents: number;
  pendingConsents: number;
  expiringSoon: number;
}

export interface VendorMetrics {
  totalVendors: number;
  assessedVendors: number;
  highRiskVendors: number;
  pendingAssessments: number;
  expiredAssessments: number;
}

export interface DataSubjectRequest {
  id: string;
  schoolId: string;
  userId: string;
  requestType: DataSubjectRequestType;
  status: DataSubjectRequestStatus;
  description: string;
  identityVerified: boolean;
  verifiedAt?: string;
  deadline: string;
  response?: string;
  completedAt?: string;
  extendedUntil?: string;
  assignedTo?: string;
  communications: DSRCommunication[];
  createdAt: string;
  updatedAt: string;
}

export interface DSRCommunication {
  id: string;
  dsrId: string;
  direction: string;
  content: string;
  sentAt: string;
  sentBy: string;
}

export interface VendorRiskAssessment {
  id: string;
  schoolId: string;
  vendorName: string;
  vendorContact: string;
  servicesProvided: string[];
  dataAccessed: string[];
  riskLevel: VendorRiskLevel;
  status: VendorStatus;
  assessedAt: string;
  expiresAt: string;
  questionnaires: VendorQuestionnaire[];
  certifications: VendorCertification[];
  contractTerms: string[];
  dpiaRequired: boolean;
  dpiaCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VendorQuestionnaire {
  id: string;
  vendorRiskAssessmentId: string;
  questions: VendorQuestion[];
  completedAt?: string;
  score: number;
}

export interface VendorQuestion {
  question: string;
  answer: string;
  riskScore: number;
}

export interface VendorCertification {
  name: string;
  number: string;
  issuedAt: string;
  expiresAt: string;
  issuingBody: string;
}

export interface DataRetentionPolicy {
  id: string;
  schoolId: string;
  dataCategory: string;
  classification: DataClassification;
  retentionPeriod: DataRetentionPeriod;
  retentionDays: number;
  action: RetentionAction;
  legalRequirement: string;
  exceptionHandling: string;
  reviewFrequency: ComplianceFrequency;
  lastReviewedAt?: string;
  nextReviewAt?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BreachNotificationProcedure {
  id: string;
  schoolId: string;
  notificationWindow: number;
  regulatoryAuthority: RegulatoryBody;
  notificationChannels: BreachNotificationChannel[];
  internalEscalation: string[];
  externalEscalation: string[];
  documentationRequirements: string[];
  postBreachReview: boolean;
  templateUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ComplianceIncident {
  id: string;
  schoolId: string;
  type: IncidentType;
  severity: BreachSeverity;
  status: BreachStatus;
  title: string;
  description: string;
  detectedAt: string;
  containedAt?: string;
  investigatedAt?: string;
  notifiedAt?: string;
  resolvedAt?: string;
  closedAt?: string;
  reportedBy: string;
  assignedTo?: string;
  affectedRecords: number;
  affectedUsers: string[];
  dataCategories: string[];
  rootCause: string;
  remediation: string;
  lessonsLearned: string;
  communications: IncidentCommunication[];
  attachments: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IncidentCommunication {
  id: string;
  incidentId: string;
  channel: BreachNotificationChannel;
  recipient: string;
  content: string;
  sentAt: string;
  sentBy: string;
}

export interface ComplianceTraining {
  id: string;
  schoolId: string;
  title: string;
  description: string;
  standard: ComplianceStandard;
  requiredForRoles: string[];
  contentUrl: string;
  durationMinutes: number;
  passingScore: number;
  validForDays: number;
  isMandatory: boolean;
  enrollments: TrainingEnrollment[];
  createdAt: string;
  updatedAt: string;
}

export interface TrainingEnrollment {
  id: string;
  trainingId: string;
  userId: string;
  status: TrainingStatus;
  enrolledAt: string;
  startedAt?: string;
  completedAt?: string;
  score?: number;
  expiresAt?: string;
  certificateUrl?: string;
}

export interface AnonymizationRecord {
  id: string;
  schoolId: string;
  originalDataId: string;
  method: AnonymizationMethod;
  anonymizedDataId: string;
  reversibility: boolean;
  verifiedAt?: string;
  verifiedBy?: string;
  createdAt: string;
}

export interface CompliancePolicy {
  id: string;
  schoolId: string;
  type: PolicyType;
  title: string;
  content: string;
  version: string;
  status: PolicyStatus;
  templateType: PolicyTemplateType;
  owner: string;
  approvedBy?: string;
  approvedAt?: string;
  effectiveDate: string;
  reviewDate: string;
  expiryDate?: string;
  changeLog: PolicyChangeLog[];
  acknowledgmentRequired: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PolicyChangeLog {
  version: string;
  changedBy: string;
  changedAt: string;
  changes: string;
  reason: string;
}

export interface ComplianceTask {
  id: string;
  schoolId: string;
  workflowType: ComplianceWorkflowType;
  workflowId: string;
  title: string;
  description: string;
  status: ComplianceTaskStatus;
  priority: RiskLevel;
  assignedTo?: string;
  dueDate: string;
  completedAt?: string;
  dependencies: string[];
  checklist: ComplianceChecklistItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ComplianceChecklistItem {
  id: string;
  taskId: string;
  title: string;
  isCompleted: boolean;
  completedBy?: string;
  completedAt?: string;
  evidence?: ComplianceEvidence;
}

export interface ComplianceWorkflow {
  id: string;
  schoolId: string;
  type: ComplianceWorkflowType;
  name: string;
  description: string;
  status: ComplianceWorkflowStatus;
  initiatedBy: string;
  initiatedAt: string;
  completedAt?: string;
  steps: ComplianceWorkflowStep[];
  metadata: Record<string, unknown>;
}

export interface ComplianceWorkflowStep {
  stepNumber: number;
  name: string;
  assignee: string;
  status: ComplianceWorkflowStatus;
  startedAt?: string;
  completedAt?: string;
  notes: string;
}

export interface DataMapping {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  status: DataMappingStatus;
  dataFlows: DataFlow[];
  systems: DataSystem[];
  lastUpdated: string;
  createdAt: string;
}

export interface DataFlow {
  id: string;
  dataMappingId: string;
  name: string;
  source: string;
  destination: string;
  dataType: string;
  legalBasis: LegalBasisForProcessing;
  encryption: boolean;
  crossBorderTransfer: boolean;
}

export interface DataSystem {
  id: string;
  dataMappingId: string;
  name: string;
  type: string;
  owner: string;
  dataCategories: string[];
  location: string;
  accessControls: string[];
}

export interface ComplianceAlert {
  id: string;
  schoolId: string;
  type: string;
  severity: RiskLevel;
  title: string;
  message: string;
  source: string;
  acknowledgedAt?: string;
  acknowledgedBy?: string;
  expiresAt?: string;
  createdAt: string;
}

export interface ComplianceReminder {
  id: string;
  schoolId: string;
  type: string;
  title: string;
  description: string;
  dueDate: string;
  assignedTo: string;
  sentAt?: string;
  acknowledgedAt?: string;
  recurring: boolean;
  recurringFrequency?: ComplianceFrequency;
}
