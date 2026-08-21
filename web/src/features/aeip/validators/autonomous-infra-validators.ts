import { z } from 'zod';

const zString = (fieldName: string) => z.string({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' }).min(1, `Le ${fieldName} est requis`);
const zOptionalString = z.string({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' }).optional();
const zDate = z.coerce.date({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' });
const zOptionalDate = z.coerce.date({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' }).optional();
const zNumber = z.number({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' }).min(0);
const zOptionalNumber = z.number({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' }).min(0).optional();
const zBoolean = z.boolean({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' });
const zOptionalBoolean = z.boolean({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' }).optional();
const zUuid = z.string().uuid('UUID invalide');
const zOptionalUuid = z.string().uuid('UUID invalide').optional();
const zArray = <T extends z.ZodTypeAny>(schema: T) => z.array(schema, { required_error: 'Champ requis', invalid_type_error: 'Type invalide' });
const zOptionalArray = <T extends z.ZodTypeAny>(schema: T) => z.array(schema).optional();
const zRecord = <T extends z.ZodTypeAny>(schema: T) => z.record(schema, { required_error: 'Champ requis', invalid_type_error: 'Type invalide' });

export const InfraIntelligenceCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  type: z.enum(['monitoring', 'optimization', 'prediction', 'automation', 'security']),
  status: z.enum(['active', 'inactive', 'maintenance']).optional(),
  config: z.record(z.unknown()).optional(),
  school_id: zUuid,
  model: zOptionalString,
  refreshInterval: zOptionalNumber,
});

export const InfraIntelligenceUpdateSchema = InfraIntelligenceCreateSchema.partial();

export const InfrastructureComponentCreateSchema = z.object({
  intelligence_id: zUuid,
  name: zString('nom'),
  type: z.enum(['server', 'network', 'storage', 'database', 'service', 'endpoint']),
  status: z.enum(['healthy', 'degraded', 'critical', 'offline', 'maintenance']).optional(),
  metrics: zRecord(z.unknown()).optional(),
  lastHealthCheck: zOptionalDate,
  ipAddress: zOptionalString,
  location: zOptionalString,
  metadata: zRecord(z.unknown()).optional(),
  school_id: zUuid,
});

export const InfrastructureComponentUpdateSchema = InfrastructureComponentCreateSchema.partial();

export const InfraMetricCreateSchema = z.object({
  component_id: zUuid,
  metricName: zString('nom de la métrique'),
  value: zNumber,
  unit: zOptionalString,
  threshold: zOptionalNumber,
  status: z.enum(['normal', 'warning', 'critical']).optional(),
  timestamp: zDate.optional(),
  tags: zRecord(z.string()).optional(),
});

export const InfraMetricUpdateSchema = InfraMetricCreateSchema.partial();

export const InfraAlertCreateSchema = z.object({
  component_id: zUuid,
  intelligence_id: zUuid,
  alertType: z.enum(['performance', 'availability', 'security', 'capacity', 'compliance']),
  severity: z.enum(['info', 'warning', 'critical']),
  message: zString('message'),
  status: z.enum(['active', 'acknowledged', 'resolved', 'escalated']).optional(),
  triggeredAt: zOptionalDate,
  acknowledgedAt: zOptionalDate,
  resolvedAt: zOptionalDate,
  assignedTo: zOptionalUuid,
  metadata: zRecord(z.unknown()).optional(),
  school_id: zUuid,
});

export const InfraAlertUpdateSchema = InfraAlertCreateSchema.partial();

export const InfraCapacityCreateSchema = z.object({
  component_id: zUuid,
  resourceType: z.enum(['cpu', 'memory', 'disk', 'network', 'bandwidth']),
  totalCapacity: zNumber,
  usedCapacity: zOptionalNumber,
  availableCapacity: zOptionalNumber,
  utilizationPercentage: zOptionalNumber,
  forecast: zOptionalNumber,
  recommendation: zOptionalString,
  timestamp: zOptionalDate,
});

export const InfraCapacityUpdateSchema = InfraCapacityCreateSchema.partial();

export const InfraIncidentCreateSchema = z.object({
  component_id: zUuid,
  intelligence_id: zUuid,
  title: zString('titre'),
  description: zString('description'),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  status: z.enum(['detected', 'investigating', 'identified', 'monitoring', 'resolved', 'closed']).optional(),
  impact: zOptionalString,
  rootCause: zOptionalString,
  resolution: zOptionalString,
  detectedAt: zOptionalDate,
  resolvedAt: zOptionalDate,
  assignedTo: zOptionalUuid,
  school_id: zUuid,
});

export const InfraIncidentUpdateSchema = InfraIncidentCreateSchema.partial();

export const InfraMaintenanceCreateSchema = z.object({
  component_id: zUuid,
  type: z.enum(['preventive', 'corrective', 'predictive', 'emergency']),
  description: zString('description'),
  status: z.enum(['scheduled', 'in_progress', 'completed', 'cancelled']).optional(),
  scheduledAt: zOptionalDate,
  startedAt: zOptionalDate,
  completedAt: zOptionalDate,
  duration: zOptionalNumber,
  technician: zOptionalUuid,
  notes: zOptionalString,
  school_id: zUuid,
});

export const InfraMaintenanceUpdateSchema = InfraMaintenanceCreateSchema.partial();

export const InfraConfigCreateSchema = z.object({
  component_id: zUuid,
  configType: z.enum(['system', 'network', 'security', 'application', 'backup']),
  data: zRecord(z.unknown()),
  version: zOptionalString,
  isActive: zOptionalBoolean,
  lastModified: zOptionalDate,
  modifiedBy: zOptionalUuid,
  school_id: zUuid,
});

export const InfraConfigUpdateSchema = InfraConfigCreateSchema.partial();

export const InfraBackupCreateSchema = z.object({
  component_id: zUuid,
  backupType: z.enum(['full', 'incremental', 'differential', 'snapshot']),
  status: z.enum(['pending', 'in_progress', 'completed', 'failed']).optional(),
  size: zOptionalNumber,
  location: zOptionalString,
  startedAt: zOptionalDate,
  completedAt: zOptionalDate,
  retentionDays: zOptionalNumber,
  isEncrypted: zOptionalBoolean,
  school_id: zUuid,
});

export const InfraBackupUpdateSchema = InfraBackupCreateSchema.partial();
