import { z } from 'zod';

export const RegistryCreateSchema = z.object({
  institutionId: z.string().uuid('ID institution invalide'),
  registryType: z.enum(['establishment', 'program', 'diploma'], {
    message: 'Le type de registre est invalide',
  }),
  name: z.string().min(1, 'Le nom du registre est requis'),
  academicYear: z.string().min(1, "L'année académique est requise"),
  status: z.enum(['active', 'archived'], {
    message: 'Le statut est invalide',
  }).default('active'),
  totalEntries: z.number().int().min(0, 'Le nombre total doit être positif').default(0),
});

export const RegistryUpdateSchema = RegistryCreateSchema.partial();

export const RegistryEntrySchema = z.object({
  registryId: z.string().uuid('ID registre invalide'),
  entityId: z.string().uuid('ID entité invalide'),
  entryNumber: z.string().min(1, "Le numéro d'entrée est requis"),
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string().optional(),
  status: z.enum(['valid', 'pending', 'rejected'], {
    message: "Le statut de l'entrée est invalide",
  }).default('pending'),
});

export const RegistryEntryUpdateSchema = RegistryEntrySchema.partial();
