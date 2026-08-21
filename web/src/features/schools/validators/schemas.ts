import { z } from 'zod';

const sanitizeString = z.string().trim().max(255);

export const CreateSchoolSchema = z.object({
  name: sanitizeString
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(200, 'Le nom ne doit pas dépasser 200 caractères'),
  email: z
    .string()
    .min(1, 'Email requis')
    .email('Format email invalide')
    .max(255, 'Email trop long'),
  phone: z
    .string()
    .regex(/^\+?[\d\s-]{8,15}$/, 'Numéro de téléphone invalide')
    .optional()
    .or(z.literal('')),
  address: sanitizeString.max(500).optional().or(z.literal('')),
  city: sanitizeString.max(100).optional().or(z.literal('')),
  region: sanitizeString.max(100).optional().or(z.literal('')),
  country: sanitizeString.max(100).optional().default("Côte d'Ivoire"),
  website: z.string().url('URL invalide').optional().or(z.literal('')),
  sigle: sanitizeString.max(20).optional().or(z.literal('')),
  slogan: sanitizeString.max(200).optional().or(z.literal('')),
  description: z.string().max(2000).optional().or(z.literal('')),
  plan: z.enum(['FREE', 'STARTER', 'PRO', 'ENTERPRISE']).optional().default('FREE'),
});

export type CreateSchoolInput = z.infer<typeof CreateSchoolSchema>;

export const UpdateSchoolSchema = z.object({
  name: sanitizeString.min(2).max(200).optional(),
  email: z.string().email('Format email invalide').optional(),
  phone: z.string().regex(/^\+?[\d\s-]{8,15}$/, 'Numéro de téléphone invalide').optional().or(z.literal('')),
  address: sanitizeString.max(500).optional().or(z.literal('')),
  city: sanitizeString.max(100).optional().or(z.literal('')),
  region: sanitizeString.max(100).optional().or(z.literal('')),
  country: sanitizeString.max(100).optional(),
  website: z.string().url('URL invalide').optional().or(z.literal('')),
  sigle: sanitizeString.max(20).optional().or(z.literal('')),
  slogan: sanitizeString.max(200).optional().or(z.literal('')),
  description: z.string().max(2000).optional().or(z.literal('')),
  latitude: z.number().min(-90).max(90).optional().nullable(),
  longitude: z.number().min(-180).max(180).optional().nullable(),
  checkinRadius: z.number().min(10).max(10000).optional(),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Couleur invalide').optional().or(z.literal('')),
  secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Couleur invalide').optional().or(z.literal('')),
  accentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Couleur invalide').optional().or(z.literal('')),
}).refine(
  (data) => Object.keys(data).some((key) => key !== 'name' || data.name !== undefined),
  { message: 'Au moins un champ doit être fourni' }
);

export type UpdateSchoolInput = z.infer<typeof UpdateSchoolSchema>;

export const SchoolSettingsSchema = z.object({
  language: z.enum(['fr', 'en']).default('fr'),
  timezone: z.string().min(1).default('Africa/Abidjan'),
  currency: z.enum(['XOF', 'XAF', 'EUR', 'USD']).default('XOF'),
  dateFormat: z.enum(['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD']).default('DD/MM/YYYY'),
  gradingSystem: z.enum(['20', '100', 'PERCENTAGE']).default('20'),
  passingGrade: z.number().min(0).max(100).default(10),
  academicYear: z.string().min(1).default('2025-2026'),
  checkinRadius: z.number().min(10).max(10000).default(100),
  notifications: z.record(z.string(), z.unknown()).optional().default({}),
  paymentSettings: z.record(z.string(), z.unknown()).optional().default({}),
  academicSettings: z.record(z.string(), z.unknown()).optional().default({}),
});

export type SchoolSettingsInput = z.infer<typeof SchoolSettingsSchema>;

export const UploadLogoSchema = z.object({
  file: z.custom<File>()
    .refine((f) => f instanceof File, 'Fichier requis')
    .refine((f) => f instanceof File && f.size <= 5 * 1024 * 1024, 'Le fichier ne doit pas dépasser 5MB')
    .refine(
      (f) => f instanceof File && ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'].includes(f.type),
      'Format non supporté. Utilisez PNG, JPEG, WebP ou SVG'
    ),
  type: z.enum(['logo', 'logo_icon', 'logo_favicon', 'logo_dark']).default('logo'),
});

export type UploadLogoInput = z.infer<typeof UploadLogoSchema>;

export const ArchiveSchoolSchema = z.object({
  schoolId: z.string().uuid('ID d\'établissement invalide'),
  reason: z.string().max(500).optional(),
});

export type ArchiveSchoolInput = z.infer<typeof ArchiveSchoolSchema>;

export const RestoreSchoolSchema = z.object({
  schoolId: z.string().uuid('ID d\'établissement invalide'),
});

export type RestoreSchoolInput = z.infer<typeof RestoreSchoolSchema>;

export const DeleteSchoolSchema = z.object({
  schoolId: z.string().uuid('ID d\'établissement invalide'),
  confirmation: z.literal('SUPPRIMER').refine(
    (val) => val === 'SUPPRIMER',
    { message: 'Tapez SUPPRIMER pour confirmer' }
  ),
});

export type DeleteSchoolInput = z.infer<typeof DeleteSchoolSchema>;

export const SlugSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
});

export type SlugInput = z.infer<typeof SlugSchema>;

export const SchoolFiltersSchema = z.object({
  search: z.string().optional(),
  status: z.enum(['ACTIVE', 'SUSPENDED', 'ARCHIVED', 'PENDING', 'ALL']).optional().default('ALL'),
  plan: z.enum(['FREE', 'STARTER', 'PRO', 'ENTERPRISE', 'ALL']).optional().default('ALL'),
  city: z.string().optional(),
  region: z.string().optional(),
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(20),
  sortBy: z.enum(['name', 'created_at', 'updated_at']).optional().default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export type SchoolFiltersInput = z.infer<typeof SchoolFiltersSchema>;
