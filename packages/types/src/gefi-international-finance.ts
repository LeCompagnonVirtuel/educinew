export enum InternationalDonorType {
  BILATERAL = 'BILATERAL',
  MULTILATERAL = 'MULTILATERAL',
  NGO = 'NGO',
  FOUNDATION = 'FOUNDATION',
  CORPORATE = 'CORPORATE',
  INDIVIDUAL = 'INDIVIDUAL',
  FAITH_BASED = 'FAITH_BASED',
  DEVELOPMENT_AGENCY = 'DEVELOPMENT_AGENCY',
}

export enum GrantType {
  PROJECT = 'PROJECT',
  PROGRAM = 'PROGRAM',
  CORE = 'CORE',
  TECHNICAL_ASSISTANCE = 'TECHNICAL_ASSISTANCE',
  CAPACITY_BUILDING = 'CAPACITY_BUILDING',
  EMERGENCY = 'EMERGENCY',
  RESEARCH = 'RESEARCH',
  INNOVATION = 'INNOVATION',
}

export enum FundingAgreementStatus {
  DRAFT = 'DRAFT',
  NEGOTIATION = 'NEGOTIATION',
  SIGNED = 'SIGNED',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  COMPLETED = 'COMPLETED',
  TERMINATED = 'TERMINATED',
}

export enum DisbursementStage {
  ADVANCE = 'ADVANCE',
  INSTALLMENT = 'INSTALLMENT',
  MILESTONE = 'MILESTONE',
  REIMBURSEMENT = 'REIMBURSEMENT',
  FINAL = 'FINAL',
}

export enum ComplianceStatus {
  COMPLIANT = 'COMPLIANT',
  PARTIALLY_COMPLIANT = 'PARTIALLY_COMPLIANT',
  NON_COMPLIANT = 'NON_COMPLIANT',
  UNDER_REVIEW = 'UNDER_REVIEW',
  REMEDIATION = 'REMEDIATION',
}

export enum ImpactMetricType {
  QUANTITATIVE = 'QUANTITATIVE',
  QUALITATIVE = 'QUALITATIVE',
  OUTCOME = 'OUTCOME',
  OUTPUT = 'OUTPUT',
  IMPACT = 'IMPACT',
}

export enum ReportingFrequency {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  SEMI_ANNUAL = 'SEMI_ANNUAL',
  ANNUAL = 'ANNUAL',
  MILESTONE = 'MILESTONE',
}

export interface InternationalDonor {
  id: string;
  schoolId: string;
  name: string;
  type: InternationalDonorType;
  country: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  totalContributions: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface InternationalGrant {
  id: string;
  schoolId: string;
  donorId: string;
  title: string;
  type: GrantType;
  totalAmount: number;
  disbursedAmount: number;
  currency: string;
  startDate: string;
  endDate: string;
  status: string;
  referenceNumber: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface FundingProgram {
  id: string;
  schoolId: string;
  grantId: string;
  name: string;
  description: string;
  objectives: string[];
  targetBeneficiaries: number;
  targetGeography: string;
  totalBudget: number;
  currency: string;
  duration: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface FundingAgreement {
  id: string;
  schoolId: string;
  grantId: string;
  donorId: string;
  agreementNumber: string;
  signedDate: string;
  effectiveDate: string;
  expirationDate: string;
  totalAmount: number;
  currency: string;
  terms: string[];
  status: FundingAgreementStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface GrantDisbursement {
  id: string;
  schoolId: string;
  grantId: string;
  agreementId: string;
  stage: DisbursementStage;
  amount: number;
  currency: string;
  requestedDate: string;
  receivedDate: string | null;
  referenceNumber: string;
  bankAccount: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface GrantMilestone {
  id: string;
  schoolId: string;
  grantId: string;
  programId: string;
  name: string;
  description: string;
  targetDate: string;
  completedDate: string | null;
  deliverables: string[];
  status: string;
  percentageComplete: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface GrantReporting {
  id: string;
  schoolId: string;
  grantId: string;
  reportType: string;
  reportingPeriod: string;
  submissionDate: string;
  reportUrl: string;
  status: string;
  reviewedBy: string | null;
  reviewedAt: string | null;
  feedback: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface GrantCompliance {
  id: string;
  schoolId: string;
  grantId: string;
  requirement: string;
  status: ComplianceStatus;
  evidence: string[];
  deadline: string;
  submittedAt: string | null;
  verifiedAt: string | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ImpactMeasurement {
  id: string;
  schoolId: string;
  grantId: string;
  programId: string;
  metricName: string;
  metricType: ImpactMetricType;
  targetValue: number;
  actualValue: number;
  unit: string;
  measurementDate: string;
  methodology: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface DevelopmentAgency {
  id: string;
  schoolId: string;
  name: string;
  country: string;
  agencyCode: string;
  focusAreas: string[];
  totalFunding: number;
  currency: string;
  contactEmail: string;
  contactPhone: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface NGOProgram {
  id: string;
  schoolId: string;
  ngoName: string;
  programName: string;
  description: string;
  totalBudget: number;
  currency: string;
  startDate: string;
  endDate: string;
  targetPopulation: number;
  beneficiariesReached: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface FoundationProgram {
  id: string;
  schoolId: string;
  foundationName: string;
  programName: string;
  focusArea: string;
  totalGrant: number;
  disbursedAmount: number;
  currency: string;
  applicationDeadline: string;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface MultilateralProgram {
  id: string;
  schoolId: string;
  organizationName: string;
  programName: string;
  memberCountries: string[];
  totalFundSize: number;
  allocation: number;
  currency: string;
  sector: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface DonorReport {
  id: string;
  schoolId: string;
  donorId: string;
  grantId: string;
  reportPeriod: string;
  financialSummary: Record<string, number>;
  narrativeSummary: string;
  challenges: string[];
  nextSteps: string[];
  submissionDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
