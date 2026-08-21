import { z } from 'zod';

export const CreateSocialSupportCaseSchema = z.object({
  studentId: z.string().uuid('ID élève invalide'),
  referredBy: z.string().uuid('ID référant invalide'),
  category: z.enum(['food_insecurity', 'housing', 'poverty', 'family_crisis', 'migration', 'orphanage', 'domestic_violence', 'other'], {
    message: 'La catégorie est invalide',
  }),
  severity: z.enum(['low', 'moderate', 'high', 'critical'], {
    message: 'La sévérité est invalide',
  }),
  description: z.string().min(1, 'La description est requise'),
  familySize: z.number().int().min(1, 'La taille de la famille doit être positive').optional(),
  householdIncome: z.enum(['none', 'very_low', 'low', 'medium', 'adequate'], {
    message: 'Le revenu du ménage est invalide',
  }).optional(),
  siblingsInSchool: z.number().int().min(0, 'Le nombre doit être positif').optional(),
  status: z.enum(['open', 'active', 'monitoring', 'closed'], {
    message: 'Le statut est invalide',
  }).default('open'),
  assignedTo: z.string().uuid('ID responsable invalide').optional(),
  confidentialityLevel: z.enum(['standard', 'elevated', 'maximum'], {
    message: 'Le niveau de confidentialité est invalide',
  }).default('standard'),
});

export const UpdateSocialSupportCaseSchema = CreateSocialSupportCaseSchema.partial();

export const CreateSupportServiceSchema = z.object({
  caseId: z.string().uuid('ID dossier invalide'),
  serviceType: z.enum(['food_assistance', 'clothing', 'school_supplies', 'tutoring', 'counseling', 'medical', 'legal', 'housing', 'other'], {
    message: 'Le type de service est invalide',
  }),
  provider: z.string().min(1, 'Le fournisseur est requis'),
  providerContact: z.string().optional(),
  description: z.string().min(1, 'La description est requise'),
  startDate: z.string().min(1, 'La date de début est requise'),
  endDate: z.string().optional(),
  frequency: z.enum(['one_time', 'weekly', 'biweekly', 'monthly', 'ongoing'], {
    message: 'La fréquence est invalide',
  }).default('one_time'),
  status: z.enum(['planned', 'active', 'completed', 'suspended'], {
    message: 'Le statut est invalide',
  }).default('planned'),
  cost: z.number().min(0, 'Le coût doit être positif').optional(),
  fundingSource: z.string().optional(),
  outcome: z.string().optional(),
});

export const UpdateSupportServiceSchema = CreateSupportServiceSchema.partial();

export const CreateSocialProgramSchema = z.object({
  name: z.string().min(1, 'Le nom du programme est requis'),
  description: z.string().min(1, 'La description est requise'),
  type: z.enum(['school_feeding', 'scholarship', 'uniform_assistance', 'tutoring', 'family_support', 'community', 'other'], {
    message: 'Le type de programme est invalide',
  }),
  targetGroup: z.array(z.enum(['students', 'families', 'orphans', 'disabled', 'all'], {
    message: 'Le public cible est invalide',
  })).default(['students']),
  budget: z.number().min(0, 'Le budget doit être positif').optional(),
  capacity: z.number().int().min(1, 'La capacité doit être positive').optional(),
  startDate: z.string().min(1, 'La date de début est requise'),
  endDate: z.string().optional(),
  coordinatorId: z.string().uuid('ID coordinateur invalide').optional(),
  partners: z.array(z.string()).default([]),
  status: z.enum(['planning', 'active', 'completed', 'suspended'], {
    message: 'Le statut est invalide',
  }).default('planning'),
});

export const UpdateSocialProgramSchema = CreateSocialProgramSchema.partial();
