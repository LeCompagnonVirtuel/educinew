import { z } from 'zod';

const invoiceStatusEnum = z.enum(['draft', 'pending', 'paid', 'partially_paid', 'overdue', 'cancelled', 'refunded']);
const paymentMethodEnum = z.enum(['cash', 'bank_transfer', 'credit_card', 'debit_card', 'mobile_money', 'check', 'online', 'installment']);
const paymentStatusEnum = z.enum(['pending', 'completed', 'failed', 'cancelled', 'refunded', 'partially_refunded']);
const expenseStatusEnum = z.enum(['pending', 'approved', 'rejected', 'paid', 'cancelled']);
const expenseCategoryEnum = z.enum(['salary', 'supplies', 'maintenance', 'utilities', 'transport', 'insurance', 'marketing', 'technology', 'other']);
const transactionTypeEnum = z.enum(['income', 'expense', 'transfer', 'adjustment', 'refund', 'discount']);
const cashRegisterMovementTypeEnum = z.enum(['opening', 'closing', 'sale', 'refund', 'withdrawal', 'deposit', 'adjustment']);
const entryStatusEnum = z.enum(['draft', 'posted', 'voided']);
const accountTypeEnum = z.enum(['asset', 'liability', 'equity', 'revenue', 'expense']);
const accountSubTypeEnum = z.enum(['current_asset', 'fixed_asset', 'current_liability', 'long_term_liability', 'operating_revenue', 'non_operating_revenue']);
const budgetStatusEnum = z.enum(['draft', 'active', 'frozen', 'closed']);
const discountTypeEnum = z.enum(['percentage', 'fixed', 'early_payment', 'sibling', 'scholarship']);
const scholarshipTypeEnum = z.enum(['merit', 'need_based', 'athletic', 'sibling', 'staff', 'other']);
const refundStatusEnum = z.enum(['pending', 'approved', 'rejected', 'processed', 'completed']);
const refundReasonEnum = z.enum(['overpayment', 'duplicate_payment', 'course_cancellation', 'withdrawal', 'error', 'other']);
const lateFeeTypeEnum = z.enum(['fixed', 'percentage', 'daily', 'monthly']);
const reportTypeEnum = z.enum(['income_statement', 'balance_sheet', 'cash_flow', 'profit_loss', 'trial_balance', 'aged_receivables', 'budget_vs_actual', 'custom']);
const notificationTypeEnum = z.enum(['payment_received', 'payment_overdue', 'invoice_created', 'invoice_reminder', 'refund_processed', 'budget_alert', 'expense_approved', 'expense_rejected']);
const installmentStatusEnum = z.enum(['pending', 'paid', 'overdue', 'skipped', 'waived']);
const installmentFrequencyEnum = z.enum(['monthly', 'quarterly', 'bi_annual', 'annual']);

export const createInvoiceSchema = z.object({
  schoolId: z.string().uuid(),
  studentId: z.string().uuid(),
  academicYearId: z.string().uuid(),
  classId: z.string().uuid().optional(),
  templateId: z.string().uuid().optional(),
  title: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  dueDate: z.string().datetime(),
  items: z.array(z.object({
    description: z.string().min(1).max(255),
    quantity: z.number().int().positive(),
    unitPrice: z.number().positive(),
    taxRate: z.number().min(0).max(100).optional(),
    discountAmount: z.number().min(0).optional(),
    category: z.string().max(100).optional(),
    metadata: z.record(z.unknown()).optional(),
  })).min(1),
  discountId: z.string().uuid().optional(),
  scholarshipId: z.string().uuid().optional(),
  notes: z.string().max(1000).optional(),
  internalNotes: z.string().max(1000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateInvoiceSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().max(1000).optional(),
  dueDate: z.string().datetime().optional(),
  status: invoiceStatusEnum.optional(),
  notes: z.string().max(1000).optional(),
  internalNotes: z.string().max(1000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createInvoiceItemSchema = z.object({
  invoiceId: z.string().uuid(),
  description: z.string().min(1).max(255),
  quantity: z.number().int().positive(),
  unitPrice: z.number().positive(),
  taxRate: z.number().min(0).max(100).optional(),
  discountAmount: z.number().min(0).optional(),
  category: z.string().max(100).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createInvoiceTemplateSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  category: z.string().max(100).optional(),
  items: z.array(z.object({
    description: z.string().min(1).max(255),
    defaultQuantity: z.number().int().positive().optional(),
    defaultUnitPrice: z.number().positive().optional(),
    defaultTaxRate: z.number().min(0).max(100).optional(),
    category: z.string().max(100).optional(),
    isRequired: z.boolean().optional(),
    sortOrder: z.number().int().min(0).optional(),
  })).min(1),
  defaultNotes: z.string().max(1000).optional(),
  defaultDueDays: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const paymentSchema = z.object({
  schoolId: z.string().uuid(),
  invoiceId: z.string().uuid(),
  studentId: z.string().uuid(),
  amount: z.number().positive(),
  method: paymentMethodEnum,
  reference: z.string().max(255).optional(),
  transactionId: z.string().max(255).optional(),
  paymentDate: z.string().datetime().optional(),
  notes: z.string().max(1000).optional(),
  metadata: z.record(z.unknown()).optional(),
  installments: z.array(z.object({
    amount: z.number().positive(),
    dueDate: z.string().datetime(),
    description: z.string().max(255).optional(),
  })).optional(),
});

export const bulkPaymentSchema = z.object({
  schoolId: z.string().uuid(),
  studentId: z.string().uuid(),
  payments: z.array(z.object({
    invoiceId: z.string().uuid(),
    amount: z.number().positive(),
    method: paymentMethodEnum,
    reference: z.string().max(255).optional(),
    paymentDate: z.string().datetime().optional(),
  })).min(1),
  totalAmount: z.number().positive(),
  paymentMethod: paymentMethodEnum,
  reference: z.string().max(255).optional(),
  notes: z.string().max(1000).optional(),
});

export const partialPaymentSchema = z.object({
  schoolId: z.string().uuid(),
  invoiceId: z.string().uuid(),
  studentId: z.string().uuid(),
  amount: z.number().positive(),
  method: paymentMethodEnum,
  reference: z.string().max(255).optional(),
  paymentDate: z.string().datetime().optional(),
  notes: z.string().max(1000).optional(),
});

export const onlinePaymentSchema = z.object({
  schoolId: z.string().uuid(),
  invoiceId: z.string().uuid(),
  studentId: z.string().uuid(),
  amount: z.number().positive(),
  provider: z.string().min(1).max(100),
  returnUrl: z.string().url().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const confirmPaymentSchema = z.object({
  paymentId: z.string().uuid(),
  transactionId: z.string().min(1).max(255),
  status: z.enum(['completed', 'failed']),
  gatewayResponse: z.record(z.unknown()).optional(),
  notes: z.string().max(1000).optional(),
});

export const cancelPaymentSchema = z.object({
  paymentId: z.string().uuid(),
  reason: z.string().min(1).max(1000),
  cancelledBy: z.string().uuid(),
});

export const refundSchema = z.object({
  schoolId: z.string().uuid(),
  paymentId: z.string().uuid(),
  studentId: z.string().uuid(),
  amount: z.number().positive(),
  reason: refundReasonEnum,
  description: z.string().max(1000).optional(),
  refundMethod: paymentMethodEnum.optional(),
  processedBy: z.string().uuid().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const approveRefundSchema = z.object({
  refundId: z.string().uuid(),
  approvedBy: z.string().uuid(),
  approved: z.boolean(),
  notes: z.string().max(1000).optional(),
});

export const expenseSchema = z.object({
  schoolId: z.string().uuid(),
  title: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  amount: z.number().positive(),
  category: expenseCategoryEnum,
  accountId: z.string().uuid().optional(),
  vendorId: z.string().uuid().optional(),
  invoiceNumber: z.string().max(255).optional(),
  receiptUrl: z.string().url().optional(),
  expenseDate: z.string().datetime(),
  dueDate: z.string().datetime().optional(),
  paymentMethod: paymentMethodEnum.optional(),
  status: expenseStatusEnum.optional(),
  submittedBy: z.string().uuid(),
  approvedBy: z.string().uuid().optional(),
  tags: z.array(z.string().max(50)).optional(),
  attachments: z.array(z.string().url()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateExpenseSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().max(1000).optional(),
  amount: z.number().positive().optional(),
  category: expenseCategoryEnum.optional(),
  accountId: z.string().uuid().optional(),
  vendorId: z.string().uuid().optional(),
  invoiceNumber: z.string().max(255).optional(),
  receiptUrl: z.string().url().optional(),
  expenseDate: z.string().datetime().optional(),
  dueDate: z.string().datetime().optional(),
  paymentMethod: paymentMethodEnum.optional(),
  status: expenseStatusEnum.optional(),
  tags: z.array(z.string().max(50)).optional(),
  attachments: z.array(z.string().url()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const approveExpenseSchema = z.object({
  expenseId: z.string().uuid(),
  approvedBy: z.string().uuid(),
  approved: z.boolean(),
  notes: z.string().max(1000).optional(),
});

export const revenueSchema = z.object({
  schoolId: z.string().uuid(),
  source: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  amount: z.number().positive(),
  category: z.string().max(100),
  accountId: z.string().uuid().optional(),
  invoiceId: z.string().uuid().optional(),
  studentId: z.string().uuid().optional(),
  receiptDate: z.string().datetime(),
  paymentMethod: paymentMethodEnum.optional(),
  reference: z.string().max(255).optional(),
  tags: z.array(z.string().max(50)).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const cashRegisterSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(255),
  location: z.string().max(255).optional(),
  assignedTo: z.string().uuid().optional(),
  openingBalance: z.number().min(0).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const openCashRegisterSchema = z.object({
  cashRegisterId: z.string().uuid(),
  openingBalance: z.number().min(0),
  openedBy: z.string().uuid(),
  notes: z.string().max(1000).optional(),
});

export const closeCashRegisterSchema = z.object({
  cashRegisterId: z.string().uuid(),
  sessionId: z.string().uuid(),
  closingBalance: z.number().min(0),
  closedBy: z.string().uuid(),
  countedCash: z.number().min(0),
  notes: z.string().max(1000).optional(),
});

export const cashRegisterMovementSchema = z.object({
  cashRegisterId: z.string().uuid(),
  sessionId: z.string().uuid(),
  type: cashRegisterMovementTypeEnum,
  amount: z.number(),
  reference: z.string().max(255).optional(),
  description: z.string().max(1000).optional(),
  performedBy: z.string().uuid(),
  relatedPaymentId: z.string().uuid().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const accountingEntrySchema = z.object({
  schoolId: z.string().uuid(),
  date: z.string().datetime(),
  description: z.string().min(1).max(255),
  reference: z.string().max(255).optional(),
  journalId: z.string().uuid().optional(),
  status: entryStatusEnum.optional(),
  lines: z.array(z.object({
    accountId: z.string().uuid(),
    debit: z.number().min(0).optional(),
    credit: z.number().min(0).optional(),
    description: z.string().max(255).optional(),
    studentId: z.string().uuid().optional(),
  })).min(2),
  attachments: z.array(z.string().url()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const postAccountingEntrySchema = z.object({
  entryId: z.string().uuid(),
  postedBy: z.string().uuid(),
  notes: z.string().max(1000).optional(),
});

export const journalSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(255),
  code: z.string().min(1).max(50),
  description: z.string().max(1000).optional(),
  type: z.enum(['general', 'sales', 'purchases', 'cash', 'bank', 'payroll']),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const accountSchema = z.object({
  schoolId: z.string().uuid(),
  code: z.string().min(1).max(50),
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  type: accountTypeEnum,
  subType: accountSubTypeEnum.optional(),
  parentId: z.string().uuid().optional(),
  journalId: z.string().uuid().optional(),
  isActive: z.boolean().optional(),
  openingBalance: z.number().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const budgetSchema = z.object({
  schoolId: z.string().uuid(),
  academicYearId: z.string().uuid(),
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  totalAmount: z.number().positive(),
  status: budgetStatusEnum.optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  approvedBy: z.string().uuid().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const budgetItemSchema = z.object({
  budgetId: z.string().uuid(),
  category: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  plannedAmount: z.number().positive(),
  accountId: z.string().uuid().optional(),
  accountIdExpense: z.string().uuid().optional(),
  notes: z.string().max(1000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const executeBudgetItemSchema = z.object({
  budgetItemId: z.string().uuid(),
  executedAmount: z.number().positive(),
  reference: z.string().max(255).optional(),
  description: z.string().max(1000).optional(),
  executedBy: z.string().uuid(),
  expenseId: z.string().uuid().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const discountSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  type: discountTypeEnum,
  value: z.number().positive(),
  maxAmount: z.number().positive().optional(),
  applicableTo: z.enum(['tuition', 'fees', 'extras', 'all']),
  studentId: z.string().uuid().optional(),
  classId: z.string().uuid().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  usageLimit: z.number().int().positive().optional(),
  usedCount: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const scholarshipSchema = z.object({
  schoolId: z.string().uuid(),
  studentId: z.string().uuid(),
  name: z.string().min(1).max(255),
  type: scholarshipTypeEnum,
  amount: z.number().positive(),
  percentage: z.number().min(0).max(100).optional(),
  academicYearId: z.string().uuid(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  conditions: z.string().max(1000).optional(),
  approvedBy: z.string().uuid().optional(),
  status: z.enum(['pending', 'active', 'suspended', 'expired', 'revoked']).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const installmentPlanSchema = z.object({
  schoolId: z.string().uuid(),
  invoiceId: z.string().uuid(),
  studentId: z.string().uuid(),
  totalAmount: z.number().positive(),
  numberOfInstallments: z.number().int().min(2).max(48),
  frequency: installmentFrequencyEnum,
  startDate: z.string().datetime(),
  downPayment: z.number().min(0).optional(),
  lateFeeType: lateFeeTypeEnum.optional(),
  lateFeeAmount: z.number().min(0).optional(),
  lateFeeGraceDays: z.number().int().min(0).optional(),
  notes: z.string().max(1000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const installmentPaymentSchema = z.object({
  installmentPlanId: z.string().uuid(),
  installmentNumber: z.number().int().positive(),
  amount: z.number().positive(),
  paymentDate: z.string().datetime().optional(),
  method: paymentMethodEnum,
  reference: z.string().max(255).optional(),
  lateFeeWaived: z.boolean().optional(),
  notes: z.string().max(1000).optional(),
});

export const lateFeeSchema = z.object({
  schoolId: z.string().uuid(),
  invoiceId: z.string().uuid(),
  studentId: z.string().uuid(),
  type: lateFeeTypeEnum,
  amount: z.number().positive(),
  description: z.string().max(255).optional(),
  dueDate: z.string().datetime(),
  status: z.enum(['pending', 'applied', 'waived', 'paid']).optional(),
  waivedBy: z.string().uuid().optional(),
  waivedReason: z.string().max(500).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const waiveLateFeeSchema = z.object({
  lateFeeId: z.string().uuid(),
  waivedBy: z.string().uuid(),
  reason: z.string().min(1).max(500),
  notes: z.string().max(1000).optional(),
});

export const taxSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(255),
  rate: z.number().min(0).max(100),
  type: z.enum(['percentage', 'fixed']),
  category: z.string().max(100).optional(),
  isActive: z.boolean().optional(),
  description: z.string().max(1000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const taxRuleSchema = z.object({
  schoolId: z.string().uuid(),
  taxId: z.string().uuid(),
  name: z.string().min(1).max(255),
  category: z.string().max(100),
  minAmount: z.number().min(0).optional(),
  maxAmount: z.number().positive().optional(),
  isCompound: z.boolean().optional(),
  priority: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const payrollSchema = z.object({
  schoolId: z.string().uuid(),
  period: z.string().min(1).max(100),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  paymentDate: z.string().datetime(),
  description: z.string().max(1000).optional(),
  status: z.enum(['draft', 'processing', 'completed', 'paid']).optional(),
  totalGross: z.number().min(0).optional(),
  totalDeductions: z.number().min(0).optional(),
  totalNet: z.number().min(0).optional(),
  processedBy: z.string().uuid().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const payrollItemSchema = z.object({
  payrollId: z.string().uuid(),
  employeeId: z.string().uuid(),
  baseSalary: z.number().positive(),
  overtime: z.number().min(0).optional(),
  bonuses: z.number().min(0).optional(),
  allowances: z.number().min(0).optional(),
  deductions: z.number().min(0).optional(),
  tax: z.number().min(0).optional(),
  socialSecurity: z.number().min(0).optional(),
  healthInsurance: z.number().min(0).optional(),
  otherDeductions: z.number().min(0).optional(),
  netPay: z.number().optional(),
  notes: z.string().max(500).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const voucherSchema = z.object({
  schoolId: z.string().uuid(),
  code: z.string().min(1).max(50),
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  type: z.enum(['discount', 'credit', 'free_item']),
  value: z.number().positive(),
  maxUses: z.number().int().positive().optional(),
  usedCount: z.number().int().min(0).optional(),
  studentId: z.string().uuid().optional(),
  classId: z.string().uuid().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const reportSchema = z.object({
  schoolId: z.string().uuid(),
  type: reportTypeEnum,
  title: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  format: z.enum(['pdf', 'csv', 'excel', 'json']).optional(),
  filters: z.record(z.unknown()).optional(),
  generatedBy: z.string().uuid().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const financeSettingsSchema = z.object({
  schoolId: z.string().uuid(),
  currency: z.string().length(3).optional(),
  currencySymbol: z.string().max(5).optional(),
  taxEnabled: z.boolean().optional(),
  defaultTaxRate: z.number().min(0).max(100).optional(),
  defaultPaymentTerms: z.number().int().min(0).optional(),
  lateFeeEnabled: z.boolean().optional(),
  lateFeeType: lateFeeTypeEnum.optional(),
  lateFeeAmount: z.number().min(0).optional(),
  lateFeeGraceDays: z.number().int().min(0).optional(),
  installmentEnabled: z.boolean().optional(),
  maxInstallments: z.number().int().min(0).optional(),
  onlinePaymentEnabled: z.boolean().optional(),
  paymentGateways: z.array(z.string().max(100)).optional(),
  invoicePrefix: z.string().max(20).optional(),
  receiptPrefix: z.string().max(20).optional(),
  automaticReminders: z.boolean().optional(),
  reminderDaysBefore: z.array(z.number().int().min(0)).optional(),
  fiscalYearStart: z.string().max(5).optional(),
  autoCloseFiscalYear: z.boolean().optional(),
  enableStudentWallet: z.boolean().optional(),
  enableParentPortal: z.boolean().optional(),
  emailNotifications: z.boolean().optional(),
  smsNotifications: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const invoiceFiltersSchema = z.object({
  schoolId: z.string().uuid(),
  status: z.array(invoiceStatusEnum).optional(),
  studentId: z.string().uuid().optional(),
  classId: z.string().uuid().optional(),
  academicYearId: z.string().uuid().optional(),
  templateId: z.string().uuid().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  minAmount: z.number().min(0).optional(),
  maxAmount: z.number().positive().optional(),
  search: z.string().max(255).optional(),
  sortBy: z.enum(['created_at', 'due_date', 'amount', 'status']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const paymentFiltersSchema = z.object({
  schoolId: z.string().uuid(),
  status: z.array(paymentStatusEnum).optional(),
  method: z.array(paymentMethodEnum).optional(),
  studentId: z.string().uuid().optional(),
  invoiceId: z.string().uuid().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  minAmount: z.number().min(0).optional(),
  maxAmount: z.number().positive().optional(),
  search: z.string().max(255).optional(),
  sortBy: z.enum(['created_at', 'payment_date', 'amount']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const expenseFiltersSchema = z.object({
  schoolId: z.string().uuid(),
  status: z.array(expenseStatusEnum).optional(),
  category: z.array(expenseCategoryEnum).optional(),
  accountId: z.string().uuid().optional(),
  submittedBy: z.string().uuid().optional(),
  approvedBy: z.string().uuid().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  minAmount: z.number().min(0).optional(),
  maxAmount: z.number().positive().optional(),
  search: z.string().max(255).optional(),
  sortBy: z.enum(['created_at', 'expense_date', 'amount', 'status']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const revenueFiltersSchema = z.object({
  schoolId: z.string().uuid(),
  category: z.string().max(100).optional(),
  studentId: z.string().uuid().optional(),
  invoiceId: z.string().uuid().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  minAmount: z.number().min(0).optional(),
  maxAmount: z.number().positive().optional(),
  search: z.string().max(255).optional(),
  sortBy: z.enum(['created_at', 'receipt_date', 'amount']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const invoiceSearchSchema = z.object({
  schoolId: z.string().uuid(),
  query: z.string().min(1).max(255),
  filters: z.object({
    status: z.array(invoiceStatusEnum).optional(),
    studentId: z.string().uuid().optional(),
    classId: z.string().uuid().optional(),
  }).optional(),
  limit: z.number().int().min(1).max(50).optional(),
});

export const transactionSchema = z.object({
  schoolId: z.string().uuid(),
  type: transactionTypeEnum,
  amount: z.number().positive(),
  description: z.string().min(1).max(255),
  reference: z.string().max(255).optional(),
  category: z.string().max(100).optional(),
  accountId: z.string().uuid().optional(),
  studentId: z.string().uuid().optional(),
  invoiceId: z.string().uuid().optional(),
  paymentId: z.string().uuid().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const receiptSchema = z.object({
  schoolId: z.string().uuid(),
  invoiceId: z.string().uuid(),
  paymentId: z.string().uuid(),
  studentId: z.string().uuid(),
  receiptNumber: z.string().max(50).optional(),
  amount: z.number().positive(),
  method: paymentMethodEnum,
  issuedDate: z.string().datetime(),
  items: z.array(z.object({
    description: z.string().max(255),
    amount: z.number().min(0),
  })).optional(),
  notes: z.string().max(1000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const generateReceiptSchema = z.object({
  paymentId: z.string().uuid(),
  format: z.enum(['pdf', 'html', 'json']).optional(),
  templateId: z.string().uuid().optional(),
  includeTaxDetails: z.boolean().optional(),
  includePaymentBreakdown: z.boolean().optional(),
  customMessage: z.string().max(500).optional(),
});

export const exportSchema = z.object({
  schoolId: z.string().uuid(),
  type: z.enum(['invoices', 'payments', 'expenses', 'revenue', 'transactions', 'accounts', 'budgets', 'students_balances', 'full_report']),
  format: z.enum(['csv', 'excel', 'pdf', 'json']),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  filters: z.record(z.unknown()).optional(),
  includeDetails: z.boolean().optional(),
  columns: z.array(z.string().max(100)).optional(),
});

export const importSchema = z.object({
  schoolId: z.string().uuid(),
  type: z.enum(['invoices', 'payments', 'expenses', 'accounts', 'budgets']),
  fileUrl: z.string().url(),
  fileName: z.string().max(255),
  format: z.enum(['csv', 'excel', 'json']),
  skipDuplicates: z.boolean().optional(),
  updateExisting: z.boolean().optional(),
  dryRun: z.boolean().optional(),
  mappings: z.record(z.string()).optional(),
  metadata: z.record(z.unknown()).optional(),
});
