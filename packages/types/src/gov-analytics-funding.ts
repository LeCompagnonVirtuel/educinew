// Government & National Governance Enterprise Types - Analytics, Funding, Identity & International
// Phase 2.9 - EduCI Platform

// =============================================================================
// MODULE 8 - NATIONAL ANALYTICS
// =============================================================================

export enum KpiCategory {
  ENROLLMENT = 'enrollment',
  RETENTION = 'retention',
  ACHIEVEMENT = 'achievement',
  INFRASTRUCTURE = 'infrastructure',
  TEACHING = 'teaching',
  FINANCE = 'finance',
  EQUITY = 'equity',
  EFFICIENCY = 'efficiency',
  QUALITY = 'quality',
  OUTCOME = 'outcome'
}

export enum KpiTrend {
  IMPROVING = 'improving',
  DECLINING = 'declining',
  STABLE = 'stable',
  FLUCTUATING = 'fluctuating'
}

export enum DashboardWidgetType {
  CHART = 'chart',
  TABLE = 'table',
  MAP = 'map',
  GAUGE = 'gauge',
  STAT = 'stat',
  TREND = 'trend',
  HEATMAP = 'heatmap',
  PROGRESS = 'progress'
}

export enum AccessLevel {
  PUBLIC = 'public',
  INTERNAL = 'internal',
  RESTRICTED = 'restricted',
  CONFIDENTIAL = 'confidential',
  TOP_SECRET = 'top_secret'
}

export enum ForecastType {
  ENROLLMENT = 'enrollment',
  GRADUATION = 'graduation',
  FUNDING = 'funding',
  DROPOUT = 'dropout',
  INFRASTRUCTURE = 'infrastructure',
  TEACHER = 'teacher',
  DEMAND = 'demand'
}

export enum TrendDirection {
  UP = 'up',
  DOWN = 'down',
  STABLE = 'stable'
}

export enum DataStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  VERIFIED = 'verified',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  ARCHIVED = 'archived'
}

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum FacilityCondition {
  EXCELLENT = 'excellent',
  GOOD = 'good',
  FAIR = 'fair',
  POOR = 'poor',
  CRITICAL = 'critical',
  INOPERABLE = 'inoperable'
}

// ---- EducationKpi ----

export interface EducationKpi {
  id: string;
  name: string;
  code: string;
  category: KpiCategory;
  description: string;
  value: number;
  target: number;
  unit: string;
  period: string;
  region_id: string;
  district_id: string;
  national_level: boolean;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface EducationKpiCreate {
  name: string;
  code: string;
  category: KpiCategory;
  description: string;
  value: number;
  target: number;
  unit: string;
  period: string;
  region_id: string;
  district_id: string;
  national_level: boolean;
  status: DataStatus;
}

export interface EducationKpiUpdate {
  name?: string;
  code?: string;
  category?: KpiCategory;
  description?: string;
  value?: number;
  target?: number;
  unit?: string;
  period?: string;
  region_id?: string;
  district_id?: string;
  national_level?: boolean;
  status?: DataStatus;
}

export interface EducationKpiQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- RegionalAnalyticsKpi ----

export interface RegionalAnalyticsKpi {
  id: string;
  region_id: string;
  name: string;
  code: string;
  category: KpiCategory;
  value: number;
  target: number;
  unit: string;
  period: string;
  comparison_period: string;
  change_percent: number;
  trend: KpiTrend;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface RegionalAnalyticsKpiCreate {
  region_id: string;
  name: string;
  code: string;
  category: KpiCategory;
  value: number;
  target: number;
  unit: string;
  period: string;
  comparison_period: string;
  change_percent: number;
  trend: KpiTrend;
  status: DataStatus;
}

export interface RegionalAnalyticsKpiUpdate {
  region_id?: string;
  name?: string;
  code?: string;
  category?: KpiCategory;
  value?: number;
  target?: number;
  unit?: string;
  period?: string;
  comparison_period?: string;
  change_percent?: number;
  trend?: KpiTrend;
  status?: DataStatus;
}

export interface RegionalAnalyticsKpiQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- NationalDashboard ----

export interface NationalDashboard {
  id: string;
  name: string;
  code: string;
  description: string;
  layout: Record<string, unknown>;
  widgets: Record<string, unknown>;
  refresh_interval: number;
  access_level: AccessLevel;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface NationalDashboardCreate {
  name: string;
  code: string;
  description: string;
  layout: Record<string, unknown>;
  widgets: Record<string, unknown>;
  refresh_interval: number;
  access_level: AccessLevel;
  status: DataStatus;
}

export interface NationalDashboardUpdate {
  name?: string;
  code?: string;
  description?: string;
  layout?: Record<string, unknown>;
  widgets?: Record<string, unknown>;
  refresh_interval?: number;
  access_level?: AccessLevel;
  status?: DataStatus;
}

export interface NationalDashboardQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- DashboardWidget ----

export interface DashboardWidget {
  id: string;
  dashboard_id: string;
  name: string;
  type: DashboardWidgetType;
  data_source: string;
  config: Record<string, unknown>;
  position: Record<string, unknown>;
  size: Record<string, unknown>;
  refresh_interval: number;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface DashboardWidgetCreate {
  dashboard_id: string;
  name: string;
  type: DashboardWidgetType;
  data_source: string;
  config: Record<string, unknown>;
  position: Record<string, unknown>;
  size: Record<string, unknown>;
  refresh_interval: number;
  status: DataStatus;
}

export interface DashboardWidgetUpdate {
  dashboard_id?: string;
  name?: string;
  type?: DashboardWidgetType;
  data_source?: string;
  config?: Record<string, unknown>;
  position?: Record<string, unknown>;
  size?: Record<string, unknown>;
  refresh_interval?: number;
  status?: DataStatus;
}

export interface DashboardWidgetQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- PredictiveAnalytic ----

export interface PredictiveAnalytic {
  id: string;
  name: string;
  code: string;
  model_type: string;
  parameters: Record<string, unknown>;
  accuracy: number;
  prediction_period: string;
  input_data: Record<string, unknown>;
  output_data: Record<string, unknown>;
  confidence_interval: number;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface PredictiveAnalyticCreate {
  name: string;
  code: string;
  model_type: string;
  parameters: Record<string, unknown>;
  accuracy: number;
  prediction_period: string;
  input_data: Record<string, unknown>;
  output_data: Record<string, unknown>;
  confidence_interval: number;
  status: DataStatus;
}

export interface PredictiveAnalyticUpdate {
  name?: string;
  code?: string;
  model_type?: string;
  parameters?: Record<string, unknown>;
  accuracy?: number;
  prediction_period?: string;
  input_data?: Record<string, unknown>;
  output_data?: Record<string, unknown>;
  confidence_interval?: number;
  status?: DataStatus;
}

export interface PredictiveAnalyticQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- DropoutMap ----

export interface DropoutMap {
  id: string;
  region_id: string;
  district_id: string;
  school_id: string;
  dropout_rate: number;
  trend: TrendDirection;
  risk_level: RiskLevel;
  contributing_factors: string[];
  period: string;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface DropoutMapCreate {
  region_id: string;
  district_id: string;
  school_id: string;
  dropout_rate: number;
  trend: TrendDirection;
  risk_level: RiskLevel;
  contributing_factors: string[];
  period: string;
  status: DataStatus;
}

export interface DropoutMapUpdate {
  region_id?: string;
  district_id?: string;
  school_id?: string;
  dropout_rate?: number;
  trend?: TrendDirection;
  risk_level?: RiskLevel;
  contributing_factors?: string[];
  period?: string;
  status?: DataStatus;
}

export interface DropoutMapQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- InfrastructureMap ----

export interface InfrastructureMap {
  id: string;
  region_id: string;
  district_id: string;
  school_id: string;
  facility_type: string;
  condition: FacilityCondition;
  capacity: number;
  utilization: number;
  investment_needed: number;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface InfrastructureMapCreate {
  region_id: string;
  district_id: string;
  school_id: string;
  facility_type: string;
  condition: FacilityCondition;
  capacity: number;
  utilization: number;
  investment_needed: number;
  status: DataStatus;
}

export interface InfrastructureMapUpdate {
  region_id?: string;
  district_id?: string;
  school_id?: string;
  facility_type?: string;
  condition?: FacilityCondition;
  capacity?: number;
  utilization?: number;
  investment_needed?: number;
  status?: DataStatus;
}

export interface InfrastructureMapQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- TeacherDistribution ----

export interface TeacherDistribution {
  id: string;
  region_id: string;
  district_id: string;
  school_id: string;
  subject_area: string;
  total_teachers: number;
  qualified_teachers: number;
  student_teacher_ratio: number;
  vacancies: number;
  period: string;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface TeacherDistributionCreate {
  region_id: string;
  district_id: string;
  school_id: string;
  subject_area: string;
  total_teachers: number;
  qualified_teachers: number;
  student_teacher_ratio: number;
  vacancies: number;
  period: string;
  status: DataStatus;
}

export interface TeacherDistributionUpdate {
  region_id?: string;
  district_id?: string;
  school_id?: string;
  subject_area?: string;
  total_teachers?: number;
  qualified_teachers?: number;
  student_teacher_ratio?: number;
  vacancies?: number;
  period?: string;
  status?: DataStatus;
}

export interface TeacherDistributionQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- StudentDistribution ----

export interface StudentDistribution {
  id: string;
  region_id: string;
  district_id: string;
  school_id: string;
  level: string;
  total_students: number;
  male_students: number;
  female_students: number;
  enrollment_rate: number;
  retention_rate: number;
  period: string;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface StudentDistributionCreate {
  region_id: string;
  district_id: string;
  school_id: string;
  level: string;
  total_students: number;
  male_students: number;
  female_students: number;
  enrollment_rate: number;
  retention_rate: number;
  period: string;
  status: DataStatus;
}

export interface StudentDistributionUpdate {
  region_id?: string;
  district_id?: string;
  school_id?: string;
  level?: string;
  total_students?: number;
  male_students?: number;
  female_students?: number;
  enrollment_rate?: number;
  retention_rate?: number;
  period?: string;
  status?: DataStatus;
}

export interface StudentDistributionQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- BudgetAnalytic ----

export interface BudgetAnalytic {
  id: string;
  ministry_id: string;
  region_id: string;
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
  efficiency: number;
  period: string;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface BudgetAnalyticCreate {
  ministry_id: string;
  region_id: string;
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
  efficiency: number;
  period: string;
  status: DataStatus;
}

export interface BudgetAnalyticUpdate {
  ministry_id?: string;
  region_id?: string;
  category?: string;
  allocated?: number;
  spent?: number;
  remaining?: number;
  efficiency?: number;
  period?: string;
  status?: DataStatus;
}

export interface BudgetAnalyticQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- EducationForecast ----

export interface EducationForecast {
  id: string;
  name: string;
  code: string;
  forecast_type: ForecastType;
  parameters: Record<string, unknown>;
  period_start: string;
  period_end: string;
  predictions: Record<string, unknown>;
  confidence_level: number;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface EducationForecastCreate {
  name: string;
  code: string;
  forecast_type: ForecastType;
  parameters: Record<string, unknown>;
  period_start: string;
  period_end: string;
  predictions: Record<string, unknown>;
  confidence_level: number;
  status: DataStatus;
}

export interface EducationForecastUpdate {
  name?: string;
  code?: string;
  forecast_type?: ForecastType;
  parameters?: Record<string, unknown>;
  period_start?: string;
  period_end?: string;
  predictions?: Record<string, unknown>;
  confidence_level?: number;
  status?: DataStatus;
}

export interface EducationForecastQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- DataCollection ----

export interface DataCollection {
  id: string;
  name: string;
  code: string;
  collector_id: string;
  region_id: string;
  school_id: string;
  form_type: string;
  responses: Record<string, unknown>;
  submitted_date: string;
  verified: boolean;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface DataCollectionCreate {
  name: string;
  code: string;
  collector_id: string;
  region_id: string;
  school_id: string;
  form_type: string;
  responses: Record<string, unknown>;
  submitted_date: string;
  verified: boolean;
  status: DataStatus;
}

export interface DataCollectionUpdate {
  name?: string;
  code?: string;
  collector_id?: string;
  region_id?: string;
  school_id?: string;
  form_type?: string;
  responses?: Record<string, unknown>;
  submitted_date?: string;
  verified?: boolean;
  status?: DataStatus;
}

export interface DataCollectionQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// =============================================================================
// MODULE 9 - FUNDING
// =============================================================================

export enum FundingType {
  BUDGET = 'budget',
  GRANT = 'grant',
  LOAN = 'loan',
  DONATION = 'donation',
  INTERNAL = 'internal',
  EXTERNAL = 'external'
}

export enum FundingStatus {
  PROPOSED = 'proposed',
  APPROVED = 'approved',
  ALLOCATED = 'allocated',
  DISBURSED = 'disbursed',
  PARTIALLY_DISBURSED = 'partially_disbursed',
  COMPLETED = 'completed',
  SUSPENDED = 'suspended',
  CANCELLED = 'cancelled'
}

export enum ScholarshipType {
  MERIT = 'merit',
  NEED = 'need',
  ATHLETIC = 'athletic',
  ARTS = 'arts',
  STEM = 'stem',
  GOVERNMENT = 'government',
  INTERNATIONAL = 'international'
}

export enum ScholarshipStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  UNDER_REVIEW = 'under_review',
  AWARDED = 'awarded',
  CANCELLED = 'cancelled'
}

export enum ApplicationStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  WAITLISTED = 'waitlisted'
}

export enum DonorType {
  GOVERNMENT = 'government',
  MULTILATERAL = 'multilateral',
  BILATERAL = 'bilateral',
  PRIVATE_FOUNDATION = 'private_foundation',
  CORPORATE = 'corporate',
  INDIVIDUAL = 'individual'
}

export enum NgoType {
  INTERNATIONAL = 'international',
  NATIONAL = 'national',
  LOCAL = 'local',
  COMMUNITY = 'community'
}

export enum DisbursementMethod {
  BANK_TRANSFER = 'bank_transfer',
  CASH = 'cash',
  CHECK = 'check',
  MOBILE_MONEY = 'mobile_money',
  DIRECT_DEPOSIT = 'direct_deposit',
  IN_KIND = 'in_kind'
}

export enum BudgetCategory {
  PERSONNEL = 'personnel',
  INFRASTRUCTURE = 'infrastructure',
  EQUIPMENT = 'equipment',
  MATERIALS = 'materials',
  TRAINING = 'training',
  SCHOLARSHIP = 'scholarship',
  OPERATIONS = 'operations',
  RESEARCH = 'research',
  TECHNOLOGY = 'technology',
  MAINTENANCE = 'maintenance'
}

// ---- GovernmentFunding ----

export interface GovernmentFunding {
  id: string;
  ministry_id: string;
  name: string;
  code: string;
  type: FundingType;
  amount: number;
  fiscal_year: string;
  purpose: string;
  conditions: string[];
  disbursement_schedule: Record<string, unknown>;
  status: FundingStatus;
  created_at: string;
  updated_at: string;
}

export interface GovernmentFundingCreate {
  ministry_id: string;
  name: string;
  code: string;
  type: FundingType;
  amount: number;
  fiscal_year: string;
  purpose: string;
  conditions: string[];
  disbursement_schedule: Record<string, unknown>;
  status: FundingStatus;
}

export interface GovernmentFundingUpdate {
  ministry_id?: string;
  name?: string;
  code?: string;
  type?: FundingType;
  amount?: number;
  fiscal_year?: string;
  purpose?: string;
  conditions?: string[];
  disbursement_schedule?: Record<string, unknown>;
  status?: FundingStatus;
}

export interface GovernmentFundingQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- FundingAllocation ----

export interface FundingAllocation {
  id: string;
  funding_id: string;
  region_id: string;
  district_id: string;
  school_id: string;
  amount: number;
  percentage: number;
  purpose: string;
  status: FundingStatus;
  created_at: string;
  updated_at: string;
}

export interface FundingAllocationCreate {
  funding_id: string;
  region_id: string;
  district_id: string;
  school_id: string;
  amount: number;
  percentage: number;
  purpose: string;
  status: FundingStatus;
}

export interface FundingAllocationUpdate {
  funding_id?: string;
  region_id?: string;
  district_id?: string;
  school_id?: string;
  amount?: number;
  percentage?: number;
  purpose?: string;
  status?: FundingStatus;
}

export interface FundingAllocationQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- Scholarship ----

export interface Scholarship {
  id: string;
  name: string;
  code: string;
  type: ScholarshipType;
  funding_source: string;
  amount: number;
  criteria: Record<string, unknown>;
  application_start: string;
  application_end: string;
  academic_year: string;
  total_slots: number;
  status: ScholarshipStatus;
  created_at: string;
  updated_at: string;
}

export interface ScholarshipCreate {
  name: string;
  code: string;
  type: ScholarshipType;
  funding_source: string;
  amount: number;
  criteria: Record<string, unknown>;
  application_start: string;
  application_end: string;
  academic_year: string;
  total_slots: number;
  status: ScholarshipStatus;
}

export interface ScholarshipUpdate {
  name?: string;
  code?: string;
  type?: ScholarshipType;
  funding_source?: string;
  amount?: number;
  criteria?: Record<string, unknown>;
  application_start?: string;
  application_end?: string;
  academic_year?: string;
  total_slots?: number;
  status?: ScholarshipStatus;
}

export interface ScholarshipQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- ScholarshipApplication ----

export interface ScholarshipApplication {
  id: string;
  scholarship_id: string;
  student_id: string;
  school_id: string;
  application_date: string;
  documents: string[];
  status: ApplicationStatus;
  reviewed_by: string;
  reviewed_at: string;
  decision: string;
  created_at: string;
  updated_at: string;
}

export interface ScholarshipApplicationCreate {
  scholarship_id: string;
  student_id: string;
  school_id: string;
  application_date: string;
  documents: string[];
  status: ApplicationStatus;
  reviewed_by: string;
  reviewed_at: string;
  decision: string;
}

export interface ScholarshipApplicationUpdate {
  scholarship_id?: string;
  student_id?: string;
  school_id?: string;
  application_date?: string;
  documents?: string[];
  status?: ApplicationStatus;
  reviewed_by?: string;
  reviewed_at?: string;
  decision?: string;
}

export interface ScholarshipApplicationQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- Grant ----

export interface Grant {
  id: string;
  name: string;
  code: string;
  donor_id: string;
  amount: number;
  purpose: string;
  start_date: string;
  end_date: string;
  conditions: string[];
  reporting_requirement: string;
  status: FundingStatus;
  created_at: string;
  updated_at: string;
}

export interface GrantCreate {
  name: string;
  code: string;
  donor_id: string;
  amount: number;
  purpose: string;
  start_date: string;
  end_date: string;
  conditions: string[];
  reporting_requirement: string;
  status: FundingStatus;
}

export interface GrantUpdate {
  name?: string;
  code?: string;
  donor_id?: string;
  amount?: number;
  purpose?: string;
  start_date?: string;
  end_date?: string;
  conditions?: string[];
  reporting_requirement?: string;
  status?: FundingStatus;
}

export interface GrantQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- GrantProject ----

export interface GrantProject {
  id: string;
  grant_id: string;
  name: string;
  description: string;
  objectives: string[];
  budget: number;
  start_date: string;
  end_date: string;
  beneficiary_count: number;
  status: FundingStatus;
  created_at: string;
  updated_at: string;
}

export interface GrantProjectCreate {
  grant_id: string;
  name: string;
  description: string;
  objectives: string[];
  budget: number;
  start_date: string;
  end_date: string;
  beneficiary_count: number;
  status: FundingStatus;
}

export interface GrantProjectUpdate {
  grant_id?: string;
  name?: string;
  description?: string;
  objectives?: string[];
  budget?: number;
  start_date?: string;
  end_date?: string;
  beneficiary_count?: number;
  status?: FundingStatus;
}

export interface GrantProjectQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- Donor ----

export interface Donor {
  id: string;
  name: string;
  code: string;
  type: DonorType;
  country: string;
  contact_person: string;
  email: string;
  phone: string;
  total_contribution: number;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface DonorCreate {
  name: string;
  code: string;
  type: DonorType;
  country: string;
  contact_person: string;
  email: string;
  phone: string;
  total_contribution: number;
  status: DataStatus;
}

export interface DonorUpdate {
  name?: string;
  code?: string;
  type?: DonorType;
  country?: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  total_contribution?: number;
  status?: DataStatus;
}

export interface DonorQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- NgoPartner ----

export interface NgoPartner {
  id: string;
  name: string;
  code: string;
  type: NgoType;
  country: string;
  headquarters: string;
  director_name: string;
  email: string;
  phone: string;
  focus_area: string;
  total_projects: number;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface NgoPartnerCreate {
  name: string;
  code: string;
  type: NgoType;
  country: string;
  headquarters: string;
  director_name: string;
  email: string;
  phone: string;
  focus_area: string;
  total_projects: number;
  status: DataStatus;
}

export interface NgoPartnerUpdate {
  name?: string;
  code?: string;
  type?: NgoType;
  country?: string;
  headquarters?: string;
  director_name?: string;
  email?: string;
  phone?: string;
  focus_area?: string;
  total_projects?: number;
  status?: DataStatus;
}

export interface NgoPartnerQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- BudgetAllocation ----

export interface BudgetAllocation {
  id: string;
  ministry_id: string;
  fiscal_year: string;
  category: BudgetCategory;
  subcategory: string;
  amount: number;
  percentage: number;
  utilization: number;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface BudgetAllocationCreate {
  ministry_id: string;
  fiscal_year: string;
  category: BudgetCategory;
  subcategory: string;
  amount: number;
  percentage: number;
  utilization: number;
  status: DataStatus;
}

export interface BudgetAllocationUpdate {
  ministry_id?: string;
  fiscal_year?: string;
  category?: BudgetCategory;
  subcategory?: string;
  amount?: number;
  percentage?: number;
  utilization?: number;
  status?: DataStatus;
}

export interface BudgetAllocationQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- RegionalBudget ----

export interface RegionalBudget {
  id: string;
  region_id: string;
  fiscal_year: string;
  total_budget: number;
  education_budget: number;
  infrastructure_budget: number;
  teacher_budget: number;
  scholarship_budget: number;
  utilization: number;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface RegionalBudgetCreate {
  region_id: string;
  fiscal_year: string;
  total_budget: number;
  education_budget: number;
  infrastructure_budget: number;
  teacher_budget: number;
  scholarship_budget: number;
  utilization: number;
  status: DataStatus;
}

export interface RegionalBudgetUpdate {
  region_id?: string;
  fiscal_year?: string;
  total_budget?: number;
  education_budget?: number;
  infrastructure_budget?: number;
  teacher_budget?: number;
  scholarship_budget?: number;
  utilization?: number;
  status?: DataStatus;
}

export interface RegionalBudgetQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- FundDisbursement ----

export interface FundDisbursement {
  id: string;
  funding_id: string;
  allocation_id: string;
  amount: number;
  disbursement_date: string;
  method: DisbursementMethod;
  reference_number: string;
  approved_by: string;
  status: FundingStatus;
  created_at: string;
  updated_at: string;
}

export interface FundDisbursementCreate {
  funding_id: string;
  allocation_id: string;
  amount: number;
  disbursement_date: string;
  method: DisbursementMethod;
  reference_number: string;
  approved_by: string;
  status: FundingStatus;
}

export interface FundDisbursementUpdate {
  funding_id?: string;
  allocation_id?: string;
  amount?: number;
  disbursement_date?: string;
  method?: DisbursementMethod;
  reference_number?: string;
  approved_by?: string;
  status?: FundingStatus;
}

export interface FundDisbursementQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- FundingReport ----

export interface FundingReport {
  id: string;
  funding_id: string;
  title: string;
  period_start: string;
  period_end: string;
  total_received: number;
  total_spent: number;
  milestones: string[];
  challenges: string[];
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface FundingReportCreate {
  funding_id: string;
  title: string;
  period_start: string;
  period_end: string;
  total_received: number;
  total_spent: number;
  milestones: string[];
  challenges: string[];
  status: DataStatus;
}

export interface FundingReportUpdate {
  funding_id?: string;
  title?: string;
  period_start?: string;
  period_end?: string;
  total_received?: number;
  total_spent?: number;
  milestones?: string[];
  challenges?: string[];
  status?: DataStatus;
}

export interface FundingReportQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// =============================================================================
// MODULE 10 - DIGITAL IDENTITY
// =============================================================================

export enum IdStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  REVOKED = 'revoked',
  EXPIRED = 'expired',
  PENDING = 'pending'
}

export enum VerificationType {
  DOCUMENT = 'document',
  BIOMETRIC = 'biometric',
  TWO_FACTOR = 'two_factor',
  IN_PERSON = 'in_person',
  VIDEO = 'video',
  SMS = 'sms'
}

export enum DocumentType {
  NATIONAL_ID = 'national_id',
  PASSPORT = 'passport',
  BIRTH_CERTIFICATE = 'birth_certificate',
  ACADEMIC_TRANSCRIPT = 'academic_transcript',
  PROFESSIONAL_LICENSE = 'professional_license',
  VISA = 'visa'
}

export enum BiometricType {
  FINGERPRINT = 'fingerprint',
  FACE = 'face',
  IRIS = 'iris',
  VOICE = 'voice'
}

export enum AuditAction {
  LOGIN = 'login',
  LOGOUT = 'logout',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  ACCESS = 'access',
  EXPORT = 'export',
  VERIFY = 'verify',
  REVOKE = 'revoke'
}

export enum HolderType {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMINISTRATOR = 'administrator',
  PARENT = 'parent',
  GUEST = 'guest'
}

// ---- NationalStudentId ----

export interface NationalStudentId {
  id: string;
  student_id: string;
  national_number: string;
  school_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  photo_url: string;
  biometric_data: Record<string, unknown>;
  issue_date: string;
  expiry_date: string;
  status: IdStatus;
  created_at: string;
  updated_at: string;
}

export interface NationalStudentIdCreate {
  student_id: string;
  national_number: string;
  school_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  photo_url: string;
  biometric_data: Record<string, unknown>;
  issue_date: string;
  expiry_date: string;
  status: IdStatus;
}

export interface NationalStudentIdUpdate {
  student_id?: string;
  national_number?: string;
  school_id?: string;
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  gender?: string;
  photo_url?: string;
  biometric_data?: Record<string, unknown>;
  issue_date?: string;
  expiry_date?: string;
  status?: IdStatus;
}

export interface NationalStudentIdQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- TeacherRegistry ----

export interface TeacherRegistry {
  id: string;
  teacher_id: string;
  national_number: string;
  first_name: string;
  last_name: string;
  qualification: string;
  specialization: string;
  institution: string;
  license_number: string;
  issue_date: string;
  expiry_date: string;
  status: IdStatus;
  created_at: string;
  updated_at: string;
}

export interface TeacherRegistryCreate {
  teacher_id: string;
  national_number: string;
  first_name: string;
  last_name: string;
  qualification: string;
  specialization: string;
  institution: string;
  license_number: string;
  issue_date: string;
  expiry_date: string;
  status: IdStatus;
}

export interface TeacherRegistryUpdate {
  teacher_id?: string;
  national_number?: string;
  first_name?: string;
  last_name?: string;
  qualification?: string;
  specialization?: string;
  institution?: string;
  license_number?: string;
  issue_date?: string;
  expiry_date?: string;
  status?: IdStatus;
}

export interface TeacherRegistryQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- SchoolRegistry ----

export interface SchoolRegistry {
  id: string;
  school_id: string;
  national_number: string;
  name: string;
  code: string;
  type: string;
  address: string;
  region: string;
  district: string;
  capacity: number;
  principal_name: string;
  accreditation_status: string;
  status: IdStatus;
  created_at: string;
  updated_at: string;
}

export interface SchoolRegistryCreate {
  school_id: string;
  national_number: string;
  name: string;
  code: string;
  type: string;
  address: string;
  region: string;
  district: string;
  capacity: number;
  principal_name: string;
  accreditation_status: string;
  status: IdStatus;
}

export interface SchoolRegistryUpdate {
  school_id?: string;
  national_number?: string;
  name?: string;
  code?: string;
  type?: string;
  address?: string;
  region?: string;
  district?: string;
  capacity?: number;
  principal_name?: string;
  accreditation_status?: string;
  status?: IdStatus;
}

export interface SchoolRegistryQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- DigitalCertificate ----

export interface DigitalCertificate {
  id: string;
  certificate_id: string;
  certificate_number: string;
  holder_id: string;
  holder_type: HolderType;
  issuer: string;
  issue_date: string;
  expiry_date: string;
  verification_code: string;
  qr_code: string;
  status: IdStatus;
  created_at: string;
  updated_at: string;
}

export interface DigitalCertificateCreate {
  certificate_id: string;
  certificate_number: string;
  holder_id: string;
  holder_type: HolderType;
  issuer: string;
  issue_date: string;
  expiry_date: string;
  verification_code: string;
  qr_code: string;
  status: IdStatus;
}

export interface DigitalCertificateUpdate {
  certificate_id?: string;
  certificate_number?: string;
  holder_id?: string;
  holder_type?: HolderType;
  issuer?: string;
  issue_date?: string;
  expiry_date?: string;
  verification_code?: string;
  qr_code?: string;
  status?: IdStatus;
}

export interface DigitalCertificateQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- QrVerification ----

export interface QrVerification {
  id: string;
  entity_id: string;
  entity_type: string;
  verification_code: string;
  generated_date: string;
  expiry_date: string;
  scan_count: number;
  last_scan_date: string;
  status: IdStatus;
  created_at: string;
  updated_at: string;
}

export interface QrVerificationCreate {
  entity_id: string;
  entity_type: string;
  verification_code: string;
  generated_date: string;
  expiry_date: string;
  scan_count: number;
  last_scan_date: string;
  status: IdStatus;
}

export interface QrVerificationUpdate {
  entity_id?: string;
  entity_type?: string;
  verification_code?: string;
  generated_date?: string;
  expiry_date?: string;
  scan_count?: number;
  last_scan_date?: string;
  status?: IdStatus;
}

export interface QrVerificationQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- IdentityVerification ----

export interface IdentityVerification {
  id: string;
  user_id: string;
  verification_type: VerificationType;
  document_type: DocumentType;
  document_number: string;
  document_url: string;
  verified_by: string;
  verified_at: string;
  status: IdStatus;
  created_at: string;
  updated_at: string;
}

export interface IdentityVerificationCreate {
  user_id: string;
  verification_type: VerificationType;
  document_type: DocumentType;
  document_number: string;
  document_url: string;
  verified_by: string;
  verified_at: string;
  status: IdStatus;
}

export interface IdentityVerificationUpdate {
  user_id?: string;
  verification_type?: VerificationType;
  document_type?: DocumentType;
  document_number?: string;
  document_url?: string;
  verified_by?: string;
  verified_at?: string;
  status?: IdStatus;
}

export interface IdentityVerificationQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- BiometricData ----

export interface BiometricData {
  id: string;
  user_id: string;
  fingerprint_template: string;
  face_template: string;
  iris_template: string;
  enrollment_date: string;
  device_id: string;
  status: IdStatus;
  created_at: string;
  updated_at: string;
}

export interface BiometricDataCreate {
  user_id: string;
  fingerprint_template: string;
  face_template: string;
  iris_template: string;
  enrollment_date: string;
  device_id: string;
  status: IdStatus;
}

export interface BiometricDataUpdate {
  user_id?: string;
  fingerprint_template?: string;
  face_template?: string;
  iris_template?: string;
  enrollment_date?: string;
  device_id?: string;
  status?: IdStatus;
}

export interface BiometricDataQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- IdentityAudit ----

export interface IdentityAudit {
  id: string;
  user_id: string;
  action: AuditAction;
  details: Record<string, unknown>;
  ip_address: string;
  user_agent: string;
  timestamp: string;
  status: IdStatus;
  created_at: string;
  updated_at: string;
}

export interface IdentityAuditCreate {
  user_id: string;
  action: AuditAction;
  details: Record<string, unknown>;
  ip_address: string;
  user_agent: string;
  timestamp: string;
  status: IdStatus;
}

export interface IdentityAuditUpdate {
  user_id?: string;
  action?: AuditAction;
  details?: Record<string, unknown>;
  ip_address?: string;
  user_agent?: string;
  timestamp?: string;
  status?: IdStatus;
}

export interface IdentityAuditQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// =============================================================================
// MODULE 11 - COMPLIANCE
// =============================================================================

export enum StandardCategory {
  CURRICULUM = 'curriculum',
  INFRASTRUCTURE = 'infrastructure',
  SAFETY = 'safety',
  FINANCE = 'finance',
  GOVERNANCE = 'governance',
  HUMAN_RESOURCES = 'human_resources',
  TECHNOLOGY = 'technology',
  INCLUSION = 'inclusion',
  ENVIRONMENT = 'environment',
  QUALITY = 'quality'
}

export enum ComplianceStatus2 {
  COMPLIANT = 'compliant',
  NON_COMPLIANT = 'non_compliant',
  PARTIALLY_COMPLIANT = 'partially_compliant',
  UNDER_REVIEW = 'under_review',
  WAIVED = 'waived',
  EXEMPT = 'exempt'
}

export enum AssessmentStatus2 {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  PENDING_REVIEW = 'pending_review',
  APPROVED = 'approved'
}

export enum WaiverStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
  REVOKED = 'revoked'
}

export enum EnforcementLevel {
  ADVISORY = 'advisory',
  MANDATORY = 'mandatory',
  CRITICAL = 'critical',
  PENALTY = 'penalty',
  SUSPENSION = 'suspension'
}

export enum NotificationSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
  URGENT = 'urgent'
}

// ---- NationalStandard ----

export interface NationalStandard {
  id: string;
  name: string;
  code: string;
  category: StandardCategory;
  description: string;
  version: string;
  effective_date: string;
  issuing_body: string;
  scope: string;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface NationalStandardCreate {
  name: string;
  code: string;
  category: StandardCategory;
  description: string;
  version: string;
  effective_date: string;
  issuing_body: string;
  scope: string;
  status: DataStatus;
}

export interface NationalStandardUpdate {
  name?: string;
  code?: string;
  category?: StandardCategory;
  description?: string;
  version?: string;
  effective_date?: string;
  issuing_body?: string;
  scope?: string;
  status?: DataStatus;
}

export interface NationalStandardQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- SchoolComplianceRecord ----

export interface SchoolComplianceRecord {
  id: string;
  school_id: string;
  standard_id: string;
  compliance_status: ComplianceStatus2;
  score: number;
  evidence: string[];
  last_audit_date: string;
  next_audit_date: string;
  notes: string;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface SchoolComplianceRecordCreate {
  school_id: string;
  standard_id: string;
  compliance_status: ComplianceStatus2;
  score: number;
  evidence: string[];
  last_audit_date: string;
  next_audit_date: string;
  notes: string;
  status: DataStatus;
}

export interface SchoolComplianceRecordUpdate {
  school_id?: string;
  standard_id?: string;
  compliance_status?: ComplianceStatus2;
  score?: number;
  evidence?: string[];
  last_audit_date?: string;
  next_audit_date?: string;
  notes?: string;
  status?: DataStatus;
}

export interface SchoolComplianceRecordQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- ComplianceAssessment ----

export interface ComplianceAssessment {
  id: string;
  school_id: string;
  standard_id: string;
  assessor: string;
  assessment_date: string;
  score: number;
  findings: string[];
  recommendations: string[];
  status: AssessmentStatus2;
  created_at: string;
  updated_at: string;
}

export interface ComplianceAssessmentCreate {
  school_id: string;
  standard_id: string;
  assessor: string;
  assessment_date: string;
  score: number;
  findings: string[];
  recommendations: string[];
  status: AssessmentStatus2;
}

export interface ComplianceAssessmentUpdate {
  school_id?: string;
  standard_id?: string;
  assessor?: string;
  assessment_date?: string;
  score?: number;
  findings?: string[];
  recommendations?: string[];
  status?: AssessmentStatus2;
}

export interface ComplianceAssessmentQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- ComplianceWaiver ----

export interface ComplianceWaiver {
  id: string;
  school_id: string;
  standard_id: string;
  reason: string;
  requested_by: string;
  approved_by: string;
  approval_date: string;
  expiry_date: string;
  conditions: string[];
  status: WaiverStatus;
  created_at: string;
  updated_at: string;
}

export interface ComplianceWaiverCreate {
  school_id: string;
  standard_id: string;
  reason: string;
  requested_by: string;
  approved_by: string;
  approval_date: string;
  expiry_date: string;
  conditions: string[];
  status: WaiverStatus;
}

export interface ComplianceWaiverUpdate {
  school_id?: string;
  standard_id?: string;
  reason?: string;
  requested_by?: string;
  approved_by?: string;
  approval_date?: string;
  expiry_date?: string;
  conditions?: string[];
  status?: WaiverStatus;
}

export interface ComplianceWaiverQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- RegulationCategory ----

export interface RegulationCategory {
  id: string;
  name: string;
  code: string;
  description: string;
  parent_id: string;
  level: number;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface RegulationCategoryCreate {
  name: string;
  code: string;
  description: string;
  parent_id: string;
  level: number;
  status: DataStatus;
}

export interface RegulationCategoryUpdate {
  name?: string;
  code?: string;
  description?: string;
  parent_id?: string;
  level?: number;
  status?: DataStatus;
}

export interface RegulationCategoryQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- EducationRegulation ----

export interface EducationRegulation {
  id: string;
  category_id: string;
  name: string;
  code: string;
  description: string;
  penalty: string;
  enforcement_level: EnforcementLevel;
  effective_date: string;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface EducationRegulationCreate {
  category_id: string;
  name: string;
  code: string;
  description: string;
  penalty: string;
  enforcement_level: EnforcementLevel;
  effective_date: string;
  status: DataStatus;
}

export interface EducationRegulationUpdate {
  category_id?: string;
  name?: string;
  code?: string;
  description?: string;
  penalty?: string;
  enforcement_level?: EnforcementLevel;
  effective_date?: string;
  status?: DataStatus;
}

export interface EducationRegulationQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- ComplianceNotification ----

export interface ComplianceNotification {
  id: string;
  school_id: string;
  regulation_id: string;
  type: string;
  message: string;
  severity: NotificationSeverity;
  due_date: string;
  acknowledged: boolean;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface ComplianceNotificationCreate {
  school_id: string;
  regulation_id: string;
  type: string;
  message: string;
  severity: NotificationSeverity;
  due_date: string;
  acknowledged: boolean;
  status: DataStatus;
}

export interface ComplianceNotificationUpdate {
  school_id?: string;
  regulation_id?: string;
  type?: string;
  message?: string;
  severity?: NotificationSeverity;
  due_date?: string;
  acknowledged?: boolean;
  status?: DataStatus;
}

export interface ComplianceNotificationQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- ComplianceReport ----

export interface ComplianceReport {
  id: string;
  region_id: string;
  district_id: string;
  period: string;
  total_schools: number;
  compliant_schools: number;
  non_compliant_schools: number;
  compliance_rate: number;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface ComplianceReportCreate {
  region_id: string;
  district_id: string;
  period: string;
  total_schools: number;
  compliant_schools: number;
  non_compliant_schools: number;
  compliance_rate: number;
  status: DataStatus;
}

export interface ComplianceReportUpdate {
  region_id?: string;
  district_id?: string;
  period?: string;
  total_schools?: number;
  compliant_schools?: number;
  non_compliant_schools?: number;
  compliance_rate?: number;
  status?: DataStatus;
}

export interface ComplianceReportQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// =============================================================================
// MODULE 12 - INTERNATIONAL
// =============================================================================

export enum Continent {
  AFRICA = 'africa',
  ASIA = 'asia',
  EUROPE = 'europe',
  NORTH_AMERICA = 'north_america',
  SOUTH_AMERICA = 'south_america',
  OCEANIA = 'oceania',
  ANTARCTICA = 'antarctica'
}

export enum EducationSystemType {
  CENTRALIZED = 'centralized',
  DECENTRALIZED = 'decentralized',
  FEDERAL = 'federal',
  UNITARY = 'unitary',
  HYBRID = 'hybrid'
}

export enum AssessmentType2 {
  STANDARDIZED = 'standardized',
  CONTINUOUS = 'continuous',
  SUMMATIVE = 'summative',
  FORMATIVE = 'formative',
  COMPREHENSIVE = 'comprehensive'
}

export enum GradingSystem {
  PERCENTAGE = 'percentage',
  LETTER = 'letter',
  GPA = 'gpa',
  POINTS = 'points',
  PASS_FAIL = 'pass_fail',
  DESCRIPTIVE = 'descriptive'
}

export enum PartnershipType {
  BILATERAL = 'bilateral',
  MULTILATERAL = 'multilateral',
  REGIONAL = 'regional',
  GLOBAL = 'global',
  ACADEMIC = 'academic',
  TECHNICAL = 'technical'
}

export enum ExchangeProgramType {
  STUDENT = 'student',
  TEACHER = 'teacher',
  RESEARCHER = 'researcher',
  ADMINISTRATOR = 'administrator',
  SHORT_TERM = 'short_term',
  SEMESTER = 'semester',
  ACADEMIC_YEAR = 'academic_year'
}

export enum VisaType {
  STUDENT = 'student',
  EXCHANGE = 'exchange',
  RESEARCH = 'research',
  WORK = 'work',
  TRANSIT = 'transit',
  DIPLOMATIC = 'diplomatic'
}

// ---- Country ----

export interface Country {
  id: string;
  name: string;
  code: string;
  iso_code: string;
  continent: Continent;
  currency_id: string;
  language_id: string;
  phone_code: string;
  population: number;
  education_system_type: EducationSystemType;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface CountryCreate {
  name: string;
  code: string;
  iso_code: string;
  continent: Continent;
  currency_id: string;
  language_id: string;
  phone_code: string;
  population: number;
  education_system_type: EducationSystemType;
  status: DataStatus;
}

export interface CountryUpdate {
  name?: string;
  code?: string;
  iso_code?: string;
  continent?: Continent;
  currency_id?: string;
  language_id?: string;
  phone_code?: string;
  population?: number;
  education_system_type?: EducationSystemType;
  status?: DataStatus;
}

export interface CountryQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- Language ----

export interface Language {
  id: string;
  name: string;
  code: string;
  iso_code: string;
  family: string;
  script: string;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface LanguageCreate {
  name: string;
  code: string;
  iso_code: string;
  family: string;
  script: string;
  status: DataStatus;
}

export interface LanguageUpdate {
  name?: string;
  code?: string;
  iso_code?: string;
  family?: string;
  script?: string;
  status?: DataStatus;
}

export interface LanguageQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- Currency ----

export interface Currency {
  id: string;
  name: string;
  code: string;
  iso_code: string;
  symbol: string;
  exchange_rate_usd: number;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface CurrencyCreate {
  name: string;
  code: string;
  iso_code: string;
  symbol: string;
  exchange_rate_usd: number;
  status: DataStatus;
}

export interface CurrencyUpdate {
  name?: string;
  code?: string;
  iso_code?: string;
  symbol?: string;
  exchange_rate_usd?: number;
  status?: DataStatus;
}

export interface CurrencyQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- EducationSystem ----

export interface EducationSystem {
  id: string;
  country_id: string;
  name: string;
  structure: string;
  pre_primary_years: number;
  primary_years: number;
  secondary_years: number;
  tertiary_years: number;
  assessment_type: AssessmentType2;
  grading_system: GradingSystem;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface EducationSystemCreate {
  country_id: string;
  name: string;
  structure: string;
  pre_primary_years: number;
  primary_years: number;
  secondary_years: number;
  tertiary_years: number;
  assessment_type: AssessmentType2;
  grading_system: GradingSystem;
  status: DataStatus;
}

export interface EducationSystemUpdate {
  country_id?: string;
  name?: string;
  structure?: string;
  pre_primary_years?: number;
  primary_years?: number;
  secondary_years?: number;
  tertiary_years?: number;
  assessment_type?: AssessmentType2;
  grading_system?: GradingSystem;
  status?: DataStatus;
}

export interface EducationSystemQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- Equivalency ----

export interface Equivalency {
  id: string;
  source_system_id: string;
  target_system_id: string;
  source_qualification: string;
  target_qualification: string;
  equivalence_level: number;
  conditions: string[];
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface EquivalencyCreate {
  source_system_id: string;
  target_system_id: string;
  source_qualification: string;
  target_qualification: string;
  equivalence_level: number;
  conditions: string[];
  status: DataStatus;
}

export interface EquivalencyUpdate {
  source_system_id?: string;
  target_system_id?: string;
  source_qualification?: string;
  target_qualification?: string;
  equivalence_level?: number;
  conditions?: string[];
  status?: DataStatus;
}

export interface EquivalencyQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- InternationalPartnership ----

export interface InternationalPartnership {
  id: string;
  country_id: string;
  partner_country_id: string;
  type: PartnershipType;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  budget: number;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface InternationalPartnershipCreate {
  country_id: string;
  partner_country_id: string;
  type: PartnershipType;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  budget: number;
  status: DataStatus;
}

export interface InternationalPartnershipUpdate {
  country_id?: string;
  partner_country_id?: string;
  type?: PartnershipType;
  name?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  budget?: number;
  status?: DataStatus;
}

export interface InternationalPartnershipQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- ExchangeProgram ----

export interface ExchangeProgram {
  id: string;
  partnership_id: string;
  name: string;
  type: ExchangeProgramType;
  description: string;
  duration_months: number;
  slots: number;
  application_start: string;
  application_end: string;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface ExchangeProgramCreate {
  partnership_id: string;
  name: string;
  type: ExchangeProgramType;
  description: string;
  duration_months: number;
  slots: number;
  application_start: string;
  application_end: string;
  status: DataStatus;
}

export interface ExchangeProgramUpdate {
  partnership_id?: string;
  name?: string;
  type?: ExchangeProgramType;
  description?: string;
  duration_months?: number;
  slots?: number;
  application_start?: string;
  application_end?: string;
  status?: DataStatus;
}

export interface ExchangeProgramQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- InternationalStudent ----

export interface InternationalStudent {
  id: string;
  student_id: string;
  home_country_id: string;
  host_country_id: string;
  program_id: string;
  visa_type: VisaType;
  arrival_date: string;
  status: IdStatus;
  created_at: string;
  updated_at: string;
}

export interface InternationalStudentCreate {
  student_id: string;
  home_country_id: string;
  host_country_id: string;
  program_id: string;
  visa_type: VisaType;
  arrival_date: string;
  status: IdStatus;
}

export interface InternationalStudentUpdate {
  student_id?: string;
  home_country_id?: string;
  host_country_id?: string;
  program_id?: string;
  visa_type?: VisaType;
  arrival_date?: string;
  status?: IdStatus;
}

export interface InternationalStudentQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- CrossBorderResearch ----

export interface CrossBorderResearch {
  id: string;
  title: string;
  description: string;
  participating_countries: string[];
  lead_institution: string;
  funding: number;
  start_date: string;
  end_date: string;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface CrossBorderResearchCreate {
  title: string;
  description: string;
  participating_countries: string[];
  lead_institution: string;
  funding: number;
  start_date: string;
  end_date: string;
  status: DataStatus;
}

export interface CrossBorderResearchUpdate {
  title?: string;
  description?: string;
  participating_countries?: string[];
  lead_institution?: string;
  funding?: number;
  start_date?: string;
  end_date?: string;
  status?: DataStatus;
}

export interface CrossBorderResearchQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}

// ---- GlobalBenchmark ----

export interface GlobalBenchmark {
  id: string;
  indicator_name: string;
  category: string;
  country_id: string;
  value: number;
  rank: number;
  source: string;
  year: number;
  status: DataStatus;
  created_at: string;
  updated_at: string;
}

export interface GlobalBenchmarkCreate {
  indicator_name: string;
  category: string;
  country_id: string;
  value: number;
  rank: number;
  source: string;
  year: number;
  status: DataStatus;
}

export interface GlobalBenchmarkUpdate {
  indicator_name?: string;
  category?: string;
  country_id?: string;
  value?: number;
  rank?: number;
  source?: string;
  year?: number;
  status?: DataStatus;
}

export interface GlobalBenchmarkQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: string;
  search: string;
}
