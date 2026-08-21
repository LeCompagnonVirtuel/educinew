export enum LoanType {
  TUITION = 'TUITION',
  LIVING_EXPENSE = 'LIVING_EXPENSE',
  BOOKS_EQUIPMENT = 'BOOKS_EQUIPMENT',
  TRAINING = 'TRAINING',
  CERTIFICATION = 'CERTIFICATION',
  RESEARCH = 'RESEARCH',
  EMERGENCY = 'EMERGENCY',
}

export enum LoanStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  DISBURSED = 'DISBURSED',
  ACTIVE = 'ACTIVE',
  IN_REPAYMENT = 'IN_REPAYMENT',
  DEFERRED = 'DEFERRED',
  DEFAULTED = 'DEFAULTED',
  PAID_OFF = 'PAID_OFF',
  WRITTEN_OFF = 'WRITTEN_OFF',
}

export enum CreditAssessmentStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum RiskProfileLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
  NOT_RATED = 'NOT_RATED',
}

export enum InterestRateType {
  FIXED = 'FIXED',
  VARIABLE = 'VARIABLE',
  TIERED = 'TIERED',
  GRADUATED = 'GRADUATED',
  INCOME_BASED = 'INCOME_BASED',
}

export enum RepaymentPlanType {
  STANDARD = 'STANDARD',
  GRADUATED = 'GRADUATED',
  INCOME_CONTINGENT = 'INCOME_CONTINGENT',
  BALLOON = 'BALLOON',
  INTEREST_ONLY = 'INTEREST_ONLY',
}

export enum InstallmentStatus {
  PENDING = 'PENDING',
  DUE = 'DUE',
  PAID = 'PAID',
  LATE = 'LATE',
  MISSED = 'MISSED',
  WAIVED = 'WAIVED',
}

export enum GracePeriodType {
  ENROLLMENT = 'ENROLLMENT',
  GRADUATION = 'GRADUATION',
  HARDSHIP = 'HARDSHIP',
  MILITARY = 'MILITARY',
  MEDICAL = 'MEDICAL',
}

export enum DeferralReason {
  ENROLLMENT = 'ENROLLMENT',
  UNEMPLOYMENT = 'UNEMPLOYMENT',
  MEDICAL = 'MEDICAL',
  MILITARY = 'MILITARY',
  HARDSHIP = 'HARDSHIP',
  FURTHER_STUDY = 'FURTHER_STUDY',
}

export enum RestructuringType {
  TERM_EXTENSION = 'TERM_EXTENSION',
  RATE_REDUCTION = 'RATE_REDUCTION',
  PAYMENT_REDUCTION = 'PAYMENT_REDUCTION',
  FORBEARANCE = 'FORBEARANCE',
  SETTLEMENT = 'SETTLEMENT',
}

export enum DefaultStatus {
  NONE = 'NONE',
  30_DAYS = '30_DAYS',
  60_DAYS = '60_DAYS',
  90_DAYS = '90_DAYS',
  120_DAYS = '120_DAYS',
  180_DAYS = '180_DAYS',
}

export enum RecoveryStatus {
  NONE = 'NONE',
  CONTACT = 'CONTACT',
  NEGOTIATION = 'NEGOTIATION',
  LEGAL = 'LEGAL',
  COLLECTION = 'COLLECTION',
  WRITTEN_OFF = 'WRITTEN_OFF',
}

export interface StudentLoan {
  id: string;
  schoolId: string;
  studentId: string;
  type: LoanType;
  amount: number;
  currency: string;
  interestRate: number;
  termMonths: number;
  status: LoanStatus;
  disbursedAt: string | null;
  maturesAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EducationLoan {
  id: string;
  schoolId: string;
  studentId: string;
  institutionId: string;
  programName: string;
  totalCost: number;
  loanAmount: number;
  downPayment: number;
  currency: string;
  interestRate: number;
  termMonths: number;
  status: LoanStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface TrainingLoan {
  id: string;
  schoolId: string;
  studentId: string;
  trainingProgramId: string;
  providerName: string;
  totalCost: number;
  loanAmount: number;
  currency: string;
  interestRate: number;
  termMonths: number;
  certificationGuarantee: boolean;
  status: LoanStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface FinancingApplication {
  id: string;
  schoolId: string;
  studentId: string;
  loanType: LoanType;
  requestedAmount: number;
  currency: string;
  purpose: string;
  supportingDocuments: string[];
  status: LoanStatus;
  submittedAt: string;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CreditAssessment {
  id: string;
  schoolId: string;
  applicationId: string;
  studentId: string;
  score: number;
  level: RiskProfileLevel;
  factors: Record<string, string>;
  assessedAt: string;
  validUntil: string;
  status: CreditAssessmentStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CreditDecision {
  id: string;
  schoolId: string;
  applicationId: string;
  assessmentId: string;
  decision: string;
  approvedAmount: number;
  interestRate: number;
  termMonths: number;
  conditions: string[];
  decidedBy: string;
  decidedAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface RiskProfile {
  id: string;
  schoolId: string;
  studentId: string;
  level: RiskProfileLevel;
  score: number;
  factors: string[];
  lastAssessedAt: string;
  validUntil: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface InterestRateSchedule {
  id: string;
  schoolId: string;
  loanId: string;
  rateType: InterestRateType;
  baseRate: number;
  spread: number;
  effectiveRate: number;
  validFrom: string;
  validTo: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface RepaymentPlan {
  id: string;
  schoolId: string;
  loanId: string;
  type: RepaymentPlanType;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  numberOfInstallments: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface LoanInstallment {
  id: string;
  schoolId: string;
  loanId: string;
  planId: string;
  installmentNumber: number;
  principalAmount: number;
  interestAmount: number;
  totalAmount: number;
  dueDate: string;
  paidDate: string | null;
  paidAmount: number;
  status: InstallmentStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface GracePeriod {
  id: string;
  schoolId: string;
  loanId: string;
  type: GracePeriodType;
  startDate: string;
  endDate: string;
  reason: string;
  approvedBy: string;
  interestAccrues: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Deferral {
  id: string;
  schoolId: string;
  loanId: string;
  reason: DeferralReason;
  startDate: string;
  endDate: string;
  monthsDeferred: number;
  interestAccrues: boolean;
  approvedBy: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface LoanRestructuring {
  id: string;
  schoolId: string;
  loanId: string;
  type: RestructuringType;
  previousTerms: Record<string, string>;
  newTerms: Record<string, string>;
  reason: string;
  approvedBy: string;
  effectiveDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EarlyRepayment {
  id: string;
  schoolId: string;
  loanId: string;
  amount: number;
  currency: string;
  penaltyAmount: number;
  savedInterest: number;
  processedAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface LoanDefault {
  id: string;
  schoolId: string;
  loanId: string;
  status: DefaultStatus;
  defaultedAt: string;
  amountInDefault: number;
  daysOverdue: number;
  lastContactAt: string | null;
  nextAction: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface LoanRecovery {
  id: string;
  schoolId: string;
  loanId: string;
  defaultId: string;
  status: RecoveryStatus;
  recoveredAmount: number;
  recoveryMethod: string;
  agencyName: string | null;
  legalAction: boolean;
  resolvedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface LoanCollateral {
  id: string;
  schoolId: string;
  loanId: string;
  type: string;
  description: string;
  estimatedValue: number;
  currency: string;
  verifiedAt: string | null;
  lienHolder: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Guarantor {
  id: string;
  schoolId: string;
  loanId: string;
  name: string;
  relationship: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  incomeVerified: boolean;
  creditScore: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
