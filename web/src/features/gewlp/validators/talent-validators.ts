import z from "zod";

export const CreateTalentPoolSchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  user_id: z.string().uuid({ message: "Identifiant de l'utilisateur invalide" }),
  talent_name: z.string().min(1, { message: "Le nom du talent est requis" }).max(255, { message: "Le nom du talent ne doit pas dépasser 255 caractères" }),
  talent_category: z.enum(["academic", "technical", "creative", "leadership", "athletic", "artistic", "scientific", "entrepreneurial", "other"], { message: "Catégorie de talent invalide" }),
  strength_areas: z.array(z.string().min(1, { message: "La zone de force est requise" })).min(1, { message: "Au moins une zone de force est requise" }),
  availability: z.enum(["available", "busy", "unavailable", "conditional"], { message: "Disponibilité invalide" }).default("available"),
  preferred_opportunities: z.array(z.enum(["internship", "job", "project", "research", "mentorship", "volunteer", "other"], { message: "Type d'opportunité invalide" })).optional(),
  rating: z.number().min(0, { message: "La note minimum est 0" }).max(5, { message: "La note maximum est 5" }).optional(),
  achievements: z.array(z.object({
    title: z.string().min(1, { message: "Le titre de la réalisation est requis" }).max(255, { message: "Le titre ne doit pas dépasser 255 caractères" }),
    description: z.string().max(1000, { message: "La description ne doit pas dépasser 1000 caractères" }).optional(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date invalide" }).optional(),
    category: z.string().max(100, { message: "La catégorie ne doit pas dépasser 100 caractères" }).optional(),
  })).optional(),
  recommendations: z.array(z.object({
    recommender_id: z.string().uuid({ message: "Identifiant du recommandeur invalide" }),
    recommender_name: z.string().min(1, { message: "Le nom du recommandeur est requis" }),
    comment: z.string().max(500, { message: "Le commentaire ne doit pas dépasser 500 caractères" }),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date invalide" }),
  })).optional(),
  portfolio_url: z.string().url({ message: "URL du portfolio invalide" }).optional(),
  linkedin_url: z.string().url({ message: "URL LinkedIn invalide" }).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateTalentPoolSchema = z.object({
  talent_name: z.string().min(1, { message: "Le nom du talent est requis" }).max(255, { message: "Le nom du talent ne doit pas dépasser 255 caractères" }).optional(),
  talent_category: z.enum(["academic", "technical", "creative", "leadership", "athletic", "artistic", "scientific", "entrepreneurial", "other"], { message: "Catégorie de talent invalide" }).optional(),
  strength_areas: z.array(z.string().min(1, { message: "La zone de force est requise" })).min(1, { message: "Au moins une zone de force est requise" }).optional(),
  availability: z.enum(["available", "busy", "unavailable", "conditional"], { message: "Disponibilité invalide" }).optional(),
  preferred_opportunities: z.array(z.enum(["internship", "job", "project", "research", "mentorship", "volunteer", "other"], { message: "Type d'opportunité invalide" })).optional(),
  rating: z.number().min(0, { message: "La note minimum est 0" }).max(5, { message: "La note maximum est 5" }).optional(),
  achievements: z.array(z.object({
    title: z.string().min(1, { message: "Le titre de la réalisation est requis" }).max(255, { message: "Le titre ne doit pas dépasser 255 caractères" }),
    description: z.string().max(1000, { message: "La description ne doit pas dépasser 1000 caractères" }).optional(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date invalide" }).optional(),
    category: z.string().max(100, { message: "La catégorie ne doit pas dépasser 100 caractères" }).optional(),
  })).optional(),
  recommendations: z.array(z.object({
    recommender_id: z.string().uuid({ message: "Identifiant du recommandeur invalide" }),
    recommender_name: z.string().min(1, { message: "Le nom du recommandeur est requis" }),
    comment: z.string().max(500, { message: "Le commentaire ne doit pas dépasser 500 caractères" }),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date invalide" }),
  })).optional(),
  portfolio_url: z.string().url({ message: "URL du portfolio invalide" }).optional().nullable(),
  linkedin_url: z.string().url({ message: "URL LinkedIn invalide" }).optional().nullable(),
  metadata: z.record(z.unknown()).optional(),
});
