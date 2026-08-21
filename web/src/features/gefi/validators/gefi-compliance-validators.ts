import z from 'zod';

export const CreateComplianceSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  regulation_name: z.string().min(1, 'Le nom de la réglementation est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères'),
  regulation_type: z.enum(['fiscal', 'comptable', 'financier', 'environnemental', 'social'], { errorMap: () => ({ message: 'Type de réglementation invalide' }) }),
  description: z.string().max(2000, 'La description ne doit pas dépasser 2000 caractères').optional(),
  status: z.enum(['conforme', 'non_conforme', 'en_cours', 'exonere'], { errorMap: () => ({ message: 'Statut invalide' }) }),
  due_date: z.string().datetime('Date d\'échéance invalide').optional(),
  completed_date: z.string().datetime('Date d\'achèvement invalide').optional(),
  responsible_user_id: z.string().uuid('Identifiant responsable invalide').optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const UpdateComplianceSchema = z.object({
  regulation_name: z.string().min(1, 'Le nom de la réglementation est requis').max(255, 'Le nom ne doit pas dépasser 255 caractères').optional(),
  regulation_type: z.enum(['fiscal', 'comptable', 'financier', 'environnemental', 'social'], { errorMap: () => ({ message: 'Type de réglementation invalide' }) }).optional(),
  description: z.string().max(2000, 'La description ne doit pas dépasser 2000 caractères').optional(),
  status: z.enum(['conforme', 'non_conforme', 'en_cours', 'exonere'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  due_date: z.string().datetime('Date d\'échéance invalide').optional(),
  completed_date: z.string().datetime('Date d\'achèvement invalide').optional(),
  responsible_user_id: z.string().uuid('Identifiant responsable invalide').optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const FilterComplianceSchema = z.object({
  school_id: z.string().uuid('Identifiant d\'établissement invalide'),
  regulation_type: z.enum(['fiscal', 'comptable', 'financier', 'environnemental', 'social'], { errorMap: () => ({ message: 'Type de réglementation invalide' }) }).optional(),
  status: z.enum(['conforme', 'non_conforme', 'en_cours', 'exonere'], { errorMap: () => ({ message: 'Statut invalide' }) }).optional(),
  due_date_from: z.string().datetime('Date d\'échéance invalide').optional(),
  due_date_to: z.string().datetime('Date d\'échéance invalide').optional(),
  search: z.string().max(255, 'La recherche ne doit pas dépasser 255 caractères').optional(),
  page: z.number().int().min(1, 'Le numéro de page doit être supérieur à 0').optional(),
  limit: z.number().int().min(1, 'La limite doit être supérieure à 0').max(100, 'La limite ne doit pas dépasser 100').optional(),
});
