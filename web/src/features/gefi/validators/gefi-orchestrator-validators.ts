import z from 'zod';

export const CreateOrchestratorSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  workflow_name: z.string().min(1, 'Le nom du workflow est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères'),
  workflow_type: z.enum(['paiement', 'validation', 'approbation', 'notification', 'synchronisation'], { errorMap: () => ({ message: 'Type de workflow invalide' }) }),
  trigger_type: z.enum(['manuel', 'automatique', 'planifie', 'evenement'], { errorMap: () => ({ message: 'Type de déclencheur invalide' }) }),
  steps: z.array(z.object({
    step_order: z.number().int().min(1, 'L\'ordre de l\'étape doit être supérieur à 0'),
    action: z.string().min(1, 'L\'action est requise'),
    config: z.record(z.string(), z.unknown()),
  })),
  status: z.enum(['actif', 'inactif', 'en_cours', 'termine', 'echoue'], { errorMap: () => ({ message: 'Statut invalide' }) }),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const UpdateOrchestratorSchema = z.object({
  workflow_name: z.string().min(1, 'Le nom du workflow est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères').optional(),
  workflow_type: z.enum(['paiement', 'validation', 'approbation', 'notification', 'synchronisation'], { errorMap: () => ({ message: 'Type de workflow invalide' }) }).optional(),
  trigger_type: z.enum(['manuel', 'automatique', 'planifie', 'evenement'], { errorMap: () => ({ message: 'Type de déclencheur invalide' }) }).optional(),
  steps: z.array(z.object({
    step_order: z.number().int().min(1, 'L\'ordre de l\'étape doit être supérieur à 0'),
    action: z.string().min(1, 'L\'action est requise'),
    config: z.record(z.string(), z.unknown()),
  })).optional(),
  status: z.enum(['actif', 'inactif', 'en_cours', 'termine', 'echoue'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const FilterOrchestratorSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  workflow_type: z.enum(['paiement', 'validation', 'approbation', 'notification', 'synchronisation'], { errorMap: () => ({ message: 'Type de workflow invalide' }) }).optional(),
  trigger_type: z.enum(['manuel', 'automatique', 'planifie', 'evenement'], { errorMap: () => ({ message: 'Type de déclencheur invalide' }) }).optional(),
  status: z.enum(['actif', 'inactif', 'en_cours', 'termine', 'echoue'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  search: z.string().max(255, 'La recherche ne doit pas dépasser 255 caractères').optional(),
  page: z.number().int().min(1, 'Le numéro de page doit être supérieur à 0').optional(),
  limit: z.number().int().min(1, 'La limite doit être supérieure à 0').max(100, 'La limite ne doit pas dépasser 100').optional(),
});
