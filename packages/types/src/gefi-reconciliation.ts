export enum ReconciliationSource {
  BANK_STATEMENT = "BANK_STATEMENT",
  INTERNAL_LEDGER = "INTERNAL_LEDGER",
  PAYMENT_GATEWAY = "PAYMENT_GATEWAY",
  MOBILE_MONEY = "MOBILE_MONEY",
  CASH_REGISTER = "CASH_REGISTER",
  MANUAL_ENTRY = "MANUAL_ENTRY",
  FEEDS = "FEEDS",
}

export enum ReconciliationType {
  BANK_RECONCILIATION = "BANK_RECONCILIATION",
  INTER_LEDGER = "INTER_LEDGER",
  PAYMENT_RECONCILIATION = "PAYMENT_RECONCILIATION",
  SUBLEDGER = "SUBLEDGER",
  CASH_RECONCILIATION = "CASH_RECONCILIATION",
  INVENTORY_RECONCILIATION = "INVENTORY_RECONCILIATION",
}

export enum MatchStatus {
  UNMATCHED = "UNMATCHED",
  PARTIALLY_MATCHED = "PARTIALLY_MATCHED",
  FULLY_MATCHED = "FULLY_MATCHED",
  DISPUTED = "DISPUTED",
  EXCLUDED = "EXCLUDED",
}

export enum DisputeStatus {
  OPEN = "OPEN",
  UNDER_REVIEW = "UNDER_REVIEW",
  PENDING_INFORMATION = "PENDING_INFORMATION",
  RESOLVED = "RESOLVED",
  ESCALATED = "ESCALATED",
  CLOSED = "CLOSED",
}

export enum SettlementStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SETTLED = "SETTLED",
  FAILED = "FAILED",
  REVERSED = "REVERSED",
}

export enum ReconciliationFrequency {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  BI_WEEKLY = "BI_WEEKLY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  ON_DEMAND = "ON_DEMAND",
}

export enum MatchMethod {
  EXACT = "EXACT",
  FUZZY = "FUZZY",
  RULE_BASED = "RULE_BASED",
  ML_ASSISTED = "ML_ASSISTED",
  MANUAL = "MANUAL",
}

export enum ReconciliationStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export enum BatchStatus {
  CREATED = "CREATED",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  PARTIAL = "PARTIAL",
  FAILED = "FAILED",
}

export enum UnmatchReason {
  NO_COUNTERPART = "NO_COUNTERPART",
  AMOUNT_MISMATCH = "AMOUNT_MISMATCH",
  DATE_MISMATCH = "DATE_MISMATCH",
  REFERENCE_MISMATCH = "REFERENCE_MISMATCH",
  DUPLICATE = "DUPLICATE",
  MANUAL_OVERRIDE = "MANUAL_OVERRIDE",
}

export enum DisputePriority {
  URGENT = "URGENT",
  HIGH = "HIGH",
  NORMAL = "NORMAL",
  LOW = "LOW",
}

export enum AuditAction {
  CREATE = "CREATE",
  MATCH = "MATCH",
  UNMATCH = "UNMATCH",
  DISPUTE = "DISPUTE",
  RESOLVE = "RESOLVE",
  OVERRIDE = "OVERRIDE",
}

export enum ReconciliationChannel {
  BANK_API = "BANK_API",
  FILE_UPLOAD = "FILE_UPLOAD",
  MANUAL = "MANUAL",
  WEBHOOK = "WEBHOOK",
  EMAIL = "EMAIL",
}

export enum CurrencyReconciliationType {
  SINGLE = "SINGLE",
  MULTI_CURRENCY = "MULTI_CURRENCY",
  CROSS_BORDER = "CROSS_BORDER",
}

export enum ReconciliationExportFormat {
  CSV = "CSV",
  EXCEL = "EXCEL",
  PDF = "PDF",
  JSON = "JSON",
}

export interface ReconciliationJob {
  id: string;
  schoolId: string;
  jobName: string;
  reconciliationType: ReconciliationType;
  sourceA: ReconciliationSource;
  sourceB: ReconciliationSource;
  status: ReconciliationStatus;
  frequency: ReconciliationFrequency;
  totalRecords: number;
  matchedCount: number;
  unmatchedCount: number;
  matchRate: number;
  startedAt: Date;
  completedAt: Date | null;
  triggeredBy: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ReconciliationRule {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  reconciliationType: ReconciliationType;
  matchCriteria: MatchCriteria[];
  toleranceAmount: number;
  toleranceDays: number;
  priority: number;
  enabled: boolean;
  autoResolve: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface MatchCriteria {
  field: string;
  matchType: MatchMethod;
  weight: number;
  required: boolean;
}

export interface ReconciliationMatch {
  id: string;
  schoolId: string;
  jobId: string;
  sourceARecordId: string;
  sourceBRecordId: string;
  matchScore: number;
  matchMethod: MatchMethod;
  matchedFields: string[];
  amountA: number;
  amountB: number;
  amountDifference: number;
  dateA: Date;
  dateB: Date;
  dateDifference: number;
  autoMatched: boolean;
  confirmedBy: string | null;
  confirmedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ReconciliationMismatch {
  id: string;
  schoolId: string;
  jobId: string;
  sourceARecordId: string;
  sourceBRecordId: string | null;
  mismatchReason: UnmatchReason;
  amountA: number;
  amountB: number | null;
  description: string;
  status: MatchStatus;
  assignedTo: string | null;
  resolution: string | null;
  resolvedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ReconciliationReport {
  id: string;
  schoolId: string;
  jobId: string;
  reportDate: Date;
  period: string;
  totalTransactionsA: number;
  totalTransactionsB: number;
  matchedCount: number;
  unmatchedCount: number;
  matchRate: number;
  totalAmountA: number;
  totalAmountB: number;
  discrepancyAmount: number;
  status: string;
  generatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ReconciliationDispute {
  id: string;
  schoolId: string;
  jobId: string;
  matchId: string;
  status: DisputeStatus;
  priority: DisputePriority;
  raisedBy: string;
  reason: string;
  supportingDocuments: string[];
  resolution: string | null;
  resolvedBy: string | null;
  raisedAt: Date;
  resolvedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface SettlementTracking {
  id: string;
  schoolId: string;
  jobId: string;
  matchId: string;
  settlementAmount: number;
  settlementDate: Date;
  settlementMethod: string;
  status: SettlementStatus;
  referenceNumber: string;
  bankReference: string | null;
  processedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ReconciliationBatch {
  id: string;
  schoolId: string;
  batchName: string;
  reconciliationType: ReconciliationType;
  recordCount: number;
  processedCount: number;
  matchedCount: number;
  failedCount: number;
  status: BatchStatus;
  startedAt: Date;
  completedAt: Date | null;
  errorLog: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ReconciliationSchedule {
  id: string;
  schoolId: string;
  reconciliationType: ReconciliationType;
  frequency: ReconciliationFrequency;
  nextRunDate: Date;
  lastRunDate: Date | null;
  enabled: boolean;
  alertOnFailure: boolean;
  notifyEmail: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface AutoMatchResult {
  id: string;
  schoolId: string;
  jobId: string;
  totalCandidates: number;
  autoMatched: number;
  confidenceThreshold: number;
  matchMethod: MatchMethod;
  processingTimeMs: number;
  unmatchedCandidates: number;
  falsePositiveRate: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ManualMatchResult {
  id: string;
  schoolId: string;
  jobId: string;
  matchId: string;
  operatorId: string;
  action: string;
  reason: string;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface DuplicateDetection {
  id: string;
  schoolId: string;
  jobId: string;
  sourceRecordId: string;
  duplicateRecordIds: string[];
  similarityScore: number;
  duplicateType: string;
  detectedAt: Date;
  resolved: boolean;
  resolvedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface UnmatchedTransaction {
  id: string;
  schoolId: string;
  jobId: string;
  source: ReconciliationSource;
  recordId: string;
  amount: number;
  transactionDate: Date;
  description: string;
  reference: string;
  reason: UnmatchReason;
  assignedTo: string | null;
  status: MatchStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ReconciliationAudit {
  id: string;
  schoolId: string;
  jobId: string;
  action: AuditAction;
  performedBy: string;
  details: string;
  oldValue: string | null;
  newValue: string | null;
  timestamp: Date;
  ipAddress: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ReconciliationTemplate {
  id: string;
  schoolId: string;
  name: string;
  reconciliationType: ReconciliationType;
  sourceA: ReconciliationSource;
  sourceB: ReconciliationSource;
  matchCriteria: MatchCriteria[];
  autoMatchEnabled: boolean;
  createdBy: string;
  usageCount: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ReconciliationNotification {
  id: string;
  schoolId: string;
  jobId: string;
  notificationType: string;
  recipientEmail: string;
  title: string;
  message: string;
  sentAt: Date;
  readAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ReconciliationDashboard {
  id: string;
  schoolId: string;
  totalJobs: number;
  completedJobs: number;
  pendingJobs: number;
  failedJobs: number;
  overallMatchRate: number;
  totalDiscrepancies: number;
  period: string;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ReconciliationConfiguration {
  id: string;
  schoolId: string;
  defaultToleranceAmount: number;
  defaultToleranceDays: number;
  autoMatchEnabled: boolean;
  autoMatchThreshold: number;
  alertOnFailure: boolean;
  maxRetries: number;
  timeoutMinutes: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ReconciliationPerformance {
  id: string;
  schoolId: string;
  period: string;
  totalJobsRun: number;
  averageMatchRate: number;
  averageProcessingTimeMs: number;
  totalDiscrepanciesFound: number;
  totalDiscrepanciesResolved: number;
  averageResolutionTimeHours: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ReconciliationExport {
  id: string;
  schoolId: string;
  jobId: string;
  exportFormat: string;
  fileUrl: string;
  recordCount: number;
  exportedBy: string;
  exportedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ReconciliationSplit {
  id: string;
  schoolId: string;
  matchId: string;
  splitType: string;
  originalAmount: number;
  splitAmounts: SplitAmount[];
  reason: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface SplitAmount {
  targetRecordId: string;
  amount: number;
}

export interface ReconciliationRuleEffectiveness {
  id: string;
  schoolId: string;
  ruleId: string;
  period: string;
  timesApplied: number;
  matchRate: number;
  falsePositiveRate: number;
  averageConfidence: number;
  lastAppliedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ReconciliationSourceConfig {
  id: string;
  schoolId: string;
  source: ReconciliationSource;
  connectionType: string;
  credentials: Record<string, string>;
  syncEnabled: boolean;
  lastSyncAt: Date | null;
  errorMessage: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
