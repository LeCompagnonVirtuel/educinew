export enum ConsentStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
  PENDING = "PENDING",
  DENIED = "DENIED",
  WITHDRAWN = "WITHDRAWN",
  SUSPENDED = "SUSPENDED",
  GRANTED = "GRANTED",
  CONDITIONAL = "CONDITIONAL",
  UNKNOWN = "UNKNOWN",
}

export enum ConsentType {
  EXPLICIT = "EXPLICIT",
  IMPLICIT = "IMPLICIT",
  OPT_IN = "OPT_IN",
  OPT_OUT = "OPT_OUT",
  BUNDLED = "BUNDLED",
  GRANULAR = "GRANULAR",
  BLANKET = "BLANKET",
  PARENTAL = "PARENTAL",
  GUARDIAN = "GUARDIAN",
  INSTITUTIONAL = "INSTITUTIONAL",
}

export enum DataClassification {
  PUBLIC = "PUBLIC",
  INTERNAL = "INTERNAL",
  CONFIDENTIAL = "CONFIDENTIAL",
  RESTRICTED = "RESTRICTED",
  SENSITIVE = "SENSITIVE",
  HIGHLY_SENSITIVE = "HIGHLY_SENSITIVE",
  PERSONAL = "PERSONAL",
  ANONYMIZED = "ANONYMIZED",
  PSEUDONYMIZED = "PSEUDONYMIZED",
  ENCRYPTED = "ENCRYPTED",
}

export enum OwnershipType {
  INDIVIDUAL = "INDIVIDUAL",
  INSTITUTIONAL = "INSTITUTIONAL",
  GOVERNMENTAL = "GOVERNMENTAL",
  SHARED = "SHARED",
  COLLECTIVE = "COLLECTIVE",
  THIRD_PARTY = "THIRD_PARTY",
  VENDOR = "VENDOR",
  PUBLIC = "PUBLIC",
  OPEN = "OPEN",
  RESTRICTED = "RESTRICTED",
}

export enum SharingScope {
  NONE = "NONE",
  INTERNAL = "INTERNAL",
  INSTITUTION = "INSTITUTION",
  REGIONAL = "REGIONAL",
  NATIONAL = "NATIONAL",
  INTERNATIONAL = "INTERNATIONAL",
  PUBLIC = "PUBLIC",
  PARTNERS = "PARTNERS",
  REGULATORS = "REGULATORS",
  RESEARCHERS = "RESEARCHERS",
}

export enum AccessRequestType {
  READ = "READ",
  WRITE = "WRITE",
  EXPORT = "EXPORT",
  DELETE = "DELETE",
  MODIFY = "MODIFY",
  SHARE = "SHARE",
  RESTORE = "RESTORE",
  ANONYMIZE = "ANONYMIZE",
  RECTIFY = "RECTIFY",
  PORT = "PORT",
}

export enum AccessRequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  DENIED = "DENIED",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELLED",
  ESCALATED = "ESCALATED",
  PARTIALLY_FULFILLED = "PARTIALLY_FULFILLED",
  UNDER_REVIEW = "UNDER_REVIEW",
}

export enum RetentionPeriod {
  NONE = "NONE",
  THIRTY_DAYS = "THIRTY_DAYS",
  NINETY_DAYS = "NINETY_DAYS",
  ONE_YEAR = "ONE_YEAR",
  THREE_YEARS = "THREE_YEARS",
  FIVE_YEARS = "FIVE_YEARS",
  SEVEN_YEARS = "SEVEN_YEARS",
  TEN_YEARS = "TEN_YEARS",
  TWENTY_YEARS = "TWENTY_YEARS",
  INDEFINITE = "INDEFINITE",
}

export enum ResidencyType {
  LOCAL = "LOCAL",
  NATIONAL = "NATIONAL",
  REGIONAL = "REGIONAL",
  CONTINENTAL = "CONTINENTAL",
  GLOBAL = "GLOBAL",
  CLOUD_SPECIFIC = "CLOUD_SPECIFIC",
  ON_PREMISE = "ON_PREMISE",
  HYBRID = "HYBRID",
  CROSS_BORDER = "CROSS_BORDER",
  BORDERLESS = "BORDERLESS",
}

export enum SovereigntyLevel {
  FULL = "FULL",
  PARTIAL = "PARTIAL",
  SHARED = "SHARED",
  DELEGATED = "DELEGATED",
  COOPERATIVE = "COOPERATIVE",
  NONE = "NONE",
  EMERGING = "EMERGING",
  TEMPORARY = "TEMPORARY",
  CONDITIONAL = "CONDITIONAL",
  EXEMPTED = "EXEMPTED",
}

export enum PurposeType {
  EDUCATION = "EDUCATION",
  RESEARCH = "RESEARCH",
  ADMINISTRATION = "ADMINISTRATION",
  COMMUNICATION = "COMMUNICATION",
  ANALYTICS = "ANALYTICS",
  MARKETING = "MARKETING",
  LEGAL = "LEGAL",
  FINANCIAL = "FINANCIAL",
  HEALTH = "HEALTH",
  SECURITY = "SECURITY",
}

export enum LineageType {
  SYSTEM = "SYSTEM",
  MANUAL = "MANUAL",
  AUTOMATED = "AUTOMATED",
  DERIVED = "DERIVED",
  AGGREGATED = "AGGREGATED",
  TRANSFORMED = "TRANSFORMED",
  COPIED = "COPIED",
  REFERENCED = "REFERENCED",
  INHERITED = "INHERITED",
  INFERRED = "INFERRED",
}

export enum RegulationType {
  GDPR = "GDPR",
  FERPA = "FERPA",
  COPPA = "COPPA",
  ISO_27001 = "ISO_27001",
  SOC_2 = "SOC_2",
  HIPAA = "HIPAA",
  PCI_DSS = "PCI_DSS",
  LGPD = "LGPD",
  POPIA = "POPIA",
  NATIONAL_EDUCATION = "NATIONAL_EDUCATION",
}

export enum ComplianceSeverity {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  INFORMATIONAL = "INFORMATIONAL",
}

export enum ComplianceStatus {
  COMPLIANT = "COMPLIANT",
  NON_COMPLIANT = "NON_COMPLIANT",
  PARTIALLY_COMPLIANT = "PARTIALLY_COMPLIANT",
  UNDER_REVIEW = "UNDER_REVIEW",
  EXEMPT = "EXEMPT",
  IN_PROGRESS = "IN_PROGRESS",
  PENDING_ASSESSMENT = "PENDING_ASSESSMENT",
  WAIVED = "WAIVED",
  DEFERRED = "DEFERRED",
  NOT_APPLICABLE = "NOT_APPLICABLE",
}

export enum ExportFormat {
  JSON = "JSON",
  CSV = "CSV",
  XML = "XML",
  PDF = "PDF",
  XLSX = "XLSX",
  PARQUET = "PARQUET",
  AVRO = "AVRO",
  ORC = "ORC",
  CUSTOM = "CUSTOM",
}

export enum ExportStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
  DOWNLOADING = "DOWNLOADING",
  ENCRYPTED = "ENCRYPTED",
}

export enum DeletionType {
  SOFT = "SOFT",
  HARD = "HARD",
  ANONYMIZATION = "ANONYMIZATION",
  PSEUDONYMIZATION = "PSEUDONYMIZATION",
  CRYPTOGRAPHIC = "CRYPTOGRAPHIC",
  SECURE_WIPE = "SECURE_WIPE",
  OVERWRITE = "OVERWRITE",
  SELECTIVE = "SELECTIVE",
}

export enum DeletionStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  PARTIAL = "PARTIAL",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  VERIFIED = "VERIFIED",
}

export enum DataRetentionAction {
  ARCHIVE = "ARCHIVE",
  DELETE = "DELETE",
  ANONYMIZE = "ANONYMIZE",
  RESTRICT = "RESTRICT",
  MIGRATE = "MIGRATE",
  FREEZE = "FREEZE",
  PURGE = "PURGE",
  TRANSFER = "TRANSFER",
}

export enum ConsentMethod {
  WEB_FORM = "WEB_FORM",
  MOBILE_APP = "MOBILE_APP",
  EMAIL = "EMAIL",
  SMS = "SMS",
  IN_PERSON = "IN_PERSON",
  API = "API",
  PAPER = "PAPER",
  VERBAL = "VERBAL",
  DIGITAL_SIGNATURE = "DIGITAL_SIGNATURE",
  QR_CODE = "QR_CODE",
}

export enum DataSubjectType {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  PARENT = "PARENT",
  STAFF = "STAFF",
  ALUMNI = "ALUMNI",
  APPLICANT = "APPLICANT",
  RESEARCHER = "RESEARCHER",
  THIRD_PARTY = "THIRD_PARTY",
  MINOR = "MINOR",
  GUARDIAN = "GUARDIAN",
}

export enum LegalBasisType {
  CONSENT = "CONSENT",
  CONTRACT = "CONTRACT",
  LEGAL_OBLIGATION = "LEGAL_OBLIGATION",
  VITAL_INTERESTS = "VITAL_INTERESTS",
  PUBLIC_TASK = "PUBLIC_TASK",
  LEGITIMATE_INTEREST = "LEGITIMATE_INTEREST",
  EDUCATIONAL_PURPOSE = "EDUCATIONAL_PURPOSE",
  RESEARCH_EXEMPTION = "RESEARCH_EXEMPTION",
}

export enum GovernanceActionType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  ACCESS = "ACCESS",
  SHARE = "SHARE",
  EXPORT = "EXPORT",
  RESTORE = "RESTORE",
  AUDIT = "AUDIT",
  REVIEW = "REVIEW",
  APPROVE = "APPROVE",
}

export enum NotificationChannel {
  EMAIL = "EMAIL",
  SMS = "SMS",
  PUSH = "PUSH",
  IN_APP = "IN_APP",
  WEBHOOK = "WEBHOOK",
  DASHBOARD = "DASHBOARD",
}

export enum AuditAction {
  CREATE = "CREATE",
  READ = "READ",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  EXPORT = "EXPORT",
  SHARE = "SHARE",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  FAILED_ACCESS = "FAILED_ACCESS",
  PERMISSION_CHANGE = "PERMISSION_CHANGE",
}

export enum DataResidencyJurisdiction {
  EU = "EU",
  US = "US",
  AFRICA = "AFRICA",
  ASIA_PACIFIC = "ASIA_PACIFIC",
  LATIN_AMERICA = "LATIN_AMERICA",
  MIDDLE_EAST = "MIDDLE_EAST",
  NATIONAL = "NATIONAL",
}

export enum ConsentVersionStatus {
  DRAFT = "DRAFT",
  CURRENT = "CURRENT",
  SUPERSEDED = "SUPERSEDED",
  ARCHIVED = "ARCHIVED",
}

export enum DataPurposeCategory {
  CORE_EDUCATION = "CORE_EDUCATION",
  STUDENT_SERVICES = "STUDENT_SERVICES",
  INSTITUTIONAL_RESEARCH = "INSTITUTIONAL_RESEARCH",
  GOVERNMENT_REPORTING = "GOVERNMENT_REPORTING",
  COMMERCIAL = "COMMERCIAL",
  THIRD_PARTY_SHARING = "THIRD_PARTY_SHARING",
  MARKETING = "MARKETING",
  PROFILING = "PROFILING",
  AUTOMATED_DECISION = "AUTOMATED_DECISION",
  CROSS_BORDER_TRANSFER = "CROSS_BORDER_TRANSFER",
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
  NOTIFIED = "NOTIFIED",
  RESOLVED = "RESOLVED",
  UNDER_INVESTIGATION = "UNDER_INVESTIGATION",
}

export enum EncryptionType {
  AES_256 = "AES_256",
  AES_128 = "AES_128",
  RSA_2048 = "RSA_2048",
  RSA_4096 = "RSA_4096",
  CHACHA20 = "CHACHA20",
  NONE = "NONE",
}

export enum AnonymizationTechnique {
  K_ANONYMITY = "K_ANONYMITY",
  L_DIVERSITY = "L_DIVERSITY",
  T_CLOSENESS = "T_CLOSENESS",
  GENERALIZATION = "GENERALIZATION",
  SUPPRESSION = "SUPPRESSION",
  PERTURBATION = "PERTURBATION",
  NOISE_ADDITION = "NOISE_ADDITION",
  DATA_MASKING = "DATA_MASKING",
}

export enum ConsentScope {
  ALL_DATA = "ALL_DATA",
  SPECIFIC_DATA = "SPECIFIC_DATA",
  CATEGORY = "CATEGORY",
  PURPOSE_BASED = "PURPOSE_BASED",
  TIME_LIMITED = "TIME_LIMITED",
  GEOGRAPHIC = "GEOGRAPHIC",
  CONDITIONAL = "CONDITIONAL",
}

export enum DataProvenance {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
  DERIVED = "DERIVED",
  EXTERNAL = "EXTERNAL",
  PUBLIC = "PUBLIC",
  USER_GENERATED = "USER_GENERATED",
  SYSTEM_GENERATED = "SYSTEM_GENERATED",
}

export enum GovernancePolicyType {
  ACCESS = "ACCESS",
  RETENTION = "RETENTION",
  QUALITY = "QUALITY",
  SECURITY = "SECURITY",
  PRIVACY = "PRIVACY",
  COMPLIANCE = "COMPLIANCE",
  ARCHIVAL = "ARCHIVAL",
  MIGRATION = "MIGRATION",
}

export enum RetentionTrigger {
  TIME_BASED = "TIME_BASED",
  EVENT_BASED = "EVENT_BASED",
  PURPOSE_COMPLETED = "PURPOSE_COMPLETED",
  CONSENT_REVOKED = "CONSENT_REVOKED",
  LEGAL_HOLD = "LEGAL_HOLD",
  REGULATORY = "REGULATORY",
}

export enum DataClassificationLabel {
  UNCLASSIFIED = "UNCLASSIFIED",
  OFFICIAL = "OFFICIAL",
  OFFICIAL_SENSITIVE = "OFFICIAL_SENSITIVE",
  SECRET = "SECRET",
  TOP_SECRET = "TOP_SECRET",
  PERSONAL_PRIVATE = "PERSONAL_PRIVATE",
  PERSONAL_CONFIDENTIAL = "PERSONAL_CONFIDENTIAL",
}

export enum ConsentNotificationType {
  NEW_CONSENT = "NEW_CONSENT",
  CONSENT_UPDATED = "CONSENT_UPDATED",
  CONSENT_REVOKED = "CONSENT_REVOKED",
  CONSENT_EXPIRED = "CONSENT_EXPIRED",
  CONSENT_REMINDER = "CONSENT_REMINDER",
  POLICY_CHANGE = "POLICY_CHANGE",
}

export enum GovernanceRole {
  DATA_CONTROLLER = "DATA_CONTROLLER",
  DATA_PROCESSOR = "DATA_PROCESSOR",
  DATA_STEWARD = "DATA_STEWARD",
  DATA_OWNER = "DATA_OWNER",
  DATA_CUSTODIAN = "DATA_CUSTODIAN",
  PRIVACY_OFFICER = "PRIVACY_OFFICER",
  COMPLIANCE_OFFICER = "COMPLIANCE_OFFICER",
  DPO = "DPO",
}

export enum DataTransferMechanism {
  STANDARD_CONTRACTUAL_CLAUSES = "STANDARD_CONTRACTUAL_CLAUSES",
  BINDING_CORPORATE_RULES = "BINDING_CORPORATE_RULES",
  ADEQUACY_DECISION = "ADEQUACY_DECISION",
  CONSENT = "CONTRACT",
  NECESSITY = "NECESSITY",
  PUBLIC_INTEREST = "PUBLIC_INTEREST",
  LEGAL_CLAIM = "LEGAL_CLAIM",
}

export interface ConsentRecord {
  id: string;
  subjectId: string;
  subjectType: DataSubjectType;
  consentType: ConsentType;
  status: ConsentStatus;
  scope: ConsentScope;
  purposes: PurposeType[];
  dataCategories: string[];
  thirdParties: string[];
  grantedAt: Date;
  expiresAt: Date | null;
  revokedAt: Date | null;
  version: string;
  method: ConsentMethod;
  ipAddress: string | null;
  userAgent: string | null;
  location: string | null;
  verificationMethod: string | null;
  legalBasis: LegalBasisType;
  metadata: Record<string, unknown>;
}

export interface ConsentManagement {
  records: ConsentRecord[];
  totalActive: number;
  totalRevoked: number;
  totalExpired: number;
  pendingReview: number;
  lastSyncedAt: Date;
  config: ConsentManagementConfig;
}

export interface ConsentManagementConfig {
  defaultRetentionPeriod: RetentionPeriod;
  requireExplicitConsent: boolean;
  allowBundledConsent: boolean;
  parentalConsentRequired: boolean;
  consentAge: number;
  renewalReminderDays: number;
  maxConsentDuration: number;
  allowWithdrawal: boolean;
  notificationChannels: NotificationChannel[];
  auditEnabled: boolean;
}

export interface DataOwnership {
  id: string;
  dataId: string;
  dataType: string;
  ownerId: string;
  ownerType: OwnershipType;
  institutionId: string;
  schoolId: string;
  grantedAt: Date;
  expiresAt: Date | null;
  transferable: boolean;
  rights: DataRight[];
  restrictions: DataRestriction[];
  metadata: Record<string, unknown>;
}

export interface DataRight {
  id: string;
  type: string;
  granted: boolean;
  conditions: string[];
  expiryDate: Date | null;
  transferable: boolean;
}

export interface DataRestriction {
  id: string;
  type: string;
  description: string;
  exceptions: string[];
  enforced: boolean;
}

export interface DataSharing {
  id: string;
  sourceId: string;
  targetId: string;
  scope: SharingScope;
  dataCategories: string[];
  purposes: PurposeType[];
  legalBasis: LegalBasisType;
  conditions: DataSharingCondition[];
  startedAt: Date;
  endsAt: Date | null;
  active: boolean;
  auditTrail: DataSharingAuditEntry[];
}

export interface DataSharingCondition {
  id: string;
  type: string;
  description: string;
  enforceable: boolean;
}

export interface DataSharingAuditEntry {
  id: string;
  action: string;
  performedBy: string;
  performedAt: Date;
  details: Record<string, unknown>;
}

export interface DataAccessRequest {
  id: string;
  subjectId: string;
  subjectType: DataSubjectType;
  requestType: AccessRequestType;
  status: AccessRequestStatus;
  dataCategories: string[];
  description: string;
  submittedAt: Date;
  deadline: Date;
  fulfilledAt: Date | null;
  responseNotes: string | null;
  verificationMethod: string;
  identityVerified: boolean;
  institutionId: string;
  assignedTo: string | null;
  metadata: Record<string, unknown>;
}

export interface DataExport {
  id: string;
  requestId: string;
  subjectId: string;
  format: ExportFormat;
  status: ExportStatus;
  dataCategories: string[];
  recordCount: number;
  fileSize: number | null;
  encryptionType: EncryptionType;
  downloadUrl: string | null;
  expiresAt: Date | null;
  requestedAt: Date;
  completedAt: Date | null;
  metadata: Record<string, unknown>;
}

export interface DataDeletion {
  id: string;
  subjectId: string;
  deletionType: DeletionType;
  status: DeletionStatus;
  dataCategories: string[];
  affectedRecords: number;
  verifiedAt: Date | null;
  requestedAt: Date;
  completedAt: Date | null;
  retainedData: string[];
  retentionReason: string | null;
  metadata: Record<string, unknown>;
}

export interface DataRetention {
  id: string;
  dataType: string;
  category: string;
  retentionPeriod: RetentionPeriod;
  trigger: RetentionTrigger;
  action: DataRetentionAction;
  policyId: string;
  institutionId: string;
  active: boolean;
  lastReviewDate: Date;
  nextReviewDate: Date;
  metadata: Record<string, unknown>;
}

export interface DataRetentionPolicy {
  id: string;
  name: string;
  description: string;
  dataTypes: string[];
  retentionPeriod: RetentionPeriod;
  action: DataRetentionAction;
  legalBasis: LegalBasisType;
  status: ComplianceStatus;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DataResidency {
  id: string;
  institutionId: string;
  jurisdiction: DataResidencyJurisdiction;
  residencyType: ResidencyType;
  dataCategories: string[];
  storageLocations: StorageLocation[];
  crossBorderAllowed: boolean;
  transferMechanisms: DataTransferMechanism[];
  certifications: string[];
  lastAuditDate: Date;
  metadata: Record<string, unknown>;
}

export interface StorageLocation {
  id: string;
  provider: string;
  region: string;
  country: string;
  jurisdiction: DataResidencyJurisdiction;
  encryptionEnabled: boolean;
  certified: boolean;
  certifications: string[];
}

export interface DataSovereignty {
  id: string;
  institutionId: string;
  country: string;
  sovereigntyLevel: SovereigntyLevel;
  dataCategories: string[];
  localProcessingRequired: boolean;
  localStorageRequired: boolean;
  governmentAccessPolicy: string;
  emergencyAccessProtocol: string;
  complianceFramework: string[];
  lastAssessmentDate: Date;
  metadata: Record<string, unknown>;
}

export interface PurposeLimitation {
  id: string;
  purpose: PurposeType;
  description: string;
  dataCategories: string[];
  legalBasis: LegalBasisType;
  retentionPeriod: RetentionPeriod;
  thirdPartySharing: boolean;
  allowedRecipients: string[];
  restrictions: string[];
  reviewFrequency: number;
  lastReviewed: Date;
  active: boolean;
}

export interface ConsentHistory {
  id: string;
  consentRecordId: string;
  action: ConsentNotificationType;
  previousStatus: ConsentStatus;
  newStatus: ConsentStatus;
  performedBy: string;
  performedAt: Date;
  reason: string | null;
  ipAddress: string | null;
  metadata: Record<string, unknown>;
}

export interface DataLineageEntry {
  id: string;
  sourceSystem: string;
  targetSystem: string;
  dataType: string;
  lineageType: LineageType;
  transformation: string | null;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  metadata: Record<string, unknown>;
}

export interface DataLineage {
  id: string;
  dataId: string;
  entries: DataLineageEntry[];
  upstream: string[];
  downstream: string[];
  lastTracedAt: Date;
  completeness: number;
}

export interface DataClassificationRule {
  id: string;
  name: string;
  pattern: string;
  classification: DataClassification;
  label: DataClassificationLabel;
  autoApply: boolean;
  priority: number;
  active: boolean;
  metadata: Record<string, unknown>;
}

export interface ComplianceRule {
  id: string;
  regulation: RegulationType;
  name: string;
  description: string;
  category: string;
  severity: ComplianceSeverity;
  status: ComplianceStatus;
  requirements: ComplianceRequirement[];
  assessmentFrequency: number;
  lastAssessed: Date;
  nextAssessment: Date;
  metadata: Record<string, unknown>;
}

export interface ComplianceRequirement {
  id: string;
  description: string;
  implemented: boolean;
  evidence: string[];
  lastVerified: Date;
  responsible: string;
}

export interface GovernanceConfig {
  id: string;
  institutionId: string;
  defaultJurisdiction: DataResidencyJurisdiction;
  defaultSovereigntyLevel: SovereigntyLevel;
  consentManagement: ConsentManagementConfig;
  retentionPolicies: DataRetentionPolicy[];
  classificationRules: DataClassificationRule[];
  complianceRules: ComplianceRule[];
  notificationChannels: NotificationChannel[];
  auditEnabled: boolean;
  dpoContact: string | null;
  privacyOfficerContact: string | null;
  breachNotificationWindow: number;
  dataSubjectRequestWindow: number;
  metadata: Record<string, unknown>;
}

export interface GovernanceMetrics {
  totalConsents: number;
  activeConsents: number;
  revokedConsents: number;
  expiredConsents: number;
  pendingRequests: number;
  completedRequests: number;
  deniedRequests: number;
  averageResponseTime: number;
  complianceScore: number;
  dataBreaches: number;
  openBreaches: number;
  resolvedBreaches: number;
  totalDataSubjects: number;
  dataExports: number;
  dataDeletions: number;
  retentionViolations: number;
  auditEvents: number;
  lastCalculatedAt: Date;
}

export interface DataBreach {
  id: string;
  description: string;
  severity: BreachSeverity;
  status: BreachStatus;
  affectedDataCategories: string[];
  affectedSubjects: number;
  detectedAt: Date;
  containedAt: Date | null;
  notifiedAt: Date | null;
  resolvedAt: Date | null;
  notificationDeadline: Date;
  rootCause: string | null;
  remediation: string | null;
  regulatorNotified: boolean;
  subjectsNotified: boolean;
  metadata: Record<string, unknown>;
}

export interface ConsentRenewal {
  id: string;
  consentRecordId: string;
  renewalType: ConsentType;
  sentAt: Date;
  respondedAt: Date | null;
  status: ConsentStatus;
  metadata: Record<string, unknown>;
}

export interface DataSubjectActivity {
  id: string;
  subjectId: string;
  subjectType: DataSubjectType;
  activityType: GovernanceActionType;
  dataType: string;
  timestamp: Date;
  ipAddress: string | null;
  details: Record<string, unknown>;
}

export interface GovernanceAuditLog {
  id: string;
  action: AuditAction;
  actorId: string;
  actorType: GovernanceRole;
  resourceType: string;
  resourceId: string;
  details: Record<string, unknown>;
  timestamp: Date;
  ipAddress: string | null;
  outcome: string;
  schoolId: string;
  institutionId: string;
}

export interface DataProcessingRecord {
  id: string;
  purpose: PurposeType;
  dataType: string;
  dataSubjectType: DataSubjectType;
  legalBasis: LegalBasisType;
  retentionPeriod: RetentionPeriod;
  thirdParties: string[];
  crossBorderTransfer: boolean;
  transferMechanism: DataTransferMechanism | null;
  safeguards: string[];
  active: boolean;
  metadata: Record<string, unknown>;
}

export interface PrivacyImpactAssessment {
  id: string;
  name: string;
  description: string;
  status: ComplianceStatus;
  dataTypes: string[];
  purposes: PurposeType[];
  risks: PiaRisk[];
  mitigations: string[];
  assessor: string;
  reviewedBy: string | null;
  createdAt: Date;
  completedAt: Date | null;
  nextReview: Date;
  metadata: Record<string, unknown>;
}

export interface PiaRisk {
  id: string;
  description: string;
  likelihood: string;
  impact: string;
  severity: ComplianceSeverity;
  mitigation: string;
  residualRisk: string;
}

export interface DataProtectionOfficer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  institutionId: string;
  appointmentDate: Date;
  termEndDate: Date | null;
  certifications: string[];
  responsibilities: string[];
  active: boolean;
}

export interface ConsentTemplate {
  id: string;
  name: string;
  description: string;
  consentType: ConsentType;
  version: string;
  status: ConsentVersionStatus;
  language: string;
  content: string;
  purposes: PurposeType[];
  dataCategories: string[];
  validFrom: Date;
  validUntil: Date | null;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DataGovernanceReport {
  id: string;
  reportType: string;
  period: string;
  generatedAt: Date;
  generatedBy: string;
  institutionId: string;
  summary: GovernanceMetrics;
  details: Record<string, unknown>;
  recommendations: string[];
  metadata: Record<string, unknown>;
}

export enum ConsentChannel {
  WEB = "WEB",
  MOBILE = "MOBILE",
  EMAIL = "EMAIL",
  SMS = "SMS",
  IN_PERSON = "IN_PERSON",
  API = "API",
  PAPER = "PAPER",
  QR_CODE = "QR_CODE",
  VOICE = "VOICE",
  CHATBOT = "CHATBOT",
}

export enum DataRetentionScope {
  ALL = "ALL",
  PERSONAL = "PERSONAL",
  SENSITIVE = "SENSITIVE",
  FINANCIAL = "FINANCIAL",
  HEALTH = "HEALTH",
  EDUCATIONAL = "EDUCATIONAL",
  BEHAVIORAL = "BEHAVIORAL",
  BIOMETRIC = "BIOMETRIC",
}

export enum GovernanceReviewCycle {
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  SEMI_ANNUAL = "SEMI_ANNUAL",
  ANNUAL = "ANNUAL",
  ON_DEMAND = "ON_DEMAND",
}

export enum DataSubjectRight {
  ACCESS = "ACCESS",
  RECTIFICATION = "RECTIFICATION",
  ERASURE = "ERASURE",
  RESTRICTION = "RESTRICTION",
  PORTABILITY = "PORTABILITY",
  OBJECTION = "OBJECTION",
  OPT_OUT = "OPT_OUT",
  CONSENT_WITHDRAWAL = "CONSENT_WITHDRAWAL",
}

export enum ConsentPolicyScope {
  INSTITUTION = "INSTITUTION",
  SCHOOL = "SCHOOL",
  DEPARTMENT = "DEPARTMENT",
  CLASS = "CLASS",
  INDIVIDUAL = "INDIVIDUAL",
}

export enum DataRetentionCategory {
  STUDENT_RECORDS = "STUDENT_RECORDS",
  TEACHER_RECORDS = "TEACHER_RECORDS",
  FINANCIAL_RECORDS = "FINANCIAL_RECORDS",
  HEALTH_RECORDS = "HEALTH_RECORDS",
  COMMUNICATION_LOGS = "COMMUNICATION_LOGS",
  SYSTEM_LOGS = "SYSTEM_LOGS",
  ANALYTICS_DATA = "ANALYTICS_DATA",
  BACKUP_DATA = "BACKUP_DATA",
}

export enum GovernanceRiskLevel {
  VERY_LOW = "VERY_LOW",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
  CRITICAL = "CRITICAL",
}

export enum ConsentVerificationMethod {
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
  SMS_VERIFICATION = "SMS_VERIFICATION",
  IDENTITY_DOCUMENT = "IDENTITY_DOCUMENT",
  BIOMETRIC = "BIOMETRIC",
  DIGITAL_SIGNATURE = "DIGITAL_SIGNATURE",
  TWO_FACTOR = "TWO_FACTOR",
}

export enum DataGovernanceFramework {
  GDPR = "GDPR",
  FERPA = "FERPA",
  COPPA = "COPPA",
  CCPA = "CCPA",
  POPIA = "POPIA",
  LGPD = "LGPD",
  HIPAA = "HIPAA",
  ISO_27001 = "ISO_27001",
  SOC_2 = "SOC_2",
  LOCAL_REGULATION = "LOCAL_REGULATION",
}

export enum BreachNotificationChannel {
  EMAIL = "EMAIL",
  SMS = "SMS",
  PORTAL = "PORTAL",
  REGULATOR = "REGULATOR",
  PUBLIC_DISCLOSURE = "PUBLIC_DISCLOSURE",
  INTERNAL = "INTERNAL",
}

export enum DataProtectionImpactLevel {
  MINIMAL = "MINIMAL",
  LOW = "LOW",
  MODERATE = "MODERATE",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
}

export enum ConsentRenewalMethod {
  AUTOMATIC = "AUTOMATIC",
  MANUAL = "MANUAL",
  PROMPTED = "PROMPTED",
  GRADUAL = "GRADUAL",
}

export enum DataSovereigntyRequirement {
  LOCAL_ONLY = "LOCAL_ONLY",
  REGIONAL_PREFERRED = "REGIONAL_PREFERRED",
  CROSS_BORDER_ALLOWED = "CROSS_BORDER_ALLOWED",
  GOVERNMENT_APPROVED = "GOVERNMENT_APPROVED",
  CERTIFIED_PROVIDER = "CERTIFIED_PROVIDER",
}

export enum GovernanceAutomationLevel {
  MANUAL = "MANUAL",
  SEMI_AUTOMATED = "SEMI_AUTOMATED",
  FULLY_AUTOMATED = "FULLY_AUTOMATED",
  AI_ASSISTED = "AI_ASSISTED",
}

export enum DataLineageGranularity {
  FIELD = "FIELD",
  RECORD = "RECORD",
  TABLE = "TABLE",
  DATASET = "DATASET",
  SYSTEM = "SYSTEM",
}

export enum ConsentScopeCoverage {
  FULL = "FULL",
  PARTIAL = "PARTIAL",
  MINIMAL = "MINIMAL",
  NONE = "NONE",
}

export enum ComplianceAssessmentType {
  SELF_ASSESSMENT = "SELF_ASSESSMENT",
  INTERNAL_AUDIT = "INTERNAL_AUDIT",
  EXTERNAL_AUDIT = "EXTERNAL_AUDIT",
  REGULATORY = "REGULATORY",
  CERTIFICATION = "CERTIFICATION",
}

export enum DataRetentionEnforcement {
  STRICT = "STRICT",
  FLEXIBLE = "FLEXIBLE",
  ADVISORY = "ADVISORY",
  DISABLED = "DISABLED",
}

export enum ConsentRecordFormat {
  JSON = "JSON",
  XML = "XML",
  PDF = "PDF",
  STRUCTURED_LOG = "STRUCTURED_LOG",
  BLOCKCHAIN = "BLOCKCHAIN",
}

export enum DataAccessPolicyType {
  ROLE_BASED = "ROLE_BASED",
  ATTRIBUTE_BASED = "ATTRIBUTE_BASED",
  PURPOSE_BASED = "PURPOSE_BASED",
  TIME_BASED = "TIME_BASED",
  CONDITIONAL = "CONDITIONAL",
}

export enum GovernanceEventType {
  CONSENT_GRANTED = "CONSENT_GRANTED",
  CONSENT_REVOKED = "CONSENT_REVOKED",
  DATA_ACCESS = "DATA_ACCESS",
  DATA_EXPORT = "DATA_EXPORT",
  DATA_DELETION = "DATA_DELETION",
  POLICY_VIOLATION = "POLICY_VIOLATION",
  BREACH_DETECTED = "BREACH_DETECTED",
  AUDIT_COMPLETED = "AUDIT_COMPLETED",
}

export interface ConsentPolicy {
  id: string;
  name: string;
  description: string;
  scope: ConsentPolicyScope;
  version: string;
  language: string;
  templates: ConsentTemplate[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConsentWithdrawalRequest {
  id: string;
  consentRecordId: string;
  subjectId: string;
  reason: string | null;
  submittedAt: Date;
  processedAt: Date | null;
  status: ConsentStatus;
  impact: ConsentWithdrawalImpact;
  metadata: Record<string, unknown>;
}

export interface ConsentWithdrawalImpact {
  affectedServices: string[];
  dataToBeDeleted: string[];
  dataToBeRetained: string[];
  retentionReason: string | null;
}

export interface DataSubjectRequest {
  id: string;
  subjectId: string;
  subjectType: DataSubjectType;
  right: DataSubjectRight;
  status: AccessRequestStatus;
  submittedAt: Date;
  deadline: Date;
  fulfilledAt: Date | null;
  verificationMethod: string;
  identityVerified: boolean;
  response: DataSubjectResponse | null;
  metadata: Record<string, unknown>;
}

export interface DataSubjectResponse {
  type: DataSubjectRight;
  data: Record<string, unknown> | null;
  notes: string;
  providedAt: Date;
}

export interface DataRetentionSchedule {
  id: string;
  dataType: string;
  category: DataRetentionCategory;
  scope: DataRetentionScope;
  retentionPeriod: RetentionPeriod;
  action: DataRetentionAction;
  enforcement: DataRetentionEnforcement;
  legalBasis: LegalBasisType;
  active: boolean;
  lastExecuted: Date | null;
  nextExecution: Date;
  metadata: Record<string, unknown>;
}

export interface GovernanceWorkflowStep {
  id: string;
  workflowId: string;
  name: string;
  description: string;
  order: number;
  required: boolean;
  assignedRole: GovernanceRole;
  completedAt: Date | null;
  status: string;
}

export interface GovernanceWorkflow {
  id: string;
  name: string;
  description: string;
  type: GovernanceActionType;
  steps: GovernanceWorkflowStep[];
  status: string;
  initiatedBy: string;
  initiatedAt: Date;
  completedAt: Date | null;
  metadata: Record<string, unknown>;
}

export interface DataProtectionRiskAssessment {
  id: string;
  name: string;
  description: string;
  level: DataProtectionImpactLevel;
  dataTypes: string[];
  processingActivities: string[];
  risks: DataProtectionRisk[];
  mitigations: string[];
  assessor: string;
  assessmentDate: Date;
  nextReview: Date;
  status: ComplianceStatus;
}

export interface DataProtectionRisk {
  id: string;
  description: string;
  likelihood: string;
  impact: string;
  severity: GovernanceRiskLevel;
  mitigation: string;
  residualRisk: string;
}

export interface ConsentExpirationPolicy {
  id: string;
  consentType: ConsentType;
  expirationDays: number;
  renewalRequired: boolean;
  renewalMethod: ConsentRenewalMethod;
  gracePeriodDays: number;
  autoRevoke: boolean;
  notificationDaysBefore: number[];
  active: boolean;
}

export interface DataSovereigntyAssessment {
  id: string;
  institutionId: string;
  country: string;
  requirement: DataSovereigntyRequirement;
  currentStatus: ComplianceStatus;
  dataTypes: string[];
  storageLocations: StorageLocation[];
  transferMechanisms: DataTransferMechanism[];
  lastAssessment: Date;
  nextAssessment: Date;
  metadata: Record<string, unknown>;
}

export interface GovernanceAuditFinding {
  id: string;
  auditId: string;
  category: string;
  severity: ComplianceSeverity;
  description: string;
  evidence: string[];
  recommendation: string;
  status: string;
  assignedTo: string | null;
  dueDate: Date | null;
  resolvedAt: Date | null;
}

export interface DataLineageGraph {
  id: string;
  dataId: string;
  granularity: DataLineageGranularity;
  nodes: DataLineageNode[];
  edges: DataLineageEdge[];
  completeness: number;
  lastTracedAt: Date;
}

export interface DataLineageNode {
  id: string;
  type: string;
  name: string;
  system: string;
  timestamp: Date;
}

export interface DataLineageEdge {
  source: string;
  target: string;
  transformation: string | null;
  frequency: string;
}

export interface ConsentAuditEntry {
  id: string;
  consentRecordId: string;
  action: GovernanceEventType;
  performedBy: string;
  performedAt: Date;
  details: Record<string, unknown>;
  ipAddress: string | null;
}

export interface DataAccessLog {
  id: string;
  subjectId: string;
  accessorId: string;
  accessorRole: GovernanceRole;
  dataType: string;
  action: AuditAction;
  purpose: PurposeType;
  timestamp: Date;
  ipAddress: string | null;
  outcome: string;
}

export interface DataBreachNotification {
  id: string;
  breachId: string;
  channel: BreachNotificationChannel;
  recipient: string;
  sentAt: Date;
  acknowledged: boolean;
  acknowledgedAt: Date | null;
  content: string;
}

export interface ComplianceControl {
  id: string;
  framework: DataGovernanceFramework;
  controlId: string;
  name: string;
  description: string;
  category: string;
  severity: ComplianceSeverity;
  status: ComplianceStatus;
  evidence: string[];
  lastAssessed: Date;
  nextAssessment: Date;
}

export interface ConsentScopeDefinition {
  id: string;
  name: string;
  description: string;
  coverage: ConsentScopeCoverage;
  dataCategories: string[];
  purposes: PurposeType[];
  retentionPeriod: RetentionPeriod;
  sharingAllowed: boolean;
  active: boolean;
}

export interface DataGovernanceMaturity {
  id: string;
  institutionId: string;
  dimension: string;
  level: number;
  score: number;
  assessmentDate: Date;
  assessor: string;
  improvements: string[];
  nextTarget: number;
}

export interface DataRetentionException {
  id: string;
  scheduleId: string;
  reason: string;
  justification: string;
  approvedBy: string;
  approvedAt: Date;
  expiresAt: Date | null;
  active: boolean;
}

export interface GovernanceNotificationRule {
  id: string;
  name: string;
  event: GovernanceEventType;
  channels: NotificationChannel[];
  recipients: string[];
  conditions: Record<string, unknown> | null;
  active: boolean;
}

export interface DataSubjectConsentSummary {
  subjectId: string;
  subjectType: DataSubjectType;
  totalConsents: number;
  activeConsents: number;
  expiredConsents: number;
  revokedConsents: number;
  lastActivity: Date;
  dataCategories: string[];
  purposes: PurposeType[];
}

export interface DataClassificationPolicy {
  id: string;
  name: string;
  description: string;
  rules: DataClassificationRule[];
  scope: string;
  active: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GovernanceHealthCheck {
  id: string;
  institutionId: string;
  overallScore: number;
  dimensions: GovernanceHealthDimension[];
  checkedAt: Date;
  recommendations: string[];
}

export interface GovernanceHealthDimension {
  name: string;
  score: number;
  status: string;
  issues: string[];
}

export interface DataRetentionReport {
  id: string;
  period: string;
  totalRecords: number;
  archivedRecords: number;
  deletedRecords: number;
  anonymizedRecords: number;
  exceptions: number;
  violations: number;
  generatedAt: Date;
  generatedBy: string;
}

export interface ConsentBulkOperation {
  id: string;
  operationType: string;
  affectedSubjects: number;
  status: string;
  initiatedBy: string;
  initiatedAt: Date;
  completedAt: Date | null;
  errors: ConsentBulkError[];
  metadata: Record<string, unknown>;
}

export interface ConsentBulkError {
  subjectId: string;
  error: string;
}

export interface GovernanceConfigVersion {
  id: string;
  configId: string;
  version: string;
  changes: string[];
  createdBy: string;
  createdAt: Date;
  active: boolean;
}

export interface DataSovereigntyConstraint {
  id: string;
  country: string;
  dataType: string;
  localProcessingRequired: boolean;
  localStorageRequired: boolean;
  crossBorderAllowed: boolean;
  governmentAccessRequired: boolean;
  encryptionRequired: boolean;
  active: boolean;
}

export interface ComplianceCertification {
  id: string;
  framework: DataGovernanceFramework;
  certificationBody: string;
  certificationNumber: string;
  scope: string;
  issuedAt: Date;
  expiresAt: Date;
  status: ComplianceStatus;
  documents: string[];
}

export interface DataRetentionArchive {
  id: string;
  scheduleId: string;
  dataType: string;
  recordCount: number;
  archiveLocation: string;
  archiveDate: Date;
  expiresAt: Date;
  encrypted: boolean;
  verified: boolean;
}

export interface ConsentWithdrawalImpactAnalysis {
  id: string;
  consentRecordId: string;
  affectedSystems: string[];
  dataToBeDeleted: number;
  dataToBeRetained: number;
  servicesImpacted: string[];
  estimatedImpact: string;
  analyzedAt: Date;
}

export interface GovernancePolicyTemplate {
  id: string;
  name: string;
  description: string;
  type: GovernancePolicyType;
  framework: DataGovernanceFramework;
  content: Record<string, unknown>;
  version: string;
  active: boolean;
  createdBy: string;
  createdAt: Date;
}

export interface DataRetentionExecution {
  id: string;
  scheduleId: string;
  executedAt: Date;
  recordsProcessed: number;
  recordsArchived: number;
  recordsDeleted: number;
  recordsAnonymized: number;
  errors: string[];
  status: string;
  duration: number;
}

export interface ConsentGrantEvent {
  id: string;
  consentRecordId: string;
  subjectId: string;
  purposes: PurposeType[];
  method: ConsentMethod;
  timestamp: Date;
  ipAddress: string | null;
  verified: boolean;
}

export interface DataSubjectDeletionRequest {
  id: string;
  subjectId: string;
  subjectType: DataSubjectType;
  dataCategories: string[];
  reason: string | null;
  status: DeletionStatus;
  submittedAt: Date;
  deadline: Date;
  completedAt: Date | null;
  verificationMethod: string;
  identityVerified: boolean;
  retainedData: DataRetainedItem[];
  metadata: Record<string, unknown>;
}

export interface DataRetainedItem {
  dataType: string;
  reason: string;
  legalBasis: LegalBasisType;
  retentionPeriod: RetentionPeriod;
}

export interface GovernanceComplianceDashboard {
  id: string;
  institutionId: string;
  overallScore: number;
  frameworks: FrameworkCompliance[];
  recentViolations: ComplianceViolation[];
  upcomingAssessments: ComplianceAssessment[];
  lastUpdated: Date;
}

export interface FrameworkCompliance {
  framework: DataGovernanceFramework;
  score: number;
  status: ComplianceStatus;
  lastAssessed: Date;
  controls: number;
  passing: number;
}

export interface ComplianceViolation {
  id: string;
  framework: DataGovernanceFramework;
  controlId: string;
  severity: ComplianceSeverity;
  description: string;
  detectedAt: Date;
  resolvedAt: Date | null;
}

export interface ComplianceAssessment {
  id: string;
  framework: DataGovernanceFramework;
  type: ComplianceAssessmentType;
  scheduledAt: Date;
  assignedTo: string;
  status: string;
}

export interface DataProtectionRegistrationEntry {
  id: string;
  institutionId: string;
  processingActivity: string;
  purpose: PurposeType;
  legalBasis: LegalBasisType;
  dataTypes: string[];
  recipients: string[];
  crossBorderTransfer: boolean;
  safeguards: string[];
  registeredAt: Date;
  lastUpdated: Date;
}

export interface ConsentRevocationEvent {
  id: string;
  consentRecordId: string;
  subjectId: string;
  reason: string | null;
  method: ConsentMethod;
  timestamp: Date;
  impact: ConsentWithdrawalImpact;
}

export interface DataAccessAuthorization {
  id: string;
  subjectId: string;
  accessorId: string;
  dataType: string;
  action: AccessRequestType;
  purpose: PurposeType;
  granted: boolean;
  grantedAt: Date;
  expiresAt: Date | null;
  conditions: string[];
}

export interface GovernanceAuditReport {
  id: string;
  auditType: string;
  period: string;
  institutionId: string;
  scope: string;
  findings: GovernanceAuditFinding[];
  overallRating: string;
  generatedAt: Date;
  generatedBy: string;
  metadata: Record<string, unknown>;
}

export interface ConsentPolicyViolation {
  id: string;
  policyId: string;
  consentRecordId: string;
  violationType: string;
  description: string;
  severity: ComplianceSeverity;
  detectedAt: Date;
  resolvedAt: Date | null;
  resolution: string | null;
}

export interface DataRetentionVerification {
  id: string;
  scheduleId: string;
  verifiedAt: Date;
  verifiedBy: string;
  recordsVerified: number;
  compliant: boolean;
  issues: string[];
}

export interface DataSovereigntyReport {
  id: string;
  institutionId: string;
  country: string;
  requirements: DataSovereigntyConstraint[];
  complianceStatus: ComplianceStatus;
  gaps: string[];
  recommendations: string[];
  generatedAt: Date;
}

export interface DataTransferAgreement {
  id: string;
  sourceInstitution: string;
  targetInstitution: string;
  dataTypes: string[];
  purposes: PurposeType[];
  legalBasis: LegalBasisType;
  mechanism: DataTransferMechanism;
  safeguards: string[];
  startDate: Date;
  endDate: Date | null;
  active: boolean;
}

export interface GovernanceRoleAssignment {
  id: string;
  userId: string;
  role: GovernanceRole;
  institutionId: string;
  scope: string;
  assignedBy: string;
  assignedAt: Date;
  expiresAt: Date | null;
  active: boolean;
}

export interface ConsentLifecycleEvent {
  id: string;
  consentRecordId: string;
  eventType: string;
  fromStatus: ConsentStatus;
  toStatus: ConsentStatus;
  triggeredBy: string;
  timestamp: Date;
  details: Record<string, unknown>;
}

export interface DataQualityGovernanceRule {
  id: string;
  name: string;
  description: string;
  dataType: string;
  rule: string;
  threshold: number;
  action: string;
  active: boolean;
  createdBy: string;
  createdAt: Date;
}

export interface ComplianceEvidence {
  id: string;
  controlId: string;
  type: string;
  description: string;
  url: string | null;
  submittedBy: string;
  submittedAt: Date;
  verified: boolean;
  verifiedAt: Date | null;
}

export interface GovernanceIncident {
  id: string;
  type: string;
  severity: ComplianceSeverity;
  description: string;
  affectedData: string[];
  affectedSubjects: number;
  detectedAt: Date;
  containedAt: Date | null;
  resolvedAt: Date | null;
  rootCause: string | null;
  remediation: string | null;
  status: string;
}

export interface DataConsentScope {
  id: string;
  name: string;
  description: string;
  dataCategories: string[];
  purposes: PurposeType[];
  retentionPeriod: RetentionPeriod;
  sharingScope: SharingScope;
  thirdParties: string[];
  active: boolean;
}

export interface ConsentRenewalPolicy {
  id: string;
  consentType: ConsentType;
  renewalFrequency: number;
  reminderDaysBefore: number[];
  method: ConsentRenewalMethod;
  autoRevokeOnExpiry: boolean;
  gracePeriodDays: number;
  active: boolean;
}

export interface DataProcessingAgreement {
  id: string;
  processorId: string;
  controllerId: string;
  dataTypes: string[];
  purposes: PurposeType[];
  subProcessors: string[];
  securityMeasures: string[];
  startDate: Date;
  endDate: Date | null;
  active: boolean;
}

export interface GovernanceWorkflowTemplate {
  id: string;
  name: string;
  description: string;
  type: GovernanceActionType;
  steps: GovernanceWorkflowStep[];
  active: boolean;
  createdBy: string;
  createdAt: Date;
}

export interface DataRetentionLegalBasis {
  id: string;
  dataType: string;
  legalBasis: LegalBasisType;
  regulation: RegulationType;
  description: string;
  retentionPeriod: RetentionPeriod;
  active: boolean;
}

export interface ConsentScopeMapping {
  id: string;
  consentScopeId: string;
  dataCategoryId: string;
  purposeId: string;
  active: boolean;
}

export interface DataGovernanceAuditTrail {
  id: string;
  entityType: string;
  entityId: string;
  action: string;
  performedBy: string;
  performedAt: Date;
  previousValue: Record<string, unknown> | null;
  newValue: Record<string, unknown> | null;
  ipAddress: string | null;
}

export interface ComplianceMilestone {
  id: string;
  framework: DataGovernanceFramework;
  milestone: string;
  description: string;
  targetDate: Date;
  completedDate: Date | null;
  status: string;
  assignedTo: string;
}

export interface DataRetentionScheduleOverride {
  id: string;
  scheduleId: string;
  dataType: string;
  overridePeriod: RetentionPeriod;
  reason: string;
  approvedBy: string;
  approvedAt: Date;
  expiresAt: Date | null;
  active: boolean;
}

export interface ConsentTemplateVersion {
  id: string;
  templateId: string;
  version: string;
  language: string;
  content: string;
  changes: string[];
  publishedBy: string;
  publishedAt: Date;
  active: boolean;
}

export interface GovernanceComplianceScore {
  id: string;
  institutionId: string;
  framework: DataGovernanceFramework;
  score: number;
  grade: string;
  dimensions: ComplianceDimensionScore[];
  calculatedAt: Date;
}

export interface ComplianceDimensionScore {
  dimension: string;
  score: number;
  weight: number;
}

export interface DataBreachImpactAssessment {
  id: string;
  breachId: string;
  affectedDataCategories: string[];
  affectedSubjects: number;
  severity: BreachSeverity;
  riskLevel: GovernanceRiskLevel;
  notificationRequired: boolean;
  regulatorNotificationRequired: boolean;
  assessedAt: Date;
  assessedBy: string;
}

export interface DataRetentionCrossReference {
  id: string;
  sourceScheduleId: string;
  targetScheduleId: string;
  relationship: string;
  active: boolean;
}

export interface ConsentGrantVerification {
  id: string;
  consentRecordId: string;
  verificationMethod: ConsentVerificationMethod;
  verifiedAt: Date;
  verifiedBy: string;
  evidence: string;
  passed: boolean;
}
