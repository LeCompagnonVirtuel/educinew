import { z } from 'zod';

export const PortalCreateSchema = z.object({
  name: z.string().min(1, 'Le nom du portail est requis'),
  description: z.string().optional(),
  type: z.enum(['citizen', 'institution', 'government'], {
    message: 'Le type de portail est invalide',
  }),
  domain: z.string().min(1, 'Le domaine est requis'),
  logoUrl: z.string().url('URL du logo invalide').optional(),
  theme: z.enum(['light', 'dark', 'system'], {
    message: 'Le thème est invalide',
  }).default('light'),
  status: z.enum(['active', 'maintenance', 'inactive'], {
    message: 'Le statut est invalide',
  }).default('active'),
  isPublic: z.boolean().default(true),
  features: z.array(z.string()).optional(),
});

export const PortalUpdateSchema = PortalCreateSchema.partial();

export const PortalPageCreateSchema = z.object({
  portalId: z.string().uuid('ID portail invalide'),
  title: z.string().min(1, 'Le titre est requis'),
  slug: z.string().min(1, 'Le slug est requis'),
  content: z.string().optional(),
  sortOrder: z.number().int().min(0, "L'ordre doit être positif").default(0),
  isPublished: z.boolean().default(false),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export const PortalPageUpdateSchema = PortalPageCreateSchema.partial();

export const PortalServiceCreateSchema = z.object({
  portalId: z.string().uuid('ID portail invalide'),
  name: z.string().min(1, 'Le nom du service est requis'),
  description: z.string().optional(),
  endpoint: z.string().min(1, "L'endpoint est requis"),
  category: z.string().min(1, 'La catégorie est requise'),
  isActive: z.boolean().default(true),
  requiresAuth: z.boolean().default(true),
});

export const PortalServiceUpdateSchema = PortalServiceCreateSchema.partial();
