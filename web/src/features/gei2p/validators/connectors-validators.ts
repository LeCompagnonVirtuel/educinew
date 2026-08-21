import z from "zod";

export const CreateDataConnectorSchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  name: z.string().min(1, { message: "Le nom est requis" }).max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }),
  description: z.string().max(1000, { message: "La description ne doit pas dépasser 1000 caractères" }).optional(),
  connector_type: z.enum(["rest", "graphql", "grpc", "soap", "webhook", "sftp", "database", "message_queue", "custom"], { message: "Type de connecteur invalide" }),
  protocol: z.enum(["http", "https", "ftp", "sftp", "amqp", "mqtt", "kafka", "custom"], { message: "Protocole invalide" }),
  status: z.enum(["active", "inactive", "error", "syncing", "configuring", "deprecated"], { message: "Statut invalide" }).default("inactive"),
  endpoint: z.string().url({ message: "URL de l'endpoint invalide" }),
  authentication_type: z.enum(["api_key", "oauth2", "basic", "bearer", "jwt", "mutual_tls", "saml", "custom"], { message: "Type d'authentification invalide" }),
  credentials: z.record(z.string()).optional(),
  sync_config: z.object({
    direction: z.enum(["inbound", "outbound", "bidirectional"], { message: "Direction de synchronisation invalide" }),
    mode: z.enum(["realtime", "periodic", "on_demand", "event_driven", "batch"], { message: "Mode de synchronisation invalide" }),
    frequency: z.enum(["every_5_min", "every_15_min", "every_hour", "daily", "weekly", "monthly"], { message: "Fréquence invalide" }).optional(),
    batch_size: z.number().int({ message: "La taille du lot doit être un entier" }).min(1, { message: "La taille du lot doit être supérieure à 0" }).optional(),
    conflict_resolution: z.enum(["last_write", "first_write", "manual", "merge", "reject"], { message: "Résolution de conflit invalide" }).default("last_write"),
  }).optional(),
  retry_config: z.object({
    strategy: z.enum(["none", "fixed", "exponential", "linear"], { message: "Stratégie de retry invalide" }).default("exponential"),
    max_retries: z.number().int({ message: "Le nombre max de retries doit être un entier" }).min(0, { message: "Le nombre max de retries doit être positif" }).default(3),
    initial_delay_ms: z.number().int({ message: "Le délai initial doit être un entier" }).min(0, { message: "Le délai initial doit être positif" }).default(1000),
    max_delay_ms: z.number().int({ message: "Le délai max doit être un entier" }).min(0, { message: "Le délai max doit être positif" }).default(30000),
  }).optional(),
  rate_limit: z.object({
    enabled: z.boolean({ message: "Statut de limitation invalide" }).default(true),
    max_requests: z.number().int({ message: "Le nombre max de requêtes doit être un entier" }).min(1, { message: "Le nombre max de requêtes doit être supérieur à 0" }).default(100),
    window_ms: z.number().int({ message: "La fenêtre doit être un entier" }).min(1, { message: "La fenêtre doit être supérieure à 0" }).default(60000),
  }).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateDataConnectorSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }).max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }).optional(),
  description: z.string().max(1000, { message: "La description ne doit pas dépasser 1000 caractères" }).optional().nullable(),
  connector_type: z.enum(["rest", "graphql", "grpc", "soap", "webhook", "sftp", "database", "message_queue", "custom"], { message: "Type de connecteur invalide" }).optional(),
  protocol: z.enum(["http", "https", "ftp", "sftp", "amqp", "mqtt", "kafka", "custom"], { message: "Protocole invalide" }).optional(),
  status: z.enum(["active", "inactive", "error", "syncing", "configuring", "deprecated"], { message: "Statut invalide" }).optional(),
  endpoint: z.string().url({ message: "URL de l'endpoint invalide" }).optional(),
  authentication_type: z.enum(["api_key", "oauth2", "basic", "bearer", "jwt", "mutual_tls", "saml", "custom"], { message: "Type d'authentification invalide" }).optional(),
  credentials: z.record(z.string()).optional().nullable(),
  sync_config: z.object({
    direction: z.enum(["inbound", "outbound", "bidirectional"], { message: "Direction de synchronisation invalide" }),
    mode: z.enum(["realtime", "periodic", "on_demand", "event_driven", "batch"], { message: "Mode de synchronisation invalide" }),
    frequency: z.enum(["every_5_min", "every_15_min", "every_hour", "daily", "weekly", "monthly"], { message: "Fréquence invalide" }).optional(),
    batch_size: z.number().int({ message: "La taille du lot doit être un entier" }).min(1, { message: "La taille du lot doit être supérieure à 0" }).optional(),
    conflict_resolution: z.enum(["last_write", "first_write", "manual", "merge", "reject"], { message: "Résolution de conflit invalide" }),
  }).optional().nullable(),
  retry_config: z.object({
    strategy: z.enum(["none", "fixed", "exponential", "linear"], { message: "Stratégie de retry invalide" }),
    max_retries: z.number().int({ message: "Le nombre max de retries doit être un entier" }).min(0, { message: "Le nombre max de retries doit être positif" }),
    initial_delay_ms: z.number().int({ message: "Le délai initial doit être un entier" }).min(0, { message: "Le délai initial doit être positif" }),
    max_delay_ms: z.number().int({ message: "Le délai max doit être un entier" }).min(0, { message: "Le délai max doit être positif" }),
  }).optional().nullable(),
  rate_limit: z.object({
    enabled: z.boolean({ message: "Statut de limitation invalide" }),
    max_requests: z.number().int({ message: "Le nombre max de requêtes doit être un entier" }).min(1, { message: "Le nombre max de requêtes doit être supérieur à 0" }),
    window_ms: z.number().int({ message: "La fenêtre doit être un entier" }).min(1, { message: "La fenêtre doit être supérieure à 0" }),
  }).optional().nullable(),
  metadata: z.record(z.unknown()).optional(),
});
