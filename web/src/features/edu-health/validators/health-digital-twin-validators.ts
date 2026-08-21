import { z } from 'zod';

export const CreateHealthDigitalTwinSchema = z.object({
  name: z.string().min(1, 'Le nom du jumeau est requis'),
  description: z.string().optional(),
  type: z.enum(['campus', 'building', 'classroom', 'infrastructure'], {
    message: 'Le type est invalide',
  }),
  entityId: z.string().uuid('ID entité invalide').optional(),
  modelUrl: z.string().url('URL du modèle invalide').optional(),
  healthDomain: z.enum(['safety', 'wellness', 'environment', 'comprehensive'], {
    message: 'Le domaine santé est invalide',
  }),
  status: z.enum(['active', 'inactive', 'maintenance', 'syncing'], {
    message: 'Le statut est invalide',
  }).default('active'),
  syncInterval: z.number().int().min(0, 'L\'intervalle doit être positif').default(3600),
  lastSyncAt: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateHealthDigitalTwinSchema = CreateHealthDigitalTwinSchema.partial();

export const CreateHealthSensorSchema = z.object({
  twinId: z.string().uuid('ID jumeau invalide'),
  name: z.string().min(1, 'Le nom du capteur est requis'),
  type: z.enum(['air_quality', 'temperature', 'humidity', 'noise', 'light', 'occupancy', 'emergency_button', 'access_control'], {
    message: 'Le type de capteur est invalide',
  }),
  location: z.string().min(1, 'L\'emplacement est requis'),
  unit: z.string().optional(),
  minValue: z.number().optional(),
  maxValue: z.number().optional(),
  thresholdWarning: z.number().optional(),
  thresholdCritical: z.number().optional(),
  isActive: z.boolean().default(true),
  lastReading: z.number().optional(),
  lastReadingAt: z.string().optional(),
  calibrationDate: z.string().optional(),
  nextCalibrationDate: z.string().optional(),
});

export const UpdateHealthSensorSchema = CreateHealthSensorSchema.partial();

export const CreateHealthAlertSchema = z.object({
  twinId: z.string().uuid('ID jumeau invalide'),
  sensorId: z.string().uuid('ID capteur invalide').optional(),
  title: z.string().min(1, 'Le titre de l\'alerte est requis'),
  description: z.string().min(1, 'La description est requise'),
  severity: z.enum(['info', 'warning', 'critical', 'emergency'], {
    message: 'La sévérité est invalide',
  }),
  category: z.enum(['environmental', 'safety', 'accessibility', 'maintenance', 'other'], {
    message: 'La catégorie est invalide',
  }),
  status: z.enum(['active', 'acknowledged', 'in_progress', 'resolved', 'dismissed'], {
    message: 'Le statut est invalide',
  }).default('active'),
  triggeredAt: z.string().min(1, 'La date de déclenchement est requise'),
  acknowledgedAt: z.string().optional(),
  resolvedAt: z.string().optional(),
  assignedTo: z.string().uuid('ID responsable invalide').optional(),
  resolution: z.string().optional(),
});

export const UpdateHealthAlertSchema = CreateHealthAlertSchema.partial();

export const CreateHealthSimulationSchema = z.object({
  twinId: z.string().uuid('ID jumeau invalide'),
  name: z.string().min(1, 'Le nom de la simulation est requis'),
  type: z.enum(['evacuation', 'fire_spread', 'air_flow', 'capacity', 'emergency_response'], {
    message: 'Le type de simulation est invalide',
  }),
  parameters: z.record(z.unknown()),
  results: z.record(z.unknown()).optional(),
  status: z.enum(['running', 'completed', 'failed', 'cancelled'], {
    message: 'Le statut est invalide',
  }).default('running'),
  startedAt: z.string().min(1, 'La date de début est requise'),
  completedAt: z.string().optional(),
  executedBy: z.string().uuid('ID exécutant invalide').optional(),
  notes: z.string().optional(),
});

export const UpdateHealthSimulationSchema = CreateHealthSimulationSchema.partial();
