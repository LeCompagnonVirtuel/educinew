import z from 'zod';

export const CreateInternationalSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  partner_name: z.string().min(1, 'Le nom du partenaire est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères'),
  country_code: z.string().length(2, 'Le code pays doit contenir 2 caractères'),
  transaction_type: z.enum(['paiement', 'transfert', 'don', 'investissement'], { errorMap: () => ({ message: 'Type de transaction invalide' }) }),
  amount: z.number().positive('Le montant doit être positif'),
  source_currency: z.string().length(3, 'Le code devise source doit contenir 3 caractères'),
  target_currency: z.string().length(3, 'Le code devise cible doit contenir 3 caractères'),
  exchange_rate: z.number().positive('Le taux de change doit être positif'),
  status: z.enum(['en_attente', 'en_cours', 'termine', 'echoue'], { errorMap: () => ({ message: 'Statut invalide' }) }),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const UpdateInternationalSchema = z.object({
  partner_name: z.string().min(1, 'Le nom du partenaire est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères').optional(),
  transaction_type: z.enum(['paiement', 'transfert', 'don', 'investissement'], { errorMap: () => ({ message: 'Type de transaction invalide' }) }).optional(),
  amount: z.number().positive('Le montant doit être positif').optional(),
  exchange_rate: z.number().positive('Le taux de change doit être positif').optional(),
  status: z.enum(['en_attente', 'en_cours', 'termine', 'echoue'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const FilterInternationalSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  country_code: z.string().length(2, 'Le code pays doit contenir 2 caractères').optional(),
  transaction_type: z.enum(['paiement', 'transfert', 'don', 'investissement'], { errorMap: () => ({ message: 'Type de transaction invalide' }) }).optional(),
  status: z.enum(['en_attente', 'en_cours', 'termine', 'echoue'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  amount_min: z.number().min(0, 'Le montant minimum ne peut être négatif').optional(),
  amount_max: z.number().min(0, 'Le montant maximum ne peut être négatif').optional(),
  source_currency: z.string().length(3, 'Le code devise source doit contenir 3 caractères').optional(),
  search: z.string().max(255, 'La recherche ne doit pas dépasser 255 caractères').optional(),
  page: z.number().int().min(1, 'Le numéro de page doit être supérieur à 0').optional(),
  limit: z.number().int().min(1, 'La limite doit être supérieure à 0').max(100, 'La limite ne doit pas dépasser 100').optional(),
});
