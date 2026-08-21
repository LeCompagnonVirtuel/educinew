export enum InsuranceProductType {
  TUITION_PROTECTION = "TUITION_PROTECTION",
  SCHOLARSHIP_PROTECTION = "SCHOLARSHIP_PROTECTION",
  CAMPUS_RISK = "CAMPUS_RISK",
  EQUIPMENT_INSURANCE = "EQUIPMENT_INSURANCE",
  TRAVEL_INSURANCE = "TRAVEL_INSURANCE",
  EDUCATION_CONTINUITY = "EDUCATION_CONTINUITY",
  HEALTH_INSURANCE = "HEALTH_INSURANCE",
  LIABILITY_INSURANCE = "LIABILITY_INSURANCE",
  PROPERTY_INSURANCE = "PROPERTY_INSURANCE",
  CYBER_INSURANCE = "CYBER_INSURANCE",
  DIRECTOR_OFFICER = "DIRECTOR_OFFICER",
  EMPLOYMENT_PRACTICES = "EMPLOYMENT_PRACTICES",
}

export enum CoverageType {
  FULL = "FULL",
  PARTIAL = "PARTIAL",
  CATASTROPHIC = "CATASTROPHIC",
  LIMITED = "LIMITED",
  SUPPLEMENTARY = "SUPPLEMENTARY",
  BASIC = "BASIC",
  PREMIUM = "PREMIUM",
  TIERED = "TIERED",
  BUNDLED = "BUNDLED",
}

export enum ClaimStatus {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  INVESTIGATING = "INVESTIGATING",
  APPROVED = "APPROVED",
  PARTIALLY_APPROVED = "PARTIALLY_APPROVED",
  DENIED = "DENIED",
  APPEALED = "APPEALED",
  SETTLED = "SETTLED",
  CLOSED = "CLOSED",
}

export enum PolicyStatus {
  QUOTE = "QUOTE",
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  LAPSED = "LAPSED",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
  RENEWED = "RENEWED",
}

export enum PremiumFrequency {
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  SEMI_ANNUAL = "SEMI_ANNUAL",
  ANNUAL = "ANNUAL",
  ONE_TIME = "ONE_TIME",
}

export enum RiskCategory {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
  EXTREME = "EXTREME",
}

export enum AssessmentMethod {
  MANUAL = "MANUAL",
  AUTOMATED = "AUTOMATED",
  HYBRID = "HYBRID",
  ML_BASED = "ML_BASED",
  RULE_BASED = "RULE_BASED",
}

export enum ClaimInvestigationType {
  INITIAL_REVIEW = "INITIAL_REVIEW",
  DETAILED_INVESTIGATION = "DETAILED_INVESTIGATION",
  FRAUD_CHECK = "FRAUD_CHECK",
  EXTERNAL_AUDIT = "EXTERNAL_AUDIT",
}

export enum InsuranceConnectorStatus {
  CONNECTED = "CONNECTED",
  DISCONNECTED = "DISCONNECTED",
  ERROR = "ERROR",
  SYNCING = "SYNCING",
}

export enum ClaimResolutionType {
  FULL_PAYMENT = "FULL_PAYMENT",
  PARTIAL_PAYMENT = "PARTIAL_PAYMENT",
  DENIAL = "DENIAL",
  WITHDRAWAL = "WITHDRAWAL",
  SETTLEMENT = "SETTLEMENT",
}

export enum PremiumPaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  OVERDUE = "OVERDUE",
  REFUNDED = "REFUNDED",
  WAIVED = "WAIVED",
}

export enum InsuranceBenefitType {
  TUITION_REFUND = "TUITION_REFUND",
  MEDICAL_COVERAGE = "MEDICAL_COVERAGE",
  LIABILITY_COVERAGE = "LIABILITY_COVERAGE",
  PROPERTY_DAMAGE = "PROPERTY_DAMAGE",
  TRIP_CANCELLATION = "TRIP_CANCELLATION",
  DISABILITY = "DISABILITY",
  DEATH_BENEFIT = "DEATH_BENEFIT",
}

export enum PolicyRenewalStatus {
  AUTO_RENEW = "AUTO_RENEW",
  MANUAL_RENEW = "MANUAL_RENEW",
  NOT_RENEW = "NOT_RENEW",
  PENDING_DECISION = "PENDING_DECISION",
}

export enum InsuranceClaimChannel {
  ONLINE = "ONLINE",
  EMAIL = "EMAIL",
  PHONE = "PHONE",
  IN_PERSON = "IN_PERSON",
  MOBILE_APP = "MOBILE_APP",
}

export enum RiskAssessmentFrequency {
  ANNUAL = "ANNUAL",
  SEMI_ANNUAL = "SEMI_ANNUAL",
  QUARTERLY = "QUARTERLY",
  MONTHLY = "MONTHLY",
  ON_DEMAND = "ON_DEMAND",
}

export enum InsuranceDocumentType {
  POLICY_CERTIFICATE = "POLICY_CERTIFICATE",
  CLAIM_FORM = "CLAIM_FORM",
  EVIDENCE = "EVIDENCE",
  APPROVAL_LETTER = "APPROVAL_LETTER",
  INVOICE = "INVOICE",
}

export interface InsuranceProduct {
  id: string;
  schoolId: string;
  name: string;
  type: InsuranceProductType;
  description: string;
  coverageType: CoverageType;
  maxCoverageAmount: number;
  deductible: number;
  premiumAmount: number;
  premiumFrequency: PremiumFrequency;
  riskCategory: RiskCategory;
  benefits: InsuranceBenefitType[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface StudentCoverage {
  id: string;
  schoolId: string;
  studentId: string;
  policyId: string;
  productId: string;
  status: PolicyStatus;
  coverageAmount: number;
  premiumPaid: number;
  startDate: Date;
  endDate: Date;
  beneficiaries: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface TuitionProtection {
  id: string;
  schoolId: string;
  studentId: string;
  policyId: string;
  tuitionAmount: number;
  protectionLevel: CoverageType;
  coveredEvents: string[];
  refundPercentage: number;
  waitingPeriodDays: number;
  status: PolicyStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ScholarshipProtection {
  id: string;
  schoolId: string;
  scholarshipId: string;
  studentId: string;
  policyId: string;
  scholarshipAmount: number;
  coveragePercentage: number;
  coveredRisks: string[];
  status: PolicyStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CampusRisk {
  id: string;
  schoolId: string;
  riskCategory: RiskCategory;
  riskType: string;
  description: string;
  likelihood: number;
  impact: number;
  riskScore: number;
  mitigationActions: string[];
  assessedBy: string;
  assessmentMethod: AssessmentMethod;
  assessmentDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface EquipmentInsurance {
  id: string;
  schoolId: string;
  policyId: string;
  equipmentType: string;
  equipmentValue: number;
  coverageAmount: number;
  location: string;
  serialNumber: string;
  purchaseDate: Date;
  condition: string;
  status: PolicyStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface TravelInsurance {
  id: string;
  schoolId: string;
  studentId: string;
  policyId: string;
  tripDestination: string;
  tripStartDate: Date;
  tripEndDate: Date;
  coverageAmount: number;
  tripPurpose: string;
  status: PolicyStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface EducationContinuity {
  id: string;
  schoolId: string;
  policyId: string;
  continuityType: string;
  coveredScenarios: string[];
  maximumDurationDays: number;
  supportAmount: number;
  triggerConditions: string[];
  status: PolicyStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface InsuranceClaim {
  id: string;
  schoolId: string;
  policyId: string;
  studentId: string;
  claimType: InsuranceProductType;
  status: ClaimStatus;
  amount: number;
  description: string;
  incidentDate: Date;
  filedDate: Date;
  resolvedDate: Date | null;
  evidence: string[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface InsurancePolicy {
  id: string;
  schoolId: string;
  productId: string;
  holderName: string;
  holderId: string;
  policyNumber: string;
  status: PolicyStatus;
  premiumAmount: number;
  premiumFrequency: PremiumFrequency;
  coverageAmount: number;
  deductible: number;
  startDate: Date;
  endDate: Date;
  renewalDate: Date;
  autoRenew: boolean;
  renewalStatus: PolicyRenewalStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface InsurancePremium {
  id: string;
  schoolId: string;
  policyId: string;
  amount: number;
  dueDate: Date;
  paidDate: Date | null;
  status: PremiumPaymentStatus;
  paymentMethod: string;
  reference: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface RiskAssessment {
  id: string;
  schoolId: string;
  targetType: string;
  targetId: string;
  riskCategory: RiskCategory;
  overallScore: number;
  factors: RiskAssessmentFactor[];
  assessmentMethod: AssessmentMethod;
  assessedAt: Date;
  validUntil: Date;
  assessorId: string;
  recommendations: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface RiskAssessmentFactor {
  factor: string;
  weight: number;
  score: number;
  description: string;
}

export interface InsuranceProvider {
  id: string;
  schoolId: string;
  name: string;
  licenseNumber: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  rating: number;
  products: string[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface InsuranceConnector {
  id: string;
  schoolId: string;
  providerId: string;
  connectorType: string;
  status: InsuranceConnectorStatus;
  lastSyncDate: Date | null;
  syncFrequency: string;
  credentials: Record<string, string>;
  errorMessage: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ClaimInvestigation {
  id: string;
  schoolId: string;
  claimId: string;
  investigationType: ClaimInvestigationType;
  investigatorId: string;
  status: string;
  findings: string;
  recommendations: string[];
  startDate: Date;
  endDate: Date | null;
  evidenceCollected: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ClaimResolution {
  id: string;
  schoolId: string;
  claimId: string;
  investigationId: string;
  resolutionType: ClaimResolutionType;
  approvedAmount: number;
  reasoning: string;
  approvedBy: string;
  resolvedAt: Date;
  paymentDate: Date | null;
  paymentReference: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface InsuranceBenefit {
  id: string;
  schoolId: string;
  productId: string;
  benefitType: InsuranceBenefitType;
  name: string;
  description: string;
  coverageLimit: number;
  waitingPeriodDays: number;
  copayPercent: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ClaimPayment {
  id: string;
  schoolId: string;
  claimId: string;
  resolutionId: string;
  amount: number;
  paymentDate: Date;
  paymentMethod: string;
  reference: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface InsuranceRenewal {
  id: string;
  schoolId: string;
  policyId: string;
  previousEndDate: Date;
  newEndDate: Date;
  renewalStatus: PolicyRenewalStatus;
  premiumChange: number;
  coverageChanges: string[];
  renewalDate: Date;
  decisionBy: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface InsuranceNotification {
  id: string;
  schoolId: string;
  policyId: string;
  notificationType: string;
  title: string;
  message: string;
  sentAt: Date;
  acknowledgedAt: Date | null;
  recipientEmail: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface InsuranceClaimForm {
  id: string;
  schoolId: string;
  claimId: string;
  channel: InsuranceClaimChannel;
  formData: Record<string, string>;
  attachments: string[];
  submittedBy: string;
  submittedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface InsuranceDocument {
  id: string;
  schoolId: string;
  policyId: string;
  claimId: string | null;
  documentType: InsuranceDocumentType;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: Date;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface InsuranceRiskProfile {
  id: string;
  schoolId: string;
  entityType: string;
  entityId: string;
  overallRiskScore: number;
  riskCategory: RiskCategory;
  assessmentFrequency: RiskAssessmentFrequency;
  lastAssessmentDate: Date;
  nextAssessmentDate: Date;
  historicalScores: RiskHistoricalScore[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface RiskHistoricalScore {
  date: Date;
  score: number;
  category: RiskCategory;
}

export interface InsuranceAdjustment {
  id: string;
  schoolId: string;
  policyId: string;
  adjustmentType: string;
  previousPremium: number;
  newPremium: number;
  reason: string;
  effectiveDate: Date;
  approvedBy: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
