import { z } from 'zod';

export const EmergencyPlanCreateSchema = z.object({
  name: z.string().min(1, 'Le nom du plan est requis'),
  description: z.string().min(1, 'La description est requise'),
  type: z.enum(['natural_disaster', 'health_crisis', 'security', 'infrastructure'], {
    message: 'Le type de plan est invalide',
  }),
  level: z.enum(['local', 'regional', 'national'], {
    message: 'Le niveau est invalide',
  }),
  responsibleEntity: z.string().min(1, 'L\'entité responsable est requise'),
  status: z.enum(['draft', 'active', 'inactive'], {
    message: 'Le statut est invalide',
  }).default('draft'),
  effectiveDate: z.string().min(1, 'La date d\'entrée en vigueur est requise'),
  expiryDate: z.string().min(1, 'La date d\'expiration est requise'),
  version: z.string().min(1, 'La version est requise').default('1.0'),
});

export const EmergencyPlanUpdateSchema = EmergencyPlanCreateSchema.partial();

export const EmergencyContactCreateSchema = z.object({
  name: z.string().min(1, 'Le nom du contact est requis'),
  role: z.string().min(1, 'Le rôle est requis'),
  organization: z.string().min(1, 'L\'organisation est requise'),
  phone: z.string().min(1, 'Le numéro de téléphone est requis'),
  email: z.string().email('Adresse email invalide').optional(),
  level: z.enum(['primary', 'secondary', 'tertiary'], {
    message: 'Le niveau est invalide',
  }).default('primary'),
  isAvailable247: z.boolean().default(false),
  notes: z.string().optional(),
});

export const EmergencyContactUpdateSchema = EmergencyContactCreateSchema.partial();

export const EmergencyDrillCreateSchema = z.object({
  planId: z.string().uuid('ID plan invalide'),
  name: z.string().min(1, 'Le nom de l\'exercice est requis'),
  type: z.enum(['tabletop', 'functional', 'full_scale'], {
    message: 'Le type d\'exercice est invalide',
  }),
  scheduledDate: z.string().min(1, 'La date prévue est requise'),
  conductedDate: z.string().optional(),
  location: z.string().min(1, 'Le lieu est requis'),
  participants: z.number().int().min(1, 'Le nombre de participants doit être positif'),
  status: z.enum(['planned', 'in_progress', 'completed', 'cancelled'], {
    message: 'Le statut est invalide',
  }).default('planned'),
  evaluation: z.string().optional(),
});

export const EmergencyDrillUpdateSchema = EmergencyDrillCreateSchema.partial();
