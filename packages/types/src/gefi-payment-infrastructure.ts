export enum PaymentProviderType {
  MONEY_FUSION = 'MONEY_FUSION',
  BANK_TRANSFER = 'BANK_TRANSFER',
  MOBILE_MONEY = 'MOBILE_MONEY',
  CASH = 'CASH',
  CHECK = 'CHECK',
  CRYPTO = 'CRYPTO',
  PAYPAL = 'PAYPAL',
  STRIPE = 'STRIPE',
  WIRE = 'WIRE',
}

export enum PaymentCategory {
  TUITION = 'TUITION',
  FEES = 'FEES',
  SALARY = 'SALARY',
  SUPPLIER = 'SUPPLIER',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  SCHOLARSHIP = 'SCHOLARSHIP',
  GRANT = 'GRANT',
  DONATION = 'DONATION',
  LOAN = 'LOAN',
  OTHER = 'OTHER',
}

export enum PaymentMode {
  ONE_TIME = 'ONE_TIME',
  INSTALLMENT = 'INSTALLMENT',
  RECURRING = 'RECURRING',
  DEFERRED = 'DEFERRED',
  ESCROW = 'ESCROW',
  SPLIT = 'SPLIT',
}

export enum PaymentFrequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  BI_WEEKLY = 'BI_WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  SEMI_ANNUAL = 'SEMI_ANNUAL',
  ANNUAL = 'ANNUAL',
}

export enum PaymentSplitType {
  FIXED = 'FIXED',
  PERCENTAGE = 'PERCENTAGE',
  RATIO = 'RATIO',
  REMAINDER = 'REMAINDER',
}

export enum PaymentIdempotencyStatus {
  UNUSED = 'UNUSED',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum WebhookStatus {
  PENDING = 'PENDING',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
  RETRYING = 'RETRYING',
  DISABLED = 'DISABLED',
}

export enum PayoutStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export interface PaymentProvider {
  id: string;
  schoolId: string;
  name: string;
  type: PaymentProviderType;
  apiKey: string;
  apiSecret: string;
  webhookSecret: string;
  isActive: boolean;
  supportedCurrencies: string[];
  supportedCountries: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PaymentConnector {
  id: string;
  schoolId: string;
  providerId: string;
  name: string;
  version: string;
  config: Record<string, string>;
  isActive: boolean;
  lastSyncAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PaymentRequest {
  id: string;
  schoolId: string;
  amount: number;
  currency: string;
  category: PaymentCategory;
  mode: PaymentMode;
  providerType: PaymentProviderType;
  studentId: string | null;
  teacherId: string | null;
  staffId: string | null;
  description: string;
  reference: string;
  idempotencyKey: string;
  metadata: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PaymentResponse {
  id: string;
  schoolId: string;
  requestId: string;
  providerReference: string;
  status: string;
  amount: number;
  currency: string;
  fee: number;
  netAmount: number;
  providerFee: number;
  exchangeRate: number;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PaymentAuthorization {
  id: string;
  schoolId: string;
  requestId: string;
  authorizationCode: string;
  amount: number;
  currency: string;
  expiresAt: string;
  isCaptured: boolean;
  capturedAmount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PaymentCapture {
  id: string;
  schoolId: string;
  authorizationId: string;
  amount: number;
  currency: string;
  reference: string;
  capturedAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PaymentRefundRequest {
  id: string;
  schoolId: string;
  paymentId: string;
  amount: number;
  currency: string;
  reason: string;
  reference: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PaymentCancelRequest {
  id: string;
  schoolId: string;
  paymentId: string;
  reason: string;
  reference: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PaymentVerification {
  id: string;
  schoolId: string;
  paymentId: string;
  isVerified: boolean;
  verifiedBy: string;
  verifiedAt: string;
  notes: string;
  receiptNumber: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PaymentReconciliation {
  id: string;
  schoolId: string;
  period: string;
  totalExpected: number;
  totalReceived: number;
  totalFees: number;
  totalRefunds: number;
  discrepancy: number;
  reconciledBy: string;
  reconciledAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PaymentWebhook {
  id: string;
  schoolId: string;
  providerId: string;
  eventType: string;
  payload: Record<string, string>;
  status: WebhookStatus;
  attempts: number;
  lastAttemptAt: string | null;
  processedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PaymentPayout {
  id: string;
  schoolId: string;
  providerId: string;
  amount: number;
  currency: string;
  bankAccount: string;
  status: PayoutStatus;
  reference: string;
  initiatedAt: string;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PaymentSplit {
  id: string;
  schoolId: string;
  paymentId: string;
  recipientId: string;
  recipientType: string;
  amount: number;
  percentage: number;
  type: PaymentSplitType;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PaymentPlan {
  id: string;
  schoolId: string;
  studentId: string;
  name: string;
  totalAmount: number;
  currency: string;
  numberOfInstallments: number;
  installmentAmount: number;
  frequency: PaymentFrequency;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface RecurringPayment {
  id: string;
  schoolId: string;
  planId: string;
  studentId: string;
  amount: number;
  currency: string;
  frequency: PaymentFrequency;
  nextPaymentDate: string;
  lastPaymentDate: string | null;
  totalPaid: number;
  totalRemaining: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface DeferredPayment {
  id: string;
  schoolId: string;
  studentId: string;
  amount: number;
  currency: string;
  dueDate: string;
  gracePeriodDays: number;
  interestRate: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CrossBorderPayment {
  id: string;
  schoolId: string;
  senderCountry: string;
  receiverCountry: string;
  senderCurrency: string;
  receiverCurrency: string;
  sendAmount: number;
  receiveAmount: number;
  exchangeRate: number;
  fees: number;
  providerType: PaymentProviderType;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PaymentReceipt {
  id: string;
  schoolId: string;
  paymentId: string;
  receiptNumber: string;
  studentId: string | null;
  amount: number;
  currency: string;
  description: string;
  issuedAt: string;
  issuedBy: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PaymentAudit {
  id: string;
  schoolId: string;
  paymentId: string;
  action: string;
  performedBy: string;
  previousStatus: string;
  newStatus: string;
  ipAddress: string;
  userAgent: string;
  metadata: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
