import { z } from 'zod';

export const CreateHealthDashboardSchema = z.object({
  name: z.string().min(1, 'Le nom du tableau de bord est requis'),
  description: z.string().optional(),
  type: z.enum(['overview', 'mental_health', 'physical_health', 'safety', 'attendance', 'wellness'], {
    message: 'Le type est invalide',
  }),
  period: z.enum(['daily', 'weekly', 'monthly', 'quarterly', 'yearly'], {
    message: 'La période est invalide',
  }),
  isPublic: z.boolean().default(false),
  widgets: z.array(z.string()).default([]),
  filters: z.record(z.unknown()).optional(),
});

export const UpdateHealthDashboardSchema = CreateHealthDashboardSchema.partial();

export const CreateHealthMetricSchema = z.object({
  dashboardId: z.string().uuid('ID tableau de bord invalide'),
  name: z.string().min(1, 'Le nom de la métrique est requis'),
  description: z.string().optional(),
  category: z.enum(['prevalence', 'incidence', 'utilization', 'satisfaction', 'outcomes'], {
    message: 'La catégorie est invalide',
  }),
  unit: z.string().optional(),
  aggregationType: z.enum(['sum', 'avg', 'count', 'min', 'max', 'rate'], {
    message: 'Le type d\'agrégation est invalide',
  }).default('count'),
  formula: z.string().optional(),
  targetValue: z.number().optional(),
  thresholdWarning: z.number().optional(),
  thresholdCritical: z.number().optional(),
  isActive: z.boolean().default(true),
});

export const UpdateHealthMetricSchema = CreateHealthMetricSchema.partial();

export const CreateHealthReportSchema = z.object({
  name: z.string().min(1, 'Le nom du rapport est requis'),
  type: z.enum(['prevalence', 'incidence', 'trend', 'comparison', 'compliance', 'custom'], {
    message: 'Le type de rapport est invalide',
  }),
  format: z.enum(['pdf', 'csv', 'xlsx', 'json'], {
    message: 'Le format est invalide',
  }).default('pdf'),
  period: z.enum(['weekly', 'monthly', 'quarterly', 'yearly'], {
    message: 'La période est invalide',
  }),
  dateFrom: z.string().min(1, 'La date de début est requise'),
  dateTo: z.string().min(1, 'La date de fin est requise'),
  filters: z.record(z.unknown()).optional(),
  recipients: z.array(z.string().email('Adresse email invalide')).default([]),
  scheduledAt: z.string().optional(),
  status: z.enum(['draft', 'generated', 'scheduled', 'sent'], {
    message: 'Le statut est invalide',
  }).default('draft'),
});

export const UpdateHealthReportSchema = CreateHealthReportSchema.partial();

export const CreateHealthBenchmarkSchema = z.object({
  name: z.string().min(1, 'Le nom du benchmark est requis'),
  description: z.string().optional(),
  metric: z.string().min(1, 'La métrique est requise'),
  source: z.string().min(1, 'La source est requise'),
  nationalAverage: z.number().optional(),
  regionalAverage: z.number().optional(),
  targetValue: z.number().optional(),
  period: z.string().min(1, 'La période est requise'),
  year: z.number().int().min(2000, 'L\'année doit être valide'),
});

export const UpdateHealthBenchmarkSchema = CreateHealthBenchmarkSchema.partial();
