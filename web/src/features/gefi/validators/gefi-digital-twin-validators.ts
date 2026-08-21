import z from 'zod';

export const CreateDigitalTwinSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  twin_name: z.string().min(1, 'Le nom du jumeau numérique est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères'),
  entity_type: z.enum(['batiment', 'classe', 'infrastructure', 'processus'], { errorMap: () => ({ message: 'Type d\'entité invalide' }) }),
  entity_id: z.string().uuid('Identifiant entité invalide'),
  simulation_type: z.enum(['financial', 'operational', 'predictive'], { errorMap: () => ({ message: 'Type de simulation invalide' }) }),
  parameters: z.record(z.string(), z.unknown()),
  status: z.enum(['actif', 'inactif', 'en_simulation'], { errorMap: () => ({ message: 'Statut invalide' }) }),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const UpdateDigitalTwinSchema = z.object({
  twin_name: z.string().min(1, 'Le nom du jumeau numérique est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères').optional(),
  entity_type: z.enum(['batiment', 'classe', 'infrastructure', 'processus'], { errorMap: () => ({ message: 'Type d\'entité invalide' }) }).optional(),
  simulation_type: z.enum(['financial', 'operational', 'predictive'], { errorMap: () => ({ message: 'Type de simulation invalide' }) }).optional(),
  parameters: z.record(z.string(), z.unknown()).optional(),
  status: z.enum(['actif', 'inactif', 'en_simulation'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const FilterDigitalTwinSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  entity_type: z.enum(['batiment', 'classe', 'infrastructure', 'processus'], { errorMap: () => ({ message: 'Type d\'entité invalide' }) }).optional(),
  simulation_type: z.enum(['financial', 'operational', 'predictive'], { errorMap: () => ({ message: 'Type de simulation invalide' }) }).optional(),
  status: z.enum(['actif', 'inactif', 'en_simulation'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  search: z.string().max(255, 'La recherche ne doit pas dépasser 255 caractères').optional(),
  page: z.number().int().min(1, 'Le numéro de page doit être supérieur à 0').optional(),
  limit: z.number().int().min(1, 'La limite doit être supérieure à 0').max(100, 'La limite ne doit pas dépasser 100').optional(),
});
