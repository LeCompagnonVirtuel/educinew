import { z } from 'zod';

export const ObservatoryCreateSchema = z.object({
  name: z.string().min(1, 'Le nom de l\'observatoire est requis'),
  description: z.string().optional(),
  type: z.enum(['education', 'economic', 'social', 'health'], {
    message: 'Le type d\'observatoire est invalide',
  }),
  jurisdiction: z.string().min(1, 'La juridiction est requise'),
  latitude: z.number().min(-90, 'Latitude invalide').max(90, 'Latitude invalide').optional(),
  longitude: z.number().min(-180, 'Longitude invalide').max(180, 'Longitude invalide').optional(),
  managerId: z.string().uuid().optional(),
  status: z.enum(['active', 'inactive', 'pending'], {
    message: 'Le statut est invalide',
  }).default('pending'),
  website: z.string().url('URL invalide').optional(),
});

export const ObservatoryUpdateSchema = ObservatoryCreateSchema.partial();

export const ObservatoryIndicatorCreateSchema = z.object({
  observatoryId: z.string().uuid('ID observatoire invalide'),
  name: z.string().min(1, 'Le nom de l\'indicateur est requis'),
  description: z.string().optional(),
  category: z.string().min(1, 'La catégorie est requise'),
  currentValue: z.number().optional(),
  previousValue: z.number().optional(),
  unit: z.string().optional(),
  target: z.number().optional(),
  status: z.enum(['improving', 'stable', 'declining'], {
    message: 'Le statut est invalide',
  }).default('stable'),
  dataSources: z.array(z.string()).optional(),
  lastUpdated: z.string().datetime().optional(),
});

export const ObservatoryIndicatorUpdateSchema = ObservatoryIndicatorCreateSchema.partial();

export const ObservatoryAlertCreateSchema = z.object({
  observatoryId: z.string().uuid('ID observatoire invalide'),
  title: z.string().min(1, 'Le titre de l\'alerte est requis'),
  description: z.string().min(1, 'La description est requise'),
  severity: z.enum(['low', 'medium', 'high', 'critical'], {
    message: 'La sévérité est invalide',
  }),
  status: z.enum(['active', 'acknowledged', 'resolved'], {
    message: 'Le statut est invalide',
  }).default('active'),
});

export const ObservatoryAlertUpdateSchema = ObservatoryAlertCreateSchema.partial();
