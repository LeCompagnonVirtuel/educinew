import z from "zod";

export const CreateEmploymentRecordSchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  user_id: z.string().uuid({ message: "Identifiant de l'utilisateur invalide" }),
  position: z.string().min(1, { message: "Le poste est requis" }).max(255, { message: "Le poste ne doit pas dépasser 255 caractères" }),
  department: z.string().min(1, { message: "Le département est requis" }).max(255, { message: "Le département ne doit pas dépasser 255 caractères" }),
  contract_type: z.enum(["permanent", "temporary", "probation", "freelance", "internship", "consulting", "cdi", "cdd", "stage", "apprentissage"], { message: "Type de contrat invalide" }),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de début invalide" }),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de fin invalide" }).optional(),
  status: z.enum(["active", "on_leave", "suspended", "terminated", "resigned", "retired", "probation"], { message: "Statut invalide" }).default("active"),
  salary_grade: z.string().max(50, { message: "L'échelle salariale ne doit pas dépasser 50 caractères" }).optional(),
  employment_rate: z.number().min(0, { message: "Le taux d'emploi minimum est 0" }).max(100, { message: "Le taux d'emploi maximum est 100" }).default(100),
  reporting_to: z.string().uuid({ message: "Identifiant du superviseur invalide" }).optional().nullable(),
  work_location: z.string().max(255, { message: "L'emplacement ne doit pas dépasser 255 caractères" }).optional(),
  job_description: z.string().max(5000, { message: "La description de poste ne doit pas dépasser 5000 caractères" }).optional(),
  skills_required: z.array(z.string().uuid({ message: "Identifiant de compétence invalide" })).optional(),
  documents: z.array(z.string().url({ message: "URL de document invalide" })).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateEmploymentRecordSchema = z.object({
  position: z.string().min(1, { message: "Le poste est requis" }).max(255, { message: "Le poste ne doit pas dépasser 255 caractères" }).optional(),
  department: z.string().min(1, { message: "Le département est requis" }).max(255, { message: "Le département ne doit pas dépasser 255 caractères" }).optional(),
  contract_type: z.enum(["permanent", "temporary", "probation", "freelance", "internship", "consulting", "cdi", "cdd", "stage", "apprentissage"], { message: "Type de contrat invalide" }).optional(),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de début invalide" }).optional(),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de fin invalide" }).optional().nullable(),
  status: z.enum(["active", "on_leave", "suspended", "terminated", "resigned", "retired", "probation"], { message: "Statut invalide" }).optional(),
  salary_grade: z.string().max(50, { message: "L'échelle salariale ne doit pas dépasser 50 caractères" }).optional().nullable(),
  employment_rate: z.number().min(0, { message: "Le taux d'emploi minimum est 0" }).max(100, { message: "Le taux d'emploi maximum est 100" }).optional(),
  reporting_to: z.string().uuid({ message: "Identifiant du superviseur invalide" }).optional().nullable(),
  work_location: z.string().max(255, { message: "L'emplacement ne doit pas dépasser 255 caractères" }).optional().nullable(),
  job_description: z.string().max(5000, { message: "La description de poste ne doit pas dépasser 5000 caractères" }).optional().nullable(),
  skills_required: z.array(z.string().uuid({ message: "Identifiant de compétence invalide" })).optional(),
  documents: z.array(z.string().url({ message: "URL de document invalide" })).optional(),
  metadata: z.record(z.unknown()).optional(),
});
