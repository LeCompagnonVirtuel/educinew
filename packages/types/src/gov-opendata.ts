export enum DataType {
  NUMERIC = 'numeric',
  CATEGORICAL = 'categorical',
  TEXT = 'text',
  DATE = 'date',
  DATETIME = 'datetime',
  BOOLEAN = 'boolean',
  GEO = 'geo',
  JSON = 'json',
  BINARY = 'binary',
  IMAGE = 'image',
  AUDIO = 'audio',
  VIDEO = 'video',
  MIXED = 'mixed',
  CUSTOM = 'custom'
}

export enum DataFormat {
  CSV = 'csv',
  JSON = 'json',
  XML = 'xml',
  EXCEL = 'excel',
  TSV = 'tsv',
  PARQUET = 'parquet',
  AVRO = 'avro',
  ORC = 'orc',
  HDF5 = 'hdf5',
  GEOJSON = 'geojson',
  KML = 'kml',
  SHAPEFILE = 'shapefile',
  SQL = 'sql',
  RDF = 'rdf',
  YAML = 'yaml',
  CUSTOM = 'custom'
}

export enum AccessLevel {
  PUBLIC = 'public',
  REGISTERED = 'registered',
  RESTRICTED = 'restricted',
  CONFIDENTIAL = 'confidential',
  CLASSIFIED = 'classified',
  INTERNAL = 'internal',
  CUSTOM = 'custom'
}

export enum LicenseType {
  OPEN_DATA = 'open_data',
  CC_BY = 'cc_by',
  CC_BY_SA = 'cc_by_sa',
  CC_BY_NC = 'cc_by_nc',
  CC_BY_ND = 'cc_by_nd',
  CC_BY_NC_SA = 'cc_by_nc_sa',
  CC_BY_NC_ND = 'cc_by_nc_nd',
  CC0 = 'cc0',
  ODbL = 'odbl',
  PDDL = 'pddl',
  MIT = 'mit',
  APACHE_2 = 'apache_2',
  GPL_3 = 'gpl_3',
  PROPRIETARY = 'proprietary',
  GOVERNMENT = 'government',
  CUSTOM = 'custom'
}

export enum CatalogStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  DEPRECATED = 'deprecated',
  ARCHIVED = 'archived',
  DRAFT = 'draft',
  REVIEW = 'review',
  PUBLISHED = 'published',
  RETIRED = 'retired'
}

export enum GovernanceLevel {
  NONE = 'none',
  BASIC = 'basic',
  STANDARD = 'standard',
  ADVANCED = 'advanced',
  ENTERPRISE = 'enterprise'
}

export enum ExportFormat {
  CSV = 'csv',
  JSON = 'json',
  XML = 'xml',
  EXCEL = 'excel',
  PDF = 'pdf',
  PARQUET = 'parquet',
  SQL = 'sql',
  HTML = 'html',
  MARKDOWN = 'markdown',
  CUSTOM = 'custom'
}

export enum APIStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DEPRECATED = 'deprecated',
  MAINTENANCE = 'maintenance',
  RATE_LIMITED = 'rate_limited',
  SUSPENDED = 'suspended',
  VERSIONED = 'versioned'
}

export enum DataQualityDimension {
  COMPLETENESS = 'completeness',
  ACCURACY = 'accuracy',
  CONSISTENCY = 'consistency',
  TIMELINESS = 'timeliness',
  VALIDITY = 'validity',
  UNIQUENESS = 'uniqueness',
  INTEGRITY = 'integrity',
  CONFORMITY = 'conformity'
}

export enum DataLineageType {
  SYSTEM = 'system',
  MANUAL = 'manual',
  AUTOMATED = 'automated',
  STREAMING = 'streaming',
  BATCH = 'batch',
  CUSTOM = 'custom'
}

export enum CatalogCategory {
  EDUCATION = 'education',
  DEMOGRAPHICS = 'demographics',
  ECONOMICS = 'economics',
  HEALTH = 'health',
  INFRASTRUCTURE = 'infrastructure',
  ENVIRONMENT = 'environment',
  GOVERNANCE = 'governance',
  FINANCE = 'finance',
  SOCIAL = 'social',
  TECHNOLOGY = 'technology',
  AGRICULTURE = 'agriculture',
  TRANSPORT = 'transport',
  ENERGY = 'energy',
  WATER = 'water',
  CUSTOM = 'custom'
}

export enum UpdateFrequency {
  REAL_TIME = 'real_time',
  HOURLY = 'hourly',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  BIWEEKLY = 'biweekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  SEMESTER = 'semester',
  ANNUAL = 'annual',
  ON_DEMAND = 'on_demand',
  IRREGULAR = 'irregular'
}

export enum DataClassification {
  OPEN = 'open',
  SENSITIVE = 'sensitive',
  PERSONAL = 'personal',
  RESTRICTED = 'restricted',
  CONFIDENTIAL = 'confidential',
  CLASSIFIED = 'classified',
  CUSTOM = 'custom'
}

export enum APIMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS'
}

export enum RateLimitScope {
  GLOBAL = 'global',
  PER_USER = 'per_user',
  PER_API_KEY = 'per_api_key',
  PER_ENDPOINT = 'per_endpoint',
  PER_ORGANISATION = 'per_organisation',
  CUSTOM = 'custom'
}

export enum DataFormatEncoding {
  UTF8 = 'utf8',
  ASCII = 'ascii',
  LATIN1 = 'latin1',
  UTF16 = 'utf16',
  CUSTOM = 'custom'
}

export enum SchemaValidation {
  NONE = 'none',
  JSON_SCHEMA = 'json_schema',
  AVRO = 'avro',
  PROTOBUF = 'protobuf',
  XML_SCHEMA = 'xml_schema',
  CUSTOM = 'custom'
}

export enum DataRetention {
  FOREVER = 'forever',
  ONE_YEAR = 'one_year',
  TWO_YEARS = 'two_years',
  FIVE_YEARS = 'five_years',
  TEN_YEARS = 'ten_years',
  CUSTOM = 'custom'
}

export enum ResearchAccess {
  OPEN = 'open',
  APPLICATION = 'application',
  INSTITUTIONAL = 'institutional',
  COLLABORATION = 'collaboration',
  RESTRICTED = 'restricted',
  CUSTOM = 'custom'
}

export enum DataVisualization {
  TABLE = 'table',
  BAR_CHART = 'bar_chart',
  LINE_CHART = 'line_chart',
  PIE_CHART = 'pie_chart',
  MAP = 'map',
  SCATTER_PLOT = 'scatter_plot',
  HEATMAP = 'heatmap',
  HISTOGRAM = 'histogram',
  AREA_CHART = 'area_chart',
  TIMELINE = 'timeline',
  NETWORK = 'network',
  TREE = 'tree',
  CUSTOM = 'custom'
}

export interface PublicStatistic {
  id: string;
  title: string;
  description: string;
  category: CatalogCategory;
  subcategory: string;
  source: string;
  sourceUrl: string;
  region: string;
  department: string;
  municipality: string;
  schoolId: string | null;
  schoolName: string | null;
  dataType: DataType;
  dataFormat: DataFormat;
  classification: DataClassification;
  accessLevel: AccessLevel;
  licenseType: LicenseType;
  updateFrequency: UpdateFrequency;
  lastUpdated: string;
  nextUpdate: string | null;
  recordsCount: number;
  fileSize: number;
  language: string;
  tags: string[];
  spatialCoverage: string;
  temporalCoverage: string;
  variables: StatisticVariable[];
  visualisations: DataVisualization[];
  downloads: number;
  views: number;
  citations: number;
  rating: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface StatisticVariable {
  name: string;
  label: string;
  dataType: DataType;
  unit: string | null;
  description: string;
  source: string | null;
  isValid: boolean;
  missingValues: number;
  statistics: VariableStatistics;
}

export interface VariableStatistics {
  count: number;
  mean: number | null;
  median: number | null;
  mode: number | null;
  stdDev: number | null;
  min: number | null;
  max: number | null;
  percentiles: Record<string, number>;
}

export interface OpenAPI {
  id: string;
  name: string;
  slug: string;
  description: string;
  version: string;
  baseUrl: string;
  documentationUrl: string;
  status: APIStatus;
  accessLevel: AccessLevel;
  licenseType: LicenseType;
  requiresApiKey: boolean;
  requiresAuth: boolean;
  authType: string;
  rateLimiting: APIRateLimit;
  endpoints: APIEndpoint[];
  schemas: APISchema[];
  examples: APIExample[];
  sdls: APISDL[];
  changelog: APIChangelog[];
  support: APISupport;
  termsOfService: string;
  privacyPolicy: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface APIEndpoint {
  id: string;
  apiId: string;
  path: string;
  method: APIMethod;
  summary: string;
  description: string;
  tags: string[];
  parameters: APIParameter[];
  requestBody: APIRequestBody | null;
  responses: APIResponse[];
  security: APISecurityRequirement[];
  deprecated: boolean;
  since: string | null;
  metadata: Record<string, unknown>;
}

export interface APIParameter {
  name: string;
  location: string;
  required: boolean;
  dataType: DataType;
  description: string;
  example: unknown;
  defaultValue: unknown;
  constraints: Record<string, unknown>;
}

export interface APIRequestBody {
  contentType: string;
  schema: Record<string, unknown>;
  required: boolean;
  description: string;
  example: Record<string, unknown>;
}

export interface APIResponse {
  statusCode: number;
  description: string;
  contentType: string;
  schema: Record<string, unknown>;
  example: Record<string, unknown>;
}

export interface APISecurityRequirement {
  type: string;
  scheme: string;
  scopes: string[];
}

export interface APISchema {
  id: string;
  name: string;
  description: string;
  format: DataFormat;
  schema: Record<string, unknown>;
  validation: SchemaValidation;
  examples: Record<string, unknown>[];
  metadata: Record<string, unknown>;
}

export interface APIExample {
  id: string;
  name: string;
  description: string;
  endpoint: string;
  method: APIMethod;
  headers: Record<string, string>;
  queryParams: Record<string, string>;
  body: Record<string, unknown> | null;
  response: Record<string, unknown>;
  language: string;
  metadata: Record<string, unknown>;
}

export interface APISDL {
  id: string;
  name: string;
  type: string;
  version: string;
  url: string;
  content: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export interface APIChangelog {
  version: string;
  date: string;
  changes: APIChange[];
}

export interface APIChange {
  type: string;
  description: string;
  endpoint: string | null;
  breaking: boolean;
}

export interface APISupport {
  email: string | null;
  phone: string | null;
  url: string | null;
  documentationUrl: string;
  issueTrackerUrl: string | null;
  communityUrl: string | null;
}

export interface APIRateLimit {
  scope: RateLimitScope;
  requestsPerMinute: number;
  requestsPerHour: number;
  requestsPerDay: number;
  requestsPerMonth: number;
  burstLimit: number;
  concurrentLimit: number;
  retryAfterHeader: boolean;
  remainingHeader: boolean;
  resetHeader: boolean;
  customHeaders: Record<string, string>;
}

export interface OpenDataset {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  category: CatalogCategory;
  subcategory: string;
  source: string;
  sourceUrl: string;
  publisher: string;
  publisherUrl: string;
  region: string;
  department: string;
  municipality: string;
  schoolId: string | null;
  schoolName: string | null;
  dataType: DataType;
  dataFormat: DataFormat;
  encoding: DataFormatEncoding;
  fileUrl: string;
  fileSize: number;
  recordCount: number;
  fieldCount: number;
  classification: DataClassification;
  accessLevel: AccessLevel;
  licenseType: LicenseType;
  licenseUrl: string;
  updateFrequency: UpdateFrequency;
  lastUpdated: string;
  nextUpdate: string | null;
  temporalStart: string | null;
  temporalEnd: string | null;
  spatialCoverage: string;
  spatialResolution: string | null;
  schema: DatasetSchema;
  qualityScore: number;
  qualityMetrics: DataQualityMetrics;
  lineage: DatasetLineage[];
  tags: string[];
  keywords: string[];
  references: DatasetReference[];
  relatedDatasets: DatasetRelation[];
  downloads: number;
  views: number;
  citations: number;
  rating: number;
  isFeatured: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DatasetSchema {
  id: string;
  datasetId: string;
  version: string;
  fields: DatasetField[];
  primaryKey: string[];
  foreignKeys: DatasetForeignKey[];
  indexes: DatasetIndex[];
  constraints: DatasetConstraint[];
  metadata: Record<string, unknown>;
}

export interface DatasetField {
  name: string;
  label: string;
  dataType: DataType;
  nullable: boolean;
  description: string;
  unit: string | null;
  example: unknown;
  format: string | null;
  maxLength: number | null;
  minValue: number | null;
  maxValue: number | null;
  pattern: string | null;
  allowedValues: unknown[] | null;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  foreignKeyRef: string | null;
  statistics: FieldStatistics | null;
}

export interface FieldStatistics {
  count: number;
  nullCount: number;
  uniqueCount: number;
  mean: number | null;
  median: number | null;
  mode: unknown | null;
  stdDev: number | null;
  min: unknown | null;
  max: unknown | null;
  distribution: Record<string, number>;
}

export interface DatasetForeignKey {
  field: string;
  referencesDataset: string;
  referencesField: string;
}

export interface DatasetIndex {
  name: string;
  fields: string[];
  unique: boolean;
  type: string;
}

export interface DatasetConstraint {
  name: string;
  type: string;
  definition: string;
  fields: string[];
}

export interface DataQualityMetrics {
  overallScore: number;
  dimensions: DataQualityDimensionScore[];
  lastAssessed: string;
  assessedBy: string;
  issues: DataQualityIssue[];
  recommendations: string[];
}

export interface DataQualityDimensionScore {
  dimension: DataQualityDimension;
  score: number;
  weight: number;
  details: string;
  issues: DataQualityIssue[];
}

export interface DataQualityIssue {
  id: string;
  dimension: DataQualityDimension;
  severity: string;
  field: string | null;
  description: string;
  affectedRecords: number;
  suggestedFix: string;
  isResolved: boolean;
  resolvedBy: string | null;
  resolvedAt: string | null;
}

export interface DatasetLineage {
  id: string;
  type: DataLineageType;
  source: string;
  sourceType: string;
  sourceUrl: string | null;
  transformation: string;
  transformationType: string;
  outputFormat: DataFormat;
  executedAt: string;
  executedBy: string;
  duration: number;
  recordsProcessed: number;
  status: string;
  metadata: Record<string, unknown>;
}

export interface DatasetReference {
  id: string;
  type: string;
  title: string;
  url: string | null;
  citation: string;
  dateAccessed: string | null;
}

export interface DatasetRelation {
  datasetId: string;
  datasetTitle: string;
  relationType: string;
  description: string;
}

export interface DataCatalogEntry {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: string;
  category: CatalogCategory;
  source: string;
  publisher: string;
  status: CatalogStatus;
  visibility: AccessLevel;
  featured: boolean;
  featuredOrder: number;
  thumbnailUrl: string | null;
  tags: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DataGovernance {
  id: string;
  name: string;
  description: string;
  level: GovernanceLevel;
  policies: DataPolicy[];
  standards: DataStandard[];
  procedures: DataProcedure[];
  roles: DataGovernanceRole[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DataPolicy {
  id: string;
  name: string;
  description: string;
  category: string;
  rules: DataPolicyRule[];
  isActive: boolean;
  effectiveDate: string;
  reviewDate: string;
  approvedBy: string;
  metadata: Record<string, unknown>;
}

export interface DataPolicyRule {
  id: string;
  description: string;
  condition: string;
  action: string;
  severity: string;
  isActive: boolean;
}

export interface DataStandard {
  id: string;
  name: string;
  description: string;
  type: string;
  version: string;
  specification: Record<string, unknown>;
  complianceLevel: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export interface DataProcedure {
  id: string;
  name: string;
  description: string;
  steps: DataProcedureStep[];
  frequency: string;
  responsible: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export interface DataProcedureStep {
  order: number;
  title: string;
  description: string;
  action: string;
  responsible: string;
  estimatedDuration: string;
}

export interface DataGovernanceRole {
  id: string;
  name: string;
  description: string;
  responsibilities: string[];
  permissions: string[];
  assignedUsers: string[];
  metadata: Record<string, unknown>;
}

export interface DataLicense {
  id: string;
  name: string;
  shortName: string;
  description: string;
  type: LicenseType;
  version: string;
  url: string;
  permissions: string[];
  conditions: string[];
  limitations: string[];
  isOsiApproved: boolean;
  isCcopApproved: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ResearchExport {
  id: string;
  title: string;
  description: string;
  researcher: string;
  institution: string;
  email: string;
  purpose: string;
  datasets: ResearchExportDataset[];
  format: ExportFormat;
  accessLevel: ResearchAccess;
  approvalStatus: string;
  approvedBy: string | null;
  approvedAt: string | null;
  restrictions: string[];
  citationRequired: boolean;
  sharingAllowed: boolean;
  expiresAt: string | null;
  fileUrl: string | null;
  fileSize: number;
  downloadCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ResearchExportDataset {
  datasetId: string;
  datasetTitle: string;
  fields: string[];
  filters: Record<string, unknown>;
  recordCount: number;
}

export interface DataCatalog {
  id: string;
  name: string;
  description: string;
  version: string;
  organisation: string;
  contactEmail: string;
  contactUrl: string;
  licence: string;
  language: string;
  theme: string[];
  publisher: CatalogPublisher;
  spatial: CatalogSpatial;
  temporal: CatalogTemporal;
  entries: DataCatalogEntry[];
  statistics: DataCatalogStatistics;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CatalogPublisher {
  name: string;
  url: string;
  email: string;
  logoUrl: string | null;
}

export interface CatalogSpatial {
  coverage: string;
  extent: string | null;
  resolution: string | null;
  crs: string;
}

export interface CatalogTemporal {
  start: string | null;
  end: string | null;
  frequency: UpdateFrequency;
}

export interface DataCatalogStatistics {
  totalDatasets: number;
  totalApis: number;
  totalDownloads: number;
  totalViews: number;
  totalUsers: number;
  byCategory: Record<CatalogCategory, number>;
  byFormat: Record<DataFormat, number>;
  byAccessLevel: Record<AccessLevel, number>;
}

export interface DataLineageGraph {
  id: string;
  name: string;
  description: string;
  nodes: LineageNode[];
  edges: LineageEdge[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface LineageNode {
  id: string;
  name: string;
  type: string;
  description: string;
  metadata: Record<string, unknown>;
}

export interface LineageEdge {
  source: string;
  target: string;
  type: string;
  description: string;
  transformation: string;
  metadata: Record<string, unknown>;
}

export interface OpenDataConfig {
  id: string;
  portalId: string;
  defaultLicense: LicenseType;
  defaultAccessLevel: AccessLevel;
  autoPublish: boolean;
  requireApproval: boolean;
  qualityThreshold: number;
  maxFileSize: number;
  allowedFormats: DataFormat[];
  retentionPolicy: DataRetention;
  metadataValidation: boolean;
  schemaValidation: SchemaValidation;
  rateLimiting: APIRateLimit;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface OpenDataMetrics {
  totalDatasets: number;
  totalApis: number;
  totalDownloads: number;
  totalViews: number;
  totalUsers: number;
  totalResearchExports: number;
  averageQualityScore: number;
  topCategories: CategoryMetric[];
  topFormats: FormatMetric[];
  topLicenses: LicenseMetric[];
  monthlyGrowth: MonthlyGrowth[];
  metadata: Record<string, unknown>;
}

export interface CategoryMetric {
  category: CatalogCategory;
  count: number;
  downloads: number;
  views: number;
}

export interface FormatMetric {
  format: DataFormat;
  count: number;
  percentage: number;
}

export interface LicenseMetric {
  license: LicenseType;
  count: number;
  percentage: number;
}

export interface MonthlyGrowth {
  month: string;
  datasets: number;
  apis: number;
  downloads: number;
  views: number;
  users: number;
}

export interface OpenDataSearch {
  query: string;
  category: CatalogCategory | null;
  dataType: DataType | null;
  dataFormat: DataFormat | null;
  accessLevel: AccessLevel | null;
  licenseType: LicenseType | null;
  region: string | null;
  department: string | null;
  tags: string[];
  dateFrom: string | null;
  dateTo: string | null;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface OpenDataSearchResult {
  data: (PublicStatistic | OpenDataset)[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  facets: SearchFacets;
}

export interface SearchFacets {
  categories: FacetValue[];
  dataTypes: FacetValue[];
  dataFormats: FacetValue[];
  accessLevels: FacetValue[];
  licenseTypes: FacetValue[];
  regions: FacetValue[];
}

export interface FacetValue {
  value: string;
  count: number;
}

export interface OpenDataAuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entityType: string;
  entityId: string;
  entityName: string;
  details: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface OpenDataNotification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  severity: string;
  datasetId: string | null;
  isRead: boolean;
  actionUrl: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface OpenDataSubscription {
  id: string;
  userId: string;
  entityType: string;
  entityId: string;
  eventName: string;
  channel: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface OpenDataExport {
  id: string;
  query: string;
  format: ExportFormat;
  filters: Record<string, unknown>;
  status: string;
  fileUrl: string | null;
  fileSize: number;
  rowCount: number;
  startedAt: string;
  completedAt: string | null;
  createdBy: string;
  metadata: Record<string, unknown>;
}

export interface OpenDataAPIKey {
  id: string;
  name: string;
  key: string;
  secret: string;
  permissions: string[];
  rateLimit: number;
  expiresAt: string | null;
  lastUsedAt: string | null;
  isActive: boolean;
  createdBy: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface OpenDataWebhook {
  id: string;
  name: string;
  url: string;
  secret: string;
  events: string[];
  isActive: boolean;
  lastTriggeredAt: string | null;
  failureCount: number;
  retryPolicy: Record<string, unknown>;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}
