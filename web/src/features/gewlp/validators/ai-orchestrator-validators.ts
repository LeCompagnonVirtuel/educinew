import z from "zod";

export const CreateAIOrchestrationSchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  orchestrator_name: z.string().min(1, { message: "Le nom de l'orchestrateur est requis" }).max(255, { message: "Le nom de l'orchestrateur ne doit pas dépasser 255 caractères" }),
  orchestrator_type: z.enum(["skill_assessment", "career_matching", "talent_discovery", "credential_verification", "learning_recommendation", "workforce_planning", "custom"], { message: "Type d'orchestrateur invalide" }),
  status: z.enum(["active", "inactive", "draft", "testing", "error"], { message: "Statut invalide" }).default("draft"),
  ai_model: z.enum(["deepseek", "gemini", "custom"], { message: "Modèle IA invalide" }),
  configuration: z.object({
    temperature: z.number().min(0, { message: "La température minimum est 0" }).max(2, { message: "La température maximum est 2" }).default(0.7),
    max_tokens: z.number().int({ message: "Le nombre de tokens doit être un entier" }).min(1, { message: "Le minimum de tokens est 1" }).max(100000, { message: "Le maximum de tokens est 100000" }).default(4096),
    timeout: z.number().int({ message: "Le timeout doit être un entier" }).min(1, { message: "Le timeout minimum est 1 seconde" }).max(300, { message: "Le timeout maximum est 300 secondes" }).default(30),
    retry_count: z.number().int({ message: "Le nombre de tentatives doit être un entier" }).min(0, { message: "Le minimum de tentatives est 0" }).max(5, { message: "Le maximum de tentatives est 5" }).default(3),
  }).optional(),
  input_schema: z.record(z.unknown()).optional(),
  output_schema: z.record(z.unknown()).optional(),
  pipeline_steps: z.array(z.object({
    step_name: z.string().min(1, { message: "Le nom de l'étape est requis" }).max(100, { message: "Le nom de l'étape ne doit pas dépasser 100 caractères" }),
    step_type: z.enum(["preprocess", "analyze", "transform", "validate", "postprocess"], { message: "Type d'étape invalide" }),
    configuration: z.record(z.unknown()).optional(),
    order: z.number().int({ message: "L'ordre doit être un entier" }).min(1, { message: "L'ordre minimum est 1" }),
  })).optional(),
  access_roles: z.array(z.string()).min(1, { message: "Au moins un rôle d'accès est requis" }),
  rate_limit: z.object({
    requests_per_minute: z.number().int({ message: "Le nombre de requêtes doit être un entier" }).min(1, { message: "Le minimum est 1" }).max(10000, { message: "Le maximum est 10000" }).default(60),
    requests_per_hour: z.number().int({ message: "Le nombre de requêtes doit être un entier" }).min(1, { message: "Le minimum est 1" }).max(100000, { message: "Le maximum est 100000" }).default(1000),
  }).optional(),
  cache_config: z.object({
    enabled: z.boolean({ message: "Activé/désactivé invalide" }).default(false),
    ttl: z.number().int({ message: "Le TTL doit être un entier" }).min(60, { message: "Le TTL minimum est 60 secondes" }).max(86400, { message: "Le TTL maximum est 86400 secondes" }).default(3600),
  }).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateAIOrchestrationSchema = z.object({
  orchestrator_name: z.string().min(1, { message: "Le nom de l'orchestrateur est requis" }).max(255, { message: "Le nom de l'orchestrateur ne doit pas dépasser 255 caractères" }).optional(),
  orchestrator_type: z.enum(["skill_assessment", "career_matching", "talent_discovery", "credential_verification", "learning_recommendation", "workforce_planning", "custom"], { message: "Type d'orchestrateur invalide" }).optional(),
  status: z.enum(["active", "inactive", "draft", "testing", "error"], { message: "Statut invalide" }).optional(),
  ai_model: z.enum(["deepseek", "gemini", "custom"], { message: "Modèle IA invalide" }).optional(),
  configuration: z.object({
    temperature: z.number().min(0, { message: "La température minimum est 0" }).max(2, { message: "La température maximum est 2" }).default(0.7),
    max_tokens: z.number().int({ message: "Le nombre de tokens doit être un entier" }).min(1, { message: "Le minimum de tokens est 1" }).max(100000, { message: "Le maximum de tokens est 100000" }).default(4096),
    timeout: z.number().int({ message: "Le timeout doit être un entier" }).min(1, { message: "Le timeout minimum est 1 seconde" }).max(300, { message: "Le timeout maximum est 300 secondes" }).default(30),
    retry_count: z.number().int({ message: "Le nombre de tentatives doit être un entier" }).min(0, { message: "Le minimum de tentatives est 0" }).max(5, { message: "Le maximum de tentatives est 5" }).default(3),
  }).optional(),
  input_schema: z.record(z.unknown()).optional(),
  output_schema: z.record(z.unknown()).optional(),
  pipeline_steps: z.array(z.object({
    step_name: z.string().min(1, { message: "Le nom de l'étape est requis" }).max(100, { message: "Le nom de l'étape ne doit pas dépasser 100 caractères" }),
    step_type: z.enum(["preprocess", "analyze", "transform", "validate", "postprocess"], { message: "Type d'étape invalide" }),
    configuration: z.record(z.unknown()).optional(),
    order: z.number().int({ message: "L'ordre doit être un entier" }).min(1, { message: "L'ordre minimum est 1" }),
  })).optional(),
  access_roles: z.array(z.string()).min(1, { message: "Au moins un rôle d'accès est requis" }).optional(),
  rate_limit: z.object({
    requests_per_minute: z.number().int({ message: "Le nombre de requêtes doit être un entier" }).min(1, { message: "Le minimum est 1" }).max(10000, { message: "Le maximum est 10000" }).default(60),
    requests_per_hour: z.number().int({ message: "Le nombre de requêtes doit être un entier" }).min(1, { message: "Le minimum est 1" }).max(100000, { message: "Le maximum est 100000" }).default(1000),
  }).optional(),
  cache_config: z.object({
    enabled: z.boolean({ message: "Activé/désactivé invalide" }).default(false),
    ttl: z.number().int({ message: "Le TTL doit être un entier" }).min(60, { message: "Le TTL minimum est 60 secondes" }).max(86400, { message: "Le TTL maximum est 86400 secondes" }).default(3600),
  }).optional(),
  metadata: z.record(z.unknown()).optional(),
});
