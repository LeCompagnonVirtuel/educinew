export enum GovBudgetLevel {
  NATIONAL = 'NATIONAL',
  REGIONAL = 'REGIONAL',
  DISTRICT = 'DISTRICT',
  SUB_DISTRICT = 'SUB_DISTRICT',
  SCHOOL = 'SCHOOL',
}

export enum FundingAllocationMethod {
  PER_STUDENT = 'PER_STUDENT',
  PER_TEACHER = 'PER_TEACHER',
  FORMULA_BASED = 'FORMULA_BASED',
  PERFORMANCE_BASED = 'PERFORMANCE_BASED',
  NEED_BASED = 'NEED_BASED',
  HISTORICAL = 'HISTORICAL',
  EQUALIZATION = 'EQUALIZATION',
}

export enum DisbursementStatus {
  PLANNED = 'PLANNED',
  APPROVED = 'APPROVED',
  PROCESSING = 'PROCESSING',
  DISBURSED = 'DISBURSED',
  RECEIVED = 'RECEIVED',
  VERIFIED = 'VERIFIED',
  DELAYED = 'DELAYED',
  CANCELLED = 'CANCELLED',
}

export enum MonitoringStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  ON_TRACK = 'ON_TRACK',
  OFF_TRACK = 'OFF_TRACK',
  COMPLETED = 'COMPLETED',
  ESCALATED = 'ESCALATED',
}

export enum BudgetExecutionStatus {
  NOT_STARTED = 'NOT_STARTED',
  PARTIAL = 'PARTIAL',
  ON_TRACK = 'ON_TRACK',
  AHEAD = 'AHEAD',
  BEHIND = 'BEHIND',
  COMPLETED = 'COMPLETED',
  OVERSPENT = 'OVERSPENT',
}

export enum PublicProcurementType {
  DIRECT = 'DIRECT',
  REQUEST_FOR_PROPOSAL = 'REQUEST_FOR_PROPOSAL',
  REQUEST_FOR_QUOTATION = 'REQUEST_FOR_QUOTATION',
  OPEN_TENDER = 'OPEN_TENDER',
  RESTRICTED_TENDER = 'RESTRICTED_TENDER',
  EMERGENCY = 'EMERGENCY',
}

export enum AuditResult {
  CLEAN = 'CLEAN',
  QUALIFIED = 'QUALIFIED',
  ADVERSE = 'ADVERSE',
  DISCLAIMER = 'DISCLAIMER',
  FOLLOW_UP_REQUIRED = 'FOLLOW_UP_REQUIRED',
  PENDING = 'PENDING',
}

export interface NationalEducationBudget {
  id: string;
  schoolId: string;
  fiscalYear: string;
  totalBudget: number;
  allocationToEducation: number;
  perStudentAllocation: number;
  currency: string;
  source: string;
  approvedBy: string;
  approvedAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface RegionalBudget {
  id: string;
  schoolId: string;
  regionCode: string;
  regionName: string;
  fiscalYear: string;
  allocatedAmount: number;
  receivedAmount: number;
  spentAmount: number;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface DistrictBudget {
  id: string;
  schoolId: string;
  districtCode: string;
  districtName: string;
  regionCode: string;
  fiscalYear: string;
  allocatedAmount: number;
  receivedAmount: number;
  spentAmount: number;
  schoolCount: number;
  studentCount: number;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SchoolFunding {
  id: string;
  schoolId: string;
  fiscalYear: string;
  sourceType: string;
  sourceName: string;
  allocatedAmount: number;
  disbursedAmount: number;
  spentAmount: number;
  balance: number;
  currency: string;
  conditions: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PerStudentFunding {
  id: string;
  schoolId: string;
  fiscalYear: string;
  studentCount: number;
  fundingPerStudent: number;
  totalFunding: number;
  currency: string;
  allocationMethod: FundingAllocationMethod;
  adjustmentFactor: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface TeacherPayrollFunding {
  id: string;
  schoolId: string;
  fiscalYear: string;
  teacherCount: number;
  averageSalary: number;
  totalPayroll: number;
  governmentContribution: number;
  schoolContribution: number;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface InfrastructureFunding {
  id: string;
  schoolId: string;
  projectName: string;
  projectType: string;
  totalCost: number;
  governmentFunding: number;
  schoolContribution: number;
  externalFunding: number;
  currency: string;
  status: string;
  startDate: string;
  expectedEndDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ScholarshipFundingGov {
  id: string;
  schoolId: string;
  programName: string;
  totalBudget: number;
  disbursedAmount: number;
  beneficiariesCount: number;
  averageAward: number;
  currency: string;
  criteria: string[];
  fiscalYear: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EmergencyFunding {
  id: string;
  schoolId: string;
  reason: string;
  requestedAmount: number;
  approvedAmount: number;
  currency: string;
  source: string;
  urgencyLevel: string;
  status: string;
  requestedBy: string;
  approvedBy: string;
  disbursedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EducationGrant {
  id: string;
  schoolId: string;
  grantName: string;
  donorName: string;
  totalAmount: number;
  disbursedAmount: number;
  currency: string;
  purpose: string;
  duration: string;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PublicProcurement {
  id: string;
  schoolId: string;
  procurementNumber: string;
  type: PublicProcurementType;
  description: string;
  estimatedValue: number;
  currency: string;
  publicationDate: string;
  closingDate: string;
  awardedTo: string | null;
  awardedAmount: number | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface FundingAllocation {
  id: string;
  schoolId: string;
  sourceId: string;
  districtId: string;
  regionCode: string;
  amount: number;
  currency: string;
  method: FundingAllocationMethod;
  formula: Record<string, number>;
  fiscalYear: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface FundingDisbursement {
  id: string;
  schoolId: string;
  allocationId: string;
  amount: number;
  currency: string;
  disbursementDate: string;
  referenceNumber: string;
  bankAccount: string;
  status: DisbursementStatus;
  receivedBy: string;
  receivedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface FundingMonitoring {
  id: string;
  schoolId: string;
  allocationId: string;
  period: string;
  budgetedAmount: number;
  spentAmount: number;
  utilizationRate: number;
  status: MonitoringStatus;
  reportUrl: string;
  comments: string;
  monitoredBy: string;
  monitoredAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface BudgetExecution {
  id: string;
  schoolId: string;
  allocationId: string;
  lineItem: string;
  budgetedAmount: number;
  executedAmount: number;
  executionRate: number;
  status: BudgetExecutionStatus;
  variance: number;
  explanation: string;
  period: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface GovernmentFinanceAudit {
  id: string;
  schoolId: string;
  auditType: string;
  fiscalYear: string;
  auditedBy: string;
  auditDate: string;
  findings: string[];
  recommendations: string[];
  result: AuditResult;
  reportUrl: string;
  followUpDate: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
