import { z } from 'zod';

const sanitizeString = z.string().trim();

const teacherStatusEnum = z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED', 'ARCHIVED', 'ON_LEAVE', 'CONTRACT_ENDED']);
const teacherGenderEnum = z.enum(['M', 'F', 'OTHER', 'UNKNOWN']);
const employmentTypeEnum = z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'VOLUNTEER', 'INTERN']);
const contractTypeEnum = z.enum(['CDI', 'CDD', 'VACATAIRE', 'CONSULTANT', 'STAGE']);
const gradeEnum = z.enum(['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3', 'D1', 'D2', 'D3']);
const specialityEnum = z.enum(['MATHEMATIQUES', 'PHYSIQUE', 'CHIMIE', 'BIOLOGIE', 'FRANCAIS', 'ANGLAIS', 'HISTOIRE', 'GEOGRAPHIE', 'PHILOSOPHIE', 'INFORMATIQUE', 'EDUCATION_PHYSIQUE', 'ARTS', 'MUSIQUE', 'TECHNOLOGIE', 'ECONOMIE', 'DROIT', 'AUTRE']);
const leaveTypeEnum = z.enum(['MALADIE', 'MATERNITE', 'PATERNITE', 'ANNUEL', 'EXCEPTIONNEL', 'SANS_SOLDE', 'FORMATION']);
const leaveStatusEnum = z.enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED']);
const evaluationTypeEnum = z.enum(['PEDAGOGIQUE', 'ADMINISTRATIVE', 'ANNUELLE', 'PROBATION']);
const timelineEventTypeEnum = z.enum(['CREATION', 'ASSIGNMENT', 'SCHEDULE_CHANGE', 'CONTRACT_UPDATE', 'LEAVE', 'EVALUATION', 'PROMOTION', 'TRANSFER', 'MEDICAL', 'DOCUMENT', 'PHOTO', 'OTHER']);

export const CreateTeacherSchema = z.object({
  firstName: sanitizeString.min(1, 'Prénom requis').max(100),
  lastName: sanitizeString.min(1, 'Nom requis').max(100),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  phone: z.string().regex(/^\+?[\d\s-]{8,15}$/, 'Téléphone invalide').optional().or(z.literal('')),
  dateOfBirth: z.string().optional().or(z.literal('')),
  placeOfBirth: sanitizeString.max(100).optional().or(z.literal('')),
  gender: teacherGenderEnum.optional(),
  address: sanitizeString.max(500).optional().or(z.literal('')),
  nationality: sanitizeString.max(50).optional().or(z.literal('')),
  employmentType: employmentTypeEnum,
  contractType: contractTypeEnum,
  grade: gradeEnum.optional(),
  speciality: specialityEnum.optional(),
  departmentId: z.string().uuid().optional().nullable(),
  hireDate: z.string().optional().or(z.literal('')),
  contractStartDate: z.string().optional().or(z.literal('')),
  contractEndDate: z.string().optional().or(z.literal('')),
  salary: z.number().min(0).optional(),
  hourlyRate: z.number().min(0).optional(),
  maxWeeklyHours: z.number().min(1).max(80).optional(),
  emergencyContactName: sanitizeString.max(100).optional().or(z.literal('')),
  emergencyContactPhone: z.string().regex(/^\+?[\d\s-]{8,15}$/).optional().or(z.literal('')),
  emergencyContactRelation: sanitizeString.max(50).optional().or(z.literal('')),
});

export type CreateTeacherInput = z.infer<typeof CreateTeacherSchema>;

export const UpdateTeacherSchema = z.object({
  firstName: sanitizeString.min(1).max(100).optional(),
  lastName: sanitizeString.min(1).max(100).optional(),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  phone: z.string().regex(/^\+?[\d\s-]{8,15}$/).optional().or(z.literal('')),
  dateOfBirth: z.string().optional().or(z.literal('')),
  placeOfBirth: sanitizeString.max(100).optional().or(z.literal('')),
  gender: teacherGenderEnum.optional(),
  address: sanitizeString.max(500).optional().or(z.literal('')),
  nationality: sanitizeString.max(50).optional(),
  employmentType: employmentTypeEnum.optional(),
  contractType: contractTypeEnum.optional(),
  grade: gradeEnum.optional(),
  speciality: specialityEnum.optional(),
  departmentId: z.string().uuid().optional().nullable(),
  salary: z.number().min(0).optional(),
  hourlyRate: z.number().min(0).optional(),
  maxWeeklyHours: z.number().min(1).max(80).optional(),
  status: teacherStatusEnum.optional(),
});

export type UpdateTeacherInput = z.infer<typeof UpdateTeacherSchema>;

export const ArchiveTeacherSchema = z.object({
  teacherId: z.string().uuid('ID invalide'),
  reason: sanitizeString.max(500).optional(),
});

export type ArchiveTeacherInput = z.infer<typeof ArchiveTeacherSchema>;

export const RestoreTeacherSchema = z.object({
  teacherId: z.string().uuid('ID invalide'),
});

export type RestoreTeacherInput = z.infer<typeof RestoreTeacherSchema>;

export const DeleteTeacherSchema = z.object({
  teacherId: z.string().uuid('ID invalide'),
  confirmation: z.literal('SUPPRIMER').refine(
    (val) => val === 'SUPPRIMER',
    { message: 'Tapez SUPPRIMER pour confirmer' }
  ),
});

export type DeleteTeacherInput = z.infer<typeof DeleteTeacherSchema>;

export const AssignmentSchema = z.object({
  teacherId: z.string().uuid('ID invalide'),
  classId: z.string().uuid('ID de classe invalide'),
  subjectId: z.string().uuid('ID de matière invalide'),
  academicYearId: z.string().uuid('ID d\'année scolaire invalide'),
  levelId: z.string().uuid().optional().nullable(),
  sectionId: z.string().uuid().optional().nullable(),
  hoursPerWeek: z.number().min(1).max(40),
  startDate: z.string().min(1, 'Date de début requise'),
  endDate: z.string().optional(),
});

export type AssignmentInput = z.infer<typeof AssignmentSchema>;

export const SubjectSchema = z.object({
  name: sanitizeString.min(1, 'Nom requis').max(100),
  code: sanitizeString.min(1, 'Code requis').max(20),
  coefficient: z.number().min(0.5).max(10).default(1),
  maxHoursPerWeek: z.number().min(1).max(40).default(10),
  departmentId: z.string().uuid().optional().nullable(),
  levels: z.array(z.string()).min(1, 'Au moins un niveau requis'),
});

export type SubjectInput = z.infer<typeof SubjectSchema>;

export const ScheduleSchema = z.object({
  teacherId: z.string().uuid('ID invalide'),
  classId: z.string().uuid('ID de classe invalide'),
  subjectId: z.string().uuid('ID de matière invalide'),
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Format HH:MM requis'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'Format HH:MM requis'),
  room: sanitizeString.max(50).optional().or(z.literal('')),
  isRecurring: z.boolean().default(true),
  startDate: z.string().min(1, 'Date de début requise'),
  endDate: z.string().optional(),
});

export type ScheduleInput = z.infer<typeof ScheduleSchema>;

export const AvailabilitySchema = z.object({
  teacherId: z.string().uuid('ID invalide'),
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Format HH:MM requis'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'Format HH:MM requis'),
  isAvailable: z.boolean().default(true),
  reason: sanitizeString.max(200).optional().or(z.literal('')),
  recurring: z.boolean().default(true),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type AvailabilityInput = z.infer<typeof AvailabilitySchema>;

export const ContractSchema = z.object({
  teacherId: z.string().uuid('ID invalide'),
  contractType: contractTypeEnum,
  startDate: z.string().min(1, 'Date de début requise'),
  endDate: z.string().optional(),
  salary: z.number().min(0).optional(),
  hourlyRate: z.number().min(0).optional(),
  maxHoursPerWeek: z.number().min(1).max(80).optional(),
  terms: sanitizeString.min(1, 'Conditions requises').max(2000),
});

export type ContractInput = z.infer<typeof ContractSchema>;

export const LeaveSchema = z.object({
  teacherId: z.string().uuid('ID invalide'),
  leaveType: leaveTypeEnum,
  startDate: z.string().min(1, 'Date de début requise'),
  endDate: z.string().min(1, 'Date de fin requise'),
  reason: sanitizeString.min(1, 'Raison requise').max(1000),
  attachments: z.array(z.string()).optional(),
});

export type LeaveInput = z.infer<typeof LeaveSchema>;

export const PayrollSchema = z.object({
  schoolId: z.string().uuid('ID invalide'),
  month: z.number().min(1).max(12),
  year: z.number().min(2020).max(2030),
});

export type PayrollInput = z.infer<typeof PayrollSchema>;

export const QualificationSchema = z.object({
  teacherId: z.string().uuid('ID invalide'),
  institution: sanitizeString.min(1, 'Institution requise').max(200),
  degree: sanitizeString.min(1, 'Diplôme requis').max(100),
  field: sanitizeString.min(1, 'Domaine requis').max(100),
  graduationYear: z.number().min(1950).max(2030),
  grade: sanitizeString.max(50).optional().or(z.literal('')),
  documentUrl: z.string().url().optional().or(z.literal('')),
});

export type QualificationInput = z.infer<typeof QualificationSchema>;

export const CertificationSchema = z.object({
  teacherId: z.string().uuid('ID invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(200),
  issuingOrganization: sanitizeString.min(1, 'Organisme requis').max(200),
  issueDate: z.string().min(1, 'Date d\'émission requise'),
  expiryDate: z.string().optional(),
  certificateNumber: sanitizeString.max(100).optional().or(z.literal('')),
  documentUrl: z.string().url().optional().or(z.literal('')),
});

export type CertificationInput = z.infer<typeof CertificationSchema>;

export const EvaluationSchema = z.object({
  teacherId: z.string().uuid('ID invalide'),
  evaluationType: evaluationTypeEnum,
  period: sanitizeString.min(1, 'Période requise').max(100),
  score: z.number().min(0).max(20).optional(),
  maxScore: z.number().min(1).max(20).default(20),
  criteria: z.array(z.object({
    name: sanitizeString.min(1),
    score: z.number().min(0),
    maxScore: z.number().min(1),
    comment: sanitizeString.max(500).optional(),
  })).min(1, 'Au moins un critère requis'),
  strengths: z.array(sanitizeString.max(200)).optional(),
  improvements: z.array(sanitizeString.max(200)).optional(),
  overallComment: sanitizeString.max(2000).optional().or(z.literal('')),
  nextReviewDate: z.string().optional(),
});

export type EvaluationInput = z.infer<typeof EvaluationSchema>;

export const TeacherMedicalSchema = z.object({
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'UNKNOWN']).optional(),
  height: z.number().min(0).max(300).optional(),
  weight: z.number().min(0).max(500).optional(),
  allergies: z.array(z.string()).optional(),
  medications: z.array(z.string()).optional(),
  conditions: z.array(z.string()).optional(),
  doctorName: sanitizeString.max(100).optional().or(z.literal('')),
  doctorPhone: z.string().regex(/^\+?[\d\s-]{8,15}$/).optional().or(z.literal('')),
  insuranceProvider: sanitizeString.max(100).optional().or(z.literal('')),
  insuranceNumber: sanitizeString.max(50).optional().or(z.literal('')),
  notes: sanitizeString.max(1000).optional().or(z.literal('')),
});

export type TeacherMedicalInput = z.infer<typeof TeacherMedicalSchema>;

export const EmergencyContactSchema = z.object({
  name: sanitizeString.min(1, 'Nom requis').max(100),
  phone: z.string().regex(/^\+?[\d\s-]{8,15}$/, 'Téléphone invalide'),
  relationship: sanitizeString.min(1, 'Relation requise').max(50),
  address: sanitizeString.max(500).optional().or(z.literal('')),
  isPrimary: z.boolean().default(true),
});

export type EmergencyContactInput = z.infer<typeof EmergencyContactSchema>;

export const TeacherImportSchema = z.object({
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

export type TeacherImportInput = z.infer<typeof TeacherImportSchema>;

export const TeacherExportSchema = z.object({
  format: z.enum(['PDF', 'EXCEL', 'CSV', 'JSON']),
  filters: z.record(z.string(), z.unknown()).optional(),
  includePhoto: z.boolean().default(false),
  selectedIds: z.array(z.string().uuid()).optional(),
});

export type TeacherExportInput = z.infer<typeof TeacherExportSchema>;

export const TeacherFiltersSchema = z.object({
  search: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED', 'ARCHIVED', 'ON_LEAVE', 'CONTRACT_ENDED', 'ALL']).optional().default('ALL'),
  gender: z.enum(['M', 'F', 'OTHER', 'UNKNOWN', 'ALL']).optional().default('ALL'),
  employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'VOLUNTEER', 'INTERN', 'ALL']).optional().default('ALL'),
  contractType: z.enum(['CDI', 'CDD', 'VACATAIRE', 'CONSULTANT', 'STAGE', 'ALL']).optional().default('ALL'),
  departmentId: z.string().uuid().optional(),
  grade: gradeEnum.optional(),
  speciality: specialityEnum.optional(),
  hireDateFrom: z.string().optional(),
  hireDateTo: z.string().optional(),
  hasContract: z.boolean().optional(),
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(20),
  sortBy: z.enum(['firstName', 'lastName', 'matricule', 'hireDate', 'createdAt']).optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export type TeacherFiltersInput = z.infer<typeof TeacherFiltersSchema>;

export const TeacherSearchSchema = z.object({
  query: z.string().min(2, 'Requête trop courte').max(200),
  limit: z.number().min(1).max(50).optional().default(20),
});

export type TeacherSearchInput = z.infer<typeof TeacherSearchSchema>;

export const TeacherStatisticsSchema = z.object({
  schoolId: z.string().uuid('ID invalide'),
  academicYearId: z.string().uuid().optional(),
  departmentId: z.string().uuid().optional(),
});

export type TeacherStatisticsInput = z.infer<typeof TeacherStatisticsSchema>;

export const TeacherTimelineSchema = z.object({
  teacherId: z.string().uuid('ID invalide'),
  type: timelineEventTypeEnum,
  description: sanitizeString.min(1, 'Description requise').max(500),
  details: z.record(z.string(), z.unknown()).optional(),
});

export type TeacherTimelineInput = z.infer<typeof TeacherTimelineSchema>;
