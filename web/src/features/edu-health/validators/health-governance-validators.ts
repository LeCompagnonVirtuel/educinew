import { z } from 'zod';

export const CreateHealthPolicySchema = z.object({
  title: z.string().min(1, 'Le titre de la politique est requis'),
  description: z.string().min(1, 'La description est requise'),
  category: z.enum(['health', 'safety', 'wellness', 'safeguarding', 'accessibility', 'emergency'], {
    message: 'La catégorie est invalide',
  }),
  scope: z.enum(['school', 'district', 'national'], {
    message: 'La portée est invalide',
  }),
  version: z.string().min(1, 'La version est requise').default('1.0'),
  effectiveDate: z.string().min(1, 'La date d\'entrée en vigueur est requise'),
  reviewDate: z.string().min(1, 'La date de révision est requise'),
  approvedBy: z.string().uuid('ID approbateur invalide'),
  approvedDate: z.string().optional(),
  content: z.string().min(1, 'Le contenu est requis'),
  attachments: z.array(z.string()).default([]),
  status: z.enum(['draft', 'active', 'under_review', 'archived'], {
    message: 'Le statut est invalide',
  }).default('draft'),
});

export const UpdateHealthPolicySchema = CreateHealthPolicySchema.partial();

export const CreateHealthCommitteeSchema = z.object({
  name: z.string().min(1, 'Le nom du comité est requis'),
  description: z.string().min(1, 'La description est requise'),
  type: z.enum(['health', 'safety', 'wellness', 'safeguarding', 'emergency', 'advisory'], {
    message: 'Le type de comité est invalide',
  }),
  chairpersonId: z.string().uuid('ID président invalide').optional(),
  members: z.array(z.object({
    userId: z.string().uuid('ID utilisateur invalide'),
    role: z.enum(['chairperson', 'member', 'secretary', 'advisor'], {
      message: 'Le rôle est invalide',
    }),
    joinDate: z.string().min(1, 'La date d\'adhésion est requise'),
  })).default([]),
  meetingFrequency: z.enum(['weekly', 'biweekly', 'monthly', 'quarterly'], {
    message: 'La fréquence est invalide',
  }).default('monthly'),
  mandate: z.string().optional(),
  status: z.enum(['active', 'inactive', 'dissolved'], {
    message: 'Le statut est invalide',
  }).default('active'),
});

export const UpdateHealthCommitteeSchema = CreateHealthCommitteeSchema.partial();

export const CreateComplianceCheckSchema = z.object({
  policyId: z.string().uuid('ID politique invalide'),
  checkedBy: z.string().uuid('ID vérificateur invalide'),
  checkDate: z.string().min(1, 'La date de vérification est requise'),
  scope: z.enum(['full', 'partial', 'follow_up'], {
    message: 'La portée est invalide',
  }),
  findings: z.array(z.object({
    item: z.string().min(1, 'L\'élément est requis'),
    status: z.enum(['compliant', 'partially_compliant', 'non_compliant'], {
      message: 'Le statut est invalide',
    }),
    description: z.string().min(1, 'La description est requise'),
    evidence: z.string().optional(),
    remediation: z.string().optional(),
    deadline: z.string().optional(),
  })).default([]),
  overallStatus: z.enum(['compliant', 'partially_compliant', 'non_compliant'], {
    message: 'Le statut global est invalide',
  }),
  nextCheckDate: z.string().optional(),
  report: z.string().optional(),
  status: z.enum(['in_progress', 'completed', 'follow_up_required'], {
    message: 'Le statut est invalide',
  }).default('in_progress'),
});

export const UpdateComplianceCheckSchema = CreateComplianceCheckSchema.partial();
