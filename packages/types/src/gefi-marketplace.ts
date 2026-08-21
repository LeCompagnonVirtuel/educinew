export enum MarketplaceCategory {
  PAYMENT_PROCESSING = "PAYMENT_PROCESSING",
  INSURANCE = "INSURANCE",
  LOANS = "LOANS",
  SCHOLARSHIP = "SCHOLARSHIP",
  ACCOUNTING = "ACCOUNTING",
  COMPLIANCE = "COMPLIANCE",
  ANALYTICS = "ANALYTICS",
  INVESTMENT = "INVESTMENT",
  FOREX = "FOREX",
  AUDIT = "AUDIT",
}

export enum ProviderStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  REJECTED = "REJECTED",
  INACTIVE = "INACTIVE",
}

export enum ProductStatus {
  DRAFT = "DRAFT",
  PENDING_REVIEW = "PENDING_REVIEW",
  APPROVED = "APPROVED",
  ACTIVE = "ACTIVE",
  FEATURED = "FEATURED",
  SUSPENDED = "SUSPENDED",
  RETIRED = "RETIRED",
}

export enum ComparisonMetric {
  PRICE = "PRICE",
  FEATURES = "FEATURES",
  RATING = "RATING",
  COMPLIANCE = "COMPLIANCE",
  SUPPORT = "SUPPORT",
  INTEGRATION = "INTEGRATION",
}

export enum VerificationLevel {
  BASIC = "BASIC",
  ENHANCED = "ENHANCED",
  PREMIUM = "PREMIUM",
  CERTIFIED = "CERTIFIED",
}

export enum ComplianceStatusMP {
  COMPLIANT = "COMPLIANT",
  NON_COMPLIANT = "NON_COMPLIANT",
  PENDING_REVIEW = "PENDING_REVIEW",
  UNDER_INVESTIGATION = "UNDER_INVESTIGATION",
  EXEMPT = "EXEMPT",
}

export enum ApplicationStatus {
  SUBMITTED = "SUBMITTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  ADDITIONAL_INFO = "ADDITIONAL_INFO",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  WITHDRAWN = "WITHDRAWN",
}

export enum ReviewStatus {
  PENDING = "PENDING",
  PUBLISHED = "PUBLISHED",
  HIDDEN = "HIDDEN",
  FLAGGED = "FLAGGED",
  REMOVED = "REMOVED",
}

export enum RecommendationType {
  FEATURED = "FEATURED",
  TRENDING = "TRENDING",
  PERSONALIZED = "PERSONALIZED",
  SIMILAR = "SIMILAR",
  NEW = "NEW",
}

export enum PricingType {
  FREE = "FREE",
  SUBSCRIPTION = "SUBSCRIPTION",
  PER_USE = "PER_USE",
  TIERED = "TIERED",
  CUSTOM = "CUSTOM",
}

export enum MarketplaceOrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PROVISIONING = "PROVISIONING",
  ACTIVE = "ACTIVE",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

export enum ProviderTier {
  BRONZE = "BRONZE",
  SILVER = "SILVER",
  GOLD = "GOLD",
  PLATINUM = "PLATINUM",
}

export enum ProductIntegrationType {
  API = "API",
  WEBHOOK = "WEBHOOK",
  FILE = "FILE",
  SDK = "SDK",
  MANUAL = "MANUAL",
}

export enum MarketplaceSortOption {
  RATING = "RATING",
  PRICE_LOW = "PRICE_LOW",
  PRICE_HIGH = "PRICE_HIGH",
  POPULARITY = "POPULARITY",
  NEWEST = "NEWEST",
}

export enum MarketplaceNotificationType {
  NEW_PRODUCT = "NEW_PRODUCT",
  PRICE_DROP = "PRICE_DROP",
  REVIEW = "REVIEW",
  STATUS_CHANGE = "STATUS_CHANGE",
  COMPLIANCE = "COMPLIANCE",
}

export interface FinancialMarketplaceProvider {
  id: string;
  schoolId: string;
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  description: string;
  categories: MarketplaceCategory[];
  status: ProviderStatus;
  verificationLevel: VerificationLevel;
  complianceStatus: ComplianceStatusMP;
  averageRating: number;
  totalReviews: number;
  totalProducts: number;
  headquartersCountry: string;
  foundedYear: number;
  employeeCount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FinancialMarketplaceProduct {
  id: string;
  schoolId: string;
  providerId: string;
  name: string;
  description: string;
  category: MarketplaceCategory;
  subcategory: string;
  status: ProductStatus;
  pricingModel: PricingModel;
  features: ProductFeature[];
  complianceStatus: ComplianceStatusMP;
  averageRating: number;
  totalReviews: number;
  totalInstalls: number;
  freeTrialAvailable: boolean;
  demoAvailable: boolean;
  integrationType: string;
  apiAvailable: boolean;
  mobileCompatible: boolean;
  documentationUrl: string;
  supportEmail: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface PricingModel {
  type: PricingType;
  basePrice: number;
  currency: string;
  billingCycle: string;
  tieredPricing: PricingTier[];
  customPricing: boolean;
}

export interface PricingTier {
  name: string;
  price: number;
  features: string[];
  limits: Record<string, number>;
}

export interface ProductFeature {
  name: string;
  description: string;
  included: boolean;
  tier: string;
}

export interface MarketplaceEligibility {
  id: string;
  schoolId: string;
  schoolType: string;
  studentCount: number;
  budgetRange: string;
  existingSystems: string[];
  requirements: string[];
  eligibleCategories: MarketplaceCategory[];
  maxBudget: number;
  preferredPricing: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface MarketplaceComparison {
  id: string;
  schoolId: string;
  productIds: string[];
  comparisonMetrics: ComparisonMetric[];
  scores: ProductComparisonScore[];
  recommendation: string;
  generatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ProductComparisonScore {
  productId: string;
  productName: string;
  overallScore: number;
  metricScores: MetricScore[];
}

export interface MetricScore {
  metric: ComparisonMetric;
  score: number;
  rank: number;
}

export interface MarketplaceApplication {
  id: string;
  schoolId: string;
  providerId: string;
  productId: string;
  status: ApplicationStatus;
  submittedDocuments: string[];
  requestedFeatures: string[];
  budget: number;
  timeline: string;
  submittedAt: Date;
  reviewedAt: Date | null;
  reviewerId: string | null;
  decision: string | null;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface MarketplaceRating {
  id: string;
  schoolId: string;
  productId: string;
  userId: string;
  rating: number;
  title: string;
  review: string;
  pros: string[];
  cons: string[];
  wouldRecommend: boolean;
  usageDuration: string;
  status: ReviewStatus;
  helpfulVotes: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface MarketplaceVerification {
  id: string;
  schoolId: string;
  providerId: string;
  verificationLevel: VerificationLevel;
  documentsSubmitted: string[];
  documentsVerified: string[];
  complianceChecks: VerificationCheck[];
  status: string;
  verifiedBy: string | null;
  submittedAt: Date;
  verifiedAt: Date | null;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface VerificationCheck {
  checkType: string;
  status: string;
  result: string;
  verifiedAt: Date | null;
}

export interface MarketplaceCompliance {
  id: string;
  schoolId: string;
  productId: string;
  providerId: string;
  complianceStatus: ComplianceStatusMP;
  requirements: ComplianceRequirement[];
  lastAuditDate: Date;
  nextAuditDate: Date;
  certificateNumber: string | null;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ComplianceRequirement {
  requirement: string;
  status: string;
  evidence: string;
  verifiedAt: Date | null;
}

export interface MarketplaceCategoryConfig {
  id: string;
  schoolId: string;
  category: MarketplaceCategory;
  displayName: string;
  description: string;
  icon: string;
  requiredVerifications: string[];
  complianceRequirements: string[];
  maxProducts: number;
  featuredSlots: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface MarketplaceSearch {
  id: string;
  schoolId: string;
  query: string;
  filters: SearchFilter[];
  results: SearchResult[];
  resultCount: number;
  searchDuration: number;
  searchedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface SearchFilter {
  field: string;
  operator: string;
  value: string;
}

export interface SearchResult {
  productId: string;
  productName: string;
  providerName: string;
  relevanceScore: number;
  matchedFields: string[];
}

export interface MarketplaceRecommendation {
  id: string;
  schoolId: string;
  recommendationType: RecommendationType;
  productIds: string[];
  reason: string;
  confidence: number;
  personalizedFor: string;
  generatedAt: Date;
  clickedProducts: string[];
  convertedProducts: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface MarketplaceOrder {
  id: string;
  schoolId: string;
  productId: string;
  providerId: string;
  status: MarketplaceOrderStatus;
  pricingType: PricingType;
  amount: number;
  currency: string;
  billingCycle: string;
  orderedBy: string;
  orderedAt: Date;
  activatedAt: Date | null;
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface MarketplaceInvoice {
  id: string;
  schoolId: string;
  orderId: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: string;
  dueDate: Date;
  paidDate: Date | null;
  lineItems: InvoiceLineItem[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface ProviderPerformance {
  id: string;
  schoolId: string;
  providerId: string;
  period: string;
  averageResponseTime: number;
  uptimePercent: number;
  supportTickets: number;
  averageResolutionTime: number;
  customerSatisfaction: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface MarketplaceIntegration {
  id: string;
  schoolId: string;
  productId: string;
  integrationType: ProductIntegrationType;
  endpointUrl: string;
  apiKey: string;
  status: string;
  lastSyncDate: Date | null;
  errorMessage: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
