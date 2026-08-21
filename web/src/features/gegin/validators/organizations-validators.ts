import z from "zod";

export const CreateOrganizationSchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  name: z.string().min(1, { message: "Le nom est requis" }).max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }),
  slug: z.string().min(1, { message: "Le slug est requis" }).max(255, { message: "Le slug ne doit pas dépasser 255 caractères" }).regex(/^[a-z0-9-]+$/, { message: "Le slug ne doit contenir que des lettres minuscules, chiffres et tirets" }),
  description: z.string().max(2000, { message: "La description ne doit pas dépasser 2000 caractères" }).optional(),
  type: z.enum(["department", "division", "unit", "team", "other"], { message: "Type d'organisation invalide" }),
  parent_id: z.string().uuid({ message: "Identifiant parent invalide" }).optional().nullable(),
  head_id: z.string().uuid({ message: "Identifiant du responsable invalide" }).optional().nullable(),
  status: z.enum(["active", "inactive", "archived"], { message: "Statut invalide" }).default("active"),
  budget_code: z.string().max(50, { message: "Le code budget ne doit pas dépasser 50 caractères" }).optional(),
  location: z.string().max(255, { message: "L'emplacement ne doit pas dépasser 255 caractères" }).optional(),
  contact_email: z.string().email({ message: "Email de contact invalide" }).optional(),
  contact_phone: z.string().max(20, { message: "Le téléphone ne doit pas dépasser 20 caractères" }).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateOrganizationSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }).max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }).optional(),
  slug: z.string().min(1, { message: "Le slug est requis" }).max(255, { message: "Le slug ne doit pas dépasser 255 caractères" }).regex(/^[a-z0-9-]+$/, { message: "Le slug ne doit contenir que des lettres minuscules, chiffres et tirets" }).optional(),
  description: z.string().max(2000, { message: "La description ne doit pas dépasser 2000 caractères" }).optional(),
  type: z.enum(["department", "division", "unit", "team", "other"], { message: "Type d'organisation invalide" }).optional(),
  parent_id: z.string().uuid({ message: "Identifiant parent invalide" }).optional().nullable(),
  head_id: z.string().uuid({ message: "Identifiant du responsable invalide" }).optional().nullable(),
  status: z.enum(["active", "inactive", "archived"], { message: "Statut invalide" }).optional(),
  budget_code: z.string().max(50, { message: "Le code budget ne doit pas dépasser 50 caractères" }).optional().nullable(),
  location: z.string().max(255, { message: "L'emplacement ne doit pas dépasser 255 caractères" }).optional().nullable(),
  contact_email: z.string().email({ message: "Email de contact invalide" }).optional().nullable(),
  contact_phone: z.string().max(20, { message: "Le téléphone ne doit pas dépasser 20 caractères" }).optional().nullable(),
  metadata: z.record(z.unknown()).optional(),
});
