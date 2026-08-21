export enum ListingType {
  CONNECTOR = "CONNECTOR",
  API = "API",
  TEMPLATE = "TEMPLATE",
  DATA_PACKAGE = "DATA_PACKAGE",
  PLUGIN = "PLUGIN",
  INTEGRATION = "INTEGRATION",
  SDK = "SDK",
  WEBHOOK = "WEBHOOK",
  FLOW = "FLOW",
  CUSTOM = "CUSTOM",
}

export enum ListingStatus {
  DRAFT = "DRAFT",
  PENDING_REVIEW = "PENDING_REVIEW",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  SUSPENDED = "SUSPENDED",
  ARCHIVED = "ARCHIVED",
  DEPRECATED = "DEPRECATED",
}

export enum PricingModel {
  FREE = "FREE",
  FREEMIUM = "FREEMIUM",
  ONE_TIME = "ONE_TIME",
  SUBSCRIPTION = "SUBSCRIPTION",
  USAGE_BASED = "USAGE_BASED",
  TIERED = "TIERED",
  CUSTOM = "CUSTOM",
  PER_SEAT = "PER_SEAT",
  PER_TRANSACTION = "PER_TRANSACTION",
  COMMISSION = "COMMISSION",
}

export enum RatingType {
  STAR = "STAR",
  THUMBS = "THUMBS",
  NUMERIC = "NUMERIC",
  PERCENTAGE = "PERCENTAGE",
  LIKERT = "LIKERT",
  NPS = "NPS",
}

export enum ReviewStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  FLAGGED = "FLAGGED",
  HIDDEN = "HIDDEN",
}

export enum LicenseType {
  MIT = "MIT",
  Apache_2_0 = "APACHE_2_0",
  GPL_3_0 = "GPL_3_0",
  BSD_3_CLAUSE = "BSD_3_CLAUSE",
  PROPRIETARY = "PROPRIETARY",
  CUSTOM = "CUSTOM",
  CC_BY_4_0 = "CC_BY_4_0",
  CC_BY_SA_4_0 = "CC_BY_SA_4_0",
  CC_BY_NC_4_0 = "CC_BY_NC_4_0",
  DUAL = "DUAL",
}

export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
  SUSPENDED = "SUSPENDED",
  TRIAL = "TRIAL",
  PAST_DUE = "PAST_DUE",
  PAUSED = "PAUSED",
  PENDING = "PENDING",
}

export enum SecurityVerificationStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  PASSED = "PASSED",
  FAILED = "FAILED",
  EXPIRED = "EXPIRED",
  UNDER_REVIEW = "UNDER_REVIEW",
  WAIVED = "WAIVED",
  NOT_REQUIRED = "NOT_REQUIRED",
}

export enum PackageType {
  BINARY = "BINARY",
  SOURCE = "SOURCE",
  CONTAINER = "CONTAINER",
  LAMBDA = "LAMBDA",
  EDGE_FUNCTION = "EDGE_FUNCTION",
  WIDGET = "WIDGET",
  SCRIPT = "SCRIPT",
  DOCUMENTATION = "DOCUMENTATION",
}

export enum TemplateType {
  INTEGRATION = "INTEGRATION",
  FLOW = "FLOW",
  SCHEMA = "SCHEMA",
  MAPPING = "MAPPING",
  VALIDATION = "VALIDATION",
  TRANSFORMATION = "TRANSFORMATION",
  WEBHOOK = "WEBHOOK",
  DASHBOARD = "DASHBOARD",
}

export enum ConnectorCategory {
  SIS = "SIS",
  LMS = "LMS",
  ERP = "ERP",
  CRM = "CRM",
  HR = "HR",
  FINANCE = "FINANCE",
  PAYMENT = "PAYMENT",
  COMMUNICATION = "COMMUNICATION",
  ANALYTICS = "ANALYTICS",
  IDENTITY = "IDENTITY",
}

export enum APIProtocol {
  REST = "REST",
  GRAPHQL = "GRAPHQL",
  GRPC = "GRPC",
  SOAP = "SOAP",
  WEBSOCKET = "WEBSOCKET",
  EVENT_BRIDGE = "EVENT_BRIDGE",
  MQ = "MQ",
  SSE = "SSE",
}

export enum IntegrationDifficulty {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT",
}

export enum SupportLevel {
  COMMUNITY = "COMMUNITY",
  BASIC = "BASIC",
  STANDARD = "STANDARD",
  PREMIUM = "PREMIUM",
  ENTERPRISE = "ENTERPRISE",
}

export enum MarketplaceSortBy {
  POPULARITY = "POPULARITY",
  RATING = "RATING",
  NEWEST = "NEWEST",
  UPDATED = "UPDATED",
  PRICE_LOW = "PRICE_LOW",
  PRICE_HIGH = "PRICE_HIGH",
  NAME = "NAME",
  DOWNLOADS = "DOWNLOADS",
}

export enum PaymentMethod {
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  BANK_TRANSFER = "BANK_TRANSFER",
  MOBILE_MONEY = "MOBILE_MONEY",
  CRYPTO = "CRYPTO",
  INVOICE = "INVOICE",
  FREE = "FREE",
}

export enum BillingCycle {
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  SEMI_ANNUAL = "SEMI_ANNUAL",
  ANNUAL = "ANNUAL",
  ONE_TIME = "ONE_TIME",
}

export enum ListingVisibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  UNLISTED = "UNLISTED",
  INSTITUTIONAL = "INSTITUTIONAL",
}

export enum ConnectorAuthType {
  API_KEY = "API_KEY",
  OAUTH2 = "OAUTH2",
  BASIC = "BASIC",
  BEARER = "BEARER",
  JWT = "JWT",
  MUTUAL_TLS = "MUTUAL_TLS",
  HMAC = "HMAC",
  CUSTOM = "CUSTOM",
}

export enum DataFormat {
  JSON = "JSON",
  CSV = "CSV",
  XML = "XML",
  YAML = "YAML",
  PARQUET = "PARQUET",
  AVRO = "AVRO",
  PROTOBUF = "PROTOBUF",
  FORM_DATA = "FORM_DATA",
}

export enum SyncDirection {
  PUSH = "PUSH",
  PULL = "PULL",
  BIDIRECTIONAL = "BIDIRECTIONAL",
  EVENT_DRIVEN = "EVENT_DRIVEN",
}

export enum HealthStatus {
  HEALTHY = "HEALTHY",
  DEGRADED = "DEGRADED",
  UNHEALTHY = "UNHEALTHY",
  UNKNOWN = "UNKNOWN",
}

export enum VerificationBadge {
  VERIFIED = "VERIFIED",
  TOP_RATED = "TOP_RATED",
  EDITORS_CHOICE = "EDITORS_CHOICE",
  SECURITY_VERIFIED = "SECURITY_VERIFIED",
  COMPLIANT = "COMPLIANT",
  NEW = "NEW",
  TRENDING = "TRENDING",
}

export enum LicenseStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
  SUSPENDED = "SUSPENDED",
  PENDING = "PENDING",
}

export enum UsageMetricType {
  API_CALLS = "API_CALLS",
  DATA_TRANSFERRED = "DATA_TRANSFERRED",
  STORAGE = "STORAGE",
  COMPUTE = "COMPUTE",
  ACTIVE_USERS = "ACTIVE_USERS",
  TRANSACTIONS = "TRANSACTIONS",
  EVENTS = "EVENTS",
}

export enum ReviewSortBy {
  NEWEST = "NEWEST",
  OLDEST = "OLDEST",
  HIGHEST_RATED = "HIGHEST_RATED",
  LOWEST_RATED = "LOWEST_RATED",
  MOST_HELPFUL = "MOST_HELPFUL",
}

export enum SecurityScanType {
  STATIC = "STATIC",
  DYNAMIC = "DYNAMIC",
  DEPENDENCY = "DEPENDENCY",
  CONTAINER = "CONTAINER",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  COMPLIANCE = "COMPLIANCE",
}

export enum MarketplaceCategory {
  EDUCATION = "EDUCATION",
  FINANCE = "FINANCE",
  COMMUNICATION = "COMMUNICATION",
  ANALYTICS = "ANALYTICS",
  HR = "HR",
  OPERATIONS = "OPERATIONS",
  SECURITY = "SECURITY",
  DEVELOPER = "DEVELOPER",
}

export enum ListingApprovalReason {
  SECURITY_PASS = "SECURITY_PASS",
  QUALITY_PASS = "QUALITY_PASS",
  COMPLIANCE_PASS = "COMPLIANCE_PASS",
  DOCUMENTATION_PASS = "DOCUMENTATION_PASS",
  TEST_PASS = "TEST_PASS",
}

export enum MarketplaceEvent {
  LISTING_PUBLISHED = "LISTING_PUBLISHED",
  LISTING_UPDATED = "LISTING_UPDATED",
  LISTING_SUSPENDED = "LISTING_SUSPENDED",
  SUBSCRIPTION_CREATED = "SUBSCRIPTION_CREATED",
  SUBSCRIPTION_CANCELLED = "SUBSCRIPTION_CANCELLED",
  REVIEW_POSTED = "REVIEW_POSTED",
  SECURITY_SCAN_COMPLETED = "SECURITY_SCAN_COMPLETED",
  PAYMENT_RECEIVED = "PAYMENT_RECEIVED",
}

export enum ConnectorStatus {
  AVAILABLE = "AVAILABLE",
  BETA = "BETA",
  DEPRECATED = "DEPRECATED",
  SUNSET = "SUNSET",
  MAINTENANCE = "MAINTENANCE",
}

export enum APIVersionStatus {
  CURRENT = "CURRENT",
  PREVIOUS = "PREVIOUS",
  DEPRECATED = "DEPRECATED",
  RETIRED = "RETIRED",
}

export interface MarketplaceListing {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  type: ListingType;
  status: ListingStatus;
  visibility: ListingVisibility;
  category: MarketplaceCategory;
  tags: string[];
  author: MarketplaceAuthor;
  version: string;
  pricing: ListingPricing;
  rating: ListingRating;
  downloads: number;
  installs: number;
  activeUsers: number;
  badges: VerificationBadge[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
  metadata: Record<string, unknown>;
}

export interface MarketplaceAuthor {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  verified: boolean;
  totalListings: number;
  averageRating: number;
  joinedAt: Date;
}

export interface ConnectorListing extends MarketplaceListing {
  connectorType: ConnectorCategory;
  protocol: APIProtocol;
  authType: ConnectorAuthType;
  dataFormats: DataFormat[];
  syncDirection: SyncDirection;
  supportedSystems: string[];
  configSchema: Record<string, unknown> | null;
  healthStatus: HealthStatus;
  uptime: number;
  latency: number;
  rateLimit: number | null;
}

export interface APIListing extends MarketplaceListing {
  protocol: APIProtocol;
  baseUrl: string;
  documentationUrl: string;
  swaggerUrl: string | null;
  authType: ConnectorAuthType;
  versioning: APIVersionStatus;
  rateLimit: number | null;
  dataFormats: DataFormat[];
  endpoints: APIEndpoint[];
}

export interface APIEndpoint {
  path: string;
  method: string;
  description: string;
  parameters: APIParameter[];
  responseFormat: DataFormat;
  authenticated: boolean;
}

export interface APIParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  defaultValue: unknown | null;
}

export interface IntegrationTemplate {
  id: string;
  name: string;
  description: string;
  type: TemplateType;
  category: MarketplaceCategory;
  difficulty: IntegrationDifficulty;
  connectors: string[];
  config: Record<string, unknown>;
  instructions: string;
  author: MarketplaceAuthor;
  version: string;
  downloads: number;
  rating: ListingRating;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DataExchangePackage {
  id: string;
  name: string;
  description: string;
  dataTypes: string[];
  format: DataFormat;
  schema: Record<string, unknown>;
  sampleData: Record<string, unknown> | null;
  sizeBytes: number;
  checksum: string;
  author: MarketplaceAuthor;
  version: string;
  license: LicenseType;
  pricing: ListingPricing;
  downloads: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ListingRating {
  average: number;
  count: number;
  distribution: Record<number, number>;
  type: RatingType;
  lastUpdated: Date;
}

export interface ListingReview {
  id: string;
  listingId: string;
  author: MarketplaceAuthor;
  rating: number;
  title: string;
  content: string;
  status: ReviewStatus;
  helpful: number;
  reported: number;
  response: ReviewResponse | null;
  createdAt: Date;
  updatedAt: Date;
  verifiedPurchase: boolean;
}

export interface ReviewResponse {
  author: MarketplaceAuthor;
  content: string;
  createdAt: Date;
}

export interface ListingPricing {
  model: PricingModel;
  basePrice: number;
  currency: string;
  tiers: PricingTier[];
  freeQuota: number | null;
  trialDays: number | null;
  enterprisePricing: boolean;
}

export interface PricingTier {
  name: string;
  price: number;
  features: string[];
  limits: Record<string, number>;
}

export interface ListingSubscription {
  id: string;
  listingId: string;
  userId: string;
  institutionId: string;
  status: SubscriptionStatus;
  plan: string;
  pricing: ListingPricing;
  billingCycle: BillingCycle;
  paymentMethod: PaymentMethod;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAt: Date | null;
  createdAt: Date;
  metadata: Record<string, unknown>;
}

export interface ListingLicense {
  id: string;
  listingId: string;
  userId: string;
  institutionId: string;
  type: LicenseType;
  status: LicenseStatus;
  key: string;
  features: string[];
  maxUsers: number | null;
  maxApiCalls: number | null;
  validFrom: Date;
  validUntil: Date | null;
  createdAt: Date;
}

export interface ListingUsage {
  id: string;
  subscriptionId: string;
  listingId: string;
  metric: UsageMetricType;
  value: number;
  limit: number | null;
  period: string;
  recordedAt: Date;
}

export interface SecurityVerification {
  id: string;
  listingId: string;
  status: SecurityVerificationStatus;
  scanTypes: SecurityScanType[];
  results: SecurityScanResult[];
  verifiedAt: Date | null;
  expiresAt: Date | null;
  assessor: string;
  reportUrl: string | null;
  metadata: Record<string, unknown>;
}

export interface SecurityScanResult {
  scanType: SecurityScanType;
  status: SecurityVerificationStatus;
  findings: SecurityFinding[];
  score: number;
  scannedAt: Date;
}

export interface SecurityFinding {
  severity: string;
  category: string;
  description: string;
  remediation: string;
  cwe: string | null;
  cvss: number | null;
}

export interface MarketplaceConfig {
  id: string;
  institutionId: string;
  defaultCurrency: string;
  allowedPaymentMethods: PaymentMethod[];
  commissionRate: number;
  autoApproveListings: boolean;
  requireSecurityVerification: boolean;
  requireComplianceCheck: boolean;
  maxFreeListings: number;
  enabledCategories: MarketplaceCategory[];
  notificationChannels: string[];
  metadata: Record<string, unknown>;
}

export interface MarketplaceMetrics {
  totalListings: number;
  activeListings: number;
  totalDownloads: number;
  totalInstalls: number;
  totalRevenue: number;
  averageRating: number;
  totalReviews: number;
  activeSubscriptions: number;
  newListingsThisMonth: number;
  topCategories: CategoryMetric[];
  topListings: ListingMetric[];
  calculatedAt: Date;
}

export interface CategoryMetric {
  category: MarketplaceCategory;
  count: number;
  downloads: number;
  revenue: number;
}

export interface ListingMetric {
  listingId: string;
  name: string;
  downloads: number;
  rating: number;
  revenue: number;
}

export interface MarketplaceSearchQuery {
  query: string;
  type: ListingType | null;
  category: MarketplaceCategory | null;
  sortBy: MarketplaceSortBy;
  minRating: number | null;
  maxPrice: number | null;
  tags: string[];
  page: number;
  limit: number;
}

export interface MarketplaceSearchResult {
  listings: MarketplaceListing[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface MarketplaceInstallation {
  id: string;
  listingId: string;
  userId: string;
  institutionId: string;
  schoolId: string;
  version: string;
  config: Record<string, unknown>;
  installedAt: Date;
  updatedAt: Date;
  active: boolean;
}

export interface MarketplaceWebhook {
  id: string;
  listingId: string;
  url: string;
  events: MarketplaceEvent[];
  secret: string;
  active: boolean;
  lastTriggered: Date | null;
  failureCount: number;
  createdAt: Date;
}

export interface MarketplaceAnalytics {
  listingId: string;
  period: string;
  views: number;
  uniqueVisitors: number;
  downloads: number;
  installs: number;
  uninstalls: number;
  apiCalls: number;
  errors: number;
  avgResponseTime: number;
  revenue: number;
}

export interface ConnectorHealthCheck {
  listingId: string;
  status: HealthStatus;
  uptime: number;
  latency: number;
  lastChecked: Date;
  incidents: ConnectorIncident[];
}

export interface ConnectorIncident {
  id: string;
  description: string;
  severity: string;
  startedAt: Date;
  resolvedAt: Date | null;
  impact: string;
}

export interface MarketplaceBilling {
  id: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: PaymentMethod;
  invoiceUrl: string | null;
  paidAt: Date | null;
  period: string;
}

export interface ListingChangelog {
  id: string;
  listingId: string;
  version: string;
  changes: ChangelogEntry[];
  publishedAt: Date;
  author: MarketplaceAuthor;
}

export interface ChangelogEntry {
  type: string;
  description: string;
}

export interface MarketplaceNotification {
  id: string;
  userId: string;
  type: MarketplaceEvent;
  title: string;
  message: string;
  listingId: string | null;
  read: boolean;
  createdAt: Date;
}

export interface MarketplaceCollection {
  id: string;
  name: string;
  description: string;
  listings: string[];
  author: MarketplaceAuthor;
  isPublic: boolean;
  followers: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum ConnectorProtocol {
  REST_V1 = "REST_V1",
  REST_V2 = "REST_V2",
  GRAPHQL_V1 = "GRAPHQL_V1",
  GRPC_V1 = "GRPC_V1",
  WEBSOCKET_V1 = "WEBSOCKET_V1",
  SSE_V1 = "SSE_V1",
  EVENT_V1 = "EVENT_V1",
  MQ_V1 = "MQ_V1",
}

export enum IntegrationComplexity {
  SIMPLE = "SIMPLE",
  MODERATE = "MODERATE",
  COMPLEX = "COMPLEX",
  HIGHLY_COMPLEX = "HIGHLY_COMPLEX",
}

export enum MarketplacePayoutStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  ON_HOLD = "ON_HOLD",
}

export enum ListingContentType {
  README = "README",
  CHANGELOG = "CHANGELOG",
  EXAMPLES = "EXAMPLES",
  TUTORIAL = "TUTORIAL",
  API_REFERENCE = "API_REFERENCE",
  VIDEO = "VIDEO",
}

export enum ConnectorCapability {
  SYNC = "SYNC",
  IMPORT = "IMPORT",
  EXPORT = "EXPORT",
  WEBHOOK = "WEBHOOK",
  STREAMING = "STREAMING",
  BATCH = "BATCH",
  REAL_TIME = "REAL_TIME",
}

export enum MarketplacePartnerTier {
  BRONZE = "BRONZE",
  SILVER = "SILVER",
  GOLD = "GOLD",
  PLATINUM = "PLATINUM",
  DIAMOND = "DIAMOND",
}

export enum ListingComplianceCheck {
  PASSED = "PASSED",
  FAILED = "FAILED",
  PENDING = "PENDING",
  NOT_REQUIRED = "NOT_REQUIRED",
  WAIVED = "WAIVED",
}

export enum MarketplaceReportType {
  REVENUE = "REVENUE",
  DOWNLOADS = "DOWNLOADS",
  RATINGS = "RATINGS",
  USAGE = "USAGE",
  SECURITY = "SECURITY",
  COMPLIANCE = "COMPLIANCE",
}

export enum ConnectorDeploymentType {
  CLOUD = "CLOUD",
  ON_PREMISE = "ON_PREMISE",
  HYBRID = "HYBRID",
  EDGE = "EDGE",
  SERVERLESS = "SERVERLESS",
}

export enum ListingDependencyType {
  REQUIRED = "REQUIRED",
  OPTIONAL = "OPTIONAL",
  CONFLICTING = "CONFLICTING",
  RECOMMENDED = "RECOMMENDED",
}

export enum MarketplaceCampaignType {
  FEATURED = "FEATURED",
  PROMOTION = "PROMOTION",
  DISCOUNT = "DISCOUNT",
  FREE_TRIAL = "FREE_TRIAL",
  BUNDLE = "BUNDLE",
}

export enum ConnectorDataFlow {
  INBOUND = "INBOUND",
  OUTBOUND = "OUTBOUND",
  BIDIRECTIONAL = "BIDIRECTIONAL",
  EVENT_DRIVEN = "EVENT_DRIVEN",
}

export enum ListingReviewVote {
  HELPFUL = "HELPFUL",
  NOT_HELPFUL = "NOT_HELPFUL",
  SPAM = "SPAM",
  ABUSE = "ABUSE",
}

export enum MarketplaceAccessTier {
  FREE = "FREE",
  BASIC = "BASIC",
  PRO = "PRO",
  ENTERPRISE = "ENTERPRISE",
  CUSTOM = "CUSTOM",
}

export enum ConnectorHealthMetric {
  UPTIME = "UPTIME",
  LATENCY = "LATENCY",
  ERROR_RATE = "ERROR_RATE",
  THROUGHPUT = "THROUGHPUT",
  AVAILABILITY = "AVAILABILITY",
}

export enum ListingVersioningStrategy {
  SEMANTIC = "SEMANTIC",
  DATE_BASED = "DATE_BASED",
  SEQUENTIAL = "SEQUENTIAL",
  COMMIT_HASH = "COMMIT_HASH",
}

export enum MarketplaceDisputeStatus {
  OPEN = "OPEN",
  UNDER_REVIEW = "UNDER_REVIEW",
  ESCALATED = "ESCALATED",
  RESOLVED = "RESOLVED",
  CLOSED = "CLOSED",
}

export enum ConnectorAuthFlow {
  AuthorizationCode = "AUTHORIZATION_CODE",
  ClientCredentials = "CLIENT_CREDENTIALS",
  Implicit = "IMPLICIT",
  Password = "PASSWORD",
  PKCE = "PKCE",
  DeviceCode = "DEVICE_CODE",
}

export enum ListingSupportChannel {
  EMAIL = "EMAIL",
  CHAT = "CHAT",
  PHONE = "PHONE",
  TICKET = "TICKET",
  FORUM = "FORUM",
  DISCORD = "DISCORD",
}

export enum MarketplaceRefundStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  DENIED = "DENIED",
  PROCESSED = "PROCESSED",
}

export enum ConnectorRateLimitStrategy {
  FIXED = "FIXED",
  SLIDING_WINDOW = "SLIDING_WINDOW",
  TOKEN_BUCKET = "TOKEN_BUCKET",
  ADAPTIVE = "ADAPTIVE",
}

export enum ListingEnvironment {
  PRODUCTION = "PRODUCTION",
  STAGING = "STAGING",
  SANDBOX = "SANDBOX",
  DEVELOPMENT = "DEVELOPMENT",
}

export enum MarketplaceNotificationType {
  LISTING_UPDATE = "LISTING_UPDATE",
  REVIEW_RECEIVED = "REVIEW_RECEIVED",
  SUBSCRIPTION_CHANGE = "SUBSCRIPTION_CHANGE",
  PAYMENT_RECEIVED = "PAYMENT_RECEIVED",
  SECURITY_ALERT = "SECURITY_ALERT",
  BILLING_REMINDER = "BILLING_REMINDER",
}

export interface MarketplaceRetryPolicy {
  maxRetries: number;
  backoffMs: number;
  maxBackoffMs: number;
}

export interface ConnectorConfig {
  id: string;
  listingId: string;
  authType: ConnectorAuthType;
  authFlow: ConnectorAuthFlow;
  protocol: ConnectorProtocol;
  capabilities: ConnectorCapability[];
  dataFlows: ConnectorDataFlow[];
  rateLimitStrategy: ConnectorRateLimitStrategy;
  rateLimit: number | null;
  timeout: number;
  retryPolicy: MarketplaceRetryPolicy;
  metadata: Record<string, unknown>;
}

export interface MarketplacePayout {
  id: string;
  authorId: string;
  amount: number;
  currency: string;
  status: MarketplacePayoutStatus;
  period: string;
  listingIds: string[];
  commissionDeducted: number;
  netAmount: number;
  processedAt: Date | null;
  metadata: Record<string, unknown>;
}

export interface ListingDocumentation {
  id: string;
  listingId: string;
  type: ListingContentType;
  title: string;
  content: string;
  format: string;
  size: number;
  version: string;
  publishedAt: Date;
  updatedAt: Date;
}

export interface ListingDependency {
  id: string;
  listingId: string;
  dependencyId: string;
  type: ListingDependencyType;
  versionConstraint: string;
  optional: boolean;
}

export interface MarketplaceCampaign {
  id: string;
  type: MarketplaceCampaignType;
  listingIds: string[];
  discount: number | null;
  startDate: Date;
  endDate: Date;
  budget: number | null;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  active: boolean;
  metadata: Record<string, unknown>;
}

export interface MarketplaceDispute {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  reason: string;
  status: MarketplaceDisputeStatus;
  amount: number;
  currency: string;
  evidence: DisputeEvidence[];
  resolution: string | null;
  createdAt: Date;
  resolvedAt: Date | null;
}

export interface DisputeEvidence {
  id: string;
  type: string;
  description: string;
  url: string | null;
  submittedAt: Date;
}

export interface MarketplaceReport {
  id: string;
  type: MarketplaceReportType;
  period: string;
  data: Record<string, unknown>;
  generatedAt: Date;
  generatedBy: string;
}

export interface ConnectorIntegrationTest {
  id: string;
  listingId: string;
  name: string;
  status: string;
  passed: boolean;
  duration: number;
  error: string | null;
  executedAt: Date;
}

export interface ListingPerformanceMetrics {
  listingId: string;
  period: string;
  views: number;
  uniqueVisitors: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
  refunds: number;
  averageSessionDuration: number;
  bounceRate: number;
}

export interface MarketplaceTrustScore {
  authorId: string;
  overallScore: number;
  listingQuality: number;
  customerSatisfaction: number;
  securityScore: number;
  complianceScore: number;
  responseTime: number;
  lastCalculated: Date;
}

export interface ConnectorWebhookConfig {
  id: string;
  listingId: string;
  url: string;
  events: string[];
  secret: string;
  active: boolean;
  retryCount: number;
  timeoutMs: number;
  lastTriggered: Date | null;
}

export interface ListingSitemap {
  listingId: string;
  urls: SitemapEntry[];
  lastGenerated: Date;
}

export interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: string;
  priority: number;
}

export interface MarketplaceSearchIndex {
  id: string;
  listingId: string;
  fields: string[];
  boost: number;
  lastIndexed: Date;
}

export interface ConnectorVersionHistory {
  id: string;
  listingId: string;
  version: string;
  changelog: string;
  breaking: boolean;
  deprecated: boolean;
  publishedAt: Date;
  publishedBy: string;
}

export interface ListingABTest {
  id: string;
  listingId: string;
  name: string;
  variants: ABTestVariant[];
  traffic: number;
  startDate: Date;
  endDate: Date | null;
  winner: string | null;
  active: boolean;
}

export interface ABTestVariant {
  id: string;
  name: string;
  description: string;
  config: Record<string, unknown>;
  impressions: number;
  conversions: number;
  conversionRate: number;
}

export interface MarketplaceCacheConfig {
  id: string;
  strategy: string;
  ttlMs: number;
  maxSize: number;
  invalidationRules: string[];
}

export interface ConnectorRateLimitStatus {
  listingId: string;
  current: number;
  limit: number;
  remaining: number;
  resetAt: Date;
}

export interface ListingSEOConfig {
  listingId: string;
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string | null;
  ogImage: string | null;
}

export interface MarketplaceAffiliate {
  id: string;
  userId: string;
  tier: MarketplacePartnerTier;
  commissionRate: number;
  totalEarnings: number;
  referralCount: number;
  active: boolean;
  joinedAt: Date;
}

export interface ConnectorSandboxConfig {
  listingId: string;
  enabled: boolean;
  testApiKey: string;
  mockDataEnabled: boolean;
  rateLimit: number;
  expiresAt: Date | null;
}

export interface ListingLocalization {
  listingId: string;
  language: string;
  title: string;
  description: string;
  shortDescription: string;
  tags: string[];
  lastUpdated: Date;
}

export interface MarketplaceSubscriptionInvoice {
  id: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  tax: number;
  total: number;
  status: string;
  pdfUrl: string | null;
  issuedAt: Date;
  dueAt: Date;
  paidAt: Date | null;
}

export interface ListingSecurityPolicy {
  id: string;
  listingId: string;
  authRequired: boolean;
  ipWhitelist: string[];
  rateLimit: number;
  encryptionRequired: boolean;
  dataClassification: string;
  complianceRequirements: string[];
  active: boolean;
  lastReviewed: Date;
}

export interface MarketplaceAuthorProfile {
  id: string;
  authorId: string;
  bio: string;
  website: string | null;
  location: string;
  joinedAt: Date;
  totalEarnings: number;
  averageRating: number;
  verified: boolean;
  badges: string[];
}

export interface ConnectorTestSuite {
  id: string;
  listingId: string;
  name: string;
  tests: ConnectorTest[];
  lastRun: Date;
  passRate: number;
  totalTests: number;
}

export interface ConnectorTest {
  id: string;
  name: string;
  description: string;
  type: string;
  passed: boolean | null;
  duration: number;
  error: string | null;
}

export interface ListingPerformanceSLA {
  id: string;
  listingId: string;
  uptime: number;
  latencyMs: number;
  errorRate: number;
  supportResponseHours: number;
  penalties: string[];
  active: boolean;
}

export interface MarketplaceSubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  billingCycle: BillingCycle;
  features: string[];
  limits: Record<string, number>;
  popular: boolean;
  active: boolean;
}

export interface ListingIntegrationGuide {
  id: string;
  listingId: string;
  title: string;
  steps: IntegrationGuideStep[];
  prerequisites: string[];
  estimatedTime: string;
  difficulty: IntegrationDifficulty;
}

export interface IntegrationGuideStep {
  order: number;
  title: string;
  description: string;
  codeSnippet: string | null;
  imageUrl: string | null;
}

export interface MarketplaceDisputeResolution {
  id: string;
  disputeId: string;
  mediatorId: string;
  decision: string;
  reasoning: string;
  resolvedAt: Date;
  appealable: boolean;
  appealDeadline: Date | null;
}

export interface ConnectorVersionCompatibility {
  id: string;
  listingId: string;
  version: string;
  minApiVersion: string;
  maxApiVersion: string | null;
  dependencies: string[];
  deprecated: boolean;
}

export interface ListingPricingHistory {
  id: string;
  listingId: string;
  model: PricingModel;
  price: number;
  currency: string;
  effectiveFrom: Date;
  effectiveUntil: Date | null;
}

export interface MarketplaceAPIKey {
  id: string;
  userId: string;
  institutionId: string;
  keyHash: string;
  name: string;
  scopes: string[];
  rateLimit: number;
  expiresAt: Date | null;
  lastUsedAt: Date | null;
  active: boolean;
  createdAt: Date;
}

export interface ConnectorDataMapping {
  id: string;
  listingId: string;
  sourceField: string;
  targetField: string;
  transformation: string | null;
  required: boolean;
  defaultValue: unknown | null;
}

export interface ListingMarketAnalysis {
  id: string;
  listingId: string;
  competitors: MarketCompetitor[];
  marketShare: number;
  growthRate: number;
  analyzedAt: Date;
}

export interface MarketCompetitor {
  listingId: string;
  name: string;
  rating: number;
  price: number;
  marketShare: number;
}

export interface MarketplaceFeatureRequest {
  id: string;
  listingId: string;
  userId: string;
  title: string;
  description: string;
  votes: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConnectorEnvironmentConfig {
  id: string;
  listingId: string;
  environment: ListingEnvironment;
  baseUrl: string;
  apiKey: string | null;
  webhookUrl: string | null;
  settings: Record<string, unknown>;
}

export interface ListingComplianceCertification {
  id: string;
  listingId: string;
  certification: string;
  body: string;
  issuedAt: Date;
  expiresAt: Date | null;
  documentUrl: string | null;
}

export interface MarketplaceUserActivity {
  id: string;
  userId: string;
  action: string;
  listingId: string | null;
  timestamp: Date;
  metadata: Record<string, unknown>;
}

export interface ConnectorBatchOperation {
  id: string;
  listingId: string;
  operation: string;
  recordsTotal: number;
  recordsProcessed: number;
  recordsFailed: number;
  startedAt: Date;
  completedAt: Date | null;
  errors: ConnectorBatchError[];
}

export interface ConnectorBatchError {
  recordId: string;
  error: string;
  timestamp: Date;
}

export interface ListingConversionTest {
  id: string;
  listingId: string;
  name: string;
  variants: ABTestVariant[];
  traffic: number;
  startDate: Date;
  endDate: Date | null;
  winner: string | null;
  active: boolean;
}

export interface MarketplaceSubscriptionRenewal {
  id: string;
  subscriptionId: string;
  renewalDate: Date;
  amount: number;
  currency: string;
  status: string;
  processedAt: Date | null;
}

export interface ConnectorHealthMetricEntry {
  id: string;
  listingId: string;
  metric: ConnectorHealthMetric;
  value: number;
  timestamp: Date;
}

export interface ListingDocumentationVersion {
  id: string;
  listingId: string;
  version: string;
  title: string;
  content: string;
  publishedAt: Date;
  publishedBy: string;
}

export interface MarketplaceComplianceCheck {
  id: string;
  listingId: string;
  checkType: string;
  status: ListingComplianceCheck;
  details: string;
  checkedAt: Date;
  expiresAt: Date | null;
}

export interface ConnectorWebhookDelivery {
  id: string;
  webhookId: string;
  event: string;
  payload: Record<string, unknown>;
  statusCode: number;
  response: string;
  deliveredAt: Date;
  duration: number;
}

export interface MarketplaceRevenueShare {
  id: string;
  authorId: string;
  period: string;
  totalRevenue: number;
  platformFee: number;
  netPayout: number;
  listings: RevenueShareEntry[];
}

export interface RevenueShareEntry {
  listingId: string;
  revenue: number;
  downloads: number;
  subscriptions: number;
}

export interface ListingVersionComparison {
  listingId: string;
  fromVersion: string;
  toVersion: string;
  changes: VersionComparisonChange[];
  breaking: boolean;
}

export interface VersionComparisonChange {
  type: string;
  field: string;
  oldValue: unknown;
  newValue: unknown;
}

export interface MarketplaceCacheEntry {
  id: string;
  key: string;
  value: Record<string, unknown>;
  ttlMs: number;
  createdAt: Date;
  expiresAt: Date;
}

export interface ConnectorRateLimitBucket {
  id: string;
  listingId: string;
  current: number;
  limit: number;
  windowMs: number;
  lastReset: Date;
}

export interface ListingLocalizationEntry {
  id: string;
  listingId: string;
  language: string;
  key: string;
  value: string;
  updatedAt: Date;
}

export interface MarketplaceExportJob {
  id: string;
  type: string;
  format: string;
  status: string;
  recordCount: number;
  fileUrl: string | null;
  requestedBy: string;
  requestedAt: Date;
  completedAt: Date | null;
}

export interface ConnectorMonitoringAlert {
  id: string;
  listingId: string;
  type: string;
  severity: string;
  message: string;
  metric: string;
  threshold: number;
  actual: number;
  triggeredAt: Date;
  resolvedAt: Date | null;
}

export interface ListingEmbedConfig {
  id: string;
  listingId: string;
  embedType: string;
  allowedDomains: string[];
  cssOverrides: Record<string, string> | null;
  active: boolean;
}
