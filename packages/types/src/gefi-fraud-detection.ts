export enum FraudAlertType {
  DUPLICATE_PAYMENT = "DUPLICATE_PAYMENT",
  UNUSUAL_AMOUNT = "UNUSUAL_AMOUNT",
  VELOCITY_BREACH = "VELOCITY_BREACH",
  IDENTITY_MISMATCH = "IDENTITY_MISMATCH",
  GHOST_STUDENT = "GHOST_STUDENT",
  PAYMENT_MANIPULATION = "PAYMENT_MANIPULATION",
  COLLUSION = "COLLUSION",
  BUDGET_FRAUD = "BUDGET_FRAUD",
  INVOICE_FRAUD = "INVOICE_FRAUD",
  EMPLOYEE_FRAUD = "EMPLOYEE_FRAUD",
}

export enum FraudSeverity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum InvestigationStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  ESCALATED = "ESCALATED",
  RESOLVED = "RESOLVED",
  CLOSED = "CLOSED",
  DISMISSED = "DISMISSED",
}

export enum EvidenceType {
  DOCUMENT = "DOCUMENT",
  SCREENSHOT = "SCREENSHOT",
  TRANSACTION_LOG = "TRANSACTION_LOG",
  COMMUNICATION = "COMMUNICATION",
  WITNESS_STATEMENT = "WITNESS_STATEMENT",
  FINANCIAL_RECORD = "FINANCIAL_RECORD",
  DIGITAL_FORENSIC = "DIGITAL_FORENSIC",
}

export enum ResolutionType {
  CONFIRMED_FRAUD = "CONFIRMED_FRAUD",
  FALSE_POSITIVE = "FALSE_POSITIVE",
  PROCEDURAL_VIOLATION = "PROCEDURAL_VIOLATION",
  SYSTEM_ERROR = "SYSTEM_ERROR",
  UNDETERMINED = "UNDETERMINED",
}

export enum EscalationLevel {
  LEVEL_1 = "LEVEL_1",
  LEVEL_2 = "LEVEL_2",
  LEVEL_3 = "LEVEL_3",
  LEVEL_4 = "LEVEL_4",
  LEVEL_5 = "LEVEL_5",
}

export enum FraudPatternType {
  ROUND_TRIPPING = "ROUND_TRIPPING",
  SPLITTING = "SPLITTING",
  BENCHMARKING = "BENCHMARKING",
  PHANTOM = "PHANTOM",
  KICKBACK = "KICKBACK",
  EMBEZZLEMENT = "EMBEZZLEMENT",
  MONEY_LAUNDERING = "MONEY_LAUNDERING",
}

export enum AlertPriority {
  IMMEDIATE = "IMMEDIATE",
  URGENT = "URGENT",
  NORMAL = "NORMAL",
  LOW = "LOW",
}

export enum InvestigationMethod {
  AUTOMATED = "AUTOMATED",
  MANUAL = "MANUAL",
  HYBRID = "HYBRID",
}

export enum RiskLevel {
  MINIMAL = "MINIMAL",
  LOW = "LOW",
  MODERATE = "MODERATE",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum AnomalyCategory {
  TRANSACTION = "TRANSACTION",
  BEHAVIORAL = "BEHAVIORAL",
  PATTERN = "PATTERN",
  TIMING = "TIMING",
  AMOUNT = "AMOUNT",
  FREQUENCY = "FREQUENCY",
}

export enum FraudCasePriority {
  P1_CRITICAL = "P1_CRITICAL",
  P2_HIGH = "P2_HIGH",
  P3_MEDIUM = "P3_MEDIUM",
  P4_LOW = "P4_LOW",
}

export enum EvidenceChainStatus {
  COLLECTED = "COLLECTED",
  VERIFIED = "VERIFIED",
  TAMPERED = "TAMPERED",
  EXPIRED = "EXPIRED",
}

export enum FraudMetric {
  ALERT_VOLUME = "ALERT_VOLUME",
  FALSE_POSITIVE_RATE = "FALSE_POSITIVE_RATE",
  MEAN_TIME_TO_DETECT = "MEAN_TIME_TO_DETECT",
  MEAN_TIME_TO_RESOLVE = "MEAN_TIME_TO_RESOLVE",
  FINANCIAL_IMPACT = "FINANCIAL_IMPACT",
  DETECTION_RATE = "DETECTION_RATE",
}

export enum FraudNotificationChannel {
  EMAIL = "EMAIL",
  SMS = "SMS",
  PUSH = "PUSH",
  WEBHOOK = "WEBHOOK",
  IN_APP = "IN_APP",
}

export interface FraudAlert {
  id: string;
  schoolId: string;
  alertType: FraudAlertType;
  severity: FraudSeverity;
  priority: AlertPriority;
  title: string;
  description: string;
  sourceSystem: string;
  triggeredBy: string;
  relatedEntityId: string;
  relatedEntityType: string;
  amount: number | null;
  riskScore: number;
  status: InvestigationStatus;
  assignedTo: string | null;
  detectedAt: Date;
  acknowledgedAt: Date | null;
  resolvedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FraudCase {
  id: string;
  schoolId: string;
  caseNumber: string;
  alertIds: string[];
  caseType: FraudAlertType;
  severity: FraudSeverity;
  status: InvestigationStatus;
  leadInvestigator: string;
  totalAmountInvolved: number;
  description: string;
  openedAt: Date;
  closedAt: Date | null;
  resolution: ResolutionType | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FraudInvestigation {
  id: string;
  schoolId: string;
  caseId: string;
  investigationType: InvestigationMethod;
  investigatorId: string;
  status: InvestigationStatus;
  scope: string;
  methodology: string;
  findings: string;
  evidenceIds: string[];
  startDate: Date;
  endDate: Date | null;
  escalationLevel: EscalationLevel;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FraudEvidence {
  id: string;
  schoolId: string;
  investigationId: string;
  caseId: string;
  evidenceType: EvidenceType;
  title: string;
  description: string;
  fileUrl: string;
  hashValue: string;
  collectedBy: string;
  collectedAt: Date;
  verifiedBy: string | null;
  verifiedAt: Date | null;
  integrityStatus: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FraudRiskScore {
  id: string;
  schoolId: string;
  targetType: string;
  targetId: string;
  overallScore: number;
  riskLevel: RiskLevel;
  factors: FraudRiskFactor[];
  modelVersion: string;
  calculatedAt: Date;
  validUntil: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FraudRiskFactor {
  factor: string;
  weight: number;
  score: number;
  description: string;
}

export interface FraudResolution {
  id: string;
  schoolId: string;
  caseId: string;
  investigationId: string;
  resolutionType: ResolutionType;
  summary: string;
  financialImpact: number;
  recoveredAmount: number;
  recommendations: string[];
  preventiveMeasures: string[];
  resolvedBy: string;
  resolvedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FraudEscalation {
  id: string;
  schoolId: string;
  caseId: string;
  fromLevel: EscalationLevel;
  toLevel: EscalationLevel;
  reason: string;
  escalatedBy: string;
  escalatedTo: string;
  escalatedAt: Date;
  responseDeadline: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FraudPattern {
  id: string;
  schoolId: string;
  patternType: FraudPatternType;
  name: string;
  description: string;
  indicators: string[];
  detectionRules: string[];
  historicalOccurrences: number;
  averageAmount: number;
  riskLevel: RiskLevel;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FraudRule {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  ruleType: string;
  condition: string;
  threshold: number;
  action: string;
  severity: FraudSeverity;
  enabled: boolean;
  triggerCount: number;
  lastTriggeredAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FraudDetectionModel {
  id: string;
  schoolId: string;
  name: string;
  modelType: string;
  version: string;
  accuracy: number;
  falsePositiveRate: number;
  features: string[];
  lastTrainedAt: Date;
  trainingDataSize: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface TransactionAnomaly {
  id: string;
  schoolId: string;
  transactionId: string;
  anomalyType: AnomalyCategory;
  severity: FraudSeverity;
  description: string;
  expectedValue: number;
  actualValue: number;
  deviationPercent: number;
  confidence: number;
  detectedAt: Date;
  investigated: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface DuplicatePaymentDetection {
  id: string;
  schoolId: string;
  primaryTransactionId: string;
  duplicateTransactionIds: string[];
  matchScore: number;
  amount: number;
  payee: string;
  paymentDate: Date;
  matchCriteria: string[];
  confirmed: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface BillingAnomaly {
  id: string;
  schoolId: string;
  billingId: string;
  studentId: string;
  anomalyType: AnomalyCategory;
  description: string;
  expectedAmount: number;
  actualAmount: number;
  variance: number;
  period: string;
  detectedAt: Date;
  status: InvestigationStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface SupplierAnomaly {
  id: string;
  schoolId: string;
  supplierId: string;
  anomalyType: AnomalyCategory;
  description: string;
  invoiceCount: number;
  totalAmount: number;
  averageInvoice: number;
  deviationFromNorm: number;
  riskIndicators: string[];
  detectedAt: Date;
  status: InvestigationStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface BudgetManipulation {
  id: string;
  schoolId: string;
  budgetId: string;
  manipulationType: string;
  description: string;
  originalAmount: number;
  manipulatedAmount: number;
  variance: number;
  detectedBy: string;
  detectedAt: Date;
  status: InvestigationStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CollusionIndicator {
  id: string;
  schoolId: string;
  partiesInvolved: string[];
  indicatorType: string;
  description: string;
  evidenceStrength: number;
  relatedAlerts: string[];
  detectedAt: Date;
  status: InvestigationStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FraudAlertRule {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  alertType: FraudAlertType;
  condition: string;
  threshold: number;
  timeWindowMinutes: number;
  severity: FraudSeverity;
  enabled: boolean;
  triggerCount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FraudCaseTimeline {
  id: string;
  schoolId: string;
  caseId: string;
  event: string;
  description: string;
  performedBy: string;
  timestamp: Date;
  metadata: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FraudRecoveryTracking {
  id: string;
  schoolId: string;
  caseId: string;
  recoveryType: string;
  expectedAmount: number;
  recoveredAmount: number;
  recoveryMethod: string;
  status: string;
  recoveredAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FraudPerformanceMetric {
  id: string;
  schoolId: string;
  metricType: FraudMetric;
  value: number;
  targetValue: number;
  period: string;
  trend: string;
  calculatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FraudWhitelist {
  id: string;
  schoolId: string;
  entityType: string;
  entityId: string;
  reason: string;
  addedBy: string;
  expiresAt: Date | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FraudBlacklist {
  id: string;
  schoolId: string;
  entityType: string;
  entityId: string;
  reason: string;
  addedBy: string;
  source: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FraudNotification {
  id: string;
  schoolId: string;
  alertId: string;
  recipientId: string;
  channel: FraudNotificationChannel;
  title: string;
  message: string;
  sentAt: Date;
  readAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FraudTrainingData {
  id: string;
  schoolId: string;
  modelId: string;
  sampleCount: number;
  positiveSamples: number;
  negativeSamples: number;
  features: string[];
  dateRangeStart: Date;
  dateRangeEnd: Date;
  accuracy: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
