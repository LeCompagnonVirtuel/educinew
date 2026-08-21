export enum PortalType {
  CITIZEN = 'citizen',
  PARENT = 'parent',
  STUDENT = 'student',
  TEACHER = 'teacher',
  STAFF = 'staff',
  EMPLOYER = 'employer',
  UNIVERSITY = 'university',
  NGO = 'ngo',
  PARTNER = 'partner',
  MINISTRY = 'ministry',
  REGIONAL = 'regional',
  DEPARTMENTAL = 'departmental',
  INSPECTION = 'inspection',
  SUPER_ADMIN = 'super_admin',
  CUSTOM = 'custom'
}

export enum PortalStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  MAINTENANCE = 'maintenance',
  SUSPENDED = 'suspended',
  BETA = 'beta',
  DEPRECATED = 'deprecated',
  ARCHIVED = 'archived',
  DRAFT = 'draft',
  PUBLISHED = 'published'
}

export enum ServiceType {
  INFORMATION = 'information',
  TRANSACTION = 'transaction',
  APPLICATION = 'application',
  ENQUIRY = 'enquiry',
  COMPLAINT = 'complaint',
  FEEDBACK = 'feedback',
  REGISTRATION = 'registration',
  PAYMENT = 'payment',
  DOCUMENT = 'document',
  CERTIFICATE = 'certificate',
  REPORT = 'report',
  NOTIFICATION = 'notification',
  SUPPORT = 'support',
  COMMUNITY = 'community',
  RESOURCE = 'resource',
  ANALYTICS = 'analytics',
  CUSTOM = 'custom'
}

export enum AccessLevel {
  PUBLIC = 'public',
  GUEST = 'guest',
  AUTHENTICATED = 'authenticated',
  BASIC = 'basic',
  STANDARD = 'standard',
  PREMIUM = 'premium',
  RESTRICTED = 'restricted',
  CONFIDENTIAL = 'confidential',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin'
}

export enum NotificationType {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
  IN_APP = 'in_app',
  WEBHOOK = 'webhook',
  BROADCAST = 'broadcast',
  DIGEST = 'digest',
  ALERT = 'alert',
  REMINDER = 'reminder',
  CONFIRMATION = 'confirmation',
  UPDATE = 'update',
  CUSTOM = 'custom'
}

export enum Language {
  FRENCH = 'fr',
  ENGLISH = 'en',
  ARABIC = 'ar',
  HAUSA = 'ha',
  YORUBA = 'yo',
  SWAHILI = 'sw',
  WOLOF = 'wo',
  BAMBARA = 'bm',
  FON = 'fon',
  MOORE = 'mos',
  DAGBANI = 'dag',
  CUSTOM = 'custom'
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto',
  HIGH_CONTRAST = 'high_contrast',
  LARGE_TEXT = 'large_text',
  REDUCED_MOTION = 'reduced_motion',
  CUSTOM = 'custom'
}

export enum PortalUserRole {
  CITIZEN = 'citizen',
  PARENT = 'parent',
  STUDENT = 'student',
  TEACHER = 'teacher',
  STAFF = 'staff',
  EMPLOYER = 'employer',
  UNIVERSITY_REP = 'university_rep',
  NGO_REP = 'ngo_rep',
  PARTNER_REP = 'partner_rep',
  MINISTRY_OFFICIAL = 'ministry_official',
  REGIONAL_OFFICIAL = 'regional_official',
  DEPARTMENTAL_OFFICIAL = 'departmental_official',
  INSPECTOR = 'inspector',
  GUEST = 'guest',
  CUSTOM = 'custom'
}

export enum FeedbackType {
  SUGGESTION = 'suggestion',
  COMPLAINT = 'complaint',
  COMPLIMENT = 'compliment',
  QUESTION = 'question',
  BUG_REPORT = 'bug_report',
  FEATURE_REQUEST = 'feature_request',
  GENERAL = 'general'
}

export enum FeedbackStatus {
  SUBMITTED = 'submitted',
  ACKNOWLEDGED = 'acknowledged',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
  REJECTED = 'rejected',
  REOPENED = 'reopened'
}

export enum FeedbackPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
  CRITICAL = 'critical'
}

export enum ServiceStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
  LIMITED = 'limited',
  MAINTENANCE = 'maintenance',
  DEPRECATED = 'deprecated',
  COMING_SOON = 'coming_soon'
}

export enum ApplicationStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  RESUBMIT = 'resubmit',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  EXPIRED = 'expired'
}

export enum DocumentRequirement {
  OPTIONAL = 'optional',
  REQUIRED = 'required',
  CONDITIONAL = 'conditional'
}

export enum PortalLayout {
  STANDARD = 'standard',
  COMPACT = 'compact',
  EXPANDED = 'expanded',
  MINIMAL = 'minimal',
  CUSTOM = 'custom'
}

export enum NavigationStyle {
  SIDEBAR = 'sidebar',
  TOP_BAR = 'top_bar',
  TABS = 'tabs',
  HAMBURGER = 'hamburger',
  BREADCRUMB = 'breadcrumb',
  COMBINED = 'combined'
}

export enum ContentType {
  PAGE = 'page',
  ARTICLE = 'article',
  FAQ = 'faq',
  GUIDE = 'guide',
  VIDEO = 'video',
  DOCUMENT = 'document',
  LINK = 'link',
  FORM = 'form',
  EMBED = 'embed',
  CUSTOM = 'custom'
}

export enum AuditAction {
  VIEW = 'view',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LOGIN = 'login',
  LOGOUT = 'logout',
  EXPORT = 'export',
  IMPORT = 'import',
  SHARE = 'share',
  DOWNLOAD = 'download',
  SEARCH = 'search',
  CUSTOM = 'custom'
}

export interface Portal {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: PortalType;
  status: PortalStatus;
  accessLevel: AccessLevel;
  branding: PortalBranding;
  layout: PortalLayout;
  navigation: NavigationStyle;
  theme: Theme;
  languages: Language[];
  defaultLanguage: Language;
  services: PortalService[];
  notifications: PortalNotification[];
  settings: PortalSettings;
  analytics: PortalAnalytics;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface PortalBranding {
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  headerHtml: string | null;
  footerHtml: string | null;
  customCss: string | null;
  customJs: string | null;
}

export interface PortalUser {
  id: string;
  userId: string;
  portalId: string;
  role: PortalUserRole;
  name: string;
  email: string;
  phone: string | null;
  avatarUrl: string | null;
  organisation: string | null;
  department: string | null;
  position: string | null;
  permissions: string[];
  accessLevel: AccessLevel;
  preferences: PortalUserPreferences;
  lastLogin: string;
  loginCount: number;
  isActive: boolean;
  isVerified: boolean;
  verificationMethod: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface PortalUserPreferences {
  language: Language;
  theme: Theme;
  notifications: PortalNotificationPreferences;
  dashboardWidgets: string[];
  defaultPage: string;
  pageSize: number;
  dateFormat: string;
  timeFormat: string;
  timezone: string;
}

export interface PortalNotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  inApp: boolean;
  digest: boolean;
  digestFrequency: string;
  types: NotificationType[];
}

export interface PortalService {
  id: string;
  portalId: string;
  name: string;
  slug: string;
  description: string;
  type: ServiceType;
  status: ServiceStatus;
  accessLevel: AccessLevel;
  category: string;
  icon: string;
  color: string;
  url: string;
  externalUrl: string | null;
  requiresAuth: boolean;
  requiresPayment: boolean;
  paymentAmount: number | null;
  currency: string | null;
  formId: string | null;
  apiEndpoint: string | null;
  estimatedTime: string | null;
  popularity: number;
  rating: number;
  usageCount: number;
  tags: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface PortalNotification {
  id: string;
  portalId: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  body: string;
  severity: string;
  actionUrl: string | null;
  actionLabel: string | null;
  metadata: Record<string, unknown>;
  isRead: boolean;
  readAt: string | null;
  expiresAt: string | null;
  createdAt: string;
}

export interface PortalSettings {
  id: string;
  portalId: string;
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  requirePhoneVerification: boolean;
  allowSocialLogin: boolean;
  socialProviders: string[];
  allowGuestAccess: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  lockoutDuration: number;
  passwordPolicy: PortalPasswordPolicy;
  rateLimiting: PortalRateLimiting;
  caching: PortalCaching;
  seo: PortalSEO;
  security: PortalSecurity;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface PortalPasswordPolicy {
  minLength: number;
  maxLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  maxAge: number;
  historyCount: number;
}

export interface PortalRateLimiting {
  enabled: boolean;
  windowMs: number;
  maxRequests: number;
  message: string;
}

export interface PortalCaching {
  enabled: boolean;
  ttl: number;
  strategy: string;
}

export interface PortalSEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string | null;
  canonicalUrl: string | null;
  robotsMeta: string;
  structuredData: Record<string, unknown> | null;
}

export interface PortalSecurity {
  csrfProtection: boolean;
  xssProtection: boolean;
  contentSecurityPolicy: string;
  referrerPolicy: string;
  featurePolicy: string | null;
  strictTransportSecurity: boolean;
  ipWhitelist: string[];
  ipBlacklist: string[];
}

export interface PortalAnalytics {
  id: string;
  portalId: string;
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  totalSessions: number;
  averageSessionDuration: number;
  bounceRate: number;
  pageViews: number;
  uniquePageViews: number;
  topPages: PortalPageAnalytics[];
  topServices: PortalServiceAnalytics[];
  userDemographics: PortalDemographics;
  deviceBreakdown: PortalDeviceBreakdown;
  browserBreakdown: PortalBrowserBreakdown;
  geographicDistribution: PortalGeoDistribution[];
  trafficSources: PortalTrafficSource[];
  conversionRates: PortalConversionRate[];
  metadata: Record<string, unknown>;
  period: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface PortalPageAnalytics {
  pageId: string;
  pageName: string;
  url: string;
  views: number;
  uniqueViews: number;
  averageTimeOnPage: number;
  bounceRate: number;
  exitRate: number;
}

export interface PortalServiceAnalytics {
  serviceId: string;
  serviceName: string;
  usageCount: number;
  completionRate: number;
  averageCompletionTime: number;
  satisfaction: number;
  errorRate: number;
}

export interface PortalDemographics {
  byAge: Record<string, number>;
  byGender: Record<string, number>;
  byRole: Record<string, number>;
  byRegion: Record<string, number>;
}

export interface PortalDeviceBreakdown {
  desktop: number;
  mobile: number;
  tablet: number;
  other: number;
}

export interface PortalBrowserBreakdown {
  chrome: number;
  firefox: number;
  safari: number;
  edge: number;
  other: number;
}

export interface PortalGeoDistribution {
  region: string;
  country: string;
  city: string | null;
  users: number;
  sessions: number;
  percentage: number;
}

export interface PortalTrafficSource {
  source: string;
  medium: string;
  sessions: number;
  users: number;
  bounceRate: number;
  conversionRate: number;
}

export interface PortalConversionRate {
  action: string;
  total: number;
  converted: number;
  rate: number;
}

export interface PortalConfig {
  id: string;
  portalId: string;
  version: string;
  features: PortalFeatures;
  integrations: PortalIntegration[];
  webhooks: PortalWebhook[];
  apiKeys: PortalAPIKey[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface PortalFeatures {
  chat: boolean;
  notifications: boolean;
  analytics: boolean;
  feedback: boolean;
  community: boolean;
  search: boolean;
  multiLanguage: boolean;
  darkMode: boolean;
  offlineMode: boolean;
  pwa: boolean;
  socialLogin: boolean;
  twoFactorAuth: boolean;
  export: boolean;
  import: boolean;
  api: boolean;
  webhooks: boolean;
}

export interface PortalIntegration {
  id: string;
  name: string;
  type: string;
  endpoint: string;
  apiKey: string;
  isActive: boolean;
  lastSync: string | null;
  syncFrequency: string;
  metadata: Record<string, unknown>;
}

export interface PortalWebhook {
  id: string;
  name: string;
  url: string;
  secret: string;
  events: string[];
  isActive: boolean;
  lastTriggeredAt: string | null;
  failureCount: number;
  metadata: Record<string, unknown>;
}

export interface PortalAPIKey {
  id: string;
  name: string;
  key: string;
  secret: string;
  permissions: string[];
  rateLimit: number;
  expiresAt: string | null;
  lastUsedAt: string | null;
  isActive: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CitizenService {
  id: string;
  portalId: string;
  name: string;
  description: string;
  category: string;
  type: ServiceType;
  status: ServiceStatus;
  eligibility: ServiceEligibility;
  requiredDocuments: ServiceDocument[];
  steps: ServiceStep[];
  estimatedTime: string;
  fee: number;
  currency: string;
  contactInfo: ServiceContactInfo;
  faq: ServiceFAQ[];
  rating: number;
  usageCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceEligibility {
  minAge: number | null;
  maxAge: number | null;
  nationalities: string[] | null;
  regions: string[] | null;
  roles: string[] | null;
  customRules: Record<string, unknown>[];
}

export interface ServiceDocument {
  id: string;
  name: string;
  description: string;
  type: string;
  requirement: DocumentRequirement;
  format: string[];
  maxSize: number;
  exampleUrl: string | null;
}

export interface ServiceStep {
  order: number;
  title: string;
  description: string;
  type: string;
  formId: string | null;
  required: boolean;
  estimatedTime: string;
}

export interface ServiceContactInfo {
  phone: string | null;
  email: string | null;
  address: string | null;
  workingHours: string | null;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
  order: number;
}

export interface ParentService {
  id: string;
  portalId: string;
  name: string;
  description: string;
  category: string;
  type: ServiceType;
  status: ServiceStatus;
  childAccess: boolean;
  requiredRelationship: string[];
  features: ParentServiceFeature[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ParentServiceFeature {
  name: string;
  description: string;
  isEnabled: boolean;
}

export interface StudentService {
  id: string;
  portalId: string;
  name: string;
  description: string;
  category: string;
  type: ServiceType;
  status: ServiceStatus;
  academicYear: string | null;
  level: string | null;
  features: StudentServiceFeature[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface StudentServiceFeature {
  name: string;
  description: string;
  isEnabled: boolean;
}

export interface TeacherService {
  id: string;
  portalId: string;
  name: string;
  description: string;
  category: string;
  type: ServiceType;
  status: ServiceStatus;
  departmentRequired: boolean;
  qualificationRequired: string | null;
  features: TeacherServiceFeature[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface TeacherServiceFeature {
  name: string;
  description: string;
  isEnabled: boolean;
}

export interface EmployerService {
  id: string;
  portalId: string;
  name: string;
  description: string;
  category: string;
  type: ServiceType;
  status: ServiceStatus;
  industryRequired: string[];
  companySize: string | null;
  features: EmployerServiceFeature[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface EmployerServiceFeature {
  name: string;
  description: string;
  isEnabled: boolean;
}

export interface UniversityService {
  id: string;
  portalId: string;
  name: string;
  description: string;
  category: string;
  type: ServiceType;
  status: ServiceStatus;
  accreditationRequired: boolean;
  programmeLevel: string[];
  features: UniversityServiceFeature[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface UniversityServiceFeature {
  name: string;
  description: string;
  isEnabled: boolean;
}

export interface NGOService {
  id: string;
  portalId: string;
  name: string;
  description: string;
  category: string;
  type: ServiceType;
  status: ServiceStatus;
  ngoType: string[];
  targetBeneficiaries: string[];
  features: NGOServiceFeature[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface NGOServiceFeature {
  name: string;
  description: string;
  isEnabled: boolean;
}

export interface PartnerService {
  id: string;
  portalId: string;
  name: string;
  description: string;
  category: string;
  type: ServiceType;
  status: ServiceStatus;
  partnerType: string[];
  integrationRequired: boolean;
  features: PartnerServiceFeature[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface PartnerServiceFeature {
  name: string;
  description: string;
  isEnabled: boolean;
}

export interface PortalFeedback {
  id: string;
  portalId: string;
  userId: string;
  serviceId: string | null;
  type: FeedbackType;
  priority: FeedbackPriority;
  status: FeedbackStatus;
  subject: string;
  message: string;
  rating: number | null;
  response: string | null;
  respondedBy: string | null;
  respondedAt: string | null;
  attachments: PortalAttachment[];
  tags: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface PortalAttachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
}

export interface PortalApplication {
  id: string;
  portalId: string;
  userId: string;
  serviceId: string;
  applicationNumber: string;
  status: ApplicationStatus;
  formData: Record<string, unknown>;
  documents: PortalAttachment[];
  submittedAt: string;
  reviewedAt: string | null;
  reviewedBy: string | null;
  decision: string | null;
  decisionReason: string | null;
  expiryDate: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface PortalPage {
  id: string;
  portalId: string;
  title: string;
  slug: string;
  content: string;
  type: ContentType;
  isPublished: boolean;
  isPublic: boolean;
  order: number;
  parentId: string | null;
 seo: PortalSEO;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface PortalMenuItem {
  id: string;
  portalId: string;
  label: string;
  url: string | null;
  pageId: string | null;
  serviceId: string | null;
  icon: string | null;
  order: number;
  parentId: string | null;
  isExternal: boolean;
  isVisible: boolean;
  requiredRole: PortalUserRole | null;
  children: PortalMenuItem[];
  metadata: Record<string, unknown>;
}

export interface PortalBanner {
  id: string;
  portalId: string;
  title: string;
  message: string;
  imageUrl: string | null;
  actionUrl: string | null;
  actionLabel: string | null;
  backgroundColor: string;
  textColor: string;
  priority: number;
  isActive: boolean;
  startDate: string | null;
  endDate: string | null;
  targetRoles: PortalUserRole[] | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface PortalWidget {
  id: string;
  portalId: string;
  name: string;
  type: string;
  configuration: Record<string, unknown>;
  position: string;
  order: number;
  isVisible: boolean;
  requiredRole: PortalUserRole | null;
  refreshInterval: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface PortalTheme {
  id: string;
  portalId: string;
  name: string;
  variables: PortalThemeVariables;
  isDefault: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface PortalThemeVariables {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  accent: string;
  background: string;
  surface: string;
  error: string;
  warning: string;
  success: string;
  info: string;
  textPrimary: string;
  textSecondary: string;
  textDisabled: string;
  border: string;
  divider: string;
  shadow: string;
}

export interface PortalAuditLog {
  id: string;
  portalId: string;
  userId: string;
  userName: string;
  userRole: PortalUserRole;
  action: AuditAction;
  entityType: string;
  entityId: string;
  entityName: string;
  details: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface PortalMetrics {
  totalPortals: number;
  activePortals: number;
  totalUsers: number;
  activeUsers: number;
  totalServices: number;
  activeServices: number;
  totalApplications: number;
  pendingApplications: number;
  totalFeedback: number;
  unresolvedFeedback: number;
  averageRating: number;
  totalPageViews: number;
  averageSessionDuration: number;
  bounceRate: number;
  metadata: Record<string, unknown>;
}

export interface PortalSearch {
  query: string;
  portalId: string | null;
  type: PortalType | null;
  status: PortalStatus | null;
  accessLevel: AccessLevel | null;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface PortalSearchResult {
  data: Portal[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PortalExport {
  id: string;
  portalId: string;
  format: string;
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

export interface PortalImport {
  id: string;
  portalId: string;
  fileName: string;
  totalRows: number;
  processedRows: number;
  successfulRows: number;
  failedRows: number;
  status: string;
  errors: PortalImportError[];
  mapping: Record<string, string>;
  startedAt: string;
  completedAt: string | null;
  createdBy: string;
  metadata: Record<string, unknown>;
}

export interface PortalImportError {
  row: number;
  field: string;
  message: string;
  value: unknown;
}
