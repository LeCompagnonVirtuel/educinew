import { z } from 'zod';

export const CreateCampusSafetyPlanSchema = z.object({
  name: z.string().min(1, 'Le nom du plan est requis'),
  description: z.string().min(1, 'La description est requise'),
  type: z.enum(['fire', 'lockdown', 'evacuation', 'medical_emergency', 'severe_weather', 'security_threat', 'general'], {
    message: 'Le type de plan est invalide',
  }),
  scope: z.enum(['building', 'campus', 'district'], {
    message: 'La portée est invalide',
  }),
  version: z.string().min(1, 'La version est requise').default('1.0'),
  effectiveDate: z.string().min(1, 'La date d\'entrée en vigueur est requise'),
  reviewDate: z.string().min(1, 'La date de révision est requise'),
  approvedBy: z.string().uuid('ID approbateur invalide'),
  procedures: z.array(z.object({
    step: z.number().int().min(1, 'L\'étape doit être positive'),
    action: z.string().min(1, 'L\'action est requise'),
    responsible: z.string().min(1, 'Le responsable est requis'),
    timeLimit: z.string().optional(),
  })).default([]),
  emergencyContacts: z.array(z.object({
    name: z.string().min(1, 'Le nom est requis'),
    role: z.string().min(1, 'Le rôle est requis'),
    phone: z.string().min(1, 'Le téléphone est requis'),
  })).default([]),
  status: z.enum(['draft', 'active', 'under_review', 'archived'], {
    message: 'Le statut est invalide',
  }).default('draft'),
});

export const UpdateCampusSafetyPlanSchema = CreateCampusSafetyPlanSchema.partial();

export const CreateSafetyDrillSchema = z.object({
  planId: z.string().uuid('ID plan invalide'),
  name: z.string().min(1, 'Le nom de l\'exercice est requis'),
  type: z.enum(['fire', 'lockdown', 'evacuation', 'medical', 'weather', 'security'], {
    message: 'Le type d\'exercice est invalide',
  }),
  scheduledDate: z.string().min(1, 'La date prévue est requise'),
  conductedDate: z.string().optional(),
  location: z.string().min(1, 'Le lieu est requis'),
  participants: z.number().int().min(1, 'Le nombre de participants doit être positif'),
  durationMinutes: z.number().int().min(1, 'La durée doit être positive').optional(),
  status: z.enum(['planned', 'in_progress', 'completed', 'cancelled'], {
    message: 'Le statut est invalide',
  }).default('planned'),
  evaluation: z.string().optional(),
  score: z.number().min(0).max(100).optional(),
  issuesFound: z.array(z.string()).default([]),
  correctiveActions: z.array(z.string()).default([]),
});

export const UpdateSafetyDrillSchema = CreateSafetyDrillSchema.partial();

export const CreateSafetyInspectionSchema = z.object({
  inspectorId: z.string().uuid('ID inspecteur invalide'),
  inspectionDate: z.string().min(1, 'La date d\'inspection est requise'),
  type: z.enum(['routine', 'follow_up', 'annual', 'comprehensive', 'fire', 'accessibility'], {
    message: 'Le type d\'inspection est invalide',
  }),
  location: z.string().min(1, 'Le lieu est requis'),
  findings: z.array(z.object({
    area: z.string().min(1, 'La zone est requise'),
    status: z.enum(['compliant', 'non_compliant', 'needs_improvement'], {
      message: 'Le statut est invalide',
    }),
    description: z.string().min(1, 'La description est requise'),
    severity: z.enum(['low', 'medium', 'high', 'critical'], {
      message: 'La sévérité est invalide',
    }),
    photo: z.string().optional(),
  })).default([]),
  overallStatus: z.enum(['pass', 'conditional_pass', 'fail'], {
    message: 'Le statut global est invalide',
  }),
  nextInspectionDate: z.string().optional(),
  report: z.string().optional(),
  status: z.enum(['in_progress', 'completed', 'follow_up_required'], {
    message: 'Le statut est invalide',
  }).default('in_progress'),
});

export const UpdateSafetyInspectionSchema = CreateSafetyInspectionSchema.partial();
