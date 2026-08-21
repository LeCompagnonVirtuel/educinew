export enum DataProductType {
  REVENUE = "REVENUE",
  EXPENSE = "EXPENSE",
  BUDGET = "BUDGET",
  PAYMENT = "PAYMENT",
  SCHOLARSHIP = "SCHOLARSHIP",
  ENROLLMENT = "ENROLLMENT",
  COMPLIANCE = "COMPLIANCE",
  FORECAST = "FORECAST",
  ANALYTICS = "ANALYTICS",
  REFERENCE = "REFERENCE",
}

export enum DataContractStatus {
  DRAFT = "DRAFT",
  PROPOSED = "PROPOSED",
  APPROVED = "APPROVED",
  ACTIVE = "ACTIVE",
  DEPRECATED = "DEPRECATED",
  RETIRED = "RETIRED",
}

export enum DataSourceType {
  DATABASE = "DATABASE",
  API = "API",
  FILE = "FILE",
  STREAM = "STREAM",
  WEBHOOK = "WEBHOOK",
  MANUAL = "MANUAL",
}

export enum DataQualityLevel {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  INFORMATIONAL = "INFORMATIONAL",
}

export enum DataFreshness {
  REAL_TIME = "REAL_TIME",
  NEAR_REAL_TIME = "NEAR_REAL_TIME",
  HOURLY = "HOURLY",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
}

export enum DataGovernanceLevel {
  PUBLIC = "PUBLIC",
  INTERNAL = "INTERNAL",
  CONFIDENTIAL = "CONFIDENTIAL",
  RESTRICTED = "RESTRICTED",
  TOP_SECRET = "TOP_SECRET",
}

export enum SchemaFormat {
  JSON = "JSON",
  AVRO = "AVRO",
  PARQUET = "PARQUET",
  CSV = "CSV",
  XML = "XML",
}

export enum DataLineageType {
  UPSTREAM = "UPSTREAM",
  DOWNSTREAM = "DOWNSTREAM",
  BIDIRECTIONAL = "BIDIRECTIONAL",
}

export enum QualityCheckType {
  COMPLETENESS = "COMPLETENESS",
  ACCURACY = "ACCURACY",
  CONSISTENCY = "CONSISTENCY",
  TIMELINESS = "TIMELINESS",
  UNIQUENESS = "UNIQUENESS",
  VALIDITY = "VALIDITY",
}

export enum DataAccessLevel {
  READ = "READ",
  WRITE = "WRITE",
  ADMIN = "ADMIN",
  EXECUTE = "EXECUTE",
}

export enum DataProductStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  DEPRECATED = "DEPRECATED",
  ARCHIVED = "ARCHIVED",
}

export enum DataRefreshMode {
  PUSH = "PUSH",
  PULL = "PULL",
  HYBRID = "HYBRID",
}

export enum DataPartitionStrategy {
  HASH = "HASH",
  RANGE = "RANGE",
  LIST = "LIST",
  COMPOSITE = "COMPOSITE",
}

export enum DataContractVersioning {
  SEMANTIC = "SEMANTIC",
  SEQUENTIAL = "SEQUENTIAL",
  TIMESTAMP = "TIMESTAMP",
}

export enum DataProductDiscoveryMode {
  MANUAL = "MANUAL",
  AUTO = "AUTO",
  SEMI_AUTO = "SEMI_AUTO",
}

export interface FinancialDataProduct {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  productType: DataProductType;
  owner: string;
  domain: string;
  status: string;
  qualityLevel: DataQualityLevel;
  freshness: DataFreshness;
  governanceLevel: DataGovernanceLevel;
  schema: DataProductSchema;
  accessPolicy: DataAccessPolicy;
  lastUpdated: Date;
  consumerCount: number;
  sla: DataSLA;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface DataSLA {
  availabilityPercent: number;
  freshnessMinutes: number;
  completenessPercent: number;
}

export interface FinancialDataContract {
  id: string;
  schoolId: string;
  productId: string;
  version: string;
  status: DataContractStatus;
  schema: DataProductSchema;
  qualityRules: DataQualityRule[];
  SLA: DataSLA;
  consumers: string[];
  providers: string[];
  effectiveDate: Date;
  expirationDate: Date | null;
  approvedBy: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FinancialDataSource {
  id: string;
  schoolId: string;
  productId: string;
  name: string;
  sourceType: DataSourceType;
  connectionConfig: Record<string, string>;
  refreshFrequency: DataFreshness;
  lastSyncDate: Date | null;
  status: string;
  recordCount: number;
  errorMessage: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FinancialDataQuality {
  id: string;
  schoolId: string;
  productId: string;
  checkType: QualityCheckType;
  ruleName: string;
  threshold: number;
  currentValue: number;
  passed: boolean;
  lastCheckedAt: Date;
  trend: string;
  violations: QualityViolation[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface QualityViolation {
  recordId: string;
  field: string;
  expectedValue: string;
  actualValue: string;
  detectedAt: Date;
}

export interface FinancialDataLineage {
  id: string;
  schoolId: string;
  productId: string;
  lineageType: DataLineageType;
  sourceProductId: string | null;
  targetProductId: string | null;
  transformation: string;
  pipeline: string;
  nodes: DataLineageNode[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FinancialDataFreshness {
  id: string;
  schoolId: string;
  productId: string;
  expectedFreshness: DataFreshness;
  actualFreshness: DataFreshness;
  lastUpdated: Date;
  stalenessMinutes: number;
  isStale: boolean;
  alertThreshold: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FinancialDataGovernance {
  id: string;
  schoolId: string;
  productId: string;
  governanceLevel: DataGovernanceLevel;
  owner: string;
  steward: string;
  retentionPolicy: string;
  accessControl: string;
  classification: string;
  complianceRequirements: string[];
  lastAuditDate: Date;
  nextAuditDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface DataMeshConfig {
  id: string;
  schoolId: string;
  meshName: string;
  domain: string;
  infrastructuralNodes: string[];
  discoveryEndpoint: string;
  globalPolicies: string[];
  defaultGovernanceLevel: DataGovernanceLevel;
  defaultFreshness: DataFreshness;
  monitoringEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface DataProductSchema {
  format: SchemaFormat;
  fields: SchemaField[];
  version: string;
  schemaDefinition: string;
}

export interface SchemaField {
  name: string;
  type: string;
  nullable: boolean;
  description: string;
  constraints: string[];
}

export interface DataAccessPolicy {
  allowedRoles: string[];
  allowedDomains: string[];
  encryptionRequired: boolean;
  anonymizationRequired: boolean;
  auditLogging: boolean;
  rateLimit: number;
}

export interface DataQualityRule {
  id: string;
  ruleType: QualityCheckType;
  fieldName: string;
  condition: string;
  threshold: number;
  severity: DataQualityLevel;
  enabled: boolean;
}

export interface DataLineageNode {
  nodeId: string;
  nodeType: string;
  name: string;
  upstream: string[];
  downstream: string[];
  transformation: string | null;
}

export interface DataProductVersion {
  id: string;
  schoolId: string;
  productId: string;
  version: string;
  schema: DataProductSchema;
  changelog: string;
  publishedBy: string;
  publishedAt: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface DataProductSubscription {
  id: string;
  schoolId: string;
  productId: string;
  subscriberId: string;
  accessLevel: DataAccessLevel;
  subscriptionDate: Date;
  expiryDate: Date | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface DataQualityReport {
  id: string;
  schoolId: string;
  productId: string;
  reportDate: Date;
  overallScore: number;
  completenessScore: number;
  accuracyScore: number;
  consistencyScore: number;
  timelinessScore: number;
  violations: QualityViolation[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface DataPartition {
  id: string;
  schoolId: string;
  productId: string;
  partitionKey: string;
  partitionValue: string;
  recordCount: number;
  sizeBytes: number;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface DataAccessLog {
  id: string;
  schoolId: string;
  productId: string;
  userId: string;
  accessLevel: DataAccessLevel;
  queryType: string;
  recordCount: number;
  executionTimeMs: number;
  accessedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface DataProductMetric {
  id: string;
  schoolId: string;
  productId: string;
  metricName: string;
  metricValue: number;
  metricUnit: string;
  period: string;
  calculatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface DataDomainConfig {
  id: string;
  schoolId: string;
  domainName: string;
  description: string;
  owner: string;
  products: string[];
  governanceLevel: DataGovernanceLevel;
  freshness: DataFreshness;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface DataProductVersion {
  id: string;
  schoolId: string;
  productId: string;
  version: string;
  schema: DataProductSchema;
  changelog: string;
  publishedBy: string;
  publishedAt: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface DataProductSubscription {
  id: string;
  schoolId: string;
  productId: string;
  subscriberId: string;
  accessLevel: DataAccessLevel;
  subscriptionDate: Date;
  expiryDate: Date | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface DataQualityReport {
  id: string;
  schoolId: string;
  productId: string;
  reportDate: Date;
  overallScore: number;
  completenessScore: number;
  accuracyScore: number;
  consistencyScore: number;
  timelinessScore: number;
  violations: QualityViolation[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface DataPartition {
  id: string;
  schoolId: string;
  productId: string;
  partitionKey: string;
  partitionValue: string;
  recordCount: number;
  sizeBytes: number;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface DataAccessLog {
  id: string;
  schoolId: string;
  productId: string;
  userId: string;
  accessLevel: DataAccessLevel;
  queryType: string;
  recordCount: number;
  executionTimeMs: number;
  accessedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface DataProductMetric {
  id: string;
  schoolId: string;
  productId: string;
  metricName: string;
  metricValue: number;
  metricUnit: string;
  period: string;
  calculatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface DataProductDiscovery {
  id: string;
  schoolId: string;
  productId: string;
  discoveryMode: DataProductDiscoveryMode;
  searchQuery: string;
  tags: string[];
  domain: string;
  lastDiscoveredAt: Date;
  discoveryScore: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface DataContractVersionHistory {
  id: string;
  schoolId: string;
  contractId: string;
  version: string;
  versioning: DataContractVersioning;
  schemaChanges: string[];
  breakingChanges: boolean;
  publishedBy: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface DataProductDependency {
  id: string;
  schoolId: string;
  productId: string;
  dependsOnProductId: string;
  dependencyType: string;
  criticality: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface DataMeshNotification {
  id: string;
  schoolId: string;
  productId: string;
  notificationType: string;
  title: string;
  message: string;
  recipientId: string;
  sentAt: Date;
  readAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
