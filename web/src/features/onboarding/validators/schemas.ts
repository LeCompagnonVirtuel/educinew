import { z } from 'zod';

const sanitizeString = z.string().trim();

export const GeneralInfoSchema = z.object({
  name: sanitizeString
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(200, 'Le nom ne doit pas dépasser 200 caractères'),
  code: sanitizeString.max(20).optional().or(z.literal('')),
  phone: z
    .string()
    .regex(/^\+?[\d\s-]{8,15}$/, 'Numéro de téléphone invalide')
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .min(1, 'Email requis')
    .email('Format email invalide')
    .max(255, 'Email trop long'),
  address: sanitizeString.max(500).optional().or(z.literal('')),
  city: sanitizeString.max(100).optional().or(z.literal('')),
  region: sanitizeString.max(100).optional().or(z.literal('')),
  country: sanitizeString.max(100).optional().default("Côte d'Ivoire"),
  latitude: z.number().min(-90).max(90).optional().nullable(),
  longitude: z.number().min(-180).max(180).optional().nullable(),
  logoUrl: z.string().url().optional().or(z.literal('')),
  coverPhotoUrl: z.string().url().optional().or(z.literal('')),
});

export type GeneralInfoInput = z.infer<typeof GeneralInfoSchema>;

export const AdminInfoSchema = z.object({
  schoolType: z.enum(['PUBLIC', 'PRIVE', 'CONFESSIONNEL', 'TECHNIQUE', 'UNIVERSITE']),
  foundingDate: z.string().optional().or(z.literal('')),
  languages: z.array(z.string()).min(1, 'Au moins une langue requise').default(['fr']),
  currency: z.enum(['XOF', 'XAF', 'EUR', 'USD']).default('XOF'),
  timezone: z.string().min(1).default('Africa/Abidjan'),
});

export type AdminInfoInput = z.infer<typeof AdminInfoSchema>;

export const AcademicConfigSchema = z.object({
  academicYear: z.string().min(1, 'Année scolaire requise'),
  yearStartDate: z.string().min(1, 'Date de début requise'),
  yearEndDate: z.string().min(1, 'Date de fin requise'),
  termsCount: z.number().min(1).max(6).default(3),
  semestersCount: z.number().min(1).max(4).default(2),
  gradingSystem: z.enum(['FRENCH_20', 'PERCENTAGE', 'LETTER']).default('FRENCH_20'),
  passingGrade: z.number().min(0).max(20).default(10),
  mentionThresholds: z.record(z.string(), z.number()).optional().default({
    'Bien': 14,
    'Très Bien': 16,
    'Excellent': 18,
  }),
  coefficientSystem: z.boolean().default(false),
}).refine(
  (data) => new Date(data.yearStartDate) < new Date(data.yearEndDate),
  { message: 'La date de début doit précéder la date de fin', path: ['yearEndDate'] }
);

export type AcademicConfigInput = z.infer<typeof AcademicConfigSchema>;

export const LevelSchema = z.object({
  name: sanitizeString.min(1, 'Nom du niveau requis').max(100),
  order: z.number().min(0),
  sections: z.array(z.object({
    name: sanitizeString.min(1, 'Nom de la section requis').max(100),
    series: z.array(z.string()).optional(),
    filieres: z.array(z.string()).optional(),
    maxStudents: z.number().min(1).max(60).default(40),
  })).min(1, 'Au moins une section requise'),
});

export const PedagogicStructureSchema = z.object({
  levels: z.array(LevelSchema).min(1, 'Au moins un niveau requis').max(15),
});

export type PedagogicStructureInput = z.infer<typeof PedagogicStructureSchema>;

export const DirectorSchema = z.object({
  firstName: sanitizeString.min(2, 'Prénom requis').max(100),
  lastName: sanitizeString.min(2, 'Nom requis').max(100),
  email: z.string().email('Email invalide'),
  phone: z.string().regex(/^\+?[\d\s-]{8,15}$/, 'Téléphone invalide').optional().or(z.literal('')),
  password: z
    .string()
    .min(8, 'Mot de passe trop court (8 caractères minimum)')
    .max(128, 'Mot de passe trop long')
    .regex(/[A-Z]/, 'Doit contenir au moins une majuscule')
    .regex(/[a-z]/, 'Doit contenir au moins une minuscule')
    .regex(/[0-9]/, 'Doit contenir au moins un chiffre'),
  photoUrl: z.string().url().optional().or(z.literal('')),
});

export type DirectorInput = z.infer<typeof DirectorSchema>;

export const ModulesSchema = z.object({
  payments: z.boolean().default(false),
  transport: z.boolean().default(false),
  library: z.boolean().default(false),
  cafeteria: z.boolean().default(false),
  health: z.boolean().default(false),
  discipline: z.boolean().default(false),
  marketplace: z.boolean().default(false),
  hr: z.boolean().default(false),
  gps: z.boolean().default(false),
  exams: z.boolean().default(true),
  sms: z.boolean().default(false),
  ai: z.boolean().default(false),
});

export type ModulesInput = z.infer<typeof ModulesSchema>;

export const BrandingSchema = z.object({
  logoUrl: z.string().url().optional().or(z.literal('')),
  colorPrimary: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Couleur invalide').default('#1E40AF'),
  colorSecondary: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Couleur invalide').default('#3B82F6'),
  fontPrimary: sanitizeString.max(100).optional().or(z.literal('')),
  faviconUrl: z.string().url().optional().or(z.literal('')),
  shortName: sanitizeString.max(20).optional().or(z.literal('')),
  slogan: sanitizeString.max(200).optional().or(z.literal('')),
});

export type BrandingInput = z.infer<typeof BrandingSchema>;

export const OnboardingDataSchema = z.object({
  generalInfo: GeneralInfoSchema,
  adminInfo: AdminInfoSchema,
  academicConfig: AcademicConfigSchema,
  pedagogicStructure: PedagogicStructureSchema,
  director: DirectorSchema,
  modules: ModulesSchema,
  branding: BrandingSchema,
});

export type OnboardingDataInput = z.infer<typeof OnboardingDataSchema>;

export const CompleteOnboardingSchema = z.object({
  onboardingId: z.string().uuid('ID d\'onboarding invalide'),
  confirmation: z.literal('CONFIRMER').refine(
    (val) => val === 'CONFIRMER',
    { message: 'Tapez CONFIRMER pour valider' }
  ),
});

export type CompleteOnboardingInput = z.infer<typeof CompleteOnboardingSchema>;

export const OnboardingStepSchema = z.object({
  step: z.enum([
    'general_info', 'admin_info', 'academic_config',
    'pedagogic_structure', 'director_creation', 'modules',
    'branding', 'validation',
  ]),
});

export type OnboardingStepInput = z.infer<typeof OnboardingStepSchema>;

export const SaveDraftSchema = z.object({
  step: z.enum([
    'general_info', 'admin_info', 'academic_config',
    'pedagogic_structure', 'director_creation', 'modules',
    'branding', 'validation',
  ]),
  data: z.record(z.string(), z.unknown()),
});

export type SaveDraftInput = z.infer<typeof SaveDraftSchema>;

export const UploadLogoSchema = z.object({
  file: z.custom<File>()
    .refine((f) => f instanceof File, 'Fichier requis')
    .refine((f) => f instanceof File && f.size <= 5 * 1024 * 1024, 'Le fichier ne doit pas dépasser 5MB')
    .refine(
      (f) => f instanceof File && ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'].includes(f.type),
      'Format non supporté. Utilisez PNG, JPEG, WebP ou SVG'
    ),
});

export type UploadLogoInput = z.infer<typeof UploadLogoSchema>;

export const OnboardingFiltersSchema = z.object({
  userId: z.string().uuid().optional(),
  status: z.enum(['DRAFT', 'IN_PROGRESS', 'COMPLETED', 'FAILED']).optional(),
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(20),
});

export type OnboardingFiltersInput = z.infer<typeof OnboardingFiltersSchema>;
