import z from "zod";

export const CreateCareerPathSchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  user_id: z.string().uuid({ message: "Identifiant de l'utilisateur invalide" }),
  career_title: z.string().min(1, { message: "Le titre de carrière est requis" }).max(255, { message: "Le titre de carrière ne doit pas dépasser 255 caractères" }),
  career_sector: z.enum(["education", "technology", "health", "finance", "engineering", "arts", "agriculture", "industry", "services", "other"], { message: "Secteur de carrière invalide" }),
  target_role: z.string().min(1, { message: "Le rôle cible est requis" }).max(255, { message: "Le rôle cible ne doit pas dépasser 255 caractères" }),
  experience_level: z.enum(["entry", "junior", "mid", "senior", "lead", "executive", "expert"], { message: "Niveau d'expérience invalide" }),
  status: z.enum(["planned", "in_progress", "achieved", "paused", "abandoned"], { message: "Statut invalide" }).default("planned"),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de début invalide" }).optional(),
  target_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date cible invalide" }).optional(),
  progress_percentage: z.number().min(0, { message: "Le pourcentage minimum est 0" }).max(100, { message: "Le pourcentage maximum est 100" }).default(0),
  required_skills: z.array(z.string().uuid({ message: "Identifiant de compétence invalide" })).optional(),
  milestones: z.array(z.object({
    title: z.string().min(1, { message: "Le titre du jalon est requis" }).max(255, { message: "Le titre du jalon ne doit pas dépasser 255 caractères" }),
    description: z.string().max(1000, { message: "La description ne doit pas dépasser 1000 caractères" }).optional(),
    target_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date cible invalide" }).optional(),
    status: z.enum(["pending", "in_progress", "completed", "skipped"], { message: "Statut du jalon invalide" }).default("pending"),
  })).optional(),
  mentor_id: z.string().uuid({ message: "Identifiant du mentor invalide" }).optional().nullable(),
  notes: z.string().max(5000, { message: "Les notes ne doivent pas dépasser 5000 caractères" }).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateCareerPathSchema = z.object({
  career_title: z.string().min(1, { message: "Le titre de carrière est requis" }).max(255, { message: "Le titre de carrière ne doit pas dépasser 255 caractères" }).optional(),
  career_sector: z.enum(["education", "technology", "health", "finance", "engineering", "arts", "agriculture", "industry", "services", "other"], { message: "Secteur de carrière invalide" }).optional(),
  target_role: z.string().min(1, { message: "Le rôle cible est requis" }).max(255, { message: "Le rôle cible ne doit pas dépasser 255 caractères" }).optional(),
  experience_level: z.enum(["entry", "junior", "mid", "senior", "lead", "executive", "expert"], { message: "Niveau d'expérience invalide" }).optional(),
  status: z.enum(["planned", "in_progress", "achieved", "paused", "abandoned"], { message: "Statut invalide" }).optional(),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de début invalide" }).optional().nullable(),
  target_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date cible invalide" }).optional().nullable(),
  progress_percentage: z.number().min(0, { message: "Le pourcentage minimum est 0" }).max(100, { message: "Le pourcentage maximum est 100" }).optional(),
  required_skills: z.array(z.string().uuid({ message: "Identifiant de compétence invalide" })).optional(),
  milestones: z.array(z.object({
    title: z.string().min(1, { message: "Le titre du jalon est requis" }).max(255, { message: "Le titre du jalon ne doit pas dépasser 255 caractères" }),
    description: z.string().max(1000, { message: "La description ne doit pas dépasser 1000 caractères" }).optional(),
    target_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date cible invalide" }).optional(),
    status: z.enum(["pending", "in_progress", "completed", "skipped"], { message: "Statut du jalon invalide" }).default("pending"),
  })).optional(),
  mentor_id: z.string().uuid({ message: "Identifiant du mentor invalide" }).optional().nullable(),
  notes: z.string().max(5000, { message: "Les notes ne doivent pas dépasser 5000 caractères" }).optional().nullable(),
  metadata: z.record(z.unknown()).optional(),
});
