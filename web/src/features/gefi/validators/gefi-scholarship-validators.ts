import z from 'zod';

export const CreateScholarshipSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  name: z.string().min(1, 'Le nom de la bourse est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères'),
  description: z.string().max(1000, 'La description ne doit pas dépasser 1000 caractères').optional(),
  amount: z.number().positive('Le montant doit être positif'),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères'),
  type: z.enum(['merit', 'need', 'athletic', 'research', 'social'], { errorMap: () => ({ message: 'Type de bourse invalide' }) }),
  status: z.enum(['active', 'inactive', 'expired'], { errorMap: () => ({ message: 'Statut invalide' }) }),
  start_date: z.string().datetime('Date de début invalide'),
  end_date: z.string().datetime('Date de fin invalide'),
  criteria: z.record(z.string(), z.unknown()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const UpdateScholarshipSchema = z.object({
  name: z.string().min(1, 'Le nom de la bourse est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères').optional(),
  description: z.string().max(1000, 'La description ne doit pas dépasser 1000 caractères').optional(),
  amount: z.number().positive('Le montant doit être positif').optional(),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères').optional(),
  type: z.enum(['merit', 'need', 'athletic', 'research', 'social'], { errorMap: () => ({ message: 'Type de bourse invalide' }) }).optional(),
  status: z.enum(['active', 'inactive', 'expired'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  start_date: z.string().datetime('Date de début invalide').optional(),
  end_date: z.string().datetime('Date de fin invalide').optional(),
  criteria: z.record(z.string(), z.unknown()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const FilterScholarshipSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  type: z.enum(['merit', 'need', 'athletic', 'research', 'social'], { errorMap: () => ({ message: 'Type de bourse invalide' }) }).optional(),
  status: z.enum(['active', 'inactive', 'expired'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  amount_min: z.number().min(0, 'Le montant minimum ne peut être négatif').optional(),
  amount_max: z.number().min(0, 'Le montant maximum ne peut être négatif').optional(),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères').optional(),
  start_date_from: z.string().datetime('Date de début invalide').optional(),
  end_date_to: z.string().datetime('Date de fin invalide').optional(),
  search: z.string().max(255, 'La recherche ne doit pas dépasser 255 caractères').optional(),
  page: z.number().int().min(1, 'Le numéro de page doit être supérieur à 0').optional(),
  limit: z.number().int().min(1, 'La limite doit être supérieure à 0').max(100, 'La limite ne doit pas dépasser 100').optional(),
});
