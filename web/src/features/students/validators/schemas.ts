import { z } from 'zod';

const sanitizeString = z.string().trim();

export const CreateStudentSchema = z.object({
  firstName: sanitizeString.min(1, 'Prénom requis').max(100),
  lastName: sanitizeString.min(1, 'Nom requis').max(100),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  phone: z.string().regex(/^\+?[\d\s-]{8,15}$/, 'Téléphone invalide').optional().or(z.literal('')),
  dateOfBirth: z.string().optional().or(z.literal('')),
  placeOfBirth: sanitizeString.max(100).optional().or(z.literal('')),
  gender: z.enum(['M', 'F', 'OTHER', 'UNKNOWN']).optional(),
  address: sanitizeString.max(500).optional().or(z.literal('')),
  nationality: sanitizeString.max(50).optional().default('Ivoirienne'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'UNKNOWN']).optional().default('UNKNOWN'),
  classId: z.string().uuid().optional().nullable(),
  parentId: z.string().uuid().optional().nullable(),
  enrollmentDate: z.string().optional(),
  emergencyContactName: sanitizeString.max(100).optional().or(z.literal('')),
  emergencyContactPhone: z.string().regex(/^\+?[\d\s-]{8,15}$/).optional().or(z.literal('')),
  emergencyContactRelation: sanitizeString.max(50).optional().or(z.literal('')),
  allergies: sanitizeString.max(500).optional().or(z.literal('')),
  series: sanitizeString.max(50).optional().or(z.literal('')),
  level: sanitizeString.max(50).optional().or(z.literal('')),
});

export type CreateStudentInput = z.infer<typeof CreateStudentSchema>;

export const UpdateStudentSchema = z.object({
  firstName: sanitizeString.min(1).max(100).optional(),
  lastName: sanitizeString.min(1).max(100).optional(),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  phone: z.string().regex(/^\+?[\d\s-]{8,15}$/).optional().or(z.literal('')),
  dateOfBirth: z.string().optional().or(z.literal('')),
  placeOfBirth: sanitizeString.max(100).optional().or(z.literal('')),
  gender: z.enum(['M', 'F', 'OTHER', 'UNKNOWN']).optional(),
  address: sanitizeString.max(500).optional().or(z.literal('')),
  nationality: sanitizeString.max(50).optional(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'UNKNOWN']).optional(),
  classId: z.string().uuid().optional().nullable(),
  parentId: z.string().uuid().optional().nullable(),
  emergencyContactName: sanitizeString.max(100).optional().or(z.literal('')),
  emergencyContactPhone: z.string().regex(/^\+?[\d\s-]{8,15}$/).optional().or(z.literal('')),
  emergencyContactRelation: sanitizeString.max(50).optional().or(z.literal('')),
  allergies: sanitizeString.max(500).optional().or(z.literal('')),
  series: sanitizeString.max(50).optional().or(z.literal('')),
  level: sanitizeString.max(50).optional().or(z.literal('')),
  status: z.enum(['ACTIVE', 'INACTIVE', 'TRANSFERRED', 'GRADUATED', 'SUSPENDED', 'ARCHIVED']).optional(),
});

export type UpdateStudentInput = z.infer<typeof UpdateStudentSchema>;

export const ArchiveStudentSchema = z.object({
  studentId: z.string().uuid('ID invalide'),
  reason: sanitizeString.max(500).optional(),
});

export type ArchiveStudentInput = z.infer<typeof ArchiveStudentSchema>;

export const RestoreStudentSchema = z.object({
  studentId: z.string().uuid('ID invalide'),
});

export type RestoreStudentInput = z.infer<typeof RestoreStudentSchema>;

export const DeleteStudentSchema = z.object({
  studentId: z.string().uuid('ID invalide'),
  confirmation: z.literal('SUPPRIMER').refine(
    (val) => val === 'SUPPRIMER',
    { message: 'Tapez SUPPRIMER pour confirmer' }
  ),
});

export type DeleteStudentInput = z.infer<typeof DeleteStudentSchema>;

export const TransferStudentSchema = z.object({
  studentId: z.string().uuid('ID invalide'),
  toSchoolId: z.string().uuid().optional().nullable(),
  reason: sanitizeString.min(1, 'Raison requise').max(500),
  transferDate: z.string().min(1, 'Date requise'),
  notes: sanitizeString.max(1000).optional(),
});

export type TransferStudentInput = z.infer<typeof TransferStudentSchema>;

export const PromotionStudentSchema = z.object({
  studentId: z.string().uuid('ID invalide'),
  toClassId: z.string().uuid('ID de classe invalide'),
  type: z.enum(['PROMOTION', 'REPETITION']),
  average: z.number().min(0).max(20).optional(),
  notes: sanitizeString.max(500).optional(),
});

export type PromotionStudentInput = z.infer<typeof PromotionStudentSchema>;

export const GuardianSchema = z.object({
  name: sanitizeString.min(1, 'Nom requis').max(100),
  relationship: z.enum(['PARENT', 'GUARDIAN', 'TUTOR', 'OTHER']),
  phone: z.string().regex(/^\+?[\d\s-]{8,15}$/, 'Téléphone invalide'),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  address: sanitizeString.max(500).optional().or(z.literal('')),
  occupation: sanitizeString.max(100).optional().or(z.literal('')),
  isEmergency: z.boolean().default(false),
});

export type GuardianInput = z.infer<typeof GuardianSchema>;

export const EmergencyContactSchema = z.object({
  name: sanitizeString.min(1, 'Nom requis').max(100),
  phone: z.string().regex(/^\+?[\d\s-]{8,15}$/, 'Téléphone invalide'),
  relationship: sanitizeString.min(1, 'Relation requise').max(50),
  address: sanitizeString.max(500).optional().or(z.literal('')),
  isPrimary: z.boolean().default(true),
});

export type EmergencyContactInput = z.infer<typeof EmergencyContactSchema>;

export const MedicalSchema = z.object({
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'UNKNOWN']).optional(),
  height: z.number().min(0).max(300).optional(),
  weight: z.number().min(0).max(500).optional(),
  allergies: z.array(z.string()).optional(),
  medications: z.array(z.string()).optional(),
  conditions: z.array(z.string()).optional(),
  disabilities: z.array(z.string()).optional(),
  doctorName: sanitizeString.max(100).optional().or(z.literal('')),
  doctorPhone: z.string().regex(/^\+?[\d\s-]{8,15}$/).optional().or(z.literal('')),
  insuranceProvider: sanitizeString.max(100).optional().or(z.literal('')),
  insuranceNumber: sanitizeString.max(50).optional().or(z.literal('')),
  notes: sanitizeString.max(1000).optional().or(z.literal('')),
});

export type MedicalInput = z.infer<typeof MedicalSchema>;

export const VaccinationSchema = z.object({
  vaccineName: sanitizeString.min(1, 'Nom du vaccin requis').max(100),
  dateGiven: z.string().min(1, 'Date requise'),
  doseNumber: z.number().min(1).max(10).optional(),
  nextDoseDate: z.string().optional(),
  batchNumber: sanitizeString.max(50).optional().or(z.literal('')),
  administeredBy: sanitizeString.max(100).optional().or(z.literal('')),
  location: sanitizeString.max(100).optional().or(z.literal('')),
  notes: sanitizeString.max(500).optional().or(z.literal('')),
});

export type VaccinationInput = z.infer<typeof VaccinationSchema>;

export const PhotoSchema = z.object({
  file: z.custom<File>()
    .refine((f) => f instanceof File, 'Fichier requis')
    .refine((f) => f instanceof File && f.size <= 5 * 1024 * 1024, 'Le fichier ne doit pas dépasser 5MB')
    .refine(
      (f) => f instanceof File && ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(f.type),
      'Format non supporté. Utilisez PNG, JPEG ou WebP'
    ),
  type: z.enum(['PROFILE', 'ID_CARD', 'DOCUMENT', 'MEDICAL']).default('PROFILE'),
});

export type PhotoInput = z.infer<typeof PhotoSchema>;

export const DocumentSchema = z.object({
  name: sanitizeString.min(1, 'Nom requis').max(200),
  type: z.enum(['BIRTH_CERTIFICATE', 'TRANSCRIPT', 'MEDICAL', 'PHOTO', 'ADMINISTRATIVE', 'OTHER']),
  file: z.custom<File>().refine((f) => f instanceof File, 'Fichier requis'),
});

export type DocumentInput = z.infer<typeof DocumentSchema>;

export const QRCodeSchema = z.object({
  studentId: z.string().uuid('ID invalide'),
  type: z.enum(['ATTENDANCE', 'IDENTITY', 'PAYMENT', 'GENERAL']).default('GENERAL'),
});

export type QRCodeInput = z.infer<typeof QRCodeSchema>;

export const StudentCardSchema = z.object({
  studentId: z.string().uuid('ID invalide'),
  includePhoto: z.boolean().default(true),
  includeQRCode: z.boolean().default(true),
  includeBarcode: z.boolean().default(true),
});

export type StudentCardInput = z.infer<typeof StudentCardSchema>;

export const ImportSchema = z.object({
  file: z.custom<File>()
    .refine((f) => f instanceof File, 'Fichier requis')
    .refine((f) => f instanceof File && f.size <= 10 * 1024 * 1024, 'Le fichier ne doit pas dépasser 10MB')
    .refine(
      (f) => f instanceof File && (
        f.type === 'text/csv' ||
        f.type === 'application/vnd.ms-excel' ||
        f.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        f.name.endsWith('.csv') ||
        f.name.endsWith('.xlsx') ||
        f.name.endsWith('.xls')
      ),
      'Format non supporté. Utilisez CSV ou Excel'
    ),
  mapping: z.record(z.string(), z.string()).optional(),
  skipDuplicates: z.boolean().default(true),
  dryRun: z.boolean().default(false),
});

export type ImportInput = z.infer<typeof ImportSchema>;

export const ExportSchema = z.object({
  format: z.enum(['PDF', 'EXCEL', 'CSV', 'JSON']),
  filters: z.record(z.string(), z.unknown()).optional(),
  includePhoto: z.boolean().default(false),
  includeQRCode: z.boolean().default(false),
  selectedIds: z.array(z.string().uuid()).optional(),
});

export type ExportInput = z.infer<typeof ExportSchema>;

export const FiltersSchema = z.object({
  search: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'TRANSFERRED', 'GRADUATED', 'SUSPENDED', 'ARCHIVED', 'ALL']).optional().default('ALL'),
  gender: z.enum(['M', 'F', 'OTHER', 'UNKNOWN', 'ALL']).optional().default('ALL'),
  classId: z.string().uuid().optional(),
  levelId: z.string().uuid().optional(),
  sectionId: z.string().uuid().optional(),
  parentId: z.string().uuid().optional(),
  dateOfBirthFrom: z.string().optional(),
  dateOfBirthTo: z.string().optional(),
  enrollmentDateFrom: z.string().optional(),
  enrollmentDateTo: z.string().optional(),
  hasMedical: z.boolean().optional(),
  hasTransport: z.boolean().optional(),
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(20),
  sortBy: z.enum(['firstName', 'lastName', 'matricule', 'enrollmentDate', 'createdAt']).optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export type FiltersInput = z.infer<typeof FiltersSchema>;

export const SearchSchema = z.object({
  query: z.string().min(2, 'Requête trop courte').max(200),
  limit: z.number().min(1).max(50).optional().default(20),
});

export type SearchInput = z.infer<typeof SearchSchema>;

export const EnrollmentSchema = z.object({
  studentId: z.string().uuid('ID invalide'),
  classId: z.string().uuid('ID de classe invalide'),
  academicYearId: z.string().uuid('ID d\'année scolaire invalide'),
  levelId: z.string().uuid().optional().nullable(),
  sectionId: z.string().uuid().optional().nullable(),
  notes: sanitizeString.max(500).optional(),
});

export type EnrollmentInput = z.infer<typeof EnrollmentSchema>;

export const TimelineSchema = z.object({
  studentId: z.string().uuid('ID invalide'),
  type: z.enum([
    'CREATION', 'CLASS_CHANGE', 'LEVEL_CHANGE', 'PROMOTION',
    'REPETITION', 'TRANSFER', 'PAYMENT', 'ATTENDANCE',
    'SANCTION', 'REWARD', 'MEDICAL', 'DOCUMENT', 'PHOTO', 'OTHER',
  ]),
  description: sanitizeString.min(1, 'Description requise').max(500),
  details: z.record(z.string(), z.unknown()).optional(),
});

export type TimelineInput = z.infer<typeof TimelineSchema>;

export const StatisticsSchema = z.object({
  schoolId: z.string().uuid('ID invalide'),
  academicYearId: z.string().uuid().optional(),
  classId: z.string().uuid().optional(),
  levelId: z.string().uuid().optional(),
});

export type StatisticsInput = z.infer<typeof StatisticsSchema>;
