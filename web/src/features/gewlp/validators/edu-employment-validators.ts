import z from "zod";

export const CreateEduEmploymentMatchSchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  user_id: z.string().uuid({ message: "Identifiant de l'utilisateur invalide" }),
  opportunity_id: z.string().uuid({ message: "Identifiant de l'opportunité invalide" }),
  company_id: z.string().uuid({ message: "Identifiant de l'entreprise invalide" }),
  match_type: z.enum(["internship", "apprenticeship", "job", "project", "mentorship", "other"], { message: "Type de correspondance invalide" }),
  status: z.enum(["pending", "accepted", "rejected", "withdrawn", "completed", "cancelled"], { message: "Statut invalide" }).default("pending"),
  application_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de candidature invalide" }),
  response_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de réponse invalide" }).optional(),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de début invalide" }).optional(),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de fin invalide" }).optional(),
  match_score: z.number().min(0, { message: "Le score minimum est 0" }).max(100, { message: "Le score maximum est 100" }).optional(),
  skills_matched: z.array(z.object({
    skill_id: z.string().uuid({ message: "Identifiant de compétence invalide" }),
    skill_name: z.string().min(1, { message: "Le nom de la compétence est requis" }),
    proficiency_required: z.enum(["beginner", "elementary", "intermediate", "upper_intermediate", "advanced", "expert", "master"], { message: "Niveau requis invalide" }),
    match_level: z.enum(["exact", "close", "partial", "missing"], { message: "Niveau de correspondance invalide" }),
  })).optional(),
  feedback: z.object({
    employer_rating: z.number().min(0, { message: "La note minimum est 0" }).max(5, { message: "La note maximum est 5" }).optional(),
    student_rating: z.number().min(0, { message: "La note minimum est 0" }).max(5, { message: "La note maximum est 5" }).optional(),
    employer_comment: z.string().max(2000, { message: "Le commentaire employeur ne doit pas dépasser 2000 caractères" }).optional(),
    student_comment: z.string().max(2000, { message: "Le commentaire étudiant ne doit pas dépasser 2000 caractères" }).optional(),
  }).optional(),
  documents: z.array(z.string().url({ message: "URL de document invalide" })).optional(),
  notes: z.string().max(5000, { message: "Les notes ne doivent pas dépasser 5000 caractères" }).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateEduEmploymentMatchSchema = z.object({
  match_type: z.enum(["internship", "apprenticeship", "job", "project", "mentorship", "other"], { message: "Type de correspondance invalide" }).optional(),
  status: z.enum(["pending", "accepted", "rejected", "withdrawn", "completed", "cancelled"], { message: "Statut invalide" }).optional(),
  application_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de candidature invalide" }).optional(),
  response_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de réponse invalide" }).optional().nullable(),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de début invalide" }).optional().nullable(),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de fin invalide" }).optional().nullable(),
  match_score: z.number().min(0, { message: "Le score minimum est 0" }).max(100, { message: "Le score maximum est 100" }).optional(),
  skills_matched: z.array(z.object({
    skill_id: z.string().uuid({ message: "Identifiant de compétence invalide" }),
    skill_name: z.string().min(1, { message: "Le nom de la compétence est requis" }),
    proficiency_required: z.enum(["beginner", "elementary", "intermediate", "upper_intermediate", "advanced", "expert", "master"], { message: "Niveau requis invalide" }),
    match_level: z.enum(["exact", "close", "partial", "missing"], { message: "Niveau de correspondance invalide" }),
  })).optional(),
  feedback: z.object({
    employer_rating: z.number().min(0, { message: "La note minimum est 0" }).max(5, { message: "La note maximum est 5" }).optional(),
    student_rating: z.number().min(0, { message: "La note minimum est 0" }).max(5, { message: "La note maximum est 5" }).optional(),
    employer_comment: z.string().max(2000, { message: "Le commentaire employeur ne doit pas dépasser 2000 caractères" }).optional(),
    student_comment: z.string().max(2000, { message: "Le commentaire étudiant ne doit pas dépasser 2000 caractères" }).optional(),
  }).optional(),
  documents: z.array(z.string().url({ message: "URL de document invalide" })).optional(),
  notes: z.string().max(5000, { message: "Les notes ne doivent pas dépasser 5000 caractères" }).optional().nullable(),
  metadata: z.record(z.unknown()).optional(),
});
