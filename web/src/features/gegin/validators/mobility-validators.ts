import z from "zod";

export const CreateMobilitySchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  user_id: z.string().uuid({ message: "Identifiant de l'utilisateur invalide" }),
  type: z.enum(["transfer", "exchange", "sabbatical", "relocation", "other"], { message: "Type de mobilité invalide" }),
  origin_school: z.string().min(1, { message: "L'école d'origine est requise" }).max(255, { message: "L'école d'origine ne doit pas dépasser 255 caractères" }),
  destination_school: z.string().min(1, { message: "L'école de destination est requise" }).max(255, { message: "L'école de destination ne doit pas dépasser 255 caractères" }),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de début invalide" }),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de fin invalide" }).optional(),
  reason: z.string().min(1, { message: "La raison est requise" }).max(1000, { message: "La raison ne doit pas dépasser 1000 caractères" }),
  status: z.enum(["pending", "approved", "rejected", "completed", "cancelled"], { message: "Statut invalide" }).default("pending"),
  approved_by: z.string().uuid({ message: "Identifiant de l'approbateur invalide" }).optional().nullable(),
  approved_at: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/, { message: "Date d'approbation invalide" }).optional().nullable(),
  documents: z.array(z.string().url({ message: "URL de document invalide" })).optional(),
  notes: z.string().max(2000, { message: "Les notes ne doivent pas dépasser 2000 caractères" }).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateMobilitySchema = z.object({
  type: z.enum(["transfer", "exchange", "sabbatical", "relocation", "other"], { message: "Type de mobilité invalide" }).optional(),
  origin_school: z.string().min(1, { message: "L'école d'origine est requise" }).max(255, { message: "L'école d'origine ne doit pas dépasser 255 caractères" }).optional(),
  destination_school: z.string().min(1, { message: "L'école de destination est requise" }).max(255, { message: "L'école de destination ne doit pas dépasser 255 caractères" }).optional(),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de début invalide" }).optional(),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de fin invalide" }).optional().nullable(),
  reason: z.string().min(1, { message: "La raison est requise" }).max(1000, { message: "La raison ne doit pas dépasser 1000 caractères" }).optional(),
  status: z.enum(["pending", "approved", "rejected", "completed", "cancelled"], { message: "Statut invalide" }).optional(),
  approved_by: z.string().uuid({ message: "Identifiant de l'approbateur invalide" }).optional().nullable(),
  approved_at: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/, { message: "Date d'approbation invalide" }).optional().nullable(),
  documents: z.array(z.string().url({ message: "URL de document invalide" })).optional(),
  notes: z.string().max(2000, { message: "Les notes ne doivent pas dépasser 2000 caractères" }).optional().nullable(),
  metadata: z.record(z.unknown()).optional(),
});
