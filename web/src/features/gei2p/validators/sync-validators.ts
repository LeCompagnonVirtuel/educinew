import z from "zod";

export const CreateDataSyncSchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  name: z.string().min(1, { message: "Le nom est requis" }).max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }),
  description: z.string().max(1000, { message: "La description ne doit pas dépasser 1000 caractères" }).optional(),
  source_connector_id: z.string().uuid({ message: "Identifiant du connecteur source invalide" }),
  target_connector_id: z.string().uuid({ message: "Identifiant du connecteur cible invalide" }),
  sync_type: z.enum(["full", "incremental", "differential", "real_time", "batch"], { message: "Type de synchronisation invalide" }),
  status: z.enum(["idle", "running", "paused", "completed", "failed", "scheduled"], { message: "Statut invalide" }).default("idle"),
  schedule: z.object({
    type: z.enum(["cron", "interval", "manual", "event_driven"], { message: "Type de planification invalide" }),
    expression: z.string().max(100, { message: "L'expression ne doit pas dépasser 100 caractères" }).optional(),
    interval_ms: z.number().int({ message: "L'intervalle doit être un entier" }).min(1000, { message: "L'intervalle doit être d'au moins 1000 ms" }).optional(),
    timezone: z.string().max(50, { message: "Le fuseau horaire ne doit pas dépasser 50 caractères" }).default("Africa/Abidjan"),
  }).optional(),
  mapping: z.array(z.object({
    source_field: z.string().min(1, { message: "Le champ source est requis" }),
    target_field: z.string().min(1, { message: "Le champ cible est requis" }),
    transform: z.enum(["direct", "map", "filter", "aggregate", "split", "enrich", "custom"], { message: "Type de transformation invalide" }).default("direct"),
    default_value: z.string().optional(),
    is_required: z.boolean({ message: "Champ requis invalide" }).default(false),
  })).min(1, { message: "Au moins un mapping est requis" }),
  conflict_resolution: z.enum(["last_write", "first_write", "manual", "merge", "reject", "log"], { message: "Résolution de conflit invalide" }).default("last_write"),
  error_handling: z.enum(["skip", "retry", "abort", "dead_letter", "alert"], { message: "Gestion d'erreur invalide" }).default("retry"),
  batch_size: z.number().int({ message: "La taille du lot doit être un entier" }).min(1, { message: "La taille du lot doit être supérieure à 0" }).default(100),
  last_sync_at: z.string().regex(/^\d{4}-\d{2}-\d{2}T/, { message: "Date de dernière synchronisation invalide" }).optional(),
  records_synced: z.number().int({ message: "Le nombre d'enregistrements doit être un entier" }).min(0, { message: "Le nombre d'enregistrements ne peut pas être négatif" }).default(0),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateDataSyncSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }).max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }).optional(),
  description: z.string().max(1000, { message: "La description ne doit pas dépasser 1000 caractères" }).optional().nullable(),
  source_connector_id: z.string().uuid({ message: "Identifiant du connecteur source invalide" }).optional(),
  target_connector_id: z.string().uuid({ message: "Identifiant du connecteur cible invalide" }).optional(),
  sync_type: z.enum(["full", "incremental", "differential", "real_time", "batch"], { message: "Type de synchronisation invalide" }).optional(),
  status: z.enum(["idle", "running", "paused", "completed", "failed", "scheduled"], { message: "Statut invalide" }).optional(),
  schedule: z.object({
    type: z.enum(["cron", "interval", "manual", "event_driven"], { message: "Type de planification invalide" }),
    expression: z.string().max(100, { message: "L'expression ne doit pas dépasser 100 caractères" }).optional(),
    interval_ms: z.number().int({ message: "L'intervalle doit être un entier" }).min(1000, { message: "L'intervalle doit être d'au moins 1000 ms" }).optional(),
    timezone: z.string().max(50, { message: "Le fuseau horaire ne doit pas dépasser 50 caractères" }),
  }).optional().nullable(),
  mapping: z.array(z.object({
    source_field: z.string().min(1, { message: "Le champ source est requis" }),
    target_field: z.string().min(1, { message: "Le champ cible est requis" }),
    transform: z.enum(["direct", "map", "filter", "aggregate", "split", "enrich", "custom"], { message: "Type de transformation invalide" }),
    default_value: z.string().optional(),
    is_required: z.boolean({ message: "Champ requis invalide" }),
  })).min(1, { message: "Au moins un mapping est requis" }).optional(),
  conflict_resolution: z.enum(["last_write", "first_write", "manual", "merge", "reject", "log"], { message: "Résolution de conflit invalide" }).optional(),
  error_handling: z.enum(["skip", "retry", "abort", "dead_letter", "alert"], { message: "Gestion d'erreur invalide" }).optional(),
  batch_size: z.number().int({ message: "La taille du lot doit être un entier" }).min(1, { message: "La taille du lot doit être supérieure à 0" }).optional(),
  metadata: z.record(z.unknown()).optional(),
});
