import z from "zod";

export const CreateAnalyticsSchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  name: z.string().min(1, { message: "Le nom est requis" }).max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }),
  description: z.string().max(1000, { message: "La description ne doit pas dépasser 1000 caractères" }).optional(),
  type: z.enum(["report", "dashboard", "widget", "export", "scheduled"], { message: "Type d'analytics invalide" }),
  category: z.enum(["academic", "financial", "operational", "hr", "attendance", "behavior", "custom"], { message: "Catégorie invalide" }),
  status: z.enum(["active", "inactive", "draft"], { message: "Statut invalide" }).default("active"),
  query_config: z.record(z.unknown()).optional(),
  visualisation_config: z.record(z.unknown()).optional(),
  schedule: z.object({
    frequency: z.enum(["hourly", "daily", "weekly", "monthly", "quarterly", "annually"], { message: "Fréquence invalide" }).optional(),
    day_of_week: z.number().min(0, { message: "Jour invalide" }).max(6, { message: "Jour invalide" }).optional(),
    day_of_month: z.number().min(1, { message: "Jour du mois invalide" }).max(31, { message: "Jour du mois invalide" }).optional(),
    time: z.string().regex(/^\d{2}:\d{2}$/, { message: "Heure invalide" }).optional(),
  }).optional(),
  access_roles: z.array(z.string()).min(1, { message: "Au moins un rôle d'accès est requis" }),
  is_public: z.boolean({ message: "Visibilité invalide" }).default(false),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateAnalyticsSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }).max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }).optional(),
  description: z.string().max(1000, { message: "La description ne doit pas dépasser 1000 caractères" }).optional().nullable(),
  type: z.enum(["report", "dashboard", "widget", "export", "scheduled"], { message: "Type d'analytics invalide" }).optional(),
  category: z.enum(["academic", "financial", "operational", "hr", "attendance", "behavior", "custom"], { message: "Catégorie invalide" }).optional(),
  status: z.enum(["active", "inactive", "draft"], { message: "Statut invalide" }).optional(),
  query_config: z.record(z.unknown()).optional(),
  visualisation_config: z.record(z.unknown()).optional(),
  schedule: z.object({
    frequency: z.enum(["hourly", "daily", "weekly", "monthly", "quarterly", "annually"], { message: "Fréquence invalide" }).optional(),
    day_of_week: z.number().min(0, { message: "Jour invalide" }).max(6, { message: "Jour invalide" }).optional(),
    day_of_month: z.number().min(1, { message: "Jour du mois invalide" }).max(31, { message: "Jour du mois invalide" }).optional(),
    time: z.string().regex(/^\d{2}:\d{2}$/, { message: "Heure invalide" }).optional(),
  }).optional(),
  access_roles: z.array(z.string()).min(1, { message: "Au moins un rôle d'accès est requis" }).optional(),
  is_public: z.boolean({ message: "Visibilité invalide" }).optional(),
  metadata: z.record(z.unknown()).optional(),
});
