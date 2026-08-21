import z from 'zod';

export const CreateInvestmentSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  name: z.string().min(1, 'Le nom de l\'investissement est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères'),
  type: z.enum(['obligation', 'action', 'fonds', 'immobilier', 'autre'], { errorMap: () => ({ message: 'Type d\'investissement invalide' }) }),
  amount_invested: z.number().positive('Le montant investi doit être positif'),
  current_value: z.number().min(0, 'La valeur actuelle ne peut être négative'),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères'),
  risk_level: z.enum(['faible', 'moyen', 'eleve'], { errorMap: () => ({ message: 'Niveau de risque invalide' }) }),
  status: z.enum(['actif', 'ferme', 'en_periode'], { errorMap: () => ({ message: 'Statut invalide' }) }),
  start_date: z.string().datetime('Date de début invalide'),
  maturity_date: z.string().datetime('Date d\'échéance invalide').optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const UpdateInvestmentSchema = z.object({
  name: z.string().min(1, 'Le nom de l\'investissement est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères').optional(),
  type: z.enum(['obligation', 'action', 'fonds', 'immobilier', 'autre'], { errorMap: () => ({ message: 'Type d\'investissement invalide' }) }).optional(),
  current_value: z.number().min(0, 'La valeur actuelle ne peut être négative').optional(),
  risk_level: z.enum(['faible', 'moyen', 'eleve'], { errorMap: () => ({ message: 'Niveau de risque invalide' }) }).optional(),
  status: z.enum(['actif', 'ferme', 'en_periode'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  maturity_date: z.string().datetime('Date d\'échéance invalide').optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const FilterInvestmentSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  type: z.enum(['obligation', 'action', 'fonds', 'immobilier', 'autre'], { errorMap: () => ({ message: 'Type d\'investissement invalide' }) }).optional(),
  risk_level: z.enum(['faible', 'moyen', 'eleve'], { errorMap: () => ({ message: 'Niveau de risque invalide' }) }).optional(),
  status: z.enum(['actif', 'ferme', 'en_periode'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères').optional(),
  amount_min: z.number().min(0, 'Le montant minimum ne peut être négatif').optional(),
  amount_max: z.number().min(0, 'Le montant maximum ne peut être négatif').optional(),
  search: z.string().max(255, 'La recherche ne doit pas dépasser 255 caractères').optional(),
  page: z.number().int().min(1, 'Le numéro de page doit être supérieur à 0').optional(),
  limit: z.number().int().min(1, 'La limite doit être supérieure à 0').max(100, 'La limite ne doit pas dépasser 100').optional(),
});
