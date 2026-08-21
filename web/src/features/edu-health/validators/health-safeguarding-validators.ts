import { z } from 'zod';

export const CreateSafeguardingCaseSchema = z.object({
  studentId: z.string().uuid('ID élève invalide'),
  reportedBy: z.string().uuid('ID rapporteur invalide'),
  category: z.enum(['neglect', 'physical_abuse', 'emotional_abuse', 'sexual_abuse', 'exploitation', 'bullying', 'domestic', 'other'], {
    message: 'La catégorie est invalide',
  }),
  severity: z.enum(['low', 'moderate', 'high', 'critical'], {
    message: 'La sévérité est invalide',
  }),
  description: z.string().min(1, 'La description est requise'),
  evidenceFiles: z.array(z.string()).default([]),
  witnesses: z.array(z.string()).default([]),
  status: z.enum(['open', 'investigating', 'referred', 'closed', 'escalated'], {
    message: 'Le statut est invalide',
  }).default('open'),
  priority: z.enum(['normal', 'urgent', 'emergency'], {
    message: 'La priorité est invalide',
  }).default('normal'),
  assignedTo: z.string().uuid('ID responsable invalide').optional(),
  externalReferral: z.string().optional(),
  confidentialNotes: z.string().optional(),
});

export const UpdateSafeguardingCaseSchema = CreateSafeguardingCaseSchema.partial();

export const CreateSafeguardingActionSchema = z.object({
  caseId: z.string().uuid('ID dossier invalide'),
  actionType: z.enum(['observation', 'meeting', 'referral', 'escalation', 'follow_up', 'closure'], {
    message: 'Le type d\'action est invalide',
  }),
  performedBy: z.string().uuid('ID auteur invalide'),
  description: z.string().min(1, 'La description est requise'),
  date: z.string().min(1, 'La date est requise'),
  outcome: z.string().optional(),
  nextAction: z.string().optional(),
  attachments: z.array(z.string()).default([]),
});

export const UpdateSafeguardingActionSchema = CreateSafeguardingActionSchema.partial();

export const CreateSafeguardingPolicySchema = z.object({
  title: z.string().min(1, 'Le titre de la politique est requis'),
  version: z.string().min(1, 'La version est requise'),
  content: z.string().min(1, 'Le contenu est requis'),
  effectiveDate: z.string().min(1, 'La date d\'entrée en vigueur est requise'),
  reviewDate: z.string().min(1, 'La date de révision est requise'),
  approvedBy: z.string().uuid('ID approbateur invalide'),
  status: z.enum(['draft', 'active', 'under_review', 'archived'], {
    message: 'Le statut est invalide',
  }).default('draft'),
  targetAudience: z.array(z.enum(['staff', 'students', 'parents', 'governors'], {
    message: 'Le public cible est invalide',
  })).default(['staff']),
});

export const UpdateSafeguardingPolicySchema = CreateSafeguardingPolicySchema.partial();
