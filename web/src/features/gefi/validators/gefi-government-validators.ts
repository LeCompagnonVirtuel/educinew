import z from 'zod';

export const CreateGovernmentSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  program_name: z.string().min(1, 'Le nom du programme est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères'),
  government_entity: z.string().min(1, 'L\'entité gouvernementale est requise').max(255, 'L\'entité ne doit pas dépasser 255 caractères'),
  program_type: z.enum(['subvention', 'exoneration', 'credit', 'don'], { errorMap: () => ({ message: 'Type de programme invalide' }) }),
  amount: z.number().min(0, 'Le montant ne peut être négatif'),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères'),
  status: z.enum(['actif', 'inactif', 'en_attente', 'approuve', 'rejete'], { errorMap: () => ({ message: 'Statut invalide' }) }),
  start_date: z.string().datetime('Date de début invalide'),
  end_date: z.string().datetime('Date de fin invalide').optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const UpdateGovernmentSchema = z.object({
  program_name: z.string().min(1, 'Le nom du programme est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères').optional(),
  government_entity: z.string().min(1, 'L\'entité gouvernementale est requise').max(255, 'L\'entité ne doit pas dépasser 255 caractères').optional(),
  program_type: z.enum(['subvention', 'exoneration', 'credit', 'don'], { errorMap: () => ({ message: 'Type de programme invalide' }) }).optional(),
  amount: z.number().min(0, 'Le montant ne peut être négatif').optional(),
  status: z.enum(['actif', 'inactif', 'en_attente', 'approuve', 'rejete'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  start_date: z.string().datetime('Date de début invalide').optional(),
  end_date: z.string().datetime('Date de fin invalide').optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const FilterGovernmentSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  program_type: z.enum(['subvention', 'exoneration', 'credit', 'don'], { errorMap: () => ({ message: 'Type de programme invalide' }) }).optional(),
  status: z.enum(['actif', 'inactif', 'en_attente', 'approuve', 'rejete'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères').optional(),
  amount_min: z.number().min(0, 'Le montant minimum ne peut être négatif').optional(),
  amount_max: z.number().min(0, 'Le montant maximum ne peut être négatif').optional(),
  start_date_from: z.string().datetime('Date de début invalide').optional(),
  end_date_to: z.string().datetime('Date de fin invalide').optional(),
  search: z.string().max(255, 'La recherche ne doit pas dépasser 255 caractères').optional(),
  page: z.number().int().min(1, 'Le numéro de page doit être supérieur à 0').optional(),
  limit: z.number().int().min(1, 'La limite doit être supérieure à 0').max(100, 'La limite ne doit pas dépasser 100').optional(),
});
