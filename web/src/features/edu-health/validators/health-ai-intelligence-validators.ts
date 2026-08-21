import { z } from 'zod';

export const CreateHealthAIModelSchema = z.object({
  name: z.string().min(1, 'Le nom du modèle est requis'),
  description: z.string().optional(),
  type: z.enum(['screening', 'risk_assessment', 'prediction', 'recommendation', 'anomaly_detection'], {
    message: 'Le type de modèle est invalide',
  }),
  domain: z.enum(['mental_health', 'physical_health', 'safeguarding', 'bullying', 'attendance', 'general'], {
    message: 'Le domaine est invalide',
  }),
  version: z.string().min(1, 'La version est requise'),
  algorithm: z.string().min(1, 'L\'algorithme est requis'),
  trainingData: z.object({
    source: z.string().min(1, 'La source des données est requise'),
    size: z.number().int().min(0, 'La taille doit être positive'),
    dateRange: z.string().optional(),
    features: z.array(z.string()).default([]),
  }),
  accuracy: z.number().min(0).max(100).optional(),
  status: z.enum(['training', 'testing', 'active', 'deprecated', 'archived'], {
    message: 'Le statut est invalide',
  }).default('training'),
  lastRetrainedAt: z.string().optional(),
  nextRetrainDate: z.string().optional(),
});

export const UpdateHealthAIModelSchema = CreateHealthAIModelSchema.partial();

export const CreateAIPredictionSchema = z.object({
  modelId: z.string().uuid('ID modèle invalide'),
  studentId: z.string().uuid('ID élève invalide'),
  inputFeatures: z.record(z.unknown()),
  prediction: z.string().min(1, 'La prédiction est requise'),
  confidence: z.number().min(0).max(1, 'La confiance doit être entre 0 et 1'),
  riskScore: z.number().min(0).max(100).optional(),
  factors: z.array(z.object({
    feature: z.string().min(1, 'La caractéristique est requise'),
    importance: z.number().min(0).max(1),
    description: z.string().optional(),
  })).default([]),
  status: z.enum(['active', 'reviewed', 'acted_upon', 'dismissed'], {
    message: 'Le statut est invalide',
  }).default('active'),
  reviewedBy: z.string().uuid('ID réviseur invalide').optional(),
  reviewDate: z.string().optional(),
  notes: z.string().optional(),
});

export const UpdateAIPredictionSchema = CreateAIPredictionSchema.partial();

export const CreateAIAlertSchema = z.object({
  modelId: z.string().uuid('ID modèle invalide'),
  studentId: z.string().uuid('ID élève invalide'),
  alertType: z.enum(['risk_detected', 'threshold_exceeded', 'anomaly', 'degradation', 'data_quality'], {
    message: 'Le type d\'alerte est invalide',
  }),
  severity: z.enum(['info', 'warning', 'critical', 'emergency'], {
    message: 'La sévérité est invalide',
  }),
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string().min(1, 'La description est requise'),
  confidence: z.number().min(0).max(1),
  recommendation: z.string().optional(),
  status: z.enum(['active', 'acknowledged', 'in_progress', 'resolved', 'dismissed'], {
    message: 'Le statut est invalide',
  }).default('active'),
  assignedTo: z.string().uuid('ID responsable invalide').optional(),
});

export const UpdateAIAlertSchema = CreateAIAlertSchema.partial();
