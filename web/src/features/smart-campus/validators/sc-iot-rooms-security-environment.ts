import { z } from "zod";

// ──────────────────────────────────────────────────────────────
// IoT
// ──────────────────────────────────────────────────────────────

export const deviceCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  deviceType: z.enum(["sensor", "actuator", "gateway", "controller", "camera", "lock", "meter", "beacon"]),
  model: z.string().max(100).optional(),
  manufacturer: z.string().max(100).optional(),
  serialNumber: z.string().max(100).optional(),
  locationId: z.string().uuid(),
  buildingId: z.string().uuid().optional(),
  floor: z.number().int().optional(),
  roomId: z.string().uuid().optional(),
  protocol: z.enum(["mqtt", "coap", "http", "zigbee", "bluetooth", "wifi", "lorawan", "other"]).optional(),
  ipAddress: z.string().ip().optional(),
  macAddress: z.string().max(17).optional(),
  firmwareVersion: z.string().max(50).optional(),
  installDate: z.string().datetime().optional(),
  warrantyExpiry: z.string().datetime().optional(),
  status: z.enum(["active", "inactive", "maintenance", "offline", "error"]).default("active"),
  tags: z.array(z.string().max(50)).max(20).optional(),
});

export const deviceUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  deviceType: z.enum(["sensor", "actuator", "gateway", "controller", "camera", "lock", "meter", "beacon"]).optional(),
  model: z.string().max(100).optional(),
  manufacturer: z.string().max(100).optional(),
  serialNumber: z.string().max(100).optional(),
  locationId: z.string().uuid().optional(),
  buildingId: z.string().uuid().optional(),
  floor: z.number().int().optional(),
  roomId: z.string().uuid().optional(),
  protocol: z.enum(["mqtt", "coap", "http", "zigbee", "bluetooth", "wifi", "lorawan", "other"]).optional(),
  ipAddress: z.string().ip().optional(),
  macAddress: z.string().max(17).optional(),
  firmwareVersion: z.string().max(50).optional(),
  installDate: z.string().datetime().optional(),
  warrantyExpiry: z.string().datetime().optional(),
  status: z.enum(["active", "inactive", "maintenance", "offline", "error"]).optional(),
  tags: z.array(z.string().max(50)).max(20).optional(),
});

export const deviceQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(["name", "createdAt", "status", "deviceType", "installDate"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const deviceFilterSchema = z.object({
  status: z.enum(["active", "inactive", "maintenance", "offline", "error"]).optional(),
  deviceType: z.enum(["sensor", "actuator", "gateway", "controller", "camera", "lock", "meter", "beacon"]).optional(),
  locationId: z.string().uuid().optional(),
  buildingId: z.string().uuid().optional(),
  protocol: z.enum(["mqtt", "coap", "http", "zigbee", "bluetooth", "wifi", "lorawan", "other"]).optional(),
  manufacturer: z.string().max(100).optional(),
  installDateFrom: z.string().datetime().optional(),
  installDateTo: z.string().datetime().optional(),
  search: z.string().max(200).optional(),
});

export const sensorCreateSchema = z.object({
  deviceId: z.string().uuid(),
  sensorType: z.enum(["temperature", "humidity", "pressure", "light", "motion", "airQuality", "noise", "vibration", "proximity", "water", "gas", "smoke"]),
  unit: z.string().max(20).optional(),
  minValue: z.number().optional(),
  maxValue: z.number().optional(),
  precision: z.number().int().min(0).max(10).optional(),
  samplingRateMs: z.number().int().positive().optional(),
  calibrationDate: z.string().datetime().optional(),
  nextCalibrationDate: z.string().datetime().optional(),
  thresholdMin: z.number().optional(),
  thresholdMax: z.number().optional(),
  alertEnabled: z.boolean().default(true),
  isActive: z.boolean().default(true),
});

export const sensorUpdateSchema = z.object({
  sensorType: z.enum(["temperature", "humidity", "pressure", "light", "motion", "airQuality", "noise", "vibration", "proximity", "water", "gas", "smoke"]).optional(),
  unit: z.string().max(20).optional(),
  minValue: z.number().optional(),
  maxValue: z.number().optional(),
  precision: z.number().int().min(0).max(10).optional(),
  samplingRateMs: z.number().int().positive().optional(),
  calibrationDate: z.string().datetime().optional(),
  nextCalibrationDate: z.string().datetime().optional(),
  thresholdMin: z.number().optional(),
  thresholdMax: z.number().optional(),
  alertEnabled: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export const sensorDataCreateSchema = z.object({
  sensorId: z.string().uuid(),
  value: z.number(),
  timestamp: z.string().datetime(),
  quality: z.enum(["good", "uncertain", "bad"]).default("good"),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const energyMonitorCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  deviceId: z.string().uuid().optional(),
  locationId: z.string().uuid(),
  buildingId: z.string().uuid().optional(),
  meterType: z.enum(["electricity", "gas", "steam", "solar", "battery"]),
  meterNumber: z.string().max(100).optional(),
  ratedCapacity: z.number().positive().optional(),
  unit: z.enum(["kwh", "mwh", "kwh_per_sqm", "btu"]).default("kwh"),
  monitoringIntervalMinutes: z.number().int().positive().default(15),
  alertThreshold: z.number().positive().optional(),
  isActive: z.boolean().default(true),
});

export const energyMonitorUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  deviceId: z.string().uuid().optional(),
  locationId: z.string().uuid().optional(),
  buildingId: z.string().uuid().optional(),
  meterType: z.enum(["electricity", "gas", "steam", "solar", "battery"]).optional(),
  meterNumber: z.string().max(100).optional(),
  ratedCapacity: z.number().positive().optional(),
  unit: z.enum(["kwh", "mwh", "kwh_per_sqm", "btu"]).optional(),
  monitoringIntervalMinutes: z.number().int().positive().optional(),
  alertThreshold: z.number().positive().optional(),
  isActive: z.boolean().optional(),
});

export const waterMonitorCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  deviceId: z.string().uuid().optional(),
  locationId: z.string().uuid(),
  buildingId: z.string().uuid().optional(),
  meterType: z.enum(["potable", "irrigation", "fire", "process", "waste"]),
  meterNumber: z.string().max(100).optional(),
  diameter: z.number().positive().optional(),
  unit: z.enum(["liters", "gallons", "cubic_meters"]).default("liters"),
  monitoringIntervalMinutes: z.number().int().positive().default(60),
  alertThreshold: z.number().positive().optional(),
  isActive: z.boolean().default(true),
});

export const waterMonitorUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  deviceId: z.string().uuid().optional(),
  locationId: z.string().uuid().optional(),
  buildingId: z.string().uuid().optional(),
  meterType: z.enum(["potable", "irrigation", "fire", "process", "waste"]).optional(),
  meterNumber: z.string().max(100).optional(),
  diameter: z.number().positive().optional(),
  unit: z.enum(["liters", "gallons", "cubic_meters"]).optional(),
  monitoringIntervalMinutes: z.number().int().positive().optional(),
  alertThreshold: z.number().positive().optional(),
  isActive: z.boolean().optional(),
});

export const doorAccessCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  deviceId: z.string().uuid().optional(),
  locationId: z.string().uuid(),
  buildingId: z.string().uuid().optional(),
  doorType: z.enum(["entrance", "exit", "internal", "restricted", "emergency"]),
  lockType: z.enum(["electronic", "magnetic", "biometric", "card", "pin"]),
  accessMethod: z.array(z.enum(["card", "pin", "biometric", "mobile", "key"])).min(1),
  maxAttempts: z.number().int().positive().default(3),
  lockoutDurationSeconds: z.number().int().positive().default(300),
  scheduleId: z.string().uuid().optional(),
  isActive: z.boolean().default(true),
});

export const doorAccessUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  deviceId: z.string().uuid().optional(),
  locationId: z.string().uuid().optional(),
  buildingId: z.string().uuid().optional(),
  doorType: z.enum(["entrance", "exit", "internal", "restricted", "emergency"]).optional(),
  lockType: z.enum(["electronic", "magnetic", "biometric", "card", "pin"]).optional(),
  accessMethod: z.array(z.enum(["card", "pin", "biometric", "mobile", "key"])).min(1).optional(),
  maxAttempts: z.number().int().positive().optional(),
  lockoutDurationSeconds: z.number().int().positive().optional(),
  scheduleId: z.string().uuid().optional(),
  isActive: z.boolean().optional(),
});

export const smartLockCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  deviceId: z.string().uuid().optional(),
  locationId: z.string().uuid(),
  buildingId: z.string().uuid().optional(),
  lockModel: z.string().max(100).optional(),
  lockType: z.enum(["deadbolt", "lever", "padlock", "smart_latch"]),
  connectivity: z.enum(["wifi", "bluetooth", "zigbee", "zwave", "thread"]),
  batteryLevel: z.number().int().min(0).max(100).optional(),
  autoLockEnabled: z.boolean().default(false),
  autoLockDelaySeconds: z.number().int().positive().optional(),
  guestAccessEnabled: z.boolean().default(false),
  activityLogEnabled: z.boolean().default(true),
  firmwareVersion: z.string().max(50).optional(),
  isActive: z.boolean().default(true),
});

export const smartLockUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  deviceId: z.string().uuid().optional(),
  locationId: z.string().uuid().optional(),
  buildingId: z.string().uuid().optional(),
  lockModel: z.string().max(100).optional(),
  lockType: z.enum(["deadbolt", "lever", "padlock", "smart_latch"]).optional(),
  connectivity: z.enum(["wifi", "bluetooth", "zigbee", "zwave", "thread"]).optional(),
  batteryLevel: z.number().int().min(0).max(100).optional(),
  autoLockEnabled: z.boolean().optional(),
  autoLockDelaySeconds: z.number().int().positive().optional(),
  guestAccessEnabled: z.boolean().optional(),
  activityLogEnabled: z.boolean().optional(),
  firmwareVersion: z.string().max(50).optional(),
  isActive: z.boolean().optional(),
});

export const smartCameraCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  deviceId: z.string().uuid().optional(),
  locationId: z.string().uuid(),
  buildingId: z.string().uuid().optional(),
  cameraType: z.enum(["indoor", "outdoor", "ptz", "dome", "bullet", "fisheye", "thermal"]),
  resolution: z.enum(["720p", "1080p", "1440p", "4k"]).default("1080p"),
  frameRate: z.number().int().positive().default(30),
  nightVision: z.boolean().default(false),
  motionDetection: z.boolean().default(true),
  soundDetection: z.boolean().default(false),
  cloudStorage: z.boolean().default(false),
  localStorage: z.boolean().default(true),
  retentionDays: z.number().int().positive().default(30),
  ptzControl: z.boolean().default(false),
  fieldOfViewDegrees: z.number().int().positive().optional(),
  streamUrl: z.string().url().optional(),
  isActive: z.boolean().default(true),
});

export const smartCameraUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  deviceId: z.string().uuid().optional(),
  locationId: z.string().uuid().optional(),
  buildingId: z.string().uuid().optional(),
  cameraType: z.enum(["indoor", "outdoor", "ptz", "dome", "bullet", "fisheye", "thermal"]).optional(),
  resolution: z.enum(["720p", "1080p", "1440p", "4k"]).optional(),
  frameRate: z.number().int().positive().optional(),
  nightVision: z.boolean().optional(),
  motionDetection: z.boolean().optional(),
  soundDetection: z.boolean().optional(),
  cloudStorage: z.boolean().optional(),
  localStorage: z.boolean().optional(),
  retentionDays: z.number().int().positive().optional(),
  ptzControl: z.boolean().optional(),
  fieldOfViewDegrees: z.number().int().positive().optional(),
  streamUrl: z.string().url().optional(),
  isActive: z.boolean().optional(),
});

export const environmentMonitorCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  locationId: z.string().uuid(),
  buildingId: z.string().uuid().optional(),
  monitorType: z.enum(["air_quality", "noise", "vibration", "radiation", "weather", "soil"]),
  parameters: z.array(z.enum(["co2", "pm25", "pm10", "voc", "temperature", "humidity", "noise_db", "light_lux", "wind_speed", "rainfall"])).min(1),
  samplingIntervalSeconds: z.number().int().positive().default(60),
  alertThresholds: z.record(z.string(), z.object({ min: z.number().optional(), max: z.number().optional() })).optional(),
  calibrationDate: z.string().datetime().optional(),
  nextCalibrationDate: z.string().datetime().optional(),
  isActive: z.boolean().default(true),
});

export const environmentMonitorUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  locationId: z.string().uuid().optional(),
  buildingId: z.string().uuid().optional(),
  monitorType: z.enum(["air_quality", "noise", "vibration", "radiation", "weather", "soil"]).optional(),
  parameters: z.array(z.enum(["co2", "pm25", "pm10", "voc", "temperature", "humidity", "noise_db", "light_lux", "wind_speed", "rainfall"])).min(1).optional(),
  samplingIntervalSeconds: z.number().int().positive().optional(),
  alertThresholds: z.record(z.string(), z.object({ min: z.number().optional(), max: z.number().optional() })).optional(),
  calibrationDate: z.string().datetime().optional(),
  nextCalibrationDate: z.string().datetime().optional(),
  isActive: z.boolean().optional(),
});

export const iotAlertCreateSchema = z.object({
  deviceId: z.string().uuid().optional(),
  sensorId: z.string().uuid().optional(),
  alertType: z.enum(["threshold", "offline", "battery_low", "tamper", "error", "custom"]),
  severity: z.enum(["info", "warning", "error", "critical"]),
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(1000),
  metricName: z.string().max(100).optional(),
  metricValue: z.number().optional(),
  thresholdValue: z.number().optional(),
  acknowledgedBy: z.string().uuid().optional(),
  resolvedAt: z.string().datetime().optional(),
  notificationChannels: z.array(z.enum(["email", "sms", "push", "webhook"])).default(["email"]),
  isActive: z.boolean().default(true),
});

export const iotAlertUpdateSchema = z.object({
  deviceId: z.string().uuid().optional(),
  sensorId: z.string().uuid().optional(),
  alertType: z.enum(["threshold", "offline", "battery_low", "tamper", "error", "custom"]).optional(),
  severity: z.enum(["info", "warning", "error", "critical"]).optional(),
  title: z.string().min(1).max(200).optional(),
  message: z.string().min(1).max(1000).optional(),
  metricName: z.string().max(100).optional(),
  metricValue: z.number().optional(),
  thresholdValue: z.number().optional(),
  acknowledgedBy: z.string().uuid().optional(),
  resolvedAt: z.string().datetime().optional(),
  notificationChannels: z.array(z.enum(["email", "sms", "push", "webhook"])).optional(),
  isActive: z.boolean().optional(),
});

export const automationRuleCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  triggerType: z.enum(["sensor", "schedule", "event", "manual"]),
  triggerConfig: z.record(z.string(), z.unknown()),
  conditions: z.array(z.object({ metric: z.string().min(1).max(100), operator: z.enum(["eq", "neq", "gt", "gte", "lt", "lte", "between"]), value: z.number(), valueMax: z.number().optional() })).optional(),
  actions: z.array(z.object({ deviceId: z.string().uuid(), action: z.string().min(1).max(100), params: z.record(z.string(), z.unknown()).optional() })).min(1),
  cooldownMinutes: z.number().int().min(0).default(0),
  priority: z.number().int().min(0).max(10).default(5),
  isActive: z.boolean().default(true),
});

export const automationRuleUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  triggerType: z.enum(["sensor", "schedule", "event", "manual"]).optional(),
  triggerConfig: z.record(z.string(), z.unknown()).optional(),
  conditions: z.array(z.object({ metric: z.string().min(1).max(100), operator: z.enum(["eq", "neq", "gt", "gte", "lt", "lte", "between"]), value: z.number(), valueMax: z.number().optional() })).optional(),
  actions: z.array(z.object({ deviceId: z.string().uuid(), action: z.string().min(1).max(100), params: z.record(z.string(), z.unknown()).optional() })).min(1).optional(),
  cooldownMinutes: z.number().int().min(0).optional(),
  priority: z.number().int().min(0).max(10).optional(),
  isActive: z.boolean().optional(),
});

export const calibrationCreateSchema = z.object({
  deviceId: z.string().uuid().optional(),
  sensorId: z.string().uuid().optional(),
  calibrationType: z.enum(["full", "partial", "verification", "zero_span"]),
  calibratedBy: z.string().uuid(),
  calibratedAt: z.string().datetime(),
  nextCalibrationDate: z.string().datetime().optional(),
  referenceValues: z.array(z.object({ parameter: z.string().min(1).max(100), expectedValue: z.number(), actualValue: z.number(), unit: z.string().max(20).optional() })).min(1),
  passStatus: z.enum(["pass", "fail", "conditional"]),
  certificateUrl: z.string().url().optional(),
  notes: z.string().max(1000).optional(),
});

export const firmwareCreateSchema = z.object({
  deviceId: z.string().uuid(),
  version: z.string().min(1).max(50),
  previousVersion: z.string().max(50).optional(),
  releaseNotes: z.string().max(2000).optional(),
  downloadUrl: z.string().url(),
  fileSizeBytes: z.number().int().positive().optional(),
  checksum: z.string().max(200).optional(),
  checksumType: z.enum(["md5", "sha1", "sha256"]).optional(),
  isRollback: z.boolean().default(false),
  isCritical: z.boolean().default(false),
  scheduledAt: z.string().datetime().optional(),
  status: z.enum(["pending", "downloading", "installing", "completed", "failed", "rolled_back"]).default("pending"),
});

export const networkConfigCreateSchema = z.object({
  deviceId: z.string().uuid(),
  configType: z.enum(["wifi", "ethernet", "cellular", "bluetooth", "zigbee"]),
  ssid: z.string().max(100).optional(),
  ipAddress: z.string().ip().optional(),
  subnetMask: z.string().ip().optional(),
  gateway: z.string().ip().optional(),
  dnsServers: z.array(z.string().ip()).optional(),
  macAddress: z.string().max(17).optional(),
  dhcpEnabled: z.boolean().default(true),
  staticIp: z.string().ip().optional(),
  port: z.number().int().positive().optional(),
  proxyUrl: z.string().url().optional(),
  mqttBrokerUrl: z.string().url().optional(),
  mqttTopic: z.string().max(200).optional(),
  isActive: z.boolean().default(true),
});

export const dataAggregationCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  sensorIds: z.array(z.string().uuid()).min(1),
  aggregationType: z.enum(["avg", "min", "max", "sum", "count", "median"]),
  aggregationField: z.string().min(1).max(100),
  intervalMinutes: z.number().int().positive().default(60),
  retentionDays: z.number().int().positive().default(365),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  isActive: z.boolean().default(true),
});

export const iotDashboardSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  layout: z.array(z.object({ widgetId: z.string().uuid(), widgetType: z.enum(["chart", "gauge", "table", "map", "alert", "kpi"]), title: z.string().min(1).max(200), config: z.record(z.string(), z.unknown()), x: z.number().int().min(0), y: z.number().int().min(0), width: z.number().int().positive(), height: z.number().int().positive() })).min(1),
  refreshIntervalSeconds: z.number().int().positive().default(30),
  isDefault: z.boolean().default(false),
  sharedWith: z.array(z.string().uuid()).optional(),
  tags: z.array(z.string().max(50)).max(10).optional(),
});

export const iotConfigSchema = z.object({
  globalSamplingRateMs: z.number().int().positive().default(1000),
  dataRetentionDays: z.number().int().positive().default(365),
  alertTimeoutSeconds: z.number().int().positive().default(30),
  mqttBrokerUrl: z.string().url().optional(),
  mqttPort: z.number().int().positive().default(1883),
  enableEncryption: z.boolean().default(true),
  enableCompression: z.boolean().default(false),
  maxPayloadSizeBytes: z.number().int().positive().default(1048576),
  retryAttempts: z.number().int().positive().default(3),
  retryDelayMs: z.number().int().positive().default(1000),
  heartbeatIntervalSeconds: z.number().int().positive().default(60),
  offlineQueueSize: z.number().int().positive().default(1000),
  enableAutoDiscovery: z.boolean().default(false),
  timezone: z.string().max(50).default("UTC"),
});

export const iotSearchSchema = z.object({
  query: z.string().min(1).max(200),
  modules: z.array(z.enum(["devices", "sensors", "cameras", "locks", "alerts", "automation", "monitors"])).optional(),
  deviceType: z.enum(["sensor", "actuator", "gateway", "controller", "camera", "lock", "meter", "beacon"]).optional(),
  status: z.enum(["active", "inactive", "maintenance", "offline", "error"]).optional(),
  locationId: z.string().uuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
});

export const iotBulkUpdateSchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(100),
  updates: z.object({
    status: z.enum(["active", "inactive", "maintenance", "offline", "error"]).optional(),
    locationId: z.string().uuid().optional(),
    tags: z.array(z.string().max(50)).max(20).optional(),
    firmwareVersion: z.string().max(50).optional(),
  }),
});

export const iotBulkDeleteSchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(100),
  reason: z.string().max(500).optional(),
  forceDelete: z.boolean().default(false),
});

export const iotExportSchema = z.object({
  format: z.enum(["csv", "xlsx", "pdf"]).default("csv"),
  modules: z.array(z.enum(["devices", "sensors", "cameras", "locks", "alerts", "automation", "monitors"])).min(1),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  fields: z.array(z.string()).optional(),
});

export const iotImportSchema = z.object({
  fileUrl: z.string().url(),
  format: z.enum(["csv", "xlsx"]),
  module: z.enum(["devices", "sensors", "cameras", "locks", "monitors"]),
  overwrite: z.boolean().default(false),
  skipErrors: z.boolean().default(false),
});

export const iotSettingsSchema = z.object({
  autoDiscoveryEnabled: z.boolean().default(false),
  heartbeatTimeoutSeconds: z.number().int().positive().default(120),
  alertSuppressionMinutes: z.number().int().min(0).default(0),
  enableDataCompression: z.boolean().default(false),
  maxConcurrentConnections: z.number().int().positive().default(100),
  defaultAlertSeverity: z.enum(["info", "warning", "error", "critical"]).default("warning"),
  enableAuditLog: z.boolean().default(true),
  dataRetentionDays: z.number().int().positive().default(365),
  notificationEmails: z.array(z.string().email()).optional(),
  webhookUrl: z.string().url().optional(),
  webhookSecret: z.string().max(200).optional(),
  enableFirmwareAutoUpdate: z.boolean().default(false),
  maintenanceWindowStart: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  maintenanceWindowEnd: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  timezone: z.string().max(50).default("UTC"),
});

export const iotAccessibilitySchema = z.object({
  voiceControlEnabled: z.boolean().default(false),
  screenReaderCompatible: z.boolean().default(false),
  highContrastMode: z.boolean().default(false),
  audioAlerts: z.boolean().default(false),
  visualAlerts: z.boolean().default(false),
  hapticFeedback: z.boolean().default(false),
  largeText: z.boolean().default(false),
  colorBlindMode: z.boolean().default(false),
  accessibilityNotes: z.string().max(500).optional(),
});

export const iotLocalizationSchema = z.object({
  preferredLanguage: z.string().min(2).max(5).default("en"),
  timeZone: z.string().max(50).default("UTC"),
  dateFormat: z.string().max(20).default("YYYY-MM-DD"),
  timeFormat: z.enum(["12h", "24h"]).default("24h"),
  temperatureUnit: z.enum(["celsius", "fahrenheit"]).default("celsius"),
  distanceUnit: z.enum(["metric", "imperial"]).default("metric"),
  pressureUnit: z.enum(["hpa", "mmhg", "psi"]).default("hpa"),
  currency: z.string().min(3).max(3).default("USD"),
});

export const iotMetadataSchema = z.object({
  tags: z.array(z.string().max(50)).max(20).optional(),
  customFields: z.record(z.string(), z.unknown()).optional(),
  source: z.enum(["web", "mobile", "api", "auto_discovery", "manual"]).default("web"),
  lastModifiedBy: z.string().uuid().optional(),
  version: z.string().max(50).optional(),
  imageUrls: z.array(z.string().url()).max(10).optional(),
  documentUrls: z.array(z.string().url()).max(20).optional(),
});

export const iotPricingSchema = z.object({
  deviceId: z.string().uuid(),
  purchasePrice: z.number().min(0).optional(),
  monthlyServiceFee: z.number().min(0).optional(),
  installationFee: z.number().min(0).optional(),
  maintenanceFee: z.number().min(0).optional(),
  currency: z.string().min(3).max(3).default("USD"),
  warrantyCost: z.number().min(0).optional(),
  replacementCost: z.number().min(0).optional(),
  notes: z.string().max(500).optional(),
});

export const iotBundleSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  deviceIds: z.array(z.string().uuid()).min(2),
  bundleType: z.enum(["sensor_pack", "security_suite", "automation_kit", "monitoring_pack"]),
  locationId: z.string().uuid().optional(),
  totalValue: z.number().min(0).optional(),
  discountPercentage: z.number().min(0).max(100).optional(),
  isActive: z.boolean().default(true),
});

export const iotSubscriptionSchema = z.object({
  deviceId: z.string().uuid(),
  provider: z.string().min(1).max(200),
  subscriptionType: z.enum(["monthly", "quarterly", "annual", "perpetual"]),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  cost: z.number().min(0),
  currency: z.string().min(3).max(3).default("USD"),
  autoRenew: z.boolean().default(false),
  features: z.array(z.string().max(100)).optional(),
  maxDataPoints: z.number().int().positive().optional(),
  supportLevel: z.enum(["basic", "standard", "premium"]).default("standard"),
});

export const iotVersionSchema = z.object({
  deviceId: z.string().uuid(),
  versionNumber: z.string().min(1).max(50),
  releaseDate: z.string().datetime(),
  changelog: z.string().max(2000).optional(),
  isCurrent: z.boolean().default(true),
  downloadUrl: z.string().url().optional(),
  compatibility: z.string().max(500).optional(),
  breakingChanges: z.boolean().default(false),
  minHardwareVersion: z.string().max(50).optional(),
});

export const iotArchiveSchema = z.object({
  deviceIds: z.array(z.string().uuid()).min(1).max(100),
  reason: z.string().min(1).max(500),
  archiveDate: z.string().datetime(),
  retainForYears: z.number().int().positive().default(5),
  includeData: z.boolean().default(true),
  notes: z.string().max(1000).optional(),
});

export const iotRestoreSchema = z.object({
  deviceIds: z.array(z.string().uuid()).min(1).max(100),
  reason: z.string().min(1).max(500),
  restoreToStatus: z.enum(["active", "inactive", "maintenance"]).default("active"),
  includeData: z.boolean().default(true),
  notes: z.string().max(1000).optional(),
});

export const iotReportSchema = z.object({
  reportType: z.enum(["device_status", "energy_usage", "alert_summary", "maintenance_schedule", "network_health", "data_quality", "custom"]),
  dateFrom: z.string().datetime(),
  dateTo: z.string().datetime(),
  modules: z.array(z.enum(["devices", "sensors", "cameras", "locks", "alerts", "automation", "monitors"])).optional(),
  groupBy: z.enum(["day", "week", "month", "device_type", "location", "building"]).optional(),
  includeCharts: z.boolean().default(false),
  format: z.enum(["pdf", "xlsx", "csv"]).default("pdf"),
});

export const iotAnalyticsSchema = z.object({
  dateFrom: z.string().datetime(),
  dateTo: z.string().datetime(),
  metrics: z.array(z.enum(["deviceUptime", "alertCount", "energyConsumption", "dataPointsCollected", "networkLatency", "firmwareCompliance", "sensorAccuracy", "averageResponseTime"])).min(1),
  granularity: z.enum(["hourly", "daily", "weekly", "monthly"]).default("daily"),
  deviceIds: z.array(z.string().uuid()).optional(),
  locationIds: z.array(z.string().uuid()).optional(),
});

export const iotBookmarkSchema = z.object({
  name: z.string().min(1).max(200),
  entityType: z.enum(["device", "sensor", "camera", "alert", "automation_rule", "dashboard"]),
  entityId: z.string().uuid(),
  notes: z.string().max(500).optional(),
  tags: z.array(z.string().max(50)).max(10).optional(),
});

export const iotFavoriteSchema = z.object({
  entityType: z.enum(["device", "sensor", "camera", "alert", "automation_rule", "dashboard"]),
  entityId: z.string().uuid(),
  sortOrder: z.number().int().min(0).default(0),
  notes: z.string().max(500).optional(),
});

export const iotFeedbackSchema = z.object({
  entityType: z.enum(["device", "sensor", "camera", "alert", "automation_rule", "dashboard"]),
  entityId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  category: z.enum(["usability", "reliability", "performance", "accuracy", "other"]),
  comment: z.string().max(2000).optional(),
  includeLogs: z.boolean().default(false),
});

// ──────────────────────────────────────────────────────────────
// ROOMS
// ──────────────────────────────────────────────────────────────

export const smartRoomCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  roomNumber: z.string().max(50),
  floor: z.number().int(),
  buildingId: z.string().uuid(),
  wing: z.string().max(50).optional(),
  roomType: z.enum(["classroom", "laboratory", "office", "meeting", "auditorium", "library", "common", "storage", "other"]),
  capacity: z.number().int().positive(),
  areaSqMeters: z.number().positive().optional(),
  status: z.enum(["available", "occupied", "maintenance", "reserved", "out_of_service"]).default("available"),
  features: z.array(z.enum(["projector", "whiteboard", "video_conference", "air_conditioning", "heating", "natural_light", "soundproofing", "smart_board", "recording"])).optional(),
  accessLevel: z.enum(["public", "restricted", "private"]).default("public"),
  tags: z.array(z.string().max(50)).max(20).optional(),
});

export const smartRoomUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  roomNumber: z.string().max(50).optional(),
  floor: z.number().int().optional(),
  buildingId: z.string().uuid().optional(),
  wing: z.string().max(50).optional(),
  roomType: z.enum(["classroom", "laboratory", "office", "meeting", "auditorium", "library", "common", "storage", "other"]).optional(),
  capacity: z.number().int().positive().optional(),
  areaSqMeters: z.number().positive().optional(),
  status: z.enum(["available", "occupied", "maintenance", "reserved", "out_of_service"]).optional(),
  features: z.array(z.enum(["projector", "whiteboard", "video_conference", "air_conditioning", "heating", "natural_light", "soundproofing", "smart_board", "recording"])).optional(),
  accessLevel: z.enum(["public", "restricted", "private"]).optional(),
  tags: z.array(z.string().max(50)).max(20).optional(),
});

export const smartRoomQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(["name", "roomNumber", "floor", "capacity", "status", "createdAt"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const smartRoomFilterSchema = z.object({
  status: z.enum(["available", "occupied", "maintenance", "reserved", "out_of_service"]).optional(),
  roomType: z.enum(["classroom", "laboratory", "office", "meeting", "auditorium", "library", "common", "storage", "other"]).optional(),
  buildingId: z.string().uuid().optional(),
  floor: z.number().int().optional(),
  minCapacity: z.number().int().positive().optional(),
  maxCapacity: z.number().int().positive().optional(),
  features: z.array(z.enum(["projector", "whiteboard", "video_conference", "air_conditioning", "heating", "natural_light", "soundproofing", "smart_board", "recording"])).optional(),
  accessLevel: z.enum(["public", "restricted", "private"]).optional(),
  search: z.string().max(200).optional(),
});

export const roomCapacityCreateSchema = z.object({
  roomId: z.string().uuid(),
  maxCapacity: z.number().int().positive(),
  effectiveCapacity: z.number().int().positive().optional(),
  standingCapacity: z.number().int().positive().optional(),
  wheelchairCapacity: z.number().int().positive().optional(),
  lastUpdated: z.string().datetime().optional(),
  notes: z.string().max(500).optional(),
});

export const roomReservationCreateSchema = z.object({
  roomId: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  organizerId: z.string().uuid(),
  startDateTime: z.string().datetime(),
  endDateTime: z.string().datetime(),
  attendees: z.array(z.string().uuid()).optional(),
  isRecurring: z.boolean().default(false),
  recurrenceRule: z.string().max(200).optional(),
  recurrenceEnd: z.string().datetime().optional(),
  recurringId: z.string().uuid().optional(),
  requiredEquipment: z.array(z.enum(["projector", "whiteboard", "video_conference", "recording", "microphone"])).optional(),
  cateringRequired: z.boolean().default(false),
  cateringNotes: z.string().max(500).optional(),
  expectedAttendees: z.number().int().positive().optional(),
  notes: z.string().max(1000).optional(),
});

export const roomReservationUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  startDateTime: z.string().datetime().optional(),
  endDateTime: z.string().datetime().optional(),
  attendees: z.array(z.string().uuid()).optional(),
  requiredEquipment: z.array(z.enum(["projector", "whiteboard", "video_conference", "recording", "microphone"])).optional(),
  cateringRequired: z.boolean().optional(),
  cateringNotes: z.string().max(500).optional(),
  expectedAttendees: z.number().int().positive().optional(),
  status: z.enum(["confirmed", "pending", "cancelled", "completed"]).optional(),
  notes: z.string().max(1000).optional(),
});

export const roomAvailabilityCreateSchema = z.object({
  roomId: z.string().uuid(),
  dayOfWeek: z.enum(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endTime: z.string().regex(/^\d{2}:\d{2}$/),
  isAvailable: z.boolean().default(true),
  reason: z.string().max(200).optional(),
  validFrom: z.string().datetime().optional(),
  validUntil: z.string().datetime().optional(),
});

export const roomEquipmentCreateSchema = z.object({
  roomId: z.string().uuid(),
  equipmentType: z.enum(["projector", "screen", "whiteboard", "smart_board", "video_conference", "microphone", "speaker", "camera", "recording_system", "ac_unit", "heater", "blinds", "lighting"]),
  name: z.string().min(1).max(200),
  description: z.string().max(500).optional(),
  brand: z.string().max(100).optional(),
  model: z.string().max(100).optional(),
  serialNumber: z.string().max(100).optional(),
  installDate: z.string().datetime().optional(),
  warrantyExpiry: z.string().datetime().optional(),
  status: z.enum(["operational", "maintenance", "out_of_service"]).default("operational"),
  notes: z.string().max(500).optional(),
});

export const roomEquipmentUpdateSchema = z.object({
  equipmentType: z.enum(["projector", "screen", "whiteboard", "smart_board", "video_conference", "microphone", "speaker", "camera", "recording_system", "ac_unit", "heater", "blinds", "lighting"]).optional(),
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(500).optional(),
  brand: z.string().max(100).optional(),
  model: z.string().max(100).optional(),
  serialNumber: z.string().max(100).optional(),
  installDate: z.string().datetime().optional(),
  warrantyExpiry: z.string().datetime().optional(),
  status: z.enum(["operational", "maintenance", "out_of_service"]).optional(),
  notes: z.string().max(500).optional(),
});

export const roomSchedulingCreateSchema = z.object({
  roomId: z.string().uuid(),
  scheduleType: z.enum(["academic", "meeting", "event", "maintenance", "blocked"]),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  timeSlot: z.object({ startTime: z.string().regex(/^\d{2}:\d{2}$/), endTime: z.string().regex(/^\d{2}:\d{2}$/) }),
  repeatPattern: z.enum(["none", "daily", "weekly", "biweekly", "monthly"]).default("none"),
  repeatEnd: z.string().datetime().optional(),
  priority: z.number().int().min(0).max(10).default(5),
  isActive: z.boolean().default(true),
});

export const roomSchedulingUpdateSchema = z.object({
  scheduleType: z.enum(["academic", "meeting", "event", "maintenance", "blocked"]).optional(),
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  timeSlot: z.object({ startTime: z.string().regex(/^\d{2}:\d{2}$/), endTime: z.string().regex(/^\d{2}:\d{2}$/) }).optional(),
  repeatPattern: z.enum(["none", "daily", "weekly", "biweekly", "monthly"]).optional(),
  repeatEnd: z.string().datetime().optional(),
  priority: z.number().int().min(0).max(10).optional(),
  isActive: z.boolean().optional(),
});

export const roomOccupancyCreateSchema = z.object({
  roomId: z.string().uuid(),
  currentCount: z.number().int().min(0),
  maxCapacity: z.number().int().positive(),
  occupancyPercentage: z.number().min(0).max(100).optional(),
  timestamp: z.string().datetime(),
  sensorId: z.string().uuid().optional(),
  zone: z.string().max(50).optional(),
  notes: z.string().max(500).optional(),
});

export const roomUsageCreateSchema = z.object({
  roomId: z.string().uuid(),
  date: z.string().datetime(),
  totalHoursUsed: z.number().min(0),
  totalReservations: z.number().int().min(0),
  totalAttendees: z.number().int().min(0),
  averageOccupancy: z.number().min(0).max(100),
  peakHour: z.number().int().min(0).max(23),
  energyConsumedKwh: z.number().min(0).optional(),
  notes: z.string().max(500).optional(),
});

export const roomBookingCreateSchema = z.object({
  roomId: z.string().uuid(),
  bookerId: z.string().uuid(),
  purpose: z.string().min(1).max(200),
  startDateTime: z.string().datetime(),
  endDateTime: z.string().datetime(),
  attendeeCount: z.number().int().positive(),
  equipmentNeeded: z.array(z.enum(["projector", "whiteboard", "video_conference", "recording", "microphone"])).optional(),
  notes: z.string().max(1000).optional(),
  approvalRequired: z.boolean().default(false),
  approverId: z.string().uuid().optional(),
});

export const roomMaintenanceCreateSchema = z.object({
  roomId: z.string().uuid(),
  maintenanceType: z.enum(["cleaning", "repair", "inspection", "upgrade", "renovation"]),
  description: z.string().min(1).max(1000),
  scheduledDate: z.string().datetime(),
  estimatedDurationHours: z.number().positive().optional(),
  assignedToId: z.string().uuid().optional(),
  cost: z.number().min(0).optional(),
  status: z.enum(["scheduled", "in_progress", "completed", "cancelled"]).default("scheduled"),
  affectsAvailability: z.boolean().default(true),
  notes: z.string().max(1000).optional(),
});

export const roomFeatureCreateSchema = z.object({
  roomId: z.string().uuid(),
  featureType: z.enum(["acoustic_treatment", "climate_control", "lighting_system", "security_system", "access_control", "av_system", "network_infrastructure", "furniture"]),
  name: z.string().min(1).max(200),
  description: z.string().max(500).optional(),
  installDate: z.string().datetime().optional(),
  lastMaintenanceDate: z.string().datetime().optional(),
  nextMaintenanceDate: z.string().datetime().optional(),
  status: z.enum(["operational", "maintenance", "out_of_service"]).default("operational"),
  notes: z.string().max(500).optional(),
});

export const roomLayoutCreateSchema = z.object({
  roomId: z.string().uuid(),
  layoutType: z.enum(["theater", "classroom", "boardroom", "u_shape", "pod", "hollow_square", "banquet", "custom"]),
  maxCapacity: z.number().int().positive(),
  dimensions: z.object({ width: z.number().positive(), length: z.number().positive(), height: z.number().positive().optional() }).optional(),
  layoutImageUrl: z.string().url().optional(),
  notes: z.string().max(500).optional(),
  isDefault: z.boolean().default(false),
});

export const roomDisplayCreateSchema = z.object({
  roomId: z.string().uuid(),
  displayType: z.enum(["outside_panel", "info_kiosk", "digital_signage", "booking_display"]),
  deviceName: z.string().min(1).max(200),
  ipAddress: z.string().ip().optional(),
  resolution: z.string().max(50).optional(),
  orientation: z.enum(["landscape", "portrait"]).default("landscape"),
  showCurrentEvent: z.boolean().default(true),
  showUpcomingEvents: z.boolean().default(true),
  showOccupancy: z.boolean().default(false),
  refreshIntervalSeconds: z.number().int().positive().default(30),
  isActive: z.boolean().default(true),
});

export const roomSensorCreateSchema = z.object({
  roomId: z.string().uuid(),
  sensorType: z.enum(["occupancy", "temperature", "humidity", "co2", "light", "noise", "air_quality"]),
  sensorName: z.string().min(1).max(200),
  deviceId: z.string().uuid().optional(),
  zone: z.string().max(50).optional(),
  thresholdMin: z.number().optional(),
  thresholdMax: z.number().optional(),
  alertEnabled: z.boolean().default(true),
  calibrationDate: z.string().datetime().optional(),
  nextCalibrationDate: z.string().datetime().optional(),
  isActive: z.boolean().default(true),
});

export const roomEnvironmentCreateSchema = z.object({
  roomId: z.string().uuid(),
  temperatureCelsius: z.number().min(-50).max(60).optional(),
  humidityPercent: z.number().min(0).max(100).optional(),
  co2Ppm: z.number().min(0).optional(),
  noiseDb: z.number().min(0).optional(),
  lightLux: z.number().min(0).optional(),
  airQualityIndex: z.number().int().min(0).max(500).optional(),
  timestamp: z.string().datetime(),
  sensorId: z.string().uuid().optional(),
  notes: z.string().max(500).optional(),
});

export const roomConfigSchema = z.object({
  defaultBookingDurationMinutes: z.number().int().positive().default(60),
  maxBookingDurationMinutes: z.number().int().positive().default(480),
  advanceBookingDays: z.number().int().positive().default(30),
  cancellationPolicyHours: z.number().int().positive().default(24),
  autoReleaseMinutes: z.number().int().positive().default(15),
  requireApprovalAboveCapacity: z.number().int().positive().default(20),
  enableAutoCheckIn: z.boolean().default(false),
  autoCheckInWindowMinutes: z.number().int().positive().default(10),
  enableRecurringBookings: z.boolean().default(true),
  maxRecurringWeeks: z.number().int().positive().default(16),
  notificationEmails: z.array(z.string().email()).optional(),
  enableWaitlist: z.boolean().default(false),
  maxWaitlistSize: z.number().int().positive().default(10),
});

export const roomSearchSchema = z.object({
  query: z.string().min(1).max(200),
  modules: z.array(z.enum(["rooms", "reservations", "equipment", "schedules", "sensors"])).optional(),
  roomType: z.enum(["classroom", "laboratory", "office", "meeting", "auditorium", "library", "common", "storage", "other"]).optional(),
  buildingId: z.string().uuid().optional(),
  minCapacity: z.number().int().positive().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
});

export const roomBulkUpdateSchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(100),
  updates: z.object({
    status: z.enum(["available", "occupied", "maintenance", "reserved", "out_of_service"]).optional(),
    accessLevel: z.enum(["public", "restricted", "private"]).optional(),
    features: z.array(z.enum(["projector", "whiteboard", "video_conference", "air_conditioning", "heating", "natural_light", "soundproofing", "smart_board", "recording"])).optional(),
    tags: z.array(z.string().max(50)).max(20).optional(),
  }),
});

export const roomBulkDeleteSchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(100),
  reason: z.string().max(500).optional(),
  cancelReservations: z.boolean().default(false),
});

export const roomExportSchema = z.object({
  format: z.enum(["csv", "xlsx", "pdf"]).default("csv"),
  modules: z.array(z.enum(["rooms", "reservations", "equipment", "schedules", "occupancy"])).min(1),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  fields: z.array(z.string()).optional(),
});

export const roomImportSchema = z.object({
  fileUrl: z.string().url(),
  format: z.enum(["csv", "xlsx"]),
  module: z.enum(["rooms", "equipment", "schedules"]),
  overwrite: z.boolean().default(false),
  buildingId: z.string().uuid().optional(),
});

export const roomSettingsSchema = z.object({
  defaultTimezone: z.string().max(50).default("UTC"),
  workingHoursStart: z.string().regex(/^\d{2}:\d{2}$/).default("08:00"),
  workingHoursEnd: z.string().regex(/^\d{2}:\d{2}$/).default("18:00"),
  enableAutoRelease: z.boolean().default(true),
  autoReleaseMinutes: z.number().int().positive().default(15),
  showOccupancyOnDisplay: z.boolean().default(true),
  enableRoomRatings: z.boolean().default(false),
  requireReasonForBooking: z.boolean().default(false),
  allowDoubleBooking: z.boolean().default(false),
  maxAdvanceBookingDays: z.number().int().positive().default(30),
  notificationEmails: z.array(z.string().email()).optional(),
  maintenanceWindowStart: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  maintenanceWindowEnd: z.string().regex(/^\d{2}:\d{2}$/).optional(),
});

export const roomAccessibilitySchema = z.object({
  wheelchairAccessible: z.boolean().default(false),
  elevatorAccess: z.boolean().default(false),
  accessibleParking: z.boolean().default(false),
  accessibleRestroom: z.boolean().default(false),
  hearingLoop: z.boolean().default(false),
  visualAlarms: z.boolean().default(false),
  brailleSignage: z.boolean().default(false),
  adjustableDesks: z.boolean().default(false),
  wideDoorways: z.boolean().default(false),
  rampAccess: z.boolean().default(false),
  accessibilityNotes: z.string().max(500).optional(),
});

export const roomLocalizationSchema = z.object({
  preferredLanguage: z.string().min(2).max(5).default("en"),
  timeZone: z.string().max(50).default("UTC"),
  dateFormat: z.string().max(20).default("YYYY-MM-DD"),
  timeFormat: z.enum(["12h", "24h"]).default("24h"),
  currency: z.string().min(3).max(3).default("USD"),
  temperatureUnit: z.enum(["celsius", "fahrenheit"]).default("celsius"),
  measurementUnit: z.enum(["metric", "imperial"]).default("metric"),
});

export const roomMetadataSchema = z.object({
  tags: z.array(z.string().max(50)).max(20).optional(),
  customFields: z.record(z.string(), z.unknown()).optional(),
  source: z.enum(["web", "mobile", "api", "import", "manual"]).default("web"),
  lastModifiedBy: z.string().uuid().optional(),
  imageUrls: z.array(z.string().url()).max(10).optional(),
  floorPlanUrls: z.array(z.string().url()).max(5).optional(),
  documentUrls: z.array(z.string().url()).max(20).optional(),
});

export const roomPricingSchema = z.object({
  roomId: z.string().uuid(),
  hourlyRate: z.number().min(0).optional(),
  dailyRate: z.number().min(0).optional(),
  weeklyRate: z.number().min(0).optional(),
  monthlyRate: z.number().min(0).optional(),
  currency: z.string().min(3).max(3).default("USD"),
  weekendMultiplier: z.number().min(1).default(1),
  holidayMultiplier: z.number().min(1).default(1),
  includesEquipment: z.boolean().default(false),
  depositRequired: z.boolean().default(false),
  depositAmount: z.number().min(0).optional(),
  notes: z.string().max(500).optional(),
});

export const roomBundleSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  roomIds: z.array(z.string().uuid()).min(2),
  bundleType: z.enum(["floor", "wing", "building", "custom"]),
  discountPercentage: z.number().min(0).max(100).optional(),
  validFrom: z.string().datetime(),
  validUntil: z.string().datetime().optional(),
  isActive: z.boolean().default(true),
});

export const roomSubscriptionSchema = z.object({
  roomId: z.string().uuid(),
  subscriberId: z.string().uuid(),
  subscriptionType: z.enum(["hourly", "daily", "weekly", "monthly", "annual"]),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  cost: z.number().min(0),
  currency: z.string().min(3).max(3).default("USD"),
  autoRenew: z.boolean().default(false),
  hoursPerWeek: z.number().int().positive().optional(),
  priorityBooking: z.boolean().default(false),
  cancellationPolicy: z.enum(["flexible", "moderate", "strict"]).default("moderate"),
});

export const roomVersionSchema = z.object({
  roomId: z.string().uuid(),
  versionNumber: z.string().min(1).max(50),
  releaseDate: z.string().datetime(),
  changelog: z.string().max(2000).optional(),
  isCurrent: z.boolean().default(true),
  compatibility: z.string().max(500).optional(),
  breakingChanges: z.boolean().default(false),
});

export const roomArchiveSchema = z.object({
  roomIds: z.array(z.string().uuid()).min(1).max(100),
  reason: z.string().min(1).max(500),
  archiveDate: z.string().datetime(),
  retainForYears: z.number().int().positive().default(7),
  cancelExistingReservations: z.boolean().default(false),
  notes: z.string().max(1000).optional(),
});

export const roomRestoreSchema = z.object({
  roomIds: z.array(z.string().uuid()).min(1).max(100),
  reason: z.string().min(1).max(500),
  restoreToStatus: z.enum(["available", "maintenance", "reserved"]).default("available"),
  notes: z.string().max(1000).optional(),
});

export const roomReportSchema = z.object({
  reportType: z.enum(["occupancy", "revenue", "utilization", "maintenance", "reservation_summary", "energy_usage", "custom"]),
  dateFrom: z.string().datetime(),
  dateTo: z.string().datetime(),
  roomIds: z.array(z.string().uuid()).optional(),
  buildingIds: z.array(z.string().uuid()).optional(),
  groupBy: z.enum(["day", "week", "month", "room_type", "building", "floor"]).optional(),
  includeCharts: z.boolean().default(false),
  format: z.enum(["pdf", "xlsx", "csv"]).default("pdf"),
});

export const roomAnalyticsSchema = z.object({
  dateFrom: z.string().datetime(),
  dateTo: z.string().datetime(),
  metrics: z.array(z.enum(["totalReservations", "averageOccupancy", "peakHours", "revenue", "utilizationRate", "noShowRate", "averageDuration", "topRooms", "cancellationRate"])).min(1),
  granularity: z.enum(["hourly", "daily", "weekly", "monthly"]).default("daily"),
  roomIds: z.array(z.string().uuid()).optional(),
  buildingIds: z.array(z.string().uuid()).optional(),
});

export const roomBookmarkSchema = z.object({
  name: z.string().min(1).max(200),
  entityType: z.enum(["room", "reservation", "equipment", "schedule"]),
  entityId: z.string().uuid(),
  notes: z.string().max(500).optional(),
  tags: z.array(z.string().max(50)).max(10).optional(),
});

// ──────────────────────────────────────────────────────────────
// SECURITY
// ──────────────────────────────────────────────────────────────

export const emergencyPlanCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  planType: z.enum(["fire", "earthquake", "lockdown", "evacuation", "medical", "weather", "bomb_threat", "active_threat", "chemical", "general"]),
  priority: z.enum(["low", "medium", "high", "critical"]).default("medium"),
  buildingIds: z.array(z.string().uuid()).min(1),
  floorNumbers: z.array(z.number().int()).optional(),
  activationCriteria: z.string().max(1000).optional(),
  responseSteps: z.array(z.object({ stepNumber: z.number().int().positive(), action: z.string().min(1).max(500), responsibleRole: z.string().max(100).optional(), timeLimitMinutes: z.number().int().positive().optional() })).min(1),
  contactRoles: z.array(z.enum(["safety_officer", "building_manager", "security_lead", "medical_response", "communications"])).min(1),
  effectiveDate: z.string().datetime(),
  reviewDate: z.string().datetime(),
  approvedBy: z.string().uuid().optional(),
  documentUrl: z.string().url().optional(),
  status: z.enum(["draft", "active", "archived", "under_review"]).default("draft"),
});

export const emergencyPlanUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(2000).optional(),
  planType: z.enum(["fire", "earthquake", "lockdown", "evacuation", "medical", "weather", "bomb_threat", "active_threat", "chemical", "general"]).optional(),
  priority: z.enum(["low", "medium", "high", "critical"]).optional(),
  buildingIds: z.array(z.string().uuid()).min(1).optional(),
  floorNumbers: z.array(z.number().int()).optional(),
  activationCriteria: z.string().max(1000).optional(),
  responseSteps: z.array(z.object({ stepNumber: z.number().int().positive(), action: z.string().min(1).max(500), responsibleRole: z.string().max(100).optional(), timeLimitMinutes: z.number().int().positive().optional() })).min(1).optional(),
  contactRoles: z.array(z.enum(["safety_officer", "building_manager", "security_lead", "medical_response", "communications"])).min(1).optional(),
  effectiveDate: z.string().datetime().optional(),
  reviewDate: z.string().datetime().optional(),
  approvedBy: z.string().uuid().optional(),
  documentUrl: z.string().url().optional(),
  status: z.enum(["draft", "active", "archived", "under_review"]).optional(),
});

export const emergencyPlanQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(["name", "createdAt", "effectiveDate", "reviewDate", "priority"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const emergencyPlanFilterSchema = z.object({
  status: z.enum(["draft", "active", "archived", "under_review"]).optional(),
  planType: z.enum(["fire", "earthquake", "lockdown", "evacuation", "medical", "weather", "bomb_threat", "active_threat", "chemical", "general"]).optional(),
  priority: z.enum(["low", "medium", "high", "critical"]).optional(),
  buildingId: z.string().uuid().optional(),
  reviewDateFrom: z.string().datetime().optional(),
  reviewDateTo: z.string().datetime().optional(),
  search: z.string().max(200).optional(),
});

export const evacuationCreateSchema = z.object({
  emergencyPlanId: z.string().uuid(),
  buildingId: z.string().uuid(),
  floorNumbers: z.array(z.number().int()).optional(),
  evacuationType: z.enum(["full", "partial", "floor", "zone"]),
  reason: z.string().min(1).max(500),
  initiatedBy: z.string().uuid(),
  initiatedAt: z.string().datetime(),
  assemblyPointIds: z.array(z.string().uuid()).min(1),
  estimatedOccupants: z.number().int().positive(),
  actualEvacuated: z.number().int().min(0).optional(),
  status: z.enum(["initiated", "in_progress", "completed", "cancelled"]).default("initiated"),
  notes: z.string().max(1000).optional(),
});

export const evacuationUpdateSchema = z.object({
  emergencyPlanId: z.string().uuid().optional(),
  buildingId: z.string().uuid().optional(),
  floorNumbers: z.array(z.number().int()).optional(),
  evacuationType: z.enum(["full", "partial", "floor", "zone"]).optional(),
  reason: z.string().min(1).max(500).optional(),
  assemblyPointIds: z.array(z.string().uuid()).min(1).optional(),
  estimatedOccupants: z.number().int().positive().optional(),
  actualEvacuated: z.number().int().min(0).optional(),
  status: z.enum(["initiated", "in_progress", "completed", "cancelled"]).optional(),
  completedAt: z.string().datetime().optional(),
  notes: z.string().max(1000).optional(),
});

export const fireIncidentCreateSchema = z.object({
  buildingId: z.string().uuid(),
  floorNumber: z.number().int().optional(),
  roomId: z.string().uuid().optional(),
  fireType: z.enum(["electrical", "chemical", "structural", "kitchen", "electrical_equipment", "smoking", "arson", "unknown"]),
  severity: z.enum(["minor", "moderate", "major", "catastrophic"]),
  detectedBy: z.enum(["smoke_detector", "heat_detector", "manual_pull_station", "cctv", "personnel"]),
  detectorId: z.string().uuid().optional(),
  detectedAt: z.string().datetime(),
  reportedAt: z.string().datetime().optional(),
  respondedAt: z.string().datetime().optional(),
  containedAt: z.string().datetime().optional(),
  extinguishedAt: z.string().datetime().optional(),
  reportedBy: z.string().uuid().optional(),
  description: z.string().min(1).max(2000),
  injuriesCount: z.number().int().min(0).default(0),
  damageEstimate: z.number().min(0).optional(),
  fireDepartmentNotified: z.boolean().default(false),
  evacuationRequired: z.boolean().default(false),
  status: z.enum(["detected", "responding", "contained", "extinguished", "under_investigation", "closed"]).default("detected"),
});

export const fireIncidentUpdateSchema = z.object({
  buildingId: z.string().uuid().optional(),
  floorNumber: z.number().int().optional(),
  roomId: z.string().uuid().optional(),
  fireType: z.enum(["electrical", "chemical", "structural", "kitchen", "electrical_equipment", "smoking", "arson", "unknown"]).optional(),
  severity: z.enum(["minor", "moderate", "major", "catastrophic"]).optional(),
  detectedBy: z.enum(["smoke_detector", "heat_detector", "manual_pull_station", "cctv", "personnel"]).optional(),
  detectorId: z.string().uuid().optional(),
  detectedAt: z.string().datetime().optional(),
  reportedAt: z.string().datetime().optional(),
  respondedAt: z.string().datetime().optional(),
  containedAt: z.string().datetime().optional(),
  extinguishedAt: z.string().datetime().optional(),
  reportedBy: z.string().uuid().optional(),
  description: z.string().min(1).max(2000).optional(),
  injuriesCount: z.number().int().min(0).optional(),
  damageEstimate: z.number().min(0).optional(),
  fireDepartmentNotified: z.boolean().optional(),
  evacuationRequired: z.boolean().optional(),
  status: z.enum(["detected", "responding", "contained", "extinguished", "under_investigation", "closed"]).optional(),
});

export const securityIncidentCreateSchema = z.object({
  buildingId: z.string().uuid(),
  floorNumber: z.number().int().optional(),
  roomId: z.string().uuid().optional(),
  incidentType: z.enum(["theft", "vandalism", "trespassing", "assault", "suspicious_activity", "unauthorized_access", "harassment", "fraud", "cyber", "other"]),
  severity: z.enum(["low", "medium", "high", "critical"]),
  detectedBy: z.enum(["cctv", "guard", "sensor", "alarm", "personnel", "report"]),
  detectedAt: z.string().datetime(),
  reportedBy: z.string().uuid().optional(),
  reportedAt: z.string().datetime().optional(),
  description: z.string().min(1).max(2000),
  suspectDescription: z.string().max(1000).optional(),
  evidenceUrls: z.array(z.string().url()).max(10).optional(),
  witnesses: z.array(z.object({ name: z.string().max(200).optional(), phone: z.string().max(20).optional(), statement: z.string().max(1000).optional() })).optional(),
  policeNotified: z.boolean().default(false),
  policeReportNumber: z.string().max(100).optional(),
  status: z.enum(["reported", "investigating", "escalated", "resolved", "closed"]).default("reported"),
});

export const securityIncidentUpdateSchema = z.object({
  buildingId: z.string().uuid().optional(),
  floorNumber: z.number().int().optional(),
  roomId: z.string().uuid().optional(),
  incidentType: z.enum(["theft", "vandalism", "trespassing", "assault", "suspicious_activity", "unauthorized_access", "harassment", "fraud", "cyber", "other"]).optional(),
  severity: z.enum(["low", "medium", "high", "critical"]).optional(),
  detectedBy: z.enum(["cctv", "guard", "sensor", "alarm", "personnel", "report"]).optional(),
  detectedAt: z.string().datetime().optional(),
  reportedBy: z.string().uuid().optional(),
  reportedAt: z.string().datetime().optional(),
  description: z.string().min(1).max(2000).optional(),
  suspectDescription: z.string().max(1000).optional(),
  evidenceUrls: z.array(z.string().url()).max(10).optional(),
  witnesses: z.array(z.object({ name: z.string().max(200).optional(), phone: z.string().max(20).optional(), statement: z.string().max(1000).optional() })).optional(),
  policeNotified: z.boolean().optional(),
  policeReportNumber: z.string().max(100).optional(),
  status: z.enum(["reported", "investigating", "escalated", "resolved", "closed"]).optional(),
});

export const guardCreateSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().min(6).max(20),
  employeeId: z.string().max(50).optional(),
  badgeNumber: z.string().max(50).optional(),
  shiftType: z.enum(["day", "night", "rotating", "on_call"]),
  assignedAreas: z.array(z.string().uuid()).min(1),
  certifications: z.array(z.enum(["armed", "unarmed", "first_aid", "cpr", "fire_safety", "crowd_control"])).optional(),
  maxConcurrentShifts: z.number().int().positive().default(1),
  hourlyRate: z.number().min(0).optional(),
  startDate: z.string().datetime(),
  isActive: z.boolean().default(true),
});

export const guardUpdateSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(6).max(20).optional(),
  employeeId: z.string().max(50).optional(),
  badgeNumber: z.string().max(50).optional(),
  shiftType: z.enum(["day", "night", "rotating", "on_call"]).optional(),
  assignedAreas: z.array(z.string().uuid()).min(1).optional(),
  certifications: z.array(z.enum(["armed", "unarmed", "first_aid", "cpr", "fire_safety", "crowd_control"])).optional(),
  maxConcurrentShifts: z.number().int().positive().optional(),
  hourlyRate: z.number().min(0).optional(),
  startDate: z.string().datetime().optional(),
  isActive: z.boolean().optional(),
});

export const cctvCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  locationId: z.string().uuid(),
  buildingId: z.string().uuid().optional(),
  cameraType: z.enum(["indoor", "outdoor", "ptz", "dome", "bullet", "fisheye", "thermal"]),
  resolution: z.enum(["720p", "1080p", "1440p", "4k"]).default("1080p"),
  frameRate: z.number().int().positive().default(30),
  nightVision: z.boolean().default(false),
  motionDetection: z.boolean().default(true),
  soundDetection: z.boolean().default(false),
  cloudStorage: z.boolean().default(false),
  localStorage: z.boolean().default(true),
  retentionDays: z.number().int().positive().default(30),
  ptzControl: z.boolean().default(false),
  fieldOfViewDegrees: z.number().int().positive().optional(),
  streamUrl: z.string().url().optional(),
  recordingSchedule: z.enum(["24_7", "business_hours", "motion_only", "custom"]).default("24_7"),
  isActive: z.boolean().default(true),
});

export const cctvUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  locationId: z.string().uuid().optional(),
  buildingId: z.string().uuid().optional(),
  cameraType: z.enum(["indoor", "outdoor", "ptz", "dome", "bullet", "fisheye", "thermal"]).optional(),
  resolution: z.enum(["720p", "1080p", "1440p", "4k"]).optional(),
  frameRate: z.number().int().positive().optional(),
  nightVision: z.boolean().optional(),
  motionDetection: z.boolean().optional(),
  soundDetection: z.boolean().optional(),
  cloudStorage: z.boolean().optional(),
  localStorage: z.boolean().optional(),
  retentionDays: z.number().int().positive().optional(),
  ptzControl: z.boolean().optional(),
  fieldOfViewDegrees: z.number().int().positive().optional(),
  streamUrl: z.string().url().optional(),
  recordingSchedule: z.enum(["24_7", "business_hours", "motion_only", "custom"]).optional(),
  isActive: z.boolean().optional(),
});

export const emergencyNotificationCreateSchema = z.object({
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(2000),
  notificationType: z.enum(["immediate", "scheduled", "test"]),
  priority: z.enum(["low", "medium", "high", "critical"]),
  buildingIds: z.array(z.string().uuid()).min(1),
  floorNumbers: z.array(z.number().int()).optional(),
  recipientRoles: z.array(z.enum(["all", "security", "management", "maintenance", "medical", "tenants"])).min(1),
  channels: z.array(z.enum(["email", "sms", "push", "siren", "display", "phone"])).min(1),
  scheduledAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
  requireAck: z.boolean().default(false),
  ackTimeoutMinutes: z.number().int().positive().optional(),
  status: z.enum(["draft", "scheduled", "sent", "cancelled"]).default("draft"),
});

export const emergencyNotificationUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  message: z.string().min(1).max(2000).optional(),
  notificationType: z.enum(["immediate", "scheduled", "test"]).optional(),
  priority: z.enum(["low", "medium", "high", "critical"]).optional(),
  buildingIds: z.array(z.string().uuid()).min(1).optional(),
  floorNumbers: z.array(z.number().int()).optional(),
  recipientRoles: z.array(z.enum(["all", "security", "management", "maintenance", "medical", "tenants"])).min(1).optional(),
  channels: z.array(z.enum(["email", "sms", "push", "siren", "display", "phone"])).min(1).optional(),
  scheduledAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
  requireAck: z.boolean().optional(),
  ackTimeoutMinutes: z.number().int().positive().optional(),
  status: z.enum(["draft", "scheduled", "sent", "cancelled"]).optional(),
});

export const crisisCreateSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  crisisType: z.enum(["natural_disaster", "security_breach", "fire", "medical_emergency", "infrastructure_failure", "public_health", "environmental", "cyber_attack", "media", "other"]),
  severity: z.enum(["low", "medium", "high", "critical"]),
  affectedBuildings: z.array(z.string().uuid()).min(1),
  incidentCommander: z.string().uuid(),
  crisisTeam: z.array(z.object({ userId: z.string().uuid(), role: z.string().min(1).max(100) })).min(1),
  activationTime: z.string().datetime(),
  estimatedResolutionTime: z.string().datetime().optional(),
  publicStatement: z.string().max(2000).optional(),
  internalNotes: z.string().max(2000).optional(),
  status: z.enum(["declared", "active", "stabilizing", "resolved", "post_mortem"]).default("declared"),
});

export const crisisUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(2000).optional(),
  crisisType: z.enum(["natural_disaster", "security_breach", "fire", "medical_emergency", "infrastructure_failure", "public_health", "environmental", "cyber_attack", "media", "other"]).optional(),
  severity: z.enum(["low", "medium", "high", "critical"]).optional(),
  affectedBuildings: z.array(z.string().uuid()).min(1).optional(),
  incidentCommander: z.string().uuid().optional(),
  crisisTeam: z.array(z.object({ userId: z.string().uuid(), role: z.string().min(1).max(100) })).min(1).optional(),
  activationTime: z.string().datetime().optional(),
  estimatedResolutionTime: z.string().datetime().optional(),
  actualResolutionTime: z.string().datetime().optional(),
  publicStatement: z.string().max(2000).optional(),
  internalNotes: z.string().max(2000).optional(),
  status: z.enum(["declared", "active", "stabilizing", "resolved", "post_mortem"]).optional(),
});

export const drillCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  drillType: z.enum(["fire", "earthquake", "lockdown", "evacuation", "medical", "bomb_threat", "active_threat"]),
  buildingIds: z.array(z.string().uuid()).min(1),
  floorNumbers: z.array(z.number().int()).optional(),
  scheduledDate: z.string().datetime(),
  actualStartTime: z.string().datetime().optional(),
  actualEndTime: z.string().datetime().optional(),
  coordinatorId: z.string().uuid(),
  participantCount: z.number().int().positive().optional(),
  objectives: z.array(z.string().min(1).max(200)).min(1),
  status: z.enum(["planned", "in_progress", "completed", "cancelled"]).default("planned"),
  notes: z.string().max(1000).optional(),
});

export const drillUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  drillType: z.enum(["fire", "earthquake", "lockdown", "evacuation", "medical", "bomb_threat", "active_threat"]).optional(),
  buildingIds: z.array(z.string().uuid()).min(1).optional(),
  floorNumbers: z.array(z.number().int()).optional(),
  scheduledDate: z.string().datetime().optional(),
  actualStartTime: z.string().datetime().optional(),
  actualEndTime: z.string().datetime().optional(),
  coordinatorId: z.string().uuid().optional(),
  participantCount: z.number().int().positive().optional(),
  objectives: z.array(z.string().min(1).max(200)).min(1).optional(),
  status: z.enum(["planned", "in_progress", "completed", "cancelled"]).optional(),
  notes: z.string().max(1000).optional(),
});

export const accessLogCreateSchema = z.object({
  userId: z.string().uuid().optional(),
  visitorId: z.string().uuid().optional(),
  doorId: z.string().uuid(),
  locationId: z.string().uuid(),
  accessMethod: z.enum(["card", "pin", "biometric", "mobile", "key", "manual"]),
  accessResult: z.enum(["granted", "denied", "error"]),
  denyReason: z.string().max(200).optional(),
  timestamp: z.string().datetime(),
  direction: z.enum(["entry", "exit"]),
  notes: z.string().max(500).optional(),
});

export const safetyEquipmentCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  equipmentType: z.enum(["fire_extinguisher", "first_aid_kit", "defibrillator", "fire_hose", "emergency_light", "exit_sign", "panic_button", "sprinkler", "smoke_detector", "gas_detector"]),
  locationId: z.string().uuid(),
  buildingId: z.string().uuid().optional(),
  floorNumber: z.number().int().optional(),
  installationDate: z.string().datetime().optional(),
  lastInspectionDate: z.string().datetime().optional(),
  nextInspectionDate: z.string().datetime().optional(),
  expiryDate: z.string().datetime().optional(),
  status: z.enum(["operational", "maintenance", "expired", "out_of_service"]).default("operational"),
  serialNumber: z.string().max(100).optional(),
  manufacturer: z.string().max(100).optional(),
  notes: z.string().max(500).optional(),
});

export const safetyInspectionCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  inspectionType: z.enum(["fire_safety", "structural", "electrical", "hvac", "plumbing", "accessibility", "environmental", "general"]),
  locationId: z.string().uuid(),
  buildingId: z.string().uuid().optional(),
  scheduledDate: z.string().datetime(),
  inspectorId: z.string().uuid(),
  checklistItems: z.array(z.object({ item: z.string().min(1).max(200), status: z.enum(["pass", "fail", "na", "needs_attention"]), notes: z.string().max(500).optional() })).min(1),
  overallStatus: z.enum(["pass", "fail", "conditional"]).optional(),
  findings: z.string().max(2000).optional(),
  correctiveActions: z.array(z.object({ action: z.string().min(1).max(500), dueDate: z.string().datetime().optional(), assignedTo: z.string().uuid().optional() })).optional(),
  status: z.enum(["scheduled", "in_progress", "completed", "cancelled"]).default("scheduled"),
  notes: z.string().max(1000).optional(),
});

export const protocolCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  protocolType: z.enum(["emergency_response", "evacuation", "medical", "fire", "security", "access_control", "incident_reporting", "communication"]),
  version: z.string().min(1).max(50),
  effectiveDate: z.string().datetime(),
  reviewDate: z.string().datetime(),
  steps: z.array(z.object({ stepNumber: z.number().int().positive(), action: z.string().min(1).max(500), responsibleRole: z.string().max(100).optional(), timeLimitMinutes: z.number().int().positive().optional() })).min(1),
  applicableRoles: z.array(z.string().max(100)).min(1),
  buildingIds: z.array(z.string().uuid()).optional(),
  documentUrl: z.string().url().optional(),
  approvedBy: z.string().uuid().optional(),
  status: z.enum(["draft", "active", "archived", "under_review"]).default("draft"),
});

export const securitySearchSchema = z.object({
  query: z.string().min(1).max(200),
  modules: z.array(z.enum(["incidents", "guards", "cameras", "access_logs", "plans", "drills", "equipment"])).optional(),
  incidentType: z.enum(["theft", "vandalism", "trespassing", "assault", "suspicious_activity", "unauthorized_access", "harassment", "fraud", "cyber", "other"]).optional(),
  severity: z.enum(["low", "medium", "high", "critical"]).optional(),
  buildingId: z.string().uuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
});

export const securityBulkUpdateSchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(100),
  module: z.enum(["incidents", "guards", "cameras", "plans", "equipment"]),
  updates: z.object({
    status: z.string().max(50).optional(),
    severity: z.enum(["low", "medium", "high", "critical"]).optional(),
    assignedToId: z.string().uuid().optional(),
    notes: z.string().max(500).optional(),
  }),
});

export const securityBulkDeleteSchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(100),
  module: z.enum(["incidents", "guards", "cameras", "plans", "equipment"]),
  reason: z.string().max(500).optional(),
});

export const securityExportSchema = z.object({
  format: z.enum(["csv", "xlsx", "pdf"]).default("csv"),
  modules: z.array(z.enum(["incidents", "guards", "cameras", "access_logs", "plans", "drills", "equipment"])).min(1),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  fields: z.array(z.string()).optional(),
});

export const securityImportSchema = z.object({
  fileUrl: z.string().url(),
  format: z.enum(["csv", "xlsx"]),
  module: z.enum(["incidents", "guards", "cameras", "plans", "equipment"]),
  overwrite: z.boolean().default(false),
  buildingId: z.string().uuid().optional(),
});

export const securitySettingsSchema = z.object({
  incidentAutoEscalation: z.boolean().default(true),
  escalationTimeoutMinutes: z.number().int().positive().default(30),
  cctvRetentionDays: z.number().int().positive().default(30),
  accessLogRetentionDays: z.number().int().positive().default(90),
  enableAutoRecording: z.boolean().default(true),
  requireIncidentPhotos: z.boolean().default(false),
  maxIncidentReportDays: z.number().int().positive().default(7),
  enableGuardPatrolTracking: z.boolean().default(false),
  patrolIntervalMinutes: z.number().int().positive().default(60),
  emergencyContactPhone: z.string().max(20).optional(),
  notificationEmails: z.array(z.string().email()).optional(),
  enableMotionAlerts: z.boolean().default(true),
  motionAlertSensitivity: z.enum(["low", "medium", "high"]).default("medium"),
  enableAfterHoursAlerts: z.boolean().default(false),
  afterHoursStart: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  afterHoursEnd: z.string().regex(/^\d{2}:\d{2}$/).optional(),
});

export const securityAccessibilitySchema = z.object({
  accessibleEmergencyExits: z.boolean().default(false),
  visualAlarmSystem: z.boolean().default(false),
  audioAlarmSystem: z.boolean().default(false),
  accessibleEvacuationRoutes: z.boolean().default(false),
  wheelchairShelters: z.boolean().default(false),
  emergencyAssistanceAvailable: z.boolean().default(false),
  largePrintEmergencyGuides: z.boolean().default(false),
  brailleEmergencyGuides: z.boolean().default(false),
  accessibilityNotes: z.string().max(500).optional(),
});

export const securityLocalizationSchema = z.object({
  preferredLanguage: z.string().min(2).max(5).default("en"),
  timeZone: z.string().max(50).default("UTC"),
  dateFormat: z.string().max(20).default("YYYY-MM-DD"),
  timeFormat: z.enum(["12h", "24h"]).default("24h"),
  currency: z.string().min(3).max(3).default("USD"),
  emergencyLanguage: z.string().min(2).max(5).default("en"),
  multilingualAlerts: z.boolean().default(false),
  supportedLanguages: z.array(z.string().min(2).max(5)).optional(),
});

export const securityMetadataSchema = z.object({
  tags: z.array(z.string().max(50)).max(20).optional(),
  customFields: z.record(z.string(), z.unknown()).optional(),
  source: z.enum(["web", "mobile", "api", "cctv", "sensor", "guard", "manual"]).default("web"),
  classificationLevel: z.enum(["public", "internal", "confidential", "restricted"]).default("internal"),
  lastModifiedBy: z.string().uuid().optional(),
  evidenceUrls: z.array(z.string().url()).max(20).optional(),
  reportUrls: z.array(z.string().url()).max(10).optional(),
});

export const securityPricingSchema = z.object({
  serviceId: z.string().uuid(),
  baseRate: z.number().min(0),
  overtimeRate: z.number().min(0).optional(),
  weekendRate: z.number().min(0).optional(),
  holidayRate: z.number().min(0).optional(),
  currency: z.string().min(3).max(3).default("USD"),
  minimumCharge: z.number().min(0).optional(),
  travelFee: z.number().min(0).optional(),
  equipmentFee: z.number().min(0).optional(),
  notes: z.string().max(500).optional(),
});

export const securityBundleSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  serviceIds: z.array(z.string().uuid()).min(1),
  bundleType: z.enum(["basic", "standard", "premium", "enterprise"]),
  discountPercentage: z.number().min(0).max(100).optional(),
  validFrom: z.string().datetime(),
  validUntil: z.string().datetime().optional(),
  maxUsageCount: z.number().int().positive().optional(),
  isActive: z.boolean().default(true),
});

export const securitySubscriptionSchema = z.object({
  providerName: z.string().min(1).max(200),
  subscriptionType: z.enum(["monthly", "quarterly", "annual"]),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  cost: z.number().min(0),
  currency: z.string().min(3).max(3).default("USD"),
  autoRenew: z.boolean().default(false),
  servicesIncluded: z.array(z.string().max(200)),
  maxIncidentsPerMonth: z.number().int().positive().optional(),
  responseTimeGuaranteeMinutes: z.number().int().positive().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
});

export const securityVersionSchema = z.object({
  versionNumber: z.string().min(1).max(50),
  releaseDate: z.string().datetime(),
  changes: z.array(z.string().min(1).max(500)).min(1),
  breakingChanges: z.boolean().default(false),
  compatibility: z.string().max(500).optional(),
  isCurrent: z.boolean().default(true),
  deprecatedFeatures: z.array(z.string().max(200)).optional(),
});

export const securityArchiveSchema = z.object({
  recordIds: z.array(z.string().uuid()).min(1).max(100),
  module: z.enum(["incidents", "guards", "cameras", "plans", "drills", "equipment"]),
  reason: z.string().min(1).max(500),
  archiveDate: z.string().datetime(),
  retainForYears: z.number().int().positive().default(7),
  notes: z.string().max(1000).optional(),
});

export const securityRestoreSchema = z.object({
  recordIds: z.array(z.string().uuid()).min(1).max(100),
  module: z.enum(["incidents", "guards", "cameras", "plans", "drills", "equipment"]),
  reason: z.string().min(1).max(500),
  restoreToStatus: z.string().max(50).default("active"),
  notes: z.string().max(1000).optional(),
});

export const securityReportSchema = z.object({
  reportType: z.enum(["incident_summary", "guard_performance", "access_analysis", "drill_results", "equipment_status", "compliance", "custom"]),
  dateFrom: z.string().datetime(),
  dateTo: z.string().datetime(),
  modules: z.array(z.enum(["incidents", "guards", "cameras", "access_logs", "plans", "drills", "equipment"])).optional(),
  groupBy: z.enum(["day", "week", "month", "building", "incident_type", "severity", "guard"]).optional(),
  includeCharts: z.boolean().default(false),
  format: z.enum(["pdf", "xlsx", "csv"]).default("pdf"),
});

// ──────────────────────────────────────────────────────────────
// ENVIRONMENT
// ──────────────────────────────────────────────────────────────

export const wasteCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  wasteType: z.enum(["general", "recyclable", "hazardous", "organic", "electronic", "medical", "construction", "chemical"]),
  sourceLocationId: z.string().uuid().optional(),
  buildingId: z.string().uuid().optional(),
  quantity: z.number().positive(),
  unit: z.enum(["kg", "lbs", "tons", "liters", "gallons", "cubic_meters"]),
  collectionDate: z.string().datetime(),
  disposalMethod: z.enum(["landfill", "recycling", "incineration", "composting", "hazardous_disposal", "donation"]),
  vendorId: z.string().uuid().optional(),
  manifestNumber: z.string().max(100).optional(),
  hazardousClassification: z.string().max(100).optional(),
  notes: z.string().max(1000).optional(),
  status: z.enum(["collected", "in_transit", "disposed", "pending_review"]).default("collected"),
});

export const wasteUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  wasteType: z.enum(["general", "recyclable", "hazardous", "organic", "electronic", "medical", "construction", "chemical"]).optional(),
  sourceLocationId: z.string().uuid().optional(),
  buildingId: z.string().uuid().optional(),
  quantity: z.number().positive().optional(),
  unit: z.enum(["kg", "lbs", "tons", "liters", "gallons", "cubic_meters"]).optional(),
  collectionDate: z.string().datetime().optional(),
  disposalMethod: z.enum(["landfill", "recycling", "incineration", "composting", "hazardous_disposal", "donation"]).optional(),
  vendorId: z.string().uuid().optional(),
  manifestNumber: z.string().max(100).optional(),
  hazardousClassification: z.string().max(100).optional(),
  notes: z.string().max(1000).optional(),
  status: z.enum(["collected", "in_transit", "disposed", "pending_review"]).optional(),
});

export const wasteQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(["createdAt", "collectionDate", "wasteType", "quantity", "status"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const wasteFilterSchema = z.object({
  status: z.enum(["collected", "in_transit", "disposed", "pending_review"]).optional(),
  wasteType: z.enum(["general", "recyclable", "hazardous", "organic", "electronic", "medical", "construction", "chemical"]).optional(),
  buildingId: z.string().uuid().optional(),
  disposalMethod: z.enum(["landfill", "recycling", "incineration", "composting", "hazardous_disposal", "donation"]).optional(),
  collectionDateFrom: z.string().datetime().optional(),
  collectionDateTo: z.string().datetime().optional(),
  search: z.string().max(200).optional(),
});

export const carbonCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  buildingId: z.string().uuid().optional(),
  scope: z.enum(["scope1", "scope2", "scope3"]),
  category: z.enum(["stationary_combustion", "mobile_combustion", "refrigerants", "purchased_electricity", "purchased_heat", "purchased_cooling", "business_travel", "employee_commuting", "waste", "water", "other"]),
  source: z.string().min(1).max(200),
  quantity: z.number(),
  unit: z.enum(["tonnes_co2e", "kg_co2e", "lbs_co2e"]),
  emissionFactor: z.number().positive().optional(),
  emissionFactorSource: z.string().max(200).optional(),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  calculationMethod: z.enum(["spend", "activity", "hybrid", "average_data"]).optional(),
  notes: z.string().max(1000).optional(),
  status: z.enum(["draft", "verified", "submitted"]).default("draft"),
});

export const carbonUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  buildingId: z.string().uuid().optional(),
  scope: z.enum(["scope1", "scope2", "scope3"]).optional(),
  category: z.enum(["stationary_combustion", "mobile_combustion", "refrigerants", "purchased_electricity", "purchased_heat", "purchased_cooling", "business_travel", "employee_commuting", "waste", "water", "other"]).optional(),
  source: z.string().min(1).max(200).optional(),
  quantity: z.number().optional(),
  unit: z.enum(["tonnes_co2e", "kg_co2e", "lbs_co2e"]).optional(),
  emissionFactor: z.number().positive().optional(),
  emissionFactorSource: z.string().max(200).optional(),
  periodStart: z.string().datetime().optional(),
  periodEnd: z.string().datetime().optional(),
  calculationMethod: z.enum(["spend", "activity", "hybrid", "average_data"]).optional(),
  notes: z.string().max(1000).optional(),
  status: z.enum(["draft", "verified", "submitted"]).optional(),
});

export const solarCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  buildingId: z.string().uuid().optional(),
  locationId: z.string().uuid().optional(),
  panelType: z.enum(["monocrystalline", "polycrystalline", "thin_film", "bifacial"]),
  ratedCapacityKw: z.number().positive(),
  panelCount: z.number().int().positive().optional(),
  installationDate: z.string().datetime(),
  manufacturer: z.string().max(100).optional(),
  model: z.string().max(100).optional(),
  warrantyExpiry: z.string().datetime().optional(),
  orientationDegrees: z.number().min(0).max(360).optional(),
  tiltDegrees: z.number().min(0).max(90).optional(),
  azimuthDegrees: z.number().min(0).max(360).optional(),
  shadingFactor: z.number().min(0).max(1).optional(),
  efficiency: z.number().min(0).max(1).optional(),
  monitoringEnabled: z.boolean().default(true),
  gridConnected: z.boolean().default(true),
  status: z.enum(["operational", "maintenance", "offline", "decommissioned"]).default("operational"),
});

export const solarUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  buildingId: z.string().uuid().optional(),
  locationId: z.string().uuid().optional(),
  panelType: z.enum(["monocrystalline", "polycrystalline", "thin_film", "bifacial"]).optional(),
  ratedCapacityKw: z.number().positive().optional(),
  panelCount: z.number().int().positive().optional(),
  installationDate: z.string().datetime().optional(),
  manufacturer: z.string().max(100).optional(),
  model: z.string().max(100).optional(),
  warrantyExpiry: z.string().datetime().optional(),
  orientationDegrees: z.number().min(0).max(360).optional(),
  tiltDegrees: z.number().min(0).max(90).optional(),
  azimuthDegrees: z.number().min(0).max(360).optional(),
  shadingFactor: z.number().min(0).max(1).optional(),
  efficiency: z.number().min(0).max(1).optional(),
  monitoringEnabled: z.boolean().optional(),
  gridConnected: z.boolean().optional(),
  status: z.enum(["operational", "maintenance", "offline", "decommissioned"]).optional(),
});

export const energySavingCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  buildingId: z.string().uuid().optional(),
  savingType: z.enum(["lighting", "hvac", "insulation", "equipment", "behavior", "scheduling", "renewable"]),
  implementationDate: z.string().datetime(),
  estimatedAnnualSavingsKwh: z.number().positive().optional(),
  actualAnnualSavingsKwh: z.number().min(0).optional(),
  estimatedAnnualSavingsCost: z.number().min(0).optional(),
  actualAnnualSavingsCost: z.number().min(0).optional(),
  implementationCost: z.number().min(0).optional(),
  paybackPeriodMonths: z.number().int().positive().optional(),
  carbonReductionKg: z.number().min(0).optional(),
  status: z.enum(["proposed", "approved", "implemented", "verified", "rejected"]).default("proposed"),
  notes: z.string().max(1000).optional(),
});

export const energySavingUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  buildingId: z.string().uuid().optional(),
  savingType: z.enum(["lighting", "hvac", "insulation", "equipment", "behavior", "scheduling", "renewable"]).optional(),
  implementationDate: z.string().datetime().optional(),
  estimatedAnnualSavingsKwh: z.number().positive().optional(),
  actualAnnualSavingsKwh: z.number().min(0).optional(),
  estimatedAnnualSavingsCost: z.number().min(0).optional(),
  actualAnnualSavingsCost: z.number().min(0).optional(),
  implementationCost: z.number().min(0).optional(),
  paybackPeriodMonths: z.number().int().positive().optional(),
  carbonReductionKg: z.number().min(0).optional(),
  status: z.enum(["proposed", "approved", "implemented", "verified", "rejected"]).optional(),
  notes: z.string().max(1000).optional(),
});

export const waterUsageCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  buildingId: z.string().uuid().optional(),
  locationId: z.string().uuid().optional(),
  waterType: z.enum(["potable", "irrigation", "industrial", "cooling", "fire", "reclaimed"]),
  meterNumber: z.string().max(100).optional(),
  quantity: z.number().positive(),
  unit: z.enum(["liters", "gallons", "cubic_meters"]),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  costPerUnit: z.number().min(0).optional(),
  totalCost: z.number().min(0).optional(),
  sourceType: z.enum(["municipal", "well", "rainwater", "recycled"]).optional(),
  notes: z.string().max(1000).optional(),
  status: z.enum(["recorded", "verified", "submitted"]).default("recorded"),
});

export const waterUsageUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  buildingId: z.string().uuid().optional(),
  locationId: z.string().uuid().optional(),
  waterType: z.enum(["potable", "irrigation", "industrial", "cooling", "fire", "reclaimed"]).optional(),
  meterNumber: z.string().max(100).optional(),
  quantity: z.number().positive().optional(),
  unit: z.enum(["liters", "gallons", "cubic_meters"]).optional(),
  periodStart: z.string().datetime().optional(),
  periodEnd: z.string().datetime().optional(),
  costPerUnit: z.number().min(0).optional(),
  totalCost: z.number().min(0).optional(),
  sourceType: z.enum(["municipal", "well", "rainwater", "recycled"]).optional(),
  notes: z.string().max(1000).optional(),
  status: z.enum(["recorded", "verified", "submitted"]).optional(),
});

export const envReportCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  reportType: z.enum(["energy", "water", "waste", "carbon", "solar", "compliance", "sustainability", "custom"]),
  dateFrom: z.string().datetime(),
  dateTo: z.string().datetime(),
  buildingIds: z.array(z.string().uuid()).optional(),
  metrics: z.array(z.enum(["totalEnergy", "totalWater", "totalWaste", "carbonEmissions", "solarGeneration", "energyIntensity", "waterIntensity", "wasteDiversion", "renewablePercentage"])).min(1),
  groupBy: z.enum(["day", "week", "month", "quarter", "year", "building", "type"]).optional(),
  includeCharts: z.boolean().default(false),
  format: z.enum(["pdf", "xlsx", "csv"]).default("pdf"),
  scheduledRecurrence: z.enum(["none", "daily", "weekly", "monthly", "quarterly"]).default("none"),
  status: z.enum(["draft", "generated", "sent", "archived"]).default("draft"),
});

export const envReportUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  reportType: z.enum(["energy", "water", "waste", "carbon", "solar", "compliance", "sustainability", "custom"]).optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  buildingIds: z.array(z.string().uuid()).optional(),
  metrics: z.array(z.enum(["totalEnergy", "totalWater", "totalWaste", "carbonEmissions", "solarGeneration", "energyIntensity", "waterIntensity", "wasteDiversion", "renewablePercentage"])).min(1).optional(),
  groupBy: z.enum(["day", "week", "month", "quarter", "year", "building", "type"]).optional(),
  includeCharts: z.boolean().optional(),
  format: z.enum(["pdf", "xlsx", "csv"]).optional(),
  scheduledRecurrence: z.enum(["none", "daily", "weekly", "monthly", "quarterly"]).optional(),
  status: z.enum(["draft", "generated", "sent", "archived"]).optional(),
});

export const envGoalCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  goalType: z.enum(["energy_reduction", "water_reduction", "waste_reduction", "carbon_neutral", "renewable_energy", "certification", "custom"]),
  targetValue: z.number(),
  unit: z.enum(["kwh", "liters", "kg", "tonnes_co2e", "percentage", "kwh_per_sqm", "liters_per_sqm"]),
  currentValue: z.number().optional(),
  baselineValue: z.number().optional(),
  baselineDate: z.string().datetime().optional(),
  targetDate: z.string().datetime(),
  buildingIds: z.array(z.string().uuid()).optional(),
  responsibleParty: z.string().uuid().optional(),
  departmentId: z.string().uuid().optional(),
  status: z.enum(["draft", "active", "achieved", "missed", "archived"]).default("draft"),
  notes: z.string().max(1000).optional(),
});

export const envGoalUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  goalType: z.enum(["energy_reduction", "water_reduction", "waste_reduction", "carbon_neutral", "renewable_energy", "certification", "custom"]).optional(),
  targetValue: z.number().optional(),
  unit: z.enum(["kwh", "liters", "kg", "tonnes_co2e", "percentage", "kwh_per_sqm", "liters_per_sqm"]).optional(),
  currentValue: z.number().optional(),
  baselineValue: z.number().optional(),
  baselineDate: z.string().datetime().optional(),
  targetDate: z.string().datetime().optional(),
  buildingIds: z.array(z.string().uuid()).optional(),
  responsibleParty: z.string().uuid().optional(),
  departmentId: z.string().uuid().optional(),
  status: z.enum(["draft", "active", "achieved", "missed", "archived"]).optional(),
  notes: z.string().max(1000).optional(),
});

export const complianceCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  regulationType: z.enum(["local", "state", "federal", "international", "industry_standard"]),
  regulationName: z.string().min(1).max(200),
  regulationReference: z.string().max(200).optional(),
  category: z.enum(["energy", "water", "waste", "emissions", "safety", "accessibility", "zoning", "noise", "other"]),
  applicableBuildingIds: z.array(z.string().uuid()).optional(),
  complianceDeadline: z.string().datetime(),
  renewalDate: z.string().datetime().optional(),
  responsibleParty: z.string().uuid().optional(),
  documentationUrls: z.array(z.string().url()).max(10).optional(),
  status: z.enum(["compliant", "non_compliant", "pending", "exempt", "expired"]).default("pending"),
  lastAuditDate: z.string().datetime().optional(),
  nextAuditDate: z.string().datetime().optional(),
  notes: z.string().max(1000).optional(),
});

export const complianceUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  regulationType: z.enum(["local", "state", "federal", "international", "industry_standard"]).optional(),
  regulationName: z.string().min(1).max(200).optional(),
  regulationReference: z.string().max(200).optional(),
  category: z.enum(["energy", "water", "waste", "emissions", "safety", "accessibility", "zoning", "noise", "other"]).optional(),
  applicableBuildingIds: z.array(z.string().uuid()).optional(),
  complianceDeadline: z.string().datetime().optional(),
  renewalDate: z.string().datetime().optional(),
  responsibleParty: z.string().uuid().optional(),
  documentationUrls: z.array(z.string().url()).max(10).optional(),
  status: z.enum(["compliant", "non_compliant", "pending", "exempt", "expired"]).optional(),
  lastAuditDate: z.string().datetime().optional(),
  nextAuditDate: z.string().datetime().optional(),
  notes: z.string().max(1000).optional(),
});

export const wasteScheduleCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  wasteType: z.enum(["general", "recyclable", "hazardous", "organic", "electronic", "medical", "construction", "chemical"]),
  buildingId: z.string().uuid().optional(),
  collectionFrequency: z.enum(["daily", "weekly", "biweekly", "monthly"]),
  collectionDays: z.array(z.enum(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"])).min(1),
  collectionTime: z.string().regex(/^\d{2}:\d{2}$/),
  vendorId: z.string().uuid().optional(),
  containerType: z.enum(["bin", "skip", "compactor", "drum", "bag"]).optional(),
  containerSize: z.string().max(50).optional(),
  maxCapacityKg: z.number().positive().optional(),
  isActive: z.boolean().default(true),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export const energyAuditCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  buildingId: z.string().uuid(),
  auditType: z.enum(["initial", "follow_up", "comprehensive", "targeted"]),
  auditorId: z.string().uuid(),
  auditorCompany: z.string().max(200).optional(),
  auditDate: z.string().datetime(),
  findings: z.array(z.object({ area: z.string().min(1).max(200), issue: z.string().min(1).max(500), severity: z.enum(["low", "medium", "high", "critical"]), recommendation: z.string().min(1).max(500), estimatedSavingsKwh: z.number().min(0).optional(), estimatedSavingsCost: z.number().min(0).optional() })).min(1),
  totalEstimatedSavingsKwh: z.number().min(0).optional(),
  totalEstimatedSavingsCost: z.number().min(0).optional(),
  reportUrl: z.string().url().optional(),
  status: z.enum(["scheduled", "in_progress", "completed", "cancelled"]).default("scheduled"),
  notes: z.string().max(1000).optional(),
});

export const waterAuditCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  buildingId: z.string().uuid(),
  auditType: z.enum(["initial", "follow_up", "comprehensive", "leak_detection"]),
  auditorId: z.string().uuid(),
  auditorCompany: z.string().max(200).optional(),
  auditDate: z.string().datetime(),
  findings: z.array(z.object({ area: z.string().min(1).max(200), issue: z.string().min(1).max(500), severity: z.enum(["low", "medium", "high", "critical"]), recommendation: z.string().min(1).max(500), estimatedSavingsLiters: z.number().min(0).optional(), estimatedSavingsCost: z.number().min(0).optional() })).min(1),
  totalEstimatedSavingsLiters: z.number().min(0).optional(),
  totalEstimatedSavingsCost: z.number().min(0).optional(),
  reportUrl: z.string().url().optional(),
  status: z.enum(["scheduled", "in_progress", "completed", "cancelled"]).default("scheduled"),
  notes: z.string().max(1000).optional(),
});

export const carbonOffsetCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  offsetType: z.enum(["tree_planting", "renewable_energy", "methane_capture", "carbon_capture", "avoided_deforestation", "community_project"]),
  creditsPurchased: z.number().positive(),
  creditsUsed: z.number().min(0).default(0),
  unit: z.enum(["tonnes_co2e", "kg_co2e"]),
  costPerCredit: z.number().min(0).optional(),
  totalCost: z.number().min(0).optional(),
  currency: z.string().min(3).max(3).default("USD"),
  provider: z.string().max(200).optional(),
  certificationStandard: z.enum(["gold_standard", "verified_carbon", "climate_action_reserve", "american_carbon", "other"]).optional(),
  vintageYear: z.number().int().min(2000).optional(),
  purchaseDate: z.string().datetime(),
  expiryDate: z.string().datetime().optional(),
  projectUrl: z.string().url().optional(),
  status: z.enum(["purchased", "partially_used", "fully_used", "expired"]).default("purchased"),
  notes: z.string().max(1000).optional(),
});

export const greenInitiativeCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  initiativeType: z.enum(["energy", "water", "waste", "biodiversity", "community", "education", "procurement", "transport"]),
  buildingIds: z.array(z.string().uuid()).optional(),
  departmentId: z.string().uuid().optional(),
  budget: z.number().min(0).optional(),
  currency: z.string().min(3).max(3).default("USD"),
  startDate: z.string().datetime(),
  targetEndDate: z.string().datetime().optional(),
  actualEndDate: z.string().datetime().optional(),
  goals: z.array(z.object({ description: z.string().min(1).max(500), targetValue: z.number().optional(), unit: z.string().max(50).optional() })).min(1),
  kpis: z.array(z.object({ name: z.string().min(1).max(200), targetValue: z.number().optional(), currentValue: z.number().optional(), unit: z.string().max(50).optional() })).optional(),
  sponsorId: z.string().uuid().optional(),
  teamMembers: z.array(z.string().uuid()).optional(),
  status: z.enum(["proposed", "planned", "in_progress", "completed", "on_hold", "cancelled"]).default("proposed"),
  notes: z.string().max(1000).optional(),
});

export const envDashboardSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  layout: z.array(z.object({ widgetId: z.string().uuid(), widgetType: z.enum(["chart", "gauge", "table", "kpi", "map", "alert"]), title: z.string().min(1).max(200), config: z.record(z.string(), z.unknown()), x: z.number().int().min(0), y: z.number().int().min(0), width: z.number().int().positive(), height: z.number().int().positive() })).min(1),
  refreshIntervalSeconds: z.number().int().positive().default(300),
  buildingIds: z.array(z.string().uuid()).optional(),
  isDefault: z.boolean().default(false),
  sharedWith: z.array(z.string().uuid()).optional(),
  tags: z.array(z.string().max(50)).max(10).optional(),
});

export const envConfigSchema = z.object({
  defaultEnergyUnit: z.enum(["kwh", "mwh", "btu"]).default("kwh"),
  defaultWaterUnit: z.enum(["liters", "gallons", "cubic_meters"]).default("liters"),
  defaultWasteUnit: z.enum(["kg", "lbs", "tons"]).default("kg"),
  defaultCarbonUnit: z.enum(["tonnes_co2e", "kg_co2e", "lbs_co2e"]).default("tonnes_co2e"),
  dataRetentionDays: z.number().int().positive().default(365),
  enableAutomatedReporting: z.boolean().default(false),
  reportingFrequency: z.enum(["daily", "weekly", "monthly", "quarterly"]).default("monthly"),
  enableGoalTracking: z.boolean().default(true),
  enableComplianceTracking: z.boolean().default(true),
  weatherDataEnabled: z.boolean().default(false),
  weatherDataSource: z.string().max(200).optional(),
  emissionFactorSource: z.enum(["epa", "iea", "custom"]).default("epa"),
  notificationEmails: z.array(z.string().email()).optional(),
  timezone: z.string().max(50).default("UTC"),
});

export const envSearchSchema = z.object({
  query: z.string().min(1).max(200),
  modules: z.array(z.enum(["waste", "carbon", "solar", "energy", "water", "reports", "goals", "compliance"])).optional(),
  buildingId: z.string().uuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  status: z.string().max(50).optional(),
});

export const envBulkUpdateSchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(100),
  module: z.enum(["waste", "carbon", "solar", "energy", "water", "reports", "goals", "compliance"]),
  updates: z.object({
    status: z.string().max(50).optional(),
    buildingId: z.string().uuid().optional(),
    notes: z.string().max(500).optional(),
  }),
});

export const envBulkDeleteSchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(100),
  module: z.enum(["waste", "carbon", "solar", "energy", "water", "reports", "goals", "compliance"]),
  reason: z.string().max(500).optional(),
});

export const envExportSchema = z.object({
  format: z.enum(["csv", "xlsx", "pdf"]).default("csv"),
  modules: z.array(z.enum(["waste", "carbon", "solar", "energy", "water", "reports", "goals", "compliance"])).min(1),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  buildingIds: z.array(z.string().uuid()).optional(),
  fields: z.array(z.string()).optional(),
});

export const envImportSchema = z.object({
  fileUrl: z.string().url(),
  format: z.enum(["csv", "xlsx"]),
  module: z.enum(["waste", "carbon", "solar", "energy", "water"]),
  overwrite: z.boolean().default(false),
  buildingId: z.string().uuid().optional(),
});

export const envSettingsSchema = z.object({
  enableAutomatedDataCollection: z.boolean().default(false),
  dataCollectionIntervalMinutes: z.number().int().positive().default(60),
  enableGoalAlerts: z.boolean().default(true),
  goalAlertThresholdPercent: z.number().min(0).max(100).default(80),
  enableComplianceAlerts: z.boolean().default(true),
  complianceAlertDaysBefore: z.number().int().positive().default(30),
  enableSolarMonitoring: z.boolean().default(false),
  enableWeatherCorrelation: z.boolean().default(false),
  defaultReportingCurrency: z.string().min(3).max(3).default("USD"),
  carbonIntensityFactor: z.number().positive().optional(),
  enableBenchmarking: z.boolean().default(false),
  benchmarkSource: z.enum(["energy_star", "portfolio_manager", "custom"]).optional(),
  notificationEmails: z.array(z.string().email()).optional(),
  timezone: z.string().max(50).default("UTC"),
});

export const envAccessibilitySchema = z.object({
  accessibleReportingInterface: z.boolean().default(false),
  screenReaderCompatible: z.boolean().default(false),
  highContrastMode: z.boolean().default(false),
  audioDataPresentation: z.boolean().default(false),
  simplifiedLanguage: z.boolean().default(false),
  largeText: z.boolean().default(false),
  keyboardNavigation: z.boolean().default(false),
  colorBlindMode: z.boolean().default(false),
  accessibilityNotes: z.string().max(500).optional(),
});

export const envLocalizationSchema = z.object({
  preferredLanguage: z.string().min(2).max(5).default("en"),
  timeZone: z.string().max(50).default("UTC"),
  dateFormat: z.string().max(20).default("YYYY-MM-DD"),
  timeFormat: z.enum(["12h", "24h"]).default("24h"),
  currency: z.string().min(3).max(3).default("USD"),
  temperatureUnit: z.enum(["celsius", "fahrenheit"]).default("celsius"),
  measurementUnit: z.enum(["metric", "imperial"]).default("metric"),
  energyUnit: z.enum(["kwh", "mwh", "btu"]).default("kwh"),
});

export const envMetadataSchema = z.object({
  tags: z.array(z.string().max(50)).max(20).optional(),
  customFields: z.record(z.string(), z.unknown()).optional(),
  source: z.enum(["web", "mobile", "api", "sensor", "manual", "import"]).default("web"),
  lastModifiedBy: z.string().uuid().optional(),
  dataQuality: z.enum(["verified", "estimated", "provisional", "raw"]).default("raw"),
  documentUrls: z.array(z.string().url()).max(20).optional(),
  imageUrls: z.array(z.string().url()).max(10).optional(),
});

export const envPricingSchema = z.object({
  serviceId: z.string().uuid().optional(),
  costCategory: z.enum(["energy", "water", "waste", "carbon", "solar", "maintenance", "consulting"]),
  description: z.string().min(1).max(200),
  unitCost: z.number().min(0),
  quantity: z.number().min(0).default(1),
  unit: z.string().max(50),
  totalCost: z.number().min(0).optional(),
  currency: z.string().min(3).max(3).default("USD"),
  periodStart: z.string().datetime().optional(),
  periodEnd: z.string().datetime().optional(),
  vendorId: z.string().uuid().optional(),
  invoiceNumber: z.string().max(100).optional(),
  notes: z.string().max(500).optional(),
});

export const envBundleSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  serviceIds: z.array(z.string().uuid()).min(1),
  bundleType: z.enum(["monitoring", "reporting", "compliance", "optimization", "full_service"]),
  discountPercentage: z.number().min(0).max(100).optional(),
  validFrom: z.string().datetime(),
  validUntil: z.string().datetime().optional(),
  maxUsageCount: z.number().int().positive().optional(),
  isActive: z.boolean().default(true),
});

export const envSubscriptionSchema = z.object({
  providerName: z.string().min(1).max(200),
  subscriptionType: z.enum(["monthly", "quarterly", "annual"]),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  cost: z.number().min(0),
  currency: z.string().min(3).max(3).default("USD"),
  autoRenew: z.boolean().default(false),
  servicesIncluded: z.array(z.string().max(200)),
  maxDataPoints: z.number().int().positive().optional(),
  supportLevel: z.enum(["basic", "standard", "premium"]).default("standard"),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
});

export const envVersionSchema = z.object({
  versionNumber: z.string().min(1).max(50),
  releaseDate: z.string().datetime(),
  changes: z.array(z.string().min(1).max(500)).min(1),
  breakingChanges: z.boolean().default(false),
  compatibility: z.string().max(500).optional(),
  isCurrent: z.boolean().default(true),
  deprecatedFeatures: z.array(z.string().max(200)).optional(),
});

export const envArchiveSchema = z.object({
  recordIds: z.array(z.string().uuid()).min(1).max(100),
  module: z.enum(["waste", "carbon", "solar", "energy", "water", "reports", "goals", "compliance"]),
  reason: z.string().min(1).max(500),
  archiveDate: z.string().datetime(),
  retainForYears: z.number().int().positive().default(5),
  notes: z.string().max(1000).optional(),
});

export const envRestoreSchema = z.object({
  recordIds: z.array(z.string().uuid()).min(1).max(100),
  module: z.enum(["waste", "carbon", "solar", "energy", "water", "reports", "goals", "compliance"]),
  reason: z.string().min(1).max(500),
  restoreToStatus: z.string().max(50).default("active"),
  notes: z.string().max(1000).optional(),
});
