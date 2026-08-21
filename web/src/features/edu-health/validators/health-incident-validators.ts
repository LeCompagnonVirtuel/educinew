import { z } from 'zod';

export const CreateHealthIncidentSchema = z.object({
  studentId: z.string().uuid('ID élève invalide'),
  reportedBy: z.string().uuid('ID rapporteur invalide'),
  type: z.enum(['injury', 'illness', 'allergic_reaction', 'medication_error', 'outbreak', 'other'], {
    message: 'Le type d\'incident est invalide',
  }),
  severity: z.enum(['minor', 'moderate', 'severe', 'critical', 'fatal'], {
    message: 'La sévérité est invalide',
  }),
  description: z.string().min(1, 'La description est requise'),
  location: z.string().min(1, 'Le lieu est requis'),
  date: z.string().min(1, 'La date de l\'incident est requise'),
  time: z.string().optional(),
  firstAidGiven: z.boolean().default(false),
  firstAidDescription: z.string().optional(),
  hospitalTransported: z.boolean().default(false),
  hospitalName: z.string().optional(),
  parentNotified: z.boolean().default(false),
  parentNotifiedAt: z.string().optional(),
  witnesses: z.array(z.string()).default([]),
  evidenceFiles: z.array(z.string()).default([]),
  status: z.enum(['reported', 'investigating', 'resolved', 'escalated'], {
    message: 'Le statut est invalide',
  }).default('reported'),
  assignedTo: z.string().uuid('ID responsable invalide').optional(),
  rootCause: z.string().optional(),
  preventiveActions: z.string().optional(),
});

export const UpdateHealthIncidentSchema = CreateHealthIncidentSchema.partial();

export const CreateIncidentFollowUpSchema = z.object({
  incidentId: z.string().uuid('ID incident invalide'),
  followUpBy: z.string().uuid('ID suiveur invalide'),
  followUpDate: z.string().min(1, 'La date de suivi est requise'),
  studentCondition: z.enum(['stable', 'improving', 'worsening', 'resolved'], {
    message: 'L\'état de l\'élève est invalide',
  }),
  description: z.string().min(1, 'La description est requise'),
  actions: z.array(z.string()).default([]),
  nextFollowUpDate: z.string().optional(),
  medicalClearance: z.boolean().default(false),
  returnToSchool: z.boolean().default(false),
  notes: z.string().optional(),
});

export const UpdateIncidentFollowUpSchema = CreateIncidentFollowUpSchema.partial();

export const CreateIncidentReportSchema = z.object({
  incidentId: z.string().uuid('ID incident invalide'),
  reportType: z.enum(['preliminary', 'detailed', 'final'], {
    message: 'Le type de rapport est invalide',
  }),
  preparedBy: z.string().uuid('ID rédacteur invalide'),
  preparedDate: z.string().min(1, 'La date de rédaction est requise'),
  summary: z.string().min(1, 'Le résumé est requis'),
  timeline: z.array(z.object({
    time: z.string().min(1, 'L\'heure est requise'),
    event: z.string().min(1, 'L\'événement est requis'),
  })).default([]),
  analysis: z.string().optional(),
  recommendations: z.array(z.string()).default([]),
  attachments: z.array(z.string()).default([]),
  status: z.enum(['draft', 'submitted', 'approved', 'archived'], {
    message: 'Le statut est invalide',
  }).default('draft'),
});

export const UpdateIncidentReportSchema = CreateIncidentReportSchema.partial();
