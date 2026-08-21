import z from 'zod';

export const CreateFraudSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  alert_type: z.enum(['transaction_suspecte', 'montant_inhabituel', 'comportement_anormal', 'tentative_acces'], { errorMap: () => ({ message: 'Type d\'alerte invalide' }) }),
  severity: z.enum(['faible', 'moyen', 'eleve', 'critique'], { errorMap: () => ({ message: 'Sévérité invalide' }) }),
  description: z.string().max(2000, 'La description ne doit pas dépasser 2000 caractères').optional(),
  related_transaction_id: z.string().uuid('Identifiant transaction invalide').optional(),
  related_user_id: z.string().uuid('Identifiant utilisateur invalide').optional(),
  status: z.enum(['nouvelle', 'en_investigation', 'confirmee', 'rejete'], { errorMap: () => ({ message: 'Statut invalide' }) }),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const UpdateFraudSchema = z.object({
  alert_type: z.enum(['transaction_suspecte', 'montant_inhabituel', 'comportement_anormal', 'tentative_acces'], { errorMap: () => ({ message: 'Type d\'alerte invalide' }) }).optional(),
  severity: z.enum(['faible', 'moyen', 'eleve', 'critique'], { errorMap: () => ({ message: 'Sévérité invalide' }) }).optional(),
  description: z.string().max(2000, 'La description ne doit pas dépasser 2000 caractères').optional(),
  status: z.enum(['nouvelle', 'en_investigation', 'confirmee', 'rejete'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  resolved_by: z.string().uuid('Identifiant résolveur invalide').optional(),
  resolution_notes: z.string().max(2000, 'Les notes de résolution ne doivent pas dépasser 2000 caractères').optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const FilterFraudSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  alert_type: z.enum(['transaction_suspecte', 'montant_inhabituel', 'comportement_anormal', 'tentative_acces'], { errorMap: () => ({ message: 'Type d\'alerte invalide' }) }).optional(),
  severity: z.enum(['faible', 'moyen', 'eleve', 'critique'], { errorMap: () => ({ message: 'Sévérité invalide' }) }).optional(),
  status: z.enum(['nouvelle', 'en_investigation', 'confirmee', 'rejete'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  date_from: z.string().datetime('Date de début invalide').optional(),
  date_to: z.string().datetime('Date de fin invalide').optional(),
  search: z.string().max(255, 'La recherche ne doit pas dépasser 255 caractères').optional(),
  page: z.number().int().min(1, 'Le numéro de page doit être supérieur à 0').optional(),
  limit: z.number().int().min(1, 'La limite doit être supérieure à 0').max(100, 'La limite ne doit pas dépasser 100').optional(),
});
