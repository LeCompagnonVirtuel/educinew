import z from "zod";

export const CreateCorporatePartnershipSchema = z.object({
  school_id: z.string().uuid({ message: "Identifiant de l'école invalide" }),
  company_name: z.string().min(1, { message: "Le nom de l'entreprise est requis" }).max(255, { message: "Le nom de l'entreprise ne doit pas dépasser 255 caractères" }),
  company_sector: z.enum(["technology", "finance", "health", "education", "industry", "agriculture", "energy", "telecommunications", "construction", "retail", "other"], { message: "Secteur de l'entreprise invalide" }),
  partnership_type: z.enum(["internship", "apprenticeship", "recruitment", "training", "research", "sponsorship", "mentorship", "project", "other"], { message: "Type de partenariat invalide" }),
  contact_person: z.string().min(1, { message: "La personne de contact est requise" }).max(255, { message: "La personne de contact ne doit pas dépasser 255 caractères" }),
  contact_email: z.string().email({ message: "Email de contact invalide" }),
  contact_phone: z.string().max(20, { message: "Le téléphone ne doit pas dépasser 20 caractères" }).optional(),
  status: z.enum(["active", "inactive", "pending", "expired", "terminated"], { message: "Statut invalide" }).default("pending"),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de début invalide" }),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de fin invalide" }).optional(),
  opportunities: z.array(z.object({
    title: z.string().min(1, { message: "Le titre de l'opportunité est requis" }).max(255, { message: "Le titre ne doit pas dépasser 255 caractères" }),
    type: z.enum(["internship", "job", "project", "training", "research", "other"], { message: "Type d'opportunité invalide" }),
    description: z.string().max(2000, { message: "La description ne doit pas dépasser 2000 caractères" }).optional(),
    positions_available: z.number().int({ message: "Le nombre de places doit être un entier" }).min(1, { message: "Au moins une place est requise" }).optional(),
    deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date limite invalide" }).optional(),
    status: z.enum(["open", "closed", "full"], { message: "Statut de l'opportunité invalide" }).default("open"),
  })).optional(),
  agreement_documents: z.array(z.string().url({ message: "URL de document invalide" })).optional(),
  notes: z.string().max(5000, { message: "Les notes ne doivent pas dépasser 5000 caractères" }).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateCorporatePartnershipSchema = z.object({
  company_name: z.string().min(1, { message: "Le nom de l'entreprise est requis" }).max(255, { message: "Le nom de l'entreprise ne doit pas dépasser 255 caractères" }).optional(),
  company_sector: z.enum(["technology", "finance", "health", "education", "industry", "agriculture", "energy", "telecommunications", "construction", "retail", "other"], { message: "Secteur de l'entreprise invalide" }).optional(),
  partnership_type: z.enum(["internship", "apprenticeship", "recruitment", "training", "research", "sponsorship", "mentorship", "project", "other"], { message: "Type de partenariat invalide" }).optional(),
  contact_person: z.string().min(1, { message: "La personne de contact est requise" }).max(255, { message: "La personne de contact ne doit pas dépasser 255 caractères" }).optional(),
  contact_email: z.string().email({ message: "Email de contact invalide" }).optional(),
  contact_phone: z.string().max(20, { message: "Le téléphone ne doit pas dépasser 20 caractères" }).optional().nullable(),
  status: z.enum(["active", "inactive", "pending", "expired", "terminated"], { message: "Statut invalide" }).optional(),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de début invalide" }).optional(),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de fin invalide" }).optional().nullable(),
  opportunities: z.array(z.object({
    title: z.string().min(1, { message: "Le titre de l'opportunité est requis" }).max(255, { message: "Le titre ne doit pas dépasser 255 caractères" }),
    type: z.enum(["internship", "job", "project", "training", "research", "other"], { message: "Type d'opportunité invalide" }),
    description: z.string().max(2000, { message: "La description ne doit pas dépasser 2000 caractères" }).optional(),
    positions_available: z.number().int({ message: "Le nombre de places doit être un entier" }).min(1, { message: "Au moins une place est requise" }).optional(),
    deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date limite invalide" }).optional(),
    status: z.enum(["open", "closed", "full"], { message: "Statut de l'opportunité invalide" }).default("open"),
  })).optional(),
  agreement_documents: z.array(z.string().url({ message: "URL de document invalide" })).optional(),
  notes: z.string().max(5000, { message: "Les notes ne doivent pas dépasser 5000 caractères" }).optional().nullable(),
  metadata: z.record(z.unknown()).optional(),
});
