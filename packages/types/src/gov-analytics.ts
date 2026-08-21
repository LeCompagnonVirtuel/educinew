export enum KPIType {
  NATIONAL_ENROLLMENT = 'national_enrollment',
  NATIONAL_RETENTION = 'national_retention',
  NATIONAL_LITERACY = 'national_literacy',
  NATIONAL_NUMERACY = 'national_numeracy',
  NATIONAL_GRADUATION = 'national_graduation',
  NATIONAL_DROP_OUT = 'national_drop_out',
  NATIONAL_TEACHER_RATIO = 'national_teacher_ratio',
  NATIONAL_INFRASTRUCTURE = 'national_infrastructure',
  NATIONAL_BUDGET = 'national_budget',
  NATIONAL_GENDER_PARITY = 'national_gender_parity',
  REGIONAL_ENROLLMENT = 'regional_enrollment',
  REGIONAL_PERFORMANCE = 'regional_performance',
  REGIONAL_ATTENDANCE = 'regional_attendance',
  REGIONAL_INFRASTRUCTURE = 'regional_infrastructure',
  REGIONAL_BUDGET = 'regional_budget',
  DEPARTMENT_ENROLLMENT = 'department_enrollment',
  DEPARTMENT_PERFORMANCE = 'department_performance',
  DEPARTMENT_ATTENDANCE = 'department_attendance',
  DEPARTMENT_INFRASTRUCTURE = 'department_infrastructure',
  DEPARTMENT_BUDGET = 'department_budget',
  INSPECTION_COMPLIANCE = 'inspection_compliance',
  INSPECTION_QUALITY = 'inspection_quality',
  INSPECTION_SAFETY = 'inspection_safety',
  INSPECTION_ACCREDITATION = 'inspection_accreditation',
  SCHOOL_ENROLLMENT = 'school_enrollment',
  SCHOOL_PERFORMANCE = 'school_performance',
  SCHOOL_ATTENDANCE = 'school_attendance',
  SCHOOL_DISCIPLINE = 'school_discipline',
  SCHOOL_FINANCE = 'school_finance',
  STUDENT_ACADEMIC = 'student_academic',
  STUDENT_ATTENDANCE = 'student_attendance',
  STUDENT_BEHAVIOUR = 'student_behaviour',
  STUDENT_WELLBEING = 'student_wellbeing',
  STUDENT_CAREER = 'student_career',
  TEACHER_QUALIFICATION = 'teacher_qualification',
  TEACHER_PERFORMANCE = 'teacher_performance',
  TEACHER_ATTENDANCE = 'teacher_attendance',
  TEACHER_TRAINING = 'teacher_training',
  TEACHER_SATISFACTION = 'teacher_satisfaction',
  INFRASTRUCTURE_UTILISATION = 'infrastructure_utilisation',
  INFRASTRUCTURE_CONDITION = 'infrastructure_condition',
  INFRASTRUCTURE_SAFETY = 'infrastructure_safety',
  INFRASTRUCTURE_MAINTENANCE = 'infrastructure_maintenance',
  FINANCE_REVENUE = 'finance_revenue',
  FINANCE_EXPENDITURE = 'finance_expenditure',
  FINANCE_EFFICIENCY = 'finance_efficiency',
  FINANCE_EQUITY = 'finance_equity',
  FINANCE_SUSTAINABILITY = 'finance_sustainability',
  PREDICTION_ENROLLMENT = 'prediction_enrollment',
  PREDICTION_DROP_OUT = 'prediction_drop_out',
  PREDICTION_PERFORMANCE = 'prediction_performance',
  PREDICTION_RESOURCE = 'prediction_resource',
  PREDICTION_DEMAND = 'prediction_demand',
  OVERALL_NATIONAL = 'overall_national',
  OVERALL_REGIONAL = 'overall_regional',
  OVERALL_DEPARTMENT = 'overall_department',
  OVERALL_INSPECTION = 'overall_inspection',
  OVERALL_SCHOOL = 'overall_school',
  CUSTOM = 'custom'
}

export enum KPIStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  DEPRECATED = 'deprecated',
  UNDER_REVIEW = 'under_review',
  ARCHIVED = 'archived',
  DRAFT = 'draft',
  PUBLISHED = 'published'
}

export enum KPIPeriod {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  BIWEEKLY = 'biweekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  SEMESTER = 'semester',
  ANNUAL = 'annual',
  MULTI_YEAR = 'multi_year',
  CUSTOM = 'custom'
}

export enum DashboardType {
  NATIONAL_OVERVIEW = 'national_overview',
  NATIONAL_ENROLLMENT = 'national_enrollment',
  NATIONAL_PERFORMANCE = 'national_performance',
  NATIONAL_FINANCE = 'national_finance',
  NATIONAL_INFRASTRUCTURE = 'national_infrastructure',
  REGIONAL_OVERVIEW = 'regional_overview',
  REGIONAL_COMPARISON = 'regional_comparison',
  DEPARTMENT_OVERVIEW = 'department_overview',
  DEPARTMENT_COMPARISON = 'department_comparison',
  INSPECTION_OVERVIEW = 'inspection_overview',
  INSPECTION_COMPLIANCE = 'inspection_compliance',
  SCHOOL_OVERVIEW = 'school_overview',
  SCHOOL_COMPARISON = 'school_comparison',
  STUDENT_OVERVIEW = 'student_overview',
  TEACHER_OVERVIEW = 'teacher_overview',
  FINANCE_OVERVIEW = 'finance_overview',
  REAL_TIME = 'real_time',
  PREDICTIVE = 'predictive',
  EXECUTIVE = 'executive',
  OPERATIONAL = 'operational',
  CUSTOM = 'custom'
}

export enum PredictionModel {
  LINEAR_REGRESSION = 'linear_regression',
  POLYNOMIAL_REGRESSION = 'polynomial_regression',
  DECISION_TREE = 'decision_tree',
  RANDOM_FOREST = 'random_forest',
  GRADIENT_BOOSTING = 'gradient_boosting',
  NEURAL_NETWORK = 'neural_network',
  LSTM = 'lstm',
  ARIMA = 'arima',
  PROPHET = 'prophet',
  ENSEMBLE = 'ensemble',
  TRANSFORMER = 'transformer',
  XGBOOST = 'xgboost',
  CUSTOM = 'custom'
}

export enum PredictionStatus {
  TRAINING = 'training',
  TRAINED = 'trained',
  VALIDATING = 'validating',
  VALIDATED = 'validated',
  DEPLOYED = 'deployed',
  RETIRED = 'retired',
  FAILED = 'failed',
  PENDING = 'pending'
}

export enum AnalyticsLevel {
  NATIONAL = 'national',
  REGIONAL = 'regional',
  DEPARTMENTAL = 'departmental',
  INSPECTION = 'inspection',
  DISTRICT = 'district',
  SCHOOL = 'school',
  CLASS = 'class',
  STUDENT = 'student',
  TEACHER = 'teacher',
  SUBJECT = 'subject'
}

export enum DataGranularity {
  RAW = 'raw',
  AGGREGATED = 'aggregated',
  SUMMARISED = 'summarised',
  RANKED = 'ranked',
  INDEXED = 'indexed',
  NORMALISED = 'normalised',
  WEIGHTED = 'weighted',
  COMPOSITE = 'composite'
}

export enum VisualizationType {
  BAR_CHART = 'bar_chart',
  LINE_CHART = 'line_chart',
  PIE_CHART = 'pie_chart',
  DOUGHNUT_CHART = 'doughnut_chart',
  AREA_CHART = 'area_chart',
  SCATTER_PLOT = 'scatter_plot',
  HEATMAP = 'heatmap',
  MAP = 'map',
  GAUGE = 'gauge',
  TABLE = 'table',
  KPI_CARD = 'kpi_card',
  TREND_LINE = 'trend_line',
  WATERFALL = 'waterfall',
  FUNNEL = 'funnel',
  SANKEY = 'sankey',
  BOX_PLOT = 'box_plot',
  HISTOGRAM = 'histogram',
  TREE_MAP = 'tree_map',
  GEO_SPATIAL = 'geo_spatial',
  DASHBOARD = 'dashboard',
  INFOGRAPHIC = 'infographic',
  SCORECARD = 'scorecard',
  PROGRESS_BAR = 'progress_bar',
  SPARKLINE = 'sparkline'
}

export enum AlertSeverity {
  INFO = 'info',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
  EMERGENCY = 'emergency'
}

export enum AnalyticsReportType {
  ENROLLMENT = 'enrollment',
  ATTENDANCE = 'attendance',
  PERFORMANCE = 'performance',
  GRADUATION = 'graduation',
  DROP_OUT = 'drop_out',
  FINANCE = 'finance',
  INFRASTRUCTURE = 'infrastructure',
  TEACHER = 'teacher',
  DISCIPLINE = 'discipline',
  GENDER = 'gender',
  EQUITY = 'equity',
  EFFICIENCY = 'efficiency',
  QUALITY = 'quality',
  COMPARISON = 'comparison',
  TREND = 'trend',
  PREDICTION = 'prediction',
  CUSTOM = 'custom'
}

export enum ComparisonScope {
  NATIONAL = 'national',
  REGIONAL = 'regional',
  DEPARTMENTAL = 'departmental',
  INSPECTION = 'inspection',
  SCHOOL = 'school',
  PEER_GROUP = 'peer_group',
  YEAR_OVER_YEAR = 'year_over_year',
  TARGET = 'target'
}

export enum TrendDirection {
  UP = 'up',
  DOWN = 'down',
  STABLE = 'stable',
  FLUCTUATING = 'fluctuating',
  VOLATILE = 'volatile',
  EXCELLENT = 'excellent',
  WARNING = 'warning',
  CRITICAL = 'critical'
}

export enum DataSourceType {
  SCHOOL_DATABASE = 'school_database',
  REGIONAL_AGGREGATOR = 'regional_aggregator',
  MINISTRY_CENTRAL = 'ministry_central',
  EXTERNAL_API = 'external_api',
  MANUAL_ENTRY = 'manual_entry',
  CSV_IMPORT = 'csv_import',
  EXCEL_IMPORT = 'excel_import',
  REAL_TIME_STREAM = 'real_time_stream',
  IOT_SENSOR = 'iot_sensor',
  MOBILE_APP = 'mobile_app'
}

export enum BenchmarkType {
  NATIONAL_AVERAGE = 'national_average',
  REGIONAL_AVERAGE = 'regional_average',
  PEER_SCHOOL_AVERAGE = 'peer_school_average',
  HISTORICAL_BEST = 'historical_best',
  INTERNATIONAL_BENCHMARK = 'international_benchmark',
  TARGET_VALUE = 'target_value',
  STATISTICAL_PERCENTILE = 'statistical_percentile',
  CUSTOM = 'custom'
}

export enum AlertType {
  THRESHOLD_BREACH = 'threshold_breach',
  TREND_ANOMALY = 'trend_anomaly',
  DATA_QUALITY = 'data_quality',
  MISSING_DATA = 'missing_data',
  COMPLIANCE = 'compliance',
  PERFORMANCE_DEGRADATION = 'performance_degradation',
  BUDGET_EXCEEDED = 'budget_exceeded',
  ENROLLMENT_DROP = 'enrollment_drop',
  ATTENDANCE_ANOMALY = 'attendance_anomaly',
  CUSTOM = 'custom'
}

export enum AnalyticsExportFormat {
  PDF = 'pdf',
  EXCEL = 'excel',
  CSV = 'csv',
  JSON = 'json',
  XML = 'xml',
  HTML = 'html',
  IMAGE = 'image',
  POWERPOINT = 'powerpoint',
  TSV = 'tsv'
}

export enum WidgetLayoutType {
  FULL_WIDTH = 'full_width',
  HALF_WIDTH = 'half_width',
  THIRD_WIDTH = 'third_width',
  QUARTER_WIDTH = 'quarter_width',
  SIDEBAR = 'sidebar',
  FIXED = 'fixed',
  FLEXIBLE = 'flexible'
}

export enum RefreshFrequency {
  REAL_TIME = 'real_time',
  EVERY_MINUTE = 'every_minute',
  EVERY_5_MINUTES = 'every_5_minutes',
  EVERY_15_MINUTES = 'every_15_minutes',
  HOURLY = 'hourly',
  EVERY_6_HOURS = 'every_6_hours',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  ON_DEMAND = 'on_demand'
}

export enum AnalyticsPermission {
  VIEW = 'view',
  EXPORT = 'export',
  CREATE = 'create',
  EDIT = 'edit',
  DELETE = 'delete',
  MANAGE = 'manage',
  ADMIN = 'admin'
}

export interface NationalKPI {
  id: string;
  name: string;
  code: string;
  type: KPIType;
  status: KPIStatus;
  description: string;
  value: number;
  previousValue: number;
  target: number;
  unit: string;
  period: KPIPeriod;
  startDate: string;
  endDate: string;
  trend: TrendDirection;
  changePercentage: number;
  benchmark: number;
  benchmarkType: BenchmarkType;
  alertSeverity: AlertSeverity;
  dataSource: DataSourceType;
  level: AnalyticsLevel;
  granularity: DataGranularity;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface RegionalKPI {
  id: string;
  regionId: string;
  regionName: string;
  name: string;
  code: string;
  type: KPIType;
  status: KPIStatus;
  description: string;
  value: number;
  previousValue: number;
  target: number;
  unit: string;
  period: KPIPeriod;
  startDate: string;
  endDate: string;
  trend: TrendDirection;
  changePercentage: number;
  nationalAverage: number;
  rank: number;
  totalRegions: number;
  alertSeverity: AlertSeverity;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DepartmentKPI {
  id: string;
  departmentId: string;
  departmentName: string;
  regionId: string;
  regionName: string;
  name: string;
  code: string;
  type: KPIType;
  status: KPIStatus;
  description: string;
  value: number;
  previousValue: number;
  target: number;
  unit: string;
  period: KPIPeriod;
  startDate: string;
  endDate: string;
  trend: TrendDirection;
  changePercentage: number;
  regionalAverage: number;
  nationalAverage: number;
  rank: number;
  totalDepartments: number;
  alertSeverity: AlertSeverity;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface InspectionKPI {
  id: string;
  inspectionId: string;
  inspectionName: string;
  departmentId: string;
  departmentName: string;
  name: string;
  code: string;
  type: KPIType;
  status: KPIStatus;
  description: string;
  value: number;
  previousValue: number;
  target: number;
  unit: string;
  period: KPIPeriod;
  startDate: string;
  endDate: string;
  trend: TrendDirection;
  changePercentage: number;
  complianceRate: number;
  schoolsInspected: number;
  totalSchools: number;
  alertSeverity: AlertSeverity;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface SchoolKPI {
  id: string;
  schoolId: string;
  schoolName: string;
  inspectionId: string;
  inspectionName: string;
  name: string;
  code: string;
  type: KPIType;
  status: KPIStatus;
  description: string;
  value: number;
  previousValue: number;
  target: number;
  unit: string;
  period: KPIPeriod;
  startDate: string;
  endDate: string;
  trend: TrendDirection;
  changePercentage: number;
  inspectionAverage: number;
  departmentAverage: number;
  nationalAverage: number;
  alertSeverity: AlertSeverity;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface StudentKPI {
  id: string;
  studentId: string;
  studentName: string;
  schoolId: string;
  classId: string;
  academicScore: number;
  attendanceRate: number;
  behaviourScore: number;
  participationRate: number;
  completionRate: number;
  improvementRate: number;
  attendanceTrend: TrendDirection;
  academicTrend: TrendDirection;
  overallRank: number;
  classSize: number;
  riskLevel: AlertSeverity;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface TeacherKPI {
  id: string;
  teacherId: string;
  teacherName: string;
  schoolId: string;
  departmentId: string;
  qualificationScore: number;
  performanceScore: number;
  attendanceRate: number;
  studentSatisfaction: number;
  classPerformance: number;
  trainingHours: number;
  yearsOfExperience: number;
  studentTeacherRatio: number;
  performanceTrend: TrendDirection;
  alertSeverity: AlertSeverity;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface InfrastructureKPI {
  id: string;
  facilityId: string;
  facilityName: string;
  schoolId: string;
  facilityType: string;
  capacity: number;
  utilizationRate: number;
  occupancyRate: number;
  condition: string;
  maintenanceStatus: string;
  lastInspectionDate: string;
  nextInspectionDate: string;
  safetyScore: number;
  accessibilityScore: number;
  energyEfficiency: number;
  waterEfficiency: number;
  digitalConnectivity: number;
  alertSeverity: AlertSeverity;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface FinanceKPI {
  id: string;
  schoolId: string;
  schoolName: string;
  departmentId: string;
  totalBudget: number;
  totalExpenditure: number;
  totalRevenue: number;
  balance: number;
  budgetUtilisationRate: number;
  costPerStudent: number;
  costPerTeacher: number;
  revenuePerStudent: number;
  infrastructureAllocation: number;
  teacherAllocation: number;
  programmeAllocation: number;
  efficiencyScore: number;
  sustainabilityScore: number;
  trend: TrendDirection;
  alertSeverity: AlertSeverity;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AIPrediction {
  id: string;
  modelId: string;
  modelName: string;
  modelType: PredictionModel;
  status: PredictionStatus;
  level: AnalyticsLevel;
  targetMetric: string;
  description: string;
  trainingDataPoints: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rmse: number;
  mae: number;
  r2Score: number;
  trainingStartDate: string;
  trainingEndDate: string;
  lastPredictionDate: string;
  nextPredictionDate: string;
  features: string[];
  hyperparameters: Record<string, unknown>;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface PredictionResult {
  id: string;
  predictionId: string;
  predictionDate: string;
  targetDate: string;
  predictedValue: number;
  confidenceLower: number;
  confidenceUpper: number;
  confidenceLevel: number;
  actualValue: number | null;
  errorMargin: number | null;
  accuracy: number | null;
  factors: PredictionFactor[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface PredictionFactor {
  name: string;
  importance: number;
  direction: TrendDirection;
  description: string;
  value: number;
  historicalValues: number[];
}

export interface NationalDashboard {
  id: string;
  name: string;
  description: string;
  type: DashboardType;
  level: AnalyticsLevel;
  ownerId: string;
  isPublic: boolean;
  isDefault: boolean;
  layout: DashboardLayout;
  widgets: DashboardWidget[];
  filters: DashboardFilter[];
  refreshFrequency: RefreshFrequency;
  lastRefreshed: string;
  permissions: AnalyticsPermission[];
  tags: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardLayout {
  columns: number;
  rows: number;
  gutter: number;
  padding: number;
  responsive: boolean;
  breakpoints: Record<string, number>;
}

export interface DashboardWidget {
  id: string;
  dashboardId: string;
  title: string;
  type: VisualizationType;
  layout: WidgetLayoutType;
  position: WidgetPosition;
  size: WidgetSize;
  dataSource: string;
  query: string;
  configuration: WidgetConfiguration;
  refreshFrequency: RefreshFrequency;
  lastRefreshed: string;
  isVisible: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface WidgetPosition {
  x: number;
  y: number;
  z: number;
}

export interface WidgetSize {
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  maxWidth: number;
  maxHeight: number;
}

export interface WidgetConfiguration {
  title: string;
  subtitle: string;
  showLegend: boolean;
  showLabels: boolean;
  showGrid: boolean;
  animate: boolean;
  colorScheme: string;
  fontSize: number;
  fontFamily: string;
  borderRadius: number;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  customOptions: Record<string, unknown>;
}

export interface DashboardFilter {
  id: string;
  dashboardId: string;
  name: string;
  field: string;
  type: FilterType;
  options: FilterOption[];
  defaultValue: unknown;
  currentValue: unknown;
  isRequired: boolean;
  isMultiSelect: boolean;
  isVisible: boolean;
  metadata: Record<string, unknown>;
}

export enum FilterType {
  TEXT = 'text',
  NUMBER = 'number',
  DATE = 'date',
  DATE_RANGE = 'date_range',
  SELECT = 'select',
  MULTI_SELECT = 'multi_select',
  BOOLEAN = 'boolean',
  RANGE = 'range',
  GEO = 'geo',
  HIERARCHICAL = 'hierarchical'
}

export interface FilterOption {
  label: string;
  value: unknown;
  count: number;
  isDisabled: boolean;
  children: FilterOption[];
}

export interface AnalyticsReport {
  id: string;
  name: string;
  description: string;
  type: AnalyticsReportType;
  level: AnalyticsLevel;
  scope: ComparisonScope;
  period: KPIPeriod;
  startDate: string;
  endDate: string;
  generatedBy: string;
  format: AnalyticsExportFormat;
  status: string;
  fileUrl: string;
  fileSize: number;
  pageCount: number;
  sections: ReportSection[];
  parameters: Record<string, unknown>;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ReportSection {
  id: string;
  title: string;
  order: number;
  type: string;
  content: ReportContent[];
  summary: string;
  recommendations: string[];
}

export interface ReportContent {
  id: string;
  sectionId: string;
  type: VisualizationType;
  title: string;
  data: Record<string, unknown>[];
  insights: string[];
  metadata: Record<string, unknown>;
}

export interface AnalyticsConfig {
  id: string;
  schoolId: string;
  nationalEnabled: boolean;
  regionalEnabled: boolean;
  departmentalEnabled: boolean;
  inspectionEnabled: boolean;
  schoolEnabled: boolean;
  studentEnabled: boolean;
  teacherEnabled: boolean;
  infrastructureEnabled: boolean;
  financeEnabled: boolean;
  predictionsEnabled: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
  dataRetentionDays: number;
  exportFormats: AnalyticsExportFormat[];
  alertEmails: string[];
  alertThresholds: Record<string, number>;
  customKPIs: CustomKPI[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CustomKPI {
  id: string;
  name: string;
  formula: string;
  description: string;
  unit: string;
  level: AnalyticsLevel;
  period: KPIPeriod;
  target: number;
  threshold: number;
  isActive: boolean;
  createdBy: string;
  metadata: Record<string, unknown>;
}

export interface AnalyticsMetrics {
  totalDashboards: number;
  totalWidgets: number;
  totalReports: number;
  totalKPIs: number;
  activePredictions: number;
  dataSources: number;
  activeUsers: number;
  totalExports: number;
  averageLoadTime: number;
  dataFreshness: number;
  storageUsed: number;
  apiCalls: number;
  alertCount: number;
  unresolvedAlerts: number;
  metadata: Record<string, unknown>;
}

export interface AnalyticsAlert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  message: string;
  kpiId: string;
  kpiName: string;
  level: AnalyticsLevel;
  threshold: number;
  currentValue: number;
  previousValue: number;
  changePercentage: number;
  acknowledgedBy: string | null;
  acknowledgedAt: string | null;
  resolvedBy: string | null;
  resolvedAt: string | null;
  isActive: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsUser {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: string;
  level: AnalyticsLevel;
  permissions: AnalyticsPermission[];
  dashboards: string[];
  lastLogin: string;
  isActive: boolean;
  preferences: AnalyticsUserPreferences;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsUserPreferences {
  defaultDashboard: string;
  defaultPeriod: KPIPeriod;
  defaultLevel: AnalyticsLevel;
  exportFormat: AnalyticsExportFormat;
  emailAlerts: boolean;
  smsAlerts: boolean;
  language: string;
  theme: string;
  timezone: string;
}

export interface AnalyticsAuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entityType: string;
  entityId: string;
  entityName: string;
  details: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}

export interface AnalyticsDataQuality {
  id: string;
  level: AnalyticsLevel;
  entityId: string;
  entityName: string;
  completeness: number;
  accuracy: number;
  timeliness: number;
  consistency: number;
  validity: number;
  overallScore: number;
  issues: DataQualityIssue[];
  lastChecked: string;
  metadata: Record<string, unknown>;
}

export interface DataQualityIssue {
  id: string;
  type: string;
  severity: AlertSeverity;
  field: string;
  description: string;
  affectedRecords: number;
  suggestedFix: string;
  isResolved: boolean;
  resolvedBy: string;
  resolvedAt: string;
}

export interface AnalyticsBenchmark {
  id: string;
  name: string;
  type: BenchmarkType;
  level: AnalyticsLevel;
  metric: string;
  value: number;
  period: KPIPeriod;
  startDate: string;
  endDate: string;
  source: string;
  description: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsTrend {
  id: string;
  metric: string;
  level: AnalyticsLevel;
  entityId: string;
  direction: TrendDirection;
  magnitude: number;
  duration: number;
  startDate: string;
  endDate: string;
  values: TrendDataPoint[];
  metadata: Record<string, unknown>;
}

export interface TrendDataPoint {
  date: string;
  value: number;
  label: string;
}

export interface AnalyticsComparison {
  id: string;
  name: string;
  scope: ComparisonScope;
  level: AnalyticsLevel;
  entities: ComparisonEntity[];
  metrics: ComparisonMetric[];
  period: KPIPeriod;
  startDate: string;
  endDate: string;
  insights: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface ComparisonEntity {
  id: string;
  name: string;
  type: string;
  level: AnalyticsLevel;
}

export interface ComparisonMetric {
  name: string;
  unit: string;
  values: ComparisonValue[];
}

export interface ComparisonValue {
  entityId: string;
  entityName: string;
  value: number;
  rank: number;
  percentile: number;
}

export interface AnalyticsForecast {
  id: string;
  metric: string;
  level: AnalyticsLevel;
  modelId: string;
  modelName: string;
  historicalPeriods: number;
  forecastPeriods: number;
  confidence: number;
  values: ForecastValue[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ForecastValue {
  date: string;
  predicted: number;
  lower: number;
  upper: number;
  actual: number | null;
}

export interface AnalyticsHeatmap {
  id: string;
  title: string;
  level: AnalyticsLevel;
  xLabel: string;
  yLabel: string;
  colorScale: string;
  data: HeatmapDataPoint[];
  metadata: Record<string, unknown>;
}

export interface HeatmapDataPoint {
  x: string;
  y: string;
  value: number;
  label: string;
}

export interface AnalyticsGeoData {
  id: string;
  title: string;
  level: AnalyticsLevel;
  metric: string;
  unit: string;
  layerType: string;
  features: GeoFeature[];
  metadata: Record<string, unknown>;
}

export interface GeoFeature {
  id: string;
  name: string;
  geometry: Record<string, unknown>;
  properties: Record<string, unknown>;
  value: number;
  label: string;
}

export interface AnalyticsTimeSeries {
  id: string;
  metric: string;
  level: AnalyticsLevel;
  entityId: string;
  granularity: DataGranularity;
  points: TimeSeriesPoint[];
  metadata: Record<string, unknown>;
}

export interface TimeSeriesPoint {
  timestamp: string;
  value: number;
  label: string;
  annotation: string | null;
}

export interface AnalyticsAnomaly {
  id: string;
  metric: string;
  level: AnalyticsLevel;
  entityId: string;
  entityName: string;
  expectedValue: number;
  actualValue: number;
  deviation: number;
  severity: AlertSeverity;
  detectedAt: string;
  period: string;
  description: string;
  isAcknowledged: boolean;
  metadata: Record<string, unknown>;
}

export interface AnalyticsSegment {
  id: string;
  name: string;
  description: string;
  level: AnalyticsLevel;
  criteria: SegmentCriteria[];
  entityCount: number;
  metrics: Record<string, number>;
  isActive: boolean;
  createdBy: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface SegmentCriteria {
  field: string;
  operator: string;
  value: unknown;
}

export interface AnalyticsAnnotation {
  id: string;
  dashboardId: string;
  widgetId: string | null;
  x: number;
  y: number;
  text: string;
  color: string;
  createdBy: string;
  isVisible: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsNotification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  dashboardId: string | null;
  kpiId: string | null;
  isRead: boolean;
  actionUrl: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AnalyticsSubscription {
  id: string;
  userId: string;
  entityType: string;
  entityId: string;
  eventName: string;
  channel: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsCache {
  id: string;
  key: string;
  value: string;
  ttl: number;
  size: number;
  hitCount: number;
  createdAt: string;
  expiresAt: string;
}

export interface AnalyticsJob {
  id: string;
  type: string;
  status: string;
  priority: number;
  parameters: Record<string, unknown>;
  result: Record<string, unknown> | null;
  startedAt: string;
  completedAt: string | null;
  duration: number | null;
  errorMessage: string | null;
  retryCount: number;
  maxRetries: number;
  createdBy: string;
  metadata: Record<string, unknown>;
}

export interface AnalyticsSchedule {
  id: string;
  name: string;
  type: string;
  cronExpression: string;
  parameters: Record<string, unknown>;
  lastRun: string | null;
  nextRun: string;
  isActive: boolean;
  createdBy: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}
