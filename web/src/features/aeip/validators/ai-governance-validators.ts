import { z } from 'zod';

const zString = (fieldName: string) => z.string({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' }).min(1, `Le ${fieldName} est requis`);
const zOptionalString = z.string({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' }).optional();
const zDate = z.coerce.date({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' });
const zOptionalDate = z.coerce.date({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' }).optional();
const zNumber = z.number({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' }).min(0);
const zOptionalNumber = z.number({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' }).min(0).optional();
const zBoolean = z.boolean({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' });
const zOptionalBoolean = z.boolean({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' }).optional();
const zUuid = z.string().uuid('UUID invalide');
const zOptionalUuid = z.string().uuid('UUID invalide').optional();
const zArray = <T extends z.ZodTypeAny>(schema: T) => z.array(schema, { required_error: 'Champ requis', invalid_type_error: 'Type invalide' });
const zOptionalArray = <T extends z.ZodTypeAny>(schema: T) => z.array(schema).optional();
const zRecord = <T extends z.ZodTypeAny>(schema: T) => z.record(schema, { required_error: 'Champ requis', invalid_type_error: 'Type invalide' });

export const AIGovernancePolicyCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  type: z.enum(['ethics', 'compliance', 'security', 'privacy', 'fairness', 'transparency']),
  rules: zArray(zRecord(z.unknown())),
  status: z.enum(['draft', 'active', 'suspended', 'archived']).optional(),
  effectiveDate: zOptionalDate,
  reviewDate: zOptionalDate,
  school_id: zUuid,
  version: zString('version'),
});

export const AIGovernancePolicyUpdateSchema = AIGovernancePolicyCreateSchema.partial();

export const GovernanceAuditCreateSchema = z.object({
  policy_id: zUuid,
  auditType: z.enum(['compliance', 'ethics', 'performance', 'security', 'data_quality']),
  scope: zOptionalString,
  findings: zOptionalArray(zRecord(z.unknown())),
  status: z.enum(['planned', 'in_progress', 'completed', 'follow_up']).optional(),
  scheduledAt: zOptionalDate,
  completedAt: zOptionalDate,
  auditor: zOptionalUuid,
  report: zOptionalString,
  school_id: zUuid,
});

export const GovernanceAuditUpdateSchema = GovernanceAuditCreateSchema.partial();

export const EthicsReviewCreateSchema = z.object({
  model_id: zOptionalUuid,
  policy_id: zUuid,
  reviewType: z.enum(['bias', 'fairness', 'transparency', 'accountability', 'impact']),
  status: z.enum(['pending', 'in_review', 'approved', 'rejected', 'conditional']).optional(),
  findings: zRecord(z.unknown()),
  recommendation: zOptionalString,
  reviewer: zUuid,
  reviewedAt: zOptionalDate,
  expiryDate: zOptionalDate,
  school_id: zUuid,
});

export const EthicsReviewUpdateSchema = EthicsReviewCreateSchema.partial();

export const DataGovernanceCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  dataType: z.enum(['personal', 'sensitive', 'public', 'internal', 'confidential']),
  classification: z.enum(['public', 'internal', 'confidential', 'secret']),
  retentionDays: zNumber,
  accessControl: zRecord(z.unknown()).optional(),
  encryptionRequired: zOptionalBoolean,
  auditRequired: zOptionalBoolean,
  school_id: zUuid,
  lastReview: zOptionalDate,
});

export const DataGovernanceUpdateSchema = DataGovernanceCreateSchema.partial();

export const ComplianceCheckCreateSchema = z.object({
  regulation: zString('réglementation'),
  description: zOptionalString,
  category: z.enum(['gdpr', 'ferpa', 'coppa', 'hipaa', 'local', 'custom']),
  requirements: zArray(zRecord(z.unknown())),
  status: z.enum(['compliant', 'non_compliant', 'partial', 'pending_review']).optional(),
  lastChecked: zOptionalDate,
  nextCheck: zOptionalDate,
  evidence: zOptionalArray(zRecord(z.unknown())),
  school_id: zUuid,
});

export const ComplianceCheckUpdateSchema = ComplianceCheckCreateSchema.partial();

export const RiskAssessmentCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  category: z.enum(['technical', 'operational', 'financial', 'reputational', 'legal']),
  likelihood: z.number().min(1).max(5),
  impact: z.number().min(1).max(5),
  riskScore: zOptionalNumber,
  mitigationStrategy: zOptionalString,
  status: z.enum(['identified', 'analyzing', 'mitigating', 'monitoring', 'closed']).optional(),
  owner: zOptionalUuid,
  school_id: zUuid,
  lastReview: zOptionalDate,
});

export const RiskAssessmentUpdateSchema = RiskAssessmentCreateSchema.partial();

export const ModelRegistrationCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  modelType: z.enum(['classification', 'regression', 'nlp', 'vision', 'recommendation', 'generative']),
  version: zString('version'),
  owner: zUuid,
  status: z.enum(['registered', 'reviewing', 'approved', 'deployed', 'deprecated']).optional(),
  purpose: zString('finalité'),
  dataSources: zOptionalArray(zString('source de données')),
  performanceMetrics: zRecord(z.unknown()).optional(),
  school_id: zUuid,
  registeredAt: zOptionalDate,
  lastAudit: zOptionalDate,
});

export const ModelRegistrationUpdateSchema = ModelRegistrationCreateSchema.partial();

export const IncidentResponseCreateSchema = z.object({
  title: zString('titre'),
  description: zString('description'),
  type: z.enum(['bias', 'failure', 'breach', 'compliance', 'performance']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  status: z.enum(['detected', 'triaging', 'investigating', 'resolved', 'closed']).optional(),
  detectedAt: zOptionalDate,
  resolvedAt: zOptionalDate,
  assignedTo: zOptionalUuid,
  rootCause: zOptionalString,
  correctiveActions: zOptionalArray(zRecord(z.unknown())),
  school_id: zUuid,
});

export const IncidentResponseUpdateSchema = IncidentResponseCreateSchema.partial();

export const TransparencyLogCreateSchema = z.object({
  action: zString('action'),
  actor: zString('acteur'),
  resource: zString('ressource'),
  details: zRecord(z.unknown()).optional(),
  timestamp: zOptionalDate,
  ipAddress: zOptionalString,
  school_id: zUuid,
});

export const TransparencyLogUpdateSchema = TransparencyLogCreateSchema.partial();
