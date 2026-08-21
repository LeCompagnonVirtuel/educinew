import z from "zod";

export const CreateQualificationSchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  user_id: z.string().uuid({ message: "Identifiant de l'utilisateur invalide" }),
  title: z.string().min(1, { message: "Le titre est requis" }).max(255, { message: "Le titre ne doit pas dépasser 255 caractères" }),
  institution: z.string().min(1, { message: "L'institution est requise" }).max(255, { message: "L'institution ne doit pas dépasser 255 caractères" }),
  degree: z.enum(["diploma", "bachelor", "master", "doctorate", "certificate", "professional", "other"], { message: "Type de diplôme invalide" }),
  field_of_study: z.string().max(255, { message: "Le domaine d'étude ne doit pas dépasser 255 caractères" }).optional(),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de début invalide" }).optional(),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de fin invalide" }).optional(),
  is_completed: z.boolean({ message: "Statut de complétion invalide" }).default(true),
  grade: z.string().max(50, { message: "La note ne doit pas dépasser 50 caractères" }).optional(),
  honors: z.string().max(100, { message: "Les mentions ne doivent pas dépasser 100 caractères" }).optional(),
  document_url: z.string().url({ message: "URL du document invalide" }).optional(),
  verification_status: z.enum(["pending", "verified", "rejected"], { message: "Statut de vérification invalide" }).default("pending"),
  verified_by: z.string().uuid({ message: "Identifiant du vérificateur invalide" }).optional().nullable(),
  verified_at: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/, { message: "Date de vérification invalide" }).optional().nullable(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateQualificationSchema = z.object({
  title: z.string().min(1, { message: "Le titre est requis" }).max(255, { message: "Le titre ne doit pas dépasser 255 caractères" }).optional(),
  institution: z.string().min(1, { message: "L'institution est requise" }).max(255, { message: "L'institution ne doit pas dépasser 255 caractères" }).optional(),
  degree: z.enum(["diploma", "bachelor", "master", "doctorate", "certificate", "professional", "other"], { message: "Type de diplôme invalide" }).optional(),
  field_of_study: z.string().max(255, { message: "Le domaine d'étude ne doit pas dépasser 255 caractères" }).optional().nullable(),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de début invalide" }).optional().nullable(),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de fin invalide" }).optional().nullable(),
  is_completed: z.boolean({ message: "Statut de complétion invalide" }).optional(),
  grade: z.string().max(50, { message: "La note ne doit pas dépasser 50 caractères" }).optional().nullable(),
  honors: z.string().max(100, { message: "Les mentions ne doivent pas dépasser 100 caractères" }).optional().nullable(),
  document_url: z.string().url({ message: "URL du document invalide" }).optional().nullable(),
  verification_status: z.enum(["pending", "verified", "rejected"], { message: "Statut de vérification invalide" }).optional(),
  verified_by: z.string().uuid({ message: "Identifiant du vérificateur invalide" }).optional().nullable(),
  verified_at: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/, { message: "Date de vérification invalide" }).optional().nullable(),
  metadata: z.record(z.unknown()).optional(),
});
