import z from "zod";

export const CreateGlobalIdentitySchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  user_id: z.string().uuid({ message: "Identifiant de l'utilisateur invalide" }),
  identity_type: z.enum(["national", "international", "digital", "biometric", "federated", "anonymous"], { message: "Type d'identité invalide" }),
  status: z.enum(["active", "inactive", "pending", "suspended", "revoked", "expired"], { message: "Statut invalide" }).default("active"),
  issuer: z.string().min(1, { message: "L'émetteur est requis" }).max(255, { message: "L'émetteur ne doit pas dépasser 255 caractères" }),
  issuer_country: z.string().length(2, { message: "Le code pays doit contenir 2 caractères" }),
  format: z.enum(["did", "jwt", "vc", "json", "xml", "cbor"], { message: "Format d'identité invalide" }),
  public_key: z.string().min(1, { message: "La clé publique est requise" }).max(2000, { message: "La clé publique ne doit pas dépasser 2000 caractères" }).optional(),
  verification_method: z.enum(["document", "biometric", "knowledge", "social", "digital", "hybrid"], { message: "Méthode de vérification invalide" }),
  expiry_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date d'expiration invalide" }).optional(),
  trust_level: z.enum(["low", "medium", "high", "very_high"], { message: "Niveau de confiance invalide" }).default("medium"),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateGlobalIdentitySchema = z.object({
  identity_type: z.enum(["national", "international", "digital", "biometric", "federated", "anonymous"], { message: "Type d'identité invalide" }).optional(),
  status: z.enum(["active", "inactive", "pending", "suspended", "revoked", "expired"], { message: "Statut invalide" }).optional(),
  issuer: z.string().min(1, { message: "L'émetteur est requis" }).max(255, { message: "L'émetteur ne doit pas dépasser 255 caractères" }).optional(),
  issuer_country: z.string().length(2, { message: "Le code pays doit contenir 2 caractères" }).optional(),
  format: z.enum(["did", "jwt", "vc", "json", "xml", "cbor"], { message: "Format d'identité invalide" }).optional(),
  public_key: z.string().min(1, { message: "La clé publique est requise" }).max(2000, { message: "La clé publique ne doit pas dépasser 2000 caractères" }).optional().nullable(),
  verification_method: z.enum(["document", "biometric", "knowledge", "social", "digital", "hybrid"], { message: "Méthode de vérification invalide" }).optional(),
  expiry_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date d'expiration invalide" }).optional().nullable(),
  trust_level: z.enum(["low", "medium", "high", "very_high"], { message: "Niveau de confiance invalide" }).optional(),
  metadata: z.record(z.unknown()).optional(),
});
