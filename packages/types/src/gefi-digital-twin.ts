export enum TwinType {
  INSTITUTION = "INSTITUTION",
  STUDENT = "STUDENT",
  REVENUE = "REVENUE",
  EXPENSE = "EXPENSE",
  DEBT = "DEBT",
  FUNDING = "FUNDING",
  CASH_FLOW = "CASH_FLOW",
  ASSET = "ASSET",
  LIABILITY = "LIABILITY",
  PORTFOLIO = "PORTFOLIO",
}

export enum ScenarioType {
  BASELINE = "BASELINE",
  GROWTH = "GROWTH",
  CONTRACTION = "CONTRACTION",
  STRESS = "STRESS",
  RESTRUCTURING = "RESTRUCTURING",
  OPTIMIZATION = "OPTIMIZATION",
}

export enum SimulationStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  PAUSED = "PAUSED",
}

export enum WhatIfParameter {
  ENROLLMENT_CHANGE = "ENROLLMENT_CHANGE",
  FEE_ADJUSTMENT = "FEE_ADJUSTMENT",
  COST_REDUCTION = "COST_REDUCTION",
  REVENUE_INCREASE = "REVENUE_INCREASE",
  NEW_PROGRAM = "NEW_PROGRAM",
  FACILITY_EXPANSION = "FACILITY_EXPANSION",
  STAFF_CHANGE = "STAFF_CHANGE",
  INVESTMENT_ALLOCATION = "INVESTMENT_ALLOCATION",
}

export enum RiskScenario {
  ENROLLMENT_DECLINE = "ENROLLMENT_DECLINE",
  FUNDING_CUT = "FUNDING_CUT",
  ECONOMIC_DOWNTURN = "ECONOMIC_DOWNTURN",
  REGULATORY_CHANGE = "REGULATORY_CHANGE",
  NATURAL_DISASTER = "NATURAL_DISASTER",
  COMPETITION = "COMPETITION",
  PANDEMIC = "PANDEMIC",
}

export enum AlertSeverity {
  INFO = "INFO",
  WARNING = "WARNING",
  CRITICAL = "CRITICAL",
  EMERGENCY = "EMERGENCY",
}

export enum OptimizationDirection {
  MAXIMIZE = "MAXIMIZE",
  MINIMIZE = "MINIMIZE",
  TARGET = "TARGET",
}

export enum MetricTrend {
  IMPROVING = "IMPROVING",
  STABLE = "STABLE",
  DECLINING = "DECLINING",
  VOLATILE = "VOLATILE",
}

export enum TwinSyncFrequency {
  REAL_TIME = "REAL_TIME",
  HOURLY = "HOURLY",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  ON_DEMAND = "ON_DEMAND",
}

export enum TwinVisualizationType {
  CHART = "CHART",
  TABLE = "TABLE",
  GAUGE = "GAUGE",
  HEATMAP = "HEATMAP",
  TIMELINE = "TIMELINE",
  SANKEY = "SANKEY",
}

export enum TwinPermission {
  VIEW = "VIEW",
  EDIT = "EDIT",
  SIMULATE = "SIMULATE",
  ADMIN = "ADMIN",
}

export enum TwinDataType {
  FINANCIAL = "FINANCIAL",
  OPERATIONAL = "OPERATIONAL",
  ENROLLMENT = "ENROLLMENT",
  STAFFING = "STAFFING",
  INFRASTRUCTURE = "INFRASTRUCTURE",
}

export enum PredictionModel {
  LINEAR = "LINEAR",
  POLYNOMIAL = "POLYNOMIAL",
  EXPONENTIAL = "EXPONENTIAL",
  LSTM = "LSTM",
  ARIMA = "ARIMA",
}

export enum TwinRefreshTrigger {
  DATA_CHANGE = "DATA_CHANGE",
  SCHEDULED = "SCHEDULED",
  MANUAL = "MANUAL",
  EVENT = "EVENT",
}

export enum TwinExportFormat {
  PDF = "PDF",
  EXCEL = "EXCEL",
  JSON = "JSON",
  CSV = "CSV",
}

export enum TwinAlertChannel {
  EMAIL = "EMAIL",
  SMS = "SMS",
  PUSH = "PUSH",
  WEBHOOK = "WEBHOOK",
}

export interface InstitutionFinancialTwin {
  id: string;
  schoolId: string;
  twinType: TwinType;
  name: string;
  description: string;
  state: FinancialTwinState;
  lastSyncedAt: Date;
  version: string;
  healthScore: number;
  syncFrequency: TwinSyncFrequency;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface StudentFinancialTwin {
  id: string;
  schoolId: string;
  studentId: string;
  twinType: TwinType;
  name: string;
  totalPaid: number;
  totalDue: number;
  balance: number;
  paymentScore: number;
  riskLevel: string;
  predictedGraduationDate: Date;
  financialHealthScore: number;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FinancialTwinState {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  cashBalance: number;
  debtBalance: number;
  operatingMargin: number;
  liquidityRatio: number;
  debtToEquity: number;
  revenueGrowthRate: number;
  expenseGrowthRate: number;
  snapshotDate: Date;
}

export interface RevenueTwin {
  id: string;
  schoolId: string;
  twinId: string;
  revenueStreams: RevenueStream[];
  totalRevenue: number;
  projectedRevenue: number;
  growthRate: number;
  forecast: RevenueForecast[];
  period: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface RevenueStream {
  name: string;
  amount: number;
  percentage: number;
  trend: MetricTrend;
}

export interface RevenueForecast {
  period: string;
  projected: number;
  optimistic: number;
  pessimistic: number;
}

export interface ExpenseTwin {
  id: string;
  schoolId: string;
  twinId: string;
  expenseCategories: ExpenseCategory[];
  totalExpenses: number;
  projectedExpenses: number;
  savingsOpportunities: SavingsOpportunity[];
  costReductionPotential: number;
  period: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ExpenseCategory {
  name: string;
  amount: number;
  percentage: number;
  trend: MetricTrend;
}

export interface SavingsOpportunity {
  category: string;
  currentCost: number;
  potentialSavings: number;
  implementationDifficulty: string;
  timeframe: string;
}

export interface DebtTwin {
  id: string;
  schoolId: string;
  twinId: string;
  totalDebt: number;
  debtByType: DebtItem[];
  debtServiceRatio: number;
  refinancingOpportunities: RefinancingOpportunity[];
  maturitySchedule: MaturitySchedule[];
  creditScore: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface DebtItem {
  type: string;
  principal: number;
  interestRate: number;
  monthlyPayment: number;
  maturityDate: Date;
}

export interface RefinancingOpportunity {
  currentRate: number;
  newRate: number;
  potentialSavings: number;
  lender: string;
}

export interface MaturitySchedule {
  year: number;
  principalDue: number;
  interestDue: number;
  totalDue: number;
}

export interface FundingTwin {
  id: string;
  schoolId: string;
  twinId: string;
  totalFunding: number;
  fundingSources: FundingSource[];
  fundingStability: number;
  diversificationScore: number;
  gapAnalysis: FundingGapAnalysis;
  forecast: FundingForecast[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FundingSource {
  name: string;
  type: string;
  amount: number;
  percentage: number;
  reliability: string;
}

export interface FundingGapAnalysis {
  currentGap: number;
  projectedGap: number;
  gapClosureRate: number;
  timeToClosure: number;
}

export interface FundingForecast {
  period: string;
  projected: number;
  sources: string[];
}

export interface CashFlowTwin {
  id: string;
  schoolId: string;
  twinId: string;
  currentBalance: number;
  monthlyInflow: number;
  monthlyOutflow: number;
  netCashFlow: number;
  runwayMonths: number;
  seasonalPatterns: SeasonalPattern[];
  cashFlowForecast: CashFlowTwinForecast[];
  liquidityScore: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface SeasonalPattern {
  month: number;
  inflowMultiplier: number;
  outflowMultiplier: number;
}

export interface CashFlowTwinForecast {
  period: string;
  inflow: number;
  outflow: number;
  netFlow: number;
  runningBalance: number;
}

export interface AssetTwin {
  id: string;
  schoolId: string;
  twinId: string;
  totalAssetValue: number;
  assetsByCategory: AssetItem[];
  depreciationSchedule: DepreciationItem[];
  utilizationRate: number;
  maintenanceCosts: number;
  replacementTimeline: ReplacementItem[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface AssetItem {
  category: string;
  value: number;
  count: number;
  utilizationRate: number;
}

export interface DepreciationItem {
  assetType: string;
  currentValue: number;
  depreciationRate: number;
  usefulLife: number;
}

export interface ReplacementItem {
  assetType: string;
  currentAge: number;
  expectedLifespan: number;
  estimatedCost: number;
}

export interface LiabilityTwin {
  id: string;
  schoolId: string;
  twinId: string;
  totalLiabilities: number;
  liabilitiesByCategory: LiabilityItem[];
  currentRatio: number;
  quickRatio: number;
  debtServiceCoverage: number;
  covenantCompliance: CovenantStatus[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface LiabilityItem {
  category: string;
  amount: number;
  percentage: number;
  maturityDate: Date;
}

export interface CovenantStatus {
  covenantName: string;
  requirement: number;
  current: number;
  compliant: boolean;
}

export interface FinancialScenario {
  id: string;
  schoolId: string;
  twinId: string;
  scenarioType: ScenarioType;
  name: string;
  description: string;
  parameters: ScenarioParameter[];
  projectedImpact: ScenarioImpact;
  probability: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ScenarioParameter {
  parameter: WhatIfParameter;
  baseValue: number;
  scenarioValue: number;
}

export interface ScenarioImpact {
  revenueChange: number;
  expenseChange: number;
  netImpact: number;
  riskLevel: string;
  timelineMonths: number;
}

export interface WhatIfAnalysis {
  id: string;
  schoolId: string;
  twinId: string;
  parameter: WhatIfParameter;
  baseValue: number;
  testValues: WhatIfTestResult[];
  bestCase: WhatIfTestResult;
  worstCase: WhatIfTestResult;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface WhatIfTestResult {
  testValue: number;
  projectedRevenue: number;
  projectedExpenses: number;
  netImpact: number;
  riskScore: number;
}

export interface SimulationResult {
  id: string;
  schoolId: string;
  twinId: string;
  scenarioType: ScenarioType;
  status: SimulationStatus;
  parameters: Record<string, unknown>;
  outcomes: SimulationOutcome[];
  riskAssessment: string;
  confidence: number;
  startedAt: Date;
  completedAt: Date | null;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface SimulationOutcome {
  metric: string;
  baseline: number;
  projected: number;
  change: number;
  changePercent: number;
}

export interface TwinAlert {
  id: string;
  schoolId: string;
  twinId: string;
  alertType: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  metric: string;
  threshold: number;
  actualValue: number;
  triggeredAt: Date;
  acknowledgedAt: Date | null;
  resolvedAt: Date | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface TwinOptimization {
  id: string;
  schoolId: string;
  twinId: string;
  optimizationType: WhatIfParameter;
  direction: OptimizationDirection;
  currentValue: number;
  targetValue: number;
  recommendations: OptimizationRecommendation[];
  estimatedImpact: number;
  confidence: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface OptimizationRecommendation {
  action: string;
  expectedImpact: number;
  implementationCost: number;
  timeframe: string;
  riskLevel: string;
}
