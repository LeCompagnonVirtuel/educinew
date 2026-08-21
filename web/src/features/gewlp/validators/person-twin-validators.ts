import z from "zod";

export const CreatePersonTwinSchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  user_id: z.string().uuid({ message: "Identifiant de l'utilisateur invalide" }),
  twin_name: z.string().min(1, { message: "Le nom du jumeau est requis" }).max(255, { message: "Le nom du jumeau ne doit pas dépasser 255 caractères" }),
  twin_type: z.enum(["professional", "academic", "social", "skill_based", "career", "custom"], { message: "Type de jumeau invalide" }),
  status: z.enum(["active", "inactive", "draft", "archived"], { message: "Statut invalide" }).default("active"),
  personality_profile: z.object({
    openness: z.number().min(0, { message: "La valeur minimum est 0" }).max(1, { message: "La valeur maximum est 1" }).optional(),
    conscientiousness: z.number().min(0, { message: "La valeur minimum est 0" }).max(1, { message: "La valeur maximum est 1" }).optional(),
    extraversion: z.number().min(0, { message: "La valeur minimum est 0" }).max(1, { message: "La valeur maximum est 1" }).optional(),
    agreeableness: z.number().min(0, { message: "La valeur minimum est 0" }).max(1, { message: "La valeur maximum est 1" }).optional(),
    neuroticism: z.number().min(0, { message: "La valeur minimum est 0" }).max(1, { message: "La valeur maximum est 1" }).optional(),
  }).optional(),
  skill_snapshot: z.array(z.object({
    skill_id: z.string().uuid({ message: "Identifiant de compétence invalide" }),
    skill_name: z.string().min(1, { message: "Le nom de la compétence est requis" }),
    level: z.enum(["beginner", "elementary", "intermediate", "upper_intermediate", "advanced", "expert", "master"], { message: "Niveau invalide" }),
    confidence: z.number().min(0, { message: "La confiance minimum est 0" }).max(1, { message: "La confiance maximum est 1" }),
  })).optional(),
  career_goals: z.array(z.object({
    goal: z.string().min(1, { message: "L'objectif est requis" }).max(255, { message: "L'objectif ne doit pas dépasser 255 caractères" }),
    priority: z.enum(["high", "medium", "low"], { message: "Priorité invalide" }).default("medium"),
    target_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date cible invalide" }).optional(),
    status: z.enum(["active", "achieved", "abandoned", "paused"], { message: "Statut de l'objectif invalide" }).default("active"),
  })).optional(),
  learning_style: z.enum(["visual", "auditory", "kinesthetic", "reading_writing", "mixed"], { message: "Style d'apprentissage invalide" }).optional(),
  work_preferences: z.object({
    preferred_environment: z.enum(["office", "remote", "hybrid", "field", "any"], { message: "Environnement préféré invalide" }).optional(),
    preferred_hours: z.enum(["morning", "afternoon", "evening", "night", "flexible"], { message: "Horaires préférés invalides" }).optional(),
    team_size: z.enum(["solo", "small", "medium", "large"], { message: "Taille d'équipe invalide" }).optional(),
    travel_willingness: z.enum(["none", "limited", "moderate", "extensive"], { message: "Disponibilité aux déplacements invalide" }).optional(),
  }).optional(),
  ai_insights: z.record(z.unknown()).optional(),
  simulation_data: z.record(z.unknown()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdatePersonTwinSchema = z.object({
  twin_name: z.string().min(1, { message: "Le nom du jumeau est requis" }).max(255, { message: "Le nom du jumeau ne doit pas dépasser 255 caractères" }).optional(),
  twin_type: z.enum(["professional", "academic", "social", "skill_based", "career", "custom"], { message: "Type de jumeau invalide" }).optional(),
  status: z.enum(["active", "inactive", "draft", "archived"], { message: "Statut invalide" }).optional(),
  personality_profile: z.object({
    openness: z.number().min(0, { message: "La valeur minimum est 0" }).max(1, { message: "La valeur maximum est 1" }).optional(),
    conscientiousness: z.number().min(0, { message: "La valeur minimum est 0" }).max(1, { message: "La valeur maximum est 1" }).optional(),
    extraversion: z.number().min(0, { message: "La valeur minimum est 0" }).max(1, { message: "La valeur maximum est 1" }).optional(),
    agreeableness: z.number().min(0, { message: "La valeur minimum est 0" }).max(1, { message: "La valeur maximum est 1" }).optional(),
    neuroticism: z.number().min(0, { message: "La valeur minimum est 0" }).max(1, { message: "La valeur maximum est 1" }).optional(),
  }).optional(),
  skill_snapshot: z.array(z.object({
    skill_id: z.string().uuid({ message: "Identifiant de compétence invalide" }),
    skill_name: z.string().min(1, { message: "Le nom de la compétence est requis" }),
    level: z.enum(["beginner", "elementary", "intermediate", "upper_intermediate", "advanced", "expert", "master"], { message: "Niveau invalide" }),
    confidence: z.number().min(0, { message: "La confiance minimum est 0" }).max(1, { message: "La confiance maximum est 1" }),
  })).optional(),
  career_goals: z.array(z.object({
    goal: z.string().min(1, { message: "L'objectif est requis" }).max(255, { message: "L'objectif ne doit pas dépasser 255 caractères" }),
    priority: z.enum(["high", "medium", "low"], { message: "Priorité invalide" }).default("medium"),
    target_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date cible invalide" }).optional(),
    status: z.enum(["active", "achieved", "abandoned", "paused"], { message: "Statut de l'objectif invalide" }).default("active"),
  })).optional(),
  learning_style: z.enum(["visual", "auditory", "kinesthetic", "reading_writing", "mixed"], { message: "Style d'apprentissage invalide" }).optional(),
  work_preferences: z.object({
    preferred_environment: z.enum(["office", "remote", "hybrid", "field", "any"], { message: "Environnement préféré invalide" }).optional(),
    preferred_hours: z.enum(["morning", "afternoon", "evening", "night", "flexible"], { message: "Horaires préférés invalides" }).optional(),
    team_size: z.enum(["solo", "small", "medium", "large"], { message: "Taille d'équipe invalide" }).optional(),
    travel_willingness: z.enum(["none", "limited", "moderate", "extensive"], { message: "Disponibilité aux déplacements invalide" }).optional(),
  }).optional(),
  ai_insights: z.record(z.unknown()).optional(),
  simulation_data: z.record(z.unknown()).optional(),
  metadata: z.record(z.unknown()).optional(),
});
