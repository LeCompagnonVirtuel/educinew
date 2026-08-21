import { z } from 'zod';

export const CooperationAgreementCreateSchema = z.object({
  title: z.string().min(1, 'Le titre de l\'accord est requis'),
  description: z.string().min(1, 'La description est requise'),
  type: z.enum(['bilateral', 'multilateral', 'memorandum'], {
    message: 'Le type d\'accord est invalide',
  }),
  parties: z.array(z.string()).min(1, 'Au moins une partie est requise'),
  startDate: z.string().min(1, 'La date de début est requise'),
  endDate: z.string().min(1, 'La date de fin est requise'),
  scope: z.string().min(1, 'Le périmètre est requis'),
  budget: z.number().min(0, 'Le budget doit être positif').optional(),
  status: z.enum(['draft', 'negotiating', 'signed', 'active', 'expired', 'terminated'], {
    message: 'Le statut est invalide',
  }).default('draft'),
  responsibleEntity: z.string().min(1, 'L\'entité responsable est requise'),
});

export const CooperationAgreementUpdateSchema = CooperationAgreementCreateSchema.partial();

export const CooperationProjectCreateSchema = z.object({
  agreementId: z.string().uuid('ID accord invalide'),
  name: z.string().min(1, 'Le nom du projet est requis'),
  description: z.string().min(1, 'La description est requise'),
  objective: z.string().min(1, 'L\'objectif est requis'),
  budget: z.number().min(0, 'Le budget doit être positif'),
  spentAmount: z.number().min(0, 'Le montant dépensé doit être positif').default(0),
  startDate: z.string().min(1, 'La date de début est requise'),
  endDate: z.string().min(1, 'La date de fin est requise'),
  status: z.enum(['planned', 'active', 'on_hold', 'completed', 'cancelled'], {
    message: 'Le statut est invalide',
  }).default('planned'),
  progress: z.number().min(0, 'La progression doit être positive').max(100, 'La progression ne peut dépasser 100').default(0),
});

export const CooperationProjectUpdateSchema = CooperationProjectCreateSchema.partial();

export const CooperationReportCreateSchema = z.object({
  projectId: z.string().uuid('ID projet invalide'),
  title: z.string().min(1, 'Le titre du rapport est requis'),
  type: z.enum(['progress', 'financial', 'final'], {
    message: 'Le type de rapport est invalide',
  }),
  period: z.string().min(1, 'La période est requise'),
  summary: z.string().min(1, 'Le résumé est requis'),
  status: z.enum(['draft', 'submitted', 'approved'], {
    message: 'Le statut est invalide',
  }).default('draft'),
});

export const CooperationReportUpdateSchema = CooperationReportCreateSchema.partial();
