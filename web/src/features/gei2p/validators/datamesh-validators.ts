import z from "zod";

export const CreateDataMeshSchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  name: z.string().min(1, { message: "Le nom est requis" }).max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }),
  description: z.string().max(2000, { message: "La description ne doit pas dépasser 2000 caractères" }).optional(),
  domain: z.enum(["academic", "administrative", "financial", "student", "staff", "operational", "strategic", "cross_functional"], { message: "Domaine invalide" }),
  domain_owner_id: z.string().uuid({ message: "Identifiant du propriétaire du domaine invalide" }),
  status: z.enum(["active", "inactive", "provisioning", "error", "maintenance"], { message: "Statut invalide" }).default("active"),
  data_products: z.array(z.object({
    name: z.string().min(1, { message: "Le nom du produit est requis" }),
    description: z.string().max(1000, { message: "La description ne doit pas dépasser 1000 caractères" }).optional(),
    type: z.enum(["dataset", "api", "dashboard", "report", "stream", "model"], { message: "Type de produit invalide" }),
    owner_id: z.string().uuid({ message: "Identifiant du propriétaire invalide" }),
    status: z.enum(["active", "inactive", "deprecated", "draft"], { message: "Statut du produit invalide" }).default("active"),
    sla: z.object({
      availability: z.number().min(0, { message: "La disponibilité doit être positive" }).max(100, { message: "La disponibilité ne peut pas dépasser 100" }),
      latency_ms: z.number().int({ message: "La latence doit être un entier" }).min(0, { message: "La latence doit être positive" }),
      freshness_hours: z.number().int({ message: "La fraîcheur doit être un entier" }).min(0, { message: "La fraîcheur doit être positive" }),
    }).optional(),
  })).optional(),
  infrastructure: z.object({
    storage_type: z.enum(["object", "database", "data_lake", "warehouse", "cache", "stream"], { message: "Type de stockage invalide" }),
    compute_type: z.enum(["batch", "streaming", "serverless", "container", "vm"], { message: "Type de calcul invalide" }),
    network_zone: z.enum(["public", "private", "hybrid", "edge"], { message: "Zone réseau invalide" }).default("private"),
    encryption: z.enum(["at_rest", "in_transit", "both", "none"], { message: "Type de chiffrement invalide" }).default("both"),
  }).optional(),
  governance: z.object({
    quality_monitoring: z.boolean({ message: "Surveillance de qualité invalide" }).default(true),
    lineage_tracking: z.boolean({ message: "Suivi de lignée invalide" }).default(true),
    access_control: z.enum(["role_based", "attribute_based", "mandatory", "discretionary", "hybrid"], { message: "Contrôle d'accès invalide" }).default("role_based"),
    data_catalog: z.boolean({ message: "Catalogue de données invalide" }).default(true),
  }).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateDataMeshSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }).max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }).optional(),
  description: z.string().max(2000, { message: "La description ne doit pas dépasser 2000 caractères" }).optional().nullable(),
  domain: z.enum(["academic", "administrative", "financial", "student", "staff", "operational", "strategic", "cross_functional"], { message: "Domaine invalide" }).optional(),
  domain_owner_id: z.string().uuid({ message: "Identifiant du propriétaire du domaine invalide" }).optional(),
  status: z.enum(["active", "inactive", "provisioning", "error", "maintenance"], { message: "Statut invalide" }).optional(),
  data_products: z.array(z.object({
    name: z.string().min(1, { message: "Le nom du produit est requis" }),
    description: z.string().max(1000, { message: "La description ne doit pas dépasser 1000 caractères" }).optional(),
    type: z.enum(["dataset", "api", "dashboard", "report", "stream", "model"], { message: "Type de produit invalide" }),
    owner_id: z.string().uuid({ message: "Identifiant du propriétaire invalide" }),
    status: z.enum(["active", "inactive", "deprecated", "draft"], { message: "Statut du produit invalide" }),
    sla: z.object({
      availability: z.number().min(0, { message: "La disponibilité doit être positive" }).max(100, { message: "La disponibilité ne peut pas dépasser 100" }),
      latency_ms: z.number().int({ message: "La latence doit être un entier" }).min(0, { message: "La latence doit être positive" }),
      freshness_hours: z.number().int({ message: "La fraîcheur doit être un entier" }).min(0, { message: "La fraîcheur doit être positive" }),
    }),
  })).optional(),
  infrastructure: z.object({
    storage_type: z.enum(["object", "database", "data_lake", "warehouse", "cache", "stream"], { message: "Type de stockage invalide" }),
    compute_type: z.enum(["batch", "streaming", "serverless", "container", "vm"], { message: "Type de calcul invalide" }),
    network_zone: z.enum(["public", "private", "hybrid", "edge"], { message: "Zone réseau invalide" }),
    encryption: z.enum(["at_rest", "in_transit", "both", "none"], { message: "Type de chiffrement invalide" }),
  }).optional().nullable(),
  governance: z.object({
    quality_monitoring: z.boolean({ message: "Surveillance de qualité invalide" }),
    lineage_tracking: z.boolean({ message: "Suivi de lignée invalide" }),
    access_control: z.enum(["role_based", "attribute_based", "mandatory", "discretionary", "hybrid"], { message: "Contrôle d'accès invalide" }),
    data_catalog: z.boolean({ message: "Catalogue de données invalide" }),
  }).optional().nullable(),
  metadata: z.record(z.unknown()).optional(),
});
