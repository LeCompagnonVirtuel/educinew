export enum BudgetCategory {
  SALARIES = "SALARIES",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  TECHNOLOGY = "TECHNOLOGY",
  SUPPLIES = "SUPPLIES",
  MAINTENANCE = "MAINTENANCE",
  UTILITIES = "UTILITIES",
  TRANSPORT = "TRANSPORT",
  FOOD_SERVICE = "FOOD_SERVICE",
  LIBRARY = "LIBRARY",
  HEALTH = "HEALTH",
  SPORTS = "SPORTS",
  ARTS = "ARTS",
  EXTRACURRICULAR = "EXTRACURRICULAR",
  PROFESSIONAL_DEVELOPMENT = "PROFESSIONAL_DEVELOPMENT",
  MARKETING = "MARKETING",
  ADMINISTRATION = "ADMINISTRATION",
  INSURANCE = "INSURANCE",
  DEBT_SERVICE = "DEBT_SERVICE",
  RESERVES = "RESERVES",
  CAPITAL_PROJECTS = "CAPITAL_PROJECTS"
}

export enum OptimizationGoal {
  MAXIMIZE_EFFICIENCY = "MAXIMIZE_EFFICIENCY",
  MINIMIZE_COST = "MINIMIZE_COST",
  MAXIMIZE_OUTPUT = "MAXIMIZE_OUTPUT",
  BALANCE_QUALITY = "BALANCE_QUALITY",
  REDUCE_WASTE = "REDUCE_WASTE",
  INCREASE_REVENUE = "INCREASE_REVENUE",
  IMPROVE_ROI = "IMPROVE_ROI",
  ENSURE_COMPLIANCE = "ENSURE_COMPLIANCE",
  MAINTAIN_RESERVES = "MAINTAIN_RESERVES",
  GROWTH = "GROWTH"
}

export enum RevenueSource {
  TUITION = "TUITION",
  GOVERNMENT_FUNDING = "GOVERNMENT_FUNDING",
  DONATIONS = "DONATIONS",
  GRANTS = "GRANTS",
  ACTIVITIES = "ACTIVITIES",
  FACILITY_RENTAL = "FACILITY_RENTAL",
  CAFETERIA = "CAFETERIA",
  TRANSPORT = "TRANSPORT",
  UNIFORMS = "UNIFORMS",
  EXAM_FEES = "EXAM_FEES",
  LIBRARY = "LIBRARY",
  SPORTS = "SPORTS",
  SUMMER_PROGRAMS = "SUMMER_PROGRAMS",
  ADULT_EDUCATION = "ADULT_EDUCATION",
  CONSULTING = "CONSULTING",
  INVESTMENTS = "INVESTMENTS"
}

export enum CostType {
  FIXED = "FIXED",
  VARIABLE = "VARIABLE",
  SEMI_VARIABLE = "SEMI_VARIABLE",
  STEP = "STEP",
  OPPORTUNITY = "OPPORTUNITY",
  DIRECT = "DIRECT",
  INDIRECT = "INDIRECT",
  SUNK = "SUNK",
  MARGINAL = "MARGINAL",
  AVERAGE = "AVERAGE"
}

export enum FraudType {
  EMBEZZLEMENT = "EMBEZZLEMENT",
  BUDGET_MANIPULATION = "BUDGET_MANIPULATION",
  FAKE_INVOICES = "FAKE_INVOICES",
  DUPLICATE_PAYMENTS = "DUPLICATE_PAYMENTS",
  VENDOR_FRAUD = "VENDOR_FRAUD",
  PAYROLL_FRAUD = "PAYROLL_FRAUD",
  EXPENSE_FRAUD = "EXPENSE_FRAUD",
  CONTRACT_FRAUD = "CONTRACT_FRAUD",
  GRANT_MISUSE = "GRANT_MISUSE",
  ASSET_MISAPPROPRIATION = "ASSET_MISAPPROPRIATION"
}

export enum FraudSeverity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
  CATASTROPHIC = "CATASTROPHIC"
}

export enum ProcurementStatus {
  DRAFT = "DRAFT",
  PENDING_APPROVAL = "PENDING_APPROVAL",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  ORDERED = "ORDERED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  INSPECTED = "INSPECTED",
  ACCEPTED = "ACCEPTED",
  REJECTED_DELIVERY = "REJECTED_DELIVERY",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}

export enum PurchaseOrderStatus {
  DRAFT = "DRAFT",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  SENT = "SENT",
  CONFIRMED = "CONFIRMED",
  PARTIAL = "PARTIAL",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  ON_HOLD = "ON_HOLD",
  DISPUTED = "DISPUTED"
}

export enum CashflowPeriod {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  YEARLY = "YEARLY",
  CUSTOM = "CUSTOM"
}

export enum ScholarshipType {
  MERIT = "MERIT",
  NEED_BASED = "NEED_BASED",
  ATHLETIC = "ATHLETIC",
  ARTS = "ARTS",
  COMMUNITY_SERVICE = "COMMUNITY_SERVICE",
  DIVERSITY = "DIVERSITY",
  FIRST_GENERATION = "FIRST_GENERATION",
  LEGACY = "LEGACY",
  CORPORATE = "CORPORATE",
  GOVERNMENT = "GOVERNMENT"
}

export enum ScholarshipCriteria {
  GPA = "GPA",
  TEST_SCORES = "TEST_SCORES",
  INCOME = "INCOME",
  ENROLLMENT_STATUS = "ENROLLMENT_STATUS",
  YEAR_OF_STUDY = "YEAR_OF_STUDY",
  MAJOR = "MAJOR",
  ACTIVITY = "ACTIVITY",
  RECOMMENDATION = "RECOMMENDATION",
  ESSAY = "ESSAY",
  INTERVIEW = "INTERVIEW"
}

export enum PredictionModel {
  LINEAR_REGRESSION = "LINEAR_REGRESSION",
  POLYNOMIAL_REGRESSION = "POLYNOMIAL_REGRESSION",
  TIME_SERIES = "TIME_SERIES",
  ARIMA = "ARIMA",
  EXPONENTIAL_SMOOTHING = "EXPONENTIAL_SMOOTHING",
  RANDOM_FOREST = "RANDOM_FOREST",
  GRADIENT_BOOSTING = "GRADIENT_BOOSTING",
  NEURAL_NETWORK = "NEURAL_NETWORK",
  LSTM = "LSTM",
  ENSEMBLE = "ENSEMBLE"
}

export enum FinancialRiskLevel {
  MINIMAL = "MINIMAL",
  LOW = "LOW",
  MODERATE = "MODERATE",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
  CRITICAL = "CRITICAL"
}

export enum AuditStatus {
  SCHEDULED = "SCHEDULED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FINDINGS = "FINDINGS",
  REMEDIATION = "REMEDIATION",
  CLOSED = "CLOSED"
}

export enum FinancialCompliance {
  COMPLIANT = "COMPLIANT",
  NON_COMPLIANT = "NON_COMPLIANT",
  PARTIALLY_COMPLIANT = "PARTIALLY_COMPLIANT",
  UNDER_REVIEW = "UNDER_REVIEW",
  EXEMPT = "EXEMPT"
}

export enum BudgetPeriodType {
  ACADEMIC_YEAR = "ACADEMIC_YEAR",
  CALENDAR_YEAR = "CALENDAR_YEAR",
  FISCAL_YEAR = "FISCAL_YEAR",
  SEMESTER = "SEMESTER",
  QUARTER = "QUARTER",
  MONTHLY = "MONTHLY"
}

export enum RevenueForecastMethod {
  HISTORICAL = "HISTORICAL",
  REGRESSION = "REGRESSION",
  TREND = "TREND",
  SEASONAL = "SEASONAL",
  MOVING_AVERAGE = "MOVING_AVERAGE",
  EXPONENTIAL = "EXPONENTIAL",
  COMPOSITE = "COMPOSITE"
}

export enum CostAllocationMethod {
  DIRECT = "DIRECT",
  STEP_DOWN = "STEP_DOWN",
  RECIPROCAL = "RECIPROCAL",
  ACTIVITY_BASED = "ACTIVITY_BASED",
  SQUARE_FOOTAGE = "SQUARE_FOOTAGE",
  PERCENTAGE = "PERCENTAGE"
}

export enum ProcurementMethod {
  DIRECT_PURCHASE = "DIRECT_PURCHASE",
  QUOTATION = "QUOTATION",
  TENDER = "TENDER",
  AUCTION = "AUCTION",
  FRAMEWORK = "FRAMEWORK",
  E_PROCUREMENT = "E_PROCUREMENT"
}

export enum ContractType {
  FIXED_PRICE = "FIXED_PRICE",
  COST_PLUS = "COST_PLUS",
  TIME_MATERIAL = "TIME_MATERIAL",
  UNIT_PRICE = "UNIT_PRICE",
  INDEFINITE_DELIVERY = "INDEFINITE_DELIVERY",
  BLANKET = "BLANKET"
}

export enum PaymentMethod {
  CASH = "CASH",
  CHECK = "CHECK",
  BANK_TRANSFER = "BANK_TRANSFER",
  MOBILE_MONEY = "MOBILE_MONEY",
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  WIRE = "WIRE",
  ACH = "ACH"
}

export enum CurrencyCode {
  XOF = "XOF",
  XAF = "XAF",
  NGN = "NGN",
  KES = "KES",
  GHS = "GHS",
  ZAR = "ZAR",
  EGP = "EGP",
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP"
}

export enum FinancialAlertType {
  BUDGET_OVER = "BUDGET_OVER",
  CASH_LOW = "CASH_LOW",
  PAYMENT_DUE = "PAYMENT_DUE",
  INVOICE_OVERDUE = "INVOICE_OVERDUE",
  FRAUD_SUSPECTED = "FRAUD_SUSPECTED",
  COMPLIANCE_ISSUE = "COMPLIANCE_ISSUE",
  UNUSUAL_ACTIVITY = "UNUSUAL_ACTIVITY",
  VARIANCE = "VARIANCE",
  THRESHOLD = "THRESHOLD",
  DEADLINE = "DEADLINE"
}

export enum FinancialReportType {
  BALANCE_SHEET = "BALANCE_SHEET",
  INCOME_STATEMENT = "INCOME_STATEMENT",
  CASH_FLOW = "CASH_FLOW",
  BUDGET_VS_ACTUAL = "BUDGET_VS_ACTUAL",
  REVENUE_REPORT = "REVENUE_REPORT",
  EXPENSE_REPORT = "EXPENSE_REPORT",
  AGING_REPORT = "AGING_REPORT",
  BANK_RECONCILIATION = "BANK_RECONCILIATION",
  TAX_REPORT = "TAX_REPORT",
  AUDIT_REPORT = "AUDIT_REPORT"
}

export enum OptimizationStrategy {
  COST_CUTTING = "COST_CUTTING",
  REVENUE_ENHANCEMENT = "REVENUE_ENHANCEMENT",
  PROCESS_IMPROVEMENT = "PROCESS_IMPROVEMENT",
  RESOURCE_REALLOCATION = "RESOURCE_REALLOCATION",
  DEBT_REDUCTION = "DEBT_REDUCTION",
  INVESTMENT_OPTIMIZATION = "INVESTMENT_OPTIMIZATION",
  RISK_MITIGATION = "RISK_MITIGATION",
  DIVERSIFICATION = "DIVERSIFICATION",
  EFFICIENCY_GAINS = "EFFICIENCY_GAINS",
  STRATEGIC_PLANNING = "STRATEGIC_PLANNING"
}

export enum ScholarshipAllocationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  DISBURSED = "DISBURSED",
  SUSPENDED = "SUSPENDED",
  TERMINATED = "TERMINATED"
}

export enum FinancialForecastHorizon {
  SHORT_TERM = "SHORT_TERM",
  MEDIUM_TERM = "MEDIUM_TERM",
  LONG_TERM = "LONG_TERM"
}

export enum CashflowCategory {
  OPERATING = "OPERATING",
  INVESTING = "INVESTING",
  FINANCING = "FINANCING"
}

export enum InvoiceStatus {
  DRAFT = "DRAFT",
  SENT = "SENT",
  VIEWED = "VIEWED",
  PARTIAL = "PARTIAL",
  PAID = "PAID",
  OVERDUE = "OVERDUE",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED"
}

export interface BudgetOptimization {
  id: string;
  schoolId: string;
  fiscalYear: number;
  periodType: BudgetPeriodType;
  goal: OptimizationGoal;
  strategy: OptimizationStrategy;
  currentBudget: BudgetAllocation[];
  optimizedBudget: BudgetAllocation[];
  savings: number;
  recommendations: BudgetRecommendation[];
  metadata: BudgetOptimizationMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface BudgetAllocation {
  id: string;
  category: BudgetCategory;
  allocated: number;
  spent: number;
  remaining: number;
  utilization: number;
  trend: number;
  optimization: AllocationOptimization;
  metadata: BudgetAllocationMetadata;
}

export interface AllocationOptimization {
  recommended: number;
  reason: string;
  confidence: number;
  impact: string;
  priority: number;
}

export interface BudgetAllocationMetadata {
  lastUpdated: Date;
  approvedBy: string;
  version: string;
  comments: string[];
}

export interface BudgetRecommendation {
  id: string;
  type: string;
  category: BudgetCategory;
  description: string;
  savings: number;
  impact: string;
  confidence: number;
  implementation: string;
  timeline: string;
}

export interface BudgetOptimizationMetadata {
  model: string;
  accuracy: number;
  dataPoints: number;
  lastCalibrated: Date;
}

export interface RevenueForecast {
  id: string;
  schoolId: string;
  source: RevenueSource;
  method: RevenueForecastMethod;
  period: string;
  historical: RevenueDataPoint[];
  forecast: RevenueDataPoint[];
  confidence: number;
  metadata: RevenueForecastMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface RevenueDataPoint {
  period: string;
  value: number;
  actual: number | null;
  variance: number | null;
}

export interface RevenueForecastMetadata {
  model: string;
  rSquared: number;
  mape: number;
  seasonality: boolean;
  trend: string;
}

export interface CostOptimization {
  id: string;
  schoolId: string;
  category: BudgetCategory;
  type: CostType;
  currentCost: number;
  optimizedCost: number;
  savings: number;
  methods: CostOptimizationMethod[];
  metadata: CostOptimizationMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CostOptimizationMethod {
  id: string;
  name: string;
  description: string;
  savings: number;
  difficulty: string;
  timeline: string;
  risks: string[];
  prerequisites: string[];
}

export interface CostOptimizationMetadata {
  analysisDate: Date;
  dataQuality: number;
  confidence: number;
}

export interface FraudAlert {
  id: string;
  schoolId: string;
  type: FraudType;
  severity: FraudSeverity;
  title: string;
  description: string;
  evidence: FraudEvidence[];
  status: string;
  assignedTo: string;
  metadata: FraudAlertMetadata;
  detectedAt: Date;
  resolvedAt: Date | null;
}

export interface FraudEvidence {
  id: string;
  type: string;
  description: string;
  amount: number | null;
  date: Date;
  source: string;
  confidence: number;
  attachments: string[];
}

export interface FraudAlertMetadata {
  detectionModel: string;
  falsePositiveProbability: number;
  similarCases: string[];
  recommendedActions: string[];
}

export interface FraudPattern {
  id: string;
  schoolId: string;
  type: FraudType;
  description: string;
  indicators: string[];
  frequency: number;
  totalImpact: number;
  riskScore: number;
  metadata: FraudPatternMetadata;
  identifiedAt: Date;
}

export interface FraudPatternMetadata {
  confidence: number;
  lastOccurrence: Date;
  affectedAccounts: string[];
  preventionMeasures: string[];
}

export interface ProcurementPlan {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  items: ProcurementItem[];
  totalBudget: number;
  method: ProcurementMethod;
  status: ProcurementStatus;
  timeline: ProcurementTimeline;
  metadata: ProcurementPlanMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProcurementItem {
  id: string;
  name: string;
  description: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  specifications: string;
  vendor: string;
  deliveryDate: Date;
}

export interface ProcurementTimeline {
  startDate: Date;
  bidDeadline: Date;
  evaluationDate: Date;
  awardDate: Date;
  deliveryDate: Date;
  completionDate: Date;
}

export interface ProcurementPlanMetadata {
  createdBy: string;
  approvedBy: string;
  bidCount: number;
  savings: number;
}

export interface PurchaseOrder {
  id: string;
  schoolId: string;
  orderNumber: string;
  vendorId: string;
  vendorName: string;
  items: PurchaseOrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: PurchaseOrderStatus;
  paymentTerms: string;
  contractType: ContractType;
  metadata: PurchaseOrderMetadata;
  createdAt: Date;
  updatedAt: Date;
  expectedDelivery: Date;
}

export interface PurchaseOrderItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  received: number;
  condition: string;
}

export interface PurchaseOrderMetadata {
  createdBy: string;
  approvedBy: string;
  paymentMethod: PaymentMethod;
  currency: CurrencyCode;
  notes: string;
}

export interface CashflowForecast {
  id: string;
  schoolId: string;
  period: CashflowPeriod;
  horizon: FinancialForecastHorizon;
  openingBalance: number;
  projections: CashflowProjection[];
  closingBalance: number;
  metadata: CashflowForecastMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CashflowProjection {
  period: string;
  category: CashflowCategory;
  inflows: CashflowItem[];
  outflows: CashflowItem[];
  netCashflow: number;
  cumulative: number;
}

export interface CashflowItem {
  id: string;
  description: string;
  amount: number;
  category: string;
  confidence: number;
  recurring: boolean;
}

export interface CashflowForecastMetadata {
  model: string;
  accuracy: number;
  assumptions: string[];
  lastUpdated: Date;
}

export interface CashflowOptimization {
  id: string;
  schoolId: string;
  currentCashflow: number;
  optimizedCashflow: number;
  strategies: CashflowStrategy[];
  recommendations: string[];
  metadata: CashflowOptimizationMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CashflowStrategy {
  id: string;
  name: string;
  description: string;
  impact: number;
  timeline: string;
  difficulty: string;
  risks: string[];
}

export interface CashflowOptimizationMetadata {
  analysisDate: Date;
  confidence: number;
  dataQuality: number;
}

export interface ScholarshipAllocation {
  id: string;
  schoolId: string;
  scholarshipType: ScholarshipType;
  studentId: string;
  amount: number;
  criteria: ScholarshipCriteriaCheck[];
  status: ScholarshipAllocationStatus;
  period: string;
  metadata: ScholarshipAllocationMetadata;
  createdAt: Date;
  updatedAt: Date;
  disbursedAt: Date | null;
}

export interface ScholarshipCriteriaCheck {
  criteria: ScholarshipCriteria;
  met: boolean;
  score: number;
  weight: number;
}

export interface ScholarshipAllocationMetadata {
  totalApplicants: number;
  rank: number;
  fundingSource: string;
  renewable: boolean;
}

export interface ScholarshipOptimization {
  id: string;
  schoolId: string;
  totalBudget: number;
  allocations: ScholarshipAllocation[];
  criteria: ScholarshipOptimizationCriteria[];
  recommendations: ScholarshipRecommendation[];
  metadata: ScholarshipOptimizationMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScholarshipOptimizationCriteria {
  criteria: ScholarshipCriteria;
  weight: number;
  threshold: number;
  impact: number;
}

export interface ScholarshipRecommendation {
  id: string;
  type: string;
  description: string;
  impact: number;
  confidence: number;
}

export interface ScholarshipOptimizationMetadata {
  totalApplications: number;
  avgScore: number;
  diversityIndex: number;
}

export interface FinancialModel {
  id: string;
  schoolId: string;
  name: string;
  type: string;
  assumptions: FinancialAssumption[];
  projections: FinancialProjection[];
  scenarios: FinancialScenario[];
  metadata: FinancialModelMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface FinancialAssumption {
  id: string;
  name: string;
  value: number;
  unit: string;
  range: AssumptionRange;
  sensitivity: number;
}

export interface AssumptionRange {
  min: number;
  max: number;
  base: number;
}

export interface FinancialProjection {
  period: string;
  revenue: number;
  expenses: number;
  netIncome: number;
  cashflow: number;
  balance: number;
}

export interface FinancialScenario {
  id: string;
  name: string;
  type: string;
  adjustments: ScenarioAdjustment[];
  outcomes: FinancialProjection[];
}

export interface ScenarioAdjustment {
  assumptionId: string;
  adjustment: number;
  type: string;
}

export interface FinancialModelMetadata {
  author: string;
  version: string;
  lastUpdated: Date;
  accuracy: number;
}

export interface FinancialPrediction {
  id: string;
  schoolId: string;
  type: string;
  model: PredictionModel;
  input: PredictionInput;
  output: PredictionOutput;
  confidence: number;
  metadata: FinancialPredictionMetadata;
  createdAt: Date;
}

export interface PredictionInput {
  features: string[];
  values: number[];
  timeframe: string;
}

export interface PredictionOutput {
  predicted: number;
  lower: number;
  upper: number;
  unit: string;
}

export interface FinancialPredictionMetadata {
  modelVersion: string;
  trainingData: string;
  metrics: PredictionMetrics;
}

export interface PredictionMetrics {
  mse: number;
  rmse: number;
  mae: number;
  rSquared: number;
  mape: number;
}

export interface FinancialAudit {
  id: string;
  schoolId: string;
  type: string;
  status: AuditStatus;
  scope: string[];
  findings: AuditFinding[];
  recommendations: AuditRecommendation[];
  score: number;
  compliance: FinancialCompliance;
  metadata: FinancialAuditMetadata;
  startDate: Date;
  endDate: Date | null;
  completedAt: Date | null;
}

export interface AuditFinding {
  id: string;
  category: string;
  severity: string;
  description: string;
  evidence: string;
  recommendation: string;
  status: string;
  assignedTo: string;
}

export interface AuditRecommendation {
  id: string;
  priority: string;
  description: string;
  impact: string;
  timeline: string;
  cost: number;
}

export interface FinancialAuditMetadata {
  auditor: string;
  team: string[];
  cost: number;
  documentsReviewed: number;
}

export interface FinanceMetrics {
  id: string;
  schoolId: string;
  period: string;
  revenue: FinanceRevenueMetrics;
  expenses: FinanceExpenseMetrics;
  cashflow: FinanceCashflowMetrics;
  budget: FinanceBudgetMetrics;
  metadata: FinanceMetricsMetadata;
  createdAt: Date;
}

export interface FinanceRevenueMetrics {
  total: number;
  growth: number;
  perStudent: number;
  bySource: Record<RevenueSource, number>;
  trend: number[];
}

export interface FinanceExpenseMetrics {
  total: number;
  growth: number;
  perStudent: number;
  byCategory: Record<BudgetCategory, number>;
  trend: number[];
}

export interface FinanceCashflowMetrics {
  operating: number;
  investing: number;
  financing: number;
  net: number;
  ratio: number;
}

export interface FinanceBudgetMetrics {
  totalBudget: number;
  utilized: number;
  utilizationRate: number;
  variance: number;
  categories: BudgetCategoryMetrics[];
}

export interface BudgetCategoryMetrics {
  category: BudgetCategory;
  allocated: number;
  spent: number;
  utilization: number;
  variance: number;
}

export interface FinanceMetricsMetadata {
  dataQuality: number;
  lastUpdated: Date;
  comparisonPeriod: string;
}

export interface FinancialAlert {
  id: string;
  schoolId: string;
  type: FinancialAlertType;
  severity: string;
  title: string;
  message: string;
  amount: number | null;
  category: string;
  acknowledged: boolean;
  metadata: FinancialAlertMetadata;
  createdAt: Date;
  acknowledgedAt: Date | null;
}

export interface FinancialAlertMetadata {
  source: string;
  threshold: number | null;
  currentValue: number | null;
  recommendedAction: string;
}

export interface BudgetDashboard {
  id: string;
  schoolId: string;
  fiscalYear: number;
  summary: BudgetDashboardSummary;
  charts: BudgetDashboardChart[];
  alerts: FinancialAlert[];
  metadata: BudgetDashboardMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface BudgetDashboardSummary {
  totalBudget: number;
  totalSpent: number;
  totalRemaining: number;
  utilizationRate: number;
  revenue: number;
  surplus: number;
}

export interface BudgetDashboardChart {
  id: string;
  type: string;
  title: string;
  data: unknown;
  config: Record<string, unknown>;
}

export interface BudgetDashboardMetadata {
  lastRefreshed: Date;
  dataPoints: number;
}

export interface CostAllocation {
  id: string;
  schoolId: string;
  method: CostAllocationMethod;
  allocations: CostAllocationEntry[];
  totalCost: number;
  metadata: CostAllocationMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CostAllocationEntry {
  id: string;
  department: string;
  category: BudgetCategory;
  amount: number;
  percentage: number;
  basis: string;
}

export interface CostAllocationMetadata {
  basisDescription: string;
  lastCalculated: Date;
  accuracy: number;
}

export interface VendorPerformance {
  id: string;
  schoolId: string;
  vendorId: string;
  vendorName: string;
  metrics: VendorMetrics;
  score: number;
  history: VendorPerformanceHistory[];
  metadata: VendorPerformanceMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorMetrics {
  onTimeDelivery: number;
  qualityScore: number;
  priceCompetitiveness: number;
  responsiveness: number;
  compliance: number;
}

export interface VendorPerformanceHistory {
  period: string;
  score: number;
  orders: number;
  issues: number;
}

export interface VendorPerformanceMetadata {
  totalOrders: number;
  totalSpent: number;
  contractValue: number;
}

export interface Invoice {
  id: string;
  schoolId: string;
  invoiceNumber: string;
  vendorId: string;
  vendorName: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: InvoiceStatus;
  dueDate: Date;
  paymentDate: Date | null;
  paymentMethod: PaymentMethod | null;
  metadata: InvoiceMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  category: string;
}

export interface InvoiceMetadata {
  approvedBy: string;
  poNumber: string;
  notes: string;
  attachments: string[];
}

export interface FinancialReport {
  id: string;
  schoolId: string;
  type: FinancialReportType;
  period: string;
  data: FinancialReportData;
  generatedAt: Date;
  metadata: FinancialReportMetadata;
}

export interface FinancialReportData {
  sections: FinancialReportSection[];
  summary: Record<string, unknown>;
  charts: BudgetDashboardChart[];
}

export interface FinancialReportSection {
  id: string;
  title: string;
  content: string;
  data: unknown;
  order: number;
}

export interface FinancialReportMetadata {
  generatedBy: string;
  format: string;
  pages: number;
  size: number;
}

export interface FinancialRisk {
  id: string;
  schoolId: string;
  type: string;
  description: string;
  level: FinancialRiskLevel;
  probability: number;
  impact: number;
  mitigation: string[];
  metadata: FinancialRiskMetadata;
  identifiedAt: Date;
  lastReviewed: Date;
}

export interface FinancialRiskMetadata {
  owner: string;
  status: string;
  cost: number;
  residualRisk: number;
}

export interface CashflowAlert {
  id: string;
  schoolId: string;
  type: FinancialAlertType;
  severity: string;
  currentBalance: number;
  threshold: number;
  projection: number;
  daysUntilCritical: number;
  recommendations: string[];
  metadata: CashflowAlertMetadata;
  createdAt: Date;
}

export interface CashflowAlertMetadata {
  category: CashflowCategory;
  trend: string;
  urgency: string;
}

export interface ExpenseApproval {
  id: string;
  schoolId: string;
  expenseId: string;
  amount: number;
  category: BudgetCategory;
  description: string;
  submittedBy: string;
  approvedBy: string | null;
  status: string;
  metadata: ExpenseApprovalMetadata;
  createdAt: Date;
  approvedAt: Date | null;
}

export interface ExpenseApprovalMetadata {
  budgetRemaining: number;
  withinBudget: boolean;
  requireMultipleApprovals: boolean;
  approvalChain: string[];
}

export interface FinancialIntegration {
  id: string;
  schoolId: string;
  type: string;
  provider: string;
  config: Record<string, unknown>;
  enabled: boolean;
  lastSync: Date;
  metadata: FinancialIntegrationMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface FinancialIntegrationMetadata {
  syncStatus: string;
  errorCount: number;
  lastError: string | null;
}

export interface FinancialAuditTrail {
  id: string;
  schoolId: string;
  entityType: string;
  entityId: string;
  action: string;
  userId: string;
  changes: FinancialAuditChange[];
  metadata: FinancialAuditTrailMetadata;
  createdAt: Date;
}

export interface FinancialAuditChange {
  field: string;
  oldValue: unknown;
  newValue: unknown;
}

export interface FinancialAuditTrailMetadata {
  ipAddress: string;
  userAgent: string;
  reason: string;
}

export interface BudgetForecast {
  id: string;
  schoolId: string;
  fiscalYear: number;
  category: BudgetCategory;
  historical: BudgetDataPoint[];
  forecast: BudgetDataPoint[];
  confidence: number;
  metadata: BudgetForecastMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface BudgetDataPoint {
  period: string;
  value: number;
  actual: number | null;
}

export interface BudgetForecastMetadata {
  model: string;
  accuracy: number;
  lastCalibrated: Date;
}

export interface ScholarshipBudget {
  id: string;
  schoolId: string;
  fiscalYear: number;
  totalBudget: number;
  allocated: number;
  disbursed: number;
  remaining: number;
  byType: ScholarshipBudgetByType[];
  metadata: ScholarshipBudgetMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScholarshipBudgetByType {
  type: ScholarshipType;
  budget: number;
  allocated: number;
  disbursed: number;
  count: number;
}

export interface ScholarshipBudgetMetadata {
  lastUpdated: Date;
  approvalStatus: string;
  renewalRate: number;
}

export interface FinancialOptimizationResult {
  id: string;
  schoolId: string;
  strategy: OptimizationStrategy;
  current: FinancialOptimizationMetrics;
  optimized: FinancialOptimizationMetrics;
  improvement: number;
  recommendations: string[];
  metadata: FinancialOptimizationResultMetadata;
  createdAt: Date;
}

export interface FinancialOptimizationMetrics {
  revenue: number;
  expenses: number;
  netIncome: number;
  cashflow: number;
  roi: number;
}

export interface FinancialOptimizationResultMetadata {
  model: string;
  confidence: number;
  assumptions: string[];
  lastCalibrated: Date;
}

export interface CostSaving {
  id: string;
  schoolId: string;
  category: BudgetCategory;
  description: string;
  amount: number;
  percentage: number;
  method: string;
  status: string;
  verified: boolean;
  metadata: CostSavingMetadata;
  identifiedAt: Date;
  realizedAt: Date | null;
}

export interface CostSavingMetadata {
  annualized: number;
  recurring: boolean;
  risk: string;
  effort: string;
}

export interface FinancialKPI {
  id: string;
  schoolId: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: number;
  status: string;
  metadata: FinancialKPIMetadata;
  period: string;
  updatedAt: Date;
}

export interface FinancialKPIMetadata {
  category: string;
  frequency: string;
  owner: string;
  benchmark: number;
}

export interface Vendor {
  id: string;
  schoolId: string;
  name: string;
  category: string;
  contact: VendorContact;
  performance: VendorMetrics;
  contracts: VendorContract[];
  metadata: VendorMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorContact {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface VendorContract {
  id: string;
  type: ContractType;
  startDate: Date;
  endDate: Date;
  value: number;
  status: string;
}

export interface VendorMetadata {
  rating: number;
  totalOrders: number;
  totalSpent: number;
  preferred: boolean;
}

export interface FinancialDashboard {
  id: string;
  schoolId: string;
  summary: FinancialDashboardSummary;
  revenue: FinanceRevenueMetrics;
  expenses: FinanceExpenseMetrics;
  cashflow: FinanceCashflowMetrics;
  alerts: FinancialAlert[];
  kpis: FinancialKPI[];
  metadata: FinancialDashboardMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface FinancialDashboardSummary {
  totalRevenue: number;
  totalExpenses: number;
  netIncome: number;
  cashBalance: number;
  budgetUtilization: number;
}

export interface FinancialDashboardMetadata {
  lastRefreshed: Date;
  dataQuality: number;
  currency: CurrencyCode;
}

export interface FraudDetectionConfig {
  id: string;
  schoolId: string;
  rules: FraudDetectionRule[];
  models: FraudDetectionModel[];
  thresholds: FraudThreshold[];
  metadata: FraudDetectionConfigMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface FraudDetectionRule {
  id: string;
  name: string;
  type: FraudType;
  condition: string;
  severity: FraudSeverity;
  enabled: boolean;
}

export interface FraudDetectionModel {
  id: string;
  name: string;
  type: string;
  accuracy: number;
  lastTrained: Date;
}

export interface FraudThreshold {
  type: FraudType;
  amount: number;
  frequency: number;
  pattern: string;
}

export interface FraudDetectionConfigMetadata {
  lastUpdated: Date;
  version: string;
  alertsLast30Days: number;
}

export interface CashflowReconciliation {
  id: string;
  schoolId: string;
  period: string;
  bankBalance: number;
  bookBalance: number;
  difference: number;
  reconcilingItems: ReconcilingItem[];
  status: string;
  metadata: CashflowReconciliationMetadata;
  createdAt: Date;
  completedAt: Date | null;
}

export interface ReconcilingItem {
  id: string;
  type: string;
  description: string;
  amount: number;
  status: string;
}

export interface CashflowReconciliationMetadata {
  reconciledBy: string;
  itemsCount: number;
  autoReconciled: number;
}

export interface ProcurementAnalytics {
  id: string;
  schoolId: string;
  period: string;
  totalSpend: number;
  totalSavings: number;
  byCategory: ProcurementCategoryAnalytics[];
  vendorDistribution: ProcurementVendorDistribution[];
  metadata: ProcurementAnalyticsMetadata;
  createdAt: Date;
}

export interface ProcurementCategoryAnalytics {
  category: string;
  spend: number;
  savings: number;
  orders: number;
  avgOrderValue: number;
}

export interface ProcurementVendorDistribution {
  vendorId: string;
  vendorName: string;
  spend: number;
  percentage: number;
  orders: number;
}

export interface ProcurementAnalyticsMetadata {
  dataPoints: number;
  lastUpdated: Date;
  accuracy: number;
}

export interface ScholarshipAnalytics {
  id: string;
  schoolId: string;
  period: string;
  totalApplicants: number;
  totalAwarded: number;
  totalAmount: number;
  byType: ScholarshipTypeAnalytics[];
  metadata: ScholarshipAnalyticsMetadata;
  createdAt: Date;
}

export interface ScholarshipTypeAnalytics {
  type: ScholarshipType;
  applicants: number;
  awarded: number;
  amount: number;
  avgScore: number;
}

export interface ScholarshipAnalyticsMetadata {
  diversityIndex: number;
  meritDistribution: string;
  lastUpdated: Date;
}

export enum FinancialTrend {
  INCREASING = "INCREASING",
  DECREASING = "DECREASING",
  STABLE = "STABLE",
  VOLATILE = "VOLATILE",
  SEASONAL = "SEASONAL"
}

export enum BudgetAllocationMethod {
  HISTORICAL = "HISTORICAL",
  ZERO_BASED = "ZERO_BASED",
  ACTIVITY_BASED = "ACTIVITY_BASED",
  PERFORMANCE_BASED = "PERFORMANCE_BASED",
  STRATEGIC = "STRATEGIC",
  INCREMENTAL = "INCREMENTAL"
}

export enum CostReductionMethod {
  AUTOMATION = "AUTOMATION",
  OUTSOURCING = "OUTSOURCING",
  NEGOTIATION = "NEGOTIATION",
  CONSOLIDATION = "CONSOLIDATION",
  ELIMINATION = "ELIMINATION",
  SUBSTITUTION = "SUBSTITUTION"
}

export enum RevenueGrowthStrategy {
  PRICE_INCREASE = "PRICE_INCREASE",
  VOLUME_INCREASE = "VOLUME_INCREASE",
  NEW_STUDENTS = "NEW_STUDENTS",
  NEW_PROGRAMS = "NEW_PROGRAMS",
  PARTNERSHIPS = "PARTNERSHIPS",
  DIVERSIFICATION = "DIVERSIFICATION"
}

export enum FinancialStabilityIndicator {
  STRONG = "STRONG",
  STABLE = "STABLE",
  WATCH = "WATCH",
  WEAK = "WEAK",
  CRITICAL = "CRITICAL"
}

export enum ProcurementPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
  URGENT = "URGENT"
}

export enum VendorEvaluationCriteria {
  PRICE = "PRICE",
  QUALITY = "QUALITY",
  DELIVERY = "DELIVERY",
  SERVICE = "SERVICE",
  COMPLIANCE = "COMPLIANCE",
  SUSTAINABILITY = "SUSTAINABILITY"
}

export enum CashflowForecastAccuracy {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW"
}

export enum ScholarshipRenewalCriteria {
  GPA = "GPA",
  BEHAVIOR = "BEHAVIOR",
  ACTIVITY = "ACTIVITY",
  NEED = "NEED",
  COMBINED = "COMBINED"
}

export enum FinancialScenarioType {
  BASE = "BASE",
  OPTIMISTIC = "OPTIMISTIC",
  PESSIMISTIC = "PESSIMISTIC",
  STRESS = "STRESS",
  BEST_CASE = "BEST_CASE",
  WORST_CASE = "WORST_CASE"
}

export enum InvoiceReminderType {
  FIRST = "FIRST",
  SECOND = "SECOND",
  THIRD = "THIRD",
  FINAL = "FINAL",
  LEGAL = "LEGAL"
}

export enum BudgetVarianceType {
  FAVORABLE = "FAVORABLE",
  UNFAVORABLE = "UNFAVORABLE",
  NEUTRAL = "NEUTRAL"
}

export enum FinancialHealthScore {
  EXCELLENT = "EXCELLENT",
  GOOD = "GOOD",
  FAIR = "FAIR",
  POOR = "POOR",
  CRITICAL = "CRITICAL"
}

export enum CostBenefitAnalysisType {
  ROI = "ROI",
  PAYBACK = "PAYBACK",
  NPV = "NPV",
  IRR = "IRR",
  BREAK_EVEN = "BREAK_EVEN"
}

export enum ScholarshipFundSource {
  ENDOWMENT = "ENDOWMENT",
  ANNUAL_BUDGET = "ANNUAL_BUDGET",
  DONATIONS = "DONATIONS",
  GRANTS = "GRANTS",
  CORPORATE = "CORPORATE"
}

export interface BudgetAllocationMethodConfig {
  id: string;
  schoolId: string;
  method: BudgetAllocationMethod;
  parameters: Record<string, unknown>;
  metadata: BudgetAllocationMethodConfigMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface BudgetAllocationMethodConfigMetadata {
  lastApplied: Date;
  accuracy: number;
  version: string;
}

export interface CostReductionPlan {
  id: string;
  schoolId: string;
  name: string;
  target: number;
  methods: CostReductionMethodItem[];
  timeline: string;
  status: string;
  metadata: CostReductionPlanMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CostReductionMethodItem {
  method: CostReductionMethod;
  category: BudgetCategory;
  currentCost: number;
  targetCost: number;
  savings: number;
  difficulty: string;
  risks: string[];
}

export interface CostReductionPlanMetadata {
  totalSavings: number;
  percentageReduction: number;
  approvedBy: string;
}

export interface RevenueGrowthPlan {
  id: string;
  schoolId: string;
  name: string;
  strategies: RevenueGrowthStrategyItem[];
  targetRevenue: number;
  timeline: string;
  status: string;
  metadata: RevenueGrowthPlanMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface RevenueGrowthStrategyItem {
  strategy: RevenueGrowthStrategy;
  currentRevenue: number;
  projectedRevenue: number;
  growth: number;
  investment: number;
  roi: number;
}

export interface RevenueGrowthPlanMetadata {
  totalGrowth: number;
  growthPercentage: number;
  approvedBy: string;
}

export interface FinancialStabilityReport {
  id: string;
  schoolId: string;
  indicator: FinancialStabilityIndicator;
  score: number;
  factors: FinancialStabilityFactor[];
  recommendations: string[];
  metadata: FinancialStabilityReportMetadata;
  createdAt: Date;
}

export interface FinancialStabilityFactor {
  name: string;
  value: number;
  weight: number;
  status: string;
}

export interface FinancialStabilityReportMetadata {
  period: string;
  lastUpdated: Date;
}

export interface ProcurementEvaluation {
  id: string;
  schoolId: string;
  procurementId: string;
  vendors: VendorEvaluation[];
  criteria: VendorEvaluationCriteriaWeight[];
  selectedVendor: string;
  metadata: ProcurementEvaluationMetadata;
  createdAt: Date;
}

export interface VendorEvaluation {
  vendorId: string;
  vendorName: string;
  scores: VendorEvaluationScore[];
  totalScore: number;
  rank: number;
}

export interface VendorEvaluationScore {
  criteria: VendorEvaluationCriteria;
  score: number;
  weight: number;
  comments: string;
}

export interface VendorEvaluationCriteriaWeight {
  criteria: VendorEvaluationCriteria;
  weight: number;
  minScore: number;
}

export interface ProcurementEvaluationMetadata {
  evaluator: string;
  totalVendors: number;
  evaluationDate: Date;
}

export interface CashflowForecastAccuracyReport {
  id: string;
  schoolId: string;
  period: string;
  accuracy: CashflowForecastAccuracy;
  variance: number;
  historicalAccuracy: CashflowAccuracyHistory[];
  metadata: CashflowForecastAccuracyReportMetadata;
  createdAt: Date;
}

export interface CashflowAccuracyHistory {
  period: string;
  predicted: number;
  actual: number;
  variance: number;
  accuracy: number;
}

export interface CashflowForecastAccuracyReportMetadata {
  totalPeriods: number;
  avgAccuracy: number;
  trend: string;
}

export interface ScholarshipRenewal {
  id: string;
  schoolId: string;
  scholarshipId: string;
  studentId: string;
  criteria: ScholarshipRenewalCriteriaCheck[];
  renewalEligible: boolean;
  metadata: ScholarshipRenewalMetadata;
  createdAt: Date;
  decisionAt: Date | null;
}

export interface ScholarshipRenewalCriteriaCheck {
  criteria: ScholarshipRenewalCriteria;
  met: boolean;
  value: number;
  threshold: number;
}

export interface ScholarshipRenewalMetadata {
  previousGpa: number;
  currentGpa: number;
  attendance: number;
}

export interface FinancialScenarioAnalysis {
  id: string;
  schoolId: string;
  scenarios: FinancialScenario[];
  baseScenario: string;
  comparison: ScenarioComparison;
  metadata: FinancialScenarioAnalysisMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScenarioComparison {
  bestCase: string;
  worstCase: string;
  expectedCase: string;
  variance: number;
}

export interface FinancialScenarioAnalysisMetadata {
  author: string;
  assumptions: string[];
  lastUpdated: Date;
}

export interface InvoiceReminder {
  id: string;
  invoiceId: string;
  type: InvoiceReminderType;
  sentAt: Date;
  response: string | null;
  metadata: InvoiceReminderMetadata;
}

export interface InvoiceReminderMetadata {
  method: string;
  recipient: string;
  nextReminderDate: Date | null;
}

export interface BudgetVarianceReport {
  id: string;
  schoolId: string;
  fiscalYear: number;
  period: string;
  variances: BudgetVarianceItem[];
  summary: BudgetVarianceSummary;
  metadata: BudgetVarianceReportMetadata;
  createdAt: Date;
}

export interface BudgetVarianceItem {
  category: BudgetCategory;
  budgeted: number;
  actual: number;
  variance: number;
  varianceType: BudgetVarianceType;
  percentage: number;
}

export interface BudgetVarianceSummary {
  totalBudgeted: number;
  totalActual: number;
  totalVariance: number;
  favorableCount: number;
  unfavorableCount: number;
}

export interface BudgetVarianceReportMetadata {
  approvedBy: string;
  lastUpdated: Date;
}

export interface FinancialHealthReport {
  id: string;
  schoolId: string;
  score: FinancialHealthScore;
  metrics: FinancialHealthMetrics;
  benchmarks: FinancialBenchmark[];
  recommendations: string[];
  metadata: FinancialHealthReportMetadata;
  createdAt: Date;
}

export interface FinancialHealthMetrics {
  liquidity: number;
  solvency: number;
  profitability: number;
  efficiency: number;
  growth: number;
}

export interface FinancialBenchmark {
  metric: string;
  value: number;
  benchmark: number;
  percentile: number;
}

export interface FinancialHealthReportMetadata {
  period: string;
  lastUpdated: Date;
  dataQuality: number;
}

export interface CostBenefitAnalysis {
  id: string;
  schoolId: string;
  name: string;
  type: CostBenefitAnalysisType;
  costs: CostItem[];
  benefits: BenefitItem[];
  result: CostBenefitResult;
  metadata: CostBenefitAnalysisMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CostItem {
  id: string;
  description: string;
  amount: number;
  category: string;
  recurring: boolean;
  period: string;
}

export interface BenefitItem {
  id: string;
  description: string;
  amount: number;
  category: string;
  recurring: boolean;
  period: string;
  confidence: number;
}

export interface CostBenefitResult {
  roi: number;
  paybackPeriod: number;
  npv: number;
  irr: number;
  benefitCostRatio: number;
}

export interface CostBenefitAnalysisMetadata {
  author: string;
  discountRate: number;
  timeframe: number;
  assumptions: string[];
}

export interface ScholarshipFund {
  id: string;
  schoolId: string;
  name: string;
  source: ScholarshipFundSource;
  totalFund: number;
  allocated: number;
  remaining: number;
  scholarships: ScholarshipAllocation[];
  metadata: ScholarshipFundMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScholarshipFundMetadata {
  donor: string;
  purpose: string;
  renewalAllowed: boolean;
  lastAudit: Date;
}

export interface ScholarshipPerformance {
  id: string;
  schoolId: string;
  scholarshipId: string;
  studentId: string;
  academicPerformance: number;
  attendance: number;
  behavior: number;
  overallScore: number;
  metadata: ScholarshipPerformanceMetadata;
  period: string;
  measuredAt: Date;
}

export interface ScholarshipPerformanceMetadata {
  previousScore: number;
  improvement: number;
  rank: number;
}

export interface FinancialComplianceReport {
  id: string;
  schoolId: string;
  status: FinancialCompliance;
  requirements: ComplianceRequirement[];
  findings: ComplianceFinding[];
  score: number;
  metadata: FinancialComplianceReportMetadata;
  createdAt: Date;
  completedAt: Date | null;
}

export interface ComplianceRequirement {
  id: string;
  name: string;
  description: string;
  status: string;
  evidence: string;
}

export interface ComplianceFinding {
  id: string;
  requirementId: string;
  status: string;
  description: string;
  recommendation: string;
}

export interface FinancialComplianceReportMetadata {
  auditor: string;
  cost: number;
  documentsReviewed: number;
}

export interface VendorContractManagement {
  id: string;
  schoolId: string;
  vendorId: string;
  contracts: ManagedContract[];
  totalValue: number;
  activeContracts: number;
  metadata: VendorContractManagementMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface ManagedContract {
  id: string;
  name: string;
  type: ContractType;
  startDate: Date;
  endDate: Date;
  value: number;
  status: string;
  renewalDate: Date | null;
}

export interface VendorContractManagementMetadata {
  expiringSoon: number;
  autoRenew: boolean;
  lastReviewed: Date;
}

export interface FinancialKPIDashboard {
  id: string;
  schoolId: string;
  kpis: FinancialKPIItem[];
  trends: FinancialKPITrend[];
  alerts: FinancialAlert[];
  metadata: FinancialKPIDashboardMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface FinancialKPIItem {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  status: string;
  trend: number;
}

export interface FinancialKPITrend {
  kpiId: string;
  values: number[];
  period: string;
  direction: FinancialTrend;
}

export interface FinancialKPIDashboardMetadata {
  lastRefreshed: Date;
  dataQuality: number;
}

export enum BudgetApprovalWorkflow {
  SINGLE = "SINGLE",
  MULTI_LEVEL = "MULTI_LEVEL",
  COMMITTEE = "COMMITTEE",
  BOARD = "BOARD"
}

export enum CostSavingCategory {
  OPERATIONAL = "OPERATIONAL",
  STRATEGIC = "STRATEGIC",
  ONE_TIME = "ONE_TIME",
  RECURRING = "RECURRING"
}

export enum RevenueDiversification {
  LOW = "LOW",
  MODERATE = "MODERATE",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH"
}

export enum FinancialDataQuality {
  EXCELLENT = "EXCELLENT",
  GOOD = "GOOD",
  FAIR = "FAIR",
  POOR = "POOR"
}

export enum ProcurementRiskLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL"
}

export enum ScholarshipAwardMethod {
  AUTOMATIC = "AUTOMATIC",
  COMMITTEE = "COMMITTEE",
  AI_ASSISTED = "AI_ASSISTED",
  HYBRID = "HYBRID"
}

export enum CashflowManagementStyle {
  CONSERVATIVE = "CONSERVATIVE",
  MODERATE = "MODERATE",
  AGGRESSIVE = "AGGRESSIVE"
}

export enum FinancialPlanningHorizon {
  SHORT = "SHORT",
  MEDIUM = "MEDIUM",
  LONG = "LONG"
}

export enum BudgetVarianceSeverity {
  MINOR = "MINOR",
  MODERATE = "MODERATE",
  SIGNIFICANT = "SIGNIFICANT",
  CRITICAL = "CRITICAL"
}

export enum CostOptimizationPhase {
  ANALYSIS = "ANALYSIS",
  PLANNING = "PLANNING",
  IMPLEMENTATION = "IMPLEMENTATION",
  MONITORING = "MONITORING"
}

export enum ScholarshipImpactMeasurement {
  ACADEMIC = "ACADEMIC",
  SOCIAL = "SOCIAL",
  ECONOMIC = "ECONOMIC",
  HOLISTIC = "HOLISTIC"
}

export enum FinancialGovernanceLevel {
  BASIC = "BASIC",
  STANDARD = "STANDARD",
  ADVANCED = "ADVANCED",
  ENTERPRISE = "ENTERPRISE"
}

export enum BudgetExecutionPhase {
  PLANNING = "PLANNING",
  ALLOCATION = "ALLOCATION",
  EXECUTION = "EXECUTION",
  MONITORING = "MONITORING",
  EVALUATION = "EVALUATION"
}

export enum CostTrackingGranularity {
  CATEGORY = "CATEGORY",
  DEPARTMENT = "DEPARTMENT",
  PROJECT = "PROJECT",
  VENDOR = "VENDOR",
  LINE_ITEM = "LINE_ITEM"
}

export enum ScholarshipReviewCycle {
  ANNUAL = "ANNUAL",
  SEMI_ANNUAL = "SEMI_ANNUAL",
  QUARTERLY = "QUARTERLY",
  ON_DEMAND = "ON_DEMAND"
}

export enum FinancialAlertChannel {
  EMAIL = "EMAIL",
  SMS = "SMS",
  PUSH = "PUSH",
  DASHBOARD = "DASHBOARD",
  WEBHOOK = "WEBHOOK"
}

export enum CostAllocationBasis {
  SQUARE_FOOTAGE = "SQUARE_FOOTAGE",
  EMPLOYEE_COUNT = "EMPLOYEE_COUNT",
  REVENUE = "REVENUE",
  USAGE = "USAGE",
  EQUAL = "EQUAL"
}
