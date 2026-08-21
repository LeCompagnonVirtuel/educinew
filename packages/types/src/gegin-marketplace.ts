export enum MarketplaceType {
  COURSES = "COURSES",
  UNIVERSITIES = "UNIVERSITIES",
  TEACHERS = "TEACHERS",
  CONSULTANTS = "CONSULTANTS",
  PUBLISHERS = "PUBLISHERS",
  CONTENT = "CONTENT",
  AI_MODELS = "AI_MODELS",
  PLUGINS = "PLUGINS",
  CERTIFICATIONS = "CERTIFICATIONS",
  SERVICES = "SERVICES",
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
  SOLD_OUT = "SOLD_OUT",
}

export enum ProductType {
  DIGITAL = "DIGITAL",
  PHYSICAL = "PHYSICAL",
  SERVICE = "SERVICE",
  SUBSCRIPTION = "SUBSCRIPTION",
  ONE_TIME = "ONE_TIME",
  BUNDLE = "BUNDLE",
  COURSE = "COURSE",
  EBOOK = "EBOOK",
  TEMPLATE = "TEMPLATE",
  SOFTWARE = "SOFTWARE",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
  PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED",
  DISPUTED = "DISPUTED",
  CANCELLED = "CANCELLED",
}

export enum RatingType {
  STAR = "STAR",
  THUMBS = "THUMBS",
  NUMERIC = "NUMERIC",
  PERCENTAGE = "PERCENTAGE",
  LIKERT = "LIKERT",
}

export enum CommissionType {
  PERCENTAGE = "PERCENTAGE",
  FIXED = "FIXED",
  TIERED = "TIERED",
  SUBSCRIPTION = "SUBSCRIPTION",
  NONE = "NONE",
}

export enum VerificationStatus {
  UNVERIFIED = "UNVERIFIED",
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
}

export enum CourseLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT",
  ALL_LEVELS = "ALL_LEVELS",
}

export enum CourseFormat {
  VIDEO = "VIDEO",
  TEXT = "TEXT",
  INTERACTIVE = "INTERACTIVE",
  LIVE = "LIVE",
  HYBRID = "HYBRID",
  WORKSHOP = "WORKSHOP",
  BOOTCAMP = "BOOTCAMP",
}

export enum UniversityRanking {
  TOP_10 = "TOP_10",
  TOP_50 = "TOP_50",
  TOP_100 = "TOP_100",
  TOP_500 = "TOP_500",
  UNRANKED = "UNRANKED",
}

export enum ConsultantSpecialization {
  CURRICULUM = "CURRICULUM",
  PEDAGOGY = "PEDAGOGY",
  EDUCATION_TECHNOLOGY = "EDUCATION_TECHNOLOGY",
  SCHOOL_MANAGEMENT = "SCHOOL_MANAGEMENT",
  TEACHER_TRAINING = "TEACHER_TRAINING",
  STUDENT_WELLBEING = "STUDENT_WELLBEING",
  SPECIAL_EDUCATION = "SPECIAL_EDUCATION",
  LEADERSHIP = "LEADERSHIP",
}

export enum PublisherType {
  ACADEMIC = "ACADEMIC",
  COMMERCIAL = "COMMERCIAL",
  INDEPENDENT = "INDEPENDENT",
  OPEN_SOURCE = "OPEN_SOURCE",
  GOVERNMENT = "GOVERNMENT",
  NGO = "NGO",
}

export enum ContentLicense {
  CC_BY = "CC_BY",
  CC_BY_SA = "CC_BY_SA",
  CC_BY_NC = "CC_BY_NC",
  CC_BY_NC_SA = "CC_BY_NC_SA",
  CC_BY_ND = "CC_BY_ND",
  CC0 = "CC0",
  PROPRIETARY = "PROPRIETARY",
  CUSTOM = "CUSTOM",
}

export enum AIModelType {
  LLM = "LLM",
  CV = "CV",
  NLP = "NLP",
  SPEECH = "SPEECH",
  RECOMMENDATION = "RECOMMENDATION",
  PREDICTION = "PREDICTION",
  GENERATIVE = "GENERATIVE",
}

export enum PluginCategory {
  LMS = "LMS",
  ASSESSMENT = "ASSESSMENT",
  COMMUNICATION = "COMMUNICATION",
  ANALYTICS = "ANALYTICS",
  PAYMENT = "PAYMENT",
  SECURITY = "SECURITY",
  INTEGRATION = "INTEGRATION",
  UI_UX = "UI_UX",
}

export enum CertificationType {
  PROFESSIONAL = "PROFESSIONAL",
  ACADEMIC = "ACADEMIC",
  INDUSTRY = "INDUSTRY",
  MICRO = "MICRO",
  BADGE = "BADGE",
  SPECIALIZATION = "SPECIALIZATION",
}

export enum ServiceCategory {
  CONSULTING = "CONSULTING",
  TRAINING = "TRAINING",
  IMPLEMENTATION = "IMPLEMENTATION",
  SUPPORT = "SUPPORT",
  CUSTOM_DEVELOPMENT = "CUSTOM_DEVELOPMENT",
  MIGRATION = "MIGRATION",
  AUDIT = "AUDIT",
}

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
  DISPUTED = "DISPUTED",
}

export enum ReviewStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  FLAGGED = "FLAGGED",
}

export enum MarketplaceSearchFilter {
  RELEVANCE = "RELEVANCE",
  PRICE_LOW = "PRICE_LOW",
  PRICE_HIGH = "PRICE_HIGH",
  RATING = "RATING",
  NEWEST = "NEWEST",
  POPULAR = "POPULAR",
  BEST_SELLING = "BEST_SELLING",
}

export enum SubscriptionTier {
  FREE = "FREE",
  BASIC = "BASIC",
  PRO = "PRO",
  ENTERPRISE = "ENTERPRISE",
}

export enum SellerTier {
  BRONZE = "BRONZE",
  SILVER = "SILVER",
  GOLD = "GOLD",
  PLATINUM = "PLATINUM",
  DIAMOND = "DIAMOND",
}

export enum MarketplaceCurrency {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  NGN = "NGN",
  GHS = "GHS",
  KES = "KES",
  ZAR = "ZAR",
  XOF = "XOF",
  XAF = "XAF",
  JPY = "JPY",
}

export enum DeliveryMethod {
  INSTANT = "INSTANT",
  SCHEDULED = "SCHEDULED",
  MANUAL = "MANUAL",
  API = "API",
  DOWNLOAD = "DOWNLOAD",
}

export enum RefundReason {
  NOT_AS_DESCRIBED = "NOT_AS_DESCRIBED",
  DEFECTIVE = "DEFECTIVE",
  NOT_RECEIVED = "NOT_RECEIVED",
  DUPLICATE = "DUPLICATE",
  CHANGE_OF_MIND = "CHANGE_OF_MIND",
  OTHER = "OTHER",
}

export enum PayoutStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  ON_HOLD = "ON_HOLD",
}

export enum ListingVisibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  RESTRICTED = "RESTRICTED",
  UNLISTED = "UNLISTED",
}

export enum MarketplaceAnalyticsType {
  VIEWS = "VIEWS",
  CLICKS = "CLICKS",
  CONVERSIONS = "CONVERSIONS",
  REVENUE = "REVENUE",
  REVIEWS = "REVIEWS",
  FAVORITES = "FAVORITES",
  SHARES = "SHARES",
}

export enum SellerVerificationType {
  IDENTITY = "IDENTITY",
  BUSINESS = "BUSINESS",
  EDUCATION = "EDUCATION",
  PROFESSIONAL = "PROFESSIONAL",
  BACKGROUND_CHECK = "BACKGROUND_CHECK",
}

export enum ListingFeatureType {
  FEATURED = "FEATURED",
  SPONSORED = "SPONSORED",
  HIGHLIGHTED = "HIGHLIGHTED",
  TOP_RATED = "TOP_RATED",
  BESTSELLER = "BESTSELLER",
  NEW_ARRIVAL = "NEW_ARRIVAL",
}

export enum CourseOutcomeType {
  CERTIFICATE = "CERTIFICATE",
  CREDIT = "CREDIT",
  BADGE = "BADGE",
  LICENSE = "LICENSE",
  NONE = "NONE",
}

export enum UniversityProgramType {
  UNDERGRADUATE = "UNDERGRADUATE",
  POSTGRADUATE = "POSTGRADUATE",
  DOCTORAL = "DOCTORAL",
  DIPLOMA = "DIPLOMA",
  CERTIFICATE = "CERTIFICATE",
  ONLINE = "ONLINE",
}

export enum AIModelLicense {
  OPEN_SOURCE = "OPEN_SOURCE",
  COMMERCIAL = "COMMERCIAL",
  RESEARCH = "RESEARCH",
  CUSTOM = "CUSTOM",
  FREEMIUM = "FREEMIUM",
}

export enum PluginCompatibility {
  NEXTJS = "NEXTJS",
  REACT = "REACT",
  VUE = "VUE",
  ANGULAR = "ANGULAR",
  WORDPRESS = "WORDPRESS",
  MOODLE = "MOODLE",
  CANVAS = "CANVAS",
  BLACKBOARD = "BLACKBOARD",
}

export enum CertificationValidity {
  PERMANENT = "PERMANENT",
  ONE_YEAR = "ONE_YEAR",
  TWO_YEARS = "TWO_YEARS",
  THREE_YEARS = "THREE_YEARS",
  FIVE_YEARS = "FIVE_YEARS",
}

export enum ServiceDeliveryTime {
  INSTANT = "INSTANT",
  WITHIN_24H = "WITHIN_24H",
  WITHIN_48H = "WITHIN_48H",
  WITHIN_WEEK = "WITHIN_WEEK",
  WITHIN_MONTH = "WITHIN_MONTH",
  CUSTOM = "CUSTOM",
}

export enum MarketplaceDisputeType {
  QUALITY = "QUALITY",
  DELIVERY = "DELIVERY",
  REFUND = "REFUND",
  INTELLECTUAL_PROPERTY = "INTELLECTUAL_PROPERTY",
  PAYMENT = "PAYMENT",
  OTHER = "OTHER",
}

export enum DisputeStatus {
  OPEN = "OPEN",
  UNDER_REVIEW = "UNDER_REVIEW",
  MEDIATION = "MEDIATION",
  RESOLVED = "RESOLVED",
  ESCALATED = "ESCALATED",
  CLOSED = "CLOSED",
}

export enum MarketplaceNotificationType {
  ORDER = "ORDER",
  PAYMENT = "PAYMENT",
  REVIEW = "REVIEW",
  MESSAGE = "MESSAGE",
  LISTING = "LISTING",
  PAYOUT = "PAYOUT",
  SYSTEM = "SYSTEM",
}

export enum SellerPerformanceStatus {
  EXCELLENT = "EXCELLENT",
  GOOD = "GOOD",
  AVERAGE = "AVERAGE",
  BELOW_AVERAGE = "BELOW_AVERAGE",
  POOR = "POOR",
}

export enum MarketplacePromotionType {
  PERCENTAGE_OFF = "PERCENTAGE_OFF",
  FIXED_AMOUNT = "FIXED_AMOUNT",
  BUY_ONE_GET_ONE = "BUY_ONE_GET_ONE",
  BUNDLE_DISCOUNT = "BUNDLE_DISCOUNT",
  FREE_TRIAL = "FREE_TRIAL",
  FLASH_SALE = "FLASH_SALE",
}

export enum ContentDeliveryFormat {
  STREAMING = "STREAMING",
  DOWNLOAD = "DOWNLOAD",
  LIVE = "LIVE",
  EMBED = "EMBED",
  API = "API",
}

export enum UniversityAccreditation {
  NATIONAL = "NATIONAL",
  REGIONAL = "REGIONAL",
  INTERNATIONAL = "INTERNATIONAL",
  PROGRAM_SPECIFIC = "PROGRAM_SPECIFIC",
}

export enum MarketplaceReportType {
  SALES = "SALES",
  REVENUE = "REVENUE",
  USERS = "USERS",
  LISTINGS = "LISTINGS",
  ENGAGEMENT = "ENGAGEMENT",
  DISPUTES = "DISPUTES",
}

export enum ListingCondition {
  NEW = "NEW",
  LIKE_NEW = "LIKE_NEW",
  GOOD = "GOOD",
  FAIR = "FAIR",
  USED = "USED",
}

export enum SellerPayoutMethod {
  BANK_TRANSFER = "BANK_TRANSFER",
  MOBILE_MONEY = "MOBILE_MONEY",
  PAYPAL = "PAYPAL",
  STRIPE = "STRIPE",
  CHECK = "CHECK",
}

export enum MarketplaceLanguageSupport {
  ENGLISH = "ENGLISH",
  FRENCH = "FRENCH",
  SPANISH = "SPANISH",
  ARABIC = "ARABIC",
  SWAHILI = "SWAHILI",
  PORTUGUESE = "PORTUGUESE",
}

export enum CoursePrerequisiteType {
  NONE = "NONE",
  KNOWLEDGE = "KNOWLEDGE",
  COURSE = "COURSE",
  CERTIFICATION = "CERTIFICATION",
  EXPERIENCE = "EXPERIENCE",
}

export enum AIModelDeploymentType {
  CLOUD = "CLOUD",
  ON_PREMISE = "ON_PREMISE",
  EDGE = "EDGE",
  HYBRID = "HYBRID",
  SERVERLESS = "SERVERLESS",
}

export enum PluginPricingModel {
  FREE = "FREE",
  ONE_TIME = "ONE_TIME",
  SUBSCRIPTION = "SUBSCRIPTION",
  USAGE_BASED = "USAGE_BASED",
  TIERED = "TIERED",
}

export enum ServiceScope {
  FIXED = "FIXED",
  HOURLY = "HOURLY",
  PROJECT_BASED = "PROJECT_BASED",
  RETAINER = "RETAINER",
  CUSTOM = "CUSTOM",
}

export interface MarketplaceListing {
  id: string;
  schoolId: string;
  sellerId: string;
  marketplaceType: MarketplaceType;
  productType: ProductType;
  status: ListingStatus;
  visibility: ListingVisibility;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  images: ListingImage[];
  category: string;
  tags: string[];
  price: number;
  originalPrice?: number;
  currency: MarketplaceCurrency;
  discount?: MarketplaceDiscount;
  features: ListingFeatureType[];
  languageSupport: MarketplaceLanguageSupport[];
  rating: MarketplaceRating;
  salesCount: number;
  viewCount: number;
  favoriteCount: number;
  isPublished: boolean;
  publishedAt?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

export interface ListingImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
  width: number;
  height: number;
}

export interface MarketplaceDiscount {
  type: MarketplacePromotionType;
  value: number;
  startDate: string;
  endDate: string;
  usageLimit?: number;
  usageCount: number;
}

export interface MarketplaceRating {
  average: number;
  count: number;
  distribution: RatingDistribution;
}

export interface RatingDistribution {
  five: number;
  four: number;
  three: number;
  two: number;
  one: number;
}

export interface InternationalCourse {
  id: string;
  listingId: string;
  title: string;
  description: string;
  instructorId: string;
  instructorName: string;
  institution?: string;
  level: CourseLevel;
  format: CourseFormat;
  language: string;
  subtitles: string[];
  duration: number;
  durationUnit: string;
  modules: CourseModule[];
  prerequisites: CoursePrerequisite[];
  learningOutcomes: string[];
  certification: CourseCertification;
  maxEnrollments?: number;
  currentEnrollments: number;
  completionRate: number;
  averageRating: number;
  reviewCount: number;
  isAccredited: boolean;
  accreditationBody?: string;
  syllabusUrl?: string;
  previewUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: CourseLesson[];
  duration: number;
  isRequired: boolean;
}

export interface CourseLesson {
  id: string;
  title: string;
  type: ContentDeliveryFormat;
  duration: number;
  contentUrl?: string;
  isPreview: boolean;
  order: number;
}

export interface CoursePrerequisite {
  type: CoursePrerequisiteType;
  value: string;
  description: string;
}

export interface CourseCertification {
  available: boolean;
  type: CertificationType;
  name: string;
  issuingBody: string;
  validity: CertificationValidity;
  requirements: string[];
}

export interface UniversityListing {
  id: string;
  listingId: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  coverImage: string;
  country: string;
  city: string;
  founded: number;
  ranking: UniversityRanking;
  rankingDetails?: string;
  accreditation: UniversityAccreditation[];
  programs: UniversityProgram[];
  tuitionRange: TuitionRange;
  studentPopulation: number;
  internationalStudents: number;
  campusSize: string;
  website: string;
  contactEmail: string;
  contactPhone: string;
  socialLinks: SocialLinks;
  facilities: string[];
  partnerships: string[];
  researchOutput: string;
  employabilityRate: number;
  averageSalary?: number;
  currency: MarketplaceCurrency;
  createdAt: string;
  updatedAt: string;
}

export interface UniversityProgram {
  id: string;
  name: string;
  type: UniversityProgramType;
  degree: string;
  duration: number;
  durationUnit: string;
  language: string;
  tuition: number;
  currency: MarketplaceCurrency;
  isOnline: boolean;
  isAvailable: boolean;
  startDate: string;
  applicationDeadline: string;
  requirements: string[];
}

export interface TuitionRange {
  min: number;
  max: number;
  currency: MarketplaceCurrency;
  period: string;
}

export interface SocialLinks {
  website?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
}

export interface TeacherListing {
  id: string;
  listingId: string;
  userId: string;
  displayName: string;
  avatar: string;
  bio: string;
  headline: string;
  specializations: string[];
  subjects: string[];
  languages: string[];
  education: TeacherEducation[];
  experience: TeacherExperience[];
  hourlyRate: number;
  currency: MarketplaceCurrency;
  availability: TeacherAvailability[];
  totalStudents: number;
  totalCourses: number;
  averageRating: number;
  reviewCount: number;
  responseTime: string;
  verification: VerificationStatus;
  certificates: TeacherCertificate[];
  createdAt: string;
  updatedAt: string;
}

export interface TeacherEducation {
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear?: number;
  isCurrent: boolean;
}

export interface TeacherExperience {
  institution: string;
  position: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
}

export interface TeacherAvailability {
  day: string;
  startTime: string;
  endTime: string;
  timezone: string;
}

export interface TeacherCertificate {
  name: string;
  issuingBody: string;
  issuedDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface ConsultantListing {
  id: string;
  listingId: string;
  userId: string;
  displayName: string;
  avatar: string;
  bio: string;
  headline: string;
  specializations: ConsultantSpecialization[];
  experience: number;
  experienceUnit: string;
  hourlyRate: number;
  currency: MarketplaceCurrency;
  availability: ConsultantAvailability[];
  projectsCompleted: number;
  averageRating: number;
  reviewCount: number;
  responseTime: string;
  verification: VerificationStatus;
  portfolio: ConsultantPortfolioItem[];
  testimonials: ConsultantTestimonial[];
  languages: string[];
  travelWillingness: boolean;
  remoteAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ConsultantAvailability {
  day: string;
  startTime: string;
  endTime: string;
  timezone: string;
}

export interface ConsultantPortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
  category: string;
}

export interface ConsultantTestimonial {
  id: string;
  author: string;
  institution: string;
  content: string;
  rating: number;
  date: string;
}

export interface Publisher {
  id: string;
  listingId: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  type: PublisherType;
  country: string;
  founded: number;
  website: string;
  contactEmail: string;
  totalProducts: number;
  totalSales: number;
  averageRating: number;
  verification: VerificationStatus;
  specializations: string[];
  languages: string[];
  distributionChannels: string[];
  certifications: PublisherCertification[];
  createdAt: string;
  updatedAt: string;
}

export interface PublisherCertification {
  name: string;
  issuingBody: string;
  issuedDate: string;
  expiryDate?: string;
}

export interface ContentProduct {
  id: string;
  listingId: string;
  title: string;
  description: string;
  publisherId: string;
  format: ContentDeliveryFormat;
  license: ContentLicense;
  language: string;
  pages?: number;
  fileSize: number;
  fileSizeUnit: string;
  fileFormat: string;
  isbn?: string;
  edition: string;
  publicationDate: string;
  previewUrl?: string;
  sampleUrl?: string;
  downloadUrl?: string;
  version: string;
  isUpdated: boolean;
  lastUpdated: string;
  totalDownloads: number;
  averageRating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AIModelListing {
  id: string;
  listingId: string;
  name: string;
  description: string;
  provider: string;
  type: AIModelType;
  license: AIModelLicense;
  deploymentType: AIModelDeploymentType;
  version: string;
  accuracy?: number;
  trainingData: string;
  inputFormats: string[];
  outputFormats: string[];
  supportedLanguages: string[];
  apiEndpoint?: string;
  documentationUrl: string;
  pricing: AIModelPricing;
  usageLimits: UsageLimit[];
  demoAvailable: boolean;
  demoUrl?: string;
  totalUsers: number;
  averageRating: number;
  createdAt: string;
  updatedAt: string;
}

export interface AIModelPricing {
  model: string;
  basePrice: number;
  perRequest?: number;
  perToken?: number;
  perMinute?: number;
  currency: MarketplaceCurrency;
  freeTier?: number;
}

export interface UsageLimit {
  tier: SubscriptionTier;
  requestsPerDay: number;
  tokensPerMonth?: number;
  concurrentRequests: number;
}

export interface PluginListing {
  id: string;
  listingId: string;
  name: string;
  slug: string;
  description: string;
  developer: string;
  version: string;
  category: PluginCategory;
  compatibility: PluginCompatibility[];
  pricingModel: PluginPricingModel;
  price: number;
  currency: MarketplaceCurrency;
  installUrl: string;
  documentationUrl: string;
  sourceCodeUrl?: string;
  screenshots: string[];
  features: string[];
  requirements: string[];
  isVerified: boolean;
  totalInstalls: number;
  activeInstalls: number;
  averageRating: number;
  reviewCount: number;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
}

export interface CertificationListing {
  id: string;
  listingId: string;
  name: string;
  description: string;
  issuer: string;
  type: CertificationType;
  validity: CertificationValidity;
  level: string;
  language: string;
  prerequisites: string[];
  examFormat: string;
  passingScore: number;
  totalQuestions: number;
  timeLimit: number;
  retakePolicy: string;
  preparationMaterials: string[];
  practiceExams: string[];
  accreditation: string[];
  recognitionLevel: string;
  totalIssued: number;
  averageRating: number;
  price: number;
  currency: MarketplaceCurrency;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceListing {
  id: string;
  listingId: string;
  name: string;
  description: string;
  provider: string;
  category: ServiceCategory;
  scope: ServiceScope;
  deliveryTime: ServiceDeliveryTime;
  deliverables: string[];
  includes: string[];
  excludes: string[];
  requirements: string[];
  pricing: ServicePricing[];
  portfolio: ServicePortfolioItem[];
  guarantees: string[];
  supportIncluded: boolean;
  supportDuration?: number;
  supportDurationUnit?: string;
  totalOrders: number;
  averageRating: number;
  responseTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServicePricing {
  tier: string;
  price: number;
  currency: MarketplaceCurrency;
  description: string;
  features: string[];
  deliveryTime: ServiceDeliveryTime;
}

export interface ServicePortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
}

export interface MarketplaceOrder {
  id: string;
  schoolId: string;
  buyerId: string;
  sellerId: string;
  listingId: string;
  marketplaceType: MarketplaceType;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  commission: number;
  total: number;
  currency: MarketplaceCurrency;
  paymentMethod: string;
  paymentId?: string;
  deliveryMethod: DeliveryMethod;
  deliveredAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  listingId: string;
  title: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  options: Record<string, string>;
}

export interface MarketplacePayment {
  id: string;
  orderId: string;
  schoolId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  currency: MarketplaceCurrency;
  commission: number;
  netAmount: number;
  status: PaymentStatus;
  paymentMethod: string;
  paymentProvider: string;
  transactionId?: string;
  refundAmount?: number;
  refundReason?: RefundReason;
  paidAt?: string;
  refundedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MarketplaceReview {
  id: string;
  listingId: string;
  orderId: string;
  reviewerId: string;
  rating: number;
  title: string;
  content: string;
  pros: string[];
  cons: string[];
  isVerified: boolean;
  helpful: number;
  reportCount: number;
  status: ReviewStatus;
  response?: ReviewResponse;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewResponse {
  authorId: string;
  content: string;
  createdAt: string;
}

export interface MarketplaceConfig {
  id: string;
  schoolId: string;
  enabledMarketplaces: MarketplaceType[];
  commissionRates: CommissionConfig[];
  payoutSchedule: string;
  payoutMethod: SellerPayoutMethod;
  minimumPayout: number;
  currency: MarketplaceCurrency;
  supportedPaymentMethods: string[];
  reviewRequired: boolean;
  autoApprove: boolean;
  listingExpiryDays: number;
  maxImages: number;
  maxFileSize: number;
  allowedFileFormats: string[];
  languageSupport: MarketplaceLanguageSupport[];
  searchFilters: MarketplaceSearchFilter[];
  featuredListingsEnabled: boolean;
  promotionsEnabled: boolean;
  disputeResolutionEnabled: boolean;
  analyticsEnabled: boolean;
  notifications: MarketplaceNotificationConfig;
  createdAt: string;
  updatedAt: string;
}

export interface CommissionConfig {
  marketplaceType: MarketplaceType;
  type: CommissionType;
  rate: number;
  fixedAmount?: number;
  tiers?: CommissionTier[];
}

export interface CommissionTier {
  minAmount: number;
  maxAmount: number;
  rate: number;
}

export interface MarketplaceNotificationConfig {
  orderNotifications: boolean;
  paymentNotifications: boolean;
  reviewNotifications: boolean;
  messageNotifications: boolean;
  listingNotifications: boolean;
  emailEnabled: boolean;
  pushEnabled: boolean;
  smsEnabled: boolean;
}

export interface MarketplaceMetrics {
  id: string;
  schoolId: string;
  period: string;
  totalListings: number;
  activeListings: number;
  newListings: number;
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  commissionEarned: number;
  averageOrderValue: number;
  totalUsers: number;
  newUsers: number;
  activeUsers: number;
  averageRating: number;
  totalReviews: number;
  disputes: number;
  resolvedDisputes: number;
  topListings: ListingMetric[];
  topSellers: SellerMetric[];
  revenueByType: RevenueByType[];
  computedAt: string;
}

export interface ListingMetric {
  listingId: string;
  title: string;
  views: number;
  sales: number;
  revenue: number;
}

export interface SellerMetric {
  sellerId: string;
  displayName: string;
  sales: number;
  revenue: number;
  rating: number;
}

export interface RevenueByType {
  marketplaceType: MarketplaceType;
  revenue: number;
  orders: number;
  percentage: number;
}

export interface MarketplaceDispute {
  id: string;
  orderId: string;
  schoolId: string;
  complainantId: string;
  respondentId: string;
  type: MarketplaceDisputeType;
  status: DisputeStatus;
  title: string;
  description: string;
  evidence: DisputeEvidence[];
  resolution?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  refundAmount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface DisputeEvidence {
  id: string;
  type: string;
  fileUrl: string;
  description: string;
  submittedBy: string;
  submittedAt: string;
}

export interface MarketplaceSeller {
  id: string;
  userId: string;
  schoolId: string;
  displayName: string;
  avatar: string;
  bio: string;
  tier: SellerTier;
  verification: VerificationStatus;
  verificationTypes: SellerVerificationType[];
  totalSales: number;
  totalRevenue: number;
  averageRating: number;
  reviewCount: number;
  responseTime: string;
  fulfillmentRate: number;
  cancellationRate: number;
  refundRate: number;
  performance: SellerPerformance;
  payoutBalance: number;
  payoutMethod: SellerPayoutMethod;
  payoutHistory: PayoutRecord[];
  joinedAt: string;
  lastActiveAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface SellerPerformance {
  status: SellerPerformanceStatus;
  score: number;
  metrics: SellerPerformanceMetrics;
  lastEvaluated: string;
}

export interface SellerPerformanceMetrics {
  onTimeDelivery: number;
  responseTime: number;
  customerSatisfaction: number;
  disputeRate: number;
  repeatCustomerRate: number;
}

export interface PayoutRecord {
  id: string;
  sellerId: string;
  amount: number;
  currency: MarketplaceCurrency;
  status: PayoutStatus;
  method: SellerPayoutMethod;
  transactionId?: string;
  processedAt?: string;
  createdAt: string;
}

export interface MarketplaceSubscription {
  id: string;
  schoolId: string;
  userId: string;
  tier: SubscriptionTier;
  marketplaceType: MarketplaceType;
  startDate: string;
  endDate: string;
  isActive: boolean;
  autoRenew: boolean;
  features: string[];
  usageLimits: UsageLimit[];
  currentUsage: SubscriptionUsage;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionUsage {
  apiCalls: number;
  storageUsed: number;
  activeListings: number;
  ordersThisMonth: number;
}

export interface MarketplaceFavorite {
  id: string;
  userId: string;
  listingId: string;
  createdAt: string;
}

export interface MarketplaceMessage {
  id: string;
  senderId: string;
  receiverId: string;
  listingId?: string;
  orderId?: string;
  subject: string;
  content: string;
  isRead: boolean;
  attachments: MessageAttachment[];
  createdAt: string;
  readAt?: string;
}

export interface MessageAttachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
}

export interface MarketplaceAnalytics {
  id: string;
  schoolId: string;
  listingId: string;
  period: string;
  views: number;
  uniqueViews: number;
  clicks: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
  favorites: number;
  shares: number;
  topReferrers: ReferrerStat[];
  geographicDistribution: GeographicStat[];
  deviceBreakdown: DeviceStat[];
  computedAt: string;
}

export interface ReferrerStat {
  source: string;
  visits: number;
  conversions: number;
}

export interface GeographicStat {
  country: string;
  visits: number;
  revenue: number;
}

export interface DeviceStat {
  device: string;
  visits: number;
  percentage: number;
}

export interface MarketplaceSearch {
  id: string;
  query: string;
  filters: MarketplaceSearchFilters;
  results: string[];
  resultCount: number;
  userId?: string;
  timestamp: string;
}

export interface MarketplaceSearchFilters {
  marketplaceType?: MarketplaceType;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  language?: string;
  level?: CourseLevel;
  sortBy?: MarketplaceSearchFilter;
}

export interface MarketplaceWishlist {
  id: string;
  userId: string;
  name: string;
  items: MarketplaceWishlistItem[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MarketplaceWishlistItem {
  listingId: string;
  addedAt: string;
  notes?: string;
}

export interface MarketplaceNotification {
  id: string;
  userId: string;
  type: MarketplaceNotificationType;
  title: string;
  message: string;
  data: Record<string, unknown>;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
}

export interface MarketplaceBanner {
  id: string;
  schoolId: string;
  title: string;
  imageUrl: string;
  linkUrl: string;
  marketplaceType?: MarketplaceType;
  startDate: string;
  endDate: string;
  isActive: boolean;
  impressions: number;
  clicks: number;
  createdAt: string;
  updatedAt: string;
}

export interface MarketplaceCoupon {
  id: string;
  schoolId: string;
  code: string;
  type: MarketplacePromotionType;
  value: number;
  minimumOrder?: number;
  maximumDiscount?: number;
  usageLimit?: number;
  usageCount: number;
  applicableMarketplaceTypes: MarketplaceType[];
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SellerPayoutSchedule {
  id: string;
  sellerId: string;
  frequency: string;
  nextPayoutDate: string;
  minimumAmount: number;
  currency: MarketplaceCurrency;
  method: SellerPayoutMethod;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MarketplaceReport {
  id: string;
  schoolId: string;
  reportType: MarketplaceReportType;
  period: string;
  generatedAt: string;
  generatedBy: string;
  fileUrl: string;
  summary: MarketplaceReportSummary;
  details: Record<string, unknown>;
}

export interface MarketplaceReportSummary {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  averageOrderValue: number;
  growthRate: number;
}
