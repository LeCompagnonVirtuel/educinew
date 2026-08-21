import { z } from 'zod';

export const ExamCreateSchema = z.object({
  name: z.string().min(1, "Le nom de l'examen est requis"),
  code: z.string().min(1, 'Le code est requis'),
  level: z.enum(['primary', 'secondary', 'tertiary'], {
    message: 'Le niveau est invalide',
  }),
  type: z.enum(['national', 'regional', 'local'], {
    message: "Le type d'examen est invalide",
  }),
  academicYear: z.string().min(1, "L'année académique est requise"),
  startDate: z.string().min(1, 'La date de début est requise'),
  endDate: z.string().min(1, 'La date de fin est requise'),
  status: z.enum(['draft', 'scheduled', 'ongoing', 'completed', 'cancelled'], {
    message: 'Le statut est invalide',
  }).default('draft'),
  passingScore: z.number().min(0, 'La note minimale doit être positive').max(100, 'La note maximale ne peut dépasser 100'),
  maxScore: z.number().min(1, 'La note maximale doit être supérieure à 0').default(20),
});

export const ExamUpdateSchema = ExamCreateSchema.partial();

export const ExamSessionSchema = z.object({
  examId: z.string().uuid('ID examen invalide'),
  name: z.string().min(1, 'Le nom de la session est requis'),
  date: z.string().min(1, 'La date est requise'),
  startTime: z.string().min(1, "L'heure de début est requise"),
  endTime: z.string().min(1, "L'heure de fin est requise"),
  venue: z.string().min(1, 'Le lieu est requis'),
  maxStudents: z.number().int().min(1, 'Le nombre maximum doit être positif'),
  invigilator: z.string().min(1, "L'examinateur est requis"),
});

export const ExamSessionUpdateSchema = ExamSessionSchema.partial();
