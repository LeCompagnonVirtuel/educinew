import { z } from 'zod';

export const CreateAccessibilityProfileSchema = z.object({
  studentId: z.string().uuid('ID élève invalide'),
  disabilityType: z.enum(['physical', 'visual', 'hearing', 'cognitive', 'neurodevelopmental', 'multiple'], {
    message: 'Le type de handicap est invalide',
  }),
  severityLevel: z.enum(['mild', 'moderate', 'severe', 'profound'], {
    message: 'Le niveau de sévérité est invalide',
  }),
  diagnosis: z.string().min(1, 'Le diagnostic est requis'),
  diagnosisDate: z.string().optional(),
  diagnosedBy: z.string().optional(),
  accommodations: z.array(z.object({
    type: z.enum(['time_extension', 'alternative_format', 'assistive_tech', 'physical', 'communication', 'other'], {
      message: 'Le type d\'aménagement est invalide',
    }),
    description: z.string().min(1, 'La description est requise'),
    verified: z.boolean().default(false),
  })).default([]),
  iesp: z.object({
    hasIesp: z.boolean().default(false),
    iespDate: z.string().optional(),
    iespExpiry: z.string().optional(),
    reviewDate: z.string().optional(),
  }).optional(),
  assistiveDevices: z.array(z.string()).default([]),
  communicationNeeds: z.string().optional(),
  mobilityNeeds: z.string().optional(),
  notes: z.string().optional(),
});

export const UpdateAccessibilityProfileSchema = CreateAccessibilityProfileSchema.partial();

export const CreateAccommodationRequestSchema = z.object({
  studentId: z.string().uuid('ID élève invalide'),
  requestedBy: z.string().uuid('ID demandeur invalide'),
  type: z.enum(['time_extension', 'alternative_format', 'assistive_tech', 'physical', 'communication', 'other'], {
    message: 'Le type d\'aménagement est invalide',
  }),
  description: z.string().min(1, 'La description est requise'),
  justification: z.string().min(1, 'La justification est requise'),
  supportingDocuments: z.array(z.string()).default([]),
  urgency: z.enum(['normal', 'urgent', 'immediate'], {
    message: 'L\'urgence est invalide',
  }).default('normal'),
  status: z.enum(['pending', 'approved', 'denied', 'under_review'], {
    message: 'Le statut est invalide',
  }).default('pending'),
  reviewedBy: z.string().uuid('ID examinateur invalide').optional(),
  reviewDate: z.string().optional(),
  decisionNotes: z.string().optional(),
});

export const UpdateAccommodationRequestSchema = CreateAccommodationRequestSchema.partial();

export const CreateAccessibilityAuditSchema = z.object({
  auditedBy: z.string().uuid('ID auditeur invalide'),
  auditDate: z.string().min(1, 'La date d\'audit est requise'),
  scope: z.enum(['building', 'digital', 'curriculum', 'communication', 'comprehensive'], {
    message: 'La portée est invalide',
  }),
  location: z.string().min(1, 'Le lieu est requis'),
  findings: z.array(z.object({
    area: z.string().min(1, 'La zone est requise'),
    status: z.enum(['compliant', 'partially_compliant', 'non_compliant'], {
      message: 'Le statut est invalide',
    }),
    description: z.string().min(1, 'La description est requise'),
    priority: z.enum(['low', 'medium', 'high', 'critical'], {
      message: 'La priorité est invalide',
    }),
    remediation: z.string().optional(),
  })).default([]),
  overallRating: z.enum(['excellent', 'good', 'needs_improvement', 'critical'], {
    message: 'L\'évaluation globale est invalide',
  }),
  report: z.string().optional(),
  status: z.enum(['draft', 'submitted', 'in_progress', 'completed'], {
    message: 'Le statut est invalide',
  }).default('draft'),
});

export const UpdateAccessibilityAuditSchema = CreateAccessibilityAuditSchema.partial();
