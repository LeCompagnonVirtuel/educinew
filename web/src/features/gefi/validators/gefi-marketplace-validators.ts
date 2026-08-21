import z from 'zod';

export const CreateMarketplaceSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  service_name: z.string().min(1, 'Le nom du service est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères'),
  service_type: z.enum(['tutorat', 'formation', 'ressource', 'materiel', 'logiciel'], { errorMap: () => ({ message: 'Type de service invalide' }) }),
  description: z.string().max(2000, 'La description ne doit pas dépasser 2000 caractères').optional(),
  price: z.number().min(0, 'Le prix ne peut être négatif'),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères'),
  provider_id: z.string().uuid('Identifiant fournisseur invalide'),
  status: z.enum(['actif', 'inactif', 'en_attente'], { errorMap: () => ({ message: 'Statut invalide' }) }),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const UpdateMarketplaceSchema = z.object({
  service_name: z.string().min(1, 'Le nom du service est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères').optional(),
  service_type: z.enum(['tutorat', 'formation', 'ressource', 'materiel', 'logiciel'], { errorMap: () => ({ message: 'Type de service invalide' }) }).optional(),
  description: z.string().max(2000, 'La description ne doit pas dépasser 2000 caractères').optional(),
  price: z.number().min(0, 'Le prix ne peut être négatif').optional(),
  status: z.enum(['actif', 'inactif', 'en_attente'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const FilterMarketplaceSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  service_type: z.enum(['tutorat', 'formation', 'ressource', 'materiel', 'logiciel'], { errorMap: () => ({ message: 'Type de service invalide' }) }).optional(),
  status: z.enum(['actif', 'inactif', 'en_attente'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères').optional(),
  price_min: z.number().min(0, 'Le prix minimum ne peut être négatif').optional(),
  price_max: z.number().min(0, 'Le prix maximum ne peut être négatif').optional(),
  tags: z.array(z.string()).optional(),
  search: z.string().max(255, 'La recherche ne doit pas dépasser 255 caractères').optional(),
  page: z.number().int().min(1, 'Le numéro de page doit être supérieur à 0').optional(),
  limit: z.number().int().min(1, 'La limite doit être supérieure à 0').max(100, 'La limite ne doit pas dépasser 100').optional(),
});
