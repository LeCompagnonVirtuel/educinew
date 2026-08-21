export enum EconomicIndicator {
  GDP_GROWTH = "GDP_GROWTH",
  INFLATION_RATE = "INFLATION_RATE",
  UNEMPLOYMENT_RATE = "UNEMPLOYMENT_RATE",
  EDUCATION_SPENDING_GDP = "EDUCATION_SPENDING_GDP",
  STUDENT_DEBT_RATIO = "STUDENT_DEBT_RATIO",
  EMPLOYMENT_RATE_GRADUATES = "EMPLOYMENT_RATE_GRADUATES",
  TUITION_GROWTH = "TUITION_GROWTH",
  PUBLIC_FUNDING = "PUBLIC_FUNDING",
  PRIVATE_INVESTMENT = "PRIVATE_INVESTMENT",
  COST_OF_LIVING = "COST_OF_LIVING",
}

export enum ForecastModel {
  LINEAR_REGRESSION = "LINEAR_REGRESSION",
  ARIMA = "ARIMA",
  EXPONENTIAL_SMOOTHING = "EXPONENTIAL_SMOOTHING",
  RANDOM_FOREST = "RANDOM_FOREST",
  GRADIENT_BOOSTING = "GRADIENT_BOOSTING",
  NEURAL_NETWORK = "NEURAL_NETWORK",
  LSTM = "LSTM",
  TRANSFORMER = "TRANSFORMER",
  ENSEMBLE = "ENSEMBLE",
  PROPHET = "PROPHET",
}

export enum PredictionConfidence {
  VERY_LOW = "VERY_LOW",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
}

export enum AnomalyType {
  REVENUE_SPIKE = "REVENUE_SPIKE",
  REVENUE_DROP = "REVENUE_DROP",
  EXPENSE_SPIKE = "EXPENSE_SPIKE",
  EXPENSE_DROP = "EXPENSE_DROP",
  UNUSUAL_PATTERN = "UNUSUAL_PATTERN",
  SEASONAL_DEVIATION = "SEASONAL_DEVIATION",
  TREND_BREAK = "TREND_BREAK",
}

export enum OptimizationGoal {
  MAXIMIZE_REVENUE = "MAXIMIZE_REVENUE",
  MINIMIZE_EXPENSE = "MINIMIZE_EXPENSE",
  MAXIMIZE_ROI = "MAXIMIZE_ROI",
  BALANCE_BUDGET = "BALANCE_BUDGET",
  REDUCE_RISK = "REDUCE_RISK",
  INCREASE_EFFICIENCY = "INCREASE_EFFICIENCY",
}

export enum ScenarioType {
  BASE_CASE = "BASE_CASE",
  BEST_CASE = "BEST_CASE",
  WORST_CASE = "WORST_CASE",
  STRESS_TEST = "STRESS_TEST",
  MONTE_CARLO = "MONTE_CARLO",
  SENSITIVITY = "SENSITIVITY",
}

export enum ModelVersion {
  V1 = "V1",
  V2 = "V2",
  V3 = "V3",
  LATEST = "LATEST",
}

export enum GrowthDirection {
  UP = "UP",
  DOWN = "DOWN",
  STABLE = "STABLE",
}

export enum DataSourceType {
  INTERNAL = "INTERNAL",
  EXTERNAL = "EXTERNAL",
  MARKET = "MARKET",
  GOVERNMENT = "GOVERNMENT",
  AGGREGATED = "AGGREGATED",
}

export enum MetricCategory {
  REVENUE = "REVENUE",
  EXPENSE = "EXPENSE",
  ENROLLMENT = "ENROLLMENT",
  FUNDING = "FUNDING",
  INVESTMENT = "INVESTMENT",
  DEBT = "DEBT",
}

export enum DataGranularity {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  ANNUAL = "ANNUAL",
}

export enum TrendDirection {
  ASCENDING = "ASCENDING",
  DESCENDING = "DESCENDING",
  FLAT = "FLAT",
  VOLATILE = "VOLATILE",
}

export enum ComparisonPeriod {
  YEAR_OVER_YEAR = "YEAR_OVER_YEAR",
  QUARTER_OVER_QUARTER = "QUARTER_OVER_QUARTER",
  MONTH_OVER_MONTH = "MONTH_OVER_MONTH",
  ROLLING_12_MONTHS = "ROLLING_12_MONTHS",
}

export enum ForecastHorizon {
  SHORT_TERM = "SHORT_TERM",
  MEDIUM_TERM = "MEDIUM_TERM",
  LONG_TERM = "LONG_TERM",
}

export enum BenchmarkType {
  INTERNAL = "INTERNAL",
  INDUSTRY = "INDUSTRY",
  REGIONAL = "REGIONAL",
  GLOBAL = "GLOBAL",
}

export interface EducationSpendingMetric {
  id: string;
  schoolId: string;
  indicator: EconomicIndicator;
  value: number;
  previousValue: number;
  changePercent: number;
  period: string;
  dataSource: DataSourceType;
  confidence: PredictionConfidence;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CostPerStudent {
  id: string;
  schoolId: string;
  totalCost: number;
  studentCount: number;
  costPerStudent: number;
  breakdown: CostBreakdown;
  period: string;
  comparisonPeriod: string;
  changePercent: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CostBreakdown {
  instruction: number;
  administration: number;
  facilities: number;
  technology: number;
  support: number;
}

export interface EducationROI {
  id: string;
  schoolId: string;
  investmentType: string;
  investmentAmount: number;
  returnAmount: number;
  roiPercent: number;
  paybackPeriodMonths: number;
  period: string;
  confidence: PredictionConfidence;
  factors: ROIImpactFactor[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ROIImpactFactor {
  factor: string;
  impact: number;
  weight: number;
}

export interface TrainingROI {
  id: string;
  schoolId: string;
  programId: string;
  trainingType: string;
  cost: number;
  participantCount: number;
  outcomeScore: number;
  roiPercent: number;
  completionRate: number;
  period: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface FundingEfficiency {
  id: string;
  schoolId: string;
  fundingSource: string;
  totalFunding: number;
  allocatedAmount: number;
  utilizedAmount: number;
  efficiencyPercent: number;
  costPerOutcome: number;
  period: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ScholarshipImpact {
  id: string;
  schoolId: string;
  scholarshipId: string;
  totalAwarded: number;
  recipientCount: number;
  averageAward: number;
  retentionImpact: number;
  graduationImpact: number;
  employmentImpact: number;
  period: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface StudentFinancialRisk {
  id: string;
  schoolId: string;
  studentId: string;
  riskScore: number;
  riskFactors: StudentRiskFactor[];
  probabilityOfDefault: number;
  averagePaymentDelay: number;
  totalOutstanding: number;
  lastAssessmentDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface StudentRiskFactor {
  factor: string;
  weight: number;
  score: number;
}

export interface InstitutionFinancialHealth {
  id: string;
  schoolId: string;
  overallScore: number;
  liquidityRatio: number;
  debtToEquity: number;
  currentRatio: number;
  operatingMargin: number;
  studentRetentionRate: number;
  revenueGrowthRate: number;
  assessmentDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface RevenueGrowth {
  id: string;
  schoolId: string;
  category: string;
  currentRevenue: number;
  previousRevenue: number;
  growthPercent: number;
  direction: GrowthDirection;
  period: string;
  forecast: number;
  confidence: PredictionConfidence;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ExpenseGrowth {
  id: string;
  schoolId: string;
  category: string;
  currentExpense: number;
  previousExpense: number;
  growthPercent: number;
  direction: GrowthDirection;
  period: string;
  forecast: number;
  confidence: PredictionConfidence;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface BudgetVarianceMetric {
  id: string;
  schoolId: string;
  category: string;
  budgeted: number;
  actual: number;
  variance: number;
  variancePercent: number;
  favorable: boolean;
  period: string;
  explanation: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CashFlowForecast {
  id: string;
  schoolId: string;
  forecastDate: Date;
  projectedInflow: number;
  projectedOutflow: number;
  netCashFlow: number;
  runningBalance: number;
  confidence: PredictionConfidence;
  model: ForecastModel;
  modelVersion: ModelVersion;
  factors: CashFlowFactor[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CashFlowFactor {
  factor: string;
  impact: number;
  probability: number;
}

export interface FundingGap {
  id: string;
  schoolId: string;
  requiredAmount: number;
  securedAmount: number;
  gapAmount: number;
  gapPercent: number;
  fundingSources: string[];
  deadline: Date;
  criticality: string;
  mitigationPlan: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface InvestmentPerformanceMetric {
  id: string;
  schoolId: string;
  investmentType: string;
  investedAmount: number;
  currentValue: number;
  returnPercent: number;
  annualizedReturn: number;
  riskLevel: string;
  benchmarkComparison: number;
  period: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface EconomicForecast {
  id: string;
  schoolId: string;
  indicator: EconomicIndicator;
  model: ForecastModel;
  modelVersion: ModelVersion;
  currentValue: number;
  predictedValue: number;
  confidence: PredictionConfidence;
  forecastPeriod: string;
  historicalData: HistoricalDataPoint[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface HistoricalDataPoint {
  date: string;
  value: number;
}

export interface EconomicScenario {
  id: string;
  schoolId: string;
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
  parameter: string;
  baseValue: number;
  scenarioValue: number;
}

export interface ScenarioImpact {
  revenueChange: number;
  expenseChange: number;
  netImpact: number;
  riskLevel: string;
}

export interface AIModel {
  id: string;
  schoolId: string;
  name: string;
  modelType: ForecastModel;
  version: ModelVersion;
  accuracy: number;
  lastTrainedAt: Date;
  trainingDataPoints: number;
  features: string[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface AIPrediction {
  id: string;
  schoolId: string;
  modelId: string;
  targetMetric: string;
  predictedValue: number;
  confidence: PredictionConfidence;
  inputFactors: AIFactor[];
  explanation: AIExplanation;
  generatedAt: Date;
  validUntil: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface AIFactor {
  factor: string;
  importance: number;
  direction: string;
  value: number;
}

export interface AIExplanation {
  summary: string;
  keyDrivers: string[];
  confidence: PredictionConfidence;
  alternativeScenarios: string[];
}

export interface CostOptimization {
  id: string;
  schoolId: string;
  category: string;
  currentCost: number;
  optimizedCost: number;
  savingsPercent: number;
  optimizationActions: string[];
  implementationCost: number;
  paybackMonths: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface RevenueOptimization {
  id: string;
  schoolId: string;
  revenueStream: string;
  currentRevenue: number;
  potentialRevenue: number;
  gapAmount: number;
  optimizationStrategies: string[];
  estimatedImpact: number;
  confidence: PredictionConfidence;
  period: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
