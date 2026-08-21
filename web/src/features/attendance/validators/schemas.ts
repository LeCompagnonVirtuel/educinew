import { z } from 'zod';

const sanitizeString = z.string().trim();

const attendanceStatusEnum = z.enum([
  'PRESENT',
  'ABSENT',
  'LATE',
  'EXCUSED',
  'JUSTIFIED',
  'PARTIAL',
]);

const attendanceMethodEnum = z.enum([
  'MANUAL',
  'QR',
  'GPS',
  'NFC',
  'FACE',
  'FINGERPRINT',
  'AUTO',
]);

const attendanceReasonEnum = z.enum([
  'MEDICAL',
  'FAMILY',
  'PERSONAL',
  'TRANSPORT',
  'WEATHER',
  'SCHOOL_ACTIVITY',
  'EXAM',
  'OTHER',
]);

const attendancePeriodEnum = z.enum([
  'MORNING',
  'AFTERNOON',
  'FULL_DAY',
  'PERIOD_1',
  'PERIOD_2',
  'PERIOD_3',
  'PERIOD_4',
  'PERIOD_5',
  'PERIOD_6',
  'PERIOD_7',
  'PERIOD_8',
]);

const importTypeEnum = z.enum(['CSV', 'EXCEL', 'JSON']);
const exportFormatEnum = z.enum(['PDF', 'EXCEL', 'CSV', 'JSON']);
const reportTypeEnum = z.enum([
  'DAILY',
  'WEEKLY',
  'MONTHLY',
  'TERM',
  'YEARLY',
  'CUSTOM',
  'STUDENT',
  'CLASS',
  'LEVEL',
]);
const recipientTypeEnum = z.enum(['STUDENT', 'TEACHER', 'PARENT', 'ADMIN']);
const notificationChannelEnum = z.enum(['EMAIL', 'SMS', 'PUSH', 'IN_APP']);
const alertTypeEnum = z.enum([
  'ABSENCE_THRESHOLD',
  'CONSECUTIVE_ABSENCES',
  'LATE_THRESHOLD',
  'JUSTIFICATION_PENDING',
  'SESSION_INCOMPLETE',
]);
const alertSeverityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);
const targetTypeEnum = z.enum(['STUDENT', 'CLASS', 'TEACHER', 'GLOBAL']);
const deviceTypeEnum = z.enum([
  'QR_SCANNER',
  'NFC_READER',
  'FACE_CAMERA',
  'FINGERPRINT',
  'TABLET',
  'PHONE',
]);
const correctionStatusEnum = z.enum([
  'PENDING',
  'APPROVED',
  'REJECTED',
]);

export const CreateAttendanceSchema = z.object({
  studentId: z.string().uuid('ID élève invalide'),
  classId: z.string().uuid('ID classe invalide'),
  academicYearId: z.string().uuid('ID année scolaire invalide'),
  date: z.string().min(1, 'Date requise'),
  status: attendanceStatusEnum,
  method: attendanceMethodEnum.optional(),
  reason: attendanceReasonEnum.optional(),
  reasonNote: sanitizeString.max(500).optional(),
  period: attendancePeriodEnum.optional(),
  checkInTime: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, 'Format HH:MM requis').optional(),
  lateMinutes: z.number().min(0).max(480).optional(),
  notes: sanitizeString.max(1000).optional(),
});

export const UpdateAttendanceSchema = z.object({
  status: attendanceStatusEnum.optional(),
  reason: attendanceReasonEnum.optional(),
  reasonNote: sanitizeString.max(500).optional(),
  checkInTime: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, 'Format HH:MM requis').optional(),
  checkOutTime: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, 'Format HH:MM requis').optional(),
  lateMinutes: z.number().min(0).max(480).optional(),
  notes: sanitizeString.max(1000).optional(),
});

export const CreateTeacherAttendanceSchema = z.object({
  teacherId: z.string().uuid('ID enseignant invalide'),
  date: z.string().min(1, 'Date requise'),
  status: attendanceStatusEnum,
  method: attendanceMethodEnum.optional(),
  reason: attendanceReasonEnum.optional(),
  reasonNote: sanitizeString.max(500).optional(),
  period: attendancePeriodEnum.optional(),
  checkInTime: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, 'Format HH:MM requis').optional(),
  lateMinutes: z.number().min(0).max(480).optional(),
  notes: sanitizeString.max(1000).optional(),
});

export const CreateSessionSchema = z.object({
  classId: z.string().uuid('ID classe invalide'),
  teacherId: z.string().uuid('ID enseignant invalide'),
  subjectId: z.string().uuid().optional().nullable(),
  academicYearId: z.string().uuid('ID année scolaire invalide'),
  date: z.string().min(1, 'Date requise'),
  period: attendancePeriodEnum,
  startTime: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, 'Format HH:MM requis'),
  qrEnabled: z.boolean().default(false),
  gpsEnabled: z.boolean().default(false),
  nfcEnabled: z.boolean().default(false),
  faceEnabled: z.boolean().default(false),
  notes: sanitizeString.max(1000).optional(),
});

export const BulkAttendanceSchema = z.object({
  classId: z.string().uuid('ID classe invalide'),
  academicYearId: z.string().uuid('ID année scolaire invalide'),
  date: z.string().min(1, 'Date requise'),
  period: attendancePeriodEnum,
  records: z.array(z.object({
    studentId: z.string().uuid('ID élève invalide'),
    status: attendanceStatusEnum,
    reason: attendanceReasonEnum.optional(),
    lateMinutes: z.number().min(0).max(480).optional(),
  })).min(1, 'Au moins un enregistrement requis'),
  recordedBy: z.string().uuid('ID enregistreur invalide'),
});

export const AttendanceFiltersSchema = z.object({
  search: z.string().optional(),
  studentId: z.string().uuid().optional(),
  teacherId: z.string().uuid().optional(),
  classId: z.string().uuid().optional(),
  levelId: z.string().uuid().optional(),
  academicYearId: z.string().uuid().optional(),
  date: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  status: attendanceStatusEnum.optional(),
  method: attendanceMethodEnum.optional(),
  period: attendancePeriodEnum.optional(),
  reason: attendanceReasonEnum.optional(),
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(20),
  sortBy: z.string().optional().default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const AttendanceSearchSchema = z.object({
  query: z.string().min(2, 'Requête trop courte').max(200),
  types: z.array(z.enum(['STUDENT', 'TEACHER', 'CLASS', 'SESSION'])).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  status: attendanceStatusEnum.optional(),
  classId: z.string().uuid().optional(),
  limit: z.number().min(1).max(50).optional().default(20),
});

export const CreateJustificationSchema = z.object({
  studentId: z.string().uuid('ID élève invalide'),
  attendanceId: z.string().uuid('ID présence invalide'),
  reason: sanitizeString.min(1, 'Motif requis').max(500),
  description: sanitizeString.min(1, 'Description requise').max(2000),
  documentUrl: z.string().url('URL invalide').optional(),
  startDate: z.string().min(1, 'Date de début requise'),
  endDate: z.string().min(1, 'Date de fin requise'),
});

export const CreateCorrectionSchema = z.object({
  attendanceId: z.string().uuid('ID présence invalide'),
  originalStatus: attendanceStatusEnum,
  newStatus: attendanceStatusEnum,
  reason: sanitizeString.min(1, 'Raison requise').max(500),
});

export const AttendanceReportRequestSchema = z.object({
  reportType: reportTypeEnum,
  startDate: z.string().min(1, 'Date de début requise'),
  endDate: z.string().min(1, 'Date de fin requise'),
  classId: z.string().uuid().optional(),
  levelId: z.string().uuid().optional(),
  studentId: z.string().uuid().optional(),
  format: exportFormatEnum.optional().default('PDF'),
});

export const AttendanceDashboardRequestSchema = z.object({
  date: z.string().optional(),
  classId: z.string().uuid().optional(),
  levelId: z.string().uuid().optional(),
});

export const AttendanceImportRequestSchema = z.object({
  importType: importTypeEnum,
  data: z.array(z.record(z.string(), z.unknown())).min(1, 'Données requises'),
  date: z.string().min(1, 'Date requise'),
  period: attendancePeriodEnum.optional(),
  classId: z.string().uuid().optional(),
});

export const AttendanceExportRequestSchema = z.object({
  format: exportFormatEnum,
  exportType: z.enum([
    'ALL',
    'STUDENTS',
    'TEACHERS',
    'CLASSES',
    'ABSENTS',
    'LATES',
    'SUMMARY',
  ]),
  filters: AttendanceFiltersSchema.optional(),
});

export const AttendanceSettingsSchema = z.object({
  qrEnabled: z.boolean().optional().default(false),
  gpsEnabled: z.boolean().optional().default(false),
  nfcEnabled: z.boolean().optional().default(false),
  faceEnabled: z.boolean().optional().default(false),
  gpsRadius: z.number().min(10).max(1000).optional().default(100),
  qrExpiryMinutes: z.number().min(1).max(60).optional().default(5),
  autoMarkAbsentAfterMinutes: z.number().min(5).max(120).optional().default(30),
  lateThresholdMinutes: z.number().min(1).max(60).optional().default(15),
});

export const AttendancePolicySchema = z.object({
  name: sanitizeString.min(1, 'Nom requis').max(100),
  description: sanitizeString.max(1000).optional(),
  maxAbsencesWithoutJustification: z.number().min(1).max(100),
  maxConsecutiveAbsences: z.number().min(1).max(50),
  lateToleranceMinutes: z.number().min(0).max(60),
  autoExclusionThreshold: z.number().min(1).max(200),
  parentNotificationAfterAbsences: z.number().min(1).max(100),
  adminAlertAfterAbsences: z.number().min(1).max(100),
});

export const QRValidationSchema = z.object({
  code: sanitizeString.min(1, 'Code requis').max(200),
  sessionId: z.string().uuid('ID session invalide'),
});

export const GPSValidationSchema = z.object({
  studentId: z.string().uuid('ID élève invalide'),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  sessionId: z.string().uuid('ID session invalide'),
});

export const FaceValidationSchema = z.object({
  studentId: z.string().uuid('ID élève invalide'),
  photoData: sanitizeString.min(1, 'Données photo requises'),
});

export const NFCValidationSchema = z.object({
  studentId: z.string().uuid('ID élève invalide'),
  nfcTagId: sanitizeString.min(1, 'ID tag NFC requis').max(100),
});

export const SyncValidationSchema = z.object({
  deviceId: sanitizeString.min(1, 'ID appareil requis').max(100),
  records: z.array(z.object({
    studentId: z.string().uuid('ID élève invalide'),
    sessionId: z.string().uuid('ID session invalide'),
    timestamp: z.string().min(1, 'Horodatage requis'),
    method: attendanceMethodEnum,
    data: z.record(z.string(), z.unknown()).optional(),
  })).min(1, 'Au moins un enregistrement requis'),
});

export const AttendanceAlertSchema = z.object({
  alertType: alertTypeEnum,
  severity: alertSeverityEnum,
  title: sanitizeString.min(1, 'Titre requis').max(200),
  message: sanitizeString.min(1, 'Message requis').max(2000),
  targetType: targetTypeEnum,
  targetId: z.string().uuid('ID cible invalide'),
});

export const AttendanceNotificationSchema = z.object({
  notificationType: z.enum([
    'ABSENCE',
    'LATE',
    'JUSTIFICATION_APPROVED',
    'JUSTIFICATION_REJECTED',
    'ALERT',
    'REMINDER',
    'REPORT',
  ]),
  recipientType: recipientTypeEnum,
  recipientId: z.string().uuid('ID destinataire invalide'),
  channel: notificationChannelEnum,
  title: sanitizeString.min(1, 'Titre requis').max(200),
  message: sanitizeString.min(1, 'Message requis').max(2000),
});

export const AttendanceDeviceSchema = z.object({
  name: sanitizeString.min(1, 'Nom requis').max(100),
  type: deviceTypeEnum,
  location: sanitizeString.max(200).optional(),
  isActive: z.boolean().default(true),
});

export const AttendanceLocationSchema = z.object({
  name: sanitizeString.min(1, 'Nom requis').max(100),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  radius: z.number().min(10).max(1000).default(100),
  allowedMethods: z.array(attendanceMethodEnum).min(1, 'Au moins une méthode requise'),
});

export const DailyReportSchema = z.object({
  date: z.string().min(1, 'Date requise'),
  classId: z.string().uuid().optional(),
  format: exportFormatEnum.optional().default('PDF'),
});

export const MonthlyReportSchema = z.object({
  month: z.number().min(1).max(12),
  year: z.number().min(2000).max(2100),
  classId: z.string().uuid().optional(),
  format: exportFormatEnum.optional().default('PDF'),
});

export const AttendanceAnalyticsSchema = z.object({
  academicYearId: z.string().uuid('ID année scolaire invalide'),
  period: z.enum(['TRIMESTER_1', 'TRIMESTER_2', 'TRIMESTER_3', 'SEMESTER_1', 'SEMESTER_2', 'FULL']),
});

export const BulkUpdateSchema = z.object({
  ids: z.array(z.string().uuid('ID invalide')).min(1, 'Au moins un ID requis'),
  status: attendanceStatusEnum,
  reason: sanitizeString.max(500).optional(),
});

export const SessionEndSchema = z.object({
  notes: sanitizeString.max(1000).optional(),
  completedBy: z.string().uuid('ID valideur invalide'),
});

export const AttendanceCorrectionApproveSchema = z.object({
  correctionId: z.string().uuid('ID correction invalide'),
  approved: z.boolean(),
  reviewNote: sanitizeString.max(500).optional(),
});
