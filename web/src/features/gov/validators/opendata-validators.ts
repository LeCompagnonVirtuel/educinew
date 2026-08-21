import { z } from 'zod';

export const OpenDatasetCreateSchema = z.object({
  title: z.string().min(1, 'Le titre du jeu de données est requis'),
  description: z.string().min(1, 'La description est requise'),
  category: z.enum(['education', 'finance', 'demographics', 'infrastructure'], {
    message: 'La catégorie est invalide',
  }),
  format: z.enum(['csv', 'json', 'xlsx', 'xml'], {
    message: 'Le format est invalide',
  }),
  publisher: z.string().min(1, 'L\'éditeur est requis'),
  license: z.string().min(1, 'La licence est requise'),
  accessLevel: z.enum(['public', 'restricted', 'private'], {
    message: 'Le niveau d\'accès est invalide',
  }).default('public'),
  language: z.string().length(2, 'Le code langue doit faire 2 caractères').default('fr'),
  tags: z.array(z.string()).optional(),
  downloadUrl: z.string().url('URL de téléchargement invalide').optional(),
  status: z.enum(['active', 'archived', 'deprecated'], {
    message: 'Le statut est invalide',
  }).default('active'),
});

export const OpenDatasetUpdateSchema = OpenDatasetCreateSchema.partial();

export const OpenDatasetVersionSchema = z.object({
  datasetId: z.string().uuid('ID jeu de données invalide'),
  version: z.string().min(1, 'La version est requise'),
  changelog: z.string().optional(),
  downloadUrl: z.string().url('URL de téléchargement invalide'),
  publishedAt: z.string().min(1, 'La date de publication est requise'),
  isActive: z.boolean().default(true),
});

export const OpenDatasetVersionUpdateSchema = OpenDatasetVersionSchema.partial();

export const OpenDataIndicatorCreateSchema = z.object({
  name: z.string().min(1, 'Le nom de l\'indicateur est requis'),
  description: z.string().optional(),
  category: z.string().min(1, 'La catégorie est requise'),
  unit: z.string().optional(),
  source: z.string().min(1, 'La source est requise'),
  formula: z.string().optional(),
  frequency: z.enum(['daily', 'weekly', 'monthly', 'quarterly', 'yearly'], {
    message: 'La fréquence est invalide',
  }).default('yearly'),
  isActive: z.boolean().default(true),
});

export const OpenDataIndicatorUpdateSchema = OpenDataIndicatorCreateSchema.partial();
