import z from 'zod';

export const CreateDataMeshSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  domain_name: z.string().min(1, 'Le nom du domaine est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères'),
  data_product_name: z.string().min(1, 'Le nom du produit de données est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères'),
  data_type: z.enum(['structured', 'semi_structured', 'unstructured'], { errorMap: () => ({ message: 'Type de données invalide' }) }),
  owner_id: z.string().uuid('Identifiant propriétaire invalide'),
  quality_score: z.number().min(0, 'Le score de qualité ne peut être négatif').max(100, 'Le score de qualité ne peut dépasser 100'),
  status: z.enum(['actif', 'inactif', 'en_revision'], { errorMap: () => ({ message: 'Statut invalide' }) }),
  schema_definition: z.record(z.string(), z.unknown()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const UpdateDataMeshSchema = z.object({
  domain_name: z.string().min(1, 'Le nom du domaine est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères').optional(),
  data_product_name: z.string().min(1, 'Le nom du produit de données est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères').optional(),
  data_type: z.enum(['structured', 'semi_structured', 'unstructured'], { errorMap: () => ({ message: 'Type de données invalide' }) }).optional(),
  owner_id: z.string().uuid('Identifiant propriétaire invalide').optional(),
  quality_score: z.number().min(0, 'Le score de qualité ne peut être négatif').max(100, 'Le score de qualité ne peut dépasser 100').optional(),
  status: z.enum(['actif', 'inactif', 'en_revision'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  schema_definition: z.record(z.string(), z.unknown()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const FilterDataMeshSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  data_type: z.enum(['structured', 'semi_structured', 'unstructured'], { errorMap: () => ({ message: 'Type de données invalide' }) }).optional(),
  status: z.enum(['actif', 'inactif', 'en_revision'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  quality_score_min: z.number().min(0, 'Le score minimum ne peut être négatif').optional(),
  quality_score_max: z.number().min(0, 'Le score maximum ne peut être négatif').optional(),
  search: z.string().max(255, 'La recherche ne doit pas dépasser 255 caractères').optional(),
  page: z.number().int().min(1, 'Le numéro de page doit être supérieur à 0').optional(),
  limit: z.number().int().min(1, 'La limite doit être supérieure à 0').max(100, 'La limite ne doit pas dépasser 100').optional(),
});
