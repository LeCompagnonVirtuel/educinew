import z from 'zod';

export const CreateInstitutionalSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  institution_name: z.string().min(1, 'Le nom de l\'institution est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères'),
  institution_type: z.enum(['universite', 'lycee', 'college', 'ecole_primaire', 'centre_formation'], { errorMap: () => ({ message: 'Type d\'institution invalide' }) }),
  budget_allocated: z.number().min(0, 'Le budget alloué ne peut être négatif'),
  budget_used: z.number().min(0, 'Le budget utilisé ne peut être négatif'),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères'),
  fiscal_year: z.number().int().min(2000, 'Année fiscale invalide'),
  status: z.enum(['actif', 'inactif', 'en_revision'], { errorMap: () => ({ message: 'Statut invalide' }) }),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const UpdateInstitutionalSchema = z.object({
  institution_name: z.string().min(1, 'Le nom de l\'institution est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères').optional(),
  institution_type: z.enum(['universite', 'lycee', 'college', 'ecole_primaire', 'centre_formation'], { errorMap: () => ({ message: 'Type d\'institution invalide' }) }).optional(),
  budget_allocated: z.number().min(0, 'Le budget alloué ne peut être négatif').optional(),
  budget_used: z.number().min(0, 'Le budget utilisé ne peut être négatif').optional(),
  status: z.enum(['actif', 'inactif', 'en_revision'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const FilterInstitutionalSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  institution_type: z.enum(['universite', 'lycee', 'college', 'ecole_primaire', 'centre_formation'], { errorMap: () => ({ message: 'Type d\'institution invalide' }) }).optional(),
  status: z.enum(['actif', 'inactif', 'en_revision'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères').optional(),
  fiscal_year: z.number().int().min(2000, 'Année fiscale invalide').optional(),
  budget_min: z.number().min(0, 'Le budget minimum ne peut être négatif').optional(),
  budget_max: z.number().min(0, 'Le budget maximum ne peut être négatif').optional(),
  search: z.string().max(255, 'La recherche ne doit pas dépasser 255 caractères').optional(),
  page: z.number().int().min(1, 'Le numéro de page doit être supérieur à 0').optional(),
  limit: z.number().int().min(1, 'La limite doit être supérieure à 0').max(100, 'La limite ne doit pas dépasser 100').optional(),
});
