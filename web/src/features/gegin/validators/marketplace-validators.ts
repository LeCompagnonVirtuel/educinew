import z from "zod";

export const CreateMarketplaceSchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  seller_id: z.string().uuid({ message: "Identifiant du vendeur invalide" }),
  name: z.string().min(1, { message: "Le nom est requis" }).max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }),
  description: z.string().min(1, { message: "La description est requise" }).max(5000, { message: "La description ne doit pas dépasser 5000 caractères" }),
  type: z.enum(["product", "service", "digital", "subscription", "other"], { message: "Type d'article invalide" }),
  category: z.enum(["books", "supplies", "uniforms", "technology", "tutoring", "courses", "events", "other"], { message: "Catégorie invalide" }),
  price: z.number().min(0, { message: "Le prix doit être positif" }).max(999999999, { message: "Le prix est trop élevé" }),
  currency: z.string().length(3, { message: "La devise doit contenir 3 caractères" }).default("XOF"),
  stock_quantity: z.number().int({ message: "La quantité doit être un nombre entier" }).min(0, { message: "La quantité ne peut pas être négative" }).optional(),
  is_unlimited_stock: z.boolean({ message: "Statut de stock illimité invalide" }).default(false),
  status: z.enum(["draft", "active", "paused", "sold_out", "archived"], { message: "Statut invalide" }).default("draft"),
  images: z.array(z.string().url({ message: "URL d'image invalide" })).min(1, { message: "Au moins une image est requise" }),
  tags: z.array(z.string()).max(20, { message: "Maximum 20 tags" }).optional(),
  rating: z.number().min(0, { message: "La note minimum est 0" }).max(5, { message: "La note maximum est 5" }).optional(),
  total_sales: z.number().int({ message: "Le nombre de ventes doit être un entier" }).min(0, { message: "Le nombre de ventes ne peut pas être négatif" }).default(0),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateMarketplaceSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }).max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }).optional(),
  description: z.string().min(1, { message: "La description est requise" }).max(5000, { message: "La description ne doit pas dépasser 5000 caractères" }).optional(),
  type: z.enum(["product", "service", "digital", "subscription", "other"], { message: "Type d'article invalide" }).optional(),
  category: z.enum(["books", "supplies", "uniforms", "technology", "tutoring", "courses", "events", "other"], { message: "Catégorie invalide" }).optional(),
  price: z.number().min(0, { message: "Le prix doit être positif" }).max(999999999, { message: "Le prix est trop élevé" }).optional(),
  currency: z.string().length(3, { message: "La devise doit contenir 3 caractères" }).optional(),
  stock_quantity: z.number().int({ message: "La quantité doit être un nombre entier" }).min(0, { message: "La quantité ne peut pas être négative" }).optional().nullable(),
  is_unlimited_stock: z.boolean({ message: "Statut de stock illimité invalide" }).optional(),
  status: z.enum(["draft", "active", "paused", "sold_out", "archived"], { message: "Statut invalide" }).optional(),
  images: z.array(z.string().url({ message: "URL d'image invalide" })).min(1, { message: "Au moins une image est requise" }).optional(),
  tags: z.array(z.string()).max(20, { message: "Maximum 20 tags" }).optional(),
  metadata: z.record(z.unknown()).optional(),
});
