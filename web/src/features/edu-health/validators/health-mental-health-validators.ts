import { z } from 'zod';

export const CreateMentalHealthScreeningSchema = z.object({
  studentId: z.string().uuid('ID élève invalide'),
  screeningDate: z.string().min(1, 'Le dépistage de la date est requis'),
  type: z.enum(['depression', 'anxiety', 'stress', 'behavioral', 'comprehensive'], {
    message: 'Le type de dépistage est invalide',
  }),
  tool: z.string().min(1, 'L\'outil de dépistage est requis'),
  score: z.number().optional(),
  riskLevel: z.enum(['low', 'moderate', 'high', 'critical'], {
    message: 'Le niveau de risque est invalide',
  }),
  administeredBy: z.string().min(1, 'L\'administrateur est requis'),
  responses: z.record(z.unknown()).optional(),
  notes: z.string().optional(),
  followUpRequired: z.boolean().default(false),
  followUpDate: z.string().optional(),
});

export const UpdateMentalHealthScreeningSchema = CreateMentalHealthScreeningSchema.partial();

export const CreateCounselingSessionSchema = z.object({
  studentId: z.string().uuid('ID élève invalide'),
  counselorId: z.string().uuid('ID conseiller invalide'),
  sessionDate: z.string().min(1, 'La date de la séance est requise'),
  type: z.enum(['individual', 'group', 'crisis', 'follow_up', 'preventive'], {
    message: 'Le type de séance est invalide',
  }),
  durationMinutes: z.number().int().min(1, 'La durée doit être positive'),
  topics: z.array(z.string()).default([]),
  mood: z.enum(['very_low', 'low', 'neutral', 'good', 'very_good'], {
    message: 'L\'humeur est invalide',
  }).optional(),
  riskAssessment: z.enum(['none', 'low', 'moderate', 'high', 'imminent'], {
    message: 'L\'évaluation du risque est invalide',
  }).default('none'),
  interventions: z.string().optional(),
  followUpPlan: z.string().optional(),
  confidential: z.boolean().default(true),
  status: z.enum(['scheduled', 'completed', 'cancelled', 'no_show'], {
    message: 'Le statut est invalide',
  }).default('scheduled'),
});

export const UpdateCounselingSessionSchema = CreateCounselingSessionSchema.partial();

export const CreateWellnessPlanSchema = z.object({
  studentId: z.string().uuid('ID élève invalide'),
  createdBy: z.string().uuid('ID créateur invalide'),
  startDate: z.string().min(1, 'La date de début est requise'),
  endDate: z.string().optional(),
  goals: z.array(z.object({
    description: z.string().min(1, 'La description de l\'objectif est requise'),
    targetDate: z.string().optional(),
    status: z.enum(['in_progress', 'completed', 'dropped'], {
      message: 'Le statut de l\'objectif est invalide',
    }).default('in_progress'),
  })),
  strategies: z.array(z.string()).default([]),
  supportTeam: z.array(z.string()).default([]),
  status: z.enum(['active', 'completed', 'suspended'], {
    message: 'Le statut du plan est invalide',
  }).default('active'),
  notes: z.string().optional(),
});

export const UpdateWellnessPlanSchema = CreateWellnessPlanSchema.partial();
