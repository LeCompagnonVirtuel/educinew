import z from "zod";

export const CreateDigitalTwinSchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  name: z.string().min(1, { message: "Le nom est requis" }).max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }),
  description: z.string().max(2000, { message: "La description ne doit pas dépasser 2000 caractères" }).optional(),
  type: z.enum(["building", "campus", "classroom", "lab", "library", "sports", "infrastructure", "other"], { message: "Type de jumeau numérique invalide" }),
  status: z.enum(["active", "maintenance", "decommissioned", "planned"], { message: "Statut invalide" }).default("active"),
  physical_location: z.string().max(255, { message: "L'emplacement physique ne doit pas dépasser 255 caractères" }).optional(),
  capacity: z.number().int({ message: "La capacité doit être un nombre entier" }).min(0, { message: "La capacité ne peut pas être négative" }).optional(),
  current_occupancy: z.number().int({ message: "L'occupation actuelle doit être un nombre entier" }).min(0, { message: "L'occupation actuelle ne peut pas être négative" }).optional(),
  sensors: z.array(z.object({
    sensor_id: z.string().max(100, { message: "L'identifiant du capteur ne doit pas dépasser 100 caractères" }),
    type: z.enum(["temperature", "humidity", "co2", "light", "occupancy", "energy", "noise", "other"], { message: "Type de capteur invalide" }),
    location: z.string().max(255, { message: "L'emplacement du capteur ne doit pas dépasser 255 caractères" }).optional(),
    status: z.enum(["active", "inactive", "error"], { message: "Statut du capteur invalide" }).default("active"),
  })).optional(),
  energy_config: z.object({
    max_consumption_kwh: z.number().min(0, { message: "La consommation maximale doit être positive" }).optional(),
    renewable_percentage: z.number().min(0, { message: "Le pourcentage minimum est 0" }).max(100, { message: "Le pourcentage maximum est 100" }).optional(),
    monitoring_enabled: z.boolean().default(false),
  }).optional(),
  access_config: z.object({
    opening_hours: z.string().max(100, { message: "Les horaires ne doivent pas dépasser 100 caractères" }).optional(),
    access_restriction: z.enum(["open", "restricted", "restricted_hours", "key_card"], { message: "Restriction d'accès invalide" }).optional(),
    allowed_roles: z.array(z.string()).optional(),
  }).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateDigitalTwinSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }).max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }).optional(),
  description: z.string().max(2000, { message: "La description ne doit pas dépasser 2000 caractères" }).optional().nullable(),
  type: z.enum(["building", "campus", "classroom", "lab", "library", "sports", "infrastructure", "other"], { message: "Type de jumeau numérique invalide" }).optional(),
  status: z.enum(["active", "maintenance", "decommissioned", "planned"], { message: "Statut invalide" }).optional(),
  physical_location: z.string().max(255, { message: "L'emplacement physique ne doit pas dépasser 255 caractères" }).optional().nullable(),
  capacity: z.number().int({ message: "La capacité doit être un nombre entier" }).min(0, { message: "La capacité ne peut pas être négative" }).optional().nullable(),
  current_occupancy: z.number().int({ message: "L'occupation actuelle doit être un nombre entier" }).min(0, { message: "L'occupation actuelle ne peut pas être négative" }).optional().nullable(),
  sensors: z.array(z.object({
    sensor_id: z.string().max(100, { message: "L'identifiant du capteur ne doit pas dépasser 100 caractères" }),
    type: z.enum(["temperature", "humidity", "co2", "light", "occupancy", "energy", "noise", "other"], { message: "Type de capteur invalide" }),
    location: z.string().max(255, { message: "L'emplacement du capteur ne doit pas dépasser 255 caractères" }).optional(),
    status: z.enum(["active", "inactive", "error"], { message: "Statut du capteur invalide" }).default("active"),
  })).optional(),
  energy_config: z.object({
    max_consumption_kwh: z.number().min(0, { message: "La consommation maximale doit être positive" }).optional().nullable(),
    renewable_percentage: z.number().min(0, { message: "Le pourcentage minimum est 0" }).max(100, { message: "Le pourcentage maximum est 100" }).optional().nullable(),
    monitoring_enabled: z.boolean().default(false),
  }).optional(),
  access_config: z.object({
    opening_hours: z.string().max(100, { message: "Les horaires ne doivent pas dépasser 100 caractères" }).optional().nullable(),
    access_restriction: z.enum(["open", "restricted", "restricted_hours", "key_card"], { message: "Restriction d'accès invalide" }).optional(),
    allowed_roles: z.array(z.string()).optional(),
  }).optional(),
  metadata: z.record(z.unknown()).optional(),
});
