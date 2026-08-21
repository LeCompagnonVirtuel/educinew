import z from "zod";

export const CreateAPIHubSchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  name: z.string().min(1, { message: "Le nom est requis" }).max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }),
  description: z.string().max(2000, { message: "La description ne doit pas dépasser 2000 caractères" }).optional(),
  api_version: z.string().regex(/^\d+\.\d+\.\d+$/, { message: "Version de l'API invalide (format: X.Y.Z)" }),
  base_url: z.string().url({ message: "URL de base invalide" }),
  status: z.enum(["draft", "active", "deprecated", "retired", "maintenance"], { message: "Statut invalide" }).default("draft"),
  visibility: z.enum(["public", "private", "partner", "internal"], { message: "Visibilité invalide" }).default("private"),
  authentication: z.enum(["none", "api_key", "oauth2", "jwt", "basic", "bearer"], { message: "Type d'authentification invalide" }),
  rate_limit: z.number().int({ message: "La limite de requêtes doit être un entier" }).min(1, { message: "La limite de requêtes doit être supérieure à 0" }).default(1000),
  rate_window: z.enum(["per_second", "per_minute", "per_hour", "per_day"], { message: "Fenêtre de limite invalide" }).default("per_minute"),
  tags: z.array(z.string()).max(20, { message: "Maximum 20 tags" }).optional(),
  documentation_url: z.string().url({ message: "URL de documentation invalide" }).optional(),
  terms_of_service: z.string().max(5000, { message: "Les conditions d'utilisation ne doivent pas dépasser 5000 caractères" }).optional(),
  contact_email: z.string().email({ message: "Email de contact invalide" }).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateAPIHubSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }).max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }).optional(),
  description: z.string().max(2000, { message: "La description ne doit pas dépasser 2000 caractères" }).optional().nullable(),
  api_version: z.string().regex(/^\d+\.\d+\.\d+$/, { message: "Version de l'API invalide (format: X.Y.Z)" }).optional(),
  base_url: z.string().url({ message: "URL de base invalide" }).optional(),
  status: z.enum(["draft", "active", "deprecated", "retired", "maintenance"], { message: "Statut invalide" }).optional(),
  visibility: z.enum(["public", "private", "partner", "internal"], { message: "Visibilité invalide" }).optional(),
  authentication: z.enum(["none", "api_key", "oauth2", "jwt", "basic", "bearer"], { message: "Type d'authentification invalide" }).optional(),
  rate_limit: z.number().int({ message: "La limite de requêtes doit être un entier" }).min(1, { message: "La limite de requêtes doit être supérieure à 0" }).optional(),
  rate_window: z.enum(["per_second", "per_minute", "per_hour", "per_day"], { message: "Fenêtre de limite invalide" }).optional(),
  tags: z.array(z.string()).max(20, { message: "Maximum 20 tags" }).optional(),
  documentation_url: z.string().url({ message: "URL de documentation invalide" }).optional().nullable(),
  terms_of_service: z.string().max(5000, { message: "Les conditions d'utilisation ne doivent pas dépasser 5000 caractères" }).optional().nullable(),
  contact_email: z.string().email({ message: "Email de contact invalide" }).optional().nullable(),
  metadata: z.record(z.unknown()).optional(),
});
