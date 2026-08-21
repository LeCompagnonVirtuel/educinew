import { z } from 'zod';

export const DigitalTwinCreateSchema = z.object({
  name: z.string().min(1, 'Le nom du jumeau numérique est requis'),
  description: z.string().optional(),
  type: z.enum(['building', 'campus', 'city', 'infrastructure'], {
    message: 'Le type est invalide',
  }),
  entityId: z.string().uuid('ID entité invalide').optional(),
  modelUrl: z.string().url('URL du modèle invalide').optional(),
  status: z.enum(['active', 'inactive', 'maintenance'], {
    message: 'Le statut est invalide',
  }).default('active'),
  lastSyncAt: z.string().datetime().optional(),
  syncInterval: z.number().int().min(0, 'L\'intervalle doit être positif').default(3600),
  metadata: z.record(z.unknown()).optional(),
});

export const DigitalTwinUpdateSchema = DigitalTwinCreateSchema.partial();

export const DigitalTwinSensorCreateSchema = z.object({
  twinId: z.string().uuid('ID jumeau invalide'),
  name: z.string().min(1, 'Le nom du capteur est requis'),
  type: z.enum(['temperature', 'humidity', 'occupancy', 'energy', 'air_quality'], {
    message: 'Le type de capteur est invalide',
  }),
  location: z.string().min(1, 'L\'emplacement est requis'),
  unit: z.string().min(1, 'L\'unité est requise'),
  minValue: z.number().optional(),
  maxValue: z.number().optional(),
  isActive: z.boolean().default(true),
  lastReading: z.number().optional(),
  lastReadingAt: z.string().datetime().optional(),
});

export const DigitalTwinSensorUpdateSchema = DigitalTwinSensorCreateSchema.partial();

export const DigitalTwinAlertCreateSchema = z.object({
  twinId: z.string().uuid('ID jumeau invalide'),
  sensorId: z.string().uuid('ID capteur invalide').optional(),
  title: z.string().min(1, 'Le titre de l\'alerte est requis'),
  description: z.string().min(1, 'La description est requise'),
  severity: z.enum(['info', 'warning', 'critical'], {
    message: 'La sévérité est invalide',
  }),
  status: z.enum(['active', 'acknowledged', 'resolved'], {
    message: 'Le statut est invalide',
  }).default('active'),
  triggeredAt: z.string().min(1, 'La date de déclenchement est requise'),
  resolvedAt: z.string().optional(),
});

export const DigitalTwinAlertUpdateSchema = DigitalTwinAlertCreateSchema.partial();
