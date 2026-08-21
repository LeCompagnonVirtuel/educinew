import z from "zod";

export const CreateTranscriptExchangeSchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  student_id: z.string().uuid({ message: "Identifiant de l'élève invalide" }),
  source_institution: z.string().min(1, { message: "L'institution source est requise" }).max(255, { message: "L'institution source ne doit pas dépasser 255 caractères" }),
  target_institution: z.string().min(1, { message: "L'institution cible est requise" }).max(255, { message: "L'institution cible ne doit pas dépasser 255 caractères" }),
  academic_year: z.string().regex(/^\d{4}-\d{4}$/, { message: "Année académique invalide (format: YYYY-YYYY)" }),
  status: z.enum(["pending", "approved", "rejected", "completed", "cancelled"], { message: "Statut invalide" }).default("pending"),
  courses: z.array(z.object({
    code: z.string().min(1, { message: "Le code du cours est requis" }),
    name: z.string().min(1, { message: "Le nom du cours est requis" }),
    credits: z.number().min(0, { message: "Les crédits doivent être positifs" }),
    grade: z.string().min(1, { message: "La note est requise" }),
    semester: z.enum(["1", "2", "summer"], { message: "Semestre invalide" }),
  })).min(1, { message: "Au moins un cours est requis" }),
  total_credits: z.number().min(0, { message: "Le total des crédits doit être positif" }),
  gpa: z.number().min(0, { message: "La moyenne générale doit être positive" }).max(4, { message: "La moyenne générale ne peut pas dépasser 4" }).optional(),
  classification: z.enum(["distinction", "merit", "pass", "fail", "honors"], { message: "Classement invalide" }).optional(),
  request_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de demande invalide" }),
  completion_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date d'achèvement invalide" }).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateTranscriptExchangeSchema = z.object({
  status: z.enum(["pending", "approved", "rejected", "completed", "cancelled"], { message: "Statut invalide" }).optional(),
  courses: z.array(z.object({
    code: z.string().min(1, { message: "Le code du cours est requis" }),
    name: z.string().min(1, { message: "Le nom du cours est requis" }),
    credits: z.number().min(0, { message: "Les crédits doivent être positifs" }),
    grade: z.string().min(1, { message: "La note est requise" }),
    semester: z.enum(["1", "2", "summer"], { message: "Semestre invalide" }),
  })).min(1, { message: "Au moins un cours est requis" }).optional(),
  total_credits: z.number().min(0, { message: "Le total des crédits doit être positif" }).optional(),
  gpa: z.number().min(0, { message: "La moyenne générale doit être positive" }).max(4, { message: "La moyenne générale ne peut pas dépasser 4" }).optional().nullable(),
  classification: z.enum(["distinction", "merit", "pass", "fail", "honors"], { message: "Classement invalide" }).optional().nullable(),
  completion_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date d'achèvement invalide" }).optional().nullable(),
  metadata: z.record(z.unknown()).optional(),
});
