// ============================================================================
// Phase 3.4 - Modules 5-6: Enterprise Marketplace & Governance Platform Types
// ============================================================================

// ============================================================================
// MODULE 5 - Enterprise Marketplace Enums
// ============================================================================

export enum ProductType {
  APP = "APP",
  PLUGIN = "PLUGIN",
  EXTENSION = "EXTENSION",
  COURSE = "COURSE",
  BOOK = "BOOK",
  AI_MODEL = "AI_MODEL",
  TEMPLATE = "TEMPLATE",
  SERVICE = "SERVICE",
  CONSULTANT = "CONSULTANT",
  TUTOR = "TUTOR",
  DIGITAL_PRODUCT = "DIGITAL_PRODUCT",
}

export enum ProductStatus {
  DRAFT = "DRAFT",
  PENDING_REVIEW = "PENDING_REVIEW",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
  SUSPENDED = "SUSPENDED",
}

export enum SubscriptionTier {
  FREE = "FREE",
  BASIC = "BASIC",
  PROFESSIONAL = "PROFESSIONAL",
  ENTERPRISE = "ENTERPRISE",
  CUSTOM = "CUSTOM",
}

export enum ReviewStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  FLAGGED = "FLAGGED",
}

export enum RatingType {
  STAR = "STAR",
  THUMBS_UP = "THUMBS_UP",
  NUMERIC = "NUMERIC",
  RECOMMENDATION = "RECOMMENDATION",
}

export enum LicenseType {
  FREE = "FREE",
  TRIAL = "TRIAL",
  STANDARD = "STANDARD",
  PREMIUM = "PREMIUM",
  ENTERPRISE = "ENTERPRISE",
  OPEN_SOURCE = "OPEN_SOURCE",
  CUSTOM = "CUSTOM",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
  DISPUTED = "DISPUTED",
}

export enum CategoryType {
  EDUCATIONAL = "EDUCATIONAL",
  TECHNOLOGY = "TECHNOLOGY",
  CONTENT = "CONTENT",
  SERVICE = "SERVICE",
  INTEGRATION = "INTEGRATION",
  AI = "AI",
  ANALYTICS = "ANALYTICS",
}

export enum MarketplaceVisibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  SCHOOL_ONLY = "SCHOOL_ONLY",
  REGIONAL = "REGIONAL",
  FEATURED = "FEATURED",
}

export enum ProductCategory {
  LEARNING_MANAGEMENT = "LEARNING_MANAGEMENT",
  ASSESSMENT = "ASSESSMENT",
  COMMUNICATION = "COMMUNICATION",
  ANALYTICS = "ANALYTICS",
  ADMINISTRATION = "ADMINISTRATION",
  PARENT = "PARENT",
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  AI_TOOL = "AI_TOOL",
  CONTENT_CREATION = "CONTENT_CREATION",
}

// ============================================================================
// MODULE 6 - Governance Platform Enums
// ============================================================================

export enum BoardStatus {
  ACTIVE = "ACTIVE",
  DISSOLVED = "DISSOLVED",
  SUSPENDED = "SUSPENDED",
}

export enum MeetingStatus {
  SCHEDULED = "SCHEDULED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  POSTPONED = "POSTPONED",
}

export enum CommitteeType {
  ACADEMIC = "ACADEMIC",
  FINANCE = "FINANCE",
  DISCIPLINARY = "DISCIPLINARY",
  HR = "HR",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  TECHNOLOGY = "TECHNOLOGY",
  PARENT = "PARENT",
  STUDENT = "STUDENT",
}

export enum VoteStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  CANCELLED = "CANCELLED",
  QUORUM_NOT_MET = "QUORUM_NOT_MET",
}

export enum ResolutionStatus {
  PROPOSED = "PROPOSED",
  DISCUSSED = "DISCUSSED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  IMPLEMENTED = "IMPLEMENTED",
  ARCHIVED = "ARCHIVED",
}

export enum PolicyStatus {
  DRAFT = "DRAFT",
  UNDER_REVIEW = "UNDER_REVIEW",
  APPROVED = "APPROVED",
  ACTIVE = "ACTIVE",
  RETIRED = "RETIRED",
  ARCHIVED = "ARCHIVED",
}

export enum ComplianceStatus {
  COMPLIANT = "COMPLIANT",
  NON_COMPLIANT = "NON_COMPLIANT",
  PARTIAL = "PARTIAL",
  UNDER_REVIEW = "UNDER_REVIEW",
  EXEMPT = "EXEMPT",
}

export enum LegalDocumentType {
  CONTRACT = "CONTRACT",
  POLICY = "POLICY",
  BYLAWS = "BYLAWS",
  REGULATION = "REGULATION",
  MEMORANDUM = "MEMORANDUM",
  AGREEMENT = "AGREEMENT",
  CERTIFICATE = "CERTIFICATE",
  LICENSE = "LICENSE",
}

export enum RiskLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum InternalControlType {
  PREVENTIVE = "PREVENTIVE",
  DETECTIVE = "DETECTIVE",
  CORRECTIVE = "CORRECTIVE",
  COMPENSATING = "COMPENSATING",
}

export enum DecisionStatus {
  PROPOSED = "PROPOSED",
  UNDER_CONSIDERATION = "UNDER_CONSIDERATION",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  IMPLEMENTED = "IMPLEMENTED",
}

export enum GovernanceFrequency {
  WEEKLY = "WEEKLY",
  BIWEEKLY = "BIWEEKLY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  ANNUAL = "ANNUAL",
  AD_HOC = "AD_HOC",
}

// ============================================================================
// MODULE 5 - Enterprise Marketplace Interfaces
// ============================================================================

export interface MarketplaceProduct {
  id: string;
  school_id: string | null;
  seller_id: string;
  product_type: ProductType;
  name: string;
  description: string;
  short_description: string;
  category: ProductCategory;
  tags: string[];
  price: number;
  currency: string;
  subscription_tier: SubscriptionTier;
  status: ProductStatus;
  visibility: MarketplaceVisibility;
  icon_url: string | null;
  screenshots: string[];
  demo_url: string | null;
  documentation_url: string | null;
  version: string;
  downloads: number;
  rating_average: number;
  rating_count: number;
  created_at: string;
  updated_at: string;
}

export interface MarketplacePlugin {
  id: string;
  product_id: string;
  plugin_type: string;
  api_version: string;
  min_platform_version: string;
  config_schema: Record<string, unknown>;
  permissions: string[];
  created_at: string;
}

export interface MarketplaceExtension {
  id: string;
  product_id: string;
  extension_point: string;
  manifest: Record<string, unknown>;
  created_at: string;
}

export interface MarketplaceCourse {
  id: string;
  product_id: string;
  instructor_id: string;
  duration_hours: number;
  lessons_count: number;
  enrollment_count: number;
  difficulty: string;
  language: string;
  certificate_included: boolean;
  created_at: string;
}

export interface MarketplaceBook {
  id: string;
  product_id: string;
  author: string;
  isbn: string | null;
  page_count: number;
  format: string;
  language: string;
  created_at: string;
}

export interface MarketplaceAIModel {
  id: string;
  product_id: string;
  model_type: string;
  model_size: string;
  inference_time_ms: number;
  accuracy: number;
  api_endpoint: string | null;
  created_at: string;
}

export interface MarketplaceTemplate {
  id: string;
  product_id: string;
  template_type: string;
  preview_url: string | null;
  customizable: boolean;
  created_at: string;
}

export interface MarketplaceService {
  id: string;
  product_id: string;
  provider_id: string;
  service_type: string;
  delivery_method: string;
  sla: Record<string, unknown>;
  created_at: string;
}

export interface MarketplaceConsultant {
  id: string;
  product_id: string;
  consultant_id: string;
  expertise: string[];
  hourly_rate: number;
  availability: string;
  rating: number;
  created_at: string;
}

export interface MarketplaceTutor {
  id: string;
  product_id: string;
  tutor_id: string;
  subjects: string[];
  grade_levels: string[];
  hourly_rate: number;
  rating: number;
  sessions_completed: number;
  created_at: string;
}

export interface DigitalProduct {
  id: string;
  product_id: string;
  file_url: string;
  file_type: string;
  file_size_bytes: number;
  download_limit: number | null;
  created_at: string;
}

export interface ProductSubscription {
  id: string;
  school_id: string;
  product_id: string;
  tier: SubscriptionTier;
  start_date: string;
  end_date: string | null;
  auto_renew: boolean;
  status: string;
  created_at: string;
}

export interface ProductReview {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string;
  review_text: string;
  pros: string[];
  cons: string[];
  helpful_count: number;
  status: ReviewStatus;
  created_at: string;
  updated_at: string;
}

export interface ProductRating {
  id: string;
  product_id: string;
  average_rating: number;
  total_ratings: number;
  distribution: Record<number, number>;
  last_updated: string;
}

export interface ProductLicense {
  id: string;
  school_id: string;
  product_id: string;
  license_type: LicenseType;
  license_key: string;
  max_users: number | null;
  valid_from: string;
  valid_until: string | null;
  status: string;
  created_at: string;
}

export interface MarketplaceAnalytics {
  id: string;
  school_id: string;
  period: string;
  total_products: number;
  total_downloads: number;
  total_revenue: number;
  top_products: string[];
  generated_at: string;
}

export interface ProductCategoryEntity {
  id: string;
  name: string;
  slug: string;
  description: string;
  parent_id: string | null;
  product_count: number;
  icon: string;
}

export interface SellerProfile {
  id: string;
  user_id: string;
  school_id: string | null;
  display_name: string;
  description: string;
  avatar_url: string;
  products_count: number;
  total_sales: number;
  rating: number;
  verified: boolean;
  created_at: string;
}

// ============================================================================
// MODULE 6 - Governance Platform Interfaces
// ============================================================================

export interface Board {
  id: string;
  school_id: string;
  name: string;
  description: string;
  board_type: string;
  members: BoardMember[];
  status: BoardStatus;
  established_date: string;
  meeting_frequency: GovernanceFrequency;
  created_at: string;
  updated_at: string;
}

export interface BoardMember {
  user_id: string;
  name: string;
  role: string;
  join_date: string;
  term_end_date: string | null;
}

export interface BoardMeeting {
  id: string;
  board_id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  agenda: MeetingAgendaItem[];
  attendees: MeetingAttendee[];
  status: MeetingStatus;
  minutes_url: string | null;
  created_at: string;
}

export interface MeetingAgendaItem {
  id: string;
  title: string;
  description: string;
  presenter: string;
  duration_minutes: number;
  order: number;
}

export interface MeetingAttendee {
  user_id: string;
  name: string;
  role: string;
  attended: boolean;
  apology: boolean;
}

export interface Committee {
  id: string;
  school_id: string;
  board_id: string | null;
  name: string;
  committee_type: CommitteeType;
  description: string;
  chair_id: string;
  members: CommitteeMember[];
  status: string;
  created_at: string;
}

export interface CommitteeMember {
  user_id: string;
  name: string;
  role: string;
  join_date: string;
}

export interface Voting {
  id: string;
  meeting_id: string;
  title: string;
  description: string;
  options: VoteOption[];
  deadline: string;
  status: VoteStatus;
  quorum_percentage: number;
  voters_count: number;
  created_at: string;
}

export interface VoteOption {
  id: string;
  label: string;
  votes_count: number;
}

export interface Resolution {
  id: string;
  school_id: string;
  meeting_id: string | null;
  title: string;
  description: string;
  proposed_by: string;
  status: ResolutionStatus;
  implementation_deadline: string | null;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}

export interface SchoolPolicy {
  id: string;
  school_id: string;
  title: string;
  description: string;
  policy_number: string;
  category: string;
  effective_date: string;
  review_date: string | null;
  status: PolicyStatus;
  version: number;
  document_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ComplianceCheck {
  id: string;
  school_id: string;
  policy_id: string | null;
  check_name: string;
  description: string;
  status: ComplianceStatus;
  last_checked: string;
  next_check: string;
  findings: string[];
  created_at: string;
}

export interface LegalDocument {
  id: string;
  school_id: string;
  document_type: LegalDocumentType;
  title: string;
  description: string;
  file_url: string;
  effective_date: string;
  expiry_date: string | null;
  status: string;
  created_at: string;
}

export interface DecisionTracking {
  id: string;
  school_id: string;
  title: string;
  description: string;
  decision_by: string;
  decision_date: string;
  status: DecisionStatus;
  rationale: string;
  impact_assessment: string;
  created_at: string;
}

export interface RiskRegister {
  id: string;
  school_id: string;
  title: string;
  description: string;
  risk_level: RiskLevel;
  probability: number;
  impact: number;
  risk_score: number;
  mitigation: string;
  owner: string;
  status: string;
  review_date: string;
  created_at: string;
}

export interface InternalControl {
  id: string;
  school_id: string;
  control_type: InternalControlType;
  name: string;
  description: string;
  effectiveness: string;
  last_reviewed: string;
  owner: string;
  created_at: string;
}

export interface GovernanceAnalytics {
  id: string;
  school_id: string;
  period: string;
  meetings_held: number;
  resolutions_passed: number;
  policies_reviewed: number;
  compliance_score: number;
  risk_summary: Record<string, number>;
  generated_at: string;
}
