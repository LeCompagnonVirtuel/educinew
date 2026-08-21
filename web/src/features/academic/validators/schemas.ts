import { z } from 'zod';

const sanitizeString = z.string().trim();

const dayOfWeekEnum = z.enum(['0', '1', '2', '3', '4', '5', '6']);
const educationCycleEnum = z.enum(['MATERNELLE', 'PRIMAIRE', 'COLLEGE', 'LYCEE', 'SUPERIEUR']);
const roomTypeEnum = z.enum(['NORMAL', 'LABORATORY', 'COMPUTER', 'AMPHITHEATER', 'WORKSHOP', 'LIBRARY']);
const roomStatusEnum = z.enum(['AVAILABLE', 'OCCUPIED', 'MAINTENANCE', 'ARCHIVED']);
const classStatusEnum = z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED']);
const academicYearStatusEnum = z.enum(['DRAFT', 'ACTIVE', 'COMPLETED', 'ARCHIVED']);
const eventTypeEnum = z.enum(['TRIMESTER', 'SEMESTER', 'VACATION', 'EXAM', 'COUNCIL', 'HOLIDAY', 'MEETING', 'OTHER']);

export const CreateAcademicYearSchema = z.object({
  name: sanitizeString.min(1, 'Nom requis').max(100),
  startDate: z.string().min(1, 'Date de début requise'),
  endDate: z.string().min(1, 'Date de fin requise'),
  termsCount: z.number().min(1).max(4).default(3),
});

export const CreateTermSchema = z.object({
  academicYearId: z.string().uuid('ID invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  order: z.number().min(1).max(4),
  startDate: z.string().min(1, 'Date de début requise'),
  endDate: z.string().min(1, 'Date de fin requise'),
});

export const CreateLevelSchema = z.object({
  name: sanitizeString.min(1, 'Nom requis').max(100),
  code: sanitizeString.min(1, 'Code requis').max(20),
  order: z.number().min(0),
  educationCycle: educationCycleEnum,
  sections: z.array(z.string()).optional(),
});

export const UpdateLevelSchema = z.object({
  name: sanitizeString.min(1).max(100).optional(),
  code: sanitizeString.min(1).max(20).optional(),
  order: z.number().min(0).optional(),
  educationCycle: educationCycleEnum.optional(),
});

export const CreateSectionSchema = z.object({
  name: sanitizeString.min(1, 'Nom requis').max(100),
  code: sanitizeString.min(1, 'Code requis').max(20),
  levelId: z.string().uuid().optional().nullable(),
});

export const UpdateSectionSchema = z.object({
  name: sanitizeString.min(1).max(100).optional(),
  code: sanitizeString.min(1).max(20).optional(),
  levelId: z.string().uuid().optional().nullable(),
});

export const CreateStreamSchema = z.object({
  name: sanitizeString.min(1, 'Nom requis').max(100),
  code: sanitizeString.min(1, 'Code requis').max(20),
  levelId: z.string().uuid().optional().nullable(),
  description: sanitizeString.max(500).optional(),
});

export const UpdateStreamSchema = z.object({
  name: sanitizeString.min(1).max(100).optional(),
  code: sanitizeString.min(1).max(20).optional(),
  levelId: z.string().uuid().optional().nullable(),
  description: sanitizeString.max(500).optional(),
});

export const CreateDepartmentSchema = z.object({
  name: sanitizeString.min(1, 'Nom requis').max(100),
  code: sanitizeString.min(1, 'Code requis').max(20),
  headTeacherId: z.string().uuid().optional().nullable(),
});

export const UpdateDepartmentSchema = z.object({
  name: sanitizeString.min(1).max(100).optional(),
  code: sanitizeString.min(1).max(20).optional(),
  headTeacherId: z.string().uuid().optional().nullable(),
});

export const CreateSubjectSchema = z.object({
  name: sanitizeString.min(1, 'Nom requis').max(100),
  code: sanitizeString.min(1, 'Code requis').max(20),
  coefficient: z.number().min(0.5).max(10).default(1),
  maxHoursPerWeek: z.number().min(1).max(40).default(10),
  departmentId: z.string().uuid().optional().nullable(),
  color: sanitizeString.max(7).optional(),
  levels: z.array(z.string()).min(1, 'Au moins un niveau requis'),
});

export const UpdateSubjectSchema = z.object({
  name: sanitizeString.min(1).max(100).optional(),
  code: sanitizeString.min(1).max(20).optional(),
  coefficient: z.number().min(0.5).max(10).optional(),
  maxHoursPerWeek: z.number().min(1).max(40).optional(),
  departmentId: z.string().uuid().optional().nullable(),
  color: sanitizeString.max(7).optional(),
  levels: z.array(z.string()).optional(),
});

export const CreateRoomSchema = z.object({
  name: sanitizeString.min(1, 'Nom requis').max(100),
  code: sanitizeString.min(1, 'Code requis').max(20),
  capacity: z.number().min(1).max(500),
  roomType: roomTypeEnum,
  floor: z.number().min(0).max(20).optional(),
  building: sanitizeString.max(50).optional(),
  hasProjector: z.boolean().default(false),
  hasWhiteboard: z.boolean().default(true),
  hasComputer: z.boolean().default(false),
  hasInternet: z.boolean().default(false),
});

export const UpdateRoomSchema = z.object({
  name: sanitizeString.min(1).max(100).optional(),
  code: sanitizeString.min(1).max(20).optional(),
  capacity: z.number().min(1).max(500).optional(),
  roomType: roomTypeEnum.optional(),
  floor: z.number().min(0).max(20).optional(),
  building: sanitizeString.max(50).optional(),
  hasProjector: z.boolean().optional(),
  hasWhiteboard: z.boolean().optional(),
  hasComputer: z.boolean().optional(),
  hasInternet: z.boolean().optional(),
  status: roomStatusEnum.optional(),
});

export const CreateClassSchema = z.object({
  name: sanitizeString.min(1, 'Nom requis').max(100),
  levelId: z.string().uuid('ID de niveau invalide'),
  sectionId: z.string().uuid().optional().nullable(),
  streamId: z.string().uuid().optional().nullable(),
  capacity: z.number().min(1).max(500).default(40),
  roomId: z.string().uuid().optional().nullable(),
  mainTeacherId: z.string().uuid().optional().nullable(),
  color: sanitizeString.max(7).optional(),
  academicYearId: z.string().uuid('ID d\'année scolaire invalide'),
});

export const UpdateClassSchema = z.object({
  name: sanitizeString.min(1).max(100).optional(),
  levelId: z.string().uuid().optional(),
  sectionId: z.string().uuid().optional().nullable(),
  streamId: z.string().uuid().optional().nullable(),
  capacity: z.number().min(1).max(500).optional(),
  roomId: z.string().uuid().optional().nullable(),
  mainTeacherId: z.string().uuid().optional().nullable(),
  color: sanitizeString.max(7).optional(),
  status: classStatusEnum.optional(),
});

export const CreateAssignmentSchema = z.object({
  teacherId: z.string().uuid('ID enseignant invalide'),
  classId: z.string().uuid('ID de classe invalide'),
  subjectId: z.string().uuid('ID de matière invalide'),
  academicYearId: z.string().uuid('ID année scolaire invalide'),
  termId: z.string().uuid().optional().nullable(),
  hoursPerWeek: z.number().min(1).max(30),
  startDate: z.string().min(1, 'Date de début requise'),
  endDate: z.string().optional(),
});

export const CreateScheduleSlotSchema = z.object({
  classId: z.string().uuid('ID de classe invalide'),
  subjectId: z.string().uuid('ID de matière invalide'),
  teacherId: z.string().uuid('ID enseignant invalide'),
  roomId: z.string().uuid().optional().nullable(),
  academicYearId: z.string().uuid('ID année scolaire invalide'),
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Format HH:MM requis'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'Format HH:MM requis'),
});

export const CreateEventSchema = z.object({
  title: sanitizeString.min(1, 'Titre requis').max(200),
  description: sanitizeString.max(2000).optional(),
  eventType: eventTypeEnum,
  startDate: z.string().min(1, 'Date de début requise'),
  endDate: z.string().min(1, 'Date de fin requise'),
  academicYearId: z.string().uuid('ID année scolaire invalide'),
  isRecurring: z.boolean().default(false),
});

export const AcademicFiltersSchema = z.object({
  search: z.string().optional(),
  levelId: z.string().uuid().optional(),
  sectionId: z.string().uuid().optional(),
  streamId: z.string().uuid().optional(),
  departmentId: z.string().uuid().optional(),
  academicYearId: z.string().uuid().optional(),
  status: z.string().optional(),
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(20),
  sortBy: z.string().optional().default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const AcademicSearchSchema = z.object({
  query: z.string().min(2, 'Requête trop courte').max(200),
  types: z.array(z.enum(['CLASS', 'ROOM', 'TEACHER', 'SUBJECT', 'DEPARTMENT', 'SLOT'])).optional(),
  limit: z.number().min(1).max(50).optional().default(20),
});

export const ScheduleGeneratorSchema = z.object({
  schoolId: z.string().uuid('ID invalide'),
  academicYearId: z.string().uuid('ID année scolaire invalide'),
  classIds: z.array(z.string().uuid()).min(1, 'Au moins une classe requise'),
  constraints: z.object({
    maxHoursPerDay: z.number().min(1).max(10).optional().default(8),
    maxHoursPerTeacherPerDay: z.number().min(1).max(10).optional().default(8),
    breakSlots: z.array(z.object({
      startTime: z.string().regex(/^\d{2}:\d{2}$/),
      endTime: z.string().regex(/^\d{2}:\d{2}$/),
      name: z.string(),
    })).optional(),
    preferredStartHour: z.number().min(6).max(12).optional().default(7),
    preferredEndHour: z.number().min(14).max(22).optional().default(17),
  }).optional(),
});

export const ImportAcademicSchema = z.object({
  file: z.custom<File>()
    .refine((f) => f instanceof File, 'Fichier requis')
    .refine((f) => f instanceof File && f.size <= 10 * 1024 * 1024, 'Le fichier ne doit pas dépasser 10MB'),
  type: z.enum(['CLASSES', 'SUBJECTS', 'ROOMS', 'ASSIGNMENTS', 'SCHEDULE']),
  dryRun: z.boolean().default(false),
});

export const ExportAcademicSchema = z.object({
  format: z.enum(['PDF', 'EXCEL', 'CSV', 'JSON']),
  type: z.enum(['CLASSES', 'SUBJECTS', 'ROOMS', 'ASSIGNMENTS', 'SCHEDULE', 'STATISTICS']),
  filters: z.record(z.string(), z.unknown()).optional(),
});
