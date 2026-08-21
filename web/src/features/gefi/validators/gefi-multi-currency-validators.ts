import z from 'zod';

export const CreateMultiCurrencySchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  source_currency: z.string().length(3, 'Le code devise source doit contenir 3 caractères'),
  target_currency: z.string().length(3, 'Le code devise cible doit contenir 3 caractères'),
  exchange_rate: z.number().positive('Le taux de change doit être positif'),
  rate_date: z.string().datetime('Date du taux invalide'),
  status: z.enum(['actif', 'inactif'], { errorMap: () => ({ message: 'Statut invalide' }) }),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const UpdateMultiCurrencySchema = z.object({
  exchange_rate: z.number().positive('Le taux de change doit être positif').optional(),
  rate_date: z.string().datetime('Date du taux invalide').optional(),
  status: z.enum(['actif', 'inactif'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const FilterMultiCurrencySchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  source_currency: z.string().length(3, 'Le code devise source doit contenir 3 caractères').optional(),
  target_currency: z.string().length(3, 'Le code devise cible doit contenir 3 caractères').optional(),
  status: z.enum(['actif', 'inactif'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  rate_date_from: z.string().datetime('Date de début invalide').optional(),
  rate_date_to: z.string().datetime('Date de fin invalide').optional(),
  search: z.string().max(255, 'La recherche ne doit pas dépasser 255 caractères').optional(),
  page: z.number().int().min(1, 'Le numéro de page doit être supérieur à 0').optional(),
  limit: z.number().int().min(1, 'La limite doit être supérieure à 0').max(100, 'La limite ne doit pas dépasser 100').optional(),
});
