import z from 'zod';

export const CreateWalletSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  user_id: z.string().uuid('Identifiant utilisateur invalide'),
  name: z.string().min(1, 'Le nom du portefeuille est requis').max(100, 'Le nom ne doit pas dépasser 100 caractères'),
  type: z.enum(['principal', 'secondaire', 'epargne'], { errorMap: () => ({ message: 'Type de portefeuille invalide' }) }),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères'),
  balance: z.number().min(0, 'Le solde ne peut être négatif'),
  status: z.enum(['actif', 'inactif', 'suspendu'], { errorMap: () => ({ message: 'Statut invalide' }) }),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const UpdateWalletSchema = z.object({
  name: z.string().min(1, 'Le nom du portefeuille est requis').max(100, 'Le nom ne doit pas dépasser 100 caractères').optional(),
  type: z.enum(['principal', 'secondaire', 'epargne'], { errorMap: () => ({ message: 'Type de portefeuille invalide' }) }).optional(),
  status: z.enum(['actif', 'inactif', 'suspendu'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const FilterWalletSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  user_id: z.string().uuid('Identifiant utilisateur invalide').optional(),
  type: z.enum(['principal', 'secondaire', 'epargne'], { errorMap: () => ({ message: 'Type de portefeuille invalide' }) }).optional(),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères').optional(),
  status: z.enum(['actif', 'inactif', 'suspendu'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  balance_min: z.number().min(0, 'Le solde minimum ne peut être négatif').optional(),
  balance_max: z.number().min(0, 'Le solde maximum ne peut être négatif').optional(),
  search: z.string().max(255, 'La recherche ne doit pas dépasser 255 caractères').optional(),
  page: z.number().int().min(1, 'Le numéro de page doit être supérieur à 0').optional(),
  limit: z.number().int().min(1, 'La limite doit être supérieure à 0').max(100, 'La limite ne doit pas dépasser 100').optional(),
});
