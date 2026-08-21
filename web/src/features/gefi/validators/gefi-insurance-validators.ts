import z from 'zod';

export const CreateInsuranceSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  policy_number: z.string().min(1, 'Le numéro de police est requis').max(100, 'Le numéro ne doit pas dépasser 100 caractères'),
  provider: z.string().min(1, 'Le fournisseur d\'assurance est requis').max(255, 'Le fournisseur ne doit pas dépasser 255 caractères'),
  insurance_type: z.enum(['sante', 'responsabilite', 'propriete', 'voyage', 'vie'], { errorMap: () => ({ message: 'Type d\'assurance invalide' }) }),
  premium_amount: z.number().positive('La prime doit être positive'),
  coverage_amount: z.number().positive('Le montant de couverture doit être positif'),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères'),
  status: z.enum(['active', 'expiree', 'annulee', 'en_attente'], { errorMap: () => ({ message: 'Statut invalide' }) }),
  start_date: z.string().datetime('Date de début invalide'),
  end_date: z.string().datetime('Date de fin invalide'),
  beneficiaries: z.array(z.string().uuid('Identifiant bénéficiaire invalide')).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const UpdateInsuranceSchema = z.object({
  policy_number: z.string().min(1, 'Le numéro de police est requis').max(100, 'Le numéro ne doit pas dépasser 100 caractères').optional(),
  provider: z.string().min(1, 'Le fournisseur d\'assurance est requis').max(255, 'Le fournisseur ne doit pas dépasser 255 caractères').optional(),
  insurance_type: z.enum(['sante', 'responsabilite', 'propriete', 'voyage', 'vie'], { errorMap: () => ({ message: 'Type d\'assurance invalide' }) }).optional(),
  premium_amount: z.number().positive('La prime doit être positive').optional(),
  coverage_amount: z.number().positive('Le montant de couverture doit être positif').optional(),
  status: z.enum(['active', 'expiree', 'annulee', 'en_attente'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  start_date: z.string().datetime('Date de début invalide').optional(),
  end_date: z.string().datetime('Date de fin invalide').optional(),
  beneficiaries: z.array(z.string().uuid('Identifiant bénéficiaire invalide')).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const FilterInsuranceSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  insurance_type: z.enum(['sante', 'responsabilite', 'propriete', 'voyage', 'vie'], { errorMap: () => ({ message: 'Type d\'assurance invalide' }) }).optional(),
  status: z.enum(['active', 'expiree', 'annulee', 'en_attente'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères').optional(),
  premium_min: z.number().min(0, 'La prime minimum ne peut être négative').optional(),
  premium_max: z.number().min(0, 'La prime maximum ne peut être négative').optional(),
  start_date_from: z.string().datetime('Date de début invalide').optional(),
  end_date_to: z.string().datetime('Date de fin invalide').optional(),
  search: z.string().max(255, 'La recherche ne doit pas dépasser 255 caractères').optional(),
  page: z.number().int().min(1, 'Le numéro de page doit être supérieur à 0').optional(),
  limit: z.number().int().min(1, 'La limite doit être supérieure à 0').max(100, 'La limite ne doit pas dépasser 100').optional(),
});
