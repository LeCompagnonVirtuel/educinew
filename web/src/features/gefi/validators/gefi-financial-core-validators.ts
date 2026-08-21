import z from 'zod';

export const CreateFinancialCoreSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  entity_type: z.string().min(1, 'Le type d\'entité est requis'),
  entity_name: z.string().min(1, 'Le nom de l\'entité est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères'),
  category: z.string().min(1, 'La catégorie est requise'),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères'),
  balance: z.number().min(0, 'Le solde ne peut être négatif'),
  fiscal_year: z.number().int().min(2000, 'Année fiscale invalide'),
  status: z.enum(['actif', 'inactif', 'suspendu'], { errorMap: () => ({ message: 'Statut invalide' }) }),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const UpdateFinancialCoreSchema = z.object({
  entity_name: z.string().min(1, 'Le nom de l\'entité est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères').optional(),
  category: z.string().min(1, 'La catégorie est requise').optional(),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères').optional(),
  balance: z.number().min(0, 'Le solde ne peut être négatif').optional(),
  fiscal_year: z.number().int().min(2000, 'Année fiscale invalide').optional(),
  status: z.enum(['actif', 'inactif', 'suspendu'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const FilterFinancialCoreSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  entity_type: z.string().optional(),
  category: z.string().optional(),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères').optional(),
  status: z.enum(['actif', 'inactif', 'suspendu'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  fiscal_year: z.number().int().min(2000, 'Année fiscale invalide').optional(),
  balance_min: z.number().min(0, 'Le solde minimum ne peut être négatif').optional(),
  balance_max: z.number().min(0, 'Le solde maximum ne peut être négatif').optional(),
  search: z.string().max(255, 'La recherche ne doit pas dépasser 255 caractères').optional(),
  page: z.number().int().min(1, 'Le numéro de page doit être supérieur à 0').optional(),
  limit: z.number().int().min(1, 'La limite doit être supérieure à 0').max(100, 'La limite ne doit pas dépasser 100').optional(),
});
