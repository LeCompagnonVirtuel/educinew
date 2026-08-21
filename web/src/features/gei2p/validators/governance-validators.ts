import z from "zod";

export const CreateDataGovernanceSchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  name: z.string().min(1, { message: "Le nom est requis" }).max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }),
  description: z.string().max(2000, { message: "La description ne doit pas dépasser 2000 caractères" }).optional(),
  policy_type: z.enum(["access", "retention", "quality", "security", "privacy", "compliance", "lifecycle", "classification"], { message: "Type de politique invalide" }),
  status: z.enum(["draft", "active", "archived", "under_review", "suspended"], { message: "Statut invalide" }).default("draft"),
  owner_id: z.string().uuid({ message: "Identifiant du propriétaire invalide" }),
  data_domain: z.enum(["academic", "administrative", "financial", "student", "staff", "operational", "strategic", "all"], { message: "Domaine de données invalide" }),
  classification_level: z.enum(["public", "internal", "confidential", "restricted", "top_secret"], { message: "Niveau de classification invalide" }),
  retention_period_days: z.number().int({ message: "La période de rétention doit être un entier" }).min(0, { message: "La période de rétention ne peut pas être négative" }).default(365),
  access_rules: z.array(z.object({
    role: z.string().min(1, { message: "Le rôle est requis" }),
    permission: z.enum(["read", "write", "delete", "admin", "none"], { message: "Permission invalide" }),
    conditions: z.record(z.unknown()).optional(),
  })).optional(),
  quality_rules: z.array(z.object({
    rule_name: z.string().min(1, { message: "Le nom de la règle est requis" }),
    rule_type: z.enum(["completeness", "accuracy", "consistency", "timeliness", "validity", "uniqueness"], { message: "Type de règle invalide" }),
    threshold: z.number().min(0, { message: "Le seuil doit être positif" }).max(100, { message: "Le seuil ne peut pas dépasser 100" }),
    action: z.enum(["alert", "block", "quarantine", "log"], { message: "Action invalide" }),
  })).optional(),
  compliance_frameworks: z.array(z.enum(["gdpr", "ferpa", "coppa", "hipaa", "iso27001", "local_regulation", "custom"])).optional(),
  effective_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date d'entrée en vigueur invalide" }).optional(),
  review_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de révision invalide" }).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateDataGovernanceSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }).max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }).optional(),
  description: z.string().max(2000, { message: "La description ne doit pas dépasser 2000 caractères" }).optional().nullable(),
  policy_type: z.enum(["access", "retention", "quality", "security", "privacy", "compliance", "lifecycle", "classification"], { message: "Type de politique invalide" }).optional(),
  status: z.enum(["draft", "active", "archived", "under_review", "suspended"], { message: "Statut invalide" }).optional(),
  owner_id: z.string().uuid({ message: "Identifiant du propriétaire invalide" }).optional(),
  data_domain: z.enum(["academic", "administrative", "financial", "student", "staff", "operational", "strategic", "all"], { message: "Domaine de données invalide" }).optional(),
  classification_level: z.enum(["public", "internal", "confidential", "restricted", "top_secret"], { message: "Niveau de classification invalide" }).optional(),
  retention_period_days: z.number().int({ message: "La période de rétention doit être un entier" }).min(0, { message: "La période de rétention ne peut pas être négative" }).optional(),
  access_rules: z.array(z.object({
    role: z.string().min(1, { message: "Le rôle est requis" }),
    permission: z.enum(["read", "write", "delete", "admin", "none"], { message: "Permission invalide" }),
    conditions: z.record(z.unknown()).optional(),
  })).optional(),
  quality_rules: z.array(z.object({
    rule_name: z.string().min(1, { message: "Le nom de la règle est requis" }),
    rule_type: z.enum(["completeness", "accuracy", "consistency", "timeliness", "validity", "uniqueness"], { message: "Type de règle invalide" }),
    threshold: z.number().min(0, { message: "Le seuil doit être positif" }).max(100, { message: "Le seuil ne peut pas dépasser 100" }),
    action: z.enum(["alert", "block", "quarantine", "log"], { message: "Action invalide" }),
  })).optional(),
  compliance_frameworks: z.array(z.enum(["gdpr", "ferpa", "coppa", "hipaa", "iso27001", "local_regulation", "custom"])).optional(),
  effective_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date d'entrée en vigueur invalide" }).optional().nullable(),
  review_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de révision invalide" }).optional().nullable(),
  metadata: z.record(z.unknown()).optional(),
});
