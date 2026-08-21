import z from "zod";

export const CreateEventInteropSchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  event_type: z.enum(["academic", "administrative", "financial", "attendance", "behavior", "health", "communication", "assessment", "graduation", "enrollment", "custom"], { message: "Type d'événement invalide" }),
  title: z.string().min(1, { message: "Le titre est requis" }).max(255, { message: "Le titre ne doit pas dépasser 255 caractères" }),
  description: z.string().max(5000, { message: "La description ne doit pas dépasser 5000 caractères" }).optional(),
  source_system: z.string().min(1, { message: "Le système source est requis" }).max(255, { message: "Le système source ne doit pas dépasser 255 caractères" }),
  target_systems: z.array(z.string().min(1, { message: "Le système cible est requis" })).min(1, { message: "Au moins un système cible est requis" }),
  priority: z.enum(["low", "medium", "high", "critical"], { message: "Priorité invalide" }).default("medium"),
  status: z.enum(["pending", "processing", "completed", "failed", "cancelled", "retrying"], { message: "Statut invalide" }).default("pending"),
  payload: z.record(z.unknown()),
  schema_version: z.string().regex(/^\d+\.\d+$/, { message: "Version du schéma invalide" }).default("1.0"),
  idempotency_key: z.string().min(1, { message: "La clé d'idempotence est requise" }).max(255, { message: "La clé d'idempotence ne doit pas dépasser 255 caractères" }).optional(),
  callback_url: z.string().url({ message: "URL de callback invalide" }).optional(),
  ttl_seconds: z.number().int({ message: "Le TTL doit être un entier" }).min(60, { message: "Le TTL doit être d'au moins 60 secondes" }).default(86400),
  retry_count: z.number().int({ message: "Le nombre de retries doit être un entier" }).min(0, { message: "Le nombre de retries ne peut pas être négatif" }).default(0),
  max_retries: z.number().int({ message: "Le nombre max de retries doit être un entier" }).min(0, { message: "Le nombre max de retries doit être positif" }).default(3),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateEventInteropSchema = z.object({
  event_type: z.enum(["academic", "administrative", "financial", "attendance", "behavior", "health", "communication", "assessment", "graduation", "enrollment", "custom"], { message: "Type d'événement invalide" }).optional(),
  title: z.string().min(1, { message: "Le titre est requis" }).max(255, { message: "Le titre ne doit pas dépasser 255 caractères" }).optional(),
  description: z.string().max(5000, { message: "La description ne doit pas dépasser 5000 caractères" }).optional().nullable(),
  target_systems: z.array(z.string().min(1, { message: "Le système cible est requis" })).min(1, { message: "Au moins un système cible est requis" }).optional(),
  priority: z.enum(["low", "medium", "high", "critical"], { message: "Priorité invalide" }).optional(),
  status: z.enum(["pending", "processing", "completed", "failed", "cancelled", "retrying"], { message: "Statut invalide" }).optional(),
  payload: z.record(z.unknown()).optional(),
  callback_url: z.string().url({ message: "URL de callback invalide" }).optional().nullable(),
  retry_count: z.number().int({ message: "Le nombre de retries doit être un entier" }).min(0, { message: "Le nombre de retries ne peut pas être négatif" }).optional(),
  metadata: z.record(z.unknown()).optional(),
});
