import z from 'zod';

export const CreatePaymentSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  payer_id: z.string().uuid('Identifiant payeur invalide'),
  payee_id: z.string().uuid('Identifiant bénéficiaire invalide').optional(),
  amount: z.number().positive('Le montant doit être positif'),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères'),
  payment_method: z.enum(['mobile_money', 'carte', 'virement', 'especes', 'cheque'], { errorMap: () => ({ message: 'Méthode de paiement invalide' }) }),
  reference: z.string().min(1, 'La référence est requise').max(100, 'La référence ne doit pas dépasser 100 caractères'),
  description: z.string().max(500, 'La description ne doit pas dépasser 500 caractères').optional(),
  status: z.enum(['en_attente', 'en_cours', 'termine', 'echoue', 'annule'], { errorMap: () => ({ message: 'Statut invalide' }) }),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const UpdatePaymentSchema = z.object({
  amount: z.number().positive('Le montant doit être positif').optional(),
  payment_method: z.enum(['mobile_money', 'carte', 'virement', 'especes', 'cheque'], { errorMap: () => ({ message: 'Méthode de paiement invalide' }) }).optional(),
  status: z.enum(['en_attente', 'en_cours', 'termine', 'echoue', 'annule'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  description: z.string().max(500, 'La description ne doit pas dépasser 500 caractères').optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const FilterPaymentSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  payer_id: z.string().uuid('Identifiant payeur invalide').optional(),
  payee_id: z.string().uuid('Identifiant bénéficiaire invalide').optional(),
  amount_min: z.number().min(0, 'Le montant minimum ne peut être négatif').optional(),
  amount_max: z.number().min(0, 'Le montant maximum ne peut être négatif').optional(),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères').optional(),
  payment_method: z.enum(['mobile_money', 'carte', 'virement', 'especes', 'cheque'], { errorMap: () => ({ message: 'Méthode de paiement invalide' }) }).optional(),
  status: z.enum(['en_attente', 'en_cours', 'termine', 'echoue', 'annule'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  date_from: z.string().datetime('Date de début invalide').optional(),
  date_to: z.string().datetime('Date de fin invalide').optional(),
  search: z.string().max(255, 'La recherche ne doit pas dépasser 255 caractères').optional(),
  page: z.number().int().min(1, 'Le numéro de page doit être supérieur à 0').optional(),
  limit: z.number().int().min(1, 'La limite doit être supérieure à 0').max(100, 'La limite ne doit pas dépasser 100').optional(),
});
