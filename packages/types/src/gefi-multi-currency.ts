export enum SupportedCurrency {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  XOF = "XOF",
  XAF = "XAF",
  NGN = "NGN",
  KES = "KES",
  GHS = "GHS",
  ZAR = "ZAR",
  EGP = "EGP",
  MAD = "MAD",
  DZD = "DZD",
  TND = "TND",
  CNY = "CNY",
  INR = "INR",
  BRL = "BRL",
  JPY = "JPY",
  CAD = "CAD",
  AUD = "AUD",
  CHF = "CHF",
}

export enum FXRateSource {
  CENTRAL_BANK = "CENTRAL_BANK",
  REUTERS = "REUTERS",
  BLOOMBERG = "BLOOMBERG",
  MARKET_AVERAGE = "MARKET_AVERAGE",
  CUSTOM = "CUSTOM",
  ECB = "ECB",
  FED = "FED",
}

export enum ConversionMethod {
  SPOT_RATE = "SPOT_RATE",
  AVERAGED_RATE = "AVERAGED_RATE",
  HISTORICAL_RATE = "HISTORICAL_RATE",
  CONTRACTED_RATE = "CONTRACTED_RATE",
  REAL_TIME = "REAL_TIME",
}

export enum SettlementType {
  SPOT = "SPOT",
  FORWARD = "FORWARD",
  CASH = "CASH",
  TOM = "TOM",
  VALUE_DATE = "VALUE_DATE",
}

export enum CrossBorderFeeType {
  TRANSFER_FEE = "TRANSFER_FEE",
  CONVERSION_FEE = "CONVERSION_FEE",
  CORRESPONDENT_FEE = "CORRESPONDENT_FEE",
  SWIFT_FEE = "SWIFT_FEE",
  COMPLIANCE_FEE = "COMPLIANCE_FEE",
  PROCESSING_FEE = "PROCESSING_FEE",
}

export enum RoundingMethod {
  ROUND_HALF_UP = "ROUND_HALF_UP",
  ROUND_HALF_DOWN = "ROUND_HALF_DOWN",
  ROUND_HALF_EVEN = "ROUND_HALF_EVEN",
  ROUND_UP = "ROUND_UP",
  ROUND_DOWN = "ROUND_DOWN",
  TRUNCATE = "TRUNCATE",
}

export enum ExposureType {
  TRANSACTION = "TRANSACTION",
  TRANSLATION = "TRANSLATION",
  ECONOMIC = "ECONOMIC",
  TRANSFER = "TRANSFER",
}

export enum HedgeType {
  FORWARD = "FORWARD",
  OPTION = "OPTION",
  SWAP = "SWAP",
  NATURAL = "NATURAL",
  NONE = "NONE",
}

export enum ComplianceStatusCCY {
  COMPLIANT = "COMPLIANT",
  NON_COMPLIANT = "NON_COMPLIANT",
  PENDING_REVIEW = "PENDING_REVIEW",
  EXEMPT = "EXEMPT",
}

export enum WalletStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  CLOSED = "CLOSED",
  PENDING = "PENDING",
}

export enum FXOrderType {
  MARKET = "MARKET",
  LIMIT = "LIMIT",
  STOP = "STOP",
  OCO = "OCO",
}

export enum CurrencyAccountType {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
  OPERATIONAL = "OPERATIONAL",
  RESERVE = "RESERVE",
}

export enum FXAlertType {
  RATE_THRESHOLD = "RATE_THRESHOLD",
  VOLATILITY = "VOLATILITY",
  SPREAD_WIDENING = "SPREAD_WIDENING",
  LIQUIDITY = "LIQUIDITY",
}

export enum CurrencyComplianceCheckType {
  SANCTIONS = "SANCTIONS",
  PEP = "PEP",
  ADVERSE_MEDIA = "ADVERSE_MEDIA",
  COUNTRY_RISK = "COUNTRY_RISK",
}

export enum CurrencyNotificationType {
  RATE_ALERT = "RATE_ALERT",
  LOW_BALANCE = "LOW_BALANCE",
  TRANSACTION_COMPLETE = "TRANSACTION_COMPLETE",
  COMPLIANCE = "COMPLIANCE",
}

export interface CurrencyPair {
  id: string;
  schoolId: string;
  baseCurrency: SupportedCurrency;
  quoteCurrency: SupportedCurrency;
  currentRate: number;
  spreadPercent: number;
  lastUpdated: Date;
  source: FXRateSource;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FXRate {
  id: string;
  schoolId: string;
  baseCurrency: SupportedCurrency;
  quoteCurrency: SupportedCurrency;
  rate: number;
  source: FXRateSource;
  timestamp: Date;
  bidRate: number;
  askRate: number;
  midRate: number;
  volatility: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FXRateHistory {
  id: string;
  schoolId: string;
  baseCurrency: SupportedCurrency;
  quoteCurrency: SupportedCurrency;
  rate: number;
  source: FXRateSource;
  recordedAt: Date;
  period: string;
  openRate: number;
  closeRate: number;
  highRate: number;
  lowRate: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CurrencyConversion {
  id: string;
  schoolId: string;
  sourceCurrency: SupportedCurrency;
  targetCurrency: SupportedCurrency;
  sourceAmount: number;
  targetAmount: number;
  exchangeRate: number;
  method: ConversionMethod;
  fee: number;
  netAmount: number;
  convertedAt: Date;
  rateSource: FXRateSource;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CrossBorderTransaction {
  id: string;
  schoolId: string;
  sourceCurrency: SupportedCurrency;
  targetCurrency: SupportedCurrency;
  sourceAmount: number;
  targetAmount: number;
  exchangeRate: number;
  fees: CrossBorderFee[];
  totalFees: number;
  netAmount: number;
  senderCountry: string;
  recipientCountry: string;
  settlementType: SettlementType;
  status: string;
  reference: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface SettlementCurrency {
  id: string;
  schoolId: string;
  currency: SupportedCurrency;
  accountNumber: string;
  bankName: string;
  bankCountry: string;
  swiftCode: string;
  iban: string | null;
  isDefault: boolean;
  status: WalletStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ReportingCurrency {
  id: string;
  schoolId: string;
  currency: SupportedCurrency;
  fiscalYearStart: number;
  exchangeRateMethod: ConversionMethod;
  roundingMethod: RoundingMethod;
  decimalPlaces: number;
  effectiveDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CrossBorderFee {
  id: string;
  schoolId: string;
  transactionId: string;
  feeType: CrossBorderFeeType;
  amount: number;
  currency: SupportedCurrency;
  description: string;
  calculatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CurrencyHedge {
  id: string;
  schoolId: string;
  baseCurrency: SupportedCurrency;
  hedgeCurrency: SupportedCurrency;
  hedgeType: HedgeType;
  notionalAmount: number;
  strikeRate: number;
  premiumRate: number;
  expiryDate: Date;
  startDate: Date;
  status: string;
  unrealizedPnL: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CurrencyExposure {
  id: string;
  schoolId: string;
  currency: SupportedCurrency;
  exposureType: ExposureType;
  amount: number;
  homeCurrencyAmount: number;
  exchangeRate: number;
  measurementDate: Date;
  hedgeRatio: number;
  riskRating: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface MultiCurrencyWallet {
  id: string;
  schoolId: string;
  walletName: string;
  currencies: WalletCurrency[];
  totalBalanceHomeCurrency: number;
  status: WalletStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface WalletCurrency {
  currency: SupportedCurrency;
  balance: number;
  reserved: number;
  available: number;
}

export interface CurrencyAudit {
  id: string;
  schoolId: string;
  action: string;
  currency: SupportedCurrency;
  amount: number;
  exchangeRate: number;
  performedBy: string;
  details: string;
  timestamp: Date;
  ipAddress: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ExchangeRateProvider {
  id: string;
  schoolId: string;
  name: string;
  source: FXRateSource;
  apiUrl: string;
  refreshIntervalMinutes: number;
  supportedPairs: string[];
  active: boolean;
  lastSyncDate: Date | null;
  errorCount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CurrencyCompliance {
  id: string;
  schoolId: string;
  currency: SupportedCurrency;
  status: ComplianceStatusCCY;
  transactionLimit: number;
  dailyLimit: number;
  requireApprovalAbove: number;
  restrictedCountries: string[];
  lastReviewDate: Date;
  nextReviewDate: Date;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FXOrder {
  id: string;
  schoolId: string;
  orderType: FXOrderType;
  sourceCurrency: SupportedCurrency;
  targetCurrency: SupportedCurrency;
  sourceAmount: number;
  targetAmount: number | null;
  targetRate: number | null;
  status: string;
  filledAt: Date | null;
  expiresAt: Date;
  reference: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CurrencyAccount {
  id: string;
  schoolId: string;
  currency: SupportedCurrency;
  accountType: CurrencyAccountType;
  balance: number;
  reserved: number;
  available: number;
  lastTransactionDate: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FXRateAlert {
  id: string;
  schoolId: string;
  alertType: FXAlertType;
  baseCurrency: SupportedCurrency;
  quoteCurrency: SupportedCurrency;
  threshold: number;
  currentRate: number;
  triggered: boolean;
  triggeredAt: Date | null;
  recipientEmail: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CurrencyTransfer {
  id: string;
  schoolId: string;
  sourceCurrency: SupportedCurrency;
  targetCurrency: SupportedCurrency;
  sourceAmount: number;
  targetAmount: number;
  exchangeRate: number;
  fees: number;
  senderAccountId: string;
  recipientAccountId: string;
  status: string;
  reference: string;
  initiatedAt: Date;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CurrencyRateAlert {
  id: string;
  schoolId: string;
  pair: string;
  direction: string;
  threshold: number;
  currentRate: number;
  notified: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CurrencyConversionLog {
  id: string;
  schoolId: string;
  conversionId: string;
  sourceCurrency: SupportedCurrency;
  targetCurrency: SupportedCurrency;
  amount: number;
  rate: number;
  method: ConversionMethod;
  userId: string;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CrossBorderCompliance {
  id: string;
  schoolId: string;
  transactionId: string;
  sourceCountry: string;
  targetCountry: string;
  checkType: CurrencyComplianceCheckType;
  result: string;
  riskScore: number;
  checkedAt: Date;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CurrencyRateSubscription {
  id: string;
  schoolId: string;
  pair: string;
  callbackUrl: string;
  threshold: number;
  active: boolean;
  lastNotifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CurrencyBalanceSnapshot {
  id: string;
  schoolId: string;
  snapshotDate: Date;
  balances: WalletCurrency[];
  totalHomeCurrency: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CurrencyRevaluation {
  id: string;
  schoolId: string;
  accountId: string;
  currency: SupportedCurrency;
  previousValue: number;
  newValue: number;
  unrealizedGainLoss: number;
  revaluationDate: Date;
  exchangeRate: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
