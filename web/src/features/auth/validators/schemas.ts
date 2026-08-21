import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

export const LoginSchema = z.object({
  identifier: z
    .string()
    .min(1, 'Identifiant requis')
    .max(255, 'Identifiant trop long'),
  password: z
    .string()
    .min(1, 'Mot de passe requis')
    .max(128, 'Mot de passe trop long'),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  email: z
    .string()
    .min(1, 'Email requis')
    .email('Format email invalide')
    .max(255, 'Email trop long'),
  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .max(128, 'Mot de passe trop long')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
    .regex(/\d/, 'Le mot de passe doit contenir au moins un chiffre'),
  confirmPassword: z.string().min(1, 'Confirmation du mot de passe requise'),
  name: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Nom trop long'),
  role: z.enum(['STUDENT', 'PARENT']).optional(),
  phone: z.string().regex(/^\+?[\d\s-]{8,15}$/, 'Numéro de téléphone invalide').optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

export type RegisterInput = z.infer<typeof RegisterSchema>;

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email requis')
    .email('Format email invalide'),
});

export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;

export const ResetPasswordSchema = z.object({
  token: z.string().min(1, 'Token requis'),
  newPassword: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .max(128, 'Mot de passe trop long')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
    .regex(/\d/, 'Le mot de passe doit contenir au moins un chiffre'),
  confirmPassword: z.string().min(1, 'Confirmation du mot de passe requise'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Mot de passe actuel requis'),
  newPassword: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .max(128, 'Mot de passe trop long')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
    .regex(/\d/, 'Le mot de passe doit contenir au moins un chiffre'),
  confirmPassword: z.string().min(1, 'Confirmation du mot de passe requise'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
}).refine((data) => data.currentPassword !== data.newPassword, {
  message: 'Le nouveau mot de passe doit être différent de l\'actuel',
  path: ['newPassword'],
});

export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;

export const VerifyEmailSchema = z.object({
  token: z.string().min(1, 'Token de vérification requis'),
  type: z.string().optional(),
});

export type VerifyEmailInput = z.infer<typeof VerifyEmailSchema>;

export const RefreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token requis'),
});

export type RefreshTokenInput = z.infer<typeof RefreshTokenSchema>;

export const InvitationSchema = z.object({
  email: z
    .string()
    .min(1, 'Email requis')
    .email('Format email invalide'),
  role: z.enum([
    'DIRECTEUR', 'COMPTABLE', 'SECRETAIRE', 'CENSEUR',
    'SURVEILLANT', 'TEACHER', 'PARENT', 'STUDENT',
    'CHAUFFEUR', 'BIBLIOTHECAIRE', 'INFIRMIER',
  ]),
  schoolId: z.string().uuid('ID d\'établissement invalide'),
  expiresAt: z.string().datetime().optional(),
});

export type InvitationInput = z.infer<typeof InvitationSchema>;

export const MFASetupSchema = z.object({
  factorType: z.enum(['totp']),
});

export type MFASetupInput = z.infer<typeof MFASetupSchema>;

export const MFAVerifySchema = z.object({
  code: z
    .string()
    .length(6, 'Le code doit contenir 6 chiffres')
    .regex(/^\d+$/, 'Le code doit contenir uniquement des chiffres'),
  factorId: z.string().uuid().optional(),
});

export type MFAVerifyInput = z.infer<typeof MFAVerifySchema>;

export const MFADeleteSchema = z.object({
  factorId: z.string().uuid('ID du facteur invalide'),
});

export type MFADeleteInput = z.infer<typeof MFADeleteSchema>;

export const AcceptTermsSchema = z.object({
  accepted: z.literal(true, {
    errorMap: () => ({ message: 'Vous devez accepter les conditions d\'utilisation' }),
  }),
});

export type AcceptTermsInput = z.infer<typeof AcceptTermsSchema>;

export const FirstLoginSchema = z.object({
  newPassword: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .max(128, 'Mot de passe trop long')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
    .regex(/\d/, 'Le mot de passe doit contenir au moins un chiffre'),
  confirmPassword: z.string().min(1, 'Confirmation du mot de passe requise'),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'Vous devez accepter les conditions d\'utilisation' }),
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

export type FirstLoginInput = z.infer<typeof FirstLoginSchema>;
