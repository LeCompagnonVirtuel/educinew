import { z } from 'zod';

export const CreateStudentHealthRecordSchema = z.object({
  studentId: z.string().uuid('ID élève invalide'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    message: 'Le groupe sanguin est invalide',
  }).optional(),
  height: z.number().min(0, 'La taille doit être positive').optional(),
  weight: z.number().min(0, 'Le poids doit être positif').optional(),
  allergies: z.array(z.string()).default([]),
  chronicConditions: z.array(z.string()).default([]),
  medications: z.array(z.string()).default([]),
  disabilityStatus: z.enum(['none', 'physical', 'sensory', 'cognitive', 'multiple'], {
    message: 'Le statut de handicap est invalide',
  }).default('none'),
  emergencyContact: z.string().min(1, 'Le contact d\'urgence est requis'),
  emergencyPhone: z.string().min(1, 'Le téléphone d\'urgence est requis'),
  insuranceProvider: z.string().optional(),
  insuranceNumber: z.string().optional(),
  notes: z.string().optional(),
});

export const UpdateStudentHealthRecordSchema = CreateStudentHealthRecordSchema.partial();

export const CreateHealthCheckupSchema = z.object({
  studentId: z.string().uuid('ID élève invalide'),
  checkupDate: z.string().min(1, 'La date de la visite est requise'),
  type: z.enum(['annual', 'admission', 'sport', 'follow_up', 'emergency'], {
    message: 'Le type de visite est invalide',
  }),
  performedBy: z.string().min(1, 'Le nom du praticien est requis'),
  visionScore: z.number().min(0).max(100).optional(),
  hearingScore: z.number().min(0).max(100).optional(),
  dentalStatus: z.enum(['good', 'needs_care', 'critical'], {
    message: 'L\'état dentaire est invalide',
  }).optional(),
  bmi: z.number().min(0).optional(),
  bloodPressure: z.string().optional(),
  findings: z.string().min(1, 'Les constatations sont requises'),
  recommendations: z.string().optional(),
  followUpRequired: z.boolean().default(false),
  followUpDate: z.string().optional(),
});

export const UpdateHealthCheckupSchema = CreateHealthCheckupSchema.partial();

export const CreateVaccinationSchema = z.object({
  studentId: z.string().uuid('ID élève invalide'),
  vaccineName: z.string().min(1, 'Le nom du vaccin est requis'),
  doseNumber: z.number().int().min(1, 'Le numéro de dose doit être positif'),
  administeredDate: z.string().min(1, 'La date d\'administration est requise'),
  administeredBy: z.string().min(1, 'L\'administrateurt est requis'),
  lotNumber: z.string().optional(),
  nextDoseDate: z.string().optional(),
  status: z.enum(['completed', 'pending', 'overdue'], {
    message: 'Le statut est invalide',
  }).default('completed'),
  reactions: z.string().optional(),
});

export const UpdateVaccinationSchema = CreateVaccinationSchema.partial();
