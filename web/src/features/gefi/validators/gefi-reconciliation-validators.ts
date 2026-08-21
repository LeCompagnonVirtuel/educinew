import z from 'zod';

export const CreateReconciliationSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  reconciliation_type: z.enum(['bancaire', 'interne', 'fournisseur', 'tiers'], { errorMap: () => ({ message: 'Type de rapprochement invalide' }) }),
  period_start: z.string().datetime('Date de début de période invalide'),
  period_end: z.string().datetime('Date de fin de période invalide'),
  total_internal: z.number(),
  total_external: z.number(),
  difference: z.number(),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères'),
  status: z.enum(['en_cours', 'termine', 'discrepance', 'valide'], { errorMap: () => ({ message: 'Statut invalide' }) }),
  validated_by: z.string().uuid('Identifiant validateur invalide').optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const UpdateReconciliationSchema = z.object({
  total_internal: z.number().optional(),
  total_external: z.number().optional(),
  difference: z.number().optional(),
  status: z.enum(['en_cours', 'termine', 'discrepance', 'valide'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  validated_by: z.string().uuid('Identifiant validateur invalide').optional(),
  notes: z.string().max(2000, 'Les notes ne doivent pas dépasser 2000 caractères').optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const FilterReconciliationSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  reconciliation_type: z.enum(['bancaire', 'interne', 'fournisseur', 'tiers'], { errorMap: () => ({ message: 'Type de rapprochement invalide' }) }).optional(),
  status: z.enum(['en_cours', 'termine', 'discrepance', 'valide'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères').optional(),
  period_start: z.string().datetime('Date de début de période invalide').optional(),
  period_end: z.string().datetime('Date de fin de période invalide').optional(),
  difference_min: z.number().optional(),
  difference_max: z.number().optional(),
  search: z.string().max(255, 'La recherche ne doit pas dépasser 255 caractères').optional(),
  page: z.number().int().min(1, 'Le numéro de page doit être supérieur à 0').optional(),
  limit: z.number().int().min(1, 'La limite doit être supérieure à 0').max(100, 'La limite ne doit pas dépasser 100').optional(),
});
