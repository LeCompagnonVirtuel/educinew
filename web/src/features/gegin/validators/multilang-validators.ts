import z from "zod";

export const CreateMultilangSchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  key: z.string().min(1, { message: "La clé est requise" }).max(255, { message: "La clé ne doit pas dépasser 255 caractères" }).regex(/^[a-z0-9._-]+$/, { message: "La clé ne doit contenir que des lettres minuscules, chiffres, points et tirets" }),
  namespace: z.string().min(1, { message: "L'espace de noms est requis" }).max(100, { message: "L'espace de noms ne doit pas dépasser 100 caractères" }),
  translations: z.record(z.string(), z.string().min(1, { message: "La traduction ne peut pas être vide" })),
  context: z.string().max(500, { message: "Le contexte ne doit pas dépasser 500 caractères" }).optional(),
  description: z.string().max(500, { message: "La description ne doit pas dépasser 500 caractères" }).optional(),
  is_plural: z.boolean({ message: "Le statut pluriel est invalide" }).default(false),
  plural_forms: z.array(z.string()).optional(),
  status: z.enum(["active", "deprecated", "draft"], { message: "Statut invalide" }).default("active"),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateMultilangSchema = z.object({
  key: z.string().min(1, { message: "La clé est requise" }).max(255, { message: "La clé ne doit pas dépasser 255 caractères" }).regex(/^[a-z0-9._-]+$/, { message: "La clé ne doit contenir que des lettres minuscules, chiffres, points et tirets" }).optional(),
  namespace: z.string().min(1, { message: "L'espace de noms est requis" }).max(100, { message: "L'espace de noms ne doit pas dépasser 100 caractères" }).optional(),
  translations: z.record(z.string(), z.string().min(1, { message: "La traduction ne peut pas être vide" })).optional(),
  context: z.string().max(500, { message: "Le contexte ne doit pas dépasser 500 caractères" }).optional().nullable(),
  description: z.string().max(500, { message: "La description ne doit pas dépasser 500 caractères" }).optional().nullable(),
  is_plural: z.boolean({ message: "Le statut pluriel est invalide" }).optional(),
  plural_forms: z.array(z.string()).optional(),
  status: z.enum(["active", "deprecated", "draft"], { message: "Statut invalide" }).optional(),
  metadata: z.record(z.unknown()).optional(),
});
