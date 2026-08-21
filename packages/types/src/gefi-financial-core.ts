export enum AccountType {
  ASSET = 'ASSET',
  LIABILITY = 'LIABILITY',
  EQUITY = 'EQUITY',
  REVENUE = 'REVENUE',
  EXPENSE = 'EXPENSE',
  CONTRA_ASSET = 'CONTRA_ASSET',
  CONTRA_LIABILITY = 'CONTRA_LIABILITY',
  CONTRA_REVENUE = 'CONTRA_REVENUE',
  CONTRA_EXPENSE = 'CONTRA_EXPENSE',
}

export enum LedgerType {
  GENERAL = 'GENERAL',
  SUBSIDIARY = 'SUBSIDIARY',
  COST_CENTER = 'COST_CENTER',
  PROFIT_CENTER = 'PROFIT_CENTER',
  PROJECT = 'PROJECT',
  DEPARTMENT = 'DEPARTMENT',
}

export enum JournalType {
  GENERAL = 'GENERAL',
  SALES = 'SALES',
  PURCHASE = 'PURCHASE',
  CASH = 'CASH',
  BANK = 'BANK',
  PAYROLL = 'PAYROLL',
  ADJUSTING = 'ADJUSTING',
  CLOSING = 'CLOSING',
  REVERSING = 'REVERSING',
}

export enum TransactionType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
  TRANSFER = 'TRANSFER',
  ADJUSTMENT = 'ADJUSTMENT',
  REVERSAL = 'REVERSAL',
  ACCRUAL = 'ACCRUAL',
  DEFERRAL = 'DEFERRAL',
  RECOGNITION = 'RECOGNITION',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  POSTED = 'POSTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  REVERSED = 'REVERSED',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
  ON_HOLD = 'ON_HOLD',
  PARTIAL = 'PARTIAL',
}

export enum FinancialPeriodStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  LOCKED = 'LOCKED',
  ARCHIVED = 'ARCHIVED',
}

export enum ChartOfAccountsType {
  STANDARD = 'STANDARD',
  MULTI_LEVEL = 'MULTI_LEVEL',
  CONSOLIDATED = 'CONSOLIDATED',
  INTERSCHOOL = 'INTERSCHOOL',
}

export enum CostCenterType {
  DEPARTMENT = 'DEPARTMENT',
  PROJECT = 'PROJECT',
  PROGRAM = 'PROGRAM',
  SERVICE = 'SERVICE',
  LOCATION = 'LOCATION',
  ACTIVITY = 'ACTIVITY',
}

export enum CurrencyCode {
  XOF = 'XOF',
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  CAD = 'CAD',
  CNY = 'CNY',
  NGN = 'NGN',
  GHS = 'GHS',
  KES = 'KES',
  ZAR = 'ZAR',
}

export enum ExchangeRateType {
  SPOT = 'SPOT',
  FORWARD = 'FORWARD',
  FIXED = 'FIXED',
  MOBILE = 'MOBILE',
  PARALLEL = 'PARALLEL',
}

export enum TaxType {
  VAT = 'VAT',
  SALES_TAX = 'SALES_TAX',
  WITHHOLDING = 'WITHHOLDING',
  EXCISE = 'EXCISE',
  IMPORT_DUTY = 'IMPORT_DUTY',
  EDUCATION_TAX = 'EDUCATION_TAX',
  EXEMPT = 'EXEMPT',
}

export enum ReconciliationStatus {
  UNRECONCILED = 'UNRECONCILED',
  MATCHED = 'MATCHED',
  PARTIALLY_MATCHED = 'PARTIALLY_MATCHED',
  DISCREPANCY = 'DISCREPANCY',
  RESOLVED = 'RESOLVED',
}

export enum FiscalYearStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
  AUDITED = 'AUDITED',
  ARCHIVED = 'ARCHIVED',
}

export interface FinancialAccount {
  id: string;
  schoolId: string;
  code: string;
  name: string;
  type: AccountType;
  parentId: string | null;
  currencyCode: CurrencyCode;
  isActive: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Ledger {
  id: string;
  schoolId: string;
  name: string;
  type: LedgerType;
  currencyCode: CurrencyCode;
  fiscalYearId: string;
  isOpen: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface LedgerEntry {
  id: string;
  schoolId: string;
  ledgerId: string;
  accountId: string;
  journalEntryId: string;
  debit: number;
  credit: number;
  balance: number;
  currencyCode: CurrencyCode;
  exchangeRate: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Journal {
  id: string;
  schoolId: string;
  name: string;
  type: JournalType;
  ledgerId: string;
  isOpen: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface JournalEntry {
  id: string;
  schoolId: string;
  journalId: string;
  date: string;
  reference: string;
  description: string;
  totalDebit: number;
  totalCredit: number;
  status: TransactionStatus;
  postedAt: string | null;
  approvedBy: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface FinancialTransaction {
  id: string;
  schoolId: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  currencyCode: CurrencyCode;
  exchangeRate: number;
  sourceAccountId: string;
  destinationAccountId: string;
  reference: string;
  description: string;
  metadata: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface TransactionLine {
  id: string;
  schoolId: string;
  transactionId: string;
  accountId: string;
  debit: number;
  credit: number;
  currencyCode: CurrencyCode;
  exchangeRate: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface FinancialPeriod {
  id: string;
  schoolId: string;
  name: string;
  startDate: string;
  endDate: string;
  status: FinancialPeriodStatus;
  closedBy: string | null;
  closedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface FiscalYear {
  id: string;
  schoolId: string;
  name: string;
  startDate: string;
  endDate: string;
  status: FiscalYearStatus;
  periodIds: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ChartOfAccounts {
  id: string;
  schoolId: string;
  name: string;
  type: ChartOfAccountsType;
  fiscalYearId: string;
  accountIds: string[];
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CostCenter {
  id: string;
  schoolId: string;
  code: string;
  name: string;
  type: CostCenterType;
  budget: number;
  spent: number;
  managerId: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ProfitCenter {
  id: string;
  schoolId: string;
  code: string;
  name: string;
  revenue: number;
  costs: number;
  profit: number;
  managerId: string;
  costCenterIds: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface BudgetCenter {
  id: string;
  schoolId: string;
  name: string;
  allocatedAmount: number;
  spentAmount: number;
  remainingAmount: number;
  fiscalYearId: string;
  costCenterId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface FinancialEntity {
  id: string;
  schoolId: string;
  name: string;
  type: string;
  registrationNumber: string;
  taxId: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface FinancialInstitution {
  id: string;
  schoolId: string;
  name: string;
  swiftCode: string;
  iban: string;
  accountNumber: string;
  routingNumber: string;
  currencyCode: CurrencyCode;
  branch: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Currency {
  id: string;
  code: CurrencyCode;
  name: string;
  symbol: string;
  decimalPlaces: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ExchangeRate {
  id: string;
  schoolId: string;
  sourceCurrency: CurrencyCode;
  targetCurrency: CurrencyCode;
  rate: number;
  type: ExchangeRateType;
  validFrom: string;
  validTo: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface TaxRule {
  id: string;
  schoolId: string;
  name: string;
  type: TaxType;
  rate: number;
  minAmount: number;
  maxAmount: number;
  isCompound: boolean;
  accountCode: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Fee {
  id: string;
  schoolId: string;
  name: string;
  amount: number;
  currencyCode: CurrencyCode;
  taxRuleId: string | null;
  frequency: string;
  isMandatory: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Charge {
  id: string;
  schoolId: string;
  name: string;
  amount: number;
  currencyCode: CurrencyCode;
  taxRuleId: string | null;
  isPercentage: boolean;
  percentage: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Discount {
  id: string;
  schoolId: string;
  name: string;
  amount: number;
  currencyCode: CurrencyCode;
  isPercentage: boolean;
  percentage: number;
  maxAmount: number;
  validFrom: string;
  validTo: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Refund {
  id: string;
  schoolId: string;
  originalTransactionId: string;
  amount: number;
  currencyCode: CurrencyCode;
  reason: string;
  status: TransactionStatus;
  processedBy: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Adjustment {
  id: string;
  schoolId: string;
  accountId: string;
  amount: number;
  type: TransactionType;
  reason: string;
  approvedBy: string;
  reference: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Reconciliation {
  id: string;
  schoolId: string;
  name: string;
  accountId: string;
  statementDate: string;
  statementBalance: number;
  bookBalance: number;
  difference: number;
  status: ReconciliationStatus;
  reconciledBy: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ReconciliationItem {
  id: string;
  schoolId: string;
  reconciliationId: string;
  transactionId: string;
  amount: number;
  isMatched: boolean;
  matchedTransactionId: string | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
