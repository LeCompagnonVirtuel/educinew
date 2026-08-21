import { z } from 'zod';

const schoolStatusEnum = z.enum(['active', 'inactive', 'suspended', 'trial', 'pending', 'archived']);
const schoolTypeEnum = z.enum(['public', 'private', 'international', 'charter', 'magnet', 'vocational', 'special']);
const subscriptionStatusEnum = z.enum(['active', 'trialing', 'past_due', 'canceled', 'paused', 'expired']);
const licenseStatusEnum = z.enum(['active', 'inactive', 'revoked', 'expired', 'suspended']);
const ticketStatusEnum = z.enum(['open', 'in_progress', 'waiting', 'resolved', 'closed']);
const ticketPriorityEnum = z.enum(['low', 'medium', 'high', 'critical']);
const ticketCategoryEnum = z.enum(['bug', 'feature_request', 'support', 'billing', 'security', 'performance', 'other']);
const featureFlagTypeEnum = z.enum(['boolean', 'percentage', 'variant', 'killswitch']);
const notificationTypeEnum = z.enum(['info', 'warning', 'error', 'success', 'system', 'maintenance']);
const settingTypeEnum = z.enum(['string', 'number', 'boolean', 'json', 'encrypted']);
const maintenanceStatusEnum = z.enum(['scheduled', 'in_progress', 'completed', 'cancelled']);
const releaseNoteTypeEnum = z.enum(['major', 'minor', 'patch', 'hotfix']);
const couponTypeEnum = z.enum(['percentage', 'fixed_amount', 'free_trial', 'discount']);
const auditLogActionEnum = z.enum(['create', 'read', 'update', 'delete', 'login', 'logout', 'export', 'import', 'approve', 'reject']);
const licenseTypeEnum = z.enum(['single', 'site', 'enterprise', 'trial', 'academic']);
const paymentStatusEnum = z.enum(['pending', 'completed', 'failed', 'refunded', 'partial']);
const billingCycleEnum = z.enum(['monthly', 'quarterly', 'semi_annual', 'annual']);
const storageTierEnum = z.enum(['basic', 'standard', 'premium', 'enterprise']);
const regionEnum = z.enum(['us_east', 'us_west', 'eu_west', 'eu_central', 'ap_southeast', 'ap_northeast']);

export const createEnterpriseSchoolSchema = z.object({
  name: z.string().min(1).max(200),
  code: z.string().min(1).max(50),
  type: schoolTypeEnum,
  domain: z.string().max(200).optional(),
  logoUrl: z.string().url().optional(),
  address: z.object({
    street: z.string().max(200).optional(),
    city: z.string().max(100).optional(),
    state: z.string().max(100).optional(),
    country: z.string().max(100).optional(),
    postalCode: z.string().max(20).optional(),
  }).optional(),
  contactEmail: z.string().email(),
  contactPhone: z.string().max(20).optional(),
  website: z.string().url().optional(),
  timezone: z.string().max(50).optional(),
  locale: z.string().max(10).optional(),
  currency: z.string().max(3).optional(),
  subscriptionPlanId: z.string().uuid().optional(),
  maxUsers: z.number().int().min(1).optional(),
  maxStorageGb: z.number().int().min(0).optional(),
  features: z.array(z.string()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateEnterpriseSchoolSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  code: z.string().min(1).max(50).optional(),
  type: schoolTypeEnum.optional(),
  domain: z.string().max(200).optional(),
  logoUrl: z.string().url().optional(),
  address: z.object({
    street: z.string().max(200).optional(),
    city: z.string().max(100).optional(),
    state: z.string().max(100).optional(),
    country: z.string().max(100).optional(),
    postalCode: z.string().max(20).optional(),
  }).optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
  website: z.string().url().optional(),
  timezone: z.string().max(50).optional(),
  locale: z.string().max(10).optional(),
  currency: z.string().max(3).optional(),
  status: schoolStatusEnum.optional(),
  maxUsers: z.number().int().min(1).optional(),
  maxStorageGb: z.number().int().min(0).optional(),
  features: z.array(z.string()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createSubscriptionSchema = z.object({
  schoolId: z.string().uuid(),
  planId: z.string().uuid(),
  billingCycle: billingCycleEnum,
  trialDays: z.number().int().min(0).max(365).optional(),
  couponCode: z.string().max(50).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateSubscriptionSchema = z.object({
  planId: z.string().uuid().optional(),
  billingCycle: billingCycleEnum.optional(),
  status: subscriptionStatusEnum.optional(),
  cancelAtPeriodEnd: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const changePlanSchema = z.object({
  schoolId: z.string().uuid(),
  newPlanId: z.string().uuid(),
  effectiveDate: z.enum(['immediate', 'next_billing_cycle']).optional(),
  prorate: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createLicenseSchema = z.object({
  schoolId: z.string().uuid(),
  type: licenseTypeEnum,
  maxSeats: z.number().int().min(1),
  expiresAt: z.string().datetime().optional(),
  features: z.array(z.string()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const activateLicenseSchema = z.object({
  licenseId: z.string().uuid(),
  activationKey: z.string().min(1).max(200),
  metadata: z.record(z.unknown()).optional(),
});

export const revokeLicenseSchema = z.object({
  licenseId: z.string().uuid(),
  reason: z.string().max(1000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createEnterpriseUserSchema = z.object({
  schoolId: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  role: z.enum(['super_admin', 'admin', 'manager', 'teacher', 'staff', 'viewer']),
  department: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  avatarUrl: z.string().url().optional(),
  permissions: z.array(z.string()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateEnterpriseUserSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  role: z.enum(['super_admin', 'admin', 'manager', 'teacher', 'staff', 'viewer']).optional(),
  department: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  avatarUrl: z.string().url().optional(),
  status: z.enum(['active', 'inactive', 'suspended', 'pending']).optional(),
  permissions: z.array(z.string()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createTicketSchema = z.object({
  schoolId: z.string().uuid(),
  subject: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  category: ticketCategoryEnum,
  priority: ticketPriorityEnum,
  assigneeId: z.string().uuid().optional(),
  attachments: z.array(z.object({
    name: z.string().min(1).max(200),
    fileUrl: z.string().url(),
    fileSize: z.number().int().min(0).optional(),
    mimeType: z.string().max(100).optional(),
  })).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateTicketSchema = z.object({
  subject: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(5000).optional(),
  category: ticketCategoryEnum.optional(),
  priority: ticketPriorityEnum.optional(),
  status: ticketStatusEnum.optional(),
  assigneeId: z.string().uuid().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const assignTicketSchema = z.object({
  ticketId: z.string().uuid(),
  assigneeId: z.string().uuid(),
  note: z.string().max(1000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const addTicketMessageSchema = z.object({
  ticketId: z.string().uuid(),
  content: z.string().min(1).max(5000),
  isInternal: z.boolean().optional(),
  attachments: z.array(z.object({
    name: z.string().min(1).max(200),
    fileUrl: z.string().url(),
    fileSize: z.number().int().min(0).optional(),
    mimeType: z.string().max(100).optional(),
  })).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createFeatureFlagSchema = z.object({
  schoolId: z.string().uuid().optional(),
  name: z.string().min(1).max(100),
  key: z.string().min(1).max(100).regex(/^[a-z0-9_]+$/),
  description: z.string().max(500).optional(),
  type: featureFlagTypeEnum,
  enabled: z.boolean().optional(),
  value: z.union([z.boolean(), z.number(), z.string()]).optional(),
  variants: z.array(z.object({
    name: z.string().min(1).max(50),
    weight: z.number().int().min(0).max(100),
    payload: z.record(z.unknown()).optional(),
  })).optional(),
  rolloutPercentage: z.number().min(0).max(100).optional(),
  targetGroups: z.array(z.object({
    type: z.enum(['school', 'role', 'user', 'segment']),
    values: z.array(z.string()),
  })).optional(),
  expiresAt: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateFeatureFlagSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  enabled: z.boolean().optional(),
  value: z.union([z.boolean(), z.number(), z.string()]).optional(),
  variants: z.array(z.object({
    name: z.string().min(1).max(50),
    weight: z.number().int().min(0).max(100),
    payload: z.record(z.unknown()).optional(),
  })).optional(),
  rolloutPercentage: z.number().min(0).max(100).optional(),
  targetGroups: z.array(z.object({
    type: z.enum(['school', 'role', 'user', 'segment']),
    values: z.array(z.string()),
  })).optional(),
  expiresAt: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createSystemNotificationSchema = z.object({
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(2000),
  type: notificationTypeEnum,
  targetAudience: z.enum(['all', 'admins', 'specific_schools', 'specific_users']),
  targetSchoolIds: z.array(z.string().uuid()).optional(),
  targetUserIds: z.array(z.string().uuid()).optional(),
  actionUrl: z.string().url().optional(),
  actionLabel: z.string().max(50).optional(),
  expiresAt: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateSystemSettingSchema = z.object({
  key: z.string().min(1).max(100),
  value: z.union([z.string(), z.number(), z.boolean(), z.record(z.unknown())]),
  type: settingTypeEnum.optional(),
  description: z.string().max(500).optional(),
  isPublic: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createMaintenanceWindowSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000),
  scheduledStart: z.string().datetime(),
  scheduledEnd: z.string().datetime(),
  affectedServices: z.array(z.string()).min(1),
  region: regionEnum.optional(),
  notifyUsers: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createReleaseNoteSchema = z.object({
  version: z.string().min(1).max(50),
  title: z.string().min(1).max(200),
  description: z.string().max(5000),
  type: releaseNoteTypeEnum,
  features: z.array(z.object({
    title: z.string().min(1).max(200),
    description: z.string().max(1000),
    category: z.enum(['feature', 'improvement', 'fix', 'security', 'breaking', 'deprecated']),
  })).optional(),
  breakingChanges: z.array(z.string()).optional(),
  publishedAt: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const searchEnterpriseSchoolsSchema = z.object({
  query: z.string().max(200).optional(),
  status: schoolStatusEnum.optional(),
  type: schoolTypeEnum.optional(),
  region: regionEnum.optional(),
  planId: z.string().uuid().optional(),
  hasActiveLicense: z.boolean().optional(),
  createdFrom: z.string().datetime().optional(),
  createdTo: z.string().datetime().optional(),
  minUsers: z.number().int().min(0).optional(),
  maxUsers: z.number().int().min(0).optional(),
  sortBy: z.enum(['name', 'code', 'created_at', 'updated_at', 'status', 'user_count']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const searchEnterpriseUsersSchema = z.object({
  schoolId: z.string().uuid().optional(),
  query: z.string().max(200).optional(),
  role: z.enum(['super_admin', 'admin', 'manager', 'teacher', 'staff', 'viewer']).optional(),
  status: z.enum(['active', 'inactive', 'suspended', 'pending']).optional(),
  department: z.string().max(100).optional(),
  lastLoginFrom: z.string().datetime().optional(),
  lastLoginTo: z.string().datetime().optional(),
  sortBy: z.enum(['firstName', 'lastName', 'email', 'role', 'last_login', 'created_at']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const searchTicketsSchema = z.object({
  schoolId: z.string().uuid().optional(),
  query: z.string().max(200).optional(),
  status: ticketStatusEnum.optional(),
  priority: ticketPriorityEnum.optional(),
  category: ticketCategoryEnum.optional(),
  assigneeId: z.string().uuid().optional(),
  createdFrom: z.string().datetime().optional(),
  createdTo: z.string().datetime().optional(),
  sortBy: z.enum(['subject', 'priority', 'status', 'created_at', 'updated_at']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const searchAuditLogsSchema = z.object({
  schoolId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  action: auditLogActionEnum.optional(),
  entityType: z.string().max(100).optional(),
  entityId: z.string().uuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  ipAddress: z.string().max(45).optional(),
  sortBy: z.enum(['created_at', 'action', 'entity_type', 'user_id']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const exportEnterpriseDataSchema = z.object({
  schoolId: z.string().uuid(),
  entities: z.array(z.enum([
    'schools', 'users', 'subscriptions', 'licenses', 'tickets',
    'audit_logs', 'notifications', 'settings', 'feature_flags',
    'release_notes', 'maintenance_windows',
  ])).min(1),
  format: z.enum(['csv', 'json', 'xlsx']).optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  includeMetadata: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const cloneSchoolSchema = z.object({
  sourceSchoolId: z.string().uuid(),
  targetName: z.string().min(1).max(200),
  targetCode: z.string().min(1).max(50),
  targetDomain: z.string().max(200).optional(),
  includeUsers: z.boolean().optional(),
  includeSettings: z.boolean().optional(),
  includeFeatureFlags: z.boolean().optional(),
  includeSubscriptions: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const migrateSchoolSchema = z.object({
  schoolId: z.string().uuid(),
  targetRegion: regionEnum,
  migrateUsers: z.boolean().optional(),
  migrateData: z.boolean().optional(),
  migrateFiles: z.boolean().optional(),
  scheduledAt: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createCouponSchema = z.object({
  code: z.string().min(1).max(50).regex(/^[A-Z0-9_-]+$/),
  type: couponTypeEnum,
  value: z.number().min(0),
  maxUses: z.number().int().min(1).optional(),
  maxUsesPerSchool: z.number().int().min(1).optional(),
  minOrderAmount: z.number().min(0).optional(),
  applicablePlanIds: z.array(z.string().uuid()).optional(),
  startDate: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
  description: z.string().max(500).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateCouponSchema = z.object({
  type: couponTypeEnum.optional(),
  value: z.number().min(0).optional(),
  maxUses: z.number().int().min(1).optional(),
  maxUsesPerSchool: z.number().int().min(1).optional(),
  minOrderAmount: z.number().min(0).optional(),
  applicablePlanIds: z.array(z.string().uuid()).optional(),
  startDate: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
  isActive: z.boolean().optional(),
  description: z.string().max(500).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createSubscriptionPlanSchema = z.object({
  name: z.string().min(1).max(200),
  code: z.string().min(1).max(50),
  description: z.string().max(1000).optional(),
  priceMonthly: z.number().min(0),
  priceYearly: z.number().min(0).optional(),
  currency: z.string().max(3).optional(),
  maxUsers: z.number().int().min(1).optional(),
  maxStorageGb: z.number().int().min(0).optional(),
  features: z.array(z.string()).optional(),
  trialDays: z.number().int().min(0).max(365).optional(),
  isCustom: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateSubscriptionPlanSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  priceMonthly: z.number().min(0).optional(),
  priceYearly: z.number().min(0).optional(),
  currency: z.string().max(3).optional(),
  maxUsers: z.number().int().min(1).optional(),
  maxStorageGb: z.number().int().min(0).optional(),
  features: z.array(z.string()).optional(),
  trialDays: z.number().int().min(0).max(365).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createEnterpriseRoleSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  permissions: z.array(z.string()).min(1),
  isSystem: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateEnterpriseRoleSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  permissions: z.array(z.string()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createEnterpriseSessionSchema = z.object({
  userId: z.string().uuid(),
  schoolId: z.string().uuid(),
  ipAddress: z.string().max(45).optional(),
  userAgent: z.string().max(500).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createBillingInvoiceSchema = z.object({
  schoolId: z.string().uuid(),
  subscriptionId: z.string().uuid(),
  amount: z.number().min(0),
  currency: z.string().max(3).optional(),
  taxAmount: z.number().min(0).optional(),
  totalAmount: z.number().min(0),
  dueDate: z.string().datetime(),
  items: z.array(z.object({
    description: z.string().min(1).max(200),
    quantity: z.number().int().min(1),
    unitPrice: z.number().min(0),
    amount: z.number().min(0),
  })),
  metadata: z.record(z.unknown()).optional(),
});

export const createPaymentSchema = z.object({
  invoiceId: z.string().uuid(),
  amount: z.number().min(0),
  currency: z.string().max(3).optional(),
  method: z.enum(['credit_card', 'bank_transfer', 'paypal', 'stripe', 'wire', 'other']),
  transactionId: z.string().max(200).optional(),
  status: paymentStatusEnum.optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createStorageQuotaSchema = z.object({
  schoolId: z.string().uuid(),
  tier: storageTierEnum,
  maxStorageGb: z.number().int().min(0),
  maxFileCount: z.number().int().min(0).optional(),
  allowedFileTypes: z.array(z.string()).optional(),
  maxFileSizeMb: z.number().int().min(1).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateStorageQuotaSchema = z.object({
  tier: storageTierEnum.optional(),
  maxStorageGb: z.number().int().min(0).optional(),
  maxFileCount: z.number().int().min(0).optional(),
  allowedFileTypes: z.array(z.string()).optional(),
  maxFileSizeMb: z.number().int().min(1).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createApiUsageSchema = z.object({
  schoolId: z.string().uuid(),
  endpoint: z.string().min(1).max(200),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
  statusCode: z.number().int().min(100).max(599),
  responseTimeMs: z.number().int().min(0),
  requestSizeBytes: z.number().int().min(0).optional(),
  responseSizeBytes: z.number().int().min(0).optional(),
  userId: z.string().uuid().optional(),
  ipAddress: z.string().max(45).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createAnalyticsEventSchema = z.object({
  schoolId: z.string().uuid(),
  event: z.string().min(1).max(100),
  category: z.string().max(100).optional(),
  label: z.string().max(200).optional(),
  value: z.number().optional(),
  userId: z.string().uuid().optional(),
  properties: z.record(z.unknown()).optional(),
});

export const createMonitoringAlertSchema = z.object({
  schoolId: z.string().uuid(),
  metric: z.string().min(1).max(100),
  condition: z.enum(['gt', 'lt', 'eq', 'gte', 'lte', 'ne']),
  threshold: z.number(),
  severity: z.enum(['info', 'warning', 'critical']),
  message: z.string().min(1).max(500),
  notifyEmails: z.array(z.string().email()).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateMonitoringAlertSchema = z.object({
  metric: z.string().min(1).max(100).optional(),
  condition: z.enum(['gt', 'lt', 'eq', 'gte', 'lte', 'ne']).optional(),
  threshold: z.number().optional(),
  severity: z.enum(['info', 'warning', 'critical']).optional(),
  message: z.string().min(1).max(500).optional(),
  notifyEmails: z.array(z.string().email()).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createHealthCheckSchema = z.object({
  service: z.string().min(1).max(100),
  status: z.enum(['healthy', 'degraded', 'down']),
  responseTimeMs: z.number().int().min(0),
  details: z.record(z.unknown()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createSchoolMetricSchema = z.object({
  schoolId: z.string().uuid(),
  metric: z.string().min(1).max(100),
  value: z.number(),
  unit: z.string().max(50).optional(),
  period: z.enum(['hourly', 'daily', 'weekly', 'monthly']),
  dimensions: z.record(z.string()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createWebhookSchema = z.object({
  schoolId: z.string().uuid(),
  url: z.string().url(),
  secret: z.string().max(200).optional(),
  events: z.array(z.string()).min(1),
  isActive: z.boolean().optional(),
  retryCount: z.number().int().min(0).max(10).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateWebhookSchema = z.object({
  url: z.string().url().optional(),
  secret: z.string().max(200).optional(),
  events: z.array(z.string()).min(1).optional(),
  isActive: z.boolean().optional(),
  retryCount: z.number().int().min(0).max(10).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createSsoConfigurationSchema = z.object({
  schoolId: z.string().uuid(),
  provider: z.enum(['saml', 'oidc', 'azure_ad', 'google_workspace', 'okta', 'auth0']),
  name: z.string().min(1).max(200),
  entityId: z.string().min(1).max(500),
  ssoUrl: z.string().url(),
  certificate: z.string().min(1),
  metadataUrl: z.string().url().optional(),
  attributes: z.record(z.string()).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateSsoConfigurationSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  entityId: z.string().min(1).max(500).optional(),
  ssoUrl: z.string().url().optional(),
  certificate: z.string().min(1).optional(),
  metadataUrl: z.string().url().optional(),
  attributes: z.record(z.string()).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createIpWhitelistSchema = z.object({
  schoolId: z.string().uuid(),
  ipAddress: z.string().max(45),
  cidr: z.number().int().min(0).max(128).optional(),
  description: z.string().max(200).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createDataRetentionPolicySchema = z.object({
  schoolId: z.string().uuid(),
  entityType: z.string().min(1).max(100),
  retentionDays: z.number().int().min(1),
  action: z.enum(['delete', 'archive', 'anonymize']),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateDataRetentionPolicySchema = z.object({
  entityType: z.string().min(1).max(100).optional(),
  retentionDays: z.number().int().min(1).optional(),
  action: z.enum(['delete', 'archive', 'anonymize']).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createComplianceReportSchema = z.object({
  schoolId: z.string().uuid(),
  type: z.enum(['gdpr', 'ferpa', 'hipaa', 'soc2', 'iso27001', 'custom']),
  status: z.enum(['pending', 'in_progress', 'completed', 'failed']),
  findings: z.array(z.object({
    category: z.string().min(1).max(100),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    description: z.string().min(1).max(1000),
    recommendation: z.string().max(1000).optional(),
  })).optional(),
  completedAt: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createBulkUserImportSchema = z.object({
  schoolId: z.string().uuid(),
  users: z.array(z.object({
    email: z.string().email(),
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100),
    role: z.enum(['super_admin', 'admin', 'manager', 'teacher', 'staff', 'viewer']),
    department: z.string().max(100).optional(),
    phone: z.string().max(20).optional(),
  })).min(1).max(1000),
  sendInviteEmails: z.boolean().optional(),
  skipDuplicates: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createBulkUserExportSchema = z.object({
  schoolId: z.string().uuid(),
  userIds: z.array(z.string().uuid()).optional(),
  roles: z.array(z.enum(['super_admin', 'admin', 'manager', 'teacher', 'staff', 'viewer'])).optional(),
  includeInactive: z.boolean().optional(),
  format: z.enum(['csv', 'json', 'xlsx']).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createSchoolInvitationSchema = z.object({
  schoolId: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(['super_admin', 'admin', 'manager', 'teacher', 'staff', 'viewer']),
  message: z.string().max(500).optional(),
  expiresAt: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createUsageReportSchema = z.object({
  schoolId: z.string().uuid(),
  period: z.enum(['daily', 'weekly', 'monthly', 'quarterly', 'yearly']),
  dateFrom: z.string().datetime(),
  dateTo: z.string().datetime(),
  metrics: z.array(z.enum([
    'active_users', 'api_calls', 'storage_used', 'bandwidth',
    'tickets_created', 'tickets_resolved', 'login_count', 'feature_usage',
  ])),
  groupBy: z.enum(['day', 'week', 'month']).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createCustomDomainSchema = z.object({
  schoolId: z.string().uuid(),
  domain: z.string().min(1).max(200),
  verifyOwnership: z.boolean().optional(),
  enableSsl: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createEmailTemplateSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(100),
  subject: z.string().min(1).max(200),
  body: z.string().min(1).max(50000),
  type: z.enum(['transactional', 'marketing', 'notification', 'system']),
  variables: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateEmailTemplateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  subject: z.string().min(1).max(200).optional(),
  body: z.string().min(1).max(50000).optional(),
  type: z.enum(['transactional', 'marketing', 'notification', 'system']).optional(),
  variables: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createIntegrationSchema = z.object({
  schoolId: z.string().uuid(),
  type: z.enum(['stripe', 'sendgrid', 'twilio', 'google', 'microsoft', 'slack', 'custom']),
  name: z.string().min(1).max(200),
  config: z.record(z.unknown()),
  credentials: z.record(z.string()),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateIntegrationSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  config: z.record(z.unknown()).optional(),
  credentials: z.record(z.string()).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createApiKeySchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(100),
  permissions: z.array(z.string()).min(1),
  expiresAt: z.string().datetime().optional(),
  rateLimit: z.number().int().min(1).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createAuditLogFilterSchema = z.object({
  schoolId: z.string().uuid(),
  actions: z.array(auditLogActionEnum).optional(),
  entityTypes: z.array(z.string()).optional(),
  userIds: z.array(z.string().uuid()).optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  search: z.string().max(200).optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const createSchoolOnboardingSchema = z.object({
  schoolId: z.string().uuid(),
  steps: z.array(z.object({
    name: z.string().min(1).max(100),
    status: z.enum(['pending', 'in_progress', 'completed', 'skipped']),
    completedAt: z.string().datetime().optional(),
  })).optional(),
  assignedTo: z.string().uuid().optional(),
  dueDate: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createSchoolBrandingSchema = z.object({
  schoolId: z.string().uuid(),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  logoUrl: z.string().url().optional(),
  faviconUrl: z.string().url().optional(),
  customCss: z.string().max(10000).optional(),
  loginPageBackground: z.string().url().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateSchoolBrandingSchema = z.object({
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  logoUrl: z.string().url().optional(),
  faviconUrl: z.string().url().optional(),
  customCss: z.string().max(10000).optional(),
  loginPageBackground: z.string().url().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createSchoolAnnouncementSchema = z.object({
  schoolId: z.string().uuid(),
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(5000),
  priority: z.enum(['low', 'normal', 'high', 'urgent']),
  targetAudience: z.enum(['all', 'admins', 'teachers', 'staff', 'specific_users']),
  targetUserIds: z.array(z.string().uuid()).optional(),
  publishAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
  isPinned: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateSchoolAnnouncementSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().min(1).max(5000).optional(),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).optional(),
  targetAudience: z.enum(['all', 'admins', 'teachers', 'staff', 'specific_users']).optional(),
  targetUserIds: z.array(z.string().uuid()).optional(),
  publishAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
  isPinned: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createSchoolBackupSchema = z.object({
  schoolId: z.string().uuid(),
  type: z.enum(['full', 'incremental', 'data_only']),
  includeFiles: z.boolean().optional(),
  includeUsers: z.boolean().optional(),
  includeSettings: z.boolean().optional(),
  retentionDays: z.number().int().min(1).max(365).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createSchoolActivityLogSchema = z.object({
  schoolId: z.string().uuid(),
  userId: z.string().uuid(),
  action: z.string().min(1).max(100),
  entityType: z.string().min(1).max(100),
  entityId: z.string().uuid().optional(),
  details: z.record(z.unknown()).optional(),
  ipAddress: z.string().max(45).optional(),
  userAgent: z.string().max(500).optional(),
  metadata: z.record(z.unknown()).optional(),
});
