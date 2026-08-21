import z from "zod";

export const CreateWorkforceAnalyticsSchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  name: z.string().min(1, { message: "Le nom est requis" }).max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }),
  description: z.string().max(1000, { message: "La description ne doit pas dépasser 1000 caractères" }).optional(),
  analytics_type: z.enum(["report", "dashboard", "widget", "export", "real_time", "forecast"], { message: "Type d'analytics invalide" }),
  category: z.enum(["workforce", "skills", "employment", "career", "talent", "credentials", "learning", "retention", "turnover", "custom"], { message: "Catégorie invalide" }),
  status: z.enum(["active", "inactive", "draft", "archived"], { message: "Statut invalide" }).default("active"),
  data_sources: z.array(z.enum(["skills", "employment", "career", "learning", "credentials", "talent", "corporate", "finance", "other"], { message: "Source de données invalide" })).min(1, { message: "Au moins une source de données est requise" }),
  query_config: z.record(z.unknown()).optional(),
  visualisation_config: z.record(z.unknown()).optional(),
  filters: z.array(z.object({
    field: z.string().min(1, { message: "Le champ est requis" }).max(100, { message: "Le champ ne doit pas dépasser 100 caractères" }),
    operator: z.enum(["equals", "not_equals", "contains", "greater_than", "less_than", "between", "in", "not_in"], { message: "Opérateur invalide" }),
    value: z.unknown(),
  })).optional(),
  schedule: z.object({
    frequency: z.enum(["hourly", "daily", "weekly", "monthly", "quarterly", "annually"], { message: "Fréquence invalide" }).optional(),
    day_of_week: z.number().min(0, { message: "Jour invalide" }).max(6, { message: "Jour invalide" }).optional(),
    day_of_month: z.number().min(1, { message: "Jour du mois invalide" }).max(31, { message: "Jour du mois invalide" }).optional(),
    time: z.string().regex(/^\d{2}:\d{2}$/, { message: "Heure invalide" }).optional(),
  }).optional(),
  access_roles: z.array(z.string()).min(1, { message: "Au moins un rôle d'accès est requis" }),
  is_public: z.boolean({ message: "Visibilité invalide" }).default(false),
  export_formats: z.array(z.enum(["csv", "pdf", "xlsx", "json", "xml"], { message: "Format d'export invalide" })).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateWorkforceAnalyticsSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }).max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }).optional(),
  description: z.string().max(1000, { message: "La description ne doit pas dépasser 1000 caractères" }).optional().nullable(),
  analytics_type: z.enum(["report", "dashboard", "widget", "export", "real_time", "forecast"], { message: "Type d'analytics invalide" }).optional(),
  category: z.enum(["workforce", "skills", "employment", "career", "talent", "credentials", "learning", "retention", "turnover", "custom"], { message: "Catégorie invalide" }).optional(),
  status: z.enum(["active", "inactive", "draft", "archived"], { message: "Statut invalide" }).optional(),
  data_sources: z.array(z.enum(["skills", "employment", "career", "learning", "credentials", "talent", "corporate", "finance", "other"], { message: "Source de données invalide" })).min(1, { message: "Au moins une source de données est requise" }).optional(),
  query_config: z.record(z.unknown()).optional(),
  visualisation_config: z.record(z.unknown()).optional(),
  filters: z.array(z.object({
    field: z.string().min(1, { message: "Le champ est requis" }).max(100, { message: "Le champ ne doit pas dépasser 100 caractères" }),
    operator: z.enum(["equals", "not_equals", "contains", "greater_than", "less_than", "between", "in", "not_in"], { message: "Opérateur invalide" }),
    value: z.unknown(),
  })).optional(),
  schedule: z.object({
    frequency: z.enum(["hourly", "daily", "weekly", "monthly", "quarterly", "annually"], { message: "Fréquence invalide" }).optional(),
    day_of_week: z.number().min(0, { message: "Jour invalide" }).max(6, { message: "Jour invalide" }).optional(),
    day_of_month: z.number().min(1, { message: "Jour du mois invalide" }).max(31, { message: "Jour du mois invalide" }).optional(),
    time: z.string().regex(/^\d{2}:\d{2}$/, { message: "Heure invalide" }).optional(),
  }).optional(),
  access_roles: z.array(z.string()).min(1, { message: "Au moins un rôle d'accès est requis" }).optional(),
  is_public: z.boolean({ message: "Visibilité invalide" }).optional(),
  export_formats: z.array(z.enum(["csv", "pdf", "xlsx", "json", "xml"], { message: "Format d'export invalide" })).optional(),
  metadata: z.record(z.unknown()).optional(),
});
