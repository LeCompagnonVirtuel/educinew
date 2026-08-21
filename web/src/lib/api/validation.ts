import { z } from 'zod';

const MATRICULE_REGEX = /^\d{8}[A-Z]$/;

export const gradeSchema = z.object({
  student_id: z.string().uuid('ID élève invalide'),
  subject_id: z.string().uuid('ID matière invalide'),
  score: z.number().min(0, 'La note ne peut pas être négative'),
  max_score: z.number().min(1).max(100).default(20),
  grade_type: z.enum(['DEVOIR', 'COMPOSITION', 'EXAMEN']).default('DEVOIR'),
  coefficient: z.number().min(0.5).max(10).default(1),
  term: z.string().max(50).optional(),
  period_id: z.string().uuid().nullable().optional(),
  academic_year_id: z.string().uuid().nullable().optional(),
  teacher_id: z.string().uuid().nullable().optional(),
  comment: z.string().max(500).nullable().optional(),
  school_id: z.string().uuid().nullable().optional(),
});

export const bulkGradeSchema = z.array(gradeSchema).min(1, 'Au moins une note requise').max(500, 'Maximum 500 notes par import');

export const attendanceSchema = z.object({
  student_id: z.string().uuid('ID élève invalide'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format date invalide (YYYY-MM-DD)'),
  status: z.enum(['PRESENT', 'ABSENT', 'LATE']),
  remark: z.string().max(200).nullable().optional(),
  school_id: z.string().uuid().nullable().optional(),
});

export const bulkAttendanceSchema = z.array(attendanceSchema).min(1).max(500);

export const paymentSchema = z.object({
  student_id: z.string().uuid('ID élève invalide'),
  amount: z.number().positive('Le montant doit être positif').max(10_000_000, 'Montant maximum dépassé'),
  type: z.enum(['SCOLARITE', 'INSCRIPTION', 'CANTINE', 'TRANSPORT', 'UNIFORME', 'AUTRE']),
  method: z.enum(['ESPECES', 'MOBILE_MONEY', 'VIREMENT', 'CHEQUE', 'CARTE']).default('ESPECES'),
  status: z.enum(['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED']).default('PENDING'),
  reference: z.string().max(100).nullable().optional(),
  invoice_id: z.string().uuid().nullable().optional(),
  notes: z.string().max(500).nullable().optional(),
  school_id: z.string().uuid().nullable().optional(),
});

export const studentSchema = z.object({
  first_name: z.string().min(1, 'Prénom requis').max(100),
  last_name: z.string().min(1, 'Nom requis').max(100),
  matricule: z.string().regex(MATRICULE_REGEX, 'Format invalide. Exemple: 16137807D (8 chiffres + 1 lettre majuscule)').max(9).nullable().optional(),
  date_of_birth: z.string().nullable().optional(),
  gender: z.enum(['M', 'F']).nullable().optional(),
  class_id: z.string().uuid().nullable().optional(),
  user_id: z.string().uuid().nullable().optional(),
  parent_id: z.string().uuid().nullable().optional(),
  phone: z.string().max(20).nullable().optional(),
  address: z.string().max(200).nullable().optional(),
  photo_url: z.string().url().nullable().optional(),
  emergency_contact: z.string().max(200).nullable().optional(),
  medical_info: z.string().max(500).nullable().optional(),
  status: z.string().max(20).nullable().optional(),
  school_id: z.string().uuid().nullable().optional(),
});

export const staffSchema = z.object({
  name: z.string().min(1, 'Nom requis').max(100),
  email: z.string().email('Email invalide'),
  position: z.string().min(1, 'Poste requis').max(100),
  department: z.string().max(100).nullable().optional(),
  phone: z.string().max(20).nullable().optional(),
  contract_type: z.string().max(50).nullable().optional(),
  hire_date: z.string().nullable().optional(),
  school_id: z.string().uuid().nullable().optional(),
});

export const staffInviteSchema = z.object({
  email: z.string().email('Email invalide'),
  staffRole: z.string().min(1, 'Rôle requis'),
  position: z.string().min(1, 'Poste requis'),
  department: z.string().max(100).nullable().optional(),
  school_id: z.string().uuid().nullable().optional(),
});

export const staffAttendanceSchema = z.object({
  staffId: z.string().uuid('ID personnel invalide'),
  action: z.enum(['ARRIVAL', 'DEPARTURE', 'BREAK_START', 'BREAK_END']),
  latitude: z.number().min(-90).max(90).nullable().optional(),
  longitude: z.number().min(-180).max(180).nullable().optional(),
  notes: z.string().max(200).nullable().optional(),
});

export const visitorSchema = z.object({
  visitor_name: z.string().min(1, 'Nom du visiteur requis').max(100),
  visitor_phone: z.string().max(20).nullable().optional(),
  visitor_id_type: z.string().max(50).nullable().optional(),
  visitor_id_number: z.string().max(50).nullable().optional(),
  purpose: z.string().min(1, 'Motif requis').max(200),
  person_to_visit: z.string().min(1, 'Personne à visiter requise').max(100),
  person_role: z.string().max(50).nullable().optional(),
  school_id: z.string().uuid().nullable().optional(),
});

export const qrGenerateSchema = z.object({
  type: z.enum(['student', 'teacher', 'class']),
  user_id: z.string().uuid().nullable().optional(),
  student_id: z.string().uuid().nullable().optional(),
  teacher_id: z.string().uuid().nullable().optional(),
  class_id: z.string().uuid().nullable().optional(),
  expires_hours: z.number().min(1).max(72).default(8),
});

export const qrBatchSchema = z.object({
  type: z.enum(['students', 'teachers']),
  class_id: z.string().uuid().nullable().optional(),
  expires_hours: z.number().min(1).max(72).default(8),
});

export const qrScanSchema = z.object({
  qr_code: z.string().min(1, 'QR code requis').max(2000),
  scan_type: z.enum(['ARRIVAL', 'DEPARTURE', 'LATE', 'PERMISSION', 'EXCEPTIONAL']).default('ARRIVAL'),
  device_info: z.string().max(200).nullable().optional(),
  latitude: z.number().min(-90).max(90).nullable().optional(),
  longitude: z.number().min(-180).max(180).nullable().optional(),
  operator_name: z.string().max(100).nullable().optional(),
});

export const gatewayConfigSchema = z.object({
  gateway: z.string().min(1, 'Gateway requis'),
  config: z.record(z.string(), z.string()).optional(),
  isActive: z.boolean().default(false),
  defaultCurrency: z.string().length(3).default('XOF'),
  testMode: z.boolean().default(true),
  returnUrl: z.string().url().nullable().optional(),
  cancelUrl: z.string().url().nullable().optional(),
});

export const gatewayTestSchema = z.object({
  gatewayId: z.string().uuid('ID gateway invalide'),
});

export function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: string; details?: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) return { success: true, data: result.data };
  const firstError = result.error.issues[0];
  return {
    success: false,
    error: firstError ? `${firstError.path.join('.')}: ${firstError.message}` : 'Données invalides',
    details: result.error,
  };
}
