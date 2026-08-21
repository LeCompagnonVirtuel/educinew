import z from "zod";

export const CreateGovernanceSchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  name: z.string().min(1, { message: "Le nom est requis" }).max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }),
  description: z.string().max(1000, { message: "La description ne doit pas dépasser 1000 caractères" }).optional(),
  type: z.enum(["board", "committee", "council", "assembly", "other"], { message: "Type de gouvernance invalide" }),
  status: z.enum(["active", "inactive", "dissolved"], { message: "Statut invalide" }).default("active"),
  president_id: z.string().uuid({ message: "Identifiant du président invalide" }).optional(),
  meeting_frequency: z.enum(["weekly", "biweekly", "monthly", "quarterly", "annually"], { message: "Fréquence de réunion invalide" }).optional(),
  established_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date invalide" }).optional(),
  dissolution_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date invalide" }).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateGovernanceSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }).max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }).optional(),
  description: z.string().max(1000, { message: "La description ne doit pas dépasser 1000 caractères" }).optional(),
  type: z.enum(["board", "committee", "council", "assembly", "other"], { message: "Type de gouvernance invalide" }).optional(),
  status: z.enum(["active", "inactive", "dissolved"], { message: "Statut invalide" }).optional(),
  president_id: z.string().uuid({ message: "Identifiant du président invalide" }).optional().nullable(),
  meeting_frequency: z.enum(["weekly", "biweekly", "monthly", "quarterly", "annually"], { message: "Fréquence de réunion invalide" }).optional(),
  established_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date invalide" }).optional().nullable(),
  dissolution_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date invalide" }).optional().nullable(),
  metadata: z.record(z.unknown()).optional(),
});
