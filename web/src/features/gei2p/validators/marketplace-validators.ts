import z from "zod";

export const CreateInteroperabilityMarketplaceSchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  provider_id: z.string().uuid({ message: "Identifiant du fournisseur invalide" }),
  name: z.string().min(1, { message: "Le nom est requis" }).max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }),
  description: z.string().min(1, { message: "La description est requise" }).max(5000, { message: "La description ne doit pas dépasser 5000 caractères" }),
  category: z.enum(["connector", "plugin", "integration", "template", "workflow", "dataset", "api", "tool", "other"], { message: "Catégorie invalide" }),
  type: z.enum(["free", "freemium", "paid", "subscription", "enterprise"], { message: "Type de tarification invalide" }),
  price: z.number().min(0, { message: "Le prix doit être positif" }).max(999999999, { message: "Le prix est trop élevé" }).default(0),
  currency: z.string().length(3, { message: "La devise doit contenir 3 caractères" }).default("XOF"),
  status: z.enum(["draft", "active", "paused", "archived", "suspended"], { message: "Statut invalide" }).default("draft"),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, { message: "Version invalide (format: X.Y.Z)" }),
  compatibility: z.array(z.string().min(1, { message: "La compatibilité est requise" })).min(1, { message: "Au moins une compatibilité est requise" }),
  tags: z.array(z.string()).max(20, { message: "Maximum 20 tags" }).optional(),
  documentation_url: z.string().url({ message: "URL de documentation invalide" }).optional(),
  support_email: z.string().email({ message: "Email de support invalide" }).optional(),
  downloads: z.number().int({ message: "Le nombre de téléchargements doit être un entier" }).min(0, { message: "Le nombre de téléchargements ne peut pas être négatif" }).default(0),
  rating: z.number().min(0, { message: "La note minimum est 0" }).max(5, { message: "La note maximum est 5" }).optional(),
  total_reviews: z.number().int({ message: "Le nombre d'avis doit être un entier" }).min(0, { message: "Le nombre d'avis ne peut pas être négatif" }).default(0),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateInteroperabilityMarketplaceSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }).max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }).optional(),
  description: z.string().min(1, { message: "La description est requise" }).max(5000, { message: "La description ne doit pas dépasser 5000 caractères" }).optional(),
  category: z.enum(["connector", "plugin", "integration", "template", "workflow", "dataset", "api", "tool", "other"], { message: "Catégorie invalide" }).optional(),
  type: z.enum(["free", "freemium", "paid", "subscription", "enterprise"], { message: "Type de tarification invalide" }).optional(),
  price: z.number().min(0, { message: "Le prix doit être positif" }).max(999999999, { message: "Le prix est trop élevé" }).optional(),
  currency: z.string().length(3, { message: "La devise doit contenir 3 caractères" }).optional(),
  status: z.enum(["draft", "active", "paused", "archived", "suspended"], { message: "Statut invalide" }).optional(),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, { message: "Version invalide (format: X.Y.Z)" }).optional(),
  compatibility: z.array(z.string().min(1, { message: "La compatibilité est requise" })).min(1, { message: "Au moins une compatibilité est requise" }).optional(),
  tags: z.array(z.string()).max(20, { message: "Maximum 20 tags" }).optional(),
  documentation_url: z.string().url({ message: "URL de documentation invalide" }).optional().nullable(),
  support_email: z.string().email({ message: "Email de support invalide" }).optional().nullable(),
  metadata: z.record(z.unknown()).optional(),
});
