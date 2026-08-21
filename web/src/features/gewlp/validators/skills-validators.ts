import z from "zod";

export const CreateSkillProfileSchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  user_id: z.string().uuid({ message: "Identifiant de l'utilisateur invalide" }),
  skill_name: z.string().min(1, { message: "Le nom de la compétence est requis" }).max(255, { message: "Le nom de la compétence ne doit pas dépasser 255 caractères" }),
  skill_category: z.enum(["technical", "soft", "language", "creative", "leadership", "academic", "vocational", "digital", "other"], { message: "Catégorie de compétence invalide" }),
  proficiency_level: z.enum(["beginner", "elementary", "intermediate", "upper_intermediate", "advanced", "expert", "master"], { message: "Niveau de compétence invalide" }),
  source: z.enum(["self_declaration", "assessment", "certification", "experience", "training", "ai_evaluation", "other"], { message: "Source de la compétence invalide" }),
  verified: z.boolean({ message: "Statut de vérification invalide" }).default(false),
  verified_by: z.string().uuid({ message: "Identifiant du vérificateur invalide" }).optional(),
  verification_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de vérification invalide" }).optional(),
  expiry_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date d'expiration invalide" }).optional(),
  issuing_organization: z.string().max(255, { message: "L'organisation émettrice ne doit pas dépasser 255 caractères" }).optional(),
  skill_score: z.number().min(0, { message: "Le score minimum est 0" }).max(100, { message: "Le score maximum est 100" }).optional(),
  endorsements: z.array(z.object({
    endorser_id: z.string().uuid({ message: "Identifiant du référent invalide" }),
    endorser_name: z.string().min(1, { message: "Le nom du référent est requis" }),
    comment: z.string().max(500, { message: "Le commentaire ne doit pas dépasser 500 caractères" }).optional(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date invalide" }),
  })).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateSkillProfileSchema = z.object({
  skill_name: z.string().min(1, { message: "Le nom de la compétence est requis" }).max(255, { message: "Le nom de la compétence ne doit pas dépasser 255 caractères" }).optional(),
  skill_category: z.enum(["technical", "soft", "language", "creative", "leadership", "academic", "vocational", "digital", "other"], { message: "Catégorie de compétence invalide" }).optional(),
  proficiency_level: z.enum(["beginner", "elementary", "intermediate", "upper_intermediate", "advanced", "expert", "master"], { message: "Niveau de compétence invalide" }).optional(),
  source: z.enum(["self_declaration", "assessment", "certification", "experience", "training", "ai_evaluation", "other"], { message: "Source de la compétence invalide" }).optional(),
  verified: z.boolean({ message: "Statut de vérification invalide" }).optional(),
  verified_by: z.string().uuid({ message: "Identifiant du vérificateur invalide" }).optional().nullable(),
  verification_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de vérification invalide" }).optional().nullable(),
  expiry_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date d'expiration invalide" }).optional().nullable(),
  issuing_organization: z.string().max(255, { message: "L'organisation émettrice ne doit pas dépasser 255 caractères" }).optional().nullable(),
  skill_score: z.number().min(0, { message: "Le score minimum est 0" }).max(100, { message: "Le score maximum est 100" }).optional(),
  endorsements: z.array(z.object({
    endorser_id: z.string().uuid({ message: "Identifiant du référent invalide" }),
    endorser_name: z.string().min(1, { message: "Le nom du référent est requis" }),
    comment: z.string().max(500, { message: "Le commentaire ne doit pas dépasser 500 caractères" }).optional(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date invalide" }),
  })).optional(),
  metadata: z.record(z.unknown()).optional(),
});
