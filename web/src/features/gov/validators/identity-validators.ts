import { z } from 'zod';

export const NationalIdCreateSchema = z.object({
  userId: z.string().uuid('ID utilisateur invalide'),
  nationalIdNumber: z.string().min(1, 'Le numéro d\'identité nationale est requis'),
  issuedDate: z.string().min(1, 'La date de délivrance est requise'),
  expiryDate: z.string().min(1, 'La date d\'expiration est requise'),
  issuingAuthority: z.string().min(1, "L'autorité de délivrance est requise"),
  documentType: z.enum(['national_id', 'passport', 'birth_certificate'], {
    message: 'Le type de document est invalide',
  }),
  status: z.enum(['valid', 'expired', 'revoked'], {
    message: 'Le statut est invalide',
  }).default('valid'),
  verifiedAt: z.string().datetime().optional(),
  verifiedBy: z.string().uuid().optional(),
});

export const NationalIdUpdateSchema = NationalIdCreateSchema.partial();

export const VerificationCreateSchema = z.object({
  userId: z.string().uuid('ID utilisateur invalide'),
  documentType: z.enum(['national_id', 'passport', 'birth_certificate'], {
    message: 'Le type de document est invalide',
  }),
  documentNumber: z.string().min(1, 'Le numéro du document est requis'),
  verificationMethod: z.enum(['manual', 'automated', 'biometric'], {
    message: 'La méthode de vérification est invalide',
  }),
  status: z.enum(['pending', 'verified', 'rejected'], {
    message: 'Le statut est invalide',
  }).default('pending'),
  verifiedBy: z.string().uuid().optional(),
  notes: z.string().optional(),
});

export const VerificationUpdateSchema = VerificationCreateSchema.partial();
