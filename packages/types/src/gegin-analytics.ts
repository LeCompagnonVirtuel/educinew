export enum DashboardType {
  OVERVIEW = "OVERVIEW",
  COUNTRY = "COUNTRY",
  INSTITUTION = "INSTITUTION",
  REGIONAL = "REGIONAL",
  GLOBAL = "GLOBAL",
  REAL_TIME = "REAL_TIME",
  COMPARISON = "COMPARISON",
  CUSTOM = "CUSTOM",
}

export enum IndicatorCategory {
  ACCESS = "ACCESS",
  QUALITY = "QUALITY",
  EQUITY = "EQUITY",
  EFFICIENCY = "EFFICIENCY",
  RELEVANCE = "RELEVANCE",
  FINANCING = "FINANCING",
  GOVERNANCE = "GOVERNANCE",
  OUTCOMES = "OUTCOMES",
}

export enum RankingType {
  GLOBAL = "GLOBAL",
  REGIONAL = "REGIONAL",
  SUBJECT = "SUBJECT",
  IMPACT = "IMPACT",
  EMPLOYABILITY = "EMPLOYABILITY",
  RESEARCH = "RESEARCH",
  INNOVATION = "INNOVATION",
  SUSTAINABILITY = "SUSTAINABILITY",
}

export enum SDGGoal {
  SDG4_QUALITY_EDUCATION = "SDG4_QUALITY_EDUCATION",
  SDG4_1_FREE_PRIMARY = "SDG4_1_FREE_PRIMARY",
  SDG4_2_FREE_SECONDARY = "SDG4_2_FREE_SECONDARY",
  SDG4_3_EQUAL_ACCESS = "SDG4_3_EQUAL_ACCESS",
  SDG4_4_RELEVANT_SKILLS = "SDG4_4_RELEVANT_SKILLS",
  SDG4_5_GENDER_EQUALITY = "SDG4_5_GENDER_EQUALITY",
  SDG4_6_YOUTH_LITERACY = "SDG4_6_YOUTH_LITERACY",
  SDG4_7_EDUCATORS = "SDG4_7_EDUCATORS",
  SDG4_8_TEACHER_TRAINING = "SDG4_8_TEACHER_TRAINING",
  SDG4_9_STUDENT_ACHIEVEMENT = "SDG4_9_STUDENT_ACHIEVEMENT",
  SDG4_A_DEVELOPMENT_AID = "SDG4_A_DEVELOPMENT_AID",
  SDG4_B_TECHNOLOGY = "SDG4_B_TECHNOLOGY",
}

export enum UNESCOIndicator {
  GER_PRIMARY = "GER_PRIMARY",
  GER_SECONDARY = "GER_SECONDARY",
  GER_TERTIARY = "GER_TERTIARY",
  NER_PRIMARY = "NER_PRIMARY",
  NER_SECONDARY = "NER_SECONDARY",
  COMPLETION_PRIMARY = "COMPLETION_PRIMARY",
  COMPLETION_SECONDARY = "COMPLETION_SECONDARY",
  LITERACY_RATE = "LITERACY_RATE",
  YOUTH_LITERACY = "YOUTH_LITERACY",
  GENDER_PARITY_INDEX = "GENDER_PARITY_INDEX",
  PUPIL_TEACHER_RATIO = "PUPIL_TEACHER_RATIO",
  GOV_EXPENDITURE = "GOV_EXPENDITURE",
  TRAINED_TEACHERS = "TRAINED_TEACHERS",
  INTERNET_ACCESS = "INTERNET_ACCESS",
}

export enum DataGranularity {
  GLOBAL = "GLOBAL",
  REGIONAL = "REGIONAL",
  COUNTRY = "COUNTRY",
  SUBNATIONAL = "SUBNATIONAL",
  INSTITUTION = "INSTITUTION",
  INDIVIDUAL = "INDIVIDUAL",
}

export enum ForecastModelType {
  LINEAR_REGRESSION = "LINEAR_REGRESSION",
  TIME_SERIES = "TIME_SERIES",
  NEURAL_NETWORK = "NEURAL_NETWORK",
  DECISION_TREE = "DECISION_TREE",
  ENSEMBLE = "ENSEMBLE",
  ARIMA = "ARIMA",
  LSTM = "LSTM",
  PROPHET = "PROPHET",
}

export enum BenchmarkType {
  REGIONAL_AVERAGE = "REGIONAL_AVERAGE",
  INCOME_GROUP_AVERAGE = "INCOME_GROUP_AVERAGE",
  BEST_PRACTICE = "BEST_PRACTICE",
  PEER_GROUP = "PEER_GROUP",
  HISTORICAL = "HISTORICAL",
  TARGET = "TARGET",
}

export enum ReportFrequency {
  REAL_TIME = "REAL_TIME",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  SEMI_ANNUAL = "SEMI_ANNUAL",
  ANNUAL = "ANNUAL",
}

export enum DataVisualizationType {
  BAR_CHART = "BAR_CHART",
  LINE_CHART = "LINE_CHART",
  PIE_CHART = "PIE_CHART",
  SCATTER_PLOT = "SCATTER_PLOT",
  HEAT_MAP = "HEAT_MAP",
  GEO_MAP = "GEO_MAP",
  TABLE = "TABLE",
  KPI = "KPI",
  GAUGE = "GAUGE",
  FUNNEL = "FUNNEL",
}

export enum EducationIndexComponent {
  MEAN_YEARS_OF_SCHOOLING = "MEAN_YEARS_OF_SCHOOLING",
  EXPECTED_YEARS_OF_SCHOOLING = "EXPECTED_YEARS_OF_SCHOOLING",
  GNI_PER_CAPITA = "GNI_PER_CAPITA",
  HDI_EDUCATION = "HDI_EDUCATION",
}

export enum ComparisonScope {
  COUNTRY_VS_COUNTRY = "COUNTRY_VS_COUNTRY",
  COUNTRY_VS_REGION = "COUNTRY_VS_REGION",
  COUNTRY_VS_GLOBAL = "COUNTRY_VS_GLOBAL",
  INSTITUTION_VS_INSTITUTION = "INSTITUTION_VS_INSTITUTION",
  INSTITUTION_VS_BENCHMARK = "INSTITUTION_VS_BENCHMARK",
}

export enum AnalyticsTimeframe {
  CURRENT = "CURRENT",
  HISTORICAL_5Y = "HISTORICAL_5Y",
  HISTORICAL_10Y = "HISTORICAL_10Y",
  HISTORICAL_20Y = "HISTORICAL_20Y",
  CUSTOM_RANGE = "CUSTOM_RANGE",
  PROJECTION_5Y = "PROJECTION_5Y",
  PROJECTION_10Y = "PROJECTION_10Y",
}

export enum RegionalClassification {
  UN_REGION = "UN_REGION",
  WORLD_BANK = "WORLD_BANK",
  OECD = "OECD",
  AFRICAN_UNION = "AFRICAN_UNION",
  EU = "EU",
  ASEAN = "ASEAN",
  CUSTOM = "CUSTOM",
}

export enum IncomeClassification {
  LOW_INCOME = "LOW_INCOME",
  LOWER_MIDDLE = "LOWER_MIDDLE",
  UPPER_MIDDLE = "UPPER_MIDDLE",
  HIGH_INCOME = "HIGH_INCOME",
}

export enum DataSource {
  UNESCO = "UNESCO",
  WORLD_BANK = "WORLD_BANK",
  OECD = "OECD",
  UNICEF = "UNICEF",
  IMF = "IMF",
  NATIONAL = "NATIONAL",
  INSTITUTIONAL = "INSTITUTIONAL",
  SURVEY = "SURVEY",
}

export enum PredictionConfidence {
  VERY_LOW = "VERY_LOW",
  LOW = "LOW",
  MODERATE = "MODERATE",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
}

export enum ReportType {
  EXECUTIVE_SUMMARY = "EXECUTIVE_SUMMARY",
  DETAILED_ANALYSIS = "DETAILED_ANALYSIS",
  COMPARATIVE = "COMPARATIVE",
  TREND_ANALYSIS = "TREND_ANALYSIS",
  FORECAST = "FORECAST",
  BENCHMARK = "BENCHMARK",
  CUSTOM = "CUSTOM",
}

export enum AnalyticsAccessLevel {
  PUBLIC = "PUBLIC",
  RESTRICTED = "RESTRICTED",
  CONFIDENTIAL = "CONFIDENTIAL",
  CLASSIFIED = "CLASSIFIED",
}

export enum IndicatorStatus {
  ACTUAL = "ACTUAL",
  ESTIMATED = "ESTIMATED",
  PROJECTED = "PROJECTED",
  UNAVAILABLE = "UNAVAILABLE",
}

export enum ChartColorScheme {
  DEFAULT = "DEFAULT",
  BLUES = "BLUES",
  GREENS = "GREENS",
  REDS = "REDS",
  PURPLES = "PURPLES",
  WARM = "WARM",
  COOL = "COOL",
  MONOCHROME = "MONOCHROME",
}

export enum AnalyticsRefreshRate {
  REAL_TIME = "REAL_TIME",
  HOURLY = "HOURLY",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  ON_DEMAND = "ON_DEMAND",
}

export enum EducationLevel {
  PRE_PRIMARY = "PRE_PRIMARY",
  PRIMARY = "PRIMARY",
  LOWER_SECONDARY = "LOWER_SECONDARY",
  UPPER_SECONDARY = "UPPER_SECONDARY",
  POST_SECONDARY = "POST_SECONDARY",
  TERTIARY = "TERTIARY",
  VOCATIONAL = "VOCATIONAL",
}

export enum MetricDirection {
  UP_IS_POSITIVE = "UP_IS_POSITIVE",
  DOWN_IS_POSITIVE = "DOWN_IS_POSITIVE",
  NEUTRAL = "NEUTRAL",
}

export enum GlobalReportScope {
  THEMATIC = "THEMATIC",
  REGIONAL = "REGIONAL",
  COUNTRY = "COUNTRY",
  INSTITUTIONAL = "CROSS_CUTTING",
}

export enum AnalyticsExportFormat {
  PDF = "PDF",
  EXCEL = "EXCEL",
  CSV = "CSV",
  JSON = "JSON",
  IMAGE = "IMAGE",
  INTERACTIVE = "INTERACTIVE",
}

export enum ComparativeMetric {
  PER_CAPITA = "PER_CAPITA",
  PERCENTAGE = "PERCENTAGE",
  INDEX = "INDEX",
  RATIO = "RATIO",
  ABSOLUTE = "ABSOLUTE",
  GROWTH_RATE = "GROWTH_RATE",
}

export enum SDGProgressStatus {
  ON_TRACK = "ON_TRACK",
  PARTIALLY_ON_TRACK = "PARTIALLY_ON_TRACK",
  OFF_TRACK = "OFF_TRACK",
  INSUFFICIENT_DATA = "INSUFFICIENT_DATA",
}

export enum ForecastScenario {
  BASELINE = "BASELINE",
  OPTIMISTIC = "OPTIMISTIC",
  PESSIMISTIC = "PESSIMISTIC",
  STRESS_TEST = "STRESS_TEST",
  CUSTOM = "CUSTOM",
}

export enum AnalyticsVisualizationMode {
  STANDARD = "STANDARD",
  COMPARISON = "COMPARISON",
  TIME_SERIES = "TIME_SERIES",
  GEOGRAPHIC = "GEOGRAPHIC",
  DISTRIBUTION = "DISTRIBUTION",
  CORRELATION = "CORRELATION",
}

export enum EducationPerformance {
  EXCELLENT = "EXCELLENT",
  GOOD = "GOOD",
  AVERAGE = "AVERAGE",
  BELOW_AVERAGE = "BELOW_AVERAGE",
  POOR = "POOR",
}

export enum IndicatorDataQuality {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  ESTIMATED = "ESTIMATED",
}

export enum BenchmarkPerformance {
  ABOVE_BENCHMARK = "ABOVE_BENCHMARK",
  AT_BENCHMARK = "AT_BENCHMARK",
  BELOW_BENCHMARK = "BELOW_BENCHMARK",
  SIGNIFICANTLY_BELOW = "SIGNIFICANTLY_BELOW",
}

export enum RankingTrend {
  IMPROVING = "IMPROVING",
  STABLE = "STABLE",
  DECLINING = "DECLINING",
  NEW_ENTRY = "NEW_ENTRY",
}

export enum AnalyticsPermissionType {
  VIEW = "VIEW",
  EDIT = "EDIT",
  EXPORT = "EXPORT",
  ADMIN = "ADMIN",
}

export enum GlobalEducationMetric {
  ENROLLMENT = "ENROLLMENT",
  COMPLETION = "COMPLETION",
  LITERACY = "LITERACY",
  QUALITY = "QUALITY",
  EQUITY = "EQUITY",
  EFFICIENCY = "EFFICIENCY",
  SPENDING = "SPENDING",
  TEACHERS = "TEACHERS",
}

export enum PredictiveModelStatus {
  DRAFT = "DRAFT",
  TRAINING = "TRAINING",
  VALIDATED = "VALIDATED",
  DEPLOYED = "DEPLOYED",
  RETIRED = "RETIRED",
}

export enum AnalyticsFilterType {
  COUNTRY = "COUNTRY",
  REGION = "REGION",
  INDICATOR = "INDICATOR",
  YEAR = "YEAR",
  INCOME_GROUP = "INCOME_GROUP",
  EDUCATION_LEVEL = "EDUCATION_LEVEL",
  GENDER = "GENDER",
  AGE_GROUP = "AGE_GROUP",
}

export enum ReportDistributionType {
  EMAIL = "EMAIL",
  DASHBOARD = "DASHBOARD",
  API = "API",
  DOWNLOAD = "DOWNLOAD",
  PRINT = "PRINT",
}

export enum AnalyticsPlatform {
  WEB = "WEB",
  MOBILE = "MOBILE",
  DESKTOP = "DESKTOP",
  API = "API",
  INTEGRATION = "INTEGRATION",
}

export enum DataAggregationType {
  SUM = "SUM",
  AVERAGE = "AVERAGE",
  MEDIAN = "MEDIAN",
  MIN = "MIN",
  MAX = "MAX",
  COUNT = "COUNT",
  PERCENTAGE = "PERCENTAGE",
}

export enum GlobalReportCategory {
  ANNUAL = "ANNUAL",
  THESIS = "THESIS",
  POLICY_BRIEF = "POLICY_BRIEF",
  RESEARCH = "RESEARCH",
  MONITORING = "MONITORING",
  EVALUATION = "EVALUATION",
}

export enum AnalyticsAlertType {
  THRESHOLD = "THRESHOLD",
  TREND = "TREND",
  ANOMALY = "ANOMALY",
  MISSING_DATA = "MISSING_DATA",
  TARGET_MISS = "TARGET_MISS",
}

export enum EducationOutcomeType {
  EMPLOYABILITY = "EMPLOYABILITY",
  EARNING = "EARNING",
  MOBILITY = "MOBILITY",
  WELL_BEING = "WELL_BEING",
  CIVIC_ENGAGEMENT = "CIVIC_ENGAGEMENT",
  FURTHER_EDUCATION = "FURTHER_EDUCATION",
}

export enum ForecastUpdateFrequency {
  REAL_TIME = "REAL_TIME",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  ON_DEMAND = "ON_DEMAND",
}

export enum AnalyticsCollaborationType {
  SHARED_DASHBOARD = "SHARED_DASHBOARD",
  EMBEDDED_REPORT = "EMBEDDED_REPORT",
  API_ACCESS = "API_ACCESS",
  DATA_EXCHANGE = "DATA_EXCHANGE",
  CO_AUTHORING = "CO_AUTHORING",
}

export interface WorldwideDashboard {
  id: string;
  name: string;
  description: string;
  dashboardType: DashboardType;
  owner: string;
  institutionId: string;
  isPublic: boolean;
  accessLevel: AnalyticsAccessLevel;
  filters: DashboardFilter[];
  widgets: DashboardWidget[];
  layout: DashboardLayout;
  refreshRate: AnalyticsRefreshRate;
  lastRefreshed: string;
  sharingSettings: SharingSettings;
  permissions: AnalyticsPermission[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CountryComparison {
  id: string;
  name: string;
  description: string;
  scope: ComparisonScope;
  countries: CountryProfile[];
  indicators: ComparisonIndicator[];
  timeframe: AnalyticsTimeframe;
  period: string;
  regionalClassification: RegionalClassification;
  incomeClassification: IncomeClassification;
  benchmarks: BenchmarkDataset[];
  charts: ComparisonChart[];
  insights: ComparisonInsight[];
  methodology: string;
  dataSource: DataSource[];
  createdAt: string;
  updatedAt: string;
}

export interface SDG4Indicator {
  id: string;
  goal: SDGGoal;
  indicatorCode: string;
  indicatorName: string;
  description: string;
  target: string;
  category: IndicatorCategory;
  unit: string;
  dataPoints: IndicatorDataPoint[];
  latestValue: number;
  latestYear: string;
  trend: string;
  targetValue: number;
  targetYear: string;
  progressStatus: SDGProgressStatus;
  progressPercent: number;
  countryData: CountryIndicatorData[];
  regionalAverage: number;
  globalAverage: number;
  status: IndicatorStatus;
  dataQuality: IndicatorDataQuality;
  sources: DataSource[];
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
}

export interface UNESCOIndicatorSet {
  id: string;
  indicator: UNESCOIndicator;
  name: string;
  description: string;
  category: IndicatorCategory;
  unit: string;
  educationLevel: EducationLevel;
  genderDisaggregated: boolean;
  dataPoints: IndicatorDataPoint[];
  countryData: CountryIndicatorData[];
  regionalAverages: RegionalAverage[];
  timeSeries: TimeSeriesData[];
  status: IndicatorStatus;
  dataQuality: IndicatorDataQuality;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
}

export interface InternationalRanking {
  id: string;
  name: string;
  code: string;
  rankingType: RankingType;
  description: string;
  methodology: string;
  publisher: string;
  year: string;
  frequency: ReportFrequency;
  scope: string;
  entries: RankingEntry[];
  indicators: RankingIndicator[];
  weightings: IndicatorWeighting[];
  benchmarks: RankingBenchmark[];
  regionalBreakdown: RegionalRanking[];
  trends: RankingTrend[];
  highlights: RankingHighlight[];
  accessLevel: AnalyticsAccessLevel;
  createdAt: string;
  updatedAt: string;
}

export interface Benchmarking {
  id: string;
  name: string;
  description: string;
  benchmarkType: BenchmarkType;
  subject: string;
  benchmarkGroup: BenchmarkGroup;
  metrics: BenchmarkMetric[];
  targets: BenchmarkTarget[];
  performance: BenchmarkPerformanceResult[];
  gaps: BenchmarkGap[];
  recommendations: BenchmarkRecommendation[];
  comparisonData: BenchmarkComparisonData[];
  timeframe: AnalyticsTimeframe;
  period: string;
  createdAt: string;
  updatedAt: string;
}

export interface PredictiveAnalytics {
  id: string;
  name: string;
  description: string;
  modelType: ForecastModelType;
  modelVersion: string;
  status: PredictiveModelStatus;
  targetVariable: string;
  features: ModelFeature[];
  trainingData: TrainingDataset;
  validationData: ValidationDataset;
  performance: ModelPerformanceMetrics;
  predictions: Prediction[];
  forecasts: Forecast[];
  scenarios: ForecastScenario[];
  assumptions: ModelAssumption[];
  confidenceIntervals: ConfidenceInterval[];
  lastTrained: string;
  lastValidated: string;
  nextUpdate: string;
  createdAt: string;
  updatedAt: string;
}

export interface EducationIndex {
  id: string;
  name: string;
  description: string;
  components: EducationIndexComponent[];
  methodology: string;
  source: DataSource;
  year: string;
  globalScore: number;
  globalRank: number;
  regionalScore: number;
  regionalRank: number;
  countryScores: CountryEducationIndex[];
  componentScores: ComponentScoreDetail[];
  historicalData: IndexHistoricalData[];
  factors: IndexFactor[];
  correlations: IndexCorrelation[];
  methodologyNotes: string;
  limitations: string[];
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
}

export interface AIForecast {
  id: string;
  name: string;
  description: string;
  forecastType: string;
  model: ForecastModel;
  targetMetric: string;
  geography: string;
  timeframe: ForecastTimeframe;
  scenarios: ForecastScenario[];
  baselineForecast: ForecastResult;
  scenarioForecasts: ForecastResult[];
  accuracy: ForecastAccuracy;
  confidence: PredictionConfidence;
  assumptions: string[];
  methodologyNotes: string;
  visualization: ForecastVisualization;
  generatedAt: string;
  validUntil: string;
  createdAt: string;
  updatedAt: string;
}

export interface GlobalReport {
  id: string;
  title: string;
  description: string;
  reportType: GlobalReportType;
  category: GlobalReportCategory;
  scope: GlobalReportScope;
  publisher: string;
  authors: string[];
  publicationDate: string;
  period: string;
  language: string;
  summary: string;
  keyFindings: string[];
  methodology: string;
  dataSources: DataSource[];
  sections: ReportSection[];
  charts: ReportChart[];
  tables: ReportTable[];
  appendices: ReportAppendix[];
  references: ReportReference[];
  distributionTypes: ReportDistributionType[];
  downloadUrl: string;
  accessLevel: AnalyticsAccessLevel;
  citations: number;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardFilter {
  id: string;
  filterType: AnalyticsFilterType;
  name: string;
  label: string;
  values: FilterValue[];
  defaultValue: string;
  required: boolean;
  multiSelect: boolean;
  dependencies: string[];
}

export interface FilterValue {
  value: string;
  label: string;
  group: string;
}

export interface DashboardWidget {
  id: string;
  widgetType: DataVisualizationType;
  title: string;
  dataSource: string;
  query: string;
  position: WidgetPosition;
  size: WidgetSize;
  colorScheme: ChartColorScheme;
  refreshRate: AnalyticsRefreshRate;
  filters: string[];
  options: WidgetOptions;
}

export interface WidgetPosition {
  x: number;
  y: number;
  row: number;
  col: number;
}

export interface WidgetSize {
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
}

export interface WidgetOptions {
  showLegend: boolean;
  showAxis: boolean;
  showGrid: boolean;
  animate: boolean;
  interactive: boolean;
  tooltipEnabled: boolean;
  exportEnabled: boolean;
}

export interface DashboardLayout {
  columns: number;
  rows: number;
  gridGap: number;
  responsive: boolean;
  breakpoints: LayoutBreakpoint[];
}

export interface LayoutBreakpoint {
  name: string;
  minWidth: number;
  columns: number;
}

export interface SharingSettings {
  isPublic: boolean;
  shareUrl: string;
  embedCode: string;
  allowedUsers: string[];
  allowedGroups: string[];
  expiryDate: string;
  passwordProtected: boolean;
}

export interface AnalyticsPermission {
  userId: string;
  permissionType: AnalyticsPermissionType;
  grantedAt: string;
  grantedBy: string;
}

export interface CountryProfile {
  countryCode: string;
  countryName: string;
  region: string;
  subRegion: string;
  incomeGroup: IncomeClassification;
  population: number;
  gdpPerCapita: number;
  educationSpending: number;
  educationLevel: EducationLevel;
  keyIndicators: CountryKeyIndicator[];
  ranking: CountryRankingSummary;
  strengths: string[];
  weaknesses: string[];
}

export interface CountryKeyIndicator {
  indicator: string;
  value: number;
  unit: string;
  year: string;
  trend: string;
}

export interface CountryRankingSummary {
  globalRank: number;
  regionalRank: number;
  previousGlobalRank: number;
  previousRegionalRank: number;
  change: number;
  trend: RankingTrend;
}

export interface ComparisonIndicator {
  name: string;
  unit: string;
  category: IndicatorCategory;
  values: IndicatorValueByCountry[];
  average: number;
  median: number;
  standardDeviation: number;
  range: number;
}

export interface IndicatorValueByCountry {
  countryCode: string;
  countryName: string;
  value: number;
  year: string;
  rank: number;
  percentile: number;
}

export interface BenchmarkDataset {
  id: string;
  name: string;
  benchmarkType: BenchmarkType;
  year: string;
  dataPoints: BenchmarkDataPoint[];
}

export interface BenchmarkDataPoint {
  indicator: string;
  value: number;
  rank: number;
  percentile: number;
  bestPerforming: string;
  worstPerforming: string;
}

export interface ComparisonChart {
  id: string;
  chartType: DataVisualizationType;
  title: string;
  indicators: string[];
  countries: string[];
  timeframe: AnalyticsTimeframe;
  options: ChartOptions;
}

export interface ChartOptions {
  showDataLabels: boolean;
  showTrendLine: boolean;
  showBenchmark: boolean;
  logarithmicScale: boolean;
  stackedBars: boolean;
}

export interface ComparisonInsight {
  id: string;
  insightType: string;
  title: string;
  description: string;
  significance: string;
  evidence: string[];
  implications: string[];
  confidence: number;
}

export interface IndicatorDataPoint {
  year: string;
  value: number;
  status: IndicatorStatus;
  source: DataSource;
  notes: string;
}

export interface CountryIndicatorData {
  countryCode: string;
  countryName: string;
  dataPoints: IndicatorDataPoint[];
  latestValue: number;
  latestYear: string;
  trend: string;
  changeRate: number;
}

export interface RegionalAverage {
  region: string;
  average: number;
  median: number;
  range: number;
  sampleSize: number;
  year: string;
}

export interface TimeSeriesData {
  year: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface RankingEntry {
  rank: number;
  previousRank: number;
  institutionId: string;
  institutionName: string;
  country: string;
  region: string;
  overallScore: number;
  indicatorScores: IndicatorScore[];
  trend: RankingTrend;
  change: number;
}

export interface IndicatorScore {
  indicator: string;
  score: number;
  weight: number;
  normalizedScore: number;
  rank: number;
}

export interface RankingIndicator {
  name: string;
  description: string;
  weight: number;
  unit: string;
  source: DataSource;
  methodology: string;
}

export interface IndicatorWeighting {
  indicator: string;
  weight: number;
  rationale: string;
}

export interface RankingBenchmark {
  name: string;
  type: BenchmarkType;
  score: number;
  rank: number;
}

export interface RegionalRanking {
  region: string;
  entries: RankingEntry[];
  averageScore: number;
  topInstitution: string;
  bottomInstitution: string;
}

export interface RankingHighlight {
  category: string;
  institution: string;
  achievement: string;
  year: string;
}

export interface BenchmarkGroup {
  id: string;
  name: string;
  members: BenchmarkMember[];
  criteria: string[];
  averageSize: number;
}

export interface BenchmarkMember {
  institutionId: string;
  institutionName: string;
  country: string;
  region: string;
  metrics: MemberMetric[];
}

export interface MemberMetric {
  name: string;
  value: number;
  unit: string;
  year: string;
  rank: number;
}

export interface BenchmarkMetric {
  name: string;
  unit: string;
  category: string;
  values: MetricValueByMember[];
  benchmarkValue: number;
  bestPractice: number;
}

export interface MetricValueByMember {
  memberId: string;
  memberName: string;
  value: number;
  rank: number;
  performance: BenchmarkPerformance;
}

export interface BenchmarkTarget {
  metric: string;
  targetValue: number;
  targetYear: string;
  currentValue: number;
  gap: number;
  progressPercent: number;
}

export interface BenchmarkPerformanceResult {
  metric: string;
  value: number;
  benchmark: number;
  performance: BenchmarkPerformance;
  gap: number;
  improvementNeeded: number;
}

export interface BenchmarkGap {
  metric: string;
  current: number;
  target: number;
  gap: number;
  priority: string;
  recommendation: string;
}

export interface BenchmarkRecommendation {
  area: string;
  recommendation: string;
  impact: string;
  effort: string;
  timeframe: string;
}

export interface BenchmarkComparisonData {
  memberId: string;
  memberName: string;
  metrics: ComparisonMetricValue[];
  overallRank: number;
  overallScore: number;
}

export interface ComparisonMetricValue {
  metric: string;
  value: number;
  rank: number;
  percentDifference: number;
}

export interface ModelFeature {
  name: string;
  type: string;
  importance: number;
  correlation: number;
  description: string;
}

export interface TrainingDataset {
  size: number;
  features: number;
  timeRange: string;
  sources: DataSource[];
  quality: IndicatorDataQuality;
}

export interface ValidationDataset {
  size: number;
  method: string;
  metrics: ValidationMetric[];
}

export interface ValidationMetric {
  name: string;
  value: number;
  threshold: number;
}

export interface ModelPerformanceMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rmse: number;
  mae: number;
  rSquared: number;
  lastEvaluated: string;
}

export interface Prediction {
  id: string;
  targetVariable: string;
  timeframe: string;
  value: number;
  confidence: PredictionConfidence;
  confidenceInterval: ConfidenceInterval;
  factors: PredictionFactor[];
  createdAt: string;
}

export interface PredictionFactor {
  factor: string;
  weight: number;
  direction: string;
  impact: number;
}

export interface Forecast {
  id: string;
  name: string;
  targetVariable: string;
  scenario: ForecastScenario;
  dataPoints: ForecastDataPoint[];
  trend: string;
  cagr: number;
  visualization: ForecastVisualization;
}

export interface ForecastDataPoint {
  year: string;
  predicted: number;
  lowerBound: number;
  upperBound: number;
  confidence: PredictionConfidence;
}

export interface ForecastScenarioData {
  name: string;
  description: string;
  assumptions: string[];
  probability: number;
  impact: string;
}

export interface ForecastAccuracy {
  historicalAccuracy: number;
  backtestingScore: number;
  confidenceLevel: PredictionConfidence;
  limitations: string[];
}

export interface ModelAssumption {
  assumption: string;
  rationale: string;
  sensitivity: string;
}

export interface ConfidenceInterval {
  lower: number;
  upper: number;
  confidenceLevel: number;
  unit: string;
}

export interface ForecastVisualization {
  chartType: DataVisualizationType;
  colorScheme: ChartColorScheme;
  showConfidenceInterval: boolean;
  showScenarios: boolean;
  annotations: string[];
}

export interface CountryEducationIndex {
  countryCode: string;
  countryName: string;
  overallScore: number;
  overallRank: number;
  componentScores: ComponentScoreDetail[];
  trend: string;
  change: number;
  year: string;
}

export interface ComponentScoreDetail {
  component: EducationIndexComponent;
  score: number;
  normalizedScore: number;
  rank: number;
  weight: number;
}

export interface IndexHistoricalData {
  year: string;
  score: number;
  rank: number;
  change: number;
}

export interface IndexFactor {
  factor: string;
  weight: number;
  correlation: number;
  description: string;
}

export interface IndexCorrelation {
  factor1: string;
  factor2: string;
  correlationCoefficient: number;
  significance: number;
}

export interface ForecastModel {
  type: ForecastModelType;
  version: string;
  parameters: ModelParameter[];
  trainingHistory: TrainingHistory[];
}

export interface ModelParameter {
  name: string;
  value: number;
  description: string;
}

export interface TrainingHistory {
  date: string;
  accuracy: number;
  loss: number;
}

export interface ForecastTimeframe {
  startDate: string;
  endDate: string;
  granularity: string;
}

export interface ReportSection {
  id: string;
  title: string;
  content: string;
  order: number;
  charts: ReportChart[];
  tables: ReportTable[];
}

export interface ReportChart {
  id: string;
  chartType: DataVisualizationType;
  title: string;
  description: string;
  dataSource: string;
  options: ChartOptions;
}

export interface ReportTable {
  id: string;
  title: string;
  description: string;
  columns: TableColumn[];
  rows: TableRow[];
  footnotes: string[];
}

export interface TableColumn {
  name: string;
  header: string;
  type: string;
  unit: string;
  alignment: string;
}

export interface TableRow {
  cells: TableCell[];
  isHighlighted: boolean;
}

export interface TableCell {
  value: string;
  format: string;
  color: string;
  footnote: string;
}

export interface ReportAppendix {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface ReportReference {
  id: string;
  authors: string;
  title: string;
  publication: string;
  year: string;
  doi: string;
  url: string;
}

export enum AnalyticsDataPipelineStatus {
  INGESTING = "INGESTING",
  PROCESSING = "PROCESSING",
  VALIDATING = "VALIDATING",
  READY = "READY",
  FAILED = "FAILED",
  STALE = "STALE",
}

export enum IndicatorTrendDirection {
  POSITIVE = "POSITIVE",
  NEGATIVE = "NEGATIVE",
  STABLE = "STABLE",
  VOLATILE = "VOLATILE",
  INSUFFICIENT = "INSUFFICIENT",
}

export enum EducationEfficiencyMetric {
  COST_PER_GRADUATE = "COST_PER_GRADUATE",
  GRADUATION_RATE = "GRADUATION_RATE",
  DROPOUT_RATE = "DROPOUT_RATE",
  TIME_TO_COMPLETION = "TIME_TO_COMPLETION",
  EMPLOYMENT_RATE_GRADUATES = "EMPLOYMENT_RATE_GRADUATES",
  RESOURCE_UTILIZATION = "RESOURCE_UTILIZATION",
}

export enum GlobalReportStatus {
  DRAFT = "DRAFT",
  UNDER_REVIEW = "UNDER_REVIEW",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
  SUPERSEDED = "SUPERSEDED",
}

export enum AnalyticsCollaborationRole {
  VIEWER = "VIEWER",
  ANALYST = "ANALYST",
  EDITOR = "EDITOR",
  ADMIN = "ADMIN",
  OWNER = "OWNER",
}

export enum SDG4ProgressDimension {
  ACCESS = "ACCESS",
  QUALITY = "QUALITY",
  EQUITY = "EQUITY",
  OUTCOMES = "OUTCOMES",
}

export enum EducationIndexSubIndex {
  KNOWLEDGE = "KNOWLEDGE",
  SKILLS = "SKILLS",
  VALUES = "VALUES",
  LIFELONG_LEARNING = "LIFELONG_LEARNING",
}

export enum ForecastConfidenceBand {
  NINETY = "NINETY",
  NINETY_FIVE = "NINETY_FIVE",
  NINETY_NINE = "NINETY_NINE",
  CUSTOM = "CUSTOM",
}

export enum AnalyticsNotificationType {
  DATA_READY = "DATA_READY",
  THRESHOLD_BREACH = "THRESHOLD_BREACH",
  REPORT_GENERATED = "REPORT_GENERATED",
  MODEL_UPDATED = "MODEL_UPDATED",
  ANOMALY_DETECTED = "ANOMALY_DETECTED",
  SCHEDULE_REMINDER = "SCHEDULE_REMINDER",
}

export enum EducationSpendingCategory {
  CURRENT_EXPENDITURE = "CURRENT_EXPENDITURE",
  CAPITAL_EXPENDITURE = "CAPITAL_EXPENDITURE",
  TEACHER_SALARIES = "TEACHER_SALARIES",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  MATERIALS = "MATERIALS",
  TECHNOLOGY = "TECHNOLOGY",
}

export enum BenchmarkDatasetStatus {
  CURRENT = "CURRENT",
  HISTORICAL = "HISTORICAL",
  PROJECTED = "PROJECTED",
  OUTDATED = "OUTDATED",
}

export enum AnalyticsDataFreshness {
  REAL_TIME = "REAL_TIME",
  CURRENT = "CURRENT",
  RECENT = "RECENT",
  STALE = "STALE",
  HISTORICAL = "HISTORICAL",
}

export enum GlobalReportPriority {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export enum EducationOutcomeMetric {
  LEARNING_OUTCOMES = "LEARNING_OUTCOMES",
  SKILL_ACQUISITION = "SKILL_ACQUISITION",
  GRADUATION_COMPLETION = "GRADUATION_COMPLETION",
  EMPLOYABILITY = "EMPLOYABILITY",
  LIFELONG_LEARNING = "LIFELONG_LEARNING",
}

export interface AnalyticsDataPipeline {
  id: string;
  name: string;
  description: string;
  status: AnalyticsDataPipelineStatus;
  source: DataSource;
  destination: string;
  schedule: string;
  lastRun: string;
  nextRun: string;
  recordsProcessed: number;
  errorCount: number;
  averageProcessingTime: number;
  healthScore: number;
  dependencies: string[];
  alerts: AnalyticsAlert[];
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsAlert {
  id: string;
  alertType: AnalyticsAlertType;
  severity: string;
  title: string;
  description: string;
  indicator: string;
  currentValue: number;
  thresholdValue: number;
  triggeredAt: string;
  acknowledgedAt: string;
  acknowledgedBy: string;
  resolvedAt: string;
  resolvedBy: string;
  actions: AlertAction[];
}

export interface AlertAction {
  actionType: string;
  description: string;
  executedAt: string;
  result: string;
}

export interface SDG4ProgressTracker {
  id: string;
  goal: SDGGoal;
  dimension: SDG4ProgressDimension;
  indicators: SDG4Indicator[];
  overallProgress: number;
  progressStatus: SDGProgressStatus;
  countriesOnTrack: number;
  countriesOffTrack: number;
  countriesInsufficientData: number;
  year: string;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
}

export interface GlobalEducationDashboard {
  id: string;
  name: string;
  description: string;
  dashboardType: DashboardType;
  globalOverview: GlobalOverviewStats;
  sdg4Progress: SDG4ProgressTracker[];
  regionalSummaries: RegionalSummary[];
  topPerformers: TopPerformerEntry[];
  emergingTrends: EmergingTrend[];
  alerts: AnalyticsAlert[];
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
}

export interface GlobalOverviewStats {
  totalCountries: number;
  totalStudents: number;
  globalLiteracyRate: number;
  globalEnrollmentRate: number;
  averageEducationIndex: number;
  sdg4ProgressPercent: number;
  dataCoverage: number;
  year: string;
}

export interface RegionalSummary {
  region: string;
  countries: number;
  averageEnrollment: number;
  averageLiteracy: number;
  averageEducationIndex: number;
  sdg4Progress: number;
  trend: IndicatorTrendDirection;
  topIndicator: string;
  bottomIndicator: string;
}

export interface TopPerformerEntry {
  rank: number;
  countryCode: string;
  countryName: string;
  region: string;
  score: number;
  change: number;
  trend: RankingTrend;
}

export interface EmergingTrend {
  id: string;
  title: string;
  description: string;
  affectedRegions: string[];
  affectedIndicators: string[];
  significance: string;
  timeframe: string;
  evidence: string[];
  implications: string[];
}

export interface EducationSpendingAnalytics {
  id: string;
  countryCode: string;
  countryName: string;
  year: string;
  totalSpending: number;
  spendingAsGDPPercent: number;
  spendingPerStudent: number;
  breakdown: EducationSpendingBreakdown[];
  trend: SpendingTrend[];
  comparisons: SpendingComparison[];
  efficiency: EfficiencyMetric[];
  createdAt: string;
  updatedAt: string;
}

export interface EducationSpendingBreakdown {
  category: EducationSpendingCategory;
  amount: number;
  percentage: number;
  perStudent: number;
}

export interface SpendingTrend {
  year: string;
  totalSpending: number;
  asGDPPercent: number;
  perStudent: number;
  growth: number;
}

export interface SpendingComparison {
  comparator: string;
  value: number;
  difference: number;
  better: boolean;
}

export interface EfficiencyMetric {
  metric: EducationEfficiencyMetric;
  value: number;
  rank: number;
  benchmark: number;
  performance: BenchmarkPerformance;
}

export interface ForecastValidationResult {
  id: string;
  forecastId: string;
  validationMethod: string;
  metrics: ValidationMetric[];
  confidence: PredictionConfidence;
  limitations: string[];
  recommendations: string[];
  validatedAt: string;
  validatedBy: string;
  createdAt: string;
}

export interface AnalyticsCollaborationWorkspace {
  id: string;
  name: string;
  description: string;
  collaborationType: AnalyticsCollaborationType;
  owner: string;
  members: WorkspaceMember[];
  sharedDashboards: WorldwideDashboard[];
  sharedReports: GlobalReport[];
  comments: WorkspaceComment[];
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceMember {
  userId: string;
  role: AnalyticsCollaborationRole;
  joinedAt: string;
  lastActive: string;
}

export interface WorkspaceComment {
  id: string;
  userId: string;
  content: string;
  entityType: string;
  entityId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GlobalEducationRankingsSummary {
  id: string;
  year: string;
  totalRankings: number;
  rankings: InternationalRanking[];
  topCountries: TopPerformerEntry[];
  topInstitutions: TopInstitutionEntry[];
  regionPerformance: RegionPerformanceStat[];
  methodologyNotes: string;
  lastUpdated: string;
  createdAt: string;
}

export interface TopInstitutionEntry {
  rank: number;
  institutionId: string;
  institutionName: string;
  country: string;
  region: string;
  score: number;
  change: number;
}

export interface RegionPerformanceStat {
  region: string;
  averageScore: number;
  rank: number;
  change: number;
  topCountry: string;
  topInstitution: string;
}

export interface AnalyticsScheduledReport {
  id: string;
  name: string;
  reportType: ReportType;
  frequency: ReportFrequency;
  recipients: string[];
  distributionTypes: ReportDistributionType[];
  nextExecution: string;
  lastExecution: string;
  status: string;
  parameters: ReportParameter[];
  createdAt: string;
  updatedAt: string;
}

export interface ReportParameter {
  name: string;
  value: string;
  type: string;
}

export interface AnalyticsModelRegistry {
  id: string;
  name: string;
  modelType: ForecastModelType;
  version: string;
  status: PredictiveModelStatus;
  description: string;
  trainingDate: string;
  performanceMetrics: ModelPerformanceMetrics;
  features: ModelFeature[];
  hyperparameters: ModelHyperparameter[];
  trainingDataSize: number;
  validationScore: number;
  deployedDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ModelHyperparameter {
  name: string;
  value: string;
  type: string;
}

export interface GlobalEducationDataCatalog {
  id: string;
  name: string;
  description: string;
  datasets: DataCatalogEntry[];
  totalDatasets: number;
  totalRecords: number;
  lastUpdated: string;
  coveragePercent: number;
  qualityScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface DataCatalogEntry {
  id: string;
  name: string;
  source: DataSource;
  description: string;
  category: IndicatorCategory;
  countryCoverage: number;
  recordCount: number;
  timeRange: string;
  lastUpdated: string;
  quality: IndicatorDataQuality;
  accessLevel: AnalyticsAccessLevel;
  downloadUrl: string;
  apiEndpoint: string;
  documentationUrl: string;
  contactEmail: string;
}

export interface EducationIndexBenchmarking {
  id: string;
  subjectIndex: string;
  comparisonGroup: string;
  benchmarkType: BenchmarkType;
  subjectScore: number;
  subjectRank: number;
  groupAverage: number;
  groupMedian: number;
  groupTopPerformer: string;
  groupTopScore: number;
  percentile: number;
  gapAnalysis: IndexGapAnalysis[];
  improvementRecommendations: string[];
  lastUpdated: string;
  createdAt: string;
}

export interface IndexGapAnalysis {
  component: EducationIndexComponent;
  subjectScore: number;
  benchmarkScore: number;
  gap: number;
  priority: string;
}

export interface AnalyticsAccessLog {
  id: string;
  userId: string;
  dashboardId: string;
  action: string;
  entityType: string;
  entityId: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
}

export interface AnalyticsDataQualityReport {
  id: string;
  datasetId: string;
  datasetName: string;
  assessmentDate: string;
  completenessScore: number;
  accuracyScore: number;
  consistencyScore: number;
  timelinessScore: number;
  overallQualityScore: number;
  issues: DataQualityIssue[];
  recommendations: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DataQualityIssue {
  issueType: string;
  description: string;
  severity: string;
  affectedRecords: number;
  recommendation: string;
}

export interface GlobalEducationInsight {
  id: string;
  title: string;
  description: string;
  insightType: string;
  indicators: string[];
  regions: string[];
  confidence: number;
  evidence: string[];
  actionable: boolean;
  recommendations: string[];
  generatedAt: string;
  source: string;
  createdAt: string;
}

export interface AnalyticsPerformanceMetric {
  id: string;
  metricName: string;
  metricType: string;
  value: number;
  unit: string;
  threshold: number;
  status: string;
  trend: IndicatorTrendDirection;
  measuredAt: string;
  period: string;
}

export interface EducationIndicatorDefinition {
  id: string;
  code: string;
  name: string;
  description: string;
  category: IndicatorCategory;
  unit: string;
  dataSource: DataSource;
  methodology: string;
  disaggregation: string[];
  coverage: string;
  frequency: string;
  referencePeriod: string;
  relatedIndicators: string[];
  sdgAlignment: SDGGoal[];
  lastUpdated: string;
}

export interface CountryEducationProfile {
  countryCode: string;
  countryName: string;
  region: string;
  incomeGroup: IncomeClassification;
  population: number;
  gdpPerCapita: number;
  educationSpendingPercent: number;
  literacyRate: number;
  enrollmentRates: EnrollmentRateByLevel[];
  completionRates: CompletionRateByLevel[];
  pupilTeacherRatio: number;
  educationIndex: number;
  educationIndexRank: number;
  sdg4Progress: SDGProgressStatus;
  keyStrengths: string[];
  keyChallenges: string[];
  dataAvailability: IndicatorDataQuality;
  lastUpdated: string;
}

export interface EnrollmentRateByLevel {
  level: EducationLevel;
  gross: number;
  net: number;
  genderParity: number;
  trend: IndicatorTrendDirection;
}

export interface CompletionRateByLevel {
  level: EducationLevel;
  rate: number;
  genderParity: number;
  trend: IndicatorTrendDirection;
}

export interface AnalyticsDashboardWidgetConfig {
  widgetId: string;
  widgetType: DataVisualizationType;
  title: string;
  dataSource: string;
  query: string;
  refreshInterval: number;
  colorScheme: ChartColorScheme;
  position: WidgetPosition;
  size: WidgetSize;
  filters: DashboardFilter[];
  drillDownEnabled: boolean;
  exportEnabled: boolean;
  tooltipEnabled: boolean;
}

export interface GlobalEducationTrendAnalysis {
  id: string;
  indicator: string;
  regions: RegionTrendData[];
  globalTrend: TrendLine;
  turningPoints: TrendTurningPoint[];
  projections: TrendProjection[];
  analysisPeriod: string;
  methodology: string;
  confidence: PredictionConfidence;
  lastUpdated: string;
  createdAt: string;
}

export interface RegionTrendData {
  region: string;
  dataPoints: TrendDataPoint[];
  trend: TrendLine;
  volatility: number;
  cagr: number;
}

export interface TrendDataPoint {
  year: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface TrendLine {
  slope: number;
  intercept: number;
  rSquared: number;
  direction: IndicatorTrendDirection;
  significance: number;
}

export interface TrendTurningPoint {
  year: string;
  description: string;
  valueBefore: number;
  valueAfter: number;
  magnitude: number;
  possibleCauses: string[];
}

export interface TrendProjection {
  year: string;
  projectedValue: number;
  lowerBound: number;
  upperBound: number;
  scenario: ForecastScenario;
  confidence: PredictionConfidence;
}

export interface AnalyticsDataConnector {
  id: string;
  name: string;
  connectorType: string;
  source: DataSource;
  endpoint: string;
  authenticationType: string;
  status: string;
  lastSync: string;
  nextSync: string;
  syncFrequency: string;
  recordsSynced: number;
  errorCount: number;
  healthScore: number;
  configuration: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface EducationQualityAssessment {
  id: string;
  countryCode: string;
  countryName: string;
  assessmentDate: string;
  assessmentType: string;
  overallQualityScore: number;
  dimensions: QualityDimension[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  comparisonGroup: string;
  rank: number;
  trend: IndicatorTrendDirection;
  dataPoints: number;
  confidence: number;
  assessedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface QualityDimension {
  dimension: string;
  score: number;
  weight: number;
  indicators: QualityIndicator[];
  trend: IndicatorTrendDirection;
  benchmark: number;
  gap: number;
}

export interface QualityIndicator {
  name: string;
  value: number;
  unit: string;
  year: string;
  source: DataSource;
  rank: number;
}

export interface AnalyticsVisualization {
  id: string;
  visualizationType: DataVisualizationType;
  title: string;
  description: string;
  dataSource: string;
  query: string;
  colorScheme: ChartColorScheme;
  interactive: boolean;
  responsive: boolean;
  annotations: ChartAnnotation[];
  dataLabels: boolean;
  legend: boolean;
  gridLines: boolean;
  exportFormats: AnalyticsExportFormat[];
  shareUrl: string;
  embedCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChartAnnotation {
  id: string;
  type: string;
  content: string;
  position: string;
  color: string;
}

export interface AnalyticsUserPreference {
  id: string;
  userId: string;
  defaultDashboard: string;
  defaultTimeframe: AnalyticsTimeframe;
  defaultRegion: string;
  theme: string;
  language: string;
  notifications: AnalyticsNotificationPreference;
  favoriteIndicators: string[];
  favoriteCountries: string[];
  customViews: CustomView[];
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsNotificationPreference {
  email: boolean;
  dashboard: boolean;
  thresholdAlerts: boolean;
  trendAlerts: boolean;
  reportGeneration: boolean;
  modelUpdates: boolean;
}

export interface CustomView {
  viewId: string;
  name: string;
  description: string;
  filters: AnalyticsFilter[];
  layout: string;
  createdAt: string;
}

export interface AnalyticsFilter {
  filterType: AnalyticsFilterType;
  operator: string;
  values: string[];
}

export interface EducationComparativeReport {
  id: string;
  title: string;
  description: string;
  subjects: CountryProfile[];
  indicators: ComparisonIndicator[];
  benchmarks: BenchmarkDataset[];
  timeframe: AnalyticsTimeframe;
  period: string;
  scope: ComparisonScope;
  charts: ComparisonChart[];
  insights: ComparisonInsight[];
  executiveSummary: string;
  methodology: string;
  limitations: string[];
  generatedAt: string;
  generatedBy: string;
  accessLevel: AnalyticsAccessLevel;
  createdAt: string;
}

export interface AnalyticsAPIEndpoint {
  id: string;
  endpoint: string;
  method: string;
  description: string;
  parameters: APIParameter[];
  rateLimit: number;
  authentication: string;
  responseFormat: string;
  version: string;
  status: string;
  documentationUrl: string;
  lastUpdated: string;
}

export interface APIParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  defaultValue: string;
  example: string;
}

export interface EducationIndexHistory {
  id: string;
  countryCode: string;
  countryName: string;
  indexName: string;
  yearlyData: EducationIndexYearlyData[];
  overallTrend: TrendLine;
  rankingHistory: RankingHistoryEntry[];
  bestYear: string;
  worstYear: string;
  averageScore: number;
  volatility: number;
}

export interface EducationIndexYearlyData {
  year: string;
  score: number;
  rank: number;
  change: number;
  componentScores: Record<string, number>;
}

export interface RankingHistoryEntry {
  year: string;
  rank: number;
  score: number;
  change: number;
}

export interface AnalyticsDataPipelineStep {
  id: string;
  pipelineId: string;
  stepName: string;
  stepType: string;
  order: number;
  configuration: Record<string, string>;
  status: string;
  lastExecuted: string;
  duration: number;
  recordsProcessed: number;
  errorCount: number;
  dependencies: string[];
}

export interface EducationGlobalSnapshot {
  snapshotDate: string;
  totalCountries: number;
  countriesWithData: number;
  totalStudents: number;
  totalTeachers: number;
  totalInstitutions: number;
  globalEnrollmentRate: number;
  globalLiteracyRate: number;
  globalPupilTeacherRatio: number;
  globalEducationSpending: number;
  sdg4OverallProgress: number;
  topPerformingRegion: string;
  bottomPerformingRegion: string;
  dataQualityScore: number;
  keyHighlights: string[];
  keyConcerns: string[];
}

export interface AnalyticsReportTemplate {
  id: string;
  name: string;
  description: string;
  reportType: ReportType;
  sections: ReportTemplateSection[];
  defaultParameters: ReportParameter[];
  distributionTypes: ReportDistributionType[];
  frequency: ReportFrequency;
  accessLevel: AnalyticsAccessLevel;
  createdAt: string;
  updatedAt: string;
}

export interface ReportTemplateSection {
  sectionId: string;
  title: string;
  sectionType: string;
  dataSource: string;
  query: string;
  visualization: DataVisualizationType;
  order: number;
  required: boolean;
}

export interface EducationCountryTimeSeries {
  countryCode: string;
  countryName: string;
  indicator: string;
  unit: string;
  dataPoints: TimeSeriesDataPoint[];
  interpolated: boolean;
  source: DataSource;
  lastUpdated: string;
}

export interface TimeSeriesDataPoint {
  year: string;
  value: number;
  status: IndicatorStatus;
  source: DataSource;
  footnote: string;
}
