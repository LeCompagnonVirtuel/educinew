export enum GEFIWalletType {
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
  TEACHER = 'TEACHER',
  STAFF = 'STAFF',
  INSTITUTIONAL = 'INSTITUTIONAL',
  SCHOLARSHIP = 'SCHOLARSHIP',
  GRANT = 'GRANT',
  ESCROW = 'ESCROW',
  SHARED = 'SHARED',
  VIRTUAL = 'VIRTUAL',
}

export enum WalletProgramType {
  LOYALTY = 'LOYALTY',
  CASHBACK = 'CASHBACK',
  REWARD = 'REWARD',
  SAVINGS = 'SAVINGS',
  INVESTMENT = 'INVESTMENT',
  INSURANCE = 'INSURANCE',
}

export enum WalletRuleType {
  SPENDING_LIMIT = 'SPENDING_LIMIT',
  TRANSACTION_LIMIT = 'TRANSACTION_LIMIT',
  DAILY_LIMIT = 'DAILY_LIMIT',
  WEEKLY_LIMIT = 'WEEKLY_LIMIT',
  MONTHLY_LIMIT = 'MONTHLY_LIMIT',
  CATEGORY_RESTRICTION = 'CATEGORY_RESTRICTION',
  TIME_RESTRICTION = 'TIME_RESTRICTION',
  MERCHANT_RESTRICTION = 'MERCHANT_RESTRICTION',
}

export enum WalletLimitType {
  ABSOLUTE = 'ABSOLUTE',
  PERCENTAGE = 'PERCENTAGE',
  VELOCITY = 'VELOCITY',
  CUMULATIVE = 'CUMULATIVE',
}

export enum WalletHoldType {
  PENDING = 'PENDING',
  DISPUTED = 'DISPUTED',
  FROZEN = 'FROZEN',
  RESERVED = 'RESERVED',
  PLEDGED = 'PLEDGED',
}

export enum EscrowStatus {
  CREATED = 'CREATED',
  FUNDED = 'FUNDED',
  RELEASED = 'RELEASED',
  REFUNDED = 'REFUNDED',
  DISPUTED = 'DISPUTED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

export enum WalletVerificationStatus {
  UNVERIFIED = 'UNVERIFIED',
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
}

export interface GEFIWallet {
  id: string;
  schoolId: string;
  userId: string;
  type: GEFIWalletType;
  name: string;
  currency: string;
  balance: number;
  availableBalance: number;
  heldBalance: number;
  isActive: boolean;
  isFrozen: boolean;
  verificationStatus: WalletVerificationStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WalletBalance {
  id: string;
  schoolId: string;
  walletId: string;
  available: number;
  held: number;
  pending: number;
  total: number;
  currency: string;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WalletDeposit {
  id: string;
  schoolId: string;
  walletId: string;
  amount: number;
  currency: string;
  sourceType: string;
  sourceReference: string;
  status: string;
  confirmedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WalletWithdrawal {
  id: string;
  schoolId: string;
  walletId: string;
  amount: number;
  currency: string;
  destinationType: string;
  destinationReference: string;
  status: string;
  processedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WalletTransfer {
  id: string;
  schoolId: string;
  sourceWalletId: string;
  destinationWalletId: string;
  amount: number;
  currency: string;
  description: string;
  status: string;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WalletPayment {
  id: string;
  schoolId: string;
  walletId: string;
  merchantId: string;
  amount: number;
  currency: string;
  description: string;
  reference: string;
  status: string;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WalletRefund {
  id: string;
  schoolId: string;
  walletId: string;
  paymentId: string;
  amount: number;
  currency: string;
  reason: string;
  status: string;
  refundedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WalletTransaction {
  id: string;
  schoolId: string;
  walletId: string;
  type: string;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  currency: string;
  reference: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WalletLimit {
  id: string;
  schoolId: string;
  walletId: string;
  ruleType: WalletRuleType;
  limitType: WalletLimitType;
  value: number;
  period: string;
  currentUsage: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WalletHold {
  id: string;
  schoolId: string;
  walletId: string;
  amount: number;
  currency: string;
  type: WalletHoldType;
  reference: string;
  reason: string;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WalletEscrow {
  id: string;
  schoolId: string;
  buyerWalletId: string;
  sellerWalletId: string;
  amount: number;
  currency: string;
  status: EscrowStatus;
  releaseCondition: string;
  fundedAt: string | null;
  releasedAt: string | null;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WalletRule {
  id: string;
  schoolId: string;
  walletType: GEFIWalletType;
  ruleType: WalletRuleType;
  limitType: WalletLimitType;
  value: number;
  period: string;
  isActive: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WalletSpendingRule {
  id: string;
  schoolId: string;
  walletId: string;
  category: string;
  maxAmount: number;
  maxTransactions: number;
  period: string;
  currentSpent: number;
  currentTransactions: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WalletFundingRestriction {
  id: string;
  schoolId: string;
  walletId: string;
  allowedSourceTypes: string[];
  maxSingleDeposit: number;
  maxDailyDeposit: number;
  maxMonthlyDeposit: number;
  requiresApproval: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WalletProgram {
  id: string;
  schoolId: string;
  name: string;
  type: WalletProgramType;
  description: string;
  rewardRate: number;
  maxReward: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ProgrammableWallet {
  id: string;
  schoolId: string;
  walletId: string;
  programId: string;
  rules: string[];
  conditions: Record<string, string>;
  isActive: boolean;
  lastEvaluatedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WalletAudit {
  id: string;
  schoolId: string;
  walletId: string;
  action: string;
  amount: number | null;
  balanceBefore: number;
  balanceAfter: number;
  performedBy: string;
  ipAddress: string;
  userAgent: string;
  metadata: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
