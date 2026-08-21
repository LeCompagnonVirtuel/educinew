import { z } from 'zod';

export const BudgetCreateSchema = z.object({
  ministryId: z.string().uuid('ID ministère invalide'),
  name: z.string().min(1, 'Le nom du budget est requis'),
  academicYear: z.string().min(1, "L'année académique est requise"),
  totalAmount: z.number().min(0, 'Le montant doit être positif'),
  allocatedAmount: z.number().min(0, 'Le montant alloué doit être positif').default(0),
  spentAmount: z.number().min(0, 'Le montant dépensé doit être positif').default(0),
  status: z.enum(['draft', 'approved', 'active', 'closed'], {
    message: 'Le statut est invalide',
  }).default('draft'),
  approvedAt: z.string().datetime().optional(),
  approvedBy: z.string().uuid().optional(),
});

export const BudgetUpdateSchema = BudgetCreateSchema.partial();

export const FundCreateSchema = z.object({
  budgetId: z.string().uuid('ID budget invalide'),
  name: z.string().min(1, 'Le nom du fonds est requis'),
  source: z.enum(['government', 'donor', 'own', 'other'], {
    message: 'La source est invalide',
  }),
  amount: z.number().min(0, 'Le montant doit être positif'),
  currency: z.string().length(3, 'Le code devise doit faire 3 caractères').default('XOF'),
  receivedAt: z.string().min(1, 'La date de réception est requise'),
  status: z.enum(['pending', 'confirmed', 'rejected'], {
    message: 'Le statut est invalide',
  }).default('pending'),
});

export const FundUpdateSchema = FundCreateSchema.partial();

export const AllocationCreateSchema = z.object({
  budgetId: z.string().uuid('ID budget invalide'),
  category: z.string().min(1, 'La catégorie est requise'),
  description: z.string().min(1, 'La description est requise'),
  amount: z.number().min(0, 'Le montant doit être positif'),
  status: z.enum(['pending', 'approved', 'spent'], {
    message: 'Le statut est invalide',
  }).default('pending'),
});

export const AllocationUpdateSchema = AllocationCreateSchema.partial();
