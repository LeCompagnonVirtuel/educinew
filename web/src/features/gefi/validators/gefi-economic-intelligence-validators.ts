import z from 'zod';

export const CreateEconomicIntelligenceSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  indicator_name: z.string().min(1, 'Le nom de l\'indicateur est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères'),
  indicator_type: z.enum(['revenu', 'depense', 'profit', 'croissance', 'prevision'], { errorMap: () => ({ message: 'Type d\'indicateur invalide' }) }),
  value: z.number(),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères'),
  period: z.enum(['jour', 'semaine', 'mois', 'trimestre', 'annee'], { errorMap: () => ({ message: 'Période invalide' }) }),
  data_source: z.string().min(1, 'La source des données est requise').max(255, 'La source ne doit pas dépasser 255 caractères'),
  status: z.enum(['valide', 'en_attente', 'rejete'], { errorMap: () => ({ message: 'Statut invalide' }) }),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const UpdateEconomicIntelligenceSchema = z.object({
  indicator_name: z.string().min(1, 'Le nom de l\'indicateur est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères').optional(),
  indicator_type: z.enum(['revenu', 'depense', 'profit', 'croissance', 'prevision'], { errorMap: () => ({ message: 'Type d\'indicateur invalide' }) }).optional(),
  value: z.number().optional(),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères').optional(),
  period: z.enum(['jour', 'semaine', 'mois', 'trimestre', 'annee'], { errorMap: () => ({ message: 'Période invalide' }) }).optional(),
  data_source: z.string().min(1, 'La source des données est requise').max(255, 'La source ne doit pas dépasser 255 caractères').optional(),
  status: z.enum(['valide', 'en_attente', 'rejete'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const FilterEconomicIntelligenceSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  indicator_type: z.enum(['revenu', 'depense', 'profit', 'croissance', 'prevision'], { errorMap: () => ({ message: 'Type d\'indicateur invalide' }) }).optional(),
  status: z.enum(['valide', 'en_attente', 'rejete'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères').optional(),
  period: z.enum(['jour', 'semaine', 'mois', 'trimestre', 'annee'], { errorMap: () => ({ message: 'Période invalide' }) }).optional(),
  date_from: z.string().datetime('Date de début invalide').optional(),
  date_to: z.string().datetime('Date de fin invalide').optional(),
  search: z.string().max(255, 'La recherche ne doit pas dépasser 255 caractères').optional(),
  page: z.number().int().min(1, 'Le numéro de page doit être supérieur à 0').optional(),
  limit: z.number().int().min(1, 'La limite doit être supérieure à 0').max(100, 'La limite ne doit pas dépasser 100').optional(),
});
