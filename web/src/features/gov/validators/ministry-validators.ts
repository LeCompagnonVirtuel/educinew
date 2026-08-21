import { z } from 'zod';

export const MinistryCreateSchema = z.object({
  name: z.string().min(1, 'Le nom du ministère est requis'),
  code: z.string().min(1, 'Le code est requis'),
  level: z.enum(['national', 'regional', 'provincial', 'communal'], {
    message: 'Le niveau est invalide',
  }),
  address: z.string().min(1, "L'adresse est requise"),
  phone: z.string().min(1, 'Le numéro de téléphone est requis'),
  email: z.string().email('Adresse email invalide'),
  website: z.string().url('URL invalide').optional(),
  responsible: z.string().min(1, 'Le responsable est requis'),
  status: z.enum(['active', 'inactive'], {
    message: 'Le statut est invalide',
  }).default('active'),
});

export const MinistryUpdateSchema = MinistryCreateSchema.partial();

export const MinistryQuerySchema = z.object({
  level: z.enum(['national', 'regional', 'provincial', 'communal']).optional(),
  status: z.enum(['active', 'inactive']).optional(),
  search: z.string().optional(),
});
