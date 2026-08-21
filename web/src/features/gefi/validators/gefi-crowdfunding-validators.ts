import z from 'zod';

export const CreateCrowdfundingSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  campaign_name: z.string().min(1, 'Le nom de la campagne est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères'),
  description: z.string().max(2000, 'La description ne doit pas dépasser 2000 caractères').optional(),
  goal_amount: z.number().positive('L\'objectif doit être positif'),
  raised_amount: z.number().min(0, 'Le montant collecté ne peut être négatif'),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères'),
  status: z.enum(['brouillon', 'active', 'terminee', 'suspendue'], { errorMap: () => ({ message: 'Statut invalide' }) }),
  start_date: z.string().datetime('Date de début invalide'),
  end_date: z.string().datetime('Date de fin invalide'),
  beneficiaries: z.array(z.string().uuid('Identifiant bénéficiaire invalide')).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const UpdateCrowdfundingSchema = z.object({
  campaign_name: z.string().min(1, 'Le nom de la campagne est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères').optional(),
  description: z.string().max(2000, 'La description ne doit pas dépasser 2000 caractères').optional(),
  goal_amount: z.number().positive('L\'objectif doit être positif').optional(),
  status: z.enum(['brouillon', 'active', 'terminee', 'suspendue'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  start_date: z.string().datetime('Date de début invalide').optional(),
  end_date: z.string().datetime('Date de fin invalide').optional(),
  beneficiaries: z.array(z.string().uuid('Identifiant bénéficiaire invalide')).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const FilterCrowdfundingSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  status: z.enum(['brouillon', 'active', 'terminee', 'suspendue'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères').optional(),
  goal_min: z.number().min(0, 'L\'objectif minimum ne peut être négatif').optional(),
  goal_max: z.number().min(0, 'L\'objectif maximum ne peut être négatif').optional(),
  start_date_from: z.string().datetime('Date de début invalide').optional(),
  end_date_to: z.string().datetime('Date de fin invalide').optional(),
  search: z.string().max(255, 'La recherche ne doit pas dépasser 255 caractères').optional(),
  page: z.number().int().min(1, 'Le numéro de page doit être supérieur à 0').optional(),
  limit: z.number().int().min(1, 'La limite doit être supérieure à 0').max(100, 'La limite ne doit pas dépasser 100').optional(),
});
