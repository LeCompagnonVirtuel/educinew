import { z } from 'zod';

export const DashboardCreateSchema = z.object({
  name: z.string().min(1, 'Le nom du tableau de bord est requis'),
  description: z.string().optional(),
  type: z.enum(['overview', 'performance', 'finance', 'demographics'], {
    message: 'Le type est invalide',
  }),
  period: z.enum(['daily', 'weekly', 'monthly', 'quarterly', 'yearly'], {
    message: 'La période est invalide',
  }),
  isPublic: z.boolean().default(false),
  refreshInterval: z.number().int().min(0, "L'intervalle doit être positif").default(0),
  widgets: z.array(z.string()).optional(),
});

export const DashboardUpdateSchema = DashboardCreateSchema.partial();

export const MetricCreateSchema = z.object({
  dashboardId: z.string().uuid('ID tableau de bord invalide'),
  name: z.string().min(1, 'Le nom de la métrique est requis'),
  description: z.string().optional(),
  unit: z.string().optional(),
  category: z.string().min(1, 'La catégorie est requise'),
  aggregationType: z.enum(['sum', 'avg', 'count', 'min', 'max'], {
    message: "Le type d'agrégation est invalide",
  }).default('sum'),
  formula: z.string().optional(),
  isActive: z.boolean().default(true),
});

export const MetricUpdateSchema = MetricCreateSchema.partial();

export const ReportCreateSchema = z.object({
  name: z.string().min(1, 'Le nom du rapport est requis'),
  type: z.enum(['generated', 'scheduled', 'adhoc'], {
    message: 'Le type de rapport est invalide',
  }),
  format: z.enum(['pdf', 'csv', 'xlsx', 'json'], {
    message: 'Le format est invalide',
  }).default('pdf'),
  scheduledAt: z.string().datetime().optional(),
  parameters: z.record(z.unknown()).optional(),
});

export const ReportUpdateSchema = ReportCreateSchema.partial();
