import { z } from 'zod';

export const CreateBullyingReportSchema = z.object({
  reporterId: z.string().uuid('ID rapporteur invalide'),
  victimId: z.string().uuid('ID victime invalide'),
  allegedBullyId: z.string().uuid('ID agresseur présumé invalide').optional(),
  type: z.enum(['physical', 'verbal', 'social', 'cyber', 'sexual', 'discrimination'], {
    message: 'Le type de harcèlement est invalide',
  }),
  description: z.string().min(1, 'La description est requise'),
  location: z.string().min(1, 'Le lieu est requis'),
  date: z.string().min(1, 'La date de l\'incident est requise'),
  witnesses: z.array(z.string()).default([]),
  evidenceFiles: z.array(z.string()).default([]),
  frequency: z.enum(['once', 'occasional', 'frequent', 'daily'], {
    message: 'La fréquence est invalide',
  }),
  severity: z.enum(['minor', 'moderate', 'severe', 'critical'], {
    message: 'La sévérité est invalide',
  }),
  cyberDetails: z.object({
    platform: z.string().optional(),
    screenshotUrls: z.array(z.string()).default([]),
    messageContent: z.string().optional(),
  }).optional(),
  status: z.enum(['reported', 'investigating', 'mediation', 'sanction', 'closed'], {
    message: 'Le statut est invalide',
  }).default('reported'),
  assignedTo: z.string().uuid('ID responsable invalide').optional(),
});

export const UpdateBullyingReportSchema = CreateBullyingReportSchema.partial();

export const CreateBullyingInvestigationSchema = z.object({
  reportId: z.string().uuid('ID rapport invalide'),
  investigatorId: z.string().uuid('ID enquêteur invalide'),
  startDate: z.string().min(1, 'La date de début est requise'),
  endDate: z.string().optional(),
  interviewees: z.array(z.object({
    name: z.string().min(1, 'Le nom est requis'),
    role: z.enum(['victim', 'witness', 'accused', 'teacher', 'parent', 'other'], {
      message: 'Le rôle est invalide',
    }),
    statement: z.string().min(1, 'La déclaration est requise'),
    date: z.string().min(1, 'La date est requise'),
  })).default([]),
  findings: z.string().optional(),
  conclusion: z.enum(['confirmed', 'unconfirmed', 'partially_confirmed', 'insufficient_evidence'], {
    message: 'La conclusion est invalide',
  }).optional(),
  recommendedActions: z.array(z.string()).default([]),
  status: z.enum(['in_progress', 'completed', 'escalated'], {
    message: 'Le statut est invalide',
  }).default('in_progress'),
});

export const UpdateBullyingInvestigationSchema = CreateBullyingInvestigationSchema.partial();

export const CreateAntiBullyingProgramSchema = z.object({
  name: z.string().min(1, 'Le nom du programme est requis'),
  description: z.string().min(1, 'La description est requise'),
  type: z.enum(['prevention', 'intervention', 'awareness', 'training'], {
    message: 'Le type de programme est invalide',
  }),
  targetAudience: z.array(z.enum(['students', 'teachers', 'parents', 'all'], {
    message: 'Le public cible est invalide',
  })).default(['students']),
  startDate: z.string().min(1, 'La date de début est requise'),
  endDate: z.string().optional(),
  coordinatorId: z.string().uuid('ID coordinateur invalide').optional(),
  activities: z.array(z.string()).default([]),
  metrics: z.record(z.string(), z.number()).optional(),
  status: z.enum(['planned', 'active', 'completed', 'cancelled'], {
    message: 'Le statut est invalide',
  }).default('planned'),
});

export const UpdateAntiBullyingProgramSchema = CreateAntiBullyingProgramSchema.partial();
