import z from "zod";

export const CreateDigitalCredentialSchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  user_id: z.string().uuid({ message: "Identifiant de l'utilisateur invalide" }),
  credential_type: z.enum(["diploma", "certificate", "badge", "transcript", "license", "portfolio", "skill", "attendance", "award", "micro_credential", "other"], { message: "Type de credential invalide" }),
  title: z.string().min(1, { message: "Le titre est requis" }).max(255, { message: "Le titre ne doit pas dépasser 255 caractères" }),
  description: z.string().max(2000, { message: "La description ne doit pas dépasser 2000 caractères" }).optional(),
  issuer: z.string().min(1, { message: "L'émetteur est requis" }).max(255, { message: "L'émetteur ne doit pas dépasser 255 caractères" }),
  issuance_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de délivrance invalide" }),
  expiry_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date d'expiration invalide" }).optional(),
  status: z.enum(["active", "revoked", "expired", "pending", "suspended"], { message: "Statut invalide" }).default("active"),
  format: z.enum(["vc_jwt", "vc_json", "open_badge", "europass", "custom"], { message: "Format de credential invalide" }),
  skills_validated: z.array(z.string().uuid({ message: "Identifiant de compétence invalide" })).optional(),
  proof: z.object({
    type: z.string().min(1, { message: "Le type de preuve est requis" }),
    created: z.string().regex(/^\d{4}-\d{2}-\d{2}T/, { message: "Date de création invalide" }),
    verification_method: z.string().min(1, { message: "La méthode de vérification est requise" }),
    proof_value: z.string().min(1, { message: "La valeur de la preuve est requise" }),
  }).optional(),
  blockchain_hash: z.string().max(255, { message: "Le hash blockchain ne doit pas dépasser 255 caractères" }).optional(),
  verification_url: z.string().url({ message: "URL de vérification invalide" }).optional(),
  claims: z.record(z.unknown()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateDigitalCredentialSchema = z.object({
  credential_type: z.enum(["diploma", "certificate", "badge", "transcript", "license", "portfolio", "skill", "attendance", "award", "micro_credential", "other"], { message: "Type de credential invalide" }).optional(),
  title: z.string().min(1, { message: "Le titre est requis" }).max(255, { message: "Le titre ne doit pas dépasser 255 caractères" }).optional(),
  description: z.string().max(2000, { message: "La description ne doit pas dépasser 2000 caractères" }).optional().nullable(),
  issuer: z.string().min(1, { message: "L'émetteur est requis" }).max(255, { message: "L'émetteur ne doit pas dépasser 255 caractères" }).optional(),
  issuance_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de délivrance invalide" }).optional(),
  expiry_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date d'expiration invalide" }).optional().nullable(),
  status: z.enum(["active", "revoked", "expired", "pending", "suspended"], { message: "Statut invalide" }).optional(),
  format: z.enum(["vc_jwt", "vc_json", "open_badge", "europass", "custom"], { message: "Format de credential invalide" }).optional(),
  skills_validated: z.array(z.string().uuid({ message: "Identifiant de compétence invalide" })).optional(),
  proof: z.object({
    type: z.string().min(1, { message: "Le type de preuve est requis" }),
    created: z.string().regex(/^\d{4}-\d{2}-\d{2}T/, { message: "Date de création invalide" }),
    verification_method: z.string().min(1, { message: "La méthode de vérification est requise" }),
    proof_value: z.string().min(1, { message: "La valeur de la preuve est requise" }),
  }).optional().nullable(),
  blockchain_hash: z.string().max(255, { message: "Le hash blockchain ne doit pas dépasser 255 caractères" }).optional().nullable(),
  verification_url: z.string().url({ message: "URL de vérification invalide" }).optional().nullable(),
  claims: z.record(z.unknown()).optional(),
  metadata: z.record(z.unknown()).optional(),
});
