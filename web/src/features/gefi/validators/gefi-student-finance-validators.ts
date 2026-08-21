import z from 'zod';

export const CreateStudentFinanceSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  student_id: z.string().uuid('Identifiant élève invalide'),
  account_type: z.enum(['frais_scolarite', 'bourse', 'pret', 'epargne'], { errorMap: () => ({ message: 'Type de compte invalide' }) }),
  balance: z.number().min(0, 'Le solde ne peut être négatif'),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères'),
  status: z.enum(['actif', 'inactif', 'suspendu'], { errorMap: () => ({ message: 'Statut invalide' }) }),
  due_date: z.string().datetime('Date d\'échéance invalide').optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const UpdateStudentFinanceSchema = z.object({
  account_type: z.enum(['frais_scolarite', 'bourse', 'pret', 'epargne'], { errorMap: () => ({ message: 'Type de compte invalide' }) }).optional(),
  balance: z.number().min(0, 'Le solde ne peut être négatif').optional(),
  status: z.enum(['actif', 'inactif', 'suspendu'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  due_date: z.string().datetime('Date d\'échéance invalide').optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const FilterStudentFinanceSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  student_id: z.string().uuid('Identifiant élève invalide').optional(),
  account_type: z.enum(['frais_scolarite', 'bourse', 'pret', 'epargne'], { errorMap: () => ({ message: 'Type de compte invalide' }) }).optional(),
  status: z.enum(['actif', 'inactif', 'suspendu'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  currency: z.string().length(3, 'Le code devise doit contenir 3 caractères').optional(),
  balance_min: z.number().min(0, 'Le solde minimum ne peut être négatif').optional(),
  balance_max: z.number().min(0, 'Le solde maximum ne peut être négatif').optional(),
  due_date_from: z.string().datetime('Date d\'échéance invalide').optional(),
  due_date_to: z.string().datetime('Date d\'échéance invalide').optional(),
  search: z.string().max(255, 'La recherche ne doit pas dépasser 255 caractères').optional(),
  page: z.number().int().min(1, 'Le numéro de page doit être supérieur à 0').optional(),
  limit: z.number().int().min(1, 'La limite doit être supérieure à 0').max(100, 'La limite ne doit pas dépasser 100').optional(),
});
