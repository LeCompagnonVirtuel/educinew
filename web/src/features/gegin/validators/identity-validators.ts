import z from "zod";

export const CreateIdentitySchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  user_id: z.string().uuid({ message: "Identifiant de l'utilisateur invalide" }),
  national_id: z.string().min(5, { message: "Le numéro national est requis" }).max(50, { message: "Le numéro national ne doit pas dépasser 50 caractères" }).optional(),
  national_id_type: z.enum(["national_id", "passport", "birth_certificate", "other"], { message: "Type de pièce d'identité invalide" }).optional(),
  nationality: z.string().min(2, { message: "La nationalité est requise" }).max(100, { message: "La nationalité ne doit pas dépasser 100 caractères" }).optional(),
  date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de naissance invalide" }).optional(),
  place_of_birth: z.string().max(255, { message: "Le lieu de naissance ne doit pas dépasser 255 caractères" }).optional(),
  gender: z.enum(["male", "female", "other", "undisclosed"], { message: "Genre invalide" }).optional(),
  blood_type: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "unknown"], { message: "Groupe sanguin invalide" }).optional(),
  emergency_contact_name: z.string().max(255, { message: "Le nom du contact d'urgence ne doit pas dépasser 255 caractères" }).optional(),
  emergency_contact_phone: z.string().max(20, { message: "Le téléphone du contact d'urgence ne doit pas dépasser 20 caractères" }).optional(),
  emergency_contact_relationship: z.string().max(100, { message: "La relation ne doit pas dépasser 100 caractères" }).optional(),
  photo_url: z.string().url({ message: "URL de photo invalide" }).optional(),
  biometric_hash: z.string().max(500, { message: "Le hash biométrique ne doit pas dépasser 500 caractères" }).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateIdentitySchema = z.object({
  national_id: z.string().min(5, { message: "Le numéro national est requis" }).max(50, { message: "Le numéro national ne doit pas dépasser 50 caractères" }).optional().nullable(),
  national_id_type: z.enum(["national_id", "passport", "birth_certificate", "other"], { message: "Type de pièce d'identité invalide" }).optional(),
  nationality: z.string().min(2, { message: "La nationalité est requise" }).max(100, { message: "La nationalité ne doit pas dépasser 100 caractères" }).optional().nullable(),
  date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de naissance invalide" }).optional().nullable(),
  place_of_birth: z.string().max(255, { message: "Le lieu de naissance ne doit pas dépasser 255 caractères" }).optional().nullable(),
  gender: z.enum(["male", "female", "other", "undisclosed"], { message: "Genre invalide" }).optional(),
  blood_type: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "unknown"], { message: "Groupe sanguin invalide" }).optional(),
  emergency_contact_name: z.string().max(255, { message: "Le nom du contact d'urgence ne doit pas dépasser 255 caractères" }).optional().nullable(),
  emergency_contact_phone: z.string().max(20, { message: "Le téléphone du contact d'urgence ne doit pas dépasser 20 caractères" }).optional().nullable(),
  emergency_contact_relationship: z.string().max(100, { message: "La relation ne doit pas dépasser 100 caractères" }).optional().nullable(),
  photo_url: z.string().url({ message: "URL de photo invalide" }).optional().nullable(),
  biometric_hash: z.string().max(500, { message: "Le hash biométrique ne doit pas dépasser 500 caractères" }).optional().nullable(),
  metadata: z.record(z.unknown()).optional(),
});
