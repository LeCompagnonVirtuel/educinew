export enum GEFIScholarshipType {
  MERIT = 'MERIT',
  NEED_BASED = 'NEED_BASED',
  SPORTS = 'SPORTS',
  ARTS = 'ARTS',
  TECHNICAL = 'TECHNICAL',
  GOVERNMENT = 'GOVERNMENT',
  PRIVATE = 'PRIVATE',
  CORPORATE = 'CORPORATE',
  INTERNATIONAL = 'INTERNATIONAL',
  EMERGENCY = 'EMERGENCY',
}

export enum EligibilityCriteria {
  ACADEMIC = 'ACADEMIC',
  FINANCIAL = 'FINANCIAL',
  DEMOGRAPHIC = 'DEMOGRAPHIC',
  GEOGRAPHIC = 'GEOGRAPHIC',
  MERIT = 'MERIT',
  NEED = 'NEED',
  ATHLETIC = 'ATHLETIC',
  ARTISTIC = 'ARTISTIC',
  COMMUNITY = 'COMMUNITY',
}

export enum ApplicationStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  DOCUMENTS_REQUIRED = 'DOCUMENTS_REQUIRED',
  INTERVIEW = 'INTERVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  WAITLISTED = 'WAITLISTED',
  EXPIRED = 'EXPIRED',
  WITHDRAWN = 'WITHDRAWN',
}

export enum ReviewStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ESCALATED = 'ESCALATED',
}

export enum DisbursementMethod {
  DIRECT_TO_SCHOOL = 'DIRECT_TO_SCHOOL',
  DIRECT_TO_STUDENT = 'DIRECT_TO_STUDENT',
  WALLET = 'WALLET',
  BANK_TRANSFER = 'BANK_TRANSFER',
  INSTALLMENT = 'INSTALLMENT',
  MILESTONE = 'MILESTONE',
}

export enum RenewalStatus {
  ELIGIBLE = 'ELIGIBLE',
  APPLIED = 'APPLIED',
  RENEWED = 'RENEWED',
  EXPIRED = 'EXPIRED',
  SUSPENDED = 'SUSPENDED',
  TERMINATED = 'TERMINATED',
}

export enum SuspensionReason {
  ACADEMIC_FAILURE = 'ACADEMIC_FAILURE',
  DISCIPLINARY = 'DISCIPLINARY',
  ABSENCE = 'ABSENCE',
  FRAUD = 'FRAUD',
  VOLUNTARY = 'VOLUNTARY',
  INSTITUTIONAL = 'INSTITUTIONAL',
}

export enum AidPackageType {
  FULL_RIDE = 'FULL_RIDE',
  PARTIAL = 'PARTIAL',
  TUITION_ONLY = 'TUITION_ONLY',
  HOUSING = 'HOUSING',
  BOOKS = 'BOOKS',
  TRANSPORT = 'TRANSPORT',
  MEALS = 'MEALS',
  COMPREHENSIVE = 'COMPREHENSIVE',
}

export interface GEFIScholarshipRegistry {
  id: string;
  schoolId: string;
  name: string;
  type: GEFIScholarshipType;
  description: string;
  totalBudget: number;
  awardedAmount: number;
  remainingBudget: number;
  currency: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ScholarshipProgram {
  id: string;
  schoolId: string;
  registryId: string;
  name: string;
  type: GEFIScholarshipType;
  eligibilityCriteria: EligibilityCriteria[];
  amount: number;
  maxRecipients: number;
  currentRecipients: number;
  renewalAllowed: boolean;
  requiresEssay: boolean;
  requiresInterview: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EligibilityRule {
  id: string;
  schoolId: string;
  programId: string;
  criteria: EligibilityCriteria;
  operator: string;
  value: string;
  weight: number;
  isRequired: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EligibilityCondition {
  id: string;
  schoolId: string;
  ruleId: string;
  field: string;
  comparator: string;
  value: string;
  logicGate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ScholarshipApplication {
  id: string;
  schoolId: string;
  programId: string;
  studentId: string;
  academicYear: string;
  status: ApplicationStatus;
  submittedAt: string;
  reviewedAt: string | null;
  decisionAt: string | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ApplicationReview {
  id: string;
  schoolId: string;
  applicationId: string;
  reviewerId: string;
  status: ReviewStatus;
  score: number;
  comments: string;
  recommendation: string;
  reviewedAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ScholarshipApproval {
  id: string;
  schoolId: string;
  applicationId: string;
  approvedBy: string;
  amount: number;
  duration: string;
  conditions: string[];
  validFrom: string;
  validTo: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ScholarshipRejection {
  id: string;
  schoolId: string;
  applicationId: string;
  rejectedBy: string;
  reason: string;
  appealDeadline: string;
  feedback: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ScholarshipAward {
  id: string;
  schoolId: string;
  applicationId: string;
  studentId: string;
  programId: string;
  amount: number;
  currency: string;
  disbursementMethod: DisbursementMethod;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ScholarshipDisbursement {
  id: string;
  schoolId: string;
  awardId: string;
  amount: number;
  currency: string;
  method: DisbursementMethod;
  reference: string;
  status: string;
  disbursedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ScholarshipRenewal {
  id: string;
  schoolId: string;
  awardId: string;
  studentId: string;
  academicYear: string;
  status: RenewalStatus;
  gpa: number;
  requirementsMet: boolean;
  appliedAt: string;
  renewedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ScholarshipSuspension {
  id: string;
  schoolId: string;
  awardId: string;
  studentId: string;
  reason: SuspensionReason;
  suspendedBy: string;
  suspendedAt: string;
  expectedReinstatement: string | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ScholarshipRevocation {
  id: string;
  schoolId: string;
  awardId: string;
  studentId: string;
  reason: string;
  revokedBy: string;
  revokedAt: string;
  refundRequired: boolean;
  refundAmount: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface FinancialAidPackage {
  id: string;
  schoolId: string;
  studentId: string;
  academicYear: string;
  type: AidPackageType;
  totalAmount: number;
  currency: string;
  components: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface AidPackageComponent {
  id: string;
  schoolId: string;
  packageId: string;
  name: string;
  type: string;
  amount: number;
  currency: string;
  source: string;
  isGuaranteed: boolean;
  renewalConditions: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ScholarshipCriteriaEngine {
  id: string;
  schoolId: string;
  programId: string;
  rules: string[];
  weights: Record<string, number>;
  passingScore: number;
  autoEvaluate: boolean;
  lastEvaluatedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
