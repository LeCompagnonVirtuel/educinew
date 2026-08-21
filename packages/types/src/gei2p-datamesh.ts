export enum DataDomain {
  STUDENTS = "STUDENTS",
  TEACHERS = "TEACHERS",
  INSTITUTIONS = "INSTITUTIONS",
  ACADEMIC_RESULTS = "ACADEMIC_RESULTS",
  CREDENTIALS = "CREDENTIALS",
  FINANCE = "FINANCE",
  RESEARCH = "RESEARCH",
  EMPLOYMENT = "EMPLOYMENT",
  MOBILITY = "MOBILITY",
  SKILLS = "SKILLS",
  CERTIFICATIONS = "CERTIFICATIONS",
  CURRICULUM = "CURRICULUM",
  ASSESSMENTS = "ASSESSMENTS",
  ATTENDANCE = "ATTENDANCE",
  TRANSPORT = "TRANSPORT",
  LIBRARY = "LIBRARY",
  HEALTH = "HEALTH",
  DISCIPLINE = "DISCIPLINE",
  DOCUMENTS = "DOCUMENTS",
  COMMUNICATION = "COMMUNICATION",
}

export enum DataProductStatus {
  DRAFT = "DRAFT",
  DEVELOPMENT = "DEVELOPMENT",
  TESTING = "TESTING",
  STAGING = "STAGING",
  PRODUCTION = "PRODUCTION",
  DEPRECATED = "DEPRECATED",
  RETIRED = "RETIRED",
  ARCHIVED = "ARCHIVED",
}

export enum OwnershipRole {
  DATA_OWNER = "DATA_OWNER",
  DATA_STEWARD = "DATA_STEWARD",
  DOMAIN_OWNER = "DOMAIN_OWNER",
  PRODUCT_OWNER = "PRODUCT_OWNER",
  CUSTODIAN = "CUSTODIAN",
  ADMINISTRATOR = "ADMINISTRATOR",
  VIEWER = "VIEWER",
}

export enum ContractStatus {
  DRAFT = "DRAFT",
  PENDING_APPROVAL = "PENDING_APPROVAL",
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  SUSPENDED = "SUSPENDED",
  TERMINATED = "TERMINATED",
  UNDER_REVIEW = "UNDER_REVIEW",
  VIOLATED = "VIOLATED",
}

export enum SchemaType {
  AVRO = "AVRO",
  JSON_SCHEMA = "JSON_SCHEMA",
  PROTOBUF = "PROTOBUF",
  XML_SCHEMA = "XML_SCHEMA",
  SQL_DDL = "SQL_DDL",
  PARQUET = "PARQUET",
  YAML = "YAML",
  CUSTOM = "CUSTOM",
}

export enum QualityScore {
  EXCELLENT = "EXCELLENT",
  GOOD = "GOOD",
  ACCEPTABLE = "ACCEPTABLE",
  POOR = "POOR",
  CRITICAL = "CRITICAL",
}

export enum FreshnessLevel {
  REAL_TIME = "REAL_TIME",
  NEAR_REAL_TIME = "NEAR_REAL_TIME",
  HOURLY = "HOURLY",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  ANNUAL = "ANNUAL",
  STATIC = "STATIC",
}

export enum AvailabilityLevel {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  BEST_EFFORT = "BEST_EFFORT",
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

export enum DataProductType {
  DOMAIN = "DOMAIN",
  CONSUMPTION = "CONSUMPTION",
  SOURCE = "SOURCE",
  TRANSFORMATION = "TRANSFORMATION",
  AGGREGATION = "AGGREGATION",
  PRESENTATION = "PRESENTATION",
  DERIVED = "DERIVED",
  REFERENCE = "REFERENCE",
}

export enum SchemaEvolutionStrategy {
  BACKWARD_COMPATIBLE = "BACKWARD_COMPATIBLE",
  FORWARD_COMPATIBLE = "FORWARD_COMPATIBLE",
  FULL_COMPATIBLE = "FULL_COMPATIBLE",
  BREAKING = "BREAKING",
}

export enum DataAccessPattern {
  BATCH = "BATCH",
  STREAMING = "STREAMING",
  REQUEST_RESPONSE = "REQUEST_RESPONSE",
  EVENT_DRIVEN = "EVENT_DRIVEN",
  GRAPHQL = "GRAPHQL",
  REST = "REST",
  GRPC = "GRPC",
}

export enum DataStorageType {
  OLTP = "OLTP",
  OLAP = "OLAP",
  DATA_LAKE = "DATA_LAKE",
  CACHE = "CACHE",
  SEARCH = "SEARCH",
  TIME_SERIES = "TIME_SERIES",
  GRAPH = "GRAPH",
  DOCUMENT = "DOCUMENT",
}

export enum DataPartitionStrategy {
  HASH = "HASH",
  RANGE = "RANGE",
  LIST = "LIST",
  GEOGRAPHIC = "GEOGRAPHIC",
  TEMPORAL = "TEMPORAL",
  DOMAIN = "DOMAIN",
}

export enum SLALevel {
  TIER_1 = "TIER_1",
  TIER_2 = "TIER_2",
  TIER_3 = "TIER_3",
  TIER_4 = "TIER_4",
}

export enum DataClassification {
  PUBLIC = "PUBLIC",
  INTERNAL = "INTERNAL",
  CONFIDENTIAL = "CONFIDENTIAL",
  RESTRICTED = "RESTRICTED",
}

export enum MetricType {
  COMPLETENESS = "COMPLETENESS",
  ACCURACY = "ACCURACY",
  CONSISTENCY = "CONSISTENCY",
  TIMELINESS = "TIMELINESS",
  VALIDITY = "VALIDITY",
  UNIQUENESS = "UNIQUENESS",
}

export enum DataLineageDirection {
  UPSTREAM = "UPSTREAM",
  DOWNSTREAM = "DOWNSTREAM",
  BIDIRECTIONAL = "BIDIRECTIONAL",
}

export enum ContractViolationType {
  SCHEMA = "SCHEMA",
  FRESHNESS = "FRESHNESS",
  QUALITY = "QUALITY",
  AVAILABILITY = "AVAILABILITY",
  VOLUME = "VOLUME",
  ACCESS = "ACCESS",
}

export enum ProductDiscoveryStatus {
  HIDDEN = "HIDDEN",
  DISCOVERABLE = "DISCOVERABLE",
  PROMOTED = "PROMOTED",
  FEATURED = "FEATURED",
}

export interface DataProduct {
  id: string;
  name: string;
  description: string;
  domain: DataDomain;
  type: DataProductType;
  status: DataProductStatus;
  version: string;
  owner: DataOwner;
  stewards: DataSteward[];
  schema: DataSchema;
  contract: DataContract;
  quality: DataQuality;
  freshness: DataFreshness;
  availability: DataAvailability;
  lineage: DataLineageEntry[];
  tags: string[];
  classification: DataClassification;
  accessPattern: DataAccessPattern;
  storageType: DataStorageType;
  sla: DataSLA;
  metrics: DataProductMetrics;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
  metadata: Record<string, unknown>;
}

export interface DataDomainConfig {
  id: string;
  name: string;
  description: string;
  domain: DataDomain;
  owner: DataOwner;
  products: DataProduct[];
  policies: DataGovernancePolicy[];
  schemas: DataSchema[];
  status: DataProductStatus;
  createdAt: Date;
  updatedAt: Date;
  metadata: Record<string, unknown>;
}

export interface DataOwner {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: OwnershipRole;
  domain: DataDomain;
  institutionId: string;
  schoolId: string;
  permissions: DataPermission[];
  assignedAt: Date;
  active: boolean;
}

export interface DataSteward {
  id: string;
  userId: string;
  name: string;
  email: string;
  domain: DataDomain;
  responsibilities: string[];
  assignedAt: Date;
  active: boolean;
}

export interface DataContract {
  id: string;
  productId: string;
  version: string;
  status: ContractStatus;
  schemaId: string;
  freshness: FreshnessLevel;
  availability: AvailabilityLevel;
  qualityThreshold: number;
  retentionPeriod: number;
  accessPolicy: string;
  sla: DataSLA;
  violations: ContractViolation[];
  createdBy: string;
  approvedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date | null;
}

export interface ContractViolation {
  id: string;
  type: ContractViolationType;
  description: string;
  detectedAt: Date;
  resolvedAt: Date | null;
  severity: string;
  impact: string;
}

export interface DataSchema {
  id: string;
  productId: string;
  type: SchemaType;
  version: string;
  definition: Record<string, unknown>;
  fields: SchemaField[];
  evolutionStrategy: SchemaEvolutionStrategy;
  compatible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SchemaField {
  name: string;
  type: string;
  nullable: boolean;
  description: string | null;
  constraints: SchemaConstraint[];
  tags: string[];
}

export interface SchemaConstraint {
  type: string;
  value: unknown;
  description: string | null;
}

export interface DataLineageEntry {
  id: string;
  sourceProductId: string;
  targetProductId: string;
  direction: DataLineageDirection;
  transformation: string | null;
  frequency: string;
  active: boolean;
  createdAt: Date;
}

export interface DataQuality {
  score: QualityScore;
  metrics: DataQualityMetric[];
  lastAssessedAt: Date;
  trend: string;
  issues: DataQualityIssue[];
  rules: DataQualityRule[];
}

export interface DataQualityMetric {
  type: MetricType;
  value: number;
  threshold: number;
  passing: boolean;
  measuredAt: Date;
}

export interface DataQualityIssue {
  id: string;
  type: string;
  description: string;
  severity: string;
  detectedAt: Date;
  resolvedAt: Date | null;
  affectedRecords: number;
}

export interface DataQualityRule {
  id: string;
  name: string;
  type: MetricType;
  expression: string;
  threshold: number;
  active: boolean;
}

export interface DataFreshness {
  level: FreshnessLevel;
  lastUpdated: Date;
  expectedUpdateAt: Date | null;
  slaBreached: boolean;
  consecutiveBreaches: number;
  monitoringEnabled: boolean;
}

export interface DataAvailability {
  level: AvailabilityLevel;
  uptime: number;
  lastIncident: Date | null;
  incidentCount: number;
  maintenanceWindow: string | null;
  backupEnabled: boolean;
  replicationFactor: number;
}

export interface DataGovernancePolicy {
  id: string;
  name: string;
  description: string;
  type: GovernancePolicyType;
  domain: DataDomain;
  rules: GovernanceRule[];
  enforcementLevel: string;
  active: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GovernanceRule {
  id: string;
  name: string;
  description: string;
  condition: string;
  action: string;
  severity: string;
  active: boolean;
}

export interface DataProductConfig {
  id: string;
  productId: string;
  accessPattern: DataAccessPattern;
  storageType: DataStorageType;
  partitionStrategy: DataPartitionStrategy;
  replicationFactor: number;
  cachingEnabled: boolean;
  cacheTtl: number | null;
  compressionEnabled: boolean;
  encryptionEnabled: boolean;
  retentionDays: number;
  metadata: Record<string, unknown>;
}

export interface DataProductMetrics {
  totalProducts: number;
  activeProducts: number;
  totalDomains: number;
  averageQualityScore: number;
  totalDataAssets: number;
  totalConsumers: number;
  totalProviders: number;
  contractViolations: number;
  freshnessBreaches: number;
  qualityIssues: number;
  uptime: number;
  lastCalculatedAt: Date;
}

export interface DataSLA {
  level: SLALevel;
  availability: number;
  latencyMs: number;
  freshnessMinutes: number;
  qualityThreshold: number;
  supportResponseHours: number;
  penalties: SLAPenalty[];
}

export interface SLAPenalty {
  condition: string;
  percentage: number;
  maxAmount: number | null;
}

export interface DataPermission {
  id: string;
  resource: string;
  actions: string[];
  conditions: Record<string, unknown> | null;
  grantedAt: Date;
  expiresAt: Date | null;
}

export interface DataProductDependency {
  id: string;
  sourceProductId: string;
  targetProductId: string;
  type: string;
  critical: boolean;
  active: boolean;
}

export interface DataConsumer {
  id: string;
  productId: string;
  userId: string;
  institutionId: string;
  accessLevel: string;
  lastAccessedAt: Date;
  accessCount: number;
  active: boolean;
}

export interface DataCatalogEntry {
  id: string;
  productId: string;
  name: string;
  description: string;
  domain: DataDomain;
  type: DataProductType;
  owner: DataOwner;
  tags: string[];
  classification: DataClassification;
  popularity: number;
  discoveryStatus: ProductDiscoveryStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface DataPartition {
  id: string;
  productId: string;
  key: string;
  strategy: DataPartitionStrategy;
  sizeBytes: number;
  recordCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DataReplica {
  id: string;
  productId: string;
  region: string;
  status: string;
  lagMs: number;
  lastSyncedAt: Date;
  primary: boolean;
}

export interface DataBackup {
  id: string;
  productId: string;
  type: string;
  sizeBytes: number;
  location: string;
  createdAt: Date;
  expiresAt: Date;
  verified: boolean;
}

export interface DataMigration {
  id: string;
  sourceProductId: string;
  targetProductId: string;
  status: string;
  recordsTotal: number;
  recordsMigrated: number;
  startedAt: Date;
  completedAt: Date | null;
  errors: DataMigrationError[];
}

export interface DataMigrationError {
  recordId: string;
  error: string;
  timestamp: Date;
}

export interface DataProductVersion {
  id: string;
  productId: string;
  version: string;
  changelog: string;
  schemaVersion: string;
  breaking: boolean;
  publishedBy: string;
  publishedAt: Date;
}

export interface DataAggregation {
  id: string;
  name: string;
  description: string;
  sourceProducts: string[];
  targetProduct: string;
  aggregationType: string;
  schedule: string | null;
  active: boolean;
  lastRunAt: Date | null;
}

export interface DataTransform {
  id: string;
  name: string;
  description: string;
  sourceSchema: string;
  targetSchema: string;
  expression: string;
  type: string;
  active: boolean;
}

export interface DataObservability {
  productId: string;
  healthScore: number;
  freshnessScore: number;
  qualityScore: number;
  completenessScore: number;
  volumeAnomaly: boolean;
  latencyMs: number;
  errorRate: number;
  lastCheckedAt: Date;
}

export interface DataGovernanceReport {
  id: string;
  domain: DataDomain;
  period: string;
  totalProducts: number;
  compliantProducts: number;
  averageQuality: number;
  violations: number;
  recommendations: string[];
  generatedAt: Date;
  generatedBy: string;
}

export enum DataProductCategory {
  CORE = "CORE",
  DERIVED = "DERIVED",
  AGGREGATED = "AGGREGATED",
  REFERENCE = "REFERENCE",
  ANALYTICS = "ANALYTICS",
  REPORTING = "REPORTING",
  OPERATIONAL = "OPERATIONAL",
}

export enum SchemaCompatibilityLevel {
  BACKWARD = "BACKWARD",
  FORWARD = "FORWARD",
  FULL = "FULL",
  NONE = "NONE",
}

export enum DataProductCriticality {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum DataSharingProtocol {
  PUSH = "PUSH",
  PULL = "PULL",
  EVENT = "EVENT",
  QUERY = "QUERY",
  FEDERATED = "FEDERATED",
}

export enum DataContractEnforcement {
  STRICT = "STRICT",
  WARN = "WARN",
  MONITOR = "MONITOR",
  DISABLED = "DISABLED",
}

export enum QualityDimension {
  COMPLETENESS = "COMPLETENESS",
  ACCURACY = "ACCURACY",
  CONSISTENCY = "CONSISTENCY",
  TIMELINESS = "TIMELINESS",
  VALIDITY = "VALIDITY",
  UNIQUENESS = "UNIQUENESS",
  INTEGRITY = "INTEGRITY",
}

export enum DataProductMaturity {
  INITIAL = "INITIAL",
  DEVELOPING = "DEVELOPING",
  DEFINED = "DEFINED",
  MANAGED = "MANAGED",
  OPTIMIZING = "OPTIMIZING",
}

export enum DataDiscoveryMethod {
  CATALOG = "CATALOG",
  SEARCH = "SEARCH",
  TAG = "TAG",
  LINEAGE = "LINEAGE",
  RECOMMENDATION = "RECOMMENDATION",
}

export enum SchemaChangeImpact {
  NONE = "NONE",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  BREAKING = "BREAKING",
}

export enum DataProductTier {
  BRONZE = "BRONZE",
  SILVER = "SILVER",
  GOLD = "GOLD",
  PLATINUM = "PLATINUM",
}

export enum ContractNegotiationStatus {
  PROPOSED = "PROPOSED",
  UNDER_REVIEW = "UNDER_REVIEW",
  NEGOTIATING = "NEGOTIATING",
  AGREED = "AGREED",
  REJECTED = "REJECTED",
}

export enum DataQualityRuleType {
  COMPLETENESS = "COMPLETENESS",
  RANGE = "RANGE",
  PATTERN = "PATTERN",
  UNIQUENESS = "UNIQUENESS",
  REFERENTIAL = "REFERENTIAL",
  CUSTOM = "CUSTOM",
}

export enum DataStewardScope {
  DOMAIN = "DOMAIN",
  PRODUCT = "PRODUCT",
  SCHEMA = "SCHEMA",
  QUALITY = "QUALITY",
  GOVERNANCE = "GOVERNANCE",
}

export enum DataCatalogSearchType {
  KEYWORD = "KEYWORD",
  ATTRIBUTE = "ATTRIBUTE",
  LINEAGE = "LINEAGE",
  TAG = "TAG",
  DOMAIN = "DOMAIN",
}

export enum DataProductDependencyType {
  SOURCE = "SOURCE",
  CONSUMER = "CONSUMER",
  PEER = "PEER",
}

export enum SchemaRegistryFormat {
  AVRO = "AVRO",
  JSON = "JSON",
  PROTOBUF = "PROTOBUF",
  XML = "XML",
  CUSTOM = "CUSTOM",
}

export enum DataPartitionKey {
  DOMAIN = "DOMAIN",
  REGION = "REGION",
  DATE = "DATE",
  TENANT = "TENANT",
  HASH = "HASH",
}

export enum DataReplicationMode {
  SYNCHRONOUS = "SYNCHRONOUS",
  ASYNCHRONOUS = "ASYNCHRONOUS",
  EVENTUAL = "EVENTUAL",
  REAL_TIME = "REAL_TIME",
}

export enum DataProductHealthStatus {
  HEALTHY = "HEALTHY",
  DEGRADED = "DEGRADED",
  UNHEALTHY = "UNHEALTHY",
  UNKNOWN = "UNKNOWN",
}

export enum SchemaValidationMode {
  NONE = "NONE",
  WARN = "WARN",
  STRICT = "STRICT",
}

export enum DataLineageGranularity2 {
  FIELD = "FIELD",
  RECORD = "RECORD",
  TABLE = "TABLE",
  DATASET = "DATASET",
}

export interface DataProductRegistration {
  id: string;
  productId: string;
  registeredBy: string;
  registeredAt: Date;
  approvedBy: string | null;
  approvedAt: Date | null;
  status: DataProductStatus;
  metadata: Record<string, unknown>;
}

export interface DataProductDeployment {
  id: string;
  productId: string;
  version: string;
  environment: string;
  status: string;
  deployedBy: string;
  deployedAt: Date;
  rollbackVersion: string | null;
  metadata: Record<string, unknown>;
}

export interface DataProductTestCase {
  id: string;
  productId: string;
  name: string;
  type: string;
  expression: string;
  expected: unknown;
  passed: boolean | null;
  lastRun: Date;
  metadata: Record<string, unknown>;
}

export interface DataContractNegotiation {
  id: string;
  contractId: string;
  providerId: string;
  consumerId: string;
  status: ContractNegotiationStatus;
  terms: Record<string, unknown>;
  counterTerms: Record<string, unknown> | null;
  startedAt: Date;
  completedAt: Date | null;
  metadata: Record<string, unknown>;
}

export interface DataProductTag {
  id: string;
  productId: string;
  tag: string;
  category: string;
  createdBy: string;
  createdAt: Date;
}

export interface DataSchemaVersion {
  id: string;
  schemaId: string;
  version: string;
  definition: Record<string, unknown>;
  compatibility: SchemaCompatibilityLevel;
  changeImpact: SchemaChangeImpact;
  publishedBy: string;
  publishedAt: Date;
  deprecated: boolean;
}

export interface DataQualityRuleResult {
  id: string;
  ruleId: string;
  productId: string;
  passed: boolean;
  value: unknown;
  threshold: unknown;
  executedAt: Date;
  duration: number;
}

export interface DataProductAccessPolicy {
  id: string;
  productId: string;
  policyType: string;
  rules: DataAccessRule[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DataAccessRule {
  id: string;
  principal: string;
  actions: string[];
  conditions: Record<string, unknown> | null;
}

export interface DataDomainMetrics {
  domainId: string;
  totalProducts: number;
  activeProducts: number;
  averageQuality: number;
  totalConsumers: number;
  totalProviders: number;
  contractViolations: number;
  lastCalculated: Date;
}

export interface DataProductLineage {
  productId: string;
  upstream: DataLineageEntry[];
  downstream: DataLineageEntry[];
  depth: number;
  breadth: number;
  lastTraced: Date;
}

export interface DataContractVersion {
  id: string;
  contractId: string;
  version: string;
  changes: string[];
  publishedBy: string;
  publishedAt: Date;
  active: boolean;
}

export interface DataStewardAssignment {
  id: string;
  stewardId: string;
  productId: string;
  scope: DataStewardScope;
  assignedBy: string;
  assignedAt: Date;
  active: boolean;
}

export interface DataQualityDashboard {
  id: string;
  domainId: string | null;
  overallScore: QualityScore;
  dimensionScores: QualityDimensionScore[];
  trendData: QualityTrendEntry[];
  lastUpdated: Date;
}

export interface QualityDimensionScore {
  dimension: QualityDimension;
  score: number;
  trend: string;
  issues: number;
}

export interface QualityTrendEntry {
  date: Date;
  score: number;
  issues: number;
}

export interface DataProductImpact {
  productId: string;
  consumers: DataProductImpactConsumer[];
  criticality: DataProductCriticality;
  blastRadius: number;
  lastAssessed: Date;
}

export interface DataProductImpactConsumer {
  consumerId: string;
  dependencyType: DataProductDependencyType;
  criticality: string;
}

export interface DataCatalogFacet {
  name: string;
  values: DataCatalogFacetValue[];
}

export interface DataCatalogFacetValue {
  value: string;
  count: number;
}

export interface DataProductSearchResult {
  products: DataProduct[];
  total: number;
  facets: DataCatalogFacet[];
  page: number;
  limit: number;
}

export interface DataContractComplianceCheck {
  id: string;
  contractId: string;
  checkType: string;
  passed: boolean;
  details: string;
  checkedAt: Date;
}

export interface DataProductSLAViolation {
  id: string;
  productId: string;
  slaType: string;
  expected: unknown;
  actual: unknown;
  detectedAt: Date;
  resolvedAt: Date | null;
  impact: string;
}

export interface DataDomainOnboarding {
  id: string;
  domainId: string;
  step: string;
  status: string;
  completedAt: Date | null;
  assignedTo: string;
  metadata: Record<string, unknown>;
}

export interface DataProductFeedback {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  category: string;
  createdAt: Date;
}

export interface SchemaEvolutionLog {
  id: string;
  schemaId: string;
  changeType: string;
  fieldName: string | null;
  oldValue: unknown;
  newValue: unknown;
  impact: SchemaChangeImpact;
  changedBy: string;
  changedAt: Date;
}

export interface DataProductOnboardingStep {
  id: string;
  productId: string;
  step: string;
  description: string;
  order: number;
  status: string;
  completedAt: Date | null;
  assignedTo: string;
}

export interface DataDomainSchemaRegistry {
  id: string;
  domainId: string;
  schemas: DataSchema[];
  registryUrl: string;
  format: SchemaRegistryFormat;
  lastSynced: Date;
  active: boolean;
}

export interface DataContractTemplate {
  id: string;
  name: string;
  description: string;
  domain: DataDomain;
  schemaType: SchemaType;
  freshness: FreshnessLevel;
  availability: AvailabilityLevel;
  qualityThreshold: number;
  content: Record<string, unknown>;
  active: boolean;
  createdBy: string;
  createdAt: Date;
}

export interface DataProductQualityAlert {
  id: string;
  productId: string;
  alertType: string;
  severity: string;
  message: string;
  metric: string;
  currentValue: number;
  threshold: number;
  triggeredAt: Date;
  acknowledgedAt: Date | null;
  resolvedAt: Date | null;
}

export interface DataCatalogSearchFilter {
  domain: DataDomain | null;
  type: DataProductType | null;
  classification: DataClassification | null;
  qualityScore: QualityScore | null;
  tags: string[];
  owner: string | null;
}

export interface DataProductUsageStats {
  productId: string;
  totalQueries: number;
  uniqueConsumers: number;
  avgResponseTime: number;
  errorRate: number;
  lastAccessed: Date;
  period: string;
}

export interface DataSchemaValidationResult {
  id: string;
  schemaId: string;
  valid: boolean;
  errors: string[];
  warnings: string[];
  validatedAt: Date;
}

export interface DataProductTagEntry {
  id: string;
  productId: string;
  tag: string;
  createdBy: string;
  createdAt: Date;
}

export interface DataDomainAccessPolicy {
  id: string;
  domainId: string;
  policyType: string;
  rules: DataAccessRule[];
  active: boolean;
  createdAt: Date;
}

export interface DataContractNegotiationLog {
  id: string;
  negotiationId: string;
  event: string;
  actor: string;
  details: Record<string, unknown>;
  timestamp: Date;
}

export interface DataProductPerformanceMetrics {
  productId: string;
  period: string;
  queriesPerSecond: number;
  avgLatencyMs: number;
  p95LatencyMs: number;
  p99LatencyMs: number;
  errorRate: number;
  uptime: number;
}

export interface DataDomainComplianceReport {
  id: string;
  domainId: string;
  period: string;
  compliantProducts: number;
  totalProducts: number;
  violations: ComplianceViolation[];
  score: number;
  generatedAt: Date;
}

export interface ComplianceViolation {
  id: string;
  productId: string;
  contractId: string;
  violationType: ContractViolationType;
  description: string;
  severity: string;
  detectedAt: Date;
  resolvedAt: Date | null;
}

export interface DataProductLineageTrace {
  id: string;
  productId: string;
  direction: DataLineageDirection;
  depth: number;
  nodes: DataLineageNode[];
  edges: DataLineageEdge[];
  tracedAt: Date;
}

export interface DataLineageNode {
  id: string;
  productId: string;
  name: string;
  type: string;
}

export interface DataLineageEdge {
  source: string;
  target: string;
  type: string;
  transformation: string | null;
}

export interface DataProductCatalogEntry {
  id: string;
  productId: string;
  name: string;
  description: string;
  domain: DataDomain;
  type: DataProductType;
  owner: string;
  tags: string[];
  classification: DataClassification;
  qualityScore: QualityScore;
  freshnessLevel: FreshnessLevel;
  availabilityLevel: AvailabilityLevel;
  consumers: number;
  popularity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DataQualityRuleDefinition {
  id: string;
  name: string;
  description: string;
  type: DataQualityRuleType;
  dimension: QualityDimension;
  expression: string;
  threshold: number;
  severity: string;
  active: boolean;
}

export interface DataContractMonitoringEntry {
  id: string;
  contractId: string;
  checkType: string;
  passed: boolean;
  value: unknown;
  threshold: unknown;
  checkedAt: Date;
}

export interface DataProductCostEntry {
  id: string;
  productId: string;
  costType: string;
  amount: number;
  currency: string;
  period: string;
  recordedAt: Date;
}

export interface DataDomainResourceAllocation {
  id: string;
  domainId: string;
  resourceType: string;
  allocated: number;
  used: number;
  unit: string;
  period: string;
}

export interface DataProductTestData {
  id: string;
  productId: string;
  testCase: string;
  input: Record<string, unknown>;
  expectedOutput: Record<string, unknown>;
  passed: boolean | null;
  lastRun: Date;
}

export interface DataSchemaFieldDocumentation {
  id: string;
  schemaId: string;
  fieldName: string;
  description: string;
  examples: string[];
  constraints: string[];
  lastUpdated: Date;
}

export interface DataProductSubscription {
  id: string;
  productId: string;
  consumerId: string;
  consumerType: string;
  accessLevel: string;
  subscribedAt: Date;
  expiresAt: Date | null;
  active: boolean;
}

export interface DataDomainCollaborationEntry {
  id: string;
  domainId: string;
  userId: string;
  role: string;
  contribution: string;
  timestamp: Date;
}

export interface DataProductVersionDiff {
  productId: string;
  fromVersion: string;
  toVersion: string;
  schemaChanges: string[];
  breakingChanges: string[];
  addedFields: string[];
  removedFields: string[];
  modifiedFields: string[];
}

export interface DataQualityBenchmark {
  id: string;
  productId: string;
  benchmarkType: string;
  score: number;
  industryAverage: number;
  bestPractice: number;
  measuredAt: Date;
}

export interface DataProductDependencyGraph {
  productId: string;
  nodes: DataProductDependencyNode[];
  edges: DataProductDependencyEdge[];
  circularDependencies: string[];
}

export interface DataProductDependencyNode {
  id: string;
  name: string;
  type: DataProductDependencyType;
  criticality: DataProductCriticality;
}

export interface DataProductDependencyEdge {
  source: string;
  target: string;
  type: string;
  critical: boolean;
}

export interface DataCatalogStats {
  totalProducts: number;
  totalDomains: number;
  totalSchemas: number;
  avgQualityScore: number;
  totalConsumers: number;
  lastUpdated: Date;
}

export interface DataProductApprovalEntry {
  id: string;
  productId: string;
  approver: string;
  status: string;
  comments: string;
  submittedAt: Date;
  decidedAt: Date | null;
}
