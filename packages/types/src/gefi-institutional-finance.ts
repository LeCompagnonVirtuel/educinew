export enum InstitutionalBudgetType {
  OPERATIONAL = 'OPERATIONAL',
  CAPITAL = 'CAPITAL',
  PROJECT = 'PROJECT',
  DEPARTMENTAL = 'DEPARTMENTAL',
  PROGRAM = 'PROGRAM',
  GRANT_FUNDED = 'GRANT_FUNDED',
  RESTRICTED = 'RESTRICTED',
}

export enum ExpenseCategory {
  SALARIES = 'SALARIES',
  BENEFITS = 'BENEFITS',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  EQUIPMENT = 'EQUIPMENT',
  SUPPLIES = 'SUPPLIES',
  UTILITIES = 'UTILITIES',
  MAINTENANCE = 'MAINTENANCE',
  TRANSPORT = 'TRANSPORT',
  TECHNOLOGY = 'TECHNOLOGY',
  PROFESSIONAL_DEVELOPMENT = 'PROFESSIONAL_DEVELOPMENT',
  MARKETING = 'MARKETING',
  INSURANCE = 'INSURANCE',
  DEBT_SERVICE = 'DEBT_SERVICE',
}

export enum PurchaseOrderStatus {
  DRAFT = 'DRAFT',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SENT = 'SENT',
  PARTIALLY_RECEIVED = 'PARTIALLY_RECEIVED',
  RECEIVED = 'RECEIVED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum VendorStatus {
  PROSPECT = 'PROSPECT',
  APPROVED = 'APPROVED',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  BLACKLISTED = 'BLACKLISTED',
  INACTIVE = 'INACTIVE',
}

export enum InvoiceManagementStatus {
  DRAFT = 'DRAFT',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SCHEDULED = 'SCHEDULED',
  PAID = 'PAID',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED',
}

export enum ProcurementMethod {
  DIRECT = 'DIRECT',
  QUOTATION = 'QUOTATION',
  TENDER = 'TENDER',
  AUCTION = 'AUCTION',
  FRAMEWORK = 'FRAMEWORK',
  EMERGENCY = 'EMERGENCY',
}

export enum ApprovalWorkflowStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  REVERTED = 'REVERTED',
  EXPIRED = 'EXPIRED',
}

export enum APStatus {
  DRAFT = 'DRAFT',
  REGISTERED = 'REGISTERED',
  SCHEDULED = 'SCHEDULED',
  PROCESSING = 'PROCESSING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  DISPUTED = 'DISPUTED',
}

export enum ARStatus {
  DRAFT = 'DRAFT',
  INVOICED = 'INVOICED',
  SENT = 'SENT',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  WRITTEN_OFF = 'WRITTEN_OFF',
}

export interface InstitutionalBudget {
  id: string;
  schoolId: string;
  name: string;
  type: InstitutionalBudgetType;
  fiscalYearId: string;
  totalAmount: number;
  spentAmount: number;
  remainingAmount: number;
  currency: string;
  status: string;
  approvedBy: string;
  approvedAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface BudgetAllocation {
  id: string;
  schoolId: string;
  budgetId: string;
  category: ExpenseCategory;
  amount: number;
  spentAmount: number;
  committedAmount: number;
  availableAmount: number;
  costCenterId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface BudgetExecution {
  id: string;
  schoolId: string;
  budgetId: string;
  allocationId: string;
  amount: number;
  type: string;
  reference: string;
  description: string;
  executedAt: string;
  executedBy: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface BudgetVariance {
  id: string;
  schoolId: string;
  budgetId: string;
  allocationId: string;
  budgetedAmount: number;
  actualAmount: number;
  variance: number;
  variancePercentage: number;
  period: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ExpenseManagement {
  id: string;
  schoolId: string;
  expenseNumber: string;
  category: ExpenseCategory;
  amount: number;
  currency: string;
  vendorId: string | null;
  invoiceNumber: string | null;
  description: string;
  receiptUrl: string;
  status: string;
  submittedBy: string;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PurchaseRequest {
  id: string;
  schoolId: string;
  requestNumber: string;
  requestedBy: string;
  department: string;
  items: string[];
  totalEstimatedAmount: number;
  currency: string;
  justification: string;
  priority: string;
  status: string;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PurchaseOrder {
  id: string;
  schoolId: string;
  orderNumber: string;
  vendorId: string;
  purchaseRequestId: string | null;
  totalAmount: number;
  currency: string;
  items: string[];
  expectedDeliveryDate: string;
  shippingAddress: string;
  status: PurchaseOrderStatus;
  approvedBy: string;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Vendor {
  id: string;
  schoolId: string;
  name: string;
  registrationNumber: string;
  taxId: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  bankAccount: string;
  status: VendorStatus;
  rating: number;
  totalTransactions: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface VendorEvaluation {
  id: string;
  schoolId: string;
  vendorId: string;
  evaluationPeriod: string;
  qualityScore: number;
  deliveryScore: number;
  priceScore: number;
  serviceScore: number;
  overallScore: number;
  comments: string;
  evaluatedBy: string;
  evaluatedAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface InvoiceManagement {
  id: string;
  schoolId: string;
  invoiceNumber: string;
  vendorId: string;
  purchaseOrderId: string | null;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  dueDate: string;
  status: InvoiceManagementStatus;
  approvedBy: string | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface AccountPayable {
  id: string;
  schoolId: string;
  vendorId: string;
  invoiceId: string;
  amount: number;
  currency: string;
  dueDate: string;
  paidAmount: number;
  paidDate: string | null;
  status: APStatus;
  paymentReference: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface AccountReceivable {
  id: string;
  schoolId: string;
  studentId: string | null;
  invoiceNumber: string;
  amount: number;
  currency: string;
  dueDate: string;
  receivedAmount: number;
  receivedDate: string | null;
  status: ARStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Procurement {
  id: string;
  schoolId: string;
  procurementNumber: string;
  method: ProcurementMethod;
  description: string;
  estimatedBudget: number;
  currency: string;
  requiredBy: string;
  status: string;
  initiatedBy: string;
  initiatedAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ProcurementApproval {
  id: string;
  schoolId: string;
  procurementId: string;
  workflowId: string;
  status: ApprovalWorkflowStatus;
  currentStep: number;
  totalSteps: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ApprovalWorkflow {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  steps: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ApprovalStep {
  id: string;
  schoolId: string;
  workflowId: string;
  stepNumber: number;
  name: string;
  approverRole: string;
  approverId: string | null;
  status: ApprovalWorkflowStatus;
  comments: string;
  decidedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface FinancialDashboard {
  id: string;
  schoolId: string;
  period: string;
  totalRevenue: number;
  totalExpenses: number;
  netIncome: number;
  cashFlow: number;
  accountsReceivable: number;
  accountsPayable: number;
  budgetUtilization: number;
  currency: string;
  generatedAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
