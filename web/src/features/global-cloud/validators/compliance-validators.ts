import { z } from 'zod'

const schoolId = z.string().uuid()

// ============================================================================
// MODULE 13: COMPLIANCE & SOVEREIGNTY - Data Residency
// ============================================================================

const CountryDataResidencySchema = z.object({
  id: z.string().uuid(),
  country: z.string(),
  code: z.string(),
  jurisdiction: z.enum(['EU', 'US', 'UK', 'AFRICA', 'ASIA_PACIFIC', 'GLOBAL']),
  regulatoryBody: z.enum(['CNIL', 'ICO', 'FTC', 'EDPS', 'LOCAL_AUTHORITY']),
  laws: z.array(z.object({
    name: z.string(),
    type: z.enum(['DATA_PROTECTION', 'PRIVACY', 'EDUCATION', 'CHILDREN', 'TELECOMMUNICATIONS']),
    effectiveDate: z.string(),
    requirements: z.array(z.string()),
    penalties: z.string(),
  })),
  dataResidency: z.enum(['LOCAL', 'REGIONAL', 'GLOBAL', 'SOVEREIGN']),
  sovereigntyLevel: z.enum(['FULL', 'PARTIAL', 'NONE', 'HYBRID']),
  crossBorderRules: z.array(z.object({
    destination: z.string(),
    mechanism: z.enum(['ADEQUATE', 'SCC', 'BCR', 'CONSENT', 'DEROGATION']),
    allowed: z.boolean(),
    conditions: z.array(z.string()),
  })),
})

const CreateCountryDataResidencySchema = CountryDataResidencySchema.omit({ id: true })
const UpdateCountryDataResidencySchema = CountryDataResidencySchema.partial().required({ id: true })

const RegionalStoragePolicySchema = z.object({
  id: z.string().uuid(),
  region: z.string(),
  dataTypes: z.array(z.string()),
  residency: z.enum(['LOCAL', 'REGIONAL', 'GLOBAL', 'SOVEREIGN']),
  encryption: z.enum(['AES_256', 'AES_128', 'RSA_2048', 'RSA_4096', 'ECC', 'CHACHA20']),
  accessControl: z.enum(['RBAC', 'ABAC', 'MAC', 'DAC', 'ZERO_TRUST']),
  retention: z.enum(['MINIMUM', 'STANDARD', 'EXTENDED', 'PERMANENT', 'LEGAL_HOLD']),
  backupRegion: z.string().optional(),
  enabled: z.boolean(),
})

const CreateRegionalStoragePolicySchema = RegionalStoragePolicySchema.omit({ id: true })
const UpdateRegionalStoragePolicySchema = RegionalStoragePolicySchema.partial().required({ id: true })

const SovereignCloudConfigSchema = z.object({
  id: z.string().uuid(),
  country: z.string(),
  provider: z.string(),
  region: z.string(),
  sovereigntyLevel: z.enum(['FULL', 'PARTIAL', 'NONE', 'HYBRID']),
  encryption: z.enum(['AES_256', 'AES_128', 'RSA_2048', 'RSA_4096', 'ECC', 'CHACHA20']),
  keyManagement: z.string(),
  accessControl: z.enum(['RBAC', 'ABAC', 'MAC', 'DAC', 'ZERO_TRUST']),
  auditLogging: z.boolean(),
  dataResidency: z.enum(['LOCAL', 'REGIONAL', 'GLOBAL', 'SOVEREIGN']),
  complianceFrameworks: z.array(z.enum(['GDPR', 'ISO_27001', 'SOC2', 'FERPA', 'COPPA', 'LGPD', 'CCPA', 'HIPAA', 'PCI_DSS', 'NIST'])),
  enabled: z.boolean(),
})

const CreateSovereignCloudConfigSchema = SovereignCloudConfigSchema.omit({ id: true })
const UpdateSovereignCloudConfigSchema = SovereignCloudConfigSchema.partial().required({ id: true })

// ============================================================================
// MODULE 13: COMPLIANCE & SOVEREIGNTY - GDPR Compliance
// ============================================================================

const GDPRComplianceSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  status: z.enum(['COMPLIANT', 'NON_COMPLIANT', 'PARTIAL', 'NOT_ASSESSED', 'IN_PROGRESS']),
  articles: z.array(z.object({
    article: z.string(),
    title: z.string(),
    description: z.string(),
    status: z.enum(['COMPLIANT', 'NON_COMPLIANT', 'PARTIAL', 'NOT_ASSESSED', 'IN_PROGRESS']),
    evidence: z.array(z.string()),
    gaps: z.array(z.string()),
  })),
  dataProcessing: z.array(z.object({
    id: z.string().uuid(),
    purpose: z.enum(['EDUCATION', 'ADMINISTRATION', 'COMMUNICATION', 'ANALYTICS', 'MARKETING', 'LEGAL']),
    legalBasis: z.string(),
    dataCategories: z.array(z.string()),
    dataSubjects: z.enum(['STUDENT', 'PARENT', 'TEACHER', 'STAFF', 'ALUMNI', 'PROSPECTIVE']),
    retention: z.enum(['MINIMUM', 'STANDARD', 'EXTENDED', 'PERMANENT', 'LEGAL_HOLD']),
    processors: z.array(z.string()),
    crossBorder: z.boolean(),
    dpiaRequired: z.boolean(),
  })),
  consentManagement: z.enum(['CENTRALIZED', 'DECENTRALIZED', 'HYBRID']),
  lastAssessment: z.string(),
  nextAssessment: z.string(),
  dpoContact: z.string(),
})

const CreateGDPRComplianceSchema = GDPRComplianceSchema.omit({ id: true })
const UpdateGDPRComplianceSchema = GDPRComplianceSchema.partial().required({ id: true })

// ============================================================================
// MODULE 13: COMPLIANCE & SOVEREIGNTY - ISO 27001 Compliance
// ============================================================================

const ISO27001ComplianceSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  status: z.enum(['COMPLIANT', 'NON_COMPLIANT', 'PARTIAL', 'NOT_ASSESSED', 'IN_PROGRESS']),
  clauses: z.array(z.object({
    clause: z.string(),
    title: z.string(),
    status: z.enum(['COMPLIANT', 'NON_COMPLIANT', 'PARTIAL', 'NOT_ASSESSED', 'IN_PROGRESS']),
    requirements: z.array(z.string()),
    evidence: z.array(z.string()),
  })),
  annexControls: z.array(z.object({
    control: z.string(),
    title: z.string(),
    implementation: z.enum(['IMPLEMENTED', 'PARTIALLY_IMPLEMENTED', 'NOT_IMPLEMENTED', 'UNDER_REVIEW']),
    effectiveness: z.string(),
    evidence: z.array(z.string()),
  })),
  certificationDate: z.string().optional(),
  expiryDate: z.string().optional(),
  scope: z.string(),
})

const CreateISO27001ComplianceSchema = ISO27001ComplianceSchema.omit({ id: true })
const UpdateISO27001ComplianceSchema = ISO27001ComplianceSchema.partial().required({ id: true })

// ============================================================================
// MODULE 13: COMPLIANCE & SOVEREIGNTY - SOC2 Compliance
// ============================================================================

const SOC2ComplianceSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  status: z.enum(['COMPLIANT', 'NON_COMPLIANT', 'PARTIAL', 'NOT_ASSESSED', 'IN_PROGRESS']),
  trustPrinciples: z.array(z.object({
    principle: z.string(),
    description: z.string(),
    status: z.enum(['COMPLIANT', 'NON_COMPLIANT', 'PARTIAL', 'NOT_ASSESSED', 'IN_PROGRESS']),
    controls: z.array(z.object({
      control: z.string(),
      description: z.string(),
      implemented: z.boolean(),
      tested: z.boolean(),
      evidence: z.array(z.string()),
    })),
  })),
  type1Complete: z.boolean(),
  type2Complete: z.boolean(),
  examinationDate: z.string().optional(),
  reportUrl: z.string().url().optional(),
})

const CreateSOC2ComplianceSchema = SOC2ComplianceSchema.omit({ id: true })
const UpdateSOC2ComplianceSchema = SOC2ComplianceSchema.partial().required({ id: true })

// ============================================================================
// MODULE 13: COMPLIANCE & SOVEREIGNTY - FERPA & COPPA Compliance
// ============================================================================

const FERPAComplianceSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  status: z.enum(['COMPLIANT', 'NON_COMPLIANT', 'PARTIAL', 'NOT_ASSESSED', 'IN_PROGRESS']),
  directoryInfo: z.array(z.string()),
  consentRequirements: z.array(z.string()),
  accessRights: z.array(z.string()),
  disclosureRules: z.array(z.string()),
  lastReview: z.string(),
})

const CreateFERPAComplianceSchema = FERPAComplianceSchema.omit({ id: true })
const UpdateFERPAComplianceSchema = FERPAComplianceSchema.partial().required({ id: true })

const COPPAComplianceSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  status: z.enum(['COMPLIANT', 'NON_COMPLIANT', 'PARTIAL', 'NOT_ASSESSED', 'IN_PROGRESS']),
  ageThreshold: z.number().int().min(0).max(18),
  parentalConsent: z.enum(['EXPLICIT', 'IMPLICIT', 'OPT_IN', 'OPT_OUT', 'LEGITIMATE_INTEREST']),
  dataMinimization: z.enum(['FULL', 'PARTIAL', 'NONE']),
  retentionDays: z.number().int().min(0),
  thirdPartySharing: z.boolean(),
  parentalAccess: z.boolean(),
  lastReview: z.string(),
})

const CreateCOPPAComplianceSchema = COPPAComplianceSchema.omit({ id: true })
const UpdateCOPPAComplianceSchema = COPPAComplianceSchema.partial().required({ id: true })

// ============================================================================
// MODULE 13: COMPLIANCE & SOVEREIGNTY - LGPD Compliance
// ============================================================================

const LGPDComplianceSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  status: z.enum(['COMPLIANT', 'NON_COMPLIANT', 'PARTIAL', 'NOT_ASSESSED', 'IN_PROGRESS']),
  legalBases: z.array(z.string()),
  dataProcessing: z.array(z.object({
    id: z.string().uuid(),
    purpose: z.enum(['EDUCATION', 'ADMINISTRATION', 'COMMUNICATION', 'ANALYTICS', 'MARKETING', 'LEGAL']),
    legalBasis: z.string(),
    dataCategories: z.array(z.string()),
    retention: z.enum(['MINIMUM', 'STANDARD', 'EXTENDED', 'PERMANENT', 'LEGAL_HOLD']),
    processors: z.array(z.string()),
  })),
  dpoContact: z.string(),
  lastAssessment: z.string(),
})

const CreateLGPDComplianceSchema = LGPDComplianceSchema.omit({ id: true })
const UpdateLGPDComplianceSchema = LGPDComplianceSchema.partial().required({ id: true })

// ============================================================================
// MODULE 13: COMPLIANCE & SOVEREIGNTY - Compliance Scans & Reports
// ============================================================================

const ComplianceScanSchema = z.object({
  id: z.string().uuid(),
  framework: z.enum(['GDPR', 'ISO_27001', 'SOC2', 'FERPA', 'COPPA', 'LGPD', 'CCPA', 'HIPAA', 'PCI_DSS', 'NIST']),
  schoolId: schoolId,
  status: z.enum(['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'FAILED']),
  findings: z.array(z.object({
    id: z.string().uuid(),
    control: z.string(),
    title: z.string(),
    description: z.string(),
    severity: z.enum(['MINIMAL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
    status: z.enum(['OPEN', 'IN_PROGRESS', 'REMEDIATED', 'ACCEPTED', 'CLOSED']),
    evidence: z.array(z.string()),
    remediation: z.string(),
  })),
  score: z.number().min(0).max(100),
  totalChecks: z.number().int().min(0),
  passedChecks: z.number().int().min(0),
  failedChecks: z.number().int().min(0),
  startedAt: z.string(),
  completedAt: z.string().optional(),
})

const CreateComplianceScanSchema = ComplianceScanSchema.omit({
  id: true,
})

const UpdateComplianceScanSchema = ComplianceScanSchema.partial().required({ id: true })

const ComplianceReportRecordSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  type: z.enum(['COMPLIANCE', 'AUDIT', 'RISK', 'INCIDENT', 'BREACH']),
  framework: z.enum(['GDPR', 'ISO_27001', 'SOC2', 'FERPA', 'COPPA', 'LGPD', 'CCPA', 'HIPAA', 'PCI_DSS', 'NIST']),
  period: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'ANNUAL']),
  status: z.enum(['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'FINDINGS', 'REMEDIATION']),
  summary: z.string(),
  findings: z.array(z.object({
    id: z.string().uuid(),
    category: z.string(),
    finding: z.string(),
    severity: z.enum(['MINIMAL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
    impact: z.string(),
    recommendation: z.string(),
    status: z.enum(['OPEN', 'IN_PROGRESS', 'REMEDIATED', 'ACCEPTED', 'CLOSED']),
  })),
  recommendations: z.array(z.string()),
  generatedAt: z.string(),
})

const CreateComplianceReportRecordSchema = ComplianceReportRecordSchema.omit({ id: true })
const UpdateComplianceReportRecordSchema = ComplianceReportRecordSchema.partial().required({ id: true })

// ============================================================================
// MODULE 13: COMPLIANCE & SOVEREIGNTY - Compliance Audits
// ============================================================================

const ComplianceAuditRecordSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  type: z.enum(['INTERNAL', 'EXTERNAL', 'REGULATORY', 'CERTIFICATION', 'SURPRISE']),
  framework: z.enum(['GDPR', 'ISO_27001', 'SOC2', 'FERPA', 'COPPA', 'LGPD', 'CCPA', 'HIPAA', 'PCI_DSS', 'NIST']),
  auditor: z.string(),
  scope: z.string(),
  status: z.enum(['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'FINDINGS', 'REMEDIATION']),
  findings: z.array(z.object({
    id: z.string().uuid(),
    category: z.string(),
    finding: z.string(),
    severity: z.enum(['MINIMAL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
    evidence: z.array(z.string()),
    recommendation: z.string(),
    remediation: z.string(),
    status: z.enum(['OPEN', 'IN_PROGRESS', 'REMEDIATED', 'ACCEPTED', 'CLOSED']),
    dueDate: z.string(),
  })),
  overallRating: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  reportUrl: z.string().url().optional(),
})

const CreateComplianceAuditRecordSchema = ComplianceAuditRecordSchema.omit({ id: true })
const UpdateComplianceAuditRecordSchema = ComplianceAuditRecordSchema.partial().required({ id: true })

// ============================================================================
// MODULE 13: COMPLIANCE & SOVEREIGNTY - Data Sovereignty & Classification
// ============================================================================

const DataSovereigntySchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  country: z.string(),
  dataTypes: z.array(z.string()),
  residency: z.enum(['LOCAL', 'REGIONAL', 'GLOBAL', 'SOVEREIGN']),
  sovereigntyLevel: z.enum(['FULL', 'PARTIAL', 'NONE', 'HYBRID']),
  cloudProvider: z.string(),
  region: z.string(),
  encryption: z.enum(['AES_256', 'AES_128', 'RSA_2048', 'RSA_4096', 'ECC', 'CHACHA20']),
  keyManagement: z.string(),
  accessLog: z.boolean(),
  lastAudit: z.string(),
})

const CreateDataSovereigntySchema = DataSovereigntySchema.omit({ id: true })
const UpdateDataSovereigntySchema = DataSovereigntySchema.partial().required({ id: true })

const DataClassificationRecordSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  dataType: z.string(),
  classification: z.enum(['PUBLIC', 'INTERNAL', 'CONFIDENTIAL', 'RESTRICTED', 'TOP_SECRET']),
  description: z.string(),
  owner: z.string().uuid(),
  retention: z.enum(['MINIMUM', 'STANDARD', 'EXTENDED', 'PERMANENT', 'LEGAL_HOLD']),
  encryption: z.enum(['AES_256', 'AES_128', 'RSA_2048', 'RSA_4096', 'ECC', 'CHACHA20']),
  accessControl: z.enum(['RBAC', 'ABAC', 'MAC', 'DAC', 'ZERO_TRUST']),
  lastReview: z.string(),
})

const CreateDataClassificationRecordSchema = DataClassificationRecordSchema.omit({ id: true })
const UpdateDataClassificationRecordSchema = DataClassificationRecordSchema.partial().required({ id: true })

// ============================================================================
// MODULE 13: COMPLIANCE & SOVEREIGNTY - Data Subject Requests
// ============================================================================

const DataSubjectRequestSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  type: z.enum(['ACCESS', 'RECTIFICATION', 'ERASURE', 'RESTRICTION', 'PORTABILITY', 'OBJECTION']),
  subjectId: z.string().uuid(),
  subjectType: z.enum(['STUDENT', 'PARENT', 'TEACHER', 'STAFF', 'ALUMNI', 'PROSPECTIVE']),
  status: z.string(),
  description: z.string(),
  response: z.string().optional(),
  deadline: z.string(),
  fulfilledAt: z.string().optional(),
  verifiedBy: z.string().uuid().optional(),
  createdAt: z.string(),
})

const CreateDataSubjectRequestSchema = DataSubjectRequestSchema.omit({
  id: true,
  createdAt: true,
})

const UpdateDataSubjectRequestSchema = DataSubjectRequestSchema.partial().required({ id: true })

// ============================================================================
// MODULE 13: COMPLIANCE & SOVEREIGNTY - Consent & Processing Records
// ============================================================================

const ConsentRecordSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  subjectId: z.string().uuid(),
  subjectType: z.enum(['STUDENT', 'PARENT', 'TEACHER', 'STAFF', 'ALUMNI', 'PROSPECTIVE']),
  purpose: z.enum(['EDUCATION', 'ADMINISTRATION', 'COMMUNICATION', 'ANALYTICS', 'MARKETING', 'LEGAL']),
  type: z.enum(['EXPLICIT', 'IMPLICIT', 'OPT_IN', 'OPT_OUT', 'LEGITIMATE_INTEREST']),
  granted: z.boolean(),
  grantedAt: z.string().optional(),
  revokedAt: z.string().optional(),
  expiry: z.string().optional(),
  evidence: z.string(),
  version: z.string(),
})

const CreateConsentRecordSchema = ConsentRecordSchema.omit({ id: true })
const UpdateConsentRecordSchema = ConsentRecordSchema.partial().required({ id: true })

const ProcessingRecordSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  purpose: z.enum(['EDUCATION', 'ADMINISTRATION', 'COMMUNICATION', 'ANALYTICS', 'MARKETING', 'LEGAL']),
  legalBasis: z.string(),
  dataCategories: z.array(z.string()),
  dataSubjects: z.array(z.enum(['STUDENT', 'PARENT', 'TEACHER', 'STAFF', 'ALUMNI', 'PROSPECTIVE'])),
  recipients: z.array(z.string()),
  retention: z.enum(['MINIMUM', 'STANDARD', 'EXTENDED', 'PERMANENT', 'LEGAL_HOLD']),
  crossBorder: z.boolean(),
  safeguards: z.array(z.string()),
  dpiaRequired: z.boolean(),
  createdAt: z.string(),
})

const CreateProcessingRecordSchema = ProcessingRecordSchema.omit({
  id: true,
  createdAt: true,
})

const UpdateProcessingRecordSchema = ProcessingRecordSchema.partial().required({ id: true })

const TransferRecordSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  destination: z.string(),
  jurisdiction: z.enum(['EU', 'US', 'UK', 'AFRICA', 'ASIA_PACIFIC', 'GLOBAL']),
  mechanism: z.enum(['STANDARD_CONTRACTUAL', 'BINDING_CORPORATE', 'ADEQUACY', 'CONSENT', 'CERTIFICATION']),
  dataCategories: z.array(z.string()),
  safeguards: z.array(z.string()),
  approved: z.boolean(),
  approvedBy: z.string().uuid().optional(),
  approvedAt: z.string().optional(),
  lastReview: z.string(),
})

const CreateTransferRecordSchema = TransferRecordSchema.omit({ id: true })
const UpdateTransferRecordSchema = TransferRecordSchema.partial().required({ id: true })

// ============================================================================
// MODULE 13: COMPLIANCE & SOVEREIGNTY - Encryption & Access Control
// ============================================================================

const EncryptionConfigSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  standard: z.enum(['AES_256', 'AES_128', 'RSA_2048', 'RSA_4096', 'ECC', 'CHACHA20']),
  keySize: z.number().int().min(128).max(4096),
  keyRotation: z.number().int().min(0),
  keyManagement: z.string(),
  atRest: z.boolean(),
  inTransit: z.boolean(),
  enabled: z.boolean(),
})

const CreateEncryptionConfigSchema = EncryptionConfigSchema.omit({ id: true })
const UpdateEncryptionConfigSchema = EncryptionConfigSchema.partial().required({ id: true })

const AccessControlConfigSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  model: z.enum(['RBAC', 'ABAC', 'MAC', 'DAC', 'ZERO_TRUST']),
  policies: z.array(z.object({
    id: z.string().uuid(),
    name: z.string(),
    resource: z.string(),
    actions: z.array(z.string()),
    conditions: z.record(z.string()),
    effect: z.enum(['ALLOW', 'DENY']),
  })),
  mfaRequired: z.boolean(),
  sessionTimeout: z.number().int().min(0),
  ipWhitelist: z.array(z.string()),
  enabled: z.boolean(),
})

const CreateAccessControlConfigSchema = AccessControlConfigSchema.omit({ id: true })
const UpdateAccessControlConfigSchema = AccessControlConfigSchema.partial().required({ id: true })

const RetentionConfigSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  dataType: z.string(),
  policy: z.enum(['MINIMUM', 'STANDARD', 'EXTENDED', 'PERMANENT', 'LEGAL_HOLD']),
  retentionDays: z.number().int().min(0),
  archiveAfter: z.number().int().min(0).optional(),
  deleteAfter: z.number().int().min(0).optional(),
  legalBasis: z.string(),
  enabled: z.boolean(),
})

const CreateRetentionConfigSchema = RetentionConfigSchema.omit({ id: true })
const UpdateRetentionConfigSchema = RetentionConfigSchema.partial().required({ id: true })

// ============================================================================
// MODULE 13: COMPLIANCE & SOVEREIGNTY - Audit Trail & Logging
// ============================================================================

const AuditTrailSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  resource: z.string(),
  resourceId: z.string().uuid(),
  action: z.string(),
  actor: z.string().uuid(),
  actorType: z.string(),
  timestamp: z.string(),
  ipAddress: z.string(),
  userAgent: z.string(),
  changes: z.array(z.object({
    field: z.string(),
    oldValue: z.string(),
    newValue: z.string(),
  })),
})

const CreateAuditTrailSchema = AuditTrailSchema.omit({ id: true })
const UpdateAuditTrailSchema = AuditTrailSchema.partial().required({ id: true })

const AuditLogSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  level: z.string(),
  category: z.string(),
  message: z.string(),
  actor: z.string().uuid(),
  resource: z.string(),
  resourceId: z.string().uuid(),
  timestamp: z.string(),
  metadata: z.record(z.string()),
})

const CreateAuditLogSchema = AuditLogSchema.omit({ id: true })
const UpdateAuditLogSchema = AuditLogSchema.partial().required({ id: true })

const AuditReportRecordSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  type: z.enum(['INTERNAL', 'EXTERNAL', 'REGULATORY', 'CERTIFICATION', 'SURPRISE']),
  period: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'ANNUAL']),
  startDate: z.string(),
  endDate: z.string(),
  totalEvents: z.number().int().min(0),
  categories: z.array(z.object({
    category: z.string(),
    count: z.number().int().min(0),
    percentage: z.number().min(0).max(100),
    trend: z.string(),
  })),
  anomalies: z.array(z.object({
    id: z.string().uuid(),
    description: z.string(),
    severity: z.enum(['MINIMAL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
    timestamp: z.string(),
    resource: z.string(),
    actor: z.string().uuid(),
    investigated: z.boolean(),
  })),
  generatedAt: z.string(),
})

const CreateAuditReportRecordSchema = AuditReportRecordSchema.omit({
  id: true,
  generatedAt: true,
})

const UpdateAuditReportRecordSchema = AuditReportRecordSchema.partial().required({ id: true })

// ============================================================================
// MODULE 13: COMPLIANCE & SOVEREIGNTY - Risk Assessment
// ============================================================================

const RiskAssessmentSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  framework: z.enum(['GDPR', 'ISO_27001', 'SOC2', 'FERPA', 'COPPA', 'LGPD', 'CCPA', 'HIPAA', 'PCI_DSS', 'NIST']),
  overallRisk: z.enum(['MINIMAL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  risks: z.array(z.object({
    id: z.string().uuid(),
    category: z.string(),
    description: z.string(),
    likelihood: z.number().min(1).max(5),
    impact: z.number().min(1).max(5),
    riskScore: z.number().min(0).max(25),
    level: z.enum(['MINIMAL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
    mitigation: z.object({
      id: z.string().uuid(),
      strategy: z.string(),
      description: z.string(),
      controls: z.array(z.string()),
      residualRisk: z.enum(['MINIMAL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
      cost: z.number().min(0),
      effectiveDate: z.string(),
      status: z.enum(['OPEN', 'IN_PROGRESS', 'REMEDIATED', 'ACCEPTED', 'CLOSED']),
    }),
    owner: z.string().uuid(),
    status: z.string(),
  })),
  assessmentDate: z.string(),
  assessor: z.string().uuid(),
  nextAssessment: z.string(),
})

const CreateRiskAssessmentSchema = RiskAssessmentSchema.omit({ id: true })
const UpdateRiskAssessmentSchema = RiskAssessmentSchema.partial().required({ id: true })

// ============================================================================
// MODULE 13: COMPLIANCE & SOVEREIGNTY - Control Framework
// ============================================================================

const ControlFrameworkSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  framework: z.enum(['GDPR', 'ISO_27001', 'SOC2', 'FERPA', 'COPPA', 'LGPD', 'CCPA', 'HIPAA', 'PCI_DSS', 'NIST']),
  controls: z.array(z.object({
    id: z.string().uuid(),
    control: z.string(),
    title: z.string(),
    description: z.string(),
    type: z.enum(['PREVENTIVE', 'DETECTIVE', 'CORRECTIVE', 'COMPENSATING', 'DETERRENT']),
    status: z.enum(['IMPLEMENTED', 'PARTIALLY_IMPLEMENTED', 'NOT_IMPLEMENTED', 'UNDER_REVIEW']),
    effectiveness: z.string(),
    owner: z.string().uuid(),
    lastTested: z.string(),
  })),
  lastAssessment: z.string(),
  overallStatus: z.enum(['COMPLIANT', 'NON_COMPLIANT', 'PARTIAL', 'NOT_ASSESSED', 'IN_PROGRESS']),
})

const CreateControlFrameworkSchema = ControlFrameworkSchema.omit({ id: true })
const UpdateControlFrameworkSchema = ControlFrameworkSchema.partial().required({ id: true })

const ControlAssessmentSchema = z.object({
  id: z.string().uuid(),
  controlId: z.string().uuid(),
  framework: z.enum(['GDPR', 'ISO_27001', 'SOC2', 'FERPA', 'COPPA', 'LGPD', 'CCPA', 'HIPAA', 'PCI_DSS', 'NIST']),
  status: z.enum(['IMPLEMENTED', 'PARTIALLY_IMPLEMENTED', 'NOT_IMPLEMENTED', 'UNDER_REVIEW']),
  effectiveness: z.string(),
  findings: z.array(z.string()),
  evidence: z.array(z.object({
    id: z.string().uuid(),
    controlId: z.string().uuid(),
    type: z.enum(['SCREENSHOT', 'DOCUMENT', 'LOG', 'CONFIGURATION', 'TEST_RESULT', 'CERTIFICATE']),
    title: z.string(),
    description: z.string(),
    fileUrl: z.string().url().optional(),
    status: z.enum(['COLLECTED', 'VERIFIED', 'EXPIRED', 'OUTDATED']),
    collectedAt: z.string(),
    expiresAt: z.string().optional(),
  })),
  assessedBy: z.string().uuid(),
  assessedAt: z.string(),
})

const CreateControlAssessmentSchema = ControlAssessmentSchema.omit({ id: true })
const UpdateControlAssessmentSchema = ControlAssessmentSchema.partial().required({ id: true })

// ============================================================================
// MODULE 13: COMPLIANCE & SOVEREIGNTY - Remediation
// ============================================================================

const RemediationSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  findingId: z.string().uuid(),
  description: z.string(),
  priority: z.enum(['MINIMAL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  assignee: z.string().uuid(),
  dueDate: z.string(),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'REMEDIATED', 'ACCEPTED', 'CLOSED']),
  actions: z.array(z.object({
    id: z.string().uuid(),
    description: z.string(),
    completedBy: z.string().uuid().optional(),
    completedAt: z.string().optional(),
    evidence: z.string().optional(),
  })),
  evidence: z.string().optional(),
  completedAt: z.string().optional(),
})

const CreateRemediationSchema = RemediationSchema.omit({
  id: true,
})

const UpdateRemediationSchema = RemediationSchema.partial().required({ id: true })

// ============================================================================
// MODULE 13: COMPLIANCE & SOVEREIGNTY - Breach & DPIA
// ============================================================================

const BreachReportSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  status: z.enum(['DETECTED', 'CONTAINED', 'INVESTIGATING', 'NOTIFIED', 'RESOLVED']),
  description: z.string(),
  affectedDataSubjects: z.number().int().min(0),
  dataCategories: z.array(z.string()),
  cause: z.string(),
  containmentActions: z.array(z.string()),
  notifications: z.array(z.object({
    id: z.string().uuid(),
    schoolId: schoolId,
    breachId: z.string().uuid(),
    recipient: z.string(),
    recipientType: z.string(),
    channel: z.string(),
    sentAt: z.string(),
    acknowledged: z.boolean(),
    acknowledgedAt: z.string().optional(),
  })),
  regulatoryNotification: z.boolean(),
  deadline: z.string(),
  detectedAt: z.string(),
  containedAt: z.string().optional(),
  resolvedAt: z.string().optional(),
})

const CreateBreachReportSchema = BreachReportSchema.omit({ id: true })
const UpdateBreachReportSchema = BreachReportSchema.partial().required({ id: true })

const DPIASchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  title: z.string(),
  description: z.string(),
  status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'UNDER_REVIEW', 'APPROVED']),
  processingActivity: z.string(),
  necessity: z.string(),
  proportionality: z.string(),
  risks: z.array(z.object({
    id: z.string().uuid(),
    description: z.string(),
    likelihood: z.number().min(0).max(5),
    severity: z.number().min(0).max(5),
    riskScore: z.number().min(0).max(25),
    measure: z.string().optional(),
  })),
  measures: z.array(z.object({
    id: z.string().uuid(),
    description: z.string(),
    type: z.string(),
    implemented: z.boolean(),
    effectiveness: z.string(),
  })),
  consultationRequired: z.boolean(),
  dpoReview: z.boolean(),
  approvalDate: z.string().optional(),
  reviewDate: z.string(),
  createdAt: z.string(),
})

const CreateDPIASchema = DPIASchema.omit({
  id: true,
  createdAt: true,
})

const UpdateDPIASchema = DPIASchema.partial().required({ id: true })

const TIASchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  destination: z.string(),
  jurisdiction: z.enum(['EU', 'US', 'UK', 'AFRICA', 'ASIA_PACIFIC', 'GLOBAL']),
  mechanism: z.enum(['STANDARD_CONTRACTUAL', 'BINDING_CORPORATE', 'ADEQUACY', 'CONSENT', 'CERTIFICATION']),
  dataCategories: z.array(z.string()),
  assessmentDate: z.string(),
  risks: z.array(z.object({
    id: z.string().uuid(),
    description: z.string(),
    level: z.enum(['MINIMAL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
    mitigation: z.string(),
    residualRisk: z.enum(['MINIMAL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  })),
  safeguards: z.array(z.string()),
  approval: z.string(),
  nextReview: z.string(),
})

const CreateTIASchema = TIASchema.omit({ id: true })
const UpdateTIASchema = TIASchema.partial().required({ id: true })

// ============================================================================
// MODULE 13: COMPLIANCE & SOVEREIGNTY - Dashboard
// ============================================================================

const ComplianceDashboardSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  overallScore: z.number().min(0).max(100),
  frameworkScores: z.array(z.object({
    framework: z.enum(['GDPR', 'ISO_27001', 'SOC2', 'FERPA', 'COPPA', 'LGPD', 'CCPA', 'HIPAA', 'PCI_DSS', 'NIST']),
    score: z.number().min(0).max(100),
    status: z.enum(['COMPLIANT', 'NON_COMPLIANT', 'PARTIAL', 'NOT_ASSESSED', 'IN_PROGRESS']),
    lastAssessment: z.string(),
    nextAssessment: z.string(),
  })),
  activeAudits: z.number().int().min(0),
  openFindings: z.number().int().min(0),
  pendingRequests: z.number().int().min(0),
  alerts: z.array(z.object({
    id: z.string().uuid(),
    type: z.string(),
    title: z.string(),
    description: z.string(),
    severity: z.enum(['MINIMAL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
    framework: z.enum(['GDPR', 'ISO_27001', 'SOC2', 'FERPA', 'COPPA', 'LGPD', 'CCPA', 'HIPAA', 'PCI_DSS', 'NIST']),
    deadline: z.string().optional(),
    acknowledged: z.boolean(),
    createdAt: z.string(),
  })),
  trends: z.array(z.object({
    framework: z.enum(['GDPR', 'ISO_27001', 'SOC2', 'FERPA', 'COPPA', 'LGPD', 'CCPA', 'HIPAA', 'PCI_DSS', 'NIST']),
    metric: z.string(),
    currentValue: z.number(),
    previousValue: z.number(),
    change: z.number(),
    direction: z.string(),
    period: z.string(),
  })),
  lastScan: z.string(),
  generatedAt: z.string(),
})

const CreateComplianceDashboardSchema = ComplianceDashboardSchema.omit({
  id: true,
  generatedAt: true,
})

const UpdateComplianceDashboardSchema = ComplianceDashboardSchema.partial().required({ id: true })

// ============================================================================
// MODULE 13: COMPLIANCE & SOVEREIGNTY - Policy Documents
// ============================================================================

const PolicyDocumentSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  type: z.enum(['INFORMATION_SECURITY', 'DATA_PRIVACY', 'ACCEPTABLE_USE', 'ACCESS_CONTROL', 'INCIDENT_RESPONSE', 'BUSINESS_CONTINUITY']),
  title: z.string(),
  description: z.string(),
  content: z.string(),
  version: z.string(),
  status: z.enum(['DRAFT', 'ACTIVE', 'RETIRED', 'UNDER_REVIEW']),
  owner: z.string().uuid(),
  approver: z.string().uuid(),
  effectiveDate: z.string(),
  reviewDate: z.string(),
  lastReview: z.string(),
  tags: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const CreatePolicyDocumentSchema = PolicyDocumentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

const UpdatePolicyDocumentSchema = PolicyDocumentSchema.partial().required({ id: true })

const CertificationSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  type: z.enum(['ISO_27001', 'SOC2_TYPE1', 'SOC2_TYPE2', 'PCI_DSS', 'CSA_STAR']),
  status: z.enum(['ACTIVE', 'EXPIRED', 'SUSPENDED', 'REVOKED', 'PENDING']),
  certifyingBody: z.string(),
  scope: z.string(),
  issuedDate: z.string(),
  expiryDate: z.string(),
  certificationNumber: z.string(),
  conditions: z.array(z.string()),
  auditHistory: z.array(z.object({
    id: z.string().uuid(),
    certificationId: z.string().uuid(),
    type: z.enum(['INTERNAL', 'EXTERNAL', 'REGULATORY', 'CERTIFICATION', 'SURPRISE']),
    date: z.string(),
    result: z.string(),
    findings: z.array(z.string()),
    auditor: z.string(),
  })),
})

const CreateCertificationSchema = CertificationSchema.omit({ id: true })
const UpdateCertificationSchema = CertificationSchema.partial().required({ id: true })

// ============================================================================
// MODULE 13: COMPLIANCE & SOVEREIGNTY - Exports
// ============================================================================

export {
  CreateCountryDataResidencySchema,
  UpdateCountryDataResidencySchema,
  CreateRegionalStoragePolicySchema,
  UpdateRegionalStoragePolicySchema,
  CreateSovereignCloudConfigSchema,
  UpdateSovereignCloudConfigSchema,
  CreateGDPRComplianceSchema,
  UpdateGDPRComplianceSchema,
  CreateISO27001ComplianceSchema,
  UpdateISO27001ComplianceSchema,
  CreateSOC2ComplianceSchema,
  UpdateSOC2ComplianceSchema,
  CreateFERPAComplianceSchema,
  UpdateFERPAComplianceSchema,
  CreateCOPPAComplianceSchema,
  UpdateCOPPAComplianceSchema,
  CreateLGPDComplianceSchema,
  UpdateLGPDComplianceSchema,
  CreateComplianceScanSchema,
  UpdateComplianceScanSchema,
  CreateComplianceReportRecordSchema,
  UpdateComplianceReportRecordSchema,
  CreateComplianceAuditRecordSchema,
  UpdateComplianceAuditRecordSchema,
  CreateDataSovereigntySchema,
  UpdateDataSovereigntySchema,
  CreateDataClassificationRecordSchema,
  UpdateDataClassificationRecordSchema,
  CreateDataSubjectRequestSchema,
  UpdateDataSubjectRequestSchema,
  CreateConsentRecordSchema,
  UpdateConsentRecordSchema,
  CreateProcessingRecordSchema,
  UpdateProcessingRecordSchema,
  CreateTransferRecordSchema,
  UpdateTransferRecordSchema,
  CreateEncryptionConfigSchema,
  UpdateEncryptionConfigSchema,
  CreateAccessControlConfigSchema,
  UpdateAccessControlConfigSchema,
  CreateRetentionConfigSchema,
  UpdateRetentionConfigSchema,
  CreateAuditTrailSchema,
  UpdateAuditTrailSchema,
  CreateAuditLogSchema,
  UpdateAuditLogSchema,
  CreateAuditReportRecordSchema,
  UpdateAuditReportRecordSchema,
  CreateRiskAssessmentSchema,
  UpdateRiskAssessmentSchema,
  CreateControlFrameworkSchema,
  UpdateControlFrameworkSchema,
  CreateControlAssessmentSchema,
  UpdateControlAssessmentSchema,
  CreateRemediationSchema,
  UpdateRemediationSchema,
  CreateBreachReportSchema,
  UpdateBreachReportSchema,
  CreateDPIASchema,
  UpdateDPIASchema,
  CreateTIASchema,
  UpdateTIASchema,
  CreateComplianceDashboardSchema,
  UpdateComplianceDashboardSchema,
  CreatePolicyDocumentSchema,
  UpdatePolicyDocumentSchema,
  CreateCertificationSchema,
  UpdateCertificationSchema,
}
