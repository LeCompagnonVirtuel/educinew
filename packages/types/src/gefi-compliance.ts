export enum ComplianceRuleType {
  TAX = "TAX",
  AML = "AML",
  KYC = "KYC",
  REPORTING = "REPORTING",
  DATA_RETENTION = "DATA_RETENTION",
  TRANSACTION_MONITORING = "TRANSACTION_MONITORING",
  SANCTIONS = "SANCTIONS",
  PEP = "PEP",
  AUDIT = "AUDIT",
}

export enum TaxJurisdiction {
  NATIONAL = "NATIONAL",
  REGIONAL = "REGIONAL",
  LOCAL = "LOCAL",
  INTERNATIONAL = "INTERNATIONAL",
  ECOWAS = "ECOWAS",
  CEMAC = "CEMAC",
  EU = "EU",
}

export enum AMLCheckType {
  SCREENING = "SCREENING",
  DUE_DILIGENCE = "DUE_DILIGENCE",
  ENHANCED_DUE_DILIGENCE = "ENHANCED_DUE_DILIGENCE",
  ONGOING_MONITORING = "ONGOING_MONITORING",
  SANCTIONS_CHECK = "SANCTIONS_CHECK",
  PEP_CHECK = "PEP_CHECK",
}

export enum KYCStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  PENDING_REVIEW = "PENDING_REVIEW",
  VERIFIED = "VERIFIED",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
  UPDATING = "UPDATING",
}

export enum TransactionMonitoringRule {
  THRESHOLD = "THRESHOLD",
  VELOCITY = "VELOCITY",
  PATTERN = "PATTERN",
  ANOMALY = "ANOMALY",
  BEHAVIORAL = "BEHAVIORAL",
  GEOGRAPHIC = "GEOGRAPHIC",
}

export enum RegulatoryRequirement {
  REPORTING = "REPORTING",
  RECORD_KEEPING = "RECORD_KEEPING",
  NOTIFICATION = "NOTIFICATION",
  APPROVAL = "APPROVAL",
  DISCLOSURE = "DISCLOSURE",
  FILING = "FILING",
}

export enum DataRetentionPolicy {
  RETAIN = "RETAIN",
  ARCHIVE = "ARCHIVE",
  DELETE = "DELETE",
  ANONYMIZE = "ANONYMIZE",
  ENCRYPT = "ENCRYPT",
}

export enum ComplianceStatus {
  COMPLIANT = "COMPLIANT",
  NON_COMPLIANT = "NON_COMPLIANT",
  PARTIALLY_COMPLIANT = "PARTIALLY_COMPLIANT",
  PENDING_REVIEW = "PENDING_REVIEW",
  UNDER_REVIEW = "UNDER_REVIEW",
  EXEMPT = "EXEMPT",
}

export enum AuditAction {
  CREATE = "CREATE",
  READ = "READ",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  EXPORT = "EXPORT",
  APPROVE = "APPROVE",
  REJECT = "REJECT",
}

export enum ReportFrequency {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  ANNUAL = "ANNUAL",
  ON_DEMAND = "ON_DEMAND",
}

export enum TaxType {
  INCOME_TAX = "INCOME_TAX",
  VAT = "VAT",
  WITHHOLDING = "WITHHOLDING",
  PROPERTY_TAX = "PROPERTY_TAX",
  PAYROLL_TAX = "PAYROLL_TAX",
  STAMP_DUTY = "STAMP_DUTY",
}

export enum FilingStatus {
  NOT_FILED = "NOT_FILED",
  FILED = "FILED",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  AMENDED = "AMENDED",
}

export enum ComplianceAlertType {
  DEADLINE = "DEADLINE",
  THRESHOLD = "THRESHOLD",
  VIOLATION = "VIOLATION",
  CHANGE = "CHANGE",
  EXPIRY = "EXPIRY",
}

export enum SanctionListType {
  UN = "UN",
  EU = "EU",
  OFAC = "OFAC",
  HMT = "HMT",
  LOCAL = "LOCAL",
}

export enum ComplianceDocumentType {
  CERTIFICATE = "CERTIFICATE",
  LICENSE = "LICENSE",
  REGISTRATION = "REGISTRATION",
  FILING = "FILING",
  EXEMPTION = "EXEMPTION",
}

export interface TaxRule {
  id: string;
  schoolId: string;
  name: string;
  taxType: TaxType;
  jurisdiction: TaxJurisdiction;
  rate: number;
  minAmount: number | null;
  maxAmount: number | null;
  applicableTo: string[];
  effectiveFrom: Date;
  effectiveTo: Date | null;
  status: ComplianceStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface VATRule {
  id: string;
  schoolId: string;
  vatType: string;
  rate: number;
  jurisdiction: TaxJurisdiction;
  applicableServices: string[];
  exemptionConditions: string[];
  registrationRequired: boolean;
  effectiveFrom: Date;
  effectiveTo: Date | null;
  status: ComplianceStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface WithholdingTax {
  id: string;
  schoolId: string;
  paymentType: string;
  rate: number;
  jurisdiction: TaxJurisdiction;
  recipientType: string;
  minimumThreshold: number;
  registrationRequired: boolean;
  effectiveFrom: Date;
  effectiveTo: Date | null;
  status: ComplianceStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface TaxJurisdictionConfig {
  id: string;
  schoolId: string;
  jurisdiction: TaxJurisdiction;
  jurisdictionCode: string;
  taxAuthority: string;
  filingDeadline: string;
  filingFrequency: ReportFrequency;
  penalties: TaxPenalty[];
  contactInfo: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface TaxPenalty {
  type: string;
  rate: number;
  maximumAmount: number;
}

export interface TaxExemption {
  id: string;
  schoolId: string;
  exemptionType: string;
  jurisdiction: TaxJurisdiction;
  reason: string;
  certificateNumber: string;
  validFrom: Date;
  validTo: Date;
  approvedBy: string;
  documents: string[];
  status: ComplianceStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface TaxReport {
  id: string;
  schoolId: string;
  reportType: string;
  jurisdiction: TaxJurisdiction;
  period: string;
  totalTaxableAmount: number;
  totalTaxAmount: number;
  status: string;
  filedDate: Date | null;
  dueDate: Date;
  filingReference: string | null;
  generatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FinancialComplianceRule {
  id: string;
  schoolId: string;
  name: string;
  ruleType: ComplianceRuleType;
  description: string;
  condition: string;
  action: string;
  severity: string;
  regulatoryBasis: string;
  effectiveFrom: Date;
  effectiveTo: Date | null;
  enabled: boolean;
  lastCheckedAt: Date | null;
  status: ComplianceStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface AMLCheck {
  id: string;
  schoolId: string;
  checkType: AMLCheckType;
  entityType: string;
  entityId: string;
  entityName: string;
  result: string;
  riskScore: number;
  hitCount: number;
  hits: AMLHit[];
  performedAt: Date;
  expiresAt: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface AMLHit {
  listName: string;
  matchedName: string;
  score: number;
  country: string;
  category: string;
}

export interface KYCVerification {
  id: string;
  schoolId: string;
  entityType: string;
  entityId: string;
  entityName: string;
  status: KYCStatus;
  verificationLevel: string;
  documentsSubmitted: string[];
  documentsVerified: string[];
  verifiedBy: string | null;
  submittedAt: Date;
  verifiedAt: Date | null;
  expiresAt: Date;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface TransactionMonitoring {
  id: string;
  schoolId: string;
  ruleType: TransactionMonitoringRule;
  ruleName: string;
  threshold: number;
  timeWindowMinutes: number;
  action: string;
  alertSeverity: string;
  enabled: boolean;
  triggeredCount: number;
  lastTriggeredAt: Date | null;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface RegulatoryReport {
  id: string;
  schoolId: string;
  reportType: string;
  jurisdiction: TaxJurisdiction;
  requirement: RegulatoryRequirement;
  period: string;
  dueDate: Date;
  submittedDate: Date | null;
  status: string;
  reportData: Record<string, unknown>;
  submittedBy: string | null;
  acknowledgmentRef: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface DataRetentionPolicyConfig {
  id: string;
  schoolId: string;
  dataType: string;
  policy: DataRetentionPolicy;
  retentionDays: number;
  archiveAfterDays: number;
  deleteAfterDays: number;
  legalBasis: string;
  jurisdiction: TaxJurisdiction;
  enabled: boolean;
  lastExecutionDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FinancialAuditTrail {
  id: string;
  schoolId: string;
  entityType: string;
  entityId: string;
  action: AuditAction;
  userId: string;
  userName: string;
  changes: AuditChange[];
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface AuditChange {
  field: string;
  oldValue: string | null;
  newValue: string | null;
}

export interface ComplianceAudit {
  id: string;
  schoolId: string;
  auditType: string;
  scope: string;
  auditorId: string;
  status: string;
  findings: ComplianceFinding[];
  startDate: Date;
  endDate: Date | null;
  overallScore: number;
  recommendations: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ComplianceFinding {
  category: string;
  severity: string;
  description: string;
  recommendation: string;
  deadline: Date | null;
}

export interface JurisdictionConfig {
  id: string;
  schoolId: string;
  jurisdiction: TaxJurisdiction;
  name: string;
  countryCode: string;
  currency: string;
  taxAuthority: string;
  reportingRequirements: RegulatoryRequirement[];
  amlRequirements: AMLCheckType[];
  kycRequirements: string[];
  dataRetentionDays: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ComplianceAlert {
  id: string;
  schoolId: string;
  alertType: ComplianceAlertType;
  severity: string;
  title: string;
  description: string;
  entityType: string;
  entityId: string;
  deadline: Date | null;
  acknowledgedBy: string | null;
  acknowledgedAt: Date | null;
  resolvedAt: Date | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface SanctionsScreening {
  id: string;
  schoolId: string;
  entityType: string;
  entityId: string;
  entityName: string;
  listType: SanctionListType;
  result: string;
  matchScore: number;
  matches: SanctionMatch[];
  screenedAt: Date;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface SanctionMatch {
  listName: string;
  matchedName: string;
  score: number;
  country: string;
}

export interface TaxFiling {
  id: string;
  schoolId: string;
  taxType: TaxType;
  jurisdiction: TaxJurisdiction;
  period: string;
  status: FilingStatus;
  totalTaxable: number;
  totalTax: number;
  filingDate: Date | null;
  dueDate: Date;
  reference: string | null;
  filedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ComplianceWorkflow {
  id: string;
  schoolId: string;
  workflowType: string;
  steps: ComplianceWorkflowStep[];
  currentStep: number;
  totalSteps: number;
  status: string;
  initiatedBy: string;
  startedAt: Date;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ComplianceWorkflowStep {
  stepNumber: number;
  name: string;
  assigneeId: string;
  status: string;
  completedAt: Date | null;
  notes: string;
}
