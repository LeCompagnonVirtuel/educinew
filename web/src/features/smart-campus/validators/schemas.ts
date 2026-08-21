import { z } from 'zod';

// ─── Transport Schemas ───────────────────────────────────────────────────────

export const busCreateSchema = z.object({
  plateNumber: z.string().min(2).max(20),
  model: z.string().min(1).max(100),
  manufacturer: z.string().min(1).max(100),
  year: z.number().int().min(1900).max(2100),
  capacity: z.number().int().min(1).max(200),
  color: z.string().min(1).max(30),
  fuelType: z.enum(['diesel', 'gasoline', 'electric', 'hybrid']),
  status: z.enum(['active', 'inactive', 'maintenance', 'retired']).default('active'),
  gpsDeviceId: z.string().uuid().optional(),
  imageUrl: z.string().url().optional(),
  documents: z.array(z.string().url()).optional(),
  features: z.array(z.string()).optional(),
  notes: z.string().max(1000).optional(),
});

export const busUpdateSchema = z.object({
  plateNumber: z.string().min(2).max(20).optional(),
  model: z.string().min(1).max(100).optional(),
  manufacturer: z.string().min(1).max(100).optional(),
  year: z.number().int().min(1900).max(2100).optional(),
  capacity: z.number().int().min(1).max(200).optional(),
  color: z.string().min(1).max(30).optional(),
  fuelType: z.enum(['diesel', 'gasoline', 'electric', 'hybrid']).optional(),
  status: z.enum(['active', 'inactive', 'maintenance', 'retired']).optional(),
  gpsDeviceId: z.string().uuid().optional(),
  imageUrl: z.string().url().optional(),
  documents: z.array(z.string().url()).optional(),
  features: z.array(z.string()).optional(),
  notes: z.string().max(1000).optional(),
});

export const busQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['plateNumber', 'model', 'year', 'capacity', 'status', 'createdAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
});

export const busFilterSchema = z.object({
  status: z.array(z.enum(['active', 'inactive', 'maintenance', 'retired'])).optional(),
  fuelType: z.array(z.enum(['diesel', 'gasoline', 'electric', 'hybrid'])).optional(),
  manufacturer: z.array(z.string()).optional(),
  yearFrom: z.number().int().min(1900).max(2100).optional(),
  yearTo: z.number().int().min(1900).max(2100).optional(),
  capacityMin: z.number().int().min(1).max(200).optional(),
  capacityMax: z.number().int().min(1).max(200).optional(),
  hasGps: z.boolean().optional(),
});

export const routeCreateSchema = z.object({
  name: z.string().min(1).max(100),
  code: z.string().min(1).max(20),
  description: z.string().max(500).optional(),
  stops: z.array(
    z.object({
      name: z.string().min(1).max(100),
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
      order: z.number().int().min(0),
      arrivalOffset: z.number().int().min(0),
      departureOffset: z.number().int().min(0),
    })
  ).min(2),
  distance: z.number().min(0),
  estimatedDuration: z.number().int().min(1),
  zone: z.string().max(50).optional(),
  fare: z.number().min(0).optional(),
  isActive: z.boolean().default(true),
});

export const routeUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  code: z.string().min(1).max(20).optional(),
  description: z.string().max(500).optional(),
  stops: z.array(
    z.object({
      name: z.string().min(1).max(100),
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
      order: z.number().int().min(0),
      arrivalOffset: z.number().int().min(0),
      departureOffset: z.number().int().min(0),
    })
  ).min(2).optional(),
  distance: z.number().min(0).optional(),
  estimatedDuration: z.number().int().min(1).optional(),
  zone: z.string().max(50).optional(),
  fare: z.number().min(0).optional(),
  isActive: z.boolean().optional(),
});

export const tripCreateSchema = z.object({
  routeId: z.string().uuid(),
  busId: z.string().uuid(),
  driverId: z.string().uuid(),
  assistantId: z.string().uuid().optional(),
  departureTime: z.string().datetime(),
  arrivalTime: z.string().datetime(),
  direction: z.enum(['outbound', 'return']),
  status: z.enum(['scheduled', 'in_progress', 'completed', 'cancelled', 'delayed']).default('scheduled'),
  maxPassengers: z.number().int().min(1).max(200).optional(),
  notes: z.string().max(500).optional(),
});

export const tripUpdateSchema = z.object({
  routeId: z.string().uuid().optional(),
  busId: z.string().uuid().optional(),
  driverId: z.string().uuid().optional(),
  assistantId: z.string().uuid().optional(),
  departureTime: z.string().datetime().optional(),
  arrivalTime: z.string().datetime().optional(),
  direction: z.enum(['outbound', 'return']).optional(),
  status: z.enum(['scheduled', 'in_progress', 'completed', 'cancelled', 'delayed']).optional(),
  maxPassengers: z.number().int().min(1).max(200).optional(),
  notes: z.string().max(500).optional(),
});

export const driverCreateSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email(),
  phone: z.string().min(5).max(20),
  licenseNumber: z.string().min(1).max(50),
  licenseClass: z.enum(['A', 'B', 'C', 'D', 'E']),
  licenseExpiry: z.string().datetime(),
  dateOfBirth: z.string().datetime(),
  hireDate: z.string().datetime(),
  address: z.string().max(200).optional(),
  emergencyContact: z.string().max(100).optional(),
  emergencyPhone: z.string().min(5).max(20).optional(),
  status: z.enum(['active', 'inactive', 'suspended', 'on_leave']).default('active'),
  avatarUrl: z.string().url().optional(),
  qualifications: z.array(z.string()).optional(),
  notes: z.string().max(500).optional(),
});

export const driverUpdateSchema = z.object({
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(5).max(20).optional(),
  licenseNumber: z.string().min(1).max(50).optional(),
  licenseClass: z.enum(['A', 'B', 'C', 'D', 'E']).optional(),
  licenseExpiry: z.string().datetime().optional(),
  address: z.string().max(200).optional(),
  emergencyContact: z.string().max(100).optional(),
  emergencyPhone: z.string().min(5).max(20).optional(),
  status: z.enum(['active', 'inactive', 'suspended', 'on_leave']).optional(),
  avatarUrl: z.string().url().optional(),
  qualifications: z.array(z.string()).optional(),
  notes: z.string().max(500).optional(),
});

export const assistantCreateSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email(),
  phone: z.string().min(5).max(20),
  hireDate: z.string().datetime(),
  address: z.string().max(200).optional(),
  emergencyContact: z.string().max(100).optional(),
  emergencyPhone: z.string().min(5).max(20).optional(),
  status: z.enum(['active', 'inactive', 'suspended', 'on_leave']).default('active'),
  avatarUrl: z.string().url().optional(),
  notes: z.string().max(500).optional(),
});

export const assignmentCreateSchema = z.object({
  busId: z.string().uuid(),
  driverId: z.string().uuid(),
  assistantId: z.string().uuid().optional(),
  routeId: z.string().uuid(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  recurring: z.boolean().default(false),
  recurrencePattern: z.enum(['daily', 'weekly', 'weekdays', 'custom']).optional(),
  recurrenceDays: z.array(z.number().int().min(0).max(6)).optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).default('medium'),
  notes: z.string().max(500).optional(),
});

export const trackingCreateSchema = z.object({
  busId: z.string().uuid(),
  tripId: z.string().uuid().optional(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  altitude: z.number().optional(),
  speed: z.number().min(0).optional(),
  heading: z.number().min(0).max(360).optional(),
  accuracy: z.number().min(0).optional(),
  timestamp: z.string().datetime(),
  ignitionOn: z.boolean().optional(),
  fuelLevel: z.number().min(0).max(100).optional(),
  odometer: z.number().min(0).optional(),
});

export const attendanceCreateSchema = z.object({
  tripId: z.string().uuid(),
  studentId: z.string().uuid(),
  status: z.enum(['present', 'absent', 'late', 'excused']),
  pickupStop: z.string().max(100).optional(),
  dropoffStop: z.string().max(100).optional(),
  pickupTime: z.string().datetime().optional(),
  dropoffTime: z.string().datetime().optional(),
  notes: z.string().max(200).optional(),
});

export const checkInSchema = z.object({
  tripId: z.string().uuid(),
  studentId: z.string().uuid(),
  stopName: z.string().min(1).max(100),
  timestamp: z.string().datetime(),
  method: z.enum(['rfid', 'manual', 'qr_code', 'face_recognition']),
  location: z
    .object({
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
    })
    .optional(),
  verifiedBy: z.string().uuid().optional(),
});

export const checkOutSchema = z.object({
  tripId: z.string().uuid(),
  studentId: z.string().uuid(),
  stopName: z.string().min(1).max(100),
  timestamp: z.string().datetime(),
  method: z.enum(['rfid', 'manual', 'qr_code', 'face_recognition']),
  location: z
    .object({
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
    })
    .optional(),
  verifiedBy: z.string().uuid().optional(),
});

export const fuelRecordCreateSchema = z.object({
  busId: z.string().uuid(),
  date: z.string().datetime(),
  fuelType: z.enum(['diesel', 'gasoline', 'electric', 'hybrid']),
  quantity: z.number().min(0),
  unitPrice: z.number().min(0),
  totalCost: z.number().min(0),
  odometer: z.number().min(0),
  stationName: z.string().max(100).optional(),
  receiptUrl: z.string().url().optional(),
  notes: z.string().max(500).optional(),
});

export const maintenanceRecordCreateSchema = z.object({
  busId: z.string().uuid(),
  type: z.enum(['scheduled', 'unscheduled', 'repair', 'inspection', 'recall']),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  status: z.enum(['pending', 'in_progress', 'completed', 'cancelled']).default('pending'),
  cost: z.number().min(0).optional(),
  mechanicName: z.string().max(100).optional(),
  mechanicContact: z.string().max(100).optional(),
  workshopName: z.string().max(100).optional(),
  partsReplaced: z.array(z.string()).optional(),
  nextServiceDate: z.string().datetime().optional(),
  nextServiceOdometer: z.number().min(0).optional(),
  documents: z.array(z.string().url()).optional(),
  notes: z.string().max(1000).optional(),
});

export const insuranceCreateSchema = z.object({
  busId: z.string().uuid(),
  provider: z.string().min(1).max(100),
  policyNumber: z.string().min(1).max(50),
  policyType: z.enum(['comprehensive', 'third_party', 'collision', 'theft']),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  premium: z.number().min(0),
  coverageAmount: z.number().min(0),
  deductible: z.number().min(0).optional(),
  insuredValue: z.number().min(0),
  status: z.enum(['active', 'expired', 'cancelled', 'pending']).default('active'),
  documents: z.array(z.string().url()).optional(),
  notes: z.string().max(500).optional(),
});

export const incidentCreateSchema = z.object({
  busId: z.string().uuid().optional(),
  tripId: z.string().uuid().optional(),
  driverId: z.string().uuid().optional(),
  type: z.enum(['accident', 'breakdown', 'theft', 'vandalism', 'medical', 'behavioral', 'weather', 'other']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  location: z.string().max(200).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  occurredAt: z.string().datetime(),
  reportedBy: z.string().uuid(),
  involvedParties: z.array(z.string()).optional(),
  injuriesReported: z.boolean().default(false),
  injuriesDescription: z.string().max(500).optional(),
  policeReported: z.boolean().default(false),
  policeReportNumber: z.string().max(50).optional(),
  witnesses: z.array(z.string()).optional(),
  images: z.array(z.string().url()).optional(),
  documents: z.array(z.string().url()).optional(),
  status: z.enum(['reported', 'investigating', 'resolved', 'closed']).default('reported'),
  resolution: z.string().max(2000).optional(),
  notes: z.string().max(1000).optional(),
});

export const emergencyAlertCreateSchema = z.object({
  busId: z.string().uuid().optional(),
  tripId: z.string().uuid().optional(),
  driverId: z.string().uuid().optional(),
  type: z.enum(['accident', 'breakdown', 'weather', 'security', 'medical', 'evacuation', 'lockdown', 'other']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(2000),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  sendTo: z.array(z.enum(['drivers', 'parents', 'admin', 'emergency_services', 'all'])),
  autoNotify: z.boolean().default(true),
  expiresAt: z.string().datetime().optional(),
  attachments: z.array(z.string().url()).optional(),
});

export const busSearchSchema = z.object({
  q: z.string().min(1).max(200),
  filters: z
    .object({
      status: z.array(z.enum(['active', 'inactive', 'maintenance', 'retired'])).optional(),
      fuelType: z.array(z.enum(['diesel', 'gasoline', 'electric', 'hybrid'])).optional(),
      yearFrom: z.number().int().min(1900).max(2100).optional(),
      yearTo: z.number().int().min(1900).max(2100).optional(),
    })
    .optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
});

export const busBulkUpdateSchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(100),
  updates: z.object({
    status: z.enum(['active', 'inactive', 'maintenance', 'retired']).optional(),
    fuelType: z.enum(['diesel', 'gasoline', 'electric', 'hybrid']).optional(),
    features: z.array(z.string()).optional(),
    notes: z.string().max(500).optional(),
  }),
});

export const busBulkDeleteSchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(100),
  hardDelete: z.boolean().default(false),
});

export const routeOptimizeSchema = z.object({
  routeId: z.string().uuid(),
  optimizeBy: z.enum(['distance', 'time', 'cost', 'fuel']),
  constraints: z
    .object({
      avoidTolls: z.boolean().default(false),
      avoidHighways: z.boolean().default(false),
      maxStops: z.number().int().min(2).max(50).optional(),
      maxDistance: z.number().min(0).optional(),
      maxDuration: z.number().int().min(0).optional(),
    })
    .optional(),
  waypoints: z
    .array(
      z.object({
        latitude: z.number().min(-90).max(90),
        longitude: z.number().min(-180).max(180),
        name: z.string().max(100).optional(),
      })
    )
    .optional(),
});

export const tripScheduleSchema = z.object({
  routeId: z.string().uuid(),
  busId: z.string().uuid(),
  driverId: z.string().uuid(),
  assistantId: z.string().uuid().optional(),
  schedule: z.array(
    z.object({
      dayOfWeek: z.number().int().min(0).max(6),
      departures: z.array(
        z.object({
          time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
          direction: z.enum(['outbound', 'return']),
        })
      ),
    })
  ),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  term: z.string().max(50).optional(),
  notes: z.string().max(500).optional(),
});

export const driverLicenseSchema = z.object({
  driverId: z.string().uuid(),
  licenseNumber: z.string().min(1).max(50),
  licenseClass: z.enum(['A', 'B', 'C', 'D', 'E']),
  issueDate: z.string().datetime(),
  expiryDate: z.string().datetime(),
  issuingAuthority: z.string().min(1).max(100),
  issuingCountry: z.string().min(2).max(3),
  restrictions: z.array(z.string()).optional(),
  endorsements: z.array(z.string()).optional(),
  documentUrl: z.string().url().optional(),
  verified: z.boolean().default(false),
  verifiedBy: z.string().uuid().optional(),
  verifiedAt: z.string().datetime().optional(),
});

export const busSafetySchema = z.object({
  busId: z.string().uuid(),
  inspectionDate: z.string().datetime(),
  inspectorName: z.string().min(1).max(100),
  inspectorCertification: z.string().max(100).optional(),
  overallStatus: z.enum(['pass', 'fail', 'conditional']),
  items: z.array(
    z.object({
      category: z.string().min(1).max(50),
      item: z.string().min(1).max(100),
      status: z.enum(['pass', 'fail', 'na']),
      notes: z.string().max(200).optional(),
    })
  ),
  correctiveActions: z.array(z.string()).optional(),
  nextInspectionDate: z.string().datetime().optional(),
  documents: z.array(z.string().url()).optional(),
  notes: z.string().max(1000).optional(),
});

export const busInspectionSchema = z.object({
  busId: z.string().uuid(),
  type: z.enum(['annual', 'semi_annual', 'quarterly', 'monthly', 'pre_trip', 'post_trip', 'random']),
  inspectorId: z.string().uuid().optional(),
  scheduledDate: z.string().datetime(),
  completedDate: z.string().datetime().optional(),
  status: z.enum(['scheduled', 'in_progress', 'completed', 'overdue', 'cancelled']).default('scheduled'),
  result: z.enum(['pass', 'fail', 'conditional_pass']).optional(),
  findings: z.array(
    z.object({
      category: z.string().min(1).max(50),
      severity: z.enum(['minor', 'major', 'critical']),
      description: z.string().min(1).max(500),
      resolved: z.boolean().default(false),
      resolvedDate: z.string().datetime().optional(),
    })
  ).optional(),
  cost: z.number().min(0).optional(),
  documents: z.array(z.string().url()).optional(),
  notes: z.string().max(1000).optional(),
});

export const gpsConfigSchema = z.object({
  busId: z.string().uuid(),
  deviceId: z.string().min(1).max(50),
  deviceModel: z.string().max(100).optional(),
  simNumber: z.string().max(20).optional(),
  installDate: z.string().datetime().optional(),
  updateInterval: z.number().int().min(5).max(3600).default(30),
  geoFencing: z.boolean().default(false),
  geoFenceRadius: z.number().min(10).max(10000).optional(),
  speedAlert: z.boolean().default(false),
  speedLimit: z.number().min(0).max(200).optional(),
  ignitionTracking: z.boolean().default(false),
  fuelSensor: z.boolean().default(false),
  temperatureSensor: z.boolean().default(false),
  status: z.enum(['active', 'inactive', 'faulty']).default('active'),
  lastSeen: z.string().datetime().optional(),
  firmwareVersion: z.string().max(50).optional(),
  notes: z.string().max(500).optional(),
});

export const trackingConfigSchema = z.object({
  busId: z.string().uuid(),
  trackingEnabled: z.boolean().default(true),
  trackingMode: z.enum(['real_time', 'periodic', 'event_based']).default('periodic'),
  updateInterval: z.number().int().min(5).max(3600).default(30),
  historyRetentionDays: z.number().int().min(1).max(365).default(90),
  shareWithParents: z.boolean().default(true),
  shareWithAdmin: z.boolean().default(true),
  parentalAccessLevel: z.enum(['none', 'basic', 'detailed']).default('basic'),
  alerts: z
    .object({
      speeding: z.boolean().default(false),
      geofence: z.boolean().default(false),
      idle: z.boolean().default(false),
      offline: z.boolean().default(false),
      deviation: z.boolean().default(false),
    })
    .optional(),
  notifications: z
    .object({
      email: z.boolean().default(false),
      sms: z.boolean().default(false),
      push: z.boolean().default(true),
    })
    .optional(),
});

export const notificationConfigSchema = z.object({
  module: z.enum(['transport', 'library', 'academic', 'general']),
  eventType: z.string().min(1).max(100),
  enabled: z.boolean().default(true),
  channels: z.array(z.enum(['email', 'sms', 'push', 'in_app'])).min(1),
  recipients: z.array(z.enum(['admin', 'drivers', 'parents', 'students', 'staff'])),
  template: z.string().max(500).optional(),
  schedule: z
    .object({
      immediate: z.boolean().default(true),
      delayMinutes: z.number().int().min(0).max(1440).optional(),
      quietHoursStart: z.string().regex(/^\d{2}:\d{2}$/).optional(),
      quietHoursEnd: z.string().regex(/^\d{2}:\d{2}$/).optional(),
    })
    .optional(),
});

export const parentNotificationSchema = z.object({
  parentEmail: z.string().email(),
  parentPhone: z.string().min(5).max(20).optional(),
  studentId: z.string().uuid(),
  busId: z.string().uuid().optional(),
  tripId: z.string().uuid().optional(),
  type: z.enum(['pickup', 'dropoff', 'delay', 'cancellation', 'incident', 'route_change']),
  message: z.string().min(1).max(500),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  channels: z.array(z.enum(['email', 'sms', 'push'])).min(1),
  expiresAt: z.string().datetime().optional(),
});

export const busReportSchema = z.object({
  reportType: z.enum(['utilization', 'maintenance', 'fuel', 'incidents', 'attendance', 'financial', 'compliance']),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  busIds: z.array(z.string().uuid()).optional(),
  routeIds: z.array(z.string().uuid()).optional(),
  driverIds: z.array(z.string().uuid()).optional(),
  groupBy: z.enum(['day', 'week', 'month', 'quarter', 'year']).optional(),
  format: z.enum(['pdf', 'csv', 'xlsx', 'json']).default('pdf'),
  includeCharts: z.boolean().default(true),
  includeDetails: z.boolean().default(false),
  filters: z.record(z.string()).optional(),
});

export const busAnalyticsSchema = z.object({
  metric: z.enum([
    'total_buses',
    'active_buses',
    'maintenance_buses',
    'average_utilization',
    'fuel_efficiency',
    'incident_rate',
    'on_time_performance',
    'passenger_load',
    'cost_per_mile',
    'driver_performance',
  ]),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  granularity: z.enum(['hourly', 'daily', 'weekly', 'monthly']).default('daily'),
  busIds: z.array(z.string().uuid()).optional(),
  routeIds: z.array(z.string().uuid()).optional(),
  compareWith: z
    .object({
      period: z.enum(['previous_period', 'previous_year', 'custom']),
      customStart: z.string().datetime().optional(),
      customEnd: z.string().datetime().optional(),
    })
    .optional(),
});

export const busExportSchema = z.object({
  entity: z.enum(['buses', 'routes', 'trips', 'drivers', 'assignments', 'fuel_records', 'maintenance_records', 'incidents']),
  format: z.enum(['csv', 'xlsx', 'json', 'pdf']),
  dateRange: z
    .object({
      start: z.string().datetime().optional(),
      end: z.string().datetime().optional(),
    })
    .optional(),
  filters: z.record(z.string()).optional(),
  columns: z.array(z.string()).optional(),
  includeHeaders: z.boolean().default(true),
  fileName: z.string().max(100).optional(),
});

export const busImportSchema = z.object({
  entity: z.enum(['buses', 'routes', 'trips', 'drivers', 'assignments', 'fuel_records', 'maintenance_records']),
  format: z.enum(['csv', 'xlsx', 'json']),
  fileUrl: z.string().url(),
  delimiter: z.string().max(1).optional(),
  hasHeaders: z.boolean().default(true),
  mapping: z.record(z.string()).optional(),
  skipErrors: z.boolean().default(false),
  dryRun: z.boolean().default(false),
});

export const busSettingsSchema = z.object({
  organizationId: z.string().uuid(),
  defaultFuelType: z.enum(['diesel', 'gasoline', 'electric', 'hybrid']).default('diesel'),
  maxSpeed: z.number().min(0).max(200).default(80),
  idleTimeout: z.number().int().min(1).max(60).default(5),
  trackingEnabled: z.boolean().default(true),
  trackingInterval: z.number().int().min(5).max(3600).default(30),
  parentNotificationEnabled: z.boolean().default(true),
  incidentReportingEnabled: z.boolean().default(true),
  maintenanceReminders: z.boolean().default(true),
  maintenanceIntervalDays: z.number().int().min(1).max(365).default(30),
  insuranceReminders: z.boolean().default(true),
  insuranceReminderDays: z.number().int().min(1).max(90).default(30),
  customFields: z
    .array(
      z.object({
        name: z.string().min(1).max(50),
        type: z.enum(['text', 'number', 'boolean', 'date', 'select']),
        options: z.array(z.string()).optional(),
        required: z.boolean().default(false),
      })
    )
    .optional(),
});

export const busAccessibilitySchema = z.object({
  busId: z.string().uuid(),
  wheelchairAccess: z.boolean().default(false),
  wheelchairLift: z.boolean().default(false),
  wheelchairRamp: z.boolean().default(false),
  prioritySeating: z.number().int().min(0).max(20).default(0),
  handrails: z.boolean().default(false),
  audioAnnouncements: z.boolean().default(false),
  visualDisplays: z.boolean().default(false),
  brailleSignage: z.boolean().default(false),
  lowFloor: z.boolean().default(false),
  kneelingBus: z.boolean().default(false),
  bikeRack: z.boolean().default(false),
  accessibilityRating: z.enum(['basic', 'standard', 'enhanced', 'full']).default('basic'),
  lastAuditDate: z.string().datetime().optional(),
  complianceStatus: z.enum(['compliant', 'non_compliant', 'pending_review']).default('pending_review'),
  notes: z.string().max(500).optional(),
});

export const busLocalizationSchema = z.object({
  busId: z.string().uuid(),
  language: z.string().min(2).max(10).default('en'),
  announcements: z
    .array(
      z.object({
        key: z.string().min(1).max(100),
        value: z.string().min(1).max(500),
      })
    )
    .optional(),
  signage: z
    .array(
      z.object({
        location: z.string().min(1).max(50),
        text: z.string().min(1).max(100),
      })
    )
    .optional(),
  audioPrompts: z
    .array(
      z.object({
        key: z.string().min(1).max(100),
        audioUrl: z.string().url(),
        transcription: z.string().max(500).optional(),
      })
    )
    .optional(),
});

export const busMetadataSchema = z.object({
  busId: z.string().uuid(),
  tags: z.array(z.string().max(50)).optional(),
  customAttributes: z.record(z.string()).optional(),
  category: z.string().max(50).optional(),
  subcategory: z.string().max(50).optional(),
  fleet: z.string().max(50).optional(),
  depot: z.string().max(100).optional(),
  acquisitionDate: z.string().datetime().optional(),
  acquisitionCost: z.number().min(0).optional(),
  currentValue: z.number().min(0).optional(),
  depreciationMethod: z.enum(['straight_line', 'declining_balance', 'units_of_production']).optional(),
  usefulLifeYears: z.number().int().min(1).max(30).optional(),
  salvageValue: z.number().min(0).optional(),
  warrantyExpiry: z.string().datetime().optional(),
  supplier: z.string().max(100).optional(),
  purchaseOrderNumber: z.string().max(50).optional(),
});

export const busPricingSchema = z.object({
  busId: z.string().uuid(),
  routeId: z.string().uuid().optional(),
  fareType: z.enum(['flat', 'distance', 'zone', 'time_based']),
  baseFare: z.number().min(0),
  perKmRate: z.number().min(0).optional(),
  perMinuteRate: z.number().min(0).optional(),
  zones: z
    .array(
      z.object({
        name: z.string().min(1).max(50),
        fare: z.number().min(0),
      })
    )
    .optional(),
  discounts: z
    .array(
      z.object({
        type: z.enum(['percentage', 'fixed']),
        value: z.number().min(0),
        condition: z.string().max(100),
      })
    )
    .optional(),
  effectiveFrom: z.string().datetime(),
  effectiveTo: z.string().datetime().optional(),
  currency: z.string().min(3).max(3).default('USD'),
});

export const busBundleSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  type: z.enum(['route_pass', 'time_pass', 'student_pass', 'staff_pass']),
  busIds: z.array(z.string().uuid()).min(1),
  routeIds: z.array(z.string().uuid()).optional(),
  validFrom: z.string().datetime(),
  validTo: z.string().datetime(),
  maxRides: z.number().int().min(1).optional(),
  maxDailyRides: z.number().int().min(1).optional(),
  price: z.number().min(0),
  currency: z.string().min(3).max(3).default('USD'),
  status: z.enum(['active', 'inactive', 'sold_out']).default('active'),
  totalQuantity: z.number().int().min(1).optional(),
  soldQuantity: z.number().int().min(0).default(0),
});

export const busSubscriptionSchema = z.object({
  busId: z.string().uuid().optional(),
  routeId: z.string().uuid().optional(),
  bundleId: z.string().uuid().optional(),
  subscriberId: z.string().uuid(),
  subscriberType: z.enum(['student', 'staff', 'parent']),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  billingCycle: z.enum(['monthly', 'quarterly', 'semester', 'annual']),
  autoRenew: z.boolean().default(false),
  price: z.number().min(0),
  currency: z.string().min(3).max(3).default('USD'),
  paymentMethod: z.enum(['cash', 'card', 'bank_transfer', 'mobile']).optional(),
  status: z.enum(['active', 'paused', 'cancelled', 'expired']).default('active'),
  ridesUsed: z.number().int().min(0).default(0),
  maxRides: z.number().int().min(1).optional(),
  notes: z.string().max(500).optional(),
});

export const busVersionSchema = z.object({
  busId: z.string().uuid(),
  version: z.string().min(1).max(20),
  changes: z.array(z.string().min(1).max(200)),
  releasedAt: z.string().datetime(),
  releasedBy: z.string().uuid().optional(),
  isBreaking: z.boolean().default(false),
  compatibility: z.string().max(200).optional(),
  notes: z.string().max(1000).optional(),
});

export const busArchiveSchema = z.object({
  busIds: z.array(z.string().uuid()).min(1).max(100),
  reason: z.enum(['retired', 'sold', 'damaged', 'replaced', 'other']),
  archiveDate: z.string().datetime(),
  transferTo: z.string().max(200).optional(),
  salePrice: z.number().min(0).optional(),
  buyerName: z.string().max(100).optional(),
  documents: z.array(z.string().url()).optional(),
  notes: z.string().max(1000).optional(),
  deleteTrips: z.boolean().default(false),
  deleteAssignments: z.boolean().default(false),
});

export const busRestoreSchema = z.object({
  busIds: z.array(z.string().uuid()).min(1).max(100),
  restoreTrips: z.boolean().default(false),
  restoreAssignments: z.boolean().default(false),
  newStatus: z.enum(['active', 'inactive', 'maintenance']).default('active'),
  notes: z.string().max(500).optional(),
});

export const busDuplicationSchema = z.object({
  sourceBusId: z.string().uuid(),
  count: z.number().int().min(1).max(10),
  prefix: z.string().max(10).optional(),
  includeGps: z.boolean().default(false),
  includeInsurance: z.boolean().default(false),
  includeMaintenance: z.boolean().default(false),
  resetOdometer: z.boolean().default(true),
  newPlateNumbers: z.boolean().default(true),
  notes: z.string().max(500).optional(),
});

export const busTemplateSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  category: z.string().min(1).max(50),
  templateData: z.object({
    model: z.string().min(1).max(100),
    manufacturer: z.string().min(1).max(100),
    capacity: z.number().int().min(1).max(200),
    fuelType: z.enum(['diesel', 'gasoline', 'electric', 'hybrid']),
    features: z.array(z.string()).optional(),
    accessibility: z
      .object({
        wheelchairAccess: z.boolean().default(false),
        audioAnnouncements: z.boolean().default(false),
        visualDisplays: z.boolean().default(false),
      })
      .optional(),
    customFields: z.record(z.string()).optional(),
  }),
  tags: z.array(z.string().max(50)).optional(),
  isPublic: z.boolean().default(false),
  createdBy: z.string().uuid().optional(),
});

// ─── Library Schemas ─────────────────────────────────────────────────────────

export const bookCreateSchema = z.object({
  isbn: z.string().min(10).max(17).optional(),
  title: z.string().min(1).max(200),
  subtitle: z.string().max(200).optional(),
  authorId: z.string().uuid().optional(),
  authorName: z.string().min(1).max(100).optional(),
  publisherId: z.string().uuid().optional(),
  publisherName: z.string().min(1).max(100).optional(),
  categoryId: z.string().uuid().optional(),
  categoryName: z.string().min(1).max(100).optional(),
  edition: z.string().max(50).optional(),
  publicationYear: z.number().int().min(1000).max(2100).optional(),
  language: z.string().min(2).max(10).default('en'),
  pages: z.number().int().min(1).max(10000).optional(),
  format: z.enum(['hardcover', 'paperback', 'ebook', 'audiobook', 'other']),
  description: z.string().max(5000).optional(),
  coverImage: z.string().url().optional(),
  tags: z.array(z.string().max(50)).optional(),
  deweyDecimal: z.string().max(20).optional(),
  lccNumber: z.string().max(20).optional(),
  subjects: z.array(z.string().max(100)).optional(),
  status: z.enum(['available', 'unavailable', 'withdrawn', 'damaged']).default('available'),
  totalCopies: z.number().int().min(0).default(0),
  availableCopies: z.number().int().min(0).default(0),
});

export const bookUpdateSchema = z.object({
  isbn: z.string().min(10).max(17).optional(),
  title: z.string().min(1).max(200).optional(),
  subtitle: z.string().max(200).optional(),
  authorId: z.string().uuid().optional(),
  authorName: z.string().min(1).max(100).optional(),
  publisherId: z.string().uuid().optional(),
  publisherName: z.string().min(1).max(100).optional(),
  categoryId: z.string().uuid().optional(),
  categoryName: z.string().min(1).max(100).optional(),
  edition: z.string().max(50).optional(),
  publicationYear: z.number().int().min(1000).max(2100).optional(),
  language: z.string().min(2).max(10).optional(),
  pages: z.number().int().min(1).max(10000).optional(),
  format: z.enum(['hardcover', 'paperback', 'ebook', 'audiobook', 'other']).optional(),
  description: z.string().max(5000).optional(),
  coverImage: z.string().url().optional(),
  tags: z.array(z.string().max(50)).optional(),
  deweyDecimal: z.string().max(20).optional(),
  lccNumber: z.string().max(20).optional(),
  subjects: z.array(z.string().max(100)).optional(),
  status: z.enum(['available', 'unavailable', 'withdrawn', 'damaged']).optional(),
});

export const bookQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['title', 'author', 'publicationYear', 'createdAt', 'popularity']).default('title'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  search: z.string().max(200).optional(),
});

export const bookFilterSchema = z.object({
  status: z.array(z.enum(['available', 'unavailable', 'withdrawn', 'damaged'])).optional(),
  format: z.array(z.enum(['hardcover', 'paperback', 'ebook', 'audiobook', 'other'])).optional(),
  authorIds: z.array(z.string().uuid()).optional(),
  publisherIds: z.array(z.string().uuid()).optional(),
  categoryIds: z.array(z.string().uuid()).optional(),
  languages: z.array(z.string()).optional(),
  publicationYearFrom: z.number().int().min(1000).max(2100).optional(),
  publicationYearTo: z.number().int().min(1000).max(2100).optional(),
  hasAvailableCopies: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

export const authorCreateSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  biography: z.string().max(2000).optional(),
  dateOfBirth: z.string().datetime().optional(),
  dateOfDeath: z.string().datetime().optional(),
  nationality: z.string().max(50).optional(),
  website: z.string().url().optional(),
  email: z.string().email().optional(),
  avatarUrl: z.string().url().optional(),
  aliases: z.array(z.string().max(100)).optional(),
  awards: z.array(z.string().max(200)).optional(),
  notes: z.string().max(1000).optional(),
});

export const authorUpdateSchema = z.object({
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
  biography: z.string().max(2000).optional(),
  dateOfBirth: z.string().datetime().optional(),
  dateOfDeath: z.string().datetime().optional(),
  nationality: z.string().max(50).optional(),
  website: z.string().url().optional(),
  email: z.string().email().optional(),
  avatarUrl: z.string().url().optional(),
  aliases: z.array(z.string().max(100)).optional(),
  awards: z.array(z.string().max(200)).optional(),
  notes: z.string().max(1000).optional(),
});

export const publisherCreateSchema = z.object({
  name: z.string().min(1).max(150),
  description: z.string().max(1000).optional(),
  website: z.string().url().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(5).max(20).optional(),
  address: z.string().max(200).optional(),
  city: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  logoUrl: z.string().url().optional(),
  foundedYear: z.number().int().min(1000).max(2100).optional(),
  status: z.enum(['active', 'inactive', 'defunct']).default('active'),
  notes: z.string().max(500).optional(),
});

export const publisherUpdateSchema = z.object({
  name: z.string().min(1).max(150).optional(),
  description: z.string().max(1000).optional(),
  website: z.string().url().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(5).max(20).optional(),
  address: z.string().max(200).optional(),
  city: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  logoUrl: z.string().url().optional(),
  foundedYear: z.number().int().min(1000).max(2100).optional(),
  status: z.enum(['active', 'inactive', 'defunct']).optional(),
  notes: z.string().max(500).optional(),
});

export const categoryCreateSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  parentId: z.string().uuid().optional(),
  icon: z.string().max(50).optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  metadata: z.record(z.string()).optional(),
});

export const categoryUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  parentId: z.string().uuid().optional(),
  icon: z.string().max(50).optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  sortOrder: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.string()).optional(),
});

export const copyCreateSchema = z.object({
  bookId: z.string().uuid(),
  barcode: z.string().min(1).max(50),
  rfidTag: z.string().max(50).optional(),
  acquisitionDate: z.string().datetime(),
  acquisitionPrice: z.number().min(0).optional(),
  condition: z.enum(['new', 'good', 'fair', 'poor', 'damaged']).default('new'),
  status: z.enum(['available', 'on_loan', 'reserved', 'maintenance', 'lost', 'withdrawn']).default('available'),
  location: z.string().max(100).optional(),
  shelfNumber: z.string().max(20).optional(),
  branchId: z.string().uuid().optional(),
  notes: z.string().max(500).optional(),
  donorName: z.string().max(100).optional(),
  donorContact: z.string().max(100).optional(),
});

export const copyUpdateSchema = z.object({
  barcode: z.string().min(1).max(50).optional(),
  rfidTag: z.string().max(50).optional(),
  condition: z.enum(['new', 'good', 'fair', 'poor', 'damaged']).optional(),
  status: z.enum(['available', 'on_loan', 'reserved', 'maintenance', 'lost', 'withdrawn']).optional(),
  location: z.string().max(100).optional(),
  shelfNumber: z.string().max(20).optional(),
  branchId: z.string().uuid().optional(),
  notes: z.string().max(500).optional(),
  lastRepairDate: z.string().datetime().optional(),
  repairCost: z.number().min(0).optional(),
});

export const loanCreateSchema = z.object({
  copyId: z.string().uuid(),
  memberId: z.string().uuid(),
  loanDate: z.string().datetime(),
  dueDate: z.string().datetime(),
  renewalsAllowed: z.number().int().min(0).max(10).default(2),
  loanType: z.enum(['regular', 'extended', 'reference', 'interlibrary']).default('regular'),
  notes: z.string().max(500).optional(),
});

export const loanReturnSchema = z.object({
  loanId: z.string().uuid(),
  returnDate: z.string().datetime(),
  condition: z.enum(['good', 'fair', 'poor', 'damaged']).default('good'),
  fineAmount: z.number().min(0).optional(),
  fineReason: z.enum(['overdue', 'damage', 'lost', 'other']).optional(),
  notes: z.string().max(500).optional(),
});

export const reservationCreateSchema = z.object({
  bookId: z.string().uuid(),
  memberId: z.string().uuid(),
  reservedAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
  priority: z.number().int().min(0).max(100).default(0),
  notificationSent: z.boolean().default(false),
  notes: z.string().max(500).optional(),
});

export const reservationCancelSchema = z.object({
  reservationId: z.string().uuid(),
  reason: z.enum(['member_cancelled', 'book_available', 'expired', 'other']),
  cancelledAt: z.string().datetime(),
  notes: z.string().max(500).optional(),
});

export const fineCreateSchema = z.object({
  memberId: z.string().uuid(),
  loanId: z.string().uuid().optional(),
  type: z.enum(['overdue', 'damage', 'lost', 'processing', 'other']),
  amount: z.number().min(0),
  currency: z.string().min(3).max(3).default('USD'),
  description: z.string().max(500).optional(),
  issuedAt: z.string().datetime(),
  dueDate: z.string().datetime().optional(),
  status: z.enum(['pending', 'partial', 'paid', 'waived', 'collected']).default('pending'),
  paymentMethod: z.enum(['cash', 'card', 'bank_transfer', 'mobile', 'other']).optional(),
  waivedBy: z.string().uuid().optional(),
  waiveReason: z.string().max(200).optional(),
});

export const finePaySchema = z.object({
  fineId: z.string().uuid(),
  amount: z.number().min(0),
  paymentMethod: z.enum(['cash', 'card', 'bank_transfer', 'mobile', 'other']),
  paymentDate: z.string().datetime(),
  receiptNumber: z.string().max(50).optional(),
  notes: z.string().max(500).optional(),
});

export const eBookCreateSchema = z.object({
  bookId: z.string().uuid().optional(),
  title: z.string().min(1).max(200),
  author: z.string().min(1).max(100),
  fileUrl: z.string().url(),
  fileSize: z.number().int().min(1),
  format: z.enum(['pdf', 'epub', 'mobi', 'txt', 'other']),
  drm: z.boolean().default(false),
  drmType: z.enum(['adobe_drm', 'watermark', 'none']).default('none'),
  maxDownloads: z.number().int().min(1).optional(),
  maxConcurrentUsers: z.number().int().min(1).optional(),
  expiryDays: z.number().int().min(1).optional(),
  tags: z.array(z.string().max(50)).optional(),
  description: z.string().max(2000).optional(),
  coverImage: z.string().url().optional(),
  previewPages: z.number().int().min(0).optional(),
  status: z.enum(['active', 'inactive', 'pending_review']).default('active'),
});

export const audiobookCreateSchema = z.object({
  bookId: z.string().uuid().optional(),
  title: z.string().min(1).max(200),
  author: z.string().min(1).max(100),
  narrator: z.string().min(1).max(100),
  fileUrl: z.string().url(),
  fileSize: z.number().int().min(1),
  durationMinutes: z.number().int().min(1),
  format: z.enum(['mp3', 'm4b', 'wav', 'other']),
  chapters: z
    .array(
      z.object({
        title: z.string().min(1).max(100),
        startTime: z.number().int().min(0),
        endTime: z.number().int().min(0),
      })
    )
    .optional(),
  sampleUrl: z.string().url().optional(),
  tags: z.array(z.string().max(50)).optional(),
  description: z.string().max(2000).optional(),
  coverImage: z.string().url().optional(),
  status: z.enum(['active', 'inactive', 'pending_review']).default('active'),
});

export const rfidCreateSchema = z.object({
  copyId: z.string().uuid(),
  tagId: z.string().min(1).max(50),
  frequency: z.enum(['hf_1356mhz', 'uhf_860_960mhz']),
  protocol: z.enum(['iso14443a', 'iso14443b', 'iso15693', 'epc_gen2']).optional(),
  manufacturer: z.string().max(100).optional(),
  model: z.string().max(100).optional(),
  writeDate: z.string().datetime(),
  writeStatus: z.enum(['success', 'failed', 'pending']).default('pending'),
  readRange: z.number().min(0).optional(),
  antiTheft: z.boolean().default(true),
  selfCheck: z.boolean().default(false),
  notes: z.string().max(500).optional(),
});

export const rfidUpdateSchema = z.object({
  tagId: z.string().min(1).max(50).optional(),
  writeStatus: z.enum(['success', 'failed', 'pending']).optional(),
  readRange: z.number().min(0).optional(),
  antiTheft: z.boolean().optional(),
  selfCheck: z.boolean().optional(),
  notes: z.string().max(500).optional(),
  lastScanDate: z.string().datetime().optional(),
  lastScanLocation: z.string().max(100).optional(),
});

export const barcodeCreateSchema = z.object({
  copyId: z.string().uuid(),
  barcode: z.string().min(1).max(50),
  format: z.enum(['code39', 'code128', 'ean13', 'upc_a', 'qr_code', 'other']),
  labelPrinted: z.boolean().default(false),
  labelPrintDate: z.string().datetime().optional(),
  primary: z.boolean().default(true),
  notes: z.string().max(500).optional(),
});

export const inventoryCreateSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  status: z.enum(['scheduled', 'in_progress', 'completed', 'cancelled']).default('scheduled'),
  scope: z.enum(['full', 'partial', 'branch', 'category']),
  branchId: z.string().uuid().optional(),
  categoryIds: z.array(z.string().uuid()).optional(),
  assignedTo: z.array(z.string().uuid()).optional(),
  items: z
    .array(
      z.object({
        copyId: z.string().uuid(),
        status: z.enum(['counted', 'missing', 'damaged', 'misplaced']),
        location: z.string().max(100).optional(),
        notes: z.string().max(200).optional(),
      })
    )
    .optional(),
  summary: z
    .object({
      totalItems: z.number().int().min(0),
      countedItems: z.number().int().min(0),
      missingItems: z.number().int().min(0),
      damagedItems: z.number().int().min(0),
      misplacedItems: z.number().int().min(0),
    })
    .optional(),
  notes: z.string().max(1000).optional(),
});

export const acquisitionCreateSchema = z.object({
  title: z.string().min(1).max(200),
  author: z.string().min(1).max(100),
  isbn: z.string().min(10).max(17).optional(),
  publisher: z.string().min(1).max(100).optional(),
  format: z.enum(['hardcover', 'paperback', 'ebook', 'audiobook', 'other']),
  quantity: z.number().int().min(1).max(1000),
  unitPrice: z.number().min(0),
  totalPrice: z.number().min(0),
  currency: z.string().min(3).max(3).default('USD'),
  vendor: z.string().min(1).max(100),
  vendorContact: z.string().max(100).optional(),
  requestor: z.string().uuid(),
  requestDate: z.string().datetime(),
  approvalStatus: z.enum(['pending', 'approved', 'rejected', 'ordered', 'received']).default('pending'),
  approvedBy: z.string().uuid().optional(),
  approvalDate: z.string().datetime().optional(),
  expectedDelivery: z.string().datetime().optional(),
  actualDelivery: z.string().datetime().optional(),
  budgetCode: z.string().max(50).optional(),
  justification: z.string().max(1000).optional(),
  notes: z.string().max(500).optional(),
});

export const recommendationCreateSchema = z.object({
  bookId: z.string().uuid().optional(),
  title: z.string().min(1).max(200),
  author: z.string().min(1).max(100),
  isbn: z.string().min(10).max(17).optional(),
  reason: z.string().min(1).max(1000),
  recommendedBy: z.string().uuid(),
  recommendedFor: z.array(z.enum(['students', 'faculty', 'general', 'children', 'teens'])),
  category: z.string().max(100).optional(),
  urgency: z.enum(['low', 'medium', 'high']).default('medium'),
  status: z.enum(['pending', 'approved', 'purchased', 'declined']).default('pending'),
  reviewedBy: z.string().uuid().optional(),
  reviewNotes: z.string().max(500).optional(),
  submittedAt: z.string().datetime(),
  reviewedAt: z.string().datetime().optional(),
});

export const libraryCardCreateSchema = z.object({
  memberId: z.string().uuid(),
  cardNumber: z.string().min(1).max(50),
  cardType: z.enum(['student', 'faculty', 'staff', 'guest', 'honorary']),
  issuedDate: z.string().datetime(),
  expiryDate: z.string().datetime(),
  status: z.enum(['active', 'inactive', 'suspended', 'expired']).default('active'),
  branchId: z.string().uuid().optional(),
  maxLoans: z.number().int().min(1).max(50).default(5),
  maxReservations: z.number().int().min(1).max(20).default(3),
  loanPeriodDays: z.number().int().min(1).max(90).default(14),
  canBorrowEbooks: z.boolean().default(true),
  canReserve: z.boolean().default(true),
  notes: z.string().max(500).optional(),
});

export const libraryCardUpdateSchema = z.object({
  cardNumber: z.string().min(1).max(50).optional(),
  cardType: z.enum(['student', 'faculty', 'staff', 'guest', 'honorary']).optional(),
  expiryDate: z.string().datetime().optional(),
  status: z.enum(['active', 'inactive', 'suspended', 'expired']).optional(),
  branchId: z.string().uuid().optional(),
  maxLoans: z.number().int().min(1).max(50).optional(),
  maxReservations: z.number().int().min(1).max(20).optional(),
  loanPeriodDays: z.number().int().min(1).max(90).optional(),
  canBorrowEbooks: z.boolean().optional(),
  canReserve: z.boolean().optional(),
  notes: z.string().max(500).optional(),
});

export const bookSearchSchema = z.object({
  q: z.string().min(1).max(200),
  filters: z
    .object({
      status: z.array(z.enum(['available', 'unavailable', 'withdrawn', 'damaged'])).optional(),
      format: z.array(z.enum(['hardcover', 'paperback', 'ebook', 'audiobook', 'other'])).optional(),
      categoryIds: z.array(z.string().uuid()).optional(),
      authorIds: z.array(z.string().uuid()).optional(),
      language: z.string().optional(),
      yearFrom: z.number().int().min(1000).max(2100).optional(),
      yearTo: z.number().int().min(1000).max(2100).optional(),
      hasEbook: z.boolean().optional(),
      hasAudiobook: z.boolean().optional(),
    })
    .optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['relevance', 'title', 'author', 'publicationYear', 'popularity']).default('relevance'),
});

export const bookBulkUpdateSchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(100),
  updates: z.object({
    status: z.enum(['available', 'unavailable', 'withdrawn', 'damaged']).optional(),
    categoryId: z.string().uuid().optional(),
    tags: z.array(z.string()).optional(),
    notes: z.string().max(500).optional(),
  }),
});

export const bookBulkDeleteSchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(100),
  hardDelete: z.boolean().default(false),
});

export const bookExportSchema = z.object({
  entity: z.enum(['books', 'copies', 'authors', 'publishers', 'categories', 'loans', 'reservations', 'fines', 'members']),
  format: z.enum(['csv', 'xlsx', 'json', 'pdf']),
  dateRange: z
    .object({
      start: z.string().datetime().optional(),
      end: z.string().datetime().optional(),
    })
    .optional(),
  filters: z.record(z.string()).optional(),
  columns: z.array(z.string()).optional(),
  includeHeaders: z.boolean().default(true),
  fileName: z.string().max(100).optional(),
});

export const bookImportSchema = z.object({
  entity: z.enum(['books', 'copies', 'authors', 'publishers', 'categories', 'members']),
  format: z.enum(['csv', 'xlsx', 'json']),
  fileUrl: z.string().url(),
  delimiter: z.string().max(1).optional(),
  hasHeaders: z.boolean().default(true),
  mapping: z.record(z.string()).optional(),
  skipErrors: z.boolean().default(false),
  dryRun: z.boolean().default(false),
});

export const bookSettingsSchema = z.object({
  organizationId: z.string().uuid(),
  defaultLoanPeriod: z.number().int().min(1).max(90).default(14),
  maxRenewals: z.number().int().min(0).max(10).default(2),
  maxReservations: z.number().int().min(1).max(20).default(3),
  reservationExpiryDays: z.number().int().min(1).max(30).default(7),
  finePerDay: z.number().min(0).default(0.25),
  maxFine: z.number().min(0).default(25),
  lostBookFee: z.number().min(0).default(50),
  damagedBookFeePercentage: z.number().min(0).max(100).default(50),
  autoRenewEnabled: z.boolean().default(true),
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  reminderDaysBeforeDue: z.number().int().min(1).max(30).default(3),
  reminderDaysAfterDue: z.array(z.number().int().min(1).max(90)).default([1, 3, 7, 14]),
  interlibraryLoanEnabled: z.boolean().default(false),
  ebookLendingEnabled: z.boolean().default(true),
  audiobookLendingEnabled: z.boolean().default(true),
  selfCheckoutEnabled: z.boolean().default(false),
  rfidEnabled: z.boolean().default(false),
  barcodeEnabled: z.boolean().default(true),
  customFields: z
    .array(
      z.object({
        name: z.string().min(1).max(50),
        type: z.enum(['text', 'number', 'boolean', 'date', 'select']),
        options: z.array(z.string()).optional(),
        required: z.boolean().default(false),
      })
    )
    .optional(),
});

export const bookAccessibilitySchema = z.object({
  bookId: z.string().uuid(),
  largePrint: z.boolean().default(false),
  braille: z.boolean().default(false),
  audioDescription: z.boolean().default(false),
  screenReaderCompatible: z.boolean().default(false),
  dyslexicFont: z.boolean().default(false),
  highContrast: z.boolean().default(false),
  textToSpeech: z.boolean().default(false),
  signLanguage: z.boolean().default(false),
  simplifiedLanguage: z.boolean().default(false),
  epubFormat: z.boolean().default(false),
  accessibilityRating: z.enum(['none', 'basic', 'standard', 'enhanced']).default('none'),
  lastAuditDate: z.string().datetime().optional(),
  complianceStatus: z.enum(['compliant', 'non_compliant', 'pending_review']).default('pending_review'),
  notes: z.string().max(500).optional(),
});

export const bookLocalizationSchema = z.object({
  bookId: z.string().uuid(),
  language: z.string().min(2).max(10).default('en'),
  titleLocalized: z.string().max(200).optional(),
  descriptionLocalized: z.string().max(5000).optional(),
  subjects: z.array(z.string().max(100)).optional(),
  keywords: z.array(z.string().max(50)).optional(),
  readingLevel: z.enum(['beginner', 'elementary', 'intermediate', 'advanced', 'expert']).optional(),
  ageRange: z
    .object({
      min: z.number().int().min(0).max(100),
      max: z.number().int().min(0).max(100),
    })
    .optional(),
  culturalNotes: z.string().max(1000).optional(),
});

export const bookMetadataSchema = z.object({
  bookId: z.string().uuid(),
  tags: z.array(z.string().max(50)).optional(),
  customAttributes: z.record(z.string()).optional(),
  series: z.string().max(100).optional(),
  seriesNumber: z.number().int().min(0).optional(),
  awards: z.array(z.string().max(200)).optional(),
  reviews: z
    .array(
      z.object({
        source: z.string().min(1).max(100),
        rating: z.number().min(0).max(5),
        url: z.string().url().optional(),
      })
    )
    .optional(),
  relatedBooks: z.array(z.string().uuid()).optional(),
  similarBooks: z.array(z.string().uuid()).optional(),
  readingLists: z.array(z.string().uuid()).optional(),
  popularityScore: z.number().min(0).optional(),
  lastUpdated: z.string().datetime().optional(),
});

export const bookPricingSchema = z.object({
  bookId: z.string().uuid(),
  retailPrice: z.number().min(0),
  currency: z.string().min(3).max(3).default('USD'),
  purchasePrice: z.number().min(0).optional(),
  replacementCost: z.number().min(0).optional(),
  insuranceValue: z.number().min(0).optional(),
  ebookPrice: z.number().min(0).optional(),
  audiobookPrice: z.number().min(0).optional(),
  rentalPrice: z.number().min(0).optional(),
  rentalPeriodDays: z.number().int().min(1).optional(),
  effectiveFrom: z.string().datetime(),
  effectiveTo: z.string().datetime().optional(),
  vendor: z.string().max(100).optional(),
  purchaseOrderNumber: z.string().max(50).optional(),
});

export const bookBundleSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  type: z.enum(['thematic', 'course', 'age_group', 'reading_level', 'custom']),
  bookIds: z.array(z.string().uuid()).min(2),
  discountPercentage: z.number().min(0).max(100).default(0),
  validFrom: z.string().datetime(),
  validTo: z.string().datetime().optional(),
  maxQuantity: z.number().int().min(1).optional(),
  status: z.enum(['active', 'inactive', 'sold_out']).default('active'),
  tags: z.array(z.string().max(50)).optional(),
  coverImage: z.string().url().optional(),
  notes: z.string().max(500).optional(),
});

export const bookSubscriptionSchema = z.object({
  bookId: z.string().uuid().optional(),
  bundleId: z.string().uuid().optional(),
  subscriberId: z.string().uuid(),
  subscriberType: z.enum(['student', 'faculty', 'staff', 'guest']),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  billingCycle: z.enum(['monthly', 'quarterly', 'semester', 'annual']),
  autoRenew: z.boolean().default(false),
  price: z.number().min(0),
  currency: z.string().min(3).max(3).default('USD'),
  paymentMethod: z.enum(['cash', 'card', 'bank_transfer', 'mobile']).optional(),
  status: z.enum(['active', 'paused', 'cancelled', 'expired']).default('active'),
  accessLevel: z.enum(['read_only', 'download', 'full']).default('read_only'),
  maxDownloads: z.number().int().min(1).optional(),
  downloadsUsed: z.number().int().min(0).default(0),
  notes: z.string().max(500).optional(),
});

export const bookVersionSchema = z.object({
  bookId: z.string().uuid(),
  version: z.string().min(1).max(20),
  changes: z.array(z.string().min(1).max(200)),
  releasedAt: z.string().datetime(),
  releasedBy: z.string().uuid().optional(),
  isBreaking: z.boolean().default(false),
  compatibility: z.string().max(200).optional(),
  notes: z.string().max(1000).optional(),
});

export const bookArchiveSchema = z.object({
  bookIds: z.array(z.string().uuid()).min(1).max(100),
  reason: z.enum(['outdated', 'damaged', 'withdrawn', 'replaced', 'other']),
  archiveDate: z.string().datetime(),
  transferTo: z.string().max(200).optional(),
  disposalMethod: z.enum(['donated', 'recycled', 'destroyed', 'sold', 'other']).optional(),
  salePrice: z.number().min(0).optional(),
  recipientName: z.string().max(100).optional(),
  documents: z.array(z.string().url()).optional(),
  notes: z.string().max(1000).optional(),
  deleteCopies: z.boolean().default(false),
  deleteLoans: z.boolean().default(false),
});

export const bookRestoreSchema = z.object({
  bookIds: z.array(z.string().uuid()).min(1).max(100),
  restoreCopies: z.boolean().default(false),
  restoreLoans: z.boolean().default(false),
  newStatus: z.enum(['available', 'unavailable', 'damaged']).default('available'),
  notes: z.string().max(500).optional(),
});

export const bookDuplicationSchema = z.object({
  sourceBookId: z.string().uuid(),
  count: z.number().int().min(1).max(10),
  prefix: z.string().max(10).optional(),
  includeCopies: z.boolean().default(false),
  includeMetadata: z.boolean().default(true),
  newIsbn: z.boolean().default(true),
  notes: z.string().max(500).optional(),
});

export const bookTemplateSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  category: z.string().min(1).max(50),
  templateData: z.object({
    format: z.enum(['hardcover', 'paperback', 'ebook', 'audiobook', 'other']),
    language: z.string().min(2).max(10).default('en'),
    defaultLoanPeriod: z.number().int().min(1).max(90).optional(),
    tags: z.array(z.string().max(50)).optional(),
    accessibility: z
      .object({
        largePrint: z.boolean().default(false),
        braille: z.boolean().default(false),
        screenReaderCompatible: z.boolean().default(false),
      })
      .optional(),
    customFields: z.record(z.string()).optional(),
  }),
  tags: z.array(z.string().max(50)).optional(),
  isPublic: z.boolean().default(false),
  createdBy: z.string().uuid().optional(),
});

export const bookReviewSchema = z.object({
  bookId: z.string().uuid(),
  reviewerId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(5000),
  spoilerWarning: z.boolean().default(false),
  helpfulCount: z.number().int().min(0).default(0),
  status: z.enum(['published', 'hidden', 'flagged', 'deleted']).default('published'),
  moderatorNotes: z.string().max(500).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
});

export const bookRatingSchema = z.object({
  bookId: z.string().uuid(),
  memberId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  reviewId: z.string().uuid().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
});

export const bookReportSchema = z.object({
  reportType: z.enum(['circulation', 'inventory', 'popularity', 'overdue', 'financial', 'acquisition', 'member_activity']),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  bookIds: z.array(z.string().uuid()).optional(),
  categoryIds: z.array(z.string().uuid()).optional(),
  authorIds: z.array(z.string().uuid()).optional(),
  branchIds: z.array(z.string().uuid()).optional(),
  groupBy: z.enum(['day', 'week', 'month', 'quarter', 'year']).optional(),
  format: z.enum(['pdf', 'csv', 'xlsx', 'json']).default('pdf'),
  includeCharts: z.boolean().default(true),
  includeDetails: z.boolean().default(false),
  filters: z.record(z.string()).optional(),
});

export const bookAnalyticsSchema = z.object({
  metric: z.enum([
    'total_books',
    'total_copies',
    'available_copies',
    'active_loans',
    'overdue_loans',
    'total_members',
    'active_members',
    'popular_books',
    'popular_categories',
    'average_rating',
    'circulation_rate',
    'utilization_rate',
  ]),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  granularity: z.enum(['hourly', 'daily', 'weekly', 'monthly']).default('daily'),
  bookIds: z.array(z.string().uuid()).optional(),
  categoryIds: z.array(z.string().uuid()).optional(),
  compareWith: z
    .object({
      period: z.enum(['previous_period', 'previous_year', 'custom']),
      customStart: z.string().datetime().optional(),
      customEnd: z.string().datetime().optional(),
    })
    .optional(),
});

export const bookBookmarkSchema = z.object({
  bookId: z.string().uuid(),
  memberId: z.string().uuid(),
  title: z.string().min(1).max(200),
  pageNumber: z.number().int().min(1).optional(),
  chapter: z.string().max(100).optional(),
  position: z.number().min(0).optional(),
  note: z.string().max(1000).optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  isPublic: z.boolean().default(false),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
});

// ─── Barrel Export ───────────────────────────────────────────────────────────

export const schemas = {
  // Transport
  busCreateSchema,
  busUpdateSchema,
  busQuerySchema,
  busFilterSchema,
  routeCreateSchema,
  routeUpdateSchema,
  tripCreateSchema,
  tripUpdateSchema,
  driverCreateSchema,
  driverUpdateSchema,
  assistantCreateSchema,
  assignmentCreateSchema,
  trackingCreateSchema,
  attendanceCreateSchema,
  checkInSchema,
  checkOutSchema,
  fuelRecordCreateSchema,
  maintenanceRecordCreateSchema,
  insuranceCreateSchema,
  incidentCreateSchema,
  emergencyAlertCreateSchema,
  busSearchSchema,
  busBulkUpdateSchema,
  busBulkDeleteSchema,
  routeOptimizeSchema,
  tripScheduleSchema,
  driverLicenseSchema,
  busSafetySchema,
  busInspectionSchema,
  gpsConfigSchema,
  trackingConfigSchema,
  notificationConfigSchema,
  parentNotificationSchema,
  busReportSchema,
  busAnalyticsSchema,
  busExportSchema,
  busImportSchema,
  busSettingsSchema,
  busAccessibilitySchema,
  busLocalizationSchema,
  busMetadataSchema,
  busPricingSchema,
  busBundleSchema,
  busSubscriptionSchema,
  busVersionSchema,
  busArchiveSchema,
  busRestoreSchema,
  busDuplicationSchema,
  busTemplateSchema,

  // Library
  bookCreateSchema,
  bookUpdateSchema,
  bookQuerySchema,
  bookFilterSchema,
  authorCreateSchema,
  authorUpdateSchema,
  publisherCreateSchema,
  publisherUpdateSchema,
  categoryCreateSchema,
  categoryUpdateSchema,
  copyCreateSchema,
  copyUpdateSchema,
  loanCreateSchema,
  loanReturnSchema,
  reservationCreateSchema,
  reservationCancelSchema,
  fineCreateSchema,
  finePaySchema,
  eBookCreateSchema,
  audiobookCreateSchema,
  rfidCreateSchema,
  rfidUpdateSchema,
  barcodeCreateSchema,
  inventoryCreateSchema,
  acquisitionCreateSchema,
  recommendationCreateSchema,
  libraryCardCreateSchema,
  libraryCardUpdateSchema,
  bookSearchSchema,
  bookBulkUpdateSchema,
  bookBulkDeleteSchema,
  bookExportSchema,
  bookImportSchema,
  bookSettingsSchema,
  bookAccessibilitySchema,
  bookLocalizationSchema,
  bookMetadataSchema,
  bookPricingSchema,
  bookBundleSchema,
  bookSubscriptionSchema,
  bookVersionSchema,
  bookArchiveSchema,
  bookRestoreSchema,
  bookDuplicationSchema,
  bookTemplateSchema,
  bookReviewSchema,
  bookRatingSchema,
  bookReportSchema,
  bookAnalyticsSchema,
  bookBookmarkSchema,
} as const;
