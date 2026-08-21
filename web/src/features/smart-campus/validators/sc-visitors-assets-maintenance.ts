import { z } from "zod";

// ──────────────────────────────────────────────────────────────
// VISITORS
// ──────────────────────────────────────────────────────────────

export const registrationCreateSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().min(6).max(20),
  purpose: z.string().min(1).max(255),
  hostId: z.string().uuid(),
  departmentId: z.string().uuid().optional(),
  visitDate: z.string().datetime(),
  expectedDuration: z.number().int().positive().optional(),
  notes: z.string().max(1000).optional(),
});

export const registrationUpdateSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(6).max(20).optional(),
  purpose: z.string().min(1).max(255).optional(),
  hostId: z.string().uuid().optional(),
  departmentId: z.string().uuid().optional(),
  visitDate: z.string().datetime().optional(),
  expectedDuration: z.number().int().positive().optional(),
  status: z.enum(["pending", "approved", "rejected", "cancelled"]).optional(),
  notes: z.string().max(1000).optional(),
});

export const registrationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(["createdAt", "visitDate", "lastName", "status"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const registrationFilterSchema = z.object({
  status: z.enum(["pending", "approved", "rejected", "cancelled"]).optional(),
  hostId: z.string().uuid().optional(),
  departmentId: z.string().uuid().optional(),
  visitDateFrom: z.string().datetime().optional(),
  visitDateTo: z.string().datetime().optional(),
  search: z.string().max(200).optional(),
});

export const badgeCreateSchema = z.object({
  registrationId: z.string().uuid(),
  badgeType: z.enum(["visitor", "contractor", "vip", "temporary"]),
  validFrom: z.string().datetime(),
  validUntil: z.string().datetime(),
  accessAreas: z.array(z.string().uuid()).min(1),
  photoUrl: z.string().url().optional(),
  notes: z.string().max(500).optional(),
});

export const badgeUpdateSchema = z.object({
  badgeType: z.enum(["visitor", "contractor", "vip", "temporary"]).optional(),
  validFrom: z.string().datetime().optional(),
  validUntil: z.string().datetime().optional(),
  accessAreas: z.array(z.string().uuid()).optional(),
  photoUrl: z.string().url().optional(),
  status: z.enum(["active", "suspended", "revoked", "expired"]).optional(),
  notes: z.string().max(500).optional(),
});

export const qrCreateSchema = z.object({
  registrationId: z.string().uuid(),
  expiresAt: z.string().datetime(),
  maxScans: z.number().int().positive().default(1),
  accessAreas: z.array(z.string().uuid()).optional(),
});

export const qrUpdateSchema = z.object({
  expiresAt: z.string().datetime().optional(),
  maxScans: z.number().int().positive().optional(),
  accessAreas: z.array(z.string().uuid()).optional(),
  status: z.enum(["active", "expired", "revoked"]).optional(),
});

export const invitationCreateSchema = z.object({
  hostId: z.string().uuid(),
  guestEmail: z.string().email(),
  guestName: z.string().min(1).max(200),
  purpose: z.string().min(1).max(255),
  visitDate: z.string().datetime(),
  expectedDuration: z.number().int().positive().optional(),
  accessAreas: z.array(z.string().uuid()).optional(),
  message: z.string().max(500).optional(),
});

export const invitationUpdateSchema = z.object({
  guestEmail: z.string().email().optional(),
  guestName: z.string().min(1).max(200).optional(),
  purpose: z.string().min(1).max(255).optional(),
  visitDate: z.string().datetime().optional(),
  expectedDuration: z.number().int().positive().optional(),
  accessAreas: z.array(z.string().uuid()).optional(),
  message: z.string().max(500).optional(),
  status: z.enum(["sent", "accepted", "declined", "expired"]).optional(),
});

export const approvalCreateSchema = z.object({
  registrationId: z.string().uuid(),
  approverId: z.string().uuid(),
  decision: z.enum(["approved", "rejected"]),
  reason: z.string().max(500).optional(),
});

export const approvalUpdateSchema = z.object({
  decision: z.enum(["approved", "rejected"]).optional(),
  reason: z.string().max(500).optional(),
});

export const identityCreateSchema = z.object({
  registrationId: z.string().uuid(),
  idType: z.enum(["passport", "nationalId", "driversLicense", "other"]),
  idNumber: z.string().min(1).max(50),
  issuingCountry: z.string().min(2).max(3),
  expiryDate: z.string().datetime().optional(),
  documentUrl: z.string().url().optional(),
});

export const identityUpdateSchema = z.object({
  idType: z.enum(["passport", "nationalId", "driversLicense", "other"]).optional(),
  idNumber: z.string().min(1).max(50).optional(),
  issuingCountry: z.string().min(2).max(3).optional(),
  expiryDate: z.string().datetime().optional(),
  documentUrl: z.string().url().optional(),
});

export const blacklistCreateSchema = z.object({
  personId: z.string().uuid().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(6).max(20).optional(),
  reason: z.string().min(1).max(500),
  flaggedBy: z.string().uuid(),
  validUntil: z.string().datetime().optional(),
});

export const blacklistUpdateSchema = z.object({
  reason: z.string().min(1).max(500).optional(),
  validUntil: z.string().datetime().optional(),
  status: z.enum(["active", "expired", "revoked"]).optional(),
});

export const historyCreateSchema = z.object({
  registrationId: z.string().uuid(),
  action: z.enum(["created", "updated", "approved", "rejected", "checked_in", "checked_out", "badge_issued", "badge_revoked", "cancelled"]),
  performedBy: z.string().uuid(),
  details: z.string().max(1000).optional(),
});

export const visitorSearchSchema = z.object({
  query: z.string().min(1).max(200),
  fields: z.array(z.enum(["firstName", "lastName", "email", "phone", "purpose", "hostName"])).optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
});

export const visitorBulkUpdateSchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(100),
  updates: z.object({
    status: z.enum(["approved", "rejected", "cancelled"]).optional(),
    hostId: z.string().uuid().optional(),
    departmentId: z.string().uuid().optional(),
  }),
});

export const visitorBulkDeleteSchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(100),
  reason: z.string().max(500).optional(),
});

export const visitorExportSchema = z.object({
  format: z.enum(["csv", "xlsx", "pdf"]).default("csv"),
  filter: registrationFilterSchema.optional(),
  fields: z.array(z.string()).optional(),
});

export const visitorImportSchema = z.object({
  fileUrl: z.string().url(),
  format: z.enum(["csv", "xlsx"]),
  overwrite: z.boolean().default(false),
  defaultHostId: z.string().uuid().optional(),
});

export const visitorSettingsSchema = z.object({
  autoApprove: z.boolean().default(false),
  requirePhoto: z.boolean().default(false),
  maxVisitDuration: z.number().int().positive().default(480),
  badgeExpiryHours: z.number().int().positive().default(24),
  allowWalkIn: z.boolean().default(true),
  requireIdVerification: z.boolean().default(false),
  notificationEmails: z.array(z.string().email()).optional(),
  blackoutDates: z.array(z.string().datetime()).optional(),
});

export const visitorAccessibilitySchema = z.object({
  wheelchairAccess: z.boolean().default(false),
  elevatorAccess: z.boolean().default(false),
  accessibleParking: z.boolean().default(false),
  signLanguageInterpreter: z.boolean().default(false),
  largePrintMaterials: z.boolean().default(false),
  assistanceRequired: z.boolean().default(false),
  assistanceNotes: z.string().max(500).optional(),
});

export const visitorLocalizationSchema = z.object({
  preferredLanguage: z.string().min(2).max(5).default("en"),
  timeZone: z.string().max(50).default("UTC"),
  dateFormat: z.string().max(20).default("YYYY-MM-DD"),
  timeFormat: z.enum(["12h", "24h"]).default("24h"),
  currency: z.string().min(3).max(3).default("USD"),
});

export const visitorMetadataSchema = z.object({
  tags: z.array(z.string().max(50)).max(20).optional(),
  customFields: z.record(z.string(), z.unknown()).optional(),
  source: z.enum(["web", "mobile", "api", "walk-in", "invitation"]).default("web"),
  referrer: z.string().max(500).optional(),
});

export const visitorReportSchema = z.object({
  reportType: z.enum(["daily", "weekly", "monthly", "custom"]),
  dateFrom: z.string().datetime(),
  dateTo: z.string().datetime(),
  groupBy: z.enum(["day", "week", "month", "department", "host", "purpose"]).optional(),
  includeCharts: z.boolean().default(false),
  format: z.enum(["pdf", "xlsx", "csv"]).default("pdf"),
});

export const visitorAnalyticsSchema = z.object({
  dateFrom: z.string().datetime(),
  dateTo: z.string().datetime(),
  metrics: z.array(z.enum(["totalVisitors", "averageDuration", "peakHours", "topPurposes", "topHosts", "conversionRate", "returnRate"])).min(1),
  granularity: z.enum(["hourly", "daily", "weekly", "monthly"]).default("daily"),
});

export const visitorPassSchema = z.object({
  registrationId: z.string().uuid(),
  passType: z.enum(["day", "multi-day", "recurring", "event"]),
  validFrom: z.string().datetime(),
  validUntil: z.string().datetime(),
  accessZones: z.array(z.string().uuid()).min(1),
  maxEntries: z.number().int().positive().optional(),
  issuedBy: z.string().uuid(),
});

export const visitorNotificationSchema = z.object({
  registrationId: z.string().uuid(),
  type: z.enum(["registration_confirmed", "approval_pending", "approval_granted", "approval_denied", "check_in_reminder", "badge_ready", "visit_reminder", "check_out_reminder"]),
  channel: z.enum(["email", "sms", "push", "in_app"]).default("email"),
  scheduledAt: z.string().datetime().optional(),
  sentAt: z.string().datetime().optional(),
});

// ──────────────────────────────────────────────────────────────
// ASSETS
// ──────────────────────────────────────────────────────────────

export const assetCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  categoryId: z.string().uuid(),
  locationId: z.string().uuid(),
  assignedToId: z.string().uuid().optional(),
  serialNumber: z.string().max(100).optional(),
  model: z.string().max(100).optional(),
  manufacturer: z.string().max(100).optional(),
  purchaseDate: z.string().datetime().optional(),
  purchasePrice: z.number().positive().optional(),
  status: z.enum(["available", "in_use", "maintenance", "retired", "lost"]).default("available"),
  condition: z.enum(["new", "good", "fair", "poor", "damaged"]).default("new"),
  tags: z.array(z.string().max(50)).max(20).optional(),
});

export const assetUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  categoryId: z.string().uuid().optional(),
  locationId: z.string().uuid().optional(),
  assignedToId: z.string().uuid().optional(),
  serialNumber: z.string().max(100).optional(),
  model: z.string().max(100).optional(),
  manufacturer: z.string().max(100).optional(),
  purchaseDate: z.string().datetime().optional(),
  purchasePrice: z.number().positive().optional(),
  status: z.enum(["available", "in_use", "maintenance", "retired", "lost"]).optional(),
  condition: z.enum(["new", "good", "fair", "poor", "damaged"]).optional(),
  tags: z.array(z.string().max(50)).max(20).optional(),
});

export const assetQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(["name", "createdAt", "purchaseDate", "status", "condition"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const assetFilterSchema = z.object({
  status: z.enum(["available", "in_use", "maintenance", "retired", "lost"]).optional(),
  condition: z.enum(["new", "good", "fair", "poor", "damaged"]).optional(),
  categoryId: z.string().uuid().optional(),
  locationId: z.string().uuid().optional(),
  assignedToId: z.string().uuid().optional(),
  manufacturer: z.string().max(100).optional(),
  purchaseDateFrom: z.string().datetime().optional(),
  purchaseDateTo: z.string().datetime().optional(),
  search: z.string().max(200).optional(),
});

export const equipmentCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  equipmentType: z.enum(["general", "scientific", "industrial", "medical", "office"]),
  serialNumber: z.string().max(100).optional(),
  model: z.string().max(100).optional(),
  manufacturer: z.string().max(100).optional(),
  locationId: z.string().uuid(),
  purchaseDate: z.string().datetime().optional(),
  purchasePrice: z.number().positive().optional(),
  calibrationRequired: z.boolean().default(false),
  lastCalibrationDate: z.string().datetime().optional(),
  nextCalibrationDate: z.string().datetime().optional(),
});

export const equipmentUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  equipmentType: z.enum(["general", "scientific", "industrial", "medical", "office"]).optional(),
  serialNumber: z.string().max(100).optional(),
  model: z.string().max(100).optional(),
  manufacturer: z.string().max(100).optional(),
  locationId: z.string().uuid().optional(),
  purchaseDate: z.string().datetime().optional(),
  purchasePrice: z.number().positive().optional(),
  calibrationRequired: z.boolean().optional(),
  lastCalibrationDate: z.string().datetime().optional(),
  nextCalibrationDate: z.string().datetime().optional(),
  status: z.enum(["operational", "maintenance", "retired", "out_of_service"]).optional(),
});

export const furnitureCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  furnitureType: z.enum(["desk", "chair", "cabinet", "shelf", "table", "sofa", "other"]),
  material: z.string().max(100).optional(),
  color: z.string().max(50).optional(),
  dimensions: z.object({ width: z.number().positive(), height: z.number().positive(), depth: z.number().positive() }).optional(),
  locationId: z.string().uuid(),
  purchaseDate: z.string().datetime().optional(),
  purchasePrice: z.number().positive().optional(),
  condition: z.enum(["new", "good", "fair", "poor", "damaged"]).default("new"),
});

export const furnitureUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  furnitureType: z.enum(["desk", "chair", "cabinet", "shelf", "table", "sofa", "other"]).optional(),
  material: z.string().max(100).optional(),
  color: z.string().max(50).optional(),
  dimensions: z.object({ width: z.number().positive(), height: z.number().positive(), depth: z.number().positive() }).optional(),
  locationId: z.string().uuid().optional(),
  purchaseDate: z.string().datetime().optional(),
  purchasePrice: z.number().positive().optional(),
  condition: z.enum(["new", "good", "fair", "poor", "damaged"]).optional(),
});

export const itAssetCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  assetType: z.enum(["computer", "server", "network", "storage", "peripheral"]),
  serialNumber: z.string().max(100).optional(),
  model: z.string().max(100).optional(),
  manufacturer: z.string().max(100).optional(),
  operatingSystem: z.string().max(100).optional(),
  ipAddress: z.string().ip().optional(),
  macAddress: z.string().max(17).optional(),
  locationId: z.string().uuid(),
  assignedToId: z.string().uuid().optional(),
  purchaseDate: z.string().datetime().optional(),
  purchasePrice: z.number().positive().optional(),
  warrantyExpiry: z.string().datetime().optional(),
});

export const itAssetUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  assetType: z.enum(["computer", "server", "network", "storage", "peripheral"]).optional(),
  serialNumber: z.string().max(100).optional(),
  model: z.string().max(100).optional(),
  manufacturer: z.string().max(100).optional(),
  operatingSystem: z.string().max(100).optional(),
  ipAddress: z.string().ip().optional(),
  macAddress: z.string().max(17).optional(),
  locationId: z.string().uuid().optional(),
  assignedToId: z.string().uuid().optional(),
  purchaseDate: z.string().datetime().optional(),
  purchasePrice: z.number().positive().optional(),
  warrantyExpiry: z.string().datetime().optional(),
  status: z.enum(["active", "inactive", "maintenance", "retired", "lost"]).optional(),
});

export const printerCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  brand: z.string().max(100),
  model: z.string().max(100),
  serialNumber: z.string().max(100).optional(),
  printerType: z.enum(["laser", "inkjet", "thermal", "3d", "multifunction"]),
  connectionType: z.enum(["usb", "network", "wireless", "bluetooth"]),
  locationId: z.string().uuid(),
  assignedToId: z.string().uuid().optional(),
  purchaseDate: z.string().datetime().optional(),
  purchasePrice: z.number().positive().optional(),
  tonerLevel: z.number().int().min(0).max(100).optional(),
});

export const laptopCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  brand: z.string().max(100),
  model: z.string().max(100),
  serialNumber: z.string().max(100).optional(),
  processor: z.string().max(100).optional(),
  ram: z.number().int().positive().optional(),
  storage: z.number().int().positive().optional(),
  storageType: z.enum(["hdd", "ssd", "nvme"]).optional(),
  screenSize: z.number().positive().optional(),
  operatingSystem: z.string().max(100).optional(),
  assignedToId: z.string().uuid().optional(),
  purchaseDate: z.string().datetime().optional(),
  purchasePrice: z.number().positive().optional(),
  warrantyExpiry: z.string().datetime().optional(),
});

export const projectorCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  brand: z.string().max(100),
  model: z.string().max(100),
  serialNumber: z.string().max(100).optional(),
  projectorType: z.enum(["lcd", "dlp", "laser", "led"]),
  resolution: z.string().max(50).optional(),
  brightness: z.number().int().positive().optional(),
  locationId: z.string().uuid(),
  assignedToId: z.string().uuid().optional(),
  purchaseDate: z.string().datetime().optional(),
  purchasePrice: z.number().positive().optional(),
  lampHours: z.number().int().min(0).optional(),
  maxLampHours: z.number().int().positive().optional(),
});

export const labEquipmentCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  category: z.enum(["analytical", "measuring", "safety", "consumable", "general"]),
  brand: z.string().max(100),
  model: z.string().max(100),
  serialNumber: z.string().max(100).optional(),
  locationId: z.string().uuid(),
  assignedToId: z.string().uuid().optional(),
  purchaseDate: z.string().datetime().optional(),
  purchasePrice: z.number().positive().optional(),
  calibrationRequired: z.boolean().default(false),
  lastCalibrationDate: z.string().datetime().optional(),
  nextCalibrationDate: z.string().datetime().optional(),
  safetyLevel: z.enum(["low", "medium", "high", "critical"]).default("low"),
});

export const warrantyCreateSchema = z.object({
  assetId: z.string().uuid(),
  provider: z.string().min(1).max(200),
  warrantyType: z.enum(["standard", "extended", "limited", "on-site"]),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  coverageDetails: z.string().max(1000).optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
  documentUrl: z.string().url().optional(),
});

export const warrantyUpdateSchema = z.object({
  provider: z.string().min(1).max(200).optional(),
  warrantyType: z.enum(["standard", "extended", "limited", "on-site"]).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  coverageDetails: z.string().max(1000).optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
  documentUrl: z.string().url().optional(),
  status: z.enum(["active", "expired", "claimed"]).optional(),
});

export const depreciationCreateSchema = z.object({
  assetId: z.string().uuid(),
  method: z.enum(["straight-line", "declining-balance", "units-of-production"]),
  originalValue: z.number().positive(),
  salvageValue: z.number().min(0),
  usefulLifeYears: z.number().int().positive(),
  startDate: z.string().datetime(),
  notes: z.string().max(500).optional(),
});

export const inventoryCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  locationId: z.string().uuid(),
  assignedToId: z.string().uuid().optional(),
  scheduledDate: z.string().datetime(),
  status: z.enum(["scheduled", "in_progress", "completed", "cancelled"]).default("scheduled"),
  assetIds: z.array(z.string().uuid()).optional(),
  notes: z.string().max(1000).optional(),
});

export const transferCreateSchema = z.object({
  assetId: z.string().uuid(),
  fromLocationId: z.string().uuid(),
  toLocationId: z.string().uuid(),
  fromUserId: z.string().uuid().optional(),
  toUserId: z.string().uuid().optional(),
  transferDate: z.string().datetime(),
  reason: z.string().max(500).optional(),
  approvedBy: z.string().uuid().optional(),
});

export const transferUpdateSchema = z.object({
  toLocationId: z.string().uuid().optional(),
  toUserId: z.string().uuid().optional(),
  transferDate: z.string().datetime().optional(),
  reason: z.string().max(500).optional(),
  approvedBy: z.string().uuid().optional(),
  status: z.enum(["pending", "approved", "in_transit", "completed", "cancelled"]).optional(),
});

export const assetMaintenanceCreateSchema = z.object({
  assetId: z.string().uuid(),
  maintenanceType: z.enum(["preventive", "corrective", "predictive", "emergency"]),
  description: z.string().min(1).max(1000),
  scheduledDate: z.string().datetime(),
  completedDate: z.string().datetime().optional(),
  technicianId: z.string().uuid().optional(),
  cost: z.number().min(0).optional(),
  status: z.enum(["scheduled", "in_progress", "completed", "cancelled"]).default("scheduled"),
  notes: z.string().max(1000).optional(),
});

export const assetSearchSchema = z.object({
  query: z.string().min(1).max(200),
  fields: z.array(z.enum(["name", "serialNumber", "model", "manufacturer", "description", "tags"])).optional(),
  status: z.enum(["available", "in_use", "maintenance", "retired", "lost"]).optional(),
  categoryId: z.string().uuid().optional(),
});

export const assetBulkUpdateSchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(100),
  updates: z.object({
    status: z.enum(["available", "in_use", "maintenance", "retired", "lost"]).optional(),
    condition: z.enum(["new", "good", "fair", "poor", "damaged"]).optional(),
    locationId: z.string().uuid().optional(),
    assignedToId: z.string().uuid().optional(),
    tags: z.array(z.string().max(50)).max(20).optional(),
  }),
});

export const assetBulkDeleteSchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(100),
  reason: z.string().max(500).optional(),
});

export const assetExportSchema = z.object({
  format: z.enum(["csv", "xlsx", "pdf"]).default("csv"),
  filter: assetFilterSchema.optional(),
  fields: z.array(z.string()).optional(),
});

export const assetImportSchema = z.object({
  fileUrl: z.string().url(),
  format: z.enum(["csv", "xlsx"]),
  overwrite: z.boolean().default(false),
  defaultCategoryId: z.string().uuid().optional(),
  defaultLocationId: z.string().uuid().optional(),
});

export const assetSettingsSchema = z.object({
  autoNumbering: z.boolean().default(true),
  numberPrefix: z.string().max(20).default("AST"),
  defaultCurrency: z.string().min(3).max(3).default("USD"),
  requireApprovalForTransfer: z.boolean().default(true),
  requireApprovalForRetirement: z.boolean().default(true),
  enableDepreciation: z.boolean().default(false),
  defaultDepreciationMethod: z.enum(["straight-line", "declining-balance", "units-of-production"]).optional(),
  notificationEmails: z.array(z.string().email()).optional(),
  warrantyReminderDays: z.number().int().positive().default(30),
});

export const assetAccessibilitySchema = z.object({
  wheelchairAccessible: z.boolean().default(false),
  ergonomicallyDesigned: z.boolean().default(false),
  adjustableHeight: z.boolean().default(false),
  voiceControlled: z.boolean().default(false),
  screenReaderCompatible: z.boolean().default(false),
  highContrast: z.boolean().default(false),
  accessibilityNotes: z.string().max(500).optional(),
});

export const assetLocalizationSchema = z.object({
  preferredLanguage: z.string().min(2).max(5).default("en"),
  timeZone: z.string().max(50).default("UTC"),
  dateFormat: z.string().max(20).default("YYYY-MM-DD"),
  timeFormat: z.enum(["12h", "24h"]).default("24h"),
  currency: z.string().min(3).max(3).default("USD"),
  unitSystem: z.enum(["metric", "imperial"]).default("metric"),
});

export const assetMetadataSchema = z.object({
  tags: z.array(z.string().max(50)).max(20).optional(),
  customFields: z.record(z.string(), z.unknown()).optional(),
  barcode: z.string().max(100).optional(),
  qrCode: z.string().max(200).optional(),
  imageUrls: z.array(z.string().url()).max(10).optional(),
  documentUrls: z.array(z.string().url()).max(20).optional(),
});

export const assetPricingSchema = z.object({
  assetId: z.string().uuid(),
  purchasePrice: z.number().min(0),
  currentValue: z.number().min(0).optional(),
  replacementCost: z.number().min(0).optional(),
  insuranceValue: z.number().min(0).optional(),
  currency: z.string().min(3).max(3).default("USD"),
  taxRate: z.number().min(0).max(100).optional(),
  discountPercentage: z.number().min(0).max(100).optional(),
  notes: z.string().max(500).optional(),
});

export const assetBundleSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  assetIds: z.array(z.string().uuid()).min(2),
  bundleType: z.enum(["functional", "physical", "logical"]),
  locationId: z.string().uuid().optional(),
  assignedToId: z.string().uuid().optional(),
  totalValue: z.number().min(0).optional(),
});

export const assetSubscriptionSchema = z.object({
  assetId: z.string().uuid(),
  provider: z.string().min(1).max(200),
  subscriptionType: z.enum(["monthly", "quarterly", "annual", "perpetual"]),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  cost: z.number().min(0),
  autoRenew: z.boolean().default(false),
  licenseKey: z.string().max(200).optional(),
  maxUsers: z.number().int().positive().optional(),
  features: z.array(z.string().max(100)).optional(),
});

export const assetVersionSchema = z.object({
  assetId: z.string().uuid(),
  versionNumber: z.string().min(1).max(50),
  releaseDate: z.string().datetime(),
  changelog: z.string().max(2000).optional(),
  isCurrent: z.boolean().default(true),
  downloadUrl: z.string().url().optional(),
  compatibility: z.string().max(500).optional(),
});

export const assetArchiveSchema = z.object({
  assetIds: z.array(z.string().uuid()).min(1).max(100),
  reason: z.string().min(1).max(500),
  archiveDate: z.string().datetime(),
  retainForYears: z.number().int().positive().default(7),
  notes: z.string().max(1000).optional(),
});

export const assetRestoreSchema = z.object({
  assetIds: z.array(z.string().uuid()).min(1).max(100),
  reason: z.string().min(1).max(500),
  restoreToStatus: z.enum(["available", "in_use", "maintenance"]).default("available"),
  notes: z.string().max(1000).optional(),
});

export const assetReportSchema = z.object({
  reportType: z.enum(["inventory_summary", "depreciation", "maintenance_history", "utilization", "lifecycle", "custom"]),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  categoryIds: z.array(z.string().uuid()).optional(),
  locationIds: z.array(z.string().uuid()).optional(),
  groupBy: z.enum(["category", "location", "status", "manufacturer", "year"]).optional(),
  includeCharts: z.boolean().default(false),
  format: z.enum(["pdf", "xlsx", "csv"]).default("pdf"),
});

export const assetAnalyticsSchema = z.object({
  dateFrom: z.string().datetime(),
  dateTo: z.string().datetime(),
  metrics: z.array(z.enum(["totalAssets", "totalValue", "utilizationRate", "maintenanceCost", "averageAge", "depreciationTotal", "topCategories", "topLocations"])).min(1),
  granularity: z.enum(["daily", "weekly", "monthly", "yearly"]).default("monthly"),
});

export const assetAuditSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  auditType: z.enum(["full", "partial", "spot_check", "cycle_count"]),
  scheduledDate: z.string().datetime(),
  locationIds: z.array(z.string().uuid()).optional(),
  categoryIds: z.array(z.string().uuid()).optional(),
  auditorId: z.string().uuid(),
  status: z.enum(["scheduled", "in_progress", "completed", "cancelled"]).default("scheduled"),
  notes: z.string().max(1000).optional(),
});

export const assetCategorySchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  parentId: z.string().uuid().optional(),
  icon: z.string().max(100).optional(),
  color: z.string().max(7).optional(),
  defaultDepreciationMethod: z.enum(["straight-line", "declining-balance", "units-of-production"]).optional(),
  defaultUsefulLifeYears: z.number().int().positive().optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
});

// ──────────────────────────────────────────────────────────────
// MAINTENANCE
// ──────────────────────────────────────────────────────────────

export const ticketCreateSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  priority: z.enum(["low", "medium", "high", "critical"]).default("medium"),
  category: z.enum(["plumbing", "electrical", "hvac", "structural", "grounds", "cleaning", "safety", "it", "other"]),
  locationId: z.string().uuid(),
  reportedBy: z.string().uuid(),
  assignedToId: z.string().uuid().optional(),
  assetId: z.string().uuid().optional(),
  images: z.array(z.string().url()).max(5).optional(),
  dueDate: z.string().datetime().optional(),
});

export const ticketUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(2000).optional(),
  priority: z.enum(["low", "medium", "high", "critical"]).optional(),
  category: z.enum(["plumbing", "electrical", "hvac", "structural", "grounds", "cleaning", "safety", "it", "other"]).optional(),
  locationId: z.string().uuid().optional(),
  assignedToId: z.string().uuid().optional(),
  assetId: z.string().uuid().optional(),
  status: z.enum(["open", "in_progress", "on_hold", "resolved", "closed", "cancelled"]).optional(),
  images: z.array(z.string().url()).max(5).optional(),
  dueDate: z.string().datetime().optional(),
  resolution: z.string().max(2000).optional(),
});

export const ticketQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(["createdAt", "priority", "status", "dueDate", "updatedAt"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const ticketFilterSchema = z.object({
  status: z.enum(["open", "in_progress", "on_hold", "resolved", "closed", "cancelled"]).optional(),
  priority: z.enum(["low", "medium", "high", "critical"]).optional(),
  category: z.enum(["plumbing", "electrical", "hvac", "structural", "grounds", "cleaning", "safety", "it", "other"]).optional(),
  locationId: z.string().uuid().optional(),
  assignedToId: z.string().uuid().optional(),
  reportedBy: z.string().uuid().optional(),
  dueDateFrom: z.string().datetime().optional(),
  dueDateTo: z.string().datetime().optional(),
  search: z.string().max(200).optional(),
});

export const preventiveCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  assetId: z.string().uuid().optional(),
  locationId: z.string().uuid().optional(),
  frequency: z.enum(["daily", "weekly", "monthly", "quarterly", "annually"]),
  intervalDays: z.number().int().positive().optional(),
  taskList: z.array(z.string().min(1).max(200)).min(1),
  estimatedDuration: z.number().int().positive().optional(),
  assignedToId: z.string().uuid().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  isActive: z.boolean().default(true),
});

export const preventiveUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  assetId: z.string().uuid().optional(),
  locationId: z.string().uuid().optional(),
  frequency: z.enum(["daily", "weekly", "monthly", "quarterly", "annually"]).optional(),
  intervalDays: z.number().int().positive().optional(),
  taskList: z.array(z.string().min(1).max(200)).min(1).optional(),
  estimatedDuration: z.number().int().positive().optional(),
  assignedToId: z.string().uuid().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  isActive: z.boolean().optional(),
});

export const correctiveCreateSchema = z.object({
  ticketId: z.string().uuid(),
  rootCause: z.string().min(1).max(1000),
  correctiveAction: z.string().min(1).max(2000),
  partsUsed: z.array(z.object({ sparePartId: z.string().uuid(), quantity: z.number().int().positive() })).optional(),
  laborHours: z.number().min(0).optional(),
  cost: z.number().min(0).optional(),
  preventiveRecommendation: z.string().max(1000).optional(),
  completedBy: z.string().uuid(),
  completedAt: z.string().datetime(),
});

export const correctiveUpdateSchema = z.object({
  rootCause: z.string().min(1).max(1000).optional(),
  correctiveAction: z.string().min(1).max(2000).optional(),
  partsUsed: z.array(z.object({ sparePartId: z.string().uuid(), quantity: z.number().int().positive() })).optional(),
  laborHours: z.number().min(0).optional(),
  cost: z.number().min(0).optional(),
  preventiveRecommendation: z.string().max(1000).optional(),
});

export const technicianCreateSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().min(6).max(20),
  employeeId: z.string().max(50).optional(),
  specialization: z.array(z.enum(["plumbing", "electrical", "hvac", "structural", "grounds", "cleaning", "safety", "it", "general"])),
  certifications: z.array(z.string().max(200)).optional(),
  availability: z.enum(["full_time", "part_time", "on_call", "contractor"]).default("full_time"),
  maxConcurrentTasks: z.number().int().positive().default(5),
  hourlyRate: z.number().min(0).optional(),
  isActive: z.boolean().default(true),
});

export const technicianUpdateSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(6).max(20).optional(),
  employeeId: z.string().max(50).optional(),
  specialization: z.array(z.enum(["plumbing", "electrical", "hvac", "structural", "grounds", "cleaning", "safety", "it", "general"])).optional(),
  certifications: z.array(z.string().max(200)).optional(),
  availability: z.enum(["full_time", "part_time", "on_call", "contractor"]).optional(),
  maxConcurrentTasks: z.number().int().positive().optional(),
  hourlyRate: z.number().min(0).optional(),
  isActive: z.boolean().optional(),
});

export const workOrderCreateSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  ticketId: z.string().uuid().optional(),
  priority: z.enum(["low", "medium", "high", "critical"]).default("medium"),
  assignedToId: z.string().uuid(),
  locationId: z.string().uuid(),
  assetId: z.string().uuid().optional(),
  scheduledDate: z.string().datetime(),
  estimatedDuration: z.number().int().positive().optional(),
  requiredSkills: z.array(z.string().max(100)).optional(),
  safetyRequirements: z.array(z.string().max(200)).optional(),
  materials: z.array(z.object({ sparePartId: z.string().uuid(), quantity: z.number().int().positive() })).optional(),
});

export const workOrderUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(2000).optional(),
  priority: z.enum(["low", "medium", "high", "critical"]).optional(),
  assignedToId: z.string().uuid().optional(),
  locationId: z.string().uuid().optional(),
  assetId: z.string().uuid().optional(),
  scheduledDate: z.string().datetime().optional(),
  estimatedDuration: z.number().int().positive().optional(),
  actualDuration: z.number().int().min(0).optional(),
  requiredSkills: z.array(z.string().max(100)).optional(),
  safetyRequirements: z.array(z.string().max(200)).optional(),
  materials: z.array(z.object({ sparePartId: z.string().uuid(), quantity: z.number().int().positive() })).optional(),
  status: z.enum(["pending", "assigned", "in_progress", "on_hold", "completed", "cancelled"]).optional(),
  notes: z.string().max(2000).optional(),
});

export const contractCreateSchema = z.object({
  name: z.string().min(1).max(200),
  vendorId: z.string().uuid(),
  contractType: z.enum(["maintenance", "service", "warranty", "lease"]),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  value: z.number().min(0),
  currency: z.string().min(3).max(3).default("USD"),
  paymentTerms: z.enum(["monthly", "quarterly", "annually", "upon_completion"]),
  scope: z.string().min(1).max(2000),
  SLAId: z.string().uuid().optional(),
  autoRenew: z.boolean().default(false),
  renewalNoticeDays: z.number().int().positive().optional(),
  documentUrl: z.string().url().optional(),
});

export const contractUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  vendorId: z.string().uuid().optional(),
  contractType: z.enum(["maintenance", "service", "warranty", "lease"]).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  value: z.number().min(0).optional(),
  currency: z.string().min(3).max(3).optional(),
  paymentTerms: z.enum(["monthly", "quarterly", "annually", "upon_completion"]).optional(),
  scope: z.string().min(1).max(2000).optional(),
  SLAId: z.string().uuid().optional(),
  autoRenew: z.boolean().optional(),
  renewalNoticeDays: z.number().int().positive().optional(),
  documentUrl: z.string().url().optional(),
  status: z.enum(["active", "expired", "terminated", "pending"]).optional(),
});

export const sparePartCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  partNumber: z.string().max(100).optional(),
  categoryId: z.string().uuid().optional(),
  supplier: z.string().max(200).optional(),
  unitCost: z.number().min(0),
  quantity: z.number().int().min(0).default(0),
  minimumStock: z.number().int().min(0).default(0),
  maximumStock: z.number().int().min(0).optional(),
  locationId: z.string().uuid().optional(),
  compatibleAssets: z.array(z.string().uuid()).optional(),
  leadTimeDays: z.number().int().positive().optional(),
});

export const sparePartUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  partNumber: z.string().max(100).optional(),
  categoryId: z.string().uuid().optional(),
  supplier: z.string().max(200).optional(),
  unitCost: z.number().min(0).optional(),
  quantity: z.number().int().min(0).optional(),
  minimumStock: z.number().int().min(0).optional(),
  maximumStock: z.number().int().min(0).optional(),
  locationId: z.string().uuid().optional(),
  compatibleAssets: z.array(z.string().uuid()).optional(),
  leadTimeDays: z.number().int().positive().optional(),
  status: z.enum(["active", "discontinued", "on_order"]).optional(),
});

export const calendarCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  eventType: z.enum(["maintenance", "inspection", "audit", "training", "other"]),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  allDay: z.boolean().default(false),
  recurrence: z.enum(["none", "daily", "weekly", "monthly", "yearly"]).default("none"),
  recurrenceEnd: z.string().datetime().optional(),
  assignedToId: z.string().uuid().optional(),
  locationId: z.string().uuid().optional(),
  assetId: z.string().uuid().optional(),
  color: z.string().max(7).optional(),
  notifications: z.array(z.object({ type: z.enum(["email", "sms", "push"]), minutesBefore: z.number().int().min(0) })).optional(),
});

export const calendarUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  eventType: z.enum(["maintenance", "inspection", "audit", "training", "other"]).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  allDay: z.boolean().optional(),
  recurrence: z.enum(["none", "daily", "weekly", "monthly", "yearly"]).optional(),
  recurrenceEnd: z.string().datetime().optional(),
  assignedToId: z.string().uuid().optional(),
  locationId: z.string().uuid().optional(),
  assetId: z.string().uuid().optional(),
  color: z.string().max(7).optional(),
  status: z.enum(["scheduled", "completed", "cancelled"]).optional(),
  notifications: z.array(z.object({ type: z.enum(["email", "sms", "push"]), minutesBefore: z.number().int().min(0) })).optional(),
});

export const slaCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  priority: z.enum(["low", "medium", "high", "critical"]),
  responseTimeHours: z.number().int().positive(),
  resolutionTimeHours: z.number().int().positive(),
  businessHoursOnly: z.boolean().default(true),
  escalationEnabled: z.boolean().default(true),
  penalties: z.array(z.object({ type: z.enum(["warning", "fine", "escalation"]), threshold: z.number().int().positive(), value: z.number().min(0) })).optional(),
  isActive: z.boolean().default(true),
});

export const costCreateSchema = z.object({
  workOrderId: z.string().uuid().optional(),
  ticketId: z.string().uuid().optional(),
  costType: z.enum(["labor", "parts", "contractor", "overhead", "other"]),
  description: z.string().min(1).max(500),
  amount: z.number().min(0),
  currency: z.string().min(3).max(3).default("USD"),
  date: z.string().datetime(),
  vendorId: z.string().uuid().optional(),
  invoiceNumber: z.string().max(100).optional(),
  approvedBy: z.string().uuid().optional(),
  receiptUrl: z.string().url().optional(),
});

export const qualityCheckCreateSchema = z.object({
  workOrderId: z.string().uuid(),
  ticketId: z.string().uuid().optional(),
  inspectorId: z.string().uuid(),
  inspectionDate: z.string().datetime(),
  passed: z.boolean(),
  checklist: z.array(z.object({ item: z.string().min(1).max(200), status: z.enum(["pass", "fail", "na"]), notes: z.string().max(500).optional() })),
  overallScore: z.number().int().min(0).max(100).optional(),
  notes: z.string().max(1000).optional(),
  followUpRequired: z.boolean().default(false),
  followUpDate: z.string().datetime().optional(),
});

export const qualityCheckUpdateSchema = z.object({
  passed: z.boolean().optional(),
  checklist: z.array(z.object({ item: z.string().min(1).max(200), status: z.enum(["pass", "fail", "na"]), notes: z.string().max(500).optional() })).optional(),
  overallScore: z.number().int().min(0).max(100).optional(),
  notes: z.string().max(1000).optional(),
  followUpRequired: z.boolean().optional(),
  followUpDate: z.string().datetime().optional(),
});

export const scheduleCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  assetId: z.string().uuid().optional(),
  locationId: z.string().uuid().optional(),
  technicianId: z.string().uuid(),
  scheduledDate: z.string().datetime(),
  scheduledTime: z.string().regex(/^\d{2}:\d{2}$/),
  durationMinutes: z.number().int().positive(),
  maintenanceType: z.enum(["preventive", "corrective", "predictive", "emergency"]),
  priority: z.enum(["low", "medium", "high", "critical"]).default("medium"),
  recurring: z.boolean().default(false),
  recurrencePattern: z.enum(["daily", "weekly", "biweekly", "monthly", "quarterly", "annually"]).optional(),
  notes: z.string().max(1000).optional(),
});

export const escalationCreateSchema = z.object({
  ticketId: z.string().uuid(),
  escalatedFrom: z.string().uuid(),
  escalatedTo: z.string().uuid(),
  reason: z.string().min(1).max(500),
  escalationLevel: z.number().int().min(1).max(5),
  deadline: z.string().datetime().optional(),
  notes: z.string().max(1000).optional(),
});

export const maintenanceSearchSchema = z.object({
  query: z.string().min(1).max(200),
  modules: z.array(z.enum(["tickets", "workOrders", "preventive", "corrective"])).optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  priority: z.enum(["low", "medium", "high", "critical"]).optional(),
  status: z.string().max(50).optional(),
});

export const maintenanceBulkUpdateSchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(100),
  updates: z.object({
    status: z.string().max(50).optional(),
    priority: z.enum(["low", "medium", "high", "critical"]).optional(),
    assignedToId: z.string().uuid().optional(),
  }),
});

export const maintenanceBulkDeleteSchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(100),
  reason: z.string().max(500).optional(),
});

export const maintenanceExportSchema = z.object({
  format: z.enum(["csv", "xlsx", "pdf"]).default("csv"),
  modules: z.array(z.enum(["tickets", "workOrders", "preventive", "corrective"])).min(1),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  fields: z.array(z.string()).optional(),
});

export const maintenanceImportSchema = z.object({
  fileUrl: z.string().url(),
  format: z.enum(["csv", "xlsx"]),
  module: z.enum(["tickets", "workOrders", "preventive", "corrective"]),
  overwrite: z.boolean().default(false),
});

export const maintenanceSettingsSchema = z.object({
  autoAssignTickets: z.boolean().default(false),
  defaultPriority: z.enum(["low", "medium", "high", "critical"]).default("medium"),
  ticketNumberPrefix: z.string().max(20).default("TKT"),
  workOrderNumberPrefix: z.string().max(20).default("WO"),
  defaultSLAId: z.string().uuid().optional(),
  escalationEnabled: z.boolean().default(true),
  escalationTimeoutHours: z.number().int().positive().default(24),
  requireQualityCheck: z.boolean().default(false),
  autoCloseResolvedDays: z.number().int().positive().default(7),
  notificationEmails: z.array(z.string().email()).optional(),
});

export const maintenanceAccessibilitySchema = z.object({
  wheelchairAccessibleAreas: z.boolean().default(false),
  accessibleToolsAvailable: z.boolean().default(false),
  visualAlerts: z.boolean().default(false),
  audioAlerts: z.boolean().default(false),
  largePrintLabels: z.boolean().default(false),
  brailleLabels: z.boolean().default(false),
  assistanceAvailable: z.boolean().default(false),
  notes: z.string().max(500).optional(),
});

export const maintenanceLocalizationSchema = z.object({
  preferredLanguage: z.string().min(2).max(5).default("en"),
  timeZone: z.string().max(50).default("UTC"),
  dateFormat: z.string().max(20).default("YYYY-MM-DD"),
  timeFormat: z.enum(["12h", "24h"]).default("24h"),
  currency: z.string().min(3).max(3).default("USD"),
  unitSystem: z.enum(["metric", "imperial"]).default("metric"),
  measurementUnit: z.enum(["mm", "cm", "m", "in", "ft"]).default("mm"),
});

export const maintenanceMetadataSchema = z.object({
  tags: z.array(z.string().max(50)).max(20).optional(),
  customFields: z.record(z.string(), z.unknown()).optional(),
  source: z.enum(["web", "mobile", "api", "email", "phone"]).default("web"),
  attachments: z.array(z.object({ url: z.string().url(), name: z.string().max(200), type: z.enum(["image", "document", "video", "other"]) })).max(10).optional(),
});

export const maintenancePricingSchema = z.object({
  serviceId: z.string().uuid(),
  baseRate: z.number().min(0),
  overtimeRate: z.number().min(0).optional(),
  weekendRate: z.number().min(0).optional(),
  holidayRate: z.number().min(0).optional(),
  currency: z.string().min(3).max(3).default("USD"),
  minimumCharge: z.number().min(0).optional(),
  travelFee: z.number().min(0).optional(),
  notes: z.string().max(500).optional(),
});

export const maintenanceBundleSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  serviceIds: z.array(z.string().uuid()).min(1),
  bundleType: z.enum(["basic", "standard", "premium", "custom"]),
  discountPercentage: z.number().min(0).max(100).optional(),
  validFrom: z.string().datetime(),
  validUntil: z.string().datetime(),
  maxUsageCount: z.number().int().positive().optional(),
});

export const maintenanceSubscriptionSchema = z.object({
  providerName: z.string().min(1).max(200),
  subscriptionType: z.enum(["monthly", "quarterly", "annual"]),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  cost: z.number().min(0),
  currency: z.string().min(3).max(3).default("USD"),
  autoRenew: z.boolean().default(false),
  servicesIncluded: z.array(z.string().max(200)),
  maxRequestsPerMonth: z.number().int().positive().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
});

export const maintenanceVersionSchema = z.object({
  versionNumber: z.string().min(1).max(50),
  releaseDate: z.string().datetime(),
  changes: z.array(z.string().min(1).max(500)).min(1),
  breakingChanges: z.boolean().default(false),
  deprecatedFeatures: z.array(z.string().max(200)).optional(),
  compatibility: z.string().max(500).optional(),
  isCurrent: z.boolean().default(true),
});

export const maintenanceArchiveSchema = z.object({
  recordIds: z.array(z.string().uuid()).min(1).max(100),
  module: z.enum(["tickets", "workOrders", "preventive", "corrective"]),
  reason: z.string().min(1).max(500),
  archiveDate: z.string().datetime(),
  retainForYears: z.number().int().positive().default(5),
  notes: z.string().max(1000).optional(),
});

export const maintenanceRestoreSchema = z.object({
  recordIds: z.array(z.string().uuid()).min(1).max(100),
  module: z.enum(["tickets", "workOrders", "preventive", "corrective"]),
  reason: z.string().min(1).max(500),
  restoreToStatus: z.string().max(50).default("active"),
  notes: z.string().max(1000).optional(),
});

export const maintenanceReportSchema = z.object({
  reportType: z.enum(["ticket_summary", "work_order_performance", "preventive_compliance", "cost_analysis", "technician_performance", "downtime_analysis", "custom"]),
  dateFrom: z.string().datetime(),
  dateTo: z.string().datetime(),
  modules: z.array(z.enum(["tickets", "workOrders", "preventive", "corrective"])).optional(),
  groupBy: z.enum(["day", "week", "month", "technician", "category", "priority", "location"]).optional(),
  includeCharts: z.boolean().default(false),
  format: z.enum(["pdf", "xlsx", "csv"]).default("pdf"),
});

